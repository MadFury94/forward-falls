# Headless CMS Framework — Implementation Plan

## Overview

Turn this Next.js + WordPress headless CMS system into a reusable framework any org can clone, configure, and deploy.

---

## Phase 1 — Extract Configuration from Code

Right now org-specific data is scattered everywhere. Centralize it first.

- Create `framework.config.ts` at the root holding all org-specific values: name, colors, contact info, social links, nav links, site URL, admin email, logo path
- Replace all hardcoded strings (`"Forward Falls Initiative"`, `"forwardfalls@gmail.com"`, `"#00baa3"`, etc.) across `Header.tsx`, `Footer.tsx`, `app-sidebar.tsx`, `app/layout.tsx`, and the dashboard page with values from that config
- Move `homepage-defaults.ts` content into a `content/defaults/` folder with per-section files (`hero.ts`, `about.ts`, `programs.ts`, etc.) so new orgs can swap them out cleanly

---

## Phase 2 — Decouple the CMS Adapter

The WordPress coupling is deep but follows a consistent pattern. Abstract it.

- Create `lib/cms/` with an adapter interface: `ICMSAdapter` with methods like `fetchPosts()`, `fetchTeam()`, `fetchPageContent()`, `createPost()`, etc.
- Move `lib/wordpress-api.ts` to `lib/cms/wordpress.ts` as the concrete implementation
- All API routes and page components consume the adapter, not WordPress directly
- Makes swapping to Contentful, Sanity, or a custom backend a matter of writing a new adapter

---

## Phase 3 — Make the Admin Dashboard Data-Driven

The sidebar nav and dashboard stat cards are hardcoded. Make them configurable.

- Extract `navGroups` in `app-sidebar.tsx` into `config/admin-nav.ts`
- Extract `statCards` and `quickActions` in the dashboard page into the same config
- New orgs add/remove nav items and stats without touching component code
- `EditableSection` component is already generic — keep as-is

---

## Phase 4 — Templatize the Public Pages

The public-facing pages mix generic layout with org-specific content.

- Keep all section components (`Hero`, `AboutSection`, `Programs`, etc.) but strip org-specific copy — they should only render what they're passed as props
- Create `content/pages/` folder where each page has a config file defining its sections and CMS field mappings
- The homepage `page.tsx` pattern (fetch → merge with defaults → pass to components) is already solid — formalize it as the standard page pattern

---

## Phase 5 — Environment & Secrets Template

- Replace `.env.local` with a `.env.example` documenting every variable with placeholder values and comments
- Create `scripts/setup.ts` CLI script that prompts for org name, CMS URL, admin email, etc. and generates config files
- Document WordPress plugin requirements (JWT Auth, ACF, custom post types) in `SETUP.md`

---

## Phase 6 — Package as a Template Repo ✅

- `FRAMEWORK.md` — architecture overview, file map, rebranding checklist, CMS swap guide, page/section addition guides
- `config/theme.ts` — colour token file; orgs change one file for branding (mirror in `globals.css`)
- Org-specific assets (images, logos) remain in `/public/` — documented in rebranding checklist as items to replace
- GitHub template repo: enable via repo Settings → "Template repository"

---

## What to Keep vs. Replace Per Deployment

| Keep as-is                    | Configure per org        | Replace entirely   |
|-------------------------------|--------------------------|--------------------|
| Auth system (JWT + middleware) | `framework.config.ts`   | Logo, images       |
| Admin dashboard layout        | Nav items config         | Color tokens       |
| `EditableSection` pattern     | Homepage defaults        | Org name/copy      |
| API route structure           | CMS adapter config       | Contact email/phone|
| Cloudflare Worker pattern     | Allowed CORS origins     | Partner list       |

---

## Target File Structure After Refactor

```
├── config/
│   ├── framework.config.ts     ← org identity, colors, contact
│   ├── admin-nav.ts            ← sidebar nav items
│   └── theme.ts                ← color tokens
├── content/
│   └── defaults/               ← per-section fallback content
├── lib/
│   └── cms/
│       ├── adapter.ts          ← ICMSAdapter interface
│       └── wordpress.ts        ← WP implementation
├── scripts/
│   └── setup.ts                ← interactive setup CLI
└── .env.example
```

---

## Priority Order

1. **Phase 1 + 2** — biggest ROI. Once config is centralized and CMS is behind an adapter, everything else follows naturally.
2. **Phase 3** — quick win, makes the admin dashboard portable.
3. **Phase 4 + 5** — needed before sharing with other orgs.
4. **Phase 6** — final packaging step.
