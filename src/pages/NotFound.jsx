import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo.js'

export default function NotFound() {
  useSeo('Page not found | Ethixweb India')
  return (
    <section className="wrap py-24 text-center">
      <h1 className="h1">This page does not exist.</h1>
      <p className="lead mx-auto mt-4">The link may be old or mistyped. Head back home or tell us what you were looking for.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn btn-red">Go home</Link>
        <Link to="/contact" className="btn btn-line">Contact us</Link>
      </div>
    </section>
  )
}
