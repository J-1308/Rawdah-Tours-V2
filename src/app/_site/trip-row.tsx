import Image from "next/image";
import Link from "next/link";

import { anchors, fromPrice, gbp, monthly, routeText, stateLabel, wa, type Journey } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

export const tripHref = (j: Journey) => `/trips/${j.slug}`;

/** The state as a small square-cornered tag. */
export function StateTag({ j, className = "" }: { j: Journey; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-[2px] px-2 py-1 text-[0.72rem] font-medium ${j.state === "past" ? "bg-canvas text-ink" : "bg-gold-soft text-ink-deep"} ${className}`}>
      {stateLabel[j.state]}
      <Mark s={j.stateStatus} />
    </span>
  );
}

/**
 * A trip as a row: a square photo, the name and facts, and a price block with
 * the actions. Phones: photo and name side by side, then facts, then price.
 */
export function TripRow({ j, tone = "canvas" }: { j: Journey; tone?: "canvas" | "ink" }) {
  const price = fromPrice(j);
  const href = tripHref(j);
  const dark = tone === "ink";
  const line = dark ? "border-canvas/15" : "border-ink/15";
  const soft = dark ? "text-canvas/65" : "text-ink/60";
  const panel = dark ? "bg-clay" : "bg-canvas-warm";
  const cta = j.state === "past" ? "See the trip" : j.state === "open" ? "Book your place" : "Register interest";
  const ctaHref = j.state === "past" ? href : `${href}#${anchors.join}`;

  const facts: { k: string; v: string; s?: Journey["dates"]["status"] }[] = [
    { k: "Dates", v: j.dates.value, s: j.dates.status },
    { k: j.kind === "hajj" ? "The rites" : "Route", v: routeText(j), s: j.route.status },
    { k: j.kind === "hajj" ? "Guide" : "Teachers", v: j.teacher.value, s: j.teacher.status },
  ];

  return (
    <article className={`grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-5 border-t py-6 sm:grid-cols-[10rem_1fr] lg:grid-cols-[14rem_1fr_19rem] lg:gap-x-10 lg:py-8 ${line}`}>
      <Link href={href} className="relative col-start-1 row-start-1 block aspect-square overflow-hidden bg-ink-deep lg:row-span-2" tabIndex={-1} aria-hidden>
        <Image src={j.photo.src} alt="" fill sizes="(min-width: 1024px) 14rem, (min-width: 640px) 10rem, 6.5rem" className={`object-cover transition-transform duration-700 hover:scale-[1.03] ${j.photo.position ?? ""}`} />
      </Link>

      <div className="col-start-2 row-start-1 self-center lg:self-start">
        <StateTag j={j} />
        <h3 className="display mt-2.5 text-[clamp(1.7rem,2.6vw,2.4rem)]">
          <Link href={href} className="hover:underline hover:decoration-gold hover:decoration-2 hover:underline-offset-[0.2em]">
            {j.name}
          </Link>
        </h3>
        <p className={`mt-1.5 hidden text-[0.96rem] sm:block ${soft}`}>{j.tagline}</p>
      </div>

      <dl className={`col-span-2 row-start-2 grid grid-cols-1 gap-2 text-[0.92rem] sm:grid-cols-[auto_1fr] sm:gap-x-5 lg:col-span-1 lg:col-start-2 lg:row-start-2 lg:self-end`}>
        {facts.map((f) => (
          <div key={f.k} className="grid grid-cols-[5.5rem_1fr] gap-3 sm:contents">
            <dt className={soft}>{f.k}</dt>
            <dd>
              {f.v}
              <Mark s={f.s} />
            </dd>
          </div>
        ))}
      </dl>

      <div className={`col-span-2 row-start-3 flex flex-col justify-between gap-4 rounded-[3px] p-4 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 ${panel}`}>
        {price ? (
          <div>
            <p className={`text-[0.8rem] ${soft}`}>{j.state === "past" ? "Was from" : "From"}</p>
            <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <span className="display text-[2.4rem] leading-none">{gbp(price)}</span>
              <span className={`text-[0.84rem] ${soft}`}>per person</span>
              <Mark s={j.rooms?.status} />
            </p>
            {j.deposit ? (
              <p className={`mt-1.5 text-[0.84rem] ${soft}`}>
                {gbp(j.deposit.value)} deposit
                {j.months ? `, then ${j.months.value} × ${gbp(monthly(price, j.deposit.value, j.months.value))}` : ""}
                <Mark s={j.months?.status ?? j.deposit.status} />
              </p>
            ) : null}
          </div>
        ) : (
          <div>
            <p className={`text-[0.8rem] ${soft}`}>Prices</p>
            <p className="display mt-0.5 text-[1.6rem] leading-tight">On Nusuk</p>
            <p className={`mt-1.5 text-[0.84rem] ${soft}`}>
              {j.priceNote?.value}
              <Mark s={j.priceNote?.status} />
            </p>
          </div>
        )}
        <div className="flex gap-1.5">
          <Link href={ctaHref} className={`group flex min-h-12 flex-1 items-stretch justify-between overflow-hidden rounded-[3px] text-[0.92rem] font-medium ${dark ? "bg-gold-soft text-ink-deep" : "bg-ink text-canvas"}`}>
            <span className="flex items-center px-4">{cta}</span>
            <span aria-hidden className={`grid w-12 place-items-center ${dark ? "bg-[#c4a46b]" : "bg-ink-deep text-gold-soft"}`}>
              <Chevron className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <a href={wa(j.waText)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${j.name} on WhatsApp`} className="grid size-12 place-items-center rounded-[3px] bg-wa text-white">
            <WaGlyph className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
