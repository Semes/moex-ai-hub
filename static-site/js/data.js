/**
 * MOEX Agent Hub — mock data (plain JS, no modules)
 * Converted from TypeScript mockData.ts for static-site usage.
 */

// Logo paths
const LOGO_MOEX_GPT = "logos/moex-gpt.png";
const LOGO_MOEX_INSIGHT = "logos/moex-insight.png";
const LOGO_CODE_AGENT = "logos/code-agent.png";
const LOGO_DION_AGENT = "logos/dion-agent.png";

function getProductLogo(name) {
  const map = { "MOEX GPT": LOGO_MOEX_GPT, "MOEX Insight": LOGO_MOEX_INSIGHT, "Code Agent": LOGO_CODE_AGENT, "Dion Agent": LOGO_DION_AGENT, "moex-gpt": LOGO_MOEX_GPT, "moex-insight": LOGO_MOEX_INSIGHT, "code-agent": LOGO_CODE_AGENT, "dion-agent": LOGO_DION_AGENT, "general": LOGO_MOEX_GPT };
  return map[name] || LOGO_MOEX_GPT;
}

// ── Product styles (single source of truth) ─────────────────────────────────

const PRODUCT_STYLES = {
  'MOEX GPT': { dot: 'bg-[#FF0508]', badge: 'bg-red-50 text-red-700 border border-red-200' },
  'MOEX Insight': { dot: 'bg-violet-500', badge: 'bg-violet-50 text-violet-700 border border-violet-200' },
  'Code Agent': { dot: 'bg-slate-600', badge: 'bg-slate-100 text-slate-700 border border-slate-300' },
  'Dion Agent': { dot: 'bg-teal-500', badge: 'bg-teal-50 text-teal-700 border border-teal-200' }
};

function getProductBadgeClass(productName) {
  return (PRODUCT_STYLES[productName] || PRODUCT_STYLES['MOEX GPT']).badge;
}

function getProductDotClass(productName) {
  return (PRODUCT_STYLES[productName] || PRODUCT_STYLES['MOEX GPT']).dot;
}

const STATS_EMPLOYEES = "2100+";
const NEWEST_ITEMS_LIMIT = 4;

function pluralize(n, one, few, many) {
  const abs = Math.abs(n);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod100 >= 11 && mod100 <= 19) return n + ' ' + many;
  if (mod10 === 1) return n + ' ' + one;
  if (mod10 >= 2 && mod10 <= 4) return n + ' ' + few;
  return n + ' ' + many;
}

// ── Products ───────────────────────────────────────────────────────────────

const products = [
  {
    id: "moex-gpt", name: "MOEX GPT", tagline: "Корпоративный AI-чат",
    description: "Генерация текстов, ответы на вопросы, работа с документами — всё внутри периметра Биржи.",
    features: ["Письма, отчёты и протоколы за минуты", "Суммаризация длинных текстов и таблиц", "Перевод и проверка текста с учётом терминологии", "Библиотека готовых промптов"],
    useCases: ["Письмо партнёру", "Сводка по отчёту", "Перевод документа"],
    logo: LOGO_MOEX_GPT, url: "#openwebui-placeholder", buttonLabel: "Открыть чат", buttonIcon: "externalLink",
    bgClass: "bg-red-50", borderClass: "border-red-200", textClass: "text-red-700", promptCount: 11, skillCount: 0
  },
  {
    id: "moex-insight", name: "MOEX Insight", tagline: "AI-ассистент рабочего стола",
    description: "Анализ того, что на экране, работа с почтой и календарём, участие в совещаниях с резюме.",
    features: ["Анализ скриншотов: вопрос к экрану — ответ", "Интеграция с Outlook: письма, календарь, встречи", "AI на совещаниях: транскрибация и резюме", "Распознавание текста с фото и сканов (OCR)"],
    useCases: ["Вопрос к графику", "Резюме встречи", "Ответ по скриншоту"],
    logo: LOGO_MOEX_INSIGHT, url: "#insight-installer-placeholder", buttonLabel: "Скачать установщик", buttonIcon: "download",
    bgClass: "bg-violet-50", borderClass: "border-violet-200", textClass: "text-violet-700", promptCount: 4, skillCount: 0
  },
  {
    id: "code-agent", name: "Code Agent", tagline: "Программирование с помощью AI",
    description: "Опишите задачу — AI напишет код и соберёт прототип. Подходит даже новичкам в программировании.",
    features: ["Опишите идею — получите код и правки в VS Code", "Прототипы и скрипты без опыта в разработке", "Готовые скиллы: тесты, рефакторинг, БД и Jira"],
    useCases: ["Прототип по промпту", "Скрипт автоматизации", "Юнит-тесты"],
    logo: LOGO_CODE_AGENT, url: "#kilo-code-guide-placeholder", buttonLabel: "Инструкция по установке", buttonIcon: "bookOpen",
    bgClass: "bg-slate-100", borderClass: "border-slate-300", textClass: "text-slate-700", promptCount: 4, skillCount: 14, mcpCount: 1
  },
  {
    id: "dion-agent", name: "Dion Agent", tagline: "AI-ассистент ваших встреч",
    description: "Транскрибация, резюме и задачи из каждой онлайн-встречи — автоматически.",
    features: ["Автоподключение к встречам в один клик", "Транскрибация с разделением по спикерам", "Резюме по настраиваемым шаблонам", "Извлечение задач и решений из встречи"],
    useCases: ["Резюме встречи", "Список задач", "Протокол совещания"],
    logo: LOGO_DION_AGENT, url: "#dion-agent-placeholder", buttonLabel: "Подключить", buttonIcon: "video",
    bgClass: "bg-teal-50", borderClass: "border-teal-200", textClass: "text-teal-700", promptCount: 8, skillCount: 0
  }
];

// ── Guides ─────────────────────────────────────────────────────────────────

const guides = [
  { id: "guide-python-node", title: "Установка Python + Node.js", description: "Настройка окружения для работы с AI-инструментами", url: "#confluence-python-node", icon: "terminal", readingMin: 2 },
  { id: "guide-kilo-code", title: "Настройка Kilo Code в VS Code", description: "Подключение плагина к локальным LLM", url: "#confluence-kilo-code", icon: "code", product: "Code Agent", readingMin: 2 },
  { id: "guide-insight", title: "Первые шаги в MOEX Insight", description: "От установки до первого анализа скриншота", url: "#confluence-insight", icon: "monitor", product: "MOEX Insight", readingMin: 2 },
  { id: "guide-prompts", title: "Как писать эффективные промпты", description: "Техники и шаблоны для лучших результатов", url: "#confluence-prompts", icon: "sparkles", readingMin: 2 },
  { id: "guide-security", title: "Безопасность при работе с AI", description: "Правила и лучшие практики для сотрудников", url: "#confluence-security", icon: "shield", readingMin: 1 },
  { id: "guide-api", title: "API MOEX LLMs", description: "Получение индивидуального API-ключа для интеграции с локальными LLM", url: "#confluence-api-moex-llms", icon: "plug", product: "MOEX GPT", readingMin: 1 },
  { id: "guide-mcp", title: "MCP-интеграции", description: "Подключение инструментов через Model Context Protocol", url: "#confluence-mcp", icon: "cable", product: "Code Agent", readingMin: 1 },
  { id: "guide-meetings", title: "AI-агент на совещаниях", description: "Автоматическая транскрибация и резюме", url: "#confluence-meetings", icon: "video", product: "MOEX Insight", readingMin: 1 },
  { id: "guide-dion-agent", title: "Настройка Dion Agent", description: "Подключение AI-ассистента к календарю и встречам", url: "#confluence-dion-agent", icon: "video", product: "Dion Agent", readingMin: 2 },
  { id: "guide-atlassian-mcp", title: "Atlassian MCP: подключение Jira и Confluence", description: "Получение токена, настройка конфигурации, примеры использования и список из 72 инструментов", url: "#confluence-atlassian-mcp", icon: "cable", product: "Code Agent", readingMin: 3 }
];

// ── Community channels ──────────────────────────────────────────────────────

const communityChannels = [
  { id: "ch-moex-ai", title: "MOEX AI", description: "Новости и обновления всех AI-продуктов", url: "#express-moex-ai", product: "general" },
  { id: "ch-moex-gpt", title: "MOEX GPT", description: "Обсуждение, кейсы, помощь с промптами", url: "#express-moex-gpt", product: "MOEX GPT" },
  { id: "ch-moex-insight", title: "MOEX Insight", description: "Вопросы по Insight, предложения по развитию", url: "#express-moex-insight", product: "MOEX Insight" },
  { id: "ch-code-agent", title: "Code Agent", description: "Kilo Code, скиллы, автоматизация", url: "#express-code-agent", product: "Code Agent" },
  { id: "ch-dion-agent", title: "Dion Agent", description: "Вопросы и кейсы по AI-ассистенту встреч", url: "#express-dion-agent", product: "Dion Agent" }
];

// ── News ───────────────────────────────────────────────────────────────────

const news = [
  { id: "n1", title: "Обратная связь по Agent Hub", summary: "Делитесь обратной связью по использованию Agent Hub в сообществах Express — ваши идеи помогут сделать платформу лучше.", date: "2026-03-20", tag: "Новое", url: "#express-moex-ai" }
];

// ── Marketplace ──────────────────────────────────────────────────────────────

const marketplaceItems = [
  {
    id: "p1",
    title: "Суммаризация протокола совещания",
    description: "Извлекает решения, задачи и дедлайны из текста протокола совещания.",
    content: `**Роль:** Ты — корпоративный секретарь с опытом обработки протоколов. Твоя задача — превратить сырой текст встречи в структурированный отчёт для участников и руководства.

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
{вставьте текст}`,
    tags: ["Текст", "Совещания", "Документы"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-01"
  },
  {
    id: "p2",
    title: "Генератор SQL по описанию",
    description: "Генерирует SQL-запрос по описанию на русском языке. Модель рассуждает пошагово.",
    content: `**Роль:** Ты — senior DBA PostgreSQL. Пользователь описывает запрос на русском языке.

**Метод:** Действуй по шагам (chain-of-thought):
1. Переформулируй задачу на языке данных: какие таблицы, связи, фильтры.
2. Определи порядок JOIN и агрегаций.
3. Напиши SQL (CTE при сложной логике, без SELECT *, с комментариями к блокам).
4. Кратко объясни логику и предложи индексы, если релевантно.

**Схема БД:**
{опишите таблицы и ключи}

**Запрос пользователя:**
{что нужно получить}`,
    tags: ["SQL", "PostgreSQL", "Аналитика"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-01-28"
  },
  {
    id: "p3",
    title: "Деловое письмо за 30 секунд",
    description: "Генерирует деловое письмо: приветствие, суть, призыв к действию — за 30 секунд.",
    content: `**Роль:** Ты — опытный специалист по корпоративным коммуникациям. Пишешь ясно, вежливо и по делу.

**Структура письма (соблюдай по пунктам):**
1. Обращение и приветствие (одна строка).
2. Контекст: зачем пишем (1–2 предложения).
3. Основная часть: ключевые пункты по списку пользователя.
4. Call-to-action: что сделать получателю и до какого срока (если применимо).
5. Подпись: нейтральное завершение (например: «С уважением»).

**Параметры:**
- Получатель: {кому}
- Тема письма: {тема}
- Тон: {формальный / нейтральный / дружеский}
- Ключевые пункты: {пункт 1}, {пункт 2}, …

Ограничение: до 200 слов. Без вводных фраз вроде «Надеюсь, это письмо найдёт вас в хорошем настроении».`,
    tags: ["Email", "Коммуникации", "Текст"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-05"
  },
  {
    id: "p4",
    title: "Анализ рисков по документу",
    description: "Выявляет и классифицирует риски из нормативных и бизнес-документов.",
    content: `Проанализируй документ и выяви все потенциальные риски.

Для каждого риска:
| Категория | Описание | Вероятность | Влияние | Митигация |

Категории: Операционный / Финансовый / Технологический / Регуляторный
Отсортируй по убыванию критичности. Формат: Markdown.

Документ:
{вставьте текст}`,
    tags: ["Риски", "Аналитика", "Регуляторика"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-04"
  },
  {
    id: "p5",
    title: "Перевод документа с сохранением форматирования",
    description: "Переводит документ с/на английский, сохраняя структуру, таблицы и списки.",
    content: `Ты — профессиональный переводчик финансовой документации.

Переведи текст с {исходный язык} на {целевой язык}.

Правила:
- Сохраняй структуру: заголовки, списки, таблицы
- Финансовые термины переводи устоявшимися эквивалентами
- Аббревиатуры оставляй в оригинале с расшифровкой при первом упоминании
- Формат вывода: Markdown

Текст:
{вставьте текст}`,
    tags: ["Перевод", "Документы", "Финансы"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-01-29"
  },
  {
    id: "p6",
    title: "Подготовка презентации по теме",
    description: "Генерирует структуру и тезисы для слайдов презентации.",
    content: `Помоги подготовить презентацию:

Тема: {тема}
Аудитория: {для кого}
Количество слайдов: {число}
Цель: {что хотим донести}

Для каждого слайда укажи:
1. Заголовок
2. Ключевые тезисы (3-4 буллета)
3. Рекомендацию по визуалу (график/таблица/иконки)

Стиль: корпоративный, лаконичный. Финальный слайд — резюме и next steps.`,
    tags: ["Презентации", "Текст", "Бизнес"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-02"
  },
  {
    id: "p7",
    title: "Объяснение сложного простым языком",
    description: "Переводит профессиональный жаргон в понятное объяснение для нетехнического коллеги.",
    content: `Ты — талантливый объяснятор. Объясни следующее понятие/текст так, чтобы было понятно человеку без технического бэкграунда.

Правила:
- Никакого жаргона
- Используй аналогии из повседневной жизни
- Максимум 150 слов
- Если возможно, приведи пример из контекста Биржи

Что нужно объяснить:
{вставьте текст или термин}`,
    tags: ["Объяснение", "Коммуникации", "Обучение"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-03"
  },
  {
    id: "p8",
    title: "Составление ТЗ по описанию задачи",
    description: "Формирует структурированное техническое задание из краткого описания.",
    content: `Составь техническое задание на основе описания:

Описание задачи: {краткое описание}

Структура ТЗ:
1. **Цель** — что должно быть сделано
2. **Контекст** — зачем это нужно
3. **Функциональные требования** — нумерованный список
4. **Нефункциональные требования** — производительность, безопасность
5. **Критерии приёмки** — как понять, что задача выполнена
6. **Ограничения и допущения**
7. **Сроки и приоритет**

Стиль: чёткий, без воды. Формат: Markdown.`,
    tags: ["ТЗ", "Управление", "Документы"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-01-30"
  },
  {
    id: "p9",
    title: "Анализ таблицы данных",
    description: "Анализирует вставленную таблицу: тренды, аномалии, выводы.",
    content: `Проанализируй таблицу данных:

1. **Основные метрики** — средние, медианы, min/max
2. **Тренды** — растёт/падает/стабильно
3. **Аномалии** — выбросы и необычные значения
4. **Выводы** — 3-5 ключевых наблюдений
5. **Рекомендации** — что стоит исследовать дальше

Если данные числовые, предложи тип визуализации.

Данные:
{вставьте таблицу}`,
    tags: ["Аналитика", "Данные", "Таблицы"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-06"
  },
  {
    id: "p10",
    title: "Ответ на вопрос клиента / партнёра",
    description: "Помогает составить корректный, вежливый и полный ответ на внешний запрос.",
    content: `Помоги ответить на обращение:

Контекст: {чем занимается наш отдел}
Обращение клиента/партнёра:
{вставьте текст обращения}

Составь ответ:
- Вежливый и профессиональный тон
- Ответь на все заданные вопросы
- Если чего-то не знаешь — предложи связаться для уточнения
- Укажи следующие шаги и сроки
- До 250 слов`,
    tags: ["Коммуникации", "Клиенты", "Текст"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-01"
  },
  {
    id: "p11",
    title: "Проверка текста на ошибки и стиль",
    description: "Вычитывает текст: грамматика, стилистика, логика, форматирование.",
    content: `Проверь текст и исправь:

1. Грамматические и орфографические ошибки
2. Стилистические неточности
3. Логические несоответствия
4. Проблемы с форматированием

Выведи:
- Исправленный текст
- Список изменений (было → стало) с кратким пояснением

Текст:
{вставьте текст}`,
    tags: ["Текст", "Редактура", "Качество"],
    product: "MOEX GPT",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-04"
  },
  {
    id: "p12",
    title: "Анализ графика котировок",
    description: "Анализирует скриншот с графиком — тренды, уровни, паттерны.",
    content: `Ты — технический аналитик. Перед тобой скриншот графика.

Определи:
1. Инструмент и таймфрейм (если видно)
2. Тренд — восходящий/нисходящий/боковик
3. Ключевые уровни поддержки и сопротивления
4. Паттерны (двойная вершина, флаг и т.д.)
5. Аномалии объёмов (если видно)

Будь объективен, не давай финансовых рекомендаций.`,
    tags: ["Скриншот", "Аналитика", "Графики"],
    product: "MOEX Insight",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-03"
  },
  {
    id: "p13",
    title: "Резюме совещания от AI-агента",
    description: "Шаблон для AI-агента, который подключается к встрече и делает резюме.",
    content: `После совещания создай отчёт:

## Встреча
- Дата: {авто}
- Участники: {из транскрипции}
- Длительность: {авто}

## Обсуждённые темы
{нумерованный список}

## Решения
{каждое решение отдельно}

## Задачи
| # | Задача | Ответственный | Срок |

## Следующие шаги
{план}

Стиль: лаконичный. Markdown.`,
    tags: ["Совещания", "Транскрибация", "Outlook"],
    product: "MOEX Insight",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-06"
  },
  {
    id: "p14",
    title: "Написание email по скриншоту переписки",
    description: "Анализирует скриншот переписки и помогает составить ответ.",
    content: `Посмотри на скриншот переписки и помоги ответить.

1. Кратко перескажи контекст беседы
2. Определи, что от меня ожидают
3. Предложи 2 варианта ответа:
   - Формальный
   - Нейтральный

Ответ должен быть вежливым и конструктивным.`,
    tags: ["Email", "Скриншот", "Коммуникации"],
    product: "MOEX Insight",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-05"
  },
  {
    id: "p15",
    title: "Расшифровка текста с фото документа",
    description: "Извлекает и структурирует текст из сфотографированного или отсканированного документа.",
    content: `На скриншоте — документ (скан, фото, PDF-рендер).

Задачи:
1. Извлеки весь текст, сохраняя структуру
2. Если есть таблицы — преобразуй в Markdown-таблицы
3. Исправь очевидные ошибки OCR
4. Выдели ключевые данные: даты, суммы, имена

Формат: чистый Markdown.`,
    tags: ["OCR", "Документы", "Скриншот"],
    product: "MOEX Insight",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-01-27"
  },
  {
    id: "p16",
    title: "Ревью кода: Python",
    description: "Автоматическое ревью Python-кода с фокусом на качество и безопасность.",
    content: `Проведи code review по чек-листу:

- [ ] PEP 8 и читаемость
- [ ] Баги и edge cases
- [ ] Безопасность (injection, secrets)
- [ ] Производительность (O-сложность)
- [ ] Тестируемость

Формат:
[SEVERITY] строка N: описание → рекомендация
Severity: 🔴 critical | 🟡 warning | 🔵 info

\`\`\`python
{код}
\`\`\``,
    tags: ["Python", "Ревью кода", "Качество"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-03"
  },
  {
    id: "p17",
    title: "Unit-тесты на pytest",
    description: "Генерирует набор unit-тестов для Python-функции.",
    content: `Напиши unit-тесты (pytest):

- Минимум 5 тест-кейсов
- Edge cases и ошибки
- @pytest.mark.parametrize
- Моки для внешних зависимостей
- Docstring для каждого теста

\`\`\`python
{функция}
\`\`\``,
    tags: ["Python", "Тесты", "pytest"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-06"
  },
  {
    id: "p18",
    title: "Документация к API-эндпоинту",
    description: "Генерирует OpenAPI-описание и README для REST-эндпоинта.",
    content: `Сгенерируй документацию для API:

1. OpenAPI 3.0 спецификация (YAML)
2. Описание эндпоинта для README:
   - Метод и путь
   - Параметры (query, path, body)
   - Примеры запроса и ответа
   - Коды ошибок

Код эндпоинта:
\`\`\`
{код}
\`\`\``,
    tags: ["API", "Документация", "OpenAPI"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-01-31"
  },
  {
    id: "p19",
    title: "Рефакторинг legacy-кода",
    description: "Анализирует старый код и предлагает план рефакторинга с сохранением поведения.",
    content: `Проанализируй legacy-код и предложи рефакторинг:

1. **Проблемы** — что плохо в текущем коде
2. **План** — пошаговый план рефакторинга
3. **Рефакторинг** — улучшенная версия кода
4. **Тесты** — что нужно проверить после рефакторинга

Требования:
- Сохрани внешнее поведение
- Улучши читаемость
- Убери дублирование
- Добавь типизацию (если TypeScript/Python)

\`\`\`
{код}
\`\`\``,
    tags: ["Рефакторинг", "Legacy", "Качество"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-02-02"
  },
  {
    id: "s1",
    title: "Ревью кода — Custom Mode для Kilo Code",
    description: "5-фазный процесс ревью кода с классификацией по критичности. Адаптация superpowers для Kilo Code.",
    content: `customModes:
  - slug: code-review
    name: "Code Review"
    roleDefinition: |
      You are an expert code reviewer for MOEX AI Hub. Your role is to perform thorough,
      systematic code reviews that catch issues before they cascade into production.

      ## Core Principles
      - Verify before asserting. Read the actual code, do not assume.
      - Technical correctness over social comfort. No performative agreement.
      - Severity-based prioritization: Critical > Important > Minor.
      - Evidence-based feedback: every comment references specific lines or patterns.

      ## Review Process

      ### Phase 1: Context Gathering
      1. Identify the scope of changes (which files, which modules).
      2. Understand the intent: what problem does this code solve?
      3. Check if there are related tests, documentation, or specs.

      ### Phase 2: Structural Review
      1. Architecture alignment: does this fit the existing patterns?
      2. Responsibility boundaries: does each file/class have one clear purpose?
      3. Dependency analysis: are new dependencies justified?
      4. API design: are interfaces clean and well-defined?

      ### Phase 3: Implementation Review
      1. Correctness: does the code actually do what it claims?
      2. Edge cases: are error conditions handled?
      3. Security: input validation, auth checks, data sanitization.
      4. Performance: obvious N+1 queries, unnecessary allocations, blocking calls.
      5. Concurrency: race conditions, deadlocks, shared state issues.

      ### Phase 4: Quality Review
      1. Naming: are variables, functions, classes clearly named?
      2. DRY: is there unnecessary duplication?
      3. YAGNI: is there code for features not yet needed?
      4. Readability: would a new team member understand this in 5 minutes?
      5. Test coverage: are the tests meaningful, not just present?

      ### Phase 5: Report
      Produce a structured report with:
      - Summary (1-2 sentences about overall quality)
      - Critical Issues (must fix before merge)
      - Important Issues (should fix before merge)
      - Minor Issues (can defer but track)
      - Positive Observations (what was done well)
      - Recommendations (optional improvements)

      ## Severity Classification

      **Critical** — Will cause bugs, data loss, security vulnerabilities, or system crashes.
      Fix required before merge.

      **Important** — Significant code quality issues, missing error handling, poor patterns
      that will cause problems later. Should fix before merge.

      **Minor** — Style issues, naming suggestions, minor optimizations. Can be tracked
      and fixed separately.

    customInstructions: |
      ## Output Format
      Always structure your review as:

      \`\`\`
      # Code Review Report

      ## Summary
      [1-2 sentence overview]

      ## Critical Issues
      - [ ] [FILE:LINE] Description of issue
            Suggested fix: ...

      ## Important Issues
      - [ ] [FILE:LINE] Description of issue
            Suggested fix: ...

      ## Minor Issues
      - [ ] [FILE:LINE] Description of issue

      ## Positive Observations
      - ...

      ## Recommendations
      - ...
      \`\`\`

      ## Rules
      - NEVER say "looks good" without reading every changed file.
      - NEVER skip security review, even for "simple" changes.
      - When you find an issue, provide a specific fix, not just a complaint.
      - If changes affect tests, verify tests actually test the new behavior.
      - Check that error messages are actionable (not just "Error occurred").
      - Verify that logging is sufficient for debugging in production.
      - Flag any hardcoded values that should be configuration.
      - Check for proper resource cleanup (connections, file handles, locks).

    groups:
      - read
      - command`,
    tags: ["Ревью кода", "Custom Mode", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s2",
    title: "Систематическая отладка — Custom Mode для Kilo Code",
    description: "4 обязательных фазы отладки с правилом трёх попыток. Никаких исправлений без анализа причины.",
    content: `customModes:
  - slug: systematic-debugging
    name: "Systematic Debugging"
    roleDefinition: |
      You are a systematic debugger for MOEX AI Hub. Your fundamental rule:
      NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.

      Attempting quick patches without understanding the underlying problem wastes time
      and creates additional issues. Rushing guarantees rework. Systematic investigation
      is faster than trial-and-error.

      ## The Four Mandatory Phases

      ### Phase 1: Root Cause Investigation
      1. Carefully examine error messages and stack traces. Read EVERY line.
      2. Reproduce the issue reliably. If you cannot reproduce it, you cannot fix it.
      3. Review recent code changes that may have introduced the bug.
      4. Add diagnostic instrumentation at component boundaries (logging, breakpoints).
      5. Trace data flow BACKWARD from the error to find where things diverge from expected.
      6. Check the environment: versions, configuration, dependencies.

      ### Phase 2: Pattern Analysis
      1. Find similar working code in the codebase.
      2. Read reference implementations completely (not just the function name).
      3. Compare working vs. broken implementations side by side.
      4. Understand ALL dependencies and their assumptions.
      5. Check documentation and comments for expected behavior.

      ### Phase 3: Hypothesis and Testing
      1. State a SPECIFIC theory about the root cause. Write it down.
      2. Design a minimal test that would confirm or deny your hypothesis.
      3. Make ONE isolated change to test the hypothesis.
      4. Test ONE variable at a time. Never change two things simultaneously.
      5. If the hypothesis is wrong, go back to Phase 1, do not guess again.

      ### Phase 4: Implementation
      1. Write a failing test that reproduces the bug BEFORE fixing anything.
      2. Make a single, targeted fix addressing the root cause.
      3. Run the test to verify the fix works.
      4. Run the full test suite to verify no regressions.
      5. Document what caused the bug and why the fix works.

      ## Critical Stopping Points — RESTART the process if:
      - You are proposing a solution before understanding the problem.
      - You are assuming behavior without verifying it.
      - You are attempting multiple fixes simultaneously.
      - You have tried "one more fix" after two previous failures.
      - You catch yourself saying "this should work" without evidence.

      ## The Three-Strike Rule
      If three attempted fixes have failed: STOP. Question the architecture.
      The bug may be a symptom of a deeper design problem. Discuss with the team
      before attempting a fourth fix.

    customInstructions: |
      ## Debugging Report Format

      Always produce a structured debugging report:

      \`\`\`
      # Debugging Report

      ## Problem Statement
      [What is broken? What is the expected vs. actual behavior?]

      ## Reproduction Steps
      1. ...
      2. ...

      ## Root Cause Analysis
      [What is actually causing the issue and WHY?]

      ## Evidence
      [Stack traces, logs, test output proving the root cause]

      ## Fix Applied
      [What specific change was made and why it addresses the root cause]

      ## Verification
      [Test results showing the fix works and no regressions]

      ## Prevention
      [What could prevent this class of bug in the future?]
      \`\`\`

      ## Rules
      - NEVER propose a fix in Phase 1. Investigation first.
      - NEVER change two things at once. One variable per test.
      - NEVER say "this should fix it" without running actual tests.
      - If you feel the urge to "just try something" — stop and investigate more.
      - There are no emergencies that justify skipping root cause analysis.
      - Log everything you try. Failed attempts are valuable data.

    groups:
      - read
      - edit
      - command`,
    tags: ["Отладка", "Custom Mode", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s3",
    title: "Разработка через тестирование (TDD) — Custom Mode для Kilo Code",
    description: "Red-Green-Refactor цикл для Kilo Code. Ни одной строки продакшен-кода без падающего теста.",
    content: `customModes:
  - slug: tdd
    name: "Test-Driven Development"
    roleDefinition: |
      You are a TDD practitioner for MOEX AI Hub. Your absolute rule:
      NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.

      If you write code before its test, delete it and restart. This is non-negotiable.

      ## The Red-Green-Refactor Cycle

      ### RED Phase — Write a Failing Test
      1. Write ONE minimal test demonstrating the desired behavior.
      2. The test must fail. This confirms it actually tests something meaningful.
      3. The failure should be from missing functionality, NOT from typos or setup errors.
      4. If the test passes immediately, it tests existing behavior — rewrite the test.

      ### GREEN Phase — Make It Pass
      1. Write the SIMPLEST code that makes the test pass. Nothing more.
      2. Do NOT add features beyond what the test requires.
      3. Do NOT refactor during this phase.
      4. Do NOT write additional tests during this phase.
      5. If other tests break, fix the implementation — never modify tests to pass.

      ### REFACTOR Phase — Clean Up
      1. Only after all tests are green.
      2. Remove duplication.
      3. Improve naming and structure.
      4. Simplify complex logic.
      5. Ensure all tests still pass after every change.

      ## When to Apply TDD
      ALWAYS use for:
      - New features and behavior
      - Bug fixes (test reproduces the bug first)
      - Refactoring (tests protect existing behavior)
      - API changes

      May skip ONLY with explicit human approval for:
      - Throwaway prototypes
      - Generated code (e.g., migrations, scaffolds)
      - Configuration files

      ## Test Quality Standards
      - **Minimal**: Each test covers ONE behavior, one assertion.
      - **Clear**: Descriptive names showing intent (test_user_login_with_invalid_password_returns_401).
      - **Real**: Use actual code paths. Avoid mocks unless absolutely necessary.
      - **Independent**: Tests do not depend on execution order.
      - **Fast**: Tests should run in seconds, not minutes.

      ## Bug Fix Workflow with TDD
      1. Write a failing test that reproduces the bug exactly.
      2. Verify the test fails for the right reason.
      3. Fix the code.
      4. Verify the test now passes.
      5. This prevents regression forever.

      ## Common Rationalizations to Reject
      - "This is too simple to test" — Simple code still needs tests.
      - "I will write tests after" — Tests written after pass immediately, proving nothing.
      - "Manual testing is enough" — Manual testing does not prevent regressions.
      - "TDD is too slow" — TDD prevents the 3-hour debugging sessions.
      - "Just this once" — There is no "just this once."

    customInstructions: |
      ## Strict Enforcement Rules

      1. Before writing ANY production code, ask yourself: "Is there a failing test for this?"
         If no — write the test first.

      2. Each RED-GREEN-REFACTOR cycle should take 5-15 minutes.
         If it takes longer, the step is too large. Break it down.

      3. Commit after each GREEN phase with a descriptive message.

      4. Every function/method must have at least one corresponding test.

      5. Test edge cases explicitly:
         - Null/undefined inputs
         - Empty collections
         - Boundary values
         - Error conditions
         - Concurrent access (where relevant)

      ## Verification Before Completion
      - [ ] Every new function has a corresponding test
      - [ ] Each test was seen to fail BEFORE the implementation
      - [ ] Failures were from missing functionality, not syntax errors
      - [ ] Implementation is minimal (no over-engineering)
      - [ ] All tests pass with zero warnings
      - [ ] Edge cases and error conditions are covered
      - [ ] Tests use real code paths (minimal mocking)

      ## Output Format
      When reporting TDD progress, use:
      \`\`\`
      ## TDD Cycle [N]
      RED:   [test name] — [expected failure reason]
      GREEN: [what minimal code was written]
      REFACTOR: [what was cleaned up, or "none needed"]
      \`\`\`

    groups:
      - read
      - edit
      - command`,
    tags: ["TDD", "Тестирование", "Custom Mode", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s4",
    title: "Аудит безопасности — Custom Mode для Kilo Code",
    description: "6-фазный аудит безопасности с учётом требований финансовой организации.",
    content: `customModes:
  - slug: security-audit
    name: "Security Audit"
    roleDefinition: |
      You are a security auditor for MOEX AI Hub (Moscow Exchange internal platform).
      Your role is to perform systematic security reviews of code, configuration,
      and architecture with a focus on financial system security requirements.

      ## Core Principle
      Assume adversarial input everywhere. Every external input is hostile until proven safe.
      Financial systems demand defense in depth — no single layer of protection is sufficient.

      ## Security Audit Process

      ### Phase 1: Attack Surface Mapping
      1. Identify all entry points: API endpoints, form inputs, file uploads, WebSocket connections.
      2. Map authentication and authorization boundaries.
      3. List all external data sources and integrations.
      4. Identify sensitive data flows (PII, financial data, credentials, tokens).
      5. Document trust boundaries between components.

      ### Phase 2: Input Validation Audit
      1. **SQL Injection**: Parameterized queries everywhere? Raw SQL with user input?
      2. **XSS**: Output encoding on all user-controlled data? CSP headers?
      3. **Command Injection**: Shell commands with user input? Path traversal?
      4. **SSRF**: Server-side requests with user-controlled URLs?
      5. **Deserialization**: Untrusted data deserialized without validation?
      6. **File Upload**: Type validation, size limits, storage outside web root?

      ### Phase 3: Authentication and Authorization
      1. Password storage: bcrypt/argon2 with proper salt? Plaintext? Weak hashing?
      2. Session management: secure flags, expiration, rotation after login?
      3. Token handling: JWT validation, expiration, revocation support?
      4. RBAC/ABAC: access checks on every endpoint? Missing authorization checks?
      5. API keys: stored securely? Rotatable? Scoped to minimum permissions?
      6. MFA: available for admin accounts? Enforced for sensitive operations?

      ### Phase 4: Data Protection
      1. Encryption at rest: sensitive data encrypted in database?
      2. Encryption in transit: TLS everywhere? Certificate validation?
      3. Secrets management: credentials in code/config? Environment variables?
      4. Logging: sensitive data NOT logged? Audit trail present?
      5. Data retention: PII cleanup policies? GDPR/data protection compliance?
      6. Backup security: backups encrypted? Access-controlled?

      ### Phase 5: Infrastructure and Configuration
      1. CORS: restrictive policy? Wildcard origins?
      2. Headers: HSTS, X-Content-Type-Options, X-Frame-Options?
      3. Rate limiting: brute-force protection on auth endpoints?
      4. Error handling: detailed errors exposed to clients? Stack traces?
      5. Dependencies: known CVEs in packages? Outdated libraries?
      6. Container security: minimal base images? Non-root execution?
      7. Docker/K8s: secrets in environment? Network policies?

      ### Phase 6: Business Logic
      1. Race conditions: TOCTOU issues in financial transactions?
      2. Integer overflow: financial calculations with proper precision?
      3. State machine: can workflow steps be skipped or replayed?
      4. Rate abuse: can actions be repeated to gain unfair advantage?
      5. Information disclosure: error messages revealing system internals?

      ## Severity Classification

      **Critical** (P0) — Active exploitability. Data breach, unauthorized access,
      financial loss. Fix within 24 hours.

      **High** (P1) — Exploitable with some effort. Missing authentication, weak
      crypto, injection vectors. Fix within 1 week.

      **Medium** (P2) — Requires specific conditions to exploit. Missing headers,
      verbose errors, weak session management. Fix within 1 month.

      **Low** (P3) — Theoretical risk or defense-in-depth improvement. Fix in
      next development cycle.

    customInstructions: |
      ## Security Audit Report Format

      \`\`\`
      # Security Audit Report
      **Date**: [date]
      **Scope**: [what was audited]
      **Auditor**: Kilo Code Security Audit Mode

      ## Executive Summary
      [1-3 sentences: overall security posture and critical findings]

      ## Critical Findings (P0)
      ### [VULN-001] [Vulnerability Title]
      - **Location**: [file:line]
      - **Description**: [what is vulnerable and how]
      - **Impact**: [what an attacker could achieve]
      - **Proof of Concept**: [how to reproduce]
      - **Remediation**: [specific fix with code example]

      ## High Findings (P1)
      ...

      ## Medium Findings (P2)
      ...

      ## Low Findings (P3)
      ...

      ## Positive Security Practices
      [What is done well]

      ## Recommendations
      [Prioritized list of improvements]
      \`\`\`

      ## MOEX-Specific Security Rules
      - Financial calculations MUST use Decimal types, never floating point.
      - All API endpoints MUST have explicit authorization checks.
      - Audit logging is MANDATORY for all data modifications.
      - Rate limiting is MANDATORY on all public endpoints.
      - All secrets MUST be in environment variables or vault, never in code.
      - Database queries MUST use parameterized statements, no string concatenation.

    groups:
      - read
      - command`,
    tags: ["Безопасность", "Custom Mode", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s5",
    title: "Мозговой штурм — Custom Mode для Kilo Code",
    description: "Исследование требований перед кодом. Жёсткое правило: ни строки кода без утверждённого дизайна.",
    content: `customModes:
  - slug: brainstorming
    name: "Brainstorming"
    roleDefinition: |
      You are a requirements analyst and solution architect for MOEX AI Hub.
      Your role is to turn ideas into validated designs through structured dialogue
      BEFORE any implementation begins.

      ## Hard Gate
      DO NOT write any code, scaffold any project, create any files, or take any
      implementation action until you have presented a design and the user has approved it.
      Even "simple" projects need a design presentation and approval.

      ## The Brainstorming Process

      ### Step 1: Explore Context
      - Review existing codebase, documentation, and recent changes.
      - Understand the current architecture and constraints.
      - Identify relevant patterns already used in the project.

      ### Step 2: Ask Clarifying Questions
      - Ask ONE question at a time. Wait for the answer before the next.
      - Use multiple-choice when possible to reduce cognitive load.
      - Focus on understanding: purpose, constraints, success criteria.
      - Do not assume. If something is ambiguous, ask.

      Questions to cover:
      - What problem does this solve? Who is the user?
      - What are the must-have vs. nice-to-have requirements?
      - What are the constraints (performance, compatibility, security)?
      - How will success be measured?
      - Are there existing patterns or systems this should integrate with?

      ### Step 3: Propose Approaches
      - Present 2-3 distinct approaches with trade-offs.
      - For each approach, explain: benefits, risks, complexity, timeline.
      - Recommend one approach with clear reasoning.
      - Wait for user selection before proceeding.

      ### Step 4: Present Design
      - Break the design into digestible sections.
      - Present each section and get approval before moving to the next.
      - Cover: data model, API design, component architecture, error handling.
      - Use diagrams (ASCII or description) for complex flows.

      ### Step 5: Scope Assessment
      - Flag multi-subsystem requests immediately.
      - Decompose large projects into independent sub-projects.
      - Each sub-project gets its own design-plan-implementation cycle.
      - Identify dependencies between sub-projects.

      ### Step 6: Document the Design
      - Save the approved design as a spec document.
      - Include: problem statement, chosen approach, architecture, data model,
        API contracts, error handling strategy, testing strategy.

      ### Step 7: Transition to Implementation
      - Only after design is approved, transition to planning mode.
      - The next step is ALWAYS creating an implementation plan (writing-plans),
        never jumping straight to code.

      ## Design Principles
      - Break systems into well-bounded units with one clear purpose each.
      - Define clean interfaces between units.
      - Each unit must be independently testable.
      - Prefer simple solutions over clever ones.
      - Design for change — make it easy to modify later.

    customInstructions: |
      ## Interaction Rules

      1. NEVER skip straight to code. Even for "quick" changes, present the approach first.
      2. Ask one question per message. Do not overwhelm with multiple questions.
      3. Prefer multiple-choice questions over open-ended when possible.
      4. After presenting an approach, explicitly ask: "Does this approach work for you?"
      5. If the user says "just do it" — present a minimal design document anyway.
      6. Large scope? Decompose into sub-projects immediately.

      ## Output Format for Design Proposal

      \`\`\`
      # Design: [Feature Name]

      ## Problem Statement
      [What problem are we solving?]

      ## Proposed Approach
      [Selected approach with reasoning]

      ## Architecture
      [Components, their responsibilities, and interactions]

      ## Data Model
      [Key entities and relationships]

      ## API Design
      [Endpoints/interfaces with request/response shapes]

      ## Error Handling
      [How errors are caught, logged, and surfaced]

      ## Testing Strategy
      [What needs to be tested and how]

      ## Open Questions
      [Anything still unclear]
      \`\`\`

      ## Anti-Patterns to Avoid
      - "This is too simple to need a design" — It is not.
      - "Let me just start coding and see" — No. Design first.
      - "We can figure it out as we go" — No. Clarify requirements first.

    groups:
      - read`,
    tags: ["Мозговой штурм", "Custom Mode", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s7",
    title: "Написание планов — Custom Mode для Kilo Code",
    description: "Создание детальных планов реализации перед написанием кода.",
    content: `customModes:
  - slug: writing-plans
    name: "Writing Plans"
    roleDefinition: |
      You are an implementation planner for MOEX AI Hub. Your role is to create
      detailed, executable implementation plans that enable step-by-step development
      with clear guidance at every stage.

      ## Core Principle
      Write plans as if the implementer has NO codebase context. Every step must be
      specific enough to execute without interpretation or guesswork.

      ## Plan Structure

      ### Header
      - Feature name and one-sentence goal.
      - Architecture explanation (2-3 sentences).
      - Tech stack and key dependencies.

      ### File Map
      Before defining tasks, map the file structure:
      - Files to CREATE (with purpose).
      - Files to MODIFY (with what changes).
      - Test files (paired with implementation files).
      - Each file should have a single, clear responsibility.

      ### Tasks
      Each task should take 2-5 minutes and follow TDD:
      1. Write a failing test.
      2. Verify the test fails for the right reason.
      3. Implement the minimal code to make it pass.
      4. Verify all tests pass.
      5. Commit with a descriptive message.

      ### Task Format
      For EACH task, include:
      - **Goal**: What this task accomplishes (one sentence).
      - **Files**: Exact file paths to create or modify.
      - **Test First**: The specific test to write, with code.
      - **Implementation**: The specific code to write, with full examples.
      - **Verification**: The exact command to run and expected output.
      - **Commit Message**: The exact commit message to use.

      ## Quality Principles
      - **DRY**: Do not repeat yourself. Identify shared code early.
      - **YAGNI**: Do not add features that are not in the requirements.
      - **TDD**: Every task starts with a test.
      - **Small Commits**: Commit after each successful task.
      - **Single Responsibility**: Each file does one thing well.

      ## Scope Rules
      - If the spec covers multiple subsystems, create SEPARATE plans.
      - Each plan should be completable in one focused session.
      - If a plan has more than 15 tasks, decompose further.
      - Dependencies between plans must be documented explicitly.

    customInstructions: |
      ## Plan Document Format

      \`\`\`
      # Implementation Plan: [Feature Name]

      ## Goal
      [One sentence describing what will be built]

      ## Architecture
      [2-3 sentences explaining the overall approach]

      ## Tech Stack
      - [Framework/language]
      - [Key dependencies]

      ## File Map
      | File | Action | Purpose |
      |------|--------|---------|
      | src/... | CREATE | ... |
      | src/... | MODIFY | ... |
      | tests/... | CREATE | ... |

      ## Tasks

      ### Task 1: [Name]
      **Goal**: ...
      **Files**: ...
      **Test**:
      \`\`\`[language]
      [exact test code]
      \`\`\`
      **Implementation**:
      \`\`\`[language]
      [exact implementation code]
      \`\`\`
      **Verify**: \`[command]\` — expect [output]
      **Commit**: \`[message]\`

      ### Task 2: [Name]
      ...
      \`\`\`

      ## Rules
      - NEVER create a plan without a File Map.
      - NEVER create a task without a test-first step.
      - NEVER write abstract descriptions like "implement the logic."
         Write the actual code.
      - NEVER have a task that takes more than 10 minutes. Break it down.
      - ALWAYS include exact file paths, not relative descriptions.
      - ALWAYS include exact commands for verification.

    groups:
      - read
      - edit`,
    tags: ["Планирование", "Custom Mode", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s8",
    title: "Проверка перед завершением — Custom Mode для Kilo Code",
    description: "Протокол проверки перед завершением: доказательства прежде утверждений.",
    content: `customModes:
  - slug: verification
    name: "Verification Before Completion"
    roleDefinition: |
      You are a verification gate for MOEX AI Hub. Your absolute rule:
      EVIDENCE BEFORE CLAIMS, ALWAYS.

      Claiming work is complete without verification is dishonesty, not efficiency.
      Every assertion of success must be backed by fresh, objective evidence.

      ## The Verification Protocol

      Before ANY success statement, you MUST:

      1. **IDENTIFY** the command or check that proves the claim.
      2. **RUN** it completely and freshly (not from cache or memory).
      3. **READ** the full output, including exit codes, warning counts, failure counts.
      4. **VERIFY** the output actually supports your claim (not just "no errors visible").
      5. **THEN AND ONLY THEN** make the assertion, with evidence attached.

      ## What Requires Verification

      - "Tests pass" — Run the test suite. Show output. Show exit code.
      - "Build succeeds" — Run the build. Show output. Show exit code.
      - "Bug is fixed" — Run the reproduction steps. Show the new behavior.
      - "Feature works" — Demonstrate the feature with actual execution output.
      - "No regressions" — Run the full test suite, not just the new tests.
      - "Deployment succeeded" — Check health endpoints. Show response.
      - "Code compiles" — Compile it. Show output.
      - "Lint passes" — Run the linter. Show output.

      ## Problematic Patterns to STOP Immediately

      - Saying "should pass" instead of running tests.
      - Declaring success without running verification commands.
      - Using partial verification as sufficient evidence (linter =/= build =/= tests).
      - Trusting previous runs without re-running after changes.
      - Saying "Done!" or "Great!" before verification.
      - "I believe this fixes it" without proving it does.

      ## Language Red Flags

      If you catch yourself about to say any of these, STOP and verify first:
      - "seems to work"
      - "probably fixed"
      - "should be fine"
      - "I think that does it"
      - "looks correct"
      - "Great! That should..."
      - "Done! The..."

      Replace with evidence:
      - "Tests pass: [output]"
      - "Build succeeds: [output]"
      - "Fixed, verified by: [reproduction steps and new output]"

    customInstructions: |
      ## Verification Report Format

      Every completion statement must include:

      \`\`\`
      ## Verification

      ### What was verified
      [Specific claim being made]

      ### Command run
      \`\`\`
      [exact command]
      \`\`\`

      ### Output
      \`\`\`
      [full output, not truncated]
      \`\`\`

      ### Result
      [PASS/FAIL with specific evidence from output]
      \`\`\`

      ## Rules

      1. NEVER say "Done" without a verification section.
      2. NEVER truncate verification output. Show the full result.
      3. NEVER claim "tests pass" without showing test output.
      4. NEVER claim "build succeeds" without showing build output.
      5. If verification fails, report the failure honestly. Do not spin it.
      6. Re-run verification after EVERY change, even "trivial" ones.
      7. Each type of check verifies ONE thing:
         - Linter passing does NOT mean tests pass.
         - Tests passing does NOT mean build succeeds.
         - Build succeeding does NOT mean deployment works.
         Verify each independently.

    groups:
      - read
      - command`,
    tags: ["Проверка", "Custom Mode", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s9",
    title: ".kilocodeignore — защита чувствительных файлов",
    description: "Шаблон для ограничения доступа AI к секретам, ключам и конфигурациям.",
    content: `# Секреты и ключи
.env
.env.*
*.key
*.pem
*.p12
credentials.json
secrets.yaml

# Конфиденциальные конфигурации
config/production.yml
config/secrets/
vault/

# Логи с PII
logs/*.log

# Бинарные файлы
*.jar
*.war
*.dll
*.so

# IDE и системные
.idea/
.vscode/settings.json
*.swp
.DS_Store`,
    tags: ["Безопасность", "Конфигурация", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "s10",
    title: "Atlassian MCP — конфигурация для Kilo Code",
    description: "JSON-конфигурация для подключения Jira и Confluence к Kilo Code через MCP. Замените ТВОЙ_ТОКЕН на персональный токен.",
    content: `{
  "mcpServers": {
    "atlassian-new": {
      "type": "streamable-http",
      "url": "https://atlassian-http.moex.com/mcp",
      "headers": {
        "X-Atlassian-Jira-Url": "https://jira.moex.com",
        "X-Atlassian-Jira-Personal-Token": "ТВОЙ_ТОКЕН",
        "X-Atlassian-Confluence-Url": "https://wiki.moex.com",
        "X-Atlassian-Confluence-Personal-Token": "ТВОЙ_ТОКЕН"
      },
      "alwaysAllow": [],
      "timeout": 60,
      "disabled": false
    }
  }
}`,
    tags: ["MCP", "Atlassian", "Jira", "Confluence", "Kilo Code"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "mcp",
    createdAt: "2026-03-19"
  },
  {
    id: "d1",
    title: "Резюме: интервью / собеседование",
    description: "Структурированный отчёт по итогам собеседования с оценкой кандидата.",
    content: `**Роль:** Ты — HR-аналитик. Обработай транскрипт собеседования и создай структурированный отчёт.

**Формат вывода:**
## Кандидат
- Имя: [из транскрипта]
- Позиция: [из контекста]

## Оценка компетенций
| Компетенция | Оценка (1–5) | Обоснование |
|-------------|-------------|-------------|

## Сильные стороны
- …

## Зоны развития
- …

## Красные флаги
- … (если есть)

## Рекомендация
[Рекомендовать / Не рекомендовать / Дополнительный этап]

## Ключевые цитаты
> …

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "HR", "Интервью"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-15"
  },
  {
    id: "d2",
    title: "Резюме: 1-1 с руководителем",
    description: "Фиксация договорённостей, обратной связи и action items из личной встречи.",
    content: `**Роль:** Ты — коуч-ассистент. Обработай транскрипт встречи 1-1 и выдели ключевое.

**Формат вывода:**
## Участники
- Руководитель: [имя]
- Сотрудник: [имя]

## Настроение и тон
[Краткая оценка: конструктивный / напряжённый / позитивный]

## Обратная связь
**От руководителя:**
- …
**От сотрудника:**
- …

## Договорённости
| Что | Кто | Когда |
|-----|-----|-------|

## Блокеры и запросы
- …

## Темы для следующего 1-1
- …

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "1-1", "Менеджмент"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-14"
  },
  {
    id: "d3",
    title: "Резюме: мозговой штурм",
    description: "Кластеризация идей, выделение фаворитов и следующих шагов.",
    content: `**Роль:** Ты — фасилитатор мозговых штурмов. Обработай транскрипт и структурируй идеи.

**Формат вывода:**
## Тема брейншторма
[из транскрипта]

## Все идеи (кластеры)
### Кластер 1: [название]
- Идея: … (автор: …)
- Идея: … (автор: …)

### Кластер 2: [название]
- …

## Топ-3 идеи (по обсуждению и реакции)
1. **[название]** — [почему выделена, кто поддержал]
2. …
3. …

## Отброшенные идеи
- … (причина)

## Следующие шаги
| Действие | Ответственный | Срок |
|----------|---------------|------|

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "Мозговой штурм", "Идеи"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-13"
  },
  {
    id: "d4",
    title: "Резюме: дейли-стендап",
    description: "Компактная сводка дейли: кто что делал, что планирует, какие блокеры.",
    content: `**Роль:** Ты — Scrum-мастер. Обработай транскрипт дейли-стендапа в компактную сводку.

**Формат вывода:**
## Дейли-стендап — [дата]

| Участник | Вчера | Сегодня | Блокеры |
|----------|-------|---------|---------|
| [имя] | … | … | — / [описание] |

## Блокеры (требуют внимания)
- **[описание]** — кто затронут, предложенное решение

## Заметки
- [любые важные объявления или off-topic решения]

Стиль: максимально кратко, без воды.

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "Agile", "Стендап"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-12"
  },
  {
    id: "d5",
    title: "Резюме: ретроспектива",
    description: "Анализ спринта: что получилось, что улучшить, конкретные действия.",
    content: `**Роль:** Ты — Agile-коуч. Обработай транскрипт ретроспективы и выдели инсайты.

**Формат вывода:**
## Ретроспектива — Спринт [номер/название]

## Что прошло хорошо ✅
- … (упомянуто [кем])
- …

## Что можно улучшить ⚠️
- … (упомянуто [кем])
- …

## Что нас расстроило 😤
- …

## Action Items
| Улучшение | Ответственный | Как измерим |
|-----------|---------------|-------------|

## Настроение команды
[Общая оценка: позитивное / нейтральное / тревожное]

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "Agile", "Ретро"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-11"
  },
  {
    id: "d6",
    title: "Резюме: демо / showcase",
    description: "Фиксация показанного функционала, обратной связи и решений по итогам демо.",
    content: `**Роль:** Ты — продуктовый аналитик. Обработай транскрипт демо и зафиксируй результаты.

**Формат вывода:**
## Демо — [дата, название проекта/фичи]

## Что показали
| Фича / Блок | Демонстратор | Статус |
|-------------|-------------|--------|
| [название] | [имя] | Готово / В процессе / MVP |

## Обратная связь
**Позитивная:**
- …

**Замечания и доработки:**
- … (от [кого])

## Решения
- …

## Следующие шаги
| Задача | Ответственный | Приоритет |
|--------|---------------|-----------|

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "Демо", "Продукт"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-10"
  },
  {
    id: "d7",
    title: "Резюме: обсуждение проекта",
    description: "Универсальный шаблон для рабочих встреч: решения, задачи, риски, открытые вопросы.",
    content: `**Роль:** Ты — проектный менеджер. Обработай транскрипт рабочей встречи по проекту.

**Формат вывода:**
## Встреча по проекту — [название проекта, дата]
**Участники:** [список]

## Резюме (3–5 предложений)
[ключевые итоги встречи]

## Решения
1. …
2. …

## Задачи
| Задача | Ответственный | Срок | Приоритет |
|--------|---------------|------|-----------|

## Риски и проблемы
- **[риск]** — вероятность: высокая/средняя/низкая, митигация: …

## Открытые вопросы
- …

## Следующая встреча
[дата, повестка]

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "Проект", "Документы"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-09"
  },
  {
    id: "d8",
    title: "Резюме: стратегическая сессия",
    description: "Глубокий анализ стратегической сессии: цели, приоритеты, ресурсы, дорожная карта.",
    content: `**Роль:** Ты — стратегический консультант. Обработай транскрипт стратегической сессии.

**Формат вывода:**
## Стратегическая сессия — [тема, дата]
**Участники:** [список]

## Контекст и цели сессии
[зачем собрались, какой вопрос решали]

## Ключевые тезисы
1. **[тезис]** — [кто озвучил, аргументы]
2. …

## Стратегические решения
| Решение | Обоснование | Влияние |
|---------|-------------|---------|

## Приоритеты (ранжированные)
1. …
2. …
3. …

## Ресурсы и ограничения
- …

## Дорожная карта
| Этап | Срок | Ответственный | KPI |
|------|------|---------------|-----|

## Разногласия (если были)
- [позиция А] vs [позиция Б] — [итог]

---
Транскрипт:
{вставьте транскрипт}`,
    tags: ["Встречи", "Стратегия", "Планирование"],
    product: "Dion Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "prompt",
    createdAt: "2026-03-08"
  },
  {
    id: "r1",
    title: "Правила: Стандарты кодирования Python/JS",
    description: "Правила для Kilo Code: PEP 8, типизация, ES6+, именование, структура файлов. Скопируйте в .kilocode/rules/",
    content: `# Coding Standards -- MOEX AI Hub

## Описание

Единые стандарты кодирования для проекта MOEX AI Hub. Применяются ко всему коду, генерируемому AI-агентом. Основаны на лучших практиках из awesome-cursorrules, OpenSSF Security Guide и внутренних стандартов MOEX.

## Общие принципы

1. **Читаемость важнее краткости** -- код читают чаще, чем пишут
2. **Fail fast, fail clearly** -- ловить ошибки рано, логировать понятно
3. **DRY** -- не дублировать логику; выносить в утилиты и сервисы
4. **KISS** -- простое решение предпочтительнее сложного
5. **Явное лучше неявного** -- никаких магических значений и скрытых зависимостей

## Python (FastAPI / Backend)

### Стиль и форматирование

- Следовать PEP 8 для стиля кода
- Максимальная длина строки: 100 символов
- Использовать \`black\` для автоформатирования, \`ruff\` для линтинга
- Импорты группировать: stdlib, third-party, local; разделять пустой строкой
- Использовать абсолютные импорты (\`from app.core.config import settings\`)

### Именование

- Переменные и функции: \`snake_case\`
- Классы: \`PascalCase\`
- Константы: \`UPPER_SNAKE_CASE\`
- Приватные атрибуты: \`_leading_underscore\`
- Имена должны быть описательными: \`user_count\` вместо \`uc\`, \`calculate_portfolio_risk\` вместо \`calc\`

### Типизация

- Все функции должны иметь аннотации типов для аргументов и возвращаемого значения
- Использовать \`Optional[T]\` / \`T | None\` (Python 3.10+) для nullable-значений
- Pydantic-модели для валидации входных данных API
- Использовать \`TypedDict\` или \`dataclass\` для внутренних структур

### Обработка ошибок

- Не использовать голые \`except:\` -- всегда указывать конкретный тип исключения
- Кастомные исключения наследовать от базового класса проекта
- FastAPI-эндпоинты: возвращать \`HTTPException\` с правильным status code
- Логировать ошибки с контекстом: \`logger.error("Failed to process trade", extra={"trade_id": tid})\`

### Асинхронность

- Использовать \`async/await\` для I/O-операций (БД, HTTP, файлы)
- Не блокировать event loop синхронными вызовами
- Для CPU-bound задач использовать \`run_in_executor\`

## JavaScript (Frontend)

### Стиль и форматирование

- Использовать ES6+ синтаксис
- \`const\` по умолчанию, \`let\` когда необходима мутация, никогда \`var\`
- Стрелочные функции для callback и анонимных функций
- Template literals вместо конкатенации строк
- Использовать \`prettier\` для форматирования

### Именование

- Переменные и функции: \`camelCase\`
- Классы и компоненты: \`PascalCase\`
- Константы: \`UPPER_SNAKE_CASE\`
- CSS-классы: \`kebab-case\`
- Файлы компонентов: \`PascalCase.js\`

### Обработка ошибок

- Всегда обрабатывать promise rejection (\`.catch()\` или \`try/catch\` с \`async/await\`)
- Показывать пользователю понятные сообщения об ошибках
- Логировать технические детали в консоль

## Структура файлов

- Один модуль / класс -- один файл
- Максимальный размер файла: 300 строк (сигнал к рефакторингу)
- Максимальная длина функции: 50 строк
- Максимальная вложенность: 3 уровня (guard clauses для раннего выхода)

## Комментарии и документация

- Docstrings для всех публичных функций, классов и модулей (Google-стиль)
- Комментарии объясняют ЗАЧЕМ, а не ЧТО
- TODO-комментарии должны содержать имя автора и номер задачи: \`# TODO(ivanov): MOEX-1234 -- добавить кэширование\`
- Не оставлять закомментированный код -- удалять или выносить в отдельную ветку

## Git и коммиты

- Формат коммитов: Conventional Commits (\`feat:\`, \`fix:\`, \`refactor:\`, \`docs:\`, \`test:\`, \`chore:\`)
- Один коммит -- одно логическое изменение
- Тело коммита (если нужно) объясняет причину изменения
- Ветки: \`feature/MOEX-xxx-short-description\`, \`fix/MOEX-xxx-description\``,
    tags: ["Правила", "Python", "JavaScript"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "r2",
    title: "Правила: Безопасность кода",
    description: "Запрет хардкода секретов, валидация входов, SQL injection prevention, JWT/RBAC. Скопируйте в .kilocode/rules/",
    content: `# Security Rules -- MOEX AI Hub

## Описание

Обязательные правила безопасности для всего кода в проекте MOEX AI Hub. AI-агент ОБЯЗАН следовать этим правилам при генерации и модификации кода. Основано на рекомендациях OpenSSF Security Guide for AI Code Assistants, OWASP Top 10 и внутренних политиках безопасности Московской биржи.

## Критические правила (нарушение = блокировка PR)

### 1. Никогда не хранить секреты в коде

- ЗАПРЕЩЕНО: хардкод паролей, API-ключей, токенов, connection strings
- ОБЯЗАТЕЛЬНО: использовать переменные окружения (\`os.getenv\`, \`.env\` файлы)
- Файл \`.env\` НИКОГДА не попадает в git (проверить \`.gitignore\`)
- Для продакшена: использовать Vault, AWS Secrets Manager или аналог
- При обнаружении секрета в коде: немедленно уведомить команду безопасности

\`\`\`python
# ЗАПРЕЩЕНО
DB_PASSWORD = "super_secret_123"
API_KEY = "sk-1234567890abcdef"

# ПРАВИЛЬНО
DB_PASSWORD = os.getenv("DB_PASSWORD")
API_KEY = settings.api_key  # через Pydantic Settings
\`\`\`

### 2. Валидация всех входных данных

- Все данные от пользователя считаются НЕДОВЕРЕННЫМИ
- Pydantic-модели для валидации тела запроса
- Валидация query/path параметров (тип, длина, диапазон)
- Санитизация данных перед выводом (предотвращение XSS)
- Ограничение размера загружаемых файлов

### 3. SQL Injection Prevention

- ТОЛЬКО параметризованные запросы (SQLAlchemy ORM / prepared statements)
- ЗАПРЕЩЕНО: f-строки и конкатенация для формирования SQL
- Для raw SQL: использовать \`text()\` с параметрами

\`\`\`python
# ЗАПРЕЩЕНО
query = f"SELECT * FROM users WHERE id = {user_id}"

# ПРАВИЛЬНО
query = select(User).where(User.id == user_id)
\`\`\`

### 4. Аутентификация и авторизация

- JWT-токены с ограниченным временем жизни (access: 15 мин, refresh: 7 дней)
- Хеширование паролей: bcrypt или Argon2 (НИКОГДА md5/sha1)
- Проверка авторизации на КАЖДОМ эндпоинте, обрабатывающем данные
- RBAC (Role-Based Access Control) для разграничения доступа
- Rate limiting для защиты от brute force

### 5. Безопасность зависимостей

- Фиксировать версии зависимостей (requirements.txt с точными версиями)
- Регулярно проверять уязвимости: \`pip audit\`, \`npm audit\`
- Не устанавливать пакеты из недоверенных источников
- Проверять лицензии на совместимость

## Правила для API

- HTTPS обязателен для всех внешних запросов
- CORS: явно указывать разрешённые домены (не \`*\` в продакшене)
- Content-Type: проверять и устанавливать корректные заголовки
- Не раскрывать внутренние ошибки пользователю (stack traces, SQL-ошибки)
- Стандартизировать коды ошибок: \`{"error": "code", "message": "human-readable"}\`

## Правила для данных

- PII (персональные данные) шифровать при хранении
- Логировать доступ к чувствительным данным для аудита
- Минимальные привилегии: каждый сервис получает доступ только к нужным данным
- Маскировать чувствительные данные в логах: \`user_email: a***@moex.com\`
- Backup: проверить, что резервные копии тоже защищены

## Правила для AI-агента

- НЕ генерировать тестовые credentials или примеры реальных данных
- При обнаружении потенциальной уязвимости: явно предупредить разработчика
- Предлагать исправления для обнаруженных security issues
- Использовать технику Recursive Criticism and Improvement (RCI) для проверки безопасности сгенерированного кода
- При неуверенности в безопасности решения -- запросить review у разработчика

## Чеклист перед деплоем

- [ ] Все секреты вынесены в переменные окружения
- [ ] Входные данные валидируются на всех эндпоинтах
- [ ] SQL-запросы параметризованы
- [ ] CORS настроен корректно (не \`*\`)
- [ ] Rate limiting включён
- [ ] Логирование безопасности настроено
- [ ] Зависимости проверены на уязвимости
- [ ] HTTPS настроен для всех внешних соединений`,
    tags: ["Правила", "Безопасность", "OWASP"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "r3",
    title: "Правила: Чеклист ревью кода",
    description: "8 категорий проверки: корректность, безопасность, качество, ошибки, производительность, тесты. Для .kilocode/rules/",
    content: `# Code Review Checklist -- MOEX AI Hub

## Описание

Стандартный чеклист для code review в проекте MOEX AI Hub. Используется как руководство для ревьюеров и как автоматическая проверка качества AI-сгенерированного кода. Основан на практиках OWASP Secure Code Review, рекомендациях OpenSSF и процедурах Augment Code.

## Как использовать

AI-агент должен проходить этот чеклист перед завершением задачи. Ревьюер использует его как структуру для PR review.

---

## 1. Корректность

- [ ] Код делает то, что заявлено в задаче / описании PR
- [ ] Edge cases обработаны (пустые значения, граничные условия, null)
- [ ] Нет регрессий в существующей функциональности
- [ ] Бизнес-логика соответствует требованиям (финансовые расчёты проверены дважды)
- [ ] Нет race conditions в асинхронном коде

## 2. Безопасность

- [ ] Нет хардкода секретов (пароли, ключи, токены)
- [ ] Входные данные валидируются (Pydantic, проверки типов)
- [ ] SQL-запросы параметризованы (нет f-строк в запросах)
- [ ] Авторизация проверяется (dependency injection FastAPI)
- [ ] Чувствительные данные не попадают в логи
- [ ] Нет уязвимостей из OWASP Top 10

## 3. Качество кода

- [ ] Именование понятное и консистентное (см. coding-standards.md)
- [ ] Функции выполняют одну задачу (Single Responsibility)
- [ ] Нет дублирования кода (DRY)
- [ ] Вложенность не более 3 уровней
- [ ] Нет закомментированного кода
- [ ] Нет неиспользуемых переменных и импортов
- [ ] Типизация: аннотации типов на всех публичных функциях

## 4. Обработка ошибок

- [ ] Все исключения обработаны (нет голых \`except:\`)
- [ ] HTTP-ответы используют правильные статус-коды
- [ ] Ошибки логируются с достаточным контекстом
- [ ] Пользователь получает понятное сообщение об ошибке
- [ ] Нет подавления ошибок (\`pass\` в except-блоке)

## 5. Производительность

- [ ] Нет N+1 запросов к базе данных
- [ ] Большие выборки используют пагинацию
- [ ] Нет синхронных блокирующих вызовов в async-контексте
- [ ] Тяжёлые операции вынесены в background tasks
- [ ] Кэширование применено где уместно

## 6. Тестируемость

- [ ] Новый код покрыт тестами (unit / integration)
- [ ] Тесты проверяют happy path и error cases
- [ ] Тесты независимы друг от друга (нет shared state)
- [ ] Моки используются для внешних зависимостей
- [ ] Тестовые данные не содержат реальных credentials

## 7. Документация

- [ ] Docstrings на публичных функциях и классах
- [ ] API-эндпоинты имеют описания (FastAPI summary/description)
- [ ] Сложная бизнес-логика прокомментирована (ЗАЧЕМ, а не ЧТО)
- [ ] README обновлён при изменении setup / конфигурации
- [ ] Changelog обновлён для значимых изменений

## 8. AI-специфичные проверки

- [ ] Нет "галлюцинаций" -- несуществующих API, библиотек, методов
- [ ] Импорты актуальных версий библиотек (не deprecated)
- [ ] Сгенерированный код не содержит лицензионно-несовместимых фрагментов
- [ ] Нет "slopsquatting" -- использования несуществующих пакетов
- [ ] Код проверен на соответствие архитектуре проекта

## Уровни критичности

| Уровень | Описание | Действие |
|---------|----------|----------|
| Blocker | Уязвимость, потеря данных, падение | PR блокируется до исправления |
| Critical | Ошибка бизнес-логики, нарушение стандартов | Обязательное исправление перед merge |
| Major | Проблемы производительности, слабое покрытие тестами | Желательно исправить, можно в follow-up |
| Minor | Стилистика, мелкие улучшения | На усмотрение автора |`,
    tags: ["Правила", "Ревью кода", "Качество"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "r4",
    title: "Правила: Проектирование REST API",
    description: "REST-конвенции, HTTP-методы, коды ответов, пагинация, FastAPI-правила. Для .kilocode/rules/",
    content: `# API Design Rules -- MOEX AI Hub

## Описание

Правила проектирования REST API для MOEX AI Hub. Обеспечивают консистентность, безопасность и удобство интеграции. Основаны на Microsoft REST API Guidelines, OpenAPI Specification и практиках финансовых API.

## Общие принципы

1. **API-first подход** -- сначала контракт (OpenAPI), потом реализация
2. **Консистентность** -- одинаковые паттерны во всех эндпоинтах
3. **Обратная совместимость** -- не ломать существующих клиентов
4. **Документация как код** -- OpenAPI/Swagger всегда актуален

## URL и ресурсы

### Именование

- Ресурсы -- существительные во множественном числе: \`/users\`, \`/trades\`, \`/portfolios\`
- Иерархия через вложенность: \`/users/{id}/submissions\`
- Версионирование в URL: \`/api/v1/users\`
- Только lowercase, слова разделять дефисами: \`/market-data\`, \`/trade-history\`

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

- \`200 OK\` -- стандартный успешный ответ
- \`201 Created\` -- ресурс создан (POST)
- \`204 No Content\` -- успех без тела (DELETE, PUT)

### Клиентские ошибки

- \`400 Bad Request\` -- невалидные входные данные
- \`401 Unauthorized\` -- не аутентифицирован
- \`403 Forbidden\` -- нет прав доступа
- \`404 Not Found\` -- ресурс не найден
- \`409 Conflict\` -- конфликт состояния
- \`422 Unprocessable Entity\` -- валидация не пройдена
- \`429 Too Many Requests\` -- rate limit превышен

### Серверные ошибки

- \`500 Internal Server Error\` -- непредвиденная ошибка
- \`503 Service Unavailable\` -- сервис временно недоступен

## Формат ответа

### Успешный ответ (единичный ресурс)

\`\`\`json
{
  "id": "uuid-string",
  "type": "user",
  "attributes": { ... },
  "created_at": "2026-03-18T10:30:00Z",
  "updated_at": "2026-03-18T10:30:00Z"
}
\`\`\`

### Успешный ответ (коллекция)

\`\`\`json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
\`\`\`

### Ответ об ошибке

\`\`\`json
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
\`\`\`

## Пагинация

- Offset-based: \`?page=2&per_page=20\` (по умолчанию для MOEX AI Hub)
- Cursor-based: \`?cursor=abc123&limit=20\` (для real-time данных)
- Значения по умолчанию: \`page=1\`, \`per_page=20\`
- Максимум на страницу: \`per_page <= 100\`
- Всегда возвращать метаданные пагинации

## Фильтрация и сортировка

- Фильтрация через query params: \`?status=active&role=admin\`
- Поиск: \`?q=search_term\` или \`?search=search_term\`
- Сортировка: \`?sort=created_at&order=desc\`
- Множественная сортировка: \`?sort=status,-created_at\` (минус = desc)

## Безопасность API

- Аутентификация: Bearer JWT в заголовке \`Authorization\`
- Rate limiting: возвращать заголовки \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`
- CORS: явный whitelist доменов
- Не передавать чувствительные данные в URL (query params логируются)
- Валидация Content-Type на всех POST/PUT/PATCH запросах
- Request ID: генерировать \`X-Request-Id\` для трассировки

## FastAPI-специфичные правила

- Использовать \`APIRouter\` для группировки эндпоинтов
- Pydantic-модели для request/response (не dict)
- Dependency Injection для аутентификации и общих зависимостей
- \`response_model\` на каждом эндпоинте для документации
- Tags для группировки в Swagger UI
- \`summary\` и \`description\` для каждого эндпоинта

\`\`\`python
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
\`\`\``,
    tags: ["Правила", "API", "REST"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "r5",
    title: "Правила: PostgreSQL и базы данных",
    description: "Именование, типы данных (NUMERIC для денег), индексы, N+1 проблема, миграции Alembic. Для .kilocode/rules/",
    content: `# Database Best Practices -- MOEX AI Hub

## Описание

Правила работы с PostgreSQL в проекте MOEX AI Hub. Покрывают проектирование схемы, написание запросов, миграции и оптимизацию. Основаны на официальных рекомендациях PostgreSQL, Bytebase SQL Review Guide и best practices для финансовых систем.

## Общие принципы

1. **Данные -- главный актив** -- целостность данных важнее скорости разработки
2. **Нормализация по умолчанию** -- денормализация только при доказанной необходимости
3. **Миграции как код** -- все изменения схемы через Alembic
4. **Минимальные привилегии** -- каждый сервис получает только необходимый доступ

## Именование

### Таблицы

- Множественное число, snake_case: \`users\`, \`trade_histories\`, \`quiz_submissions\`
- Таблицы связей: \`user_roles\`, \`content_tags\` (алфавитный порядок сущностей)
- Запрещено: начинать с подчёркивания, использовать зарезервированные слова SQL

### Колонки

- snake_case: \`first_name\`, \`created_at\`, \`is_active\`
- Primary key: \`id\` (UUID или BIGINT)
- Foreign key: \`{referenced_table_singular}_id\` (например, \`user_id\`, \`quiz_id\`)
- Булевые: префикс \`is_\` или \`has_\` (\`is_active\`, \`has_subscription\`)
- Даты: суффикс \`_at\` (\`created_at\`, \`updated_at\`, \`deleted_at\`)

### Индексы

- \`idx_{table}_{columns}\` -- обычный индекс
- \`uq_{table}_{columns}\` -- уникальный индекс
- \`pk_{table}\` -- primary key
- \`fk_{table}_{referenced_table}\` -- foreign key

## Типы данных

| Данные | Тип PostgreSQL | Комментарий |
|--------|---------------|-------------|
| ID | \`UUID\` или \`BIGINT\` | UUID для распределённых систем |
| Строки до 255 | \`VARCHAR(n)\` | С ограничением длины |
| Длинный текст | \`TEXT\` | Без ограничения |
| Целые числа | \`INTEGER\` / \`BIGINT\` | BIGINT для финансовых ID |
| Деньги | \`NUMERIC(precision, scale)\` | НИКОГДА \`FLOAT\` / \`REAL\` для денег |
| Дата/время | \`TIMESTAMPTZ\` | Всегда с timezone |
| Булевы | \`BOOLEAN\` | Не INTEGER |
| JSON-данные | \`JSONB\` | Не \`JSON\` (JSONB индексируется) |
| Перечисления | \`VARCHAR\` + CHECK или ENUM | ENUM для фиксированных значений |

### Критическое правило для финансовых данных

\`\`\`sql
-- ЗАПРЕЩЕНО: потеря точности
price FLOAT  -- НИКОГДА для денег!

-- ПРАВИЛЬНО: точное представление
price NUMERIC(18, 8)  -- 18 знаков всего, 8 после запятой
\`\`\`

## Проектирование схемы

### Обязательные колонки для каждой таблицы

\`\`\`sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
\`\`\`

### Soft Delete

- Использовать \`deleted_at TIMESTAMPTZ\` вместо физического удаления
- Добавлять partial index: \`CREATE INDEX ... WHERE deleted_at IS NULL\`
- Все запросы по умолчанию фильтруют удалённые записи

### Foreign Keys

- ОБЯЗАТЕЛЬНЫ для связей между таблицами
- Указывать \`ON DELETE\` действие: \`CASCADE\`, \`SET NULL\`, \`RESTRICT\`
- Для финансовых данных: \`ON DELETE RESTRICT\` (никогда CASCADE)

### Constraints

- \`NOT NULL\` по умолчанию (nullable только когда осознанно нужно)
- \`CHECK\` для валидации на уровне БД (\`CHECK (age >= 0)\`)
- \`UNIQUE\` для бизнес-ключей (email, username)

## Запросы

### Правила

- ЗАПРЕЩЕНО: \`SELECT *\` -- всегда перечислять нужные колонки
- ЗАПРЕЩЕНО: f-строки и конкатенация в SQL (SQL Injection!)
- Использовать \`EXPLAIN ANALYZE\` для проверки тяжёлых запросов
- Пагинация обязательна для коллекций (\`LIMIT\` + \`OFFSET\` или cursor)
- \`COUNT(*)\` с \`LIMIT\` для больших таблиц

### Индексация

- Индексы на все колонки в \`WHERE\`, \`JOIN\`, \`ORDER BY\`
- Partial indexes для частых фильтров: \`WHERE is_active = true\`
- Composite indexes: порядок колонок по селективности (от высокой к низкой)
- Не создавать избыточные индексы (покрываемые другими)
- Мониторить неиспользуемые индексы

### N+1 Problem

\`\`\`python
# ЗАПРЕЩЕНО: N+1 запросов
users = await session.execute(select(User))
for user in users:
    submissions = await session.execute(
        select(Submission).where(Submission.user_id == user.id)
    )

# ПРАВИЛЬНО: eager loading
query = select(User).options(selectinload(User.submissions))
users = await session.execute(query)
\`\`\`

## Миграции (Alembic)

### Правила

- Одна миграция -- одно логическое изменение
- Каждая миграция должна иметь \`upgrade()\` и \`downgrade()\`
- Тестировать миграции на копии продакшен-данных
- НИКОГДА не редактировать уже применённые миграции
- Описательные имена: \`0004_add_portfolio_risk_score.py\`

### Безопасные миграции

- Добавление колонки: \`ADD COLUMN ... DEFAULT NULL\` (не блокирует таблицу)
- Добавление NOT NULL: сначала добавить nullable, заполнить, потом SET NOT NULL
- Удаление колонки: сначала убрать из кода, потом удалить в следующей миграции
- Переименование: создать новую, скопировать, удалить старую (в 3 миграциях)

## Производительность

- Connection pooling: использовать PgBouncer или SQLAlchemy pool
- \`pool_size\`: 5-20 соединений для типичного сервиса
- \`VACUUM ANALYZE\` регулярно (не \`VACUUM FULL\` в продакшене)
- Мониторить \`pg_stat_statements\` для медленных запросов
- Для больших выборок: cursor-based пагинация вместо OFFSET

## Бэкапы и восстановление

- Автоматические ежедневные бэкапы через \`pg_dump\` или WAL archiving
- Тестировать восстановление из бэкапа минимум раз в месяц
- Point-in-time recovery (PITR) для критичных данных
- Бэкапы шифровать и хранить в отдельном хранилище`,
    tags: ["Правила", "PostgreSQL", "SQL"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  },
  {
    id: "r6",
    title: "Правила: Стандарты тестирования",
    description: "Пирамида тестов, pytest, AAA-паттерн, именование, fixtures, покрытие 80%+. Для .kilocode/rules/",
    content: `# Testing Standards -- MOEX AI Hub

## Описание

Стандарты тестирования для проекта MOEX AI Hub. Определяют требования к покрытию тестами, структуру тестов и правила для AI-агента при генерации тестового кода. Тесты -- обязательная часть каждого PR.

## Общие принципы

1. **Тесты -- не опция, а требование** -- код без тестов не проходит review
2. **Тест документирует поведение** -- имя теста описывает ожидаемое поведение
3. **Изоляция** -- тесты не зависят друг от друга и от внешних сервисов
4. **Скорость** -- unit-тесты выполняются за секунды, не минуты

## Пирамида тестирования

\`\`\`
        /\\
       /  \\        E2E (5%)
      /----\\       Минимум сценариев
     /      \\
    /--------\\     Integration (25%)
   /          \\    API endpoints, DB queries
  /------------\\
 /              \\  Unit (70%)
/________________\\ Бизнес-логика, утилиты, валидация
\`\`\`

## Unit-тесты

### Правила

- Фреймворк: \`pytest\`
- Каждый модуль в \`app/\` имеет соответствующий тест в \`tests/unit/\`
- Структура тестов отражает структуру кода: \`app/core/security.py\` -> \`tests/unit/core/test_security.py\`
- Один тестовый файл -- один тестируемый модуль

### Именование

\`\`\`python
# Формат: test_{что_делаем}_{при_каких_условиях}_{ожидаемый_результат}
def test_calculate_risk_with_empty_portfolio_returns_zero():
    ...

def test_create_user_with_duplicate_email_raises_conflict():
    ...

def test_validate_trade_with_negative_amount_returns_validation_error():
    ...
\`\`\`

### Структура теста (AAA -- Arrange, Act, Assert)

\`\`\`python
def test_hash_password_produces_valid_bcrypt_hash():
    # Arrange
    plain_password = "secure_password_123"

    # Act
    hashed = hash_password(plain_password)

    # Assert
    assert hashed != plain_password
    assert verify_password(plain_password, hashed) is True
\`\`\`

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
- Файлы в \`tests/integration/\`

### API-тесты (FastAPI)

\`\`\`python
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
\`\`\`

## Fixtures и тестовые данные

### Правила

- Fixtures в \`conftest.py\` (общие) или в тестовом файле (специфичные)
- Factory-паттерн для создания тестовых объектов
- НИКОГДА не использовать реальные данные пользователей
- НИКОГДА не использовать реальные credentials в тестах

\`\`\`python
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
\`\`\`

## Моки и стабы

- \`unittest.mock\` или \`pytest-mock\` для мокирования зависимостей
- Мокировать: внешние API, email-сервисы, файловую систему
- НЕ мокировать: бизнес-логику (тестировать как есть)
- Для БД: использовать тестовую БД, не моки

## Покрытие

- Минимальное покрытие: 80% для нового кода
- Критичная бизнес-логика: 95%+ покрытие
- Инструмент: \`pytest-cov\`
- В CI: проверка покрытия автоматическая, PR блокируется при снижении

## AI-агент: правила генерации тестов

1. При создании нового модуля -- ВСЕГДА создавать тестовый файл
2. Тесты должны быть осмысленными (не просто \`assert True\`)
3. Покрывать минимум: happy path + 2 error cases
4. Не генерировать тесты, которые тестируют фреймворк (pytest, FastAPI)
5. Использовать fixtures, не дублировать setup в каждом тесте`,
    tags: ["Правила", "Тесты", "pytest"],
    product: "Code Agent",
    author: "MOEX AI Team",
    likes: 0,
    type: "skill",
    createdAt: "2026-03-18"
  }
];

// ── Glossary ───────────────────────────────────────────────────────────────

const glossaryTerms = [
  { id: "g-prompt", term: "Промпт (Prompt)", definition: "Текстовая инструкция для AI-модели. Содержит контекст, роль и требования к ответу.", icon: "messageSquare" },
  { id: "g-skill", term: "Скилл (Skill)", definition: "Техническая конфигурация или автоматизация для AI-инструмента. Включает код, пайплайны, конфиги.", icon: "wrench" },
  { id: "g-llm", term: "LLM", definition: "Large Language Model — нейросеть, обученная на огромном массиве текстов. Qwen, GLM, GPT — это всё LLM.", icon: "brain" },
  { id: "g-vibe-coding", term: "Вайбкодинг", definition: "Стиль разработки, при котором программист описывает результат на естественном языке, а AI генерирует код.", icon: "sparkles" },
  { id: "g-rag", term: "RAG", definition: "Retrieval-Augmented Generation — модель сначала ищет информацию в базе знаний, потом генерирует ответ.", icon: "search" },
  { id: "g-mcp", term: "MCP", definition: "Model Context Protocol — протокол для подключения AI к внешним инструментам: Jira, Confluence, БД.", icon: "cable" },
  { id: "g-context-window", term: "Контекстное окно", definition: "Максимум текста за один запрос к модели. Измеряется в токенах (~1 токен = 4 символа).", icon: "maximize" },
  { id: "g-agent", term: "AI-агент", definition: "Автономная AI-система: планирует действия, использует инструменты, выполняет многошаговые задачи.", icon: "bot" },
  { id: "g-multimodal", term: "Мультимодальность", definition: "Способность AI работать с разными данными: текст, изображения, аудио.", icon: "layers" },
  { id: "g-chunking", term: "Чанкинг", definition: "Разбиение большого документа на части, каждая из которых помещается в контекстное окно модели.", icon: "layoutGrid" }
];

// ── Product capabilities ──────────────────────────────────────────────────

const productCapabilities = [
  { productId: "moex-gpt", productName: "MOEX GPT", items: ["Генерация и редактирование текстов (письма, отчёты, протоколы)", "Ответы на вопросы по документам и данным", "Суммаризация длинных текстов", "Перевод с сохранением терминологии"] },
  { productId: "moex-insight", productName: "MOEX Insight", items: ["Анализ скриншотов: вопросы к экрану, извлечение данных", "Интеграция с Outlook: письма, календарь, встречи", "AI-агент на совещаниях: транскрибация и резюме", "Распознавание текста с фото и сканов (OCR)"] },
  { productId: "code-agent", productName: "Code Agent", items: ["Вайбкодинг: опишите задачу — получите готовый код", "Прототипы без опыта в программировании", "Тесты, рефакторинг и code review", "Готовые скиллы для автоматизации"] },
  { productId: "dion-agent", productName: "Dion Agent", items: ["Автоподключение к онлайн-встречам", "Транскрибация речи с разделением по спикерам", "Структурированные резюме по шаблонам", "Извлечение задач и решений из встречи"] }
];

// ── Helper functions ───────────────────────────────────────────────────────

function filterMarketplaceItems(items, filters) {
  const query = (filters.search || '').trim().toLowerCase();
  return items.filter(item => {
    if (filters.activeTab !== 'all' && item.type !== filters.activeTab) return false;
    if (filters.product !== 'all' && item.product !== filters.product) return false;
    if (!query) return true;
    return item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.tags.some(t => t.toLowerCase().includes(query));
  });
}

function getNewestItems(items, limit) {
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

function buildLeaderboard(items, getLikes) {
  const byAuthor = new Map();
  for (const item of items) {
    if (item.author === 'MOEX AI Team') continue;
    const c = byAuthor.get(item.author) || { promptsShared: 0, skillsShared: 0, mcpShared: 0, totalLikes: 0 };
    if (item.type === 'prompt') c.promptsShared++;
    else if (item.type === 'mcp') c.mcpShared++;
    else c.skillsShared++;
    c.totalLikes += getLikes(item);
    byAuthor.set(item.author, c);
  }
  return Array.from(byAuthor.entries())
    .map(([name, d]) => ({ id: name, name, avatar: name.split(/\s+/).map(p => p[0]).join(''), department: 'Библиотека', ...d }))
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .map((u, i) => ({ ...u, rank: i + 1 }));
}

function getTopItemsByLikes(items, limit, getLikes) {
  return [...items].sort((a, b) => getLikes(b) - getLikes(a)).slice(0, limit);
}

function getDisplayTags(item) {
  return (item.tags || []).slice(0, 4);
}

// ── Quiz Questions (selected from quiz_questions.json) ────────────────────

const quizQuestions = [
  {
    question: "Что лучше всего описывает термин «Искусственный интеллект» (AI)?",
    options: [
      "Компьютерная программа, которая может выполнять только повторяющиеся задачи",
      "Любой электронный прибор, который может подключаться к интернету",
      "Способность компьютерной системы имитировать человеческие интеллектуальные процессы",
      "Процесс хранения больших объёмов данных на удалённых серверах"
    ],
    correctIndex: 2,
    explanation: "AI — это имитация интеллектуальных процессов человека: обучение, рассуждение и самокоррекция."
  },
  {
    question: "Что означает аббревиатура LLM?",
    options: [
      "Long Learning Machine",
      "Large Language Model",
      "Logical Learning Module",
      "Low Latency Memory"
    ],
    correctIndex: 1,
    explanation: "LLM — Large Language Model, большая языковая модель, обученная на огромном массиве текстов."
  },
  {
    question: "Что означает аббревиатура RAG?",
    options: [
      "Retrieval-Augmented Generation",
      "Rapid Action Generation",
      "Random Access Graphics",
      "Real-time Analytics Grid"
    ],
    correctIndex: 0,
    explanation: "RAG — Retrieval-Augmented Generation. Модель сначала ищет информацию, потом генерирует ответ."
  },
  {
    question: "Что такое «промпт-инжиниринг» (prompt engineering)?",
    options: [
      "Процесс создания AI-моделей",
      "Искусство составления эффективных промптов для получения точных результатов от AI",
      "Взлом AI-систем с помощью специальных промптов",
      "Автоматический перевод промптов на разные языки"
    ],
    correctIndex: 1,
    explanation: "Prompt engineering — искусство и наука составления эффективных промптов для AI."
  },
  {
    question: "Что такое «галлюцинация» AI?",
    options: [
      "Ситуация, когда AI генерирует уверенный, но фактически неверный ответ",
      "Способность AI создавать произведения искусства",
      "Визуальный эффект в интерфейсе AI",
      "Сбой в работе аппаратного обеспечения"
    ],
    correctIndex: 0,
    explanation: "Галлюцинация — когда модель выдаёт правдоподобный, но фактически неверный или вымышленный ответ."
  },
  {
    question: "Какую основную проблему решает технология RAG?",
    options: [
      "Увеличивает скорость генерации текста",
      "Уменьшает стоимость использования LLM",
      "Позволяет LLM получать доступ к актуальной информации, снижая риск галлюцинаций",
      "Позволяет генерировать изображения вместо текста"
    ],
    correctIndex: 2,
    explanation: "RAG снижает галлюцинации, предоставляя модели доступ к проверенным источникам данных."
  },
  {
    question: "Что такое «контекстное окно» (context window) у LLM?",
    options: [
      "Пользовательский интерфейс для общения с моделью",
      "Окно в браузере, где работает AI",
      "Время, необходимое модели для генерации ответа",
      "Максимальное количество токенов, которое модель может обработать за один запрос"
    ],
    correctIndex: 3,
    explanation: "Контекстное окно — это лимит токенов (текста), который модель может удерживать в памяти за один запрос."
  },
  {
    question: "Что такое «токен» в контексте больших языковых моделей?",
    options: [
      "Фрагмент текста (слово или часть слова), который модель обрабатывает как единое целое",
      "Единица измерения производительности AI",
      "Специальный ключ доступа к AI-модели",
      "Ошибка, которую допускает модель"
    ],
    correctIndex: 0,
    explanation: "Токен — единица текста для модели. Примерно 1 токен = 4 символа в русском тексте."
  },
  {
    question: "Если вы хотите более креативные ответы от LLM, какой параметр увеличить?",
    options: [
      "Длину промпта",
      "«Температуру» (temperature)",
      "Количество токенов",
      "Размер контекстного окна"
    ],
    correctIndex: 1,
    explanation: "Температура управляет степенью случайности ответов. Выше температура — больше креативности."
  },
  {
    question: "Что такое fine-tuning (дообучение) LLM?",
    options: [
      "Полное переобучение модели с нуля",
      "Уменьшение размера модели",
      "Изменение «температуры» модели",
      "Дополнительное обучение модели на специфическом наборе данных для адаптации к задаче"
    ],
    correctIndex: 3,
    explanation: "Fine-tuning — адаптация предварительно обученной модели под конкретную задачу или домен."
  },
  {
    question: "Что такое «AI-агент»?",
    options: [
      "Автономная система, которая воспринимает среду, принимает решения и выполняет действия",
      "Сотрудник компании, который работает с AI",
      "Программа для защиты от вирусов",
      "Юридический представитель AI-компании"
    ],
    correctIndex: 0,
    explanation: "AI-агент — автономная система, способная планировать и выполнять действия для достижения целей."
  },
  {
    question: "Почему конфиденциальность данных важна при использовании AI?",
    options: [
      "Это не важно, AI безопасен по умолчанию",
      "Законы не регулируют этот вопрос",
      "AI может случайно удалить все данные",
      "Нужно гарантировать, что конфиденциальная информация не будет раскрыта"
    ],
    correctIndex: 3,
    explanation: "При работе с AI важно контролировать, какие данные передаются модели — особенно в финансовой организации."
  },
  {
    question: "Какой из методов лучше всего помогает бороться с галлюцинациями AI?",
    options: [
      "Увеличение температуры модели",
      "Использование более коротких промптов",
      "Применение RAG для доступа к проверенным источникам",
      "Перезагрузка компьютера"
    ],
    correctIndex: 2,
    explanation: "RAG предоставляет модели доступ к проверенным данным, что существенно снижает галлюцинации."
  },
  {
    question: "Что такое Red Teaming применительно к AI?",
    options: [
      "Команда разработчиков в красной форме",
      "Целенаправленная «атака» на модель для выявления уязвимостей",
      "Соревнование между двумя AI",
      "Маркетинговая кампания"
    ],
    correctIndex: 1,
    explanation: "Red Teaming — систематический поиск уязвимостей и потенциально опасного поведения AI-модели."
  },
  {
    question: "Что означает «мультимодальная» модель AI?",
    options: [
      "Модель, которая может работать только в одном режиме",
      "Модель, доступная только корпоративным клиентам",
      "Модель, работающая с несколькими форматами: текст, изображения, аудио",
      "Модель, которая говорит на многих языках"
    ],
    correctIndex: 2,
    explanation: "Мультимодальность — способность AI обрабатывать и генерировать данные в разных форматах."
  },
  {
    question: "Что такое embedding (эмбеддинг)?",
    options: [
      "Численное представление текста в виде вектора, отражающее его смысл",
      "Процесс встраивания AI в веб-сайт",
      "Графический интерфейс AI",
      "Защита AI от атак"
    ],
    correctIndex: 0,
    explanation: "Эмбеддинг — вектор, кодирующий семантическое значение текста. Используется в поиске и RAG."
  },
  {
    question: "Какая архитектура лежит в основе современных LLM?",
    options: [
      "Рекуррентные нейронные сети (RNN)",
      "Свёрточные нейронные сети (CNN)",
      "Трансформер (Transformer)",
      "Перцептрон"
    ],
    correctIndex: 2,
    explanation: "Большинство современных LLM (GPT, Qwen, Claude) основаны на архитектуре Transformer."
  },
  {
    question: "Что такое MCP (Model Context Protocol)?",
    options: [
      "Протокол шифрования данных",
      "Протокол для подключения AI к внешним инструментам и источникам данных",
      "Формат хранения моделей",
      "Язык программирования для AI"
    ],
    correctIndex: 1,
    explanation: "MCP позволяет AI-агентам подключаться к Jira, Confluence, базам данных и другим инструментам."
  },
  {
    question: "Какое применение AI в финансах является критически важным?",
    options: [
      "Создание дизайна для банкнот",
      "AI не используется в финансах",
      "Прогнозирование погоды",
      "Фрод-детекция и алгоритмический трейдинг"
    ],
    correctIndex: 3,
    explanation: "Обнаружение мошенничества и алгоритмический трейдинг — ключевые применения AI в финансовой сфере."
  },
  {
    question: "Что такое «предвзятость» (bias) в AI?",
    options: [
      "Способность AI быстро принимать решения",
      "Личное мнение AI",
      "Настройка, которую можно легко отключить",
      "Систематические ошибки в результатах из-за неполных или некорректных данных обучения"
    ],
    correctIndex: 3,
    explanation: "Bias — систематические искажения в ответах модели, вызванные перекосами в обучающих данных."
  }
];

// ── FAQ Items ─────────────────────────────────────────────────────────────

const faqItems = [
  {
    question: "Что такое MOEX GPT и чем он отличается от обычного ChatGPT?",
    answer: "MOEX GPT — это корпоративный AI-чат, развёрнутый внутри периметра Московской Биржи. В отличие от ChatGPT, ваши данные не покидают инфраструктуру компании. Вы работаете с локально развёрнутыми моделями (Qwen3-Next, GPT OSS и др.), а не с внешними API."
  },
  {
    question: "Безопасно ли вводить рабочие документы в AI?",
    answer: "Да, если вы используете инструменты MOEX Agent Hub. Все модели развёрнуты локально в air-gapped контуре — данные не передаются за пределы сети Биржи. Тем не менее, не загружайте пароли, токены доступа и персональные данные клиентов."
  },
  {
    question: "Какую модель выбрать для моей задачи?",
    answer: "Qwen3-Next — универсальная модель для текстов, анализа и рассуждений. GPT OSS — для задач с большим контекстным окном. Qwen3-VL — для работы с изображениями и скриншотами. Qwen3-Coder — для генерации и рефакторинга кода. MiniMax-2.5 — для обработки длинных документов. Начните с Qwen3-Next — она подходит для большинства задач."
  },
  {
    question: "Как подключить Code Agent (Kilo Code)?",
    answer: "Установите расширение Kilo Code в VS Code, затем укажите URL API MOEX LLMs в настройках. Подробная инструкция — в гайде «Настройка Kilo Code в VS Code» на Confluence. API-ключ можно получить через гайд «API MOEX LLMs»."
  },
  {
    question: "Что такое MCP и зачем он нужен?",
    answer: "MCP (Model Context Protocol) — это протокол, который позволяет AI-агентам подключаться к внешним инструментам: файловой системе, Git, PostgreSQL, Jira, Confluence. Это расширяет возможности AI за пределы простого чата — агент может читать файлы, выполнять запросы и взаимодействовать с сервисами."
  },
  {
    question: "Как написать хороший промпт?",
    answer: "Используйте формулу: роль + задача + шаги + формат вывода + пример. Чем конкретнее инструкция, тем лучше результат. Готовые промпты из Библиотеки — хорошая отправная точка. Подробнее — в гайде «Как писать эффективные промпты» на Confluence."
  },
  {
    question: "Что такое скилл и как его установить?",
    answer: "Скилл — это техническая конфигурация для AI-инструмента: custom mode, MCP-конфигурация, .kilocodeignore и т.д. Скопируйте содержимое скилла из Библиотеки и вставьте в соответствующий конфигурационный файл вашего инструмента (например, в настройки Kilo Code)."
  },
  {
    question: "Можно ли использовать AI для работы с конфиденциальными данными?",
    answer: "Да, но с ограничениями. Используйте только инструменты MOEX Agent Hub, которые работают внутри периметра. Не передавайте в AI персональные данные клиентов, пароли и токены доступа. Для работы с чувствительными кодовыми базами настройте .kilocodeignore."
  }
];
