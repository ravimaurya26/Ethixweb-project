import { db } from './supabase.js'
import { send } from './http.js'

/** Verifies the Supabase JWT and checks the email is on the ADMIN_EMAILS allow-list. */
export async function requireAdmin(req, res) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) {
    send(res, 401, { error: 'unauthorised', message: 'Sign in to continue' })
    return null
  }
  const { data, error } = await db().auth.getUser(token)
  const email = data?.user?.email?.toLowerCase()
  const allowed = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  if (error || !email) {
    send(res, 401, { error: 'unauthorised', message: 'Your session has expired. Sign in again.' })
    return null
  }
  if (!allowed.includes(email)) {
    send(res, 403, { error: 'forbidden', message: 'This account does not have admin access' })
    return null
  }
  return data.user
}
