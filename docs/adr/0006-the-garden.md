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
