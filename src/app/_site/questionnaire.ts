/**
 * Everything still to ask Rawdah, as one questionnaire the client fills in on their phone (/questionnaire).
 * Answers save on the device as they type; "Send" stores them in the private Blob store (answers/) and emails
 * Rawdah's team if email is set up; "Copy answers" gives a numbered list for WhatsApp. When answers come back,
 * each one maps to content.ts (see `goes`). Built 16 Nov 2026.
 */
export type QItem = {
  id: string;
  q: string;
  /** What we know already, for them to confirm or correct. */
  known?: string;
  /** Tap answers; "long" or "short" for a typed answer. */
  type: "short" | "long" | string[];
  /** Where the answer goes on the site. */
  goes: string;
};

export const questionnaire: { title: string; intro: string; items: QItem[] }[] = [
  {
    title: "Your story",
    intro: "For the “How it all began” section on the About page. Your own words are best; we’ll tidy them, never add facts.",
    items: [
      { id: "story-start", q: "When did Rawdah Tours start, and how did it begin?", type: "long", goes: "About: How it all began" },
      { id: "story-why", q: "Why did Brother Ayuub and Ustadh Issa start it? What did you want to do differently?", type: "long", goes: "About: How it all began" },
      { id: "story-moment", q: "One moment from a trip that sums up what Rawdah is about.", type: "long", goes: "About: How it all began" },
      { id: "years", q: "How many years have you been taking groups?", type: "short", goes: "Trust box" },
      { id: "pilgrims", q: "Roughly how many pilgrims have travelled with you in total?", type: "short", goes: "Trust box (only shown if you give a number)" },
      { id: "based", q: "Where is Rawdah run from day to day?", known: "Registered office: 66 Paul Street, London. The About page says “Based in Birmingham”.", type: "short", goes: "About page" },
    ],
  },
  {
    title: "Teachers and team",
    intro: "Who travels with the group, written the way each person wants.",
    items: [
      { id: "ustadhs-graduates", q: "The site says “certified ustadhs”. Should it also say “graduates of Islamic universities”? Only if it’s true of everyone who teaches.", type: ["Yes, add it", "No, keep “certified ustadhs”"], goes: "Home, trip pages" },
      { id: "abdulrahman-bio", q: "A short bio for Ustadh Abdulrahman Hassan that he’s happy with.", type: "long", goes: "Guest sheikh card" },
      { id: "yahya-bio", q: "Sheikh Yahya Rabi: a short bio, and his name and title exactly as he wants them written.", type: "long", goes: "Ramadan 1448 page" },
      { id: "yahya-photo", q: "Can GGC or the sheikh send 1–2 photos of him for the site (a portrait, and one teaching)?", type: ["Yes, sending them", "Not yet"], goes: "Ramadan 1448 page" },
      { id: "on-ground", q: "Who else is on the ground with the group (for example a sisters’ lead or a first-aider)?", type: "long", goes: "Trip pages: who travels with you" },
    ],
  },
  {
    title: "Booking and payments",
    intro: "How people pay, and the ways they can reach you.",
    items: [
      { id: "card-deposits", q: "Do you want card deposits online, through Stripe?", type: ["Yes, set it up", "Not yet: WhatsApp and bank transfer for now"], goes: "Book your place button" },
      { id: "instalments", q: "How many instalments after the deposit, and when?", known: "Ramadan 1448: 30 November, 31 December, 20 January (final).", type: "short", goes: "Payment plan" },
      { id: "child-price", q: "Is there a children’s price? If so, what?", type: "short", goes: "Prices" },
      { id: "call-link", q: "For “Book a call” in the forms: do you have a Calendly or Cal.com link, or shall we make one?", type: ["We have one (paste below)", "Please make one", "No calls, WhatsApp only"], goes: "Form endings" },
      { id: "call-link-url", q: "If you have one, paste the booking link here.", type: "short", goes: "Form endings" },
      { id: "secure-spot", q: "You liked “Register interest to secure my spot”, but registering doesn’t reserve a place. Which should the button say?", type: ["Register interest to be first in line", "Register interest and hear first", "“Secure my spot” only where a deposit secures it"], goes: "Buttons" },
    ],
  },
  {
    title: "Hajj 2027",
    intro: "So the Hajj page only promises what you do.",
    items: [
      { id: "hajj-community", q: "Do you run a WhatsApp group for people who register for Hajj?", type: ["Yes", "No"], goes: "Hajj page" },
      { id: "hajj-sessions", q: "Will you hold sessions or webinars to guide people through Nusuk and choosing the package?", type: ["Yes", "No", "Not decided"], goes: "Hajj page" },
      { id: "hajj-fee", q: "Do you charge anything for Hajj registration and guidance? If yes, how much and when?", type: "short", goes: "Hajj page, terms" },
    ],
  },
  {
    title: "Ramadan 1448 with GGC",
    intro: "For the full page and the countdown.",
    items: [
      { id: "ramadan-public", q: "Can the full Ramadan page go public now, instead of “Coming soon”?", type: ["Yes, go public", "Not yet"], goes: "Ramadan page" },
      { id: "early-bird-end", q: "When does the early-bird price end? (For the countdown: it must be a real date.)", type: "short", goes: "Countdown" },
      { id: "booking-close", q: "When does booking close?", type: "short", goes: "Ramadan page" },
      { id: "ramadan-details", q: "Please confirm: flight times; is the Haramain train included; are Iftar and Suhoor included?", known: "Saudia from London Heathrow; Novotel Thakher City Makkah (9 nights) and Al Manakha Rotana Madinah (4 nights).", type: "long", goes: "Ramadan page" },
      { id: "ggc-extras", q: "Can the seminar, the Eid presents and the videography go on the page?", type: ["Yes, all of them", "Some (say which below)", "Not yet"], goes: "Ramadan page" },
      { id: "ggc-extras-note", q: "Anything to add about those?", type: "short", goes: "Ramadan page" },
    ],
  },
  {
    title: "Terms and conditions",
    intro: "Some of these are required by UK travel law. A solicitor or your ATOL provider should check the final wording.",
    items: [
      { id: "t-rawdah-cancels", q: "If Rawdah cancels a trip, the law says the traveller gets everything back, deposit included, within 14 days. Happy for the terms to say that?", type: ["Yes", "Let’s discuss"], goes: "Terms" },
      { id: "t-under-40", q: "If someone cancels under 40 days before departure (no refund now), would you refund anything you recover, like a resold room or seat?", type: ["Yes", "No", "Let’s discuss"], goes: "Terms" },
      { id: "t-name-fee", q: "Name-change fee under 40 days before departure?", type: "short", goes: "Terms" },
      { id: "t-refund-time", q: "How quickly are refunds paid once due?", type: ["Within 14 days", "Within 30 days", "Other (say below)"], goes: "Terms" },
      { id: "t-minimum", q: "Would you ever cancel a trip because too few people booked? If yes, the minimum number and the date you’d decide.", type: "short", goes: "Terms" },
      { id: "t-visa", q: "If someone’s visa is refused, what do they get back?", type: "short", goes: "Terms" },
      { id: "t-insurance", q: "Travel insurance:", type: ["Required", "Recommended"], goes: "Terms, booking form" },
      { id: "t-package", q: "Are flights and hotels sold together as one package with an ATOL certificate?", known: "The current terms say they’re “sold separately”, which clashes with the ATOL wording.", type: ["Yes, one package", "Sold separately", "Not sure"], goes: "Terms" },
      { id: "t-ground", q: "Ground-only packages aren’t covered by ATOL. How is that money protected (bond, insurance or trust account)?", type: "short", goes: "Terms" },
      { id: "t-ggc", q: "For Ramadan 1448, whose terms and ATOL apply?", type: ["Rawdah’s", "GGC’s", "Not sure"], goes: "Terms, Ramadan page" },
      { id: "t-complaints", q: "How should someone raise a complaint?", known: "Suggested: tell the team on the ground first, then email within 28 days of getting home.", type: ["Use the suggestion", "Different (say below)"], goes: "Terms" },
      { id: "t-photos", q: "Can the terms say Rawdah may photograph and film trips for the website and social media, with anyone able to opt out (and a parent’s OK for children)?", type: ["Yes", "No"], goes: "Terms" },
      { id: "t-tickbox", q: "Should travellers tick a box agreeing to the terms before they pay?", type: ["Yes", "No"], goes: "Booking form" },
    ],
  },
  {
    title: "Reviews and photos",
    intro: "Real ones only: UK law bans invented reviews.",
    items: [
      { id: "reviews-link", q: "Do you have Google reviews (or similar) we can show? Paste the link.", type: "short", goes: "Trust box (rating and count)" },
      { id: "v1-quotes", q: "The three quotes on your first website (Brother Abdullah, Yusuf, Hamza): are they from real travellers, happy to be shown?", type: ["Yes, real", "No, leave them off"], goes: "Reviews section" },
      { id: "sister-photos", q: "Do you have more photos of sisters and families, with their permission?", type: ["Yes, sending them", "Not yet"], goes: "Photos across the site" },
      { id: "anything-else", q: "Anything else you’d like changed or added?", type: "long", goes: "Anywhere" },
    ],
  },
];
