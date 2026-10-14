# 🇮🇳 Ethixweb India

An India-specific redesign of [Ethixweb](https://www.ethixweb.com/) — premium, fast, and built around how Indian customers actually buy.

Ethixweb India is a modern, mobile-first website concept for an Indian digital services market. It combines a clean visual identity, transparent INR pricing, WhatsApp-first communication, and a functional lead-management system powered by Supabase.

<p align="center">
  <a href="https://ethixweb-project.vercel.app/">
    <strong>🌐 Live Website</strong>
  </a>
  &nbsp; · &nbsp;
  <a href="https://ethixweb-project.vercel.app/admin">
    <strong>🔐 Admin Dashboard</strong>
  </a>
  &nbsp; · &nbsp;
  <a href="https://github.com/ravimaurya26/Ethixweb-project">
    <strong>💻 GitHub Repository</strong>
  </a>
</p>

---

## 📌 Project Overview

The goal of this project is to redesign the digital experience for Indian customers by replacing generic, US-focused messaging with India-specific content, pricing, services, and customer engagement.

The project includes a responsive marketing website, an enquiry form connected to a real database, spam-protection mechanisms, and a protected admin dashboard for managing leads.

### ✨ Key Features

* 🇮🇳 **India-first experience:** INR pricing, Indian mobile number validation, city fields, and lakh-based budget ranges.
* 📱 **Mobile-first design:** Responsive layouts designed for desktop and mobile devices.
* 💬 **WhatsApp-first communication:** Prominent WhatsApp calls to action and customer engagement.
* 📝 **Functional enquiry form:** Validated submissions saved to Supabase PostgreSQL.
* 🛡️ **Spam protection:** Honeypot, form fill-time checks, Cloudflare Turnstile, and IP-based rate limiting.
* 🔐 **Protected admin dashboard:** Authentication and administrator authorization for lead management.
* 📊 **Lead management:** View, search, filter, update, and export leads.
* 🗃️ **Persistent data storage:** Enquiries and lead statuses are stored in Supabase.
* ⚡ **Performance-focused frontend:** Lightweight dependencies, self-hosted fonts, and optimized production builds.
* 🔍 **SEO-ready pages:** Descriptive metadata, crawlable navigation, and valid page structure.

---

## 🛠️ Tech Stack

| Layer           | Technology                          | Purpose                                          |
| --------------- | ----------------------------------- | ------------------------------------------------ |
| Frontend        | React 18                            | Component-based UI                               |
| Build Tool      | Vite                                | Fast development and optimized production builds |
| Routing         | React Router                        | Client-side navigation                           |
| Styling         | Tailwind CSS v4                     | Responsive styling and design tokens             |
| Typography      | Bricolage Grotesque, Hanken Grotesk | Self-hosted display and body fonts               |
| API             | Vercel Serverless Functions         | Backend endpoints deployed with the website      |
| Database        | Supabase PostgreSQL                 | Persistent enquiry and lead storage              |
| Authentication  | Supabase Auth                       | Admin authentication                             |
| Validation      | Zod                                 | Structured input validation                      |
| Spam Protection | Cloudflare Turnstile                | Bot verification                                 |
| Deployment      | Vercel                              | Hosting and serverless API deployment            |
| Version Control | Git and GitHub                      | Source control and collaboration                 |

### Why this stack?

* **React and Vite:** Provide a component-based frontend with a fast development workflow.
* **Tailwind CSS v4:** Supports responsive layouts and consistent styling.
* **Supabase:** Provides PostgreSQL storage and authentication without maintaining a separate database server.
* **Vercel Functions:** Allow frontend and API deployment from the same repository.
* **Zod:** Helps validate untrusted form input using explicit schemas.
* **Cloudflare Turnstile:** Adds a bot-verification layer to the enquiry workflow.

---

## 🏗️ Project Architecture

The application separates the public website, backend API, and database responsibilities.

```text
                    ┌─────────────────────────┐
                    │       Visitor           │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   React + Vite Frontend │
                    │                         │
                    │ Home, Services, About,  │
                    │ Contact, Admin          │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Vercel Serverless API   │
                    │                         │
                    │ Enquiry validation      │
                    │ Spam protection         │
                    │ Admin authorization     │
                    │ Lead management         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Supabase Platform   │
                    │                         │
                    │ PostgreSQL Database    │
                    │ Supabase Authentication│
                    └─────────────────────────┘
```

The public enquiry endpoint accepts submissions from visitors. Administrative endpoints require authenticated and authorized users before accessing protected lead-management operations.

---

## 🔌 API Documentation

The backend uses Vercel Serverless Functions located in the `/api` directory.

### Available Endpoints

| Endpoint                        | Method | Access | Purpose                                                   |
| ------------------------------- | ------ | ------ | --------------------------------------------------------- |
| `/api/enquiries`                | POST   | Public | Validate an enquiry and save it as a lead                 |
| `/api/admin/leads`              | GET    | Admin  | Retrieve leads, with optional status filtering and search |
| `/api/admin/leads`              | PATCH  | Admin  | Update lead status or notes                               |
| `/api/admin/leads?id=<lead-id>` | DELETE | Admin  | Delete a lead                                             |

### 1. Submit an Enquiry

**Endpoint:** `POST /api/enquiries`

The endpoint validates the submitted data, performs the configured spam checks, and saves an accepted enquiry to the database.

Validation and spam protection include:

* Required field validation.
* Email format validation.
* Indian mobile number validation.
* Service and budget validation.
* Message length restrictions.
* Consent validation.
* Honeypot and form fill-time checks.
* Cloudflare Turnstile verification.
* IP-based rate limiting.

Successful submissions are stored in Supabase for follow-up.

### 2. Retrieve Leads

**Endpoint:** `GET /api/admin/leads`

The administrator can retrieve leads and use supported query parameters to filter by status or search records.

### 3. Update a Lead

**Endpoint:** `PATCH /api/admin/leads`

Allows authorized administrators to update supported lead fields, including status and notes.

Lead statuses:

* `new`
* `contacted`
* `qualified`
* `won`
* `lost`

### 4. Delete a Lead

**Endpoint:** `DELETE /api/admin/leads?id=<lead-id>`

Deletes a specified lead after the request passes the application's administrative authorization checks.

### Error Handling

The API uses JSON responses for errors. Depending on the endpoint and failure condition, HTTP status codes can include:

| Status | Meaning                              |
| ------ | ------------------------------------ |
| `401`  | Authentication required or invalid   |
| `403`  | Authenticated user is not authorized |
| `405`  | HTTP method not supported            |
| `422`  | Input validation failed              |
| `429`  | Rate limit exceeded                  |
| `500`  | Unexpected server error              |

Validation errors may include field-specific information to help the frontend display useful feedback.

---

## 🔐 Security and Data Protection

Security is an important part of the project because enquiry submissions contain personal contact information.

### Authentication and Authorization

* Supabase Auth is used for administrator authentication.
* Administrative API routes are designed to verify the Supabase JWT on the server.
* The administrator's email is checked against the configured `ADMIN_EMAILS` allowlist.
* Authentication and authorization are separate checks: a signed-in user must also be authorized to manage leads.

### Database Security

* Supabase PostgreSQL stores enquiry records.
* Row Level Security (RLS) is enabled on the `leads` table.
* The intended database configuration has no public table-access policies for anonymous visitors.
* Privileged database operations use a server-side service-role key through the API.

**Important:** Supabase service-role credentials must remain private. Never expose them in frontend code, public repositories, or variables prefixed with `VITE_`.

### Spam Prevention

The enquiry workflow uses multiple protection layers:

1. **Honeypot:** Helps identify automated submissions.
2. **Fill-time check:** Helps flag submissions completed unusually quickly.
3. **Cloudflare Turnstile:** Verifies the visitor through a bot-protection challenge.
4. **Rate limiting:** Limits repeated submissions according to the configured policy.
5. **Server-side validation:** Prevents client-side validation from being treated as a security boundary.

### Privacy-Conscious Design

* The enquiry form includes an explicit consent checkbox.
* The application is designed to retain only the information required for lead management.
* A salted IP hash can be used for rate-limiting purposes instead of retaining the raw IP address, depending on the implementation.
* Environment variables keep secrets out of the source code.

These measures support a privacy-conscious approach but do not, by themselves, establish legal compliance. Production use should include appropriate privacy notices, retention rules, access controls, and a review of applicable Indian data-protection requirements.

---

## 🇮🇳 Design Rationale

The redesign focuses on how Indian businesses discover, evaluate, and purchase digital services.

### 1. India-Specific Pricing

Pricing uses Indian rupees and lakh-based budget ranges.

Examples include:

* Under ₹50,000
* ₹50,000 to ₹2 lakh
* ₹2 lakh to ₹5 lakh
* ₹5 lakh and above
* Need help deciding

Starting prices and GST-related notes help potential customers understand the expected investment before contacting the business.

### 2. WhatsApp-First Communication

WhatsApp is an important communication channel for many Indian businesses.

The website includes prominent WhatsApp calls to action and a conversational hero concept demonstrating an AI receptionist responding to a clinic appointment enquiry in Hinglish.

This makes the proposed service easier to understand in a familiar, locally relevant context.

### 3. Indian Form Fields

The enquiry form is designed around Indian business requirements:

* Indian mobile number validation.
* Support for common phone-number prefixes and separators.
* City field for location context.
* INR-based budget bands.
* Service categories relevant to Indian small businesses.

The intended mobile validation accepts a ten-digit Indian mobile number beginning with 6, 7, 8, or 9 after normalization.

### 4. India-Relevant Services

The service offering highlights capabilities relevant to local businesses, including:

* Websites and web applications.
* AI receptionists for voice or WhatsApp.
* CRM integrations and business automation.
* Google Business Profile and local SEO.
* Google and Meta advertising.
* UPI and Razorpay payment integrations.
* GST-ready invoicing workflows.
* Hindi content and local customer communication.
* Website maintenance and technical support.

These are service categories and integration possibilities, not a claim that every integration has been implemented in this project.

### 5. Local Business Context

The design emphasizes mobile usability, clear pricing, direct communication, and practical service explanations rather than relying on elaborate visual effects.

Support hours and the WhatsApp contact details should be confirmed with the business before production use.

### 6. Privacy-Conscious Enquiry Handling

Explicit consent, server-side validation, protected lead access, and limited handling of IP-related data help establish a more responsible enquiry workflow.

---

## 🎨 Visual System

The design uses a restrained visual language to keep attention on the services and calls to action.

| Element              | Design Decision                             |
| -------------------- | ------------------------------------------- |
| Background           | Clean white                                 |
| Primary text         | Near-black                                  |
| Brand accent         | Ethixweb red `#D11A2A`                      |
| Display typography   | Bricolage Grotesque                         |
| Body typography      | Hanken Grotesk                              |
| Interaction emphasis | Red calls to action and selected highlights |
| Chat demonstration   | WhatsApp-inspired green                     |
| Layout               | Responsive and mobile-first                 |

### Design Principles

* Use red selectively for action and emphasis.
* Keep content readable and navigation straightforward.
* Use typography to establish hierarchy.
* Avoid unnecessary visual effects that compete with the main message.
* Preserve consistent spacing and responsive behavior.
* Respect the user's reduced-motion preference.

---

## ⚡ Performance and Quality

The deployed website was evaluated using Google Lighthouse.

### Lighthouse Scores

| Category       | Mobile | Desktop |
| -------------- | -----: | ------: |
| Performance    |     98 |     100 |
| Accessibility  |     96 |      96 |
| Best Practices |    100 |     100 |
| SEO            |    100 |     100 |

All eight reported category scores are 90 or higher.

### Desktop Lab Metrics

| Metric                         | Result |
| ------------------------------ | -----: |
| First Contentful Paint (FCP)   |  0.4 s |
| Largest Contentful Paint (LCP) |  0.4 s |
| Total Blocking Time (TBT)      |   0 ms |
| Cumulative Layout Shift (CLS)  |      0 |
| Speed Index                    |  0.6 s |

*These figures are from the Lighthouse lab report captured during development. Results can vary with the device, network, browser, and test conditions. The LCP figure is reported as recorded in that test.*

### Performance Decisions

* Use Vite for optimized production builds.
* Self-host display and body fonts using Fontsource.
* Avoid unnecessary animation libraries.
* Use CSS for lightweight page-load effects.
* Respect `prefers-reduced-motion`.
* Load form-specific functionality only where needed.
* Keep the admin experience separate from the public-facing interface where practical.
* Configure caching for fingerprinted static assets.
* Disable production source maps in the Vite build configuration.

### Accessibility

The latest Lighthouse accessibility score is **96**.

Further improvements include reviewing low-contrast text, especially in secondary labels, process sections, CTA areas, footer content, and the WhatsApp button.

The target is to maintain readable text and sufficient contrast while preserving the brand's visual identity.

### SEO

The latest Lighthouse SEO score is **100**.

The website includes descriptive page metadata, crawlable navigation, and a structure designed to help search engines understand the available pages.

---

## 🆚 What Improved Over the Existing Website?

| Existing Experience                          | Ethixweb India Redesign                                |
| -------------------------------------------- | ------------------------------------------------------ |
| US-focused messaging and business references | India-first content and service context                |
| Heavy visual elements and activity widgets   | A more focused, lightweight hero experience            |
| Repeated testimonial markup                  | More deliberate section structure                      |
| Generic contact flow                         | Validated enquiry form backed by a database            |
| Limited pricing context                      | INR-based starting prices and budget ranges            |
| No integrated lead-management workflow       | Protected admin dashboard                              |
| Limited local customer context               | Indian phone validation, city field, and WhatsApp CTAs |
| Separate customer communication paths        | Website enquiry, WhatsApp, and email options           |

This comparison describes the design direction and intended improvements; it does not imply that every difference has been independently audited against the existing website.

---

## 📂 Project Structure

The project uses a Vite frontend and Vercel serverless API functions.

```text
Ethixweb-project/
├── api/
│   ├── admin/
│   │   └── leads.js
│   ├── _lib/
│   └── enquiries.js
├── public/
├── shared/
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   └── ...
├── supabase/
│   └── schema.sql
├── .env.example
├── .gitignore
├── package.json
├── vercel.json
├── vite.config.js
└── README.md
```

*The tree illustrates the principal project areas. Individual files and folders may differ slightly depending on the current repository version.*

---

## 🚀 Run Locally

### Prerequisites

Install the following:

* Node.js and npm.
* A Supabase project.
* A Cloudflare Turnstile site configured for local development.
* Vercel CLI for running the frontend and serverless API together.

### Step 1: Clone the Repository

```bash
git clone https://github.com/ravimaurya26/Ethixweb-project.git
cd Ethixweb-project
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Copy the example environment file:

**Windows Command Prompt:**

```bat
copy .env.example .env
```

**PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS or Linux:**

```bash
cp .env.example .env
```

Fill in the required values in `.env`.

| Variable                    | Purpose                                    | Exposure              |
| --------------------------- | ------------------------------------------ | --------------------- |
| `VITE_SUPABASE_URL`         | Supabase project URL                       | Public                |
| `VITE_SUPABASE_ANON_KEY`    | Supabase anonymous/publishable key         | Public                |
| `VITE_TURNSTILE_SITE_KEY`   | Cloudflare Turnstile site key              | Public                |
| `VITE_WHATSAPP_NUMBER`      | Business WhatsApp number                   | Public                |
| `SUPABASE_URL`              | Server-side Supabase project URL           | Private configuration |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged database access                 | Secret                |
| `TURNSTILE_SECRET_KEY`      | Server-side Turnstile verification         | Secret                |
| `ADMIN_EMAILS`              | Allowlist of administrator email addresses | Server configuration  |
| `IP_HASH_SALT`              | Salt used for IP hashing                   | Secret                |

Use the actual variable names and requirements defined in `.env.example` and the application code if they differ from this table.

**Never commit `.env` or expose server-side secrets in browser code.**

### Step 4: Set Up the Database

1. Open your Supabase project.
2. Navigate to the SQL Editor.
3. Run the project's `supabase/schema.sql` script.
4. Confirm that the `leads` table and required security settings exist.
5. Create an administrator account in Supabase Authentication.
6. Add the authorized administrator's email to `ADMIN_EMAILS`.

Ensure the schema and API implementation agree on the lead columns, indexes, and security policies.

### Step 5: Configure Cloudflare Turnstile

1. Create or open the Turnstile widget.
2. Add the local development hostname.
3. Add the deployed Vercel hostname.
4. Set the site key and secret key in the appropriate environment variables.

The site key can be used in the browser. The secret key must remain server-side.

### Step 6: Start the Application

For the frontend only:

```bash
npm run dev
```

The Vite server is configured to use port `5174`.

The frontend-only development server does not execute Vercel serverless functions.

To run the website and API together, use:

```bash
npx vercel dev
```

Follow the Vercel CLI prompts and configure the required local environment variables.

---

## ☁️ Deployment

The application is deployed to Vercel.

### Deployment Steps

1. Push the latest project changes to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in the Vercel project settings.
4. Deploy the application.
5. Add the production hostname to the Cloudflare Turnstile widget.
6. Confirm the Supabase URL, keys, and administrator allowlist.
7. Test the contact form and verify that accepted enquiries appear in Supabase.
8. Test administrator login and lead-management operations.
9. Run Lighthouse against the deployed website.

### Environment Variable Checklist

Configure all required variables from `.env.example` in the Vercel project settings.

Remember:

* `VITE_` variables are exposed to the browser bundle and must not contain secrets.
* Server-side service-role and Turnstile secret keys must remain private.
* Environment variable changes may require a new deployment.
* Do not commit actual environment values to GitHub.

### Production Links

* **Website:** https://ethixweb-project.vercel.app/
* **Admin Dashboard:** https://ethixweb-project.vercel.app/admin
* **GitHub Repository:** https://github.com/ravimaurya26/Ethixweb-project

Admin access should be provided separately to authorized evaluators. Never publish a real administrator password in this README.

---

## 🧪 Testing Checklist

Use this checklist before submitting or demonstrating the project.

### Frontend

* [ ] Homepage renders correctly.
* [ ] Main navigation works.
* [ ] Services page loads correctly.
* [ ] About page loads correctly.
* [ ] Contact page loads correctly.
* [ ] Layout adapts to mobile and desktop screens.
* [ ] Buttons and internal links work.
* [ ] No broken images or unexpected console errors.

### Enquiry Form

* [ ] Required fields are validated.
* [ ] Invalid email addresses are rejected.
* [ ] Indian mobile number validation works.
* [ ] Service and budget selections are validated.
* [ ] Consent is required.
* [ ] Turnstile verification works.
* [ ] Spam and rate-limit checks behave as expected.
* [ ] Accepted submissions are stored in Supabase.
* [ ] Submission failures show understandable error messages.

### Admin Dashboard

* [ ] Unauthenticated users cannot access protected lead data.
* [ ] Authenticated but unauthorized users are rejected.
* [ ] Authorized administrators can view leads.
* [ ] Search and status filters work.
* [ ] Lead status changes persist in the database.
* [ ] Notes can be updated.
* [ ] CSV export works.
* [ ] Lead deletion is authorized and behaves as expected.
* [ ] Sign-out works correctly.

### Performance and Security

* [ ] Lighthouse mobile and desktop tests have been run.
* [ ] Accessibility contrast issues are reviewed.
* [ ] Server-side authorization is verified through direct API requests.
* [ ] Supabase RLS policies are reviewed.
* [ ] No service-role or other secret keys appear in Git history.
* [ ] Production environment variables are configured.
* [ ] Error responses do not expose sensitive internal details.

---

## 📝 Notes and Assumptions

* The logo is currently a placeholder wordmark. Replace it with the official asset and update `src/components/Logo.jsx` when the approved brand asset is available.
* Featured work in `src/data/content.js` is representative content and should be replaced with verified case studies when available.
* Business support hours and the WhatsApp number configured through `VITE_WHATSAPP_NUMBER` should be confirmed before production use.
* Service prices, GST notes, and service descriptions should be reviewed by the business before being treated as commercial commitments.
* Lighthouse scores are snapshots from specific tests and may change as the application evolves.
* Admin credentials are not published in this repository.

---

## 🔮 Future Improvements

Potential next steps include:

* Improving text contrast and overall accessibility.
* Adding verified customer case studies.
* Adding more comprehensive API authorization tests.
* Reviewing and strengthening security headers.
* Evaluating a Content Security Policy without breaking Supabase or Turnstile integrations.
* Adding automated tests for enquiry validation and lead-management endpoints.
* Improving monitoring and operational error reporting.
* Reviewing privacy notices and lead-retention practices.
* Re-running Lighthouse after significant UI or dependency changes.

---

## 👨‍💻 Author

**Ravi Maurya**

B.Tech Computer Science and Engineering
ABES Institute of Technology, Ghaziabad

* **GitHub:** [ravimaurya26](https://github.com/ravimaurya26)
* **LinkedIn:** [Ravi Maurya](https://www.linkedin.com/in/ravi-maurya-b80a93303/)

---

## 📄 License

Add a `LICENSE` file to the repository if you intend to distribute the project under an open-source license. Until a license is specified, the repository's default copyright rules apply.

---

<p align="center">
  <strong>Ethixweb India</strong><br>
  Built for the Indian market. Designed for speed. Focused on real business needs.
</p>
