import uuid
from typing import Any

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    keycloak_sub: str
    email: EmailStr
    full_name: str | None = None
    roles: list[str] = Field(default_factory=list)


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    roles: list[str] | None = None


class UserOut(UserBase):
    id: uuid.UUID

    class Config:
        from_attributes = True


class TokenIntrospection(BaseModel):
    active: bool
    sub: str | None = None
    email: str | None = None
    username: str | None = None
    data: dict[str, Any] = Field(default_factory=dict)
