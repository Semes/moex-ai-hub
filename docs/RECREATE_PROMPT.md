# MOEX AI Hub — Single Prompt for Full Recreation

Use this entire document as **one prompt** in Cursor, Kilo Code, or any AI coding assistant to reproduce the MOEX AI Hub project from scratch. Copy everything below the line into a new chat and request implementation in one run.

---

## Task

Build the full **MOEX AI Hub** application and populate it with the **exact prompts, skills, and quiz questions** specified in this prompt and in the companion file `docs/RECREATION_DATA.md`. One run should produce a runnable codebase that matches the current project.

---

## 1. What the Product Is

MOEX AI Hub is the internal **Enterprise AI Marketplace** for Moscow Exchange (ПАО Московская Биржа). It provides:

- **Library** of prompts and skills (search, filters by product and type)
- **Guides** and **glossary** (learning)
- **Ежедневный** (quick) and **полный** (full) AI quizzes
- **Leaderboard** (top contributors and popular materials)
- **Submit** flow (add new prompt or skill)

All user-facing text must be in **Russian**. UX follows “Apple meets Enterprise”: clean layout, high whitespace, tactile buttons, skeleton loaders for async data (no raw “Loading…”). Use **Shadcn/UI** only for dropdowns, modals, tabs (no custom div-based dropdowns). Icons: **Lucide React** only. **Sonner** for toasts — every copy, like, and submit action must show a toast in Russian.

**Backend:** FastAPI, runnable with **uvicorn** only (no Docker required). Database: **PostgreSQL** or **SQLite** for local dev when PostgreSQL is unavailable. Keycloak is optional for local dev (quiz can work without it). No external services required for a minimal run.

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 16, App Router, dev port **3002** (`next dev -p 3002 --webpack`) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, `@import "tailwindcss"`, `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"` in global CSS |
| UI | Shadcn/UI (Radix), Lucide React only |
| State | React hooks; one React Context for “likes” (LikesProvider, useLikes) |
| Toasts | sonner — `<Toaster position="bottom-center" richColors closeButton />` in root layout |
| Backend | FastAPI, health + auth (stub) + users + quiz routers |
| DB | SQLAlchemy, Alembic; DATABASE_URL for PostgreSQL or SQLite |

---

## 3. Design System

**Product colours (use consistently in badges, filters, dots):**

- **MOEX GPT:** red `#FF0508` — e.g. `bg-[#FF0508]`, `text-[#FF0508]`
- **MOEX Insight:** violet — `bg-violet-50 text-violet-700 border-violet-200`
- **Code Agent:** slate — `bg-slate-100 text-slate-700 border-slate-300`

**Global tokens:** Default border `border-[#EEE7DC]`; backgrounds `bg-white`, `bg-[#FBF7F3]`, `bg-[#FDFBF9]`, `bg-[#33373B]`, `bg-[#FF0508]`. Section label (uppercase, tracking, muted), section title, page title, container `max-w-7xl px-4 sm:px-6`. Muted text e.g. `#5c5f63`. Focus: `focus-visible:ring-2 focus-visible:ring-[#FF0508]/30`. Touch targets ≥44px where appropriate. Buttons: `active:scale-95`, `transition-all`. Cards: hover shadow and slight lift; respect `prefers-reduced-motion`.

---

## 4. Repository Structure

- **Routes:** `src/app/layout.tsx` (metadata title “MOEX AI Hub — Офис по развитию ИИ”, `lang="ru"`, LikesProvider → TestSectionShell → Toaster), `page.tsx`, `library/page.tsx`, `learn/page.tsx`, `submit/page.tsx`, `leaderboard/page.tsx`, `not-found.tsx`.
- **Test area:** Route group `(moex-ux-test)`, base path `/moex-hub-new-ux-ui-test`; index page lists style slugs; test routes render **without** main header/footer (TestSectionShell checks pathname and skips header/footer for these paths).
- **Components:** `site-header.tsx`, `site-footer.tsx`, `prompt-card.tsx`, `prompt-detail-dialog.tsx`, `ai-quiz.tsx`, `ui/*` (Shadcn only), `moex-ux-test/test-section-shell.tsx`.
- **Lib:** `utils.ts` (cn with clsx + tailwind-merge), `constants.ts`, `types.ts`, `mockData.ts`, `libraryUtils.ts`, `logoPaths.ts`.
- **Context:** `likes-context.tsx` — LikesProvider, useLikes(), likedIds, toggleLike(id), getEffectiveLikes(id, baseLikes).
- **Backend:** `backend/app/main.py`, `core/config.py`, `api/routers/quiz.py`, DB models, Alembic migrations.

---

## 5. Library Content (Prompts and Skills)

Implement **exactly 24 marketplace items**: 19 prompts (p1–p19) and 5 skills (s1–s5). Use the **exact** titles, descriptions, products, types, tags, author, and content specified in **`docs/RECREATION_DATA.md`**. That file contains the full structured data for each item so the recreated `marketplaceItems` array matches the current project. Author: `"Алексей С."`, likes: `0`, createdAt in `"2026-01-22"` … `"2026-02-06"` spread across items.

---

## 6. Quiz Pools

- **Ежедневный тест (Быстрый тест):** Pool of **approximately 20 questions** — export as `quizQuestionsEasy`. Topics: AI/ML/DL basics, prompt, skill, вайбкодинг, RAG, context window, token, MCP, MOEX Insight (Qwen 3 VL), chunking, few-shot, local models, API key. Format: `{ id, question, options: string[4], correctIndex, explanation }`. The quiz UI shows **5** questions drawn from this pool.
- **Полный тест (Вводный тест):** Pool of **approximately 40 questions** — export as `quizQuestionsHard`. Topics: RAG vs fine-tuning, temperature, top-p, prompt leaking, prompt injection, reranking, эмерджентные способности, embedding, галлюцинация, CoT, MCP-сервер, context vs max_tokens, alignment, стоп-последовательность, zero-shot vs few-shot, in-context learning, chunking overlap, batch API, leaderboard/likes. Same format. The quiz UI shows **20** questions drawn from this pool.

See `docs/RECREATION_DATA.md` for question lists or templates to reach 20 easy and 40 hard.

---

## 7. Pages and Components (Behaviour)

**Home:** Hero (MOEX AI Hub title, CTA to library and learn), stats row (prompt count, skill count from library, “2100+ Сотрудников”), optional news strip, “Первый раз здесь?” intro, three product cards (MOEX GPT, MOEX Insight, Code Agent), “Новые промпты и скиллы” (e.g. 4 newest items, click opens detail dialog), one AI quiz block (5 questions), “Каналы в Express” links.

**Library:** Header with total count, intro “Промпт и скилл — что это?” with two explanation cards, tabs Все | Промпты | Скиллы (with counts), search input, product filter pills (Все, MOEX GPT, MOEX Insight, Code Agent), client-side filtering, grid of PromptCards, empty state “Ничего не найдено” + link to Submit. Clicking a card opens PromptDetailDialog.

**Learn:** Header “Гайды, глоссарий и тест”. Left: “Что умеют AI-продукты” (productCapabilities), “Гайды на Confluence” (guides), “Глоссарий” (glossaryTerms). Right: “Быстрый тест” (AIQuiz, questionPool daily, 5 questions), “Полный тест” (AIQuiz, questionPool full, 20 questions).

**Submit:** Form with type toggle (Промпт | Скилл), title (required), description, content textarea (required), product select (required). On submit: set local “submitted” state, toast success, show success screen with “Добавить ещё” and “Библиотека” link.

**Leaderboard:** Build from library via `buildLeaderboardFromLibraryWithLikes` using `getEffectiveLikes`. Top 3 in prominent cards; rest in list. Side block “Популярные материалы” — top 6 items by effective likes, link to library.

**SiteHeader:** Sticky, logo “MOEX **AI** Hub” + “Powered by ★ MOEX AI Team”, nav (Главная, Библиотека, Обучение, Лидерборд), CTA “Предложить свой кейс” → `/submit`, mobile sheet with same links.

**SiteFooter:** Logo, “Продукты” (MOEX GPT, MOEX Insight, Code Agent), “Ресурсы” (Библиотека, Обучение, Лидерборд), copyright ПАО Московская Биржа.

**PromptCard:** Product dot, product badge, type badge, title, description, tags, author. Actions: Copy (clipboard + toast “Скопировано” / “Не удалось скопировать”), “Подробнее”, Like (heart + count from useLikes). Card click opens details; action buttons must not trigger card click. Keyboard: Enter/Space opens details.

**PromptDetailDialog:** Same metadata and content in `<pre>`, Copy and Like buttons, same toasts.

**AIQuiz:** Props: header?, questionPool “daily” | “full”, questionCount (5 or 20), optional apiBaseUrl/accessToken for GET /quiz/daily. Use local pools when no API; shuffle and show questionCount. Flow: start → questions → select → show correct/incorrect + explanation → Next → results (score, “Пройти снова”). All labels in Russian.

**TestSectionShell:** If pathname starts with `/moex-hub-new-ux-ui-test`, render only children; else render SiteHeader, main, SiteFooter.

---

## 8. Data and Backend

**Types:** Product, MarketplaceItem, ProductInfo, Guide, CommunityChannel, NewsItem, LeaderboardUser, GlossaryTerm, QuizQuestion, ProductCapability (see `src/lib/types.ts` pattern).

**Mock data:** products (3), guides, communityChannels, news, **marketplaceItems (24 items from RECREATION_DATA.md)**, **quizQuestionsEasy (~20)**, **quizQuestionsHard (~40)**, productCapabilities, glossaryTerms. Logo paths: `getProductLogo` for MOEX GPT, MOEX Insight, Code Agent.

**Library utils:** filterMarketplaceItems, buildLeaderboardFromLibraryWithLikes, getTopMarketplaceItemsByLikes, getInitials.

**Backend:** Quiz router GET /quiz/daily returns 5 questions from “daily” pool; support running without Keycloak for local dev. Config: DATABASE_URL, CORS_ORIGINS, Keycloak vars. README: run with uvicorn, migrations, optional SQLite.

---

## 9. Mandatory Rules

- All UI strings in **Russian** (buttons, placeholders, toasts, errors, labels).
- Use only Shadcn components for selects, dropdowns, modals, tabs; only Lucide icons.
- Copy / Like / Submit must trigger a sonner toast in Russian.
- Library must contain exactly **24 items** with titles, descriptions, and content as in RECREATION_DATA.md.
- **Ежедневный** test pool: ~20 questions; show 5 per run. **Полный** test pool: ~40 questions; show 20 per run.

---

## 10. Deliverable

Produce the full codebase so that:

1. Frontend runs on port 3002; backend runs with uvicorn.
2. Home, library, and learn pages show the same 24 prompts/skills and content as specified.
3. Quick test uses a pool of ~20 questions (5 per run); full test uses a pool of ~40 questions (20 per run).
4. Leaderboard and “Популярные материалы” are computed from library data and likes context.
5. Submit flow and detail dialogs work with the same fields and toasts.

**One run with this prompt (and RECREATION_DATA.md for exact content) must reproduce the current project result.**
