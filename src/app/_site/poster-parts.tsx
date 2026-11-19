import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * The poster's mist: three soft clouds drifting very slowly over the stone, and the crescent from the top of the
 * clock tower, faint. Transform-only, paused off screen (page-watch.tsx watches `.sky`), still with reduced motion.
 */
export function Mist() {
  return (
    <div aria-hidden className="sky mist">
      <span className="cloud c1" />
      <span className="cloud c2" />
      <span className="cloud c3" />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* The poster's icon row: what's included (19 Nov 2026). Line icons drawn for Rawdah, olive on stone. */

const ICONS: Record<string, ReactNode> = {
  visa: (
    <>
      <rect x="9" y="5" width="22" height="34" rx="3" />
      <circle cx="20" cy="17" r="5.5" />
      <ellipse cx="20" cy="17" rx="2.3" ry="5.5" />
      <path d="M14.5 17h11M14 28h12M14 32.5h8" />
      <circle cx="34.5" cy="34.5" r="6.5" />
      <path d="m31.6 34.6 2 2 3.9-4" />
    </>
  ),
  harams: (
    <>
      <path d="M7 40V23l8-4 8 4v17zM7 27.5l8-4 8 4" />
      <path d="M26 40v-9a8 8 0 0 1 16 0v9z" />
      <path d="M34 23v-3M23 40h20M3.5 40V15M3.5 15l-1.5-4h3zM45.5 40V15M45.5 15l-1.5-4h3z" />
    </>
  ),
  seminar: (
    <>
      <rect x="21" y="6" width="22" height="16" rx="1.5" />
      <path d="M28.5 11h7v7h-7zM28.5 13h7M32 22v4" />
      <circle cx="11" cy="15" r="4" />
      <path d="M4.5 29a6.5 6.5 0 0 1 13 0" />
      <path d="M3 29h17l-2 11H5z" />
    </>
  ),
  bags: (
    <>
      <rect x="6" y="13" width="17" height="25" rx="3" />
      <path d="M11 13V8.5h7V13M11 18v15M18 18v15" />
      <rect x="27" y="19" width="15" height="19" rx="3" />
      <path d="M31.5 19v-4h6v4M34.5 23v11" />
      <circle cx="10" cy="41" r="1.4" />
      <circle cx="19" cy="41" r="1.4" />
      <circle cx="31" cy="41" r="1.4" />
      <circle cx="38" cy="41" r="1.4" />
    </>
  ),
  bus: (
    <>
      <rect x="6" y="7" width="36" height="29" rx="4" />
      <path d="M10 12h28v10H10zM6 27h36M11 31.5h3M34 31.5h3" />
      <circle cx="14" cy="38.5" r="3" />
      <circle cx="34" cy="38.5" r="3" />
    </>
  ),
  ziyarah: (
    <>
      <path d="M3 39 18 15l8 12 5-7 14 19z" />
      <path d="m14.4 20.8 3.6 2.4 3.4-2.6" />
    </>
  ),
  plane: (
    <path d="M41.5 7.5c-1.6-1.6-4.2-1.2-5.8.4L29.4 14 13.5 9.8l-3.2 3.2L23 20.6l-6 6.1-5-.8-2.3 2.3 6.2 3 3 6.2 2.3-2.3-.8-5 6.1-6 7.6 12.7 3.2-3.2L34 18.6l6.1-6.3c1.6-1.6 2-3.2 1.4-4.8z" />
  ),
  train: (
    <>
      <path d="M4 35h29c6 0 10-3 10-7.5C43 20 33 13 18 13H4z" />
      <path d="M9 18h11.5l4 6H9zM4 29h37M8 41h32" />
    </>
  ),
};

export type Perk = { icon: keyof typeof ICONS | string; big: string; small: string };

export function PosterPerks({ perks, className = "" }: { perks: Perk[]; className?: string }) {
  return (
    <ul className={`poster-perks ${className}`}>
      {perks.map((p) => (
        <li key={p.icon} className="perk">
          <svg aria-hidden viewBox="0 0 48 48" className="perk-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {ICONS[p.icon]}
          </svg>
          <span className="perk-text">
            <span className="perk-big">{p.big}</span> <span className="perk-small">{p.small}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------------ */
/* The poster's team row: round portraits, the role in small capitals over the name (19 Nov 2026). */

export type PosterPerson = {
  label: string;
  name: string;
  note?: string;
  photo?: { src: string; alt: string; position?: string };
  cut?: { src: string; width: number; height: number };
};

export function PosterTeam({ people, className = "" }: { people: PosterPerson[]; className?: string }) {
  return (
    <ul className={`poster-team ${className}`} style={{ "--n": people.length } as CSSProperties}>
      {people.map((p) => (
        <li key={p.name} className="poster-person">
          <span className="poster-face">
            {p.photo ? <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 640px) 10rem, 6.5rem" quality={85} className={`object-cover ${p.photo.position ?? "object-[50%_25%]"}`} /> : null}
          </span>
          <span className="poster-role">{p.label}</span>
          <span className="poster-name">{p.name}</span>
          {p.note ? <span className="poster-note">{p.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/**
 * The people standing in the poster hero (Jibril, 19 Nov 2026: "our sheikhs" in the empty desktop hero, Sheikh Yahya
 * blended into the phone hero). Their portraits cut out of the background, fading into the mist at the shoulders
 * and below, with the role and name over the fade. Desktop: either side of the artwork. Phone: Sheikh Yahya inside it.
 */
export function HeroFigures({ people, className = "", delay = 450 }: { people: PosterPerson[]; className?: string; delay?: number }) {
  return (
    <div className={className}>
      {people.map((p, i) =>
        p.cut ? (
          <figure key={p.name} className="ph-figure follow" style={{ "--d": `${delay + i * 120}ms` } as CSSProperties}>
            <Image src={p.cut.src} alt={`${p.label} ${p.name}`} width={p.cut.width} height={p.cut.height} sizes="(min-width: 1024px) 24rem, 45vw" quality={85} />
            <figcaption>
              <span className="poster-role">{p.label}</span>
              <span className="ph-figure-name">{p.name}</span>
              {p.note ? <span className="ph-figure-note">{p.note}</span> : null}
            </figcaption>
          </figure>
        ) : null,
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/**
 * The Ramadan page's own opening (Jibril, 19 Nov 2026): the poster's stone and mist, the olive Rawdah mark as at the
 * top of the poster, "1448" closing in from wide spacing, then the screen lifts like a curtain as the title rises.
 * It plays when someone arrives from another page of the site (set before paint by the head script in layout.tsx on
 * a full load, or by ArrivalTrigger on an in-site link). Arrivals from outside (Instagram) go straight to the page.
 * Shown only with html.motion and html[data-arrival] (globals.css, "The Ramadan opening").
 */
export function Arrival({ logo }: { logo: ReactNode }) {
  return (
    <div aria-hidden className="arrival">
      <div className="arrival-inner">
        <span className="arrival-logo">{logo}</span>
        <span className="arrival-year">1448</span>
        <span className="arrival-line" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Hero versions to compare (preview, 19 Nov 2026). Chosen by ?hero= (layout.tsx head script sets html[data-hero]). */

/** The poster's bottom bar, rebuilt live: the price on the olive panel with the Saudia mark, and the ground package. */
export function HeroOffer({ from, ended, ground, phone }: { from: string; ended?: string; ground?: string; phone: { href: string; display: string } }) {
  return (
    <div className="hero-offer">
      <div className="offer-olive">
        <div className="offer-price">
          {ended ? <s className="offer-ended">{ended}</s> : null}
          <span className="offer-from">From</span>
          <span className="offer-big">{from}</span>
          <span className="offer-sub">with flights</span>
        </div>
        <span aria-hidden className="offer-rule" />
        <Image src="/images/brand/partners/saudia-on-olive.png" alt="Saudia" width={96} height={108} className="offer-saudia" />
      </div>
      {ground ? (
        <a href={phone.href} className="offer-ground">
          <span className="offer-ground-l">
            Ground package <em>available</em>
          </span>
          <span className="offer-ground-r">
            <span className="offer-ground-price">{ground}</span> Enquire
          </span>
        </a>
      ) : null}
    </div>
  );
}
