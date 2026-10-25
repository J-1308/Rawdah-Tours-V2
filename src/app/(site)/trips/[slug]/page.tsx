import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { anchors, covers, faqs, fromPrice, gbp, journey, journeys, leader, nightsOf, routes, routeText, stay, teachers } from "@/app/_site/content";
import { CoverGroups, FaqList, PaymentPlan, TeacherList, Tick } from "@/app/_site/home-sections";
import { Mark } from "@/app/_site/marks";
import { RegisterForm } from "@/app/_site/register-form";
import { ReservePanel } from "@/app/_site/reserve";
import { ConfirmedPending, gutter, Heading, PageLead } from "@/app/_site/shell";
import { StateTag } from "@/app/_site/trip-row";
import { Chevron } from "@/app/_site/whatsapp";
import { getTrip, isBookable, isDemoBooking } from "@/lib/trips";

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = journey(slug);
  if (!j) return {};
  const price = fromPrice(j);
  return { title: price && j.state !== "past" ? `${j.name}, from ${gbp(price)} per person` : j.name, description: j.tagline };
}

const h2 = "text-[clamp(2.1rem,3.4vw,3.1rem)]";

/**
 * A trip's own page: the facts and a photo mosaic up top, the join panel
 * beside the story, then how the trip runs, where you stay, what the price
 * covers, the people, what's settled and what isn't, paying, questions, and
 * the register-interest form.
 */
export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = journey(slug);
  if (!j) notFound();

  const trip = j.bookingSlug ? getTrip(j.bookingSlug) : undefined;
  const bookable = Boolean(trip && isBookable(trip) && j.state === "open");
  const demo = Boolean(trip && isDemoBooking(trip));
  const price = fromPrice(j);
  const nights = nightsOf(j);
  const theirTeachers = teachers.filter((t) => j.teacher.value.includes(t.name.replace(/^Ustadh /, "")));
  const qs = faqs.filter((f) => (j.kind === "hajj" ? f.topic === "hajj" : f.topic !== "hajj"));
  const joinLabel = j.state === "open" ? "Book your place" : j.state === "past" ? "Hear about the next trip" : "Register interest";

  const facts = [
    { k: "Dates", v: j.dates.value, s: j.dates.status },
    { k: nights ? "Length" : "Booking", v: nights ? `${nights} nights in 2 cities` : "On Nusuk" },
    { k: j.kind === "hajj" ? "Hajj guide" : "Teachers", v: j.teacher.value, s: j.teacher.status },
    { k: price ? (j.state === "past" ? "Was from" : "From") : "Prices", v: price ? `${gbp(price)} per person` : "Published on Nusuk", s: j.rooms?.status ?? j.priceNote?.status },
  ];

  return (
    <>
      <PageLead
        crumbs={[{ label: "Home", href: "/" }, { label: "Trips", href: routes.trips }, { label: j.name }]}
        title={j.name}
        photos={[{ src: j.photo.src, alt: j.photo.alt, position: j.photo.position }, ...j.more]}
      >
        <div className="mt-4">
          <StateTag j={j} />
        </div>
        <p className="mt-4 max-w-[34rem] font-editorial text-[clamp(1.4rem,2vw,1.8rem)] leading-snug text-ink/65 italic">{j.tagline}</p>
        <dl className="mt-6 grid max-w-[36rem] grid-cols-2 gap-2 text-[0.9rem] sm:mt-7 sm:gap-2.5 sm:text-[0.92rem]">
          {[...facts, { k: j.kind === "hajj" ? "The rites" : "Route", v: routeText(j), s: j.route.status }].map((f, i, all) => (
            <div key={f.k} className={`glass rounded-[1.1rem] p-3.5 [--glass-shadow:none] ${i === all.length - 1 ? "col-span-2" : ""}`}>
              <dt className="text-[0.78rem] text-ink/50">{f.k}</dt>
              <dd className="mt-1 leading-snug">
                {f.v}
                <Mark s={f.s} />
              </dd>
            </div>
          ))}
        </dl>
        <a href={`#${anchors.join}`} className="btn-ink mt-6 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.95rem] text-[0.95rem] font-medium lg:hidden">
          {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
        </a>
      </PageLead>

      <div className={`grid grid-cols-1 gap-x-14 gap-y-12 py-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 ${gutter}`}>
        {/* The join panel: beside the story on desktop, straight after the header on phones */}
        <aside id={anchors.join} className="scroll-mt-28 lg:order-2 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <ReservePanel j={j} bookable={bookable} />
            {demo ? (
              <p className="mt-5 rounded-[1rem] border border-dashed border-bronze/50 p-3 text-center text-[0.82rem] text-ink/70">
                Preview only:{" "}
                <Link href={`/trips/${j.slug}/book`} className="underline underline-offset-4">
                  try the card and bank-transfer booking flow
                </Link>{" "}
                with this trip’s prices.
              </p>
            ) : null}
          </div>
        </aside>

        <div className="min-w-0 lg:order-1 lg:col-span-8">
          <section>
            <Heading className={h2}>About this trip</Heading>
            <p className="mt-4 max-w-[44rem] font-editorial text-[clamp(1.25rem,2vw,1.8rem)] leading-[1.5] sm:leading-[1.45]">
              {j.intro}
              <Mark s={j.introStatus} />
            </p>
            <ul className="glass-phone mt-6 grid grid-cols-1 rounded-[1.25rem] px-4 py-1 [--glass-shadow:none] sm:mt-7 sm:grid-cols-2 sm:gap-1.5 sm:p-0">
              {j.highlights.map((h, i) => (
                <li key={h.value} className={`glass-wide flex items-start gap-3 py-3 text-[0.95rem] sm:rounded-[1.1rem] sm:px-4 sm:py-3.5 ${i ? "border-t border-ink/8" : ""}`}>
                  <Tick className="mt-[0.2em]" />
                  <span>
                    {h.value}
                    <Mark s={h.status} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {j.itinerary ? (
            <section className="mt-12 sm:mt-16">
              <Heading className={h2}>
                {j.kind === "hajj" ? "The days of Hajj" : "How the trip runs"}
                <Mark s={j.itinerary.status} />
              </Heading>
              <ol className="mt-8">
                {j.itinerary.value.map((d, i, all) => (
                  <li key={d.day + d.title} className="grid grid-cols-[1.5rem_1fr] gap-x-4">
                    <span aria-hidden className="flex flex-col items-center">
                      <span className="mt-1.5 size-3 shrink-0 rounded-full bg-gold ring-4 ring-gold/20" />
                      {i < all.length - 1 ? <span className="mt-2 w-px flex-1 bg-gradient-to-b from-gold/50 to-gold/10" /> : null}
                    </span>
                    <div className="pb-8">
                      <p className="text-[0.82rem] font-medium text-bronze">{d.day}</p>
                      <p className="display mt-1 text-[1.65rem] leading-tight">{d.title}</p>
                      <p className="mt-1.5 max-w-[38rem] text-[0.96rem] leading-[1.65] text-ink/75">{d.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {j.kind === "hajj" ? (
                <p className="max-w-[38rem] text-[0.88rem] text-ink/60">The rites in outline. Your guide teaches each one in detail before you perform it, and each package’s timings are set out on Nusuk.</p>
              ) : null}
            </section>
          ) : null}

          {j.kind === "umrah" ? (
            <section className="mt-12 sm:mt-16">
              <Heading className={h2}>{stay.headline}</Heading>
              <div className="glass mt-6 rounded-[1.5rem] px-5 py-1 sm:px-7">
                {stay.hotels.map((h) => {
                  const named = h.city === "Madinah" ? j.hotels?.madinah : j.hotels?.makkah;
                  return (
                    <div key={h.city} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-ink/8 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline">
                      <p className="display text-[1.8rem] leading-none">{h.city}</p>
                      <p className="text-right text-[0.92rem] sm:order-last">{h.nights} nights</p>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[1rem] font-medium">
                          {named?.value ?? h.name}
                          <Mark s={named?.status ?? h.status} />
                        </p>
                        <p className="mt-0.5 text-[0.88rem] text-ink/65">
                          {h.walk}. {h.board}.
                        </p>
                      </div>
                    </div>
                  );
                })}
                {j.flights ? (
                  <p className="grid grid-cols-1 gap-1 py-4 text-[0.95rem] sm:grid-cols-[8rem_1fr]">
                    <span className="display text-[1.8rem] leading-none">Flights</span>
                    <span className="self-center">
                      {j.flights.value}
                      <Mark s={j.flights.status} />
                    </span>
                  </p>
                ) : null}
              </div>
            </section>
          ) : null}

          {j.kind === "umrah" ? (
            <section className="mt-12 sm:mt-16">
              <Heading className={h2}>{covers.headline}</Heading>
              <div className="mt-6">
                <CoverGroups groups={covers.groups} status={(s) => (j.state === "past" || s === "confirmed" ? s : "proposed")} />
              </div>
            </section>
          ) : null}

          <section className="mt-12 sm:mt-16">
            <Heading className={h2}>The people who will walk with you</Heading>
            <div className="mt-6">
              {theirTeachers.length ? (
                <TeacherList list={theirTeachers} tone="canvas" />
              ) : (
                <div className="glass grid grid-cols-[4.75rem_1fr] items-center gap-4 rounded-[1.5rem] p-4 sm:grid-cols-[7rem_1fr] sm:gap-5 sm:p-3 sm:pr-5">
                  <div className="grid aspect-square place-items-center rounded-[1.1rem] border border-dashed border-ink/25 p-2 text-center text-[0.72rem] text-ink/55">To be named</div>
                  <div>
                    <p className="display text-[1.45rem] leading-tight sm:text-[1.65rem]">
                      {j.teacher.value}
                      <Mark s={j.teacher.status} />
                    </p>
                    <p className="mt-2 text-[0.93rem] leading-[1.6] text-ink/70">Students of knowledge travel with every group. They’ll be named here when the trip is announced.</p>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-5 text-[0.95rem] text-ink/72">
              Led by <span className="font-medium text-ink">{leader.name}</span>, our group leader: {leader.line.charAt(0).toLowerCase() + leader.line.slice(1)}
            </p>
          </section>

          {j.confirmed || j.pending ? (
            <section className="mt-12 grid grid-cols-1 gap-2 sm:mt-16 sm:grid-cols-2 sm:gap-1.5">
              <ConfirmedPending confirmed={j.confirmed} pending={j.pending} />
            </section>
          ) : null}

          {j.kind === "umrah" ? (
            <section className="mt-12 sm:mt-16">
              <Heading className={h2}>Paying for your place</Heading>
              <div className="mt-6">
                <PaymentPlan tone="canvas" />
              </div>
            </section>
          ) : null}

          <section className="mt-12 sm:mt-16">
            <Heading className={h2}>Common questions</Heading>
            <div className="glass mt-6 rounded-[1.5rem] px-5 py-1">
              <FaqList items={qs} />
            </div>
          </section>
        </div>
      </div>

      {j.state !== "past" ? (
        <section id={anchors.form} className={`wash-linen scroll-mt-28 py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading className="text-[clamp(2.4rem,4vw,3.6rem)]">{j.kind === "hajj" ? "Register for Hajj 2027" : "Hear first when the dates are out"}</Heading>
              <p className="mt-5 max-w-[24rem] text-[1rem] leading-[1.65] text-ink/72">
                Two minutes, and someone from Rawdah will be in touch. Registering doesn’t reserve a place or commit you to anything.
              </p>
            </div>
            <div className="glass rounded-[1.75rem] p-5 sm:p-8 lg:col-span-7 lg:col-start-6">
              <RegisterForm defaultJourney={j.kind === "hajj" ? "hajj-2027" : "umrah"} page={`/trips/${j.slug}`} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
