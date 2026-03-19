# MOEX AI Hub — Целевая архитектура

**Дата:** 2026-03-18

## Схема сервисов

```
                    MOEX Internal Network (air-gapped)
                    ┌─────────────────────────────────────────┐
                    │                                         │
                    │   ┌───────────┐                         │
User Browser  ──────┼──>│  nginx    │ :80 / :443              │
                    │   │ (frontend)│                         │
                    │   │           │──── /api/* ─────┐       │
                    │   │ static    │                 │       │
                    │   │ HTML/JS/  │                 ▼       │
                    │   │ CSS       │         ┌──────────┐    │
                    │   └───────────┘         │   api    │    │
                    │                         │ (FastAPI)│    │
                    │                         │  :8000   │    │
                    │   ┌───────────┐         │          │    │
                    │   │ Keycloak  │<────────│ token    │    │
                    │   │           │  intro- │ check    │    │
                    │   └───────────┘  spect  └────┬─────┘    │
                    │      (cached)                │          │
                    │                              ▼          │
                    │                       ┌──────────┐      │
                    │                       │   db     │      │
                    │                       │(Postgres)│      │
                    │                       │  :5432   │      │
                    │                       │ INTERNAL │      │
                    │                       │  ONLY    │      │
                    │                       └──────────┘      │
                    └─────────────────────────────────────────┘
```

## ER-диаграмма (ключевые таблицы)

```
products (5 шт)
    │ 1:N
    ▼
content_items ◄── tags (N:M через content_item_tags)
    │
    ├── artifacts (1:N) — .yaml, .md, .json файлы для скачивания
    ├── likes (1:N) — серверные лайки (user_sub + item_id UNIQUE)
    └── content_views (1:N) — аналитика: view/copy/download

submissions — предложения пользователей → модерация → content_items
faq_items — FAQ с категориями
guides, glossary_terms, community_channels, news — справочники
analytics_events (BIGSERIAL) — page_view, search, filter, quiz_*
quiz_questions → user_quiz_history (+ selected_index, is_correct)
users (+ department, avatar_url)
```

## Content Type ENUM

```
prompt, skill_custom_mode, skill_rules, skill_mcp,
skill_starter_kit, checklist, n8n_workflow
```

## API Map (/api/v1/)

```
GET  products, content, content/{id}, content/newest
GET  content/{id}/artifacts/{aid}/download, content/{id}/starter-kit
POST content/{id}/like
POST submissions
GET  quiz/daily (без correct_index), POST quiz/answer, GET quiz/stats
GET  leaderboard, faq, guides, glossary, channels, news, stats/summary
POST analytics/event
```

## Frontend модули (Vanilla JS)

```
config.js → api.js → auth.js → likes.js → quiz.js → analytics.js
                                    ↓
                              app.js (Toast, Dialog, Header, Footer)
                                    ↓
                              icons.js (SVG)
```

## Фазы реализации

- **Phase 0** (1-2 дня): Tailwind CDN→локальный, pin deps, nginx proxy, security fixes
- **Phase 1** (3-5 дней): FAQ, Quiz UI, скачивание, реальные скиллы, n8n/RAG
- **Phase 2** (5-7 дней): 12 новых таблиц, 12 API-роутеров, frontend→API
- **Phase 3** (ongoing): расширение библиотеки, Starter Kits
- **Phase 4** (2-3 дня): бэкапы, runbook, RBAC, комплаенс
