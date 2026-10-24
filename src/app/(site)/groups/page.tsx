import type { Metadata } from "next";
import Image from "next/image";

import { gbp, groupsPage } from "@/app/_site/content";
import { CommunityForm } from "@/app/_site/community-form";
import { Mark } from "@/app/_site/marks";
import { gutter, Heading, PageLead, Square } from "@/app/_site/shell";

export const metadata: Metadata = {
  title: "Masjids & groups",
  description: "Umrah trips arranged by Rawdah Tours for masjids, study circles, youth groups and Islamic societies.",
};

/** Masjids & groups: who it's for, what they get, the steps, an example trip page and the first message. */
export default function GroupsPage() {
  return (
    <>
      <PageLead
        label={groupsPage.label}
        title={groupsPage.headline}
        photos={[groupsPage.photo, { src: "/images/trips/group-quba-mosque.jpg", alt: "A Rawdah group outside Masjid Quba.", position: "object-[50%_80%]" }, { src: "/images/trips/five-at-islamic-university.jpg", alt: "Five Rawdah travellers at the Islamic University of Madinah.", position: "object-[50%_55%]" }]}
      >
        <p className="mt-5 max-w-[36rem] text-[1.02rem] leading-[1.7] text-canvas/80">
          {groupsPage.text}
          <Mark s="to confirm" />
        </p>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {groupsPage.who.map((w) => (
            <li key={w} className="rounded-[2px] bg-clay px-2.5 py-1.5 text-[0.82rem] text-canvas/90">
              {w}
            </li>
          ))}
        </ul>
      </PageLead>

      <section className={`bg-canvas py-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
        <Heading className="text-[clamp(2.3rem,4vw,3.8rem)]">What your group gets</Heading>
        <ul className="mt-9 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {groupsPage.offers.map((g) => (
            <li key={g.title} className="rounded-[3px] bg-canvas-warm p-5">
              <p className="flex items-start gap-2.5 text-[1.02rem] font-medium">
                <Square className="mt-[0.5em] bg-gold" />
                <span>
                  {g.title}
                  <Mark s={g.status} />
                </span>
              </p>
              <p className="mt-1.5 pl-[1.1rem] text-[0.9rem] leading-[1.55] text-ink/68">{g.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`bg-ink py-[clamp(3.5rem,7vw,6rem)] text-canvas [&_.site-mark]:border-gold-soft/60 [&_.site-mark]:text-gold-soft ${gutter}`}>
        <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading className="text-[clamp(2.1rem,3.4vw,3.1rem)]">How it comes together</Heading>
            <ol className="mt-6">
              {groupsPage.steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-canvas/15 py-4">
                  <span className="display grid size-11 place-items-center bg-gold-soft text-[1.4rem] text-ink-deep">{i + 1}</span>
                  <span>
                    <span className="block text-[1rem] font-medium">{s.title}</span>
                    <span className="block text-[0.9rem] text-canvas/70">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="flex items-center gap-2.5 text-[0.86rem] font-medium text-gold-soft">
              <Square className="bg-gold-soft" />
              An example of your group’s trip page
              <Mark s="sample" />
            </p>
            <div className="mt-5 overflow-hidden rounded-[3px] bg-canvas text-ink shadow-[8px_8px_0_var(--color-gold-soft)]">
              <div className="relative aspect-[16/8] bg-ink-deep">
                <Image src="/images/trips/group-quba-mosque.jpg" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_80%]" />
              </div>
              <div className="p-5">
                <p className="display text-[1.9rem]">Your Masjid’s Umrah, spring 2027</p>
                <p className="mt-2 text-[0.92rem] text-ink/70">“Salaam everyone, we’d love you to join us. Our imam will teach each evening in Madinah and Makkah.”</p>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-ink/15 pt-4">
                  <p className="text-[0.86rem] text-ink/65">
                    10 nights, from {gbp(1799)} per person, {gbp(500)} deposit
                  </p>
                  <span className="rounded-[3px] bg-ink px-4 py-2.5 text-[0.86rem] font-medium text-canvas">Book your place</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="start" className={`scroll-mt-28 bg-canvas-warm py-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
        <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading className="text-[clamp(2.3rem,4vw,3.6rem)]">Your group, in a few lines</Heading>
            <p className="mt-5 max-w-[26rem] text-[1rem] leading-[1.65] text-ink/72">A minute of questions, sent to us on WhatsApp. We’ll get back to you to talk it through, with no obligation.</p>
            <div className="mt-8 border-t-2 border-ink">
              {groupsPage.questions.map((f) => (
                <details key={f.q} className="group border-b border-ink/15">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4">
                    <span className="text-[0.98rem] font-medium">
                      {f.q}
                      <Mark s={f.status} />
                    </span>
                    <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[2px] border border-ink/30 text-[0.85rem] leading-none group-open:bg-ink group-open:text-canvas">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="pb-4 text-[0.93rem] leading-[1.65] text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="rounded-[3px] bg-canvas p-5 sm:p-8 lg:col-span-6 lg:col-start-7">
            <CommunityForm />
          </div>
        </div>
      </section>
    </>
  );
}
