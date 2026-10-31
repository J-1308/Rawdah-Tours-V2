# Open questions

Things only Rawdah (or Jibril) can answer. Each one is marked on the page where it shows. Updated 25 October 2026.

## Before launch (blocking)

1. **Company number** for Rawdah Tours Ltd (footer, about page).
2. **Testimonials.** The three quotes from V1 ("Brother Abdullah / Yusuf / Hamza"): are they real travellers, and
   do we have permission to use them? If not, remove them until real ones are collected.
3. **ATOL / financial protection** for trips after 2026. V1 terms name ATOL 5311 via Polani Travel Ltd for the
   2026 trips only.
4. **Next group Umrah:** name, dates, hotels, flights, prices, deposit, number of instalments, teachers. Until
   then the page shows Path of Purity II as a guide, marked Suggested.
5. **Hajj 2027 "open to":** brothers, sisters and families? (marked To confirm)
5a. **Hajj 2027 group:** settled from the live Hajj page (31 Oct 2026): no provider is named, dates and hotels
    are "still being confirmed", Rawdah helps compare the options on Nusuk, registering reserves nothing, and
    updates go out on the channels people choose (no WhatsApp group). Still open: who Hajj 2027 is open to.
5b. **Hotels for the next Umrah:** Address Jabal Omar in Makkah; Peninsula Worth or Hilton in Madinah? And the
    hotels' official photographs (media kits) for the "Where you'll stay" galleries. Will future trips use the
    Haramain train?

## Offers we've suggested (Rawdah to accept, change or remove)

6. **Private & family Umrah:** offered (Jibril, 31 Oct 2026). Still our guess: the planner's rough-cost model
   (`privatePricing` in `content.ts`), "any week", the hotel choices, and guiding on arrival.
7. **Groups & organisations:** offered (Jibril, 31 Oct 2026). Can each traveller pay Rawdah directly with
   instalments? Minimum group size?
8. **Instalments:** how many after the deposit? (we show 3)
9. **Children's price** in the join panel (we show 85% of the adult price).

## Content and permissions

10. **Photos of younger travellers:** settled. Jibril confirmed parents' permission for every photo of children (31 Oct 2026).
11. **Photos of sisters and families:** one so far (`candid/candid-02.jpg`, the sisters are happy to be on the site); more would help.
12. **Teacher bios** for Ustadh Issa Uthman and Ustadh Abdulrahman Hassan: Rawdah to supply or approve.
13. **The V1 quote:** settled. It sits on Ustadh Abdulrahman Hassan's guide card on V1, so the site credits him.
14. **Hotel photographs:** the site uses group photos, never hotel marketing images.

## Practical

15. **Merge into `main`:** the Vercel project builds production from `main`, which has no site yet. Merging
    the V2 pull request makes the `.vercel.app` production address show V2 (rawdahtours.co.uk is unaffected).
16. **Env vars** (Supabase, Stripe, Resend, bank details, admin): Jibril adds them in Vercel himself.
17. **Domain switch:** rawdahtours.co.uk currently serves the Hajj 2027 page by another developer. Decide when V2
    replaces it; the redirects in `next.config.ts` cover the old V1 and live URLs.
18. **Onboarding app:** may be linked later as an extra (`NEXT_PUBLIC_ONBOARDING_APP_URL`); nothing is built for it.
