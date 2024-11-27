from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from .db import get_db, User
from datetime import timedelta, datetime
import pytz
from pydantic import BaseModel
from typing import List

router = APIRouter()

class DailyUserCount(BaseModel):
    date: str
    user_count: int

class UserCountResponse(BaseModel):
    totalUserCount: int
    dailyUserCounts: List[DailyUserCount]

# Endpoint to fetch user count details
@router.get("/user-count-details", response_model=UserCountResponse)
async def get_user_count_details(days: int = 30, db: Session = Depends(get_db)):
    # Get current time in UTC (or local timezone)
    tz = pytz.timezone('UTC')  # Set to your desired timezone, or 'UTC' for UTC timezone
    today = datetime.now(tz).date()  # Using timezone-aware date
    start_date = today - timedelta(days=days)

    # Total user count (all users in the system)
    total_count = db.query(User).count()

    # Daily user count (users created on each day in the past 'days' period)
    daily_counts = db.query(
        func.date(User.created_at).label("date"), func.count().label("user_count")
    ).filter(User.created_at >= start_date).group_by(func.date(User.created_at)).all()

    # Create a dictionary to easily check the counts by date
    daily_user_counts = {str(date): user_count for date, user_count in daily_counts}

    # Create a list of dictionaries, filling in any missing days with a count of 0
    result = []
    for i in range(days):
        date = start_date + timedelta(days=i)  # Date for the current iteration
        date_str = str(date)
        user_count = daily_user_counts.get(date_str, 0)  # Default to 0 if no signups on that day
        result.append(DailyUserCount(date=date_str, user_count=user_count))

    return UserCountResponse(totalUserCount=total_count, dailyUserCounts=result)