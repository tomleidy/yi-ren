"""SQLAlchemy model for readings table"""
from sqlalchemy import Column, Integer, DateTime, Text, CheckConstraint
from database.base import Base
from gua.helpers import utc_ts, fill_reading_dictionary

# TODO: error handling around invalid hexagram numbers
# TODO: add constraint linking reader_id and client_id to the users table.
# TODO: make reader_id and client_id nullable=False


class Reading(Base):
    """
    Handles SQLAlchemy model for readings table.
    Expects a dictionary. Desired keys:
        "reader_id", "client_id", "hexagram_stationary",
        "hexagram_moving", "topic", "reading_notes"
    """

    def __init__(self, reading_data: dict):
        valid_fields = {"reader_id", "client_id", "hexagram_stationary", "hexagram_moving", "topic", "reading_notes"}
        if not reading_data['hexagram_stationary']:
            return None
        if reading_data['hexagram_stationary'] < 0 or reading_data['hexagram_stationary'] > 64:
            return None
        if reading_data['hexagram_moving']:
            if reading_data['hexagram_moving'] < 0 or reading_data['hexagram_moving'] > 64:
                return None

            for key, value in reading_data.items():
                if key in valid_fields:
                    setattr(self, key, value)

    __tablename__ = "readings"
    reading_id = Column(Integer, primary_key=True, autoincrement=True)

    reader_id = Column(Integer, nullable=True)
    client_id = Column(Integer, nullable=True)
    topic = Column(Text, nullable=False, default="")
    reading_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, default=utc_ts())
    modified_at = Column(DateTime, nullable=False, default=utc_ts())

    hexagram_stationary = Column(Integer, CheckConstraint(
        'hexagram_stationary >= 1 and hexagram_stationary <= 64'), nullable=False)
    hexagram_moving = Column(Integer, CheckConstraint(
        'hexagram_moving >= 1 and hexagram_moving <= 64'), nullable=True)

    def serialize(self):
        """Returns reading information in dictionary"""
        reading_dict = {
            # metadata
            "reader_id": self.reader_id,
            "client_id": self.client_id,
            "created_at": self.created_at.isoformat(),
            "modified_at": self.modified_at.isoformat(),
            # reading data
            "topic": self.topic,
            "reading_notes": self.reading_notes,
            "reading_id": self.reading_id,
            "hexagram_stationary": self.hexagram_stationary,
            "hexagram_moving": self.hexagram_moving
        }
        reading_dict = fill_reading_dictionary(reading_dict)
        return reading_dict
