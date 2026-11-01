import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { anchors, closing, covers, type Faq, faqs, faqTopics, gbp, groupsBand, hajjBand, hajjRegister, hero, journeys, lastTrip, meaning, partners, paying, people, privateBand, reviews, routes, say, starts, type Status, stay, whyRawdah } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Actions, Emblem, gutter, Heading, Label, onInk, PartnerLogo, PhotoStack, Pic, Tick, TileLink, WaSquare, WaTile } from "@/app/_site/shell";

export { Tick } from "@/app/_site/shell";
import { fitFrame, slot } from "@/app/_site/slots";
import { TripRow } from "@/app/_site/trip-row";
import { allMembers, TeamLine, TeamList, type Member } from "@/app/_site/trip-parts";
import { Chevron } from "@/app/_site/whatsapp";

const pad = "py-[clamp(3.25rem,9vw,8rem)]";
const h2 = "text-[clamp(2.5rem,4.6vw,4.4rem)]";
/** Rounded panels sit closer to the page edge than text does. */
const bleed: CSSProperties = { marginInline: "calc(-1 * max(var(--hero-pad-x), env(safe-area-inset-left)))", paddingInline: "max(var(--hero-pad-x), env(safe-area-inset-left))", scrollPaddingInline: "max(var(--hero-pad-x), env(safe-area-inset-left))" };

function Dot() {
  return <span aria-hidden className="mt-[0.55em] size-[5px] shrink-0 rounded-full bg-gold" />;
}

/* ------------------------------------------------------------------------ */
/* Hero: the words on a softly lit cream ground, the mark embossed behind,   */
/* and the group in layered photographs.                                     */
/* ------------------------------------------------------------------------ */

export function Hero() {
  const [a] = hero.mosaic;
  return (
    <section className="wash-hero relative isolate overflow-hidden">
      {/* The photograph across the full width, dissolving into the ground; the words beneath it, the mark embossed behind them. */}
      <div className="settle relative h-[min(17.5rem,64vw)] w-full sm:h-[min(30rem,70vw)] lg:h-[min(60svh,42vw)]">
        <Image src={a.src} alt={a.alt} fill priority quality={85} sizes="100vw" className="night-photo object-cover object-[50%_68%] sm:object-[50%_55%] lg:object-[50%_50%]" />
      </div>
      <Emblem className="pointer-events-none absolute top-[18%] left-[-14%] -z-10 h-[90%] watermark lg:top-auto lg:bottom-[-22%] lg:left-[-5%] lg:h-[85%]" />
      <div className={`relative grid grid-cols-1 lg:-mt-[clamp(5rem,7vw,7.5rem)] lg:grid-cols-12 lg:items-end lg:gap-x-12 ${gutter}`}>
        <div className="-mt-8 sm:-mt-12 lg:col-span-7 lg:mt-0">
          <Label>{hero.label}</Label>
          <Heading as="h1" className="mt-4 text-[clamp(2.9rem,5.8vw,6rem)] text-ink sm:mt-5">
            {hero.headline}
          </Heading>
        </div>
        <div className="pb-[clamp(3.5rem,9vw,7rem)] lg:col-span-5 lg:pb-[clamp(4.5rem,6vw,6.5rem)]">
          <p className="mt-5 max-w-[33rem] text-[1.02rem] leading-[1.7] text-ink/70 sm:mt-6 sm:text-[1.04rem] sm:leading-[1.75] lg:mt-0">
            {hero.text.value}
            <Mark s={hero.text.status} />
          </p>
          <Actions primary={{ label: "Register for Hajj 2027", href: hajjRegister }} waText={say.general} className="mt-7 sm:mt-9 lg:mt-7" />
          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-[0.86rem] text-ink/65 sm:mt-10 sm:gap-y-2.5 lg:mt-8">
            {hero.facts.map((f) => (
              <li key={f.value} className="flex items-start gap-2.5">
                <Dot />
                <span>
                  {f.value}
                  <Mark s={f.status} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Where would you like to start? A card with a photograph for each.         */
/* ------------------------------------------------------------------------ */

export function Starts() {
  return (
    <section className={`pt-[clamp(2.25rem,6vw,5rem)] ${gutter}`}>
      <Heading className="text-[clamp(2.2rem,3.6vw,3.4rem)]">Where would you like to start?</Heading>
      {/* Phones: every way in at a glance, one row each, nothing hidden off the side. */}
      <ul className="mt-6 grid gap-2.5 pb-8 sm:hidden">
        {starts.map((s) => (
          <li key={s.title}>
            <Link href={s.href} className="glass group flex items-center gap-4 rounded-[1.4rem] p-2 pr-4 active:scale-[0.99]">
              <span className="relative block aspect-[4/3] w-[6.75rem] shrink-0 overflow-hidden rounded-[1rem] bg-beige">
                <Pic src={s.photo.src} alt="" sizes="7rem" className={`object-cover ${s.photo.position}`} />
              </span>
              <span className="min-w-0 flex-1 py-1">
                <span className="block text-[0.74rem] font-medium tracking-[0.02em] text-bronze">{s.tag.value}</span>
                <span className="display mt-0.5 block text-[1.45rem] leading-[1.1]">{s.title}</span>
                <span className="mt-1 block text-[0.84rem] leading-[1.4] text-ink/65">{s.text}</span>
              </span>
              <Chevron className="size-3 shrink-0 text-ink/45 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
      <ul className="no-scrollbar mt-8 hidden snap-x snap-mandatory gap-4 overflow-x-auto pb-8 sm:flex lg:mx-0! lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0!" style={bleed}>
        {starts.map((s) => (
          <li key={s.title} className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
            <Link href={s.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-beige shadow-[var(--shadow-lift)] lg:aspect-[5/4]">
                <Pic src={s.photo.src} alt="" sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 84vw" className={`object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] ${s.photo.position}`} />
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(42_31_26/0.85)_0%,rgb(42_31_26/0.25)_45%,transparent_70%)]" />
                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[0.78rem] font-medium text-cream [&_.site-mark]:border-sand/60 [&_.site-mark]:text-sand">
                  {s.tag.value}
                  <Mark s={s.tag.status} />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <p className="display flex items-center justify-between gap-3 text-[1.95rem]">
                    {s.title}
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                      <Chevron className="size-3" />
                    </span>
                  </p>
                  <p className="mt-1 text-[0.88rem] leading-[1.5] text-cream/80">{s.text}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Our trips, as soft cards with a price panel each.                         */
/* ------------------------------------------------------------------------ */

export function Trips() {
  return (
    <section id="trips" className={`scroll-mt-24 pt-[clamp(2rem,6vw,5rem)] pb-[clamp(3.25rem,9vw,8rem)] ${gutter}`}>
      <div className="flex items-end justify-between gap-6">
        <Heading className={h2}>Our trips</Heading>
        <Link href={routes.trips} className="group mb-2 flex items-center gap-1.5 text-[0.92rem] font-medium text-bronze">
          Every trip <Chevron className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="mt-9 grid gap-5">
        {journeys
          .filter((j) => j.state !== "past")
          .map((j) => (
            <TripRow key={j.slug} j={j} />
          ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Hajj 2027: a rounded cocoa panel with the talbiyah and the steps.         */
/* ------------------------------------------------------------------------ */

export function HajjBand() {
  return (
    <section id="hajj" className={`relative scroll-mt-24 overflow-hidden py-[clamp(3.75rem,9vw,8rem)] ${gutter} ${onInk}`}>
      <div>
        <Emblem className="watermark pointer-events-none absolute top-[5%] right-[-10%] h-[95%]" />
        <div className="relative grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p lang="ar" className="ar text-left text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.7] text-sand">
              {hajjBand.talbiyah}
            </p>
            <p className="font-editorial text-[1.1rem] text-cream/55 italic">{hajjBand.talbiyahEn}</p>
            <Heading className="mt-6 text-[clamp(3.5rem,8.6vw,8.2rem)] leading-[0.92] text-cream sm:mt-8">{hajjBand.headline}</Heading>
            <p className="mt-6 max-w-[30rem] text-[1.02rem] leading-[1.75] text-cream/72">
              {hajjBand.text.value}
              <Mark s={hajjBand.text.status} />
            </p>
            <Actions primary={{ label: "Register for Hajj 2027", href: hajjRegister }} waText={say.hajj} tone="ink" className="mt-9" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {/* Phones: a light numbered list with hairlines. Wider: a soft card per step. */}
            <ol className="grid sm:gap-2">
              {hajjBand.steps.map((s, i) => (
                <li key={s.title} className={`flex gap-4 py-4 sm:gap-5 sm:rounded-[1.3rem] sm:border-0 sm:bg-white/[0.045] sm:p-5 sm:ring-1 sm:ring-white/[0.06] ${i ? "border-t border-white/[0.08]" : "pt-1"}`}>
                  <span className="display grid size-9 shrink-0 place-items-center rounded-full bg-sand/15 text-[1.25rem] text-sand sm:size-11 sm:text-[1.45rem]">{i + 1}</span>
                  <span>
                    <span className="block text-[1.02rem] font-medium text-cream">
                      {s.title}
                      <Mark s={s.status} />
                    </span>
                    <span className="mt-0.5 block text-[0.92rem] leading-[1.6] text-cream/62">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <figure className="mt-7 flex items-center gap-5">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-[1.25rem] sm:size-28">
                <Image src={hajjBand.photo.src} alt={hajjBand.photo.alt} fill sizes="7rem" className="object-cover object-[50%_60%]" />
              </div>
              <figcaption className="text-[0.92rem] text-cream/70">
                <span className="font-editorial text-[1.1rem] italic">{hajjBand.photo.caption}.</span>{" "}
                <Link href={routes.hajj} className="font-medium text-sand underline decoration-sand/40 underline-offset-4">
                  Read about Hajj 2027
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Our last trip: the facts, and the trip in photographs.                    */
/* ------------------------------------------------------------------------ */

export function LastTrip() {
  return (
    <section id="last-trip" className={`wash-linen scroll-mt-24 py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-4">
          <Label>{lastTrip.label}</Label>
          <Heading className="mt-4 text-[clamp(2.5rem,4vw,3.9rem)]">{lastTrip.name}</Heading>
          <dl className="glass mt-8 rounded-[1.5rem] px-5 py-2 text-[0.92rem]">
            {lastTrip.facts.map((f, i) => (
              <div key={f.k} className={`grid grid-cols-[5.25rem_1fr] gap-3 py-3 ${i ? "border-t border-ink/8" : ""}`}>
                <dt className="text-ink/62">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="columns-2 gap-3 sm:gap-4 lg:col-span-8 lg:columns-3">
          {lastTrip.photos.map((p) => (
            <figure key={p.src} className="rise mb-3 break-inside-avoid sm:mb-4">
              <div style={fitFrame(p.src, { min: 0.75, max: 1.5 })} className="relative aspect-(--r) overflow-hidden rounded-[1.5rem] bg-beige shadow-[var(--shadow-lift)]">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 21vw, 50vw" className={`object-cover ${p.position}`} />
              </div>
              <figcaption className="mt-2 px-1 font-editorial text-[1rem] text-ink/65 italic">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Why choose Rawdah.                                                        */
/* ------------------------------------------------------------------------ */

export function WhyRawdah() {
  return (
    <section className={`${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <PhotoStack
            flip
            photos={[
              { src: whyRawdah.photo.src, alt: whyRawdah.photo.alt, position: "object-[50%_35%]" },
              { src: "/images/team/team-01.jpg", alt: "Brother Ayuub, our group leader, in the garden at dusk.", position: "object-[30%_50%]" },
            ]}
            className="rise mx-auto max-w-[30rem]"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Heading className={h2}>{whyRawdah.headline}</Heading>
          <ul className="mt-8">
            {whyRawdah.reasons.map((r, i) => (
              <li key={r.title} className={`py-5 ${i ? "border-t border-ink/8" : ""}`}>
                <h3 className="display flex items-center gap-3 text-[1.75rem]">
                  <Emblem className="h-[0.85em] text-gold" />
                  <span>
                    {r.title}
                    <Mark s={r.status} />
                  </span>
                </h3>
                <p className="mt-1.5 max-w-[36rem] text-[0.98rem] leading-[1.7] text-ink/70">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* What Rawdah means.                                                        */
/* ------------------------------------------------------------------------ */

export function Meaning() {
  return (
    <section className={`wash-beige py-[clamp(3.75rem,10vw,9rem)] text-center ${gutter}`}>
      <p lang="ar" aria-hidden className="ar text-center text-[clamp(5.5rem,13vw,11rem)] leading-[1.15] text-bronze/75">
        {meaning.ar}
      </p>
      <Heading className="mt-2 text-[clamp(2.3rem,3.8vw,3.6rem)]">{meaning.title}</Heading>
      <p className="mx-auto mt-4 max-w-[40rem] font-editorial text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.5] text-ink/80">{meaning.text}</p>
      <p className="mt-4 text-[0.84rem] text-ink/62">{meaning.source}</p>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* What the trip cost includes, and where you stay.                          */
/* ------------------------------------------------------------------------ */

export function StayTable() {
  return (
    <div className="glass rounded-[1.5rem] px-5 py-2 sm:px-7">
      {stay.hotels.map((h, i) => (
        <div key={h.city} className={`grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-5 lg:grid-cols-[8rem_1.5fr_1.3fr_1fr_5.5rem] lg:items-baseline ${i ? "border-t border-ink/8" : ""}`}>
          <p className="display text-[1.9rem] leading-none">{h.city}</p>
          <p className="text-right text-[0.92rem] text-ink/70 lg:order-last">{h.nights} nights</p>
          <p className="col-span-2 text-[1rem] font-medium lg:col-span-1">
            {h.name} <span className="text-gold">{"★".repeat(h.stars)}</span>
            <Mark s={h.status} />
          </p>
          <p className="col-span-2 text-[0.9rem] text-ink/68 lg:col-span-1">{h.walk}</p>
          <p className="col-span-2 text-[0.9rem] text-ink/68 lg:col-span-1">{h.board}</p>
        </div>
      ))}
      <p className="grid grid-cols-1 gap-1 border-t border-ink/8 py-5 text-[0.95rem] lg:grid-cols-[8rem_1fr]">
        <span className="display text-[1.9rem] leading-none">Flights</span>
        <span className="self-center">
          {stay.flights.value}
          <Mark s={stay.flights.status} />
        </span>
      </p>
    </div>
  );
}

/**
 * What the trip cost includes, by group. Phones: one card with the groups
 * stacked inside it. Wider: a card per group.
 */
export function CoverGroups({ groups, wide = "", status, brief = false }: { groups: typeof covers.groups; wide?: string; status?: (s: Status | undefined) => Status | undefined; brief?: boolean }) {
  return (
    <div className={`glass-phone grid grid-cols-1 rounded-[1.5rem] px-5 py-1 sm:grid-cols-2 sm:gap-4 sm:p-0 ${wide}`}>
      {groups.map((g, i) => (
        <div key={g.title} className={`glass-wide py-5 sm:rounded-[1.5rem] sm:border-t-0 sm:p-6 ${i ? "border-t border-ink/8" : ""}`}>
          <p className="font-editorial text-[1.2rem] text-bronze italic sm:text-[1.25rem]">{g.title}</p>
          <ul className={`mt-3 grid sm:mt-4 sm:gap-4 ${brief ? "gap-2.5" : "gap-3"}`}>
            {g.items.map((it) => (
              <li key={it.title} className="flex gap-3 sm:block">
                <Tick className="mt-[0.3em] sm:hidden" />
                <span>
                  <span className="block text-[0.96rem] font-medium sm:text-[0.98rem]">
                    {it.title}
                    <Mark s={status ? status(it.status) : it.status} />
                  </span>
                  <span className={`mt-0.5 text-[0.87rem] leading-[1.55] text-ink/68 sm:block sm:text-[0.88rem] ${brief ? "hidden" : "block"}`}>{it.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Covers() {
  return (
    <section className={`${pad} ${gutter}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <Heading className={h2}>{covers.headline}</Heading>
        <p className="max-w-[26rem] font-editorial text-[1.25rem] leading-[1.5] text-ink/70 italic">{covers.text}</p>
      </div>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-[var(--shadow-soft)] sm:mt-10 sm:aspect-[21/8] lg:aspect-[3/1]">
        <Pic src={slot("closeup-quran-tasbih")} alt="A tasbih resting on a Qur’an." sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover object-[50%_45%]" />
      </div>
      <div className="mt-8 sm:mt-10">
        <CoverGroups groups={covers.groups} wide="lg:grid-cols-4" brief />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-6 sm:mt-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-3">
          <h3 className="display text-[clamp(2rem,2.8vw,2.7rem)]">{stay.headline}</h3>
          <p className="mt-2 text-[0.94rem] leading-[1.6] text-ink/68">{stay.text}</p>
        </div>
        <div className="lg:col-span-9">
          <StayTable />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Paying for your place.                                                    */
/* ------------------------------------------------------------------------ */

export function PaymentPlan({ tone = "ink" }: { tone?: "ink" | "canvas" }) {
  const { price, deposit, instalments, room } = paying.example;
  const each = Math.ceil((price - deposit) / instalments);
  const last = price - deposit - each * (instalments - 1);
  const parts = [deposit, ...Array.from({ length: instalments - 1 }, () => each), last];
  const dark = tone === "ink";
  const amounts = [gbp(deposit), `${instalments} × ${gbp(each)}`, gbp(price), "Together"];
  return (
    <div className={`relative overflow-hidden rounded-[2rem] p-5 sm:p-8 ${dark ? `panel-dark ${onInk}` : "glass"}`}>
      {dark ? <Emblem className="pointer-events-none absolute right-[-4%] bottom-[-30%] h-[150%] text-cream/[0.04]" /> : null}
      <p className={`relative font-editorial text-[1.15rem] italic ${dark ? "text-sand" : "text-bronze"}`}>
        A worked example: {room}, {gbp(price)} per person
      </p>
      <div aria-hidden className="relative mt-6 flex h-2.5 gap-1.5">
        {parts.map((p, i) => (
          <span key={i} className={`rounded-full ${i === 0 ? "bg-[linear-gradient(90deg,#e6d4b6,#c9ac7c)]" : dark ? "bg-cream/15" : "bg-ink/12"}`} style={{ flex: p }} />
        ))}
      </div>
      <ol className="relative mt-7 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-x-6">
        {paying.stages.map((s, i) => (
          <li key={s.when}>
            <p className={`text-[0.8rem] ${dark ? "text-sand" : "text-bronze"}`}>{s.when}</p>
            <p className={`display mt-1 text-[1.55rem] leading-tight sm:text-[1.8rem] ${dark ? "text-cream" : ""}`}>{amounts[i]}</p>
            <p className="mt-0.5 text-[0.9rem] font-medium">{s.what}</p>
            <p className={`mt-1 text-[0.84rem] leading-[1.5] sm:text-[0.86rem] sm:leading-[1.55] ${dark ? "text-cream/62" : "text-ink/68"}`}>
              {s.note}
              <Mark s={s.status} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Paying() {
  return (
    <section className={`pb-[clamp(3.25rem,9vw,8rem)] ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <Heading className={h2}>{paying.headline}</Heading>
          <p className="mt-4 text-[1rem] leading-[1.7] text-ink/72">{paying.text}</p>
          <p className="mt-3 text-[0.94rem] leading-[1.6] text-ink/68">
            {paying.sharing.value}
            <Mark s={paying.sharing.status} />
          </p>
          <Actions primary={{ label: "See the Ramadan 2027 trip", href: routes.nextUmrah }} waText={say.pay} className="mt-8" />
        </div>
        <div className="lg:col-span-8">
          <PaymentPlan />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* The people who will walk with you.                                        */
/* ------------------------------------------------------------------------ */


/**
 * The people, straightforward: what each person does, their name, one line.
 * The leader in the same format as the teachers.
 */
export function People({ link = true, members = allMembers }: { link?: boolean; members?: Member[] }) {
  return (
    <section id={link ? "people" : "team"} className={`wash-linen scroll-mt-24 py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Heading className={h2}>{people.headline}</Heading>
          <p className="mt-4 max-w-[28rem] text-[1rem] leading-[1.7] text-ink/70">{people.text}</p>
        </div>
        {link ? (
          <TileLink href="/about#team" tone="line-ink" className="self-start lg:self-auto">
            More about the team
          </TileLink>
        ) : null}
      </div>
      <TeamList members={members} className="mt-10 sm:mt-12" />
      <TeamLine />
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Groups & organisations, and private Umrah.                                */
/* ------------------------------------------------------------------------ */

export function GroupsBand() {
  return (
    <section className={`${pad} ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:order-2 lg:col-span-6 lg:col-start-7">
          <PhotoStack
            photos={[
              { src: groupsBand.photo.src, alt: groupsBand.photo.alt, position: groupsBand.photo.position },
              { src: "/images/group-photos/group-photos-01.jpg", alt: "A Rawdah group with Ustadh Abdulrahman Hassan in the lobby of Address Jabal Omar, Makkah.", position: "object-[50%_55%]" },
            ]}
            className="rise mx-auto max-w-[32rem]"
          />
        </div>
        <div className="lg:order-1 lg:col-span-5">
          <Label>Groups & organisations</Label>
          <Heading className="mt-4 text-[clamp(2.4rem,4vw,4rem)]">{groupsBand.headline}</Heading>
          <p className="mt-5 text-[1rem] leading-[1.7] text-ink/72">
            {groupsBand.text.value}
            <Mark s={groupsBand.text.status} />
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {groupsBand.who.map((w) => (
              <li key={w} className="rounded-full border border-ink/10 bg-(--raise) px-3.5 py-1.5 text-[0.84rem] text-ink/75">
                {w}
              </li>
            ))}
          </ul>
          <Actions primary={{ label: "Plan a group trip", href: `${routes.groups}#start` }} waText={say.group} className="mt-9" />
        </div>
      </div>
    </section>
  );
}

export function PrivateBand() {
  return (
    <section className={`wash-beige py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div style={fitFrame(privateBand.photo.src)} className="rise relative mx-auto aspect-(--r) max-w-[30rem] overflow-hidden rounded-[2rem] bg-beige shadow-[var(--shadow-soft)]">
            <Pic src={privateBand.photo.src} alt={privateBand.photo.alt} sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover object-[50%_45%]" />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Label>Private & family</Label>
          <Heading className="mt-4 text-[clamp(2.4rem,4vw,4rem)]">{privateBand.headline}</Heading>
          <p className="mt-5 text-[1rem] leading-[1.7] text-ink/72">
            {privateBand.text.value}
            <Mark s={privateBand.text.status} />
          </p>
          <ul className="mt-7 grid gap-3">
            {privateBand.points.map((p) => (
              <li key={p.value} className="flex items-start gap-3 text-[1rem]">
                <Dot />
                <span>
                  {p.value}
                  <Mark s={p.status} />
                </span>
              </li>
            ))}
          </ul>
          <Actions primary={{ label: "Plan a private Umrah", href: routes.private }} waText={say.private} className="mt-9" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* What travellers said.                                                     */
/* ------------------------------------------------------------------------ */

export function Reviews() {
  const [first, ...rest] = reviews.items;
  return (
    <section className={`${pad} ${gutter}`}>
      <div className="mx-auto max-w-[56rem] text-center">
        <Emblem className="mx-auto h-9 text-gold/70 sm:h-11" />
        <Heading className="mt-5 text-[clamp(2.2rem,3.6vw,3.4rem)]">{reviews.headline}</Heading>
        <blockquote className="mt-7 font-editorial text-[clamp(1.4rem,2.9vw,2.5rem)] leading-[1.4] text-ink/90 sm:mt-10 sm:leading-[1.38]">“{first.quote}”</blockquote>
        <p className="mt-6 text-[0.9rem] text-ink/65">
          {first.who}, a previous trip
          <Mark s={first.status} />
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-[66rem] grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4">
        {rest.map((r) => (
          <figure key={r.who} className="glass rounded-[1.75rem] p-6 sm:p-7">
            <blockquote className="font-editorial text-[1.2rem] leading-[1.45] sm:text-[1.35rem]">“{r.quote}”</blockquote>
            <figcaption className="mt-4 text-[0.86rem] text-ink/65">
              {r.who}, a previous trip
              <Mark s={r.status} />
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-center text-[0.8rem] text-ink/60">
        {reviews.note}
        <Mark s="to confirm" />
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Who we work with: partners, airlines, hotels, travel and Hajj, linked.    */
/* ------------------------------------------------------------------------ */

export function Partners() {
  const items = partners.groups.flatMap((g) => g.items);
  return (
    <section className={`${pad} ${gutter}`}>
      <div className="flex flex-col items-center text-center">
        <Label>{partners.label}</Label>
        <Heading className={`mx-auto mt-4 max-w-[40rem] text-[clamp(2.1rem,3.6vw,3.2rem)]`}>{partners.headline}</Heading>
      </div>
      {/* Logo after logo. Logos are drawn in the text colour so they sit together; a name stands in until a logo file arrives. */}
      <ul className="mx-auto mt-10 flex max-w-[64rem] flex-wrap items-center justify-center gap-x-12 gap-y-9 border-y border-ink/10 py-10 sm:mt-12 sm:gap-x-16 sm:py-12">
        {items.map((it) => {
          const mark = it.logo ? (
            <PartnerLogo logo={it.logo} className={`${it.logo.tall ? "h-14 sm:h-16" : "h-9 sm:h-11"} text-ink/80 transition-colors group-hover:text-ink`} />
          ) : (
            <span className="font-display text-[1.25rem] leading-tight whitespace-nowrap text-ink/70 transition-colors group-hover:text-ink sm:text-[1.4rem]">{it.name}</span>
          );
          return (
            <li key={it.name}>
              {it.href ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer" title={`${it.name}: ${it.what}`} className="group block">
                  {mark}
                </a>
              ) : (
                <span title={`${it.name}: ${it.what}`} className="group block">
                  {mark}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Common questions.                                                         */
/* ------------------------------------------------------------------------ */

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div>
      {items.map((f, i) => (
        <details key={f.q} className={`group ${i ? "border-t border-ink/8" : ""}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4">
            <span className="text-[0.98rem] font-medium">
              {f.q}
              <Mark s={f.status} />
            </span>
            <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-(--raise) text-[0.9rem] leading-none text-ink/70 shadow-[0_4px_12px_-6px_rgb(58_43_36/0.4)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-5 text-[0.93rem] leading-[1.7] text-ink/72">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Questions() {
  return (
    <section id="questions" className={`wash-linen scroll-mt-24 py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <Heading className={h2}>Common questions</Heading>
        <WaTile text={say.general} label="Question? WhatsApp us" className="self-start lg:self-auto" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
        {faqTopics.map((t) => (
          <div key={t.id} className="glass rounded-[1.75rem] px-5 pt-5 pb-2 sm:px-6">
            <p className="mb-1 font-editorial text-[1.3rem] text-bronze italic">{t.title}</p>
            <FaqList items={faqs.filter((f) => f.topic === t.id)} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* The closing invitation: a rounded panel over a photograph.                */
/* ------------------------------------------------------------------------ */

export function Closing() {
  return (
    <section className={`relative overflow-hidden py-[clamp(3.75rem,9vw,8rem)] ${gutter} ${onInk}`}>
      <div>
        <Emblem className="watermark pointer-events-none absolute top-[5%] left-[-8%] h-[100%]" />
        <div className="relative grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Emblem className="h-12 text-cream/80" />
            <Heading className="mt-6 text-[clamp(2.6rem,5vw,4.8rem)] text-cream">{closing.headline}</Heading>
            <p className="mt-5 max-w-[32rem] text-[1.02rem] leading-[1.7] text-cream/75">{closing.text}</p>
            <div className="mt-8 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-2.5">
              <TileLink href={hajjRegister} tone="gold">
                Register for Hajj 2027
              </TileLink>
              <div className="flex gap-2 sm:contents">
                <TileLink href={`${routes.nextUmrah}#${anchors.form}`} tone="line-canvas" pad="gap-2 px-4 sm:gap-3 sm:px-6" className="min-w-0 flex-1 sm:flex-none">
                  Ramadan Umrah 2027
                </TileLink>
                <WaSquare text={say.general} tone="line-canvas" className="sm:hidden" />
                <span className="hidden sm:contents">
                  <WaTile text={say.general} label="WhatsApp us" tone="line-canvas" />
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div style={fitFrame("/images/friends/friends-03.jpg")} className="rise relative mx-auto aspect-(--r) max-w-[34rem] overflow-hidden rounded-[2rem] shadow-[var(--shadow-float)] ring-1 ring-white/10">
              <Image src="/images/friends/friends-03.jpg" alt="Six Rawdah travellers arm in arm and smiling after completing Umrah." fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover object-[35%_40%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
