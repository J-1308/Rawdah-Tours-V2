# 0003 — A dark variant with the beige logo (exploration)

Date: 25 October 2026 · Status: proposed, on branch `feat/v2-dark`

## Context

Jibril likes the soft cream site (ADR 0002, branch `feat/v2-rebuild`) and wants it kept exactly as it is. He
asked to see a second version with the **beige (cream) logo**, which needs a dark ground, and a darker theme
generally, "maybe just the top of the website, or maybe the whole website".

## Decision

Build the whole site in a night palette on its own branch, so the two can be compared side by side on their
own Vercel previews. Nothing on `feat/v2-rebuild` changes.

- Same token names with night values: `canvas` is the ground (#1B1410 espresso), `ink` the text (#EFE4D2
  cream), `cream` stays light for words on panels and photographs. Most of the kit flips on its own.
- The beige logo: the traced lockup in cream in the header and footer; icons are the beige mark on espresso.
- Panels (`.panel-dark`) become a raised, warmly lit surface (#2A1F19 with sand and clay glows).
- Glass cards are faint cream on dark; primary buttons are a sand gradient with dark text.
- Selected states invert (cream ground, dark text). Tags over photographs are dark glass.
- **The top is new:** the golden-hour photo on the roof of Masjid an-Nabawi dissolves into the night
  (`.night-photo` masks): the right side on desktop, the top on phones, with the headline on the dark.
  A second photo and the Hajj 2027 note float over the dissolving edge.
- The paper grain is light on dark; watermarks are quieter.

## Consequences

Two live previews to compare. If the dark one is chosen, merge `feat/v2-dark`; if the light one, close it.
A mixed option (dark top, light body) is possible later by porting the hero alone.
