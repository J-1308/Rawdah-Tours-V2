import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LegalSection } from '@/components/legal-page'
import { COMPANY, CONTACT, NUSUK_HAJJ_URL } from '@/lib/site'
import { brand } from '@/app/_site/content'

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: 'Cancellation policy and terms and conditions for trips with Rawdah Tours Ltd: deposits, payment, cancellation and travel.',
  alternates: { canonical: '/terms' },
}

// Rawdah's own Cancellation Policy and Terms and Conditions (October 2026), word for word, sent by Jibril on
// 31 Oct 2026. Their privacy section lives on /privacy. "About us", ATOL and Hajj are ours, added after.

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      updated="October 2026"
      intro={
        <p>
          These Terms and Conditions apply to all trips, packages and travel services organised and provided by Rawdah Tours. By making a booking and
          proceeding with payment, participants acknowledge that they have read, understood and agreed to them.
        </p>
      }
    >
      <LegalSection title="About us">
        <p>
          Rawdah Tours is {COMPANY.legalName}, a company registered in {COMPANY.registeredIn} (company number {brand.companyNumber.value}), with its
          registered address at {COMPANY.address}.
        </p>
      </LegalSection>

      <LegalSection title="Cancellation policy">
        <p>The following cancellation policy applies to all Rawdah Tours trips.</p>
        <p><strong>Deposits and payments</strong></p>
        <ul><li>All deposits are non-refundable.</li><li>Once the deposit has been paid, the remaining balance must be paid in full no later than 40 days before departure, unless otherwise agreed in writing by Rawdah Tours.</li></ul>
        <p><strong>Cancellations by participants</strong></p>
        <ul><li>60 days or more before departure: A 100% refund of payments made, excluding the non-refundable deposit.</li><li>40–59 days before departure: A 50% refund of payments made, excluding the non-refundable deposit. The guest’s name can be changed free of charge.</li><li>Less than 40 days before departure: No refund will be issued. A guest name change may be arranged for an additional fee.</li></ul>
        <p><strong>Replacement guests</strong></p>
        <p>If a participant finds a replacement and the replacement is confirmed before the 40-day deadline, a straightforward name change can be arranged without any funds being forfeited, subject to any applicable administrative requirements.</p>
      </LegalSection>
      <LegalSection title="1. Booking, Payment and Refund Policy">
        <p>1.1 To secure your place on a Rawdah Tours trip, a deposit is required at the time of booking. The deposit amount will be communicated during the booking process.</p>
        <p>1.2 All deposits are non-refundable. Refunds, where applicable, will be processed in accordance with the cancellation policy outlined in these Terms and Conditions.</p>
        <p>1.3 The remaining balance must be paid by the payment deadline communicated during the booking process. Full payment must be received no later than 40 days before departure, unless otherwise agreed in writing by Rawdah Tours.</p>
        <p>1.4 Failure to meet the payment deadline may result in the cancellation and forfeiture of your booking, subject to any applicable legal rights and any alternative arrangements agreed with Rawdah Tours.</p>
      </LegalSection>
      <LegalSection title="2. Cancellation Policy">
        <p>2.1 Once a deposit has been paid, the remaining balance must be paid in full no later than 40 days before departure.</p>
        <p>2.2 All deposits are non-refundable.</p>
        <p>2.3 The following cancellation terms apply:</p>
        <ul><li>60 days or more before departure: A 100% refund of payments made, excluding the deposit.</li><li>40–59 days before departure: A 50% refund of payments made, excluding the deposit. Guest name changes are permitted free of charge.</li><li>Less than 40 days before departure: No refund will be issued. Guest name changes may be arranged for an additional fee.</li></ul>
        <p>2.4 If a participant finds a suitable replacement and the replacement is confirmed before the 40-day deadline, a straightforward name change can be arranged without any funds being forfeited, subject to applicable administrative requirements.</p>
      </LegalSection>
      <LegalSection title="3. Cancellations and Changes by Rawdah Tours">
        <p>3.1 Rawdah Tours reserves the right to cancel or make changes to a trip or travel package due to unforeseen circumstances, including changes in travel regulations, political situations, safety concerns or force majeure events.</p>
        <p>3.2 Where Rawdah Tours needs to cancel or significantly change a trip, reasonable alternative arrangements will be offered where possible. Where a refund is applicable, it will be handled in accordance with the booking terms and applicable consumer protection legislation.</p>
        <p>3.3 Participants will be informed of any significant changes or cancellations as soon as reasonably practicable.</p>
      </LegalSection>
      <LegalSection title="4. Travel Documents and Requirements">
        <p>4.1 It is the participant’s responsibility to ensure that they possess valid travel documents, including a passport with a minimum validity of six months from the date of departure, where required by the destination country.</p>
        <p>4.2 Participants must comply with all relevant visa and entry requirements and provide accurate personal information and documentation for visa processing.</p>
        <p>4.3 Any additional costs, delays or consequences resulting from incorrect, incomplete or late information provided by a participant will be the participant’s responsibility.</p>
        <p>4.4 If Rawdah Tours is unable to obtain a visa for a participant, Rawdah Tours cannot guarantee entry into the destination country. Any applicable refund or alternative arrangements will be assessed in accordance with the agreed booking terms and applicable law.</p>
      </LegalSection>
      <LegalSection title="5. Travel Insurance">
        <p>5.1 Participants are strongly advised to obtain adequate travel insurance before departure.</p>
        <p>5.2 Rawdah Tours will not be responsible for costs or losses that arise solely because a participant has failed to obtain adequate travel insurance, subject to applicable law.</p>
      </LegalSection>
      <LegalSection title="6. Package Separation">
        <p>6.1 For packages that include flights, the flights and the remaining travel package are sold separately.</p>
        <p>The £399 deposit covers the flight deposit for participants purchasing a package that includes flights. The remaining payments cover the hotels, visas, transport and other services provided by Rawdah Tours.</p>
        <p>6.2 For participants purchasing a ground-only package, the £399 deposit is used towards the hotels, visas, transport and other services provided by Rawdah Tours.</p>
      </LegalSection>
      <LegalSection title="7. Health and Medical Conditions">
        <p>7.1 Participants should ensure that they are in suitable health and are physically capable of undertaking the trip and its planned activities. Participants are encouraged to consult a healthcare professional before travelling if necessary.</p>
        <p>7.2 Participants with pre-existing medical conditions, mobility requirements or specific dietary requirements must inform Rawdah Tours at the time of booking so that reasonable arrangements can be considered, where feasible.</p>
        <p>7.3 Participants are responsible for bringing any necessary medication and medical supplies required during the trip.</p>
      </LegalSection>
      <LegalSection title="8. Code of Conduct">
        <p>8.1 Participants are expected to respect Islamic values, local customs, cultural practices and the laws of the countries they visit throughout the journey.</p>
        <p>8.2 Rawdah Tours reserves the right to take appropriate action, including terminating a participant’s involvement in a trip, where their behaviour is seriously disruptive, inappropriate or adversely affects the safety, wellbeing or experience of other participants.</p>
        <p>8.3 Any action taken under this section will be subject to applicable law and the circumstances of the situation.</p>
      </LegalSection>
      <LegalSection title="9. Limitation of Liability">
        <p>Rawdah Tours and its affiliates will not be responsible for losses, damages, injuries, delays or inconveniences arising from circumstances beyond their reasonable control.</p>
        <p>This includes, but is not limited to, loss or damage to personal belongings, personal health issues, transportation delays, cancellations by third-party providers and other unforeseen circumstances.</p>
        <p>Nothing in these Terms and Conditions excludes or limits any liability that cannot legally be excluded or limited under applicable law.</p>
      </LegalSection>
      <LegalSection title="10. Room Allocation">
        <p>10.1 Rawdah Tours will make reasonable efforts to accommodate participants who know one another in shared rooms, subject to availability and any specific requests made during the booking process.</p>
        <p>10.2 Participants wishing to share a room with specific individuals should indicate their preferences on the booking form or contact Rawdah Tours directly at:</p>
        <p><a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">{CONTACT.email}</a></p>
        <p>Although every effort will be made to fulfil rooming requests, these cannot be guaranteed and remain subject to hotel availability.</p>
        <p>10.3 Some hotel rooms may contain additional roll-out beds or beds that are smaller than standard full-size beds. This will depend on the hotel’s room configuration and arrangements.</p>
        <p>Rawdah Tours will work with accommodation providers to ensure reasonable standards are maintained. However, the final provision and configuration of beds remain subject to the hotel’s facilities and availability.</p>
      </LegalSection>
      <LegalSection title="11. Extra Activities and Meals">
        <p>11.1 Unless explicitly stated as included in the package, any additional activities, excursions, meals or other optional services will be at the participant’s own expense.</p>
        <p>11.2 Breakfast is included where specified in the relevant package. Any additional meals or payable activities will incur an extra cost should participants wish to take part.</p>
      </LegalSection>
      <LegalSection title="12. Governing Law and Jurisdiction">
        <p>12.1 These Terms and Conditions shall be governed by and interpreted in accordance with the laws of the United Kingdom.</p>
        <p>12.2 Any disputes arising from or in connection with these Terms and Conditions shall be subject to the jurisdiction of the courts of the United Kingdom, subject to any applicable consumer rights and legal protections.</p>
      </LegalSection>
      <LegalSection title="13. Force Majeure">
        <p>Rawdah Tours shall not be held responsible for delays, changes or cancellations caused by circumstances beyond its reasonable control.</p>
        <p>Such circumstances may include, but are not limited to:</p>
        <ul><li>Natural disasters and extreme weather conditions.</li><li>Acts of terrorism or civil unrest.</li><li>Political instability or government restrictions.</li><li>Changes in travel regulations or entry requirements.</li><li>Pandemics, epidemics or public health emergencies.</li><li>Other unforeseen events that make it impossible or unsafe to carry out the trip.</li></ul>
        <p>Where such circumstances arise, Rawdah Tours will make reasonable efforts to communicate with affected participants and explore suitable alternative arrangements, subject to the applicable booking terms and legal obligations.</p>
      </LegalSection>
      <LegalSection title="14. Privacy">
        <p>
          How we collect, use and protect your personal information is set out in our{' '}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="15. Severability">
        <p>If any provision of these Terms and Conditions is found to be invalid, illegal or unenforceable, the remaining provisions shall continue in full force and effect.</p>
      </LegalSection>
      <LegalSection title="16. Amendments">
        <p>Rawdah Tours reserves the right to amend, update or modify these Terms and Conditions when necessary.</p>
        <p>Any updated Terms and Conditions will be made available to participants, and any changes will take effect in accordance with applicable law.</p>
        <p>Participants are encouraged to review these Terms and Conditions periodically.</p>
      </LegalSection>

      <LegalSection title="ATOL protection">
        <p>
          Our Umrah trips are ATOL protected (ATOL 5311). When you book, you’ll receive an ATOL certificate setting out the protection that applies. If
          you’re unsure what protection applies, contact us or see the Civil Aviation Authority’s website.
        </p>
      </LegalSection>

      <LegalSection title="Hajj">
        <p>
          Hajj packages are booked and paid for directly on the official{' '}
          <a href={NUSUK_HAJJ_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            Nusuk Hajj platform
          </a>
          . Rawdah Tours does not take payment for Hajj packages, and ATOL does not apply to them. The price, services, eligibility, availability,
          cancellation and change terms of a Hajj package are set by Nusuk and its authorised providers, and their terms apply to your Hajj booking.
        </p>
        <p>
          Registering your interest with us is not a booking and does not reserve a place or commit you to anything. Our role is to help you compare the
          options, prepare you before you travel, and support the group during Hajj.
        </p>
      </LegalSection>

      <LegalSection title="Final acknowledgement">
        <p>Please ensure that you carefully read and understand these Terms and Conditions before making a booking with Rawdah Tours.</p>
        <p>If you have any questions or require further clarification, please contact our team at {CONTACT.email}.</p>
        <p>By proceeding with a booking and making payment, you acknowledge that you have read, understood and agreed to these Terms and Conditions and the applicable Cancellation Policy.</p>
      </LegalSection>
    </LegalPage>
  )
}
