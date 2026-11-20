# 0005 — The Ramadan page as a story, with motion of Rawdah's own

Date: 20 November 2026 · Status: accepted · Amends the Motion row of 0001's table. Keeps 0001's rule that nothing may
look or read like The Umrah Company's site, and 0002's soft, blended finish.

## Context

Jibril, on the live one-page site: "its got this premium 5 star feel but the hero looks a bit mashed together. Also the
order of things. it need to tell a story… unique animations. Especially since both the umrah company and the sunnah
experience have great animations… you can always contact and book but we need to be cohesive."

The hero had grown piece by piece: the artwork, a tablet that swapped "14 nights" and "Eid in the blessed lands", the
guest standing in the art, the lockup, the dates, the partner, a line, an olive price box with the Saudia logo, a
ground-package box, a button, a note, the two hosts (phones) and a sliding icon strip. Four type styles in one screen.
The page order wandered: why Rawdah and our last trip came before the nights and the flights.

Both other sites use a sliding feature strip; The Umrah Company also uses items that rise as you scroll (0001 already
lists marquee, rising items and stepper fill as theirs). Rawdah's page was doing both.

## Decision

**Hero (`poster-hero.tsx`).** One composition: the poster's artwork with the special guest standing in it; the lockup;
ten lights for the last ten nights; one line of dates and partner; one line of what it is; one price line (the ended
early bird crossed out, ground-only price, deposit and number of payments); Book and WhatsApp side by side; the
package note. Three faces, each with one job: Montserrat for the poster's words and the price, Cormorant italic for
the dates, DM Sans for the rest. Phones: centred, artwork first. Desktop: words left, artwork right, the first screen.
Removed: the tablet, the price boxes, the hosts in the hero, the icon strip.

**Order.** The trip → the people → nightfall into the Ramadan nights → flights and hotels → what's included → our last
trip → why Rawdah → packages and payments → book (phones; desktop keeps the panel beside the story) → questions → the
form. Why first, then who, then how, then proof, then price.

**Motion, all from Rawdah's own material:**

| Moment | What it does | Where |
|---|---|---|
| The ten nights | Ten squares from the logo's kufic grid light one by one after the title; the odd nights (when Laylat al-Qadr is sought) are gold and breathe slowly, out of step, like lamps | hero, `.ten-nights` |
| Nightfall | As the night sheet scrolls in, the day's stone light drains to night, the crescent rises, the sky fills and ten stars come out one by one along an arc: the ten nights again | top of the night chapter, `Nightfall` in `night-sky.tsx`, CSS scroll timeline |
| Focus-in | Things come into focus as they scroll in (blur and a breath of scale), not the slide-up | every page, `.rv` |
| Developing photos | The last trip's photos come up from a pale warm print to full colour | `PastTrips`, `.past-gallery`, `.past-lead` |
| Settle | The artwork and lockup settle in on load (unchanged) | hero |

No marquee, no slide-up reveals, no stepper fill, no countdown (The Sunnah Experience's). Everything is still without
`html.motion` (reduced motion), and the nightfall is a still night sky where scroll timelines aren't supported.

**Contact and book, always:** the sticky header (WhatsApp and Book on desktop; call and WhatsApp on phones), the phone
bar, Book and WhatsApp in the hero, the join panel and the form. The conversion method 0001 allows sharing.

## Consequences

- `PerkTicker` and the old `.ph-tab`, `.hero-offer` styles are no longer used on the Ramadan page.
- New poster trips get the same hero and order by setting `posterType`.
- Any new motion should come from Rawdah's material (the kufic grid, the poster, the nights, the garden) and pass the
  0001 check.
