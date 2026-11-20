import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "App support",
  description: "Help with the Rawdah Tours app: contact, deleting your account, reporting a problem, and the app policies.",
  alternates: { canonical: "/support" },
};

/**
 * Rawdah Tours app support: the Support URL in App Store Connect.
 * The words are copied exactly from the app team's handoff (APP_POLICY_PAGES_HANDOFF.md, 20 Nov 2026): Apple checks them
 * against the app and the review notes, so change styling only, never the wording, unless the app team agrees. Keep this
 * path (/support) for good: App Store Connect and the app link to it, and Apple re-checks on every app update.
 */
export default function AppSupportPage() {
  return (
    <LegalPage
      eyebrow="Rawdah Tours app"
      title="App support"
    >
      <LegalSection title="Contact us">
        <p>For help with the Rawdah Tours app, email <a href="mailto:rawdahtours@gmail.com">rawdahtours@gmail.com</a> or message us on <a href="https://wa.me/447809281429" target="_blank" rel="noopener noreferrer">WhatsApp</a>. During a trip, use the trip phone in the app under Account → Help and emergency.</p>
      </LegalSection>

      <LegalSection title="Delete your account">
        <p>In the app, go to <strong>Account → Privacy and your data → Delete my account</strong>. It takes effect straight away. If you can’t sign in, contact us and we’ll help.</p>
      </LegalSection>

      <LegalSection title="Report a problem in a group">
        <p>Press and hold a message to report it or to block the person who sent it. Rawdah reviews every report within 24 hours.</p>
      </LegalSection>

      <LegalSection title="Policies">
        <p>Read our <Link href="/app-privacy">app privacy policy</Link> and <Link href="/app-terms">app terms of use</Link>.</p>
      </LegalSection>
    </LegalPage>
  );
}
