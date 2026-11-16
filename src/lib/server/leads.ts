import { put } from '@vercel/blob'

// Leads from the step-by-step forms (src/app/_site/step-form.tsx), one JSON file each in Rawdah's private Vercel
// Blob store, overwritten as each step is saved: so a visitor who stops after step 1 is still a lead.
// Read them in Vercel → Storage → rawdah-signups → leads/.

export async function keepLead(id: string, lead: Record<string, unknown>) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { ok: false as const }
  try {
    await put(`leads/${id}.json`, JSON.stringify(lead, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return { ok: true as const }
  } catch (e) {
    console.error('[leads] save failed:', e instanceof Error ? e.message : e)
    return { ok: false as const }
  }
}
