import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "App terms of use",
  description: "The terms for using the Rawdah Tours app: accounts, trips and payments, group rules and contact.",
  alternates: { canonical: "/app-terms" },
};

/**
 * The Rawdah Tours app terms of use: linked from inside the app (sign-up, apply, Account → Privacy).
 * The words are copied exactly from the app team's handoff (APP_POLICY_PAGES_HANDOFF.md, 20 Nov 2026): Apple checks them
 * against the app and the review notes, so change styling only, never the wording, unless the app team agrees. Keep this
 * path (/app-terms) for good: App Store Connect and the app link to it, and Apple re-checks on every app update.
 */
export default function AppTermsPage() {
  return (
    <LegalPage
      eyebrow="Rawdah Tours app"
      title="App terms of use" updated="16 November 2026"
      intro={<p>These terms cover using the Rawdah Tours app. By creating an account you agree to them. Our <Link href="/app-privacy">app privacy policy</Link> explains how we use your information.</p>}
    >
      <LegalSection title="Your account">
        <p>Accounts are for adults aged 18 or over. Keep your password private and the details in your account accurate. You are responsible for what is done through your account. You can delete your account at any time from Account → Privacy and your data.</p>
      </LegalSection>

      <LegalSection title="Trips, bookings and payments">
        <p>Applying for a trip in the app is a request, not a confirmed booking. Rawdah reviews every application before a place is offered. The price, deposit and payment schedule are shown in the app. Each trip also has its own booking and cancellation terms: you confirm you accept them when you apply, and the version that applies to you is fixed when Rawdah approves your application. Ask us for a copy at any time. A payment counts as received only once our records confirm it.</p>
      </LegalSection>

      <LegalSection title="Group rules">
        <p>Trip groups are for the people travelling together and Rawdah’s team. Treat everyone with the respect our journeys deserve. We have zero tolerance for abusive, hateful, sexual, threatening or harassing content, spam, or sharing anyone’s private information. When you post in a group:</p>
        <ul>
          <li>Be kind and keep to the trip and the journey.</li>
          <li>Do not share other people’s personal details, documents or photos without their permission.</li>
          <li>Use Rawdah support, not the group, for anything about your own booking or payments.</li>
        </ul>
        <p>Press and hold any message to report it or to block the person who sent it. Rawdah reviews every report within 24 hours. We remove content that breaks these rules, and anyone who posts it can be removed from the group and lose their account.</p>
      </LegalSection>

      <LegalSection title="Questions for a scholar">
        <p>You can ask a scholar a question privately in the app. Answers are general guidance for your journey. If something is urgent or about your booking, contact Rawdah directly.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>For help with the app, email <a href="mailto:rawdahtours@gmail.com">rawdahtours@gmail.com</a> or message us on <a href="https://wa.me/447809281429" target="_blank" rel="noopener noreferrer">WhatsApp</a>. During a trip, use the trip phone in the app under Account → Help and emergency.</p>
      </LegalSection>
    </LegalPage>
  );
}
