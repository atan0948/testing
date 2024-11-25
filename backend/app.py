from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db import get_db
from .auth import register, login, get_current_user, UserRegister, UserLogin
from .fileupload.upload import router as upload_router
from .user_count import router as get_user_count
from .pass_forgot import forgot_password, reset_password, ForgetPasswordRequest
from dotenv import load_dotenv
from .user_growth import router as user_growth_router

app = FastAPI()

load_dotenv()

# Allow CORS for specific origins
origins = [
    "http://localhost:5173",  # Your frontend's origin
    # Add other origins here if needed
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the upload router
app.include_router(upload_router, prefix="/api", tags=["uploads"])

#user count
app.include_router(get_user_count, prefix="/api", tags=["user_count"])

#user count per months
app.include_router(user_growth_router, prefix="/api", tags=["user_growth"])

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

# Route for sending OTP to reset password
@app.post("/forgot-password/")
async def forgot_password_route(request: ForgetPasswordRequest, db: Session = Depends(get_db)):
    return await forgot_password(request.email, db)

# Route for resetting the user's password
@app.post("/reset-password/")
async def reset_password_route(token: str, new_password, otp: str, db: Session = Depends(get_db)):
    return await reset_password(token, new_password, otp, db)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

