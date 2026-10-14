import { createHash } from 'node:crypto'

const MIN_FILL_MS = 3000 // humans need more than 3s to fill the form
const MAX_FILL_MS = 1000 * 60 * 60 * 6

export function hashIp(ip) {
  return createHash('sha256').update(`${process.env.IP_HASH_SALT || 'dev'}:${ip}`).digest('hex')
}

/** Cheap checks first: honeypot field and form-fill timing. */
export function looksLikeBot(body) {
  if (body.website) return 'honeypot'
  const started = Number(body.startedAt)
  const elapsed = Date.now() - started
  if (!started || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return 'timing'
  return null
}

/** Cloudflare Turnstile. Skipped only when no secret is configured (local dev). */
export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  })
  const data = await r.json().catch(() => ({}))
  return data.success === true
}
