import Stripe from 'stripe'
import { configured } from './config'

let stripe: Stripe | null = null

export function getStripe(): Stripe | null {
  if (!configured.stripe()) return null
  if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
  return stripe
}
