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
| Body and UI | DM Sans 400/500 | 0.92–1.05rem, line-height 1.6–1.75, ink at 60–75%. Nothing below 0.875rem (14px), ink no lighter than 62% (design pass, Nov 2026). |
| Arabic | Amiri | روضة. |
| Poster titles (Ramadan Umrah 2027 only) | Montserrat 700 capitals | `.poster-title` with `<PosterText>` (`poster-type.tsx`): the GGC × Rawdah poster's lettering. Every M is a real, invisible letter with the poster's M (two overlapping Λ, like the sharp, rectangular Rawdah mark) laid over it as a mask, so copied, searched and spoken text stay exact. On by `posterType` on a trip (Jibril, 17 Nov 2026), and only on the title and the closing "Book your place"; section headings stay in Cormorant (Jibril, 18 Nov 2026). |

## 3. Shape and depth

Buttons `rounded-[0.95rem]`; cards `rounded-[1.5rem]`; photos `rounded-[1.75rem–2rem]`; dark panels
`rounded-[2.5rem]`. Depth from soft shadows (`--shadow-soft`, `--shadow-lift`, `--shadow-float`) and `.glass`
cards (translucent cream, white edge; no backdrop blur, see ADR 0004). No hard borders, no pills, no arches.
Choice chips and tags are `rounded-[0.9–0.95rem]`, at least 44px high. Phone bars are opaque (`bg-canvas`); on trip
pages the trip bar replaces the floating WhatsApp button.

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
| `PageLead` | Inner-page head: words beside a PhotoStack on `.wash-hero` with the mark embossed. On phones and tablets the title and status come first and the photo (4:3) follows; mark the first child that belongs below the photo `lead-after`. |
| `TripRow` | A trip as a glass card: photo with state, facts, price panel and actions. |
| `ReservePanel` | The join panel: rooms, travellers, live total, deposit, instalments. |
| `PaymentPlan` | The worked deposit example with a proportional bar. |
| `TeacherList` | Glass cards with rounded portraits. |
| `FaqList` | Accordions with a soft round +. |
| `ConfirmedPending` | "Settled" and "Still being arranged" glass cards. |
| `Builder` | The private Umrah planner; summary on a cocoa panel. |
| `Mark`, `MarksFrame` | Review marks (dashed bronze tags) and the switch. Remove before launch. |

Homepage sections (`home-sections.tsx`): `Hero`, `Starts` (photo cards; on phones a list of rows, every way in at a glance), `Trips`,
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

Premium, but never in the way (client's request, 12 Nov 2026). Everything needs `html.motion`, which the head
script in `app/layout.tsx` sets before first paint unless the visitor prefers reduced motion.

- **Opening** (`Intro`, `src/app/_site/motion.tsx`): logo fades in on cocoa, a sand line draws, the curtain lifts.
  Once per visit (`sessionStorage`), about 1.9 s, pure CSS so it always ends. `--intro` delays the hero until it lifts.
- **Hero:** the photo settles (`.settle`), then label, headline word by word (`.hero-word`), text, buttons and facts
  arrive in turn (`.hero-step` with `--d`). Header (`.motion-drop`) and phone bar (`.motion-lift`) slide in.
- **Scroll reveals** (`Reveals`): headings, the paragraph after them, grid items (staggered), questions, tables and
  framed photos (`.rise`, with the photo easing out of a slight zoom) rise into view, on phones too. Only elements
  still below the screen at load are hidden, so nothing in view blinks; add `data-reveal` to opt anything else in.
- **Buttons:** a light sweep across `.btn-sand` on hover. Photos zoom very slightly on hover.
- **Poster skin (preview, branch `ramadan/poster-skin`, 19 Nov 2026):** on Ramadan Umrah 2027 the page below the header
  takes the GGC poster's stone, mist and olive (`.skin-1448`, tokens only; header and footer stay Rawdah's); the head
  is the poster's lockup (1448 / RAMADAN / LAST 10 DAYS, `PosterLockup`), the dates in italic, and four frosted
  tablets (`poster-parts.tsx`); drifting mist replaces the night sky. Olive type on the tablets and dates, not the
  poster's white, which can't be read on stone. Also from the poster (19 Nov 2026): the icon row of what's included
  (`PosterPerks`, line icons drawn for Rawdah), the team row (`PosterTeam`: round portraits, role in capitals over the
  name), and its own opening when arriving from another page of the site (`Arrival`: stone, olive mark, 1448, then a
  curtain lift; `html[data-arrival]`). Two heads to compare in the preview: the group photo, or the poster's artwork
  with `?head=art` (`data-head`); keep one, then remove the switch.
- **Ramadan Umrah 2027 only** (`posterType`; the page every Instagram link lands on, 17–18 Nov 2026): no opening on
  this page (the head script marks it played); a night sky with stars twinkling in three groups and a crescent
  (`night-sky.tsx`, fixed seed; paused off screen by `page-watch.tsx`) on the head; the title rises letter by letter
  (`.poster-rise .pl`), then the facts and button (`.follow`); the journey line draws itself in (`.line-draw`, its
  wrapper is what's revealed, `data-rv-skip` inside); flight and hotel cards lift in turn (`data-rv` sets the order);
  a small plane crosses each flight card (`.plane-run`, moved by transform); form steps slide in (`.step-in`).
  Cut after the Opus review (18 Nov 2026): the price count-up (it showed wrong prices mid-count) and the star drift. Rawdah's own: none of it from The Umrah Experience (ADR 0001).

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
