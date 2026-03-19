import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.api.deps import db_session, get_token_data
from app.models.content import ContentItem
from app.models.like import Like
from app.schemas.content import ContentItemOut, LikeStatusOut

router = APIRouter()


def _get_user_sub(token_data: dict) -> str:
    sub = token_data.get("sub")
    if not sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing user subject")
    return str(sub)


# ---------------------------------------------------------------------------
# GET /api/v1/content  --  list with filters
# ---------------------------------------------------------------------------

@router.get("/api/v1/content", response_model=list[ContentItemOut])
def list_content(
    type: str | None = Query(None),
    product: str | None = Query(None),
    search: str | None = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(db_session),
) -> list[ContentItem]:
    query = select(ContentItem).where(ContentItem.status == "published")

    if type:
        query = query.where(ContentItem.type == type)
    if product:
        query = query.where(ContentItem.product == product)
    if search:
        pattern = f"%{search}%"
        query = query.where(
            or_(
                ContentItem.title.ilike(pattern),
                ContentItem.description.ilike(pattern),
            )
        )

    query = query.order_by(ContentItem.created_at.desc())
    offset = (page - 1) * per_page
    query = query.offset(offset).limit(per_page)

    return list(db.execute(query).scalars().all())


# ---------------------------------------------------------------------------
# GET /api/v1/content/{id}  --  detail
# ---------------------------------------------------------------------------

@router.get("/api/v1/content/{item_id}", response_model=ContentItemOut)
def get_content_item(
    item_id: uuid.UUID,
    db: Session = Depends(db_session),
) -> ContentItem:
    item = db.execute(
        select(ContentItem).where(ContentItem.id == item_id)
    ).scalar_one_or_none()

    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Content item not found")
    return item


# ---------------------------------------------------------------------------
# POST /api/v1/content/{id}/like  --  toggle like (auth required)
# ---------------------------------------------------------------------------

@router.post("/api/v1/content/{item_id}/like", response_model=LikeStatusOut)
def toggle_like(
    item_id: uuid.UUID,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> dict:
    user_sub = _get_user_sub(token_data)

    # Ensure item exists
    item = db.execute(
        select(ContentItem).where(ContentItem.id == item_id)
    ).scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Content item not found")

    # Check existing like
    existing = db.execute(
        select(Like).where(Like.item_id == item_id, Like.user_sub == user_sub)
    ).scalar_one_or_none()

    if existing:
        # Remove like
        db.delete(existing)
        item.likes_count = max((item.likes_count or 0) - 1, 0)
        liked = False
    else:
        # Add like
        db.add(Like(item_id=item_id, user_sub=user_sub))
        item.likes_count = (item.likes_count or 0) + 1
        liked = True

    db.add(item)
    db.commit()
    db.refresh(item)

    return {"liked": liked, "likes_count": item.likes_count}


# ---------------------------------------------------------------------------
# GET /api/v1/content/{id}/like/status  --  check like status (auth required)
# ---------------------------------------------------------------------------

@router.get("/api/v1/content/{item_id}/like/status", response_model=LikeStatusOut)
def get_like_status(
    item_id: uuid.UUID,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> dict:
    user_sub = _get_user_sub(token_data)

    item = db.execute(
        select(ContentItem).where(ContentItem.id == item_id)
    ).scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Content item not found")

    existing = db.execute(
        select(Like).where(Like.item_id == item_id, Like.user_sub == user_sub)
    ).scalar_one_or_none()

    return {"liked": existing is not None, "likes_count": item.likes_count}
