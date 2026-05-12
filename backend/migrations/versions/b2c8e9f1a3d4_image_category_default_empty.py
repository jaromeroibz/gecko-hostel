"""image_assets category default empty string

Revision ID: b2c8e9f1a3d4
Revises: 947fa1188a3b
Create Date: 2026-05-06

"""
from alembic import op
import sqlalchemy as sa


revision = "b2c8e9f1a3d4"
down_revision = "947fa1188a3b"
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column(
        "image_assets",
        "category",
        server_default="",
        existing_type=sa.String(length=80),
        existing_nullable=False,
    )


def downgrade():
    op.alter_column(
        "image_assets",
        "category",
        server_default="general",
        existing_type=sa.String(length=80),
        existing_nullable=False,
    )
