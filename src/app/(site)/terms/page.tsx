import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LegalSection } from '@/components/legal-page'
import { COMPANY, CONTACT, NUSUK_HAJJ_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: 'Terms and conditions for booking with Rawdah Tours Ltd: deposits, payment, cancellation and travel.',
  alternates: { canonical: '/terms' },
}

// Adapted from the V1 terms (April 2026). Trip-specific prices and dates now
// live with each trip and are confirmed at booking. The Hajj section is new.

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      updated="October 2026"
      intro={
        <p>
          Please read these terms before booking. By making a booking with {COMPANY.legalName}, you agree to them. They apply to everyone travelling on the
          booking.
        </p>
      }
    >
      <LegalSection title="1. About us">
        <p>
          These terms apply to {COMPANY.legalName}, a company registered in {COMPANY.registeredIn}, with its registered address at {COMPANY.address}.
          “We”, “us” and “our” mean {COMPANY.legalName}.
        </p>
      </LegalSection>

      <LegalSection title="2. Booking and payment (Umrah)">
        <p>
          To reserve a place on a trip, a deposit is required per person. The deposit amount, room prices, what the package includes and the payment
          schedule for the balance are shown when you book and confirmed in writing. Your booking is confirmed once we have received your deposit and sent
          you a written confirmation.
        </p>
        <p>
          Deposits can be paid online by card, which carries a card processing fee shown before you pay, or by bank transfer with no fee. The balance is
          payable in instalments and must be paid in full by the date in your schedule. If payment isn’t completed by then, we may cancel the booking, in
          which case the cancellation terms in section 4 apply.
        </p>
      </LegalSection>

      <LegalSection title="3. Hajj">
        <p>
          Hajj packages are booked and paid for directly on the official{' '}
          <a href={NUSUK_HAJJ_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Nusuk Hajj platform
          </a>
          . Rawdah Tours does not take payment for Hajj packages. The price, services, eligibility, availability, cancellation and change terms of a Hajj
          package are set by Nusuk and its authorised providers, and their terms apply to your Hajj booking.
        </p>
        <p>
          Registering your interest with us is not a booking and does not reserve a place or commit you to anything. Our role is to help you choose a
          package, prepare you before you travel, and support the group during Hajj.
        </p>
      </LegalSection>

      <LegalSection title="4. Cancellation by you">
        <p>
          All cancellation requests must be made in writing to{' '}
          <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">
            {CONTACT.email}
          </a>
          . Unless your booking confirmation says otherwise, the following applies:
        </p>
        <ul>
          <li>
            <strong>60 or more days before departure:</strong> up to 100% refund of amounts paid beyond the deposit, subject to amounts recovered from
            suppliers. Name changes are free.
          </li>
          <li>
            <strong>40 to 59 days before departure:</strong> up to 50% refund of amounts paid beyond the deposit, subject to amounts recovered from suppliers.
            Name changes are free.
          </li>
          <li>
            <strong>Less than 40 days before departure:</strong> no refund. Name changes are subject to an administration fee and any costs charged by
            suppliers.
          </li>
        </ul>
        <p>
          These percentages are the maximum. Costs already paid to suppliers that are not returned to us are deducted from any refund. Visa fees are not
          refundable in any circumstances: once a visa is issued, it is in the traveller’s name.
        </p>
        <p>
          The deposit is generally not refundable. If we recover refundable amounts from suppliers in connection with your cancellation, we may pass them on
          to you in whole or in part.
        </p>
      </LegalSection>

      <LegalSection title="5. Changes or cancellation by us">
        <p>
          We may need to change the itinerary, accommodation, transport or programme for reasons outside our control or for operational reasons. If a change
          is significant, we will tell you as soon as reasonably possible.
        </p>
        <p>
          If we have to cancel a trip in whole or in part, any refund depends on the amounts we recover from suppliers, including airlines and hotels. We pass
          on what we recover. Costs already incurred and not refunded to us, such as transport, administrative charges and visa fees, are not refundable. We
          are not liable for costs you arranged independently, such as insurance premiums or separate travel.
        </p>
      </LegalSection>

      <LegalSection title="6. Passports and visas">
        <p>
          You are responsible for holding a valid passport. Saudi Arabia requires at least six months’ validity remaining at the time of travel. Visa support
          is included in our Umrah packages and we will guide you through the process, but approval is at the discretion of the authorities. We cannot
          guarantee a visa and are not liable if one is refused, provided we acted in good faith with the information you gave us.
        </p>
      </LegalSection>

      <LegalSection title="7. Travel insurance">
        <p>
          We strongly advise comprehensive travel insurance covering medical emergencies, repatriation, cancellation and personal liability. We do not
          provide insurance and are not liable for costs a policy would normally cover.
        </p>
      </LegalSection>

      <LegalSection title="8. ATOL protection">
        <p>
          Where flights and accommodation are arranged through ATOL-approved suppliers, the protection that applies is set out in your booking documents. For
          our 2026 Umrah trips, ATOL protection (no. 5311) was provided by Polani Travel Ltd. If you’re unsure what protection applies, contact us or see the
          Civil Aviation Authority’s website.
        </p>
      </LegalSection>

      <LegalSection title="9. Rooms">
        <p>
          Rooms are allocated by the room type chosen when booking, subject to availability. Travellers share with travellers of the same gender unless
          booking together. Tell us about rooming preferences when you book and we’ll do our best to meet them, but we can’t guarantee specific rooms.
        </p>
      </LegalSection>

      <LegalSection title="10. Activities">
        <p>
          Some optional activities carry physical risk. Taking part is voluntary and at your own risk; please consider your fitness first. We are not liable
          for injury or loss arising from voluntary participation.
        </p>
      </LegalSection>

      <LegalSection title="11. Health">
        <p>
          You are responsible for being fit to travel. If you have a medical condition, speak to your doctor before booking and tell us about anything that
          may affect your participation or need special arrangements.
        </p>
      </LegalSection>

      <LegalSection title="12. Conduct">
        <p>
          We expect everyone to travel with respect and dignity, in keeping with the journey and the sanctity of the holy cities. We may remove from the group,
          without refund, anyone whose behaviour is disruptive, disrespectful or harmful to others.
        </p>
      </LegalSection>

      <LegalSection title="13. Our liability">
        <p>
          Our liability to you is limited to the total amount you paid us for the trip. We are not liable for indirect or consequential losses, or for losses
          caused by events outside our reasonable control. Nothing in these terms limits liability for death or personal injury caused by our negligence, or
          any other liability that cannot be excluded by law.
        </p>
      </LegalSection>

      <LegalSection title="14. Events outside our control">
        <p>
          We are not liable for failing to perform our obligations because of circumstances outside our reasonable control, including natural disasters, acts
          of government, pandemics, civil unrest and airline disruption. We will take reasonable steps to find alternatives and keep you informed.
        </p>
      </LegalSection>

      <LegalSection title="15. Privacy">
        <p>
          We handle your personal data as described in our{' '}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>
          , in line with UK data protection law.
        </p>
      </LegalSection>

      <LegalSection title="16. Changes to these terms">
        <p>We may update these terms. Changes are published here with a new date and do not affect bookings already confirmed.</p>
      </LegalSection>

      <LegalSection title="17. Governing law">
        <p>These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.</p>
      </LegalSection>
    </LegalPage>
  )
}
