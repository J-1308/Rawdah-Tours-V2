"use client";

import { useState } from "react";

import { anchors, gbp, type Journey } from "@/app/_site/content";
import { prefillForm } from "@/app/_site/step-form";
import { Chevron } from "@/app/_site/whatsapp";

const roomName = (n: number) => ({ 4: "Quad", 3: "Triple", 2: "Double" })[n] ?? `${n} sharing`;

/**
 * The packages as cards (after The Sunnah Experience's room cards, in Rawdah's look; Jibril, 19 Nov 2026): with
 * flights or ground only, then quad, triple and double, each with its price, the ended early bird crossed out where it was, the
 * deposit and what follows. Prices from src/lib/trips.ts. A card's button fills the form below with that package.
 */
export function PackageCards({ j }: { j: Journey }) {
  const rooms = j.rooms?.value ?? [];
  const [flights, setFlights] = useState(true);
  const shown = rooms.filter((r) => (r.flights !== false) === flights).sort((a, b) => b.sharing - a.sharing);
  const deposit = rooms[0]?.schedule?.[0]?.amount ?? j.deposit?.value ?? 0;

  return (
    <div className="mt-8">
      <div role="group" aria-label="With flights or ground only" className="pkg-toggle">
        {[true, false].map((f) => (
          <button key={String(f)} type="button" aria-pressed={flights === f} onClick={() => setFlights(f)}>
            <span>{f ? "With flights" : "Ground only"}</span>
            <small>{f ? "Saudia from Heathrow" : "Your own flights"}</small>
          </button>
        ))}
      </div>
      <ul className="pkg-cards">
        {shown.map((r) => {
          const early = j.endedOffer && j.endedOffer.room === r.type ? j.endedOffer : null;
          const dated = (r.schedule ?? []).slice(1).filter((p) => !/agreed/i.test(p.due));
          const name = roomName(r.sharing);
          return (
            <li key={r.type} className="pkg-card">
              <p className="pkg-room">
                {name} <span>{r.sharing} sharing</span>
              </p>
              <p className="pkg-price">
                {gbp(r.price)} <span>per person</span>
              </p>
              {early ? <s className="pkg-early">{early.label} {gbp(early.price)}</s> : null}
              <ul className="pkg-plan">
                <li>
                  <span>Deposit</span>
                  <b>{gbp(deposit)}</b>
                </li>
                {dated.length ? (
                  dated.map((p) => (
                    <li key={p.due}>
                      <span>{p.due.replace(/, final$/i, "")}</span>
                      <b>{gbp(p.amount)}</b>
                    </li>
                  ))
                ) : (
                  <li>
                    <span>The rest, on dates agreed when you book</span>
                    <b>{gbp(r.price - deposit)}</b>
                  </li>
                )}
              </ul>
              <a
                href={`#${anchors.form}`}
                onClick={() => prefillForm({ Package: `${r.type}, ${gbp(r.price)} per person` })}
                className="pkg-btn"
              >
                {flights ? `Choose the ${name.toLowerCase()}` : `Enquire about the ${name.toLowerCase()}`}
                <Chevron dir="down" className="size-3 opacity-70" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
