# Rawdah Tours V2 — Design system ("soft garden")

> On `feat/v2-mix` the page is built in day and night chapters: see `docs/adr/0004-day-and-night-rhythm.md`
> for the chapters, the night token scope and the top switch.

Status: **in use** (25 October 2026). Why: `docs/adr/0002-soft-premium.md` (and 0001 for the rule that the
site must never resemble The Umrah Company's). Tokens: `src/app/globals.css`. Kit: `src/app/_site/shell.tsx`.

The brief in one line: **calm, warm and premium; creams that blend, soft photographs, and the Rawdah mark
used like a watermark on good stationery.**

## 1. Colour

| Token | Hex | Use |
| --- | --- | --- |
| `canvas` (cream) | `#F8F3EB` | The page. |
| `canvas-warm` (linen) | `#F0E7DA` | Soft sections (`.wash-linen`), panels inside cards. |
| `beige` | `#E7D9C4` | Deeper sections (`.wash-beige`), the strip, photo placeholders. |
| `sand` | `#D8C3A1` | The logo's beige: accents on dark, the watermark. |
| `gold` | `#BFA27A` | Dots, rules, the tiny mark in labels. Not for text on cream. |
| `bronze` | `#80613A` | Gold-coloured text on cream (labels). |
| `ink` (cocoa) | `#3A2B24` | Text; the dark panels; the logo on cream. |
| `clay` | `#5A463B` | Warmth inside dark panels. |
| `cream` | `#EFE4D2` | The logo and headlines on cocoa. |
| `wa` | `#1FA855` | WhatsApp glyph, and the one green button in the join panel. |

**Blending:** tinted sections use `.wash-linen` / `.wash-beige`, which fade in from cream and back out, so
sections never meet at a hard edge. Heroes use `.wash-hero` (cream lit from the top right). The one dark ground
is `.panel-dark`: a rounded cocoa panel lit from a corner, inset from the page edge (Hajj 2027, the closing
invitation, the planner summary, the footer's rounded top).

A faint paper grain sits over the page (`body::after`).

**Readable greys:** quieter text is cocoa at reduced opacity, never below `text-ink/62` (about 4:1 on cream) and
`text-ink/68` or more for anything people read in sentences (4.5:1 and up). Many travellers are older and read
on phones outdoors.

## 2. Type

| Role | Face | Setting |
| --- | --- | --- |
| Headlines | Cormorant Garamond 460 | `.display`, upright, one colour, `text-wrap: balance`. |
| Labels, captions, sub-titles | Cormorant Garamond italic | Bronze on cream, sand on cocoa, with the tiny mark (`<Label>`). |
| Body and UI | DM Sans 400/500 | 0.92–1.05rem, line-height 1.6–1.75, ink at 60–75%. |
| Arabic | Amiri | The talbiyah, روضة. |

## 3. Shape and depth

Buttons `rounded-[0.95rem]`; cards `rounded-[1.5rem]`; photos `rounded-[1.75rem–2rem]`; dark panels
`rounded-[2.5rem]`. Depth from soft shadows (`--shadow-soft`, `--shadow-lift`, `--shadow-float`) and `.glass`
cards (translucent cream, white edge; no backdrop blur, see ADR 0004). No hard borders, no pills, no arches.

## 4. The logo

- `public/images/brand/rawdah-logo.svg` (lockup) and `rawdah-mark.svg` (the kufic mark), traced from the
  original artwork. They're used as CSS masks (`.logo-mask`, `.mark-mask`) so they take any colour.
- Header: cocoa on cream, centred. Footer: cream on cocoa. Icons: cocoa mark on beige.
- `<Emblem>`: the mark as a large, faint watermark behind heroes and panels, and tiny as the label marker.
- The original PNGs (`logo-cream.png`, `mark-cream.png`) stay for reference.

## 5. Components (`src/app/_site/`)

| Component | What it is |
| --- | --- |
| `Logo`, `Emblem` | The lockup and the mark, in the current text colour. |
| `Heading`, `Label` | Headline; italic label with the tiny mark. |
| `TileLink` | The main button (`ink` cocoa, `gold` sand on dark, `line-ink`, `line-canvas`). |
| `WaTile`, `WaSquare`, `Actions` | WhatsApp button; WhatsApp as a square glyph; a section's pair of actions (on phones the main button fills the row with `WaSquare` beside it). |
| `PhotoStack` | One soft framed photo. The frame takes the photo's own shape (see Photography), unless `aspect` fixes it. |
| `Framed` | One soft rounded photo. |
| `PageLead` | Inner-page head: words beside a PhotoStack on `.wash-hero` with the mark embossed. |
| `TripRow` | A trip as a glass card: photo with state, facts, price panel and actions. |
| `ReservePanel` | The join panel: rooms, travellers, live total, deposit, instalments. |
| `PaymentPlan` | The worked deposit example with a proportional bar. |
| `TeacherList` | Glass cards with rounded portraits. |
| `FaqList` | Accordions with a soft round +. |
| `ConfirmedPending` | "Settled" and "Still being arranged" glass cards. |
| `Builder` | The private Umrah planner; summary on a cocoa panel. |
| `Mark`, `MarksFrame` | Review marks (dashed bronze tags) and the switch. Remove before launch. |

Homepage sections (`home-sections.tsx`): `Hero`, `Starts` (photo cards; a swipeable row on phones), `Trips`,
`HajjBand`, `LastTrip` (masonry), `WhyRawdah`, `Meaning`, `Covers` + `StayTable`, `Paying`, `People`,
`GroupsBand`, `PrivateBand`, `Reviews`, `Questions`, `Closing`.

### Phones

Every change is checked at 390px (and 360px). On phones:
- Sections breathe less: the padding clamps start at about 3.25–3.75rem, so the page doesn't feel empty between sections.
- Lists of short cards become one card with dividers (`.glass-phone` on the list, `.glass-wide` on each item;
  separate glass cards from 640px up). Used for what the trip cost includes, trip highlights, what a group gets,
  the values on About, the private Umrah points and the contact details.
- Portraits sit beside the name (leader and teachers), with the bio full width underneath.
- The footer has two link columns, the policies on one line.
- The review-marks switch is a small pill above the bottom bar.

## 6. Conversion system

An action and WhatsApp in every section; the Hajj 2027 line above the header and the header's "Register
interest"; a floating cream bar on phones (WhatsApp and the page's main action); a round WhatsApp button on
desktop; prices always with deposit and instalments; honest settled/not-yet lists.

## 7. Motion

The hero's photos settle in on load (`.settle`). Section photographs and trip cards rise gently into place as
they scroll into view (`.rise`, a CSS scroll-driven animation: browsers without it just show them). Photos zoom
very slightly on hover. Both are off under reduced motion. Nothing else moves.

## 8. Photography

Only Rawdah's own trip photos and portraits; true captions; never words over a face. More photos and video are
coming from Rawdah; a hero video can replace the main photo in the hero's PhotoStack.

**Frames follow the photo (phone first).** A wide group photo in a tall frame shows only its middle on a phone, with
people cut off at the sides. So single photos and the last-trip gallery use frames shaped like the photo itself:
`fitFrame(src)` in `slots.ts` gives the CSS variables, and the frame uses `aspect-(--r)` (`lg:aspect-(--rl)` for
large screens). The shape is clamped between 4:5 and 3:2, so nothing is ever shown much below three-quarters of its
width or height. `next.config.ts` reads every photo's size at build time, so a new or swapped photo gets the right
frame with no code change. Fixed-shape frames are only for rows that must line up (the start cards, team portraits,
small three-up strips); there, keep landscape photos in landscape frames on phones.

## 9. Never (The Umrah Company's signatures)

Pill buttons with trailing arrows · arched portraits · an italic second line in headlines · tracked-capital
kickers over every heading · a full-bleed photo with the headline over it · a tabbed finder card · a scrolling
proof strip · an accordion beside a photo · Instrument Serif or Outfit · near-black `#12110F`.
