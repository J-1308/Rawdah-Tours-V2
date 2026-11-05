# Lessons from Rawdah Tours V2

What made this site work, written after launch (rawdahtours.co.uk, 31 Oct 2026; client changes to 5 Nov). Read with
`docs/design-system.md` (the kit), `docs/adr/0001`–`0004` (why the look is what it is) and `docs/booking.md`.

## 1. Design decisions

**Layout.** Colour by chapter, not by section (ADR 0004). Chapters are rounded sheets (`.chapter`, `--sheet`) that
slide over the one before: night for the moments (Hajj 2027, the last trip, the people, the closing), day for
choosing and deciding (trips, prices, forms). The top is fixed dark: `<html data-top="night">` in
`src/app/layout.tsx`. One set of tokens; `.night` redefines them, so every component flips without variants.

**Type.** Cormorant Garamond 460 for headlines (`Heading`, `.display`, upright, one colour, balanced wrap);
Cormorant italic for labels (`Label`, with the tiny mark); DM Sans for body and UI. Two faces, used
consistently, did more than any decoration. Quiet text never below `text-ink/62`: older travellers, phones,
outdoors.

**Colour.** Cream `#F8F3EB`, linen, beige, sand `#D8C3A1` (the logo's beige), bronze `#80613A` for gold text on
cream, cocoa `#3A2B24`. WhatsApp green `#1FA855` only on the WhatsApp glyph and one button. Sections blend
(`.wash-linen`, `.wash-beige`, `.wash-hero`); no hard edges, no borders.

**The logo as motif.** `rawdah-logo.svg` and `rawdah-mark.svg` used as CSS masks (`Logo`, `Emblem`) so they take
any colour. The kufic mark sits huge and faint behind heroes (`.watermark`) and tiny in every label. This is
what made the site feel like Rawdah's and nobody else's.

**Imagery.** Rawdah's own trip photos first, ranked by Jibril in `public/images/<kind>/<kind>-NN.jpg` (01 = best;
`public/images/README.md` says what each shows and who is in it). Outside photos only in named slots
(`public/images/slots/`, `slot()` in `src/app/_site/slots.ts`): an empty slot shows "Photo to come", a dropped-in
file fills it with no code change. **Frames follow the photo:** `next.config.ts` reads every photo's shape at
build (`PHOTO_RATIOS`), `fitFrame(src)` returns `--r`/`--rl`, frames use `aspect-(--r)`. That one change fixed
every "people cut off at the sides" complaint on phones.

**Motion.** Two things only: the hero settles in (`.settle`, `backwards` fill so it stops being a layer) and
section photos rise on scroll (`.rise`, CSS `animation-timeline: view()`, off on phones and under reduced
motion). Photos zoom slightly on hover. No backdrop blur on cards; blur only on things floating over content.

## 2. Page structure

Home (`src/app/(site)/page.tsx`, sections in `src/app/_site/home-sections.tsx`): `Hero` (full-width group
photo, "Your Umrah and Hajj, guided every step of the way.") → `Starts` (cards; rows on phones) → `Trips`
(`TripRow` per trip) → `HajjBand` → `LastTrip` (facts, the team on that trip, masonry) → `WhyRawdah` →
`Meaning` → `Covers` + `StayTable` → `Paying` → `People` (team, then guest sheikhs) → `GroupsBand` →
`PrivateBand` → `Partners` (logos only) → `Questions` → `Closing`.

Trip pages (`src/app/(site)/trips/[slug]/page.tsx`): one template for every trip. Hajj gets `HajjOnNusuk` (how
Nusuk works, our steps, what registration needs); Umrah gets `TripJourney`, `TripIncludes`, `TripPackages` from a
`TripPlan`. A trip kept back renders `ComingSoonTrip` (`coming-soon.tsx`, `ramadanReveal = false` in
`content.ts`). Past trips get no page: they live on the home page as `#last-trip`.

All copy lives in `src/app/_site/content.ts`, each claim wrapped in `v(text, status)`. Prices live only in
`src/lib/trips.ts` and are read on the server.

## 3. Conversion flow

- **Every section ends in an action plus WhatsApp** (`Actions`: main button + `WaSquare` on phones).
- **Always-visible routes in:** the strip above the header, "Register interest" in the header, a floating bar on
  phones (WhatsApp + the page's main action), a round WhatsApp button on desktop.
- **Register interest:** `RegisterForm` → server action `submitEnquiry` (`src/app/actions/enquiry.ts`) → stored
  in a private Vercel Blob store (`keepSignup`, `signups-store.ts`), a Google Sheet row (`addToSheet`, optional,
  `docs/signups-sheet.md`), and Resend emails to Rawdah and the traveller (`email.ts`). If nothing is configured
  it hands back a pre-written WhatsApp message, so no sign-up is ever lost.
- **Umrah booking:** the join panel (`reserve.tsx`: room, travellers, live total, deposit, instalments) →
  `/trips/[slug]/book` → Stripe Checkout or bank transfer. Off until a trip is `open`; WhatsApp and bank
  transfer for now.
- **Hajj:** no payment here. We register people, guide the Nusuk application and tell them which package to
  choose from our provider; they pay on Nusuk. Say so plainly; it builds trust.
- **Honesty as conversion:** "Settled / Still being arranged" (`ConfirmedPending`), prices always with deposit
  and instalments (`PaymentPlan`), "coming soon" instead of invented details.

## 4. Components worth reusing

| Component | File | Why |
| --- | --- | --- |
| `Chapter` + `.night` tokens | `shell.tsx`, `globals.css` | Day/night rhythm with no component variants. |
| `Emblem`, `Logo`, `PartnerLogo` | `shell.tsx` | Any SVG/PNG logo as a mask in `currentColor`; partner logos match the theme. |
| `Pic` + `slot()` / `fitFrame()` | `shell.tsx`, `slots.ts` | Placeholder-until-supplied photos; frames shaped like the photo. |
| `PhotoStack`, `PageLead` | `shell.tsx` | Inner-page heads in one line. |
| `TripRow` | `trip-row.tsx` | Trip card with state, facts, price panel, actions; `cardPhoto` for a different card photo. |
| `TeamList` (+ "More about" `<details>`) | `trip-parts.tsx` | Portrait, role, short line, expandable bio. |
| `Actions`, `WaTile`, `WaSquare` | `shell.tsx` | The action-plus-WhatsApp pair everywhere. |
| `RegisterForm` + `submitEnquiry` | `register-form.tsx`, `actions/enquiry.ts` | Store, sheet, email, WhatsApp fallback. |
| `ReservePanel`, `PaymentPlan` | `reserve.tsx`, `home-sections.tsx` | Deposit maths people trust. |
| Site password | `src/proxy.ts`, `lib/server/site-gate.ts`, `app/gate/page.tsx` | Free "private for now" lock via `SITE_PASSWORD`. |
| `IS_LIVE` | `src/lib/site.ts` | Robots and sitemap open only on the real production domain. |

## 5. Tried and rejected

- **Rebuilding on The Umrah Company's site** (ADR 0001): looked like the same website. Share the conversion
  method only; never the look, layout, copy or photos.
- **Square kufic blocks** (0001 finish): "too blocky, not blended". Replaced by the soft cream system (ADR 0002).
- **All-cream and all-dark versions** (ADR 0002, 0003): Jibril wanted both, so day and night chapters (0004).
- **A light/dark switch for the top** (review tool): removed; the dark top was chosen.
- **Review marks and pills on the page** (`Mark`, `MarksFrame`): useful in review, removed before launch.
- **Backdrop blur on cards**: cards and photos went blank in Chrome. Blur only on floating UI.
- **Layered photo stacks and tall 4:5 frames for wide photos**: cropped people out on phones.
- **Swipe carousel for "Where would you like to start"**: on a phone only one card showed. Now stacked rows.
- **Our redrawn Ramadan poster** (Josefin Sans, Rawdah colours): the client wanted GGC's green poster as it is
  (`brand/ramadan-1448-poster.jpg`). `.font-poster` is left in `globals.css`, unused.
- **Copy rejected by the client:** "guided by people of knowledge", "with teachers beside you", the talbiyah,
  "the choice of package is always yours", "help you compare packages", Brother Ayuub as everyone's first
  contact (it's "the Rawdah Tours team"; Ayuub and Issa are co-founders), naming the ATOL provider.
- **Placeholder testimonials**: invented ones were never shipped; the section stays hidden until real ones exist.
- **A page per past trip**: past trips redirect to `/#last-trip`.
- **Stock photos of recognisable people, or from news agencies and Pinterest**: licence risk. Record the
  source of every outside photo in `public/images/slots/README.md`.

## 6. The workflow that made it fast

- **One content file, one price file.** Copy changes were one-line edits to `content.ts`; nothing priced on the
  client.
- **Status on every claim** (`v(text, status)`): we could ship with unknowns visible in review and hidden at
  launch, and never invent people, dates or prices.
- **A branch per change and a compare link per change.** Jibril merged from his phone; main deploys to
  production on Vercel. `npm run build` before every push.
- **Phone-first checks with scripts** (scratchpad `shots/`): `strip.mjs` screenshots a whole page as a row of
  390px screens; `crops.mjs` reports, for every photo, how much of it a frame shows (flag anything under 75%);
  `audit.mjs` catches anything wider than the screen. Clear `.next/cache/images` after swapping a photo, or
  local screenshots show the old one.
- **Photos ranked by the client in an artifact**, then renamed by rank, with a README per folder. Drop-in slots
  for outside photos meant no code change per photo.
- **Seeing the live site through the built-in browser** on Jibril's Mac when the container couldn't reach it
  (robots.txt, the Blob store, the client's reference sites).
- **Secrets never in chat:** Jibril adds env vars in Vercel; features switch on when a variable exists
  (`RESEND_API_KEY`, `SIGNUPS_SHEET_URL`, `SITE_PASSWORD`, `ADMIN_PASSWORD`).
- **Ask once, then decide.** Questions only where the client's answer changes the build; otherwise make the
  call and flag it, especially anything that could look bad or expose the business (provider names, licences).
