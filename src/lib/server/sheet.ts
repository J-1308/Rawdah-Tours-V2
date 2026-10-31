// Sign-ups to a Google Sheet, through a small Google Apps Script web app that Rawdah owns
// (docs/signups-sheet.md). Off unless SIGNUPS_SHEET_URL is set. No database on this site.

export async function addToSheet(row: Record<string, string | number | boolean>) {
  const url = process.env.SIGNUPS_SHEET_URL
  if (!url) return { ok: false as const }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.SIGNUPS_SHEET_SECRET ?? '', ...row }),
      signal: AbortSignal.timeout(8000),
    })
    const text = await res.text()
    return { ok: res.ok && text.includes('"ok":true') }
  } catch (e) {
    console.error('[sheet] failed:', e instanceof Error ? e.message : e)
    return { ok: false as const }
  }
}
