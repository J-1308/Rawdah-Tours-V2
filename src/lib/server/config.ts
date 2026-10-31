// Which integrations are configured. Every integration is optional: the site
// works without them and points people to WhatsApp instead.

export const configured = {
  supabase: () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
  stripe: () => Boolean(process.env.STRIPE_SECRET_KEY),
  stripeWebhook: () => Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
  email: () => Boolean(process.env.RESEND_API_KEY),
  bank: () => Boolean(process.env.BANK_ACCOUNT_NAME && process.env.BANK_SORT_CODE && process.env.BANK_ACCOUNT_NUMBER),
  admin: () => Boolean(process.env.ADMIN_PASSWORD),
}

export function bankDetails() {
  if (!configured.bank()) return null
  return {
    accountName: process.env.BANK_ACCOUNT_NAME as string,
    sortCode: process.env.BANK_SORT_CODE as string,
    accountNumber: process.env.BANK_ACCOUNT_NUMBER as string,
  }
}

export function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.VERCEL_ENV === 'production') return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
}
