import type { CSSProperties, ReactNode } from "react";

import { Mark } from "@/app/_site/marks";
import type { Status } from "@/app/_site/content";

/**
 * The poster's see-through tablets, as the trip's headline facts under the title (poster skin, 19 Nov 2026).
 * Olive on frosted white rather than the poster's white on stone, which can't be read on a phone in daylight.
 */
export type Tablet = { big: ReactNode; small: ReactNode; top?: boolean; s?: Status };

export function PosterTablets({ items, className = "" }: { items: Tablet[]; className?: string }) {
  return (
    <ul className={`poster-tablets ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="tablet follow" style={{ "--d": `${820 + i * 90}ms` } as CSSProperties}>
          {t.top ? <span className="tablet-small">{t.small}</span> : null}
          <span className="tablet-big">{t.big}</span>
          {t.top ? null : <span className="tablet-small">{t.small}</span>}
          {t.s ? (
            <span className="tablet-mark">
              <Mark s={t.s} />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

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
