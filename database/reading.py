import os
from datetime import datetime, timezone
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from .base import Base

load_dotenv()
database_url = os.getenv("DATABASE_URL")

# Connect to Postgres database
engine = create_engine(database_url)
Session = sessionmaker(bind=engine)


class Reading(Base):
    """Handles SQLAlchemy model for readings table"""

    def __init__(self, user_id: int, client_id: int, hexagrams: list, moving_lines: list, topic: str = "", notes: str = ""):
        self.user_id = user_id
        self.client_id = client_id

        self.hexagram_primary = hexagrams[0]
        if len(hexagrams) > 1:
            self.hexagram_secondary = hexagrams[1]
        for i, line in enumerate(moving_lines, start=1):
            setattr(self, f'line_moving_{i}', line)

        self.topic = topic
        self.reading_notes = notes

    __tablename__ = "readings"
    reading_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    client_id = Column(Integer, nullable=False)
    topic = Column(String, nullable=False, default="")
    hexagram_primary = Column(Integer, nullable=False)
    hexagram_secondary = Column(Integer, nullable=True)
    line_moving_1 = Column(Boolean, nullable=False, default=False)
    line_moving_2 = Column(Boolean, nullable=False, default=False)
    line_moving_3 = Column(Boolean, nullable=False, default=False)
    line_moving_4 = Column(Boolean, nullable=False, default=False)
    line_moving_5 = Column(Boolean, nullable=False, default=False)
    line_moving_6 = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, nullable=False,
                        default=lambda: datetime.now(timezone.utc))
    reading_notes = Column(String, nullable=True)

    def serialize(self):
        """Returns reading information in dictionary"""
        moving_list = [
            self.line_moving_1,
            self.line_moving_2,
            self.line_moving_3,
            self.line_moving_4,
            self.line_moving_5,
            self.line_moving_6
        ]
        reading_dict = {
            "reading_id": self.reading_id,
            "topic": self.topic,
            "hexagram_primary": self.hexagram_primary,
            "lines_moving": moving_list,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
            "client_id": self.client_id,
            "reading_notes": self.reading_notes


        }
        if self.hexagram_secondary:
            reading_dict["hexagram_secondary"] = self.hexagram_secondary
