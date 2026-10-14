import { Link } from 'react-router-dom'
import { INDUSTRIES } from '../data/content.js'
import { useSeo } from '../lib/seo.js'

const VALUES = [
  { t: 'Senior people on your account', d: 'The person who scopes your project is the person who builds it. No hand-offs to a junior team you never met.' },
  { t: 'Built for Indian conditions', d: 'We test on mid-range Android phones, patchy 4G and festive-season traffic spikes, because that is where your customers are.' },
  { t: 'Honest pricing', d: 'Fixed written quotes in rupees. If scope changes, you hear it from us before the invoice, not after.' },
  { t: 'Systems that outlast the launch', d: 'Clean code, documented handover and care plans, so you are never locked in.' },
]

export default function About() {
  useSeo('About | Ethixweb India', 'The India story behind Ethixweb: a senior digital operations team serving Indian businesses with websites, AI and growth.')
  return (
    <>
      <section className="border-b border-line bg-mist py-14 md:py-20">
        <div className="wrap">
          <h1 className="h1 max-w-3xl">A global tech team, with an India hub that works in your time zone.</h1>
          <p className="lead mt-6">Ethixweb started by running websites, automation and marketing for businesses abroad. Our India team brings the same discipline to the businesses we grew up around.</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h2">The India story</h2>
            <div className="mt-5 space-y-4 text-lg text-ink-soft">
              <p>India does business differently. Customers message on WhatsApp before they open an email. They pay by UPI, ask for COD, and switch between Hindi and English in the same sentence.</p>
              <p>Most agencies serving India either copy a Western template or quote in dollars with overseas hours. We built the India practice to fix that: rupee pricing, support in IST, and products that fit how your customers already behave.</p>
              <p>Behind it sits the wider Ethixweb network, so you get a local team with global engineering depth.</p>
            </div>
          </div>
          <div>
            <h2 className="h2">Where we work</h2>
            <p className="mt-5 text-lg text-ink-soft">We build for businesses across India, remotely, and meet in person for larger engagements.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {INDUSTRIES.map((i) => <li key={i} className="rounded-xl border border-line px-4 py-3 font-semibold">{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-mist py-14 md:py-20">
        <div className="wrap">
          <h2 className="h2 max-w-2xl">How we work</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.t} className="border-l-4 border-red pl-5">
                <h3 className="text-xl">{v.t}</h3>
                <p className="mt-2 text-ink-soft">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red py-14 text-white">
        <div className="wrap flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="h2 max-w-xl">Meet the team that will run your tech.</h2>
          <Link to="/contact" className="btn btn-white shrink-0">Talk to us</Link>
        </div>
      </section>
    </>
  )
}
