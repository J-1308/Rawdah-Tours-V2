import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComingSoonTrip } from "@/app/_site/coming-soon";
import { TripPhoneBar } from "@/app/_site/trip-bar";
import { anchors, brand, covers, faqs, fromPrice, gbp, hajjNusuk, journey, journeys, nightsOf, ramadanReveal, routes, routeText, say, type Journey } from "@/app/_site/content";
import { CoverGroups, FaqList, PaymentPlan, Tick } from "@/app/_site/home-sections";
import { Mark } from "@/app/_site/marks";
import { ArrivalTrigger } from "@/app/_site/arrival-trigger";
import { Arrival, HeroOffer, Mist, PosterTeam } from "@/app/_site/poster-parts";
import { PosterLockup, PosterText } from "@/app/_site/poster-type";
import { StepForm } from "@/app/_site/step-form";
import { ReservePanel } from "@/app/_site/reserve";
import { Chapter, ConfirmedPending, gutter, Heading, Label, Logo, PageLead, PartnerLogo, WaTile } from "@/app/_site/shell";
import { HajjOnNusuk, leaderMember, MomentStrip, PosterTeamBlock, TeamLine, TeamList, tripTeacherMembers, teamMembers, TripIncludes, TrustBox, TripJourney, TripPackages, WhereYouStay, type Member } from "@/app/_site/trip-parts";
import { StateTag } from "@/app/_site/trip-row";
import { Chevron } from "@/app/_site/whatsapp";
import { getTrip, isBookable, isDemoBooking } from "@/lib/trips";

export function generateStaticParams() {
  return journeys.filter((j) => j.state !== "past").map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = journey(slug);
  if (!j || j.state === "past") return {};
  if (j.slug === "ramadan-umrah-2027" && !ramadanReveal) return { title: "Ramadan 1448 with GGC, coming soon", description: "A Ramadan Umrah with Rawdah Tours and the Global Guidance Center. Register your interest to hear first." };
  const price = fromPrice(j);
  const title = price ? `${j.name}, from ${gbp(price)} per person` : j.name;
  // The trip's own share card: without these, a shared link shows the site-wide (Hajj) one (Opus review).
  const share = { title: j.partner ? `${j.name} with ${j.partner.replace(/ × Rawdah Tours$/, "")}, from ${price ? gbp(price) : ""}`.replace(/, from $/, "") : title, description: `${j.dates.value}. ${j.tagline}` };
  const image = j.photo ? [{ url: j.photo.src, width: j.photo.width, height: j.photo.height, alt: j.photo.alt }] : undefined;
  return {
    title,
    description: j.tagline,
    openGraph: { ...share, type: "website", url: `/trips/${j.slug}`, images: image },
    twitter: { card: "summary_large_image", ...share, images: image?.map((i) => i.url) },
  };
}

const h2 = "text-[clamp(2.1rem,3.4vw,3.1rem)]";
const posterH2 = "text-[clamp(1.9rem,4vw,3rem)] [--track:0.06em]";

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
              <p className="text-[0.875rem] font-medium text-bronze">{d.day}</p>
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
  if (!j || j.state === "past") notFound();
  if (j.slug === "ramadan-umrah-2027" && !ramadanReveal) return <ComingSoonTrip j={j} />;
  return <TripView j={j} />;
}

/** The full trip page. Also used by the private Ramadan preview (preview/page.tsx). */
export function TripView({ j }: { j: Journey }) {

  const trip = j.bookingSlug ? getTrip(j.bookingSlug) : undefined;
  const bookable = Boolean(trip && isBookable(trip) && j.state === "open");
  const demo = Boolean(trip && isDemoBooking(trip));
  const price = fromPrice(j);
  const nights = nightsOf(j);
  const theirTeachers = tripTeacherMembers.filter((t) => j.teacher.value.includes(t.name.replace(/^Ustadh /, "")));
  /** Named teachers when the trip has them; "the Rawdah Tours team" shows Ayuub and Issa; otherwise a "to be named" slot. */
  const members: Member[] = theirTeachers.length
    ? [leaderMember, ...theirTeachers]
    : /Rawdah Tours team/.test(j.teacher.value)
      ? teamMembers
      : [leaderMember, { name: j.teacher.value, does: "Certified ustadhs", line: "Every trip is guided by certified ustadhs. They’ll be named here when the trip is announced.", status: j.teacher.status }];
  /** On a trip with its plan set out above, the general answers about last year's itinerary, inclusions and meals would contradict it. */
  const shownAbove = ["What is included in the trip cost?", "What is the trip itinerary like?", "What about meal arrangements?"];
  const qs = faqs.filter((f) => (j.kind === "hajj" ? f.topic === "hajj" : f.topic !== "hajj") && !(j.plan && shownAbove.includes(f.q)));
  const joinLabel = j.state === "open" ? "Book your place" : "Register interest";
  const posterPeople = (j.posterTeam ?? []).map((p) => ({ label: p.label, name: p.name, note: p.note, photo: members.find((m) => m.name === p.ref)?.photo }));
  const ground = Math.min(...(j.rooms?.value ?? []).filter((r) => r.flights === false).map((r) => r.price));
  const offer = price ? <HeroOffer from={gbp(price)} ended={j.endedOffer ? `${j.endedOffer.label} ${gbp(j.endedOffer.price)}` : undefined} ground={Number.isFinite(ground) ? gbp(ground) : undefined} phone={brand.phone} /> : null;
  if (j.posterType) {
    // The title's face and the italic under it, fetched with the page, so the title doesn't rise in a fallback font.
    preload("/fonts/montserrat-latin-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
    preload("/fonts/cormorant-garamond-latin-wght-italic.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
  /** Titles in the poster lettering on a poster trip (Ramadan Umrah 2027), the site's own otherwise. */
  /** The packages to choose from in the form, with their price per person (from src/lib/trips.ts). */
  const packages = j.kind === "hajj" ? [] : (trip?.pricing?.rooms ?? []).map((r) => `${r.label}, ${gbp(r.pricePence / 100)} per person`);

  const facts = [
    { k: "Dates", v: j.dates.value, s: j.dates.status },
    // A night flight out counts as a night away (Ramadan: 1 + 9 + 4 = the poster's 14 nights).
    { k: nights ? "Length" : "Booking", v: nights ? (j.plan?.flights[0]?.overnight ? `${nights + 1} nights: 1 flying, ${nights} in 2 cities` : `${nights} nights in 2 cities`) : "On Nusuk" },
    { k: j.kind === "hajj" ? "Hajj guide" : "Teachers", v: j.teacher.value, s: j.teacher.status },
    { k: price ? "From" : "Prices", v: price ? `${gbp(price)} per person` : "Published on Nusuk", s: j.rooms?.status ?? j.priceNote?.status },
  ];

  return (
    // The poster skin (Ramadan Umrah 2027): the page below the header takes the poster's stone and olive; the header
    // and footer stay Rawdah's (globals.css, "The poster skin").
    <div className={j.posterType ? "skin-1448" : "contents"}>
      {j.posterType ? (
        <>
          <Arrival logo={<Logo className="h-20 sm:h-24" label="" />} />
          <ArrivalTrigger />
        </>
      ) : null}
      <TripPhoneBar j={j} price={price} deposit={trip?.pricing ? trip.pricing.depositPence / 100 : null} bookable={bookable} />
      {j.posterType ? (
        <Chapter tone="day">
          {/* The head on the poster's terms (Jibril, 19 Nov 2026): centred, the image first, then the title, the dates,
              one line, the price and the people. Less to read; the artwork does the work. */}
          <section className={`poster-hero wash-hero relative overflow-hidden pb-[clamp(2.5rem,7vw,5rem)] ${gutter}`}>
            <Mist />
            <div className="ph-art">
              <span className="ph-tab ph-tab-l follow" style={{ "--d": "250ms" } as CSSProperties}>
                <b>14</b>
                <small>Nights</small>
              </span>
              <span className="ph-tab ph-tab-r follow" style={{ "--d": "350ms" } as CSSProperties}>
                <b>Eid</b>
                <small>
                  <em>in the</em> Blessed lands
                </small>
              </span>
              <Image src="/images/brand/ramadan-1448-art-cut.png" alt="The Ka‘bah and the clock tower above Masjid al-Haram, from the GGC × Rawdah poster." width={830} height={622} priority sizes="(min-width: 1024px) 40rem, 100vw" className="ph-art-img settle" />
            </div>
            <div className="ph-text">
              <Heading as="h1" className="poster-lockup poster-rise">
                <PosterLockup year="1448" word="Ramadan" line="Last 10 nights" />
              </Heading>
              <p style={{ "--d": "700ms" } as CSSProperties} className="poster-date follow mt-3">
                {j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March")}
              </p>
              {j.partnerLogo ? (
                <p style={{ "--d": "800ms" } as CSSProperties} className="follow mt-4 flex items-center justify-center gap-3 text-[0.95rem] text-ink/70">
                  <PartnerLogo logo={j.partnerLogo} className="h-6 text-ink/85" />
                  <span aria-hidden className="h-5 w-px bg-ink/20" />
                  <span className="font-editorial text-[1.1rem] italic">with GGC</span>
                </p>
              ) : null}
              <p style={{ "--d": "880ms" } as CSSProperties} className="follow mx-auto mt-4 max-w-[30rem] font-editorial text-[clamp(1.3rem,4.6vw,1.65rem)] leading-snug text-ink/75 italic">
                {j.heroLine ?? j.tagline}
              </p>
              <div style={{ "--d": "960ms" } as CSSProperties} className="follow mx-auto max-w-[34rem] text-left">
                {offer}
              </div>
              <PosterTeam className="ph-team follow mx-auto mt-7 max-w-[26rem]" people={posterPeople} />
              <a href={`#${anchors.join}`} className="btn-ink mx-auto mt-7 flex min-h-[3.25rem] max-w-[22rem] items-center justify-center gap-2 rounded-[0.95rem] text-[0.95rem] font-medium">
                {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
              </a>
            </div>
          </section>
        </Chapter>
      ) : (
      <Chapter tone="top">
      <PageLead
        crumbs={[{ label: "Home", href: "/" }, { label: "Trips", href: routes.trips }, { label: j.name }]}
        title={j.posterType ? <PosterLockup year="1448" word="Ramadan" line="Last 10 nights" /> : j.name}
        backdrop={j.posterType ? <Mist /> : undefined}
        crumbsClassName={j.posterType ? "max-sm:hidden" : undefined}
        titleClassName={j.posterType ? "poster-lockup poster-rise" : undefined}
        photos={[{ src: j.photo.src, alt: j.photo.alt, position: j.photo.position }, ...j.more]}
      >
        {/* The dates straight under the title, in the poster's italic (Jibril, 18–19 Nov 2026). */}
        {j.posterType ? (
          <p style={{ "--d": "700ms" } as CSSProperties} className="poster-date follow mt-4">
            {j.dates.value.replace(/\bFeb\b/, "February").replace(/\bMar\b/, "March")}
          </p>
        ) : null}
        {j.partner ? (
          <div className="mt-4 flex items-center gap-3.5">
            {j.partnerLogo ? (
              <>
                <PartnerLogo logo={j.partnerLogo} className="h-7 text-ink/85 sm:h-8" />
                <span aria-hidden className="h-7 w-px bg-ink/20" />
              </>
            ) : null}
            <p className="font-editorial text-[1.05rem] leading-snug italic text-bronze">
              {j.partner}
              <br />
              Joint pilgrimage
            </p>
          </div>
        ) : null}
        <div className="mt-4">
          <StateTag j={j} onPhoto={false} />
        </div>
        <p className="lead-after mt-4 max-w-[34rem] font-editorial text-[clamp(1.4rem,2vw,1.8rem)] leading-snug text-ink/70 italic">{j.tagline}</p>
        <dl style={j.posterType ? ({ "--d": "900ms" } as CSSProperties) : undefined} className={`${j.posterType ? "follow " : ""}mt-6 grid max-w-[36rem] grid-cols-2 gap-2 text-[0.9rem] sm:mt-7 sm:gap-2.5 sm:text-[0.92rem]`}>
          {[...facts, { k: j.kind === "hajj" ? "The rites" : "Route", v: routeText(j), s: j.route.status }].map((f, i, all) => (
            <div key={f.k} className={`glass rounded-[1.1rem] p-3.5 [--glass-shadow:none] ${i === all.length - 1 ? "col-span-2" : ""}`}>
              <dt className="text-[0.875rem] text-ink/62">{f.k}</dt>
              <dd className="mt-1 leading-snug">
                {f.v}
                <Mark s={f.s} />
              </dd>
            </div>
          ))}
        </dl>
        <a href={j.state === "interest" ? `#${anchors.form}` : `#${anchors.join}`} style={j.posterType ? ({ "--d": "1050ms" } as CSSProperties) : undefined} className={`${j.posterType ? "follow " : ""}btn-ink mt-6 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.95rem] text-[0.95rem] font-medium lg:hidden`}>
          {joinLabel} <Chevron dir="down" className="size-3 opacity-70" />
        </a>
      </PageLead>
      </Chapter>
      )}

      <Chapter tone="day">
      <div className={`grid grid-cols-1 gap-x-14 gap-y-12 py-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 ${gutter}`}>
        {/* The join panel: beside the story on desktop, straight after the header on phones */}
        <aside id={anchors.join} className="scroll-mt-28 lg:order-2 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <ReservePanel j={j} bookable={bookable} />
            {/* Desktop, when the join panel is short (no packages): the trust box under it, softer option only.
                With packages the panel is tall, so the box sits in the story column instead (below). */}
            {j.rooms?.value.length ? null : <TrustBox j={j} members={members} book={false} bookHref="" bookLabel={joinLabel} className="mt-4 hidden lg:block" />}
            {demo ? (
              <p className="mt-5 rounded-[1rem] border border-dashed border-bronze/50 p-3 text-center text-[0.875rem] text-ink/70">
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
            {j.about ? (
              // Poster trips: a picture, a title, two sentences (Jibril: less to read, 19 Nov 2026).
              <>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-lift)] sm:aspect-[16/10]">
                  <Image src={j.photo.src} alt={j.photo.alt} fill sizes="(min-width: 1024px) 50rem, 100vw" className={`object-cover ${j.photo.position ?? ""}`} />
                </div>
                <Heading className={`${h2} mt-7`}>{j.about.title}</Heading>
                <p className="mt-3 max-w-[38rem] text-[1.05rem] leading-relaxed text-ink/75">{j.about.text}</p>
              </>
            ) : (
              <>
            <Heading className={h2}>About this trip</Heading>
            <p className="mt-4 max-w-[44rem] font-editorial text-[clamp(1.25rem,2vw,1.8rem)] leading-[1.5] sm:leading-[1.45]">
              {j.intro}
              <Mark s={j.introStatus} />
            </p>
              </>
            )}
            {j.plan ? null : <ul className="glass-phone mt-6 grid grid-cols-1 rounded-[1.25rem] px-4 py-1 [--glass-shadow:none] sm:mt-7 sm:grid-cols-2 sm:gap-1.5 sm:p-0">
              {j.highlights.map((h, i) => (
                <li key={h.value} className={`glass-wide flex items-start gap-3 py-3 text-[0.95rem] sm:rounded-[1.1rem] sm:px-4 sm:py-3.5 ${i ? "border-t border-ink/8" : ""}`}>
                  <Tick className="mt-[0.2em]" />
                  <span>
                    {h.value}
                    <Mark s={h.status} />
                  </span>
                </li>
              ))}
            </ul>}
          </section>

          {j.kind === "hajj" ? <HajjOnNusuk /> : null}

          {j.kind === "umrah" && j.itinerary ? <Itinerary j={j} /> : null}

          {/* A trip with its full plan shows what's settled in the plan itself (Ramadan rework, 17 Nov 2026). */}
          {!j.plan && (j.confirmed || j.pending) ? (
            <section className="mt-12 sm:mt-16">
              <ConfirmedPending confirmed={j.confirmed} pending={j.pending} />
            </section>
          ) : null}

          {/* Phones (and desktop when the trip has packages): the trust box closes the trip's story. Its main button
              shows on phones only; on desktop the join panel beside it is the main button. */}
          {/* The trust box repeats the team section on a trip with its full plan, so it shows only on the others. */}
          {j.plan ? null : <TrustBox
            j={j}
            members={members}
            book
            bookHref={bookable ? `/trips/${j.slug}/book` : j.state === "open" ? `#${anchors.join}` : `#${anchors.form}`}
            bookLabel={joinLabel}
            className={`mt-12 ${j.rooms?.value.length ? "lg:max-w-[30rem]" : "lg:hidden"}`}
          />}
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
            <Heading className="mt-4 max-w-[44rem] text-[clamp(2.3rem,4.2vw,4rem)]">Guidance that walks with you</Heading>
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
                  {j.posterTeam ? <PosterTeamBlock j={j} members={members} /> : <TeamList members={members} cols="lg:grid-cols-3" className="mt-8" />}
                  {j.posterTeam ? null : <TeamLine />}
                </section>
              </>
            ) : j.kind === "umrah" ? (
              <>
                <section>
                  <Heading className={h2}>{covers.headline}</Heading>
                  <div className="mt-6">
                    <CoverGroups groups={covers.groups} status={(s) => (s === "confirmed" ? s : "proposed")} />
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

        <section id={anchors.form} className={`wash-linen scroll-mt-28 py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              {/* Poster lettering on the title and this closing heading only; section headings stay in the serif (Jibril, 18 Nov 2026). */}
              <Heading className={j.posterType ? `poster-title ${posterH2}` : "text-[clamp(2.4rem,4vw,3.6rem)]"}>{j.kind === "hajj" ? hajjNusuk.closing.title : packages.length ? (j.posterType ? <PosterText text={joinLabel} /> : joinLabel) : "Hear first when the dates are out"}</Heading>
              <p className="mt-5 max-w-[24rem] text-[1rem] leading-[1.65] text-ink/72">
                {j.kind === "hajj"
                  ? `${hajjNusuk.closing.text} Registering doesn’t reserve a place or commit you to anything.`
                  : packages.length
                    ? "About a minute. The Rawdah Tours team confirms your place and how to pay the deposit."
                    : "About a minute, and the Rawdah Tours team will be in touch. Registering doesn’t reserve a place or commit you to anything."}
              </p>
            </div>
            <div className="glass rounded-[1.75rem] p-5 sm:p-8 lg:col-span-7 lg:col-start-6">
              {j.kind === "hajj" ? (
                <StepForm path="hajj" />
              ) : packages.length ? (
                <StepForm path="group" trip={j.name} sub={j.dates.value} packages={packages} deposit={trip?.pricing ? gbp(trip.pricing.depositPence / 100) : undefined} bookHref={bookable ? `/trips/${j.slug}/book` : undefined} />
              ) : (
                <StepForm path="interest" trip={j.name} />
              )}
            </div>
          </div>
        </section>
      </Chapter>
    </div>
  );
}
