"use client";

import { useEffect, useRef } from "react";

import { gbp } from "@/app/_site/content";

/**
 * A price that counts up from £0 when it scrolls into view (Ramadan Umrah 2027 packages). The page is served with the
 * real figure, which is what shows with reduced motion, without JavaScript, or when it is already on screen at load.
 * The count is written to the text directly, so nothing re-renders.
 */
export function CountUp({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains("motion") || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.textContent = gbp(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1200);
          el.textContent = gbp(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = gbp(value);
    };
  }, [value]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {gbp(value)}
    </span>
  );
}
