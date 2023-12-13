"""SQLAlchemy model for readings table"""
from sqlalchemy import Column, Integer, DateTime, Text
from database.base import Base
from helpers import utc_ts


class Reading(Base):
    """
    Handles SQLAlchemy model for readings table.
    Expects a dictionary. Desired keys:
        "reader_id", "client_id", "hexagram_stationary",
        "hexagram_moving", "topic", "reading_notes"
    """

    def __init__(self, reading_data: dict):
        # TODO: return the dictionary keys to hexagrams_stationary and hexagrams_moving to facilitate the below
        for key, value in reading_data.items():
            if key in self.__dict__:
                setattr(self, key, value)

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
