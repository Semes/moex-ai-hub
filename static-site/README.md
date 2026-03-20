# MOEX Agent Hub — Статическая версия (HTML + Tailwind CSS)

Версия без React, Next.js и npm-зависимостей.  
Работает на чистом HTML + Tailwind CSS + vanilla JavaScript.

## Структура

```
static-site/
├── index.html          — Главная страница
├── library.html        — Библиотека промптов и скиллов
├── learn.html          — Обучение (гайды, глоссарий)
├── submit.html         — Отправка нового промпта/скилла
├── leaderboard.html    — Лидерборд контрибьюторов
├── css/
│   └── styles.css      — Кастомные стили (анимации, типографика)
├── js/
│   ├── icons.js        — SVG-иконки (Lucide-совместимые)
│   ├── data.js         — Все данные (промпты, продукты, гайды, глоссарий)
│   └── app.js          — Общая логика (лайки, тосты, диалоги, хедер/футер)
├── logos/              — Логотипы продуктов (добавить вручную)
└── README.md           — Этот файл
```

## Быстрый запуск (для разработки)

Любой HTTP-сервер. Примеры:

```bash
# Python (есть на большинстве машин)
cd static-site
python -m http.server 3000

# Node.js (если есть)
npx serve static-site -p 3000
```

Откройте `http://localhost:3000`

## Развёртывание во внутреннем контуре

### Вариант 1: Tailwind CDN (текущий, самый простой)

Сейчас HTML-файлы подключают Tailwind через CDN:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

Для работы **без интернета**:
1. Скачайте файл `https://cdn.tailwindcss.com` и сохраните как `js/tailwind.js`
2. Замените в каждом HTML-файле:
   ```html
   <script src="js/tailwind.js"></script>
   ```

### Вариант 2: Tailwind Standalone CLI (для продакшена)

Tailwind CSS имеет standalone-бинарник, не требующий Node.js:

1. Скачайте бинарник с https://github.com/tailwindlabs/tailwindcss/releases
   - Windows: `tailwindcss-windows-x64.exe`
   - Linux: `tailwindcss-linux-x64`
   - macOS: `tailwindcss-macos-arm64`

2. Создайте `input.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. Скомпилируйте CSS:
   ```bash
   ./tailwindcss -i input.css -o css/tailwind-output.css --minify
   ```

4. В HTML замените `<script src="...tailwindcss...">` на:
   ```html
   <link rel="stylesheet" href="css/tailwind-output.css">
   ```

### Вариант 3: Nginx / Apache

Просто скопируйте папку `static-site/` на веб-сервер. Никаких сборок не требуется.

```nginx
server {
    listen 80;
    server_name moex-agent-hub.internal;
    root /var/www/moex-agent-hub;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## Логотипы продуктов

Скопируйте логотипы в папку `logos/`:
- `logos/moex-gpt.png`
- `logos/moex-insight.png`
- `logos/code-agent.png`

Если логотипы лежат в другом месте, измените пути в `js/data.js`.

## Отличия от React-версии

| Функция | React-версия | Статическая версия |
|---|---|---|
| AI-квиз | ✅ | ❌ (убран по решению) |
| Лайки | Context API (в памяти) | localStorage (сохраняются) |
| Роутинг | Next.js App Router | Обычные HTML-ссылки |
| Иконки | lucide-react (npm) | Inline SVG (icons.js) |
| Стили | Tailwind + Shadcn/UI | Tailwind + кастомный CSS |
| Зависимости | 10 npm-пакетов | 0 зависимостей |
| Сборка | `next build` | Не требуется |

## Размер

- HTML + JS + CSS: ~200 КБ (без логотипов)
- Tailwind CDN скрипт: ~100 КБ (gzip)
- **Итого: ~300 КБ** (vs ~2 МБ React bundle)
