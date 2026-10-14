import { useEffect, useRef, useState } from 'react'
import { BUDGETS, SERVICES, enquirySchema } from '../../shared/enquirySchema.js'
import { submitEnquiry, ApiError } from '../lib/api.js'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const EMPTY = { name: '', email: '', phone: '', company: '', city: '', service: '', budget: '', message: '', consent: false }

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-ink-soft">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm font-semibold text-red-deep">{error}</p>}
    </div>
  )
}

export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [formError, setFormError] = useState('')
  const [token, setToken] = useState('')
  const startedAt = useRef(Date.now())
  const formRef = useRef(null)
  const widgetRef = useRef(null)

  // Load Cloudflare Turnstile only once the form is near the viewport.
  useEffect(() => {
    if (!SITE_KEY || !formRef.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const mount = () => window.turnstile?.render(widgetRef.current, { sitekey: SITE_KEY, callback: setToken, 'expired-callback': () => setToken('') })
      if (window.turnstile) return mount()
      const s = document.createElement('script')
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.onload = mount
      document.head.appendChild(s)
    }, { rootMargin: '300px' })
    io.observe(formRef.current)
    return () => io.disconnect()
  }, [])

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const props = (k) => ({ id: k, name: k, value: values[k], onChange: set(k), className: 'field', 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  async function onSubmit(e) {
    e.preventDefault()
    setFormError('')
    const parsed = enquirySchema.safeParse(values)
    if (!parsed.success) {
      const next = {}
      for (const i of parsed.error.issues) next[i.path[0]] ??= i.message
      setErrors(next)
      formRef.current.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }
    if (SITE_KEY && !token) return setFormError('Please complete the verification below the form.')
    setErrors({})
    setStatus('sending')
    try {
      await submitEnquiry({ ...values, website: formRef.current.website.value, startedAt: startedAt.current, turnstileToken: token })
      setStatus('done')
    } catch (err) {
      setStatus('idle')
      if (err instanceof ApiError && err.fields) setErrors(err.fields)
      setFormError(err.message)
      if (window.turnstile) window.turnstile.reset()
      setToken('')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-2xl border border-line bg-red-tint p-8">
        <h3 className="font-display text-2xl font-bold">Thank you, {values.name.split(' ')[0]}. We have your enquiry.</h3>
        <p className="mt-3 text-ink-soft">A senior member of the team will reply within one working hour ({`Mon to Sat, 10 AM to 7 PM IST`}). For anything urgent, message us on WhatsApp.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5" aria-label="Project enquiry">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}><input {...props('name')} autoComplete="name" /></Field>
        <Field id="phone" label="Mobile number" error={errors.phone} hint="10-digit Indian number. +91 is fine.">
          <input {...props('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
        </Field>
      </div>
      <Field id="email" label="Work email" error={errors.email}><input {...props('email')} type="email" autoComplete="email" /></Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="company" label="Business name (optional)" error={errors.company}><input {...props('company')} autoComplete="organization" /></Field>
        <Field id="city" label="City (optional)" error={errors.city}><input {...props('city')} autoComplete="address-level2" /></Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="service" label="What do you need?" error={errors.service}>
          <select {...props('service')}><option value="">Choose one</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
        </Field>
        <Field id="budget" label="Budget" error={errors.budget}>
          <select {...props('budget')}><option value="">Choose a range</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
        </Field>
      </div>
      <Field id="message" label="Tell us about your business" error={errors.message}>
        <textarea {...props('message')} rows={5} placeholder="What do you sell, who are your customers, and what is not working today?" />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent" checked={values.consent} onChange={set('consent')} className="mt-1.5 h-5 w-5 accent-red" aria-invalid={!!errors.consent} />
          <span className="text-ink-soft">I agree that Ethixweb may contact me by phone, WhatsApp or email about this enquiry, and store my details for that purpose.</span>
        </label>
        {errors.consent && <p role="alert" className="mt-1 text-sm font-semibold text-red-deep">{errors.consent}</p>}
      </div>

      {SITE_KEY && <div ref={widgetRef} />}
      {formError && <p role="alert" className="rounded-lg bg-red-tint p-3 font-semibold text-red-deep">{formError}</p>}
      <button className="btn btn-red w-full sm:w-auto sm:justify-self-start" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send enquiry'}
      </button>
    </form>
  )
}
