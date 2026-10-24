# Rawdah Tours V2 — Design system

Status: **in use** (24 October 2026). Why it looks like this: `docs/adr/0001-rawdah-visual-language.md`.
Tokens live in `src/app/globals.css`; the kit lives in `src/app/_site/shell.tsx`.

The one-line brief: **Rawdah's own colours and fonts, shaped by the square-kufic grid of its cream logo.**
Nothing may look or read like The Umrah Company site (a different client of ours selling similar trips).

## 1. Colour

All sampled from Rawdah's V1 site and the live Hajj page.

| Token | Hex | Use |
| --- | --- | --- |
| `canvas` (ivory) | `#F6F0E6` | The page. |
| `canvas-warm` (sand) | `#EDE4D6` | Panels and tiles on ivory; full-width "pause" bands (Meaning, Masjids & groups, register forms). |
| `ink` (date brown) | `#34251F` | Header, footer, hero, the last trip, the people. Body text on light grounds. |
| `ink-deep` | `#241914` | Behind photos while they load; pressed states. |
| `clay` | `#4E3A33` | Reviews band; tiles on date brown. |
| `muted` | `#6E5447` | Rarely; prefer `ink` at 60–75% opacity. |
| `gold` | `#B08D57` | Squares, rules, stars. Not for text on ivory. |
| `bronze` | `#82602F` | Gold-coloured text on ivory (labels, step names). 5:1 on ivory. |
| `gold-soft` (sand-gold) | `#D7BD8A` | The action colour on dark grounds; the ground of the Hajj band and the closing call. |
| `cream` | `#E2CBA1` | The logo's colour; taglines on date brown. |
| `wa` | `#1FA855` | WhatsApp only. |

Grounds on the homepage, in order: date brown (hero) → ivory (start tiles, trips) → sand-gold (Hajj 2027) →
date brown (last trip) → ivory (why) → sand (meaning) → ivory (covers, paying) → date brown (people) →
sand (groups) → ivory (private) → clay (reviews) → ivory (questions) → sand-gold (closing) → date brown (footer).

## 2. Type

| Role | Face | Setting |
| --- | --- | --- |
| Headlines | Cormorant Garamond 600 | `.display`: upright, one colour, line-height 1.02, slight negative tracking, `text-wrap: balance`. **Never** an italic second line. |
| Quotes, taglines, long intros | Cormorant Garamond 500 | `.font-editorial` |
| Everything else | DM Sans 400/500 | Body 0.93–1.05rem, line-height 1.6–1.7. |
| Arabic | Amiri | `.ar`: the talbiyah in the Hajj band, روضة in the Meaning band. |

Labels are **sentence case** with a 7px gold square, never tracked capitals, and only where they tell the reader
something (`<Label>`). Most sections have a heading and no label.

## 3. Shape

From the logo's grid: squared corners (`rounded-[3px]`, 2px for small tags), square markers, square tiles.
No pills, no arches, no soft drop shadows. Where something needs lifting it gets a hard offset in sand-gold
(`shadow-[6px_6px_0_var(--color-gold-soft)]`), like a tile set slightly out of the grid.

## 4. Components (`src/app/_site/`)

| Component | What it is |
| --- | --- |
| `Heading` | The `.display` headline. |
| `Label` | Small sentence-case label with the gold square. |
| `Square` | The gold square marker. |
| `TileLink` | The main button: a label and a square chevron cell. Tones: `ink`, `gold`, `line-ink`, `line-canvas`. Full width on phones. |
| `WaTile` | WhatsApp as a tile: the glyph in its own square cell, then the label. |
| `Actions` | A section's pair: `TileLink` + `WaTile`, toned for the ground. |
| `Framed` | A photo with an offset square behind it (sand-gold or date brown). Used for single photos. |
| `LeadMosaic` / `PageLead` | Inner-page head: words on date brown beside a three-tile photo mosaic; phones show the mosaic first. |
| `TripRow` (`trip-row.tsx`) | A trip: square photo, state tag, facts, price block with action and WhatsApp. |
| `StateTag` | Booking open / Register interest / Completed. |
| `ReservePanel` (`reserve.tsx`) | The join panel on a trip page: rooms, travellers, live total, deposit and instalments. |
| `PaymentPlan` | The worked deposit-and-instalments example with a proportional bar. |
| `TeacherList` | Square portraits in rows. |
| `FaqList` | Accordions with a square +/− box. |
| `ConfirmedPending` | "Settled" and "Still being arranged". |
| `Builder` (`builder.tsx`) | The private Umrah planner: a sheet of rows, plan and rough cost on date brown. |
| `Mark` / `MarksFrame` | Review marks (dashed bronze tags) and the switch. Remove before launch. |

The homepage sections are in `home-sections.tsx`: `Hero` (with the five-tile mosaic and the logo-mark tile),
`Starts`, `Trips`, `HajjBand`, `LastTrip`, `WhyRawdah`, `Meaning`, `Covers` (+ `StayTable`), `Paying`, `People`,
`GroupsBand`, `PrivateBand`, `Reviews`, `Questions`, `Closing`.

## 5. Conversion system (shared idea, Rawdah's own form)

- An action in every chapter: the main one (`TileLink`) and WhatsApp (`WaTile`).
- The sand-gold strip above the header and the "Register interest" button in it: Hajj 2027 is one tap away.
- Phones: a date-brown bar pinned to the bottom with WhatsApp and the page's main action (changes by page).
- Desktop: a square WhatsApp tile fixed bottom right.
- Prices always with the deposit and instalments beside them, and the worked example on the homepage.
- Honest lists of what's settled and what isn't.

## 6. Motion

One moment only: the hero mosaic settles in on load (`.tile-in`, staggered, off under reduced motion).
Hovers change colour; nothing else animates.

## 7. Photography

Only Rawdah's own trip photos (`public/images/trips/`) and portraits (`public/images/people/`). Captions are
true to the photo. No hotel marketing photos, no stock, and nothing from The Umrah Company. Mosaic tiles crop
hard, so set `position` (object-position) per photo in `content.ts`.

## 8. Never (the Umrah Company's signatures)

Arched portraits · pill buttons with trailing arrows · an italic second line in headlines · tracked-capital
kickers over every heading · full-bleed photo leads with the headline over the picture · a tabbed finder card ·
a scrolling proof strip · an accordion beside a photo · a stage stepper for "included" · five numbered columns
for booking · three review cards with stars · Instrument Serif or Outfit · near-black `#12110F`.
