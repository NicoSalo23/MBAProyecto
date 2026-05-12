# MBA Finance Guide — Complete Deployment Guide

**Domain:** mbafinanceguide.com  
**Contact:** mbafinanceguide@outlook.com  
**GitHub:** [NicoSalo23](https://github.com/NicoSalo23)

---

## Project Structure

```
mbafinanceguide/
├── index.html        ← Full website (SPA frontend) — English, US-focused
├── styles.css        ← External stylesheet (extracted from index.html)
├── server.js         ← RSS proxy server (Node.js / Express)
├── package.json      ← Server dependencies
├── .env              ← Environment variables (DO NOT commit)
├── .gitignore        ← Excludes .env and node_modules
├── CNAME             ← GitHub Pages custom domain (mbafinanceguide.com)
└── README.md         ← This file
```

---

## 1. The Website (index.html + styles.css)

`index.html` is a complete Single Page Application (SPA) targeting **U.S. and English-speaking audiences**.  
All styles live in the separate `styles.css` file.

| Section | Content |
|---|---|
| **Home** | Hero, featured articles, key stats |
| **MBA Programs** | 9 articles on global top programs |
| **Careers & Salaries** | 8 articles on post-MBA career paths |
| **Technical Finance** | 8 technical articles (DCF, LBO, VaR, M&A…) |
| **GMAT Prep** | 8 articles on MBA admissions |
| **Pillar Article** | Full 1,000+ word article (Investment Banking salaries) |
| **Live News** | Real-time RSS aggregator (calls own backend) |
| **About Us** | E-E-A-T page with author profiles |
| **Contact** | Functional contact form |
| **Privacy Policy** | CCPA-compliant |
| **Legal Notice** | U.S. jurisdiction |
| **Cookie Policy** | AdSense consent |
| **Cookie Banner** | GDPR/CCPA consent banner |

### RSS Aggregator — Backend Integration

The aggregator in `index.html` automatically detects environment:

```javascript
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'           // local development
  : 'https://api.mbafinanceguide.com'; // production
```

In production, `api.mbafinanceguide.com` must point to the deployed RSS server.

### Deploying the Frontend

**Option A: GitHub Pages (recommended — free)**
1. Push the repo to GitHub (user: `NicoSalo23`)
2. Go to **Settings → Pages → Branch: main / root**
3. The `CNAME` file already contains `mbafinanceguide.com`
4. Point your domain's DNS `A` records to GitHub Pages IPs

**Option B: Netlify (drag & drop)**
- Drag the project folder to [netlify.com/drop](https://netlify.com/drop)
- Set custom domain to `mbafinanceguide.com`

---

## 2. The RSS Server (server.js)

### Why a backend server?

Browsers block direct RSS requests to external domains (CORS policy).  
The backend acts as a **proxy**: the frontend calls *your own* server (no CORS),  
and the server fetches the external feeds server-side.

### Installation

```bash
npm install
```

### Environment Variables

The `.env` file is already created. **Fill in your values before deploying:**

```env
PORT=3001
ALLOWED_ORIGIN=https://mbafinanceguide.com
ADMIN_API_KEY=change_this_to_a_strong_random_key
```

> ⚠️ `.env` is listed in `.gitignore` — it will never be uploaded to GitHub.

### Local Development

```bash
npm run dev
# Server running at http://localhost:3001
```

Open `index.html` in a local server (e.g. VS Code Live Server) and click **Refresh Feeds**.

### API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check (uptime, cache keys) |
| GET | `/api/feeds` | List of available feeds + cache status |
| GET | `/api/feed` | All articles (all feeds) |
| GET | `/api/feed?sources=reuters-business,ft` | Specific feeds |
| GET | `/api/feed?lang=en` | English-only feeds |
| GET | `/api/feed?limit=5` | Max 5 articles per feed |
| GET | `/api/feed/reuters-business` | One specific feed |
| POST | `/api/cache/clear` | Clear cache (requires `x-api-key` header) |

### Configured RSS Sources

| ID | Name | Category | Language |
|---|---|---|---|
| reuters-business | Reuters Business | Markets | EN |
| reuters-finance | Reuters Finance | Finance | EN |
| marketwatch | MarketWatch Top Stories | Markets | EN |
| barrons | Barron's | Investments | EN |
| seeking-alpha | Seeking Alpha | Analysis | EN |
| ft | Financial Times | Global | EN |
| expansion | Expansión | Spain | ES |
| portafolio | Portafolio Colombia | LATAM | ES |

### API Response Example

```json
{
  "count": 48,
  "sources": 8,
  "cacheAge": "≤15 min",
  "disclaimer": "Only public RSS feed excerpts are shown...",
  "items": [
    {
      "id": "https://reuters.com/...",
      "title": "Federal Reserve signals rate path amid uncertainty",
      "link": "https://reuters.com/business/...",
      "excerpt": "The Federal Reserve indicated Wednesday that...",
      "pubDate": "2025-06-15T14:30:00Z",
      "source": "Reuters Business",
      "category": "Markets",
      "color": "#C9A84C",
      "language": "en"
    }
  ]
}
```

---

## 3. Production Deployment

### Option A: Render (free plan available) — Recommended

1. Connect your GitHub repo (`NicoSalo23/mbafinanceguide`) to [render.com](https://render.com)
2. New Web Service → your repo → **root directory** (not a subdirectory)
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables from `.env` in the Render dashboard
6. Note the URL Render gives you (e.g. `mbafinanceguide-rss.onrender.com`)
7. In your DNS, create a `CNAME` record: `api.mbafinanceguide.com → mbafinanceguide-rss.onrender.com`

### Option B: Railway (~$5/month)

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Add environment variables in the Railway dashboard.

### Option C: VPS (DigitalOcean, Hostinger, etc.)

```bash
# On the server
git clone https://github.com/NicoSalo23/mbafinanceguide
cd mbafinanceguide
npm install
cp .env.example .env    # fill in your values
npm install -g pm2
pm2 start server.js --name "rss-server"
pm2 save
pm2 startup
```

---

## 4. Full Go-Live Checklist

### DNS Setup
- [ ] `mbafinanceguide.com` → GitHub Pages (A records: 185.199.108.153 / .109 / .110 / .111)
- [ ] `www.mbafinanceguide.com` → CNAME to `NicoSalo23.github.io`
- [ ] `api.mbafinanceguide.com` → CNAME to your Render/Railway backend URL

### Backend
- [ ] RSS server deployed and accessible at `https://api.mbafinanceguide.com/health`
- [ ] Environment variables set: `PORT`, `ALLOWED_ORIGIN`, `ADMIN_API_KEY`
- [ ] Test: `GET https://api.mbafinanceguide.com/api/feed?limit=3` returns JSON

### Frontend
- [ ] `index.html` and `styles.css` in repo root
- [ ] `CNAME` file contains `mbafinanceguide.com`
- [ ] GitHub Pages enabled (Settings → Pages → main branch)
- [ ] Site loads correctly at `https://mbafinanceguide.com`
- [ ] Click **Refresh Feeds** in Live News — articles load from backend

---

## 5. Google AdSense Checklist

Before submitting your application, verify:

- [ ] **30+ articles** published and indexed in Google Search Console
- [ ] Pillar articles with **1,000+ words** (shorter articles must have 500+)
- [ ] **About Us** page with real, verifiable author information
- [ ] **Contact** page with a working form and visible email
- [ ] **Privacy Policy** that explicitly mentions AdSense
- [ ] **Legal Notice** visible from the footer
- [ ] **Cookie Policy** with a functional consent banner
- [ ] Site **indexed** by Google (check in Search Console)
- [ ] **No other third-party ads** before approval
- [ ] Custom domain (not free subdomains like .blogspot or .wix)
- [ ] Site works correctly on **mobile** (Google Mobile-Friendly Test)
- [ ] Page speed **70+ points** on PageSpeed Insights
- [ ] **Clear navigation** with categories in the menu
- [ ] **Original content** (not copied or heavily paraphrased from other sources)
- [ ] Site active for at least **3–6 months** (recommended for non-US sites)

---

## 6. Content Strategy for AdSense

### Recommended Publishing Volume

| Month | Goal | Content Type |
|---|---|---|
| 1–2 | 15 articles | Pillar pages (1,500+ words) |
| 3–4 | +10 articles | Intermediate guides (800–1,200 words) |
| 5–6 | +10 articles | Short articles, updates |
| AdSense application | 35+ articles | All indexed |

### Target Keywords (high intent, U.S. market)

```
"best MBA for finance"          (Vol: 4,400/mo)
"MBA investment banking"        (Vol: 3,600/mo)
"Harvard MBA cost"              (Vol: 5,400/mo)
"MBA salary investment banking" (Vol: 2,900/mo)
"GMAT study plan"               (Vol: 8,100/mo)
"CFA vs MBA"                    (Vol: 4,400/mo)
"DCF valuation model"           (Vol: 5,200/mo)
"private equity MBA"            (Vol: 2,400/mo)
"Wharton vs Harvard MBA"        (Vol: 1,900/mo)
"finance MBA ROI"               (Vol: 1,600/mo)
```

---

## 7. RSS Aggregator — Legal Framework

### Why RSS does not infringe copyright

1. **Explicit design**: RSS was created specifically for content distribution and syndication.
2. **Voluntary publishing**: Sites publish RSS feeds deliberately so others can read and link them.
3. **Minimal use**: We only display the title, date, and the excerpt the site itself includes in its feed.
4. **Always link back**: Every item links directly to the original source (this is fundamental).
5. **No full reproduction**: We never display the complete text of any article.

### What NOT to do

- ❌ Copy full articles from other sites
- ❌ Extensively paraphrase articles without adding value
- ❌ Scrape pages that don't have RSS (without permission)
- ❌ Use images from other sites without a license
- ❌ Present third-party content as your own

### What you CAN do (what this system does)

- ✅ Show headlines from public RSS feeds
- ✅ Show the excerpt the site publishes in its own RSS
- ✅ Always link to the original source
- ✅ Add your own analysis and commentary to aggregated content
- ✅ Use news as a starting point to create original content

---

*Project: MBA Finance Guide | Domain: mbafinanceguide.com | Updated: May 2026*
