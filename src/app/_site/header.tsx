"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { brand, nav, say, strip, tripLinks, wa } from "@/app/_site/content";
import { Emblem, Logo } from "@/app/_site/shell";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

/**
 * The header: soft cream glass with the cocoa-on-cream logo at its centre,
 * the menu split either side on desktop. Phones: menu, logo, WhatsApp; the
 * menu opens a full-screen cream sheet.
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
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const pad = "px-[max(var(--hero-pad-x),env(safe-area-inset-left))]";
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const linkCls = "relative py-2 text-[0.9rem] text-ink/75 transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-1 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-px aria-[current=page]:after:bg-gold";
  const [hajj, trips, priv, groups, about] = nav;

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-500 ${open ? "" : "backdrop-blur-md"} ${
        scrolled ? "border-b border-ink/6 bg-canvas/85 shadow-[0_10px_40px_-28px_rgb(58_43_36/0.5)]" : "border-b border-transparent bg-canvas/60"
      }`}
    >
      <div className={`grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[5.25rem] ${pad}`}>
        {/* Left: menu button on phones, half the menu on desktop */}
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
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(1.1rem,2vw,2rem)]">
              <li>
                <Link href={hajj.href} aria-current={isCurrent(hajj.href) ? "page" : undefined} className={linkCls}>
                  {hajj.label}
                </Link>
              </li>
              {"children" in trips ? (
                <li className="relative" onMouseEnter={() => setPanel(true)} onMouseLeave={() => setPanel(false)}>
                  <button type="button" aria-expanded={panel} onClick={() => setPanel((x) => !x)} className="flex items-center gap-1.5 py-2 text-[0.9rem] text-ink/75 hover:text-ink">
                    {trips.label}
                    <Chevron dir="down" className={`size-3 transition-transform ${panel ? "-scale-x-100" : ""}`} />
                  </button>
                  {panel ? (
                    <div className="absolute top-full left-0 w-[22rem] pt-2">
                      <ul className="glass rounded-[1.25rem] p-2">
                        {trips.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="flex items-baseline justify-between gap-4 rounded-[0.9rem] px-4 py-3 transition-colors hover:bg-white/70">
                              <span className="font-editorial text-[1.2rem]">{c.label}</span>
                              <span className="text-[0.76rem] text-ink/50">{c.note}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ) : null}
              <li>
                <Link href={priv.href} aria-current={isCurrent(priv.href) ? "page" : undefined} className={linkCls}>
                  {priv.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Centre: the logo */}
        <Link href="/" className="text-ink" aria-label="Rawdah Tours, home">
          <Logo className="h-10 lg:h-[3.4rem]" />
        </Link>

        {/* Right: the other half on desktop, WhatsApp on phones */}
        <div className="flex items-center justify-end gap-[clamp(1.1rem,2vw,2rem)]">
          <nav aria-label="More" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(1.1rem,2vw,2rem)]">
              {[groups, about].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={strip.href} className="btn-ink hidden h-11 items-center rounded-[0.85rem] px-5 text-[0.88rem] font-medium lg:inline-flex">
            Register interest
          </Link>
          <a href={wa(say.general)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" className="-mr-1 grid size-11 place-items-center rounded-full bg-white/60 text-wa shadow-[0_6px_18px_-10px_rgb(58_43_36/0.4)] lg:hidden">
            <WaGlyph className="size-5" />
          </a>
        </div>
      </div>

      {open ? (
        <div className="wash-hero fixed inset-0 z-[70] overflow-y-auto pb-16 text-ink lg:hidden">
          <Emblem className="pointer-events-none absolute right-[-18%] bottom-[-4%] h-[70%] text-sand/25" />
          <div className={`relative grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center ${pad}`}>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="-ml-2 grid size-11 place-items-center rounded-full">
              <svg viewBox="0 0 12 12" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </button>
            <Link href="/" onClick={() => setOpen(false)} aria-label="Rawdah Tours, home">
              <Logo className="h-10" />
            </Link>
            <span />
          </div>
          <div className={`relative pt-8 ${pad}`}>
            <ul>
              {[tripLinks[0], tripLinks[1], ...nav.slice(2), tripLinks[2], tripLinks[3]].map((item) => (
                <li key={item.href} className="border-b border-ink/8">
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="display text-[2rem]">{item.label}</span>
                    {"note" in item ? <span className="text-right text-[0.76rem] text-ink/50">{item.note}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-9 grid grid-cols-1 gap-2.5">
              <Link href={strip.href} onClick={() => setOpen(false)} className="btn-ink flex h-[3.25rem] items-center justify-center gap-2 rounded-[0.95rem] text-[0.95rem] font-medium">
                Register for Hajj 2027 <Chevron className="size-3 opacity-70" />
              </Link>
              <a href={wa(say.general)} target="_blank" rel="noopener noreferrer" className="flex h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.95rem] border border-ink/15 bg-white/50 text-[0.95rem] font-medium">
                <WaGlyph className="size-5 text-wa" /> WhatsApp us
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-1 text-[0.92rem] text-ink/60">
              <a href={brand.phone.href}>{brand.phone.display}</a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
