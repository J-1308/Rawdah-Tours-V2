# Tracking setup

How Rawdah sees what the website brings in. Cookieless throughout: no consent banner is needed. No Meta Pixel or
Google Ads tags (those would need one).

## Your checklist

1. **Turn on Web Analytics.** Vercel → `rawdah-tours-v2` → **Analytics** → Enable (if it isn't already). Custom
   events need the Pro plan, which this account has.
2. **Check events arrive.** After the next deploy, open the live site on your phone, tap a WhatsApp button and send a
   TEST sign-up. In Vercel → Analytics → **Events** you should see `whatsapp_click` and `interest_registered` within
   a few minutes.
3. **Get an alert for every sign-up** (pick one, today):
   - **Google Sheet (10 minutes, no domain setup):** follow `docs/signups-sheet.md`. Its script adds bookings and
     sign-ups to the "Rawdah Tours bookings" sheet (it sends no email; Resend does that). Then add
     `SIGNUPS_SHEET_URL` and `SIGNUPS_SHEET_SECRET` in Vercel.
   - **Resend (15 minutes, branded emails):** add `RESEND_API_KEY` in Vercel after verifying rawdahtours.co.uk in
     Resend. Also sends the traveller a confirmation.
4. **Use the tagged links below on Instagram** so every lead shows where it came from.
5. **Before the relaunch:** add `RESEND_API_KEY` (or the sheet) and send a test lead, add `PRIVATE_PASSWORD` (keeps
   the Ramadan preview and `/questionnaire` private), then delete `SITE_PASSWORD` and redeploy.

## Instagram links (UTM-tagged)

| Where | Link |
| --- | --- |
| Bio | `https://www.rawdahtours.co.uk/?utm_source=instagram&utm_medium=bio&utm_campaign=profile` |
| Stories: Hajj 2027 | `https://www.rawdahtours.co.uk/trips/hajj-2027?utm_source=instagram&utm_medium=story&utm_campaign=hajj-2027` |
| Stories: Ramadan 1448 | `https://www.rawdahtours.co.uk/trips/ramadan-umrah-2027?utm_source=instagram&utm_medium=story&utm_campaign=ramadan-1448` |
| Posts / captions | `https://www.rawdahtours.co.uk/?utm_source=instagram&utm_medium=post&utm_campaign=<post-name>` |
| WhatsApp broadcasts | `https://www.rawdahtours.co.uk/?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=<message-name>` |

Keep the words lower-case with hyphens; the same campaign name across stories and posts lets you compare them.

## What's recorded

**Events** (`src/app/_site/tracking.tsx` in the browser, `src/lib/server/track.ts` on the server):

| Event | When | Properties | Status |
| --- | --- | --- | --- |
| `whatsapp_click` | Any WhatsApp link tapped | page, placement, trip | Live |
| `phone_click` | Any phone link tapped | page, placement | Live (no phone links on the site yet) |
| `email_click` | Any email link tapped | page, placement | Live |
| `interest_registered` | The register-interest form sends | trip | Live |
| `booking_started` | The booking form opens | trip | Live (no trip open yet) |
| `deposit_paid` | Stripe confirms a deposit, or a bank-transfer booking is made | trip, method | Live (no trip open yet) |
| `form_step`, `lead_started`, `enquiry_sent` | The new step-by-step forms | form, step, trip | With the forms |
| `itinerary_requested`, `call_booked` | Itinerary request, call booked | trip | With the forms |
| `wishlist_add`, `chat_opened`, `chat_to_whatsapp` | — | — | Not built (cut or proposal only) |

Placement is one of: header, footer, phone bar, floating button, form, trip, page.

**Where each lead came from:** the first page of the visit, the referring site, and `utm_source`, `utm_medium`,
`utm_campaign`. Held in the browser for that visit only (sessionStorage) and saved with every sign-up: in the
private sign-up store, the Sheet and the alert email.

**WhatsApp:** every pre-written message ends "(from the website)", and on a trip page "(from the website: Hajj
2027)", so Rawdah can count chats from the site by searching WhatsApp for "from the website".
