# Headless CMS Framework

A Next.js + WordPress headless CMS starter any organisation can clone, configure, and deploy — without touching component code.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Next.js App                        │
│                                                      │
│  app/page.tsx  ──fetch──▶  lib/cms/index.ts          │
│       │                        │                     │
│       │                   ICMSAdapter                │
│       │                        │                     │
│       ▼                   WordPressAdapter           │
│  Section Components            │                     │
│  (Hero, About, etc.)      WordPress REST API         │
│       │                                              │
│  content/defaults/   ◀── fallback when CMS is empty  │
└─────────────────────────────────────────────────────┘
```

**Key principle:** every page follows the same pattern —
1. Fetch from CMS
2. Merge with defaults from `content/defaults/`
3. Pass merged content as props to section components
4. Components render only what they receive — no hardcoded copy

---

## File Map — What to Touch Per Deployment

### Always edit (org-specific)

| File | What it controls |
|---|---|
| `config/framework.config.ts` | Org name, logo, contact, nav, partners, SEO |
| `config/theme.ts` | Brand colours (also mirror in `app/globals.css`) |
| `config/admin-nav.ts` | Admin sidebar nav items and dashboard cards |
| `content/defaults/homepage.ts` | Fallback copy for every homepage section |
| `content/defaults/mosaic.ts` | Photo mosaic slides and testimonial cards |
| `.env.local` | All secrets and environment-specific URLs |
| `/public/` | Logo, favicon, images |

### Never touch (generic framework)

| File / Folder | What it is |
|---|---|
| `lib/cms/adapter.ts` | CMS adapter interface |
| `lib/cms/wordpress.ts` | WordPress implementation |
| `components/` | All UI components (prop-driven, no org copy) |
| `app/api/` | All API routes |
| `app/admin-dashboard/` | Admin panel layout and pages |
| `middleware.ts` | Auth middleware |

---

## Rebranding Checklist

- [ ] Update `config/framework.config.ts` — name, logo path, contact, nav, SEO
- [ ] Update `config/theme.ts` — brand hex colours
- [ ] Mirror colour changes in `app/globals.css` `:root` block
- [ ] Replace `/public/logo.png` (and favicon) with org assets
- [ ] Update `content/defaults/homepage.ts` — hero slides, about copy, programs, stats
- [ ] Update `content/defaults/mosaic.ts` — photo mosaic slides and testimonials
- [ ] Fill in `.env.local` from `.env.example`
- [ ] Update `config/admin-nav.ts` if you need different dashboard sections

---

## Swapping the CMS

The CMS is behind `ICMSAdapter` in `lib/cms/adapter.ts`. To replace WordPress:

1. Create `lib/cms/your-cms.ts` implementing `ICMSAdapter`
2. Update `lib/cms/index.ts` → `getCMSAdapter()` to return your adapter
3. Nothing else changes

---

## Adding a New Public Page

1. Create `app/your-page/page.tsx`
2. Fetch from CMS via `getCMSAdapter()` (or use static defaults)
3. Add fallback defaults to `content/defaults/your-page.ts`
4. Pass content as props to section components
5. Wrap editable sections with `<EditableSection>` for the admin overlay

---

## Adding a New Admin Section

1. Add a route under `app/admin-dashboard/your-section/`
2. Add the nav entry to `config/admin-nav.ts` → `navGroups`
3. Add a stat card to `config/admin-nav.ts` → `statCards` (optional)
4. Add an API route under `app/api/your-section/route.ts`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| CMS | WordPress (headless) via REST API |
| Auth | JWT (WP plugin) + Next.js middleware |
| Email | Resend |
| Deployment | Vercel |

---

## Getting Started

See [SETUP.md](./SETUP.md) for the full deployment walkthrough.
