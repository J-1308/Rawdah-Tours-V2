import type { ReactNode } from "react";

import { Label } from "@/app/_site/shell";
import { Container } from "./ui";

/** A calm single-column page for confirmations, errors and short messages. */
export function NoticePage({ title, children, status }: { title: string; children: ReactNode; status?: ReactNode }) {
  return (
    <Container className="bg-canvas py-[clamp(3.25rem,9vw,8rem)]">
      <div className="max-w-[40rem]">
        {status ? <Label>{status}</Label> : null}
        <h1 className="mt-4 display text-[clamp(2.8rem,5.6vw,4.6rem)]">{title}</h1>
        <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink/75">{children}</div>
      </div>
    </Container>
  );
}
