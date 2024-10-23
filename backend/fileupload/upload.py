#uploady.py
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import UploadedFile, User, get_db
from ..auth import get_current_user
import os

router = APIRouter()

@router.post("/home")
async def upload_file(
    file: UploadFile = File(...), 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)

    # Save the file to the specified path
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Store file information in the database
    new_file = UploadedFile(filename=file.filename, filepath=file_path, userid=current_user.id)
    db.add(new_file)
    db.commit()
    db.refresh(new_file)

    return {"filename": new_file.filename, "filepath": new_file.filepath}
