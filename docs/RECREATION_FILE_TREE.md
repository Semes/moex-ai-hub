# MOEX Agent Hub — Expected File Tree

Reference for recreation. The generated project should follow this structure (under a new root or existing repo).

```
project-root/
├── package.json                 # next 16, react 19, tailwind 4, lucide-react, sonner, shadcn deps
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.*            # or @theme in globals.css for Tailwind v4
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx           # metadata, lang="ru", LikesProvider, TestSectionShell, Toaster
│   │   ├── page.tsx             # home
│   │   ├── globals.css
│   │   ├── library/page.tsx
│   │   ├── learn/page.tsx
│   │   ├── submit/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   ├── not-found.tsx
│   │   └── (moex-ux-test)/
│   │       └── moex-hub-new-ux-ui-test/
│   │           ├── page.tsx     # index of style slugs
│   │           ├── dark-mode/page.tsx
│   │           ├── bento-grid/page.tsx
│   │           └── ...          # other style routes (optional)
│   ├── components/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── prompt-card.tsx
│   │   ├── prompt-detail-dialog.tsx
│   │   ├── ai-quiz.tsx
│   │   ├── ui/                  # Shadcn: button, card, dialog, input, select, tabs, etc.
│   │   └── moex-ux-test/
│   │       └── test-section-shell.tsx
│   ├── contexts/
│   │   └── likes-context.tsx
│   ├── lib/
│   │   ├── utils.ts             # cn()
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   ├── mockData.ts          # 24 items, quiz pools, products, guides, etc.
│   │   ├── libraryUtils.ts
│   │   └── logoPaths.ts
│   └── middleware.ts
├── public/
│   └── logos/
│       ├── moex-gpt.png
│       ├── moex-insight.png
│       └── code-agent.png
├── backend/
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── alembic/
│   │   └── versions/
│   └── app/
│       ├── main.py
│       ├── core/
│       │   └── config.py
│       ├── api/
│       │   └── routers/
│       │       ├── health.py
│       │       ├── auth.py
│       │       ├── users.py
│       │       └── quiz.py
│       ├── db/
│       ├── models/
│       ├── schemas/
│       └── seed/                # optional
└── docs/
    ├── RECREATE_PROMPT.md
    ├── RECREATION_DATA.md
    ├── RECREATION_README.md
    └── RECREATION_FILE_TREE.md  # this file
```

**Notes:**

- App Router: all routes under `src/app/`. No `pages/` directory.
- Test section: routes under `(moex-ux-test)/moex-hub-new-ux-ui-test/` render without SiteHeader/SiteFooter when TestSectionShell is used.
- Backend can live in `backend/` at repo root; frontend in `src/`. Adjust if monorepo structure differs.
