import Image from "next/image";
import Link from "next/link";

import { anchors, fromPrice, gbp, monthly, routeText, stateLabel, wa, type Journey } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

export const tripHref = (j: Journey) => `/trips/${j.slug}`;

/** The state as a small soft tag. */
export function StateTag({ j, className = "" }: { j: Journey; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.78rem] font-medium backdrop-blur ${
        j.state === "past" ? "bg-white/80 text-ink/70" : "bg-white/85 text-ink"
      } ${className}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${j.state === "past" ? "bg-ink/30" : "bg-[#6f9a74]"}`} />
      {stateLabel[j.state]}
      <Mark s={j.stateStatus} />
    </span>
  );
}

/**
 * A trip as a soft card: a rounded photo with its state, the name and facts,
 * and a price panel with the actions. Phones: photo on top.
 */
export function TripRow({ j }: { j: Journey; tone?: "canvas" | "ink" }) {
  const price = fromPrice(j);
  const href = tripHref(j);
  const cta = j.state === "past" ? "See the trip" : j.state === "open" ? "Book your place" : "Register interest";
  const ctaHref = j.state === "past" ? href : `${href}#${anchors.join}`;

  const facts: { k: string; v: string; s?: Journey["dates"]["status"] }[] = [
    { k: "Dates", v: j.dates.value, s: j.dates.status },
    { k: j.kind === "hajj" ? "The rites" : "Route", v: routeText(j), s: j.route.status },
    { k: j.kind === "hajj" ? "Guide" : "Teachers", v: j.teacher.value, s: j.teacher.status },
  ];

  return (
    <article className="glass grid grid-cols-1 gap-4 rounded-[1.75rem] p-2.5 sm:gap-5 sm:rounded-[2rem] sm:p-4 lg:grid-cols-[19rem_1fr_18rem] lg:gap-8">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[16/9] overflow-hidden rounded-[1.35rem] bg-beige sm:aspect-[16/10] sm:rounded-[1.5rem] lg:aspect-auto lg:min-h-[15rem]">
        <Image src={j.photo.src} alt="" fill sizes="(min-width: 1024px) 19rem, 100vw" className={`object-cover transition-transform duration-[1.2s] hover:scale-[1.04] ${j.photo.position ?? ""}`} />
        <StateTag j={j} className="absolute top-3 left-3" />
      </Link>

      <div className="flex flex-col justify-center px-2.5 lg:px-0 lg:py-3">
        <h3 className="display text-[clamp(1.9rem,2.8vw,2.6rem)]">
          <Link href={href} className="transition-colors hover:text-bronze">
            {j.name}
          </Link>
        </h3>
        <p className="mt-1 font-editorial text-[1.1rem] leading-snug text-ink/65 italic sm:mt-1.5 sm:text-[1.15rem]">{j.tagline}</p>
        <dl className="mt-4 grid grid-cols-[5.25rem_1fr] gap-x-3 gap-y-2 text-[0.9rem] sm:mt-5 sm:grid-cols-[5.5rem_1fr] sm:gap-x-4 sm:text-[0.92rem]">
          {facts.map((f) => (
            <div key={f.k} className="contents">
              <dt className="text-ink/50">{f.k}</dt>
              <dd className="text-ink/85">
                {f.v}
                <Mark s={f.s} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-[1.35rem] bg-canvas-warm/80 p-4 sm:gap-5 sm:rounded-[1.5rem] sm:p-5">
        {price ? (
          <div>
            <p className="text-[0.8rem] text-ink/55">{j.state === "past" ? "Was from" : "From"}</p>
            <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <span className="display text-[2.3rem] leading-none sm:text-[2.6rem]">{gbp(price)}</span>
              <span className="text-[0.84rem] text-ink/55">per person</span>
              <Mark s={j.rooms?.status} />
            </p>
            {j.deposit ? (
              <p className="mt-2 text-[0.84rem] text-ink/60">
                {gbp(j.deposit.value)} deposit
                {j.months ? `, then ${j.months.value} × ${gbp(monthly(price, j.deposit.value, j.months.value))}` : ""}
                <Mark s={j.months?.status ?? j.deposit.status} />
              </p>
            ) : null}
          </div>
        ) : (
          <div>
            <p className="text-[0.8rem] text-ink/55">Prices</p>
            <p className="display mt-0.5 text-[1.8rem] leading-tight">On Nusuk</p>
            <p className="mt-2 text-[0.84rem] text-ink/60">
              {j.priceNote?.value}
              <Mark s={j.priceNote?.status} />
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <Link href={ctaHref} className="btn-ink group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[0.9rem] px-4 text-[0.92rem] font-medium">
            {cta}
            <Chevron className="size-3 opacity-70 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a href={wa(j.waText)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${j.name} on WhatsApp`} className="grid size-12 place-items-center rounded-[0.9rem] border border-ink/12 bg-white/70 text-wa">
            <WaGlyph className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
