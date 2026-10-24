# Rawdah Tours V2

Website for Rawdah Tours: Hajj 2027 (register interest; packages are booked on Nusuk) and guided Umrah trips
(bookable with a deposit when a trip opens).

Next.js 16 · TypeScript · Tailwind v4 · Supabase · Stripe Checkout · Resend · Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # must pass before pushing
npm run lint
```

Every integration is optional. With no environment variables the whole site works; the forms point people to
WhatsApp instead of saving. See `.env.example` for the full list.

## Common changes

| Change | Where |
| --- | --- |
| Swap a photo | Put the file in `public/images/`, then update its slot in `src/lib/photos.ts` |
| Open bookings for a new Umrah | Add a trip with `status: 'open'` and real prices in `src/lib/trips.ts` |
| Contact details, Instagram, company facts | `src/lib/site.ts` |
| People and roles | `src/lib/people.ts` |
| FAQs | `src/lib/faqs.ts` |
| "Where things stand" facts | the page files (`src/app/page.tsx`, `src/app/hajj/page.tsx`) and `STATUS_CHECKED` in `site.ts` |

## Going live checklist

1. **Supabase:** create a new project, run `supabase/migrations/20261024000000_v2_schema.sql` in the SQL editor,
   then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
2. **Resend:** verify the rawdahtours.co.uk domain, set `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_OWNER_TO`.
3. **Stripe:** set `STRIPE_SECRET_KEY`. Add a webhook endpoint `https://www.rawdahtours.co.uk/api/stripe/webhook`
   for `checkout.session.completed` and `checkout.session.expired`, then set `STRIPE_WEBHOOK_SECRET`.
4. **Bank transfer:** set `BANK_ACCOUNT_NAME`, `BANK_SORT_CODE`, `BANK_ACCOUNT_NUMBER`.
5. **Admin:** set `ADMIN_PASSWORD` (and optionally `ADMIN_USER`) to use `/admin`.
6. **Photos:** replace every slot marked `stand-in` or `missing` in `src/lib/photos.ts`, then delete
   `public/images/placeholder/`.
7. **Review:** the terms and privacy policy were adapted from V1 and need Rawdah's sign-off.
8. Point the domain at the Vercel project.

## Preview deployments

Set `BOOKING_DEMO=true` for the Preview environment in Vercel to show the August 2026 trip as a bookable demo.
It never appears in production, and previews are never indexed by search engines.

## Docs

- `CLAUDE.md` — rules for working in this repo
- `docs/build-plan.md` — what's built, what's left
- `docs/design-system.md` — palette, type and layout rules
- `docs/booking.md` — booking and payment architecture
- `docs/content-inventory.md` — where every fact on the site comes from
