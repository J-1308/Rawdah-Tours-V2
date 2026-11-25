import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";

import { anchors, type Journey } from "@/app/_site/content";
import { Highlights, TripLine, VerseLine } from "@/app/_site/trip-parts";
import { HeroFigures, ICONS, type Perk } from "@/app/_site/poster-parts";
import { PosterLockup } from "@/app/_site/poster-type";
import { Emblem, gutter, Heading, Label, PartnerLogo } from "@/app/_site/shell";
import { Chevron } from "@/app/_site/whatsapp";
import { HeroLook } from "@/app/_site/hero-look";

type Person = ComponentProps<typeof HeroFigures>["people"][number];

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type Buy = {
  j: Journey;
  price?: string;
  ended?: string;
  ground?: string;
  deposit?: string;
  payments?: number;
  joinLabel: string;
};

/**
 * The journey (Jibril, 20 Nov 2026): the package, the nights and our journey in one section straight after the hero
 * and the garden path, "easy to read and follow". The old home hero's group photo at its top, the title with its gilt
 * words, the journey in a paragraph, then its highlights numbered in the order you live them (the flight, the ten
 * nights and what fills them, Eid, Madinah), the route line with dates and the hadith of Umrah in Ramadan. No price
 * or buttons here (the hero and the phone bar carry them) and no "who it's for" cards (the questions answer them). A lighter section before the night (`j.pack.at` "day"; "night" puts it in the night).
 */
export function JourneySection({ j }: { j: Journey }) {
  const p = j.pack;
  if (!p) return null;
  const night = p.at === "night";
  return (
    <section id="journey" className={`pkg pkg-${p.at} trip-anchor`}>
      <Emblem className="pkg-mark watermark pointer-events-none absolute" />
      <div className={`pkg-in jr ${gutter}`}>
        <div className="jr-head" data-reveal="">
          <Label tone={night ? "canvas" : "ink"}>{p.label}</Label>
          <Heading className="section-title pkg-title">{p.title}</Heading>
          {j.about ? <p className="jr-lead">{j.about.text}</p> : null}
        </div>
        {p.photo ? (
          <figure className="jr-photo" data-reveal="">
            <div className="jr-photo-frame">
              <Image src={p.photo.src} alt={p.photo.alt} width={p.photo.width} height={p.photo.height} sizes="(min-width: 1024px) 40rem, 92vw" quality={85} className="jr-photo-img" />
            </div>
            <figcaption>{p.photo.caption}</figcaption>
          </figure>
        ) : null}
        {j.storyPoints?.length ? (
          <div className="jr-points">
            <p className="jr-sub">The journey, step by step</p>
            <Highlights items={j.storyPoints} />
          </div>
        ) : null}
        {j.plan ? (
          <div className="jr-line">
            <TripLine plan={j.plan} draw />
          </div>
        ) : null}
        {j.verses?.open ? <VerseLine v={j.verses.open} className="jr-verse verse-open" /> : null}
      </div>
    </section>
  );
}

/**
 * The feature band under the hero (Jibril, 20 Nov 2026: "a feature kind of bar below the hero similar to The Umrah
 * Company… that could be the contrasting thing"). What the package includes, from Rawdah's own poster (its icon row,
 * `plan.perks`), on deep olive between gilt rules: the contrast that closes the hero off. Animated in Rawdah's way
 * (Jibril, 20 Nov 2026: "animate the dark bar"): each icon draws itself in gilt line by line, and a slow light crosses
 * the band now and then, like light on gold leaf. Not a moving ticker (The Umrah Company's, ADR 0005). One row on
 * desktop, four by two on phones.
 */
export function FeatureBand({ perks }: { perks: Perk[] }) {
  if (!perks.length) return null;
  const item = (p: Perk, i: number, copy: boolean) => (
    <li key={p.icon} className="fb-item" data-reveal={copy ? undefined : ""} data-rv={copy ? undefined : String(i)}>
      <svg aria-hidden viewBox="0 0 48 48" className="fb-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[p.icon]}
      </svg>
      <span className="fb-text">
        <b>{p.big}</b> <span>{p.small}</span>
      </span>
    </li>
  );
  return (
    <section aria-label="Included in the package" className="feature-band">
      {/* A slow light passes over the gilt now and then; the icons draw themselves in as the band comes into view. */}
      <span aria-hidden className="fb-sheen" />
      {/* Phones: one row that moves on its own (Jibril, 20 Nov 2026: "a moving bar on the phone as it's too long… 1
          layer"), so the list runs twice; the copy is hidden from screen readers. Wider screens: one still row. */}
      <div className="fb-track">
        <ul className={`fb-list ${gutter}`}>{perks.map((p, i) => item(p, i, false))}</ul>
        <ul aria-hidden className={`fb-list fb-copy ${gutter}`}>
          {perks.map((p, i) => item(p, i, true))}
        </ul>
      </div>
    </section>
  );
}

/**
 * The hero (Jibril, 20 Nov 2026: "the one closest to the screenshot… show more than we say, and not repeat ourselves…
 * the price should be golden… ground package on the hero as well… gold in key points"). The poster's artwork on one
 * side, our words in its tablets (Eid in the blessed lands, 14 nights) and Sheikh Yahya standing in it; on the other the
 * lettering as the poster sets it, in olive (1448, RAMADAN, LAST 10 NIGHTS), the dates in the italic and "with GGC".
 * Then one line with the two prices in gold over their labels, each a link (ground only opens the booking on ground
 * only), and the gilt button. Simpler since 21 Nov 2026 ("the hero should be one photo and no extra stuff", but
 * "Yahya Raaby must be in the hero"): no price tiles, no Saudia mark, no early bird, no small print under the button.
 * Phones: the lettering, the artwork, then the prices and the button.
 */
/**
 * Ten lamps for the last ten nights, hung either side of the hero on desktop (22 Nov 2026). Left to right they are nights
 * 21 to 30 and light one after another as the page opens; the odd nights, when Laylat al-Qadr is sought, burn a little
 * brighter. Decoration only: hidden below desktop width and from screen readers. `x` is the distance from the page's
 * edge in %, `len` the cord in px.
 */
const LAMPS = [
  { side: "l", x: 4, len: 120 },
  { side: "l", x: 8.5, len: 380 },
  { side: "l", x: 13, len: 52 },
  { side: "l", x: 17.5, len: 250 },
  { side: "l", x: 22, len: 150 },
  { side: "r", x: 22, len: 64 },
  { side: "r", x: 17.5, len: 236 },
  { side: "r", x: 13, len: 120 },
  { side: "r", x: 8.5, len: 330 },
  { side: "r", x: 4, len: 170 },
] as const;

function HeroLamps() {
  return (
    <div aria-hidden className="rl-lamps">
      {LAMPS.map((l, i) => (
        <span
          key={i}
          className={`rl-lamp rl-lamp-${l.side}${i % 2 === 0 ? " rl-lamp-odd" : ""}`}
          style={{ "--x": `${l.x}%`, "--len": `${l.len}px`, "--i": i } as CSSProperties}
        >
          <span className="rl-lamp-glow" />
          <svg viewBox="0 0 38 72" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
            <circle cx="19" cy="3" r="2.6" />
            <path d="M11.5 17 Q19 4.5 26.5 17 Z" />
            <path d="M8.5 17 H29.5 L31.5 21.5 H6.5 Z" />
            <path d="M7.5 21.5 L10 50 H28 L30.5 21.5" />
            <path className="rl-lamp-light" d="M14 27 Q19 20.5 24 27 V45 H14 Z" />
            <path d="M10 50 H28 L24.5 57 H13.5 Z" />
            <path d="M19 57 V66" />
            <circle cx="19" cy="68.5" r="1.8" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function LockupHero({ j, guest, price, ground, joinLabel }: Buy & { guest?: Person }) {
  const withGuest = Boolean(j.heroGuest && guest);
  const dates = j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March");
  return (
    <section className="rl rl-simple wash-hero relative overflow-hidden">
      <Emblem className="rl-mark watermark pointer-events-none absolute" />
      <HeroLamps />
      <div className="rl-grid">
        <div className={`rl-head ${gutter}`}>
          <h1 className="poster-lockup rl-lockup">
            <span className="sr-only">Ramadan Umrah 2027: </span>
            <PosterLockup year="1448" word="Ramadan" line="Last 10 nights" />
          </h1>
          <p style={at(650)} className="poster-date rl-date follow">
            {dates}
          </p>
          {j.partnerLogo ? (
            <p style={at(740)} className="rl-with follow">
              <em>with</em>
              <PartnerLogo logo={j.partnerLogo} className="h-6" />
            </p>
          ) : null}
        </div>
        <div className="rl-art">
          <Image
            src="/images/brand/ramadan-1448-art-cut.png"
            alt="The Ka‘bah and the clock tower, from Rawdah’s poster."
            width={830}
            height={622}
            priority
            quality={90}
            sizes="(min-width: 1024px) 46rem, 100vw"
            className="rl-art-img settle"
          />
          {/* Our words in the poster's tablets. */}
          <p aria-hidden className="rl-tablet rl-tablet-eid">
            <b>Eid</b>
            <em>in the</em>
            <span>Blessed lands</span>
          </p>
          <p aria-hidden className="rl-tablet rl-tablet-nights">
            <b>14</b>
            <span>Nights</span>
          </p>
          {withGuest && guest ? <HeroFigures className="ph-guest rl-figure" people={[guest]} delay={500} /> : null}
        </div>
        <div className={`rl-foot ${gutter}`}>
          {/* `.ph-buy`: the phone bar waits until this has scrolled away (page-watch.tsx). */}
          <div style={at(860)} className="ph-buy rl-buy follow">
            {price ? (
              <p className="rl-line">
                <a href={`#${anchors.join}`} className="rl-line-item">
                  <strong className="rl-line-price">{price}</strong>
                  <span>with flights</span>
                </a>
                {ground ? (
                  <a href={`#${anchors.join}`} data-pick="ground" className="rl-line-item">
                    <strong className="rl-line-price">{ground}</strong>
                    <span>ground only</span>
                  </a>
                ) : null}
              </p>
            ) : null}
            <a href={`#${anchors.join}`} className="btn-gilt rl-book">
              {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The Ramadan hero (Jibril, 24 Nov 2026). First pass ("something is off… this empty feeling… the face is prominent"): a
 * clean hero, the words on the left and a large photo on the right, which he liked ("it looked clean… the image was
 * the perfect size"). Second pass: the original hero's wording (1448 / RAMADAN / LAST 10 NIGHTS, the dates, with GGC,
 * 14 nights and Eid in the blessed lands) in that layout, with the journey's group photo, in a dark and a light version
 * (`data-look`; `?hero=light` previews the light one, hero-look.tsx). The photo at its own shape, never cropped; Sheikh
 * Yahya as a credit; one gold button; the ten lamps along the top on desktop. Third pass ("fit some of the poster
 * elements"): on desktop the poster's Makkah rises behind the photo with its EID and 14 NIGHTS tablets either side of
 * the tower, and the prices are the poster's, large and gold. Phones: the photo, then the words.
 */
export function NightHero({ j, guest, price, ground, deposit, joinLabel, waHref }: Buy & { guest?: Person; waHref: string }) {
  const dates = j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March");
  const photo = j.heroPhoto;
  return (
    <section className="nh" data-look="dark">
      <HeroLook />
      <HeroLamps />
      <div className={`nh-grid ${gutter}`}>
        {photo ? (
          <div className="nh-stage">
            {/* Desktop: the poster's Makkah (the clock tower and the Ka'bah) rises behind the photo, with its two tablets
                either side of the tower, as on the poster (25 Nov 2026: "fit some of the poster elements"). */}
            <div aria-hidden className="nh-art">
              <Image src="/images/brand/ramadan-1448-art-cut.png" alt="" width={830} height={622} quality={85} sizes="36vw" className="nh-art-img settle" />
              <p className="rl-tablet rl-tablet-eid follow" style={at(900)}>
                <b>Eid</b>
                <em>in the</em>
                <span>Blessed lands</span>
              </p>
              <p className="rl-tablet rl-tablet-nights follow" style={at(980)}>
                <b>14</b>
                <span>Nights</span>
              </p>
            </div>
            <figure className="nh-photo settle">
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} priority quality={85} sizes="(min-width: 1024px) 58vw, 100vw" />
            </figure>
          </div>
        ) : null}
        <div className="nh-words">
          <h1 className="poster-lockup nh-lockup">
            <span className="sr-only">Ramadan Umrah 2027: </span>
            <PosterLockup year="1448" word="Ramadan" line="Last 10 nights" />
          </h1>
          <p style={at(650)} className="nh-dates follow">
            {dates}
          </p>
          <p style={at(720)} className="nh-meta follow">
            {/* On desktop the poster's tablets say these, by the tower. */}
            <span className="nh-fact">14 nights</span>
            <span aria-hidden className="nh-fact">·</span>
            <span className="nh-fact">Eid in the blessed lands</span>
            {j.partnerLogo ? (
              <>
                <span aria-hidden className="nh-with-dot">·</span>
                <span className="nh-with">
                  <em>with</em>
                  <PartnerLogo logo={j.partnerLogo} className="h-[1rem]" />
                </span>
              </>
            ) : null}
          </p>
          {guest ? (
            <p style={at(800)} className="nh-guest follow">
              {guest.photo ? <Image src={guest.photo.src} alt="" width={96} height={96} className={`nh-guest-img ${guest.photo.position ?? ""}`} /> : null}
              <span>
                <span className="nh-guest-role">Special guest</span>
                <span className="nh-guest-name">
                  {guest.label} {guest.name}
                </span>
              </span>
            </p>
          ) : null}
          {/* `.ph-buy`: the phone bar waits until this has scrolled away (page-watch.tsx). */}
          <div style={at(880)} className="ph-buy nh-buy follow">
            {/* The poster's prices: large, in gold. */}
            {price ? (
              <p className="rl-line nh-line">
                <a href={`#${anchors.join}`} className="rl-line-item">
                  <strong className="rl-line-price">{price}</strong>
                  <span>with flights</span>
                </a>
                {ground ? (
                  <a href={`#${anchors.join}`} data-pick="ground" className="rl-line-item">
                    <strong className="rl-line-price">{ground}</strong>
                    <span>ground only</span>
                  </a>
                ) : null}
              </p>
            ) : null}
            <a href={`#${anchors.join}`} className="btn-gilt nh-book">
              {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
            </a>
            <p className="nh-small">
              {deposit ? <>A {deposit} deposit holds your place. </> : null}
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                Or ask us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
