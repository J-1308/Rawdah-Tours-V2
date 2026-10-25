import type { Metadata } from "next";
import Image from "next/image";

import { gbp, groupsPage } from "@/app/_site/content";
import { CommunityForm } from "@/app/_site/community-form";
import { Mark } from "@/app/_site/marks";
import { Emblem, gutter, Heading, Label, onInk, PageLead } from "@/app/_site/shell";

export const metadata: Metadata = {
  title: "Masjids & groups",
  description: "Umrah trips arranged by Rawdah Tours for masjids, study circles, youth groups and Islamic societies.",
};

const insetPad = "px-[max(calc(var(--hero-pad-x)*0.45),0.6rem)]";

/** Masjids & groups: who it's for, what they get, the steps, an example trip page and the first message. */
export default function GroupsPage() {
  return (
    <>
      <PageLead
        label={groupsPage.label}
        title={groupsPage.headline}
        photos={[
          groupsPage.photo,
          { src: "/images/trips/group-quba-mosque.jpg", alt: "A Rawdah group outside Masjid Quba.", position: "object-[50%_80%]" },
          { src: "/images/trips/five-at-islamic-university.jpg", alt: "Five Rawdah travellers at the Islamic University of Madinah.", position: "object-[50%_55%]" },
        ]}
      >
        <p className="mt-6 max-w-[34rem] text-[1.04rem] leading-[1.75] text-ink/70">
          {groupsPage.text}
          <Mark s="to confirm" />
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {groupsPage.who.map((w) => (
            <li key={w} className="rounded-full border border-ink/10 bg-white/[0.06] px-3.5 py-1.5 text-[0.84rem] text-ink/75">
              {w}
            </li>
          ))}
        </ul>
      </PageLead>

      <section className={`bg-canvas py-[clamp(3.25rem,9vw,8rem)] ${gutter}`}>
        <Heading className="text-[clamp(2.3rem,4.2vw,4rem)]">What your group gets</Heading>
        <ul className="glass-phone mt-8 grid grid-cols-1 rounded-[1.5rem] px-5 py-1 sm:mt-10 sm:grid-cols-2 sm:gap-4 sm:p-0 lg:grid-cols-3">
          {groupsPage.offers.map((g, i) => (
            <li key={g.title} className={`glass-wide py-5 sm:rounded-[1.5rem] sm:p-6 ${i ? "border-t border-ink/8" : ""}`}>
              <p className="display flex items-start gap-3 text-[1.45rem] leading-tight sm:block sm:text-[1.6rem]">
                <Emblem className="mt-[0.2em] h-[0.85em] shrink-0 text-gold sm:mt-0 sm:mb-4 sm:h-5" />
                <span>
                  {g.title}
                  <Mark s={g.status} />
                </span>
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-[1.6] text-ink/68 sm:mt-2">{g.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`bg-canvas ${insetPad}`}>
        <div className={`panel-dark relative overflow-hidden rounded-[2.5rem] px-[clamp(1.25rem,5vw,5rem)] py-[clamp(3rem,7vw,6rem)] ${onInk}`}>
          <Emblem className="pointer-events-none absolute top-[-10%] left-[-6%] h-[120%] text-cream/[0.045]" />
          <div className="relative grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Heading className="text-[clamp(2.2rem,3.6vw,3.4rem)] text-cream">How it comes together</Heading>
              <ol className="mt-7 grid gap-2">
                {groupsPage.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-[1.2rem] bg-white/[0.045] p-4 ring-1 ring-white/[0.06]">
                    <span className="display grid size-10 shrink-0 place-items-center rounded-full bg-sand/15 text-[1.35rem] text-sand">{i + 1}</span>
                    <span>
                      <span className="block text-[1rem] font-medium">{s.title}</span>
                      <span className="block text-[0.9rem] text-cream/62">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="font-editorial text-[1.15rem] text-sand italic">
                An example of your group’s trip page
                <Mark s="sample" />
              </p>
              <div className="mt-5 overflow-hidden rounded-[1.75rem] bg-canvas text-ink shadow-[var(--shadow-float)]">
                <div className="relative aspect-[16/8] bg-beige">
                  <Image src="/images/trips/group-quba-mosque.jpg" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_80%]" />
                </div>
                <div className="p-6">
                  <p className="display text-[2rem]">Your Masjid’s Umrah, spring 2027</p>
                  <p className="mt-2 font-editorial text-[1.1rem] text-ink/70 italic">“Salaam everyone, we’d love you to join us. Our imam will teach each evening in Madinah and Makkah.”</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-ink/8 pt-4">
                    <p className="text-[0.86rem] text-ink/68">
                      10 nights, from {gbp(1799)} per person, {gbp(500)} deposit
                    </p>
                    <span className="btn-ink rounded-[0.85rem] px-4 py-2.5 text-[0.86rem] font-medium">Book your place</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="start" className={`wash-linen scroll-mt-28 py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Label>Start here</Label>
            <Heading className="mt-4 text-[clamp(2.4rem,4vw,3.8rem)]">Your group, in a few lines</Heading>
            <p className="mt-5 max-w-[26rem] text-[1rem] leading-[1.7] text-ink/72">A minute of questions, sent to us on WhatsApp. We’ll get back to you to talk it through, with no obligation.</p>
            <div className="glass mt-8 rounded-[1.5rem] px-5 py-1">
              {groupsPage.questions.map((f, i) => (
                <details key={f.q} className={`group ${i ? "border-t border-ink/8" : ""}`}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4">
                    <span className="text-[0.98rem] font-medium">
                      {f.q}
                      <Mark s={f.status} />
                    </span>
                    <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[0.9rem] leading-none text-ink/70 shadow-[0_4px_12px_-6px_rgb(58_43_36/0.4)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-4 text-[0.93rem] leading-[1.65] text-ink/72">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="glass rounded-[1.75rem] p-5 sm:p-8 lg:col-span-6 lg:col-start-7">
            <CommunityForm />
          </div>
        </div>
      </section>
    </>
  );
}
