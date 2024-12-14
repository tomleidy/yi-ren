from sqlalchemy import Table, Column, Integer, String, Boolean, Text, DateTime, func
from . import metadata_obj
from .user import user

yijing_book_info = Table(
    "yijing_book_info",
    metadata_obj,
    Column("book_id", Integer, primary_key=True),
    Column("user_id", Integer, nullable=False, foreign_key=user.c.user_id),
    Column("title", String(100), nullable=False),
    Column("author", String(100)),
    Column("translator", String(100)),
    Column("year", String(100)),
    Column("language", String(100)),
    Column("created_at", DateTime, server_default=func.now()),
    Column("updated_at", DateTime, server_default=func.now(), onupdate=func.now()),
    Column("deleted_at", DateTime),
    Column("deleted", Boolean, default=False),
    )

yijing_text = Table(
    "yijing_text",
    metadata_obj,
    Column("book_id", Integer, primary_key=True, foreign_key=yijing_book_info.c.book_id),
    Column("hexagram", Integer, primary_key=True, nullable=False),
    Column("user_id", Integer, nullable=False, foreign_key=user.c.user_id),
    Column("column_title", String(50), nullable=False),
    Column("column_number", Integer, nullable=False),
    Column("column_text", Text),
    Column("created_at", DateTime, server_default=func.now()),
    Column("updated_at", DateTime, server_default=func.now(), onupdate=func.now()),
    Column("deleted_at", DateTime),
    Column("deleted_permanent", Boolean, default=False),
    )