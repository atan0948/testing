from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import UploadedFile, User, get_db
from ..auth import get_current_user
import os
import uuid
from datetime import datetime

router = APIRouter()

def get_unique_filename(filename: str):
    name, ext = os.path.splitext(filename)
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    unique_filename = f"{name}_{timestamp}{ext}"
    return unique_filename

@router.post("/home")
async def upload_file(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    # Generate unique filename to avoid conflicts
    unique_filename = get_unique_filename(file.filename)
    file_path = os.path.join(upload_folder, unique_filename)

    # Check for file size limit
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB limit
    file_size = len(await file.read())  # Read file size

    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds the 10MB limit")

    # Check if the folder is writable
    if not os.access(upload_folder, os.W_OK):
        raise HTTPException(status_code=500, detail="Upload folder is not writable")

    try:
        # Save the file to the specified path
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Store file information in the database
        new_file = UploadedFile(filename=unique_filename, filepath=file_path, user_id=current_user.id)
        db.add(new_file)
        db.commit()
        db.refresh(new_file)

        return {"filename": new_file.filename, "filepath": new_file.filepath}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
