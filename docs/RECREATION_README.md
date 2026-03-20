# Recreating MOEX Agent Hub from Scratch

This folder contains everything needed to reproduce the MOEX Agent Hub project in a single run with an AI coding assistant (Cursor, Kilo Code, etc.).

## Files

| File | Purpose |
|------|---------|
| **RECREATE_PROMPT.md** | The main prompt. Copy its contents (from "## Task" to the end) into a new chat and send as one message. |
| **RECREATION_DATA.md** | Exact data spec: 24 marketplace items (prompts/skills), quiz pools (~20 daily, ~40 full), products, guides, glossary. Reference this file inside the prompt or attach it so the assistant can populate `mockData.ts` correctly. |
| **RECREATION_README.md** | This file — usage instructions. |

## How to use

1. **One-shot (recommended)**  
   - Open `RECREATE_PROMPT.md`.  
   - Copy the entire body (from "## Task" through "One run with this prompt...").  
   - Paste into a new chat with your AI assistant.  
   - Add one line: *"Use the data in docs/RECREATION_DATA.md for exact marketplace content and quiz questions."*  
   - Send. The assistant should produce the full codebase (frontend, backend, mock data) in one run.

2. **With Architect / Plan-first**  
   - Send the same prompt.  
   - Ask for an architecture plan first (folder map, tech decisions, implementation order).  
   - Then ask to implement according to that plan, using `RECREATION_DATA.md` for content.

3. **If you have the existing repo**  
   - The assistant can copy `marketplaceItems` and quiz arrays from `src/lib/mockData.ts` instead of recreating from RECREATION_DATA.md.  
   - The prompt still defines structure, pages, components, and rules (Russian copy, Shadcn, Lucide, sonner, 24 items, 20/40 quiz sizes).

## Constraints (from the prompt)

- **No Docker required** — backend runs with `uvicorn`; DB can be SQLite for local dev.
- **No Cursor skills** — the prompt is self-contained; the assistant does not need to know about skills.
- **Russian UI** — all buttons, toasts, labels, placeholders in Russian.
- **Exact content** — 24 library items (19 prompts, 5 skills) and quiz pools (~20 daily, ~40 full) as specified.

## After generation

- Frontend: `npm install && npm run dev` (port 3002).
- Backend: `cd backend && uvicorn app.main:app --reload --host 127.0.0.1 --port 8000`.
- Set `DATABASE_URL` for PostgreSQL or SQLite; run Alembic migrations if using DB.
- Optional: set `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000` for quiz daily API.
