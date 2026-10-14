import { Link } from 'react-router-dom'
import { SERVICE_GROUPS } from '../data/content.js'
import { useSeo } from '../lib/seo.js'

export default function Services() {
  useSeo('Services | Ethixweb India', 'Websites, AI receptionists, CRM, SEO, ads and care plans for Indian businesses, with starting prices in rupees.')
  return (
    <>
      <section className="border-b border-line bg-mist py-14 md:py-20">
        <div className="wrap">
          <h1 className="h1 max-w-3xl">Everything your digital operation needs, under one team.</h1>
          <p className="lead mt-6">Starting prices are in rupees and exclude GST. Every project gets a fixed written quote before work begins.</p>
        </div>
      </section>
      <section className="py-14 md:py-20">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {SERVICE_GROUPS.map((s) => (
            <article id={s.id} key={s.id} className="scroll-mt-24 rounded-2xl border border-line p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl">{s.title}</h2>
                <p className="font-semibold text-red-deep">{s.price}</p>
              </div>
              <p className="mt-3 text-ink-soft">{s.blurb}</p>
              <ul className="mt-5 space-y-2.5">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <svg className="mt-1 h-5 w-5 shrink-0 text-red" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-ink py-14 text-white">
        <div className="wrap flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="h2 max-w-xl">Not sure what you need? Start with a 30-minute call.</h2>
          <Link to="/contact" className="btn btn-red shrink-0">Book a free call</Link>
        </div>
      </section>
    </>
  )
}
