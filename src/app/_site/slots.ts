/**
 * Photo slots: places on the site waiting for a photo Jibril sources (stock,
 * or official photos from hotels). Drop a file named after the slot into
 * public/images/slots/ (e.g. hajj-arafah.jpg) and push: the placeholder
 * becomes the photo. next.config.ts lists the folder at build time into
 * SLOT_FILES, so this works in server and client components alike.
 * The brief for each slot is in public/images/slots/README.md.
 */
import type { CSSProperties } from "react";

const files = (process.env.SLOT_FILES ?? "").split(",").filter(Boolean);

/** The photo path for a slot: the dropped-in file if there is one, else the expected .jpg path. */
export function slot(name: string) {
  const f = files.find((x) => x.replace(/\.[^.]+$/, "") === name);
  return `/images/slots/${f ?? `${name}.jpg`}`;
}

/** True once a photo has been dropped in for this slot. */
export function slotFilled(name: string) {
  return files.some((x) => x.replace(/\.[^.]+$/, "") === name);
}

/** True when a src points at a slot nobody has filled yet. */
export function isEmptySlot(src: string) {
  return src.startsWith("/images/slots/") && !files.includes(src.split("/").pop() ?? "");
}

/** What each slot should show, printed on the placeholder. */
export const slotBriefs: Record<string, string> = {
  "hajj-arafah": "Pilgrims on the Day of Arafah: the Hajj page and the Hajj start card",
  "hajj-makkah": "Masjid al-Haram from above: the Hajj 2027 trip card",
  "hajj-mina": "The white tents of Mina stretching into the distance",
  "family-haram": "A parent and child walking together at the Haram, seen from behind",
  "family-madinah": "A family at Masjid an-Nabawi under the umbrellas, from behind or far off",
  "groups-masjid": "A UK masjid or community talk: people seated, listening, from behind",
  "hotel-novotel-thakher": "Novotel Thakher City Makkah: the hotel or a room, from the hotel’s own site",
  "hotel-al-manakha-rotana": "Al Manakha Rotana, Madinah: the hotel or a room, from the hotel’s own site",
};

/** Each photo's width / height, read at build time (next.config.ts). Keys are paths under public/images/. */
const ratios = new Map(
  (process.env.PHOTO_RATIOS ?? "")
    .split(";")
    .filter(Boolean)
    .map((x) => {
      const i = x.lastIndexOf(":");
      return [x.slice(0, i), Number(x.slice(i + 1))] as const;
    }),
);

/** A photo's shape (width / height), or undefined for a missing photo or an empty slot. */
export function photoRatio(src: string) {
  return ratios.get(decodeURI(src).replace(/^\/images\//, ""));
}

/**
 * A frame shaped like its photo, within limits, so the phone shows the whole of a wide group photo instead of its
 * middle. Use with the class `aspect-(--r)` (and `lg:aspect-(--rl)` for a different shape on large screens).
 */
export function fitFrame(src: string, { min = 0.8, max = 1.5, fallback = 1.25, minLg, maxLg }: { min?: number; max?: number; fallback?: number; minLg?: number; maxLg?: number } = {}) {
  const r = photoRatio(src) ?? fallback;
  const clamp = (lo: number, hi: number) => Math.min(hi, Math.max(lo, r)).toFixed(3);
  return { "--r": clamp(min, max), "--rl": clamp(minLg ?? min, maxLg ?? max) } as CSSProperties;
}
