# Setup Guide

Step-by-step instructions for deploying this framework for a new organisation.

---

## Prerequisites

- Node.js 18+
- A WordPress install (self-hosted or managed hosting)
- A Resend account for contact form emails

---

## 1. Clone & Install

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
npm install
```

---

## 2. Configure the Organisation

Edit **`config/framework.config.ts`** — this is the single file that controls all org-specific values:

| Field | What to change |
|---|---|
| `org.name` | Full organisation name |
| `org.shortName` | Abbreviated name used in headings |
| `org.adminLabel` | Label shown in the admin sidebar |
| `org.logo` | Path to logo file in `/public` |
| `contact.*` | Email, phone, address |
| `nav` | Public navigation links |
| `footerLinks` | Footer quick links |
| `partners` | Partner organisation names |
| `colors.*` | Brand hex colours |
| `seo.*` | Default meta title and description |

Also update **`content/defaults/homepage.ts`** with the org's hero slides, about copy, programs, and stats.

---

## 3. Environment Variables

```bash
cp .env.example .env.local
```

Fill in every value in `.env.local`. See the comments in that file for guidance on each variable.

---

## 4. WordPress Plugin Requirements

Install these plugins on your WordPress site:

| Plugin | Purpose |
|---|---|
| **JWT Authentication for WP-API** | Enables token-based login for the admin panel |
| **Advanced Custom Fields (ACF)** | Powers all editable homepage sections |
| **ACF to REST API** | Exposes ACF fields via the REST API |
| **WP CORS** (or custom) | Allows your Next.js domain to call the WP REST API |

### wp-config.php additions (required for JWT Auth)

Add these lines **above** `require_once(ABSPATH . 'wp-settings.php');`:

```php
define('JWT_AUTH_SECRET_KEY', 'your-jwt-secret-here'); // must match JWT_SECRET_KEY in .env.local
define('JWT_AUTH_CORS_ENABLE', true);
```

---

## 5. WordPress Custom Post Types & ACF Field Groups

The following custom post types must be registered (use the provided plugin or register manually):

- `team_member` — fields: `name`, `role`, `image`, `order`, `bio`
- `account_number` — fields: `bank_name`, `account_name`, `account_number`, `currency`

ACF field groups required for the homepage (`ffi/v1/homepage` endpoint):

- Hero slides (`hero_slides` repeater)
- About section (`about_eyebrow`, `about_heading`, `about_paragraphs`, `about_image`, `about_stat_number`, `about_stat_label`)
- Vision & Mission (`vm_eyebrow`, `vm_heading`, `vm_intro`, `vision_text`, `mission_text`, `sdg_pillars` repeater)
- Programs (`programs_eyebrow`, `programs_heading`, `programs_description`, `programs_stats`, `programs_progress_bars`, `programs_initiatives`)
- Partners (`partners` repeater)

---

## 6. CORS Configuration

Your WordPress site must allow requests from your Next.js domain.

Add to your theme's `functions.php` or a custom plugin:

```php
add_action('init', function () {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = ['https://your-public-site.com', 'http://localhost:3000'];
    if (in_array($origin, $allowed)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
    }
});
```

---

## 7. Run Locally

```bash
npm run dev
```

Admin panel: `http://localhost:3000/admin-login`

---

## 8. Deploy

This project is optimised for **Vercel**. Connect your repo and add all `.env.local` variables as environment variables in the Vercel dashboard.

For on-demand revalidation from WordPress, add a webhook in WP that POSTs to:

```
https://your-public-site.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET
```

---

## Swapping the CMS

The CMS is behind an adapter interface (`lib/cms/adapter.ts`). To replace WordPress with another CMS (Contentful, Sanity, etc.):

1. Create `lib/cms/your-cms.ts` implementing `ICMSAdapter`
2. Update `lib/cms/index.ts` to return your new adapter from `getCMSAdapter()`
3. No other files need to change
