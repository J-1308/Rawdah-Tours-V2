import type { ReactNode } from "react";

import { SiteHeader } from "@/app/_site/header";
import { MarksFrame } from "@/app/_site/marks";
import { Intro, Reveals } from "@/app/_site/motion";
import { AnnouncementStrip, SiteFooter } from "@/app/_site/shell";
import { MobileBar, WhatsAppFloat } from "@/app/_site/whatsapp";

/**
 * Every public page: the review-marks frame, the Hajj 2027 line, the header,
 * the page, the footer, a WhatsApp tile on desktop and the two-button bar on
 * phones. Still noindex through the root layout.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <MarksFrame>
      <Intro />
      <Reveals />
      <AnnouncementStrip />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileBar />
    </MarksFrame>
  );
}
