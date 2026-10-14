export function send(res, status, body) {
  res.status(status).setHeader('Cache-Control', 'no-store')
  return res.json(body)
}

export function methodGuard(req, res, allowed) {
  if (!allowed.includes(req.method)) {
    res.setHeader('Allow', allowed.join(', '))
    send(res, 405, { error: 'method_not_allowed', message: `Use ${allowed.join(' or ')}` })
    return false
  }
  return true
}

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  return (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
}

export function handle(fn) {
  return async (req, res) => {
    try {
      await fn(req, res)
    } catch (err) {
      console.error('[api]', err)
      send(res, 500, { error: 'server_error', message: 'Something went wrong on our side. Please try again.' })
    }
  }
}
