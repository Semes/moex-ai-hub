from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import admin, auth, content, health, quiz
from app.api.routers import settings as settings_router
from app.api.routers import submissions, users
from app.core.config import settings


def _build_cors_origins() -> list[str]:
    if settings.CORS_ORIGINS == "*":
        return ["*"]
    return [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]


app = FastAPI(title="MOEX Agent Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_build_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(quiz.router, prefix="/quiz", tags=["quiz"])
app.include_router(content.router, tags=["content"])
app.include_router(submissions.router, tags=["submissions"])
app.include_router(settings_router.router, tags=["settings"])
app.include_router(admin.router, tags=["admin"])
