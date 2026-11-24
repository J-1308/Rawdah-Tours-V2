"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { brand, hajjRegister, nav, tripLinks } from "@/app/_site/content";
import { HeaderLinks } from "@/app/_site/header-links";
import { Emblem, Logo } from "@/app/_site/shell";
import { Chevron, pageWa, WaGlyph } from "@/app/_site/whatsapp";
import { ONE_PAGE, ONE_PAGE_HOME } from "@/lib/site-mode";

/**
 * The header: soft glass in the top zone (night with the beige-gold logo, or
 * cream with the cocoa logo, ADR 0004). Desktop: the logo on the left, the links
 * in the middle (header-links.tsx), the buttons on the right. Phones: menu,
 * logo, WhatsApp; the menu opens a full-screen sheet in the same colours.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the menus whenever the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setPanel(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open && !panel) return () => void (document.documentElement.style.overflow = "");
    // Escape closes the phone menu and the trips dropdown.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPanel(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, panel]);

  const pad = "px-[max(var(--hero-pad-x),env(safe-area-inset-left))]";

  // One-page mode (src/lib/site-mode.ts). Phones: call, logo, WhatsApp (the garden path under the hero is their menu).
  // Desktop: the logo, the page's sections (header-links.tsx; they take over from the garden path), then WhatsApp and
  // "Book your place".
  if (ONE_PAGE) {
    return (
      <header
        className={`top-zone motion-drop sticky top-0 z-40 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
          scrolled ? "border-b border-ink/6 bg-canvas/85 shadow-[0_10px_40px_-28px_rgb(58_43_36/0.5)]" : "border-b border-transparent bg-canvas/60"
        }`}
      >
        <div className={`hdr-grid grid h-[4.5rem] items-center gap-4 lg:h-[5.25rem] ${pad}`}>
          <div className="flex items-center">
            <a href={brand.phone.href} aria-label={`Call ${brand.phone.display}`} className="-ml-1 grid size-11 place-items-center rounded-full bg-(--raise) text-ink/80 shadow-[0_6px_18px_-10px_rgb(58_43_36/0.4)] lg:hidden">
              <svg aria-hidden viewBox="0 0 24 24" className="size-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h3l1.5 4.5-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2L20 16v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
            </a>
            {/* Desktop: the logo on the left, the trip in the middle (Jibril, 20 Nov 2026). Phones keep the logo central. */}
            <Link href={ONE_PAGE_HOME} className="hidden text-ink lg:block" aria-label="Rawdah Tours, Ramadan Umrah 2027">
              <Logo className="logo-gold h-[3.4rem]" />
            </Link>
          </div>
          <Link href={ONE_PAGE_HOME} className="text-ink lg:hidden" aria-label="Rawdah Tours, Ramadan Umrah 2027">
            <Logo className="logo-gold h-10" />
          </Link>
          <HeaderLinks className="hidden lg:block" />
          <div className="flex items-center justify-end gap-[clamp(1rem,1.6vw,1.5rem)]">
            {/* The page's second button, as everywhere (one button identity, 20 Nov 2026): an outline with WhatsApp's mark. */}
            <a href={pageWa(pathname)} target="_blank" rel="noopener noreferrer" className="hdr-wa hidden h-11 items-center gap-2 rounded-[0.95rem] px-4 text-[0.88rem] font-medium whitespace-nowrap lg:inline-flex">
              <WaGlyph className="size-[1.1rem] text-wa" /> WhatsApp us
            </a>
            <Link href={`${ONE_PAGE_HOME}#join`} className="btn-ink hidden h-11 items-center rounded-[0.95rem] px-5 text-[0.88rem] font-medium whitespace-nowrap lg:inline-flex">
              Book your place
            </Link>
            <a href={pageWa(pathname)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" className="-mr-1 grid size-11 place-items-center rounded-full bg-(--raise) text-wa shadow-[0_6px_18px_-10px_rgb(58_43_36/0.4)] lg:hidden">
              <WaGlyph className="size-5" />
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`top-zone motion-drop sticky top-0 ${open ? "z-[80]" : "z-40"} transition-[box-shadow,border-color] duration-300 ${open ? "" : "backdrop-blur-md"} ${
        scrolled ? "border-b border-ink/6 bg-canvas/85 shadow-[0_10px_40px_-28px_rgb(58_43_36/0.5)]" : "border-b border-transparent bg-canvas/60"
      }`}
    >
      <div className={`hdr-grid grid h-[4.5rem] items-center gap-4 lg:h-[5.25rem] ${pad}`}>
        {/* Left: menu button on phones, the logo on desktop */}
        <div className="flex items-center">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((x) => !x)}
            className="-ml-2 grid size-11 place-items-center rounded-full lg:hidden"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className="absolute top-0 left-0 h-px w-5 bg-ink" />
              <span className="absolute top-3 left-0 h-px w-3.5 bg-ink" />
            </span>
          </button>
          <Link href="/" className="hidden text-ink lg:block" aria-label="Rawdah Tours, home">
            <Logo className="logo-gold h-[3.4rem]" />
          </Link>
        </div>

        {/* Centre: the logo on phones; the pages on desktop (header-links.tsx, 24 Nov 2026). */}
        <Link href="/" className="text-ink lg:hidden" aria-label="Rawdah Tours, home">
          <Logo className="logo-gold h-10" />
        </Link>
        <HeaderLinks className="hidden lg:block" />

        {/* Right: the main button on desktop, WhatsApp on phones */}
        <div className="flex items-center justify-end gap-[clamp(1.1rem,2vw,2rem)]">
          <Link href={hajjRegister} className="btn-ink hidden h-11 items-center rounded-[0.85rem] px-5 text-[0.88rem] font-medium lg:inline-flex">
            Register interest
          </Link>
          <a href={pageWa(pathname)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" className="-mr-1 grid size-11 place-items-center rounded-full bg-(--raise) text-wa shadow-[0_6px_18px_-10px_rgb(58_43_36/0.4)] lg:hidden">
            <WaGlyph className="size-5" />
          </a>
        </div>
      </div>

      {open ? (
        <div className="wash-hero fixed inset-0 z-[70] overflow-y-auto pb-16 text-ink lg:hidden">
          <Emblem className="pointer-events-none absolute right-[-18%] bottom-[-4%] h-[70%] watermark" />
          <div className={`relative grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center ${pad}`}>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="-ml-2 grid size-11 place-items-center rounded-full">
              <svg viewBox="0 0 12 12" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </button>
            <Link href="/" onClick={() => setOpen(false)} aria-label="Rawdah Tours, home">
              <Logo className="logo-gold h-10" />
            </Link>
            <span />
          </div>
          <div className={`relative pt-4 ${pad}`}>
            <ul>
              {[tripLinks[0], tripLinks[1], ...nav.slice(2), tripLinks[2], tripLinks[3]].map((item) => (
                <li key={item.href} className="border-b border-ink/8">
                  <Link href={item.href} onClick={() => setOpen(false)} className="group flex items-center justify-between gap-4 py-3.5">
                    <span>
                      <span className="display block text-[1.9rem] leading-[1.1]">{item.label}</span>
                      {"note" in item ? <span className="mt-1 block text-[0.875rem] text-ink/62">{item.note}</span> : null}
                    </span>
                    <Chevron className="size-3 shrink-0 text-ink/35" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-9 grid grid-cols-1 gap-2.5">
              <Link href={hajjRegister} onClick={() => setOpen(false)} className="btn-ink flex h-[3.25rem] items-center justify-center gap-2 rounded-[0.95rem] text-[0.95rem] font-medium">
                Register for Hajj 2027 <Chevron className="size-3 opacity-70" />
              </Link>
              <a href={pageWa(pathname)} target="_blank" rel="noopener noreferrer" className="flex h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.95rem] border border-ink/15 bg-(--raise) text-[0.95rem] font-medium">
                <WaGlyph className="size-5 text-wa" /> WhatsApp us
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-1 text-[0.92rem] text-ink/68">
              <a href={brand.phone.href}>{brand.phone.display}</a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
