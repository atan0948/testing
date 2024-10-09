from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import Uploadedfile, User, get_db
from ..auth import get_current_user # Assuming you have a function to validate and retrieve the user from the token
import os

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user),  # Dependency injection to get the current user
    db: Session = Depends(get_db)
):
    # Set up the upload directory
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)

    # Write the file to the designated path
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Save file information in the database
    new_file = Uploadedfile(filename=file.filename, filepath=file_path, userid=current_user.id)
    db.add(new_file)
    db.commit()
    db.refresh(new_file)

    return {"filename": new_file.filename, "filepath": new_file.filepath}
