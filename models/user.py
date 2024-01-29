from datetime import datetime, timezone
from sqlalchemy import Column, Integer, DateTime, Text, Date, Boolean
from database.base import Base
from models import Session

pk_column = ["user_id"]
fixed_column = ["username"]
text_columns = [
    "personal_name", "family_name", "nickname", "gender",
    "referred_by", "email", "phone_number", "user_notes"
]
time_columns = ["created_at", "last_modified", "date_of_birth"]
boolean_columns = ["safe_to_email", "safe_to_call", "safe_to_text", "is_reader"]

# TODO: enable ability to change username
# TODO: clean this up. dictionary?
user_column_list = [*pk_column, *fixed_column, *text_columns, *time_columns, *boolean_columns]
# these columns cannot be specified during user create
protected_create_columns = ["user_id", *time_columns]
# these columns cannot be changed during user update
protected_update_columns = ["username", *protected_create_columns]
# these are the columns that can be updated
unprotected_update_columns = [
    attr for attr in user_column_list if attr not in protected_update_columns]


class User(Base):
    """Handles SQLAlchemy model for users table"""

    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(Text, nullable=False, unique=True)
    nickname = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(
        timezone.utc), nullable=False)
    last_modified = Column(DateTime, default=lambda: datetime.now(
        timezone.utc), nullable=False)
    safe_to_email = Column(Boolean, default=False)
    safe_to_call = Column(Boolean, default=False)
    safe_to_text = Column(Boolean, default=False)
    personal_name = Column(Text)
    family_name = Column(Text)
    date_of_birth = Column(Date)
    pronouns = Column(Text)
    gender = Column(Text)
    referred_by = Column(Text)
    email = Column(Text)
    phone_number = Column(Text)
    user_notes = Column(Text)
    preferred_contact_method = Column(Text)
    safety_notes = Column(Text)
    is_reader = Column(Boolean, default=False)

    def serialize(self):
        """Returns user information in dictionary"""
        user_dict = {}
        for key in user_column_list:
            val = getattr(self, key)
            if val:
                user_dict[key] = val if key not in time_columns else val.isoformat()
        return user_dict

    def get_user_by_id(self, user_id):
        """Lookup user by user_id"""
        session = Session()
        user = session.query(User).filter(User.user_id == user_id).first()
        try:
            if user:
                result = user.serialize()
                return {"success": True, "userinfo": result}
            return {"success": False, "error": "User not found"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def get_all_users(self):
        """Get and return usernames and user_ids"""
        session = Session()
        try:
            users = session.query(User.username, User.user_id).all()
            return {"success": True, "userlist": users}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def lookup_username(self, username):
        """Get and return user info from username"""
        session = Session()
        user = session.query(User).filter(User.username == username).first()
        try:
            if user:
                result = user.serialize()
                return {"success": True, "userinfo": result}
            return {"success": False, "error": "User not found"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def _lookup_user(self, userinfo: dict, serialize: bool = False) -> dict:
        try:
            with Session() as session:
                user_id = userinfo.get('user_id')
                username = userinfo.get('username')
                if user_id:
                    user = session.query(User).filter(User.user_id == user_id).first()
                elif username:
                    user = session.query(User).filter(User.username == username).first()
                else:
                    return {"success": False, "error": "No username or user_id provided for lookup"}
                if user:
                    if serialize:
                        return {"success": True, "userinfo": user.serialize()}
                    return {"success": True, "userinfo": user}
                return {"success": False, "error": "User not found"}
        except Exception as e:
            return {"success": False, "error": f"error: {str(e)}"}

    def adduser(self, userinfo):
        """Add user to database"""
        if 'username' not in userinfo or 'nickname' not in userinfo:
            return {"success": False, "error": "Missing username or nickname"}

        new_user = User()
        for key, val in userinfo.items():
            if key in user_column_list and key not in protected_create_columns:
                setattr(new_user, key, val)

        session = Session()
        try:
            session.add(new_user)
            session.commit()
            return {"success": True, "userinfo": new_user.serialize()}
        except Exception as e:
            session.rollback()
            return {"success": False, "error": str(e)}

    def deluser(self, userinfo):
        """Delete user"""
        session = Session()
        user_to_delete = None
        if 'username' in userinfo:
            user_to_delete = session.query(User).filter(
                User.username == userinfo['username']).first()
        elif 'user_id' in userinfo.keys():
            user_to_delete = session.query(User).filter(
                User.user_id == userinfo['user_id']).first()
        if user_to_delete is None:
            return {"success": False, "error": "User not found"}
        session.delete(user_to_delete)
        try:
            session.commit()
            return {"success": True}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def updateuser(self, userinfo):
        """Update user information, except username and protected columns"""
        update_object = {}
        result = self._lookup_user(userinfo)
        if not result['success']:
            return {'success': False, "error": "User not found"}
        with Session() as session:
            user = None
            if result['success']:
                user = result.get('userinfo')
                user_id = getattr(user, 'user_id')
                for key, val in userinfo.items():
                    error_keys = []
                    if key in unprotected_update_columns:
                        update_object[key] = val
                    else:
                        error_keys.append(key)
                if len(error_keys) > 0:
                    return {"success": False, "error": f"Invalid key(s): {', '.join(error_keys)}"}
                if len(update_object) <= 1:
                    return {"success": False, "error": "Insufficient data provided"}
                try:
                    session.query(User).filter(User.user_id == user_id).update(update_object)
                    confirmed_result = session.query(User).filter(User.user_id == user_id).first()
                    session.commit()
                    return {"success": True, "userinfo": confirmed_result.serialize()}
                except Exception as e:
                    return {"success": False, "error": str(e)}
        return result
