import type { CSSProperties } from "react";

/**
 * The garden (Jibril, 20 Nov 2026: "Since rawdah means garden… that should be our design direction"). Rawdah's mark
 * is already a garden: the word روضة in square kufic, crowned with a plant of five leaves and a seed-drop, with leaves
 * scattered through it. These are its shapes, drawn small: the stages the garden path grows through, the leaves of the
 * backdrop, and the crown. See docs/adr/0006-the-garden.md.
 */

export type Stage =
  | "seed" | "sprout" | "palm" | "crescent" | "garden" | "leaf" | "bloom" | "gate"
  /* Closer to the deen (Jibril, 20 Nov 2026: "a bit more spiritual… as close as possible"): the Ka‘bah, a Ramadan
     lantern, the Green Dome, a minaret, a mus‘haf on its rehal, the eight-pointed star, a mihrab. */
  | "kaaba" | "lantern" | "dome" | "minaret" | "quran" | "star" | "mihrab"
  /* Practical, drawn the same way. */
  | "plane";

/** One stage of the garden, in a 24-unit square, in the current colour. */
export function GardenGlyph({ stage, className = "" }: { stage: Stage; className?: string }) {
  const stem = (y: number) => <path d={`M12 21.5V${y}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      {stage === "seed" ? (
        <path d="M12 6.5c2.7 3.1 3.5 5.7 3.5 7.6A3.5 3.5 0 0 1 12 17.6a3.5 3.5 0 0 1-3.5-3.5c0-1.9.8-4.5 3.5-7.6z" />
      ) : stage === "sprout" ? (
        <>
          {stem(13)}
          <path d="M12 14.6c-1-3.6-3.9-5.3-7.2-5.1.3 3.5 3.1 5.5 7.2 5.1z" />
          <path d="M12 12.8c.8-3.7 3.7-5.7 7.2-5.7-.1 3.6-3 5.8-7.2 5.7z" />
        </>
      ) : stage === "palm" ? (
        <>
          {stem(12)}
          <path d="M12 12.2c-2.3-2.7-5.6-3.3-8.5-2.1 1.9 2.5 5.1 3.3 8.5 2.1z" />
          <path d="M12 12.2c2.3-2.7 5.6-3.3 8.5-2.1-1.9 2.5-5.1 3.3-8.5 2.1z" />
          <path d="M12 12c-1.4-3-.9-6.1 0-8.2.9 2.1 1.4 5.2 0 8.2z" />
          <path d="m19.2 1.6.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" />
        </>
      ) : stage === "crescent" ? (
        <>
          <path d="M13.8 3.2a9 9 0 1 0 6.9 14.9 7.4 7.4 0 0 1-6.9-14.9z" />
          <path d="m18.4 5.6.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z" />
        </>
      ) : stage === "garden" ? (
        <>
          <rect x="3.5" y="3.5" width="7.4" height="7.4" rx="1.6" />
          <rect x="13.1" y="3.5" width="7.4" height="7.4" rx="1.6" />
          <rect x="3.5" y="13.1" width="7.4" height="7.4" rx="1.6" />
          <rect x="13.1" y="13.1" width="7.4" height="7.4" rx="1.6" />
        </>
      ) : stage === "leaf" ? (
        <GardenCrownPaths />
      ) : stage === "kaaba" ? (
        <>
          {/* The Ka‘bah from a corner; the gap across both faces is the gold band of the kiswah. */}
          <path d="M4 8.6 10.6 6.6 20.4 8.6 13.8 10.6z" opacity=".5" />
          <path d="M4 9.2 13.6 11.2v1.9L4 11.1z" />
          <path d="M4 12.7 13.6 14.7V21L4 19z" />
          <path d="M14.2 11.2 20.4 9.2v1.9l-6.2 2z" opacity=".72" />
          <path d="M14.2 14.7 20.4 12.7V19l-6.2 2z" opacity=".72" />
        </>
      ) : stage === "lantern" ? (
        <>
          <circle cx="12" cy="2.9" r="1.15" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8.6 7.3C9 5.3 10.4 4.1 12 4.1s3 1.2 3.4 3.2z" />
          <path fillRule="evenodd" d="M8 8h8l-1.1 9.8H9.1zm2.3 1.9h3.4l-.6 6h-2.2z" />
          <path d="M8.4 18.5h7.2v1.5H8.4zM11 20.6h2l-1 1.8z" />
        </>
      ) : stage === "dome" ? (
        <>
          {/* The Green Dome of Masjid an-Nabawi (20 Nov 2026, redrawn): crescent finial, the pointed dome, its drum with
              three arched windows, and two steps. */}
          <path d="M12 .9a1.45 1.45 0 1 0 1.25 2.15A1.15 1.15 0 0 1 12 .9z" />
          <path d="M11.55 3.6h.9v1.4h-.9z" />
          <path d="M12 4.9c.6 1.7 2.4 2.7 4.1 3.8 1.9 1.3 3 2.8 3 4.8H4.9c0-2 1.1-3.5 3-4.8C9.6 7.6 11.4 6.6 12 4.9z" />
          <path fillRule="evenodd" d="M6.2 14.1h11.6v4.3H6.2zm2.1 1.3v1.9h1.4v-1.9a.7.7 0 0 0-1.4 0zm3 0v1.9h1.4v-1.9a.7.7 0 0 0-1.4 0zm3 0v1.9h1.4v-1.9a.7.7 0 0 0-1.4 0z" />
          <path d="M4.4 19h15.2v1.3H4.4zM3.4 20.8h17.2v1.2H3.4z" />
        </>
      ) : stage === "minaret" ? (
        <>
          <path d="M12 1.6 13.8 6.2h-3.6z" />
          <path d="M10.4 6.8h3.2v3.4h-3.2zM8.8 10.6h6.4v1.7H8.8z" />
          <path fillRule="evenodd" d="M9.6 12.8h4.8v8.7H9.6zm1.7 2.1h1.4v2.6h-1.4z" />
        </>
      ) : stage === "quran" ? (
        <>
          {/* The mus'haf open on its rehal (20 Nov 2026, redrawn): two full pages, the curve of the cover, the stand. */}
          <path d="M11.3 6.3C9.1 4.9 6.3 4.5 3.3 5.3v11.6c3-.8 5.8-.4 8 1z" />
          <path d="M12.7 6.3c2.2-1.4 5-1.8 8-1v11.6c-3-.8-5.8-.4-8 1z" />
          <path d="M2.6 18.6c3.3-.9 6.5-.5 9.4 1.1 2.9-1.6 6.1-2 9.4-1.1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8.2 21.6 15.8 19M15.8 21.6 8.2 19" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ) : stage === "star" ? (
        <>
          {/* The eight-pointed star (two squares, one turned): a common ornament of Islamic art. */}
          <path d="M5.6 5.6h12.8v12.8H5.6z" />
          <path d="M12 2.9 21.1 12 12 21.1 2.9 12z" />
        </>
      ) : stage === "mihrab" ? (
        <>
          {/* Book: the arch of a door with a tick inside (20 Nov 2026, redrawn): your place, confirmed. */}
          <path fillRule="evenodd" d="M12 1.9c3.9 1.9 7 4.6 7 8.4v11.2H5V10.3c0-3.8 3.1-6.5 7-8.4zm0 2.3c-2.9 1.6-5.1 3.6-5.1 6.2v9.2h10.2v-9.2c0-2.6-2.2-4.6-5.1-6.2z" />
          <path d="M8.9 13.6l2.2 2.3 4.1-4.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : stage === "plane" ? (
        <path d="M21 15.6v-1.9l-7.6-4.8V3.6a1.4 1.4 0 0 0-2.8 0v5.3L3 13.7v1.9l7.6-2.4v5.1l-1.9 1.4v1.5l3.3-.9 3.3.9v-1.5l-1.9-1.4v-5.1z" />
      ) : stage === "bloom" ? (
        <>
          <ellipse cx="12" cy="7.2" rx="2.7" ry="4.1" />
          <ellipse cx="12" cy="16.8" rx="2.7" ry="4.1" />
          <ellipse cx="7.2" cy="12" rx="4.1" ry="2.7" />
          <ellipse cx="16.8" cy="12" rx="4.1" ry="2.7" />
        </>
      ) : (
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M4.5 21.5V11a7.5 7.5 0 0 1 15 0v10.5" strokeWidth="1.8" />
          <path d="M8.5 21.5v-9.6a3.5 3.5 0 0 1 7 0v9.6" strokeWidth="1.3" />
        </g>
      )}
    </svg>
  );
}

/** The mark's crown: a stem, four leaves and the top leaf, as in the logo. */
function GardenCrownPaths() {
  return (
    <>
      <path d="M12 22V13.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 15.4c-2.7-2-5.8-2.1-8.3-.6 2.3 2 5.3 2.3 8.3.6z" />
      <path d="M12 15.4c2.7-2 5.8-2.1 8.3-.6-2.3 2-5.3 2.3-8.3.6z" />
      <path d="M12 12.3c-1.6-2.8-4.2-4.3-6.9-4.3 1 2.7 3.7 4.4 6.9 4.3z" />
      <path d="M12 12.3c1.6-2.8 4.2-4.3 6.9-4.3-1 2.7-3.7 4.4-6.9 4.3z" />
      <path d="M12 11.2c-1.2-2.7-.9-5.5 0-7.5.9 2 1.2 4.8 0 7.5z" />
    </>
  );
}

export function GardenCrown({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style} fill="currentColor">
      <GardenCrownPaths />
    </svg>
  );
}

/** A small, steady pseudo-random sequence, so the leaves fall the same way on the server and in the browser. */
function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Leaves from the mark, scattered faintly behind a chapter: few where the journey starts, more as it reaches Madinah.
 * `edges` keeps them in the margins, clear of the reading column. They drift a little as the page scrolls past (CSS
 * scroll timeline, globals.css "garden-leaves"); still without motion or support.
 */
export function GardenLeaves({ count, seed, edges = true, className = "" }: { count: number; seed: number; edges?: boolean; className?: string }) {
  const r = seeded(seed);
  const leaves = Array.from({ length: count }, () => {
    const side = r() < 0.5;
    const x = edges ? (side ? 1 + r() * 12 : 87 + r() * 12) : 2 + r() * 96;
    return { x, y: 3 + r() * 94, size: 0.9 + r() * 1.6, turn: Math.round(r() * 360), dy: Math.round(10 + r() * 26), kind: r() < 0.72 ? 0 : 1 };
  });
  return (
    <div aria-hidden className={`garden-leaves ${className}`}>
      {leaves.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="gl"
          style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.size}rem`, "--turn": `${l.turn}deg`, "--dy": `${l.dy}px` } as CSSProperties}
        >
          {l.kind === 0 ? (
            <path fill="currentColor" d="M12 2.2c4.6 3.7 5.3 11.6 0 19.6C6.7 13.8 7.4 5.9 12 2.2z" />
          ) : (
            <path fill="currentColor" d="M12 6.5c2.7 3.1 3.5 5.7 3.5 7.6A3.5 3.5 0 0 1 12 17.6a3.5 3.5 0 0 1-3.5-3.5c0-1.9.8-4.5 3.5-7.6z" />
          )}
        </svg>
      ))}
    </div>
  );
}
