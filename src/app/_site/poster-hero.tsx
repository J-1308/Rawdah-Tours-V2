import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";

import { anchors, type Journey } from "@/app/_site/content";
import { HeroFigures, Mist } from "@/app/_site/poster-parts";
import { gutter, Heading, PartnerLogo, WaTile } from "@/app/_site/shell";
import { Chevron } from "@/app/_site/whatsapp";

type Person = ComponentProps<typeof HeroFigures>["people"][number];

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The last ten nights of Ramadan as ten lights from the logo's square-kufic grid. The odd nights (the 21st, 23rd, 25th,
 * 27th and 29th), when Laylat al-Qadr is sought, are gold. They light one by one after the title (globals.css, `.tn`).
 */
export function TenNights({ className = "" }: { className?: string }) {
  return (
    <span role="img" aria-label="The last ten nights of Ramadan, the odd nights in gold" className={`ten-nights ${className}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className={i % 2 === 0 ? "tn tn-odd" : "tn"} style={{ "--n": i } as CSSProperties} />
      ))}
    </span>
  );
}

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
          <Heading as="h1" className="sr-only">
            Ramadan Umrah 2027: the last ten nights in Makkah, then Eid and four nights in Madinah
          </Heading>
          <TenNights className="rp-nights" />
          <p style={at(760)} className="rh-line rp-line follow">
            {j.heroLine ?? j.tagline}
          </p>
          {j.partnerLogo ? (
            <p style={at(800)} className="rh-with rp-with follow">
              <PartnerLogo logo={j.partnerLogo} className="h-5 text-ink/85" />
              <em>with GGC</em>
            </p>
          ) : null}

          {/* `.ph-buy`: the phone bar waits until this has scrolled away (page-watch.tsx). */}
          <div style={at(880)} className="ph-buy rh-buy rp-buy follow">
            {price ? (
              <div className="rh-price">
                {ended ? <s className="rh-ended">{ended}</s> : null}
                <p className="rh-from">
                  <span className="rh-from-k">From</span> <strong>{price}</strong> <span className="rh-from-k">with flights</span>
                </p>
                <p className="rh-alt">
                  {ground ? <span>{ground} ground only</span> : null}
                  {ground && deposit ? <span aria-hidden> · </span> : null}
                  {deposit ? <span>{deposit} deposit{payments ? `, then ${payments} payments` : ""}</span> : null}
                </p>
              </div>
            ) : null}
            <div className="rh-actions">
              <a href={`#${anchors.join}`} className="btn-ink rh-book">
                {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
              </a>
              <WaTile text={j.waText} trip={j.name} className="rh-wa" />
            </div>
          </div>
          {j.heroNote ? (
            <p style={at(960)} className="ph-note rh-note follow">
              {j.heroNote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
