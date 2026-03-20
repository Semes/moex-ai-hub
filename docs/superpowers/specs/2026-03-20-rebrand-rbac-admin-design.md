# Design Spec: Rebrand + RBAC + Admin Panel

**Date:** 2026-03-20
**Status:** Approved (rev.2 — addressed 13 review issues)
**Scope:** 3 sub-projects executed in sequence

### Review resolutions (rev.2)
1. **users vs user_settings**: ADD columns to existing `users` table instead of creating new table. No data duplication.
2. **updated_at**: SQLAlchemy `onupdate=func.now()` handles this (existing pattern).
3. **API routing**: Use hardcoded full paths (like submissions.py pattern).
4. **API key format**: `moex-agent-{uuid4}`, stored plain (not hashed — internal network). Regeneration = new UUID, old key invalidated. Part of PATCH endpoint.
5. **Pagination**: `page`, `per_page` (default 20, max 100), `search` (email/name), response: `{items: [], total: int, page: int}`.
6. **No DELETE**: Out of scope. Keycloak deprovisioning is handled by IT ops.
7. **display_name vs full_name**: Use existing `full_name` column, no new field.
8. **Admin role check**: Extract to shared `deps.py` as `require_admin()`.
9. **KEYCLOAK_CLIENT_ID**: Does NOT change (requires Keycloak reconfiguration).
10. **docker-compose.prod.yml**: Exists at project root (Dockerfile.prod references it).
11. **Graceful degradation = by design**: Products are links to external services, no actual data exposure.
12. **Auto-creation defaults**: All products/models ON by default. email + name from Keycloak token.
13. **Batch update**: `{keycloak_subs: string[], settings: Partial<UserSettings>}` — applies same partial update to all listed users.

---

## Sub-project 1: Rebrand "AI Hub" → "Agent Hub"

### What changes
- All user-facing text: `AI Hub` → `Agent Hub`, `MOEX AI Hub` → `MOEX Agent Hub`
- `AI-библиотека` → `Agent-библиотека`
- Code identifiers: `moex-ai-hub` → `moex-agent-hub` (DB name, Docker service names, package names)
- HTML `<title>` tags, meta descriptions, Open Graph tags
- README, docs, commit messages going forward

### What does NOT change
- `AI-продукты` (refers to products, not the Hub)
- `Офис по развитию ИИ` (org name, not Hub name)
- `MOEX AI Team` (author name in marketplace items)
- Color palette, logos, visual design
- Keycloak realm name (`moex`) — too risky to rename

### Files affected
- 6 HTML files (index, library, learn, leaderboard, submit, profile)
- js/app.js (header title, footer)
- js/data.js (news, FAQ answers mentioning "AI Hub")
- css/styles.css (no changes expected)
- docker-compose.yml, docker-compose.prod.yml (service names, DB name)
- backend/app/core/config.py (DATABASE_URL default)
- backend/app/main.py (API title)
- README.md, docs/*.md

### Execution
Single agent, grep-and-replace. ~30 minutes.

---

## Sub-project 2: Role-Based Access Control (RBAC)

### Architecture

```
User → Browser → Agent Hub frontend
                      ↓
              GET /api/v1/me/settings (JWT Bearer token)
                      ↓
              FastAPI Backend
                ├── Validate token via Keycloak introspection
                ├── Lookup/create user_settings in PostgreSQL
                └── Return personalized config JSON
                      ↓
              Frontend applies visibility rules
```

### ALTER existing `users` table (migration 0004)

Add columns to the existing `users` table (no new table needed):

```sql
ALTER TABLE users ADD COLUMN product_moex_gpt BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN product_moex_insight BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN product_code_agent BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN product_dion_agent BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN model_strong BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN model_coder BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN model_tool_caller BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN model_vl BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN model_fast BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN api_key VARCHAR(255);
ALTER TABLE users ADD COLUMN show_api_key BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP WITH TIME ZONE;
```

### Alembic migration: `0004_add_rbac_columns.py`

### New API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/v1/me/settings | User (any) | Returns caller's settings. Auto-creates record on first call. |
| PATCH | /api/v1/me/settings | User (any) | User updates own display_name (limited fields) |

### New Pydantic schemas

```python
class UserSettingsOut(BaseModel):
    keycloak_sub: str
    email: str | None
    display_name: str | None
    products: dict[str, bool]  # {"moex_gpt": true, "moex_insight": false, ...}
    models: dict[str, bool]    # {"strong": true, "coder": true, ...}
    api_key: str | None        # null if show_api_key=false
    show_api_key: bool
```

### Frontend behavior

**On every page load** (in app.js DOMContentLoaded):
1. Try `GET /api/v1/me/settings`
2. If success → store in `window._userSettings`
3. If fail (401, network error) → `window._userSettings = null` (static mode, show everything)

**Product cards** (index.html):
- If `_userSettings.products.moex_insight === false`:
  - Card gets `opacity: 0.4; pointer-events: none;`
  - Badge overlay: "Пока недоступно"
  - Button disabled

**Library** (library.html):
- Product filter hides disabled products
- Items for disabled products not shown

**Profile** (profile.html):
- Models section shows only enabled models
- API key shows real key from `_userSettings.api_key`
- If `show_api_key === false` → entire API section hidden

**Learn** (learn.html):
- Capabilities cards for disabled products hidden

### Graceful degradation
If backend unavailable → everything visible (current behavior). No breaking changes for static deployment.

---

## Sub-project 3: Admin Panel

### Page: admin.html

Accessible only to users with `admin` role in Keycloak JWT (`realm_access.roles` includes "admin").

If non-admin navigates to admin.html → redirect to index.html.

### Layout

```
┌─────────────────────────────────────────────┐
│ MOEX Agent Hub — Панель администратора       │
├─────────────────────────────────────────────┤
│ [Поиск по email/имени...]                    │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ user@moex.com  │ Иван П. │ 4 продукта │→│ │
│ │ user@nsd.ru    │ Мария К. │ 2 продукта │→│ │
│ │ dev@moex.com   │ Алексей  │ 4 продукта │→│ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ [Выбрать несколько] [Применить шаблон ▼]     │
├─────────────────────────────────────────────┤
│ КАРТОЧКА ПОЛЬЗОВАТЕЛЯ (при клике):           │
│                                              │
│ Продукты:                                    │
│   ☑ MOEX GPT  ☑ Code Agent                  │
│   ☐ MOEX Insight  ☑ Dion Agent              │
│                                              │
│ Модели:                                      │
│   ☑ strong  ☑ coder  ☑ tool_caller          │
│   ☐ vl  ☑ fast                              │
│                                              │
│ API: [moex-ai-xxx...xxx] [Сгенерировать]     │
│   ☑ Показывать API-ключ                      │
│                                              │
│ [Сохранить]                                  │
└─────────────────────────────────────────────┘
```

### API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/v1/admin/users | Admin | List all users with settings (paginated, searchable) |
| GET | /api/v1/admin/users/{sub} | Admin | Get specific user's settings |
| PATCH | /api/v1/admin/users/{sub} | Admin | Update user's products/models/api_key/show_api_key |
| POST | /api/v1/admin/users/batch | Admin | Batch update multiple users with same settings |

### Admin role check
```python
def require_admin(token_data: dict):
    roles = token_data.get("realm_access", {}).get("roles", [])
    if "admin" not in roles:
        raise HTTPException(403, "Admin role required")
```

### Batch templates (frontend-only presets)
Stored in JS, not in DB:
- "Полный доступ" — all products + models on
- "Базовый" — GPT + Dion only, fast + strong models
- "Разработчик" — all products + all models
- "NSD" — GPT + Dion, no Insight, no Code Agent

---

## Implementation order

1. **Rebrand** (no dependencies, safe first step)
2. **DB migration + API endpoints** (backend work)
3. **Frontend settings integration** (depends on 2)
4. **Admin page** (depends on 2)
5. **Profile page update** (depends on 2 + 3)

## Risks

- **Keycloak unavailable in dev** → graceful degradation already designed
- **Migration on existing data** → new table, no destructive changes
- **Static deployment** → works without backend, just shows everything
