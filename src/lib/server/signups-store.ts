import { put } from '@vercel/blob'

// Sign-ups kept in Rawdah's private Vercel Blob store ("rawdah-signups", London), one small JSON file each, so
// nothing is lost before email and the Google Sheet are set up. Off unless BLOB_READ_WRITE_TOKEN is set (Vercel
// adds it when the store is connected to the project). Read them in Vercel → Storage → rawdah-signups.

export async function keepSignup(row: Record<string, string | number | boolean>) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { ok: false as const }
  try {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    await put(`signups/${stamp}.json`, JSON.stringify(row, null, 2), { access: 'private', contentType: 'application/json', addRandomSuffix: true })
    return { ok: true as const }
  } catch (e) {
    console.error('[signups] save failed:', e instanceof Error ? e.message : e)
    return { ok: false as const }
  }
}
