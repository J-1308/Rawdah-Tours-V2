import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";

import { anchors, type Journey } from "@/app/_site/content";
import { Highlights, TripLine, VerseLine } from "@/app/_site/trip-parts";
import { HeroFigures, ICONS, type Perk } from "@/app/_site/poster-parts";
import { PosterLockup } from "@/app/_site/poster-type";
import { Emblem, gutter, Heading, Label, PartnerLogo } from "@/app/_site/shell";
import { Chevron } from "@/app/_site/whatsapp";

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
 * Then the two prices side by side, the same shape each, the figures in gold: with flights (with Saudia's mark) and
 * ground only (it opens the booking on ground only), and one gilt button. No line of copy: the poster says it.
 * Phones: the lettering, the artwork, then the prices and the button.
 */
export function LockupHero({ j, guest, price, ended, ground, deposit, payments, joinLabel }: Buy & { guest?: Person }) {
  const withGuest = Boolean(j.heroGuest && guest);
  const dates = j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March");
  return (
    <section className="rl wash-hero relative overflow-hidden">
      <Emblem className="rl-mark watermark pointer-events-none absolute" />
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
              <div className="rl-offer">
                <a href={`#${anchors.join}`} className="rl-tile rl-flights">
                  <span className="rl-tile-words">
                    {ended ? <s className="rl-ended">{ended}</s> : null}
                    <span className="rl-k">With flights</span>
                    <strong className="rl-price">{price}</strong>
                    <span className="rl-sub">per person</span>
                  </span>
                  <Image src="/images/brand/partners/saudia.png" alt="Saudia" width={246} height={311} className="rl-saudia" />
                </a>
                {ground ? (
                  <a href={`#${anchors.join}`} data-pick="ground" className="rl-tile rl-ground">
                    <span className="rl-tile-words">
                      <span className="rl-k">Ground only</span>
                      <strong className="rl-price">{ground}</strong>
                      <span className="rl-sub">your own flights</span>
                    </span>
                  </a>
                ) : null}
              </div>
            ) : null}
            <a href={`#${anchors.join}`} className="btn-gilt rl-book">
              {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
            </a>
            {deposit || j.heroNote ? (
              <p className="rl-note">
                                {[...(deposit ? [`${deposit} deposit${payments ? `, then ${payments} payments` : ""}`] : []), ...(j.heroNote ? j.heroNote.split(" · ") : [])].map((part, i, arr) => (
                  <span key={part} className="whitespace-nowrap">
                    {part}
                    {i < arr.length - 1 ? <span aria-hidden>{"\u00a0·\u00a0"}</span> : null}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
