import type { ReactNode } from "react";

import type { Status } from "@/app/_site/content";

/**
 * Review marks are off for launch (31 Oct 2026): nothing renders. The statuses stay in content.ts as a record of
 * where each line came from (confirmed, evidenced, draft, suggested, to confirm). To review again, restore the
 * dashed tags and the Review pill from git history (commit b4af737).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Mark(_props: { s: Status | undefined; className?: string }) {
  return null;
}

/**
 * overflow-x: clip stops a wide element widening the page on iPhone (Safari zooms out) without creating a scroll
 * box, so the sticky header keeps sticking.
 */
export function MarksFrame({ children }: { children: ReactNode }) {
  return <div className="overflow-x-clip">{children}</div>;
}
