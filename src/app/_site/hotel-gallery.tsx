"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * A hotel's photos as one swipeable frame: swipe on phones, arrows on larger screens, "2 / 4" in the corner.
 * Pure scroll-snap, so it works before hydration and without JavaScript (the arrows just don't appear).
 */
export function HotelGallery({ photos, name }: { photos: { src: string; alt: string }[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const go = (d: number) => {
    const el = track.current;
    if (!el) return;
    const i = Math.max(0, Math.min(photos.length - 1, at + d));
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };
  const arrow = "absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#2a211b] shadow-[var(--shadow-soft)] transition-opacity disabled:opacity-0 sm:grid";

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={(e) => setAt(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex aspect-[3/2] snap-x snap-mandatory overflow-x-auto overscroll-x-contain bg-(--raise) [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`Photos of ${name}`}
        role="group"
      >
        {photos.map((p, i) => (
          <div key={p.src} className="relative h-full w-full shrink-0 snap-center" aria-hidden={i !== at}>
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 45vw, 95vw" quality={82} className="object-cover" loading={i ? "lazy" : undefined} />
          </div>
        ))}
      </div>
      {photos.length > 1 ? (
        <>
          <button type="button" aria-label="Previous photo" onClick={() => go(-1)} disabled={at === 0} className={`${arrow} left-3`}>
            <span aria-hidden className="-mt-0.5 text-[1.6rem] leading-none">‹</span>
          </button>
          <button type="button" aria-label="Next photo" onClick={() => go(1)} disabled={at === photos.length - 1} className={`${arrow} right-3`}>
            <span aria-hidden className="-mt-0.5 text-[1.6rem] leading-none">›</span>
          </button>
          <p className="pointer-events-none absolute right-3 bottom-3 rounded-[0.7rem] bg-black/55 px-2.5 py-1 text-[0.875rem] text-white tabular-nums" aria-live="polite">
            {at + 1} / {photos.length}
          </p>
        </>
      ) : null}
    </div>
  );
}
