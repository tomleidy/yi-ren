"""create table readings

Revision ID: fe7a5508a117
Revises:
Create Date: 2023-12-06 19:43:26.038137

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'fe7a5508a117'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE readings (
            reading_id SERIAL PRIMARY KEY,
            created_at TIMESTAMP NOT NULL,
            hexagram_primary INT NOT NULL,
            hexagram_secondary INT,
            topic TEXT DEFAULT '',
            user_id INT NOT NULL,
            client_id INT NOT NULL,
            reading_notes TEXT DEFAULT '',
            yijing_translation TEXT DEFAULT ''
        );
    """)


def downgrade() -> None:
    op.execute("DROP TABLE readings;")
