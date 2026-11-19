"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { anchors, brand, gbp, monthly, routes, wa, type Journey } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { prefillForm, SHARING } from "@/app/_site/step-form";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

/**
 * The join panel on a trip page. Three shapes:
 * - Hajj (no rooms): register interest, by WhatsApp or the form below.
 * - An Umrah with rooms: pick a room, flights or land only, who's coming and
 *   who you'd share with; the total, deposit and instalments update live.
 *   When the trip takes online deposits (`bookable`), the main button goes to
 *   the card or bank-transfer checkout; WhatsApp sits beside it either way.
 * - A completed trip: hear about the next one.
 */

const box = "glass overflow-hidden rounded-[1.75rem]";
const head = "flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-ink/8 bg-(--raise) px-5 py-4 sm:px-6";
const waBtn = "flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.95rem] bg-wa px-4 text-[0.95rem] font-medium text-white shadow-[0_14px_30px_-16px_rgb(31_168_85/0.7)]";
const waCell = "grid place-items-center";

export function ReservePanel({ j, bookable = false }: { j: Journey; bookable?: boolean }) {
  const rooms = j.rooms?.value ?? [];
  const [room, setRoom] = useState(rooms[0]?.type ?? "");
  const [flights, setFlights] = useState(true);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const shareOptions = SHARING;
  const [share, setShare] = useState(shareOptions[0]);
  // Once someone has changed the panel, the form below follows it (not only on "Book your place").
  const touched = useRef(false);
  const picked = rooms.find((r) => r.type === room) ?? rooms[0];
  const choice = picked ? { Package: `${picked.type}, ${gbp(picked.price)} per person`, Travellers: adults + children >= 5 ? "5 or more" : String(adults + children), Sharing: share } : null;
  const choiceKey = JSON.stringify(choice);
  useEffect(() => {
    if (!touched.current) {
      touched.current = true;
      return;
    }
    if (choice && j.state === "open") prefillForm(choice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceKey]);

  if (j.state === "past") {
    return (
      <div className={box}>
        <div className={head}>
          <span className="font-editorial text-[1.15rem] italic text-bronze">Completed</span>
          <span className="text-[0.875rem] text-ink/65">{j.dates.value}</span>
        </div>
        <div className="p-5">
          <p className="display text-[1.9rem]">This trip is complete.</p>
          <p className="mt-2 text-[0.93rem] text-ink/70">Be the first to hear when the next one is out.</p>
          <a href={wa(j.waText, j.name)} target="_blank" rel="noopener noreferrer" className={`mt-5 ${waBtn}`}>
            <span aria-hidden className={waCell}>
              <WaGlyph className="size-5" />
            </span>
            <span>Tell me about the next trip</span>
          </a>
          <Link href={`${routes.nextUmrah}#${anchors.form}`} className="mt-3 block text-center text-[0.875rem] text-ink/70 underline decoration-ink/25 underline-offset-4">
            Or register for Ramadan 1448
          </Link>
        </div>
      </div>
    );
  }

  if (!rooms.length) {
    const message = [`Salaam Rawdah Tours, I’d like to register my interest in ${j.name}.`, "Travellers:", "Travelling from:", "Name:"].join("\n");
    return (
      <div className={box}>
        <div className={head}>
          <span className="font-editorial text-[1.15rem] italic text-bronze">Register your interest</span>
          <span className="text-[0.875rem] text-ink/65">{j.name}</span>
        </div>
        <div className="p-5">
          <p className="display text-[1.8rem]">Start with a message.</p>
          <p className="mt-2 text-[0.93rem] text-ink/70">Tell us about your plans and someone from Rawdah will be in touch. It doesn’t reserve a place or commit you to anything.</p>
          <a href={wa(message)} target="_blank" rel="noopener noreferrer" className={`mt-5 ${waBtn}`}>
            <span aria-hidden className={waCell}>
              <WaGlyph className="size-5" />
            </span>
            <span>Register on WhatsApp</span>
          </a>
          <a href={`#${anchors.form}`} className="mt-2 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.95rem] border border-ink/15 bg-(--raise) text-[0.95rem] font-medium hover:border-ink/40">
            <span>Or use the form</span>
            <Chevron dir="down" className="size-3 opacity-60" />
          </a>
          {j.kind === "hajj" ? (
            <p className="mt-4 text-[0.875rem] leading-relaxed text-ink/68">
              Hajj packages are booked and paid on{" "}
              <a href={brand.nusuk} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Nusuk
              </a>
              . Rawdah Tours does not take payment for Hajj packages.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const chosen = rooms.find((r) => r.type === room) ?? rooms[0];
  /** Packages with a set payment timetable (the Ramadan trip): one price per person, no child rate. */
  const packages = rooms.some((r) => r.schedule);
  const kids = packages ? 0 : children;
  const landGap = j.landOnly ? rooms[0].price - j.landOnly.value : 0;
  const each = flights ? chosen.price : chosen.price - landGap;
  const childEach = Math.round(each * 0.85);
  const total = each * adults + childEach * kids;
  const deposit = (j.deposit?.value ?? 0) * (adults + kids);
  const open = j.state === "open";
  const confirmedPrices = j.rooms?.status === "confirmed";
  /**
   * Packages in a grid (Ramadan, 19 Nov 2026): with flights or ground only, then the room (quad, triple, double).
   * Ground only is an enquiry, as on the poster.
   */
  const matrix = packages && rooms.some((r) => r.flights === false) && new Set(rooms.map((r) => r.sharing)).size > 1;
  const roomName = (n: number) => ({ 4: "Quad", 3: "Triple", 2: "Double" })[n] ?? `${n} sharing`;
  const pick = (f: boolean, n: number) => rooms.find((r) => (r.flights !== false) === f && r.sharing === n);
  /** An ended offer (Ramadan early bird): its price, crossed out, above each of today's prices. */
  const off = j.endedOffer?.off ?? 0;
  const ground = chosen.flights === false;
  const verb = matrix && ground ? "enquire about" : open ? "book" : "register interest in";

  const message = [
    `Salaam Rawdah Tours, I’d like to ${verb} ${j.name} (${j.dates.value}).`,
    packages ? `Package: ${chosen.type} (${chosen.note ?? chosen.sub})` : `Room: ${chosen.type} (${chosen.sharing} sharing)`,
    ...(j.landOnly ? [`Flights: ${flights ? "with flights from London" : "land only"}`] : []),
    packages ? `Travellers: ${adults}` : `Travelling: ${adults} adult${adults === 1 ? "" : "s"}${kids ? `, ${kids} child${kids === 1 ? "" : "ren"}` : ""}`,
    `Sharing with: ${share}`,
    `${packages ? "Total" : "Estimated total"}: ${gbp(total)}${deposit ? `, deposit ${gbp(deposit)}` : ""}${!packages && j.months && deposit ? `, then ${j.months.value} × ${gbp(monthly(total, deposit, j.months.value))}` : ""}`,
    "Name:",
  ].join("\n");

  const counter = (label: string, note: string, value: number, set: (n: number) => void, min: number) => (
    <div className="flex items-center justify-between py-2.5">
      <span>
        <span className="block text-[0.93rem] font-medium">{label}</span>
        <span className="block text-[0.875rem] text-ink/65">{note}</span>
      </span>
      <span className="flex items-center">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(Math.max(min, value - 1))} className="grid size-11 place-items-center rounded-l-[0.8rem] border border-ink/15 bg-(--raise) text-[1.1rem] disabled:opacity-30 sm:size-9 sm:text-base" disabled={value <= min}>
          −
        </button>
        <span className="grid h-11 w-11 place-items-center border-y border-ink/15 bg-(--raise) tabular-nums sm:h-9 sm:w-10" aria-live="polite">
          {value}
        </span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => set(Math.min(12, value + 1))} className="grid size-11 place-items-center rounded-r-[0.8rem] border border-ink/15 bg-(--raise) text-[1.1rem] sm:size-9 sm:text-base">
          +
        </button>
      </span>
    </div>
  );

  const label = "font-editorial text-[1.05rem] italic text-bronze";

  return (
    <div className={box}>
      <div className={head}>
        <span className="font-editorial text-[1.15rem] italic text-bronze">{open ? "Book your place" : "Register your interest"}</span>
        <span className="text-[0.875rem] text-ink/65">
          {j.dates.value}
          <Mark s={j.dates.status} />
        </span>
      </div>
      <div className="p-5">
        <p className={label}>
          {packages ? "Package, per person" : "Room, per person"}
          <Mark s={j.rooms?.status} />
        </p>
        {j.endedOffer ? (
          <p className="mt-1.5 text-[0.875rem] text-ink/62">
            {j.endedOffer.label} prices ({gbp(j.endedOffer.off)} off every package) have ended: they’re crossed out beside today’s prices.
          </p>
        ) : null}
        {matrix ? (
          <>
            <div className="mt-2.5 grid grid-cols-2 gap-1.5">
              {[true, false].map((f) => {
                const from = Math.min(...rooms.filter((r) => (r.flights !== false) === f).map((r) => r.price));
                const on = (chosen.flights !== false) === f;
                return (
                  <button
                    key={String(f)}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setRoom((pick(f, chosen.sharing) ?? pick(f, 4) ?? chosen).type)}
                    className={`rounded-[1rem] border px-3.5 py-3 text-left transition-colors ${on ? "border-ink bg-ink text-canvas shadow-[var(--shadow-lift)]" : "border-ink/10 bg-(--raise) hover:border-ink/35"}`}
                  >
                    <span className="block text-[0.93rem] font-medium">{f ? "With flights" : "Ground only"}</span>
                    <span className={`block text-[0.875rem] ${on ? "text-canvas/70" : "text-ink/65"}`}>{f ? "Saudia from Heathrow" : "Own flights · enquire"}</span>
                    {off ? <s className={`mt-1.5 block text-[0.875rem] ${on ? "text-canvas/55" : "text-ink/50"}`}>{gbp(from - off)}</s> : null}
                    <span className={`display block text-[1.35rem] leading-none ${off ? "mt-0.5" : "mt-1.5"}`}>from {gbp(from)}</span>
                  </button>
                );
              })}
            </div>
            <p className={`mt-4 ${label}`}>Room</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[4, 3, 2].map((n) => {
                const r = pick(chosen.flights !== false, n);
                if (!r) return null;
                const on = r.type === chosen.type;
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setRoom(r.type)}
                    className={`rounded-[1rem] border px-3 py-3 text-left transition-colors ${on ? "border-ink bg-ink text-canvas shadow-[var(--shadow-lift)]" : "border-ink/10 bg-(--raise) hover:border-ink/35"}`}
                  >
                    <span className="block text-[0.875rem] font-medium">{roomName(n)}</span>
                    <span className={`block text-[0.875rem] ${on ? "text-canvas/70" : "text-ink/65"}`}>{n} sharing</span>
                    {off ? <s className={`mt-1.5 block text-[0.875rem] ${on ? "text-canvas/55" : "text-ink/50"}`}>{gbp(r.price - off)}</s> : null}
                    <span className={`display block text-[1.35rem] leading-none ${off ? "mt-0.5" : "mt-1.5"}`}>{gbp(r.price)}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {rooms.map((r) => (
            <button
              key={r.type}
              type="button"
              aria-pressed={room === r.type}
              onClick={() => setRoom(r.type)}
              className={`rounded-[1rem] border px-3 py-3 text-left transition-colors ${room === r.type ? "border-ink bg-ink text-canvas shadow-[var(--shadow-lift)]" : "border-ink/10 bg-(--raise) hover:border-ink/35"}`}
            >
              <span className="block text-[0.875rem] font-medium">{r.type}</span>
              <span className={`block text-[0.875rem] ${room === r.type ? "text-canvas/70" : "text-ink/65"}`}>{r.sub ?? `${r.sharing} sharing`}</span>
              <span className="display mt-1.5 block text-[1.4rem] leading-none">{gbp(flights ? r.price : r.price - landGap)}</span>
            </button>
          ))}
        </div>
        )}

        {j.landOnly ? (
          <div className="mt-3 grid grid-cols-2 gap-1.5 text-[0.875rem]">
            {[true, false].map((f) => (
              <button key={String(f)} type="button" aria-pressed={flights === f} onClick={() => setFlights(f)} className={`rounded-[0.8rem] border py-2.5 font-medium transition-colors ${flights === f ? "border-ink bg-ink text-canvas" : "border-ink/10 bg-(--raise) text-ink/75"}`}>
                {f ? "With flights" : "Land only"}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
          {packages ? counter("Travellers", chosen.note ?? "Per person", adults, setAdults, 1) : counter("Adults", "12 and over", adults, setAdults, 1)}
          {packages ? null : counter("Children", "Under 12, sharing a room", children, setChildren, 0)}
        </div>

        <p className={`mt-4 ${label}`}>Sharing a room with</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[0.875rem]">
          {shareOptions.map((s) => (
            <button key={s} type="button" aria-pressed={share === s} onClick={() => setShare(s)} className={`min-h-11 rounded-[0.95rem] border px-3.5 transition-colors sm:px-3 ${share === s ? "border-ink bg-ink text-canvas" : "border-ink/10 bg-(--raise) hover:border-ink/35"}`}>
              {s}
            </button>
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-1.5 rounded-[1.1rem] bg-canvas-warm/80 p-4 text-[0.9rem]">
          <div className="flex justify-between">
            <dt className="text-ink/70">
              {adults} {packages ? `traveller${adults === 1 ? "" : "s"}` : `adult${adults === 1 ? "" : "s"}`}, {chosen.type.toLowerCase()}
            </dt>
            <dd>{gbp(each * adults)}</dd>
          </div>
          {kids ? (
            <div className="flex justify-between">
              <dt className="text-ink/70">
                {children} child{children === 1 ? "" : "ren"}
                <Mark s="proposed" />
              </dt>
              <dd>{gbp(childEach * children)}</dd>
            </div>
          ) : null}
          <div className="flex items-baseline justify-between border-t border-ink/15 pt-2">
            <dt className="font-medium">Total</dt>
            <dd className="display text-[1.6rem] leading-none">{gbp(total)}</dd>
          </div>
          {deposit ? (
            <div className="flex justify-between">
              <dt className="text-ink/70">
                Deposit
                <Mark s={j.deposit?.status} />
              </dt>
              <dd>{gbp(deposit)}</dd>
            </div>
          ) : null}
          {chosen.schedule
            ? chosen.schedule.slice(1).map((s) => (
                <div key={s.due} className="flex justify-between">
                  <dt className="text-ink/70">{s.due}</dt>
                  <dd>{gbp(s.amount * adults)}</dd>
                </div>
              ))
            : j.months && deposit ? (
                <div className="flex justify-between">
                  <dt className="text-ink/70">
                    Then {j.months.value} instalments of
                    <Mark s={j.months.status} />
                  </dt>
                  <dd>{gbp(monthly(total, deposit, j.months.value))}</dd>
                </div>
              ) : null}
        </dl>

        {bookable ? (
          <Link href={`/trips/${j.slug}/book`} className="btn-ink mt-4 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.95rem] text-[0.95rem] font-medium">
            Pay the deposit <Chevron className="size-3 opacity-70" />
          </Link>
        ) : null}
        {open && !bookable ? (
          // One way to book (Ramadan rework, 17 Nov 2026): the step form below, with these choices carried across, so
          // the details are saved from its first step. WhatsApp stays beside it.
          <a
            href={`#${anchors.form}`}
            onClick={() => {
              // The form lists packages as "Quad with flights, £1,999 per person" (see the trip page).
              if (choice) prefillForm(choice);
            }}
            className="btn-ink mt-4 flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[0.95rem] text-[0.95rem] font-medium"
          >
            {matrix && ground ? "Enquire about ground only" : "Book your place"} <Chevron dir="down" className="size-3 opacity-70" />
          </a>
        ) : null}
        <a href={wa(message)} target="_blank" rel="noopener noreferrer" className={`${bookable || open ? "mt-2" : "mt-4"} ${waBtn}`}>
          <span aria-hidden className={waCell}>
            <WaGlyph className="size-5" />
          </span>
          <span>{matrix && ground ? "Enquire on WhatsApp" : open ? "Book on WhatsApp" : "Register interest on WhatsApp"}</span>
        </a>
        {open ? (
          <p className="mt-3 text-center text-[0.9rem] text-ink/70">
            Prefer to talk?{" "}
            <a href={brand.phone.href} className="inline-flex min-h-11 items-center font-medium text-ink underline decoration-ink/25 underline-offset-4">
              Call {brand.phone.display}
            </a>
          </p>
        ) : null}
        {!open ? (
          <a href={`#${anchors.form}`} className="mt-3 block text-center text-[0.875rem] text-ink/70 underline decoration-ink/25 underline-offset-4">
            Or use the form
          </a>
        ) : null}
        <p className="mt-4 text-[0.875rem] leading-relaxed text-ink/68">
          {open && bookable
            ? "Pay the deposit online by card (a small card fee applies) or by bank transfer with no fee. Prefer to talk first? WhatsApp us."
            : open
              ? "Pay the deposit by bank transfer: the details are in your confirmation email, or we send them on WhatsApp. Deposits are non-refundable."
            : confirmedPrices
              ? "No payment now. Register and we’ll be in touch to book your place. Deposits are non-refundable."
              : "No payment now. Prices are a guide from our last trip; we’ll message you when the dates and prices are confirmed."}
        </p>
      </div>
    </div>
  );
}
