"use client";

import Link from "next/link";
import { useState } from "react";

import { anchors, brand, gbp, monthly, routes, wa, type Journey } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
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

const box = "rounded-[3px] border-2 border-ink bg-canvas shadow-[6px_6px_0_var(--color-gold-soft)]";
const head = "flex items-center justify-between gap-3 bg-ink px-5 py-3 text-canvas [&_.site-mark]:border-gold-soft/60 [&_.site-mark]:text-gold-soft";
const waBtn = "flex min-h-[3.25rem] items-stretch overflow-hidden rounded-[3px] bg-wa text-[0.95rem] font-medium text-white";
const waCell = "grid w-[3.25rem] shrink-0 place-items-center bg-black/12";

export function ReservePanel({ j, bookable = false }: { j: Journey; bookable?: boolean }) {
  const rooms = j.rooms?.value ?? [];
  const [room, setRoom] = useState(rooms[0]?.type ?? "");
  const [flights, setFlights] = useState(true);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const shareOptions = ["Anyone", "Brothers only", "Sisters only", "My family"];
  const [share, setShare] = useState(shareOptions[0]);

  if (j.state === "past") {
    return (
      <div className={box}>
        <div className={head}>
          <span className="text-[0.86rem] font-medium">Completed</span>
          <span className="text-[0.86rem] text-canvas/70">{j.dates.value}</span>
        </div>
        <div className="p-5">
          <p className="display text-[1.9rem]">This trip is complete.</p>
          <p className="mt-2 text-[0.93rem] text-ink/70">Be the first to hear when the next one is out.</p>
          <a href={wa(j.waText)} target="_blank" rel="noopener noreferrer" className={`mt-5 ${waBtn}`}>
            <span aria-hidden className={waCell}>
              <WaGlyph className="size-5" />
            </span>
            <span className="flex items-center px-4">Tell me about the next trip</span>
          </a>
          <Link href={`${routes.nextUmrah}#${anchors.form}`} className="mt-3 block text-center text-[0.86rem] text-ink/65 underline decoration-ink/25 underline-offset-4">
            Or register for the next Umrah
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
          <span className="text-[0.86rem] font-medium">Register your interest</span>
          <span className="text-[0.86rem] text-canvas/70">{j.name}</span>
        </div>
        <div className="p-5">
          <p className="display text-[1.8rem]">Start with a message.</p>
          <p className="mt-2 text-[0.93rem] text-ink/70">Tell us about your plans and someone from Rawdah will be in touch. It doesn’t reserve a place or commit you to anything.</p>
          <a href={wa(message)} target="_blank" rel="noopener noreferrer" className={`mt-5 ${waBtn}`}>
            <span aria-hidden className={waCell}>
              <WaGlyph className="size-5" />
            </span>
            <span className="flex items-center px-4">Register on WhatsApp</span>
          </a>
          <a href={`#${anchors.form}`} className="mt-1.5 flex min-h-[3.25rem] items-stretch justify-between overflow-hidden rounded-[3px] border border-ink/30 text-[0.95rem] font-medium hover:border-ink">
            <span className="flex items-center px-4">Or use the form</span>
            <span aria-hidden className="grid w-[3.25rem] place-items-center border-l border-ink/20">
              <Chevron dir="down" />
            </span>
          </a>
          {j.kind === "hajj" ? (
            <p className="mt-4 text-[0.78rem] leading-relaxed text-ink/60">
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
  const landGap = j.landOnly ? rooms[0].price - j.landOnly.value : 0;
  const each = flights ? chosen.price : chosen.price - landGap;
  const childEach = Math.round(each * 0.85);
  const total = each * adults + childEach * children;
  const deposit = (j.deposit?.value ?? 0) * (adults + children);
  const open = j.state === "open";

  const message = [
    `Salaam Rawdah Tours, I’d like to ${open ? "book" : "register interest in"} ${j.name} (${j.dates.value}).`,
    `Room: ${chosen.type} (${chosen.sharing} sharing)`,
    `Flights: ${flights ? "with flights from London" : "land only"}`,
    `Travelling: ${adults} adult${adults === 1 ? "" : "s"}${children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}`,
    `Sharing with: ${share}`,
    `Estimated total: ${gbp(total)}${deposit ? `, deposit ${gbp(deposit)}` : ""}${j.months && deposit ? `, then ${j.months.value} × ${gbp(monthly(total, deposit, j.months.value))}` : ""}`,
    "Name:",
  ].join("\n");

  const counter = (label: string, note: string, value: number, set: (n: number) => void, min: number) => (
    <div className="flex items-center justify-between py-2.5">
      <span>
        <span className="block text-[0.93rem] font-medium">{label}</span>
        <span className="block text-[0.76rem] text-ink/55">{note}</span>
      </span>
      <span className="flex items-center">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(Math.max(min, value - 1))} className="grid size-9 place-items-center rounded-l-[3px] border border-ink/25 disabled:opacity-30" disabled={value <= min}>
          −
        </button>
        <span className="grid h-9 w-10 place-items-center border-y border-ink/25 tabular-nums" aria-live="polite">
          {value}
        </span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => set(Math.min(12, value + 1))} className="grid size-9 place-items-center rounded-r-[3px] border border-ink/25">
          +
        </button>
      </span>
    </div>
  );

  const label = "text-[0.8rem] font-medium text-bronze";

  return (
    <div className={box}>
      <div className={head}>
        <span className="text-[0.86rem] font-medium">{open ? "Book your place" : "Register your interest"}</span>
        <span className="text-[0.86rem] text-canvas/75">
          {j.dates.value}
          <Mark s={j.dates.status} />
        </span>
      </div>
      <div className="p-5">
        <p className={label}>
          Room, per person
          <Mark s={j.rooms?.status} />
        </p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {rooms.map((r) => (
            <button
              key={r.type}
              type="button"
              aria-pressed={room === r.type}
              onClick={() => setRoom(r.type)}
              className={`rounded-[3px] border px-2 py-3 text-left transition-colors ${room === r.type ? "border-ink bg-ink text-canvas" : "border-ink/20 hover:border-ink/50"}`}
            >
              <span className="block text-[0.84rem] font-medium">{r.type}</span>
              <span className={`block text-[0.7rem] ${room === r.type ? "text-canvas/70" : "text-ink/55"}`}>{r.sharing} sharing</span>
              <span className="display mt-1.5 block text-[1.4rem] leading-none">{gbp(flights ? r.price : r.price - landGap)}</span>
            </button>
          ))}
        </div>

        {j.landOnly ? (
          <div className="mt-3 grid grid-cols-2 gap-1.5 text-[0.86rem]">
            {[true, false].map((f) => (
              <button key={String(f)} type="button" aria-pressed={flights === f} onClick={() => setFlights(f)} className={`rounded-[3px] border py-2.5 font-medium transition-colors ${flights === f ? "border-ink bg-ink text-canvas" : "border-ink/20 text-ink/75"}`}>
                {f ? "With flights" : "Land only"}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
          {counter("Adults", "12 and over", adults, setAdults, 1)}
          {counter("Children", "Under 12, sharing a room", children, setChildren, 0)}
        </div>

        <p className={`mt-4 ${label}`}>Sharing a room with</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[0.84rem]">
          {shareOptions.map((s) => (
            <button key={s} type="button" aria-pressed={share === s} onClick={() => setShare(s)} className={`rounded-[2px] border px-2.5 py-1.5 transition-colors ${share === s ? "border-ink bg-ink text-canvas" : "border-ink/20 hover:border-ink/50"}`}>
              {s}
            </button>
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-1.5 bg-canvas-warm p-4 text-[0.9rem]">
          <div className="flex justify-between">
            <dt className="text-ink/65">
              {adults} adult{adults === 1 ? "" : "s"}, {chosen.type.toLowerCase()}
            </dt>
            <dd>{gbp(each * adults)}</dd>
          </div>
          {children ? (
            <div className="flex justify-between">
              <dt className="text-ink/65">
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
              <dt className="text-ink/65">
                Deposit
                <Mark s={j.deposit?.status} />
              </dt>
              <dd>{gbp(deposit)}</dd>
            </div>
          ) : null}
          {j.months && deposit ? (
            <div className="flex justify-between">
              <dt className="text-ink/65">
                Then {j.months.value} instalments of
                <Mark s={j.months.status} />
              </dt>
              <dd>{gbp(monthly(total, deposit, j.months.value))}</dd>
            </div>
          ) : null}
        </dl>

        {bookable ? (
          <Link href={`/trips/${j.slug}/book`} className="mt-4 flex min-h-[3.25rem] items-stretch justify-between overflow-hidden rounded-[3px] bg-ink text-[0.95rem] font-medium text-canvas hover:bg-ink-deep">
            <span className="flex items-center px-4">Pay the deposit</span>
            <span aria-hidden className="grid w-[3.25rem] place-items-center bg-ink-deep text-gold-soft">
              <Chevron />
            </span>
          </Link>
        ) : null}
        <a href={wa(message)} target="_blank" rel="noopener noreferrer" className={`${bookable ? "mt-1.5" : "mt-4"} ${waBtn}`}>
          <span aria-hidden className={waCell}>
            <WaGlyph className="size-5" />
          </span>
          <span className="flex items-center px-4">{open ? `Book ${adults + children} place${adults + children === 1 ? "" : "s"} on WhatsApp` : "Register interest on WhatsApp"}</span>
        </a>
        {!open ? (
          <a href={`#${anchors.form}`} className="mt-3 block text-center text-[0.86rem] text-ink/65 underline decoration-ink/25 underline-offset-4">
            Or use the form
          </a>
        ) : null}
        <p className="mt-4 text-[0.78rem] leading-relaxed text-ink/60">
          {open
            ? "Pay the deposit online by card (a small card fee applies) or by bank transfer with no fee. Prefer to talk first? WhatsApp us."
            : "No payment now. Prices are a guide from our last trip; we’ll message you when the dates and prices are confirmed."}
        </p>
      </div>
    </div>
  );
}
