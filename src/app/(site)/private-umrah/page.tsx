import type { Metadata } from "next";
import { Suspense } from "react";

import { faqs, privatePage } from "@/app/_site/content";
import { Builder } from "@/app/_site/builder";
import { FaqList } from "@/app/_site/home-sections";
import { Mark } from "@/app/_site/marks";
import { gutter, Heading, PageLead, Square } from "@/app/_site/shell";

export const metadata: Metadata = {
  title: "Private & family Umrah",
  description: "Plan a private or family Umrah on your own dates with Rawdah Tours and see a rough cost straight away.",
};

/** Private Umrah: a short opening, the planner, then what happens next and questions. */
export default function PrivatePage() {
  const qs = faqs.filter((f) => ["Are your trips suitable for families with children?", "Do I need a visa to travel with you?", "Is my trip ATOL protected?"].includes(f.q));
  return (
    <>
      <PageLead
        label={
          <>
            {privatePage.label}
            <Mark s="to confirm" />
          </>
        }
        title={privatePage.headline}
        photos={[privatePage.photo, { src: "/images/trips/two-at-nabawi-night.jpg", alt: "Two travellers at Masjid an-Nabawi at night.", position: "object-[50%_45%]" }, { src: "/images/trips/rawdah-vest-palms.jpg", alt: "A member of the Rawdah team among date palms.", position: "object-[30%_50%]" }]}
      >
        <p className="mt-5 max-w-[36rem] text-[1.02rem] leading-[1.7] text-canvas/80">{privatePage.text}</p>
      </PageLead>

      <section className={`bg-canvas pt-[clamp(2.5rem,5vw,4rem)] ${gutter}`}>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          {privatePage.points.map((r) => (
            <li key={r.title} className="rounded-[3px] bg-canvas-warm p-4">
              <p className="flex items-start gap-2.5 text-[0.98rem] font-medium">
                <Square className="mt-[0.5em] bg-gold" />
                <span>
                  {r.title}
                  <Mark s={r.status} />
                </span>
              </p>
              <p className="mt-1 pl-[1.1rem] text-[0.88rem] text-ink/65">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="planner" className={`scroll-mt-28 bg-canvas py-[clamp(3rem,6vw,5rem)] ${gutter}`}>
        <Heading className="mb-8 text-[clamp(2.3rem,4vw,3.8rem)]">Plan your Umrah</Heading>
        <Suspense fallback={<p className="text-ink/60">Loading the planner…</p>}>
          <Builder />
        </Suspense>
      </section>

      <section className={`bg-canvas-warm py-[clamp(3.5rem,7vw,6rem)] ${gutter}`}>
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading className="text-[clamp(2rem,3.2vw,2.8rem)]">After you send it</Heading>
            <ol className="mt-6">
              {[
                ["We read your plan", "And message you back on WhatsApp or email."],
                ["We send real options", "Hotels, flights and a price for your dates."],
                ["A deposit holds it", "Then the rest in instalments before you fly."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-ink/15 py-4">
                  <span className="display grid size-11 place-items-center bg-ink text-[1.4rem] text-gold-soft">{i + 1}</span>
                  <span>
                    <span className="block text-[1rem] font-medium">
                      {t}
                      <Mark s={i === 0 ? "draft" : "proposed"} />
                    </span>
                    <span className="block text-[0.9rem] text-ink/65">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Heading className="text-[clamp(2rem,3.2vw,2.8rem)]">Questions</Heading>
            <div className="mt-6">
              <FaqList items={qs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
