"""SQLAlchemy model for readings table"""
from sqlalchemy import Column, Integer, DateTime, Text, CheckConstraint
from database.base import Base
from gua.helpers import utc_ts, fill_reading_dictionary
from models import Session


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
    save_fields = [
        "reading_id", "reader_id", "client_id", "topic", "reading_notes",
        "created_at", "modified_at", "hexagram_stationary", "hexagram_moving"
    ]

    def __init__(self, reading_data: dict):
        valid_fields = {"reader_id", "client_id", "hexagram_stationary", "hexagram_moving", "topic", "reading_notes"}
        if 'hexagram_stationary' not in reading_data:
            raise KeyError("reading_data requires a hexagram_stationary value")
        if reading_data['hexagram_stationary'] < 0 or reading_data['hexagram_stationary'] > 64:
            raise ValueError("reading_data: 1 <= hexagram_stationary <= 64 must be true")
        if 'hexagram_moving' in reading_data:
            if reading_data['hexagram_moving'] < 0 or reading_data['hexagram_moving'] > 64:
                raise ValueError("reading_data: 1 <= hexagram_moving <= 64 must be true")
            if reading_data['hexagram_stationary'] == reading_data['hexagram_moving']:
                del reading_data['hexagram_moving']

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

    def create_reading(self):
        """Create and reading to database"""
        save_dict = {}
        for key in self.save_fields:
            if key in self.__dict__:
                save_dict[key] = getattr(self, key)
        with Session() as session:
            try:
                session.add(self)
                session.commit()
            except Exception as e:
                session.rollback()
                print(f"error: {str(e)}")
            finally:
                session.close()

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
