import os
import jwt
import bcrypt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from .db import User, get_db
from datetime import datetime, timedelta
from itsdangerous import URLSafeTimedSerializer

# Constants
SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
PASSWORD_RESET_EXPIRE_MINUTES = 30  # Token expiration for password reset

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
s = URLSafeTimedSerializer(SECRET_KEY)

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetToken(BaseModel):
    token: str
    new_password: str

async def register(user: UserRegister, db: Session = Depends(get_db)):
    password_hash = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(username=user.username, password_hash=password_hash, email=user.email)

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {'message': 'User registered successfully!'}
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            if 'username' in str(e):
                raise HTTPException(status_code=409, detail='Username already taken.')
            elif 'email' in str(e):
                raise HTTPException(status_code=409, detail='Email already taken.')
        raise HTTPException(status_code=500, detail='Registration failed.')

async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not bcrypt.checkpw(user.password.encode('utf-8'), db_user.password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail='Invalid email or password.')

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"user_id": db_user.id}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

async def forgot_password(request: PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found.")
    
    # Generate a password reset token
    token = s.dumps(user.email, salt='password-reset-salt')
    # Here, you would send the email with the reset link (using your email function)
    print(f"Send this link to reset password: http://localhost:8000/reset-password/{token}")
    
    return {"message": "Password reset link sent to your email."}

async def reset_password(token: str, request: PasswordResetToken, db: Session = Depends(get_db)):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=PASSWORD_RESET_EXPIRE_MINUTES * 60)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
    
    hashed_password = bcrypt.hashpw(request.new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user = db.query(User).filter(User.email == email).first()
    
    if user:
        user.password_hash = hashed_password
        db.commit()
        return {"message": "Password has been reset successfully."}
    
    raise HTTPException(status_code=404, detail="User not found.")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
