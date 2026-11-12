"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Logo } from "@/app/_site/shell";

/**
 * The opening: the Rawdah Tours logo fades in on cocoa, a sand line draws beneath it, then the curtain lifts onto the
 * hero. Once per visit (the head script in app/layout.tsx), never with reduced motion, and pure CSS, so it ends on its
 * own even before JavaScript loads. About 1.9 seconds. Styles: "motion: the opening" in globals.css.
 */
export function Intro() {
  return (
    <div aria-hidden className="intro">
      <div className="grid justify-items-center gap-5">
        <Logo className="intro-logo h-24 text-sand sm:h-28" label="" />
        <span className="intro-line" />
      </div>
    </div>
  );
}

/** What rises into view as you scroll: headings and their lines, grid items, questions, framed photos. */
const TARGETS = [
  "main section h2",
  "main section h2 ~ p",
  "main section :is(ul, ol)[class*='grid'] > li",
  "main section details",
  "main section table",
  "main .rise",
  "main [data-reveal]",
].join(",");

/**
 * Scroll reveals on every page, phones included. Only things still below the screen when the page opens are hidden and
 * then revealed, so nothing already in view ever blinks. If React re-renders an element its class is reset and it simply
 * shows: this can only ever make things appear, never hide them. The first section of a page has its own entrance.
 */
export function Reveals() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion") || !("IntersectionObserver" in window)) return;
    const first = document.querySelector("main section");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
      if (first?.contains(el) || el.classList.contains("rv")) return;
      if (el.getBoundingClientRect().top < fold) return;
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const i = el.tagName === "LI" ? Math.min(siblings.indexOf(el), 5) : 0;
      el.style.setProperty("--rv", String(i));
      el.classList.add("rv");
      if (el.classList.contains("rise")) el.classList.add("rv-photo");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
  return null;
}
