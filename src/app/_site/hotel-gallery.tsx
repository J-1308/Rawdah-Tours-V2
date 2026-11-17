"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * A hotel's photos as one swipeable frame: swipe on phones, arrows on larger screens, "2 / 4" in the corner.
 * Pure scroll-snap, so it works before hydration and without JavaScript (the arrows just don't appear).
 * Under it, every photo as a small thumbnail, the others faded, so it's clear at a glance there's more than one
 * (Jibril, 17 Nov 2026). Tapping a thumbnail shows that photo.
 */
export function HotelGallery({ photos, name }: { photos: { src: string; alt: string }[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const show = (i: number) => {
    const el = track.current;
    if (!el) return;
    const to = Math.max(0, Math.min(photos.length - 1, i));
    el.scrollTo({ left: to * el.clientWidth, behavior: "smooth" });
  };
  const go = (d: number) => show(at + d);
  const arrow = "absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#2a211b] shadow-[var(--shadow-soft)] transition-opacity disabled:opacity-0 sm:grid";

  return (
    <div>
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
      {photos.length > 1 ? (
        <div className="grid grid-flow-col auto-cols-fr gap-2 px-5 pt-4 sm:px-7" role="group" aria-label={`Choose a photo of ${name}`}>
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => show(i)}
              aria-label={`Photo ${i + 1} of ${photos.length}`}
              aria-current={i === at ? "true" : undefined}
              className={`relative aspect-[3/2] min-h-11 overflow-hidden rounded-[0.6rem] transition-[opacity,box-shadow] duration-300 ${
                i === at ? "opacity-100 ring-2 ring-sand" : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image src={p.src} alt="" fill sizes="6rem" quality={60} className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
