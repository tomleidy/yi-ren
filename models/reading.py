"""SQLAlchemy model for readings table"""
from sqlalchemy import Column, Integer, DateTime, Text
from database.base import Base
from helpers import utc_ts


class Reading(Base):
    """Handles SQLAlchemy model for readings table"""

    def __init__(self, hexagrams: dict, reading_info: dict = None):
        if reading_info:
            self.reader_id = reading_info.reader
            self.client_id = reading_info.client
            self.topic = reading_info.topic
            self.reading_notes = reading_info.notes
            self.hexagram_stationary = hexagrams["hexagram"]["stationary"]

    __tablename__ = "readings"
    reading_id = Column(Integer, primary_key=True, autoincrement=True)
    # TODO: add constraint linking reader_id and client_id to the users table.
    # TODO: make reader_id and client_id nullable=False
    reader_id = Column(Integer, nullable=True)
    client_id = Column(Integer, nullable=True)
    topic = Column(Text, nullable=False, default="")
    reading_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, default=utc_ts())

    hexagram_stationary = Column(Integer, nullable=False)
    hexagram_moving = Column(Integer, nullable=True)

    def serialize(self):
        """Returns reading information in dictionary"""
        reading_dict = {
            # metadata
            "reader_id": self.reader_id,
            "client_id": self.client_id,
            "created_at": self.created_at.isoformat(),
            # reading data
            "topic": self.topic,
            "reading_notes": self.reading_notes,
            "reading_id": self.reading_id,
            "hexagrams": {
                "stationary": self.hexagram_stationary,
                "moving": self.hexagram_moving
            },
        }
        # TODO: add call to fill_dictionary helper once it's implemented
        return reading_dict
