import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { listLeads, updateLead, deleteLead } from '../lib/api.js'
import { LEAD_STATUSES } from '../../shared/enquirySchema.js'
import { useSeo } from '../lib/seo.js'

const fmt = (d) => new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })
const badge = { new: 'bg-red-tint text-red-deep', contacted: 'bg-amber-100 text-amber-900', qualified: 'bg-sky-100 text-sky-900', won: 'bg-green-100 text-green-900', lost: 'bg-mist text-ink-soft' }

function Login({ onDone }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) setError('Email or password is incorrect.')
    else onDone()
  }
  return (
    <form onSubmit={submit} className="mx-auto grid max-w-sm gap-4 rounded-2xl border border-line p-8">
      <h1 className="text-3xl">Admin sign in</h1>
      <label className="grid gap-1.5 font-semibold">Email<input className="field" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label className="grid gap-1.5 font-semibold">Password<input className="field" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      {error && <p role="alert" className="font-semibold text-red-deep">{error}</p>}
      <button className="btn btn-red" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
    </form>
  )
}

function LeadCard({ lead, token, onChange, onRemove, onError }) {
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState(lead.notes || '')
  const save = async (patch) => {
    try { const { lead: l } = await updateLead(token, { id: lead.id, ...patch }); onChange(l) } catch (e) { onError(e) }
  }
  const remove = async () => {
    if (!window.confirm(`Delete the enquiry from ${lead.name}? This cannot be undone.`)) return
    try { await deleteLead(token, lead.id); onRemove(lead.id) } catch (e) { onError(e) }
  }
  return (
    <li className="rounded-xl border border-line bg-white">
      <button className="grid w-full gap-1 p-4 text-left sm:grid-cols-[1.2fr_1fr_auto_auto] sm:items-center sm:gap-4" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span><span className="font-bold">{lead.name}</span><span className="block text-sm text-ink-soft">{lead.company || lead.email}</span></span>
        <span className="text-sm text-ink-soft">{lead.service}</span>
        <span className="text-sm text-ink-soft">{fmt(lead.created_at)}</span>
        <span className={`w-fit rounded-full px-3 py-1 text-sm font-semibold capitalize ${badge[lead.status]}`}>{lead.status}</span>
      </button>
      {open && (
        <div className="grid gap-4 border-t border-line p-4">
          <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="font-bold">Phone</dt><dd><a className="text-red-deep underline" href={`tel:+91${lead.phone}`}>+91 {lead.phone}</a></dd></div>
            <div><dt className="font-bold">Email</dt><dd><a className="break-all text-red-deep underline" href={`mailto:${lead.email}`}>{lead.email}</a></dd></div>
            <div><dt className="font-bold">City</dt><dd>{lead.city || 'Not given'}</dd></div>
            <div><dt className="font-bold">Budget</dt><dd>{lead.budget}</dd></div>
          </dl>
          <p className="whitespace-pre-wrap rounded-lg bg-mist p-3">{lead.message}</p>
          <div className="grid gap-3 sm:grid-cols-[12rem_1fr]">
            <label className="grid gap-1.5 text-sm font-bold">Status
              <select className="field font-normal capitalize" value={lead.status} onChange={(e) => save({ status: e.target.value })}>
                {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-bold">Internal notes
              <textarea className="field font-normal" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={() => notes !== (lead.notes || '') && save({ notes })} />
            </label>
          </div>
          <div className="flex gap-3">
            <a className="btn btn-line !min-h-10" href={`https://wa.me/91${lead.phone}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <button className="btn btn-line !min-h-10 !border-red !text-red-deep hover:!bg-red hover:!text-white" onClick={remove}>Delete</button>
          </div>
        </div>
      )}
    </li>
  )
}

function toCsv(leads) {
  const cols = ['created_at', 'name', 'email', 'phone', 'company', 'city', 'service', 'budget', 'status', 'message', 'notes']
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return [cols.join(','), ...leads.map((l) => cols.map((c) => esc(l[c])).join(','))].join('\n')
}

function Dashboard({ session }) {
  const token = session.access_token
  const [leads, setLeads] = useState(null)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try { setError(''); setLeads((await listLeads(token, { status, q })).leads) }
    catch (e) { setError(e.message) }
  }, [token, status, q])
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t) }, [load])

  const download = () => {
    const url = URL.createObjectURL(new Blob([toCsv(leads)], { type: 'text/csv' }))
    Object.assign(document.createElement('a'), { href: url, download: 'ethixweb-leads.csv' }).click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">Leads{leads && <span className="ml-2 text-ink-soft">({leads.length})</span>}</h1>
        <div className="flex gap-3">
          <button className="btn btn-line !min-h-10" onClick={download} disabled={!leads?.length}>Export CSV</button>
          <button className="btn btn-line !min-h-10" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_12rem]">
        <input className="field" type="search" placeholder="Search name, email, phone or company" aria-label="Search leads" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="field capitalize" aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>{LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-tint p-3 font-semibold text-red-deep">{error}</p>}
      {!leads && !error && <p className="mt-8 text-ink-soft">Loading leads...</p>}
      {leads?.length === 0 && <p className="mt-8 rounded-xl border border-dashed border-line p-8 text-center text-ink-soft">No leads match. New enquiries from the contact form will appear here.</p>}
      <ul className="mt-5 grid gap-3">
        {leads?.map((l) => (
          <LeadCard key={l.id} lead={l} token={token} onError={(e) => setError(e.message)}
            onChange={(u) => setLeads((all) => all.map((x) => (x.id === u.id ? u : x)))}
            onRemove={(id) => setLeads((all) => all.filter((x) => x.id !== id))} />
        ))}
      </ul>
    </div>
  )
}

export default function Admin() {
  useSeo('Admin | Ethixweb India')
  const [session, setSession] = useState(undefined)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])
  return (
    <div className="wrap py-10">
      <meta name="robots" content="noindex" />
      {session === undefined ? <p>Loading...</p> : session ? <Dashboard session={session} /> : <Login onDone={() => {}} />}
    </div>
  )
}
