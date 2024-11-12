from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from .db import get_db, User
from datetime import timedelta, datetime

router = APIRouter()

@router.get("/user-count-details")
async def get_user_count_details(days: int = 30, db: Session = Depends(get_db)):
    today = datetime.utcnow()
    start_date = today - timedelta(days=days)
    
    # Total user count (all users in the system)
    total_count = db.query(User).count()

    # Daily user count (users created on each day in the past 'days' period)
    daily_counts = db.query(
        func.date(User.created_at).label("date"), func.count().label("user_count")
    ).filter(User.created_at >= start_date).group_by(func.date(User.created_at)).all()
    
    daily_user_counts = [{"date": str(date), "user_count": user_count} for date, user_count in daily_counts]
    
    return JSONResponse(content={"totalUserCount": total_count, "dailyUserCounts": daily_user_counts})
