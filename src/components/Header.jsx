import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { NAV } from '../data/content.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const link = ({ isActive }) =>
    `rounded-lg px-3 py-2 font-semibold no-underline transition-colors ${isActive ? 'text-red' : 'text-ink hover:text-red'}`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="Ethixweb India home"><Logo /></Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} end className={link}>{n.label}</NavLink>)}
          <Link to="/contact" className="btn btn-red ml-3 !min-h-10 !px-5 !py-2">Get a quote</Link>
        </nav>
        <button
          className="grid h-11 w-11 place-items-center rounded-lg border border-line md:hidden"
          aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="wrap flex flex-col gap-1 border-t border-line pb-5 pt-3 md:hidden" aria-label="Mobile">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} end className={(s) => `${link(s)} text-lg`}>{n.label}</NavLink>)}
          <Link to="/contact" className="btn btn-red mt-2">Get a quote</Link>
        </nav>
      )}
    </header>
  )
}
