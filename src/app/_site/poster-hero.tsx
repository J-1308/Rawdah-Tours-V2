import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";

import { anchors, type Journey } from "@/app/_site/content";
import { GardenGlyph, type Stage } from "@/app/_site/garden";
import { HeroFigures } from "@/app/_site/poster-parts";
import { gutter, Heading, PartnerLogo, WaTile } from "@/app/_site/shell";
import { Chevron } from "@/app/_site/whatsapp";

type Person = ComponentProps<typeof HeroFigures>["people"][number];

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The poster trip's hero, third version (Jibril, 20 Nov 2026: "maybe use the poster as is… cropping it at just above
 * where it says early bird and the photos. make it blend nicely"). Rawdah's own poster is the hero: cropped below its
 * logo (the header carries the logo) and above the early-bird box and the portraits, its stone ground fading into the
 * page's. The price, the buttons and the line are live text under it on phones (the poster was made for a phone) and
 * beside it on desktop. `j.heroGuest`: Sheikh Yahya stands in front of the poster, blended.
 */
export function PosterHero({
  j,
  guest,
  price,
  ended,
  ground,
  deposit,
  payments,
  joinLabel,
}: {
  j: Journey;
  guest?: Person;
  price?: string;
  ended?: string;
  ground?: string;
  deposit?: string;
  payments?: number;
  joinLabel: string;
}) {
  const withGuest = Boolean(j.heroGuest && guest);
  const plan = j.plan;
  const mk = plan?.hotels.find((h) => /makkah/i.test(h.city));
  const md = plan?.hotels.find((h) => /madinah/i.test(h.city));
  const out = plan?.flights[0];
  const nights = (plan?.hotels ?? []).reduce((n, h) => n + (Number(h.nights) || 0), 0);
  const dates = j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March");
  const facts: { icon: Stage; big: string; small?: string }[] = [
    { icon: "star", big: dates, small: nights ? `${nights} nights` : undefined },
    ...(mk ? [{ icon: "kaaba" as Stage, big: `${mk.nights} nights in Makkah`, small: mk.name }] : []),
    ...(md ? [{ icon: "dome" as Stage, big: `${md.nights} nights in Madinah`, small: md.name }] : []),
    ...(out ? [{ icon: "plane" as Stage, big: `Return flights with ${out.airline}`, small: "From London Heathrow" }] : []),
    ...(j.eid ? [{ icon: "crescent" as Stage, big: j.eid.title }] : []),
    ...(guest ? [{ icon: "quran" as Stage, big: `With ${guest.label} ${guest.name}`, small: guest.note }] : []),
  ];
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

        {/* The package in one glance, as a gilded plaque (Jibril, 20 Nov 2026: "the first part… the package and its main
            point details… the use of the golden"): Rawdah's gold on olive, after the gold-on-green of the Rawdah's
            pillars; never The Umrah Company's gold on black. Facts from the plan only. */}
        <div className={`rp-copy ${gutter}`}>
          <Heading as="h1" className="sr-only">
            Ramadan Umrah 2027: the last ten nights in Makkah, then Eid and four nights in Madinah
          </Heading>
          <div style={at(700)} className="rp-pack follow">
            <p className="rp-pack-k">
              <span>Ramadan Umrah 2027</span>
              {j.partnerLogo ? (
                <span className="rp-pack-with">
                  with <PartnerLogo logo={j.partnerLogo} className="h-4" />
                </span>
              ) : null}
            </p>
            {facts.length ? (
              <ul className="rp-pack-list">
                {facts.map((f) => (
                  <li key={f.big}>
                    <GardenGlyph stage={f.icon} className="rp-pack-icon" />
                    <span>
                      <b>{f.big}</b>
                      {f.small ? <small>{f.small}</small> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {/* `.ph-buy`: the phone bar waits until this has scrolled away (page-watch.tsx). */}
            <div className="ph-buy rp-pack-buy">
              {price ? (
                <div className="rp-pack-price">
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
              ) : null}
              <div className="rh-actions">
                <a href={`#${anchors.join}`} className="btn-gilt rh-book">
                  {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
                </a>
                <WaTile text={j.waText} trip={j.name} tone="line-canvas" className="rh-wa" />
              </div>
            </div>
            {j.heroNote ? <p className="rp-pack-note">{j.heroNote}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
