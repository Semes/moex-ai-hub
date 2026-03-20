# Database Best Practices -- MOEX Agent Hub

## Описание

Правила работы с PostgreSQL в проекте MOEX Agent Hub. Покрывают проектирование схемы, написание запросов, миграции и оптимизацию. Основаны на официальных рекомендациях PostgreSQL, Bytebase SQL Review Guide и best practices для финансовых систем.

## Общие принципы

1. **Данные -- главный актив** -- целостность данных важнее скорости разработки
2. **Нормализация по умолчанию** -- денормализация только при доказанной необходимости
3. **Миграции как код** -- все изменения схемы через Alembic
4. **Минимальные привилегии** -- каждый сервис получает только необходимый доступ

## Именование

### Таблицы

- Множественное число, snake_case: `users`, `trade_histories`, `quiz_submissions`
- Таблицы связей: `user_roles`, `content_tags` (алфавитный порядок сущностей)
- Запрещено: начинать с подчёркивания, использовать зарезервированные слова SQL

### Колонки

- snake_case: `first_name`, `created_at`, `is_active`
- Primary key: `id` (UUID или BIGINT)
- Foreign key: `{referenced_table_singular}_id` (например, `user_id`, `quiz_id`)
- Булевые: префикс `is_` или `has_` (`is_active`, `has_subscription`)
- Даты: суффикс `_at` (`created_at`, `updated_at`, `deleted_at`)

### Индексы

- `idx_{table}_{columns}` -- обычный индекс
- `uq_{table}_{columns}` -- уникальный индекс
- `pk_{table}` -- primary key
- `fk_{table}_{referenced_table}` -- foreign key

## Типы данных

| Данные | Тип PostgreSQL | Комментарий |
|--------|---------------|-------------|
| ID | `UUID` или `BIGINT` | UUID для распределённых систем |
| Строки до 255 | `VARCHAR(n)` | С ограничением длины |
| Длинный текст | `TEXT` | Без ограничения |
| Целые числа | `INTEGER` / `BIGINT` | BIGINT для финансовых ID |
| Деньги | `NUMERIC(precision, scale)` | НИКОГДА `FLOAT` / `REAL` для денег |
| Дата/время | `TIMESTAMPTZ` | Всегда с timezone |
| Булевы | `BOOLEAN` | Не INTEGER |
| JSON-данные | `JSONB` | Не `JSON` (JSONB индексируется) |
| Перечисления | `VARCHAR` + CHECK или ENUM | ENUM для фиксированных значений |

### Критическое правило для финансовых данных

```sql
-- ЗАПРЕЩЕНО: потеря точности
price FLOAT  -- НИКОГДА для денег!

-- ПРАВИЛЬНО: точное представление
price NUMERIC(18, 8)  -- 18 знаков всего, 8 после запятой
```

## Проектирование схемы

### Обязательные колонки для каждой таблицы

```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

### Soft Delete

- Использовать `deleted_at TIMESTAMPTZ` вместо физического удаления
- Добавлять partial index: `CREATE INDEX ... WHERE deleted_at IS NULL`
- Все запросы по умолчанию фильтруют удалённые записи

### Foreign Keys

- ОБЯЗАТЕЛЬНЫ для связей между таблицами
- Указывать `ON DELETE` действие: `CASCADE`, `SET NULL`, `RESTRICT`
- Для финансовых данных: `ON DELETE RESTRICT` (никогда CASCADE)

### Constraints

- `NOT NULL` по умолчанию (nullable только когда осознанно нужно)
- `CHECK` для валидации на уровне БД (`CHECK (age >= 0)`)
- `UNIQUE` для бизнес-ключей (email, username)

## Запросы

### Правила

- ЗАПРЕЩЕНО: `SELECT *` -- всегда перечислять нужные колонки
- ЗАПРЕЩЕНО: f-строки и конкатенация в SQL (SQL Injection!)
- Использовать `EXPLAIN ANALYZE` для проверки тяжёлых запросов
- Пагинация обязательна для коллекций (`LIMIT` + `OFFSET` или cursor)
- `COUNT(*)` с `LIMIT` для больших таблиц

### Индексация

- Индексы на все колонки в `WHERE`, `JOIN`, `ORDER BY`
- Partial indexes для частых фильтров: `WHERE is_active = true`
- Composite indexes: порядок колонок по селективности (от высокой к низкой)
- Не создавать избыточные индексы (покрываемые другими)
- Мониторить неиспользуемые индексы

### N+1 Problem

```python
# ЗАПРЕЩЕНО: N+1 запросов
users = await session.execute(select(User))
for user in users:
    submissions = await session.execute(
        select(Submission).where(Submission.user_id == user.id)
    )

# ПРАВИЛЬНО: eager loading
query = select(User).options(selectinload(User.submissions))
users = await session.execute(query)
```

## Миграции (Alembic)

### Правила

- Одна миграция -- одно логическое изменение
- Каждая миграция должна иметь `upgrade()` и `downgrade()`
- Тестировать миграции на копии продакшен-данных
- НИКОГДА не редактировать уже применённые миграции
- Описательные имена: `0004_add_portfolio_risk_score.py`

### Безопасные миграции

- Добавление колонки: `ADD COLUMN ... DEFAULT NULL` (не блокирует таблицу)
- Добавление NOT NULL: сначала добавить nullable, заполнить, потом SET NOT NULL
- Удаление колонки: сначала убрать из кода, потом удалить в следующей миграции
- Переименование: создать новую, скопировать, удалить старую (в 3 миграциях)

## Производительность

- Connection pooling: использовать PgBouncer или SQLAlchemy pool
- `pool_size`: 5-20 соединений для типичного сервиса
- `VACUUM ANALYZE` регулярно (не `VACUUM FULL` в продакшене)
- Мониторить `pg_stat_statements` для медленных запросов
- Для больших выборок: cursor-based пагинация вместо OFFSET

## Бэкапы и восстановление

- Автоматические ежедневные бэкапы через `pg_dump` или WAL archiving
- Тестировать восстановление из бэкапа минимум раз в месяц
- Point-in-time recovery (PITR) для критичных данных
- Бэкапы шифровать и хранить в отдельном хранилище
