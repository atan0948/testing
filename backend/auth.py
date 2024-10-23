import jwt
import bcrypt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from .db import User, get_db
from datetime import datetime, timedelta

# Constants
SECRET_KEY = "your_secret_key"  # Use a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token expiration time

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # Use your actual token URL

# Pydantic models for request data
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

async def register(user: UserRegister, db: Session = Depends(get_db)):
    # Hash the password
    password_hash = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Create a new user instance
    new_user = User(username=user.username, password_hash=password_hash, email=user.email)

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {'message': 'User registered successfully!'}
    except Exception as e:
        if "UNIQUE constraint failed" in str(e):
            if 'username' in str(e):
                raise HTTPException(status_code=409, detail='Username already taken. Please choose another one.')
            elif 'email' in str(e):
                raise HTTPException(status_code=409, detail='Email already taken. Please choose another one.')
        raise HTTPException(status_code=500, detail='Registration failed. Please try again later.')

async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail='Invalid email or password.')

    if bcrypt.checkpw(user.password.encode('utf-8'), db_user.password_hash.encode('utf-8')):
        # Create JWT token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"user_id": db_user.id}, expires_delta=access_token_expires)
        return {"access_token": access_token, "token_type": "bearer"}
    
    raise HTTPException(status_code=401, detail='Invalid email or password.')

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)  # Default expiration time
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
