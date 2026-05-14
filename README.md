# MBA Finance Guide

**Domain:** mbafinanceguide.com
**Email:** mbafinanceguide@outlook.com
**GitHub:** [NicoSalo23](https://github.com/NicoSalo23)
**Twitter/X:** [@MBAfinanceGuide](https://x.com/MBAfinanceGuide)
**LinkedIn:** [mba-finance-guide](https://www.linkedin.com/in/mba-finance-guide-9639b5409)

> Finance MBA authority site targeting U.S. professionals. Built as a passive income project for Google AdSense revenue in the high-CPC MBA finance niche.

---

## Project Structure

```
mbafinanceguide/
│
├── index.html                  ← Full SPA (Single Page Application) — all sections
├── styles.css                  ← Global stylesheet
├── 404.html                    ← GitHub Pages SPA routing redirect
├── robots.txt                  ← Search engine directives
├── sitemap.xml                 ← 29 URLs (home + sections + 19 articles + legal)
├── CNAME                       ← Custom domain: mbafinanceguide.com
├── README.md                   ← This file
│
├── logo/
│   ├── logo.png                ← Main logo (transparent background)
│   └── favicon.png             ← Browser tab icon
│
├── images/
│   ├── art1.png                ← Article cover images (1200×675px each)
│   ├── art2.png
│   ├── ...
│   └── art19.png
│
├── art1/index.html             ← Static OG page for article 1 (rich social previews)
├── art2/index.html
├── ...
├── art19/index.html
│
├── privacidad/index.html       ← Static Privacy Policy page
├── cookies/index.html          ← Static Cookie Policy page
├── contacto/index.html         ← Static Contact page (Formspree)
│
├── server.js                   ← RSS proxy server (Node.js / Express) → Render.com
├── package.json                ← Server dependencies
├── .env                        ← Environment variables (NOT committed)
├── .gitignore                  ← Excludes .env, node_modules
│
└── tools/                      ← Local development utilities (not deployed)
    ├── publish-tool.html       ← Social media post generator (Twitter + LinkedIn)
    ├── extract-articles.js     ← Exports articles to .txt for editing
    ├── rebuild-articles.js     ← Rebuilds article HTML from .txt file
    ├── fix-section-grids.js    ← Rebuilds card grids for all 4 sections
    ├── add-images.js           ← Adds cover images to articles + card thumbnails
    ├── add-article-schema.js   ← Injects BlogPosting JSON-LD into articles
    └── generate-og-pages.js    ← Generates static artN/index.html OG pages
```

---

## Site Architecture

### SPA Routing (GitHub Pages)

The site is a vanilla HTML/CSS/JS SPA hosted on GitHub Pages. All content lives in `index.html`. Routing works via `history.pushState`:

```
User visits mbafinanceguide.com/art1/
        ↓
GitHub Pages serves 404.html (no physical file at /art1/)
        ↓
404.html stores /art1/ in sessionStorage → redirects to /
        ↓
index.html DOMContentLoaded reads sessionStorage → calls showSection('art1')
        ↓
Article opens correctly ✅
```

### Social Media Rich Previews

Each article has a static `artN/index.html` with article-specific OG meta tags:

```
Twitter/LinkedIn fetches mbafinanceguide.com/art1/
        ↓
Reads art1/index.html → sees og:image, og:title, og:description
        ↓
Generates rich preview with article image ✅
        ↓
User clicks → redirected to SPA → article opens ✅
```

---

## Content — 19 Articles Published

| ID | Title | Section | Date |
|---|---|---|---|
| art1 | Best MBA Programs for Investment Banking in 2026 | MBA Programs | Jun 2025 |
| art2 | Harvard MBA vs Wharton MBA: Which Is Better for Finance? | MBA Programs | Jul 2025 |
| art3 | How Investment Banking Recruiting Really Works in 2026 | Finance Careers | Jul 2025 |
| art4 | Is an MBA Worth It in 2026? A Straight Answer | MBA Programs | Aug 2025 |
| art5 | Financial Modeling Skills Every Finance Student Needs | Technical Finance | Aug 2025 |
| art6 | Private Equity Careers in 2026: What Nobody Tells You | Finance Careers | Sep 2025 |
| art7 | Hedge Fund Careers: How the Industry Really Works in 2026 | Finance Careers | Sep 2025 |
| art8 | Consulting vs Investment Banking: Which Path in 2026? | Finance Careers | Oct 2025 |
| art9 | CFA vs MBA in 2026: Which Credential Is Better? | Finance Careers | Oct 2025 |
| art10 | Best Finance Internships for College Students in 2026 | Finance Careers | Nov 2025 |
| art11 | Venture Capital Careers: How Investors Find Billion-Dollar Startups | Finance Careers | Nov 2025 |
| art12 | Wall Street Salaries in 2026: How Much Finance Pros Earn | Finance Careers | Dec 2025 |
| art13 | How to Build a Finance Resume for Investment Banking | MBA Preparation | Dec 2025 |
| art14 | Best Finance Careers for College Students in 2026 | Finance Careers | Jan 2026 |
| art15 | MBA Application Strategy 2026: How Top Applicants Stand Out | MBA Preparation | Jan 2026 |
| art16 | Mergers & Acquisitions Careers in 2026: The M&A Banker Path | Finance Careers | Feb 2026 |
| art17 | Asset Management Careers After MBA: Road to Portfolio Manager | Finance Careers | Feb 2026 |
| art18 | Finance MBA Programs 2026: Salaries, Recruiting & Wall Street Path | MBA Programs | Mar 2026 |
| art19 | GMAT Study Plan: How to Score 700+ in 3 Months | MBA Preparation | Apr 2026 |

### Article Structure (each article includes)

- `<h1>` title + `<time datetime="">` publication date
- Author byline: **MBA Finance Guide Editorial Team**
- Table of Contents with anchor links (`#artN-sX`)
- Cover image (`/images/artN.png`, 1200×675px)
- 4–6 `<h2>` sections with `id` attributes
- At least one `<table class="data-table">` with real data
- Key-point boxes (`<div class="key-point">`)
- Tag list (`<div class="tag-list">`)
- JSON-LD `BlogPosting` schema with `headline`, `image`, `description`, `datePublished`, `author`, `publisher`

---

## SEO Implementation

### Meta Tags (`<head>`)

```html
<!-- Verification -->
<meta name="google-site-verification" content="...">

<!-- Open Graph -->
<meta property="og:type"         content="website">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter Card -->
<meta name="twitter:card"    content="summary_large_image">
<meta name="twitter:site"    content="@MBAfinanceGuide">
<meta name="twitter:creator" content="@MBAfinanceGuide">
```

### JSON-LD Schemas

- `WebSite` + `Organization` in `<head>` (global)
- `sameAs`: Twitter, Reddit, LinkedIn
- `BlogPosting` inline in each of the 19 articles

### Dynamic Updates (via `showSection()`)

```javascript
// Updates on every section change:
document.title           // PAGE_TITLES map
canonical href           // /section/
og:url                   // https://mbafinanceguide.com/section/
history.pushState()      // Real URL in browser bar
```

---

## Analytics & Tracking

### Google Analytics 4

- Measurement ID: `G-715Y62F9D6`
- Consent Mode v2 implemented:

```javascript
gtag('consent', 'default', {
  analytics_storage: 'denied',   // blocked until cookie consent
  ad_storage: 'denied'
});
// Updates to 'granted' only after user accepts cookie banner
```

### Cookie Banner

- Accept → `gtag('consent', 'update', { analytics_storage: 'granted' })`
- Decline → stays denied, preference saved in `localStorage`
- Key: `mbafp_consent`

---

## Google AdSense Readiness

### Completed ✅

- [x] Google Search Console verified + sitemap submitted
- [x] Privacy Policy with AdSense explicitly mentioned
- [x] Cookie Policy with `_ga`, `_gid`, `__gads` documented
- [x] Cookie consent banner with Consent Mode v2
- [x] Contact page with Formspree form (`xvzlnzrd`) + real email
- [x] 19 articles with cover images (1200×675px)
- [x] About Us with Editorial Team credentials
- [x] No fake author identities
- [x] Static legal pages (`/privacidad/`, `/cookies/`, `/contacto/`)
- [x] SPA routing fixed (404.html)
- [x] BlogPosting JSON-LD on all 19 articles
- [x] Real social media accounts (Twitter, LinkedIn)
- [x] Copyright 2025–2026

### Before Applying ⏳

- [ ] 100+ weekly impressions in Google Search Console
- [ ] 15+ articles indexed by Google
- [ ] 30+ days of organic traffic activity
- [ ] No critical errors in GSC "Pages" report

### Recommended Apply Date

**Mid-June 2026** — after 4–6 weeks of social media activity and organic indexing.

---

## RSS Backend (Render.com)

### Local Development

```bash
npm install
npm run dev
# API available at http://localhost:3001
```

### Environment Variables (`.env`)

```env
PORT=3001
ALLOWED_ORIGIN=https://mbafinanceguide.com
ADMIN_API_KEY=your_strong_random_key
```

### API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Uptime + cache status |
| GET | `/api/feed` | All articles from all feeds |
| GET | `/api/feed?sources=reuters-business` | Specific feed |
| GET | `/api/feed?limit=5` | Max 5 per feed |
| POST | `/api/cache/clear` | Clear cache (`x-api-key` header required) |

### RSS Sources

| ID | Source | Category |
|---|---|---|
| reuters-business | Reuters Business | Markets |
| reuters-finance | Reuters Finance | Finance |
| marketwatch | MarketWatch | Markets |
| barrons | Barron's | Investments |
| seeking-alpha | Seeking Alpha | Analysis |
| ft | Financial Times | Global |

### Production Deploy (Render.com)

1. Connect GitHub repo → New Web Service
2. Build: `npm install` / Start: `node server.js`
3. Add env vars in Render dashboard
4. Custom domain: `api.mbafinanceguide.com` → CNAME to Render URL

---

## Social Media Strategy

### Accounts

| Platform | Handle/URL |
|---|---|
| Twitter/X | [@MBAfinanceGuide](https://x.com/MBAfinanceGuide) |
| LinkedIn | [mba-finance-guide-9639b5409](https://www.linkedin.com/in/mba-finance-guide-9639b5409) |
| Reddit | [u/MBAFinanceGuide](https://www.reddit.com/user/MBAFinanceGuide/) |

### Publishing Workflow

1. Open `publish-tool.html` locally in browser
2. Select article from dropdown
3. Copy generated text for Twitter and LinkedIn
4. Post manually with article cover image attached

> ⚠️ **Reddit:** Do NOT use automated posting. Build karma by engaging in r/MBA, r/finance, r/financialcareers for 3–4 weeks before sharing links.

### Adding a New Article

1. Write article content (use ChatGPT with humanization prompt)
2. Add section `<div id="section-artN">` to `index.html` before `<!-- FOOTER -->`
3. Add `artN` to `PAGE_TITLES` in JavaScript
4. Add `artN.png` cover image (1200×675px) to `/images/`
5. Run `node generate-og-pages.js` to create `artN/index.html`
6. Add URL to `sitemap.xml`
7. Add card to relevant section grid
8. Commit and push → GitHub Pages deploys automatically

---

## DNS Configuration

| Record | Type | Value |
|---|---|---|
| `mbafinanceguide.com` | A | 185.199.108.153 |
| `mbafinanceguide.com` | A | 185.199.109.153 |
| `mbafinanceguide.com` | A | 185.199.110.153 |
| `mbafinanceguide.com` | A | 185.199.111.153 |
| `www` | CNAME | NicoSalo23.github.io |
| `api` | CNAME | mbafinanceguide-rss.onrender.com |

---

*MBA Finance Guide · mbafinanceguide.com · Updated May 2026*
