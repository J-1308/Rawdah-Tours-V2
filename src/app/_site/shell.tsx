import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { brand, routes, say, strip, tripLinks, wa } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

/**
 * Rawdah's kit. Shape comes from the logo's square-kufic grid: squared
 * corners, square markers, tile buttons (a label plus a square cell), photos
 * as tiles or framed with an offset gold square. Headlines are Cormorant
 * semibold, upright, one colour. See docs/design-system.md.
 *
 * Grounds: ivory (canvas) by default; date brown (ink) for people and the
 * last trip; sand (canvas-warm) for pauses; sand-gold (gold-soft) for the
 * Hajj band and the closing call; clay for reviews.
 */

export const gutter = "px-[max(var(--hero-pad-x),env(safe-area-inset-left))]";

/** On date brown or clay: review marks in sand-gold so they stay legible. */
export const onInk = "[&_.site-mark]:border-gold-soft/60 [&_.site-mark]:text-gold-soft";
/** On sand-gold: review marks in date brown. */
export const onGold = "[&_.site-mark]:border-ink/50 [&_.site-mark]:text-ink";

/** The small gold square: Rawdah's marker, taken from the logo's grid. */
export function Square({ className = "bg-gold" }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-[7px] shrink-0 ${className}`} />;
}

/** A short sentence-case label with the square. Used only where it tells the reader something. */
export function Label({ children, tone = "ink", className = "" }: { children: ReactNode; tone?: "ink" | "canvas" | "gold"; className?: string }) {
  const color = tone === "canvas" ? "text-gold-soft" : tone === "gold" ? "text-ink" : "text-bronze";
  const sq = tone === "canvas" ? "bg-gold-soft" : tone === "gold" ? "bg-ink" : "bg-gold";
  return (
    <p className={`flex items-center gap-2.5 text-[0.84rem] font-medium ${color} ${className}`}>
      <Square className={sq} />
      <span>{children}</span>
    </p>
  );
}

/** A Cormorant semibold headline, upright and in one colour. */
export function Heading({ as: Tag = "h2", children, className = "", id }: { as?: "h1" | "h2" | "h3"; children: ReactNode; className?: string; id?: string }) {
  return (
    <Tag id={id} className={`display ${className}`}>
      {children}
    </Tag>
  );
}

type Tone = "ink" | "gold" | "line-ink" | "line-canvas";

const tileTone: Record<Tone, { box: string; cell: string }> = {
  ink: { box: "bg-ink text-canvas hover:bg-ink-deep", cell: "bg-ink-deep text-gold-soft" },
  gold: { box: "bg-gold-soft text-ink-deep hover:bg-cream", cell: "bg-[#c4a46b] text-ink-deep" },
  "line-ink": { box: "border border-ink/30 text-ink hover:border-ink", cell: "border-l border-ink/20" },
  "line-canvas": { box: "border border-canvas/35 text-canvas hover:border-canvas", cell: "border-l border-canvas/25" },
};

/** The tile button: a label and a square cell with a chevron. Full width on phones. */
export function TileLink({ href, children, tone = "ink", className = "" }: { href: string; children: ReactNode; tone?: Tone; className?: string }) {
  const t = tileTone[tone];
  return (
    <Link href={href} className={`group inline-flex min-h-[3.25rem] items-stretch justify-between overflow-hidden rounded-[3px] text-[0.95rem] font-medium transition-colors ${t.box} ${className}`}>
      <span className="flex items-center px-5 py-3">{children}</span>
      <span aria-hidden className={`grid w-[3.25rem] shrink-0 place-items-center ${t.cell}`}>
        <Chevron className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** WhatsApp as a tile: the glyph in its own square cell, then the label. */
export function WaTile({ text, label = "WhatsApp us", tone = "solid", className = "" }: { text: string; label?: string; tone?: "solid" | "line-ink" | "line-canvas"; className?: string }) {
  const box =
    tone === "solid"
      ? "bg-wa text-white hover:brightness-95"
      : tone === "line-ink"
        ? "border border-ink/30 text-ink hover:border-ink"
        : "border border-canvas/35 text-canvas hover:border-canvas";
  const cell = tone === "solid" ? "bg-black/12" : tone === "line-ink" ? "border-r border-ink/20 text-wa" : "border-r border-canvas/25 text-wa";
  return (
    <a href={wa(text)} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-[3.25rem] items-stretch overflow-hidden rounded-[3px] text-[0.95rem] font-medium transition ${box} ${className}`}>
      <span aria-hidden className={`grid w-[3.25rem] shrink-0 place-items-center ${cell}`}>
        <WaGlyph className="size-5" />
      </span>
      <span className="flex items-center px-5 py-3">{label}</span>
    </a>
  );
}

/** A section's two actions: the main one and WhatsApp. Stacked full width on phones. */
export function Actions({
  primary,
  waText,
  waLabel,
  tone = "ink",
  className = "",
}: {
  primary?: { label: string; href: string };
  waText: string;
  waLabel?: string;
  /** The ground the buttons sit on. */
  tone?: "ink" | "canvas" | "gold";
  className?: string;
}) {
  const main: Tone = tone === "ink" ? "gold" : "ink";
  const line = tone === "ink" ? "line-canvas" : "line-ink";
  return (
    <div className={`flex flex-col gap-2.5 sm:flex-row sm:flex-wrap ${className}`}>
      {primary ? (
        <TileLink href={primary.href} tone={main}>
          {primary.label}
        </TileLink>
      ) : null}
      <WaTile text={waText} label={waLabel} tone={line} />
    </div>
  );
}

/** The sand-gold line above the header: Hajj 2027, always one tap away. */
export function AnnouncementStrip() {
  return (
    <div className="bg-gold-soft text-ink-deep">
      <Link href={strip.href} className={`flex items-center justify-between gap-4 py-2 text-[0.8rem] font-medium sm:justify-center ${gutter}`}>
        <span className="flex items-center gap-2.5">
          <Square className="bg-ink" />
          <span className="sm:hidden">{strip.short}</span>
          <span className="hidden sm:inline">{strip.text}</span>
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap underline decoration-ink/40 underline-offset-4">
          {strip.cta}
          <Chevron className="size-3" />
        </span>
      </Link>
    </div>
  );
}

/** The cream logo, Rawdah's main logo. It sits on date brown or clay. */
export function Logo({ className = "h-10 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/images/brand/logo-cream.png" alt="Rawdah Tours" width={1074} height={672} priority={priority} sizes="160px" className={className} />;
}

/** A photograph with an offset gold square behind it, like a tile set slightly out of the grid. */
export function Framed({
  src,
  alt,
  className = "aspect-[4/5]",
  position = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  offset = "bg-gold-soft",
  caption,
  captionTone = "ink",
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
  offset?: string;
  caption?: string;
  captionTone?: "ink" | "canvas";
}) {
  return (
    <figure>
      <div className="relative mr-3 mb-3">
        <span aria-hidden className={`absolute inset-0 translate-x-3 translate-y-3 ${offset}`} />
        <div className={`relative overflow-hidden bg-ink-deep ${className}`}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${position}`} />
        </div>
      </div>
      {caption ? <figcaption className={`mt-3 text-[0.8rem] ${captionTone === "canvas" ? "text-canvas/60" : "text-ink/55"}`}>{caption}</figcaption> : null}
    </figure>
  );
}

/** Three photos as tiles: one large, two small. Used at the head of inner pages. */
export function LeadMosaic({ photos, priority = false }: { photos: { src: string; alt: string; position?: string }[]; priority?: boolean }) {
  const [a, b, c] = photos;
  return (
    <div className="grid aspect-[3/2] grid-cols-3 grid-rows-2 gap-1.5">
      {[a, b, c].filter(Boolean).map((p, i) => (
        <div key={p.src} className={`tile-in relative overflow-hidden bg-ink-deep ${i === 0 ? "col-span-2 row-span-2" : ""}`} style={{ animationDelay: `${i * 90}ms` }}>
          <Image src={p.src} alt={p.alt} fill priority={priority && i === 0} sizes={i === 0 ? "(min-width: 1024px) 34vw, 66vw" : "(min-width: 1024px) 17vw, 33vw"} className={`object-cover ${p.position ?? ""}`} />
        </div>
      ))}
    </div>
  );
}

/** The head of an inner page: words on date brown beside a photo mosaic. Phones: the mosaic first. */
export function PageLead({
  label,
  title,
  photos,
  crumbs,
  children,
}: {
  label?: ReactNode;
  title: ReactNode;
  photos: { src: string; alt: string; position?: string }[];
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className={`bg-ink pt-5 pb-[clamp(2.75rem,6vw,5rem)] text-canvas ${onInk} ${gutter}`}>
      {crumbs ? (
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-2 text-[0.8rem] text-canvas/60">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i ? <span aria-hidden className="size-[5px] bg-canvas/35" /> : null}
              {c.href ? (
                <Link href={c.href} className="hover:text-canvas">
                  {c.label}
                </Link>
              ) : (
                <span className="text-canvas/90">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : null}
      <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:order-2 lg:col-span-6">
          <LeadMosaic photos={photos} priority />
        </div>
        <div className="lg:order-1 lg:col-span-6">
          {label ? <Label tone="canvas">{label}</Label> : null}
          <Heading as="h1" className="mt-4 text-[clamp(2.7rem,5.4vw,5.2rem)]">
            {title}
          </Heading>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Two short lists side by side: what is settled, and what is still being arranged. */
export function ConfirmedPending({
  confirmed,
  pending,
  tone = "canvas",
}: {
  confirmed?: { title: string; text: string }[];
  pending?: { title: string; text: string }[];
  tone?: "canvas" | "ink";
}) {
  const line = tone === "ink" ? "border-canvas/15" : "border-ink/12";
  const sub = tone === "ink" ? "text-canvas/70" : "text-ink/65";
  const list = (title: string, items: { title: string; text: string }[], filled: boolean) => (
    <div className={`rounded-[3px] border ${line} p-5`}>
      <p className="flex items-center gap-2.5 text-[1.35rem] font-editorial font-semibold">
        <span aria-hidden className={`size-3 ${filled ? "bg-[#3a8f5c]" : "border-[1.5px] border-bronze"}`} />
        {title}
      </p>
      <ul className="mt-3">
        {items.map((c) => (
          <li key={c.title} className={`border-t py-3 ${line}`}>
            <span className="block text-[0.95rem] font-medium">{c.title}</span>
            <span className={`block text-[0.88rem] ${sub}`}>{c.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <>
      {confirmed ? list("Settled", confirmed, true) : null}
      {pending ? list("Still being arranged", pending, false) : null}
    </>
  );
}

export function SiteFooter() {
  const link = "text-canvas/75 transition-colors hover:text-canvas";
  const cols = [
    { title: "Trips", links: tripLinks },
    {
      title: "Rawdah",
      links: [
        { label: "Private & family Umrah", href: routes.private },
        { label: "Masjids & groups", href: routes.groups },
        { label: "About us", href: routes.about },
        { label: "Common questions", href: routes.questions },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Terms and conditions", href: "/terms" },
        { label: "Privacy notice", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ];
  return (
    <footer className={`bg-ink pt-[clamp(3.5rem,7vw,6rem)] pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-canvas lg:pb-10 ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" aria-label="Rawdah Tours, home" className="inline-block">
            <Logo className="h-20 w-auto sm:h-24" />
          </Link>
          <p className="mt-6 max-w-[24rem] font-editorial text-[1.45rem] leading-snug text-canvas/90">Guided Umrah and Hajj from the UK, with teachers beside you.</p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <WaTile text={say.general} label="WhatsApp" />
            <a href={brand.phone.href} className="inline-flex min-h-[3.25rem] items-center rounded-[3px] border border-canvas/30 px-5 text-[0.95rem] hover:border-canvas">
              Call {brand.phone.display}
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <Label tone="canvas">{c.title}</Label>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 text-[0.94rem]">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="sm:col-span-3">
            <Label tone="canvas">Get in touch</Label>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.94rem]">
              <a href={`mailto:${brand.email}`} className={`break-all ${link}`}>
                {brand.email}
              </a>
              <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className={link}>
                Instagram {brand.instagram.handle}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={`mt-14 grid grid-cols-1 gap-2 border-t border-canvas/15 pt-6 text-[0.78rem] leading-relaxed text-canvas/55 ${onInk}`}>
        <p>
          Hajj packages are booked and paid on the official{" "}
          <a href={brand.nusuk} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-canvas">
            Nusuk Hajj platform
          </a>
          . Rawdah Tours does not take payment for Hajj packages.
        </p>
        <p>
          © {new Date().getFullYear()} {brand.legalName}, registered in England and Wales. Company number {brand.companyNumber.value}
          <Mark s={brand.companyNumber.status} />. Registered office: {brand.address}.
        </p>
      </div>
    </footer>
  );
}
