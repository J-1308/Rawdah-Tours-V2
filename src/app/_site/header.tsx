"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { brand, nav, say, strip, tripLinks, wa } from "@/app/_site/content";
import { Logo, Square } from "@/app/_site/shell";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

/**
 * The header, on date brown so the cream logo leads. Desktop: the logo, the
 * menu set beside it on the left, the phone number and the main action on
 * the right. Umrah trips opens a small list. Phones: logo, Register and a
 * square menu button opening a full-screen sheet.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);

  // Close the menus whenever the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setPanel(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const pad = "px-[max(var(--hero-pad-x),env(safe-area-inset-left))]";
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-40 border-b border-canvas/10 bg-ink text-canvas">
      <div className={`flex h-[4.25rem] items-center gap-8 lg:h-20 ${pad}`}>
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Rawdah Tours, home">
          <Logo priority className="h-11 w-auto lg:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(1rem,1.8vw,1.75rem)] text-[0.9rem]">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.href} className="relative" onMouseEnter={() => setPanel(true)} onMouseLeave={() => setPanel(false)}>
                  <button type="button" aria-expanded={panel} onClick={() => setPanel((x) => !x)} className="flex items-center gap-1.5 py-3 text-canvas/85 hover:text-canvas">
                    {item.label}
                    <Chevron dir="down" className={`size-3 transition-transform ${panel ? "-scale-x-100" : ""}`} />
                  </button>
                  {panel ? (
                    <div className="absolute top-full left-0 w-[22rem] pt-1">
                      <ul className="rounded-[3px] bg-canvas p-1.5 text-ink shadow-[6px_6px_0_rgb(36_25_20/0.6)]">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="flex items-center gap-3 rounded-[2px] px-3 py-3 hover:bg-canvas-warm">
                              <Square />
                              <span className="flex-1">{c.label}</span>
                              <span className="text-[0.76rem] text-ink/55">{c.note}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="relative py-3 text-canvas/85 hover:text-canvas aria-[current=page]:text-canvas aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-[3px] aria-[current=page]:after:bg-gold-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href={brand.phone.href} className="hidden pr-3 text-[0.88rem] text-canvas/80 hover:text-canvas xl:block">
            {brand.phone.display}
          </a>
          <Link href={strip.href} className="hidden h-11 items-center rounded-[3px] bg-gold-soft px-4 text-[0.88rem] font-medium text-ink-deep hover:bg-cream sm:inline-flex">
            {strip.cta}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((x) => !x)}
            className="grid size-11 place-items-center rounded-[3px] border border-canvas/25 lg:hidden"
          >
            <span aria-hidden className="grid grid-cols-2 gap-[3px]">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`size-[5px] ${i === 3 ? "bg-gold-soft" : "bg-canvas"}`} />
              ))}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-ink pb-16 text-canvas lg:hidden">
          <div className={`flex h-[4.25rem] items-center justify-between ${pad}`}>
            <Link href="/" onClick={() => setOpen(false)} aria-label="Rawdah Tours, home">
              <Logo className="h-11 w-auto" />
            </Link>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-[3px] border border-canvas/25">
              <svg viewBox="0 0 12 12" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </button>
          </div>
          <div className={`pt-6 ${pad}`}>
            <ul className="grid grid-cols-2 gap-1.5">
              {tripLinks.slice(0, 2).map((c) => (
                <li key={c.href}>
                  <Link href={c.href} onClick={() => setOpen(false)} className="flex h-full flex-col justify-between gap-6 rounded-[3px] bg-clay p-4">
                    <span className="display text-[1.6rem]">{c.label}</span>
                    <span className="text-[0.76rem] text-canvas/65">{c.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6">
              {[...tripLinks.slice(2), ...nav.slice(2)].map((item) => (
                <li key={item.href} className="border-b border-canvas/12">
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5">
                    <span className="display text-[1.55rem]">{item.label}</span>
                    <Chevron className="size-3.5 text-gold-soft" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-1 gap-2">
              <Link href={strip.href} onClick={() => setOpen(false)} className="flex h-[3.25rem] items-center justify-between rounded-[3px] bg-gold-soft pl-5 text-[0.95rem] font-medium text-ink-deep">
                Register for Hajj 2027
                <span aria-hidden className="grid h-full w-[3.25rem] place-items-center bg-[#c4a46b]">
                  <Chevron />
                </span>
              </Link>
              <a href={wa(say.general)} target="_blank" rel="noopener noreferrer" className="flex h-[3.25rem] items-center gap-3 rounded-[3px] bg-wa px-5 text-[0.95rem] font-medium text-white">
                <WaGlyph className="size-5" /> WhatsApp us
              </a>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-1 text-[0.92rem] text-canvas/70">
              <a href={brand.phone.href}>{brand.phone.display}</a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
