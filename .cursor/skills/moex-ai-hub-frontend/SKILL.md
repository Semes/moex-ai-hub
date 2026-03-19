---
name: moex-ai-hub-frontend
description: Builds frontend and UI for MOEX AI Hub (Enterprise AI Marketplace at Moscow Exchange) using Next.js 14+ App Router, TypeScript, Tailwind, Shadcn/UI, and Lucide. Enforces Apple-meets-Enterprise UX, Russian copy, and MOEX product branding. Use when implementing or modifying pages, components, prompts library, filters, or UI in the MOEX AI Hub project.
---

# MOEX AI Hub — Frontend & UI

## Role & Context

You are a Senior Frontend Architect and UI/UX Designer for **MOEX AI Hub** — the central internal platform for AI prompts and skills at Moscow Exchange (Enterprise AI Marketplace).

## Tech Stack & Standards

| Area | Choice | Notes |
|------|--------|--------|
| Framework | Next.js 14+ (App Router) | |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | |
| UI Components | Shadcn/UI (Radix UI) | **Do not create custom components if a Shadcn primitive exists.** |
| Icons | Lucide React | Only Lucide; no other icon sets |
| State | React Hooks (useState, useReducer) or Zustand | Zustand for complex global state |

## UX/UI Guidelines ("Apple meets Enterprise")

- **Aesthetics:** Clean, minimalist, high whitespace, `slate-900` text, subtle borders.
- **Interactions:**
  - Buttons: `active:scale-95` and `transition-all` for tactile feel.
  - Cards: `hover:shadow-md` and `hover:border-slate-300`.
- **Loading:** Use **Skeleton** loaders for all async data. Never show raw "Loading..." text.
- **Copy:** All user-facing text (buttons, tooltips, errors, placeholders) MUST be in **Russian**.

## No-Hallucination Rules

1. **Shadcn first:** For dropdowns use `Select` or `DropdownMenu` from Shadcn. Do not build custom `<div className="dropdown">` solutions.
2. **Icons:** Always use Lucide React. Example: `import { Copy, Heart, Terminal } from 'lucide-react'`.
3. **Mock data:** When implementing a page, include **rich, realistic mock data arrays** so the UI looks populated immediately.
4. **Toasts:** Every major action (Copy, Like, Submit) must trigger a **sonner** notification. Use `toast.success("Скопировано")` / `toast.error(...)` in Russian. Add `<Toaster />` in root layout.

## Domain: MOEX Products

| Product | Color (in code) | Description |
|---------|-----------------|-------------|
| **MOEX GPT** | MOEX Red (#FF0508) | Корпоративный AI-чат. Open Web UI. |
| **MOEX Insight** | Violet (violet-500/600) | AI-ассистент рабочего стола, саммари встреч, Outlook. |
| **Code Agent** | Slate (slate-600/700) | Kilo Code в VS Code, вайбкодинг, скиллы. |

Use these names and colors consistently in filters, badges, and product labels. Brand colours follow MOEX and product logos (red GPT, violet Insight, dark/slate Code Agent).

## Coding Patterns

- **Prompt cards:** Separate the **prompt text** (copyable area) from **metadata** (tags, author). Use a clear visual hierarchy.
- **Search/filters:** Implement **client-side filtering** for immediate feedback — filter by Tag, Product, and/or search text.
- **Copy logic:** Use `navigator.clipboard.writeText()` in a try/catch; on success show a Toast (e.g. "Скопировано").

## Project Structure

- `/app` — Routes (App Router).
- `/components` — Reusable UI (Button, Card, Input).
  - `/components/ui` — Shadcn primitives only.
  - `/components/shared` — Domain components (e.g. PromptCard, FilterSidebar).
- `/lib` — Utils (`cn`, mock data helpers).

Reference this structure when adding or placing new files; keep Shadcn primitives under `components/ui` and domain-specific components under `components/shared` (or equivalent). If the project uses a `src/` directory, use `src/app`, `src/components`, `src/lib` accordingly.
