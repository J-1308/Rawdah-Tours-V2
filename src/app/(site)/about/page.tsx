import type { Metadata } from "next";

import { about, brand, routes, say } from "@/app/_site/content";
import { Meaning, People } from "@/app/_site/home-sections";
import { Mark } from "@/app/_site/marks";
import { Actions, gutter, Heading, PageLead, Square } from "@/app/_site/shell";

export const metadata: Metadata = {
  title: "About us",
  description: "Rawdah Tours: guided Umrah from the UK with students of knowledge, and a group preparing for Hajj 2027.",
};

/** About: the story, what Rawdah means, what we hold to, the people, and the company and how to reach us. */
export default function AboutPage() {
  return (
    <>
      <PageLead
        label={about.label}
        title={about.headline}
        photos={[
          { src: "/images/trips/five-at-islamic-university.jpg", alt: "Five Rawdah travellers at the gate of the Islamic University of Madinah at sunset.", position: "object-[50%_55%]" },
          { src: "/images/trips/group-nabawi-roof.jpg", alt: "The group on the roof of Masjid an-Nabawi at golden hour.", position: "object-[50%_62%]" },
          { src: "/images/trips/two-in-ihram-arrival.jpg", alt: "Two travellers in ihram, smiling, suitcases behind them.", position: "object-[50%_35%]" },
        ]}
      />

      <section className={`bg-canvas py-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
          <figure className="lg:col-span-5">
            <span aria-hidden className="display block h-[0.55em] text-[5rem] leading-[0.9] text-gold">
              “
            </span>
            <blockquote className="display text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.15]">{about.quote.value}”</blockquote>
            <figcaption className="mt-4 text-[0.86rem] text-ink/60">
              From Rawdah’s first website
              <Mark s={about.quote.status} />
            </figcaption>
          </figure>
          <div className="grid content-start gap-5 lg:col-span-6 lg:col-start-7">
            {about.story.map((p) => (
              <p key={p.text.slice(0, 24)} className="text-[1.05rem] leading-[1.75] text-ink/80">
                {p.text}
                <Mark s={p.status} />
              </p>
            ))}
          </div>
        </div>
      </section>

      <Meaning />

      <section className={`bg-canvas py-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
        <Heading className="text-[clamp(2.2rem,3.8vw,3.4rem)]">What we hold to</Heading>
        <ul className="mt-8 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v) => (
            <li key={v.title} className="rounded-[3px] bg-canvas-warm p-5">
              <Square className="size-[9px] bg-gold" />
              <p className="display mt-6 text-[1.7rem] leading-tight">
                {v.title}
                <Mark s={v.status} />
              </p>
              <p className="mt-1.5 text-[0.92rem] text-ink/68">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <People link={false} />

      <section id="contact" className={`scroll-mt-28 bg-canvas py-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
        <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Heading className="text-[clamp(2.2rem,3.8vw,3.4rem)]">Get in touch</Heading>
            <p className="mt-4 max-w-[30rem] text-[1rem] leading-[1.65] text-ink/72">WhatsApp is the quickest way to reach us. Registration of interest is open for Hajj 2027, and the next Umrah is being planned.</p>
            <Actions primary={{ label: "Register for Hajj 2027", href: `${routes.hajj}#register-interest` }} waText={say.general} tone="canvas" className="mt-7" />
            <dl className="mt-8 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {[
                ["Phone and WhatsApp", <a key="p" href={brand.phone.href} className="underline decoration-ink/25 underline-offset-4">{brand.phone.display}</a>],
                ["Email", <a key="e" href={`mailto:${brand.email}`} className="break-all underline decoration-ink/25 underline-offset-4">{brand.email}</a>],
                ["Instagram", <a key="i" href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25 underline-offset-4">{brand.instagram.handle}</a>],
                ["Based in", "Birmingham"],
              ].map(([k, val]) => (
                <div key={String(k)} className="rounded-[3px] bg-canvas-warm p-4">
                  <dt className="text-[0.8rem] text-ink/55">{k}</dt>
                  <dd className="mt-1 text-[0.98rem]">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="flex items-center gap-2.5 text-[0.86rem] font-medium text-bronze">
              <Square />
              The company
            </p>
            <dl className="mt-4 border-t-2 border-ink text-[0.94rem]">
              {[
                ["Registered name", brand.legalName],
                ["Registered in", "England and Wales"],
                ["Registered office", brand.address],
              ].map(([k, val]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-ink/15 py-3">
                  <dt className="text-ink/55">{k}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[9rem_1fr] gap-4 border-b border-ink/15 py-3">
                <dt className="text-ink/55">Company number</dt>
                <dd>
                  {brand.companyNumber.value}
                  <Mark s={brand.companyNumber.status} />
                </dd>
              </div>
              <div className="grid grid-cols-[9rem_1fr] gap-4 border-b border-ink/15 py-3">
                <dt className="text-ink/55">Protection</dt>
                <dd>
                  ATOL 5311 through Polani Travel Ltd, for the 2026 trips
                  <Mark s="to confirm" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
