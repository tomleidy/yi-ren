from datetime import datetime, timezone
from sqlalchemy import Column, Integer, DateTime, Text, Date, Boolean
from database.base import Base


class User(Base):
    """Handles SQLAlchemy model for users table"""

    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(Text, nullable=False)
    personal_name = Column(Text)
    family_name = Column(Text)
    nickname = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(
        timezone.utc), nullable=False)
    last_modified = Column(DateTime, default=lambda: datetime.now(
        timezone.utc), nullable=False)
    safe_to_email = Column(Boolean, default=False)
    safe_to_call = Column(Boolean, default=False)
    safe_to_text = Column(Boolean, default=False)
    date_of_birth = Column(Date)
    pronouns = Column(Text)
    gender = Column(Text)
    referred_by = Column(Text)
    email = Column(Text)
    phone_number = Column(Text)
    user_notes = Column(Text)
    safe_to_email = Column(Boolean, default=True)
    safe_to_call = Column(Boolean, default=True)
    safe_to_text = Column(Boolean, default=True)
    preferred_contact_method = Column(Text)
    safety_notes = Column(Text)
    is_reader = Column(Boolean, default=False)

    def serialize(self):
        """Returns user information in dictionary"""
        serialize_list = [
            "user_id", "username", "personal_name", "family_name",
            "chosen_personal_name", "created_at", "last_modified", "date_of_birth",
            "gender", "referred_by", "email", "phone_number", "user_notes", "is_reader"
        ]
        timestamps = ["created_at", "last_modified"]
        user_dict = {}
        for key, val in vars(self).items():
            if key in serialize_list:
                user_dict[key] = val if key not in timestamps else val.isoformat()
        return user_dict
