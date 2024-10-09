from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .src.db import create_database, get_db
from .src.auth import register, login, UserRegister, UserLogin

app = FastAPI()

# Allow requests from the specific frontend port
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database and tables
create_database()

# Registration endpoint
@app.post('/register')
async def register_user(user: UserRegister, db: Session = Depends(get_db)):
    return await register(user, db)

# Login endpoint
@app.post('/login')
async def login_user(user: UserLogin, db: Session = Depends(get_db)):
    return await login(user, db)

# Role-based endpoints
@app.get('/admin')
async def admin_endpoint(db: Session = Depends(get_db), user: UserLogin = Depends(login)):
    if user.role != 'admin':
        raise HTTPException(status_code=403, detail='Not authorized to access this resource.')
    return {'message': 'Welcome, Admin!'}

@app.get('/premium')
async def premium_endpoint(db: Session = Depends(get_db), user: UserLogin = Depends(login)):
    if user.role not in ['admin', 'premium']:
        raise HTTPException(status_code=403, detail='Not authorized to access this resource.')
    return {'message': 'Welcome, Premium User!'}

@app.get('/normal')
async def normal_endpoint(db: Session = Depends(get_db), user: UserLogin = Depends(login)):
    if user.role not in ['admin', 'premium', 'normal']:
        raise HTTPException(status_code=403, detail='Not authorized to access this resource.')
    return {'message': 'Welcome, Normal User!'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5002, log_level="info")
