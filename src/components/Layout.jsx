import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { SITE } from '../data/content.js'

export default function Layout() {
  return (
    <>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi Ethixweb, I would like to discuss a project.')}`}
        target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
        className="fixed bottom-4 right-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-wa px-5 font-bold text-white no-underline shadow-lg"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /></svg>
        <span className="hidden xs:inline">WhatsApp</span>
      </a>
      <ScrollRestoration />
    </>
  )
}
