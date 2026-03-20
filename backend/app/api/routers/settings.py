from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from app.api.deps import db_session, get_token_data
from app.models.user import User
from app.schemas.settings import UserSettingsOut

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


def _user_to_settings_out(user: User) -> UserSettingsOut:
    return UserSettingsOut(
        keycloak_sub=user.keycloak_sub,
        email=user.email,
        full_name=user.full_name,
        products=_user_to_products(user),
        models=_user_to_models(user),
        api_key=user.api_key if user.show_api_key else None,
        show_api_key=user.show_api_key,
    )


class UserSelfUpdate(BaseModel):
    full_name: str | None = None


# ---------------------------------------------------------------------------
# GET /api/v1/me/settings
# ---------------------------------------------------------------------------

@router.get("/api/v1/me/settings", response_model=UserSettingsOut)
def get_my_settings(
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> UserSettingsOut:
    sub = token_data.get("sub")
    if not sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing user subject")
    sub = str(sub)

    email = token_data.get("email") or ""
    full_name = token_data.get("name") or token_data.get("preferred_username")

    user = db.execute(select(User).where(User.keycloak_sub == sub)).scalar_one_or_none()

    if user is None:
        # Auto-create user record on first call
        user = User(
            keycloak_sub=sub,
            email=email,
            full_name=full_name,
            api_key=f"moex-agent-{uuid4()}",
        )
        db.add(user)
    else:
        # Update email/name from token if changed in Keycloak
        if email:
            user.email = email
        if full_name:
            user.full_name = full_name
        # Generate API key if missing
        if not user.api_key:
            user.api_key = f"moex-agent-{uuid4()}"

    # Update last_login_at
    user.last_login_at = func.now()

    db.commit()
    db.refresh(user)
    return _user_to_settings_out(user)


# ---------------------------------------------------------------------------
# PATCH /api/v1/me/settings
# ---------------------------------------------------------------------------

@router.patch("/api/v1/me/settings", response_model=UserSettingsOut)
def update_my_settings(
    payload: UserSelfUpdate,
    db: Session = Depends(db_session),
    token_data: dict = Depends(get_token_data),
) -> UserSettingsOut:
    sub = token_data.get("sub")
    if not sub:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing user subject")
    sub = str(sub)

    user = db.execute(select(User).where(User.keycloak_sub == sub)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if payload.full_name is not None:
        user.full_name = payload.full_name

    db.commit()
    db.refresh(user)
    return _user_to_settings_out(user)
