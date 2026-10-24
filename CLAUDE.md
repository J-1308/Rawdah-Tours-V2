# Rawdah Tours V2

Premium, community-led Umrah travel site for Rawdah Tours. This repo is the only place development happens.

## Stack
Next.js (App Router) · TypeScript · Tailwind v4 · Supabase · Stripe Checkout · Resend · Vercel.

## Read before working
- Design or UI change → `docs/design-system.md`
- Booking, payments, email, database → `docs/booking.md`
- Copy, people, trip facts, assets → `docs/content-inventory.md`
- Where the V2 build is up to → `docs/build-plan.md`

## Reference repos (read-only, open only when a task needs them)
- `J-1308/Rawdahtoursw-website`: V1. Booking/Stripe code to consult. Never push to it.
- `J-1308/The_Umrah_Experience`: a **different client**. Borrow principles, never its palette, fonts or copy. Never push to it.

## Rules
- Work on a branch per task; open a PR. Never commit to `main` directly.
- Run `npm run build` before pushing. Don't push a failing build.
- Prices are computed server-side from one source. Never trust the client.
- No secrets, keys or bank details in the repo. Env vars only.
- Never invent people, testimonials, dates or prices. Mark unknowns as placeholders on the page.
- Mobile first: check every change at phone width.
- Keep these docs current: when you change something a doc describes, update the doc in the same PR.
