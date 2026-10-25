"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import { brand, gbp, privatePricing, wa } from "@/app/_site/content";
import { Mark } from "@/app/_site/marks";
import { WaGlyph } from "@/app/_site/whatsapp";

/**
 * The private Umrah planner: one sheet of rows, a label on the left and the
 * choice on the right, with the plan and a rough cost on date brown beside
 * it. "Send" writes the whole plan into a WhatsApp message. The estimate uses
 * a suggested pricing model, marked as such.
 */

const airports = ["London Heathrow", "London Gatwick", "Birmingham", "Manchester", "No flights, land only"];
const hotelsStd = Object.keys(privatePricing.perNight);
const months = (() => {
  const out: string[] = [];
  const d = new Date(2026, 10, 1);
  for (let i = 0; i < 14; i++) {
    out.push(d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
    d.setMonth(d.getMonth() + 1);
  }
  return out;
})();

function Row({ label, note, children }: { label: string; note?: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 border-b border-ink/8 py-4 last:border-0 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-6">
      <div>
        <p className="text-[0.95rem] font-medium">{label}</p>
        {note ? <p className="text-[0.78rem] text-ink/65">{note}</p> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Segments<T extends string>({ value, options, onChange, label }: { value: T; options: readonly T[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2.5 text-[0.88rem] transition-colors ${value === o ? "border-ink bg-ink text-canvas shadow-[var(--shadow-lift)]" : "border-ink/10 bg-white/[0.06] hover:border-ink/35"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Count({ label, value, set, min, max }: { label: string; value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <span className="inline-flex items-center">
      <button type="button" aria-label={`Fewer: ${label}`} disabled={value <= min} onClick={() => set(Math.max(min, value - 1))} className="grid size-10 place-items-center rounded-l-[0.8rem] border border-ink/12 bg-white/[0.06] disabled:opacity-30">
        −
      </button>
      <span className="grid h-10 w-12 place-items-center border-y border-ink/12 bg-white/[0.06] tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label={`More: ${label}`} disabled={value >= max} onClick={() => set(Math.min(max, value + 1))} className="grid size-10 place-items-center rounded-r-[0.8rem] border border-ink/12 bg-white/[0.06] disabled:opacity-30">
        +
      </button>
    </span>
  );
}

export function Builder() {
  const q = useSearchParams();
  const num = (k: string, d: number) => {
    const n = Number(q.get(k));
    return Number.isFinite(n) && q.get(k) !== null ? n : d;
  };
  const [first, setFirst] = useState<"Madinah first" | "Makkah first">(q.get("first") === "Makkah" ? "Makkah first" : "Madinah first");
  const [md, setMd] = useState(num("md", 5));
  const [mk, setMk] = useState(num("mk", 5));
  const [month, setMonth] = useState(months[3]);
  const [flex, setFlex] = useState(true);
  const [from, setFrom] = useState(airports[0]);
  const paxQ = parseInt(q.get("pax") ?? "2", 10);
  const [adults, setAdults] = useState(Number.isFinite(paxQ) ? Math.min(12, Math.max(1, paxQ)) : 2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [hotel, setHotel] = useState(hotelsStd[hotelsStd.length - 1]);
  const [transport, setTransport] = useState<"Private car" | "Shared coach">("Private car");
  const [ziyarah, setZiyarah] = useState<"Yes, guided" | "No thanks">("Yes, guided");
  const [visa, setVisa] = useState<"Arrange it for me" | "I have one">("Arrange it for me");
  const [name, setName] = useState("");

  const est = useMemo(() => {
    const people = adults + children;
    const perRoom = Math.max(1, Math.min(4, Math.ceil(people / rooms)));
    const factor = privatePricing.sharingDiscount[perRoom] ?? 0.75;
    const nights = mk + md;
    const stay = privatePricing.perNight[hotel] * nights * factor;
    const flights = from.startsWith("No flights") ? 0 : privatePricing.flights;
    const extras = privatePricing.visaAndTransport + (transport === "Private car" ? 90 : 0) + (ziyarah === "Yes, guided" ? 40 : 0) - (visa === "I have one" ? 110 : 0);
    const adult = Math.round((stay + flights + extras) / 5) * 5;
    const child = Math.round((adult * 0.7) / 5) * 5;
    return { adult, child, total: adult * adults + child * children, nights, perRoom };
  }, [adults, children, rooms, mk, md, hotel, from, transport, ziyarah, visa]);

  const route = first === "Madinah first" ? `Madinah ${md} nights, then Makkah ${mk} nights` : `Makkah ${mk} nights, then Madinah ${md} nights`;
  const who = `${adults} adult${adults === 1 ? "" : "s"}${children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}`;
  const message = [
    "Salaam Rawdah Tours, I’m planning a private Umrah:",
    `Route: ${route}`,
    `When: ${month}${flex ? " (flexible)" : ""}`,
    `Flying from: ${from}`,
    `Travelling: ${who}, ${rooms} room${rooms === 1 ? "" : "s"}`,
    `Hotels: ${hotel}`,
    `Transport: ${transport}. Ziyarah: ${ziyarah}. Visa: ${visa}.`,
    `Rough cost on your site: ${gbp(est.adult)} per adult`,
    `Name: ${name}`,
  ].join("\n");

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-7">
        <div className="glass rounded-[1.75rem] px-5 py-1 sm:px-7">
          <Row label="Travellers">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.86rem]">
              <span className="flex items-center gap-3">
                <Count label="Adults" value={adults} set={setAdults} min={1} max={12} /> Adults
              </span>
              <span className="flex items-center gap-3">
                <Count label="Children" value={children} set={setChildren} min={0} max={10} /> Children, 2 to 11
              </span>
              <span className="flex items-center gap-3">
                <Count label="Rooms" value={rooms} set={setRooms} min={1} max={8} /> Rooms
              </span>
            </div>
          </Row>
          <Row label="Order">
            <Segments label="Order" value={first} options={["Madinah first", "Makkah first"] as const} onChange={setFirst} />
          </Row>
          <Row label="Nights">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.86rem]">
              <span className="flex items-center gap-3">
                <Count label="Nights in Madinah" value={md} set={setMd} min={0} max={21} /> In Madinah
              </span>
              <span className="flex items-center gap-3">
                <Count label="Nights in Makkah" value={mk} set={setMk} min={0} max={21} /> In Makkah
              </span>
            </div>
          </Row>
          <Row label="When">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <select aria-label="Month" value={month} onChange={(e) => setMonth(e.target.value)} className="field sm:max-w-[15rem]">
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <label className="flex items-center gap-2.5 text-[0.88rem]">
                <input type="checkbox" checked={flex} onChange={(e) => setFlex(e.target.checked)} className="choice" />
                Flexible
              </label>
            </div>
          </Row>
          <Row label="Flying from">
            <select aria-label="Flying from" value={from} onChange={(e) => setFrom(e.target.value)} className="field sm:max-w-[15rem]">
              {airports.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Row>
          <Row label="Hotels">
            <Segments label="Hotels" value={hotel} options={hotelsStd} onChange={setHotel} />
          </Row>
          <Row label="Transport">
            <Segments label="Transport" value={transport} options={["Private car", "Shared coach"] as const} onChange={setTransport} />
          </Row>
          <Row label="Ziyarah">
            <Segments label="Ziyarah" value={ziyarah} options={["Yes, guided", "No thanks"] as const} onChange={setZiyarah} />
          </Row>
          <Row label="Visa">
            <Segments label="Visa" value={visa} options={["Arrange it for me", "I have one"] as const} onChange={setVisa} />
          </Row>
        </div>
      </div>

      {/* The plan: sticky beside the sheet on desktop, after it on phones */}
      <aside className="lg:sticky lg:top-28 lg:col-span-5">
        <div className="panel-dark rounded-[2rem] p-7 text-cream [&_.site-mark]:border-sand/60 [&_.site-mark]:text-sand">
          <p className="flex items-center gap-2.5 font-editorial text-[1.15rem] italic text-sand">
            <span aria-hidden className="mark-mask h-4 text-sand/80" />
            Your plan
          </p>
          <p className="display mt-2 text-[1.9rem]">
            {est.nights} nights, {adults + children} {adults + children === 1 ? "person" : "people"}
          </p>
          <dl className="mt-5 grid grid-cols-1 text-[0.9rem]">
            {[
              ["Route", route],
              ["When", `${month}${flex ? ", flexible" : ""}`],
              ["From", from],
              ["Rooms", `${rooms}, ${est.perRoom} sharing`],
              ["Hotels", hotel],
              ["Extras", `${transport}, ziyarah: ${ziyarah.toLowerCase()}`],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-3 border-t border-cream/15 py-2.5">
                <dt className="text-cream/55">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-2 rounded-[1.25rem] bg-white/[0.06] p-5 ring-1 ring-white/10">
            <p className="text-[0.8rem] text-cream/70">
              Rough cost per adult
              <Mark s={privatePricing.status} />
            </p>
            <p className="display mt-1 text-[3rem] leading-none">{gbp(est.adult)}</p>
            <p className="mt-2 text-[0.84rem] text-cream/70">
              About {gbp(est.total)} in total{children ? `, children ${gbp(est.child)} each` : ""}. A guide, not a quote: we come back with real prices.
            </p>
          </div>
          <label className="mt-5 flex flex-col gap-2 text-[0.86rem] text-cream/80">
            Your name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field" />
          </label>
          <a href={wa(message)} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.95rem] bg-wa px-4 text-[0.95rem] font-medium text-white shadow-[0_14px_30px_-16px_rgb(31_168_85/0.7)]">
          <WaGlyph className="size-5" />
          Send this plan on WhatsApp
          </a>
          <a href={`mailto:${brand.email}?subject=${encodeURIComponent("Private Umrah plan")}&body=${encodeURIComponent(message)}`} className="mt-3 block text-center text-[0.84rem] text-cream/65 underline decoration-canvas/30 underline-offset-4">
            Or email it to us
          </a>
          <p className="mt-4 text-[0.78rem] leading-relaxed text-cream/60">
            Nothing is booked and nothing is paid. We reply with real options.
            <Mark s="proposed" />
          </p>
        </div>
      </aside>
    </div>
  );
}
