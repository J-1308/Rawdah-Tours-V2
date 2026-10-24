# Rawdah Tours V2 — Booking Architecture

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

## 3. Environment variables

V2's list is in `.env.example` (names only; values live in Vercel and the cloud environment, never in the repo).
Bank transfer details are env vars (`BANK_*`), not code.

## 4. V2 implementation (24 Oct 2026)

- **Trips** live in `src/lib/trips.ts`: one source for prices, deposit, card fee and status. A trip is bookable when
  its status is `open`. Prices are only read on the server.
- **Checkout** (`src/app/actions/booking.ts`): validates, checks capacity (if set) and duplicates, inserts a
  `pending` booking, then either redirects to Stripe Checkout (session expires after 30 minutes) or emails bank
  transfer instructions.
- **Fixes from §2:** abandoned checkouts are released by `checkout.session.expired`; duplicates are only blocked for
  the same trip, email *and* name with a paid deposit or a pending bank transfer (so a couple can share an email);
  trips are data, not code; optional `capacity`; `/admin` lists bookings and has "Mark transfer received", which
  confirms the booking and emails the traveller.
- **Webhook** (`/api/stripe/webhook`): inserts the `payments` row first (unique `external_id`) as the idempotency
  guard, then confirms the booking and sends emails exactly once.
- **Under-18s and families** still go through register interest with a traveller count; online booking is 18+.
- **Without env vars** the forms explain that booking isn't connected and offer WhatsApp.
