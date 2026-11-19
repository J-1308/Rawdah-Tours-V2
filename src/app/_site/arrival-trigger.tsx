"use client";

import { useLayoutEffect } from "react";

/**
 * Starts the Ramadan page's opening (poster-parts.tsx, Arrival) when the visitor came here by a link inside the site,
 * and clears it when they leave, so other pages keep their own timing. A full page load from another page of the site
 * is handled before paint by the head script in layout.tsx; this covers in-site navigation.
 */
export function ArrivalTrigger() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const first = (window as unknown as { __rawdahFirst?: string }).__rawdahFirst;
    if (root.classList.contains("motion") && first && first !== location.pathname) root.setAttribute("data-arrival", "1448");
    return () => root.removeAttribute("data-arrival");
  }, []);
  return null;
}
