import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";

import { anchors, type Journey } from "@/app/_site/content";
import { ForWho, Highlights, TripLine, VerseLine } from "@/app/_site/trip-parts";
import { HeroFigures, ICONS, type Perk } from "@/app/_site/poster-parts";
import { Emblem, gutter, Heading, Label, PartnerLogo, WaTile } from "@/app/_site/shell";
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

/** The price and the two buttons, shared by the hero and the package section. */
function PriceLine({ price, ended, ground, deposit, payments, className = "" }: Omit<Buy, "j" | "joinLabel"> & { className?: string }) {
  if (!price) return null;
  return (
    <div className={`rh-price ${className}`}>
      {ended ? <s className="rh-ended">{ended}</s> : null}
      <p className="rh-from">
        <span className="rh-from-k">From</span> <strong>{price}</strong> <span className="rh-from-k">with flights</span>
      </p>
      <p className="rh-alt">
        {ground ? (
          <a href={`#${anchors.join}`} data-pick="ground" className="rp-ground">
            {ground} ground only
          </a>
        ) : null}
        {ground && deposit ? <span aria-hidden> · </span> : null}
        {deposit ? <span>{deposit} deposit{payments ? `, then ${payments} payments` : ""}</span> : null}
      </p>
    </div>
  );
}

function Actions({ j, joinLabel, tone }: { j: Journey; joinLabel: string; tone: "line-ink" | "line-canvas" }) {
  return (
    <div className="rh-actions">
      <a href={`#${anchors.join}`} className="btn-gilt rh-book">
        {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
      </a>
      <WaTile text={j.waText} trip={j.name} tone={tone} className="rh-wa" />
    </div>
  );
}

/**
 * The poster trip's hero (Jibril, 20 Nov 2026: "use the poster as is… cropping it at just above where it says early
 * bird"). Rawdah's own poster, cropped below its logo and above the early-bird box, its stone ground fading into the
 * page's. Beside it on desktop: the trip in a line with its key words in gilt, the price and the buttons; under it on
 * phones, only the price and the buttons (the poster already says the rest). The package itself is the next section
 * (`PackageSection`), never a card on the hero. `j.heroGuest`: Sheikh Yahya stands in front of the poster, blended.
 */
export function PosterHero({ j, guest, price, ended, ground, deposit, payments, joinLabel }: Buy & { guest?: Person }) {
  const withGuest = Boolean(j.heroGuest && guest);
  return (
    <section className={`rp wash-hero relative overflow-hidden ${withGuest ? "rp-guest" : ""}`}>
      {/* Rawdah's mark, large and faint behind the words (Jibril, 20 Nov 2026: "the Rawdah logo faintly in the background"). */}
      <Emblem className="rp-mark watermark pointer-events-none absolute" />
      <div className="rp-grid">
        <div className="rp-poster">
          <Image
            src="/images/brand/ramadan-1448-poster-hero.jpg"
            alt="Rawdah Tours’ poster: 1448 Ramadan, last 10 days, Saturday 27 February to Saturday 13 March; 14 nights; Eid in the Haram; the Ka‘bah and the clock tower."
            width={1080}
            height={890}
            priority
            quality={90}
            sizes="(min-width: 1024px) 46rem, 100vw"
            className="rp-img settle"
          />
          {withGuest && guest ? <HeroFigures className="ph-guest rp-figure" people={[guest]} delay={500} /> : null}
        </div>

        <div className={`rp-copy ${gutter}`}>
          <p style={at(550)} className="rp-kicker follow">
            <span>Ramadan Umrah 2027</span>
            {j.partnerLogo ? (
              <span className="rp-with">
                with <PartnerLogo logo={j.partnerLogo} className="h-[1.05rem]" />
              </span>
            ) : null}
          </p>
          {/* Seen beside the poster on desktop; on phones the poster says it, so it's for screen readers. */}
          <div style={at(650)} className="follow">
            <Heading as="h1" className="rp-title">
              The last ten days of Ramadan, *in Makkah*
            </Heading>
          </div>
          <p style={at(750)} className="rp-line follow">Then Eid in the blessed lands, and four nights in Madinah.</p>
          {/* `.ph-buy`: the phone bar waits until this has scrolled away (page-watch.tsx). */}
          <div style={at(850)} className="ph-buy rp-buy follow">
            <PriceLine price={price} ended={ended} ground={ground} deposit={deposit} payments={payments} />
            <Actions j={j} joinLabel={joinLabel} tone="line-ink" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The journey (Jibril, 20 Nov 2026): the package, the nights and our journey in one section straight after the hero
 * and the garden path, "easy to read and follow". The old home hero's group photo at its top, the title with its gilt
 * words, the journey in a paragraph, then its highlights numbered in the order you live them (the flight, the ten
 * nights and what fills them, Eid, Madinah), the route line with dates, who it's for, the hadith of Umrah in Ramadan,
 * and the price with the buttons. A lighter section before the night (`j.pack.at` "day"; "night" puts it in the night).
 */
export function JourneySection({ j, price, ended, ground, deposit, payments, joinLabel }: Buy & { guest?: Person }) {
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
          {j.heroNote ? <p className="pkg-note">{j.heroNote}</p> : null}
        </div>
        {p.photo ? (
          <figure className="jr-photo" data-reveal="">
            <div className="jr-photo-frame">
              <Image src={p.photo.src} alt={p.photo.alt} width={p.photo.width} height={p.photo.height} sizes="(min-width: 1024px) 40rem, 92vw" quality={85} className="jr-photo-img" />
            </div>
            <figcaption>{p.photo.caption}</figcaption>
          </figure>
        ) : null}
        <div className="pkg-buy jr-buy" data-reveal="">
          <PriceLine price={price} ended={ended} ground={ground} deposit={deposit} payments={payments} />
          <Actions j={j} joinLabel={joinLabel} tone={night ? "line-canvas" : "line-ink"} />
        </div>
        {j.storyPoints?.length ? (
          <div className="jr-points">
            <p className="jr-sub">The journey, step by step</p>
            <Highlights items={j.storyPoints} />
          </div>
        ) : null}
        {j.plan ? (
          <div className="jr-line">
            <TripLine plan={j.plan} draw />
            {j.forWho ? <ForWho items={j.forWho} /> : null}
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
  return (
    <section aria-label="Included in the package" className="feature-band">
      {/* A slow light passes over the gilt now and then; the icons draw themselves in as the band comes into view. */}
      <span aria-hidden className="fb-sheen" />
      <ul className={`fb-list ${gutter}`}>
        {perks.map((p, i) => (
          <li key={p.icon} className="fb-item" data-reveal="" data-rv={String(i)}>
            <svg aria-hidden viewBox="0 0 48 48" className="fb-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[p.icon]}
            </svg>
            <span className="fb-text">
              <b>{p.big}</b> <span>{p.small}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
