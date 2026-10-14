import EnquiryForm from '../components/EnquiryForm.jsx'
import { SITE } from '../data/content.js'
import { useSeo } from '../lib/seo.js'

export default function Contact() {
  useSeo('Contact | Ethixweb India', 'Tell us about your project. A senior team member replies within one working hour, Monday to Saturday in IST.')
  return (
    <section className="py-14 md:py-20">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="h1">Tell us what you want to build.</h1>
          <p className="lead mt-5">Share a few details and we will reply within one working hour with next steps and a ballpark in rupees.</p>
          <ul className="mt-8 space-y-5">
            <li><p className="font-bold">WhatsApp</p><a className="text-red-deep underline" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">Message us directly</a></li>
            <li><p className="font-bold">Email</p><a className="text-red-deep underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><p className="font-bold">Hours</p><p className="text-ink-soft">{SITE.hours}</p></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line p-6 sm:p-8">
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}
