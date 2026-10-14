export class ApiError extends Error {
  constructor(message, status, fields) {
    super(message)
    this.status = status
    this.fields = fields || {}
  }
}

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    })
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.message || 'Something went wrong. Please try again.', res.status, data.fields)
  return data
}

export const submitEnquiry = (payload) => request('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) })

const auth = (token) => ({ Authorization: `Bearer ${token}` })
export const listLeads = (token, { status = '', q = '' } = {}) =>
  request(`/api/admin/leads?${new URLSearchParams({ ...(status && { status }), ...(q && { q }) })}`, { headers: auth(token) })
export const updateLead = (token, body) => request('/api/admin/leads', { method: 'PATCH', headers: auth(token), body: JSON.stringify(body) })
export const deleteLead = (token, id) => request(`/api/admin/leads?id=${id}`, { method: 'DELETE', headers: auth(token) })
