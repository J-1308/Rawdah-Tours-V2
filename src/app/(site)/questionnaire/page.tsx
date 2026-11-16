import type { Metadata } from "next";

import { QuestionnaireForm } from "@/app/_site/questionnaire-form";
import { Chapter, gutter, Heading } from "@/app/_site/shell";

export const metadata: Metadata = { title: "Questions for Rawdah Tours", robots: { index: false, follow: false } };

/** The client questionnaire (src/app/_site/questionnaire.ts). Not linked anywhere; kept out of search. */
export default function QuestionnairePage() {
  return (
    <Chapter tone="day">
      <section className={`mx-auto max-w-[52rem] py-[clamp(3rem,8vw,6rem)] ${gutter}`}>
        <Heading as="h1" className="text-[clamp(2.4rem,6vw,3.8rem)]">
          Questions for Rawdah Tours
        </Heading>
        <p className="mt-4 max-w-[36rem] text-[1rem] leading-[1.65] text-ink/72">
          Everything we still need to finish the website. Answer what you can; skip anything you’re not sure of. Most take a tap.
        </p>
        <div className="mt-10">
          <QuestionnaireForm />
        </div>
      </section>
    </Chapter>
  );
}
