"use client";

import { useEffect, useMemo, useState } from "react";

import { sendAnswers } from "@/app/actions/answers";
import { questionnaire } from "@/app/_site/questionnaire";

const KEY = "rawdah-questionnaire";

/** The client questionnaire: saves on this device as they type, then Send or Copy for WhatsApp. */
export function QuestionnaireForm() {
  const [a, setA] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed" | "copied">("idle");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      setA(saved.a ?? {});
      setName(saved.name ?? "");
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ a, name }));
    } catch {}
  }, [a, name]);

  const numbered = useMemo(() => {
    let n = 0;
    return questionnaire.flatMap((s) => s.items.map((it) => ({ ...it, n: ++n, section: s.title })));
  }, []);
  const answered = numbered.filter((it) => a[it.id]?.trim()).length;
  const text = numbered
    .filter((it) => a[it.id]?.trim())
    .map((it) => `${it.n}. ${it.q}\n${a[it.id].trim()}`)
    .join("\n\n");

  const set = (id: string, v: string) => setA((x) => ({ ...x, [id]: v }));

  return (
    <div>
      <div className="sticky top-[4.5rem] z-10 -mx-1 mb-8 rounded-[1rem] border border-(--edge) bg-canvas/90 px-4 py-3 text-[0.9rem] backdrop-blur-md">
        {answered} of {numbered.length} answered · saved on this phone as you type
      </div>
      <label className="block max-w-[28rem]">
        <span className="text-[0.95rem] font-medium">Your name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="field mt-2 min-h-12 w-full" autoComplete="name" />
      </label>

      {questionnaire.map((s) => (
        <section key={s.title} className="mt-12">
          <h2 className="display text-[clamp(1.8rem,4vw,2.4rem)] leading-tight">{s.title}</h2>
          <p className="mt-2 max-w-[38rem] text-[0.95rem] text-ink/68">{s.intro}</p>
          <ol className="mt-6 grid gap-7">
            {s.items.map((it) => {
              const n = numbered.find((x) => x.id === it.id)?.n;
              return (
                <li key={it.id} className="glass rounded-[1.25rem] p-5">
                  <p id={it.id} className="text-[1rem] font-medium leading-snug">
                    <span className="mr-2 text-bronze tabular-nums">{n}.</span>
                    {it.q}
                  </p>
                  {it.known ? <p className="mt-2 text-[0.88rem] text-ink/62">What we have: {it.known}</p> : null}
                  {Array.isArray(it.type) ? (
                    <div role="group" aria-labelledby={it.id} className="mt-4 grid gap-2 sm:grid-cols-2">
                      {it.type.map((o) => (
                        <button
                          key={o}
                          type="button"
                          aria-pressed={a[it.id] === o}
                          onClick={() => set(it.id, a[it.id] === o ? "" : o)}
                          className={`min-h-12 rounded-[0.9rem] border px-4 py-2.5 text-left text-[0.95rem] ${a[it.id] === o ? "border-ink bg-ink text-canvas" : "border-(--edge) bg-(--raise) text-ink"}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  ) : it.type === "long" ? (
                    <textarea aria-labelledby={it.id} rows={4} value={a[it.id] ?? ""} onChange={(e) => set(it.id, e.target.value)} className="field mt-4 w-full resize-y" />
                  ) : (
                    <input aria-labelledby={it.id} value={a[it.id] ?? ""} onChange={(e) => set(it.id, e.target.value)} className="field mt-4 min-h-12 w-full" />
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={state === "sending" || !answered}
          onClick={async () => {
            setState("sending");
            const r = await sendAnswers({ name, answers: a, text }).catch(() => ({ ok: false }));
            setState(r.ok ? "sent" : "failed");
          }}
          className="btn-sand min-h-[3.25rem] rounded-[0.95rem] px-5 text-[0.98rem] font-medium disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : state === "sent" ? "Sent, thank you" : "Send my answers"}
        </button>
        <button
          type="button"
          disabled={!answered}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(`Rawdah Tours questionnaire${name ? `, ${name}` : ""}\n\n${text}`);
              setState("copied");
            } catch {
              setState("failed");
            }
          }}
          className="min-h-[3.25rem] rounded-[0.95rem] border border-(--edge) bg-(--raise) px-5 text-[0.98rem] font-medium disabled:opacity-50"
        >
          {state === "copied" ? "Copied: paste into WhatsApp" : "Copy answers for WhatsApp"}
        </button>
      </div>
      {state === "failed" ? <p role="alert" className="mt-3 text-[0.9rem] text-error">That didn’t go through. Your answers are still saved here: use “Copy answers for WhatsApp” instead.</p> : null}
      <p className="mt-4 text-[0.875rem] text-ink/62">You can come back and add more later on this phone; send again when you do.</p>
    </div>
  );
}
