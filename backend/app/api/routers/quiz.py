import uuid
from typing import Sequence

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from app.api.deps import db_session, get_token_data
from app.models.quiz import QuizQuestion, UserQuizHistory
from app.schemas.quiz import QuizQuestionOut

router = APIRouter()


def _get_user_sub(token_data: dict) -> str:
    sub = token_data.get("sub")
    if not sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing user subject")
    return str(sub)


def _select_questions(
    db: Session,
    excluded_ids: Sequence[uuid.UUID],
    limit: int,
) -> list[QuizQuestion]:
    query = select(QuizQuestion).where(QuizQuestion.pool == "daily")
    if excluded_ids:
        query = query.where(QuizQuestion.id.notin_(excluded_ids))
    query = query.order_by(func.random()).limit(limit)
    return list(db.execute(query).scalars().all())


@router.get("/daily", response_model=list[QuizQuestionOut])
def get_daily_quiz(
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> list[QuizQuestion]:
    user_sub = _get_user_sub(token_data)

    used_ids = list(
        db.execute(
            select(UserQuizHistory.question_id).where(UserQuizHistory.user_sub == user_sub)
        )
        .scalars()
        .all()
    )

    questions = _select_questions(db, used_ids, limit=5)

    if len(questions) < 5:
        db.execute(delete(UserQuizHistory).where(UserQuizHistory.user_sub == user_sub))
        db.commit()
        questions = _select_questions(db, [], limit=5)

    if len(questions) < 5:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Not enough questions available",
        )

    db.add_all(
        [
            UserQuizHistory(user_sub=user_sub, question_id=question.id)
            for question in questions
        ]
    )
    db.commit()
    return questions
