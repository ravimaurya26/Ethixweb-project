export const SITE = {
  name: 'Ethixweb India',
  email: 'info@ethixweb.com',
  hours: 'Mon to Sat, 10 AM to 7 PM IST',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999',
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const SERVICE_GROUPS = [
  {
    id: 'websites',
    title: 'Websites and web apps',
    blurb: 'Fast, mobile-first sites for customers who browse on 4G phones.',
    price: 'From ₹35,000',
    items: ['Business and brand websites', 'Landing pages for ad campaigns', 'Online stores with UPI, cards and COD', 'Booking portals and dashboards'],
  },
  {
    id: 'ai',
    title: 'AI receptionists and chatbots',
    blurb: 'Agents that answer calls and WhatsApp in English, Hindi and Hinglish.',
    price: 'From ₹15,000 a month',
    items: ['WhatsApp Business API assistants', 'Voice agents that book appointments', 'Lead qualification and routing', 'Missed-call follow-up'],
  },
  {
    id: 'crm',
    title: 'CRM and automation',
    blurb: 'One pipeline instead of five spreadsheets and a notebook.',
    price: 'From ₹25,000',
    items: ['HubSpot, Zoho and GoHighLevel setup', 'Razorpay and payment-link flows', 'Invoice and GST-ready workflows', 'Zapier, Make and custom API syncs'],
  },
  {
    id: 'growth',
    title: 'SEO and local search',
    blurb: 'Be the business people find when they search "near me" in your city.',
    price: 'From ₹20,000 a month',
    items: ['Google Business Profile management', 'Technical and local SEO', 'Content in English and Hindi', 'Monthly ranking and call reports'],
  },
  {
    id: 'ads',
    title: 'Google and Meta ads',
    blurb: 'Campaigns judged on enquiries and sales, not clicks.',
    price: 'From ₹15,000 a month plus ad spend',
    items: ['Search, Maps and YouTube campaigns', 'Instagram and Facebook lead ads', 'Click-to-WhatsApp ads', 'Conversion tracking you can trust'],
  },
  {
    id: 'support',
    title: 'Care plans and support',
    blurb: 'A real person who replies in your time zone when something breaks.',
    price: 'From ₹6,000 a month',
    items: ['Uptime, security and backups', 'Content and offer updates', 'Accessibility and speed audits', 'Priority fixes during festive sales'],
  },
]

export const PROCESS = [
  { title: 'Discover', text: 'A 30-minute call on WhatsApp, phone or Google Meet. We map your customers, your current leads and where enquiries leak.' },
  { title: 'Design', text: 'You see layout and copy on your own phone before any code is written. Two rounds of changes are included.' },
  { title: 'Build', text: 'Weekly demos on a live link, tested on budget Android phones and slow networks, not just on laptops.' },
  { title: 'Launch and grow', text: 'We go live, connect tracking and CRM, then stay on for fixes, reports and the next campaign.' },
]

// Representative engagements. Replace with real case studies from ethixweb.com/our-work.
export const WORK = [
  {
    sector: 'Multi-clinic healthcare',
    title: 'Appointment booking by WhatsApp and phone',
    result: 'Patients book in Hindi or English, and the agent handles routine slots so the front desk can focus on people in the room.',
    tags: ['AI receptionist', 'WhatsApp API', 'CRM'],
  },
  {
    sector: 'D2C skincare brand',
    title: 'A faster store built for repeat orders',
    result: 'UPI-first checkout, COD verification and a click-to-WhatsApp ad flow tied to one dashboard.',
    tags: ['Online store', 'Razorpay', 'Meta ads'],
  },
  {
    sector: 'Coaching institute',
    title: 'Enquiry-to-admission pipeline',
    result: 'Every form, call and ad lead lands in one CRM with follow-up reminders for counsellors.',
    tags: ['Web app', 'CRM', 'SEO'],
  },
]

export const COMPARE = [
  ['Pricing', 'Quotes in dollars, hidden extras', 'Fixed rupee packages with GST invoice'],
  ['Support hours', 'Overseas time zones', 'Your working hours, in IST'],
  ['Customer channel', 'Email forms only', 'WhatsApp, call and form, all tracked'],
  ['Language', 'English only', 'English, Hindi and Hinglish flows'],
  ['Speed target', 'Tested on a laptop', 'Tested on mid-range Android over 4G'],
  ['Your account', 'One of hundreds', 'A senior team that knows your name'],
]

export const FACTS = [
  { big: '50+', label: 'projects delivered' },
  { big: '< 1 hr', label: 'average first response' },
  { big: 'IST', label: 'support in your time zone' },
  { big: '₹', label: 'transparent rupee pricing' },
]

export const INDUSTRIES = ['Clinics and hospitals', 'D2C and retail', 'Coaching and education', 'Real estate', 'Manufacturing and export', 'Fintech and services']
