"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { anchors } from "@/app/_site/content";

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
 *   fields or sends someone back up the page;
 * - "#join" links (and a page opened at #join) go to whichever join panel is showing; on poster trips, which have no
 *   join panel (the package picker is the booking form's first step), they go to the booking form.
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

    const toJoin = (hash: string) => {
      if (hash !== `#${anchors.join}`) return false;
      const shown = document.getElementById(anchors.join);
      // Poster trips have no join panel (one form, 23 Nov 2026): "#join" goes to the booking form.
      const desk = document.getElementById(anchors.joinDesktop) ?? (shown ? null : document.getElementById(anchors.form));
      if (!desk || (shown && shown.getClientRects().length > 0)) return false;
      desk.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return true;
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!a || (a.target && a.target !== "_self")) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !toJoin(url.hash)) return;
      e.preventDefault();
      history.replaceState(history.state, "", url.hash);
    };
    document.addEventListener("click", onClick, true);
    // Arriving at #join (from another page): the browser can't scroll to the hidden copy, so scroll to the shown one.
    const arrive = window.setTimeout(() => toJoin(location.hash), 60);
    return () => {
      skies.disconnect();
      bars.disconnect();
      heroBuy.disconnect();
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(arrive);
    };
  }, [path]);
  return null;
}
