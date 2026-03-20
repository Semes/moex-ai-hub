from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.api.deps import db_session, get_token_data, require_admin
from app.models.user import User
from app.schemas.settings import AdminBatchUpdate, AdminUserOut, AdminUserUpdate

router = APIRouter()


def _user_to_products(user: User) -> dict:
    return {
        "moex_gpt": user.product_moex_gpt,
        "moex_insight": user.product_moex_insight,
        "code_agent": user.product_code_agent,
        "dion_agent": user.product_dion_agent,
    }


def _user_to_models(user: User) -> dict:
    return {
        "strong": user.model_strong,
        "coder": user.model_coder,
        "tool_caller": user.model_tool_caller,
        "vl": user.model_vl,
        "fast": user.model_fast,
    }


def _product_count(user: User) -> int:
    return sum([
        user.product_moex_gpt,
        user.product_moex_insight,
        user.product_code_agent,
        user.product_dion_agent,
    ])


def _user_to_admin_out(user: User) -> AdminUserOut:
    return AdminUserOut(
        keycloak_sub=user.keycloak_sub,
        email=user.email,
        full_name=user.full_name,
        products=_user_to_products(user),
        models=_user_to_models(user),
        api_key=user.api_key,
        show_api_key=user.show_api_key,
        last_login_at=user.last_login_at.isoformat() if user.last_login_at else None,
        created_at=user.created_at.isoformat(),
        product_count=_product_count(user),
    )


def _apply_update(user: User, update: AdminUserUpdate) -> None:
    """Apply non-None fields from update to user."""
    for field, value in update.model_dump(exclude_none=True).items():
        setattr(user, field, value)


# ---------------------------------------------------------------------------
# GET /api/v1/admin/users  --  list users (paginated, searchable)
# ---------------------------------------------------------------------------

@router.get("/api/v1/admin/users")
def list_users(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: str = Query("", max_length=200),
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> dict:
    require_admin(token_data)

    query = select(User)
    count_query = select(func.count(User.id))

    if search:
        pattern = f"%{search}%"
        filter_clause = or_(
            User.email.ilike(pattern),
            User.full_name.ilike(pattern),
        )
        query = query.where(filter_clause)
        count_query = count_query.where(filter_clause)

    total = db.execute(count_query).scalar() or 0

    offset = (page - 1) * per_page
    users = db.execute(
        query.order_by(User.created_at.desc()).offset(offset).limit(per_page)
    ).scalars().all()

    return {
        "items": [_user_to_admin_out(u) for u in users],
        "total": total,
        "page": page,
    }


# ---------------------------------------------------------------------------
# GET /api/v1/admin/users/{sub}  --  get user settings
# ---------------------------------------------------------------------------

@router.get("/api/v1/admin/users/{sub}", response_model=AdminUserOut)
def get_user(
    sub: str,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> AdminUserOut:
    require_admin(token_data)

    user = db.execute(select(User).where(User.keycloak_sub == sub)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return _user_to_admin_out(user)


# ---------------------------------------------------------------------------
# PATCH /api/v1/admin/users/{sub}  --  update user settings
# ---------------------------------------------------------------------------

@router.patch("/api/v1/admin/users/{sub}", response_model=AdminUserOut)
def update_user(
    sub: str,
    payload: AdminUserUpdate,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> AdminUserOut:
    require_admin(token_data)

    user = db.execute(select(User).where(User.keycloak_sub == sub)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    _apply_update(user, payload)
    db.commit()
    db.refresh(user)
    return _user_to_admin_out(user)


# ---------------------------------------------------------------------------
# POST /api/v1/admin/users/batch  --  batch update
# ---------------------------------------------------------------------------

@router.post("/api/v1/admin/users/batch")
def batch_update_users(
    payload: AdminBatchUpdate,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> dict:
    require_admin(token_data)

    users = db.execute(
        select(User).where(User.keycloak_sub.in_(payload.keycloak_subs))
    ).scalars().all()

    updated = []
    for user in users:
        _apply_update(user, payload.settings)
        updated.append(user.keycloak_sub)

    db.commit()

    return {
        "updated": len(updated),
        "keycloak_subs": updated,
    }
