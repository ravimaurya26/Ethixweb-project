import { leadUpdateSchema, LEAD_STATUSES } from '../../shared/enquirySchema.js'
import { db } from '../_lib/supabase.js'
import { requireAdmin } from '../_lib/auth.js'
import { send, methodGuard, handle } from '../_lib/http.js'

export default handle(async (req, res) => {
  if (!methodGuard(req, res, ['GET', 'PATCH', 'DELETE'])) return
  const user = await requireAdmin(req, res)
  if (!user) return

  if (req.method === 'GET') {
    const { status, q } = req.query
    let query = db().from('leads').select('*').order('created_at', { ascending: false }).limit(500)
    if (status && LEAD_STATUSES.includes(status)) query = query.eq('status', status)
    if (q) {
      const term = String(q).replace(/[%,()]/g, ' ').slice(0, 60)
      query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%,phone.ilike.%${term}%`)
    }
    const { data, error } = await query
    if (error) throw error
    return send(res, 200, { leads: data })
  }

  if (req.method === 'PATCH') {
    const parsed = leadUpdateSchema.safeParse(req.body)
    if (!parsed.success) return send(res, 422, { error: 'validation_failed', message: 'Invalid update' })
    const { id, ...changes } = parsed.data
    const { data, error } = await db().from('leads').update(changes).eq('id', id).select().single()
    if (error) throw error
    return send(res, 200, { lead: data })
  }

  const id = req.query.id
  if (!/^[0-9a-f-]{36}$/i.test(String(id))) return send(res, 422, { error: 'validation_failed', message: 'Invalid id' })
  const { error } = await db().from('leads').delete().eq('id', id)
  if (error) throw error
  return send(res, 200, { ok: true })
})
