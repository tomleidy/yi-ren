from sqlalchemy import Table, Column, Integer, String, Boolean, DateTime, func
from . import metadata_obj

user = Table(
    "user",
    metadata_obj,
    Column("user_id", Integer, primary_key=True),
    Column("username", String(30), nullable=False),
    Column("email", String(50), nullable=False),
    Column("password", String(100), nullable=False),
    Column("admin", Boolean, default=False),
    Column("created_at", DateTime, server_default=func.now()),
    Column("updated_at", DateTime, server_default=func.now(), onupdate=func.now()),
    Column("last_login", DateTime),
    Column("last_login_ip", String(100)),
    Column("first_name", String(50)),
    Column("last_name", String(50)),
    Column("is_active", Boolean, default=True),
    Column("is_verified", Boolean, default=False),
    Column("deleted_at", DateTime, default=False),
    Column("reset_password_token", String(100)),
    Column("reset_password_expires", String(100))
    )