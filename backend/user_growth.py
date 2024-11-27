from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from .db import get_db, User
from datetime import timedelta, datetime

router = APIRouter()

@router.get("/user-growth-per-month")
async def get_user_growth_per_month(days: int = 30, db: Session = Depends(get_db)):
    today = datetime.utcnow()
    start_date = today - timedelta(days=days)

    # Query for monthly user counts using MySQL-compatible function
    monthly_counts = db.query(
        func.DATE_FORMAT(User.created_at, '%Y-%m-01').label("month"),  # Use DATE_FORMAT to truncate to the first day of the month
        func.count().label("user_count")
    ).filter(User.created_at >= start_date).group_by(func.DATE_FORMAT(User.created_at, '%Y-%m-01')).order_by(func.DATE_FORMAT(User.created_at, '%Y-%m-01')).all()

    # Prepare the data
    monthly_user_counts = [{"month": str(month), "user_count": user_count} for month, user_count in monthly_counts]

    # Calculate user growth between months
    monthly_growth = []
    previous_count = 0
    for i, entry in enumerate(monthly_user_counts):
        if i == 0:
            entry['growth'] = 0  # No growth for the first month
        else:
            entry['growth'] = entry['user_count'] - previous_count
        previous_count = entry['user_count']
        
        # Optionally format the growth as a percentage
        entry['growth_percentage'] = (
            (entry['growth'] / (previous_count or 1)) * 100 if previous_count > 0 else 0
        )

    return JSONResponse(content={"monthlyUserCounts": monthly_user_counts})
