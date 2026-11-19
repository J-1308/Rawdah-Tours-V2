import Link from "next/link";

import { anchors, gbp, wa, type Journey } from "@/app/_site/content";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

/**
 * Phones, on a trip page: a bar that stays on screen with WhatsApp (naming the trip), the price per person and the
 * deposit when they're published, and the main action. "Book your place" only when the trip is open and payments are
 * set up (`bookable`), or while it is open and deposits go through WhatsApp (to the join panel); otherwise "Register interest". Desktop has the join panel instead.
 */
export function TripPhoneBar({ j, price, deposit, bookable }: { j: Journey; price?: number | null; deposit?: number | null; bookable: boolean }) {
  /** Same label as the page: an open trip says "Book your place" even while deposits are taken on WhatsApp (the join panel). */
  const action = bookable
    ? { label: "Book your place", href: `/trips/${j.slug}/book` }
    : j.state === "open"
      ? { label: "Book your place", href: `#${anchors.join}` }
      : { label: "Register interest", href: `#${anchors.form}` };
  return (
    <div data-placement="phone bar" data-trip={j.slug} className="top-zone motion-lift fixed inset-x-0 bottom-0 z-50 px-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className={`grid items-center gap-1.5 rounded-[1.15rem] border border-(--edge) bg-canvas p-1.5 shadow-[var(--shadow-float)] backdrop-blur-md ${price ? "grid-cols-[auto_1fr_auto]" : "grid-cols-[auto_1fr]"}`}>
        <a
          href={wa(j.waText, j.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about ${j.name} on WhatsApp`}
          className={`flex h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-(--raise) text-[0.92rem] font-medium text-ink ${price ? "w-12" : "px-4"}`}
        >
          <WaGlyph className="size-5 text-wa" />
          {price ? null : "WhatsApp"}
        </a>
        {price ? (
          <p className="min-w-0 px-1.5 leading-tight">
            <span className="block text-[0.875rem] text-ink/62">From, per person</span>
            <span className="block text-[1.05rem] font-medium text-ink">
              {j.endedOffer ? <s className="mr-1.5 text-[0.875rem] font-normal text-ink/50">{gbp(price - j.endedOffer.off)}</s> : null}
              {gbp(price)}
            </span>
            {deposit ? <span className="block truncate text-[0.875rem] text-ink/62">{gbp(deposit)} deposit</span> : null}
          </p>
        ) : null}
        <Link href={action.href} className="btn-ink flex h-12 items-center justify-center gap-2 rounded-[0.85rem] px-3.5 text-[0.92rem] font-medium whitespace-nowrap">
          {action.label}
          <Chevron className="size-3 opacity-70" />
        </Link>
      </div>
    </div>
  );
}
