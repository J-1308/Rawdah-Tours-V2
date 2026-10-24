# Rawdah Tours V2 — Booking architecture

§0 is what V2 does now. §1–3 are the V1 extraction it was built from (24 Oct 2026).

## 0. V2 as built

**One price list:** `src/lib/trips.ts` (pence). The page content (`src/app/_site/content.ts`) reads room prices
from it, and the checkout reads it on the server. A trip is bookable only when its status is `open`.

**Routes**

| Route | What it does |
| --- | --- |
| `/trips/[slug]` | Trip page with the join panel (`reserve.tsx`): rooms, travellers, live total, deposit, instalments. "Pay the deposit" appears only when the trip is bookable. |
| `/trips/[slug]/book` | Booking form (`booking-form.tsx`) → server action `createBooking` (`src/app/actions/booking.ts`). 404 unless bookable. |
| `/booking/confirmed` | Stripe success return. |
| `/booking/cancelled` | Stripe cancel return, with a retry link to `/trips/[slug]/book`. |
| `/booking/bank-transfer` | Bank details (from env vars) and the reference, for bank-transfer bookings. |
| `/api/stripe/webhook` | `checkout.session.completed` marks the deposit paid (idempotent via `payments.stripe_event_id`); `checkout.session.expired` releases the booking so the person can try again. |
| `/admin` | Bookings and enquiries list, behind basic auth (`src/proxy.ts`). 404 if `ADMIN_PASSWORD` is unset. |

**Register interest:** `RegisterForm` → `submitEnquiry` (`src/app/actions/enquiry.ts`) → `enquiries` table and
emails. If Supabase or Resend is not configured, the form hands the person a pre-written WhatsApp message instead.

**Card checkout:** Stripe Checkout, deposit plus card fee, session expires after 30 minutes.

**Preview flag:** `BOOKING_DEMO=true` on a preview deployment shows Path of Purity II as a bookable demo so the
flow can be tried. Never set in production.

**Schema:** `supabase/migrations/20261024000000_v2_schema.sql`: `bookings`, `payments`, `enquiries`, RLS on with no
policies (service role only).

**Env vars (names only):** `NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_OWNER_TO`,
`BANK_ACCOUNT_NAME`, `BANK_SORT_CODE`, `BANK_ACCOUNT_NUMBER`, `ADMIN_USER`, `ADMIN_PASSWORD`, `BOOKING_DEMO`,
`NEXT_PUBLIC_ONBOARDING_APP_URL`. See `.env.example`. Jibril sets the values in Vercel; never in the repo or chat.

**Hajj:** no booking or payment on this site. Packages are booked and paid on Nusuk.

---

Extracted 24 Oct 2026 from V1 (`J-1308/Rawdahtoursw-website`): `app/api/checkout`, `app/api/webhooks/stripe`,
`app/api/family-enquiry`, `lib/pricing.ts`, `lib/email.ts`, `supabase/migrations/001–003`.

## 1. What V1 does

**Stack:** Next.js API routes + Supabase (service-role writes) + Stripe Checkout + Resend email.

**Flow (`POST /api/checkout`):**
1. Validate form: name, email, phone, gender, citizenship, age (18–100), room type, emergency contact, three consent boxes, payment method.
2. Price is computed **server-side** from `lib/pricing.ts`. Never from the client. ✅ keep
3. Reject if the email already has a `pending` or `deposit_paid` booking.
4. Insert `bookings` row (`pending/pending`).
5. **Bank transfer:** send customer + owner emails, return. Payment is confirmed manually.
6. **Card:** Stripe Checkout session for £500 deposit + £8 card fee; store `stripe_session_id`.

**Webhook (`checkout.session.completed`):** marks booking `deposit_paid/confirmed`; inserts into `payments`,
whose unique `stripe_event_id` is the idempotency guard ✅ keep; sends confirmation emails.

**Family bookings:** separate enquiry form (`/family-booking`) → `family_enquiries` table + emails. No payment.

**Data:** `bookings` (pence integers, RLS on, `medical_info` service-role only) and `payments` (append-only Stripe log).

**Pricing (Path of Purity II, Aug 2026):** quad £1,799 · triple £1,835 · double £2,025 · deposit £500 · card fee £8 ·
balance in instalments to 40 days before departure.

## 2. Problems to fix in V2, not copy

1. **Abandoned card checkouts lock people out.** A row is created `pending` before payment; if the customer
   abandons Stripe, nothing ever clears it (no `checkout.session.expired` handler), and step 3 then blocks them
   from trying again. Fix: handle `checkout.session.expired`, or only block on `deposit_paid`.
2. **One booking per email.** A couple sharing an email cannot both book. Decide if that's intended.
3. **Single trip hard-coded.** Trip name, dates and prices live in code (`'Path of Purity II'` appears in the
   checkout route). V2 needs a `trips` table (or config) with per-trip prices, dates, capacity and status so a
   new trip doesn't need a code change.
4. **No capacity limit.** Nothing stops overbooking a trip.
5. **Bank-transfer confirmation is manual** with no admin view. At minimum, a protected page listing bookings.
6. **Stale comment:** migration 001 lists different prices from `lib/pricing.ts`. Prices should exist in one place.
7. **Age floor 18** blocks under-18s on family trips. That's why family bookings went to a separate enquiry
   form. Reconsider whether V2 needs real multi-traveller bookings.

## 3. Environment variables (names only)

`NEXT_PUBLIC_SITE_URL`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`,
`RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_OWNER_TO`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`. Values live in Vercel and the cloud environment, never in the repo.

Bank account details for transfers live in V1 `lib/constants.ts`. **Move them to env vars in V2**, and don't
commit them while this repo is public.
