# Kilo Code (Code Agent) -- Исследование для MOEX Agent Hub

**Дата исследования:** 2026-03-18
**Цель:** Определить возможности, ограничения и интеграционный потенциал Kilo Code для MOEX Agent Hub

---

## 1. Общая информация о Kilo Code

Kilo Code -- open-source AI coding agent для VS Code (а также JetBrains и CLI), созданный путем форка и объединения Cline и Roo Code. Соучредители -- Sid Sijbrandij (соучредитель GitLab) и Scott Breitenother. В декабре 2025 привлечено $8M seed-раунда. По состоянию на начало 2026 -- более 1.5M пользователей, обработано 25T+ токенов.

**Ключевое позиционирование:** "all-in-one agentic engineering platform" -- не просто расширение для VS Code, а платформа с оркестрацией, облачными агентами, CLI и кросс-платформенными сессиями.

**Лицензия:** Open Source (репозиторий: github.com/Kilo-Org/kilocode)

---

## 2. Возможности Kilo Code

### 2.1 Встроенные режимы (Built-in Modes)

| Режим | Назначение |
|-------|------------|
| **Code** | Написание и редактирование кода |
| **Ask** | Вопросы по кодовой базе без внесения изменений |
| **Debug** | Поиск и исправление ошибок |
| **Architect** | Проектирование архитектуры, планирование |
| **Orchestrator** | Разбивка сложных задач на подзадачи и делегация специализированным агентам |

### 2.2 Поддержка LLM провайдеров

Kilo Code поддерживает 500+ моделей через единый интерфейс `ApiHandler`:

| Провайдер | Ключевые возможности |
|-----------|---------------------|
| **Anthropic** | Нативные tools, prompt caching, thinking mode |
| **OpenRouter** | 500+ моделей, fallback routing, zero markup |
| **AWS Bedrock** | Нативные tools, AWS credentials |
| **Google Gemini** | Нативные tools, caching, thinking |
| **Google Vertex AI** | Gemini через Google Cloud |
| **OpenAI** | Нативные tools, GPT модели |
| **Azure OpenAI** | Через OpenAI-compatible интеграцию |
| **Ollama** | Локальные модели (offline) |
| **LM Studio** | Локальные модели (offline) |
| **Mistral** | FIM support для автодополнения |
| **OpenAI-compatible** | Любой провайдер с OpenAI-совместимым API |

**Хранение credentials:** файл `auth.json` в каталоге данных Kilo, или через переменные окружения (ANTHROPIC_API_KEY и т.д.).

### 2.3 MCP (Model Context Protocol)

#### Поддерживаемые транспорты

| Транспорт | Тип | Статус |
|-----------|-----|--------|
| **STDIO** | Локальный процесс | Рекомендуемый |
| **Streamable HTTP** | Удаленный сервер | Современный стандарт |
| **SSE** | Удаленный сервер | Deprecated (с MCP spec 2025-03-26) |

#### Формат конфигурации MCP

**Глобальная конфигурация** -- `mcp_settings.json` (через VS Code settings):

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "API_KEY": "your_api_key"
      },
      "alwaysAllow": ["tool1", "tool2"],
      "disabled": false
    }
  }
}
```

**Проектная конфигурация** -- `.kilocode/mcp.json` в корне проекта:
- Можно коммитить в git для совместного использования
- При совпадении имени сервера с глобальной конфигурацией, проектная имеет приоритет

**Streamable HTTP (для удаленных серверов):**

```json
{
  "type": "streamable-http",
  "url": "https://your-server-url.com/mcp",
  "headers": {
    "Authorization": "Bearer token"
  },
  "alwaysAllow": ["tool1"],
  "disabled": false
}
```

#### Auto-Approval MCP tools

- По умолчанию отключено
- Требуется сначала включить глобальный переключатель "Use MCP servers"
- Затем для каждого инструмента отдельно через Settings > Agent Behaviour > MCP Servers
- Сетевой таймаут: 30 сек -- 5 минут (по умолчанию 1 мин)

#### Kilo Marketplace

Встроенный маркетплейс MCP серверов, Skills и Modes -- community-driven репозиторий (github.com/Kilo-Org/kilo-marketplace). MCP серверы не предустановлены -- их нужно устанавливать отдельно.

### 2.4 Custom Modes (Пользовательские режимы)

#### Формат определения (YAML -- предпочтительный)

```yaml
customModes:
  - slug: moex-analyst
    name: "MOEX Analyst"
    description: "Анализ торговых систем Московской биржи"
    roleDefinition: >
      Вы -- эксперт по торговым системам MOEX.
      Специализируетесь на ASTS, SPECTRA, FIX-протоколах.
    whenToUse: "Используйте для анализа и разработки торговых систем"
    customInstructions: >
      Всегда учитывайте требования регулятора ЦБ РФ.
      Код должен соответствовать стандартам MOEX.
    groups:
      - read
      - - edit
        - fileRegex: \.(py|java|cpp|h)$
          description: "Только код торговых систем"
      - command
      - mcp
```

#### Ключевые поля Custom Mode

| Поле | Назначение |
|------|------------|
| `slug` | Уникальный идентификатор (a-zA-Z0-9-) |
| `name` | Отображаемое имя в UI |
| `description` | Описание для селектора режимов |
| `roleDefinition` | Персона и экспертиза (начало system prompt) |
| `whenToUse` | Подсказка для автоматического выбора Orchestrator'ом |
| `customInstructions` | Поведенческие инструкции (конец system prompt) |
| `groups` | Доступ к инструментам: read, edit, browser, command, mcp |

#### Tool Groups и ограничения

Группа `edit` поддерживает `fileRegex` -- регулярное выражение для ограничения файлов, которые режим может редактировать. Это критически важно для безопасности.

#### Хранение Custom Modes

- **Глобальные:** `custom_modes.yaml` (или `custom_modes.json`)
- **Проектные:** `.kilocodemodes` в корне проекта
- Проектные режимы с тем же slug полностью переопределяют глобальные

#### Экспорт/Импорт Custom Modes

- Экспорт через UI: Open Modes > Select mode > Export (download icon) > сохраняется `.yaml`
- Импорт: Open Modes > Import (upload icon) > выбрать `.yaml` > Project или Global
- При импорте можно менять slug, пути к rules-файлам обновляются автоматически
- **Можно распространять через git**: коммитить `.kilocodemodes` и `.kilocode/rules-{slug}/`

### 2.5 Custom Rules (Правила)

#### Структура файлов

```
~/.kilocode/rules/              # Глобальные правила (все проекты)
.kilocode/rules/                # Проектные правила
.kilocode/rules-{mode-slug}/    # Режим-специфичные правила (проектные)
~/.kilocode/rules-{mode-slug}/  # Режим-специфичные правила (глобальные)
```

#### Legacy-совместимость

Поддерживаются устаревшие файлы: `.clinerules`, `.roorules`, `.kilocoderules` -- но рекомендуется миграция на директории.

#### Формат правил

Рекомендуется Markdown. Правила загружаются рекурсивно в алфавитном порядке.

Пример `.kilocode/rules/coding-standards.md`:
```markdown
# Стандарты кодирования MOEX

## Общие правила
- Весь код должен содержать docstring на русском языке
- Используй type hints в Python
- Максимальная длина строки: 120 символов

## Безопасность
- Никогда не храни credentials в коде
- Используй vault для секретов
- Логируй все операции с рыночными данными
```

#### Приоритет загрузки

1. Глобальные правила `~/.kilocode/rules/`
2. Проектные правила `.kilocode/rules/`
3. Legacy fallback файлы
4. Mode-specific правила имеют приоритет при конфликте с общими

### 2.6 Custom System Prompts (Footgun Prompting)

Возможность полной замены system prompt для конкретного режима:
- Создать файл `.kilocode/system-prompt-{mode-slug}` в корне workspace
- Итоговый prompt: `{roleDefinition} {content_of_override_file} {customInstructions}`
- Мощный, но опасный инструмент -- требует аккуратного использования

### 2.7 Memory и Context Management

#### Memory Bank

Система самообновляемой документации проекта на основе Custom Rules:
- Файлы в формате Markdown, доступные и пользователю, и AI
- Автоматически запоминает: архитектуру проекта, текущие задачи, недавние изменения
- Скачиваемый шаблон: `kilo.ai/docs/downloads/memory-bank.md`

#### Context Condensing

- Автоматическое сжатие истории разговора при приближении к лимиту контекстного окна
- При ошибке "context window exceeded" -- принудительное сокращение на 25% с повторной попыткой (до 3 раз)
- Smart Context Guardrails -- автоматическая защита от переполнения

#### Time Machine

Возможность вернуться к любому сообщению в истории, отменить checkpoint и продолжить с выбранного момента.

### 2.8 Checkpoints

- Shadow Git репозиторий (отдельный от основного VCS)
- Автоматические снимки при: начале задачи, изменении файлов, выполнении команд
- Два режима отката:
  - "Restore Files Only" -- только файлы, разговор сохраняется
  - "Restore Files & Task" -- файлы + очистка истории разговора

### 2.9 Autocomplete (Автодополнение)

- Inline code suggestions при паузе в наборе
- Пока работает только с Codestral (Mistral) -- модель не настраивается
- Доступно через Settings > Autocomplete
- Рекомендуется отключить конкурирующие автодополнения

### 2.10 Browser Automation

- Встроенный инструмент `browser_action` на основе Puppeteer
- Запуск браузера, навигация, клики, ввод текста, скриншоты
- Каждое действие возвращает скриншот для визуальной верификации
- Можно расширить через MCP серверы (Bright Data Web MCP и др.)

### 2.11 Custom Subagents (CLI)

Для Kilo CLI -- возможность создавать собственных субагентов:
- Конфигурация в `kilo.json` (секция `agent`) или Markdown-файлы в `.kilo/agents/`
- Встроенные субагенты: `general` (полный доступ) и `explore` (только чтение)
- Настройки: `mode`, `model`, `prompt`, `temperature`, `permission`
- Вызов: автоматически через Orchestrator или вручную `@agent-name`
- Изолированные сессии с отдельной историей разговора

### 2.12 Kilo CLI

- Установка: `npm install -g @kilocode/cli`
- Те же возможности, что и VS Code расширение
- Поддержка MCP серверов
- Подходит для CI/CD пайплайнов и скриптов автоматизации
- Построен на базе OpenCode (MIT-лицензия)

### 2.13 .kilocodeignore

- Аналог `.gitignore` для ограничения доступа AI к файлам
- Заблокированные файлы получают "access denied"
- Можно комбинировать с Custom Rules для ограничения чтения sensitive файлов
- Паттерны: `.env`, `credentials.json`, `*.key`, `*.pem` и т.д.

---

## 3. Ограничения Kilo Code

### 3.1 По сравнению с Claude Code

| Аспект | Kilo Code | Claude Code |
|--------|-----------|-------------|
| Контекстное окно | Зависит от выбранной модели (до 1M у Claude) | Claude Opus 4 -- до 1M токенов нативно |
| Мультифайловые операции | Хорошо, но может зацикливаться | Превосходно -- нативный multi-file reasoning |
| UX polish | Менее отполированный | Более зрелый CLI experience |
| Встроенные инструменты | browser, edit, command, MCP | Broader set: bash, edit, read, glob, grep, web search и др. |
| Extended thinking | Зависит от модели | Нативная поддержка Claude |
| Worktrees | Не поддерживает | Git worktrees нативно |
| Sub-agents | Через Orchestrator mode и CLI subagents | Нативные sub-agents |
| Платформа | VS Code, JetBrains, CLI | Только CLI (+ IDE интеграции через расширения) |

### 3.2 Ограничения MCP в Kilo Code

- MCP серверы не предустановлены -- требуется ручная установка
- SSE транспорт deprecated -- нужно мигрировать на Streamable HTTP
- Auto-approval работает не всегда стабильно (известные баги)
- Сетевой таймаут ограничен 5 минутами максимум
- Нет встроенной валидации MCP серверов при установке

### 3.3 Ограничения при работе без интернета (Air-Gapped)

- **Локальные модели через Ollama/LM Studio:**
  - Требуется GPU с 24GB+ VRAM или MacBook с 32GB+ RAM
  - Качество значительно ниже облачных моделей
  - Модели часто зацикливаются, ошибаются в tool invocation
  - Рекомендуемые модели: `qwen3-coder:30b`, `devstral:24b`

- **MCP серверы в offline:**
  - STDIO серверы работают локально -- подходят для air-gapped
  - Streamable HTTP серверы можно развернуть на внутреннем сервере
  - Node.js MCP серверы можно упаковать через `npm pack` в tarball
  - Контейнерная упаковка: Docker-образы с предустановленными зависимостями

- **Autocomplete:** Работает только с Codestral -- в air-gapped нужен локальный Mistral сервер

- **Marketplace:** Недоступен без интернета -- серверы нужно устанавливать вручную

### 3.4 Ограничения Custom Modes

- Custom subagents в полной мере работают только в CLI, не в VS Code расширении
- Orchestrator mode может некорректно делегировать задачи при использовании custom modes
- Mode-specific rules поддерживаются только на уровне проекта

### 3.5 Общие ограничения

- Автодополнение пока привязано к Codestral (нет выбора модели)
- Менее отполированный UX по сравнению с Cursor/Windsurf
- Интеграционные проблемы при совместном использовании с другими AI-инструментами
- Нет нативной поддержки git worktrees
- Нет встроенного web search (только через MCP)

---

## 4. Рекомендации для MOEX Agent Hub

### 4.1 Контент, который Agent Hub может предложить пользователям Kilo Code

#### A. Готовые Custom Modes (высокий приоритет)

Agent Hub может распространять `.yaml` файлы custom modes:

1. **MOEX Trading Systems Developer**
   - Специализация: ASTS, SPECTRA, FIX-протоколы
   - fileRegex ограничения на production-конфиги
   - Встроенные инструкции по стандартам разработки MOEX

2. **MOEX Security Reviewer**
   - Режим только для чтения (только группы `read` и `browser`)
   - Правила проверки на соответствие требованиям ЦБ РФ
   - Автоматическая проверка наличия sensitive data в коде

3. **MOEX Data Analyst**
   - Специализация на рыночных данных, OHLCV, order book
   - Ограничение: только Python, SQL файлы
   - Инструкции по работе с внутренними API данных

4. **MOEX DevOps Engineer**
   - Infrastructure as Code для внутренней инфраструктуры
   - Ограничения на модификацию production-конфигураций
   - Правила для Kubernetes, Terraform, Ansible

#### B. Rules-пакеты (высокий приоритет)

Наборы `.kilocode/rules/` директорий:

1. **moex-coding-standards/** -- стандарты кодирования MOEX
2. **moex-security/** -- правила безопасности, restricted files
3. **moex-architecture/** -- архитектурные паттерны и ограничения
4. **moex-compliance/** -- соответствие регуляторным требованиям
5. **moex-data-handling/** -- правила работы с рыночными данными

#### C. MCP серверы (средний приоритет)

Agent Hub может поставлять предконфигурированные MCP серверы:

1. **moex-docs-mcp** -- доступ к внутренней документации MOEX
2. **moex-jira-mcp** -- интеграция с корпоративным Jira
3. **moex-api-mcp** -- доступ к внутренним API справочникам
4. **moex-db-schema-mcp** -- схемы баз данных для контекста
5. **moex-confluence-mcp** -- поиск по Confluence

Формат поставки для air-gapped:
- npm tarball (`npm pack`) + инструкция по установке
- Docker-образ с предустановленным сервером
- `.kilocode/mcp.json` конфигурация для проекта

#### D. Шаблоны конфигурации (высокий приоритет)

1. **Starter Kit** -- `.kilocode/` директория с базовой конфигурацией:
   ```
   .kilocode/
     mcp.json              # MCP серверы MOEX
     rules/
       coding-standards.md
       security.md
       restricted-files.md
     rules-code/
       code-review.md
     rules-architect/
       moex-patterns.md
     system-prompt-code     # Кастомный system prompt
   .kilocodemodes           # Custom modes MOEX
   .kilocodeignore           # Ignore sensitive files
   ```

2. **Memory Bank шаблон** -- предзаполненный шаблон с архитектурой MOEX

#### E. Документация и обучение (средний приоритет)

1. Гайд по настройке Kilo Code для MOEX
2. Best practices по работе с custom modes
3. Инструкция по подключению к внутренним LLM (Ollama/LM Studio)
4. FAQ по типичным проблемам

### 4.2 Enterprise Deployment -- рекомендации

#### Распространение конфигурации

1. **Git-based подход (рекомендуется):**
   - Коммитить `.kilocode/`, `.kilocodemodes`, `.kilocodeignore` в репозитории
   - Создать template-репозиторий с базовой конфигурацией MOEX
   - CI/CD для автоматического обновления конфигураций

2. **Export/Import через Agent Hub:**
   - Hub генерирует `.yaml` файлы custom modes
   - Пользователь скачивает и импортирует через UI Kilo Code
   - Один клик для импорта через Command Palette

3. **VS Code Settings Sync:**
   - Kilo Code поддерживает Export/Import Settings через Command Palette
   - Можно распространять файл конфигурации (БЕЗ API ключей)

#### Безопасность

1. **Обязательный `.kilocodeignore`** -- исключить sensitive файлы из доступа AI
2. **Custom Rules** для restricted_files -- запрет на чтение credentials
3. **fileRegex в Custom Modes** -- ограничение файлов для редактирования
4. **Auto-Approval** -- рекомендуется отключить для production-проектов
5. **Проектный MCP** (`.kilocode/mcp.json`) вместо глобального -- изоляция по проектам
6. **Аудит через checkpoints** -- все изменения AI записываются в shadow git

#### Air-Gapped конфигурация

1. Внутренний Ollama-сервер с моделями `qwen3-coder:30b` или `devstral:24b`
2. MCP серверы как Docker-контейнеры во внутренней сети
3. Локальный npm registry (Verdaccio/Nexus) для MCP серверов
4. Streamable HTTP MCP серверы на внутренних endpoint'ах
5. Автодополнение: локальный Codestral через Ollama/Mistral

### 4.3 Что Agent Hub НЕ может предложить для Kilo Code

1. **Модели** -- Hub не может поставлять LLM, только конфигурации для подключения
2. **Inline autocomplete config** -- пока нет возможности менять модель автодополнения
3. **Cloud Agents** -- требуют интернет, не подходят для air-gapped
4. **VS Code расширение** -- нужна установка из Marketplace или VSIX
5. **Worktrees** -- не поддерживаются Kilo Code

---

## 5. Сравнительная таблица: что Hub может предлагать

| Артефакт | Формат | Распространение | Air-Gapped |
|----------|--------|-----------------|------------|
| Custom Modes | `.yaml` | Git / Hub download / Import | Да |
| Rules пакеты | `.md` в директориях | Git | Да |
| MCP серверы | npm tarball / Docker | Internal registry | Да |
| MCP конфигурации | `.kilocode/mcp.json` | Git | Да |
| .kilocodeignore | текстовый файл | Git | Да |
| System prompts | `.kilocode/system-prompt-*` | Git | Да |
| Memory Bank шаблоны | `.md` | Git / Hub download | Да |
| Starter Kit | директория `.kilocode/` | Git template repo | Да |
| Документация | HTML/MD | Hub web | Да (оффлайн) |

---

## 6. Источники

- [Kilo Code -- VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=kilocode.Kilo-Code)
- [Kilo Code Documentation -- MCP](https://kilo.ai/docs/features/mcp/using-mcp-in-kilo-code)
- [MCP Server Transports](https://kilo.ai/docs/features/mcp/server-transports)
- [Custom Modes](https://kilo.ai/docs/customize/custom-modes)
- [Custom Rules](https://kilo.ai/docs/customize/custom-rules)
- [Custom Instructions](https://kilo.ai/docs/customize/custom-instructions)
- [Custom Subagents](https://kilo.ai/docs/customize/custom-subagents)
- [Using Ollama](https://kilo.ai/docs/ai-providers/ollama)
- [Supported Providers (DeepWiki)](https://deepwiki.com/Kilo-Org/kilocode/5.1-provider-settings-and-configuration-management)
- [Context Management (DeepWiki)](https://deepwiki.com/Kilo-Org/kilocode/3.8-context-management-and-condensation)
- [System Prompt Generation (DeepWiki)](https://deepwiki.com/Kilo-Org/kilocode/3.1-system-prompt-generation)
- [Kilo Marketplace (GitHub)](https://github.com/Kilo-Org/kilo-marketplace)
- [Orchestrator Mode](https://kilo.ai/docs/code-with-ai/agents/orchestrator-mode)
- [Memory Bank](https://blog.kilo.ai/p/how-memory-bank-changes-everything)
- [Checkpoints](https://kilo.ai/docs/code-with-ai/features/checkpoints)
- [Autocomplete](https://kilo.ai/docs/code-with-ai/features/autocomplete)
- [.kilocodeignore](https://kilo.ai/docs/customize/context/kilocodeignore)
- [Footgun Prompting](https://kilo.ai/docs/features/footgun-prompting)
- [Portable Settings (Blog)](https://blog.kilo.ai/p/kilo-code-4170-new-tools-portable)
- [Kilo CLI](https://kilo.ai/docs/code-with-ai/platforms/cli)
- [Enterprise AI for Air-Gapped (IntuitionLabs)](https://intuitionlabs.ai/articles/enterprise-ai-code-assistants-air-gapped-environments)
- [Custom Modes Gallery (GitHub Discussion)](https://github.com/Kilo-Org/kilocode/discussions/1671)
- [Kilo Code vs Cline Comparison](https://kilo.ai/cline)
- [Kilo Code Review 2026](https://vibecoding.app/blog/kilo-code-review)
