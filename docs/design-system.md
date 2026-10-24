# Rawdah Tours V2 — Design System

Extracted 24 Oct 2026 from Rawdah Tours V1 (`J-1308/Rawdahtoursw-website`, `docs/brand-system.md`, `app/globals.css`)
and The Umrah Company (`J-1308/The_Umrah_Experience`, `DESIGN.md`, `src/app/globals.css`).
**Status: implemented on `feat/v2-site`; open to client feedback.**

## 1. Direction (decided 24 Oct 2026)

Rawdah keeps its own warm identity and borrows the Umrah Company's *disciplines* (§4), never its palette, fonts or
copy. The two clients are both Umrah operators and must not look related.

The site is lit like a Madinah courtyard at midday: a white ground, dappled shade in the photos, and dark used only
for whole chapters (the journey section, the Nusuk checklist, the footer).

## 2. Colour (tokens in `src/app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `ihram` | `#FBF9F5` | Page ground |
| `sand` / `sand-soft` | `#EADCC4` / `#F3EBDD` | Register-interest band; quiet sections |
| `ajwa` | `#2E2020` | Text; dark chapters; primary button |
| `palm` | `#2D4A3A` | WhatsApp button, links, "confirmed" markers |
| `brass` | `#A6844F` | Hairlines, step numerals, large Arabic only. Never small text or fills |
| `dust` | `#6B5E57` | Secondary text |
| `henna` | `#9B5940` | "Not confirmed yet" markers and form errors |
| `parchment` | `#EFE5D4` | Text on dark |

All text pairs pass WCAG AA. Palm green comes from Rawdah's own posters and the garden in the logo.

## 3. Typography (self-hosted, `public/fonts`)

| Role | Face |
| --- | --- |
| Headings and reading passages ("spirit") | EB Garamond |
| Practical information, forms, buttons ("logistics") | Source Sans 3 |
| Arabic (place names, روضة, ﷺ) | Amiri, which also sits behind both stacks as a fallback |

Transliterated terms are set plainly (ihram, tawaf, saʿi). No uppercase tracked labels.

## Status markers

A filled palm dot means confirmed; a henna ring means not confirmed yet. Use `StatusList` whenever the site states a
fact about a trip, so visitors can always see what's settled.

## 4. Disciplines borrowed from The Umrah Company

1. **Gold is a hairline, never a surface.**
2. **Dark is a chapter, not a footer.** Use `ajwa` for one or two whole sections to give the page range.
3. **Extreme type scale.** Big display headings against small, quiet supporting text; avoid mid-sized everything (Umrah's diagnosis of its own V1, and true of Rawdah V1).
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
