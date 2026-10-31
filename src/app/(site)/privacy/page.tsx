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
          <li>Payment: card payments are handled by Stripe. We don’t see or store your card details.</li>
          <li>Anything else you send us by WhatsApp, phone or email.</li>
        </ul>
        <p>
          The private Umrah planner and the group trip form don’t send us anything by themselves. They write a message for you, and nothing reaches us
          until you choose to send it by WhatsApp or email.
        </p>
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
          <li>Vercel (hosting, and visit counts that don’t use cookies)</li>
          <li>Supabase (storing enquiries and bookings)</li>
          <li>Stripe (card payments)</li>
          <li>Resend (sending emails)</li>
        </ul>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep your data for as long as we need it for the purposes above, or as the law requires. After your trip and any related obligations are
          complete, we delete or anonymise it, unless you’ve asked us to keep it for future trips. Registrations of interest are deleted when they’re no
          longer relevant, or sooner if you ask.
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
