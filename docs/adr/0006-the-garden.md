# 0006 — The garden: Rawdah's design direction

Date: 20 November 2026 · Status: accepted · Builds on 0005 (story and motion). Keeps 0001's rule that nothing may look
or work like The Umrah Company's site.

## Context

Jibril: "i want to add something similar to what i did for the umrah company the animation that guides you through the
website. Since rawdah mean garden i want something similar to that we should have that as our design direction." He
chose the garden path (A) and the garden backdrop (C), and asked for Ayuub and Issa to be "treated as Suleyman in their
company": the hosts, featured, not cards in a row.

Rawdah means garden. The Prophet ﷺ said: "What is between my house and my minbar is a garden from the gardens of
Paradise" (al-Bukhari and Muslim). That place is in Masjid an-Nabawi, in Madinah, where the trip ends; it is marked
today by a light green carpet with a floral design where the rest of the masjid is carpeted red, and white pillars
with gold inscriptions on green. Rawdah's mark is already a garden: روضة in square kufic, crowned with a plant of five
leaves and a seed-drop, leaves scattered through it.

The Umrah Company's guide is a dashed gold thread down the left margin with stations (plane, walking, sujood,
crescent) that fill as you read. A vine down the margin would be the same mechanism, so it is ruled out.

## Decision

**The story is a journey to the Garden, in the order you'd live it:** the promise (hero) → getting there (the route,
the Saudia flight, the Makkah hotel) → nightfall and the last ten nights → daybreak and Eid → Madinah in the Rawdah's
green (its hotel, the flight home, "Rawdah means garden") → who walks with you (Sheikh Yahya, then Ayuub and Issa as
the hosts) → our last trip → what's included → prices → book → questions → the form → the Rawdah hadith, last.

**The garden path (the guide), `garden-path.tsx`.** The chapter row stuck under the header (phones and desktop), each
chapter with a stage of the garden drawn from the mark (`garden.tsx`): sprout (getting there), palm under a star (the
nights), crescent (Eid), the four-part garden (Madinah), the crown in full leaf (your hosts), a bloom (prices), the gate
(book). The chapter you're in is olive and its stage grows in gold as you reach it; chapters behind you stay in leaf;
those ahead are faint. Tapping goes there. At the top of the page, not down the margin, and it is the navigation too.

**The garden backdrop.** Leaves from the mark, faint, behind the words (`GardenLeaves`): in the margins of the stone
chapters, all through the garden chapter, drifting a little with the scroll. The garden chapter (`Chapter tone="garden"`)
is the Rawdah's light green with its floral lattice faint in the ground and a gold dawn at its top.

**Colour follows the story:** stone for the practical day, olive night for Makkah's nights, dawn gold at Eid, Rawdah
green for Madinah, stone again for the decision. (The Umrah Company: kiswa black and gold against marble.)

**Moments:** nightfall (0005) and its reverse, daybreak, at the foot of the night (stars go out, gold rises, the garden
sheet comes up); the crescent rising over Eid; the crown growing over the closing hadith; the hosts' portraits settling
in their arches. All scroll-linked where supported (Safari 26+, Chrome, Edge), still otherwise and with reduced motion.

**Hosts.** Ayuub and Issa get a feature of their own under "Your hosts", with a line saying who they are; each portrait
framed as an arch (the garden's gate), no card box. No claim that either answers WhatsApp personally (not confirmed).

**Buttons.** One family: olive for the main action (green in the garden chapter), stone outline for the second;
WhatsApp keeps its glyph in a garden green (`--color-wa: #2f7a4c` on the poster skin), not the app's neon.

## Consequences

- The Ramadan page's "Flights and hotels" block is split: `JourneyPart` renders the route, the flight out and the Makkah
  hotel as "Getting there", and the Madinah hotel and flight home in the garden chapter. Other trips keep `TripJourney`.
- New content fields: `gettingThere`, `eid`, `madinah`, `hostsIntro`, `closeVerse` (facts already on the page only).
- The home page and other pages are still in the older cocoa design; when the full site returns (`ONE_PAGE` false) they
  should move to this system.
- Photos of iftar, Taraweeh or the Rawdah from Rawdah's own trips would strengthen the peak; none are used yet.

## Second pass (20 November 2026, later the same day)

Jibril: "everything past the hero is a lot better… we should have our hotels high in a section saying where you will
stay… our journey similar to the umrah company first then getting there and then where you will stay… too
minimalistic, we want our reader to say wow… yahya rabi should be included at the top… very intimate… use the poster
as is… cropping it at just above where it says early bird and the photos… the poster was made for iphone… I want to see
how this would look without him first and then add him… that kinda animation earlier… with the journey."

- **Hero: Rawdah's poster itself** (`ramadan-1448-poster-hero.jpg`), cropped below its logo (the header carries it)
  and above the early bird and the portraits, its stone ground continued in the page's so there is no edge. Phones:
  full width, the price and buttons under it. Desktop: the poster large on the left, the words on the right. Two
  versions: `heroGuest` false (no guest) and true (Sheikh Yahya standing at the poster's lower right, clear of its
  "Eid in the Haram" tablet on phones).
- **Order:** hero → Sheikh Yahya, close → our journey (the trip at a glance, the route) → the overnight flight as a scene
  → getting there (both flights) → where you'll stay (both hotels) → nightfall and the nights → daybreak and Eid →
  Madinah (its moments, "Rawdah means garden") → your hosts → our last trip → included → prices → book → questions →
  the form → the Rawdah hadith. The join panel comes after the prices on every screen (no sticky side panel).
- **Sheikh Yahya** (`GuestIntimate`): his own full-length portrait, large and warm, edge to edge on phones with his name
  over its golden foot; on desktop tall on the left. Only the page's facts. The Sunnah Experience leads its sheikhs
  with "Led by" and lists "private sittings"; Rawdah has no confirmed sessions to list (an open question), so the
  closeness is in the picture and the words "travelling with the group".
- **Where you'll stay** (`StayShowcase`): each hotel as a spread, its photos large (edge to edge on phones), the name
  big, three facts (nights, the walk or shuttle, meals), then the detail; Madinah mirrored on desktop. The photos
  settle as they scroll in.
- **The flight scene** (`FlightScene`): the nightfall's kind of moment, earlier: dusk over London, night with stars and
  the plane riding its arc, dawn and the clock tower at Jeddah, with the real times at each end.
- **Daybreak** now grows the garden: a row of the mark's crowns rising as the gold light comes up, before the green.
- No ten squares under the hero (Jibril, in PR #30: "looks weird"); the ten stars stay in the nightfall.
- The garden path's stops follow: Sheikh Yahya, the journey, where you'll stay, the nights, Eid, Madinah, prices, book.

## Third pass: closer to the deen (20 November 2026)

Jibril: "a bit more spiritual, like the garden… even the icons that we're using… a bit more related to the deen, as
close as possible."

- **Icons from the deen** (`GardenGlyph`): the Ka‘bah, a Ramadan lantern, the Green Dome, a minaret, a mus‘haf on its
  rehal, the eight-pointed star, a mihrab. The garden path now reads: Sheikh Yahya (mus‘haf), the journey (Ka‘bah),
  where you'll stay (minaret), the nights (lantern), Eid (crescent), Madinah (Green Dome), prices (star), book (mihrab).
  The hotels carry the Ka‘bah (Makkah) and the Green Dome (Madinah); Madinah's moments a dome, a minaret, a mihrab.
- **Words of the deen at the story's turns** (`VerseLine`, Arabic in Amiri, its meaning, its source), each checked:
  after the hero, "‘Umrah in Ramadan is equal to a Hajj" (al-Bukhari 1782, Muslim 1256); in the nightfall, under the
  arch of ten stars, Surah al-Qadr 97:3; at daybreak, the takbir of Eid; last, the Rawdah hadith in Arabic and English.
- **The nights** are numbered in Arabic numerals inside the eight-pointed star; a faint lattice of eight-pointed stars
  lies behind the night chapter.
- Practical icons (flights, hotels' facts, what's included from the poster) stay practical.

## Fourth pass: night first (20 November 2026)

Jibril: "there should be more with yahya rabi… how he will teach and help and how it's gonna be intimate and help u
every step of the way… the spacing on the desktop can be better… I like how the dark contrasts with the light when we
get into the last ten nights. I think we should have that earlier on like right under the hero and then the light for
Medina again… yahya rabi doesn't need to be as high up."

- **Order:** hero (light) → the night at once: nightfall with Laylat al-Qadr, the last ten nights, Sheikh Yahya, the
  hadith of Umrah in Ramadan opening our journey (moved down so the hero fades straight into the nightfall), the flight scene, getting there, where you'll stay →
  daybreak with the takbir → the garden: Eid, Madinah, "Rawdah means garden" → your hosts, our last trip, included,
  prices, book, questions, the form, the Rawdah hadith. The garden path follows that order.
- **Sheikh Yahya:** "With you every step of the way", three points in Jibril's words with the page's facts (he
  teaches as you go; he's there to help in Makkah and Madinah; close, not a crowd: up to 60 places, three teachers).
  No session times or formats named until Rawdah confirms them.
- **Desktop spacing:** one centred column (`.pw`, 72rem) for every section, so headings share a left edge; Sheikh
  Yahya's portrait stays in view beside his words; hosts and questions read narrower inside the column.

## Fifth pass: the package first, and Rawdah's gold (20 November 2026)

Jibril: "the first part of our website… similar to the sunnah experience and the umrah company. The package and its
main point details… think about the font and the colour… the umrah company's one stands out very nicely, the use of
the golden. We need something similar."

- **The package in one glance** (`PosterHero`, `.rp-pack`): under the poster on phones, beside it on desktop, a
  plaque of deep olive with a fine gold frame: the dates and nights, the Makkah and Madinah hotels, Saudia from
  Heathrow, Eid, Sheikh Yahya, each with a gold icon; then the price (early bird crossed out, ground only, deposit and
  payments) and a gilt "Book your place". Facts computed from the plan only. The same method as the other sites (the
  whole package first); its own form.
- **Rawdah's gold, not theirs.** The Umrah Company is caramel gold (#C59B57) on kiswa black and marble, set in
  Instrument Serif and Outfit, with gold buttons (checked in its repo, 20 Nov 2026). Rawdah's gold is gilt on olive
  and green, after the Rawdah's own pillars (a gold inscription on a green circle in a golden wreath): `--gilt`
  #d3b469, `--gilt-light` #ecdba6, `--gilt-deep` #7d6129 for words on stone; a gilt gradient button (`.btn-gilt`) for
  "Book your place" in the hero, the header, the phone bar and the night; gold labels; gold-edged cards and gold
  numerals in the night. Never on black.
- **Type:** Rawdah's own families stay (Cormorant Garamond, DM Sans, the poster's Montserrat), distinct from theirs;
  headings take more weight (520) to hold the page.

## Sixth pass: the package as a section, gilt words, a five-star stay (20 November 2026)

Jibril: "I didn't want it as a pop up but an actual website section. I like the colours… I want some colours in the
font like The Umrah Company… The Umrah Company looks a bit more premium, especially around where you will stay… the
sticky bar… contrast more with the hero, sectioning it… test a lighter package section then into the animation, or
straight into the animation and that part will be the package part."

- **The package is a section, not a card** (`PackageSection` in `poster-hero.tsx`, `.pkg-*`): full width, after the
  hero and the garden path. A label, a headline with gilt words ("Fourteen nights, *the last ten in Makkah*", after
  the poster's "Last 10 days"), the package note, the six main points (dates and nights, both hotels, Saudia, Eid,
  Sheikh Yahya) with gilt-ringed icons on fine rules (two columns on desktop), then the price and the buttons. Two
  places to compare, `j.pack.at`: `"day"`, a lighter ivory section that fades back to stone so the nightfall's veil
  carries on from it; `"night"`, the first thing the night shows after the Laylat al-Qadr verse. Not wrapped in its
  own chapter, so the night keeps a square top and the veil has no corners.
- **The hero** keeps the poster; beside it on desktop a kicker (Ramadan Umrah 2027 with GGC), the headline "The last
  ten days of Ramadan, *in Makkah*", a line, the price and the buttons. Phones show only the price and the buttons
  under the poster (it says the rest); the headline stays for screen readers.
- **Gilt words** (`gild` and `plain` in `shell.tsx`, `.gild`): words in asterisks in a title come out in Rawdah's
  gilt, in the Cormorant italic; a deep gilt on stone (3:1 at the top of its fall), a light one in the night. The big
  prices take the same gilt. Not The Umrah Company's upright bronze words in its display face.
- **The garden path as a band** (`.skin-1448 .garden-path`): deep olive between fine gilt rules, cream chapters with
  gilt stages, the current chapter as the gilt button. It closes the hero off, and under the header its upper rule
  keeps the two apart. A new first stop, "The package".
- **Where you'll stay, five-star** (`StayShowcase`, `HotelPlates` in `hotel-gallery.tsx`): each hotel's first photo
  stands tall in an arch with a fine gilt line inside (the hosts' arches), its other photos are plates that bring
  themselves into the arch, the name large, its nights in the gilt eight-pointed star with the dates, the walk and the
  meals with gilt icons, the detail, gilt diamonds for the features. The arch opens as it comes into view. No star
  ratings: the hotels' own aren't stated. Not The Umrah Company's wide photo over a row of three with a gold badge.

## Seventh pass: a feature band, the mark in the background, the flight behind (20 November 2026)

Jibril: "I want to see the Rawdah logo faintly in the background. We can have a feature kind of bar below the hero
similar to The Umrah Company; that could be the contrasting thing, so we kinda keep both. Having a whole section for a
plane animation… doesn't make sense; it can be used as something else or in the background."

- **The feature band** (`FeatureBand` in `poster-hero.tsx`, `.feature-band`, `.fb-*`): straight under the hero, what
  the package includes from Rawdah's own poster (its icon row, `plan.perks`: visa, Jumuah in both Harams, seminar,
  baggage, transport, ziyarah, direct flights, the Haramain train), on deep olive between double gilt rules. It is the
  contrast that closes the hero off. Still, never a moving ticker (The Umrah Company's is a black-and-gold ticker;
  ADR 0005 keeps marquees out): four by two on phones, one row of eight from tablets up.
- **The garden path is light again** (ivory frosted, a gilt rule, the current chapter the gilt button), so two dark
  bands don't stack under the hero. Both stay: the band scrolls away, the path sticks.
- **Rawdah's mark, faint** (`.watermark` with `--watermark` on the skin): large and barely there behind the hero's
  words, the package and "Where you'll stay"; a deep gilt on stone, a light one in the night.
- **The flight goes to the background** (`FlightScene bg`, `.flight-bg`): no section of its own. Its arc and plane sit
  faint behind "Getting there" and draw as you scroll through it; the flight cards frost what passes behind them.
