# MOEX Agent Hub Backend

## Local development
1. Create `.env` from `.env.example` in the repo root.
2. Start services:
   - `docker compose up --build`
3. Run migrations:
   - `docker compose exec api alembic upgrade head`
4. Seed daily quiz questions:
   - `docker compose exec api python -m app.seed.seed_quiz`

## Useful commands
- `docker compose exec api alembic revision --autogenerate -m "message"`
- `docker compose exec api uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

## Authentication
The API validates Keycloak access tokens using token introspection.
Provide `KEYCLOAK_BASE_URL`, `KEYCLOAK_REALM`, `KEYCLOAK_CLIENT_ID`, and
`KEYCLOAK_CLIENT_SECRET` via environment variables.

## Daily quiz
Use `GET /quiz/daily` to retrieve 5 random questions from the 100-question pool.
Questions do not repeat for a user until the pool is exhausted.
