import "./fonts.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";

const description =
  "Guided Umrah and Hajj from the UK with Rawdah Tours: students of knowledge beside you, five-star hotels by the Haram, and a group that travels as one. Register your interest for Hajj 2027.";

/** Link previews resolve against the production address Vercel sets; the fallback is the client's domain. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://www.rawdahtours.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Rawdah Tours — guided Umrah and Hajj from the UK", template: "%s · Rawdah Tours" },
  description,
  openGraph: { type: "website", siteName: "Rawdah Tours", title: "Rawdah Tours — guided Umrah and Hajj from the UK", description, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  /**
   * Site-wide noindex until launch: the copy carries review marks and the
   * client has not yet signed off wording or photographs (pre-launch checklist
   * in HANDOFF.md). Lift this, and add the real robots rules, at launch.
   */
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f8f3eb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preload("/fonts/cormorant-garamond-latin-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/dm-sans-latin-wght-normal.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
