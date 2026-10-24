# 0001 — Rawdah's own visual language

Date: 24 October 2026 · Status: accepted

## Context

V2 was first rebuilt on The Umrah Company build (structure, components,
conversion method). Jibril reviewed it and rejected the result because it
looked like the same website: arched teacher portraits, pill buttons, the
italic second line in every headline, full-bleed photo leads, the tabbed
finder, the scrolling proof strip, the accordion beside a photo, the same
section order and much of the same copy. The two businesses sell similar
journeys, so the *conversion system* can be shared; the *look, layout and
words* cannot.

## Decision

Keep the conversion system: a register/WhatsApp action at every step, a
route in for each kind of traveller near the top, prices with deposit and
instalments spelled out, a sticky two-button bar on phones, honest
confirmed/not-yet-confirmed lists, review marks for unconfirmed facts.

Replace everything visible with a language built from Rawdah's own material:

| | The Umrah Company (do not use) | Rawdah Tours |
|---|---|---|
| Source motif | arches | the square-kufic grid of the cream logo |
| Ground | near-black and ivory, alternating by chapter | date brown, ivory, sand and sand-gold (V1 and live site) |
| Type | Instrument Serif + Outfit; second line italic | Cormorant Garamond semibold, upright, one colour + DM Sans |
| Labels | tracked capitals over every heading | sentence case, a small gold square, only where they inform |
| Buttons | pills with a trailing arrow | squared "tile" buttons: label plus a square icon cell |
| Photos | one full-bleed photo per chapter | mosaics of square tiles; single photos framed with an offset gold tile |
| Portraits | arches | squares with an offset gold tile |
| Hero | headline over a full-bleed group photo, finder card below | headline on date brown beside a photo mosaic; four start tiles below |
| Journeys | big photo cards with route chips | trip rows: square photo, facts, price block |
| Hajj | dark band with countdown | sand-gold band with the talbiyah and the five steps to Hajj |
| Why us | accordion beside a photo | five plain reasons beside a framed photo |
| Included | stage stepper with photos | "What the trip cost includes" in four columns, hotels as a table |
| Booking | five numbered columns | a payment timeline with a worked example |
| Reviews | three cards with stars | one large quote and two smaller on clay |
| Motion | marquee, rising items, stepper fill | one moment: the hero mosaic settles in on load |

Words come from Rawdah's own sources first (V1: "Why choose Rawdah", "The
people who will walk with you", "Our last trip", "Accommodation & travel",
"Common questions"; the live Hajj page). No sentence is carried over from the
Umrah Company site.

URLs differ too: `/trips`, `/trips/[slug]`, `/private-umrah`, `/groups`.

## Consequences

- Any new component starts from this table, not from the Umrah repo.
- `docs/design-system.md` describes the tokens and components in detail.
- Before a section ships, check it against the left-hand column.
