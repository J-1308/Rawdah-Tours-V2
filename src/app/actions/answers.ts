'use server'

import { put } from '@vercel/blob'

import { sendLeadToOwner } from '@/lib/server/email'

/** The client's questionnaire answers (/questionnaire): kept in the private Blob store and emailed to the team. */
export async function sendAnswers(raw: { name: string; answers: Record<string, string>; text: string }) {
  const name = String(raw.name ?? '').slice(0, 80)
  const answers = Object.fromEntries(Object.entries(raw.answers ?? {}).slice(0, 80).map(([k, v]) => [String(k).slice(0, 40), String(v).slice(0, 4000)]))
  const record = { name, sentAt: new Date().toISOString(), answers }
  let kept = false
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(`answers/${record.sentAt.replace(/[:.]/g, '-')}.json`, JSON.stringify(record, null, 2), { access: 'private', contentType: 'application/json', addRandomSuffix: true })
      kept = true
    } catch (e) {
      console.error('[answers] save failed:', e instanceof Error ? e.message : e)
    }
  }
  const lines = String(raw.text ?? '').slice(0, 20000).split('\n').map((l) => [l, ''] as [string, string])
  const mailed = await sendLeadToOwner(`Questionnaire answers${name ? ` from ${name}` : ''}`, 'The client sent their questionnaire answers:', lines, '').then((r) => r.ok).catch(() => false)
  return { ok: kept || mailed }
}
