import uuid

from pydantic import BaseModel


class QuizQuestionOut(BaseModel):
    id: uuid.UUID
    question: str
    options: list[str]
    correct_index: int
    explanation: str

    class Config:
        from_attributes = True
