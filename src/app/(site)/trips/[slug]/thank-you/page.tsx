import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { gbp, journey, wa } from "@/app/_site/content";
import { Mist } from "@/app/_site/poster-parts";
import { Chapter, gutter } from "@/app/_site/shell";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";
import { getTrip } from "@/lib/trips";

/**
 * After a booking request (Jibril, 19 Nov 2026; the best trip sites send people to a page of their own): the request
 * is in, its reference, what happens next and a WhatsApp button. Only the reference (and whether a copy was emailed)
 * travels in the address, never a name or contact detail. Not indexed.
 */
export const metadata: Metadata = { title: "Thank you · Rawdah Tours", robots: { index: false, follow: false } };

export default async function ThankYouPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ ref?: string; e?: string }> }) {
  const { slug } = await params;
  const j = journey(slug);
  const trip = j?.bookingSlug ? getTrip(j.bookingSlug) : undefined;
  if (!j || !trip?.pricing) notFound();
  const { ref: raw, e } = await searchParams;
  const ref = raw && /^RT-[A-Z2-9]{6}$/.test(raw) ? raw : null;
  const emailed = e === "1";
  const deposit = gbp(trip.pricing.depositPence / 100);
  const steps = [
    "We’ll message or call you to confirm your place and answer any questions.",
    emailed
      ? `Pay your ${deposit} deposit per person by bank transfer${ref ? `, with ${ref} as the reference` : ""}. The bank details are in your email.`
      : `Pay your ${deposit} deposit per person by bank transfer. We’ll send you the bank details on WhatsApp.`,
    "Pay the rest on the dates we give you, all before you fly.",
  ];

  return (
    <div className="skin-1448">
      <Chapter tone="day">
      <section className={`poster-hero relative overflow-hidden pt-6 pb-[clamp(3rem,8vw,6rem)] ${gutter}`}>
        <Mist />
        <div className="relative mx-auto max-w-[36rem] text-center">
          <Image src="/images/brand/ramadan-1448-art-cut.png" alt="" width={830} height={622} priority sizes="(min-width: 640px) 26rem, 80vw" className="mx-auto w-[min(80%,26rem)]" />
          <p className="poster-date mt-2">Booking request received</p>
          <h1 className="display mt-3 text-[clamp(2.2rem,7vw,3.4rem)] leading-[1.08]">Thank you. Your booking request is in.</h1>
          <p className="mx-auto mt-4 max-w-[30rem] text-[1.05rem] leading-relaxed text-ink/75">
            Your request for {j.name} is with the Rawdah Tours team.{emailed ? " We’ve emailed you a copy, with how to pay your deposit." : ""}
          </p>
          {ref ? (
            <div className="mx-auto mt-7 inline-grid justify-items-center rounded-[1.1rem] bg-[#545234] px-7 py-4 text-[#f1eee6]">
              <span className="text-[0.875rem] tracking-[0.14em] uppercase opacity-80">Your reference</span>
              <span className="ty-ref mt-1">{ref}</span>
            </div>
          ) : null}
        </div>

        <div className="relative mx-auto mt-10 max-w-[32rem] text-left lg:mt-0">
          <p className="font-editorial text-[1.25rem] text-bronze italic">What happens next</p>
          <ol className="booking-steps mx-auto mt-4">
            {steps.map((t, i) => (
              <li key={t}>
                <span aria-hidden className="booking-num">{i + 1}</span>
                <p className="pt-1.5 text-[0.98rem] leading-snug text-ink/80">{t}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-2.5">
            <a
              href={wa(`Assalamu alaykum, I’ve just sent a booking request for ${j.name}.${ref ? ` My reference is ${ref}.` : ""}`, j.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.95rem] bg-wa px-5 text-[0.98rem] font-medium text-white"
            >
              <WaGlyph className="size-5" /> Message us on WhatsApp
            </a>
            <Link href={`/trips/${j.slug}`} className="flex min-h-[3rem] items-center justify-center gap-2 rounded-[0.95rem] border border-(--edge) bg-(--raise) text-[0.95rem]">
              Back to {j.name} <Chevron className="size-3 opacity-60" />
            </Link>
          </div>
        </div>
      </section>
      </Chapter>
    </div>
  );
}
