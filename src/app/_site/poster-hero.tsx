import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";

import { anchors, type Journey } from "@/app/_site/content";
import { GardenGlyph, type Stage } from "@/app/_site/garden";
import { HeroFigures } from "@/app/_site/poster-parts";
import { gutter, Heading, Label, PartnerLogo, plain, WaTile } from "@/app/_site/shell";
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
 * The package, as its own section straight after the hero and the garden path (Jibril, 20 Nov 2026: "not a pop up but
 * an actual website section… the package and its main point details"). Its main points with gilt icons, each from the
 * plan, then the price and the buttons. Two places to compare (`j.pack.at`): "day", a lighter section before the night;
 * "night", the first thing the night shows once it has fallen.
 */
export function PackageSection({ j, guest, price, ended, ground, deposit, payments, joinLabel }: Buy & { guest?: Person }) {
  const p = j.pack;
  if (!p) return null;
  const night = p.at === "night";
  const plan = j.plan;
  const mk = plan?.hotels.find((h) => /makkah/i.test(h.city));
  const md = plan?.hotels.find((h) => /madinah/i.test(h.city));
  const out = plan?.flights[0];
  // The poster's 14 nights: the hotels' nights in the plan (10 in Makkah, 4 in Madinah).
  const nights = (plan?.hotels ?? []).reduce((n, h) => n + (Number(h.nights) || 0), 0);
  const dates = j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March");
  const facts: { icon: Stage; big: string; small?: string }[] = [
    { icon: "star", big: dates, small: nights ? `${nights} nights` : undefined },
    ...(mk ? [{ icon: "kaaba" as Stage, big: `${mk.nights} nights in Makkah`, small: mk.name }] : []),
    ...(md ? [{ icon: "dome" as Stage, big: `${md.nights} nights in Madinah`, small: md.name }] : []),
    ...(out ? [{ icon: "plane" as Stage, big: `Return flights with ${out.airline}`, small: "From London Heathrow" }] : []),
    ...(j.eid ? [{ icon: "crescent" as Stage, big: plain(j.eid.title), small: j.eid.label }] : []),
    ...(guest ? [{ icon: "quran" as Stage, big: `With ${guest.label} ${guest.name}`, small: guest.note }] : []),
  ];
  return (
    <section id="package" className={`pkg pkg-${p.at} trip-anchor`}>
      <div className={`pkg-in ${gutter}`}>
        <div className="pkg-head" data-reveal="">
          <Label tone={night ? "canvas" : "ink"}>{p.label}</Label>
          <Heading className="pkg-title">{p.title}</Heading>
          {j.heroNote ? <p className="pkg-note">{j.heroNote}</p> : null}
        </div>
        <ul className="pkg-facts">
          {facts.map((f, i) => (
            <li key={f.big} data-reveal="" data-rv={String(i)}>
              <span className="pkg-icon">
                <GardenGlyph stage={f.icon} className="size-[1.35rem]" />
              </span>
              <span>
                <b>{f.big}</b>
                {f.small ? <small>{f.small}</small> : null}
              </span>
            </li>
          ))}
        </ul>
        <div className="pkg-buy" data-reveal="">
          <PriceLine price={price} ended={ended} ground={ground} deposit={deposit} payments={payments} />
          <Actions j={j} joinLabel={joinLabel} tone={night ? "line-canvas" : "line-ink"} />
        </div>
      </div>
    </section>
  );
}
