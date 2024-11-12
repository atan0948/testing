from sqlalchemy import create_engine, Column, Integer, String, DateTime, TIMESTAMP, Enum, ForeignKey, func
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import enum

# Database configuration
DATABASE_URL = "mysql+mysqlconnector://root:J%40yVeeN%40thanael1234@localhost/mydb"

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, pool_recycle=3600, pool_pre_ping=True)

# Test the connection
try:
    with engine.connect() as connection:
        print("Database connection successful!")
except Exception as e:
    print(f"Database connection failed: {e}")

# Create a declarative base
Base = declarative_base()

# Define the Role Enum class
class RoleEnum(str, enum.Enum):
    admin = 'admin'
    premium = 'premium'
    normal = 'normal'

# Class for user
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False, index=True)  # Added index
    password_hash = Column(String(255), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)  # Added index
    role = Column(Enum(RoleEnum), default=RoleEnum.normal)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=False)
    otp = Column(String(10), nullable=True)
    otp_expiry =Column(DateTime, nullable=True)

    upload_files = relationship("UploadedFile", back_populates="owner")

# Class for uploaded file
class UploadedFile(Base):
    __tablename__ = 'uploaded_files'  # Renamed for better convention

    id = Column(Integer, primary_key=True, autoincrement=True)
    filename = Column(String(100), nullable=False)
    filepath = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)  # Changed to user_id for clarity
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp(), nullable=False)

    owner = relationship("User", back_populates="upload_files")

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create the database and tables
def create_database():
    Base.metadata.create_all(bind=engine)
    print("Database and tables created successfully.")

# Create the database and tables on script run
create_database()
