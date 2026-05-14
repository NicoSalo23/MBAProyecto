const fs = require('fs');
const path = require('path');

const BASE = 'https://mbafinanceguide.com';

const ARTICLES = [
  { id:'art1',  title:'Best MBA Programs for Investment Banking in 2026',
    desc:'Which business schools actually get you into Goldman Sachs, JPMorgan, and Evercore — ranked by real recruiting outcomes.',
    cat:'MBA Programs', date:'2025-06-15' },
  { id:'art2',  title:'Harvard MBA vs Wharton MBA: Which Is Better for Finance?',
    desc:'An honest head-to-head comparison of the two most prestigious finance MBA programs — curriculum, network, and placement data.',
    cat:'MBA Programs', date:'2025-07-01' },
  { id:'art3',  title:'How Investment Banking Recruiting Really Works in 2026',
    desc:'The timeline, networking playbook, superday format, and what banks actually evaluate beyond your GPA.',
    cat:'Finance Careers', date:'2025-07-15' },
  { id:'art4',  title:'Is an MBA Worth It in 2026? A Straight Answer',
    desc:'A frank ROI analysis: tuition costs, salary uplifts, payback periods, and when the MBA makes no financial sense.',
    cat:'MBA Programs', date:'2025-08-01' },
  { id:'art5',  title:'Financial Modeling Skills Every Finance Student Needs',
    desc:'The three-statement model, DCF, LBO, and comparable companies — master these before your first finance interview.',
    cat:'Technical Finance', date:'2025-08-15' },
  { id:'art6',  title:'Private Equity Careers in 2026: What Nobody Tells You',
    desc:'How PE firms actually recruit, what the work looks like day-to-day, and the compensation structure most candidates misunderstand.',
    cat:'Finance Careers', date:'2025-09-01' },
  { id:'art7',  title:'Hedge Fund Careers: How the Industry Really Works in 2026',
    desc:'Strategies, hiring paths, what analysts do all day, and why compensation is both higher and more volatile than banking.',
    cat:'Finance Careers', date:'2025-09-15' },
  { id:'art8',  title:'Consulting vs Investment Banking: Which Path in 2026?',
    desc:'Day-to-day differences, salary comparison, work-life balance, and which exit opportunities each career actually creates.',
    cat:'Finance Careers', date:'2025-10-01' },
  { id:'art9',  title:'CFA vs MBA in 2026: Which Credential Is Better?',
    desc:'Cost, time, career outcomes, and which one actually opens the doors you need — a practical framework for your decision.',
    cat:'Finance Careers', date:'2025-10-15' },
  { id:'art10', title:'Best Finance Internships for College Students in 2026',
    desc:'Where to intern, how to get selected, and why your summer analyst program is the most important recruiting step of your career.',
    cat:'Finance Careers', date:'2025-11-01' },
  { id:'art11', title:'Venture Capital Careers: How Investors Find Billion-Dollar Startups',
    desc:'What VC firms do, how they recruit, what they pay, and the path into the industry for MBA graduates and operators.',
    cat:'Finance Careers', date:'2025-11-15' },
  { id:'art12', title:'Wall Street Salaries in 2026: How Much Finance Pros Earn',
    desc:'Real compensation data for IB analysts, PE associates, hedge fund PMs, and consultants — base, bonus, and total comp.',
    cat:'Finance Careers', date:'2025-12-01' },
  { id:'art13', title:'How to Build a Finance Resume for Investment Banking',
    desc:'The formatting rules, bullet-point structure, and technical skills section that get resumes past finance recruiter screens.',
    cat:'Career Advice', date:'2025-12-15' },
  { id:'art14', title:'Best Finance Careers for College Students in 2026',
    desc:'Banking, PE, VC, consulting, corporate finance — what each career actually involves and which fits your personality.',
    cat:'Finance Careers', date:'2026-01-01' },
  { id:'art15', title:'MBA Application Strategy 2026: How Top Applicants Stand Out',
    desc:'Essays, recommendations, leadership stories, and the application mistakes that eliminate strong candidates every cycle.',
    cat:'MBA Preparation', date:'2026-01-15' },
  { id:'art16', title:'Mergers & Acquisitions Careers in 2026: The M&A Banker Path',
    desc:'What M&A bankers do, how deals work, the skills that matter most, and where bankers go after 3 years in the industry.',
    cat:'Finance Careers', date:'2026-02-01' },
  { id:'art17', title:'Asset Management Careers After MBA: Road to Portfolio Manager',
    desc:'Research analyst to PM — how long it takes, what firms value, compensation at each level, and the skills that advance careers.',
    cat:'Finance Careers', date:'2026-02-15' },
  { id:'art18', title:'Finance MBA Programs 2026: Salaries, Recruiting & Wall Street Path',
    desc:'The complete guide for serious candidates: which programs open doors to Goldman Sachs, PE firms, and top hedge funds.',
    cat:'MBA Programs', date:'2026-03-01' },
  { id:'art19', title:'GMAT Study Plan: How to Score 700+ in 3 Months',
    desc:'Week-by-week plan, score targets by school, Quant and Verbal strategy, and the best resources for working professionals.',
    cat:'MBA Preparation', date:'2026-04-01' },
];

function buildPage(art) {
  const url     = `${BASE}/${art.id}/`;
  const imgUrl  = `${BASE}/images/${art.id}.png`;
  const titleFull = `${art.title} | MBA Finance Guide`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${titleFull}</title>
  <meta name="description" content="${art.desc}">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/png" href="/logo/favicon.png">

  <!-- Open Graph -->
  <meta property="og:type"        content="article">
  <meta property="og:url"         content="${url}">
  <meta property="og:title"       content="${art.title}">
  <meta property="og:description" content="${art.desc}">
  <meta property="og:image"       content="${imgUrl}">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="675">
  <meta property="og:site_name"   content="MBA Finance Guide">
  <meta property="og:locale"      content="en_US">
  <meta property="article:published_time" content="${art.date}T00:00:00Z">
  <meta property="article:section" content="${art.cat}">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:site"        content="@MBAfinanceGuide">
  <meta name="twitter:creator"     content="@MBAfinanceGuide">
  <meta name="twitter:title"       content="${art.title}">
  <meta name="twitter:description" content="${art.desc}">
  <meta name="twitter:image"       content="${imgUrl}">

  <!-- JSON-LD -->
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BlogPosting",
   "headline":"${art.title.replace(/"/g,'\\"')}",
   "description":"${art.desc.replace(/"/g,'\\"')}",
   "image":"${imgUrl}",
   "datePublished":"${art.date}",
   "url":"${url}",
   "author":{"@type":"Organization","name":"MBA Finance Guide Editorial Team","url":"${BASE}/sobre/"},
   "publisher":{"@type":"Organization","name":"MBA Finance Guide","logo":{"@type":"ImageObject","url":"${BASE}/logo/logo.png"}}}
  </script>

  <!-- Redirect to SPA and restore section -->
  <script>
    sessionStorage.setItem('spa_redirect', '/${art.id}/');
    window.location.replace('/');
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0;url=/">
  </noscript>
</head>
<body style="background:#0d1526;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px">
  <div>
    <img src="/logo/logo.png" alt="MBA Finance Guide" style="height:48px;margin-bottom:20px">
    <h1 style="font-size:1.3rem;margin-bottom:8px">${art.title}</h1>
    <p style="color:rgba(255,255,255,0.5);margin-bottom:20px">${art.desc}</p>
    <a href="/" style="background:#c9a84c;color:#0d1526;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:700">Read Article →</a>
  </div>
</body>
</html>`;
}

let created = 0;
for (const art of ARTICLES) {
  const dir = path.join(__dirname, art.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(art), 'utf8');
  console.log(`✅ ${art.id}/index.html`);
  created++;
}

console.log(`\n✅ ${created} static OG pages created`);
