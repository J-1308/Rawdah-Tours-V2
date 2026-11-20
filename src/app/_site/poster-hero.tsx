import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";

import { anchors, type Journey } from "@/app/_site/content";
import { HeroFigures, Mist } from "@/app/_site/poster-parts";
import { PosterLockup } from "@/app/_site/poster-type";
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
 * The poster trip's hero, rebuilt 20 Nov 2026 (Jibril: "the hero looks a bit mashed together"). One composition: the
 * poster's artwork with the special guest standing in it; the lockup and the ten nights; one line of when and with whom;
 * one line of what it is; one price; two buttons. Phones: the artwork first, centred. Desktop: the words left, the
 * artwork right, the full first screen.
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
  const dates = j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March");
  return (
    <section className="rh wash-hero relative overflow-hidden">
      <Mist />
      <div className={`rh-grid ${gutter}`}>
        <div className="rh-art">
          <Image
            src="/images/brand/ramadan-1448-art-cut.png"
            alt="The Ka‘bah and the clock tower above Masjid al-Haram, from the GGC × Rawdah poster."
            width={830}
            height={622}
            priority
            sizes="(min-width: 1024px) 46rem, 100vw"
            className="rh-art-img settle"
          />
          {guest ? <HeroFigures className="ph-guest" people={[guest]} delay={400} /> : null}
        </div>

        <div className="rh-copy">
          <Heading as="h1" className="poster-lockup poster-rise rh-title">
            <PosterLockup year="1448" word="Ramadan" line="Last 10 nights" />
          </Heading>
          <TenNights className="rh-nights" />

          <p style={at(760)} className="rh-when follow">
            <span className="poster-date">{dates}</span>
            {j.partnerLogo ? (
              <span className="rh-with">
                <PartnerLogo logo={j.partnerLogo} className="h-5 text-ink/85" />
                <em>with GGC</em>
              </span>
            ) : null}
          </p>
          <p style={at(840)} className="rh-line follow">
            {j.heroLine ?? j.tagline}
          </p>

          {/* `.ph-buy`: the phone bar waits until this has scrolled away (page-watch.tsx). */}
          <div style={at(920)} className="ph-buy rh-buy follow">
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
            <p style={at(1000)} className="ph-note rh-note follow">
              {j.heroNote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
