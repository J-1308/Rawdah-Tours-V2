/**
 * Photo slots: places on the site waiting for a photo Jibril sources (stock,
 * or official photos from hotels). Drop a file named after the slot into
 * public/images/slots/ (e.g. hajj-arafah.jpg) and push: the placeholder
 * becomes the photo. next.config.ts lists the folder at build time into
 * SLOT_FILES, so this works in server and client components alike.
 * The brief for each slot is in public/images/slots/README.md.
 */
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
  "hajj-arafah": "Mount Arafah on the day of Hajj: pilgrims in white, wide shot",
  "hajj-mina": "The white tents of Mina stretching into the distance",
  "family-haram": "A parent and child walking together at the Haram, seen from behind",
  "family-madinah": "A family at Masjid an-Nabawi under the umbrellas, from behind or far off",
  "groups-masjid": "A UK masjid or community talk: people seated, listening, from behind",
};
