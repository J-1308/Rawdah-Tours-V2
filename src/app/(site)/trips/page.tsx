import type { Metadata } from "next";

import { journeys, routes, say } from "@/app/_site/content";
import { LastTrip } from "@/app/_site/home-sections";
import { Actions, gutter, Heading, Label } from "@/app/_site/shell";
import { TripRow } from "@/app/_site/trip-row";

export const metadata: Metadata = {
  title: "Trips",
  description: "Hajj 2027, the next group Umrah, and the trips Rawdah Tours has already run.",
};

/** Every trip: what's open or coming, the last one as proof, and a way in for other dates. */
export default function TripsPage() {
  const upcoming = journeys.filter((j) => j.state !== "past");
  const past = journeys.filter((j) => j.state === "past");
  return (
    <>
      <section className={`bg-canvas pt-[clamp(3rem,7vw,6rem)] ${gutter}`}>
        <Label>Trips</Label>
        <Heading as="h1" className="mt-4 max-w-[60rem] text-[clamp(2.9rem,6vw,5.6rem)]">
          Hajj and Umrah, guided from the UK.
        </Heading>
        <p className="mt-6 max-w-[40rem] text-[1.05rem] leading-[1.7] text-ink/75">
          Teachers with every group, five-star hotels by the Haram, and a group leader from your first message to the flight home.
        </p>
      </section>

      <section className={`bg-canvas pt-12 pb-[clamp(3rem,6vw,5rem)] ${gutter}`}>
        <Heading className="text-[clamp(1.9rem,3vw,2.6rem)]">Open now and coming soon</Heading>
        <div className="mt-7 grid gap-5">
          {upcoming.map((j) => (
            <TripRow key={j.slug} j={j} />
          ))}
        </div>
        <div className="glass mt-10 grid grid-cols-1 gap-6 rounded-[2rem] p-6 sm:p-9 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="display text-[2rem]">Can’t make these dates?</p>
            <p className="mt-2 max-w-[36rem] text-[0.98rem] text-ink/70">Plan a private Umrah on your own dates, or bring your masjid or circle on a trip of its own.</p>
          </div>
          <Actions primary={{ label: "Plan a private Umrah", href: routes.private }} waText={say.private} tone="canvas" className="lg:col-span-5 lg:justify-end" />
        </div>
      </section>

      <section className={`bg-canvas pb-[clamp(3rem,6vw,5rem)] ${gutter}`}>
        <Heading className="text-[clamp(1.9rem,3vw,2.6rem)]">Completed</Heading>
        <div className="mt-7 grid gap-5">
          {past.map((j) => (
            <TripRow key={j.slug} j={j} />
          ))}
        </div>
      </section>

      <LastTrip />
    </>
  );
}
