import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import db_session, get_token_data
from app.models.user import User
from app.schemas.user import UserCreate, UserOut, UserUpdate

router = APIRouter()


def _get_user(db: Session, user_id: uuid.UUID) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(
    payload: UserCreate,
    db: Session = Depends(db_session),
    _token: dict = Depends(get_token_data),
) -> User:
    existing = (
        db.query(User)
        .filter((User.keycloak_sub == payload.keycloak_sub) | (User.email == payload.email))
        .first()
    )
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")

    user = User(
        keycloak_sub=payload.keycloak_sub,
        email=payload.email,
        full_name=payload.full_name,
        roles=payload.roles,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/", response_model=list[UserOut])
def list_users(
    db: Session = Depends(db_session),
    _token: dict = Depends(get_token_data),
) -> list[User]:
    return db.query(User).order_by(User.created_at.desc()).all()


@router.get("/{user_id}", response_model=UserOut)
def get_user(
    user_id: uuid.UUID,
    db: Session = Depends(db_session),
    _token: dict = Depends(get_token_data),
) -> User:
    return _get_user(db, user_id)


@router.patch("/{user_id}", response_model=UserOut)
def update_user(
    user_id: uuid.UUID,
    payload: UserUpdate,
    db: Session = Depends(db_session),
    _token: dict = Depends(get_token_data),
) -> User:
    user = _get_user(db, user_id)
    data = payload.model_dump(exclude_unset=True)
    for key, value in data.items():
        setattr(user, key, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: uuid.UUID,
    db: Session = Depends(db_session),
    _token: dict = Depends(get_token_data),
) -> None:
    user = _get_user(db, user_id)
    db.delete(user)
    db.commit()
