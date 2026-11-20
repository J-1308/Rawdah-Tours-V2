import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "App privacy policy",
  description: "What the Rawdah Tours app collects, why, who processes it, how long it is kept, and your choices.",
  alternates: { canonical: "/app-privacy" },
};

/**
 * The Rawdah Tours app privacy policy: the Privacy Policy URL in App Store Connect, and linked from inside the app.
 * The words are copied exactly from the app team's handoff (APP_POLICY_PAGES_HANDOFF.md, 20 Nov 2026): Apple checks them
 * against the app and the review notes, so change styling only, never the wording, unless the app team agrees. Keep this
 * path (/app-privacy) for good: App Store Connect and the app link to it, and Apple re-checks on every app update.
 */
export default function AppPrivacyPage() {
  return (
    <LegalPage
      eyebrow="Rawdah Tours app"
      title="App privacy policy" updated="20 November 2026"
      intro={<p>This policy covers the Rawdah Tours app. It explains what the app collects, why, who helps us process it, how long we keep it, and your choices. Our <Link href="/privacy">website privacy policy</Link> covers enquiries made through this website.</p>}
    >
      <LegalSection title="Who we are">
        <p>Rawdah Tours Ltd is the data controller for information in the app. For privacy questions or requests, email <a href="mailto:rawdahtours@gmail.com">rawdahtours@gmail.com</a> or contact us on <a href="https://wa.me/447809281429" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
      </LegalSection>

      <LegalSection title="What the app collects and why">
        <p>You can browse trips without an account. When you create an account, apply for a trip or travel with us, we collect only what we need to run your journey:</p>
        <ul>
          <li><strong>Your account:</strong> name, email address, mobile number (optional), password (stored only in encrypted form) and whether you travel with the brothers’ or sisters’ group, so we can place you in the right trip group.</li>
          <li><strong>Your booking and travellers:</strong> the trip and package you choose, and for each traveller their legal name, relationship to you, date of birth, nationality, flight and room preferences.</li>
          <li><strong>Travel documents:</strong> passport details, a passport image, a personal photograph, declarations and travel insurance acknowledgement. Where a trip needs them, also a vaccination certificate and the progress of the visa that we apply for on your behalf. We need these to arrange visas, flights and accommodation.</li>
          <li><strong>Emergency contacts</strong> for each traveller, so we can reach someone if something happens during the trip.</li>
          <li><strong>Health and access needs (optional):</strong> dietary needs and accessibility needs, if you choose to share them so we can make arrangements. This is health information, so we use it only with your explicit consent and only for your trip.</li>
          <li><strong>Payments:</strong> your payment schedule, the payments you make and their receipts. Card payments are handled by Stripe; we never see or store your full card number. For bank transfers, we record the amount, date and reference you give us.</li>
          <li><strong>Messages and feedback:</strong> messages you post in trip groups or to Rawdah support, questions you ask a scholar, reports of messages, and any feedback you send after a trip.</li>
        </ul>
        <p>The app does not collect your location, contacts or browsing history. It has no advertising, analytics or tracking tools, and we do not sell your information or use it to track you across other apps or websites.</p>
      </LegalSection>

      <LegalSection title="Our legal basis">
        <p>We use your information to provide the trip you book with us (performance of a contract), to meet legal and accounting obligations, and for our legitimate interest in running safe, well-organised group travel. Optional health and access needs are used with your explicit consent, which you can withdraw at any time by contacting us.</p>
      </LegalSection>

      <LegalSection title="Who can see your information">
        <ul>
          <li>Your travel documents can be seen only by you, the lead booker on your booking, and authorised Rawdah staff.</li>
          <li>Payment records are visible only to you, the lead booker and Rawdah’s owners, administrators and finance staff.</li>
          <li>When Rawdah staff open a traveller’s health or access notes, the view is recorded in an audit log.</li>
          <li>Members of your trip group see your name and the messages you post there. They do not see your booking, payments or documents.</li>
          <li>Scholars see only the questions assigned to them. They have no access to bookings, payments or documents.</li>
          <li>We share what is needed with the airlines, hotels, transport providers and Saudi authorities that make your journey possible, for example to apply for your visa.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Service providers">
        <p>Supabase stores the app’s data and your uploaded files, with access controlled by your account. Stripe processes card payments. Apple provides the App Store. Each processes information under its own terms; see <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase’s privacy notice</a> and <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer">Stripe’s privacy policy</a>. Some providers may process information outside the UK under the safeguards set out in their data processing terms.</p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>We keep your information while you have an account and for as long as we need it to run your trip and deal with any questions afterwards. Booking and payment records are kept for as long as UK law requires us to keep accounting records. Other information is deleted or anonymised when it is no longer needed.</p>
      </LegalSection>

      <LegalSection title="Deleting your account">
        <p>You can delete your account in the app at any time: <strong>Account → Privacy and your data → Delete my account</strong>. This removes your login, your passport files and other uploaded documents, health and access notes, emergency contacts, unsent applications, your messages in trip groups and your messages to the scholar. Deleting your account doesn’t cancel a booking: we keep the booking and payment records we must keep by law, and we may contact you about a booking that is still open. To cancel a booking, message us first.</p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>You can ask for a copy of your information, ask us to correct or erase it, or ask us to restrict or object to its use. Where the legal conditions apply, you can also request data portability. To make a request, email <a href="mailto:rawdahtours@gmail.com">rawdahtours@gmail.com</a>. You can also complain to the <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Information Commissioner’s Office (ICO)</a>.</p>
      </LegalSection>

      <LegalSection title="Children">
        <p>Accounts are for adults. A parent or guardian can add children as travellers on their own booking and provides their details on their behalf.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>We may update this policy when the app or our use of information changes. The date at the top shows when it was last revised.</p>
      </LegalSection>
    </LegalPage>
  );
}
