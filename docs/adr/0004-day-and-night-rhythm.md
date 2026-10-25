# 0004 — Day and night in chapters, with a switchable top

Date: 25 October 2026 · Status: proposed, on branch `feat/v2-mix`

## Context

Jibril compared the cream site (ADR 0002, `feat/v2-rebuild`) and the night site (ADR 0003, `feat/v2-dark`).
He liked the dark ground and the beige logo, and asked for "a mixture of both": a rhythm of colour through the
page, like the one on The Umrah Company's site, in two versions to compare, one with the beige logo and one with
the brown logo.

The Umrah Company's site groups its sections into colour chapters (black and ivory, hard straight edges). The
idea of colour by chapter is shared; the look must not be (ADR 0001).

## Decision

**Colour by chapter, not by section.** Night is for the moments; day is for choosing and deciding, where people
read prices and fill in forms (many travellers are older and read on phones outdoors).

Home page, top to bottom:

| Chapter | Ground | Sections |
| --- | --- | --- |
| Top | switch | Hero, Where would you like to start |
| 2 | day | Our trips |
| 3 | night | Hajj 2027, Our last trip |
| 4 | day | Why Rawdah, Rawdah means garden, What's included, Paying |
| 5 | night | The people, What travellers said (moved up to sit with the people) |
| 6 | day | Masjids & groups, Private Umrah, Common questions |
| 7 | night | The last call, then the footer |

Inner pages: the top chapter follows the switch, the body is day, and the people (About) and "How it comes
together" (Groups) are night. Trips, the trip pages, Private Umrah: top, then day.

**Rawdah's own way of meeting:** chapters are soft rounded sheets that slide over the one before
(`.chapter`, radius `--sheet`), cocoa and espresso rather than black, cream rather than ivory, with a soft
shadow under a night sheet and a hairline of light on a day sheet. The Hajj band and the last call lose their
inset panels because they now sit in a night chapter.

**One set of tokens, scoped.** The root is day. `.night` (and the top zone when the switch is dark) redefines the
same tokens with night values, so every component flips inside it. Surfaces that differ by ground are variables:
`--glass-*`, `--raise` / `--raise-hi` (chips, steppers, selected cards), `--edge`, `--field-*`, `--btn-*` (cocoa
button on day, sand on night), `--hero-glow`, `--chapter-glow`, `--watermark`, `--logo-fill` (gold on night,
cocoa on day). `.day` restores day inside night (the sample trip page card on Groups).

**The switch (review only).** `<html data-top="night|day">` decides the top zone: the strip, the header, the
first chapter, the phone bar and the desktop WhatsApp button. Dark top: beige-gold logo. Light top: brown logo,
and the hero photo dissolves into cream instead of night. A tab on the left edge (desktop) or the "Review" pill (phones) flips it; `?top=light` and
`?top=dark` in a link choose one, remembered per browser; an inline script sets it before paint.

**Trip pages** (added the same day): top (switch), then day for the join panel and the facts (for Hajj: how
booking works on Nusuk, the steps with us, what registration needs, our group), night for the journey (for
Umrah: where you'll stay, getting between the cities, ziyarah; for Hajj: the guidance, the days of Hajj and
photographs), then day for what's included, the people, paying, questions and the form.

**Review tools on phones** are one small "Review" pill that opens both switches, so they never sit over the
headline.

**Rendering (25 October, after Jibril saw cards and photos go blank in Chrome when flipping the top):**
cards have no backdrop blur (they sit on flat grounds, so it showed nothing), chapters don't clip their
contents to the rounded corners (`overflow-x: clip` only; the rounded edge is the background), the sheet edge
appears only where day meets night, `.settle` uses `backwards` so finished photos stop being animated layers,
and on phones the paper grain and the scroll-linked rise are off. Blur stays only on things that float over
moving content: the header, its menu, the phone bar, the WhatsApp button and the review tools.

## Consequences

- Before launch, pick a top: set `data-top` on `<html>` in `src/app/layout.tsx`, then delete the inline script
  and the top switch (`useTop`) in `marks.tsx`.
- New sections must sit inside a `Chapter` and use the flipping tokens (`text-ink`, `bg-(--raise)`), not fixed
  light or dark colours. `text-cream` is only for words on photographs and cocoa panels.
- `feat/v2-rebuild` (cream) and `feat/v2-dark` (night) stay as they are for comparison.
