import Image from "next/image";
import { isEmptySlot, slotBriefs } from "@/app/_site/slots";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { brand, routes, say, strip, tripLinks, wa } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

/**
 * Rawdah's kit ("soft garden", ADR 0002). Warm creams that blend, soft
 * rounded photos with quiet shadows, gentle cocoa and sand buttons, Cormorant
 * headlines at a light weight, and the logo drawn from one SVG in any colour.
 * Sections fade into each other (globals.css .wash-*); the one dark ground is
 * a rounded cocoa panel (.panel-dark).
 */

export const gutter = "px-[max(var(--hero-pad-x),env(safe-area-inset-left))]";
export const inset = "mx-[max(calc(var(--hero-pad-x)*0.5),0.75rem)]";

/** On cocoa: review marks in sand so they stay legible. */
export const onInk = "[&_.site-mark]:border-sand/60 [&_.site-mark]:text-sand";
/** Kept for older sections on sand grounds. */
export const onGold = "[&_.site-mark]:border-ink/40 [&_.site-mark]:text-ink";

/** The Rawdah lockup (mark and wordmark), in the current text colour. */
export function Logo({ className = "h-12", label = "Rawdah Tours" }: { className?: string; label?: string; priority?: boolean }) {
  return <span role="img" aria-label={label} className={`logo-mask ${className}`} />;
}

/** The kufic mark on its own, in the current text colour. Decorative unless labelled. */
export function Emblem({ className = "h-4", style }: { className?: string; style?: CSSProperties }) {
  return <span aria-hidden className={`mark-mask ${className}`} style={style} />;
}

/** A small marker dot, kept for lists. */
export function Square({ className = "bg-gold" }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-[6px] shrink-0 rounded-full ${className}`} />;
}

/** A small italic label with the tiny kufic mark. Used only where it tells the reader something. */
export function Label({ children, tone = "ink", className = "" }: { children: ReactNode; tone?: "ink" | "canvas" | "gold"; className?: string }) {
  const color = tone === "canvas" ? "text-sand" : "text-bronze";
  return (
    <p className={`flex items-center gap-2.5 font-editorial text-[1.12rem] italic ${color} ${className}`}>
      <Emblem className={`h-[1.05em] ${tone === "canvas" ? "text-sand/80" : "text-gold"}`} />
      <span>{children}</span>
    </p>
  );
}

/** A Cormorant headline. */
export function Heading({ as: Tag = "h2", children, className = "", id }: { as?: "h1" | "h2" | "h3"; children: ReactNode; className?: string; id?: string }) {
  return (
    <Tag id={id} className={`display ${className}`}>
      {children}
    </Tag>
  );
}

type Tone = "ink" | "gold" | "line-ink" | "line-canvas";

const btnTone: Record<Tone, string> = {
  ink: "btn-ink",
  gold: "btn-sand",
  "line-ink": "border border-ink/20 bg-(--raise) text-ink hover:border-ink/45 hover:bg-(--raise-hi)",
  "line-canvas": "border border-cream/30 bg-white/5 text-cream hover:border-cream/60",
};

const btnBase = "group inline-flex min-h-[3.25rem] items-center justify-center rounded-[0.95rem] py-3 text-[0.95rem] font-medium transition-[background,border-color,transform] duration-300 active:scale-[0.99]";

/** The main button. Full width on phones when stacked in Actions. */
export function TileLink({ href, children, tone = "ink", className = "", pad = "gap-3 px-6" }: { href: string; children: ReactNode; tone?: Tone; className?: string; pad?: string }) {
  return (
    <Link href={href} className={`${btnBase} ${pad} ${btnTone[tone]} ${className}`}>
      {children}
      <Chevron className="size-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** WhatsApp as a soft button with the glyph. */
export function WaTile({ text, label = "WhatsApp us", tone = "line-ink", className = "" }: { text: string; label?: string; tone?: "solid" | "line-ink" | "line-canvas"; className?: string }) {
  const look = tone === "solid" ? "bg-wa text-white shadow-[0_14px_30px_-16px_rgb(31_168_85/0.7)] hover:brightness-95" : btnTone[tone];
  return (
    <a href={wa(text)} target="_blank" rel="noopener noreferrer" className={`${btnBase} gap-3 px-6 ${look} ${className}`}>
      <WaGlyph className={`size-5 ${tone === "solid" ? "" : "text-wa"}`} />
      {label}
    </a>
  );
}

/** WhatsApp as a square glyph button: beside the main button on phones, where the bottom bar already names WhatsApp. */
export function WaSquare({ text, tone = "line-ink", className = "" }: { text: string; tone?: "line-ink" | "line-canvas"; className?: string }) {
  return (
    <a href={wa(text)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us" className={`grid size-[3.25rem] shrink-0 place-items-center rounded-[0.95rem] text-wa transition-colors ${btnTone[tone]} ${className}`}>
      <WaGlyph className="size-[1.35rem]" />
    </a>
  );
}

/**
 * A section's two actions: the main one and WhatsApp. On phones the main
 * button fills the row and WhatsApp sits beside it as a glyph; from tablet
 * width both are full buttons.
 */
export function Actions({
  primary,
  waText,
  waLabel,
  tone = "canvas",
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
  if (!primary) {
    return (
      <div className={`flex flex-col gap-2.5 sm:flex-row sm:flex-wrap ${className}`}>
        <WaTile text={waText} label={waLabel} tone={line} />
      </div>
    );
  }
  return (
    <div className={`flex gap-2 sm:flex-wrap sm:gap-2.5 ${className}`}>
      <TileLink href={primary.href} tone={main} pad="gap-2 px-4 sm:gap-3 sm:px-6" className="min-w-0 flex-1 sm:flex-none">
        {primary.label}
      </TileLink>
      <WaSquare text={waText} tone={line} className="sm:hidden" />
      <span className="hidden sm:contents">
        <WaTile text={waText} label={waLabel} tone={line} />
      </span>
    </div>
  );
}

/**
 * A chapter of the page: a day (cream) or night (espresso) ground. Chapters
 * meet as soft rounded sheets (globals.css .chapter). "top" is the first
 * chapter, which follows the dark/light top switch with the header.
 */
export function Chapter({ tone, children, className = "", id }: { tone: "top" | "day" | "night"; children: ReactNode; className?: string; id?: string }) {
  const look = tone === "top" ? "top-zone" : tone === "night" ? "night" : "";
  return (
    <div id={id} className={`chapter ${look} ${className}`}>
      {children}
    </div>
  );
}

/** A quiet line above the header: Hajj 2027, always one tap away. */
export function AnnouncementStrip() {
  return (
    <div className="top-zone bg-beige/70 text-ink">
      <Link href={strip.href} className={`flex min-h-10 items-center justify-center gap-3 py-2 text-[0.8rem] ${gutter}`}>
        <Emblem className="h-3.5 text-bronze" />
        <span className="sm:hidden">{strip.short}</span>
        <span className="hidden sm:inline">{strip.text}</span>
        <span className="font-medium whitespace-nowrap text-bronze underline decoration-bronze/40 underline-offset-4">{strip.cta}</span>
      </Link>
    </div>
  );
}

type Photo = { src: string; alt: string; position?: string };

/** A soft rounded photograph with a quiet shadow. */
export function Framed({
  src,
  alt,
  className = "aspect-[4/5]",
  position = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  caption,
  captionTone = "ink",
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
  /** Ignored; kept so older call sites compile. */
  offset?: string;
  caption?: string;
  captionTone?: "ink" | "canvas";
}) {
  return (
    <figure>
      <div className={`relative overflow-hidden rounded-[1.75rem] bg-beige shadow-[var(--shadow-soft)] ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${position}`} />
      </div>
      {caption ? <figcaption className={`mt-3 font-editorial text-[1rem] italic ${captionTone === "canvas" ? "text-cream/60" : "text-ink/65"}`}>{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * One photograph, cleanly framed: no layered photos (Jibril, 31 Oct). Extra
 * photos passed in are ignored here; they appear in galleries further down.
 */
/** A photo that fills its frame, or, for an empty slot, a placeholder saying what photo goes there. */
export function Pic({ src, alt, sizes, className = "", priority = false, quality }: { src: string; alt: string; sizes: string; className?: string; priority?: boolean; quality?: number }) {
  if (!isEmptySlot(src)) return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} quality={quality} className={className} />;
  const name = (src.split("/").pop() ?? "").replace(/\.[^.]+$/, "");
  return (
    <div className="absolute inset-0 grid place-items-center border-2 border-dashed border-bronze/45 bg-(--raise) p-5 text-center">
      <Emblem className="pointer-events-none absolute inset-0 m-auto h-[70%] text-bronze/[0.07]" />
      <div className="relative max-w-[17rem]">
        <p className="font-display text-[0.7rem] font-medium tracking-[0.14em] text-bronze uppercase">Photo to come</p>
        <p className="mt-2 font-editorial text-[1.05rem] leading-snug text-ink/80 italic">{slotBriefs[name] ?? alt}</p>
        <p className="mt-2 font-mono text-[0.68rem] text-ink/55">images/slots/{name}.jpg</p>
      </div>
    </div>
  );
}

export function PhotoStack({ photos, priority = false, className = "", aspect = "aspect-[4/5]" }: { photos: Photo[]; priority?: boolean; flip?: boolean; className?: string; aspect?: string }) {
  const [a] = photos;
  return (
    <div className={`settle relative overflow-hidden rounded-[2rem] bg-beige shadow-[var(--shadow-soft)] ${aspect} ${className}`}>
      <Pic src={a.src} alt={a.alt} priority={priority} sizes="(min-width: 1024px) 45vw, 100vw" quality={85} className={`object-cover ${a.position ?? ""}`} />
    </div>
  );
}

/** Kept for older call sites: now a PhotoStack. */
export function LeadMosaic({ photos, priority = false }: { photos: Photo[]; priority?: boolean }) {
  return <PhotoStack photos={photos} priority={priority} />;
}

/** The head of an inner page: words beside layered photos, on a softly lit cream ground with the mark embossed. */
export function PageLead({
  label,
  title,
  photos,
  crumbs,
  children,
}: {
  label?: ReactNode;
  title: ReactNode;
  photos: Photo[];
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className={`wash-hero relative overflow-hidden pt-5 pb-[clamp(3rem,8vw,7rem)] ${gutter}`}>
      <Emblem className="pointer-events-none absolute top-[-8%] right-[-6%] h-[115%] watermark" />
      {crumbs ? (
        <nav aria-label="Breadcrumb" className="relative mb-4 flex flex-wrap items-center gap-x-2 text-[0.82rem] text-ink/65 sm:mb-6">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i ? <span aria-hidden className="text-ink/30">/</span> : null}
              {c.href ? (
                <Link href={c.href} className="-my-2 py-2 hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink/80">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : null}
      <div className="relative grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:order-2 lg:col-span-6">
          <PhotoStack photos={photos} priority aspect="aspect-[4/3] lg:aspect-[4/5]" className="lg:ml-auto lg:max-w-[34rem]" />
        </div>
        <div className="lg:order-1 lg:col-span-6">
          {label ? <Label>{label}</Label> : null}
          <Heading as="h1" className="mt-4 text-[clamp(2.8rem,5.4vw,5.4rem)]">
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
}: {
  confirmed?: { title: string; text: string }[];
  pending?: { title: string; text: string }[];
  tone?: "canvas" | "ink";
}) {
  const list = (title: string, items: { title: string; text: string }[], settled: boolean) => (
    <div className="glass rounded-[1.5rem] p-6">
      <p className="flex items-center gap-2.5 font-editorial text-[1.45rem]">
        <span aria-hidden className={`size-2.5 rounded-full ${settled ? "bg-[#6f9a74]" : "border-[1.5px] border-gold"}`} />
        {title}
      </p>
      <ul className="mt-3">
        {items.map((c) => (
          <li key={c.title} className="border-t border-ink/8 py-3">
            <span className="block text-[0.95rem] font-medium">{c.title}</span>
            <span className="block text-[0.88rem] text-ink/68">{c.text}</span>
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
  const link = "text-cream/70 transition-colors hover:text-cream";
  const cols = [
    { title: "Trips", links: tripLinks },
    {
      title: "Rawdah",
      links: [
        { label: "Private & family Umrah", href: routes.private },
        { label: "Groups & organisations", href: routes.groups },
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
    <footer className={`chapter-foot panel-dark relative overflow-hidden pt-[clamp(3.25rem,8vw,6.5rem)] pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-10 ${gutter} ${onInk}`}>
      <Emblem className="pointer-events-none absolute right-[-4%] bottom-[-10%] h-[85%] text-cream/[0.05]" />
      <div className="relative grid grid-cols-1 gap-x-14 gap-y-11 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" aria-label="Rawdah Tours, home" className="inline-block text-cream">
            <Logo className="logo-gold h-16 sm:h-24" />
          </Link>
          <p className="mt-6 max-w-[24rem] font-editorial text-[1.35rem] leading-snug text-cream/85 sm:mt-7 sm:text-[1.5rem]">Guided Umrah and Hajj from the UK, with teachers beside you.</p>
          <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-2.5">
            <WaTile text={say.general} label="WhatsApp" tone="line-canvas" className="px-3! sm:px-6!" />
            <a href={brand.phone.href} className={`${btnBase} px-3 sm:px-6 ${btnTone["line-canvas"]}`}>
              <span>
                Call <span className="hidden sm:inline">{brand.phone.display}</span>
                <span className="sm:hidden">us</span>
              </span>
            </a>
          </div>
        </div>
        {/* Phones: two link columns, the policies on one line, then how to reach us. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 sm:gap-10 lg:col-span-7">
          {cols.map((c) => {
            const policies = c.title === "Policies";
            return (
              <nav key={c.title} aria-label={c.title} className={policies ? "col-span-2 sm:col-span-1" : ""}>
                <p className="font-editorial text-[1.15rem] text-sand italic">{c.title}</p>
                <ul className={`mt-3 text-[0.94rem] sm:mt-4 sm:grid sm:grid-cols-1 sm:gap-2.5 ${policies ? "flex flex-wrap gap-x-5 gap-y-2" : "grid grid-cols-1 gap-2"}`}>
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={`inline-block py-0.5 ${link}`}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
          <div className="col-span-2 sm:col-span-3">
            <p className="font-editorial text-[1.15rem] text-sand italic">Get in touch</p>
            <p className="mt-3 flex flex-col gap-2 text-[0.94rem] sm:mt-4 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href={brand.phone.href} className={link}>
                {brand.phone.display}
              </a>
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
      <div className="relative mt-11 grid grid-cols-1 gap-2 border-t border-cream/12 pt-6 sm:mt-14 text-[0.78rem] leading-relaxed text-cream/50">
        <p>
          Hajj packages are booked and paid on the official{" "}
          <a href={brand.nusuk} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-cream">
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

/** A small soft tick for lists of what's included. */
export function Tick({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`grid size-[1.1rem] shrink-0 place-items-center rounded-full bg-gold/20 text-bronze ${className}`}>
      <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
