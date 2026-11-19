"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/** Shows its children everywhere except on the page they link to (the strip on the Ramadan page, 18 Nov 2026). */
export function NotOn({ href, children }: { href: string; children: ReactNode }) {
  const path = usePathname();
  // Also hidden under the page it links to (its thank-you page).
  return path === href || path.startsWith(`${href}/`) ? null : children;
}

/**
 * Page-level watchers, no UI:
 * - the night sky, the mist and the icon ticker pause when off screen, so they cost nothing while you read the rest;
 * - the trip phone bar steps aside while the join panel or the booking form is on screen, so it never covers the
 *   fields or sends someone back up the page.
 */
export function PageWatch() {
  const path = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const skies = new IntersectionObserver((es) => es.forEach((e) => e.target.toggleAttribute("data-off", !e.isIntersecting)));
    document.querySelectorAll(".sky, .ticker").forEach((el) => skies.observe(el));

    const bar = document.querySelector<HTMLElement>('[data-placement="phone bar"]');
    const zones = ["join", "register-interest"].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const seen = new Set<Element>();
    const note = (es: IntersectionObserverEntry[]) => {
      es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      bar?.toggleAttribute("data-away", seen.size > 0);
    };
    const bars = new IntersectionObserver(note, { rootMargin: "0px 0px -35% 0px" });
    // The poster hero's own price and button: the bar would cover and repeat it, so it waits until it has scrolled away.
    const heroBuy = new IntersectionObserver(note);
    if (bar) {
      zones.forEach((z) => bars.observe(z));
      const buy = document.querySelector(".ph-buy");
      if (buy) heroBuy.observe(buy);
    }
    return () => {
      skies.disconnect();
      bars.disconnect();
      heroBuy.disconnect();
    };
  }, [path]);
  return null;
}
