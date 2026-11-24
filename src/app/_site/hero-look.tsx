"use client";

import { useEffect } from "react";

/**
 * Preview switch for the Ramadan hero's two versions (24 Nov 2026): add `?hero=light` to the address to see the light
 * version; without it the hero is dark. Remove once Jibril has chosen.
 */
export function HeroLook() {
  useEffect(() => {
    const look = new URLSearchParams(window.location.search).get("hero");
    if (look !== "light") return;
    document.querySelector<HTMLElement>(".nh")?.setAttribute("data-look", "light");
    document.documentElement.setAttribute("data-hero", "light");
  }, []);
  return null;
}
