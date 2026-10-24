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
      className={`site-mark ml-1.5 inline-block translate-y-[-0.12em] rounded-[2px] border border-dashed border-bronze/60 px-1 py-px align-middle font-display text-[0.62rem] leading-[1.3] font-medium whitespace-nowrap text-bronze not-italic ${className}`}
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
        className="fixed top-[45%] right-0 z-[60] rounded-l-[3px] border border-r-0 border-dashed border-bronze/70 bg-canvas/95 px-[3px] py-2.5 text-[0.58rem] font-medium text-bronze [writing-mode:vertical-rl] lg:top-1/2 lg:right-auto lg:left-0 lg:-translate-y-1/2 lg:rounded-l-none lg:rounded-r-[3px] lg:border-r lg:border-l-0 lg:px-1.5 lg:py-3 lg:text-[0.62rem]"
      >
        {on ? "Review marks on" : "Review marks off"}
      </button>
    </div>
  );
}
