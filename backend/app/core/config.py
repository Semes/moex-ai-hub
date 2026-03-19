from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/moex_ai_hub"
    CORS_ORIGINS: str = "*"

    KEYCLOAK_BASE_URL: str = "https://keycloak.example.com"
    KEYCLOAK_REALM: str = "moex"
    KEYCLOAK_CLIENT_ID: str = "moex-ai-hub-api"
    KEYCLOAK_CLIENT_SECRET: str = "change-me"
    KEYCLOAK_INTROSPECTION_TIMEOUT: float = 5.0

    @property
    def KEYCLOAK_INTROSPECTION_URL(self) -> str:
        base = self.KEYCLOAK_BASE_URL.rstrip("/")
        return f"{base}/realms/{self.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect"


settings = Settings()
