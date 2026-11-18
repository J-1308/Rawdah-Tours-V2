import type { CSSProperties, ReactNode } from "react";

/**
 * Titles in the poster lettering (Ramadan Umrah 2027): capitals in Montserrat, with every M shown as the GGC × Rawdah
 * poster's M (two sharp Λ shapes overlapping, flat cut; it echoes the rectangular Rawdah mark). The M stays a real
 * letter "M": it is made invisible and the drawn shape is laid over it (`.poster-m` in globals.css), so copy-paste,
 * search, Reader and screen readers all get the words exactly as written. Use inside a heading with `poster-title`.
 * With `rise`, each letter rises in turn (`.poster-rise .pl`).
 */
export function PosterText({ text, rise = false }: { text: string; rise?: boolean }) {
  let n = 0;
  const glyph = (c: string, key: number): ReactNode => {
    const m = /m/i.test(c) ? (
      <span key={rise ? undefined : key} className="poster-m">
        {c}
      </span>
    ) : (
      c
    );
    return rise ? (
      <span key={key} className="pl" style={{ "--i": n++ } as CSSProperties}>
        {m}
      </span>
    ) : (
      m
    );
  };
  if (!rise && !/m/i.test(text)) return text;
  // Each word kept whole, so a line never breaks inside one.
  return text.split(/(\s+)/).map((word, w) =>
    /^\s+$/.test(word) ? (
      word
    ) : (
      <span key={w} className="whitespace-nowrap">
        {rise ? [...word].map((c, k) => glyph(c, w * 100 + k)) : word.split(/(m)/i).map((p, k) => (/^m$/i.test(p) ? glyph(p, w * 100 + k) : p))}
      </span>
    ),
  );
}
