from typing import Any

import httpx
from fastapi import HTTPException, status

from app.core.config import settings


async def introspect_token(token: str) -> dict[str, Any]:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")

    payload = {
        "token": token,
        "client_id": settings.KEYCLOAK_CLIENT_ID,
        "client_secret": settings.KEYCLOAK_CLIENT_SECRET,
    }

    try:
        async with httpx.AsyncClient(timeout=settings.KEYCLOAK_INTROSPECTION_TIMEOUT) as client:
            response = await client.post(settings.KEYCLOAK_INTROSPECTION_URL, data=payload)
        response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Keycloak introspection unavailable",
        ) from exc

    data = response.json()
    if not data.get("active"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Inactive token")

    return data
