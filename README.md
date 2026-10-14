# Ethixweb India

An India-specific redesign of [ethixweb.com](https://www.ethixweb.com): premium, fast, and built around how Indian customers actually buy.

**Live:** _add Vercel URL_ · **Admin demo:** _add email / password_

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React 18 + Vite + React Router | Small bundle, route-level code splitting |
| Styling | Tailwind CSS v4 with design tokens in `@theme` | One source of truth for colour, type and spacing |
| Fonts | Bricolage Grotesque (display) + Hanken Grotesk (body), self-hosted via Fontsource | No third-party font request, `font-display: swap` |
| API | Vercel serverless functions in `/api` | Same repo, same deploy, no separate server |
| Database | Supabase Postgres | Real DB, Row Level Security, built-in Auth |
| Validation | Zod, one schema in `/shared` used by browser **and** server | Client and server can never disagree |
| Spam | Honeypot + fill-time check + Cloudflare Turnstile + per-IP rate limit | Layered, invisible to real users |

## API

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/enquiries` | POST | Public | Validate, spam-check, save a lead |
| `/api/admin/leads` | GET | Admin | List leads, filter by `status`, search with `q` |
| `/api/admin/leads` | PATCH | Admin | Update `status` / `notes` |
| `/api/admin/leads?id=` | DELETE | Admin | Delete a lead |

Errors are JSON `{ error, message, fields? }` with correct status codes (405, 422, 429, 401, 403, 500). Admin routes verify the Supabase JWT server-side and check the email against `ADMIN_EMAILS`. The `leads` table has RLS enabled with no policies, so the public anon key cannot read or write it; only the API (service-role key) can.

## Run locally

```bash
npm install
cp .env.example .env        # fill in values
# run supabase/schema.sql in the Supabase SQL editor
# create an admin user in Supabase > Authentication, and put its email in ADMIN_EMAILS
npx vercel dev              # runs the site and /api together
```

`npm run dev` runs the frontend only (the API needs `vercel dev`).

## Deploy

1. Push to GitHub (`.env` is git-ignored; only `.env.example` is committed).
2. Import the repo in Vercel and add every variable from `.env.example`.
3. Add your Vercel domain to the Turnstile site's allowed hostnames.

## Design rationale

### What makes it India-specific
- **Rupee pricing everywhere**, with "from ₹" anchors per service and "exclude GST" noted, so buyers do not need to ask what it costs.
- **WhatsApp first.** A persistent WhatsApp button, a WhatsApp CTA in the hero, and a hero that shows an AI receptionist booking a clinic appointment in **Hinglish**. That single image explains the offer and the market.
- **Indian form fields.** Mobile number validated as a 10-digit Indian number (6-9 start), accepting `+91`, `0` or spaces. City field. Budget bands in ₹ and lakh.
- **IST support and hours** stated plainly; admin timestamps shown in IST.
- **India-relevant services:** UPI and Razorpay flows, GST-ready invoicing, Google Business Profile and local SEO, click-to-WhatsApp ads, Hindi content.
- **Compliance-minded:** explicit consent checkbox on the enquiry form, stored with each lead (DPDP Act friendly), and only a salted hash of the IP is kept.
- **Built for the real device:** mobile-first layout, minimal JavaScript and self-hosted fonts, because many visitors are on mid-range Android phones over 4G.

### What improved over the current site
| Current site | This redesign |
|---|---|
| US-first copy ("US First", "Serving Kent, WA", Wyoming LLC) | India-first copy and proof points |
| Heavy globe, live clocks and activity ticker | One purposeful hero moment; no heavy widgets, so PageSpeed stays high |
| Testimonials block repeated four times in the markup | Each section appears once |
| Generic contact form + Calendly | Validated, spam-protected form saved to a real database, plus WhatsApp and email |
| No pricing signals | Starting prices per service |
| No lead management | Protected `/admin` with search, status pipeline, notes, WhatsApp link and CSV export |

### Visual system
Clean white ground, near-black ink and a single strong Ethixweb red (`#D11A2A`) used only where action or emphasis is needed. Bricolage Grotesque gives headlines character; Hanken Grotesk keeps body text calm. The WhatsApp-green chat card is the one memorable element; everything around it stays quiet.

### Performance decisions
Route-level code splitting (the admin and Supabase client never load for visitors), form validation library loaded only on the contact route, Turnstile loaded only when the form nears the viewport, no animation library, one CSS-only page-load sequence that respects `prefers-reduced-motion`.

## Notes and assumptions
- The logo is a placeholder wordmark; drop the official asset into `/public` and update `src/components/Logo.jsx`.
- Featured work in `src/data/content.js` is representative; replace with real case studies.
- Support hours and the WhatsApp number (`VITE_WHATSAPP_NUMBER`) should be confirmed with Ethixweb.
