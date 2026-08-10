# Sunil Gautam — Portfolio

Personal portfolio for a Senior Frontend Engineer, built as a technical portfolio piece in its
own right. Deploys entirely on Vercel's free Hobby tier — no paid backend, no persistent server.

**Live:** [sunilgautam.dev](https://sunilgautam.dev) · **Repo:** [github.com/sunilgautam1551/dev-portfolio](https://github.com/sunilgautam1551/dev-portfolio)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, RSC, Server Actions) |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS v4 (CSS-first `@theme`), shadcn/ui (Radix) |
| Animation | Framer Motion, GSAP + ScrollTrigger, Lenis (smooth scroll) |
| Forms | react-hook-form + zod |
| Email | Resend |
| Data | Upstash Redis (REST, serverless-friendly — guestbook + rate limiting) |
| Spam protection | Honeypot + Cloudflare Turnstile + Upstash rate limiting |
| Testing | Jest + React Testing Library |
| Tooling | ESLint, Prettier, Husky + lint-staged |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values you have — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders and is fully navigable with
zero env vars set — the contact form, guestbook, and admin page just report "not configured"
until their respective services are wired up (see next section).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npm run test    # jest + react-testing-library
npm run format  # prettier --write .
```

## Environment variables

All documented in [`.env.example`](.env.example). None are required for local development — each
integration degrades gracefully (clear "not configured" responses, not crashes) when its env vars
are absent.

| Variable | Used for | Required for |
|---|---|---|
| `RESEND_API_KEY` | Sending contact-form emails | Contact form |
| `CONTACT_NOTIFICATION_EMAIL` | Where notifications land (may differ from the public contact email — see note below) | Contact form |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Guestbook storage + rate limiting | Guestbook, rate limiting |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Bot verification | Optional (forms work without it) |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | HTTP Basic Auth on `/admin/guestbook` | Guestbook moderation |
| `NEXT_PUBLIC_SITE_URL` | Metadata, sitemap, OG tags, JSON-LD | Correct SEO in production |

**On `CONTACT_NOTIFICATION_EMAIL`:** Resend's sandbox mode (no verified sending domain) only
allows delivery to the account's own registered email — not any address you choose. This variable
lets the *public-facing* contact email (shown on the site) stay whatever you want, while
notifications still land somewhere that actually works, until a domain is verified in Resend.

**On `NEXT_PUBLIC_SITE_URL`:** must include the `https://` scheme. `lib/site-config.ts` tolerates a
bare domain and falls back to a default rather than crashing the build, but the real value should
still be set correctly for accurate metadata/sitemap output.

## Deploying (Vercel free tier)

1. Push to GitHub, import the repo in Vercel.
2. Add the environment variables above in **Project Settings → Environment Variables** (`NEXT_PUBLIC_*`
   ones need to be set *before* the first build, since they're baked in at build time).
3. Deploy. No other config needed — `next build` and the App Router file conventions (`sitemap.ts`,
   `robots.ts`, route handlers) are all Vercel understands natively.
4. Drop your resume PDF at `public/Sunil_Gautam.pdf` — the `/resume` page and command palette both
   link to it, but the file itself isn't checked into the repo.

Everything dynamic runs as a stateless serverless/edge function against free-tier third-party
services (Resend, Upstash, Turnstile) — no cron jobs, no persistent connections, nothing that
needs a paid plan at this project's scale.

## Architecture notes — why these choices

- **Content lives in `lib/content.ts`, not scattered through components.** Every section reads
  from one typed source of truth (`types/content.ts`). The homepage shows a *curated* slice (top
  highlights, condensed skills) while `/resume` renders the same underlying data in full — so the
  portfolio stays skimmable without the resume losing anything an ATS or a recruiter needs.
- **Guestbook uses Upstash Redis via REST, not a persistent DB connection** — the only shape of
  database access that works cleanly from stateless serverless functions on the free tier, with no
  idle-pause risk.
- **Guestbook moderation is HTTP Basic Auth in `middleware.ts`,** not a full auth system — this is
  a single-owner moderation page, not multi-user, so session management would be pure overhead.
- **The homepage's guestbook list is cached with `unstable_cache` + tag-based revalidation**
  (`GUESTBOOK_CACHE_TAG`), not fetched fresh on every request — keeps `/` statically generated with
  ISR instead of forcing full dynamic rendering just because one section reads from Redis. Approving
  an entry busts the cache immediately via `revalidateTag`.
- **Case study visuals are hand-built illustrative mockups, not screenshots.** The real products are
  confidential; the mockups (`components/sections/case-study-visuals/`) demonstrate the kind of UI
  described (dashboards, docs platforms) without depicting anything real.
- **Every animated component checks `prefers-reduced-motion`** via `hooks/use-reduced-motion.ts` and
  renders its final state immediately when it's set, rather than skipping content.
- **Contact form spam defenses are layered, not singular:** a honeypot field, Upstash-backed rate
  limiting (5/hour/IP), and optional Turnstile verification — each degrades independently rather than
  the form breaking if one isn't configured.

## Project structure

```
app/                  Routes (App Router) — pages, API route handlers, sitemap/robots
  api/                 contact, guestbook route handlers
  admin/guestbook/     Basic-Auth-protected moderation page + server actions
  resume/              Full resume render + PDF download
  og/                  Dynamic OG image (edge runtime)
components/
  sections/            Homepage sections (Hero, Engineering, Case Studies, Skills, ...)
  guestbook/, spam/    Feature-specific components
  ui/                  shadcn/ui primitives, customized
  layout/              Nav, Footer, theme provider, smooth-scroll provider
lib/                   Content data, validation schemas, service clients (Redis/Resend/Turnstile)
types/                 Shared content types
middleware.ts          Basic Auth guard for /admin
__tests__/             Jest + RTL specs
```

## Testing

```bash
npm run test
```

Covers the zod validation schemas (contact + guestbook), the contact form's client-side validation
behavior, and the theme toggle. Not exhaustive — scoped to the logic most likely to break silently
(validation rules, spam-honeypot behavior) rather than re-testing what TypeScript and the browser
already guarantee.
