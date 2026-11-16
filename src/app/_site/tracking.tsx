"use client";

import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/*
 * Cookieless tracking (Vercel Web Analytics custom events). Event names match the company's other reports:
 * docs/tracking.md lists them. Nothing here needs a consent banner: no cookies, no ad pixels.
 */

/** Where on the page a link sits: data-placement on it or an ancestor, else worked out from where it is. */
function placementOf(el: Element) {
  const marked = el.closest("[data-placement]")?.getAttribute("data-placement");
  if (marked) return marked;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest("form")) return "form";
  if (el.closest("[data-phone-bar]")) return "phone bar";
  return location.pathname.startsWith("/trips/") ? "trip" : "page";
}

/** The trip a page is about, from data-trip or the URL (/trips/<slug>). */
export function tripOf(el?: Element | null) {
  const marked = el?.closest("[data-trip]")?.getAttribute("data-trip");
  if (marked) return marked;
  const m = location.pathname.match(/^\/trips\/([^/]+)/);
  return m ? m[1] : "";
}

/** Taps on WhatsApp, phone and email links, anywhere on the site, from one listener. */
export function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const name = /wa\.me|whatsapp\.com/.test(href) ? "whatsapp_click" : href.startsWith("tel:") ? "phone_click" : href.startsWith("mailto:") ? "email_click" : "";
      if (!name) return;
      const props: Record<string, string> = { page: location.pathname, placement: placementOf(a) };
      if (name === "whatsapp_click") props.trip = tripOf(a);
      track(name, props);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

/* Where a visitor came from: kept for this visit only (sessionStorage, cleared when the tab closes), first landing wins. */

const KEY = "rawdah-source";
export const SOURCE_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "landing_page", "referrer"] as const;
export type Source = { utm_source: string; utm_medium: string; utm_campaign: string; landing_page: string; referrer: string };

export function SourceCapture() {
  const path = usePathname();
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
      const q = new URLSearchParams(location.search);
      const ref = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "";
      const s: Source = {
        utm_source: q.get("utm_source") ?? "",
        utm_medium: q.get("utm_medium") ?? "",
        utm_campaign: q.get("utm_campaign") ?? "",
        landing_page: location.pathname,
        referrer: ref,
      };
      sessionStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      // Storage blocked: the lead is still sent, just without its source.
    }
  }, [path]);
  return null;
}

export function readSource(): Partial<Source> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Hidden fields carrying the visitor's source into any form that sends to the server. */
export function SourceFields() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    // Filled in the browser after it loads (the server never knows the source).
    const s = readSource();
    ref.current?.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.value = s[input.name as keyof Source] ?? "";
    });
  }, []);
  return (
    <span ref={ref} hidden>
      {SOURCE_FIELDS.map((k) => (
        <input key={k} type="hidden" name={k} defaultValue="" />
      ))}
    </span>
  );
}

/** Fire one event once when a component mounts (booking_started, for example). */
export function TrackOnMount({ name, props }: { name: string; props: Record<string, string> }) {
  useEffect(() => {
    track(name, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
