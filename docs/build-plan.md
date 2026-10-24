# V2 build plan (work in progress)

Started 24 Oct 2026 on branch `feat/v2-site`. **The branch does not build yet**: there is no `layout.tsx` or any page.
Pick up from "Still to build" below.

## Decisions taken

- **Scope:** one site for Hajj 2027 (register interest only; packages booked and paid on Nusuk) and Umrah
  (bookable with a deposit per trip once dates and prices are confirmed; register interest until then).
- **Onboarding app** (another developer's): unrelated to this build. It may be featured on the site later as an extra;
  don't build anything for it now (the `NEXT_PUBLIC_ONBOARDING_APP_URL` placeholder can stay unused).
- **Stack:** Next.js 16.4 (async `params`, `proxy.ts` not middleware, ESLint CLI, `images.qualities`), Tailwind v4,
  Supabase (server-side service role only), Stripe Checkout, Resend.
- **Fonts are self-hosted** (`public/fonts`, `src/app/fonts.css`) because build machines may not reach Google Fonts.
  Import `fonts.css` in the root layout and preload the two latin files.

## Design (supersedes the palette and type in design-system.md)

- **Palette** (tokens in `src/app/globals.css`): ihram `#FBF9F5` ground, sand `#EADCC4`, ajwa `#2E2020` text and dark
  chapters, palm `#2D4A3A` (WhatsApp, "confirmed", links), brass `#A6844F` hairlines only, dust `#6B5E57` secondary
  text, henna `#9B5940` "not confirmed" markers. All text pairs pass AA.
- **Type:** EB Garamond for the spiritual voice and headings, Source Sans 3 for logistics and forms, Amiri for Arabic.
  "Spirit in serif, logistics in sans."
- **Status system:** filled palm dot = confirmed, henna ring = not confirmed yet (`StatusList` in `src/components/ui.tsx`).
- **One bold moment:** a dark "From Madinah to Makkah" chapter with large Arabic place names and a path line that
  draws on scroll (CSS already in globals.css). Everything else stays quiet.
- Avoid: uppercase tracked labels, rows of identical cards, invented quotes or testimonials.

## Homepage outline

1. Hero: photo `journeys/group-ihram-palms.jpg`; H1 "Umrah and Hajj, with people who know the way."; Register interest +
   WhatsApp; status rows (Hajj 2027 registering interest; Umrah next dates being finalised).
2. Two journeys: Hajj 2027 panel (`group-haram-evening.jpg`) and Umrah panel (`group-madinah-mosque.jpg`).
3. Meaning of Rawdah (روضة, the garden between the Prophet's ﷺ house and minbar, reported by al-Bukhari and Muslim) +
   three pillars: worship first, learning throughout, good company.
4. Dark journey chapter: Madinah (5 nights) → road and miqat → Makkah (5 nights), framed as how the August 2026 trip ran.
5. People (`src/lib/people.ts`; Abu Abdulaziz Ahmed has no photo yet → initials tile).
6. Gallery from previous journeys + Instagram @rawdahtours.
7. "Where things stand" (confirmed vs not), dated.
8. Register interest form (sand band). Footer with company details and Nusuk note.

## Still to build

- Root layout, header (mobile menu), footer, mobile bottom action bar.
- Pages: `/`, `/hajj`, `/umrah`, `/umrah/book/[slug]`, `/register`, `/about`, `/contact`, `/privacy`, `/terms`, `/cookies`,
  booking result pages, 404, sitemap, robots, OG image.
- Server actions: enquiry (Supabase `enquiries` + Resend), checkout (fixes listed in `docs/booking.md`), Stripe webhook
  (`checkout.session.completed` and `.expired`; insert payment row first as the idempotency guard).
- Supabase migration, `/admin` bookings list behind basic auth in `proxy.ts`.
- Legal pages: port V1 terms and privacy text (V1 repo), add a Hajj/Nusuk section.
- Verify: `npm run build`, phone-width screenshots, then PR and Vercel preview.

## Content sources

Facts only from: V1 repo (pricing, terms, FAQ), the trip poster in V1 (`public/images/gallery/pathtopurity.jpeg`),
and the live Hajj page (summarised in `docs/content-inventory.md`). Company: Rawdah Tours Ltd, 5 Sir Denis Drive,
Birmingham B9 5DU; ATOL 5311 via Polani Travel Ltd per the April 2026 terms.
