import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ramadanFull } from "@/app/_site/content";
import { TripView } from "../page";

/**
 * A private preview of the full Ramadan Umrah 2027 page while the public page still says "coming soon"
 * (Jibril, 12 Nov 2026). Not linked anywhere, kept out of search; only /trips/ramadan-umrah-2027/preview exists.
 */
export const metadata: Metadata = { title: "Ramadan Umrah 2027 (preview)", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return [{ slug: "ramadan-umrah-2027" }];
}
export const dynamicParams = false;

export default async function RamadanPreview({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== ramadanFull.slug) notFound();
  return <TripView j={ramadanFull} />;
}
