from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database.base import Base


class Reading(Base):
    """Handles SQLAlchemy model for readings table"""

    def __init__(self, reader_id: int, client_id: int, hexagrams: list, moving_lines: list, topic: str = "", notes: str = ""):
        self.reader_id = reader_id
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
    # TODO: make reader_id and client_id nullable=False (requires more user table setup)

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
            "reader_id": self.reader_id,
            "client_id": self.client_id,
            "reading_notes": self.reading_notes


        }
        if self.hexagram_secondary:
            reading_dict["hexagram_secondary"] = self.hexagram_secondary
