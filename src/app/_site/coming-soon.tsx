import Link from "next/link";

import { anchors, say, type Journey } from "@/app/_site/content";
import { RegisterForm } from "@/app/_site/register-form";
import { Actions, Chapter, Emblem, gutter, Heading, PartnerLogo } from "@/app/_site/shell";

/**
 * "1448 · Ramadan · Coming soon", after the poster Rawdah and GGC shared, in Rawdah's colours: sand lettering on
 * cocoa, the Rawdah mark above and GGC's below. Josefin Sans (.font-poster) stands in for the poster's face.
 */
export function RamadanLockup({ j, className = "", compact = false }: { j: Journey; className?: string; compact?: boolean }) {
  if (compact) {
    // The same poster, small, filling a photo frame (the trip cards).
    return (
      <div className={`panel-dark absolute inset-0 isolate grid place-items-center overflow-hidden text-center text-sand ${className}`}>
        <Emblem className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[150%] -translate-x-1/2 -translate-y-1/2 text-cream/[0.04]" />
        <div>
          <Emblem className="mx-auto h-8" />
          <p className="font-poster mt-3 text-[0.8rem] font-light tracking-[0.16em]">1448</p>
          <p className="font-poster text-[2rem] leading-none font-semibold tracking-[0.06em] uppercase">Ramadan</p>
          <p className="font-poster mt-1.5 text-[0.62rem] font-light tracking-[0.42em] uppercase">Coming soon</p>
          {j.partnerLogo ? <PartnerLogo logo={j.partnerLogo} className="mx-auto mt-4 h-5" /> : null}
        </div>
      </div>
    );
  }
  return (
    <div className={`panel-dark relative isolate overflow-hidden rounded-[2rem] px-6 py-12 text-center text-sand sm:py-16 ${className}`}>
      <Emblem className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[140%] -translate-x-1/2 -translate-y-1/2 text-cream/[0.04]" />
      <Emblem className="mx-auto h-14 text-sand sm:h-16" />
      <p className="font-poster mt-8 text-[clamp(1.3rem,3vw,1.9rem)] font-light tracking-[0.16em] sm:mt-10">1448</p>
      <p className="font-poster mt-1 text-[clamp(3rem,11vw,6.6rem)] leading-[1.05] font-semibold tracking-[0.06em] uppercase">Ramadan</p>
      <p className="font-poster mt-2 text-[clamp(0.95rem,2.6vw,1.7rem)] font-light tracking-[0.42em] uppercase sm:mt-3">Coming soon</p>
      {j.partnerLogo ? <PartnerLogo logo={j.partnerLogo} className="mx-auto mt-9 h-8 text-sand sm:mt-11 sm:h-10" /> : null}
    </div>
  );
}

/** The trip page while the details are kept back: the lockup, a line, ways to register, and the form. */
export function ComingSoonTrip({ j }: { j: Journey }) {
  return (
    <>
      <Chapter tone="top">
        <section className={`wash-hero pt-[clamp(1.5rem,4vw,3rem)] pb-[clamp(3.5rem,8vw,6rem)] ${gutter}`}>
          <nav aria-label="Breadcrumb" className="text-[0.86rem] text-ink/62">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="mx-2 text-ink/30">/</span>
            <Link href="/trips" className="hover:text-ink">
              Trips
            </Link>
            <span className="mx-2 text-ink/30">/</span>
            <span className="text-ink/85">{j.name}</span>
          </nav>
          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-center">
            <RamadanLockup j={j} className="lg:col-span-7" />
            <div className="lg:col-span-5">
              <Heading as="h1" className="text-[clamp(2.5rem,4.4vw,4rem)]">
                A Ramadan Umrah with GGC.
              </Heading>
              <p className="mt-5 max-w-[30rem] text-[1.02rem] leading-[1.7] text-ink/72">
                Rawdah Tours and the Global Guidance Center are taking a group for Ramadan 1448, open to brothers, sisters and families. The details are coming
                soon. Register now and you’ll hear first.
              </p>
              <Actions primary={{ label: "Register interest", href: `#${anchors.form}` }} waText={say.nextUmrah} className="mt-7" />
            </div>
          </div>
        </section>
      </Chapter>

      <Chapter tone="day">
        <section id={anchors.form} className={`scroll-mt-28 py-[clamp(3.75rem,10vw,8rem)] ${gutter}`}>
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Heading className="text-[clamp(2.4rem,4vw,3.6rem)]">Hear first</Heading>
              <p className="mt-5 max-w-[24rem] text-[1rem] leading-[1.65] text-ink/72">
                Two minutes, and someone from Rawdah will be in touch when the details are out. Registering doesn’t reserve a place or commit you to anything.
              </p>
            </div>
            <div className="glass rounded-[1.75rem] p-5 sm:p-8 lg:col-span-7 lg:col-start-6">
              <RegisterForm defaultJourney="umrah" page={`/trips/${j.slug}`} />
            </div>
          </div>
        </section>
      </Chapter>
    </>
  );
}
