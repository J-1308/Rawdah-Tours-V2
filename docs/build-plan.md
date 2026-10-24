# V2 build status

Updated 24 Oct 2026. Branch `feat/v2-site`. The site builds and lints cleanly.

## Decisions

- **Scope:** one site for Hajj 2027 (register interest only; packages booked and paid on Nusuk) and Umrah
  (bookable with a deposit per trip once dates and prices are confirmed; register interest until then).
- **Onboarding app** (another developer's): unrelated to this build. It may be featured later as an extra;
  don't build anything for it now (`NEXT_PUBLIC_ONBOARDING_APP_URL` is an unused placeholder).
- **Photos:** Rawdah's own V1 photos for anything showing people. Generic Madinah/Makkah scenes from Wikimedia
  (via the Umrah Company repo's placeholder set) only as tagged stand-ins for places. The Umrah Company's own trip
  and teacher photos are not used: they're another client's travellers.

## Built

| Area | Where |
| --- | --- |
| Homepage | `src/app/page.tsx` |
| Hajj 2027 | `src/app/hajj/page.tsx` |
| Umrah, with open trips / preview demo | `src/app/umrah/page.tsx` |
| Booking form and checkout | `src/app/umrah/book/[slug]/`, `src/app/actions/booking.ts` |
| Stripe webhook | `src/app/api/stripe/webhook/route.ts` |
| Booking results | `src/app/booking/{confirmed,bank-transfer,cancelled}` |
| Register interest | `src/app/register/page.tsx`, `src/components/enquiry-form.tsx`, `src/app/actions/enquiry.ts` |
| About, Contact | `src/app/about`, `src/app/contact` |
| Terms, Privacy, Cookies | adapted from V1, Hajj/Nusuk section added |
| Admin bookings list | `src/app/admin` behind basic auth in `src/proxy.ts` |
| Database | `supabase/migrations/20261024000000_v2_schema.sql` |
| SEO | metadata per page, `sitemap.ts`, `robots.ts`, OG image, JSON-LD on the homepage |

## Still to do

- **Photos:** every slot is listed in `src/lib/photos.ts`. Stand-ins show a "Placeholder photo" tag; missing ones
  show "Photo to come". Needed: Ustadh Abu Abdulaziz Ahmed's portrait, a Hajj preparation session, and Rawdah's own
  Madinah, Makkah and green-dome shots to replace the stand-ins.
- **Client review:** copy, the terms and privacy changes, and whether V1's testimonials are real (none are used yet).
- **Connect services** (Supabase, Stripe, Resend, bank details, admin password): see README "Going live".
- **Vercel:** project for previews, then point the domain.
- Make the GitHub repo private before real booking data flows.
