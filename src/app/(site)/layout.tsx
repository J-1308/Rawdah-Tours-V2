import type { ReactNode } from "react";

import { SiteHeader } from "@/app/_site/header";
import { MarksFrame } from "@/app/_site/marks";
import { strip } from "@/app/_site/content";
import { Intro, Reveals } from "@/app/_site/motion";
import { NotOn, PageWatch } from "@/app/_site/page-watch";
import { ClickTracking, SourceCapture } from "@/app/_site/tracking";
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
      <ClickTracking />
      <SourceCapture />
      <PageWatch />
      {/* Not on the page it links to: there it only takes space above the title (Opus review, 18 Nov 2026). */}
      <NotOn href={strip.href}>
        <AnnouncementStrip />
      </NotOn>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
      <MobileBar />
    </MarksFrame>
  );
}
