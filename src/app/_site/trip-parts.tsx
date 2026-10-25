import Image from "next/image";

import { hajjNusuk, journeyStay, leader, people, teachers, type Journey, type Status, type StayPhoto } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Emblem, gutter, Heading, Label, Tick } from "@/app/_site/shell";

/* ------------------------------------------------------------------------ */
/* The team, straightforward: a portrait, what they do, the name, one line.  */
/* ------------------------------------------------------------------------ */

export type Member = { name: string; does: string; line: string; status?: Status; photo?: { src: string; alt: string; position?: string } };

export const leaderMember: Member = { name: leader.name, does: leader.does, line: leader.line, status: "confirmed", photo: leader.photo };
export const teacherMembers: Member[] = teachers.map((t) => ({ name: t.name, does: t.does, line: t.bio.value, status: t.bio.status, photo: t.photo }));
export const allMembers: Member[] = [leaderMember, ...teacherMembers];

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
            <StayFrame photo={p} className="aspect-[3/4]" sizes="(min-width: 1024px) 25vw, 32vw" />
          </li>
        ))}
      </ul>
      <p className="mt-3 font-editorial text-[1rem] text-ink/65 italic">{caption}</p>
    </div>
  );
}
