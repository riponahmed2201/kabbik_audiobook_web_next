# Kabbik frontend migration (Next.js 16)

Migrated from `kabbik_audiobook_web_frontend` into this sibling project.

## Stack

- Next.js **16.4.3**, React **19**, App Router, Cache Components
- Tailwind **v3.4** + PostCSS (matches legacy theme: `bg-bg`, `text-cxl*`, custom breakpoints)
- Dev port: **3001** (`npm run dev` uses **webpack** — Turbopack + Tailwind v3 PostCSS was breaking CSS in dev)

## Environment

Copy secrets from the legacy app if needed:

- `AUTH_SECRET`, `AUTH_URL`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Facebook: `AUTH_FACEBOOK_ID` / `AUTH_FACEBOOK_SECRET` (see `src/app/lib/auth.ts`)

Legacy `.env` was copied when present; use `.env.local` for local overrides.

## Install

```bash
npm install
```

Uses `legacy-peer-deps` (see `.npmrc`) for `draft-convert` vs React 19.

## Verify

```bash
npm run build   # production build (required before deploy)
npm run dev     # http://localhost:3001
npm test        # Jest (passes with no tests)
npm run lint    # ESLint 9 — many legacy warnings remain; tighten rules incrementally
```

## Smoke routes (manual)

| Area | URL |
|------|-----|
| i18n | `/bn`, `/en` |
| Home | `/bn` |
| Audiobook | `/bn/audiobook/{id}` |
| Subscribe | `/bn/subscribe` |
| Payment | `/payment-info`, `/bn/payment-status` |
| Auth | Google/Facebook via NextAuth |
| Profile | `/bn/profile` |

## Staging / cutover

1. Point CI/CD build to this directory (`npm run build`).
2. Deploy env vars from legacy production.
3. Keep `kabbik_audiobook_web_frontend` as rollback until sign-off.
4. Optional follow-ups:
   - `npx @next/codemod@canary middleware-to-proxy` (middleware deprecation warning)
   - Restore JSON cache-busting without breaking prerender (client-only `?v=` or `"use cache"`)
   - ESLint: relax or fix legacy `any` rules in bulk

## Notable migration changes

- Async `params` / `searchParams` / `cookies()` for Next 15+
- Removed `revalidate`, `dynamic`, `runtime` segment exports incompatible with Cache Components
- `[lang]/layout.tsx`: `export const instant = false` for blocking dynamic shell (auth, navbar data)
- Removed unused `react-i18next` from duplicate-tab page
- JSON fetch URLs no longer append `Date.now()` at build time
