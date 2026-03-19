from fastapi import APIRouter, Depends

from app.api.deps import get_token_data
from app.schemas.user import TokenIntrospection

router = APIRouter()


@router.get("/me", response_model=TokenIntrospection)
async def read_me(token_data: dict = Depends(get_token_data)) -> TokenIntrospection:
    return TokenIntrospection(
        active=bool(token_data.get("active")),
        sub=token_data.get("sub"),
        email=token_data.get("email"),
        username=token_data.get("username"),
        data=token_data,
    )
