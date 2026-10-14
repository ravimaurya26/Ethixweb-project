import { Link } from 'react-router-dom'
import ChatMock from '../components/ChatMock.jsx'
import { COMPARE, FACTS, INDUSTRIES, PROCESS, SERVICE_GROUPS, SITE, WORK } from '../data/content.js'
import { useSeo } from '../lib/seo.js'

export default function Home() {
  useSeo('Ethixweb India | Websites, AI and growth for Indian businesses', 'We run the tech so you can run the business. Websites, WhatsApp and voice AI agents, CRM and SEO for Indian businesses, priced in rupees.')
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-white">
        <div className="wrap grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="h1">We run the tech. You run the business.</h1>
            <p className="lead mt-6">
              A senior team that builds your website, answers your customers on WhatsApp and phone, and connects your leads to one CRM. Priced in rupees, supported in IST.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Link to="/contact" className="btn btn-red">Get a free quote</Link>
              <a className="btn btn-line" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-ink-soft">
              {INDUSTRIES.slice(0, 4).map((i) => <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red" aria-hidden="true" />{i}</li>)}
            </ul>
          </div>
          <ChatMock />
        </div>
      </section>

      {/* Facts */}
      <section aria-label="Ethixweb at a glance" className="border-y border-line bg-mist">
        <dl className="wrap grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt className="font-display text-3xl font-bold text-red">{f.big}</dt>
              <dd className="text-ink-soft">{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <h2 className="h2 max-w-2xl">One accountable team for everything your customers touch.</h2>
          <p className="lead mt-4">From the first Google search to the WhatsApp reminder after the sale.</p>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {SERVICE_GROUPS.map((s) => (
              <li key={s.id} className="grid gap-2 py-6 md:grid-cols-[1.1fr_1.6fr_auto] md:items-baseline md:gap-8">
                <h3 className="text-xl">{s.title}</h3>
                <p className="text-ink-soft">{s.blurb}</p>
                <p className="font-semibold text-red-deep">{s.price}</p>
              </li>
            ))}
          </ul>
          <Link to="/services" className="btn btn-line mt-8">See what is included</Link>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-16 text-white md:py-24">
        <div className="wrap">
          <h2 className="h2 max-w-2xl">From first call to live in weeks, not quarters.</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="border-t-2 border-red pt-5">
                <p className="font-display text-lg font-bold text-red">Step {i + 1}</p>
                <h3 className="mt-1 text-2xl">{p.title}</h3>
                <p className="mt-3 text-white/70">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Work */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <h2 className="h2 max-w-2xl">Built for how Indian customers actually buy.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WORK.map((w) => (
              <article key={w.title} className="flex flex-col rounded-2xl border border-line p-6">
                <p className="font-semibold text-red-deep">{w.sector}</p>
                <h3 className="mt-2 text-2xl">{w.title}</h3>
                <p className="mt-3 flex-1 text-ink-soft">{w.result}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {w.tags.map((t) => <li key={t} className="rounded-full bg-mist px-3 py-1 text-sm font-medium">{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-mist py-16 md:py-24">
        <div className="wrap">
          <h2 className="h2 max-w-2xl">Why Indian businesses choose Ethixweb.</h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">Typical agency compared with Ethixweb India</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="p-4"><span className="sr-only">Topic</span></th>
                  <th scope="col" className="p-4 font-semibold text-ink-soft">Typical agency</th>
                  <th scope="col" className="bg-red-tint p-4 font-bold text-red-deep">Ethixweb India</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([a, b, c]) => (
                  <tr key={a} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 font-semibold">{a}</th>
                    <td className="p-4 text-ink-soft">{b}</td>
                    <td className="bg-red-tint/60 p-4 font-semibold">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red py-16 text-white md:py-20">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="h2 max-w-xl">Tired of being account number 200 at a big agency?</h2>
            <p className="mt-3 max-w-lg text-white/85">Tell us about your business. A senior person replies within one working hour.</p>
          </div>
          <Link to="/contact" className="btn btn-white shrink-0">Start your project</Link>
        </div>
      </section>
    </>
  )
}
