# MCP-серверы для MOEX AI Hub -- Руководство

**Дата:** 2026-03-18
**Контекст:** Air-gapped deployment, Kilo Code, STDIO транспорт
**Конфигурация:** `.kilocode/mcp.json` в корне проекта

---

## Обзор архитектуры

Все рекомендуемые MCP-серверы работают по **STDIO транспорту** -- запускаются как локальные процессы, не требуют интернета, данные не покидают периметр. Это критически важно для air-gapped среды Московской биржи.

```
Kilo Code (VS Code) <--STDIO--> MCP Server (локальный процесс)
                                      |
                                 Файлы / Git / БД / Память
```

---

## 1. Filesystem -- доступ к файлам

| Поле | Значение |
|------|----------|
| **Пакет** | `@modelcontextprotocol/server-filesystem` |
| **Транспорт** | STDIO (npx) |
| **Тип** | Node.js |
| **Репозиторий** | github.com/modelcontextprotocol/servers/tree/main/src/filesystem |

### Что делает

Безопасный доступ к файловой системе с настраиваемыми ограничениями. Агент может читать, писать, искать файлы и перемещаться по директориям -- но только в пределах явно разрешённых путей.

### Доступные инструменты

- `read_file` -- чтение файла
- `read_multiple_files` -- пакетное чтение
- `write_file` -- запись файла
- `edit_file` -- редактирование с diff
- `create_directory` -- создание директории
- `list_directory` -- листинг содержимого
- `move_file` -- перемещение/переименование
- `search_files` -- поиск по паттерну
- `get_file_info` -- метаданные файла
- `list_allowed_directories` -- список разрешённых директорий

### Установка (air-gapped)

```bash
# Скачать заранее на машине с интернетом:
npm pack @modelcontextprotocol/server-filesystem
# Перенести .tgz на целевую машину и установить:
npm install -g modelcontextprotocol-server-filesystem-*.tgz
```

### Конфигурация Kilo Code

```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/workspace/moex-ai-hub",
      "/workspace/docs",
      "/workspace/configs"
    ],
    "env": {},
    "alwaysAllow": [
      "read_file",
      "read_multiple_files",
      "list_directory",
      "search_files",
      "get_file_info",
      "list_allowed_directories"
    ],
    "disabled": false
  }
}
```

### Почему актуален для MOEX

- Навигация по конфигам торговых систем
- Чтение логов и конфигурационных файлов
- Безопасный sandbox -- агент не выйдет за пределы разрешённых директорий
- Автоматизация рутинных файловых операций

---

## 2. Git -- работа с репозиториями

| Поле | Значение |
|------|----------|
| **Пакет** | `mcp-server-git` (PyPI) |
| **Транспорт** | STDIO (uvx / python) |
| **Тип** | Python |
| **Репозиторий** | github.com/modelcontextprotocol/servers/tree/main/src/git |

### Что делает

Полноценная работа с Git-репозиториями: просмотр истории, создание коммитов, управление ветками, diff-анализ. Все операции выполняются локально.

### Доступные инструменты

- `git_status` -- текущее состояние репозитория
- `git_diff_unstaged` -- незафиксированные изменения
- `git_diff_staged` -- изменения в staging
- `git_diff` -- diff между ветками/коммитами
- `git_commit` -- создание коммита
- `git_log` -- история коммитов
- `git_show` -- детали коммита
- `git_create_branch` -- создание ветки
- `git_checkout` -- переключение веток
- `git_list_branches` -- список веток
- `git_search` -- поиск по содержимому

### Установка (air-gapped)

```bash
# Вариант A: через uv (рекомендуется)
pip download mcp-server-git -d ./packages/
# Перенести на целевую машину:
pip install --no-index --find-links=./packages/ mcp-server-git

# Вариант B: через pip напрямую
pip install mcp-server-git
```

### Конфигурация Kilo Code

```json
{
  "git": {
    "command": "uvx",
    "args": [
      "mcp-server-git",
      "--repository",
      "/workspace/moex-ai-hub"
    ],
    "env": {},
    "alwaysAllow": [
      "git_status",
      "git_log",
      "git_diff",
      "git_diff_staged",
      "git_show",
      "git_list_branches"
    ],
    "disabled": false
  }
}
```

**Альтернативная конфигурация (через Python):**

```json
{
  "git": {
    "command": "python",
    "args": [
      "-m",
      "mcp_server_git",
      "--repository",
      "/workspace/moex-ai-hub"
    ]
  }
}
```

### Почему актуален для MOEX

- Code review через AI-ассистента
- Анализ истории изменений в торговых системах
- Автоматизация рутинных git-операций
- Безопасная работа с ветками (read-only инструменты в alwaysAllow)

---

## 3. PostgreSQL -- доступ к базам данных

| Поле | Значение |
|------|----------|
| **Пакет** | `@modelcontextprotocol/server-postgres` |
| **Транспорт** | STDIO (npx) |
| **Тип** | Node.js |
| **Репозиторий** | github.com/modelcontextprotocol/servers/tree/main/src/postgres |

### Что делает

Безопасный read-only доступ к PostgreSQL. Все запросы выполняются внутри read-only транзакции -- агент не может изменить данные. Автоматически извлекает схему таблиц.

### Доступные инструменты

- `query` -- выполнение SQL-запроса (read-only)

### Ресурсы (автообнаружение)

- Схема каждой таблицы: имена колонок, типы данных, ограничения

### Установка (air-gapped)

```bash
npm pack @modelcontextprotocol/server-postgres
# Перенести на целевую машину:
npm install -g modelcontextprotocol-server-postgres-*.tgz
```

### Конфигурация Kilo Code

```json
{
  "postgres": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-postgres",
      "postgresql://moex_reader:${DB_PASSWORD}@localhost:5432/moex_ai_hub"
    ],
    "env": {
      "DB_PASSWORD": ""
    },
    "alwaysAllow": [
      "query"
    ],
    "disabled": true
  }
}
```

### Безопасность

- Рекомендуется создать отдельного пользователя с правами `SELECT ONLY`
- Пароль передаётся через `env` или переменную окружения `PGPASSWORD`
- Все запросы выполняются в read-only транзакции
- Сервер отключен по умолчанию (`"disabled": true`) -- включать явно после настройки доступа

### Почему актуален для MOEX

- Анализ данных торговых систем через SQL
- Исследование схемы БД без ручного подключения
- Построение отчётов по данным из PostgreSQL
- Безопасность: read-only транзакции, отдельный пользователь

---

## 4. Memory (Knowledge Graph) -- персистентная память

| Поле | Значение |
|------|----------|
| **Пакет** | `@modelcontextprotocol/server-memory` |
| **Транспорт** | STDIO (npx) |
| **Тип** | Node.js |
| **Репозиторий** | github.com/modelcontextprotocol/servers/tree/main/src/memory |

### Что делает

Персистентная память на основе Knowledge Graph. Хранит сущности (entities), связи (relations) и наблюдения (observations) в JSONL-файле. Позволяет агенту помнить контекст между сессиями.

### Доступные инструменты

- `create_entities` -- создание сущностей (имя, тип, наблюдения)
- `create_relations` -- создание связей между сущностями
- `add_observations` -- добавление наблюдений к сущности
- `delete_entities` -- удаление сущностей
- `delete_observations` -- удаление наблюдений
- `delete_relations` -- удаление связей
- `read_graph` -- чтение всего графа
- `search_nodes` -- поиск по сущностям
- `open_nodes` -- получение конкретных сущностей по имени

### Установка (air-gapped)

```bash
npm pack @modelcontextprotocol/server-memory
npm install -g modelcontextprotocol-server-memory-*.tgz
```

### Конфигурация Kilo Code

```json
{
  "memory": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-memory"
    ],
    "env": {
      "MEMORY_FILE_PATH": "/workspace/moex-ai-hub/.kilocode/memory.jsonl"
    },
    "alwaysAllow": [
      "create_entities",
      "create_relations",
      "add_observations",
      "read_graph",
      "search_nodes",
      "open_nodes"
    ],
    "disabled": false
  }
}
```

### Пример использования

```
Агент создаёт сущности:
  - "ASTS" (тип: trading_system, наблюдения: ["Основная торговая система", "Протокол FIX"])
  - "SPECTRA" (тип: trading_system, наблюдения: ["Деривативы", "Futures/Options"])

Создаёт связи:
  - "ASTS" --uses--> "FIX Protocol"
  - "SPECTRA" --depends_on--> "ASTS"
```

### Почему актуален для MOEX

- Накопление знаний о торговых системах между сессиями
- Граф зависимостей между компонентами инфраструктуры
- Память о решениях и архитектурных паттернах
- Все данные хранятся локально в JSONL-файле

---

## 5. Sequential Thinking -- структурированное мышление

| Поле | Значение |
|------|----------|
| **Пакет** | `@modelcontextprotocol/server-sequential-thinking` |
| **Транспорт** | STDIO (npx) |
| **Тип** | Node.js |
| **Репозиторий** | github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking |

### Что делает

Предоставляет LLM инструмент для пошагового, структурированного размышления. Поддерживает ревизию мыслей, ветвление рассуждений и динамическую корректировку количества шагов. Не имеет побочных эффектов -- чисто когнитивный инструмент.

### Доступные инструменты

- `sequentialthinking` -- запуск цепочки рассуждений с параметрами:
  - `thought` -- текст текущей мысли
  - `nextThoughtNeeded` -- нужен ли следующий шаг
  - `thoughtNumber` -- номер шага
  - `totalThoughts` -- планируемое число шагов (можно менять)
  - `isRevision` -- флаг ревизии предыдущей мысли
  - `revisesThought` -- номер пересматриваемой мысли
  - `branchFromThought` -- точка ветвления
  - `branchId` -- идентификатор ветки

### Установка (air-gapped)

```bash
npm pack @modelcontextprotocol/server-sequential-thinking
npm install -g modelcontextprotocol-server-sequential-thinking-*.tgz
```

### Конфигурация Kilo Code

```json
{
  "sequential-thinking": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-sequential-thinking"
    ],
    "env": {},
    "alwaysAllow": [
      "sequentialthinking"
    ],
    "disabled": false
  }
}
```

### Почему актуален для MOEX

- Анализ сложных архитектурных решений
- Декомпозиция задач по миграции торговых систем
- Пошаговый разбор инцидентов и багов
- Не требует никаких внешних ресурсов -- чисто вычислительный

---

## 6. Playwright -- автоматизация браузера

| Поле | Значение |
|------|----------|
| **Пакет** | `@playwright/mcp` |
| **Транспорт** | STDIO (npx) |
| **Тип** | Node.js |
| **Репозиторий** | github.com/microsoft/playwright-mcp |

### Что делает

Browser automation через Playwright. Агент может открывать веб-страницы, заполнять формы, кликать элементы, делать скриншоты. Работает через accessibility tree -- не требует визуального рендеринга.

### Доступные инструменты

- Навигация: `browser_navigate`, `browser_go_back`, `browser_go_forward`
- Взаимодействие: `browser_click`, `browser_type`, `browser_select_option`
- Чтение: `browser_snapshot` (accessibility tree), `browser_screenshot`
- Табы: `browser_tab_new`, `browser_tab_select`, `browser_tab_close`
- Утилиты: `browser_wait`, `browser_press_key`, `browser_resize`

### Установка (air-gapped)

```bash
# Скачать Playwright и браузеры:
npm pack @playwright/mcp
npx playwright install chromium --with-deps
# Перенести на целевую машину
```

### Конфигурация Kilo Code

```json
{
  "playwright": {
    "command": "npx",
    "args": [
      "-y",
      "@playwright/mcp@latest"
    ],
    "env": {},
    "alwaysAllow": [],
    "disabled": true
  }
}
```

### Почему актуален для MOEX

- Тестирование внутренних веб-интерфейсов (админки торговых систем)
- Автоматизация UI-тестов для MOEX AI Hub
- Скриншоты для документации
- Отключен по умолчанию -- включать только при необходимости

---

## 7. SQLite -- локальная база данных

| Поле | Значение |
|------|----------|
| **Пакет** | `@modelcontextprotocol/server-sqlite` |
| **Транспорт** | STDIO (npx) |
| **Тип** | Node.js (через Python: `mcp-server-sqlite`) |
| **Репозиторий** | github.com/modelcontextprotocol/servers/tree/main/src/sqlite |

### Что делает

Работа с локальными SQLite-базами: чтение схемы, выполнение запросов, создание таблиц. Полезно для прототипирования и работы с локальными данными без инфраструктуры PostgreSQL.

### Доступные инструменты

- `read_query` -- выполнение SELECT-запросов
- `write_query` -- INSERT/UPDATE/DELETE
- `create_table` -- создание таблиц
- `list_tables` -- список таблиц
- `describe_table` -- структура таблицы
- `append_insight` -- добавление аналитических записей

### Установка (air-gapped)

```bash
npm pack @modelcontextprotocol/server-sqlite
npm install -g modelcontextprotocol-server-sqlite-*.tgz
```

### Конфигурация Kilo Code

```json
{
  "sqlite": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-sqlite",
      "/workspace/moex-ai-hub/data/local.db"
    ],
    "env": {},
    "alwaysAllow": [
      "read_query",
      "list_tables",
      "describe_table"
    ],
    "disabled": true
  }
}
```

### Почему актуален для MOEX

- Прототипирование без PostgreSQL-инфраструктуры
- Локальное хранение метаданных и аналитики
- Работа с экспортированными данными (CSV -> SQLite)
- Полностью offline, файл-based

---

## Сводная таблица

| # | Сервер | Пакет | Транспорт | Runtime | Интернет | Статус |
|---|--------|-------|-----------|---------|----------|--------|
| 1 | Filesystem | `@modelcontextprotocol/server-filesystem` | STDIO | Node.js | Нет | Включен |
| 2 | Git | `mcp-server-git` | STDIO | Python | Нет | Включен |
| 3 | PostgreSQL | `@modelcontextprotocol/server-postgres` | STDIO | Node.js | Нет | Отключен* |
| 4 | Memory | `@modelcontextprotocol/server-memory` | STDIO | Node.js | Нет | Включен |
| 5 | Sequential Thinking | `@modelcontextprotocol/server-sequential-thinking` | STDIO | Node.js | Нет | Включен |
| 6 | Playwright | `@playwright/mcp` | STDIO | Node.js | Нет | Отключен* |
| 7 | SQLite | `@modelcontextprotocol/server-sqlite` | STDIO | Node.js | Нет | Отключен* |

*Отключен по умолчанию -- требует дополнительной настройки перед включением.

---

## Air-Gapped установка (общий подход)

### Подготовка на машине с интернетом

```bash
# 1. Создать директорию для пакетов
mkdir mcp-packages && cd mcp-packages

# 2. Скачать Node.js пакеты
npm pack @modelcontextprotocol/server-filesystem
npm pack @modelcontextprotocol/server-postgres
npm pack @modelcontextprotocol/server-memory
npm pack @modelcontextprotocol/server-sequential-thinking
npm pack @modelcontextprotocol/server-sqlite
npm pack @playwright/mcp

# 3. Скачать Python пакет для Git
pip download mcp-server-git -d ./python-packages/

# 4. Скачать Playwright-браузер (если нужен)
npx playwright install chromium --with-deps
```

### Установка на целевой машине

```bash
# 1. Node.js пакеты -- глобальная установка
for pkg in *.tgz; do npm install -g "$pkg"; done

# 2. Python пакет
pip install --no-index --find-links=./python-packages/ mcp-server-git

# 3. Скопировать .kilocode/mcp.json в проект
cp mcp.json /workspace/moex-ai-hub/.kilocode/mcp.json
```

### Настройка путей

В `.kilocode/mcp.json` заменить placeholder-пути на реальные:

- `/workspace/moex-ai-hub` -- путь к проекту
- `/workspace/docs` -- путь к документации
- `/workspace/configs` -- путь к конфигурациям
- Строку подключения PostgreSQL -- на реальную
- `MEMORY_FILE_PATH` -- на нужный путь для памяти

---

## Рекомендации по безопасности

1. **Filesystem**: ограничивать доступ минимально необходимыми директориями
2. **Git**: в `alwaysAllow` только read-only операции; коммиты требуют подтверждения
3. **PostgreSQL**: отдельный read-only пользователь; сервер отключен по умолчанию
4. **Memory**: файл памяти хранить внутри проекта; не коммитить в публичные репо
5. **Playwright**: отключен по умолчанию; `alwaysAllow` пуст -- все действия требуют подтверждения
6. **Все серверы**: STDIO транспорт -- данные не покидают машину

---

## Источники

- Официальный репозиторий MCP серверов: github.com/modelcontextprotocol/servers
- Документация Kilo Code MCP: kilo.ai/docs/features/mcp/using-mcp-in-kilo-code
- Playwright MCP: github.com/microsoft/playwright-mcp
- Реестр MCP серверов: registry.modelcontextprotocol.io
