import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { configured } from './config'

let client: SupabaseClient | null = null

/** Service-role client. Server only: never import this from a client component. */
export function getSupabase(): SupabaseClient | null {
  if (!configured.supabase()) return null
  if (!client) {
    client = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return client
}
