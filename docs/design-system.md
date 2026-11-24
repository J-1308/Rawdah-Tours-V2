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

No paper grain and no tile patterns (removed 24 Nov 2026: they read as wallpaper). Grounds are flat.

**Readable greys:** quieter text is cocoa at reduced opacity, never below `text-ink/62` (about 4:1 on cream) and
`text-ink/68` or more for anything people read in sentences (4.5:1 and up). Many travellers are older and read
on phones outdoors.

## 2. Type

| Role | Face | Setting |
| --- | --- | --- |
| Headlines | Cormorant Garamond 460 | `.display`, upright, one colour, `text-wrap: balance`. |
| Labels, captions, sub-titles | Cormorant Garamond italic | Bronze on cream, sand on cocoa, with the tiny mark (`<Label>`). |
| Body and UI | The device's own font (`--font-display`: San Francisco on Apple, Roboto on Android, Segoe on Windows), 400/500; DM Sans until 21 Nov 2026 | 0.92–1.05rem, line-height 1.6–1.75, ink at 60–75%. Nothing below 0.875rem (14px), ink no lighter than 62% (design pass, Nov 2026). Labels, prices and small capitals use it too; Montserrat stays only in the poster lettering (the lockup, the tablets, the Sheikh caption, `.poster-title`). SF itself is never hosted: Apple's licence allows it only for UI mock-ups. |
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
| `ReservePanel` | The join panel: header, `PackagePicker`, then Book / WhatsApp / call. Not on poster trips. |
| `PackagePicker` | Flights or ground only, room, travellers, sharing, live total, deposit, instalments (`reserve.tsx`). Inside `ReservePanel`, and step 1 of the booking form on poster trips (`StepForm` with `journey`). |
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
- **The day-and-night hero (24 Nov 2026):** `NightHero` (`poster-hero.tsx`, `.nh-*`) replaces the poster collage
  (`LockupHero`, kept in the file for now). First pass (Jibril: "something is off… this empty feeling… the nav bar and
  background… the face is prominent"): a night hero with a photo. Second pass ("combine the two… elements of the
  original hero on the left… both light and dark… the wording in the original hero", with the journey's group photo):
  desktop is two halves. The day (cream): the poster's lockup (1448 / RAMADAN / LAST 10 NIGHTS), the dates, "with
  GGC", "Eid in the blessed lands" and "14 nights" side by side, the two prices, the gilt button, the deposit and
  WhatsApp in a line. The night (olive): our last group in the Address lobby (`heroPhoto`, `group-photos-01.jpg`) at
  its own 3:2 shape with its caption, never cropped, and Sheikh Yahya as a small round credit under it. The ten lamps
  hang over both, olive line by day and glowing at night, on short strings. Phones: the day first (words, prices,
  button, all on the first screen), then the night (photo and credit). The journey section now shows the group in
  ihram at night (`group-photos-03.jpg`), so the page doesn't repeat a photo.
- **One cream, one night (24 Nov 2026, Jibril: five off-whites "read grey and patchy, with visible seams"; ADR 0006
  addendum):** on the poster skin every day section, hero included, is one warm cream, `--cream: #f4efe4`
  (`--color-canvas`); cards and insets sit on it in white glass (`--glass-bg`), not in other creams; no washes or bands
  (`.wash-linen` and `.wash-beige` are flat there). The night is one flat dark olive, `--night: #2a2c20`, with no star
  lattice or glows. It fades straight to the cream: at the nightfall the cream lifts off the night, and at the daybreak
  the night fades into the cream through warm steps (`.db-dawn`, fixed, never half-faded), with no gold band and no
  sprouts. Madinah (`Chapter tone="garden"`) sits on the same cream with no sheet edge, carpet lattice or glow; the
  Rawdah's green is only an accent: the headline's gilt word, the labels and the icons (`--color-bronze: #46613a`).
  No paper grain anywhere.
- **Poster skin (Ramadan Umrah 2027, 19 Nov 2026):** the page below the header takes the GGC poster's stone, mist
  and olive (`.skin-1448`, tokens only; header and footer stay Rawdah's). The head is its own centred hero
  (`.poster-hero`), image first: the poster's Ka‘bah artwork cut out of its background (`ramadan-1448-art-cut.png`,
  edge to edge on phones, so there is no box to fade), the poster's frosted tablets behind its towers with live text
  (14 nights; Eid in the blessed lands), then the lockup as live text (1448 / RAMADAN / LAST 10 NIGHTS), the dates, a
  GGC line, one short line (`heroLine`), the offer (`HeroOffer`: olive panel with the Saudia mark and the ended early
  bird crossed out; the ground package to enquire), our own round portraits (`PosterTeam`) and the button. Less to
  read (Jibril, 19 Nov 2026): the about block is a photo, a title and two sentences (`about`); the facts grid is gone
  from the head; one line under the icon row; the team section is a line and the "More about" notes. Olive type on
  light grounds, never the poster's white on stone. Also: the icon row (`PosterPerks`, line icons drawn for Rawdah)
  and its own opening when arriving from another page (`Arrival`, `html[data-arrival]`).
  **Selling pass (19 Nov 2026), the format of the best trip pages (The Umrah Company, The Sunnah Experience) in
  Rawdah's look, facts and photos only:** Sheikh Yahya in the hero (`HeroFigures`: his portrait cut out of its
  background, `public/images/portraits/cut/`, fading into the mist with a radial mask) standing inside the artwork,
  right; the left tablet's two faces take turns (`tab-swap`, one fully out before the other comes in). Phones: the
  artwork full width above the words. Desktop: the same stacked poster (22 Nov 2026; it was two columns, artwork left
  and words right, until Jibril asked for desktop to look closer to the stacked version, then spread out): lettering
  centred on top, the artwork large under it (up to 54rem), then one row with both prices and the button. One width
  (`--rl-w`, from the screen's height) sizes the artwork and the lettering together, so the prices always show on the
  first screen of a laptop and taller screens get the full size. Ten fine-line lamps hang in the
  margins (`HeroLamps`, desktop only): nights 21 to 30, lit one after another, the odd nights brighter (a first try with
  all three people flanking the artwork looked bad, Jibril 19 Nov). The price, then the button (`.ph-buy`), with one line of real facts under it (`heroNote`); the poster
  icons as a slow ticker under the hero (`PerkTicker`, transform only, paused off screen and on hover, scrolls by
  hand without motion); jump links (`.trip-jump`, stuck under the header on phones, `.trip-anchor` scroll margins);
  the people straight after the trip (`TripPeople`: Sheikh Yahya in his own olive panel, `.guest-feature`, the one
  dark block there, with his original photo cropped and never faded; then the hosts' photo cards, `.host-card`), then
  Rawdah's previous trips (`PastTrips`: the Path of Purity II poster, a "to come" frame, a gallery of eight captioned
  group photos); Ramadan in the Haram on the night ground before the flights and hotels (`HaramNights`: Taraweeh,
  qiyam and Laylat al-Qadr, iftar in the Haram, the khatm; tall photo cards); hotel cards with how far each is from
  the Haram (`.hotel-walk`, on foot or by shuttle), two sentences and feature chips, from the hotels' own listings;
  the ended early bird crossed out beside every price (hero, join panel, packages table, phone bar); a Hajj 2027 band
  in the guest panel's olive at the foot (`OtherTripBand`, to WhatsApp in one-page mode). Final pass for the one-page
  launch (19 Nov 2026): no photo placeholders; Ramadan in the Haram is words only (`.nights-list`, numbered); what's
  included is icon tiles without photos; who it's for under the trip's two sentences (`ForWho`); Why Rawdah with the
  name's meaning, the team photo and four reasons (`WhyRawdah`); "Our last trip" is Path of Purity II only; how
  booking works as numbered steps by the form (`steps`, `.booking-steps`). Packages on poster trips (`PosterPackages`):
  the poster's "Installment plan available" lettering and one tile per payment (`.plan-tiles`), then cards with a
  with-flights / ground-only switch (`PackageCards`, `.pkg-*`), each card's button filling the form with its package;
  the poster's Saudia and Haramain train photos with white labels over what's included (`.showcase`, phones only). On
  phones the join panel comes after the prices, not after the hero, so the story comes first (19 Nov 2026): the desktop
  panel is `#join-desktop` beside the story, the phone copy is `#join`, and `page-watch.tsx` sends "#join" links to
  whichever is showing; the phone bar waits until the hero's price box has scrolled away. Rebuilt 20 Nov 2026
  (`docs/adr/0005-story-and-motion.md`): the hero is `PosterHero` (`poster-hero.tsx`, `.rh-*`): artwork with the guest,
  lockup, the ten nights (`.ten-nights`), one line of dates and partner, one price line, Book and WhatsApp; the order is
  trip, people, nightfall and the nights, flights and hotels, included, our last trip, why Rawdah, prices, book,
  questions; the night chapter opens with `Nightfall` (`night-sky.tsx`); reveals focus in (`.rv`) instead of rising; the
  last trip's photos develop. The garden (20 Nov 2026, `docs/adr/0006-the-garden.md`): the page runs in the order
  you'd live the trip (getting there, nights, Eid, Madinah, hosts, proof, price, book, the Rawdah hadith); the guide is
  the garden path (`garden-path.tsx`, stages in `garden.tsx`); the Madinah chapter is `Chapter tone="garden"` (Rawdah
  green, floral lattice, dawn at the top) after `Daybreak` (superseded 24 Nov 2026, below); leaves from the mark sit faintly behind chapters
  (`GardenLeaves`); hosts are arched portraits (`.hosts`, `.host-arch`); `ClosingVerse` ends the page. Second pass the same day: the hero is the poster itself (`.rp-*`, `heroGuest` adds
  Sheikh Yahya); `GuestIntimate` (`.guest-close`) sits at the top; `FlightScene` (`.flight-scene`) plays the overnight
  flight as you scroll; `StayShowcase` (`.stay-*`) shows both hotels high in the page; the join panel follows the prices
  on every screen. One form (23 Nov 2026): poster trips have no join panel; the package picker is step 1 of the booking
  form and your details step 2, and "#join" links go to the form (`page-watch.tsx`). Closer to the deen: deen icons in `GardenGlyph` (kaaba, lantern, dome, minaret, quran, star, mihrab),
  `VerseLine` (`.verse`) for Qur'an and hadith in Arabic with meaning and source, Arabic numerals in eight-pointed stars
  for the nights, a star lattice behind the night chapter (removed 24 Nov 2026). Night first (same day): the night chapter opens right under
  the hero and holds the nights, Sheikh Yahya (with `guestFeature.ways`), the journey and the hotels; desktop sections
  share one centred column (`.pw`, 72rem). The one-page header on desktop: the logo on the left, the trip line in the
  middle, WhatsApp and Book on the right (phones keep call, logo, WhatsApp). Since 24 Nov 2026 the middle holds real
  links (`HeaderLinks`, `header-links.tsx`, `.hdr-links`): The journey · Guest Sheikh · Hotels · Prices · Questions,
  the section in view in full stone with a short gold line under it that glides between links (the garden path's line,
  not The Umrah Company's menu, ADR 0001). On desktop it replaces the garden path, so there is one menu (phones keep the
  garden path). With the full site (`ONE_PAGE` false) the same slot links pages: Ramadan 2027 · Private & family ·
  Groups · Hajj 2027 · About, the page you're on lit, and the Ramadan page keeps its garden path. Rawdah's gold (ADR 0006, fifth pass):
  `--gilt`, `--gilt-light`, `--gilt-deep` on the poster skin, `.btn-gilt` for the main "Book your place", gold labels
  and gold-edged night cards, headings at weight 520. Gold on olive and green, never on black (The Umrah Company is gold on black).
  Sixth pass (ADR 0006): the package is its own section (`PackageSection`, `.pkg-*`, `j.pack.at` "day" or "night"),
  never a card on the hero; gilt words in titles (`*asterisks*`, `gild` in `shell.tsx`, `.gild`); the garden path is a
  light frosted row with a gilt rule; hotels stand in gilt-lined arches with photo plates and the nights in a gilt
  star (`HotelPlates`, `.stay-*`). Seventh pass: `FeatureBand` (`.feature-band`) under the hero is the dark contrast
  (the poster's icon row, still, never a ticker); Rawdah's mark faint behind the hero, package and hotels (`.watermark`);
  the overnight flight is a background to Getting there (`FlightScene bg`, `.flight-bg`), not a section.
  Type on the poster skin: `.section-title` (Cormorant 600, clamp(2.65rem, 5.4vw, 4.9rem), #1f1e13 on stone),
  `.label` as gilt Montserrat capitals, body text stronger; the garden path's `.gp-progress` gilt line fills with scroll.
  Eighth pass: `JourneySection` merges the package, the nights and our journey; `Highlights` (`.highlights`) is the
  page's one numbered list; photos show uncropped (`HotelPlates`, `.host-frame`, `.past-strip`; a swiped strip that
  bleeds to the screen edge sets `scroll-padding-inline` to its padding, or snapping opens it flush left; each `.past-shot` is `min-content` wide, so a caption wraps to its photo, not past it); the feature band's
  icons draw in and a light crosses it.
  Tenth pass: the hero is `LockupHero` (`.rl-*`: lettering, artwork, two gold price tiles, one gilt button); gold
  only at key points (buttons, prices, current chapter, the band, night stars), headline accents in olive italic; one
  button identity (gilt main, stone outline with WhatsApp's mark, text links); repeats cut (ADR 0006).
  Twelfth pass (21 Nov 2026): liquid glass on the floating parts only (header, phone bar, garden path, round phone
  buttons, WhatsApp outlines, the ground-only tile): frosted blur and saturate, a bright top edge, a soft shadow; the
  gold Book button stays solid. A simpler hero: the artwork with Sheikh Yahya, the lettering, one gold price line
  (`.rl-line`), the gold button. In one-page
  mode the whole site wears the poster: `<html data-skin="1448">` turns the top strip, header and footer from cocoa
  to the poster's olive and stone, the logo stone, and the browser bar olive (`layout.tsx`, `globals.css`). One-page header: call, logo, WhatsApp on
  phones; the trip, logo, WhatsApp and "Book your place" on desktop (`src/lib/site-mode.ts`); what's included as photo cards (`IncludedCards`, `plan.cards`; the hotels card says room only and breakfast, so no tick list repeats it under the cards, `perksAlso: []`; "Photo to come" frames until Jibril
  sends the shots); the trip's own
  questions first (`faqs`); three short lines by the closing form (`closing`). Not taken: the other sites' photos,
  copy, countdown and imam grids.
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
