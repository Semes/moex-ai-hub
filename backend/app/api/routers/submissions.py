import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import db_session, get_token_data
from app.models.content import ContentItem
from app.models.submission import Submission
from app.schemas.content import SubmissionCreate, SubmissionModerate, SubmissionOut

router = APIRouter()


def _get_user_sub(token_data: dict) -> str:
    sub = token_data.get("sub")
    if not sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing user subject")
    return str(sub)


def _require_admin(token_data: dict) -> None:
    """Raise 403 unless the token carries the 'admin' realm role."""
    roles = token_data.get("realm_access", {}).get("roles", [])
    if "admin" not in roles:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")


# ---------------------------------------------------------------------------
# POST /api/v1/submissions  --  create (auth required)
# ---------------------------------------------------------------------------

@router.post("/api/v1/submissions", response_model=SubmissionOut, status_code=status.HTTP_201_CREATED)
def create_submission(
    payload: SubmissionCreate,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> Submission:
    user_sub = _get_user_sub(token_data)
    author_name = token_data.get("name") or token_data.get("preferred_username") or "Unknown"
    author_email = token_data.get("email")

    submission = Submission(
        title=payload.title,
        description=payload.description,
        content=payload.content,
        type=payload.type,
        product=payload.product,
        author_sub=user_sub,
        author_name=str(author_name),
        author_email=str(author_email) if author_email else None,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


# ---------------------------------------------------------------------------
# GET /api/v1/submissions/my  --  my submissions (auth required)
# ---------------------------------------------------------------------------

@router.get("/api/v1/submissions/my", response_model=list[SubmissionOut])
def list_my_submissions(
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> list[Submission]:
    user_sub = _get_user_sub(token_data)
    rows = db.execute(
        select(Submission)
        .where(Submission.author_sub == user_sub)
        .order_by(Submission.created_at.desc())
    ).scalars().all()
    return list(rows)


# ---------------------------------------------------------------------------
# GET /api/v1/admin/submissions  --  all pending (admin only)
# ---------------------------------------------------------------------------

@router.get("/api/v1/admin/submissions", response_model=list[SubmissionOut])
def list_pending_submissions(
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> list[Submission]:
    _require_admin(token_data)
    rows = db.execute(
        select(Submission)
        .where(Submission.status == "pending")
        .order_by(Submission.created_at.asc())
    ).scalars().all()
    return list(rows)


# ---------------------------------------------------------------------------
# PATCH /api/v1/admin/submissions/{id}  --  approve / reject (admin only)
# ---------------------------------------------------------------------------

@router.patch("/api/v1/admin/submissions/{submission_id}", response_model=SubmissionOut)
def moderate_submission(
    submission_id: uuid.UUID,
    payload: SubmissionModerate,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> Submission:
    _require_admin(token_data)

    submission = db.execute(
        select(Submission).where(Submission.id == submission_id)
    ).scalar_one_or_none()

    if not submission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Submission not found")

    if submission.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Submission already {submission.status}",
        )

    submission.status = payload.status
    submission.reviewer_note = payload.reviewer_note

    # On approve: create a published ContentItem from the Submission
    if payload.status == "approved":
        content_item = ContentItem(
            title=submission.title,
            description=submission.description,
            content=submission.content,
            type=submission.type,
            product=submission.product,
            author_sub=submission.author_sub,
            author_name=submission.author_name,
        )
        db.add(content_item)

    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission
