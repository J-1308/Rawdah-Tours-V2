"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { anchors, routes, say, strip, wa } from "@/app/_site/content";

/** The WhatsApp glyph, for links that open a WhatsApp chat. */
export function WaGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/** Desktop: a soft round WhatsApp button fixed to the bottom right of every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={wa(say.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Rawdah Tours on WhatsApp"
      title="Message us on WhatsApp"
      className="fixed right-6 bottom-6 z-50 hidden size-14 place-items-center rounded-full border border-white/70 bg-canvas/90 text-wa shadow-[var(--shadow-float)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 lg:grid"
    >
      <WaGlyph className="size-7" />
    </a>
  );
}

/** Phones: a soft cream bar pinned to the bottom, WhatsApp and the page's main action. */
export function MobileBar() {
  const path = usePathname();
  if (path.includes("/book")) return null;
  const onTrip = path.startsWith("/trips/") && path.split("/").length === 3;
  const cta = path.startsWith(routes.private)
    ? { label: "Plan my Umrah", href: "#planner" }
    : path.startsWith(routes.groups)
      ? { label: "Plan a group trip", href: "#start" }
      : onTrip
        ? { label: path.includes("path-of-purity") ? "Hear about the next" : "Register interest", href: `#${anchors.join}` }
        : { label: strip.cta, href: strip.href };
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className="grid grid-cols-[auto_1fr] gap-1.5 rounded-[1.15rem] border border-white/70 bg-canvas/85 p-1.5 shadow-[var(--shadow-float)] backdrop-blur-md">
        <a href={wa(say.general)} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center gap-2 rounded-[0.85rem] bg-white/70 px-4 text-[0.92rem] font-medium text-ink">
          <WaGlyph className="size-5 text-wa" />
          WhatsApp
        </a>
        <Link href={cta.href} className="btn-ink flex h-12 items-center justify-center gap-2 rounded-[0.85rem] px-4 text-[0.92rem] font-medium">
          {cta.label}
          <Chevron className="size-3 opacity-70" />
        </Link>
      </div>
    </div>
  );
}

export function Chevron({ className = "size-3.5", dir = "right" }: { className?: string; dir?: "right" | "down" }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={`${className} ${dir === "down" ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4.5 2.5 8 6l-3.5 3.5" strokeLinecap="square" />
    </svg>
  );
}
