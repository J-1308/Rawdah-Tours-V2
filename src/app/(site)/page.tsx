import type { Metadata } from "next";

import { brand } from "@/app/_site/content";
import {
  Closing,
  Covers,
  GroupsBand,
  HajjBand,
  Hero,
  LastTrip,
  Meaning,
  Paying,
  People,
  PrivateBand,
  Questions,
  Reviews,
  Starts,
  Trips,
  WhyRawdah,
} from "@/app/_site/home-sections";

export const metadata: Metadata = {
  title: { absolute: "Rawdah Tours — guided Umrah and Hajj from the UK" },
};

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://www.rawdahtours.co.uk";

const organisation = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: brand.name,
  legalName: brand.legalName,
  url: site,
  logo: `${site}/icon.png`,
  image: `${site}/opengraph-image.jpg`,
  description: "Guided Umrah and Hajj from the UK, with teachers beside you.",
  email: brand.email,
  telephone: brand.phone.href.replace("tel:", ""),
  address: { "@type": "PostalAddress", streetAddress: "5 Sir Denis Drive", addressLocality: "Birmingham", postalCode: "B9 5DU", addressCountry: "GB" },
  sameAs: [brand.instagram.href],
};

/**
 * Most visitors arrive already interested (Instagram, WhatsApp, word of
 * mouth), so the first two screens let them act: the hero's Hajj action, a
 * tile for each kind of traveller, and the trips with prices. Then Hajj 2027
 * in depth, the proof of the last trip, the reasons, what's covered and how
 * paying works, the people, the other two ways to travel, travellers' words,
 * questions, and one last call. See docs/adr/0001.
 */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation).replace(/</g, "\\u003c") }} />
      <Hero />
      <Starts />
      <Trips />
      <HajjBand />
      <LastTrip />
      <WhyRawdah />
      <Meaning />
      <Covers />
      <Paying />
      <People />
      <GroupsBand />
      <PrivateBand />
      <Reviews />
      <Questions />
      <Closing />
    </>
  );
}
