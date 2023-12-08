"""Database connection"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
load_dotenv()

database_url = os.getenv("DATABASE_URL")

# Connect to Postgres database
engine = create_engine(database_url)
Session = sessionmaker(bind=engine)
