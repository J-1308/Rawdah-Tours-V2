import Link from "next/link";
import type { ReactNode } from "react";

import { WaGlyph } from "@/app/_site/whatsapp";
import { whatsappLink } from "@/lib/site";

/** Small shared pieces for the booking, legal and notice pages, in the site's style. */

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("w-full px-[max(var(--hero-pad-x),env(safe-area-inset-left))]", className)}>{children}</div>;
}

type Variant = "primary" | "outline";

export function ButtonLink({ href, variant = "primary", className, children }: { href: string; variant?: Variant; className?: string; children: ReactNode }) {
  const cls = cx(
    "inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-[3px] px-6 py-3.5 text-[0.95rem] font-medium transition-colors",
    variant === "primary" ? "bg-ink text-canvas hover:bg-ink-deep" : "border border-ink/25 hover:border-ink",
    className,
  );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function WhatsAppButton({ message, variant = "primary", className, label = "Chat on WhatsApp" }: { message?: string; variant?: "primary" | "outline"; className?: string; label?: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-[3px] px-6 py-3.5 text-[0.95rem] font-medium transition-colors",
        variant === "primary" ? "bg-wa text-white hover:opacity-90" : "border border-ink/25 hover:border-ink",
        className,
      )}
    >
      <WaGlyph className={cx("size-5", variant === "outline" && "text-wa")} />
      {label}
    </a>
  );
}
