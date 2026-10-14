import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { NAV, SITE } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-white/70">
            Websites, AI agents, CRM and growth for Indian businesses. Part of the global Ethixweb team.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-base font-bold tracking-normal">Pages</h2>
          <ul className="mt-3 space-y-2">
            {NAV.map((n) => <li key={n.to}><Link className="text-white/70 hover:text-white" to={n.to}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-base font-bold tracking-normal">Talk to us</h2>
          <ul className="mt-3 space-y-2 text-white/70">
            <li><a className="hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a className="hover:text-white" href={`https://wa.me/${SITE.whatsapp}`} rel="noopener noreferrer" target="_blank">WhatsApp us</a></li>
            <li>{SITE.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Ethixweb. All rights reserved.</p>
          <p>Made for Indian businesses. Prices exclude GST.</p>
        </div>
      </div>
    </footer>
  )
}
