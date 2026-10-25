"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";

import type { Status } from "@/app/_site/content";

/**
 * Review marks. Anything that is our suggestion, a fact still to confirm, or
 * sample text carries a small square-cornered tag, so the client sees at a
 * glance what is real. A switch hides the tags to judge the look. Both go
 * before launch; the iPhone overflow fix below must then move to the (site)
 * layout.
 */

const labels: Partial<Record<Status, string>> = {
  proposed: "Suggested",
  "to confirm": "To confirm",
  sample: "Sample",
};

export function Mark({ s, className = "" }: { s: Status | undefined; className?: string }) {
  const label = s ? labels[s] : undefined;
  if (!label) return null;
  return (
    <span
      className={`site-mark ml-1.5 inline-block translate-y-[-0.12em] rounded-full border border-dashed border-bronze/55 px-1.5 py-px align-middle font-display text-[0.6rem] leading-[1.35] font-medium tracking-normal whitespace-nowrap text-bronze not-italic ${className}`}
    >
      {label}
    </span>
  );
}

/** Review only: flips the top of every page between dark (beige logo) and light (brown logo). */
const watchTop = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-top"] });
  return () => observer.disconnect();
};
const readTop = () => (document.documentElement.dataset.top === "day" ? "day" : "night");

function TopSwitch() {
  const top = useSyncExternalStore(watchTop, readTop, () => "night");
  const flip = () => {
    const next = top === "night" ? "day" : "night";
    document.documentElement.dataset.top = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "day" ? "#f8f3eb" : "#1b1410");
    try {
      localStorage.setItem("rawdah-top", next === "day" ? "light" : "dark");
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={flip}
      aria-label={top === "night" ? "Showing the dark top with the beige logo. Switch to the light top." : "Showing the light top with the brown logo. Switch to the dark top."}
      className="fixed bottom-[calc(5.4rem+env(safe-area-inset-bottom))] left-[5.6rem] z-[60] flex items-center gap-1.5 rounded-full border border-dashed border-bronze/60 bg-canvas/90 px-2.5 py-1 text-[0.62rem] font-medium text-bronze shadow-[var(--shadow-lift)] backdrop-blur lg:top-[calc(50%+5.5rem)] lg:bottom-auto lg:left-0 lg:rounded-l-none lg:rounded-r-lg lg:border-l-0 lg:px-1.5 lg:py-3 lg:shadow-none lg:[writing-mode:vertical-rl]"
    >
      <span aria-hidden className={`size-2 rounded-full ${top === "night" ? "bg-[#2a1f19] ring-1 ring-sand" : "bg-[#f8f3eb] ring-1 ring-bronze/60"}`} />
      {top === "night" ? "Top: dark" : "Top: light"}
    </button>
  );
}

export function MarksFrame({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(true);
  return (
    // overflow-x: clip stops a wide element widening the page on iPhone
    // (Safari zooms out) without creating a scroll box, so the sticky header
    // keeps sticking. Keep this on the layout when the marks are removed.
    <div data-marks={on ? "on" : "off"} className="overflow-x-clip [&[data-marks=off]_.site-mark]:hidden">
      {children}
      <button
        type="button"
        onClick={() => setOn((x) => !x)}
        aria-pressed={on}
        className="fixed bottom-[calc(5.4rem+env(safe-area-inset-bottom))] left-2.5 z-[60] rounded-full border border-dashed border-bronze/60 bg-canvas/90 px-2.5 py-1 text-[0.62rem] font-medium text-bronze shadow-[var(--shadow-lift)] backdrop-blur lg:top-1/2 lg:bottom-auto lg:left-0 lg:-translate-y-1/2 lg:rounded-l-none lg:rounded-r-lg lg:border-l-0 lg:px-1.5 lg:py-3 lg:shadow-none lg:[writing-mode:vertical-rl]"
      >
        <span className="lg:hidden">{on ? "Marks on" : "Marks off"}</span>
        <span className="hidden lg:inline">{on ? "Review marks on" : "Review marks off"}</span>
      </button>
      <TopSwitch />
    </div>
  );
}
