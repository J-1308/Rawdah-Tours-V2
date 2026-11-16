# Rawdah Tours V2 — handoff

A self-contained briefing for whoever (or whatever tool) picks this up next. Keep it current.
Last updated 16 November 2026.

## Start here (next session)

1. Read this file, then `CLAUDE.md` (rules), `docs/design-system.md`, `docs/lessons.md` and
   `docs/project/open-questions.md`.
2. **Merge first if Jibril hasn't:** branch `photos/ramadan-hotels` holds all of 16 Nov's work in one chain
   (`contact/trip-bar` → `forms/steps` → `questionnaire/client` → `design/pass` → `photos/ramadan-hotels` →
   trust box). One merge brings it all: https://github.com/J-1308/Rawdah-Tours-V2/compare/main...photos/ramadan-hotels
   Base new work on that branch (or on `main` once merged).
3. Then carry on with **What's next** below.

## The business

Rawdah Tours Ltd, based in West London (registered office 66 Paul Street, London EC2A 4NA). Guided Umrah from the
UK with certified ustadhs, and a group preparing for **Hajj 2027** (registration of interest; packages are booked
and paid on Nusuk, never through Rawdah). Co-founders: Brother Ayuub Mohamed Musa and Ustadh Issa Uthman; guest
sheikhs join trips to teach. Next flagship: **Ramadan Umrah 2027 with GGC** (27 Feb – 13 Mar 2027), shown publicly
as "Ramadan 1448: coming soon" until GGC and Rawdah say go. Audience mostly from Instagram, WhatsApp and word of
mouth. Phone +44 7809 281429, rawdahtours@gmail.com, @rawdahtours.

## The repos

- `J-1308/Rawdah-Tours-V2`: **this repo, the only one we develop in.**
- `J-1308/Rawdahtoursw-website`: V1, read-only. Rawdah's facts, copy and photos.
- `J-1308/The_Umrah_Experience`: The Umrah Company, **a different client**. Read-only. Share the conversion method
  only; never its look, layout, copy, photos, people or facts (ADR 0001).

## Where it runs

Live on **www.rawdahtours.co.uk** (Vercel project `rawdah-tours-v2`, team `j-1308s-projects`), currently behind
`SITE_PASSWORD` (whole site, `/gate`). Jibril plans to relaunch on 16 Nov 2026 by deleting `SITE_PASSWORD` in
Vercel and redeploying. Every branch gets a preview at
`rawdah-tours-v2-git-<branch-with-dashes>-j-1308s-projects.vercel.app` (behind Vercel login).

Env vars set in Vercel (16 Nov): `SITE_PASSWORD`, `BLOB_READ_WRITE_TOKEN` (private Blob store). **Not set:**
`RESEND_API_KEY` (no emails go out yet; Jibril has the steps), Stripe keys, `NEXT_PUBLIC_CALL_URL` (Cal.com link).
Jibril adds env vars himself; secrets never go in chat or the repo.

## What is built

Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Copy lives in `src/app/_site/content.ts`; prices only in
`src/lib/trips.ts` (server side). Pages: home, `/trips`, trip pages (`/trips/hajj-2027`, the Ramadan teaser
`/trips/ramadan-umrah-2027` with a private full preview at `.../preview`), `/private-umrah`, `/groups`, `/about`,
legal pages, and `/questionnaire` (noindex, Rawdah's questions).

Added on 16 Nov (the conversion brief, `prompt-rawdah-tours.md` in Jibril's Downloads):
- **Tracking** (merged): Vercel Web Analytics custom events and UTM capture. `docs/tracking.md`.
- **Trip phone bar**: price, deposit and the main button on trip pages (`trip-bar.tsx`).
- **Step-by-step forms** (`step-form.tsx`, spec by Fable): step 1 saves a partial lead to Blob
  (`lib/server/leads.ts`, `actions/lead.ts`); paths for group, private, community, Hajj and interest; endings for
  WhatsApp, a call (when `NEXT_PUBLIC_CALL_URL` is set) and the deposit (when bookable).
- **Questionnaire** for Rawdah (`/questionnaire`): 43 questions; answers go to Blob and email.
- **Design pass** led by Fable: 14px minimum text, no pills, quieter home, opaque phone bars, shorter phone footer;
  on phones the page head shows the title and status above a 4:3 photo (Jibril's pick).
- **Ramadan hotel photos**: four each in a swipeable frame (`hotel-gallery.tsx`).
- **Trust box** (`TrustBox` in `trip-parts.tsx`, switch and numbers in `trust` in `content.ts`): the people on the
  trip, then "Book your place" and "Get the full itinerary" (or WhatsApp). Years, pilgrims and rating stay empty
  until Rawdah confirms them.

## Decisions to keep

- Booking: WhatsApp with the deposit by bank transfer now; card payments with Stripe later, **both** offered. No
  Supabase: bookings will be stored in Blob. Open trips say "Book your place" everywhere.
- ATOL 5311 only in the terms and footer. Don't name the ATOL provider.
- Cookieless: no Meta Pixel or Google Ads tags. No fake urgency or countdowns.
- Fable (the `fable` model via the Agent tool) only for judgement calls: plan reviews, design passes, specs for new
  pieces, the final review before each release. Jibril wants its usage kept for those.

## What's next

1. **Fable's final review** of the 16 Nov work (phone and desktop screenshots of home, a trip, Hajj, Ramadan
   preview, private, groups, about), then fix and merge.
2. **Resend**: once Jibril adds `RESEND_API_KEY`, send a test sign-up and check both emails arrive.
3. **Card deposits**: rebuild the booking store on Blob (no Supabase), then Stripe once Jibril adds the keys.
   `docs/booking.md` describes the current (Supabase) code.
4. **"How it all began"** section on About, built with slots for the questionnaire answers, behind a switch.
5. **Chat proposal**: a short note (scripted vs AI), no build.
6. Deferred: reminder emails (need Resend), Makkah/Madinah guides (need client-verified text). Cut: wishlist.

Waiting on Rawdah: questionnaire answers (story, years, pilgrim numbers), Cal.com link, Ramadan go-ahead and its
teachers, Sheikh Yahya Rabi's photo from GGC, photo licences (Arafah and Makkah aerial). Full list in
`docs/project/open-questions.md`.

## Rules

Branch per task, PR into `main`; `npm run build` before pushing; check every change at 390px; never invent people,
testimonials, dates or prices; ask before creating outside resources; update the docs a change touches.

## Site password

On only while `SITE_PASSWORD` is set (Production). Visitors type it once at `/gate`; a cookie keeps them in for 30
days; robots.txt shuts search engines out meanwhile. To open the site, delete it in Vercel and redeploy. Code:
`src/proxy.ts`, `src/lib/server/site-gate.ts`, `src/app/gate/page.tsx`.
