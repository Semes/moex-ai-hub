"""add quiz tables

Revision ID: 0002_add_quiz_tables
Revises: 0001_create_users_table
Create Date: 2026-02-08 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0002_add_quiz_tables"
down_revision = "0001_create_users_table"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "quiz_questions",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("question", sa.Text(), nullable=False),
        sa.Column("options", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("correct_index", sa.Integer(), nullable=False),
        sa.Column("explanation", sa.Text(), nullable=False),
        sa.Column("pool", sa.String(length=32), nullable=False, server_default="daily"),
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
    op.create_index("ix_quiz_questions_pool", "quiz_questions", ["pool"], unique=False)

    op.create_table(
        "user_quiz_history",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("user_sub", sa.String(length=255), nullable=False),
        sa.Column("question_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column(
            "asked_on",
            sa.Date(),
            nullable=False,
            server_default=sa.text("CURRENT_DATE"),
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.ForeignKeyConstraint(["question_id"], ["quiz_questions.id"]),
        sa.UniqueConstraint("user_sub", "question_id", name="uq_user_question"),
    )
    op.create_index("ix_user_quiz_history_user_sub", "user_quiz_history", ["user_sub"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_user_quiz_history_user_sub", table_name="user_quiz_history")
    op.drop_table("user_quiz_history")
    op.drop_index("ix_quiz_questions_pool", table_name="quiz_questions")
    op.drop_table("quiz_questions")
