# Rawdah Tours V2 — Content inventory

Every word and number on the site lives in `src/app/_site/content.ts`, with a status and a source beside it.
This file says where the facts came from and what is still missing. Last updated 24 October 2026.

## Sources

| Code | Source |
| --- | --- |
| V1 | `J-1308/Rawdahtoursw-website`: homepage, FAQ, about, terms (April 2026), `lib/pricing.ts` |
| LIVE | rawdahtours.co.uk, the Hajj 2027 register-interest page (read 24 Oct 2026; built by another developer, footer "36Builds", source repo unknown) |
| POSTER | Path of Purity II poster and hotel posters (V1 `public/images`) |
| PHOTOS | Rawdah's own trip photographs, supplied by Jibril on 24 Oct 2026 |

## Status marks on the page

`confirmed` and `evidenced` and `draft` show no mark. `proposed` shows **Suggested**, `to confirm` shows
**To confirm**, `sample` shows **Sample**. Nothing marked may reach the live domain.

## Contact and company

- WhatsApp / phone: +44 7809 281429 · email rawdahtours@gmail.com · Instagram @rawdahtours
- Registered office: 5 Sir Denis Drive, Birmingham, England, B9 5DU (V1 terms)
- Company number: **missing**
- ATOL: 5311 via Polani Travel Ltd for the 2026 trips (V1 terms). **Future trips to confirm.**

## People

| Name | Role | Source | Photo |
| --- | --- | --- | --- |
| Brother Ayuub Mohamed Musa | Group leader | V1, LIVE | `portraits/ayuub-mohamed-musa.jpg` (V1) |
| Ustadh Abu Abdulaziz Ahmed | Hajj guide, Hajj 2027; King Saud University graduate, student of Shaykh Dr. Sa‘d al-Shithri | LIVE | `portraits/abu-abdulaziz-ahmed.jpg` (LIVE) |
| Ustadh Issa Uthman | Guide and teacher, Path of Purity II | V1, POSTER | `portraits/issa-uthman.jpg` (V1) |
| Ustadh Abdulrahman Hassan | Guide and teacher, Path of Purity II | V1, POSTER | `portraits/abdulrahman-hassan.jpg` (V1) |

The bios for Issa and Abdulrahman are our wording of their role (draft). The person in the Rawdah vest photos
is **not** identified on the site.

## Trips

- **Hajj 2027** (LIVE): registration of interest; dates, packages and prices published on Nusuk; Rawdah takes
  no Hajj payments. Itinerary is the days of Hajj in outline (draft).
  The page follows the structure of the Nusuk page Rawdah sent as a reference (Dar al Islam's Dar Haj site,
  read 25 Oct 2026): how booking works on Nusuk, an estimated timeline, register with us then Nusuk, what
  registration needs, our group, guidance, the days of Hajj, updates, a Labbayk close. **Only the structure and
  general Nusuk facts are used.** Their wording, scholars, package dates, prices, provider and partner are theirs
  and appear nowhere. Timeline estimates: Nusuk registration opened 7 Oct 2025 and booking 1 Feb 2026 last
  cycle (Wego, updated 1 Jul 2026); Hajj 1448 expected around 15–19 May 2027 (same source). Rawdah's own part
  (helping compare options on Nusuk, registering reserves nothing and creates no payment, dates and hotels still
  being confirmed, updates on the channels people choose) follows the LIVE page, re-read 31 Oct 2026.
- **Ramadan Umrah 2027** (`/trips/ramadan-umrah-2027`, the next flagship trip): from Rawdah's "GGC × Rawdah Tours
  Umrah 2027" itinerary and pricing PDF (sent by Jibril, 31 Oct 2026). Used: dates, route, Saudia flight times and
  baggage, the two 4★ hotels and check-in dates, Eid note, the three packages, the payment timetable and group size.
  Prices and the timetable live in `src/lib/trips.ts`. **Left out on purpose:** the PDF's internal notes (pre-trip
  seminar, its speaker and date, Eid presents, videography), marked "not for publication" and "internal".
- **Path of Purity II: Summer Edition** (V1, POSTER): 4–15 Aug 2026; 5 nights Peninsula Worth (Madinah), 5 nights
  Address Jabal Omar (Makkah), breakfast; Qatar Airways from Heathrow; quad £1,799, triple £1,835, double £2,025
  per person; land only from £1,040 (V1 terms; the poster's £1,099 is superseded); £500 deposit; balance cleared
  40 days before departure. Prices live once, in `src/lib/trips.ts`.

- **Where you'll stay** (Umrah trip pages, `journeyStay`): the two hotels from the last trip with walking times,
  flights and the coach (EVIDENCED); the Haramain train is Suggested (not used on the last trip); ziyarah with
  Rawdah's own Quba and Uhud photos. Layout idea from The Sunnah Experience's hotel galleries; nothing copied.

## Copy

Headings use V1's own words where it had them: "Why choose Rawdah", "The people who will walk with you", "Our
last trip", "Accommodation & travel", "Common questions". FAQs use V1's questions verbatim plus the LIVE Hajj
questions. The hero line ("Walk the path with people who know it.") is ours (draft), after V1's "show you the
path" and the Path of Purity trips. **No copy is taken from The Umrah Company site.**

## Photos (`public/images/`, see its README)

One folder per kind of shot (`group-photos/`, `friends/`, `candid/`, `teaching/`, `team/`, `vest-back/`,
`bird-park/`, `places/`, `portraits/`), numbered by rank: 01 is the best. The README says what each file shows and what it was called before (31 October 2026).

**Photo slots** (`public/images/slots/`, see its README): named "Photo to come" frames for photos from outside
Rawdah's trips (Hajj at Arafah and Mina, families at the Haram, a UK masjid talk). Drop in a file with the slot's
name and it replaces the frame. Stock photos never stand in for Rawdah's travellers.

**Hotel and train photographs:** frames marked "Photo to come" wait for official photographs from Rawdah or
the hotels' media kits (Address Jabal Omar, and Peninsula Worth or Hilton in Madinah). Never copy them from
another operator's site (e.g. The Sunnah Experience): they belong to the hotels or that operator.

Photos of under-18s: parents' permission confirmed by Jibril (31 Oct 2026); marked "under 18" in the README.

## Still missing

See `docs/project/open-questions.md`.

## Legal text

`/terms` is Rawdah's own Cancellation Policy and Terms and Conditions (October 2026), word for word, sent by Jibril on
31 Oct 2026; "About us", ATOL and Hajj sections are ours. Their privacy section's points on children and outside links
are added to `/privacy`, which otherwise describes how this website handles data.

## Who we work with

Home page section (`partners` in `content.ts`), asked for by Jibril on 31 Oct 2026: GGC (Global Guidance Center,
ggcenter.org; logo from GGC's own artwork as on the Ramadan itinerary), Saudia and Qatar Airways, the Ramadan and
August 2026 hotels, the Haramain railway (sar.com.sa) and Nusuk Hajj. Links go to each one's own site. Logos (31 Oct 2026, downloaded by
Jibril from Wikipedia and the brands' sites) are one-colour cut-outs in `public/images/brand/partners/`. Brands
usually expect permission for logo use; Jibril chose to show them.
