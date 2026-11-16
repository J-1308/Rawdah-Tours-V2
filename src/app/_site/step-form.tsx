"use client";

import { track } from "@vercel/analytics";
import { useEffect, useId, useRef, useState } from "react";

import { saveLead, type LeadInput } from "@/app/actions/lead";
import { brand, wa } from "@/app/_site/content";
import { readSource } from "@/app/_site/tracking";
import { Chevron, WaGlyph } from "@/app/_site/whatsapp";

/*
 * The step-by-step forms (spec by Fable, 16 Nov 2026). One component, five paths. Step 1 is the same everywhere:
 * a first name and a WhatsApp number or email, saved at once as a partial lead. Every later question is a tap and can
 * be skipped. The ending offers the ways forward that fit the path: pay the deposit (open trips only), book a call
 * (when NEXT_PUBLIC_CALL_URL is set), or continue on WhatsApp with the answers carried across.
 */

type Q =
  | { kind: "chips"; key: string; label: string; options: string[]; help?: string }
  | { kind: "multi"; key: string; label: string; options: string[]; max: number }
  | { kind: "stepper"; key: string; label: string; start: number; min: number; max: number }
  | { kind: "text"; key: string; label: string; required?: boolean; autoComplete?: string };

type Step = { heading: string; questions: Q[]; itinerary?: boolean };
type Path = { form: LeadInput["form"]; title: string; sub?: string; steps: Step[]; submit?: string };

export type StepFormProps =
  | { path: "hajj"; trip?: string }
  | { path: "interest"; trip: string; sub?: string }
  | { path: "group"; trip: string; sub?: string; packages: string[]; deposit?: string; bookHref?: string }
  | { path: "private" }
  | { path: "community" };

const months = () => {
  const out: string[] = [];
  const d = new Date();
  for (let i = 1; i <= 12; i++) out.push(new Date(d.getFullYear(), d.getMonth() + i, 1).toLocaleDateString("en-GB", { month: "short", year: "numeric" }));
  return [...out, "Not sure yet"];
};

function pathFor(p: StepFormProps): Path {
  switch (p.path) {
    case "hajj":
      return {
        form: "hajj",
        title: "Register your interest: Hajj 2027",
        steps: [
          {
            heading: "Who’s going?",
            questions: [
              { kind: "chips", key: "Pilgrims", label: "How many pilgrims?", options: ["1", "2", "3", "4", "5 or more"] },
              { kind: "chips", key: "Everyone over 12", label: "Is everyone over 12?", options: ["Yes", "No", "Not sure"], help: "Hajj is for adults and children over 12." },
            ],
          },
          {
            heading: "Getting ready",
            questions: [
              { kind: "chips", key: "Nusuk account", label: "Have you made a Nusuk account?", options: ["Yes, created", "Not yet", "What is Nusuk?"] },
              { kind: "chips", key: "Passports to mid-2027", label: "Are passports valid to at least mid-2027?", options: ["Yes, all of us", "Some need renewing", "Not sure"] },
            ],
          },
        ],
        submit: "Register my interest",
      };
    case "interest":
      return {
        form: "interest",
        title: `Hear first: ${p.trip}`,
        sub: p.sub,
        steps: [{ heading: "Who’s travelling?", questions: [{ kind: "chips", key: "Travellers", label: "How many of you?", options: ["1", "2", "3", "4", "5 or more"] }] }],
        submit: "Register my interest",
      };
    case "group":
      return {
        form: "group",
        title: `Reserve your place: ${p.trip}`,
        sub: p.sub,
        steps: [
          {
            heading: "Who’s travelling?",
            questions: [
              { kind: "chips", key: "Travellers", label: "How many of you?", options: ["1", "2", "3", "4", "5 or more"] },
              { kind: "chips", key: "Package", label: "Which package?", options: [...p.packages, "Not sure yet"] },
            ],
            itinerary: true,
          },
        ],
        submit: "Send",
      };
    case "private":
      return {
        form: "private",
        title: "Design your Umrah, shaped around you",
        steps: [
          {
            heading: "Who and when?",
            questions: [
              { kind: "stepper", key: "Adults", label: "Adults", start: 2, min: 1, max: 20 },
              { kind: "stepper", key: "Children 2 to 11", label: "Children, 2 to 11", start: 0, min: 0, max: 12 },
              { kind: "chips", key: "Month", label: "Which month?", options: months() },
            ],
          },
          {
            heading: "The shape of your trip",
            questions: [
              { kind: "chips", key: "Length", label: "How long?", options: ["About 7 nights", "About 10 nights", "About 14 nights", "Advise me"] },
              { kind: "chips", key: "Start in", label: "Start in", options: ["Madinah first", "Makkah first", "Advise me"] },
              { kind: "chips", key: "Flying from", label: "Flying from", options: ["London Heathrow", "London Gatwick", "Birmingham", "Manchester", "No flights, land only"] },
            ],
          },
          {
            heading: "What matters most?",
            questions: [
              { kind: "multi", key: "Matters most", label: "Choose up to two", max: 2, options: ["Close to the Haram", "Best value", "Extra comfort", "Easy for elders and children", "Guided ziyarah with a certified ustadh"] },
              { kind: "chips", key: "Pace", label: "Pace", options: ["Relaxed", "Balanced", "Full"] },
              { kind: "chips", key: "Hotels", label: "Hotels", options: ["Good value", "Comfortable", "Premium", "Advise me"] },
            ],
          },
        ],
        submit: "Send my plan",
      };
    case "community":
      return {
        form: "community",
        title: "Plan a trip for your community",
        steps: [
          {
            heading: "About you",
            questions: [
              { kind: "text", key: "Organisation", label: "Organisation name", required: true, autoComplete: "organization" },
              { kind: "chips", key: "Role", label: "Your role", options: ["Imam or teacher", "Committee or trustee", "Staff", "Volunteer organiser", "Other"] },
            ],
          },
          {
            heading: "About the trip",
            questions: [
              { kind: "chips", key: "Group size", label: "Group size", options: ["10 to 19", "20 to 39", "40 to 59", "60 or more", "Not sure yet"] },
              { kind: "chips", key: "When", label: "When", options: ["Ramadan", "School holidays", "Another time", "Not sure yet"] },
              { kind: "chips", key: "Who’s travelling", label: "Who’s travelling", options: ["Brothers", "Sisters", "Families", "Mixed"] },
            ],
          },
        ],
        submit: "Request a proposal",
      };
  }
}

const chip = "min-h-12 rounded-[0.9rem] border px-4 py-2.5 text-left text-[0.95rem] leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
const chipOff = "border-(--edge) bg-(--raise) text-ink hover:border-ink/30";
const chipOn = "border-ink bg-ink text-canvas";

export function StepForm(props: StepFormProps) {
  const path = pathFor(props);
  const total = path.steps.length + 1;
  const trip = "trip" in props ? (props.trip ?? "") : props.path === "hajj" ? "Hajj 2027" : "";
  const uid = useId();
  const id = useRef("");
  const top = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [reminderOptOut, setReminderOptOut] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [itinerary, setItinerary] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const a: Record<string, string> = {};
    for (const s of path.steps) for (const q of s.questions) if (q.kind === "stepper") a[q.key] = String(q.start);
    return a;
  });
  const hp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    id.current = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }, []);

  const f = (k: string) => `${uid}-${k}`;
  const set = (k: string, v: string) => setAnswers((a) => ({ ...a, [k]: v }));

  async function save(next: number, finished: boolean, keep: Record<string, string> = answers) {
    setSaving(true);
    const res = await saveLead({
      id: id.current, form: path.form, trip, step, steps: total, done: finished,
      name, whatsapp, email, answers: keep, itinerary, reminderOptOut, marketing,
      page: location.pathname, source: readSource() as Record<string, string>, website: hp.current?.value,
    }).catch(() => ({ ok: false, errors: { network: "We couldn’t save that. Check your connection and try again. Your answers are still here." } }));
    setSaving(false);
    if (!res.ok) {
      setErrors(res.errors ?? { network: "We couldn’t save that. Check your connection and try again. Your answers are still here." });
      return;
    }
    setErrors({});
    track("form_step", { form: path.form, step, trip });
    if (finished) setDone(true);
    else setStep(next);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function next(skip = false) {
    if (step === 1) {
      const e: Record<string, string> = {};
      if (!name.trim()) e.name = "Please tell us your first name.";
      if (!whatsapp.trim() && !email.trim()) e.contact = "Add a WhatsApp number or an email. One is enough.";
      if (Object.keys(e).length) return setErrors(e);
    }
    const s = path.steps[step - 2];
    if (s && !skip) {
      const missing = s.questions.find((q) => q.kind === "text" && q.required && !answers[q.key]?.trim());
      if (missing) return setErrors({ [missing.key]: "Please add your organisation’s name." });
      if (s.itinerary && itinerary && !email.trim()) return setErrors({ email2: "Add an email so we can send the itinerary." });
    }
    const keep = skip && s ? Object.fromEntries(Object.entries(answers).filter(([k]) => !s.questions.some((q) => q.key === k))) : answers;
    if (skip) setAnswers(keep);
    const last = step === total;
    void save(step + 1, last, keep);
  }

  const summary = Object.entries(answers).filter(([, v]) => v && v !== "0").map(([k, v]) => `${k}: ${v}`).join(", ");
  const waText = `Assalamu alaykum, I’m ${name || "getting in touch"}. ${path.title.replace(/:.*/, "")}${trip ? `, ${trip}` : ""}${summary ? `. ${summary}` : ""}.`;

  if (done) return <Ending props={props} name={name.trim().split(/\s+/)[0] ?? ""} waText={waText} trip={trip} answers={answers} />;

  const current = path.steps[step - 2];
  return (
    <div ref={top} className="scroll-mt-28">
      <div className="flex items-center justify-between gap-4 text-[0.84rem] text-ink/62">
        {step > 1 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="-ml-2 inline-flex min-h-10 items-center gap-1 rounded-lg px-2 hover:text-ink">
            <Chevron className="size-3 rotate-180" /> Back
          </button>
        ) : (
          <span />
        )}
        <span aria-live="polite">
          Step {step} of {total}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/10" aria-hidden>
        <div className="h-full rounded-full bg-bronze transition-[width] duration-500" style={{ width: `${(step / total) * 100}%` }} />
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="mt-6"
      >
        <input ref={hp} name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        {step === 1 ? (
          <fieldset className="space-y-5">
            <legend className="display text-[clamp(1.7rem,4.5vw,2.2rem)] leading-tight">{path.title}</legend>
            {path.sub ? <p className="-mt-2 text-[0.95rem] text-ink/68">{path.sub}</p> : null}
            <p className="text-[0.95rem] text-ink/70">That’s all we need to begin. The rest is optional and takes about a minute.</p>
            <Text id={f("name")} label="First name" value={name} onChange={setName} error={errors.name} autoComplete="given-name" />
            <Text id={f("wa")} label="WhatsApp number" value={whatsapp} onChange={setWhatsapp} error={errors.whatsapp} type="tel" autoComplete="tel" inputMode="tel" />
            <Text id={f("email")} label="Email" value={email} onChange={setEmail} error={errors.email} type="email" autoComplete="email" inputMode="email" />
            {errors.contact ? (
              <p role="alert" className="text-[0.9rem] text-error">
                {errors.contact}
              </p>
            ) : (
              <p className="text-[0.85rem] text-ink/62">A WhatsApp number or an email: one is enough.</p>
            )}
            <div className="space-y-3 border-t border-ink/10 pt-4 text-[0.88rem] text-ink/72">
              <Tick checked={reminderOptOut} onChange={setReminderOptOut} label="Don’t send me a reminder about this enquiry." />
              {email.trim() ? <Tick checked={marketing} onChange={setMarketing} label="Send me trip updates by email." /> : null}
              <p className="text-[0.82rem] text-ink/62">
                We’ll use your details only to answer this enquiry.{" "}
                <a href="/privacy" className="underline underline-offset-2">
                  Privacy policy
                </a>
                .
              </p>
            </div>
          </fieldset>
        ) : current ? (
          <fieldset className="space-y-7">
            <legend className="display text-[clamp(1.7rem,4.5vw,2.2rem)] leading-tight">{current.heading}</legend>
            {current.questions.map((q) => (
              <Question key={q.key} q={q} id={f(q.key)} value={answers[q.key] ?? ""} set={(v) => set(q.key, v)} error={errors[q.key]} />
            ))}
            {current.itinerary ? (
              <div className="space-y-3">
                <Tick checked={itinerary} onChange={setItinerary} label="Send me the full itinerary" />
                {itinerary && !email.trim() ? <Text id={f("email2")} label="Email for the itinerary" value={email} onChange={setEmail} error={errors.email2} type="email" autoComplete="email" inputMode="email" /> : null}
              </div>
            ) : null}
          </fieldset>
        ) : null}

        {errors.network ? (
          <p role="alert" className="mt-5 text-[0.9rem] text-error">
            {errors.network}
          </p>
        ) : null}
        <div className="mt-8 flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-sand flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-[0.95rem] px-5 text-[0.98rem] font-medium disabled:opacity-60">
            {saving ? "Saving…" : step === total ? (path.submit ?? "Send") : "Next"}
            {saving ? null : <Chevron className="size-3 opacity-70" />}
          </button>
          {step > 1 && step < total ? (
            <button type="button" disabled={saving} onClick={() => next(true)} className="min-h-[3.25rem] rounded-[0.95rem] px-4 text-[0.95rem] text-ink/70 underline underline-offset-4 hover:text-ink">
              Skip
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Text({ id, label, value, onChange, error, ...rest }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-medium">
        {label}
      </label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-e` : undefined} className="field mt-2 min-h-12 w-full" {...rest} />
      {error ? (
        <p id={`${id}-e`} role="alert" className="mt-1.5 text-[0.88rem] text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Tick({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-start gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="choice mt-0.5" />
      <span>{label}</span>
    </label>
  );
}

function Question({ q, id, value, set, error }: { q: Q; id: string; value: string; set: (v: string) => void; error?: string }) {
  if (q.kind === "text") return <Text id={id} label={q.label} value={value} onChange={set} error={error} autoComplete={q.autoComplete} />;
  if (q.kind === "stepper") {
    const n = Number(value || q.start);
    return (
      <div className="flex items-center justify-between gap-4">
        <span id={id} className="text-[0.95rem] font-medium">
          {q.label}
        </span>
        <div className="flex items-center gap-2" role="group" aria-labelledby={id}>
          <button type="button" aria-label={`Fewer: ${q.label}`} disabled={n <= q.min} onClick={() => set(String(Math.max(q.min, n - 1)))} className={`${chip} ${chipOff} grid size-12 place-items-center px-0 text-center text-[1.2rem] disabled:opacity-40`}>
            −
          </button>
          <span className="w-8 text-center text-[1.1rem] tabular-nums" aria-live="polite">
            {n}
          </span>
          <button type="button" aria-label={`More: ${q.label}`} disabled={n >= q.max} onClick={() => set(String(Math.min(q.max, n + 1)))} className={`${chip} ${chipOff} grid size-12 place-items-center px-0 text-center text-[1.2rem] disabled:opacity-40`}>
            +
          </button>
        </div>
      </div>
    );
  }
  const picked = q.kind === "multi" ? value.split(" · ").filter(Boolean) : [value];
  const toggle = (o: string) => {
    if (q.kind === "chips") return set(value === o ? "" : o);
    const has = picked.includes(o);
    const nextList = has ? picked.filter((x) => x !== o) : picked.length < q.max ? [...picked, o] : picked;
    set(nextList.join(" · "));
  };
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="text-[0.95rem] font-medium">
        {q.label}
      </p>
      {"help" in q && q.help ? <p className="mt-1 text-[0.85rem] text-ink/62">{q.help}</p> : null}
      <div className={`mt-3 grid gap-2 ${q.options.some((o) => o.length > 22) ? "sm:grid-cols-2" : "grid-cols-2"}`}>
        {q.options.map((o) => {
          const on = picked.includes(o);
          return (
            <button key={o} type="button" aria-pressed={on} onClick={() => toggle(o)} className={`${chip} ${on ? chipOn : chipOff}`}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Ending({ props, name, waText, trip }: { props: StepFormProps; name: string; waText: string; trip: string; answers: Record<string, string> }) {
  const waHref = wa(waText, trip || undefined);
  const call = brand.callUrl;
  const depositsOn = props.path === "group" && Boolean(props.bookHref);
  const copy = {
    hajj: { h: "Your interest is registered.", line: "Hajj is booked and paid on Nusuk. We’ll guide your application and tell you which package to choose." },
    interest: { h: `You’ll hear first, ${name}.`, line: "When the details are announced, the Rawdah Tours team will be in touch." },
    group: depositsOn
      ? { h: `Thank you, ${name}. One step left.`, line: `A ${props.path === "group" ? (props.deposit ?? "") : ""} deposit per person secures your place.` }
      : { h: `Thank you, ${name}. We have your request.`, line: `The Rawdah Tours team will confirm your place and how to pay your ${props.path === "group" ? (props.deposit ?? "") : ""} deposit.` },
    private: { h: `Your trip is taking shape, ${name}.`, line: "Talk it through with the Rawdah Tours team and we’ll turn it into a quote." },
    community: { h: "Proposal requested.", line: "We’ll prepare a proposal for your group. A short call helps us get it right." },
  }[props.path];

  const callBtn = call ? { label: "Book a call", href: call, kind: "call" as const } : null;
  const waBtn = { label: props.path === "group" && !depositsOn ? "Reserve on WhatsApp" : "Continue on WhatsApp", href: waHref, kind: "wa" as const };
  const payBtn = depositsOn && props.path === "group" && props.bookHref ? { label: "Pay your deposit", href: props.bookHref, kind: "pay" as const } : null;
  const order =
    props.path === "private" || props.path === "community" ? [callBtn, waBtn] : props.path === "group" ? [payBtn, waBtn, callBtn] : [waBtn, callBtn];
  const buttons = order.filter(Boolean) as { label: string; href: string; kind: "call" | "wa" | "pay" }[];

  return (
    <div role="status" className="scroll-mt-28">
      <p className="display text-[clamp(1.9rem,5vw,2.5rem)] leading-tight">{copy.h}</p>
      <p className="mt-3 max-w-[30rem] text-[1rem] leading-[1.6] text-ink/72">{copy.line.replace("  ", " ")}</p>
      <div className="mt-7 grid gap-2.5">
        {buttons.map((b, i) => (
          <a
            key={b.label}
            href={b.href}
            target={b.kind === "pay" ? undefined : "_blank"}
            rel={b.kind === "pay" ? undefined : "noopener noreferrer"}
            onClick={() => {
              if (b.kind === "call") track("call_booked", { trip });
            }}
            className={`flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[0.95rem] px-5 text-[0.98rem] font-medium ${i === 0 ? (b.kind === "wa" ? "bg-wa text-white" : "btn-sand") : "border border-(--edge) bg-(--raise) text-ink"}`}
          >
            {b.kind === "wa" ? <WaGlyph className={`size-5 ${i === 0 ? "" : "text-wa"}`} /> : null}
            {b.label}
          </a>
        ))}
      </div>
    </div>
  );
}
