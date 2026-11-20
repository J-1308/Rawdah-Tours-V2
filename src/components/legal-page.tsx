import type { ReactNode } from "react";

import { Label } from "@/app/_site/shell";
import { Container } from "./ui";

/** `eyebrow`: the small label over the title ("Legal" unless set; the app pages say "Rawdah Tours app"). `updated` is
 * optional (the app support page has no date). Links in the text are underlined so they read as links. */
export function LegalPage({ title, updated, intro, eyebrow = "Legal", children }: { title: string; updated?: string; intro?: ReactNode; eyebrow?: string; children: ReactNode }) {
  return (
    <Container className="bg-canvas py-[clamp(3.5rem,8vw,7rem)]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <Label>{eyebrow}</Label>
          <h1 className="mt-4 display text-[clamp(2.8rem,5.6vw,4.6rem)]">{title}</h1>
          {updated ? <p className="mt-4 text-[0.86rem] text-ink/65">Last updated {updated}</p> : null}
        </header>
        <div className="max-w-[42rem] lg:col-span-7 lg:col-start-6">
          {intro ? <div className="mb-10 font-editorial text-[1.45rem] leading-[1.45] [&_a]:underline [&_a]:decoration-ink/35 [&_a]:underline-offset-4">{intro}</div> : null}
          <div className="space-y-10">{children}</div>
        </div>
      </div>
    </Container>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ink/10 pt-7">
      <h2 className="display text-[1.8rem]">{title}</h2>
      <div className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-ink/80 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2 [&_strong]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:decoration-ink/35 [&_a]:underline-offset-4 hover:[&_a]:decoration-ink">{children}</div>
    </section>
  );
}
