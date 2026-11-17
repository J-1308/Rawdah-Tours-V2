import type { CSSProperties } from "react";

/**
 * A Ramadan night sky for the Ramadan Umrah 2027 page (Jibril, 17 Nov 2026: the client values good animation):
 * small stars that twinkle at their own pace and drift slowly, and on the page head a crescent that fades in.
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

type Star = { x: number; y: number; r: number; o: number; t: number; d: number; glow: boolean };

function stars(count: number, seed: number): Star[] {
  const rnd = seeded(seed);
  return Array.from({ length: count }, () => {
    const big = rnd() > 0.82;
    return {
      x: rnd() * 100,
      y: rnd() * 100,
      r: big ? 2.4 + rnd() * 1 : 1.3 + rnd() * 1,
      o: 0.5 + rnd() * 0.5,
      t: 2.4 + rnd() * 4.2,
      d: -rnd() * 6,
      glow: big,
    };
  });
}

export function NightSky({ count = 64, seed = 1448, moon = false, className = "" }: { count?: number; seed?: number; moon?: boolean; className?: string }) {
  return (
    <div aria-hidden className={`sky ${className}`}>
      <div className="sky-par absolute inset-0">
        <div className="sky-drift absolute inset-0">
          {stars(count, seed).map((s, i) => (
            <span
              key={i}
              className={`star ${s.glow ? "glow" : ""}`}
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.r}px`, height: `${s.r}px`, "--o": s.o, "--t": `${s.t}s`, "--dl": `${s.d}s` } as CSSProperties}
            />
          ))}
        </div>
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
