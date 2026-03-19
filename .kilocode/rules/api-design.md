# API Design Rules -- MOEX AI Hub

## Описание

Правила проектирования REST API для MOEX AI Hub. Обеспечивают консистентность, безопасность и удобство интеграции. Основаны на Microsoft REST API Guidelines, OpenAPI Specification и практиках финансовых API.

## Общие принципы

1. **API-first подход** -- сначала контракт (OpenAPI), потом реализация
2. **Консистентность** -- одинаковые паттерны во всех эндпоинтах
3. **Обратная совместимость** -- не ломать существующих клиентов
4. **Документация как код** -- OpenAPI/Swagger всегда актуален

## URL и ресурсы

### Именование

- Ресурсы -- существительные во множественном числе: `/users`, `/trades`, `/portfolios`
- Иерархия через вложенность: `/users/{id}/submissions`
- Версионирование в URL: `/api/v1/users`
- Только lowercase, слова разделять дефисами: `/market-data`, `/trade-history`

### HTTP-методы

| Метод | Назначение | Идемпотентность |
|-------|-----------|-----------------|
| GET | Получение ресурса/коллекции | Да |
| POST | Создание ресурса | Нет |
| PUT | Полное обновление ресурса | Да |
| PATCH | Частичное обновление ресурса | Нет |
| DELETE | Удаление ресурса | Да |

### Правила

- GET никогда не изменяет состояние сервера
- POST для создания новых ресурсов, возвращает 201 + Location header
- PUT требует передачи полного объекта
- PATCH -- только изменяемые поля
- DELETE возвращает 204 No Content при успехе

## Коды ответов

### Успешные

- `200 OK` -- стандартный успешный ответ
- `201 Created` -- ресурс создан (POST)
- `204 No Content` -- успех без тела (DELETE, PUT)

### Клиентские ошибки

- `400 Bad Request` -- невалидные входные данные
- `401 Unauthorized` -- не аутентифицирован
- `403 Forbidden` -- нет прав доступа
- `404 Not Found` -- ресурс не найден
- `409 Conflict` -- конфликт состояния
- `422 Unprocessable Entity` -- валидация не пройдена
- `429 Too Many Requests` -- rate limit превышен

### Серверные ошибки

- `500 Internal Server Error` -- непредвиденная ошибка
- `503 Service Unavailable` -- сервис временно недоступен

## Формат ответа

### Успешный ответ (единичный ресурс)

```json
{
  "id": "uuid-string",
  "type": "user",
  "attributes": { ... },
  "created_at": "2026-03-18T10:30:00Z",
  "updated_at": "2026-03-18T10:30:00Z"
}
```

### Успешный ответ (коллекция)

```json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

### Ответ об ошибке

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Описание ошибки для пользователя",
    "details": [
      {
        "field": "email",
        "message": "Некорректный формат email"
      }
    ]
  }
}
```

## Пагинация

- Offset-based: `?page=2&per_page=20` (по умолчанию для MOEX AI Hub)
- Cursor-based: `?cursor=abc123&limit=20` (для real-time данных)
- Значения по умолчанию: `page=1`, `per_page=20`
- Максимум на страницу: `per_page <= 100`
- Всегда возвращать метаданные пагинации

## Фильтрация и сортировка

- Фильтрация через query params: `?status=active&role=admin`
- Поиск: `?q=search_term` или `?search=search_term`
- Сортировка: `?sort=created_at&order=desc`
- Множественная сортировка: `?sort=status,-created_at` (минус = desc)

## Безопасность API

- Аутентификация: Bearer JWT в заголовке `Authorization`
- Rate limiting: возвращать заголовки `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- CORS: явный whitelist доменов
- Не передавать чувствительные данные в URL (query params логируются)
- Валидация Content-Type на всех POST/PUT/PATCH запросах
- Request ID: генерировать `X-Request-Id` для трассировки

## FastAPI-специфичные правила

- Использовать `APIRouter` для группировки эндпоинтов
- Pydantic-модели для request/response (не dict)
- Dependency Injection для аутентификации и общих зависимостей
- `response_model` на каждом эндпоинте для документации
- Tags для группировки в Swagger UI
- `summary` и `description` для каждого эндпоинта

```python
@router.get(
    "/users/{user_id}",
    response_model=UserResponse,
    summary="Получить пользователя",
    description="Возвращает данные пользователя по ID",
    tags=["users"],
)
async def get_user(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserResponse:
    ...
```
