import uuid
from datetime import datetime

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# ContentItem
# ---------------------------------------------------------------------------

class ContentItemOut(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    content: str
    type: str
    product: str
    author_sub: str | None = None
    author_name: str
    status: str
    tags: list[str] = Field(default_factory=list)
    likes_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ContentItemFilter(BaseModel):
    type: str | None = None
    product: str | None = None
    search: str | None = None
    page: int = Field(default=1, ge=1)
    per_page: int = Field(default=20, ge=1, le=100)


# ---------------------------------------------------------------------------
# Like
# ---------------------------------------------------------------------------

class LikeStatusOut(BaseModel):
    liked: bool
    likes_count: int


# ---------------------------------------------------------------------------
# Submission
# ---------------------------------------------------------------------------

class SubmissionCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    content: str = Field(..., min_length=1)
    type: str = Field(default="prompt", pattern=r"^(prompt|skill)$")
    product: str = Field(..., min_length=1, max_length=100)


class SubmissionOut(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None = None
    content: str
    type: str
    product: str
    author_sub: str
    author_name: str
    author_email: str | None = None
    status: str
    reviewer_note: str | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SubmissionModerate(BaseModel):
    status: str = Field(..., pattern=r"^(approved|rejected)$")
    reviewer_note: str | None = None
