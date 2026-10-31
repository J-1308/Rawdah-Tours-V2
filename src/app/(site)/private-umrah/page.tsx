import type { Metadata } from "next";
import { Suspense } from "react";

import { faqs, privatePage } from "@/app/_site/content";
import { Builder } from "@/app/_site/builder";
import { FaqList, Tick } from "@/app/_site/home-sections";
import { Mark } from "@/app/_site/marks";
import { Chapter, Heading, PageLead, Square, gutter } from "@/app/_site/shell";

export const metadata: Metadata = {
  title: "Private & family Umrah",
  description: "Plan a private or family Umrah on your own dates with Rawdah Tours, and we come back with real options.",
};

/** Private Umrah: a short opening, the planner, then what happens next and questions. */
export default function PrivatePage() {
  const qs = faqs.filter((f) => ["Are your trips suitable for families with children?", "Do I need a visa to travel with you?"].includes(f.q));
  return (
    <>
      <Chapter tone="top">
      <PageLead
        label={
          <>
            {privatePage.label}
          </>
        }
        title={privatePage.headline}
        photos={[privatePage.photo, { src: "/images/friends/friends-04.jpg", alt: "Two young travellers in ihram at night.", position: "object-[50%_35%]" }, { src: "/images/team/team-03.jpg", alt: "Brother Ayuub, our group leader, among date palms.", position: "object-[30%_50%]" }]}
      >
        <p className="mt-5 max-w-[36rem] text-[1.04rem] leading-[1.75] text-ink/70">{privatePage.text}</p>
      </PageLead>

      </Chapter>

      <Chapter tone="day">
      <section className={`pt-[clamp(2.5rem,5vw,4rem)] ${gutter}`}>
        <ul className="glass-phone grid grid-cols-1 rounded-[1.5rem] px-5 py-1 sm:grid-cols-2 sm:gap-4 sm:p-0 lg:grid-cols-4">
          {privatePage.points.map((r, i) => (
            <li key={r.title} className={`glass-wide flex gap-3 py-4 sm:block sm:rounded-[1.5rem] sm:p-5 ${i ? "border-t border-ink/8" : ""}`}>
              <Tick className="mt-[0.2em] sm:hidden" />
              <span className="block">
                <span className="flex items-start gap-2.5 text-[0.98rem] font-medium">
                  <span className="hidden sm:flex"><Square className="mt-[0.5em] bg-gold" /></span>
                  <span>
                    {r.title}
                    <Mark s={r.status} />
                  </span>
                </span>
                <span className="mt-1 block text-[0.88rem] text-ink/70 sm:pl-[1.1rem]">{r.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="planner" className={`scroll-mt-28 bg-canvas py-[clamp(3rem,6vw,5rem)] ${gutter}`}>
        <Heading className="mb-6 text-[clamp(2.3rem,4vw,3.8rem)] sm:mb-8">Plan your Umrah</Heading>
        <Suspense fallback={<p className="text-ink/68">Loading the planner…</p>}>
          <Builder />
        </Suspense>
      </section>

      <section className={`wash-linen py-[clamp(3.75rem,10vw,9rem)] ${gutter}`}>
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading className="text-[clamp(2rem,3.2vw,2.8rem)]">After you send it</Heading>
            <ol className="mt-6">
              {[
                ["We read your plan", "And message you back on WhatsApp or email."],
                ["We send real options", "Hotels, flights and a price for your dates."],
                ["A deposit holds it", "Then the rest in instalments before you fly."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2.75rem_1fr] items-center gap-4 border-t border-ink/8 py-4 first:border-0">
                  <span className="display grid size-11 place-items-center rounded-full bg-(--raise) text-[1.4rem] text-bronze shadow-[var(--shadow-lift)]">{i + 1}</span>
                  <span>
                    <span className="block text-[1rem] font-medium">
                      {t}
                      <Mark s={i === 0 ? "draft" : "proposed"} />
                    </span>
                    <span className="block text-[0.9rem] text-ink/70">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Heading className="text-[clamp(2rem,3.2vw,2.8rem)]">Questions</Heading>
            <div className="glass mt-6 rounded-[1.5rem] px-5 py-1">
              <FaqList items={qs} />
            </div>
          </div>
        </div>
      </section>
      </Chapter>
    </>
  );
}
