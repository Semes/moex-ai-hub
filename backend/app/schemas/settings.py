from pydantic import BaseModel


class UserSettingsOut(BaseModel):
    keycloak_sub: str
    email: str | None
    full_name: str | None
    products: dict  # {"moex_gpt": true, ...}
    models: dict  # {"strong": true, ...}
    api_key: str | None  # null if show_api_key=false
    show_api_key: bool


class AdminUserOut(BaseModel):
    keycloak_sub: str
    email: str | None
    full_name: str | None
    products: dict
    models: dict
    api_key: str | None
    show_api_key: bool
    last_login_at: str | None
    created_at: str
    product_count: int  # count of enabled products


class AdminUserUpdate(BaseModel):
    product_moex_gpt: bool | None = None
    product_moex_insight: bool | None = None
    product_code_agent: bool | None = None
    product_dion_agent: bool | None = None
    model_strong: bool | None = None
    model_coder: bool | None = None
    model_tool_caller: bool | None = None
    model_vl: bool | None = None
    model_fast: bool | None = None
    api_key: str | None = None
    show_api_key: bool | None = None


class AdminBatchUpdate(BaseModel):
    keycloak_subs: list[str]
    settings: AdminUserUpdate
