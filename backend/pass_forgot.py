import logging
from fastapi import HTTPException
from sqlalchemy.orm import Session
from itsdangerous import URLSafeTimedSerializer
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from .db import User
import random
import smtplib
import bcrypt
import os
from dotenv import load_dotenv

# Constants
SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
PASSWORD_RESET_EXPIRE_MINUTES = 30
OTP_EXPIRE_MINUTES = 5
s = URLSafeTimedSerializer(SECRET_KEY)

# SMTP Email config
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")



logging.basicConfig(level=logging.INFO)

load_dotenv()

class ForgetPasswordRequest(BaseModel):
    email: EmailStr

def send_otp_email(to_email: str, otp: str):
    try:
        logging.info(f"Sending OTP to {to_email}")
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Secure the connection
        server.login(SENDER_EMAIL, SENDER_PASSWORD)  # Authenticate with Gmail
        
        subject = "Your Password Reset OTP"
        body = f"Your OTP for password reset is: {otp}. This OTP will expire in 5 minutes."
        message = f"Subject: {subject}\n\n{body}"

        server.sendmail(SENDER_EMAIL, to_email, message)
        server.quit()
        logging.info(f"OTP sent to {to_email}")
    except smtplib.SMTPAuthenticationError:
        logging.error("Authentication failed. Check your email and password.")
        raise HTTPException(status_code=500, detail="Email authentication failed.")
    except Exception as e:
        logging.error(f"Failed to send OTP to {to_email}: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email.")

async def forgot_password(email: EmailStr, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found.")
    
    otp = random.randint(1000, 9999)
    otp_expiry = datetime.utcnow() + timedelta(minutes=OTP_EXPIRE_MINUTES)
    
    user.otp = str(otp)
    user.otp_expiry = otp_expiry
    db.commit()

    logging.info(f"OTP for {email} generated: {otp} (expires at {otp_expiry})")

    send_otp_email(email, str(otp))

    return {"message": "OTP sent to your email."}

async def reset_password(token: str, new_password: str, otp: str, db: Session):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=PASSWORD_RESET_EXPIRE_MINUTES * 60)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    
    if user.otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP.")
    
    if datetime.utcnow() > user.otp_expiry:
        raise HTTPException(status_code=400, detail="OTP has expired.")
    
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user.password_hash = hashed_password
    user.otp = None  # Clear OTP after successful reset
    user.otp_expiry = None
    db.commit()

    return {"message": "Password has been reset successfully."}
