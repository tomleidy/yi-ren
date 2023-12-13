"""add default user (development)

Revision ID: b2032e2f2ca1
Revises: d8b7b5cafe09
Create Date: 2023-12-12 18:53:12.736573

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker

import os
from dotenv import load_dotenv
from models.user import User

load_dotenv()


# revision identifiers, used by Alembic.
revision: str = 'b2032e2f2ca1'
down_revision: Union[str, None] = 'd8b7b5cafe09'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    if os.environ.get('ENVIRONMENT') == 'development':
        bind = op.get_bind()
        Session = sessionmaker(bind=bind)
        session = Session()
        default_user = User(username="defaultuser",
                            chosen_personal_name="default")
        session.add(default_user)
        session.commit()


def downgrade() -> None:
    if os.environ.get('ENVIRONMENT') == 'development':
        bind = op.get_bind()
        Session = sessionmaker(bind=bind)
        session = Session()
        session.query(User).filter_by(username="defaultuser").delete()
        session.commit()
