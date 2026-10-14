import { z } from 'zod'

export const SERVICES = [
  'Website or web app',
  'AI receptionist (voice or WhatsApp)',
  'CRM and automation',
  'SEO and Google Business Profile',
  'Ads (Google and Meta)',
  'Maintenance and support',
  'Not sure yet',
]

export const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 to ₹2 lakh',
  '₹2 lakh to ₹5 lakh',
  '₹5 lakh and above',
  'Need help deciding',
]

/** Normalises +91 / 91 / 0 prefixes and separators to a bare 10-digit mobile number. */
export function normalisePhone(input = '') {
  let digits = String(input).replace(/[^\d+]/g, '')
  digits = digits.replace(/^\+?91/, '').replace(/^0+/, '')
  return digits
}

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name').max(80, 'Name is too long'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address').max(120),
  phone: z
    .string()
    .transform(normalisePhone)
    .refine((v) => /^[6-9]\d{9}$/.test(v), 'Enter a valid 10-digit Indian mobile number'),
  company: z.string().trim().max(100).optional().default(''),
  city: z.string().trim().max(60).optional().default(''),
  service: z.enum(SERVICES, { errorMap: () => ({ message: 'Choose a service' }) }),
  budget: z.enum(BUDGETS, { errorMap: () => ({ message: 'Choose a budget range' }) }),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters)').max(2000, 'Keep it under 2000 characters'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please agree so we can contact you' }) }),
})

export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost']

export const leadUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(LEAD_STATUSES).optional(),
  notes: z.string().max(4000).optional(),
})
