from sqlalchemy import Table, Column, Integer, Boolean, String, Text, DateTime, func, CheckConstraint
from . import metadata_obj, user


reading = Table("reading",
    metadata_obj,
    Column("reading_id", Integer, primary_key=True),
    Column("user_id", Integer, primary_key=True, foreign_key=user.c.user_id),
    Column("created_at", DateTime, server_default=func.now()),
    Column("updated_at", DateTime, server_default=func.now(), onupdate=func.now()),
    Column("deleted_at", DateTime),
    Column("deleted_permanent", Boolean, default=False),
    Column("topic", String(255)),
    Column("notes", Text),
    Column("hexagram_1", Integer,
        CheckConstraint("hexagram_1 >= 1 AND hexagram_1 <= 64"),
        nullable=False),
    Column("hexagram_2", Integer,
        CheckConstraint("hexagram_2 >= 1 AND hexagram_2 <= 64 OR hexagram_2 IS NULL"))

)