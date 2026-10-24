# Rawdah Tours V2 — Design System

Extracted 24 Oct 2026 from Rawdah Tours V1 (`J-1308/Rawdahtoursw-website`, `docs/brand-system.md`, `app/globals.css`)
and The Umrah Company (`J-1308/The_Umrah_Experience`, `DESIGN.md`, `src/app/globals.css`).
**Status: proposed. The decision in §1 is open until Jibril confirms it.**

## 1. The decision to make first

The two sources disagree on purpose:

- **Rawdah V1** is warm cream, sand, terracotta and antique gold ("creamy, desert-soft, heavenly").
- **The Umrah Company** explicitly rejects *"generic cream-and-gold Islamic luxury travel"* and uses a cool
  grey-ivory, near-black ink and desaturated bronze.

Both clients are Umrah operators. If Rawdah adopts the Umrah Company's palette, the two client sites will look
related, which is bad for both.

**Recommendation:** keep Rawdah's own warm palette as the brand, and borrow the Umrah Company's *disciplines*
(§4), not its colours. This fixes V1's real weakness (soft, mid-sized, everything the same density) without
making Rawdah look like another client.

## 2. Colour (Rawdah palette, from V1)

| Token | Value | Use |
| --- | --- | --- |
| `ivory` | `#F6F0E6` | Default page ground |
| `alt-bg` | `#EDE4D6` | Alternate section ground |
| `sand` | `#E8D8C3` | Soft surfaces, cards |
| `beige` | `#DCC7AF` | Borders, dividers on light |
| `dusty` | `#B58D7A` | Secondary accents |
| `terracotta` | `#A8745B` | Primary accent |
| `mocha` | `#6E5447` | Secondary text |
| `brown` | `#4E3A33` | Body text; primary CTA fill |
| `plum` | `#5A4745` | Dark accents |
| `dark-bg` | `#3A2920` | Dark sections (use as a first-class chapter ground, see §4) |
| `gold` | `#B08D57` | Hairlines, small caps, icon details only. Never a fill, gradient or button |

Contrast rule (both sources agree): softness comes from warmth, never from low contrast. Body text is `brown` on
`ivory`; no `mocha` text on `sand`.

## 3. Typography

| Role | V1 | Note |
| --- | --- | --- |
| Display | Cormorant Garamond | Keep, or test against Instrument Serif. Do **not** reuse Outfit/Jost; that is the Umrah Company's campaign voice |
| Body | DM Sans | Keep |

## 4. Disciplines borrowed from The Umrah Company

1. **Gold is a hairline, never a surface.**
2. **Dark is a chapter, not a footer.** Use `dark-bg` for one or two whole sections to give the page range.
3. **Extreme type scale.** Big display headings and small tracked labels; avoid mid-sized everything (Umrah's diagnosis of its own V1, and true of Rawdah V1).
4. **Sections are compositions**, not repeated identical card grids. No three-identical-cards default.
5. **Documentary photography**, full-bleed where it earns it; no blanket fade on every image.
6. **Restrained motion:** one settle on load, no entrance animations on ordinary text, respect `prefers-reduced-motion`. Don't hide the hero image behind a fade-in (hurts load time).
7. **Honest content:** no invented people, quotes or captions.

## 5. Components

- **Two equal primary CTAs:** "Reserve Your Place" (filled `brown`) and "Chat on WhatsApp" (outline, warm, not bright green).
- Cards: warm surface, subtle `beige` border, small radius, restrained shadow.
- Eyebrow: short gold hairline + tracked uppercase label.

## 6. Avoid

Inter/Geist defaults, purple gradients, glassmorphism, emoji section markers, everything centred, gradient text,
bright gold, stock or staged "community" imagery.
