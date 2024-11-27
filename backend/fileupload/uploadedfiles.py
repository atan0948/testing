from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import UploadedFile, get_db, User
from ..auth import get_current_user

router = APIRouter()

# Endpoint to fetch the uploaded files for the current user
@router.get("/files")
async def get_uploaded_files(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Query the database for files uploaded by the current user
    files = db.query(UploadedFile).filter(UploadedFile.user_id == current_user.id).all()

    if not files:
        raise HTTPException(status_code=404, detail="No files found")

    # Return the list of files in the response
    return [{"id": file.id, "filename": file.filename, "filepath": file.filepath} for file in files]
