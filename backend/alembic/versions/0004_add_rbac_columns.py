"""add rbac columns

Revision ID: 0004_add_rbac_columns
Revises: 0003_add_content_tables
Create Date: 2026-03-20 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = "0004_add_rbac_columns"
down_revision = "0003_add_content_tables"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Product access
    op.add_column("users", sa.Column("product_moex_gpt", sa.Boolean(), nullable=False, server_default="true"))
    op.add_column("users", sa.Column("product_moex_insight", sa.Boolean(), nullable=False, server_default="true"))
    op.add_column("users", sa.Column("product_code_agent", sa.Boolean(), nullable=False, server_default="true"))
    op.add_column("users", sa.Column("product_dion_agent", sa.Boolean(), nullable=False, server_default="true"))

    # Model access
    op.add_column("users", sa.Column("model_strong", sa.Boolean(), nullable=False, server_default="true"))
    op.add_column("users", sa.Column("model_coder", sa.Boolean(), nullable=False, server_default="true"))
    op.add_column("users", sa.Column("model_tool_caller", sa.Boolean(), nullable=False, server_default="true"))
    op.add_column("users", sa.Column("model_vl", sa.Boolean(), nullable=False, server_default="true"))
    op.add_column("users", sa.Column("model_fast", sa.Boolean(), nullable=False, server_default="true"))

    # API key
    op.add_column("users", sa.Column("api_key", sa.String(255), nullable=True))
    op.add_column("users", sa.Column("show_api_key", sa.Boolean(), nullable=False, server_default="true"))

    # Tracking
    op.add_column("users", sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "last_login_at")
    op.drop_column("users", "show_api_key")
    op.drop_column("users", "api_key")
    op.drop_column("users", "model_fast")
    op.drop_column("users", "model_vl")
    op.drop_column("users", "model_tool_caller")
    op.drop_column("users", "model_coder")
    op.drop_column("users", "model_strong")
    op.drop_column("users", "product_dion_agent")
    op.drop_column("users", "product_code_agent")
    op.drop_column("users", "product_moex_insight")
    op.drop_column("users", "product_moex_gpt")
