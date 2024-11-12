import os
import random
import smtplib
import bcrypt
from fastapi import HTTPException
from sqlalchemy.orm import Session
from itsdangerous import URLSafeTimedSerializer
from pydantic import EmailStr
from .db import User
from datetime import datetime, timedelta

# Constants
SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
PASSWORD_RESET_EXPIRE_MINUTES = 30  # Token expiration for password reset
OTP_EXPIRE_MINUTES = 5  # OTP expiration time (5 minutes)
s = URLSafeTimedSerializer(SECRET_KEY)

# SMTP Email configuration (for example purposes, use a proper email provider like SendGrid or AWS SES)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv("SENDER_EMAIL")  # Make sure to set your email
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")  # Make sure to set your email password or app-specific password

def send_otp_email(to_email: str, otp: str):
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        
        subject = "Your Password Reset OTP"
        body = f"Your OTP for password reset is: {otp}. This OTP will expire in 5 minutes."
        message = f"Subject: {subject}\n\n{body}"
        
        server.sendmail(SENDER_EMAIL, to_email, message)
        server.quit()
        print(f"Sent OTP to {to_email}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")

async def forgot_password(email: EmailStr, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found.")
    
    # Generate OTP (4-digit random number)
    otp = random.randint(1000, 9999)

    # Store OTP and expiration time in the database (you may need to add a field in your User model or create a new table)
    otp_expiry = datetime.utcnow() + timedelta(minutes=OTP_EXPIRE_MINUTES)
    
    # Assuming User model has fields otp and otp_expiry (you may need to add these in the database schema)
    user.otp = str(otp)
    user.otp_expiry = otp_expiry
    db.commit()

    # Send OTP to the user's email
    send_otp_email(email, str(otp))

    return {"message": "OTP sent to your email."}

async def reset_password(token: str, new_password: str, otp: str, db: Session):
    # Validate the reset token
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=PASSWORD_RESET_EXPIRE_MINUTES * 60)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
    
    # Check if OTP is valid (matching the one stored in the database and not expired)
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if user.otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP.")

    if datetime.utcnow() > user.otp_expiry:
        raise HTTPException(status_code=400, detail="OTP has expired.")
    
    # Update the user's password
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user.password_hash = hashed_password
    user.otp = None  # Clear OTP after successful reset
    user.otp_expiry = None  # Clear OTP expiry
    db.commit()

    return {"message": "Password has been reset successfully."}
