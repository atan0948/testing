from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from .db import get_db
from .auth import register, login, get_current_user, UserRegister, UserLogin
from .fileupload.upload import router as upload_router
from .user_count import router as get_user_count
from .user_growth import router as user_growth_router
from .pass_forgot import forgot_password, reset_password, ForgetPasswordRequest
from .fileupload.uploadedfiles import router as uploady_file
from fastapi import APIRouter

# Initialize FastAPI app
app = FastAPI()

# Load environment variables
load_dotenv()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


app.include_router(upload_router, prefix="/api", tags=["uploads"])
app.include_router(get_user_count, prefix="/api", tags=["user_count"])
app.include_router(user_growth_router, prefix="/api", tags=["user_growth"])
app.include_router(uploady_file, prefix="/api", tags=["files"])

auth_router = APIRouter()

@auth_router.post("/register")
async def register_user(user: UserRegister, db: Session = Depends(get_db)):
    return await register(user, db)

@auth_router.post("/login")
async def login_user(user: UserLogin, db: Session = Depends(get_db)):
    return await login(user, db)

@auth_router.get("/users/me")
async def read_users_me(current_user=Depends(get_current_user)):
    return current_user


password_router = APIRouter()

@password_router.post("/forgot-password/")
async def forgot_password_route(request: ForgetPasswordRequest, db: Session = Depends(get_db)):
    return await forgot_password(request.email, db)

@password_router.post("/reset-password/")
async def reset_password_route(token: str, new_password: str, otp: str, db: Session = Depends(get_db)):
    return await reset_password(token, new_password, otp, db)

app.include_router(auth_router, tags=["auth"])
app.include_router(password_router, tags=["password"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
