"use client";

import { useState, type ReactNode } from "react";

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
    </div>
  );
}
