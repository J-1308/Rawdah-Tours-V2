/**
 * Every word and number on the site lives here; components only lay it out.
 * Filled only from Rawdah's own sources, in Rawdah's own words. Nothing is
 * carried over from The Umrah Company site (see docs/adr/0001).
 *
 * Each value carries a status, and the page marks the ones that aren't yet
 * Rawdah's to publish:
 *
 * - confirmed   — Rawdah said it or published it (V1 site, live Hajj page, posters)
 * - evidenced   — supported by Rawdah's own material but not yet approved for this site
 * - draft       — our wording of a known fact
 * - proposed    — OUR SUGGESTION (a price, plan or service). Tag: Suggested
 * - to confirm  — a fact only Rawdah can give (protection, policies). Tag: To confirm
 * - sample      — illustrative text, never a real person's words. Tag: Sample
 *
 * Sources, cited beside each value:
 *   V1     J-1308/Rawdahtoursw-website (homepage, FAQ, about, terms of April 2026, lib/pricing.ts)
 *   LIVE   rawdahtours.co.uk, the Hajj 2027 page (read 24 Oct 2026)
 *   POSTER Path of Purity II poster and hotel posters (V1 public/images)
 *   PHOTOS Rawdah's trip photographs, supplied by Jibril on 24 Oct 2026
 *
 * Nothing marked proposed, to confirm or sample may reach the live domain.
 */

import { getTrip } from "@/lib/trips";

export type Status = "confirmed" | "evidenced" | "draft" | "proposed" | "to confirm" | "sample";

/** A value with its status. */
export type V<T = string> = { value: T; status: Status };
export const v = <T,>(value: T, status: Status): V<T> => ({ value, status });

/* ------------------------------------------------------------------------ */
/* Brand                                                                     */
/* ------------------------------------------------------------------------ */

export const brand = {
  name: "Rawdah Tours",
  legalName: "Rawdah Tours Ltd",
  /** V1 lib/constants.ts and LIVE footer. */
  whatsapp: "447809281429",
  phone: { display: "+44 7809 281429", href: "tel:+447809281429" },
  email: "rawdahtours@gmail.com",
  /** POSTER: @rawdahtours. */
  instagram: { handle: "@rawdahtours", href: "https://www.instagram.com/rawdahtours/" },
  /** V1 terms and privacy notice (April 2026). Company number not yet given. */
  address: "5 Sir Denis Drive, Birmingham, England, B9 5DU",
  companyNumber: v("To be added", "to confirm"),
  nusuk: "https://hajj.nusuk.sa/?language=en",
} as const;

export const wa = (text: string) => `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;

/** WhatsApp openers, in Rawdah's voice. */
export const say = {
  general: "Salaam Rawdah Tours, I’ve got a question.",
  hajj: "Salaam Rawdah Tours, I’d like to register for Hajj 2027.",
  nextUmrah: "Salaam Rawdah Tours, please let me know when the next Umrah trip is out.",
  private: "Salaam Rawdah Tours, I’m planning a private Umrah.",
  group: "Salaam Rawdah Tours, I’d like to talk about a trip for our group.",
  pay: "Salaam Rawdah Tours, I’ve got a question about paying for a trip.",
};

/* ------------------------------------------------------------------------ */
/* Navigation and routes                                                     */
/* ------------------------------------------------------------------------ */

export const routes = {
  trips: "/trips",
  hajj: "/trips/hajj-2027",
  nextUmrah: "/trips/next-umrah",
  lastTrip: "/trips/path-of-purity-ii",
  private: "/private-umrah",
  groups: "/groups",
  about: "/about",
  contact: "/about#contact",
  questions: "/#questions",
} as const;

/** Where the "join" panel sits on a trip page, and the register form below it. */
export const anchors = { join: "join", form: "register-interest" } as const;

export const tripLinks = [
  { label: "Hajj 2027", note: "Registration of interest open", href: routes.hajj },
  { label: "Next group Umrah", note: "Dates coming soon", href: routes.nextUmrah },
  { label: "Path of Purity II", note: "August 2026, completed", href: routes.lastTrip },
  { label: "Every trip", note: "Current and past", href: routes.trips },
];

export const nav = [
  { label: "Hajj 2027", href: routes.hajj },
  { label: "Umrah trips", href: routes.trips, children: tripLinks.slice(1) },
  { label: "Private & family", href: routes.private },
  { label: "Groups & organisations", href: routes.groups },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

/** The sand-gold line above the header. */
export const strip = {
  text: "Hajj 2027 registration of interest is open",
  short: "Hajj 2027 registration is open",
  cta: "Register interest",
  href: `${routes.hajj}#${anchors.form}`,
};

/* ------------------------------------------------------------------------ */
/* Home                                                                      */
/* ------------------------------------------------------------------------ */

export const hero = {
  label: "Guided Umrah and Hajj from the UK",
  /** DRAFT. Echoes V1's "show you the path" and the Path of Purity trips. */
  headline: "Walk the path with people who know it.",
  text: v(
    "Students of knowledge travel with every Rawdah group. Brother Ayuub looks after you from your first message to the flight home, and you stay a minute or two from the Haram.",
    "evidenced",
  ),
  facts: [
    v("Teachers with every group", "evidenced"), // V1 "Students of knowledge throughout"
    v("5★ hotels, 1–2 minutes from the Haram", "evidenced"), // POSTER
    v("Hajj booked through Nusuk", "confirmed"), // LIVE
  ],
  /** The hero's layered photographs: a tall main photo, one overlapping it, one behind. */
  mosaic: [
    { src: "/images/group-photos/group-photos-01.jpg", alt: "The Path of Purity II group with Ustadh Abdulrahman Hassan in the lobby of Address Jabal Omar, Makkah.", position: "object-[50%_55%]" },
    { src: "/images/group-photos/group-photos-05.jpg", alt: "A Rawdah group on the roof of Masjid an-Nabawi at golden hour, a minaret behind them.", position: "object-[50%_58%]" },
    { src: "/images/group-photos/group-photos-02.jpg", alt: "The group together on the hill at Uhud, mountains behind them.", position: "object-[50%_70%]" },
    { src: "/images/friends/friends-09.jpg", alt: "Two travellers in ihram at night in Makkah, the clock tower lit green behind them.", position: "object-[50%_40%]" },
  ],
};

/** "Where would you like to start?" — one way in for each kind of traveller. */
export const starts = [
  { title: "Hajj 2027", text: "Register your interest now. Packages open on Nusuk.", href: routes.hajj, tag: v("Open now", "confirmed"), photo: { src: "/images/friends/friends-05.jpg", position: "object-[50%_45%]" } },
  { title: "Group Umrah", text: "Our next trip: Madinah first, then Makkah.", href: routes.nextUmrah, tag: v("Dates soon", "to confirm"), photo: { src: "/images/group-photos/group-photos-04.jpg", position: "object-[50%_75%]" } },
  { title: "Private & family", text: "Your own dates, planned with us.", href: routes.private, tag: v("Your dates", "draft"), photo: { src: "/images/friends/friends-02.jpg", position: "object-[50%_40%]" } },
  { title: "Groups & organisations", text: "A trip for your organisation or community.", href: routes.groups, tag: v("On request", "draft"), photo: { src: "/images/friends/friends-01.jpg", position: "object-[50%_55%]" } },
];

/** The Hajj band: the talbiyah, and the five steps from registering to Hajj. */
export const hajjBand = {
  talbiyah: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ",
  talbiyahEn: "Here I am, O Allah, here I am.",
  headline: "Hajj 2027",
  text: v(
    "Register your interest and we’ll talk through your plans. When the approved packages are published on Nusuk, we help you compare them, prepare you for the rites, and stay with the group on the ground.",
    "confirmed",
  ), // LIVE
  steps: [
    { title: "Register your interest", text: "Tell us who’s travelling. It’s free and commits you to nothing.", status: "confirmed" as Status },
    { title: "Packages open on Nusuk", text: "Approved packages and prices are published on the official platform.", status: "confirmed" as Status },
    { title: "Choose and pay on Nusuk", text: "We help you compare. You book and pay on Nusuk; Rawdah takes no Hajj payments.", status: "confirmed" as Status },
    { title: "Learn before you leave", text: "Preparation sessions on the rites, so you arrive knowing what to do.", status: "confirmed" as Status },
    { title: "Hajj with the group", text: "Ustadh Abu Abdulaziz Ahmed guides, and our team is with you on the ground.", status: "confirmed" as Status },
  ],
  photo: { src: "/images/teaching/teaching-06.jpg", alt: "Rawdah travellers listening at a preparation session, the Rawdah Tours logo on the screen.", caption: "A Rawdah preparation session in the UK" },
};

/** V1's "Our Last Trip". */
export const lastTrip = {
  label: "Our last trip",
  name: "Path of Purity II: Summer Edition",
  facts: [
    { k: "Dates", v: "4–15 August 2026" },
    { k: "Madinah", v: "5 nights, Peninsula Worth Hotel ★★★★★" },
    { k: "Makkah", v: "5 nights, Address Jabal Omar ★★★★★" },
    { k: "Flights", v: "Qatar Airways from London Heathrow" },
    { k: "Teachers", v: "Ustadh Issa Uthman and Ustadh Abdulrahman Hassan" },
  ],
  status: "confirmed" as Status, // V1 and POSTER
  photos: [
    { src: "/images/group-photos/group-photos-05.jpg", caption: "On the roof of Masjid an-Nabawi", alt: "The group on the roof of Masjid an-Nabawi at golden hour, a minaret behind them.", position: "object-[50%_62%]" },
    { src: "/images/group-photos/group-photos-04.jpg", caption: "Masjid Quba", alt: "The group outside Masjid Quba, its white minarets behind them.", position: "object-[50%_75%]" },
    { src: "/images/teaching/teaching-01.jpg", caption: "A reminder from Ustadh Abdulrahman Hassan", alt: "Ustadh Abdulrahman Hassan giving the group a reminder outdoors.", position: "object-[50%_30%]" },
    { src: "/images/candid/candid-02.jpg", caption: "Brothers and sisters together", alt: "Brothers and sisters from the group standing together under the trees.", position: "object-[50%_50%]" },
    { src: "/images/group-photos/group-photos-03.jpg", caption: "In ihram, ready for Umrah", alt: "The group in ihram at night, lit arcades and a minaret behind them.", position: "object-[50%_60%]" },
    { src: "/images/bird-park/bird-park-01.jpg", caption: "Between lessons", alt: "A young traveller holding two macaws, a friend beside him.", position: "object-[50%_40%]" },
    { src: "/images/friends/friends-05.jpg", caption: "Umrah complete", alt: "Three travellers in ihram outside Masjid al-Haram at dusk, the minarets lit behind them.", position: "object-[50%_50%]" },
  ],
};

/** V1's "Why Choose Rawdah", in its own words where it had them. */
export const whyRawdah = {
  headline: "Why choose Rawdah",
  photo: { src: "/images/vest-back/vest-back-01.jpg", alt: "The Rawdah team walking through the hotel lobby, Ustadh Abdulrahman Hassan in the middle.", caption: "The Rawdah team, August 2026" },
  reasons: [
    { title: "Daily talks and reminders", text: "Students of knowledge travel with the group from the first day to the last, with a reminder each day and someone to ask.", status: "evidenced" as Status }, // V1
    { title: "A spiritually richer itinerary", text: "The seerah in Madinah first, then each rite of Umrah explained before you perform it in Makkah.", status: "evidenced" as Status }, // V1
    { title: "A true brotherhood", text: "Past travellers say the company was one of the most moving parts of the trip. Nobody walks it as a stranger.", status: "evidenced" as Status }, // V1
    { title: "Brother Ayuub, start to finish", text: "Our group leader is your point of care from the first message to the flight home.", status: "confirmed" as Status }, // LIVE
    { title: "Learning before you leave", text: "Preparation sessions in the UK, so you reach each rite with clarity instead of worry.", status: "evidenced" as Status }, // LIVE, PHOTOS
  ],
};

/** "Rawdah" — the garden in the Prophet's Mosque. Hadith in al-Bukhari and Muslim. */
export const meaning = {
  ar: "روضة",
  title: "Rawdah means garden.",
  text: "In the Prophet’s Mosque in Madinah, the space between his house and his minbar is called al-Rawdah. The Prophet ﷺ described it as a garden from the gardens of Paradise.",
  source: "Reported by al-Bukhari and Muslim.",
};

/**
 * What the price covered on our last Umrah (V1), in four groups. Each new
 * trip confirms its own list.
 */
export const covers = {
  headline: "What the trip cost includes",
  text: "On our last trip one price covered all of this, from Heathrow and back.",
  groups: [
    {
      title: "Before you leave",
      items: [
        { title: "Visa and documents", text: "Your Umrah visa, with the forms explained.", status: "evidenced" as Status },
        { title: "Ihram and a handbook", text: "Given to you before you travel.", status: "evidenced" as Status },
        { title: "Preparation sessions", text: "Learn the rites and meet the group.", status: "evidenced" as Status },
      ],
    },
    {
      title: "Flights and travel",
      items: [
        { title: "Return flights from Heathrow", text: "With Qatar Airways on our last trip.", status: "evidenced" as Status },
        { title: "Airport transfers", text: "Met on arrival, taken to the hotel.", status: "evidenced" as Status },
        { title: "VIP coach to Makkah", text: "The group travels between the cities together.", status: "evidenced" as Status },
      ],
    },
    {
      title: "In the two cities",
      items: [
        { title: "5★ hotels by the Haram", text: "A minute or two from each Haram, with breakfast.", status: "evidenced" as Status },
        { title: "Ziyarah", text: "Quba, Uhud and the sites around Makkah.", status: "evidenced" as Status },
      ],
    },
    {
      title: "Guidance",
      items: [
        { title: "Umrah, step by step", text: "Ihram, tawaf, sa‘i and tahallul, with du‘a at each stage.", status: "evidenced" as Status },
        { title: "Daily lessons", text: "From the students of knowledge with the group.", status: "evidenced" as Status },
        { title: "A group leader", text: "Brother Ayuub, the whole way.", status: "confirmed" as Status },
      ],
    },
  ],
};

/** V1's "Accommodation & Travel". */
export const stay = {
  headline: "Accommodation & travel",
  text: "The two hotels from our last trip. Each new trip names its hotels when it’s announced.",
  hotels: [
    { city: "Madinah", name: "Peninsula Worth Hotel", stars: 5, nights: 5, walk: "1–2 min to Masjid an-Nabawi", board: "Breakfast daily", status: "evidenced" as Status },
    { city: "Makkah", name: "Address Jabal Omar", stars: 5, nights: 5, walk: "About 2 min to Masjid al-Haram", board: "Breakfast daily", status: "evidenced" as Status },
  ],
  flights: v("Qatar Airways, return from London Heathrow", "evidenced"),
};

/**
 * Where you'll stay and how you'll travel, for the Umrah trip pages. The hotels
 * and travel are from our last trip (EVIDENCED). Photographs: Rawdah's own where
 * we have them; `slot` marks a frame waiting for the hotel's official photograph
 * (from Rawdah or the hotel's media kit, never copied from another site).
 */
export type StayPhoto = { src?: string; alt?: string; position?: string; caption?: string; slot?: string };
export const journeyStay = {
  headline: "Where you’ll stay, and how you’ll travel",
  text: "From our last trip. Each new trip confirms its hotels and travel when it’s announced.",
  hotels: [
    {
      city: "Madinah",
      name: "Peninsula Worth Hotel",
      stars: 5,
      nights: 5,
      walk: "1–2 minutes’ walk to Masjid an-Nabawi",
      text: "A five-star hotel a minute or two from the Prophet’s Mosque, with breakfast each day. Close enough to walk to every prayer.",
      status: "evidenced" as Status,
      photos: [{ slot: "The hotel" }, { slot: "A room" }, { slot: "Breakfast" }, { slot: "The walk to the Haram" }] as StayPhoto[],
    },
    {
      city: "Makkah",
      name: "Address Jabal Omar",
      stars: 5,
      nights: 5,
      walk: "About 2 minutes’ walk to Masjid al-Haram",
      text: "A five-star hotel in the Jabal Omar development beside Masjid al-Haram, with breakfast each day.",
      status: "evidenced" as Status,
      photos: [
        { src: "/images/group-photos/group-photos-01.jpg", alt: "The Path of Purity II group with Ustadh Abdulrahman Hassan in the lobby of Address Jabal Omar.", position: "object-[50%_55%]", caption: "Our group in the lobby, August 2026" },
        { slot: "A room" },
        { slot: "The view" },
        { slot: "Breakfast" },
      ] as StayPhoto[],
    },
  ],
  travel: [
    { title: "Flights", text: "Qatar Airways, return from London Heathrow.", status: "evidenced" as Status },
    { title: "Madinah to Makkah", text: "By VIP coach on our last trip, the group travelling together.", status: "evidenced" as Status },
  ],
  train: {
    title: "The Haramain high-speed train",
    text: "Madinah to Makkah in around two to two and a half hours, at up to 300 km/h. A calm, comfortable way between the two cities, and an option for future trips.",
    status: "proposed" as Status,
    photos: [{ slot: "The Haramain train" }, { slot: "On board" }] as StayPhoto[],
  },
  ziyarah: {
    title: "Ziyarah",
    text: "Visits to the places of the seerah, with the story told where it happened.",
    status: "evidenced" as Status,
    places: [
      { name: "Masjid Quba", city: "Madinah", photo: { src: "/images/group-photos/group-photos-04.jpg", alt: "The group outside Masjid Quba.", position: "object-[50%_75%]" } as StayPhoto },
      { name: "Mount Uhud", city: "Madinah", photo: { src: "/images/group-photos/group-photos-02.jpg", alt: "The group at Uhud, the mountains behind them.", position: "object-[50%_70%]" } as StayPhoto },
      { name: "The sites around Makkah", city: "Makkah", photo: { slot: "Ziyarah in Makkah" } as StayPhoto },
    ],
  },
};

/**
 * Hajj through Nusuk, for the Hajj 2027 page. The structure follows the
 * reference Rawdah sent (Dar al Islam's Nusuk page, read 25 Oct 2026); the
 * wording is ours and none of their facts are used. Nusuk dates are estimates
 * from last year's cycle (Wego, 1 July 2026; Islam Channel, 2023).
 */
export const hajjNusuk = {
  headline: "Hajj is now booked directly on Nusuk",
  text: v(
    "Since 2023, pilgrims from the UK book their Hajj package on Nusuk Hajj, the official platform of the Saudi Ministry of Hajj and Umrah, from providers it has approved. Groups like ours no longer sell Hajj packages. Our part is everything around the booking: getting you registered, helping you choose, preparing you, and travelling with you.",
    "evidenced",
  ),
  timeline: [
    { when: "Autumn 2026", title: "Open your Nusuk account", text: "Register and verify your account on hajj.nusuk.sa. Last year registration opened in October." },
    { when: "Around December 2026", title: "Packages are published", text: "Approved providers publish their packages, dates and prices on Nusuk." },
    { when: "December to January", title: "Choose, and get ready", text: "We go through the packages with you, and you choose yours and get your payment ready." },
    { when: "Early 2027", title: "Booking opens", text: "You book and pay for your package on Nusuk. Last year booking opened on 1 February." },
    { when: "Mid-May 2027", title: "Hajj 1448", text: "The days of Hajj are expected in mid-May. The exact days follow the moon." },
  ],
  timelineNote: "Estimates from last year’s timeline. Nusuk announces the real dates.",
  steps: {
    headline: "Register with us first, then with Nusuk",
    text: v("Registering with us first means we can help you compare the options on Nusuk, prepare you properly, and keep you with the group from the start. It doesn’t reserve a place or commit you to paying anything.", "evidenced"),
    items: [
      { title: "Register with Rawdah", text: "Tell us who’s travelling and what matters to you. We keep in touch on the channels you choose, and talk you through what comes next.", status: "evidenced" as Status },
      { title: "Open your Nusuk Hajj account", text: "At hajj.nusuk.sa. It’s separate from the Nusuk app you may have used for Umrah.", status: "evidenced" as Status },
      { title: "Choose your package", text: "When packages are published on Nusuk, we help you compare the ones that suit you.", status: "evidenced" as Status },
      { title: "Book, then prepare with us", text: "You book and pay on Nusuk when booking opens. Then preparation sessions in the UK before you fly.", status: "confirmed" as Status },
    ],
  },
  needs: {
    headline: "Nusuk registration isn’t a five-minute form",
    text: v("It asks for exact passport details and a photo that meets its rules, and every account is checked before it’s approved. Mistakes cause delays, so check every detail before you submit, and message us if you’re unsure.", "evidenced"),
    items: [
      "Your passport, valid well beyond your travel dates",
      "A recent passport-style photo that meets Nusuk’s size and background rules",
      "Your name and details exactly as they appear on your passport",
      "An email address and phone number you check often",
      "The same for anyone travelling with you",
    ],
  },
  group: {
    headline: "Our Hajj 2027 group",
    items: [
      { k: "Dates", v: "Not published yet. Nusuk publishes them with the packages.", s: "evidenced" as Status },
      { k: "Hotels and rooms", v: "Still being confirmed", s: "evidenced" as Status },
      { k: "Prices", v: "Set by the provider on Nusuk. You pay Nusuk, not Rawdah.", s: "confirmed" as Status },
      { k: "Registering with us", v: "Doesn’t reserve a place or create any payment", s: "evidenced" as Status },
    ],
  },
  updates: {
    title: "Hajj 2027 updates",
    text: "When Nusuk opens, when packages go live, and our preparation sessions: we’ll keep you posted on the channels you choose.",
    status: "evidenced" as Status,
  },
  closing: {
    title: "Labbayk Allahumma labbayk",
    text: "Register now, so you’re ready, verified and in the group when the packages open.",
  },
};

/**
 * Paying for your place, as a timeline with a worked example. V1 terms
 * (April 2026): £500 deposit, balance cleared 40 days before departure.
 * The number of instalments is our suggestion.
 */
export const paying = {
  headline: "Paying for your place",
  text: "A deposit holds your place. The rest is spread out, and it’s all paid before you fly.",
  example: { room: "Quad room, our last trip", price: 1799, deposit: 500, instalments: 3 },
  stages: [
    { when: "Today", what: "£500 deposit", note: "By card (a small fee) or bank transfer (no fee).", status: "confirmed" as Status },
    { when: "Monthly", what: "Instalments", note: "We send you the schedule.", status: "proposed" as Status },
    { when: "40 days before", what: "Paid in full", note: "The whole balance is cleared.", status: "confirmed" as Status },
    { when: "Departure", what: "Fly together", note: "Brother Ayuub meets the group.", status: "draft" as Status },
  ],
  sharing: v("Travelling alone? You share a room with travellers of the same gender.", "confirmed"),
};

/** Teachers: only facts Rawdah has published. Bios to be read by the client before launch. */
export const teachers = [
  {
    name: "Ustadh Abu Abdulaziz Ahmed",
    role: "Hajj guide, Hajj 2027",
    does: "Guides the Hajj group",
    /** LIVE team profile. */
    bio: v("A graduate of King Saud University and a student of Shaykh Dr. Sa‘d al-Shithri.", "confirmed"),
    photo: { src: "/images/portraits/abu-abdulaziz-ahmed.jpg", alt: "Ustadh Abu Abdulaziz Ahmed", position: "object-[50%_15%]" },
  },
  {
    name: "Ustadh Issa Uthman",
    role: "Guide and teacher, Path of Purity II",
    does: "Guides and teaches on Umrah",
    /** V1 and POSTER: role only. */
    bio: v("Guided and taught our August 2026 group in Madinah and Makkah.", "draft"),
    photo: { src: "/images/portraits/issa-uthman.jpg", alt: "Ustadh Issa Uthman", position: "object-[40%_25%]" },
  },
  {
    name: "Ustadh Abdulrahman Hassan",
    role: "Guide and teacher, Path of Purity II",
    does: "Guides and teaches on Umrah",
    bio: v("Guided and taught our August 2026 group in Madinah and Makkah.", "draft"),
    photo: { src: "/images/portraits/abdulrahman-hassan.jpg", alt: "Ustadh Abdulrahman Hassan", position: "object-[40%_30%]" },
  },
];

/** The group leader. V1 about page and LIVE team profile. */
export const leader = {
  name: "Brother Ayuub Mohamed Musa",
  role: "Group leader",
  does: "Leads every trip",
  line: "Your point of care from the first message to the flight home, on every Rawdah trip.",
  bio: v("Over ten years of da‘wah in the local community, serving others and supporting their growth in faith.", "evidenced"), // V1
  photo: { src: "/images/portraits/ayuub-mohamed-musa.jpg", alt: "Brother Ayuub Mohamed Musa, Rawdah Tours group leader" },
};

export const people = {
  headline: "The people who will walk with you", // V1
  text: "Every trip travels with students of knowledge and our group leader.",
  /** The team behind them, in one line (DRAFT: Rawdah to confirm who travels besides the teachers). */
  team: v("Behind them, the Rawdah team: from your first message to the airport, and on the ground in Madinah and Makkah.", "draft"),
};

/** Groups band on the home page. */
export const groupsBand = {
  headline: "A trip for your organisation or community",
  text: v("Masjids, societies, charities and workplaces. Your people, your reasons for going: we plan the trip around your group, handle every booking, and travel with you.", "draft"),
  who: ["Masjids", "Islamic societies", "Charities", "Schools and madrasahs", "Workplaces", "Community groups"],
  photo: { src: "/images/group-photos/group-photos-04.jpg", alt: "A Rawdah group outside Masjid Quba in bright sun, the white minarets above them.", position: "object-[50%_78%]" },
};

/** Private band on the home page. */
export const privateBand = {
  headline: "Private Umrah, planned around you",
  text: v("For families, couples and friends who can’t make a group date. Tell us what you need and we’ll plan it with you.", "draft"),
  points: [
    v("Any week, including school holidays", "proposed"),
    v("Five-star by the Haram, or a short walk away for less", "proposed"),
    v("Guided Umrah and ziyarah with our team", "proposed"),
  ],
};

/**
 * Reviews from V1's homepage. Rawdah published them, but we have no record
 * of who wrote them or their permission: confirm each before launch.
 */
export const reviews = {
  headline: "What travellers said",
  note: "From Rawdah’s previous website. Each needs confirming as a real traveller’s words, with permission, before launch.",
  items: [
    {
      quote: "I didn’t expect to feel so looked after. From the moment we landed in Madinah to our last night in Makkah, there was always someone guiding us. It didn’t feel like a tour. It felt like a family.",
      who: "Brother Abdullah",
      status: "to confirm" as Status,
    },
    {
      quote: "The knowledge sessions were what set this apart for me. I came back not just having performed Umrah, but actually understanding it.",
      who: "Brother Yusuf",
      status: "to confirm" as Status,
    },
    {
      quote: "Being with a group of brothers who all shared the same intention changed everything. The community feel was real.",
      who: "Brother Hamza",
      status: "to confirm" as Status,
    },
  ],
};

/** V1's "Common Questions", in V1's own wording where it had one, plus the LIVE Hajj questions. */
export type Faq = { q: string; a: string; status: Status; topic: "umrah" | "hajj" | "paying" };

export const faqTopics: { id: Faq["topic"]; title: string }[] = [
  { id: "umrah", title: "Umrah trips" },
  { id: "hajj", title: "Hajj 2027" },
  { id: "paying", title: "Booking and paying" },
];

export const faqs: Faq[] = [
  { topic: "umrah", q: "Who is this trip for?", a: "Any Muslim who wants to perform Umrah in a guided, spiritually rich setting, whether it’s your first time or you’ve been before. Trips are open to individuals and families.", status: "confirmed" },
  { topic: "umrah", q: "What is included in the trip cost?", a: "On our last trip: return flights from Heathrow, five-star hotels in Madinah and Makkah with breakfast, your visa, transfers and the coach between the cities, ziyarah in both cities, ihram and a handbook, and daily lessons. Each trip confirms its own list.", status: "evidenced" },
  { topic: "umrah", q: "What is the trip itinerary like?", a: "Our last trip began with five nights in Madinah near the Prophet’s Mosque, then the group travelled together to Makkah for five nights and Umrah, guided step by step. Ziyarah and lessons run throughout.", status: "evidenced" },
  { topic: "umrah", q: "What are the arrangements if I wish to come alone?", a: "You share a room with travellers of the same gender, and you’re part of the group from the first day.", status: "confirmed" },
  { topic: "umrah", q: "Are your trips suitable for families with children?", a: "Yes. Families are welcome and we arrange suitable rooms. Message us with the number of travellers and we’ll plan it with you.", status: "confirmed" },
  { topic: "umrah", q: "What about meal arrangements?", a: "Breakfast is included daily at both hotels. For other meals the group eats together where possible, and your guides will point you to good places nearby.", status: "confirmed" },
  { topic: "umrah", q: "What happens if there is an emergency during the trip?", a: "Your guides and group leader are with you throughout and will coordinate any support you need. We strongly recommend travel insurance that covers medical emergencies and repatriation.", status: "confirmed" },
  { topic: "hajj", q: "Is registering interest in Hajj a booking?", a: "No. It tells us you’re interested so we can contact you. It doesn’t reserve a place or commit you to anything.", status: "confirmed" },
  { topic: "hajj", q: "How do Hajj bookings and payments work?", a: "You choose, book and pay for your Hajj package directly on Nusuk, the official Saudi Hajj platform. Rawdah Tours does not take payment for Hajj packages.", status: "confirmed" },
  { topic: "hajj", q: "Are the Hajj 2027 dates confirmed?", a: "Not yet. The dates and length of the trip are published with the approved packages on Nusuk.", status: "confirmed" },
  { topic: "hajj", q: "How does Rawdah help with Hajj?", a: "We talk through your priorities, help you compare suitable Nusuk packages, prepare you before departure, and our team is on the ground with you throughout. The choice of package is always yours.", status: "confirmed" },
  { topic: "paying", q: "How do I pay for the trip?", a: "A deposit holds your place: £500 on our last trip, by card online (a small card fee applies) or by bank transfer with no fee. The balance is paid in instalments and cleared 40 days before departure.", status: "confirmed" },
  { topic: "paying", q: "What is your cancellation policy?", a: "Cancel in writing. 60 or more days before departure, up to 100% of what you’ve paid beyond the deposit is refunded; 40 to 59 days, up to 50%; under 40 days, no refund. Refunds depend on what we recover from suppliers, and visa fees are never refundable.", status: "confirmed" },
  { topic: "paying", q: "Is my trip ATOL protected?", a: "On our 2026 Umrah, flights and accommodation were arranged through ATOL-approved suppliers, with ATOL protection (no. 5311) provided by Polani Travel Ltd. Each trip’s protection is set out in your booking documents.", status: "to confirm" },
  { topic: "paying", q: "Do I need a visa to travel with you?", a: "Most travellers need a visa for Saudi Arabia. We arrange it and guide you through it, but approval is at the discretion of the authorities.", status: "confirmed" },
];

export const closing = {
  headline: "Make the intention. We’ll plan the journey.",
  text: "Register for Hajj 2027, ask about the next Umrah, or just send us a message. Registering is free and commits you to nothing.",
};

/* ------------------------------------------------------------------------ */
/* Trips                                                                     */
/* ------------------------------------------------------------------------ */

export type Room = { type: string; sharing: number; price: number };
export type Leg = { place: string; nights?: number };
export type Day = { day: string; title: string; text: string };

export type Journey = {
  slug: string;
  kind: "umrah" | "hajj";
  name: string;
  tagline: string;
  /** open: takes deposits; interest: register interest; past: completed. */
  state: "open" | "interest" | "past";
  stateStatus: Status;
  dates: V;
  route: V<Leg[]>;
  openTo: V;
  teacher: V;
  rooms?: V<Room[]>;
  landOnly?: V<number>;
  deposit?: V<number>;
  /** Instalments after the deposit (shown only when known). */
  months?: V<number>;
  flights?: V;
  hotels?: { madinah?: V; makkah?: V };
  /** Matches a trip in src/lib/trips.ts, whose server-side prices the card checkout uses. */
  bookingSlug?: string;
  intro: string;
  introStatus: Status;
  highlights: V[];
  itinerary?: V<Day[]>;
  confirmed?: { title: string; text: string }[];
  pending?: { title: string; text: string }[];
  /** Short line in place of a price (Hajj). */
  priceNote?: V;
  photo: { src: string; width: number; height: number; alt: string; position?: string };
  /** Two more photographs for the trip page's mosaic. */
  more: { src: string; alt: string; position?: string }[];
  waText: string;
};

export const stateLabel: Record<Journey["state"], string> = {
  open: "Booking open",
  interest: "Register interest",
  past: "Completed",
};

/** Rooms for a trip that books online come from the server's single price list. */
function roomsFromTrips(slug: string): Room[] {
  const t = getTrip(slug);
  return (t?.pricing?.rooms ?? []).map((r) => ({ type: r.label.replace(" room", ""), sharing: r.occupancy, price: r.pricePence / 100 }));
}

export const journeys: Journey[] = [
  {
    slug: "hajj-2027",
    kind: "hajj",
    name: "Hajj 2027",
    tagline: "A Hajj prepared with knowledge, care and intention.",
    state: "interest",
    stateStatus: "confirmed",
    dates: v("Published on Nusuk with the packages", "confirmed"),
    route: v([{ place: "Makkah" }, { place: "Mina" }, { place: "Arafah" }, { place: "Muzdalifah" }], "draft"),
    openTo: v("Brothers, sisters and families", "to confirm"),
    teacher: v("Ustadh Abu Abdulaziz Ahmed", "confirmed"),
    priceNote: v("Packages and prices are published on Nusuk", "confirmed"),
    intro:
      "Hajj 2027 is Rawdah’s current Hajj campaign. Register your interest now and we’ll talk through your plans. When approved packages appear on Nusuk, we help you compare them, prepare you for the rites, and stay with the group on the ground from start to finish.",
    introStatus: "confirmed",
    highlights: [
      v("Registering commits you to nothing", "confirmed"),
      v("Help comparing Nusuk packages", "confirmed"),
      v("Learning before departure", "confirmed"),
      v("Our team on the ground throughout", "confirmed"),
      v("Guided by Ustadh Abu Abdulaziz Ahmed", "confirmed"),
      v("Led by Brother Ayuub Mohamed Musa", "confirmed"),
    ],
    /** The days of Hajj in outline. Uncontested; the guide teaches the detail. */
    itinerary: v(
      [
        { day: "In the UK", title: "Prepare", text: "Learning sessions on the rites, your package confirmed on Nusuk, and your questions answered before you leave." },
        { day: "8 Dhul Hijjah", title: "Mina", text: "To Mina in ihram, on the day of Tarwiyah." },
        { day: "9 Dhul Hijjah", title: "Arafah, then Muzdalifah", text: "The Day of Arafah in worship and du‘a until sunset, then the night at Muzdalifah." },
        { day: "10 Dhul Hijjah", title: "Eid al-Adha", text: "The stoning at Jamarat al-‘Aqabah, the sacrifice, shaving or trimming, and tawaf al-ifadah." },
        { day: "11–13 Dhul Hijjah", title: "The days of Tashreeq", text: "In Mina, stoning the three Jamarat each day." },
        { day: "Before you leave", title: "Farewell tawaf", text: "A last tawaf of the Ka‘bah before the journey home." },
      ],
      "draft",
    ),
    confirmed: [
      { title: "Hajj 2027", text: "Rawdah’s current Hajj campaign." },
      { title: "Interest only", text: "Registering starts a conversation. It doesn’t reserve a place or take any payment." },
      { title: "Group leader", text: "Brother Ayuub Mohamed Musa." },
      { title: "Hajj guide", text: "Ustadh Abu Abdulaziz Ahmed." },
      { title: "Booking on Nusuk", text: "You book and pay directly on Nusuk. Rawdah does not collect Hajj package payments." },
    ],
    pending: [
      { title: "Dates and length", text: "The travel window and how long the trip lasts." },
      { title: "Packages and prices", text: "Published on Nusuk with their terms when approved." },
      { title: "Accommodation", text: "Hotels, rooms and the accommodation plan." },
      { title: "Services", text: "Transport, services and the schedule for each package." },
      { title: "Visa requirements", text: "Set out in the official platform information." },
    ],
    photo: { src: "/images/friends/friends-05.jpg", width: 2400, height: 1800, alt: "Three Rawdah travellers in ihram outside Masjid al-Haram at dusk, the minarets lit behind them.", position: "object-[50%_55%]" },
    more: [
      { src: "/images/teaching/teaching-06.jpg", alt: "A Rawdah preparation session in the UK.", position: "object-[50%_60%]" },
      { src: "/images/friends/friends-09.jpg", alt: "Two travellers in ihram at night, the clock tower behind them.", position: "object-[50%_40%]" },
    ],
    waText: say.hajj,
  },
  {
    slug: "next-umrah",
    kind: "umrah",
    name: "Next group Umrah",
    tagline: "Madinah first, then Makkah, with teachers beside you.",
    state: "interest",
    stateStatus: "to confirm",
    dates: v("Coming soon", "to confirm"),
    route: v([{ place: "Madinah", nights: 5 }, { place: "Makkah", nights: 5 }], "proposed"),
    openTo: v("Brothers, sisters and families", "to confirm"),
    teacher: v("Named when the trip is announced", "to confirm"),
    /** PROPOSED: Path of Purity II's prices, as a guide until the next trip is priced. */
    rooms: v(roomsFromTrips("path-of-purity-ii"), "proposed"),
    deposit: v(500, "proposed"),
    months: v(3, "proposed"),
    flights: v("Qatar Airways from London Heathrow", "proposed"),
    hotels: { madinah: v("Peninsula Worth Hotel ★★★★★", "proposed"), makkah: v("Address Jabal Omar ★★★★★", "proposed") },
    intro:
      "Our next group Umrah follows the shape of Path of Purity II: five nights near the Prophet’s Mosque with lessons on the seerah, then Makkah and your Umrah, guided step by step. Register your interest and you’ll hear first when the dates are out.",
    introStatus: "proposed",
    highlights: [
      v("Madinah first, then Makkah", "proposed"),
      v("Five-star hotels a minute or two from each Haram", "proposed"),
      v("Students of knowledge with the group throughout", "evidenced"),
      v("A £500 deposit, then instalments", "proposed"),
    ],
    pending: [
      { title: "Dates", text: "Coming soon." },
      { title: "Prices", text: "Shown here as a guide from our last trip until confirmed." },
      { title: "Hotels and flights", text: "Confirmed when the trip is announced." },
      { title: "Teachers", text: "Named when the trip is announced." },
    ],
    photo: { src: "/images/group-photos/group-photos-04.jpg", width: 2400, height: 1600, alt: "A Rawdah group outside Masjid Quba in Madinah, its white minarets behind them.", position: "object-[50%_70%]" },
    more: [
      { src: "/images/group-photos/group-photos-05.jpg", alt: "The group on the roof of Masjid an-Nabawi.", position: "object-[50%_62%]" },
      { src: "/images/friends/friends-07.jpg", alt: "Two travellers in ihram, smiling, suitcases behind them.", position: "object-[50%_35%]" },
    ],
    waText: say.nextUmrah,
  },
  {
    slug: "path-of-purity-ii",
    kind: "umrah",
    name: "Path of Purity II: Summer Edition",
    tagline: "Eleven days in Madinah and Makkah, August 2026.",
    state: "past",
    stateStatus: "confirmed",
    dates: v("4–15 August 2026", "confirmed"),
    route: v([{ place: "Madinah", nights: 5 }, { place: "Makkah", nights: 5 }], "confirmed"),
    openTo: v("Brothers, sisters and families", "confirmed"),
    teacher: v("Ustadh Issa Uthman and Ustadh Abdulrahman Hassan", "confirmed"),
    rooms: v(roomsFromTrips("path-of-purity-ii"), "confirmed"),
    /** V1 terms: quad without flights £1,040. The poster says £1,099 without flights; the terms win. */
    landOnly: v(1040, "confirmed"),
    deposit: v(500, "confirmed"),
    flights: v("Qatar Airways from London Heathrow", "confirmed"),
    hotels: { madinah: v("Peninsula Worth Hotel ★★★★★", "confirmed"), makkah: v("Address Jabal Omar ★★★★★", "confirmed") },
    bookingSlug: "path-of-purity-ii",
    intro:
      "Our summer Umrah began in Madinah: five nights near Masjid an-Nabawi with lessons on the seerah and the history of the city. Then a VIP coach to Makkah, five nights at Address Jabal Omar, and Umrah completed together, step by step.",
    introStatus: "evidenced",
    highlights: [
      v("5 nights in Madinah, then 5 in Makkah", "confirmed"),
      v("Peninsula Worth and Address Jabal Omar, both 5★", "confirmed"),
      v("Qatar Airways from Heathrow", "confirmed"),
      v("Two guides and teachers, and our group leader", "confirmed"),
    ],
    itinerary: v(
      [
        { day: "Madinah, 5 nights", title: "The City of the Prophet ﷺ", text: "Near Masjid an-Nabawi. Lessons on the seerah and the history of the city, prayers in the Prophet’s Mosque, and ziyarah to Quba and Uhud." },
        { day: "The road", title: "VIP coach to Makkah", text: "The guides travel with the group and use the road to prepare everyone for Umrah." },
        { day: "Makkah, 5 nights", title: "Makkah and Umrah", text: "Address Jabal Omar, steps from Masjid al-Haram. Umrah guided rite by rite: ihram, niyyah, tawaf, sa‘i and tahallul." },
        { day: "15 August", title: "Home", text: "The flight back to Heathrow, with a group that started as strangers." },
      ],
      "evidenced",
    ),
    photo: { src: "/images/group-photos/group-photos-03.jpg", width: 3000, height: 2250, alt: "The Path of Purity II group in ihram at night, ready for Umrah.", position: "object-[50%_55%]" },
    more: [
      { src: "/images/group-photos/group-photos-02.jpg", alt: "The group at Uhud.", position: "object-[50%_70%]" },
      { src: "/images/friends/friends-03.jpg", alt: "Six travellers arm in arm after Umrah.", position: "object-[30%_40%]" },
    ],
    waText: say.nextUmrah,
  },
];

export const journey = (slug: string) => journeys.find((j) => j.slug === slug);

export const fromPrice = (j: Journey) => (j.rooms?.value.length ? Math.min(...j.rooms.value.map((r) => r.price)) : null);

export const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

/** The monthly payment after the deposit, rounded up to the pound. */
export const monthly = (total: number, deposit: number, months: number) => Math.ceil((total - deposit) / months);

export const nightsOf = (j: Journey) => j.route.value.reduce((n, l) => n + (l.nights ?? 0), 0);

/** "Madinah 5 nights, then Makkah 5 nights" or "Makkah, Mina, Arafah and Muzdalifah". */
export function routeText(j: Journey) {
  const legs = j.route.value;
  if (legs.every((l) => l.nights)) return legs.map((l) => `${l.place} ${l.nights} nights`).join(", then ");
  const names = legs.map((l) => l.place);
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0];
}

/* ------------------------------------------------------------------------ */
/* Private Umrah                                                             */
/* ------------------------------------------------------------------------ */

/** PROPOSED pricing model for the planner's estimate. Our guesses for Rawdah to correct; the page says it's an estimate. */
export const privatePricing = {
  status: "proposed" as Status,
  perNight: { "4★": 70, "5★ by the Haram": 125 } as Record<string, number>,
  flights: 650,
  visaAndTransport: 220,
  sharingDiscount: { 1: 1.6, 2: 1, 3: 0.85, 4: 0.75 } as Record<number, number>,
};

export const privatePage = {
  label: "Private & family Umrah",
  headline: "Private Umrah, planned around you.",
  text: "For families, couples and friends who can’t make a group date. Plan it below to see a rough cost, then send it to us on WhatsApp and we’ll come back with real options.",
  points: [
    { title: "Any week you choose", text: "Including the school holidays.", status: "proposed" as Status },
    { title: "Hotels to suit you", text: "Five-star by the Haram, or a short walk away for less.", status: "proposed" as Status },
    { title: "Your order, your pace", text: "Madinah or Makkah first, as many nights in each as you like.", status: "proposed" as Status },
    { title: "Guided by our team", text: "Your Umrah guided on arrival, and ziyarah in both cities.", status: "proposed" as Status },
  ],
  photo: { src: "/images/friends/friends-02.jpg", alt: "Ustadh Issa Uthman with a traveller at the Islamic University of Madinah.", position: "object-[50%_45%]" },
};

/* ------------------------------------------------------------------------ */
/* Groups & organisations                                                    */
/* ------------------------------------------------------------------------ */

export const groupsPage = {
  label: "Groups & organisations",
  headline: "Umrah for your organisation, planned around your people.",
  text: "Masjids, societies, charities and workplaces. Your people, your reasons for going: we plan the trip around your group, handle every booking, and travel with you.",
  who: groupsBand.who,
  offers: [
    { title: "Planned around you", text: "Dates, length and pace agreed with you, with lessons built around what your group is studying.", status: "proposed" as Status },
    { title: "A page for your trip", text: "Your group’s name and the booking details on one page, ready to share with your members and on WhatsApp.", status: "proposed" as Status },
    { title: "Everyone pays us directly", text: "Each traveller books and pays in instalments, so nobody in your group handles the money.", status: "to confirm" as Status },
    { title: "Bring your teacher", text: "Your imam or teacher leads the lessons, or one of ours travels with you.", status: "proposed" as Status },
    { title: "Our team on the ground", text: "We travel with your group and look after it in both cities.", status: "evidenced" as Status },
    { title: "A session before you fly", text: "A preparation session for your group in the UK.", status: "evidenced" as Status },
  ],
  steps: [
    { title: "Get in touch", text: "Your group, rough numbers and when you’re thinking of going." },
    { title: "We meet", text: "In person or on a call, to understand your group." },
    { title: "We plan it with you", text: "Dates, hotels, lessons and the price, agreed together." },
    { title: "Your people sign up", text: "Your trip page goes live and each person books their own place." },
    { title: "We go together", text: "We meet the group at the airport and look after it until you land home." },
  ],
  questions: [
    { q: "Do I have to collect anyone’s money?", a: "No. Each person books and pays us directly, with instalments.", status: "to confirm" as Status },
    { q: "Can our own teacher lead the lessons?", a: "Yes, and we plan the days around them. If you don’t have one, one of ours can come.", status: "proposed" as Status },
    { q: "What size of group works?", a: "From around ten people upwards. Hotels and transport are set around your numbers.", status: "proposed" as Status },
    { q: "How early should we get in touch?", a: "Four to six months ahead gives your people time to save and sign up.", status: "proposed" as Status },
  ],
  photo: { src: "/images/group-photos/group-photos-02.jpg", alt: "A Rawdah group standing together on the hill at Uhud, mountains behind them.", position: "object-[50%_72%]" },
};

/* ------------------------------------------------------------------------ */
/* About                                                                     */
/* ------------------------------------------------------------------------ */

export const about = {
  label: "About Rawdah Tours",
  headline: "A journey to the sacred cities should change you.",
  /** V1 about page, lightly edited. */
  story: [
    { text: "Rawdah Tours is a UK company running guided Umrah trips rooted in worship, knowledge and real community, and preparing a group for Hajj 2027.", status: "evidenced" as Status },
    { text: "Our trips are led by students of knowledge and experienced guides who stay with the group throughout: not just on arrival and departure, but at every step, from the first lesson in Madinah to the final tawaf in Makkah.", status: "evidenced" as Status },
    { text: "We take care of the logistics so you can give your attention to worship. Many operators offer packages; we try to offer a journey. The difference is in the knowledge, the care and the company.", status: "evidenced" as Status },
  ],
  /** V1: the quote on Ustadh Abdulrahman Hassan’s guide card (app/page.tsx GUIDES). */
  quote: v("A teacher’s role is not to fill your mind, but to show you the path.", "evidenced"),
  values: [
    { title: "Learning at every step", text: "Teachers with the group, and every rite explained.", status: "evidenced" as Status },
    { title: "Travelling as one", text: "One group, from the first message to home.", status: "evidenced" as Status },
    { title: "Plain answers", text: "What’s confirmed and what isn’t yet, said clearly.", status: "evidenced" as Status },
    { title: "Looked after", text: "A group leader with you the whole way.", status: "confirmed" as Status },
  ],
};
