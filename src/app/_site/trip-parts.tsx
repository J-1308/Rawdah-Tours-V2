import Image from "next/image";
import { Fragment } from "react";

import { gbp, hajjNusuk, journeyStay, leader, people, teachers, type Journey, type Room, type Status, type StayPhoto, type TripPlan } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Emblem, gutter, Heading, Label, Pic, Tick } from "@/app/_site/shell";
import { slot } from "@/app/_site/slots";

/* ------------------------------------------------------------------------ */
/* The team, straightforward: a portrait, what they do, the name, one line.  */
/* ------------------------------------------------------------------------ */

export type Member = { name: string; does: string; line: string; status?: Status; guest?: boolean; short?: string; more?: string[]; photo?: { src: string; alt: string; position?: string } };

export const leaderMember: Member = { name: leader.name, does: leader.does, line: leader.line, status: "confirmed", short: leader.short, more: leader.more, photo: leader.photo };
export const teacherMembers: Member[] = teachers.map((t) => ({ name: t.name, does: t.does, line: t.bio.value, status: t.bio.status, guest: t.guest, short: "short" in t ? t.short : undefined, more: "more" in t ? t.more : undefined, photo: t.photo }));
export const allMembers: Member[] = [leaderMember, ...teacherMembers];
/** The Rawdah team (Ayuub and Issa), and the guest sheikhs who join trips to teach: shown apart (Jibril, 1 Nov 2026). */
export const teamMembers: Member[] = allMembers.filter((m) => !m.guest);
export const guestMembers: Member[] = allMembers.filter((m) => m.guest);

export function TeamList({ members, className = "", cols = "lg:grid-cols-4" }: { members: Member[]; className?: string; cols?: string }) {
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-y-10 ${cols} ${className}`}>
      {members.map((m) => (
        <li key={m.name} className="grid grid-cols-[5.5rem_1fr] items-start gap-4 sm:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-beige shadow-[var(--shadow-lift)] sm:rounded-[1.5rem]">
            {m.photo ? (
              <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 6rem" className={`object-cover ${m.photo.position ?? "object-[50%_25%]"}`} />
            ) : (
              <span className="absolute inset-0 grid place-items-center border border-dashed border-ink/20 p-2 text-center text-[0.72rem] text-ink/62 sm:rounded-[1.5rem]">To be named</span>
            )}
          </div>
          <div className="pt-0.5 sm:mt-4 sm:pt-0">
            <p className="text-[0.82rem] font-medium text-bronze">{m.does}</p>
            <p className="display mt-1 text-[1.45rem] leading-[1.1] sm:text-[1.6rem]">{m.name}</p>
            <p className="mt-1.5 text-[0.92rem] leading-[1.55] text-ink/70">
              {m.line}
              <Mark s={m.status} />
            </p>
            {m.more ? (
              <details className="group mt-2.5">
                <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-1.5 text-[0.9rem] font-medium text-bronze [&::-webkit-details-marker]:hidden">
                  More about {m.short ?? m.name}
                  <svg aria-hidden viewBox="0 0 12 12" className="size-3 transition-transform group-open:rotate-180">
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="mt-1 grid gap-2.5 text-[0.92rem] leading-[1.6] text-ink/70">
                  {m.more.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** One line about the team behind the people above. */
export function TeamLine() {
  return (
    <p className="mt-8 max-w-[40rem] text-[0.95rem] leading-[1.65] text-ink/70 sm:mt-10">
      {people.team.value}
      <Mark s={people.team.status} />
    </p>
  );
}

/* ------------------------------------------------------------------------ */
/* Photographs, and frames for the ones still to come.                       */
/* ------------------------------------------------------------------------ */

function CameraGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  );
}

/** A photograph, or a soft frame saying which photograph goes here. */
export function StayFrame({ photo, className = "", sizes = "(min-width: 1024px) 40vw, 90vw", priority = false }: { photo: StayPhoto; className?: string; sizes?: string; priority?: boolean }) {
  if (photo.src) {
    return (
      // The figure is the frame itself (no inner box sized by percentage), so
      // its aspect ratio alone sets the height in every browser.
      <figure className={`relative overflow-hidden rounded-[1.25rem] bg-beige shadow-[var(--shadow-lift)] sm:rounded-[1.5rem] ${className}`}>
        <Image src={photo.src} alt={photo.alt ?? ""} fill sizes={sizes} priority={priority} className={`object-cover ${photo.position ?? ""}`} />
        {photo.caption ? <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(26_18_14/0.75),transparent)] px-4 pt-8 pb-3 font-editorial text-[0.98rem] text-cream italic">{photo.caption}</figcaption> : null}
      </figure>
    );
  }
  return (
    <div className={`relative grid place-items-center overflow-hidden rounded-[1.25rem] border border-dashed border-ink/20 bg-(--raise) sm:rounded-[1.5rem] ${className}`}>
      <Emblem className="watermark pointer-events-none absolute -right-4 -bottom-6 h-[90%]" />
      <div className="relative px-3 text-center">
        <CameraGlyph className="mx-auto size-5 text-bronze" />
        <p className="mt-1.5 font-editorial text-[1.02rem] leading-tight text-ink/80 italic">{photo.slot}</p>
        <p className="mt-0.5 text-[0.72rem] text-ink/62">Photo to come</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Where you'll stay, and how you'll travel (Umrah trip pages, night).       */
/* ------------------------------------------------------------------------ */

export function WhereYouStay({ j }: { j: Journey }) {
  const named = (city: string) => (city === "Madinah" ? j.hotels?.madinah : j.hotels?.makkah);
  const past = j.state === "past";
  return (
    <section className={`py-[clamp(3.75rem,9vw,8rem)] ${gutter}`}>
      <Label>The journey</Label>
      <Heading className="mt-4 max-w-[48rem] text-[clamp(2.3rem,4.2vw,4rem)]">{journeyStay.headline}</Heading>
      <p className="mt-4 max-w-[36rem] text-[1rem] leading-[1.65] text-ink/72">{past ? "Where our August 2026 group stayed, and how they travelled." : journeyStay.text}</p>

      <div className="mt-10 grid gap-14 sm:mt-14 sm:gap-20">
        {journeyStay.hotels.map((h, i) => {
          const n = named(h.city);
          const [main, ...rest] = h.photos;
          return (
            <article key={h.city} className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-center">
              <div className={`lg:col-span-4 ${i % 2 ? "lg:order-2 lg:col-start-9" : ""}`}>
                <p className="font-editorial text-[1.15rem] text-bronze italic">
                  {h.city}, {h.nights} nights
                </p>
                <h3 className="display mt-1 text-[clamp(2rem,3vw,2.8rem)] leading-[1.05]">
                  {n?.value.replace(/\s*★+$/, "") ?? h.name}
                  <Mark s={n?.status ?? h.status} />
                </h3>
                <p className="mt-2 text-[1.05rem] tracking-[0.1em] text-gold" aria-label={`${h.stars} stars`}>
                  {"★".repeat(h.stars)}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sand/15 px-3.5 py-1.5 text-[0.88rem] font-medium text-sand">
                  <Emblem className="h-3.5 text-sand/80" />
                  {h.walk}
                </p>
                <p className="mt-4 max-w-[26rem] text-[0.98rem] leading-[1.65] text-ink/72">{h.text}</p>
              </div>
              <div className={`lg:col-span-8 ${i % 2 ? "lg:order-1" : ""}`}>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <StayFrame photo={main} className="col-span-3 aspect-[16/10]" sizes="(min-width: 1024px) 60vw, 95vw" />
                  {rest.map((p, k) => (
                    <StayFrame key={(p.src ?? p.slot ?? "") + k} photo={p} className="aspect-square" sizes="(min-width: 1024px) 20vw, 32vw" />
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Between the cities */}
      <div className="mt-16 sm:mt-24">
        <Heading as="h3" className="text-[clamp(1.9rem,3vw,2.7rem)]">
          Getting there and between the cities
        </Heading>
        <div className="mt-7 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
          <div className="grid gap-3 lg:col-span-4 lg:gap-4">
            {journeyStay.travel.map((t) => {
              const flights = t.title === "Flights" && j.flights;
              return (
                <div key={t.title} className="glass rounded-[1.5rem] p-5 sm:p-6">
                  <p className="font-editorial text-[1.15rem] text-bronze italic">{t.title}</p>
                  <p className="mt-1.5 text-[0.98rem] leading-[1.6]">
                    {flights ? `${j.flights?.value?.replace(/\.$/, "")}, return.` : t.text}
                    <Mark s={flights ? j.flights?.status : past ? t.status : "proposed"} />
                  </p>
                </div>
              );
            })}
          </div>
          <div className="glass grid grid-cols-1 gap-5 rounded-[1.5rem] p-3 sm:grid-cols-2 sm:p-4 lg:col-span-8">
            <div className="grid grid-cols-2 gap-2 sm:col-span-1 sm:grid-cols-1">
              {journeyStay.train.photos.map((p) => (
                <StayFrame key={p.slot} photo={p} className="aspect-[4/3] sm:aspect-[16/10]" />
              ))}
            </div>
            <div className="px-2 pb-2 sm:self-center sm:px-0 sm:pr-4">
              <p className="font-editorial text-[1.15rem] text-bronze italic">Madinah to Makkah</p>
              <p className="display mt-1 text-[1.9rem] leading-tight">
                {journeyStay.train.title}
                <Mark s={journeyStay.train.status} />
              </p>
              <p className="mt-2 text-[0.95rem] leading-[1.65] text-ink/72">{journeyStay.train.text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ziyarah */}
      <div className="mt-16 sm:mt-24">
        <Heading as="h3" className="text-[clamp(1.9rem,3vw,2.7rem)]">
          {journeyStay.ziyarah.title}
          <Mark s={past ? journeyStay.ziyarah.status : "proposed"} />
        </Heading>
        <p className="mt-3 max-w-[34rem] text-[0.98rem] leading-[1.65] text-ink/72">{journeyStay.ziyarah.text}</p>
        <ul className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {journeyStay.ziyarah.places.map((z, k) => (
            <li key={z.name} className={k === 2 ? "col-span-2 sm:col-span-1" : ""}>
              <StayFrame photo={z.photo} className={k === 2 ? "aspect-[2/1] sm:aspect-[4/5]" : "aspect-[4/5]"} sizes="(min-width: 640px) 30vw, 48vw" />
              <p className="mt-2.5 px-1 font-editorial text-[1.1rem] leading-tight">{z.name}</p>
              <p className="px-1 text-[0.82rem] text-ink/65">{z.city}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Hajj through Nusuk (Hajj page, day).                                      */
/* ------------------------------------------------------------------------ */

const h2 = "text-[clamp(2.1rem,3.4vw,3.1rem)]";

export function HajjOnNusuk() {
  const n = hajjNusuk;
  return (
    <>
      <section className="mt-12 sm:mt-16">
        <Heading className={h2}>{n.headline}</Heading>
        <p className="mt-4 max-w-[42rem] text-[1rem] leading-[1.7] text-ink/75">
          {n.text.value}
          <Mark s={n.text.status} />
        </p>
        <ol className="mt-8 grid gap-2">
          {n.timeline.map((t, i) => (
            <li key={t.title} className="glass grid grid-cols-[2.5rem_1fr] gap-x-4 rounded-[1.25rem] p-4 [--glass-shadow:none] sm:grid-cols-[2.75rem_10rem_1fr] sm:items-baseline sm:p-5">
              <span className="display grid size-10 place-items-center rounded-full bg-sand/25 text-[1.3rem] text-bronze sm:size-11 sm:self-center">{i + 1}</span>
              <span className="text-[0.84rem] font-medium text-bronze sm:text-[0.9rem]">{t.when}</span>
              <span className="col-start-2 sm:col-start-3">
                <span className="block text-[1rem] font-medium">{t.title}</span>
                <span className="mt-0.5 block text-[0.9rem] leading-[1.6] text-ink/70">{t.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[0.84rem] text-ink/65">
          {n.timelineNote}
          <Mark s="evidenced" />
        </p>
      </section>

      <section className="mt-12 sm:mt-16">
        <Heading className={h2}>{n.steps.headline}</Heading>
        <p className="mt-4 max-w-[40rem] text-[1rem] leading-[1.7] text-ink/75">
          {n.steps.text.value}
          <Mark s={n.steps.text.status} />
        </p>
        <ol className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {n.steps.items.map((s, i) => (
            <li key={s.title} className="glass rounded-[1.5rem] p-5 sm:p-6">
              <p className="font-editorial text-[1.1rem] text-bronze italic">Step {i + 1}</p>
              <p className="display mt-1 text-[1.55rem] leading-tight">
                {s.title}
                <Mark s={s.status} />
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-[1.6] text-ink/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 sm:mt-16">
        <div className="glass rounded-[1.75rem] p-5 sm:p-8">
          <Heading as="h3" className="text-[clamp(1.8rem,2.8vw,2.5rem)]">
            {n.needs.headline}
          </Heading>
          <p className="mt-3 max-w-[38rem] text-[0.98rem] leading-[1.65] text-ink/72">
            {n.needs.text.value}
            <Mark s={n.needs.text.status} />
          </p>
          <ul className="mt-5 grid gap-2.5">
            {n.needs.items.map((it) => (
              <li key={it} className="flex gap-3 text-[0.95rem]">
                <Tick className="mt-[0.2em]" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <Heading className={h2}>{n.group.headline}</Heading>
        <dl className="glass-phone mt-6 grid grid-cols-1 rounded-[1.25rem] px-4 py-1 sm:grid-cols-2 sm:gap-2.5 sm:p-0">
          {n.group.items.map((g, i) => (
            <div key={g.k} className={`glass-wide py-3.5 sm:rounded-[1.1rem] sm:p-4 ${i ? "border-t border-ink/8" : ""}`}>
              <dt className="text-[0.8rem] text-ink/62">{g.k}</dt>
              <dd className="mt-1 text-[0.98rem] leading-snug">
                {g.v}
                <Mark s={g.s} />
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

/** A row of photographs, honest about where they're from. */
export function MomentStrip({ photos, caption }: { photos: StayPhoto[]; caption: string }) {
  return (
    <div className="mt-12 sm:mt-16">
      <ul className="grid grid-cols-3 gap-2 sm:gap-3">
        {photos.map((p) => (
          <li key={p.src}>
            <StayFrame photo={p} className="aspect-square sm:aspect-[3/4]" sizes="(min-width: 1024px) 25vw, 32vw" />
          </li>
        ))}
      </ul>
      <p className="mt-3 font-editorial text-[1rem] text-ink/65 italic">{caption}</p>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* A trip with its plan settled (the Ramadan 2027 trip): the line of the     */
/* trip, flights, hotels, what's included, packages and the payment          */
/* timetable. After Rawdah's own itinerary sheets, in the site's colours.    */
/* ------------------------------------------------------------------------ */

const eyebrow = "text-[0.72rem] font-medium tracking-[0.2em] text-bronze uppercase";
const pill = "rounded-full border border-ink/12 bg-(--raise) px-3 py-1 text-[0.78rem] whitespace-nowrap";

function Glyph({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={d} />
    </svg>
  );
}
const plane = "M10.5 13.5 3 11l1.5-1.5 8 1 4-4.5a2 2 0 0 1 3 3l-4.5 4 1 8L15.5 22 13 14.5l-3 3V20l-1.5 1.5L7 18l-3.5-1.5L5 15h2.5z";
const building = "M4 21V5l8-2v18M12 21h8V9l-8-2M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01";
const moon = "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z";
const alert = "M12 4 2.5 20h19L12 4zM12 10v4.5M12 17.5h.01";

/** Four, five: gold dots for the stars, as on the itinerary. */
function StarDots({ n }: { n: number }) {
  return (
    <span aria-label={`${n}-star hotel`} className="inline-flex items-center gap-2">
      <span aria-hidden className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`size-2 rounded-full ${i < n ? "bg-gold" : "border border-gold/70"}`} />
        ))}
      </span>
      <span className="text-[0.84rem] text-ink/65">{n}-star hotel</span>
    </span>
  );
}

function Rows({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <dl className="mt-4 divide-y divide-ink/10 border-t border-ink/10 text-[0.93rem]">
      {rows.map((r) => (
        <div key={r.k} className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-ink/65">{r.k}</dt>
          <dd className="text-right tabular-nums">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Fly, the cities, fly: one line, widths by nights. On phones, a short list. */
export function TripLine({ plan }: { plan: TripPlan }) {
  const seg = (stay: boolean) =>
    `flex items-center justify-between gap-3 rounded-[1rem] px-4 py-3 sm:grid sm:place-items-center sm:gap-0 sm:rounded-full sm:py-3 sm:text-center ${stay ? "bg-(--raise) sm:basis-0" : "bg-sand/25 sm:shrink-0 sm:px-5"}`;
  return (
    <div>
      <ol className="glass grid gap-1.5 rounded-[1.4rem] p-1.5 [--glass-shadow:none] sm:flex sm:rounded-full">
        {plan.timeline.map((s, i) => (
          <Fragment key={s.label}>
            <li className={seg(Boolean(s.nights))} style={s.nights ? { flexGrow: s.nights } : undefined}>
              <span className="block text-[0.98rem] font-medium">{s.label}</span>
              <span className="block text-[0.8rem] text-ink/62 tabular-nums">{s.sub}</span>
            </li>
            {plan.marker && plan.marker.after === i ? <li className={`${eyebrow} px-4 py-1 text-[0.66rem] sm:hidden`}>↓ {plan.marker.text}</li> : null}
          </Fragment>
        ))}
      </ol>
      {plan.marker ? (
        // Same widths as the line above, so the note sits under the change of city.
        <div aria-hidden className="mt-2 hidden gap-1.5 px-1.5 sm:flex">
          {plan.timeline.map((s, i) => (
            <div key={s.label} className={`invisible relative h-5 ${s.nights ? "basis-0 px-4" : "shrink-0 px-5"}`} style={s.nights ? { flexGrow: s.nights } : undefined}>
              <span className="block h-0 overflow-hidden text-[0.98rem] font-medium">{s.label}</span>
              <span className="block h-0 overflow-hidden text-[0.8rem]">{s.sub}</span>
              {plan.marker && plan.marker.after + 1 === i ? (
                <span className={`visible absolute top-0 -left-1 whitespace-nowrap ${eyebrow} text-[0.66rem]`}>↑ {plan.marker.text}</span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** The night chapter of a planned trip: the line, the flights, the hotels and the Eid notes. */
export function TripJourney({ j }: { j: Journey }) {
  const plan = j.plan!;
  return (
    <section className={`py-[clamp(3.75rem,9vw,8rem)] ${gutter}`}>
      <Label>The journey</Label>
      <Heading className="mt-4 max-w-[48rem] text-[clamp(2.3rem,4.2vw,4rem)]">
        Flights and hotels
        <Mark s={plan.status} />
      </Heading>
      <p className="mt-4 max-w-[36rem] text-[1rem] leading-[1.65] text-ink/72">From Heathrow and back: thirteen nights, nine in Makkah and four in Madinah.</p>

      <div className="mt-9 sm:mt-12">
        <TripLine plan={plan} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {plan.flights.map((f) => (
          <article key={f.dir} className="glass rounded-[1.75rem] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className={`flex items-center gap-2.5 ${eyebrow}`}>
                <span className="grid size-8 place-items-center rounded-full border border-ink/15 text-ink/75">
                  <Glyph d={plane} className="size-3.5" />
                </span>
                {f.dir}
              </p>
              <span className={pill}>{f.airline}</span>
            </div>
            <p className="display mt-4 text-[clamp(2rem,3vw,2.6rem)] leading-tight">{f.date}</p>
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[0.95rem]">
              <span>{f.route}</span>
              <span className="text-[0.72rem] tracking-[0.16em] text-ink/60">{f.code}</span>
            </div>
            <Rows rows={f.rows} />
            {f.note ? <p className="mt-3 text-[0.84rem] text-ink/62">{f.note}</p> : null}
          </article>
        ))}

        {plan.hotels.map((h) => (
          <article key={h.city} className="glass overflow-hidden rounded-[1.75rem]">
            <div className="relative aspect-[16/8] overflow-hidden bg-(--raise)">
              <Pic src={slot(h.slot)} alt={`${h.name}, ${h.city}.`} sizes="(min-width: 1024px) 45vw, 95vw" className="object-cover" />
            </div>
            <div className="p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className={`flex items-center gap-2.5 ${eyebrow}`}>
                  <span className="grid size-8 place-items-center rounded-full border border-ink/15 text-ink/75">
                    <Glyph d={building} className="size-3.5" />
                  </span>
                  {h.city}
                </p>
                <span className={pill}>{h.nights} nights</span>
              </div>
              <h3 className="display mt-4 text-[clamp(1.9rem,2.8vw,2.5rem)] leading-tight">{h.name}</h3>
              <p className="mt-2">
                <StarDots n={h.stars} />
              </p>
              <Rows rows={h.rows} />
              {h.note ? <p className="mt-3 text-[0.84rem] text-ink/62">{h.note}</p> : null}
            </div>
          </article>
        ))}
      </div>

      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-4 lg:gap-4">
        {plan.notes.map((n) => (
          <li key={n.text} className={`flex items-center gap-3 rounded-[1.25rem] border px-4 py-3.5 text-[0.95rem] ${n.tone === "alert" ? "border-dashed border-bronze/45" : "border-gold/35 bg-sand/10"}`}>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-bronze">
              <Glyph d={n.tone === "moon" ? moon : alert} className="size-3.5" />
            </span>
            {n.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** What a planned trip includes, as a list of ticks. */
export function TripIncludes({ plan }: { plan: TripPlan }) {
  return (
    <ul className="glass-phone mt-6 grid grid-cols-1 rounded-[1.25rem] px-4 py-1 [--glass-shadow:none] sm:grid-cols-2 sm:gap-1.5 sm:p-0">
      {plan.includes.map((h, i) => (
        <li key={h.value} className={`glass-wide flex items-start gap-3 py-3 text-[0.95rem] sm:rounded-[1.1rem] sm:px-4 sm:py-3.5 ${i ? "border-t border-ink/8" : ""}`}>
          <Tick className="mt-[0.2em]" />
          <span>
            {h.value}
            <Mark s={h.status} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Timetable({ title, cols }: { title: string; cols: Room[] }) {
  const dues = cols[0]?.schedule?.map((s) => s.due) ?? [];
  return (
    <div className="glass min-w-0 rounded-[1.75rem] p-5 sm:p-6">
      <table className="w-full text-[0.9rem] tabular-nums">
        <thead>
          <tr>
            <th scope="col" className="pb-3 text-left align-bottom font-display text-[1.25rem] font-normal">
              {title}
            </th>
            {cols.map((c, i) => (
              <th key={c.type} scope="col" className="pb-3 pl-2 text-right align-bottom">
                <span className={`inline-block rounded-full px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase ${i === 0 ? "bg-ink text-canvas" : "bg-(--raise) text-ink/80 ring-1 ring-ink/12"}`}>{c.type}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dues.map((d, k) => (
            <tr key={d} className="border-t border-ink/10">
              <th scope="row" className="py-2.5 pr-2 text-left font-normal text-ink/70">
                {d}
              </th>
              {cols.map((c) => (
                <td key={c.type} className="py-2.5 pl-2 text-right">
                  {gbp(c.schedule?.[k]?.amount ?? 0)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-ink/35">
            <th scope="row" className="pt-2.5 text-left font-medium">
              Total
            </th>
            {cols.map((c) => (
              <td key={c.type} className="pt-2.5 pl-2 text-right font-medium">
                {gbp(c.price)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** The packages as cards, then each one's payment timetable. Prices from src/lib/trips.ts. */
export function TripPackages({ j }: { j: Journey }) {
  const rooms = j.rooms?.value ?? [];
  const withFlights = rooms.filter((r) => r.flights !== false);
  const ground = rooms.filter((r) => r.flights === false);
  return (
    <>
      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {rooms.map((r, i) => (
          <li key={r.type} className={`relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6 ${i === 0 ? `panel-dark text-cream` : "glass"}`}>
            {i === 0 ? <Emblem className="pointer-events-none absolute right-[-10%] bottom-[-25%] h-[120%] text-cream/[0.05]" /> : null}
            <span className={`relative inline-block rounded-full px-3 py-1 text-[0.66rem] font-medium tracking-[0.18em] uppercase ${i === 0 ? "border border-cream/40 text-cream/90" : "bg-(--raise) text-ink/80 ring-1 ring-ink/12"}`}>{r.type}</span>
            <p className="display relative mt-4 text-[clamp(2.8rem,4.4vw,3.6rem)] leading-none">{gbp(r.price)}</p>
            <p className={`relative mt-2.5 text-[0.68rem] tracking-[0.18em] uppercase ${i === 0 ? "text-cream/70" : "text-ink/60"}`}>
              Per person{r.flights !== false ? " · quad sharing" : ""}
            </p>
            <p className={`relative mt-4 border-t pt-3 text-[0.92rem] ${i === 0 ? "border-cream/20 text-cream/85" : "border-ink/10 text-ink/72"}`}>{r.flights !== false ? "Flights and ground" : "Hotels and transfers, your own flights"}</p>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1.35fr_1fr]">
        {withFlights.length ? <Timetable title="With flights" cols={withFlights} /> : null}
        {ground.length ? <Timetable title="Ground only" cols={ground} /> : null}
      </div>
      <p className="mt-3 text-[0.86rem] text-ink/68">
        All deposits are non-refundable.
        {j.plan?.places ? (
          <>
            {" "}
            {j.plan.places.value}.
            <Mark s={j.plan.places.status} />
          </>
        ) : null}
      </p>
    </>
  );
}
