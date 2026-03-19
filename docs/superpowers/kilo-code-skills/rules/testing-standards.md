# Testing Standards -- MOEX AI Hub

## Описание

Стандарты тестирования для проекта MOEX AI Hub. Определяют требования к покрытию тестами, структуру тестов и правила для AI-агента при генерации тестового кода. Тесты -- обязательная часть каждого PR.

## Общие принципы

1. **Тесты -- не опция, а требование** -- код без тестов не проходит review
2. **Тест документирует поведение** -- имя теста описывает ожидаемое поведение
3. **Изоляция** -- тесты не зависят друг от друга и от внешних сервисов
4. **Скорость** -- unit-тесты выполняются за секунды, не минуты

## Пирамида тестирования

```
        /\
       /  \        E2E (5%)
      /----\       Минимум сценариев
     /      \
    /--------\     Integration (25%)
   /          \    API endpoints, DB queries
  /------------\
 /              \  Unit (70%)
/________________\ Бизнес-логика, утилиты, валидация
```

## Unit-тесты

### Правила

- Фреймворк: `pytest`
- Каждый модуль в `app/` имеет соответствующий тест в `tests/unit/`
- Структура тестов отражает структуру кода: `app/core/security.py` -> `tests/unit/core/test_security.py`
- Один тестовый файл -- один тестируемый модуль

### Именование

```python
# Формат: test_{что_делаем}_{при_каких_условиях}_{ожидаемый_результат}
def test_calculate_risk_with_empty_portfolio_returns_zero():
    ...

def test_create_user_with_duplicate_email_raises_conflict():
    ...

def test_validate_trade_with_negative_amount_returns_validation_error():
    ...
```

### Структура теста (AAA -- Arrange, Act, Assert)

```python
def test_hash_password_produces_valid_bcrypt_hash():
    # Arrange
    plain_password = "secure_password_123"

    # Act
    hashed = hash_password(plain_password)

    # Assert
    assert hashed != plain_password
    assert verify_password(plain_password, hashed) is True
```

### Что тестировать

- Happy path: корректные входные данные -> корректный результат
- Edge cases: пустые значения, граничные условия, максимальные значения
- Error cases: невалидные данные, отсутствующие ресурсы, ошибки зависимостей
- Бизнес-правила: специфичные для MOEX расчёты и валидации

## Integration-тесты

### Правила

- Тестируют взаимодействие компонентов (API + DB, сервис + внешний API)
- Используют тестовую базу данных (не продакшен!)
- Каждый тест работает в своей транзакции (откат после теста)
- Файлы в `tests/integration/`

### API-тесты (FastAPI)

```python
@pytest.mark.asyncio
async def test_create_user_returns_201(async_client: AsyncClient):
    # Arrange
    user_data = {"email": "test@moex.com", "username": "testuser"}

    # Act
    response = await async_client.post("/api/v1/users", json=user_data)

    # Assert
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == user_data["email"]
    assert "id" in data
```

## Fixtures и тестовые данные

### Правила

- Fixtures в `conftest.py` (общие) или в тестовом файле (специфичные)
- Factory-паттерн для создания тестовых объектов
- НИКОГДА не использовать реальные данные пользователей
- НИКОГДА не использовать реальные credentials в тестах

```python
@pytest.fixture
def sample_user() -> dict:
    return {
        "email": "test@example.com",
        "username": "test_user",
        "role": "viewer",
    }

@pytest.fixture
async def db_user(session: AsyncSession, sample_user: dict) -> User:
    user = User(**sample_user)
    session.add(user)
    await session.commit()
    return user
```

## Моки и стабы

- `unittest.mock` или `pytest-mock` для мокирования зависимостей
- Мокировать: внешние API, email-сервисы, файловую систему
- НЕ мокировать: бизнес-логику (тестировать как есть)
- Для БД: использовать тестовую БД, не моки

## Покрытие

- Минимальное покрытие: 80% для нового кода
- Критичная бизнес-логика: 95%+ покрытие
- Инструмент: `pytest-cov`
- В CI: проверка покрытия автоматическая, PR блокируется при снижении

## AI-агент: правила генерации тестов

1. При создании нового модуля -- ВСЕГДА создавать тестовый файл
2. Тесты должны быть осмысленными (не просто `assert True`)
3. Покрывать минимум: happy path + 2 error cases
4. Не генерировать тесты, которые тестируют фреймворк (pytest, FastAPI)
5. Использовать fixtures, не дублировать setup в каждом тесте
