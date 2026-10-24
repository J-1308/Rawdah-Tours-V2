# Rawdah Tours V2 — handoff

A self-contained briefing for whoever (or whatever tool) picks this up next. Keep it current.
Last updated 24 October 2026.

## The business

Rawdah Tours Ltd, Birmingham. Guided Umrah from the UK with students of knowledge travelling with every group,
and a group preparing for **Hajj 2027** (registration of interest; packages are booked and paid on Nusuk, never
through Rawdah). Group leader: Brother Ayuub Mohamed Musa. Last trip: *Path of Purity II: Summer Edition*,
4–15 August 2026. Audience: individuals and families, mostly arriving from Instagram, WhatsApp and word of mouth.

## The repos

- `J-1308/Rawdah-Tours-V2` — **this repo, the only one we develop in.**
- `J-1308/Rawdahtoursw-website` — V1, read-only. Source of Rawdah's facts, copy, photos and the booking flow V2 rebuilt.
- `J-1308/The_Umrah_Experience` — The Umrah Company, **a different client** selling similar trips. Read-only.
  V2 shares its *conversion method* only. Its look, layout, copy, photos, people and facts must never appear here
  (see `docs/adr/0001-rawdah-visual-language.md`). Jibril rejected an earlier V2 for looking like it.

## What is built (branch `feat/v2-rebuild`)

Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Public pages in `src/app/(site)/`:

| Route | Page |
| --- | --- |
| `/` | Home |
| `/trips` | Every trip |
| `/trips/hajj-2027` · `/trips/next-umrah` · `/trips/path-of-purity-ii` | Trip pages, each with a join panel and (unless past) a register-interest form |
| `/trips/[slug]/book` | Deposit booking (card via Stripe, or bank transfer) — only for trips with status `open` |
| `/private-umrah` | Private & family Umrah with a planner that writes a WhatsApp message |
| `/groups` | Masjids & groups, with an organiser's message form |
| `/about` | Story, meaning of Rawdah, values, team, contact and company details |
| `/terms` · `/privacy` · `/cookies` | Legal (from V1, April 2026) |
| `/booking/*` · `/admin` · `/api/stripe/webhook` | Booking returns, bookings list, Stripe webhook |

Content: `src/app/_site/content.ts` (every word, with a status). Prices: `src/lib/trips.ts` (one source, server-side).
Design: `docs/design-system.md`. Booking: `docs/booking.md`. Facts and sources: `docs/content-inventory.md`.

## Real vs not yet

The page shows review marks: **Suggested** (our proposal), **To confirm** (only Rawdah can say), **Sample**
(illustrative). A switch on the left edge hides them to judge the look. Everything marked must be resolved, and
the marks and switch removed, before the site goes on rawdahtours.co.uk. The list: `docs/project/open-questions.md`.

The site is `noindex` and `robots.txt` disallows everything until launch.

## Brand

Cream Rawdah logo (`public/images/brand/logo-cream.png`) is the main logo, always on date brown. Palette and fonts
are Rawdah's own (V1 and the live page): ivory, sand, date brown, clay, sand-gold; Cormorant Garamond and DM Sans.
Shape language from the logo's square-kufic grid.

## Hosting

Vercel project `rawdah-tours-v2` (account `j-1308s-projects`), linked to this repo on 25 October 2026. Every push
deploys: `main` to production (`rawdah-tours-v2-j-1308s-projects.vercel.app`), any other branch to a preview.
Deployments sit behind Vercel's login (the team default), so only signed-in team members can open them.
rawdahtours.co.uk is not attached yet. Env vars: see `docs/booking.md`; none are set yet, so forms fall back to
WhatsApp and `/admin` is off.

## Rules

Branch per task, PR into `main`; `npm run build` before pushing; no secrets in the repo or chat (Jibril sets env
vars in Vercel); never invent people, testimonials, dates or prices; check every change at 390px wide; ask before
creating Vercel projects or other outside resources.
