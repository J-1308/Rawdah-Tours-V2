# Rawdah Tours V2 — handoff

A self-contained briefing for whoever (or whatever tool) picks this up next. Keep it current.
Last updated 18 November 2026.

## Start here (next session)

1. Read this file, then `CLAUDE.md` (rules), `docs/design-system.md`, `docs/lessons.md` and
   `docs/project/open-questions.md`.
2. 16 Nov's work is merged (PR #16). **Merge `review/launch-fixes` if Jibril hasn't** (Fable's pre-launch review,
   17 Nov). Base new work on `main` once merged.
3. Then carry on with **Before launch** and **What's next** below.

## The business

Rawdah Tours Ltd, based in West London (registered office 66 Paul Street, London EC2A 4NA). Guided Umrah from the
UK with certified ustadhs, and a group preparing for **Hajj 2027** (registration of interest; packages are booked
and paid on Nusuk, never through Rawdah). Co-founders: Brother Ayuub Mohamed Musa and Ustadh Issa Uthman; guest
sheikhs join trips to teach. Next flagship: **Ramadan Umrah 2027 with GGC** (27 Feb – 13 Mar 2027). GGC and Rawdah
confirmed everything (17 Nov 2026); the full page is revealed (`ramadanReveal = true`) from branch `ramadan/rework`,
and it is **the page every Instagram link lands on**, so it must sell the trip from its first phone screen. Audience mostly from Instagram, WhatsApp and word of
mouth. Phone +44 7809 281429, rawdahtours@gmail.com, @rawdahtours.

## The repos

- `J-1308/Rawdah-Tours-V2`: **this repo, the only one we develop in.**
- `J-1308/Rawdahtoursw-website`: V1, read-only. Rawdah's facts, copy and photos.
- `J-1308/The_Umrah_Experience`: The Umrah Company, **a different client**. Read-only. Share the conversion method
  only; never its look, layout, copy, photos, people or facts (ADR 0001).

## Where it runs

Runs on **https://rawdah-tours-v2.vercel.app** (Vercel project `rawdah-tours-v2`, team `j-1308s-projects`), behind
`SITE_PASSWORD` (whole site, `/gate`). **Not on rawdahtours.co.uk yet:** that domain still shows a temporary
placeholder. `rawdahtours.co.uk` and `www.rawdahtours.co.uk` are added to the Vercel project but unverified (checked
17 Nov 2026); going live there means pointing the domain's DNS at Vercel, which Jibril does when he's ready. Every branch gets a preview at
`rawdah-tours-v2-git-<branch-with-dashes>-j-1308s-projects.vercel.app` (behind Vercel login).

Env vars set in Vercel (16 Nov): `SITE_PASSWORD`, `BLOB_READ_WRITE_TOKEN` (private Blob store). **Not set:**
`RESEND_API_KEY` (no emails go out yet; Jibril has the steps), `PRIVATE_PASSWORD`, Stripe keys,
`NEXT_PUBLIC_CALL_URL` (Cal.com link).
Jibril adds env vars himself; secrets never go in chat or the repo.

## What is built

Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Copy lives in `src/app/_site/content.ts`; prices only in
`src/lib/trips.ts` (server side). Pages: home, `/trips`, trip pages (`/trips/hajj-2027`, `/trips/ramadan-umrah-2027`; its
`.../preview` copy stays behind `PRIVATE_PASSWORD`), `/private-umrah`, `/groups`, `/about`,
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

## Before launch (Fable's review, 17 Nov)

Code fixes are on `review/launch-fixes`. Jibril still has to:
1. Add `RESEND_API_KEY` (rawdahtours.co.uk verified in Resend) or the signups sheet, then send a test lead and check
   it arrives. Until then form leads only land in Blob, which nobody watches. A lead that reaches nowhere now shows an
   error and a WhatsApp button instead of "received".
2. Add `PRIVATE_PASSWORD` in Vercel. Once `SITE_PASSWORD` is gone it guards `/trips/*/preview` and `/questionnaire`
   (through `/gate`); without it those pages 404. Give Rawdah the new password for the questionnaire.
3. Replace two unlicensed photos (`public/images/slots/README.md`): `hajj-arafah` (Hajj hero, home start card) and
   `hajj-makkah` (Hajj trip card). Drop a licensed file into the slot; no code change.
4. Decide on the Nusuk Hajj logo in the brands row (a Saudi government mark; drop it unless Rawdah has permission).
5. Then delete `SITE_PASSWORD` and redeploy.
6. When ready, point rawdahtours.co.uk's DNS at Vercel (Vercel → project → Domains shows the records).
7. One-page launch (Jibril, 19 Nov 2026): only the Ramadan Umrah 2027 page is live (`src/lib/site-mode.ts`,
   `ONE_PAGE`). The home page and every other page redirect to it (307); privacy, terms, cookies, booking returns,
   the private pages and the API stay. Header and footer show only this page; Hajj interest goes to WhatsApp. No
   placeholders on the page (photo spaces and "to come" notes removed). Payments: bank transfer only, no card link.
   Set `ONE_PAGE` to false to bring the full site back.

Review items left for later: focus moves between form steps, the Private page's thin FAQ and empty desktop column,
desktop hero buttons on Private and Groups, Ramadan reveal facts (the 30 November instalment for late bookings, an
early-bird end, any teachers besides Ustadh Issa), and
"A true brotherhood / Past travellers say" on home (V1 copy; ask Rawdah to keep or reword).

## Ramadan page rework (17–18 Nov 2026, branch `ramadan/rework`)

Jibril approved the plan. Cut: three price cards and two timetables (now one packages table), the trust box and the
"still being arranged" box on trips with a full plan, three of four Eid notes, "Ground only" as an included item (now
a note). Added: hotel thumbnails under each photo (others faded, tap to show); the group at Uhud as the head photo
(Rawdah's Umrah poster will replace it); poster lettering for titles; the join panel's "Book your place" opens the
step form with package, travellers and sharing carried across (`prefillForm` in `step-form.tsx`), WhatsApp beside
it and a call line; the animations in design-system §7; no opening on this page; Ustadh Issa on the trip team.
Not claimed: half term (London's is 15–19 Feb 2027; the trip is in term time).

Opus review (18 Nov, Fable had no credits), fixed: share cards now name the trip (they showed the site-wide Hajj
card); no count-up (wrong prices mid-count); stars twinkle in three groups and pause off screen (they kept slow
phones' main thread busy); poster headings keep their real text (the drawn M is a mask over a real "M"); fonts
preloaded; the phone bar steps aside over the panel and form; the form follows the panel as it changes; a review-marked
note for bookings after 30 November; no top strip on this page; print shows everything. Jibril then chose (18 Nov):
poster lettering on the title and the closing "Book your place" only; keep the plane and the cards lifting in turn; no
stars above the flights; on phones, the dates straight under the title and no breadcrumb on this page. Note: share
images use the site's base URL (www.rawdahtours.co.uk), so they show only once the domain points at Vercel.

## Ramadan poster skin (19 Nov 2026, branch `ramadan/poster-skin`)

Jibril liked the direction: the page below the header in the GGC poster's stone, mist and olive (header and footer
stay Rawdah's). From the rest of the poster: the lockup now reads LAST 10 NIGHTS; Eid in the blessed lands (never
"we may spend Eid travelling": go with the poster); the icon row of what's included; Sheikh Yahya Raaby as special
guest (portrait cropped from Jibril's photo) in a poster-style team row; final prices in a flights × room grid with the
early bird crossed out (ground only is an enquiry); its own opening when arriving from another page. Of four heads
Jibril chose poster **elements**, then asked (19 Nov) for our own portraits instead of the poster's crop, a centred
hero with the image first, seamless edges, and far less text across the page ("people don't want to read"). The head
is now: the poster's Ka‘bah artwork cut out of its background, frosted tablets with live text, the live lockup,
dates, GGC, one line, the price panels, our round portraits, the button. The about block is a photo, a title and two
sentences. The idea, for the rest of the site: a good image, then a strong title and a little text.

## What's next

1. ~~Fable's final review~~ done 17 Nov; see Before launch.
2. **Resend**: once Jibril adds `RESEND_API_KEY`, send a test sign-up and check both emails arrive.
3. **Card deposits**: rebuild the booking store on Blob (no Supabase), then Stripe once Jibril adds the keys.
   `docs/booking.md` describes the current (Supabase) code.
4. **"How it all began"** section on About, built with slots for the questionnaire answers, behind a switch.
5. **Chat proposal**: a short note (scripted vs AI), no build.
6. Deferred: reminder emails (need Resend), Makkah/Madinah guides (need client-verified text). Cut: wishlist.

Waiting on Rawdah: questionnaire answers (story, years, pilgrim numbers), Cal.com link, Ramadan's other teachers
(if any), the early-bird end and what late bookers pay for the 30 November instalment, Rawdah's Umrah poster, Sheikh Yahya Rabi's photo from GGC, photo licences (Arafah and Makkah aerial). Full list in
`docs/project/open-questions.md`.

## Rules

Branch per task, PR into `main`; `npm run build` before pushing; check every change at 390px; never invent people,
testimonials, dates or prices; ask before creating outside resources; update the docs a change touches.

## Site password

On only while `SITE_PASSWORD` is set (Production). After launch, `PRIVATE_PASSWORD` keeps the Ramadan preview and
`/questionnaire` behind the same `/gate`; with neither set those two pages return 404. Visitors type it once at `/gate`; a cookie keeps them in for 30
days; robots.txt shuts search engines out meanwhile. To open the site, delete it in Vercel and redeploy. Code:
`src/proxy.ts`, `src/lib/server/site-gate.ts`, `src/app/gate/page.tsx`.
