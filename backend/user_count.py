from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from .db import get_db, User
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/user-count")
async def get_user_count(days: int = 30, db: Session = Depends(get_db)):
    # Calculate the date from which to count users
    date_threshold = datetime.utcnow() - timedelta(days=days)

    # Count users created after the calculated date
    user_count = db.query(User).filter(User.created_at >= date_threshold).count()

    return JSONResponse(content={"userCount": user_count})
