# Content Storage + Frontend Fixes — Design Spec

**Date:** 2026-03-18

## Problem
1. Промпты/скиллы захардкожены в `data.js` — нет возможности добавлять через UI
2. Submit-форма фейковая — данные теряются
3. Фронтенд: `truncate` не работает в leaderboard, текст переносится на карточках

## Design

### Backend: модель данных

**Новые таблицы (миграция 0003):**

```sql
-- Единая таблица для промптов, скиллов, чеклистов
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'prompt',  -- prompt, skill
  product VARCHAR(100) NOT NULL,  -- "MOEX GPT", "Dion Agent", etc.
  author_sub VARCHAR(255),  -- keycloak_sub автора
  author_name VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'published',  -- draft, pending, published, rejected
  tags JSONB DEFAULT '[]',
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Серверные лайки
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
  user_sub VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(item_id, user_sub)
);

-- Предложения пользователей (до модерации)
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'prompt',
  product VARCHAR(100) NOT NULL,
  author_sub VARCHAR(255) NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',  -- pending, approved, rejected
  reviewer_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**API эндпоинты:**

```
GET  /api/v1/content?type=&product=&search=&page=&per_page=  -- библиотека
GET  /api/v1/content/{id}  -- деталь
POST /api/v1/content/{id}/like  -- toggle лайк (auth)
GET  /api/v1/content/{id}/like/status  -- проверить лайк
POST /api/v1/submissions  -- submit промпта (auth)
GET  /api/v1/admin/submissions  -- pending (admin)
PATCH /api/v1/admin/submissions/{id}  -- approve/reject (admin)
```

**Ролевая модель:**
- Admin: `users.roles` содержит `"admin"` → может модерировать
- User: обычный пользователь → может submit и лайкать

### Frontend fixes

1. Добавить `.truncate` в styles.css
2. Проверить все карточки — описания продуктов, промптов
3. Убрать обрезку где должно быть полное описание

### Seed: миграция data.js → content_items

Скрипт `seed_content.py` читает текущий `data.js` формат из JSON и вставляет в content_items.

## Approach
- Единая таблица `content_items` (не отдельные для промптов/скиллов)
- `submissions` отдельно от `content_items` — модерация до публикации
- Фронт продолжает работать на data.js пока бэкенд не готов (graceful fallback)
