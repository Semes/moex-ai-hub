import uuid

from sqlalchemy import Column, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID

from app.db.base import Base


class ContentItem(Base):
    __tablename__ = "content_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    type = Column(String(50), nullable=False, server_default="prompt")
    product = Column(String(100), nullable=False)
    author_sub = Column(String(255), nullable=True)
    author_name = Column(String(255), nullable=False)
    status = Column(String(20), nullable=False, server_default="published")
    tags = Column(JSONB, nullable=False, server_default="[]")
    likes_count = Column(Integer, nullable=False, server_default="0")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
