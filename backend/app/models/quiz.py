import uuid

from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID

from app.db.base import Base


class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question = Column(Text, nullable=False)
    options = Column(JSONB, nullable=False)
    correct_index = Column(Integer, nullable=False)
    explanation = Column(Text, nullable=False)
    pool = Column(String(32), nullable=False, server_default="daily", index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)


class UserQuizHistory(Base):
    __tablename__ = "user_quiz_history"
    __table_args__ = (
        UniqueConstraint("user_sub", "question_id", name="uq_user_question"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_sub = Column(String(255), nullable=False, index=True)
    question_id = Column(UUID(as_uuid=True), ForeignKey("quiz_questions.id"), nullable=False)
    asked_on = Column(Date, nullable=False, server_default=func.current_date())
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
