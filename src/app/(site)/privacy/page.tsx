import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'
import { COMPANY, CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Rawdah Tours Ltd collects, uses and protects your personal data.',
  alternates: { canonical: '/privacy' },
}

// Adapted from the V1 privacy policy (April 2026), with the new website's
// register-interest form and service providers added.

export default function PrivacyPage() {
  // What's switched on decides what this notice says (set in Vercel; read when the site is built).
  const emailOn = Boolean(process.env.RESEND_API_KEY);
  const sheetOn = Boolean(process.env.SIGNUPS_SHEET_URL);
  const storeOn = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const formsSave = emailOn || sheetOn || storeOn;
  return (
    <LegalPage
      title="Privacy policy"
      updated="October 2026"
      intro={
        <p>
          This policy explains how {COMPANY.legalName} handles your personal data. Questions? Email {CONTACT.email} or message us on WhatsApp at{' '}
          {CONTACT.phoneDisplay}.
        </p>
      }
    >
      <LegalSection title="Who we are">
        <p>
          {COMPANY.legalName}, registered in {COMPANY.registeredIn}, {COMPANY.address}. We are responsible for the personal data described here.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <ul>
          <li>When you register interest: your name, email, phone number, how many people are travelling, where you’d travel from, and anything you tell us.</li>
          <li>When you book: the above, plus your gender, age, citizenship, emergency contact, and any health or access needs you choose to share.</li>
          <li>Where needed for visas or flights: passport details and date of birth.</li>
          <li>Payment: deposits and instalments are paid by bank transfer. This website doesn’t take card details.</li>
          <li>Anything else you send us by WhatsApp, phone or email.</li>
        </ul>
        {formsSave ? (
          <p>
            When you register your interest, we keep your details in our private list of sign-ups{emailOn ? ", email them to us, and email you a confirmation" : ""}. The private Umrah planner and the group trip form don’t send us anything by themselves: they write a message for you, and
            nothing reaches us until you send it by WhatsApp or email.
          </p>
        ) : (
          <p>
            At the moment our forms (register interest, the private Umrah planner and the group trip form) don’t send us anything by themselves. They
            write a message for you, and nothing reaches us until you choose to send it by WhatsApp or email.
          </p>
        )}
        <p>We only collect what we need to organise your trip or reply to you.</p>
      </LegalSection>

      <LegalSection title="How we use it, and why">
        <ul>
          <li>To reply to your enquiry or registration of interest (our legitimate interest in responding to you).</li>
          <li>To process your booking, take payments and send confirmations (to perform our contract with you).</li>
          <li>To arrange visas, flights, hotels and transfers on your behalf (to perform our contract with you).</li>
          <li>To contact you with important information about your trip.</li>
          <li>To email you about future journeys, only if you ticked the box to agree. You can stop these at any time.</li>
        </ul>
        <p>We never sell your data or share it with anyone for their own marketing.</p>
      </LegalSection>

      <LegalSection title="Health information">
        <p>
          Health or access needs are optional. If you share them, you’re giving us your explicit consent to use them only to look after you on the trip.
          Only our trip leaders can see them, and we keep them only as long as needed for your journey. You can withdraw this consent at any time.
        </p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>To deliver your trip, we share the minimum needed with:</p>
        <ul>
          <li>Airlines, hotels and transfer providers.</li>
          <li>Visa agents and government authorities, where required.</li>
          <li>Our ATOL-approved travel supplier, where applicable.</li>
        </ul>
        <p>
          For Hajj, you register and book on Nusuk, the official Saudi platform, yourself. We don’t send your details to Nusuk; their own privacy
          terms apply there.
        </p>
        <p>And to run this website, we use these service providers, who process data on our behalf:</p>
        <ul>
          <li>Vercel (hosting, visit counts that don’t use cookies{storeOn ? ", and storing our list of sign-ups in London" : ""})</li>
          <li>WhatsApp (Meta), when you message us there</li>
          <li>Google (Gmail{sheetOn ? ", and Google Sheets for our list of sign-ups" : ""}), when you email us{sheetOn ? " or register your interest" : ""}</li>
          {emailOn ? <li>Resend (sending your registration to us and your confirmation email)</li> : null}
        </ul>
        <p>If we start taking card payments on this website, we’ll update this notice first.</p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep your data for as long as we need it for the purposes above, or as the law requires. After your trip and any related obligations are
          complete, we delete or anonymise it, unless you’ve asked us to keep it for future trips. Registrations of interest are deleted when they’re no
          longer relevant, or sooner if you ask.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Our services are not specifically directed towards individuals under the age of 16. We do not knowingly collect personal information from
          children without appropriate authorisation. If a parent or legal guardian believes that a child’s personal information has been provided
          without appropriate consent, they should contact us so that the matter can be reviewed.
        </p>
      </LegalSection>

      <LegalSection title="Links to other websites">
        <p>
          Our website may contain links to other websites, such as Nusuk. We have no control over their content, privacy policies or practices, so
          please review their privacy policies before giving them personal information.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>You can ask to see the data we hold about you, correct it, delete it, or object to how we use it. Email {CONTACT.email}.</p>
        <p>If you’re unhappy with how we’ve handled your data, you can complain to the Information Commissioner’s Office (ico.org.uk).</p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We take reasonable steps to protect your data from unauthorised access, loss or misuse. Messages sent by WhatsApp and email are subject to those
          platforms’ security. If you think your data has been compromised, contact us straight away.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>We may update this policy. Changes are published here with a new date.</p>
      </LegalSection>
    </LegalPage>
  )
}
