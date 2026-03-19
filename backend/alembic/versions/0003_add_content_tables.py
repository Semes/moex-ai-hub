"""add content tables

Revision ID: 0003_add_content_tables
Revises: 0002_add_quiz_tables
Create Date: 2026-03-18 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0003_add_content_tables"
down_revision = "0002_add_quiz_tables"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # --- content_items ---
    op.create_table(
        "content_items",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("type", sa.String(length=50), nullable=False, server_default="prompt"),
        sa.Column("product", sa.String(length=100), nullable=False),
        sa.Column("author_sub", sa.String(length=255), nullable=True),
        sa.Column("author_name", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="published"),
        sa.Column(
            "tags",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default="[]",
        ),
        sa.Column("likes_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_content_items_type", "content_items", ["type"], unique=False)
    op.create_index("ix_content_items_product", "content_items", ["product"], unique=False)
    op.create_index("ix_content_items_status", "content_items", ["status"], unique=False)

    # --- likes ---
    op.create_table(
        "likes",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("item_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_sub", sa.String(length=255), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.ForeignKeyConstraint(["item_id"], ["content_items.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("item_id", "user_sub", name="uq_like_item_user"),
    )
    op.create_index("ix_likes_item_id", "likes", ["item_id"], unique=False)
    op.create_index("ix_likes_user_sub", "likes", ["user_sub"], unique=False)

    # --- submissions ---
    op.create_table(
        "submissions",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("type", sa.String(length=50), nullable=False, server_default="prompt"),
        sa.Column("product", sa.String(length=100), nullable=False),
        sa.Column("author_sub", sa.String(length=255), nullable=False),
        sa.Column("author_name", sa.String(length=255), nullable=False),
        sa.Column("author_email", sa.String(length=255), nullable=True),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="pending"),
        sa.Column("reviewer_note", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_submissions_author_sub", "submissions", ["author_sub"], unique=False)
    op.create_index("ix_submissions_status", "submissions", ["status"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_submissions_status", table_name="submissions")
    op.drop_index("ix_submissions_author_sub", table_name="submissions")
    op.drop_table("submissions")

    op.drop_index("ix_likes_user_sub", table_name="likes")
    op.drop_index("ix_likes_item_id", table_name="likes")
    op.drop_table("likes")

    op.drop_index("ix_content_items_status", table_name="content_items")
    op.drop_index("ix_content_items_product", table_name="content_items")
    op.drop_index("ix_content_items_type", table_name="content_items")
    op.drop_table("content_items")
