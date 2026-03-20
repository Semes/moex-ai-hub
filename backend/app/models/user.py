import uuid

from sqlalchemy import Boolean, Column, DateTime, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    keycloak_sub = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(255), nullable=True)
    roles = Column(JSONB, nullable=False, server_default="[]")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Product access
    product_moex_gpt = Column(Boolean, nullable=False, default=True, server_default="true")
    product_moex_insight = Column(Boolean, nullable=False, default=True, server_default="true")
    product_code_agent = Column(Boolean, nullable=False, default=True, server_default="true")
    product_dion_agent = Column(Boolean, nullable=False, default=True, server_default="true")

    # Model access
    model_strong = Column(Boolean, nullable=False, default=True, server_default="true")
    model_coder = Column(Boolean, nullable=False, default=True, server_default="true")
    model_tool_caller = Column(Boolean, nullable=False, default=True, server_default="true")
    model_vl = Column(Boolean, nullable=False, default=True, server_default="true")
    model_fast = Column(Boolean, nullable=False, default=True, server_default="true")

    # API key
    api_key = Column(String(255), nullable=True)
    show_api_key = Column(Boolean, nullable=False, default=True, server_default="true")

    # Tracking
    last_login_at = Column(DateTime(timezone=True), nullable=True)
