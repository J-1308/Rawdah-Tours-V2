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

function useTop() {
  const top = useSyncExternalStore(watchTop, readTop, () => "night");
  const flip = () => {
    const next = top === "night" ? "day" : "night";
    document.documentElement.dataset.top = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "day" ? "#f8f3eb" : "#1b1410");
    try {
      localStorage.setItem("rawdah-top", next === "day" ? "light" : "dark");
    } catch {}
  };
  return [top, flip] as const;
}

const tab = "fixed left-0 z-[60] hidden items-center gap-1.5 rounded-r-lg border border-l-0 border-dashed border-bronze/60 bg-canvas/90 px-1.5 py-3 text-[0.62rem] font-medium text-bronze backdrop-blur [writing-mode:vertical-rl] lg:flex";

/**
 * The review tools: hide or show the review marks, and flip the top between
 * dark (beige logo) and light (brown logo). Desktop: two tabs on the left edge.
 * Phones: one small "Review" pill that opens both, so nothing covers the page.
 */
export function MarksFrame({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(true);
  const [open, setOpen] = useState(false);
  const [top, flip] = useTop();
  const row = "flex w-full items-center justify-between gap-3 rounded-[0.7rem] px-3 py-2.5 text-left hover:bg-(--raise)";
  return (
    // overflow-x: clip stops a wide element widening the page on iPhone
    // (Safari zooms out) without creating a scroll box, so the sticky header
    // keeps sticking. Keep this on the layout when the marks are removed.
    <div data-marks={on ? "on" : "off"} className="overflow-x-clip [&[data-marks=off]_.site-mark]:hidden">
      {children}
      <button type="button" onClick={() => setOn((x) => !x)} aria-pressed={on} className={`${tab} top-1/2 -translate-y-1/2`}>
        {on ? "Review marks on" : "Review marks off"}
      </button>
      <button type="button" onClick={flip} className={`${tab} top-[calc(50%+5.5rem)]`}>
        <span aria-hidden className={`size-2 rounded-full ${top === "night" ? "bg-[#2a1f19] ring-1 ring-sand" : "bg-[#f8f3eb] ring-1 ring-bronze/60"}`} />
        {top === "night" ? "Top: dark" : "Top: light"}
      </button>

      <div className="fixed bottom-[calc(5.4rem+env(safe-area-inset-bottom))] left-2.5 z-[60] lg:hidden">
        {open ? (
          <div className="mb-2 w-[13rem] rounded-[1rem] border border-dashed border-bronze/60 bg-canvas/95 p-1.5 text-[0.84rem] text-ink shadow-[var(--shadow-float)] backdrop-blur">
            <button type="button" onClick={() => setOn((x) => !x)} aria-pressed={on} className={row}>
              <span>Review marks</span>
              <span className="font-medium text-bronze">{on ? "On" : "Off"}</span>
            </button>
            <button type="button" onClick={flip} className={row}>
              <span>Top of the page</span>
              <span className="font-medium text-bronze">{top === "night" ? "Dark" : "Light"}</span>
            </button>
          </div>
        ) : null}
        <button type="button" onClick={() => setOpen((x) => !x)} aria-expanded={open} className="rounded-full border border-dashed border-bronze/60 bg-canvas/90 px-2.5 py-1 text-[0.62rem] font-medium text-bronze shadow-[var(--shadow-lift)] backdrop-blur">
          {open ? "Close" : "Review"}
        </button>
      </div>
    </div>
  );
}
