import "./fonts.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";

import { IS_LIVE } from "@/lib/site";

const description =
  "Guided Umrah and Hajj from the UK with Rawdah Tours. Students of knowledge travel with every group, and we look after you from your first message to the flight home. Register your interest for Hajj 2027.";

/** Link previews resolve against the production address Vercel sets; the fallback is the client's domain. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://www.rawdahtours.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Rawdah Tours — guided Umrah and Hajj from the UK", template: "%s · Rawdah Tours" },
  description,
  openGraph: { type: "website", siteName: "Rawdah Tours", title: "Rawdah Tours — guided Umrah and Hajj from the UK", description, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  /** Indexed only on rawdahtours.co.uk in production (IS_LIVE); previews stay hidden. */
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#1b1410", viewportFit: "cover" };


export default function RootLayout({ children }: { children: React.ReactNode }) {
  preload("/fonts/cormorant-garamond-latin-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/dm-sans-latin-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-GB" data-top="night" className="h-full antialiased" /* the top is dark, beige-gold logo (Jibril, 31 Oct 2026; ADR 0004) */>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
