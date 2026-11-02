import Image from "next/image";
import Link from "next/link";

import { anchors, say, type Journey } from "@/app/_site/content";
import { RegisterForm } from "@/app/_site/register-form";
import { Actions, Chapter, gutter, Heading } from "@/app/_site/shell";

/**
 * "1448 · Ramadan · Coming soon": the poster Rawdah and GGC shared, shown as it is, in its own green
 * (Ayuub, 2 Nov 2026: post it as is, not redrawn). public/images/brand/ramadan-1448-poster.jpg, 1080 × 700.
 */
const POSTER = "/images/brand/ramadan-1448-poster.jpg";
const posterAlt = "Rawdah Tours and GGC: Ramadan 1448, coming soon.";

export function RamadanLockup({ className = "", compact = false }: { j?: Journey; className?: string; compact?: boolean }) {
  if (compact) {
    // Fills a photo frame (the trip cards): the whole poster, on its own green so nothing is cut off.
    return (
      <div className={`absolute inset-0 bg-[#323932] ${className}`}>
        <Image src={POSTER} alt={posterAlt} fill sizes="(min-width: 1024px) 19rem, 100vw" className="object-contain" />
      </div>
    );
  }
  return (
    <div className={`relative aspect-[1080/700] overflow-hidden rounded-[2rem] bg-[#323932] shadow-[var(--shadow-soft)] ${className}`}>
      <Image src={POSTER} alt={posterAlt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
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
