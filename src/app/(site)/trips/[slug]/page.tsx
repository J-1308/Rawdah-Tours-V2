import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { anchors, covers, faqs, fromPrice, gbp, hajjBand, hajjNusuk, journey, journeys, nightsOf, routes, routeText, say, type Journey } from "@/app/_site/content";
import { CoverGroups, FaqList, PaymentPlan, Tick } from "@/app/_site/home-sections";
import { Mark } from "@/app/_site/marks";
import { RegisterForm } from "@/app/_site/register-form";
import { ReservePanel } from "@/app/_site/reserve";
import { Chapter, ConfirmedPending, gutter, Heading, Label, PageLead, PartnerLogo, WaTile } from "@/app/_site/shell";
import { HajjOnNusuk, leaderMember, MomentStrip, TeamLine, TeamList, teacherMembers, TripIncludes, TripJourney, TripPackages, WhereYouStay, type Member } from "@/app/_site/trip-parts";
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

/** How the trip runs (Umrah) or the days of Hajj, as a quiet timeline. */
function Itinerary({ j }: { j: Journey }) {
  if (!j.itinerary) return null;
  return (
    <section className={j.kind === "umrah" ? "mt-12 sm:mt-16" : ""}>
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
        <p className="max-w-[38rem] text-[0.88rem] text-ink/68">The rites in outline. Your guide teaches each one in detail before you perform it, and each package’s timings are set out on Nusuk.</p>
      ) : null}
    </section>
  );
}

/**
 * A trip's own page, in chapters (ADR 0004). Top: the facts and photographs.
 * Day: the join panel beside the story; for Hajj, how booking works on Nusuk,
 * the steps with us, what you need and our group; for Umrah, how the trip runs;
 * then what's settled and what isn't. Night: for Umrah, where you'll stay and
 * how you'll travel; for Hajj, the guidance, the days of Hajj and photographs.
 * Day: what's included, the people and paying (Umrah), questions, Hajj
 * updates, and the register-interest form.
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
  const theirTeachers = teacherMembers.filter((t) => j.teacher.value.includes(t.name.replace(/^Ustadh /, "")));
  const members: Member[] = [
    leaderMember,
    ...(theirTeachers.length
      ? theirTeachers
      : [{ name: j.teacher.value, does: "Students of knowledge", line: "Students of knowledge travel with every group. They’ll be named here when the trip is announced.", status: j.teacher.status }]),
  ];
  /** On a trip with its plan set out above, the general answers about last year's itinerary, inclusions and meals would contradict it. */
  const shownAbove = ["What is included in the trip cost?", "What is the trip itinerary like?", "What about meal arrangements?"];
  const qs = faqs.filter((f) => (j.kind === "hajj" ? f.topic === "hajj" : f.topic !== "hajj") && !(j.plan && shownAbove.includes(f.q)));
  const joinLabel = j.state === "open" ? "Book your place" : j.state === "past" ? "Hear about the next trip" : "Register interest";

  const facts = [
    { k: "Dates", v: j.dates.value, s: j.dates.status },
    { k: nights ? "Length" : "Booking", v: nights ? `${nights} nights in 2 cities` : "On Nusuk" },
    { k: j.kind === "hajj" ? "Hajj guide" : "Teachers", v: j.teacher.value, s: j.teacher.status },
    { k: price ? (j.state === "past" ? "Was from" : "From") : "Prices", v: price ? `${gbp(price)} per person` : "Published on Nusuk", s: j.rooms?.status ?? j.priceNote?.status },
  ];

  return (
    <>
      <Chapter tone="top">
      <PageLead
        crumbs={[{ label: "Home", href: "/" }, { label: "Trips", href: routes.trips }, { label: j.name }]}
        title={j.name}
        photos={[{ src: j.photo.src, alt: j.photo.alt, position: j.photo.position }, ...j.more]}
      >
        {j.partner ? (
          <div className="mt-4 flex items-center gap-3.5">
            {j.partnerLogo ? (
              <>
                <PartnerLogo logo={j.partnerLogo} className="h-7 text-ink/85 sm:h-8" />
                <span aria-hidden className="h-7 w-px bg-ink/20" />
              </>
            ) : null}
            <p className="text-[0.72rem] leading-snug font-medium tracking-[0.2em] text-bronze uppercase">
              {j.partner}
              <br />
              Joint pilgrimage
            </p>
          </div>
        ) : null}
        <div className="mt-4">
          <StateTag j={j} onPhoto={false} />
        </div>
        <p className="mt-4 max-w-[34rem] font-editorial text-[clamp(1.4rem,2vw,1.8rem)] leading-snug text-ink/70 italic">{j.tagline}</p>
        <dl className="mt-6 grid max-w-[36rem] grid-cols-2 gap-2 text-[0.9rem] sm:mt-7 sm:gap-2.5 sm:text-[0.92rem]">
          {[...facts, { k: j.kind === "hajj" ? "The rites" : "Route", v: routeText(j), s: j.route.status }].map((f, i, all) => (
            <div key={f.k} className={`glass rounded-[1.1rem] p-3.5 [--glass-shadow:none] ${i === all.length - 1 ? "col-span-2" : ""}`}>
              <dt className="text-[0.78rem] text-ink/62">{f.k}</dt>
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
      </Chapter>

      <Chapter tone="day">
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

          {j.kind === "hajj" ? <HajjOnNusuk /> : null}

          {j.kind === "umrah" && j.itinerary ? <Itinerary j={j} /> : null}

          {j.confirmed || j.pending ? (
            <section className="mt-12 grid grid-cols-1 gap-2 sm:mt-16 sm:grid-cols-2 sm:gap-1.5">
              <ConfirmedPending confirmed={j.confirmed} pending={j.pending} />
            </section>
          ) : null}
        </div>
      </div>
      </Chapter>

      {/* Night: the journey itself */}
      <Chapter tone="night">
        {j.kind === "umrah" ? (
          j.plan ? (
            <TripJourney j={j} />
          ) : (
            <WhereYouStay j={j} />
          )
        ) : (
          <section className={`py-[clamp(3.75rem,9vw,8rem)] ${gutter}`}>
            <Label>Hajj 2027</Label>
            <Heading className="mt-4 max-w-[44rem] text-[clamp(2.3rem,4.2vw,4rem)]">Experienced guidance, walking with you</Heading>
            <p className="mt-4 max-w-[36rem] text-[1rem] leading-[1.65] text-ink/72">From your first question in the UK to the last tawaf, the same people with you the whole way.</p>
            <TeamList members={members} cols="lg:grid-cols-3" className="mt-10" />
            {j.itinerary ? (
              <div className="mt-16 max-w-[48rem] sm:mt-20">
                <Itinerary j={j} />
              </div>
            ) : null}
            <MomentStrip
              photos={[
                { src: "/images/teaching/teaching-06.jpg", alt: "A Rawdah preparation session in the UK.", position: "object-[50%_60%]" },
                { src: "/images/friends/friends-05.jpg", alt: "Three travellers in ihram outside Masjid al-Haram at dusk.", position: "object-[50%_50%]" },
                { src: "/images/friends/friends-09.jpg", alt: "Two travellers in ihram at night, the clock tower behind them.", position: "object-[50%_40%]" },
              ]}
              caption="From our preparation sessions and Umrah trips. Our Hajj group’s photos will follow."
            />
          </section>
        )}
      </Chapter>

      <Chapter tone="day">
        <div className={`py-[clamp(3.75rem,9vw,8rem)] ${gutter}`}>
          <div className="max-w-[60rem]">
            {j.kind === "umrah" && j.plan ? (
              <>
                <section>
                  <Heading className={h2}>What’s included</Heading>
                  <TripIncludes plan={j.plan} />
                </section>
                <section className="mt-12 sm:mt-16">
                  <Heading className={h2}>Packages and payments</Heading>
                  <TripPackages j={j} />
                </section>
                <section className="mt-12 sm:mt-16">
                  <Heading className={h2}>The people who will walk with you</Heading>
                  <TeamList members={members} cols="lg:grid-cols-3" className="mt-8" />
                  <TeamLine />
                </section>
              </>
            ) : j.kind === "umrah" ? (
              <>
                <section>
                  <Heading className={h2}>{covers.headline}</Heading>
                  <div className="mt-6">
                    <CoverGroups groups={covers.groups} status={(s) => (j.state === "past" || s === "confirmed" ? s : "proposed")} />
                  </div>
                </section>
                <section className="mt-12 sm:mt-16">
                  <Heading className={h2}>The people who will walk with you</Heading>
                  <TeamList members={members} cols="lg:grid-cols-3" className="mt-8" />
                  <TeamLine />
                </section>
                <section className="mt-12 sm:mt-16">
                  <Heading className={h2}>Paying for your place</Heading>
                  <div className="mt-6">
                    <PaymentPlan tone="canvas" />
                  </div>
                </section>
              </>
            ) : null}

            <section className={j.kind === "umrah" ? "mt-12 sm:mt-16" : ""}>
              <Heading className={h2}>Common questions</Heading>
              <div className="glass mt-6 rounded-[1.5rem] px-5 py-1">
                <FaqList items={qs} />
              </div>
            </section>

            {j.kind === "hajj" ? (
              <section className="mt-12 sm:mt-16">
                <div className="glass flex flex-col gap-5 rounded-[1.75rem] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                  <div>
                    <p className="display text-[1.7rem] leading-tight">
                      {hajjNusuk.updates.title}
                      <Mark s={hajjNusuk.updates.status} />
                    </p>
                    <p className="mt-1.5 max-w-[30rem] text-[0.95rem] leading-[1.6] text-ink/70">{hajjNusuk.updates.text}</p>
                  </div>
                  <WaTile text={say.hajj} label="Message us" tone="solid" className="shrink-0" />
                </div>
              </section>
            ) : null}
          </div>
        </div>

        {j.state !== "past" ? (
          <section id={anchors.form} className={`wash-linen scroll-mt-28 py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
            <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                {j.kind === "hajj" ? (
                  <p lang="ar" className="ar mb-2 text-left text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.7] text-bronze">
                    {hajjBand.talbiyah}
                  </p>
                ) : null}
                <Heading className="text-[clamp(2.4rem,4vw,3.6rem)]">{j.kind === "hajj" ? hajjNusuk.closing.title : j.plan ? `Register for ${j.name}` : "Hear first when the dates are out"}</Heading>
                <p className="mt-5 max-w-[24rem] text-[1rem] leading-[1.65] text-ink/72">
                  {j.kind === "hajj" ? `${hajjNusuk.closing.text} ` : ""}Two minutes, and someone from Rawdah will be in touch. Registering doesn’t reserve a place or commit you to anything.
                </p>
              </div>
              <div className="glass rounded-[1.75rem] p-5 sm:p-8 lg:col-span-7 lg:col-start-6">
                <RegisterForm defaultJourney={j.kind === "hajj" ? "hajj-2027" : "umrah"} page={`/trips/${j.slug}`} />
              </div>
            </div>
          </section>
        ) : null}
      </Chapter>
    </>
  );
}
