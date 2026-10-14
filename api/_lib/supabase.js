import { createClient } from '@supabase/supabase-js'

let client
/** Service-role client. Server only. Bypasses RLS, so every route must authorise first. */
export function db() {
  if (!client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase environment variables are missing')
    client = createClient(url, key, { auth: { persistSession: false } })
  }
  return client
}
