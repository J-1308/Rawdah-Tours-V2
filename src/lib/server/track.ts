import { track } from '@vercel/analytics/server'

// Server-side custom events (Vercel Web Analytics), for things only the server knows happened: a form saved, a
// deposit confirmed. Names match docs/tracking.md. Never blocks or breaks the request it's part of.
export async function trackServer(name: string, props: Record<string, string | number | boolean | null> = {}) {
  try {
    await track(name, props)
  } catch (e) {
    console.error('[track]', name, e instanceof Error ? e.message : e)
  }
}

/** The visitor's source, sent by SourceFields in the form (src/app/_site/tracking.tsx). */
export function sourceFrom(formData: FormData) {
  const get = (k: string) => String(formData.get(k) ?? '').slice(0, 300)
  return {
    utmSource: get('utm_source'),
    utmMedium: get('utm_medium'),
    utmCampaign: get('utm_campaign'),
    landingPage: get('landing_page'),
    referrer: get('referrer'),
  }
}
