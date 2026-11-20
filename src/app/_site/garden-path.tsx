"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { GardenGlyph, type Stage } from "@/app/_site/garden";

export type PathStop = { id: string; label: string; stage: Stage };

/**
 * The garden path (Jibril, 20 Nov 2026: "the animation that guides you through the website… since rawdah means garden").
 * Rawdah's guide: the row of chapters stuck under the header, each with a stage of the garden grown from the mark
 * (sprout, palm under a star, crescent, the four-part garden, the crown in full leaf, a bloom, the gate). The chapter
 * you're in is lit and grows in as you reach it; those behind you stay in leaf; those ahead are faint. Tap to go there.
 * Not a thread down the margin (that is The Umrah Company's): it sits at the top, and it is the page's own navigation.
 */
export function GardenPath({ stops }: { stops: PathStop[] }) {
  const [here, setHere] = useState(-1);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let k = -1;
      stops.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) k = i;
      });
      setHere(k);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, [stops]);

  // Phones: keep the lit chapter in view along the row.
  useEffect(() => {
    const ul = list.current;
    if (!ul || ul.scrollWidth <= ul.clientWidth) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const li = here < 0 ? null : (ul.children[here] as HTMLElement | undefined);
    // Back at the top, the row starts from the beginning again.
    ul.scrollTo({ left: li ? li.offsetLeft - (ul.clientWidth - li.offsetWidth) / 2 : 0, behavior: calm ? "auto" : "smooth" });
  }, [here]);

  return (
    <nav aria-label="The journey on this page" className="trip-jump garden-path">
      {/* A gilt line along its foot fills as you go down the page (Jibril, 20 Nov 2026: the bar should "catch your eye,
          guide you through"). Scroll-driven where the browser can; otherwise it steps with the chapter you're in. */}
      <span aria-hidden className="gp-progress" style={{ "--gp": stops.length ? (here + 1) / stops.length : 0 } as CSSProperties} />
      <ul ref={list}>
        {stops.map((s, i) => {
          const state = i < here ? "passed" : i === here ? "here" : "ahead";
          return (
            <li key={s.id} data-state={state}>
              <a href={`#${s.id}`} aria-current={state === "here" ? "location" : undefined}>
                {/* Re-mounted when it becomes the lit chapter, so it grows in each time it's reached. */}
                <GardenGlyph key={state === "here" ? "grow" : "still"} stage={s.stage} className="gp-glyph" />
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
