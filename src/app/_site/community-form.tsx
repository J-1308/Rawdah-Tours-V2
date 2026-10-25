"use client";

import { useState } from "react";

import { brand, wa } from "@/app/_site/content";
import { WaGlyph } from "@/app/_site/whatsapp";

const sizes = ["Around 10", "10 to 20", "20 to 40", "40 to 60", "More than 60"];
const times = ["Not sure yet", "Spring 2027", "Summer 2027", "Autumn 2027", "Winter 2027–28"];

/**
 * A group organiser's first message: a few questions a masjid committee can
 * answer in a minute, written into WhatsApp (or email) for them to send.
 */
export function CommunityForm() {
  const [org, setOrg] = useState("");
  const [role, setRole] = useState("Imam or teacher");
  const [size, setSize] = useState(sizes[1]);
  const [when, setWhen] = useState(times[0]);
  const [kind, setKind] = useState("Brothers and sisters");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");

  const message = [
    "Salaam Rawdah Tours, I’d like to talk about a trip for our group.",
    `Group: ${org}`,
    `I’m the: ${role}`,
    `Numbers: ${size}`,
    `When: ${when}`,
    `Travelling: ${kind}`,
    notes ? `Notes: ${notes}` : "",
    `Name: ${name}`,
  ]
    .filter(Boolean)
    .join("\n");

  const sel = (label: string, value: string, set: (v: string) => void, options: string[]) => (
    <label className="flex flex-col gap-2 text-[0.9rem] font-medium">
      {label}
      <select value={value} onChange={(e) => set(e.target.value)} className="field font-normal">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-[0.9rem] font-medium sm:col-span-2">
        Name of your masjid, circle or society
        <input value={org} onChange={(e) => setOrg(e.target.value)} className="field font-normal" />
      </label>
      {sel("You are the", role, setRole, ["Imam or teacher", "Committee member", "Organiser", "Society president", "Something else"])}
      {sel("How many might come", size, setSize, sizes)}
      {sel("When", when, setWhen, times)}
      {sel("Who’s travelling", kind, setKind, ["Brothers and sisters", "Brothers", "Sisters", "Families", "Young people"])}
      <label className="flex flex-col gap-2 text-[0.9rem] font-medium sm:col-span-2">
        Anything else <span className="font-normal text-ink/68">(optional: what you’re studying, a teacher, a budget)</span>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="field font-normal" />
      </label>
      <label className="flex flex-col gap-2 text-[0.9rem] font-medium sm:col-span-2">
        Your name
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field font-normal" />
      </label>
      <div className="flex flex-col gap-1.5 sm:col-span-2 sm:flex-row">
        <a href={wa(message)} target="_blank" rel="noopener noreferrer" className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-[0.95rem] bg-wa px-4 text-[0.95rem] font-medium text-white shadow-[0_14px_30px_-16px_rgb(31_168_85/0.7)]">
          <WaGlyph className="size-5" />
          Send on WhatsApp
        </a>
        <a href={`mailto:${brand.email}?subject=${encodeURIComponent("A trip for our group")}&body=${encodeURIComponent(message)}`} className="flex min-h-[3.25rem] flex-1 items-center justify-center rounded-[0.95rem] border border-ink/15 bg-(--raise) text-[0.95rem] font-medium hover:border-ink/40">
          Email it instead
        </a>
      </div>
    </div>
  );
}
