import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Chapter, Emblem, Logo } from "@/app/_site/shell";
import { GATE_COOKIE, GATE_MAX_AGE, gateOn, gateToken, passwordMatches, safeNext } from "@/lib/server/site-gate";

export const metadata: Metadata = { title: "Private for now", robots: { index: false, follow: false } };

async function enter(formData: FormData) {
  "use server";
  const next = safeNext(formData.get("next"));
  if (!passwordMatches(String(formData.get("password") ?? ""))) redirect(`/gate?wrong=1${next !== "/" ? `&next=${encodeURIComponent(next)}` : ""}`);
  (await cookies()).set(GATE_COOKIE, gateToken(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: GATE_MAX_AGE });
  redirect(next);
}

/** The site password page (src/lib/server/site-gate.ts). */
export default async function Gate({ searchParams }: { searchParams: Promise<{ next?: string; wrong?: string }> }) {
  const { next, wrong } = await searchParams;
  if (!gateOn()) redirect(safeNext(next));
  return (
    <Chapter tone="top" className="wash-hero relative grid min-h-svh place-items-center overflow-hidden px-5 py-16">
      <Emblem className="watermark pointer-events-none absolute top-1/2 left-1/2 h-[120%] -translate-x-1/2 -translate-y-1/2" />
      <div className="glass relative w-full max-w-[24rem] rounded-[1.75rem] p-6 text-center sm:p-8">
        <Logo className="mx-auto h-14" />
        <h1 className="display mt-7 text-[2rem] leading-tight">Private for now</h1>
        <p className="mt-2 text-[0.95rem] leading-[1.6] text-ink/70">Enter the password to see the Rawdah Tours website.</p>
        <form action={enter} className="mt-6 grid gap-3 text-left">
          <input type="hidden" name="next" value={safeNext(next)} />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            aria-invalid={wrong ? true : undefined}
            aria-describedby={wrong ? "wrong" : undefined}
            className="field"
            placeholder="Password"
          />
          {wrong ? (
            <p id="wrong" className="text-[0.88rem] text-error">
              That password isn’t right. Try again.
            </p>
          ) : null}
          <button type="submit" className="btn-sand min-h-12 rounded-[0.95rem] px-5 text-[0.95rem] font-medium">
            Enter
          </button>
        </form>
      </div>
    </Chapter>
  );
}
