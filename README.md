# Forward Falls Initiative — Web Platform

The official website and admin dashboard for the Forward Falls Initiative (FFI), a Nigerian NGO working across Lagos, Kano, Kaduna, Abuja, and Borno States.

Built with **Next.js 16** (App Router) as a headless frontend over a **WordPress** CMS backend.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Admin Dashboard](#admin-dashboard)
- [API Routes](#api-routes)
- [Security Model](#security-model)
- [Deployment](#deployment)
- [Change Log](#change-log)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | WordPress (headless, via REST API) |
| Auth | WordPress JWT Authentication plugin |
| Email | Resend |
| Drag & Drop | @dnd-kit |
| Animations | Framer Motion |
| Components | Radix UI primitives |
| Charts | Recharts |

---

## Project Structure

```
app/
  page.tsx                      # Public homepage
  about/                        # About page
  blog/                         # Blog listing + [slug] detail
  board-and-team/               # Team page
  contact/                      # Contact form + map
  donate/                       # Donation page
  programs/                     # Programs overview + sub-pages
  partners/                     # Partners page
  sdg-4/ sdg-10/ sdg-16/       # SDG focus pages
  admin-login/                  # Login page (public)
  admin-dashboard/              # Protected admin area
    page.tsx                    # Dashboard overview
    account/                    # Change password
    posts/                      # Post management
    team/                       # Team member management
    accounts/                   # Bank account management
    media/                      # Media library
    pages/homepage/             # Homepage content editor
  api/
    wordpress-auth/             # Login / logout
    auth/
      change-password/          # Authenticated password change
      forgot-password/          # WordPress lost-password trigger
    posts/                      # Blog post CRUD
    team/                       # Team member CRUD
    accounts/                   # Bank account CRUD
    media/                      # Media library
    page-content/               # Homepage content (read/write)
    contact/                    # Contact form email
    revalidate/                 # ISR cache revalidation
    wordpress-users/            # WP user management (admin only)

components/
  admin/
    AdminAuthGuard.tsx          # Client-side auth check
    app-sidebar.tsx             # Admin navigation sidebar
  ui/                           # Radix UI component wrappers

lib/
  auth.ts                       # JWT helpers (getJWTToken, validateJWTToken)
  wordpress.ts                  # WP user management (uses Basic Auth)
  rate-limit.ts                 # In-memory rate limiter
  validate-id.ts                # Numeric ID param validator
  homepage-defaults.ts          # Default content fallbacks

proxy.ts                        # Route protection (formerly middleware.ts)
next.config.ts                  # Image domains + security headers
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd forward-falls

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values (see below)

# 4. Run the development server (port 3001)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in every value. **Never commit `.env.local`** — it is in `.gitignore`.

```env
# WordPress backend
WORDPRESS_SITE_URL=https://your-wordpress-site.com
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
WORDPRESS_AUTH_USERNAME=your_wp_admin_username
WORDPRESS_AUTH_PASSWORD=your_wp_application_password

# Cache revalidation — server-side only, never use NEXT_PUBLIC_ here
REVALIDATE_SECRET=generate-a-strong-random-secret

# Email (Resend — https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Public site URL
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

> **Note:** `WORDPRESS_AUTH_USERNAME` / `WORDPRESS_AUTH_PASSWORD` are used only by `lib/wordpress.ts` for admin-level operations (user creation). The JWT-based auth used by the dashboard passes the user's own token, not these credentials.

---

## Admin Dashboard

Access at `/admin-login`.

### Login flow
1. User submits username + password
2. `/api/wordpress-auth` calls the WordPress JWT plugin
3. On success, the JWT is stored in:
   - `localStorage` (used as `x-wp-token` header for API calls)
   - An `HttpOnly; Secure; SameSite=Lax` cookie (read by `proxy.ts` for route protection)
4. `proxy.ts` validates the cookie against WordPress on every admin route request

### Features
| Section | Path | Description |
|---------|------|-------------|
| Overview | `/admin-dashboard` | Stats + quick actions |
| Posts | `/admin-dashboard/posts` | Create, edit, publish, draft, trash posts |
| Team | `/admin-dashboard/team` | Add/edit/delete/reorder team members |
| Homepage | `/admin-dashboard/pages/homepage` | Edit homepage content (synced to WordPress ACF) |
| Accounts | `/admin-dashboard/accounts` | Manage donation bank account details |
| Media | `/admin-dashboard/media` | Browse and delete uploaded media |
| My Account | `/admin-dashboard/account` | Change password |

### Changing your password
1. Log in to the admin dashboard
2. Go to **My Account** (bottom of the sidebar)
3. Enter your current password and the new password twice
4. Click **Update Password**

After changing your password, update `WORDPRESS_AUTH_PASSWORD` in `.env.local` if it matches the account stored there.

### Forgot password
On the login page, click **Forgot password?** and enter your WordPress account email. WordPress will email a reset link directly.

---

## API Routes

All admin API routes require the `x-wp-token` header containing a valid JWT.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/wordpress-auth` | Public | Login — returns JWT, sets HttpOnly cookie |
| DELETE | `/api/wordpress-auth` | Public | Logout — clears HttpOnly cookie |
| POST | `/api/auth/change-password` | JWT | Change current user's password |
| POST | `/api/auth/forgot-password` | Public | Trigger WP lost-password email |
| GET | `/api/posts` | JWT | List posts |
| POST | `/api/posts` | JWT | Create post |
| GET | `/api/posts/[id]` | JWT | Get single post |
| PATCH | `/api/posts/[id]` | JWT | Update post |
| DELETE | `/api/posts/[id]` | JWT | Trash or permanently delete post |
| POST | `/api/posts/upload` | JWT | Upload image to WordPress media library |
| GET | `/api/team` | Optional JWT | List team members |
| POST | `/api/team` | JWT | Create team member |
| GET/PATCH/DELETE | `/api/team/[id]` | JWT | Team member operations |
| GET | `/api/accounts` | Optional JWT | List bank accounts |
| POST | `/api/accounts` | JWT | Create bank account |
| PATCH/DELETE | `/api/accounts/[id]` | JWT | Update/delete bank account |
| GET | `/api/media` | JWT | List media files |
| DELETE | `/api/media/[id]` | JWT | Delete media file |
| GET | `/api/page-content` | Public | Read homepage content |
| PATCH | `/api/page-content` | JWT | Write homepage content |
| POST | `/api/contact` | Public | Send contact form email via Resend |
| POST | `/api/revalidate` | Secret header | Trigger ISR revalidation |
| GET/POST | `/api/wordpress-users` | JWT + admin role | List/create WP users |

---

## Security Model

### Authentication
- All protected admin dashboard routes are guarded by `proxy.ts`, which validates the JWT against WordPress on every request
- The JWT cookie is `HttpOnly` — cannot be read by JavaScript
- Login is rate-limited to 10 attempts per IP per minute

### WordPress REST API
- `ffi/v1/homepage` POST requires `administrator` role in WordPress
- All field writes use a whitelist of known keys
- `/test-write` endpoint was removed

### Input validation
- Contact form: all fields HTML-escaped before email insertion, length limits enforced, email format checked
- File uploads: MIME type, extension, and size (5 MB max) validated server-side
- All `[id]` route params validated as positive integers before use

### HTTP Security Headers (applied to all routes)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

---

## Deployment

The app is designed to deploy on **Vercel** or any Node.js host.

```bash
npm run build
npm start
```

Set all environment variables in the host's dashboard — **do not** commit `.env.local`.

### After deploying
1. Set `REVALIDATE_SECRET` in your host environment
2. Configure the WordPress JWT plugin to allow your domain
3. Make sure `WORDPRESS_SITE_URL` points to the live WordPress instance

---

## Change Log

See [CHANGELOG.md](./CHANGELOG.md) for the full history of changes, AI-made fixes, and human corrections.
