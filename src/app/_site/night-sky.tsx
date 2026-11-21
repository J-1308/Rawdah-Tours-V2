import type { CSSProperties } from "react";

import { GardenCrown } from "@/app/_site/garden";

/**
 * A Ramadan night sky for the Ramadan Umrah 2027 page (Jibril, 17 Nov 2026: the client values good animation):
 * small stars that twinkle in three groups out of step, and on the page head a crescent that fades in.
 * Rawdah's own, used on this trip only. Positions come from a fixed seed, so the server and the browser draw the same
 * sky. Still with reduced motion (styles: "motion: night sky" in globals.css).
 */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Star = { x: number; y: number; r: number; o: number; glow: boolean };

function stars(count: number, seed: number): Star[] {
  const rnd = seeded(seed);
  return Array.from({ length: count }, () => {
    const big = rnd() > 0.82;
    return {
      x: rnd() * 100,
      y: rnd() * 100,
      r: big ? 2.4 + rnd() * 1 : 1.3 + rnd() * 1,
      o: 0.5 + rnd() * 0.5,
      glow: big,
    };
  });
}

export function NightSky({ count = 64, seed = 1448, moon = false, className = "" }: { count?: number; seed?: number; moon?: boolean; className?: string }) {
  const all = stars(count, seed);
  return (
    <div aria-hidden className={`sky ${className}`}>
      <div className="sky-par absolute inset-0">
        {/* Three groups twinkle out of step; the stars in a group are still (Opus review: 64 separate twinkles kept a
            slow phone's main thread busy). */}
        {[0, 1, 2].map((g) => (
          <div key={g} className={`sky-group sky-g${g} absolute inset-0`}>
            {all
              .filter((_, i) => i % 3 === g)
              .map((s, i) => (
                <span key={i} className={`star ${s.glow ? "glow" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.r}px`, height: `${s.r}px`, opacity: s.o }} />
              ))}
          </div>
        ))}
      </div>
      {moon ? (
        <svg className="moon" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e9d4a8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#e9d4a8" stopOpacity="0" />
            </radialGradient>
            <mask id="moon-cut">
              <rect width="100" height="100" fill="#fff" />
              <circle cx="61" cy="42" r="23" fill="#000" />
            </mask>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#moon-glow)" />
          <circle cx="50" cy="50" r="24" fill="#e9d4a8" mask="url(#moon-cut)" />
        </svg>
      ) : null}
    </div>
  );
}

/** Ten stars along a low arc, left to right: the last ten nights, the odd ones gold (as in the hero's ten nights). */
const TEN = Array.from({ length: 10 }, (_, i) => {
  const t = i / 9;
  return { x: 10 + t * 80, y: 70 - Math.sin(Math.PI * t) * 30, odd: i % 2 === 0 };
});

/**
 * Nightfall, at the top of the night chapter (Jibril, 20 Nov 2026: "it needs to tell a story… unique animations"). As
 * the band scrolls in, the day's stone light drains into the night, the crescent rises and ten stars come out one by one:
 * the last ten nights, the odd ones gold. Tied to scrolling where the browser can (globals.css, "nightfall"); otherwise,
 * and with reduced motion, it is simply a night sky.
 */
export function Nightfall({ children }: { children?: React.ReactNode }) {
  return (
    <div className="nightfall">
      {children ? <div className="nf-verse">{children}</div> : null}
      <div aria-hidden className="nf-art">
      <NightSky count={54} seed={27} className="nf-sky" />
      <svg className="nf-moon" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="nf-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e9d4a8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e9d4a8" stopOpacity="0" />
          </radialGradient>
          <mask id="nf-cut">
            <rect width="100" height="100" fill="#fff" />
            <circle cx="61" cy="42" r="23" fill="#000" />
          </mask>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#nf-glow)" />
        <circle cx="50" cy="50" r="24" fill="#e9d4a8" mask="url(#nf-cut)" />
      </svg>
      <span className="nf-ten">
        {TEN.map((s, i) => (
          <span key={i} className={`nf-star ${s.odd ? "nf-odd" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%`, "--n": i } as CSSProperties} />
        ))}
      </span>
      <span className="nf-dusk" />
      </div>
    </div>
  );
}

/**
 * Daybreak, at the foot of the night chapter, before Eid (20 Nov 2026): the nightfall in reverse. As it scrolls past,
 * the stars go out and a gold light rises from below, and the garden chapter comes up over it. Still where scroll
 * timelines aren't supported, and with reduced motion: a night sky warming at the bottom.
 */
export function Daybreak({ children }: { children?: React.ReactNode }) {
  return (
    <div className="daybreak">
      {children ? <div className="db-verse">{children}</div> : null}
      <div aria-hidden className="db-art">
      <NightSky count={40} seed={30} className="db-sky" />
      <span className="db-dawn" />
      {/* The garden grows up into Madinah: the mark's crown, a row of them, rising with the light. */}
      <span className="db-garden">
        {GROW.map((g, i) => (
          <GardenCrown key={i} className="db-plant" style={{ left: `${g.x}%`, height: `${g.h}rem`, "--n": i } as CSSProperties} />
        ))}
      </span>
      </div>
    </div>
  );
}

const GROW = [
  { x: 4, h: 2.2 }, { x: 13, h: 3.4 }, { x: 22, h: 2.6 }, { x: 33, h: 4 }, { x: 44, h: 2.8 },
  { x: 55, h: 3.6 }, { x: 66, h: 2.4 }, { x: 76, h: 3.8 }, { x: 87, h: 2.7 }, { x: 95, h: 3.2 },
];

/**
 * The overnight flight, as a scene that plays as you scroll past it (Jibril, 20 Nov 2026: the last-ten-nights
 * animation "earlier… with the journey"). A window on the sky: dusk over London, night with the stars and the plane
 * crossing on its arc, then dawn and the clock tower rising at the far end. Still without scroll timelines or motion:
 * the night, the plane mid-way, both ends labelled.
 * `bg` (Jibril, 20 Nov 2026: "a whole section for a plane animation doesn't make sense… use it in the background"):
 * only the arc and the plane, faint, behind the section it sits in (Getting there), drawn as you scroll through it.
 */
export function FlightScene({ f, bg = false }: { f: { from: string; fromWhen: string; to: string; toWhen: string }; bg?: boolean }) {
  if (bg) {
    return (
      <div className="flight-scene flight-bg" aria-hidden>
        <svg className="fs-route" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <path d="M70 250 Q500 10 930 250" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 9" vectorEffect="non-scaling-stroke" />
          <path className="fs-trail" d="M70 250 Q500 10 930 250" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="fs-plane-x">
          <span className="fs-plane-y">
            <svg viewBox="0 0 24 24" className="fs-plane">
              <path fill="currentColor" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
            </svg>
          </span>
        </span>
      </div>
    );
  }
  return (
    <div className="flight-scene" role="img" aria-label={`The overnight flight: ${f.from}, ${f.fromWhen}, to ${f.to}, ${f.toWhen}.`}>
      <span className="fs-sky fs-dusk" />
      <span className="fs-sky fs-night" />
      <NightSky count={34} seed={9} className="fs-stars" />
      <span className="fs-sky fs-dawn" />
      <svg className="fs-route" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden>
        <path d="M70 250 Q500 10 930 250" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 9" vectorEffect="non-scaling-stroke" />
        <path className="fs-trail" d="M70 250 Q500 10 930 250" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="fs-plane-x" aria-hidden>
        <span className="fs-plane-y">
          <svg viewBox="0 0 24 24" className="fs-plane">
            <path fill="currentColor" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
          </svg>
        </span>
      </span>
      <svg className="fs-tower" viewBox="0 0 60 160" aria-hidden>
        <path fill="currentColor" d="M28 0h4l1 14h2v10h3v18h4v40h6v88H12V82h6V42h4V24h3V14h2z" />
        <circle cx="30" cy="54" r="6" fill="#e9d29c" />
      </svg>
      <p className="fs-end fs-from">
        <span>{f.from}</span>
        {f.fromWhen}
      </p>
      <p className="fs-end fs-to">
        <span>{f.to}</span>
        {f.toWhen}
      </p>
    </div>
  );
}
