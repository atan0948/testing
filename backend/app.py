from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db import get_db  # Adjust the import based on your project structure
from .auth import register, login, get_current_user, UserRegister, UserLogin
from .fileupload.upload import router as upload_router  # Import your upload router
from .user_count import router as get_user_count

app = FastAPI()

# Allow CORS for specific origins
origins = [
    "http://localhost:5173",  # Your frontend's origin
    # Add other origins here if needed
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the upload router
app.include_router(upload_router, prefix="/api", tags=["uploads"])

#user count
app.include_router(get_user_count, prefix="/api", tags=["user_count"])

# Route for user registration
@app.post("/register")
async def register_user(user: UserRegister, db: Session = Depends(get_db)):
    return await register(user, db)

# Route for user login
@app.post("/login")
async def login_user(user: UserLogin, db: Session = Depends(get_db)):
    return await login(user, db)

# Example protected route
@app.get("/users/me")
async def read_users_me(current_user=Depends(get_current_user)):
    return current_user



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="172.22.30.112", port=8000)

