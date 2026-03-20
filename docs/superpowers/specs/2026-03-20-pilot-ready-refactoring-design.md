# Pilot-Ready Refactoring — Design Spec

**Date:** 2026-03-20
**Status:** Approved
**Goal:** Bring MOEX Agent Hub to pilot-ready state (50-100 users)

## Scope

### 1. Code — DRY & Structure
- [ ] Extract `renderPromptCard` from index.html and library.html into single function in app.js
- [ ] Fix escaped backticks: `\\\`` → `\`` in 13 items (s1-s5, s7-s8, r1-r6) in data.js
- [ ] Remove deleted s6 (MCP Starter Kit) references if any remain

### 2. Security
- [ ] Pin all versions in `backend/requirements.txt`
- [ ] `docker-compose.prod.yml`: remove DB port exposure, move password to .env
- [ ] CORS: add CORS_ORIGINS env var with specific origins in prod config
- [ ] `.env.example`: document ALL environment variables

### 3. Infrastructure
- [ ] Download marked.min.js locally to `static-site/js/marked.min.js`
- [ ] Download Inter font woff2 locally to `static-site/fonts/`
- [ ] Replace CDN links with local paths in all 7 HTML files
- [ ] Align Python version to 3.10 in both Dockerfiles

### 4. Data & Content
- [ ] Fix 13 items with over-escaped backticks
- [ ] Placeholder links: add onclick toast "Ссылка будет доступна после развёртывания"
- [ ] Remove s6 (MCP Starter Kit) from marketplaceItems

### 5. UX Polish
- [ ] Leaderboard empty state: "Станьте первым автором!"
- [ ] Verify learn.html sticky nav z-index works correctly

## Out of Scope
- Tailwind CSS bundling (air-gapped constraints)
- CI/CD pipeline
- Load testing
- Full OWASP security audit
- Module bundler (webpack/vite)
