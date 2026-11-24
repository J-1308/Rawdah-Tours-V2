"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { anchors, routes } from "@/app/_site/content";
import { ONE_PAGE, ONE_PAGE_HOME } from "@/lib/site-mode";

/**
 * The desktop header's links (Jibril, 24 Nov 2026: "real links… with the current section highlighted while scrolling").
 * One-page mode: the Ramadan page's sections; it takes over from the garden path on desktop, so there is one menu, not
 * two stacked. With the full site: the pages. The place you're in has its words in full stone and a short gold line
 * under them that glides from link to link (the garden path's line, Rawdah's own; not The Umrah Company's menu, ADR 0001).
 */
const SECTIONS = [
  { id: "journey", label: "The journey" },
  { id: "sheikh", label: "Guest Sheikh" },
  { id: "stay", label: "Hotels" },
  { id: "prices", label: "Prices" },
  { id: "faq", label: "Questions" },
];

const PAGES = [
  { href: ONE_PAGE_HOME, label: "Ramadan 2027" },
  { href: routes.private, label: "Private & family" },
  { href: routes.groups, label: "Groups" },
  { href: routes.hajj, label: "Hajj 2027" },
  { href: routes.about, label: "About" },
];

export function HeaderLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const onPage = pathname === ONE_PAGE_HOME;
  const [here, setHere] = useState(-1);
  const list = useRef<HTMLUListElement>(null);

  const items = ONE_PAGE
    ? SECTIONS.map((s) => ({ key: s.id, label: s.label, href: onPage ? `#${s.id}` : `${ONE_PAGE_HOME}#${s.id}` }))
    : PAGES.map((p) => ({ key: p.href, label: p.label, href: p.href }));

  // One-page mode on the Ramadan page: light the section in view. Nothing before the journey (the hero) or once the
  // booking form is reached ("Book your place" is the header's own button).
  useEffect(() => {
    if (!ONE_PAGE || !onPage) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let k = -1;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) k = i;
      });
      const form = document.getElementById(anchors.form);
      if (form && form.getBoundingClientRect().top <= line) k = -1;
      setHere(k);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, [onPage]);

  // Full site: the page you're on.
  const current = ONE_PAGE ? here : PAGES.findIndex((p) => pathname === p.href || pathname.startsWith(`${p.href}/`));

  // The gold line glides to the lit link.
  useEffect(() => {
    const ul = list.current;
    if (!ul) return;
    const place = () => {
      const a = current < 0 ? null : ul.children[current]?.querySelector("a");
      if (!a) return ul.style.setProperty("--hl-w", "0px");
      ul.style.setProperty("--hl-x", `${a.offsetLeft + 2}px`);
      ul.style.setProperty("--hl-w", `${Math.max(0, a.offsetWidth - 4)}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [current]);

  return (
    <nav aria-label={ONE_PAGE ? "On this page" : "Main"} className={className}>
      <ul ref={list} className="hdr-links">
        {items.map((it, i) => {
          const lit = i === current;
          return (
            <li key={it.key}>
              {ONE_PAGE ? (
                <a href={it.href} aria-current={lit ? "location" : undefined} data-lit={lit || undefined}>
                  {it.label}
                </a>
              ) : (
                <Link href={it.href} aria-current={lit ? "page" : undefined} data-lit={lit || undefined}>
                  {it.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
