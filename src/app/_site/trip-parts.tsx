import Image from "next/image";
import { HotelGallery } from "./hotel-gallery";
import { Fragment } from "react";

import { PackageCards } from "@/app/_site/package-cards";
import { ICONS, PosterPerks } from "@/app/_site/poster-parts";
import { PosterText } from "@/app/_site/poster-type";
import { anchors, gbp, hajjNusuk, journeyStay, leader, people, say, teachers, trust, wa, type Journey, type Status, type StayPhoto, type TripPlan } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { Emblem, gutter, Heading, Label, Tick } from "@/app/_site/shell";
import { slot, slotFilled } from "@/app/_site/slots";
import { ItineraryLink } from "@/app/_site/step-form";
import { Chevron } from "@/app/_site/whatsapp";

/* ------------------------------------------------------------------------ */
/* The team, straightforward: a portrait, what they do, the name, one line.  */
/* ------------------------------------------------------------------------ */

export type Member = { name: string; does: string; line: string; status?: Status; guest?: boolean; short?: string; more?: string[]; photo?: { src: string; alt: string; position?: string } };

export const leaderMember: Member = { name: leader.name, does: leader.does, line: leader.line, status: "confirmed", short: leader.short, more: leader.more, photo: leader.photo };
/** Everyone who can be named on a trip, including guests shown on one trip only (tripOnly). */
export const tripTeacherMembers: Member[] = teachers.filter((t) => !("hidden" in t && t.hidden)).map((t) => ({ name: t.name, does: t.does, line: t.bio.value, status: t.bio.status, guest: t.guest, short: "short" in t ? t.short : undefined, more: "more" in t ? t.more : undefined, photo: t.photo }));
export const teacherMembers: Member[] = tripTeacherMembers.filter((m) => !teachers.some((t) => t.name === m.name && "tripOnly" in t && t.tripOnly));
export const allMembers: Member[] = [leaderMember, ...teacherMembers];
/** The Rawdah team (Ayuub and Issa), and the guest sheikhs who join trips to teach: shown apart (Jibril, 1 Nov 2026). */
export const teamMembers: Member[] = allMembers.filter((m) => !m.guest);
export const guestMembers: Member[] = allMembers.filter((m) => m.guest);

export function TeamList({ members, className = "", cols = "lg:grid-cols-4" }: { members: Member[]; className?: string; cols?: string }) {
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-6 sm:gap-y-10 ${members.length <= 2 ? "lg:grid-cols-2" : `sm:grid-cols-2 ${cols}`} ${className}`}>
      {members.map((m) => (
        <li key={m.name} className={m.photo ? (members.length <= 2 ? "grid grid-cols-[5.5rem_1fr] items-start gap-4 sm:grid-cols-[13rem_1fr] sm:gap-7" : "grid grid-cols-[5.5rem_1fr] items-start gap-4 sm:block") : "self-center"}>
          {m.photo ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-beige shadow-[var(--shadow-lift)] sm:rounded-[1.5rem]">
              <Image src={m.photo.src} alt={m.photo.alt} fill quality={85} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 55vw, 8rem" className={`object-cover ${m.photo.position ?? "object-[50%_25%]"}`} />
            </div>
          ) : null}
          <div className="pt-0.5 sm:mt-4 sm:pt-0">
            <p className="text-[0.875rem] font-medium text-bronze">{m.does}</p>
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

/**
 * The team as on the poster (Ramadan Umrah 2027): round portraits with the role over the name, then the fuller
 * "More about" notes for those who have them.
 */
/**
 * The people on a poster trip (Jibril, 19 Nov 2026; after The Sunnah Experience's guide profiles, in Rawdah's look):
 * the special guest in his own olive panel, standing out as the trip's draw, then the hosts' cards with their photos,
 * a line each and the fuller notes to open.
 */
export function TripPeople({ j, members }: { j: Journey; members: Member[] }) {
  const rows = (j.posterTeam ?? []).map((p) => ({ ...p, m: members.find((m) => m.name === p.ref) }));
  const [guest, ...hosts] = rows;
  const g = j.guestFeature;
  return (
    <>
      {guest && g ? (
        <article className="guest-feature">
          {/* His own photo, cropped, whole and sharp: no fade here (Jibril, 19 Nov 2026). */}
          <div className="gf-photo">
            {guest.m?.photo ? <Image src={guest.m.photo.src} alt={guest.m.photo.alt} fill sizes="(min-width: 1024px) 24rem, 90vw" quality={88} className={`object-cover ${guest.m.photo.position ?? "object-[50%_22%]"}`} /> : null}
          </div>
          <div className="gf-text">
            <p className="gf-kicker">{g.kicker}</p>
            <h2 className="gf-name">
              <span>{guest.label}</span> {guest.name}
            </h2>
            <p className="gf-line">{g.line}</p>
            {g.bio ? <p className="gf-bio">{g.bio}</p> : null}
            <a href={`#${anchors.join}`} className="gf-cta">
              {g.cta}
              <svg aria-hidden viewBox="0 0 12 12" className="size-3">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </article>
      ) : null}
      {hosts.length ? (
        <>
          <Heading className="mt-12 text-[clamp(1.9rem,3.2vw,2.6rem)] leading-tight sm:mt-16">{j.hostsTitle ?? "Your hosts"}</Heading>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {hosts.map((h) => (
              <li key={h.ref} className="host-card">
                <div className="host-photo">
                  {h.m?.photo ? <Image src={h.m.photo.src} alt={h.m.photo.alt} fill sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw" quality={85} className={`object-cover ${h.m.photo.position ?? "object-[50%_25%]"}`} /> : null}
                </div>
                <div className="p-5 sm:p-6">
                  <p className="poster-role">{h.label}</p>
                  <h3 className="mt-1 font-editorial text-[1.6rem] leading-tight">{h.m?.name ?? h.name}</h3>
                  {h.m?.does ? <p className="mt-0.5 text-[0.9rem] text-ink/60">{h.m.does}</p> : null}
                  {h.m?.line ? <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">{h.m.line}</p> : null}
                  {h.m?.more ? (
                    <details className="group mt-3 border-t border-ink/10 pt-1">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-[0.95rem] font-medium [&::-webkit-details-marker]:hidden">
                        More about {h.m.short ?? h.m.name}
                        <svg aria-hidden viewBox="0 0 12 12" className="size-3 shrink-0 text-bronze transition-transform group-open:rotate-180">
                          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </summary>
                      <div className="grid gap-2.5 pb-1 text-[0.92rem] leading-[1.6] text-ink/70">
                        {h.m.more.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </details>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

/** What's included on a poster trip: the poster icon and words, and one line of fact, as tiles (no photos, 19 Nov). */
export function IncludedCards({ cards }: { cards: NonNullable<TripPlan["cards"]> }) {
  return (
    <ul className="included-cards mt-6">
      {cards.map((c) => (
        <li key={c.big + c.small} className="inc-card">
          <div className="inc-body">
            <svg aria-hidden viewBox="0 0 48 48" className="inc-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[c.icon]}
            </svg>
            <p className="inc-title">
              {c.big} <em>{c.small}</em>
            </p>
          </div>
          <p className="inc-line">{c.line}</p>
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
        <Image src={photo.src} alt={photo.alt ?? ""} fill quality={85} sizes={sizes} priority={priority} className={`object-cover ${photo.position ?? ""}`} />
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
        <p className="mt-0.5 text-[0.875rem] text-ink/62">Photo to come</p>
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
                <p className="mt-4 inline-flex items-center gap-2 rounded-[0.7rem] bg-sand/15 px-3.5 py-1.5 text-[0.88rem] font-medium text-sand">
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
              <p className="px-1 text-[0.875rem] text-ink/65">{z.city}</p>
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
              <span className="text-[0.875rem] font-medium text-bronze sm:text-[0.9rem]">{t.when}</span>
              <span className="col-start-2 sm:col-start-3">
                <span className="block text-[1rem] font-medium">{t.title}</span>
                <span className="mt-0.5 block text-[0.9rem] leading-[1.6] text-ink/70">{t.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[0.875rem] text-ink/65">
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
              <dt className="text-[0.875rem] text-ink/62">{g.k}</dt>
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
            <StayFrame photo={p} className="aspect-square sm:aspect-[3/4]" sizes="(min-width: 1024px) 40vw, 50vw" />
          </li>
        ))}
      </ul>
      <p className="mt-3 font-editorial text-[1rem] text-ink/65 italic">{caption}</p>
    </div>
  );
}

/**
 * Ramadan in the Haram (Jibril, 19 Nov 2026): what the last ten nights hold, numbered, on the night ground; words only.
 * Worship in the Haram, not a service Rawdah sells (meals stay as the questions say).
 */
export function HaramNights({ n }: { n: NonNullable<Journey["nights"]> }) {
  return (
    <section id="nights" className={`trip-anchor pt-[clamp(3.75rem,9vw,8rem)] ${gutter}`}>
      <Label>{n.label}</Label>
      <Heading className="mt-4 max-w-[44rem] text-[clamp(2.3rem,4.2vw,4rem)]">{n.title}</Heading>
      <p className="mt-4 max-w-[34rem] text-[1rem] leading-[1.65] text-ink/72">{n.intro}</p>
      <ol className="nights-list mt-9 sm:mt-12">
        {n.items.map((it, i) => (
          <li key={it.title}>
            <span aria-hidden className="nights-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="display text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight">{it.title}</h3>
            <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink/70">{it.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Rawdah's earlier trips: their posters, then a gallery of the groups (after The Umrah Company's past journeys). */
export function PastTrips({ p }: { p: NonNullable<Journey["pastTrips"]> }) {
  return (
    <section className="mt-12 sm:mt-16">
      <Heading className="text-[clamp(1.9rem,3.2vw,2.6rem)] leading-tight">{p.title}</Heading>
      <div className="past-top mt-6">
        {p.lead ? (
          <figure className="past-lead">
            <div className="past-lead-photo">
              <Image src={p.lead.src} alt={p.lead.alt} fill sizes="(min-width: 1024px) 46rem, 100vw" className={`object-cover ${p.lead.position ?? ""}`} />
            </div>
            <figcaption>{p.lead.caption}</figcaption>
          </figure>
        ) : null}
        <ul className="grid gap-4">
          {p.trips.map((t) => (
            <li key={t.name} className="past-trip">
              {t.poster ? (
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] shadow-[var(--shadow-lift)]">
                  <Image src={t.poster.src} alt={t.poster.alt} fill sizes="(min-width: 1024px) 16rem, 42vw" className="object-cover" />
                </div>
              ) : null}
              <div>
                <p className="font-medium leading-snug lg:mt-3">{t.name}</p>
                <p className="text-[0.875rem] text-ink/62">{t.dates}</p>
                <p className="mt-1.5 text-[0.9rem] leading-snug text-ink/72">{t.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className="past-gallery mt-8">
        {p.photos.map((ph) => (
          <li key={ph.src}>
            <StayFrame photo={ph} className="aspect-[4/3] rounded-[1rem]! sm:rounded-[1rem]!" sizes="(min-width: 1024px) 14rem, 78vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Who the trip suits: three short rows under the trip's two sentences (after the best trip pages' overviews). */
export function ForWho({ items }: { items: NonNullable<Journey["forWho"]> }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-3">
      {items.map((w) => (
        <li key={w.title} className="glass rounded-[1.1rem] p-4 [--glass-shadow:none]">
          <p className="flex items-center gap-2 font-medium">
            <Tick />
            {w.title}
          </p>
          <p className="mt-1.5 text-[0.92rem] leading-snug text-ink/70">{w.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** Why Rawdah: the name's meaning, the team's photo and four short reasons, in Rawdah's own words (About page, V1). */
export function WhyRawdah({ w }: { w: NonNullable<Journey["why"]> }) {
  return (
    <section className="mt-12 sm:mt-16">
      <p className={eyebrow}>{w.label}</p>
      <div className="mt-3 grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] sm:items-center">
        <div>
          <Heading className="text-[clamp(1.9rem,3.2vw,2.6rem)] leading-tight">
            {w.title} <span lang="ar" dir="rtl" className="font-editorial text-bronze">{w.ar}</span>
          </Heading>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-ink/75">{w.text}</p>
          <p className="mt-1.5 text-[0.875rem] text-ink/55">{w.source}</p>
        </div>
        <StayFrame photo={w.photo} className="aspect-[4/3]" sizes="(min-width: 1024px) 22rem, 90vw" />
      </div>
      <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {w.reasons.map((r) => (
          <li key={r.title} className="border-t border-ink/10 pt-3">
            <p className="font-medium">{r.title}</p>
            <p className="mt-1 text-[0.92rem] leading-snug text-ink/70">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The other campaign at the foot of the page (Ramadan → Hajj 2027, Jibril 19 Nov 2026). */
export function OtherTripBand({ o }: { o: NonNullable<Journey["otherTrip"]> }) {
  return (
    <section className={`py-[clamp(3rem,7vw,5.5rem)] ${gutter}`}>
      <div className="other-trip">
        <div>
          <p className="gf-kicker">{o.label}</p>
          <p className="other-trip-title">{o.title}</p>
          <p className="mt-3 max-w-[30rem] text-[1rem] leading-relaxed text-[rgb(241_238_230/0.82)]">{o.text}</p>
        </div>
        <a href={o.href} {...(o.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="gf-cta shrink-0">
          {o.cta}
          <Chevron className="size-3" />
        </a>
      </div>
    </section>
  );
}

/**
 * Rawdah's own groups from earlier trips, as proof (Jibril, 19 Nov 2026), whole pictures with everyone in frame.
 * Phones: a row to swipe; desktop: three side by side.
 */
export function GroupStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  return (
    <section className="mt-12 sm:mt-16">
      <ul className="group-strip">
        {photos.map((p) => (
          <li key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-lift)]">
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 18rem, 78vw" className="object-cover" />
          </li>
        ))}
      </ul>
      <p className="mt-3 font-editorial text-[1.05rem] text-ink/65 italic">Rawdah groups on earlier trips.</p>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* A trip with its plan settled (the Ramadan 2027 trip): the line of the     */
/* trip, flights, hotels, what's included, packages and the payment          */
/* timetable. After Rawdah's own itinerary sheets, in the site's colours.    */
/* ------------------------------------------------------------------------ */

const eyebrow = "font-editorial text-[1.12rem] italic text-bronze";
const pill = "rounded-[0.7rem] border border-ink/12 bg-(--raise) px-3 py-1 text-[0.875rem] whitespace-nowrap";

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
const walker = "M13 4.5a1.5 1.5 0 1 0 0-.01M9.5 21l2-6.5 2.5 2.5V21M8 12.5l2-4.5 3.5 1 2 3.5 2.5 1M11.5 8 9 15";
const bus = "M5 17V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11M5 13h14M5 17h14M7.5 20v-3M16.5 20v-3M8 15h.01M16 15h.01M5 8h14";


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
export function TripLine({ plan, draw = false }: { plan: TripPlan; draw?: boolean }) {
  // With draw, the wrapper is what scrolls into view; the line inside it is unmasked (globals.css, "journey line").
  const seg = (stay: boolean) =>
    `flex items-center justify-between gap-3 rounded-[1rem] px-4 py-3 sm:grid sm:place-items-center sm:gap-0 sm:rounded-[0.95rem] sm:py-3 sm:text-center ${stay ? "bg-(--raise) sm:basis-0" : "bg-sand/25 sm:shrink-0 sm:px-5"}`;
  return (
    <div data-reveal={draw ? "" : undefined} className={draw ? "line-draw" : undefined}>
      <ol data-rv-skip={draw ? "" : undefined} className={`glass grid gap-1.5 rounded-[1.4rem] p-1.5 [--glass-shadow:none] sm:flex sm:rounded-[1.2rem]`}>
        {plan.timeline.map((s, i) => (
          <Fragment key={s.label}>
            <li className={seg(Boolean(s.nights))} style={s.nights ? { flexGrow: s.nights } : undefined}>
              <span className="block text-[0.98rem] font-medium">{s.label}</span>
              <span className="block text-[0.875rem] text-ink/62 tabular-nums">{s.sub}</span>
            </li>
            {plan.marker && plan.marker.after === i ? <li className={`${eyebrow} px-4 py-1 text-[0.875rem] sm:hidden`}>↓ {plan.marker.text}</li> : null}
          </Fragment>
        ))}
      </ol>
      {plan.marker ? (
        // Same widths as the line above, so the note sits under the change of city.
        <div aria-hidden data-reveal={draw ? "" : undefined} data-rv={draw ? "12" : undefined} className="mt-2 hidden gap-1.5 px-1.5 sm:flex">
          {plan.timeline.map((s, i) => (
            <div key={s.label} className={`invisible relative h-5 ${s.nights ? "basis-0 px-4" : "shrink-0 px-5"}`} style={s.nights ? { flexGrow: s.nights } : undefined}>
              <span className="block h-0 overflow-hidden text-[0.98rem] font-medium">{s.label}</span>
              <span className="block h-0 overflow-hidden text-[0.875rem]">{s.sub}</span>
              {plan.marker && plan.marker.after + 1 === i ? (
                <span className={`visible absolute top-0 -left-1 whitespace-nowrap ${eyebrow} text-[0.875rem]`}>↑ {plan.marker.text}</span>
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
      <p className="mt-4 max-w-[36rem] text-[1rem] leading-[1.65] text-ink/72">From Heathrow and back: fourteen nights away, ten in Makkah and four in Madinah.</p>

      <div className="mt-9 sm:mt-12">
        <TripLine plan={plan} draw={j.posterType} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {plan.flights.map((f, i) => (
          <article key={f.dir} data-reveal={j.posterType ? "" : undefined} data-rv={j.posterType ? String(i) : undefined} className="glass relative rounded-[1.75rem] p-5 sm:p-7">
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
              <span className="text-[0.875rem] tracking-[0.16em] text-ink/60">{f.code}</span>
            </div>
            {j.posterType ? (
              <div aria-hidden className="plane-track">
                <span className="plane-run">
                  <Glyph d={plane} className="plane rotate-45" />
                </span>
              </div>
            ) : null}
            <Rows rows={f.rows} />
            {f.note ? <p className="mt-3 text-[0.875rem] text-ink/62">{f.note}</p> : null}
          </article>
        ))}

        {plan.hotels.map((h, i) => (
          <article key={h.city} data-reveal={j.posterType ? "" : undefined} data-rv={j.posterType ? String(i) : undefined} className="glass overflow-hidden rounded-[1.75rem]">
            {/* The hotel's photos once supplied, swipeable; no empty frame before that (design pass, 16 Nov 2026). */}
            {slotFilled(h.slot) ? <HotelGallery name={h.name} photos={[{ src: slot(h.slot), alt: `${h.name}, ${h.city}.` }, ...(h.more ?? [])]} /> : null}
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
              {/* No star rating on poster trips (Jibril, 19 Nov 2026: "5-star package", never a hotel rating). */}
              {h.stars && !j.posterType ? (
                <p className="mt-2">
                  <span className="text-[1.05rem] tracking-[0.1em] text-gold" aria-label={`${h.stars} stars`}>{"★".repeat(h.stars)}</span>
                </p>
              ) : null}
              {h.walk ? (
                <p className="hotel-walk">
                  <Glyph d={h.walk.by === "foot" ? walker : bus} className="size-4" />
                  {h.walk.text}
                </p>
              ) : null}
              {h.about ? <p className="mt-4 text-[0.98rem] leading-relaxed text-ink/75">{h.about}</p> : null}
              {h.features ? (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {h.features.map((f) => (
                    <li key={f} className={pill}>
                      {f}
                    </li>
                  ))}
                </ul>
              ) : null}
              <Rows rows={h.rows} />
              {h.note ? <p className="mt-3 text-[0.875rem] text-ink/62">{h.note}</p> : null}
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
  // With the poster's icon row above, the list says only what the icons don't (poster trips, 19 Nov 2026).
  const items = (plan.cards || plan.perks) && plan.perksAlso ? plan.perksAlso : plan.includes;
  return (
    <>
    {plan.showcase ? (
      <ul className="showcase mt-6">
        {plan.showcase.map((s) => (
          <li key={s.src}>
            <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 1024px) 28rem, 46vw" quality={85} className="h-full w-full object-cover" />
            <span className="showcase-label">{s.label}</span>
          </li>
        ))}
      </ul>
    ) : null}
    {plan.cards ? <IncludedCards cards={plan.cards} /> : plan.perks ? <PosterPerks perks={plan.perks} className="mt-6" /> : null}
    <ul className={`glass-phone ${plan.perks ? "mt-4" : "mt-6"} grid grid-cols-1 rounded-[1.25rem] px-4 py-1 [--glass-shadow:none] sm:grid-cols-2 sm:gap-1.5 sm:p-0`}>
      {items.map((h, i) => (
        <li key={h.value} className={`glass-wide flex items-start gap-3 py-3 text-[0.95rem] sm:rounded-[1.1rem] sm:px-4 sm:py-3.5 ${i ? "border-t border-ink/8" : ""}`}>
          <Tick className="mt-[0.2em]" />
          <span>
            {h.value}
            <Mark s={h.status} />
          </span>
        </li>
      ))}
    </ul>
    {plan.includesNote ? <p className="mt-3 text-[0.9rem] text-ink/68">{plan.includesNote}</p> : null}
    </>
  );
}

/**
 * Poster trips' packages (Jibril, 19 Nov 2026): the poster's instalment plan as tiles, then the packages as cards with
 * a with-flights / ground-only switch (after The Sunnah Experience), then the notes. Prices from src/lib/trips.ts.
 */
export function PosterPackages({ j }: { j: Journey }) {
  const rooms = j.rooms?.value ?? [];
  const planned = rooms.find((r) => (r.schedule ?? []).filter((p) => !/agreed/i.test(p.due)).length > 2);
  const deposit = rooms[0]?.schedule?.[0]?.amount;
  return (
    <>
      {j.heroNote ? <p className="mt-3 font-editorial text-[1.2rem] text-ink/70 italic">{j.heroNote.replace(" · ", ", for ")}.</p> : null}
      {planned ? (
        <div className="plan-block mt-8">
          <p className="plan-title">
            <PosterText text="Installment" />
            <span>Plan available</span>
          </p>
          <ul className="plan-tiles">
            {planned.schedule!.map((p, i) => (
              <li key={p.due}>
                <b>{gbp(p.amount)}</b>
                <span>{i === 0 ? "Deposit due" : p.due.replace(/, final$/i, "")}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-[0.9rem] text-ink/62">
            For the {planned.type.toLowerCase()}, {gbp(planned.price)} per person. Every package pays on the same dates: each one’s plan is below.
          </p>
        </div>
      ) : null}
      <PackageCards j={j} />
      <div className="mt-5 grid gap-1.5 text-[0.9rem] leading-relaxed text-ink/70">
        {deposit ? <p>A {gbp(deposit)} deposit holds your place on every package. All deposits are non-refundable.</p> : null}
        {j.plan?.places ? <p>{j.plan.places.value}.</p> : null}
      </div>
    </>
  );
}

/**
 * The packages side by side in one table: what each costs, then when each payment falls due. Prices and dates from
 * src/lib/trips.ts. The column heads are plain text (they used to look like toggles; Fable's review, 17 Nov 2026).
 */
export function TripPackages({ j }: { j: Journey }) {
  const rooms = j.rooms?.value ?? [];
  const occs = [...new Set(rooms.map((r) => r.sharing))];
  if (rooms.some((r) => r.flights === false) && occs.length > 1) return <PackageGrid j={j} />;
  // Every payment row any package has, in order of first appearance; a package without that row shows a dash.
  const dues: string[] = [];
  for (const r of rooms) for (const p of r.schedule ?? []) if (!dues.includes(p.due)) dues.push(p.due);
  const cell = "py-2.5 pl-2 text-right whitespace-nowrap sm:pl-3";
  /** Short row labels so the table fits a phone: "20 January, final" → "20 Jan". */
  const short = (d: string) =>
    /^deposit/i.test(d) ? "Deposit" : /^balance/i.test(d) ? "Balance" : d.replace(/, final$/i, "").replace(/(January|February|March|April|May|June|July|August|September|October|November|December)/, (m) => m.slice(0, 3));
  const agreed = dues.some((d) => /agreed after booking/i.test(d));
  return (
    <>
      <div className="glass mt-6 overflow-x-auto rounded-[1.5rem] p-5 sm:p-7">
        <table className="w-full text-[0.9rem] tabular-nums sm:text-[0.95rem]">
          <caption className="sr-only">Packages and payment dates, per person</caption>
          <thead>
            <tr>
              <td />
              {rooms.map((r) => (
                <th key={r.type} scope="col" className="pb-4 pl-2 text-right align-bottom font-normal sm:pl-3">
                  <span className="block font-editorial text-[1.1rem] leading-tight text-bronze italic sm:text-[1.25rem]">{r.type}</span>
                  <span className="display mt-1 block text-[clamp(1.5rem,4.6vw,2.4rem)] leading-none text-ink tabular-nums">{gbp(r.price)}</span>
                  <span className="mt-1.5 block text-[0.875rem] leading-snug text-ink/62">{r.flights === false ? "Own flights" : "With flights"}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dues.map((d) => (
              <tr key={d} className="border-t border-ink/10">
                <th scope="row" className="py-2.5 pr-2 text-left font-normal whitespace-nowrap text-ink/70">
                  {short(d)}
                </th>
                {rooms.map((r) => {
                  const p = r.schedule?.find((x) => x.due === d);
                  return (
                    <td key={r.type} className={`${cell} ${p ? "" : "text-ink/55"}`}>
                      {p ? (
                        gbp(p.amount)
                      ) : (
                        <>
                          <span aria-hidden>–</span>
                          <span className="sr-only">None</span>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[0.875rem] text-ink/68">
        Per person, four sharing a room.{agreed ? " Ground only: the balance is due on a date we agree after booking." : ""} All deposits are
        non-refundable.
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

/**
 * Packages as a grid (Ramadan, 19 Nov 2026): rooms down the side, with flights or ground only across, then how each
 * is paid. The early bird is shown crossed out. Prices and dates from src/lib/trips.ts.
 */
function PackageGrid({ j }: { j: Journey }) {
  const rooms = j.rooms?.value ?? [];
  const name = (n: number) => ({ 4: "Quad", 3: "Triple", 2: "Double" })[n] ?? `${n} sharing`;
  const occs = [...new Set(rooms.map((r) => r.sharing))].sort((a, b) => b - a);
  const cols = [true, false];
  const at = (f: boolean, n: number) => rooms.find((r) => (r.flights !== false) === f && r.sharing === n);
  const dated = rooms.filter((r) => (r.schedule?.length ?? 0) > 2);
  const deposit = rooms[0]?.schedule?.[0]?.amount;
  return (
    <>
      <div className="glass mt-6 rounded-[1.5rem] p-5 sm:p-7">
        {j.endedOffer ? (
          <p className="mb-4 text-[0.9rem] text-ink/62">
            <s className="decoration-ink/50">
              {j.endedOffer.label} {gbp(j.endedOffer.price)}
            </s>{" "}
            on the {j.endedOffer.room.toLowerCase()} has ended. Prices per person.
          </p>
        ) : null}
        <table className="w-full text-[0.95rem] tabular-nums">
          <caption className="sr-only">Prices per person by room, with flights or ground only</caption>
          <thead>
            <tr>
              <td />
              {cols.map((f) => (
                <th key={String(f)} scope="col" className="pb-3 pl-3 text-right align-bottom font-normal">
                  <span className="block font-editorial text-[1.1rem] leading-tight text-bronze italic sm:text-[1.25rem]">{f ? "With flights" : "Ground only"}</span>
                  <span className="mt-0.5 block text-[0.875rem] text-ink/62">{f ? "Saudia from Heathrow" : "Own flights, enquire"}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {occs.map((n) => (
              <tr key={n} className="border-t border-ink/10">
                <th scope="row" className="py-3 pr-2 text-left font-normal">
                  <span className="block font-medium">{name(n)}</span>
                  <span className="block text-[0.875rem] text-ink/62">{n} sharing</span>
                </th>
                {cols.map((f) => {
                  const r = at(f, n);
                  return (
                    <td key={String(f)} className="py-3 pl-3 text-right">
                      <span className="display text-[clamp(1.45rem,4.6vw,2rem)] leading-none text-ink">{r ? gbp(r.price) : "–"}</span>
                      {r && j.endedOffer?.room === r.type ? <s className="block text-[0.875rem] text-ink/50">{gbp(j.endedOffer.price)}</s> : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid gap-1.5 text-[0.9rem] leading-relaxed text-ink/70">
        {deposit ? <p>A {gbp(deposit)} deposit holds your place on every package. All deposits are non-refundable.</p> : null}
        {dated.map((r) => (
          <p key={r.type}>
            {r.type}: then{" "}
            {r
              .schedule!.slice(1)
              .map((p) => `${gbp(p.amount)} on ${p.due.replace(/, final$/i, "")}`)
              .join(", ")}
            .
          </p>
        ))}
        {dated.length && dated.length < rooms.length ? <p>Every other package: the balance on dates we agree with you after booking.</p> : null}
        {j.plan?.places ? (
          <p>
            {j.plan.places.value}.
            <Mark s={j.plan.places.status} />
          </p>
        ) : null}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* The trust box: who travels with you, real numbers once confirmed, then   */
/* the two next steps (brief step 6).                                        */
/* ------------------------------------------------------------------------ */

/**
 * `book` adds the main button (phones, where the box closes the trip's story); beside the join panel on desktop
 * the box carries only the softer option, so the page never shows two "Book your place" buttons side by side.
 */
export function TrustBox({ j, members, book, bookHref, bookLabel, className = "" }: { j: Journey; members: Member[]; book: boolean; bookHref: string; bookLabel: string; className?: string }) {
  if (!trust.show) return null;
  /** Real people only: not the "named when the trip is announced" placeholder. */
  const named = members.filter((m) => m.name !== j.teacher.value);
  const soft =
    j.plan ? (
      <ItineraryLink href={`#${anchors.form}`} className={outline}>
        Get the full itinerary
      </ItineraryLink>
    ) : (
      <a href={wa(j.kind === "hajj" ? say.hajj : j.waText, j.name)} target="_blank" rel="noopener noreferrer" data-placement="trust box" className={outline}>
        Ask us on WhatsApp
      </a>
    );
  return (
    <div className={`glass rounded-[1.5rem] p-5 sm:p-6 ${className}`}>
      <p className="font-editorial text-[1.15rem] italic text-bronze">{trust.title}</p>
      {trust.stats.length ? (
        <dl className="mt-4 grid grid-cols-3 gap-2 border-b border-ink/8 pb-4">
          {trust.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-[1.9rem] leading-none">{s.value}</dd>
              <dd className="mt-1 text-[0.875rem] leading-snug text-ink/65">{s.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className="mt-4 text-[0.875rem] text-ink/65">{trust.people}</p>
      <ul className="mt-3 space-y-3">
        {named.map((m) => (
          <li key={m.name} className="flex items-center gap-3">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-beige">
              {m.photo ? (
                <Image src={m.photo.src} alt="" fill sizes="44px" className={`object-cover ${m.photo.position ?? ""}`} />
              ) : (
                <span aria-hidden className="grid size-full place-items-center font-editorial text-[1.1rem] text-bronze">
                  {m.name.replace(/^(Ustadh|Brother|Sheikh|Shaykh) /, "").charAt(0)}
                </span>
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.95rem] leading-snug">{m.name}</span>
              <span className="block text-[0.875rem] leading-snug text-ink/65">{m.does}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid gap-2">
        {book ? (
          <a href={bookHref} className="btn-ink flex min-h-[3.25rem] items-center justify-center rounded-[0.95rem] text-[0.95rem] font-medium lg:hidden">
            {bookLabel}
          </a>
        ) : null}
        {soft}
      </div>
    </div>
  );
}

const outline = "flex min-h-[3.25rem] items-center justify-center rounded-[0.95rem] border border-ink/15 bg-(--raise) text-[0.95rem] font-medium hover:border-ink/40";

