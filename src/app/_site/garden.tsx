import type { CSSProperties } from "react";

/**
 * The garden (Jibril, 20 Nov 2026: "Since rawdah means garden… that should be our design direction"). Rawdah's mark
 * is already a garden: the word روضة in square kufic, crowned with a plant of five leaves and a seed-drop, with leaves
 * scattered through it. These are its shapes, drawn small: the stages the garden path grows through, the leaves of the
 * backdrop, and the crown. See docs/adr/0006-the-garden.md.
 */

export type Stage = "seed" | "sprout" | "palm" | "crescent" | "garden" | "leaf" | "bloom" | "gate";

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

export function GardenCrown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
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
