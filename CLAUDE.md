# Rawdah Tours V2

Premium, community-led Umrah and Hajj site for Rawdah Tours. This repo is the only place development happens.
Start with `HANDOFF.md`.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Supabase · Stripe Checkout · Resend · Vercel.

## Read before working
- Design or UI change → `docs/design-system.md`, `docs/adr/0002-soft-premium.md` and `docs/adr/0001-rawdah-visual-language.md`
- Booking, payments, email, database → `docs/booking.md`
- Copy, people, trip facts, assets → `docs/content-inventory.md` (all copy lives in `src/app/_site/content.ts`)
- What only Rawdah can answer → `docs/project/open-questions.md`

## Reference repos (read-only, open only when a task needs them)
- `J-1308/Rawdahtoursw-website`: V1. Rawdah's own facts, copy, photos and booking code. Never push to it.
- `J-1308/The_Umrah_Experience`: a **different client** selling similar trips. Share the conversion method only.
  Never its look, layout, components, copy, photos, people or facts: the two sites must not look or read alike
  (ADR 0001). Never push to it.

## Rules
- Work on a branch per task; open a PR. Never commit to `main` directly.
- Run `npm run build` before pushing. Don't push a failing build.
- Prices are computed server-side from one source (`src/lib/trips.ts`). Never trust the client.
- No secrets, keys or bank details in the repo. Env vars only.
- Never invent people, testimonials, dates or prices. Mark unknowns on the page with a review mark.
- Mobile first: check every change at phone width (390px), and that nothing widens the page.
- Ask before creating Vercel projects or any other outside resource.
- Keep these docs current: when you change something a doc describes, update the doc in the same PR.
