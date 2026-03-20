# MOEX Agent Hub — Recreation Data

Companion to `RECREATE_PROMPT.md`. Use this file to populate `marketplaceItems`, and to define quiz pools (≈20 for daily, ≈40 for full). If you have the existing repo, you can copy from `src/lib/mockData.ts`; otherwise use the content below.

---

## 1. Products (3)

| id | name | tagline | promptCount | skillCount |
|----|------|---------|-------------|------------|
| moex-gpt | MOEX GPT | Корпоративный AI-чат | 45 | 8 |
| moex-insight | MOEX Insight | AI-ассистент рабочего стола | 22 | 0 |
| code-agent | Code Agent | Программирование с помощью AI | 38 | 24 |

Use logo paths: `/logos/moex-gpt.png`, `/logos/moex-insight.png`, `/logos/code-agent.png`. Each product has full `ProductInfo` fields (description, features[], useCases[], url, buttonLabel, buttonIcon, accentClass, bgClass, borderClass, textClass). See `src/lib/mockData.ts` → `products` for exact structure.

---

## 2. Guides, Community, News

- **Guides:** At least 8 items (Установка Python+Node, Kilo Code, MOEX Insight, Как писать промпты, Безопасность, API MOEX LLMs, MCP-интеграции, AI-агент на совещаниях). Fields: id, title, description, url, icon (Lucide name), product?, readingMin?.
- **Community channels:** 4 items (MOEX AI, MOEX GPT, MOEX Insight, Code Agent). Fields: id, title, description, url, type "express", product.
- **News:** At least 1 item (e.g. конкурс AI-чемпиона). Fields: id, title, summary, date, tag, url.
- **Product capabilities:** 3 items (one per product) with productId, productName, items[].
- **Glossary terms:** 10 items (Промпт, Скилл, LLM, Вайбкодинг, RAG, MCP, Контекстное окно, AI-агент, Мультимодальность, Чанкинг). Fields: id, term, definition, icon.

Copy exact content from `src/lib/mockData.ts` if available.

---

## 3. Marketplace Items (24 total)

Common: `author: "Алексей С."`, `likes: 0`. Use `createdAt` from the table below (format `"YYYY-MM-DD"`).

### 3.1 MOEX GPT — Prompts (p1–p11)

| id | title | description | tags | createdAt |
|----|--------|-------------|------|-----------|
| p1 | Суммаризация протокола совещания | Роль + структурированный вывод. Извлекает решения, задачи и дедлайны из протокола. | Текст, Совещания, Документы | 2026-02-01 |
| p2 | Генератор SQL по описанию | Chain-of-thought: модель рассуждает шаг за шагом перед выдачей SQL (PostgreSQL). | SQL, PostgreSQL, Аналитика | 2026-01-28 |
| p3 | Деловое письмо за 30 секунд | Роль + шаблон структуры. Генерирует письмо с приветствием, сутью и призывом к действию. | Email, Коммуникации, Текст | 2026-02-05 |
| p4 | Анализ рисков по документу | Выявляет и классифицирует риски из нормативных и бизнес-документов. | Риски, Аналитика, Регуляторика | 2026-02-04 |
| p5 | Перевод документа с сохранением форматирования | Переводит документ с/на английский, сохраняя структуру, таблицы и списки. | Перевод, Документы, Финансы | 2026-01-29 |
| p6 | Подготовка презентации по теме | Генерирует структуру и тезисы для слайдов презентации. | Презентации, Текст, Бизнес | 2026-02-02 |
| p7 | Объяснение сложного простым языком | Переводит профессиональный жаргон в понятное объяснение для нетехнического коллеги. | Объяснение, Коммуникации, Обучение | 2026-02-03 |
| p8 | Составление ТЗ по описанию задачи | Формирует структурированное техническое задание из краткого описания. | ТЗ, Управление, Документы | 2026-01-30 |
| p9 | Анализ таблицы данных | Анализирует вставленную таблицу: тренды, аномалии, выводы. | Аналитика, Данные, Таблицы | 2026-02-06 |
| p10 | Ответ на вопрос клиента / партнёра | Помогает составить корректный, вежливый и полный ответ на внешний запрос. | Коммуникации, Клиенты, Текст | 2026-02-01 |
| p11 | Проверка текста на ошибки и стиль | Вычитывает текст: грамматика, стилистика, логика, форматирование. | Текст, Редактура, Качество | 2026-02-04 |

**Content for p1:**
```
**Роль:** Ты — корпоративный секретарь с опытом обработки протоколов. Твоя задача — превратить сырой текст встречи в структурированный отчёт для участников и руководства.

**Инструкция:** Проанализируй текст протокола по шагам:
1. Выдели все упомянутые решения (кто что решил).
2. Собери все задачи с ответственными и сроками.
3. Отметь вопросы без ответа.
4. Сформулируй резюме в 3–5 предложениях.

**Формат вывода (строго):**
## Резюме
[текст]

## Решения
1. …
2. …

## Задачи
| Задача | Ответственный | Срок |
|--------|---------------|------|

## Открытые вопросы
- …

Язык: русский. Стиль: нейтральный, без лишних слов.

---
Текст протокола:
{вставьте текст}
```

**Content for p2:** Роль: senior DBA PostgreSQL. Метод: chain-of-thought — переформулировать задачу, JOIN/агрегации, написать SQL (CTE, комментарии), индексы. Плейсхолдеры: Схема БД: {опишите таблицы и ключи}; Запрос пользователя: {что нужно получить}.

**Content for p3:** Роль: опытный специалист по корпоративным коммуникациям. Структура письма: обращение, контекст, основная часть, call-to-action, подпись. Параметры: Получатель, Тема письма, Тон, Ключевые пункты. До 200 слов.

**Content for p4:** Таблица по каждому риску: Категория | Описание | Вероятность | Влияние | Митигация. Категории: Операционный / Финансовый / Технологический / Регуляторный. Отсортировать по критичности. Документ: {вставьте текст}.

**Content for p5:** Роль: профессиональный переводчик финансовой документации. Переведи с {исходный язык} на {целевой язык}. Правила: сохранять структуру, устоявшиеся термины, аббревиатуры с расшифровкой. Текст: {вставьте текст}.

**Content for p6:** Параметры: Тема, Аудитория, Количество слайдов, Цель. Для каждого слайда: заголовок, тезисы (3–4 буллета), рекомендация по визуалу. Финальный слайд — резюме и next steps.

**Content for p7:** Роль: талантливый объяснятор. Правила: без жаргона, аналогии, макс. 150 слов, пример из контекста Биржи. Что нужно объяснить: {вставьте текст или термин}.

**Content for p8:** Структура ТЗ: Цель, Контекст, Функциональные требования, Нефункциональные, Критерии приёмки, Ограничения и допущения, Сроки и приоритет. Описание задачи: {краткое описание}.

**Content for p9:** Блоки: Основные метрики, Тренды, Аномалии, Выводы, Рекомендации. Предложить тип визуализации. Данные: {вставьте таблицу}.

**Content for p10:** Контекст отдела, текст обращения. Ответ: вежливый тон, ответить на все вопросы, следующие шаги и сроки, до 250 слов.

**Content for p11:** Проверить грамматику, стиль, логику, форматирование. Вывести исправленный текст и список изменений (было → стало). Текст: {вставьте текст}.

---

### 3.2 MOEX Insight — Prompts (p12–p15)

| id | title | description | tags | createdAt |
|----|--------|-------------|------|-----------|
| p12 | Анализ графика котировок | Анализирует скриншот с графиком — тренды, уровни, паттерны. | Скриншот, Аналитика, Графики | 2026-02-03 |
| p13 | Резюме совещания от AI-агента | Шаблон для AI-агента, который подключается к встрече и делает резюме. | Совещания, Транскрибация, Outlook | 2026-02-06 |
| p14 | Написание email по скриншоту переписки | Анализирует скриншот переписки и помогает составить ответ. | Email, Скриншот, Коммуникации | 2026-02-05 |
| p15 | Расшифровка текста с фото документа | Извлекает и структурирует текст из сфотографированного или отсканированного документа. | OCR, Документы, Скриншот | 2026-01-27 |

**Content for p12:** Роль: технический аналитик. Определи: инструмент и таймфрейм, тренд, уровни поддержки/сопротивления, паттерны, аномалии объёмов. Будь объективен, не давай финансовых рекомендаций.

**Content for p13:** После совещания: ## Встреча (дата, участники, длительность), ## Обсуждённые темы, ## Решения, ## Задачи (таблица), ## Следующие шаги. Стиль: лаконичный, Markdown.

**Content for p14:** Кратко перескажи контекст, определи что ожидают, предложи 2 варианта ответа (формальный, нейтральный). Вежливо и конструктивно.

**Content for p15:** Задачи: извлечь текст с сохранением структуры, таблицы в Markdown, исправить OCR, выделить даты/суммы/имена. Формат: чистый Markdown.

---

### 3.3 Code Agent — Prompts (p16–p19)

| id | title | description | tags | createdAt |
|----|--------|-------------|------|-----------|
| p16 | Code Review: Python | Автоматическое ревью Python-кода с фокусом на качество и безопасность. | Python, Code Review, Качество | 2026-02-03 |
| p17 | Unit-тесты на pytest | Генерирует набор unit-тестов для Python-функции. | Python, Тесты, pytest | 2026-02-06 |
| p18 | Документация к API-эндпоинту | Генерирует OpenAPI-описание и README для REST-эндпоинта. | API, Документация, OpenAPI | 2026-01-31 |
| p19 | Рефакторинг legacy-кода | Анализирует старый код и предлагает план рефакторинга с сохранением поведения. | Рефакторинг, Legacy, Качество | 2026-02-02 |

**Content for p16:** Чек-лист: PEP 8, баги, безопасность (injection, secrets), производительность, тестируемость. Формат: [SEVERITY] строка N: описание → рекомендация. Severity: critical | warning | info. Код в ```python {код} ```.

**Content for p17:** Минимум 5 тест-кейсов, edge cases, @pytest.mark.parametrize, моки, docstring. Код функции в ```python {функция} ```.

**Content for p18:** OpenAPI 3.0 YAML + README: метод и путь, параметры, примеры запроса/ответа, коды ошибок. Код эндпоинта в блоке.

**Content for p19:** Блоки: Проблемы, План рефакторинга, Улучшенный код, Тесты для проверки. Сохранить поведение, читаемость, убрать дублирование, типизация.

---

### 3.4 Code Agent — Skills (s1–s5)

| id | title | description | tags | createdAt |
|----|--------|-------------|------|-----------|
| s1 | Document Chunker для LLM | Разбивает большие документы на чанки под контекстное окно модели. | Chunking, Документы, Контекст | 2026-01-30 |
| s2 | CI/CD Pipeline Generator | Генерирует GitHub Actions на основе стека проекта. | CI/CD, GitHub Actions, DevOps | 2026-01-25 |
| s3 | Atlassian MCP Connector | Подключение к Jira и Confluence через Model Context Protocol. | MCP, Atlassian, Jira, Confluence | 2026-02-02 |
| s4 | Database Analytics Agent | Автоанализ БД: схема, медленные запросы, рекомендации по индексам. | Database, PostgreSQL, Оптимизация | 2026-02-04 |
| s5 | Auto JSON Formatter | Автоформатирование и валидация JSON при вставке. | JSON, Форматирование, VS Code | 2026-01-22 |

**Content for s1 (JSON):**
```json
{
  "name": "document-chunker",
  "version": "1.2.0",
  "trigger": "manual",
  "config": {
    "maxChunkTokens": 4096,
    "overlapTokens": 256,
    "strategy": "semantic",
    "preserveHeaders": true
  },
  "steps": [
    { "action": "readFile", "params": { "path": "{{input.filePath}}" } },
    { "action": "tokenize", "params": { "model": "qwen3" } },
    { "action": "splitChunks", "params": { "strategy": "{{config.strategy}}" } },
    { "action": "writeChunks", "params": { "dir": "{{input.outputDir}}" } }
  ]
}
```

**Content for s2 (YAML):** GitHub Actions: on push/PR to main, develop; job lint-and-test (checkout, setup-node 20, npm ci, lint, test --coverage); job build-and-deploy (needs lint-and-test, if main, npm ci && npm run build).

**Content for s3 (JSON):** protocol mcp-v1, servers jira (baseUrl, auth bearer, tools: search_issues, get_issue, create_issue) и confluence (baseUrl, tools: search_pages, get_page).

**Content for s4 (JSON):** name db-analytics-agent, config connectionString/dialect, steps: introspectSchema, analyzeQueries slowThreshold 100ms, detectAnomalies (missing_indexes, unused_columns, n_plus_one), generateReport markdown.

**Content for s5 (JSON):** name json-formatter, trigger on_paste, language json, actions: validate strict, format indent 2 sortKeys true.

---

## 4. Quiz Pools

### 4.1 Ежедневный тест (quizQuestionsEasy) — ~20 questions

Export an array of **approximately 20** questions. Each object: `{ id, question, options: string[4], correctIndex: number, explanation }`.

**Topics:** Что такое AI / ML / DL; что такое промпт и скилл; вайбкодинг; RAG; контекстное окно и токен; MCP; MOEX Insight и Qwen 3 VL; чанкинг; few-shot; локальные модели на Бирже; API-ключ MOEX LLMs; нейросети; тест Тьюринга; генеративный AI; LLM и GPT; температура; мультимодальность; ответственный AI.

**Example questions (include these or equivalent):**
- Что такое промпт? → Текстовая инструкция для AI-модели.
- Чем скилл отличается от промпта? → Скилл включает код и автоматизацию.
- Что такое вайбкодинг? → Описание задачи словами, AI пишет код.
- Для чего нужен RAG? → Чтобы модель отвечала на основе актуальных документов.
- Что такое контекстное окно? → Максимальный объём текста за один запрос.
- Какая модель в MOEX Insight анализирует скриншоты? → Qwen 3 VL.
- Для чего нужен чанкинг? → Разбить большой файл на части под контекст модели.
- Что умеет AI-агент в MOEX Insight? → Подключаться к совещаниям, транскрибировать и делать резюме.
- Почему модели на Бирже развёрнуты локально? → Для конфиденциальности данных.
- Что такое few-shot промпт? → Промпт с примерами ввода и вывода.

Add ~10 more in the same style (4 options, 1 correct, short explanation in Russian).

### 4.2 Полный тест (quizQuestionsHard) — ~40 questions

Export an array of **approximately 40** questions. Same format.

**Topics:** RAG vs fine-tuning; температура и top-p; prompt leaking; prompt injection; reranking в RAG; эмерджентные способности; embedding в RAG; галлюцинация; Chain-of-Thought; MCP-сервер; контекстное окно vs max_tokens; alignment; стоп-последовательность; zero-shot vs few-shot; in-context learning; overlap в чанкинге; batch API; лидерборд и лайки.

**Example questions (include these or equivalent):**
- В чём разница между RAG и fine-tuning? → RAG подтягивает данные в рантайме; fine-tuning дообучает веса.
- Что такое температура в LLM? → Параметр случайности: выше — разнообразнее, ниже — стабильнее.
- Что такое top-p (nucleus sampling)? → Выбор следующего токена из набора с кумулятивной вероятностью p.
- Чем опасна утечка промпта? → Системный промпт может попасть в ответ пользователю.
- Что такое prompt injection? → Ввод пользователя, манипулирующий поведением модели; бороться границами и валидацией.
- Зачем в RAG делают reranking? → Уточнить порядок релевантных чанков после первичного поиска.
- Что такое эмерджентные способности? → Поведение, не заложенное явно, проявляется на больших моделях.
- Чем embedding отличается от полного текста в RAG? → Векторное представление для семантического поиска.
- Что такое галлюцинация? → Уверенный, но фактически неверный или выдуманный ответ.
- Зачем в CoT «думать по шагам»? → Улучшить точность за счёт декомпозиции задачи.
- Что такое MCP-сервер? → Сервис, предоставляющий инструменты/данные модели по протоколу MCP.
- Чем контекстное окно отличается от max_tokens? → Контекст — вход; max_tokens — лимит длины ответа.
- Что такое alignment? → Настройка поведения под цели и нормы (безопасность, полезность).
- Зачем в промпте «если информации нет — скажи не знаю»? → Снизить риск галлюцинаций.
- Чем batch-обработка отличается от по одному? → Несколько запросов в одном вызове — экономия.
- Что такое in-context learning? → Решение задачи по примерам в промпте без смены весов.
- Зачем в чанкинге overlap? → Сохранить связность на границах фрагментов.
- Что такое стоп-последовательность? → Строка, при появлении которой генерация прекращается.
- Zero-shot vs few-shot? → Zero-shot без примеров; few-shot с примерами в промпте.
- Почему «Популярные материалы» учитывают лайки из UI? → Чтобы рейтинг отражал реальную популярность.

Add **20 more** questions in the same style on these topics to reach **40** total for the full pool.

---

## 5. Leaderboard (optional)

Leaderboard is **computed** from library data via `buildLeaderboardFromLibraryWithLikes(marketplaceItems, getEffectiveLikes)`. If you need static fallback data, use 10 users with id, name, avatar (initials), department, promptsShared, skillsShared, totalLikes, rank — see `leaderboardUsers` in `src/lib/mockData.ts`.
