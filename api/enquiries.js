import { enquirySchema } from '../shared/enquirySchema.js'
import { db } from './_lib/supabase.js'
import { send, methodGuard, clientIp, handle } from './_lib/http.js'
import { hashIp, looksLikeBot, verifyTurnstile } from './_lib/spam.js'

const MAX_PER_HOUR = 5

export default handle(async (req, res) => {
  if (!methodGuard(req, res, ['POST'])) return

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

  // Bots get a fake success so they do not learn what tripped the filter.
  if (looksLikeBot(body)) return send(res, 201, { ok: true })

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) {
    const fields = {}
    for (const issue of parsed.error.issues) fields[issue.path[0]] ??= issue.message
    return send(res, 422, { error: 'validation_failed', message: 'Please fix the highlighted fields', fields })
  }

  const ip = clientIp(req)
  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return send(res, 400, { error: 'captcha_failed', message: 'Verification failed. Refresh and try again.' })
  }

  const ipHash = hashIp(ip)
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count, error: countError } = await db()
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since)
  if (countError) throw countError
  if ((count ?? 0) >= MAX_PER_HOUR) {
    return send(res, 429, { error: 'rate_limited', message: 'Too many enquiries from your network. Please try again later.' })
  }

  const { consent, ...lead } = parsed.data
  const { error } = await db().from('leads').insert({
    ...lead,
    consent_given: consent,
    ip_hash: ipHash,
    user_agent: String(req.headers['user-agent'] || '').slice(0, 300),
  })
  if (error) throw error

  return send(res, 201, { ok: true })
})
