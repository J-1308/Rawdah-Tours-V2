import type { ReactNode } from "react";

/**
 * The M from the GGC × Rawdah Ramadan poster: two sharp Λ shapes overlapping, flat cut at the top and bottom.
 * Drawn at cap height (100 units); each leg is a parallelogram, so the corners stay sharp like the Rawdah mark.
 */
const W = 88; // one Λ
const S = 25; // a leg's width, measured across (matches Montserrat 700's diagonals)
const leg = (x0: number) => [
  `M${x0} 100 L${x0 + S} 100 L${x0 + W / 2 + S / 2} 0 L${x0 + W / 2 - S / 2} 0 Z`,
  `M${x0 + W - S} 100 L${x0 + W} 100 L${x0 + W / 2 + S / 2} 0 L${x0 + W / 2 - S / 2} 0 Z`,
];
const OFFSET = 44;
const PATHS = [...leg(0), ...leg(OFFSET)];

export function PosterM() {
  return (
    <svg className="poster-m" viewBox={`0 0 ${W + OFFSET} 100`} aria-hidden focusable="false">
      {PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/**
 * A title in the poster lettering: the text as written for screen readers, and on screen in capitals with every M
 * drawn as the poster's M. Use inside a heading with the `poster-title` class.
 */
export function PosterText({ text }: { text: string }) {
  // Each word kept whole: the drawn M would otherwise let a line break inside a word ("U / MRAH").
  const shown: ReactNode[] = text.split(/(\s+)/).map((word, w) =>
    /^\s+$/.test(word) ? (
      word
    ) : (
      <span key={w} className="whitespace-nowrap">
        {word.split(/(m)/i).map((p, i) => (/^m$/i.test(p) ? <PosterM key={i} /> : p))}
      </span>
    ),
  );
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </>
  );
}
