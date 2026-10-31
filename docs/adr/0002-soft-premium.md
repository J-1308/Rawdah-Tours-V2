# 0002 — Soft, blended and premium

Date: 25 October 2026 · Status: accepted · Amends 0001 (the visual table), keeps its rule that nothing may
look or read like The Umrah Company site.

## Context

Jibril reviewed the square-kufic build (0001) on the Vercel preview: "too blocky… not blended… very sharp…
not easy on the eye". He wants it more premium, the creamier beige logo, and something unique done with the logo.

## Decision

Keep the structure, copy and conversion system. Change the finish:

| | 0001 (rejected finish) | 0002 |
|---|---|---|
| Grounds | hard blocks of date brown, sand-gold, clay | creams that fade into each other (`.wash-linen`, `.wash-beige`, `.wash-hero`); one dark ground, a rounded cocoa panel (`.panel-dark`) |
| Palette | #F6F0E6 / #34251F / #D7BD8A | cream #F8F3EB, linen #F0E7DA, beige #E7D9C4, sand #D8C3A1, cocoa #3A2B24 |
| Logo | cream lockup on date brown | cocoa-on-cream lockup, centred in a cream glass header; cream on cocoa in the footer; drawn from one traced SVG |
| Logo as motif | none | the kufic mark embossed large and faint behind heroes and panels; tiny mark as the label marker |
| Shape | 3px corners, square tiles | 0.95rem buttons, 1.5–2rem cards and photos |
| Photos | tight square mosaics, offset gold tiles | layered photo stacks with soft shadows and a cream ring; masonry for the last trip |
| Type | Cormorant 600 | Cormorant 460, italic serif labels |
| Buttons | tiles with a chevron cell | soft cocoa or sand gradient buttons; WhatsApp as a light button with the green glyph |
| Texture | none | a faint paper grain over the page |

Still never the Umrah Company's: pill buttons, arched portraits, italic second line in headlines, tracked
capital kickers, full-bleed photo leads with the headline over faces, its near-black, its fonts.

## Consequences

`docs/design-system.md` is rewritten for this. New photos and video (coming from Rawdah) slot into the
existing photo stacks and the hero; a hero video can replace the main photo without layout changes.
