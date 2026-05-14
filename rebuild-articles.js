const fs = require('fs');

// ── Article metadata ──────────────────────────────────────────────────────────
const META = [
  { id:'art1',  cat:'MBA Programs',      crumb:'programas', crumbLabel:'MBA Programs',
    author:'Sarah Chen, MBA (Harvard) · Former Goldman Sachs VP',
    date:'2025-06-15', dateHuman:'June 15, 2025', read:'9-minute read',
    tags:['MBA Programs','Investment Banking','Wall Street','Finance Recruiting','Wharton'] },
  { id:'art2',  cat:'MBA Programs',      crumb:'programas', crumbLabel:'MBA Programs',
    author:'Michael Rodriguez, MBA (Wharton) · CFA',
    date:'2025-07-01', dateHuman:'July 1, 2025', read:'8-minute read',
    tags:['Harvard MBA','Wharton MBA','Finance Careers','MBA Programs','Wall Street'] },
  { id:'art3',  cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Sarah Chen, MBA (Harvard) · Former Goldman Sachs VP',
    date:'2025-07-15', dateHuman:'July 15, 2025', read:'8-minute read',
    tags:['Investment Banking Recruiting','MBA','Wall Street','Finance Careers','Networking'] },
  { id:'art4',  cat:'MBA Programs',      crumb:'programas', crumbLabel:'MBA Programs',
    author:'David Park, MBA (Booth) · CFA, CAIA',
    date:'2025-08-01', dateHuman:'August 1, 2025', read:'8-minute read',
    tags:['MBA ROI','Business School','Finance Careers','MBA Cost','MBA Programs'] },
  { id:'art5',  cat:'Technical Finance', crumb:'tecnico',   crumbLabel:'Technical Finance',
    author:'Michael Rodriguez, MBA (Wharton) · CFA',
    date:'2025-08-15', dateHuman:'August 15, 2025', read:'9-minute read',
    tags:['Financial Modeling','Excel','DCF Valuation','Investment Banking','Technical Finance'] },
  { id:'art6',  cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'David Park, MBA (Booth) · CFA, CAIA',
    date:'2025-09-01', dateHuman:'September 1, 2025', read:'9-minute read',
    tags:['Private Equity','Finance Careers','Wall Street','LBO','Investment Banking'] },
  { id:'art7',  cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Michael Rodriguez, MBA (Wharton) · CFA',
    date:'2025-09-15', dateHuman:'September 15, 2025', read:'9-minute read',
    tags:['Hedge Funds','Finance Careers','Investment Management','Wall Street','Portfolio Management'] },
  { id:'art8',  cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Sarah Chen, MBA (Harvard) · Former Goldman Sachs VP',
    date:'2025-10-01', dateHuman:'October 1, 2025', read:'9-minute read',
    tags:['Consulting','Investment Banking','Finance Careers','McKinsey','Wall Street'] },
  { id:'art9',  cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'David Park, MBA (Booth) · CFA, CAIA',
    date:'2025-10-15', dateHuman:'October 15, 2025', read:'9-minute read',
    tags:['CFA vs MBA','Finance Credentials','Career Planning','Asset Management','Investment Banking'] },
  { id:'art10', cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Sarah Chen, MBA (Harvard) · Former Goldman Sachs VP',
    date:'2025-11-01', dateHuman:'November 1, 2025', read:'8-minute read',
    tags:['Finance Internships','Investment Banking','Private Equity','Wall Street','Student Finance'] },
  { id:'art11', cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Michael Rodriguez, MBA (Wharton) · CFA',
    date:'2025-11-15', dateHuman:'November 15, 2025', read:'9-minute read',
    tags:['Venture Capital','Startups','Finance Careers','MBA','Silicon Valley'] },
  { id:'art12', cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'David Park, MBA (Booth) · CFA, CAIA',
    date:'2025-12-01', dateHuman:'December 1, 2025', read:'8-minute read',
    tags:['Wall Street Salaries','Investment Banking','Finance Compensation','Private Equity','Hedge Funds'] },
  { id:'art13', cat:'MBA Preparation',   crumb:'preparacion', crumbLabel:'MBA Preparation',
    author:'Sarah Chen, MBA (Harvard) · Former Goldman Sachs VP',
    date:'2025-12-15', dateHuman:'December 15, 2025', read:'8-minute read',
    tags:['Finance Resume','Investment Banking','Consulting','Wall Street','Career Advice'] },
  { id:'art14', cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Michael Rodriguez, MBA (Wharton) · CFA',
    date:'2026-01-01', dateHuman:'January 1, 2026', read:'8-minute read',
    tags:['Finance Careers','Investment Banking','Private Equity','College Finance','Wall Street'] },
  { id:'art15', cat:'MBA Preparation',   crumb:'preparacion', crumbLabel:'MBA Preparation',
    author:'David Park, MBA (Booth) · CFA, CAIA',
    date:'2026-01-15', dateHuman:'January 15, 2026', read:'9-minute read',
    tags:['MBA Application','Business School','Admissions','GMAT','MBA Essays'] },
  { id:'art16', cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Sarah Chen, MBA (Harvard) · Former Goldman Sachs VP',
    date:'2026-02-01', dateHuman:'February 1, 2026', read:'9-minute read',
    tags:['M&A Banking','Investment Banking','Finance Careers','Wall Street','Corporate Finance'] },
  { id:'art17', cat:'Finance Careers',   crumb:'carreras',  crumbLabel:'Finance Careers',
    author:'Michael Rodriguez, MBA (Wharton) · CFA',
    date:'2026-02-15', dateHuman:'February 15, 2026', read:'9-minute read',
    tags:['Asset Management','Portfolio Manager','Finance Careers','MBA','Investment Management'] },
  { id:'art18', cat:'MBA Programs',      crumb:'programas', crumbLabel:'MBA Programs',
    author:'David Park, MBA (Booth) · CFA, CAIA',
    date:'2026-03-01', dateHuman:'March 1, 2026', read:'11-minute read',
    tags:['MBA Programs','Investment Banking','Wall Street','Finance Recruiting','GMAT Prep'] },
];

// ── Parse the txt file ────────────────────────────────────────────────────────
const raw = fs.readFileSync('articles-humanization.txt', 'utf8');

// Split on "# ARTICLE N" markers (may or may not have ====== separator)
const parts = ('\n' + raw).split(/\n# ARTICLE \d+\n/);
parts.shift(); // remove empty string before first article

if (parts.length !== 18) {
  console.warn(`⚠️  Found ${parts.length} article blocks (expected 18)`);
}

// ── Converter: markdown-ish → HTML ────────────────────────────────────────────
function mdToHtml(text) {
  const lines = text.split('\n');
  let html = '';
  let inUl = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip separators
    if (/^={4,}/.test(line) || /^-{3,}$/.test(line)) { if (inUl) { html += '</ul>\n'; inUl = false; } continue; }

    // H1 → already used as title, skip
    if (/^# /.test(line)) continue;

    // H2 → section heading
    if (/^## /.test(line)) {
      if (inUl) { html += '</ul>\n'; inUl = false; }
      const txt = line.replace(/^## /, '').trim();
      html += `<h2>${esc(txt)}</h2>\n`;
      continue;
    }

    // H3 → sub-heading as bold paragraph
    if (/^### /.test(line)) {
      if (inUl) { html += '</ul>\n'; inUl = false; }
      const txt = line.replace(/^### /, '').trim();
      html += `<h3>${esc(txt)}</h3>\n`;
      continue;
    }

    // Bullet
    if (/^\* /.test(line)) {
      if (!inUl) { html += '<ul>\n'; inUl = true; }
      const txt = line.replace(/^\* /, '').trim();
      html += `<li>${esc(txt)}</li>\n`;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      if (inUl) { html += '</ul>\n'; inUl = false; }
      continue;
    }

    // Normal paragraph
    if (inUl) { html += '</ul>\n'; inUl = false; }
    html += `<p>${esc(line.trim())}</p>\n`;
  }

  if (inUl) html += '</ul>\n';
  return html;
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Extract title and sections from raw text ──────────────────────────────────
function parseArticle(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Title: first # line or first non-empty line
  let title = '';
  for (const l of lines) {
    if (l.startsWith('# ')) { title = l.replace(/^# /, ''); break; }
    if (l && !l.startsWith('=')) { title = l; break; }
  }

  // Sections: ## headings
  const sections = [];
  for (const l of lines) {
    if (l.startsWith('## ')) sections.push(l.replace(/^## /, '').trim());
  }

  return { title, sections };
}

// ── Build TOC ─────────────────────────────────────────────────────────────────
function buildToc(id, sections) {
  if (!sections.length) return '';
  const items = sections.map((s, i) =>
    `<li><a href="#${id}-s${i+1}">${esc(s)}</a></li>`
  ).join('\n        ');
  return `<div class="toc">
      <div class="toc-title">Table of Contents</div>
      <ol>
        ${items}
      </ol>
    </div>`;
}

// ── Add id anchors to h2 tags ─────────────────────────────────────────────────
function addAnchors(html, id) {
  let i = 0;
  return html.replace(/<h2>(.*?)<\/h2>/g, (_, inner) => {
    i++;
    return `<h2 id="${id}-s${i}">${inner}</h2>`;
  });
}

// ── Build full article HTML ───────────────────────────────────────────────────
function buildArticleHtml(rawText, meta) {
  const { id, cat, crumb, crumbLabel, author, date, dateHuman, read, tags } = meta;
  const { title, sections } = parseArticle(rawText);
  let body = mdToHtml(rawText);
  body = addAnchors(body, id);
  const toc = buildToc(id, sections);
  const tagHtml = tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');

  return `<!-- ══════════════ ARTICLE ${id.toUpperCase()} ══════════════ -->
<div id="section-${id}" class="section" style="background:var(--cream)">
  <div style="max-width:1280px;margin:0 auto 16px;padding:0 24px">
    <div class="breadcrumb">
      <a href="/" onclick="showSection('home');return false">Home</a><span>/</span>
      <a href="/${crumb}/" onclick="showSection('${crumb}');return false">${esc(crumbLabel)}</a><span>/</span>
      <span>${esc(title)}</span>
    </div>
  </div>
  <div style="padding:0 24px">
  <article class="article-full">
    <div class="article-header">
      <div class="cat-badge">${esc(cat)}</div>
      <h1>${esc(title)}</h1>
      <div class="meta-row">
        <time datetime="${date}">${dateHuman}</time>
        <span>By <strong>${esc(author)}</strong></span>
        <span>${read}</span>
      </div>
    </div>
    ${toc}
    ${body}
    <div class="tag-list">
      ${tagHtml}
    </div>
  </article>
  </div>
</div>`;
}

// ── Main: build all article blocks ────────────────────────────────────────────
const allArticles = parts.slice(0, 18).map((text, i) => {
  const meta = META[i];
  return buildArticleHtml(text, meta);
}).join('\n\n');

// ── Replace in index.html ──────────────────────────────────────────────────────
let html = fs.readFileSync('index.html', 'utf8');

// Remove all existing article sections (art1 through art99) and inject new ones before <!-- FOOTER -->
html = html.replace(/<!-- ══+? ARTICLE ART\d+ ══+? -->\n<div id="section-art\d+"[\s\S]*?<\/div>\n<\/div>\n\n/gi, '');

// Also handle art1 which may not have the comment
const art1Start = html.indexOf('<div id="section-art1"');
const footerStart = html.indexOf('<!-- FOOTER -->');

if (art1Start !== -1 && footerStart !== -1) {
  html = html.slice(0, art1Start) + allArticles + '\n\n' + html.slice(footerStart);
} else {
  // Fallback: just insert before <!-- FOOTER -->
  html = html.replace('<!-- FOOTER -->', allArticles + '\n\n<!-- FOOTER -->');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log(`✅ Inserted 18 articles into index.html`);

// ── Update PAGE_TITLES ────────────────────────────────────────────────────────
const titleMap = {};
parts.slice(0, 18).forEach((text, i) => {
  const { title } = parseArticle(text);
  const id = META[i].id;
  titleMap[id] = `${title} | MBA Finance Guide`;
});

let titlesBlock = 'const PAGE_TITLES={\n';
const existing = [
  "  home:'MBA Finance Guide | Your Authority Resource for Finance Education'",
  "  programas:'Best Finance MBA Programs 2025 | MBA Finance Guide'",
  "  carreras:'Post-MBA Finance Careers & Salaries 2025 | MBA Finance Guide'",
  "  tecnico:'Technical Finance: DCF, LBO, Derivatives | MBA Finance Guide'",
  "  preparacion:'GMAT Prep & MBA Application Guide | MBA Finance Guide'",
  "  markets:'Live Financial Markets | MBA Finance Guide'",
  "  sobre:'About MBA Finance Guide | Expert Finance Team'",
  "  contacto:'Contact MBA Finance Guide'",
  "  aggregator:'Live Financial News | MBA Finance Guide'",
];
titlesBlock += existing.join(',\n') + ',\n';
Object.entries(titleMap).forEach(([id, title]) => {
  titlesBlock += `  ${id}:'${title.replace(/'/g, "\\'")}',\n`;
});
titlesBlock += "  privacidad:'Privacy Policy | MBA Finance Guide',\n";
titlesBlock += "  legal:'Legal Notice | MBA Finance Guide',\n";
titlesBlock += "  cookies:'Cookie Policy | MBA Finance Guide'\n};";

let idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace(/const PAGE_TITLES=\{[\s\S]*?\};/, titlesBlock);
fs.writeFileSync('index.html', idx, 'utf8');
console.log('✅ Updated PAGE_TITLES');

// ── Update sitemap.xml ────────────────────────────────────────────────────────
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

// Remove old art entries
sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/mbafinanceguide\.com\/art\d+\/<\/loc>[\s\S]*?<\/url>/g, '');

// Build new art entries
const artEntries = META.map(m =>
  `  <url>\n    <loc>https://mbafinanceguide.com/${m.id}/</loc>\n    <lastmod>${m.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>`
).join('\n');

sitemap = sitemap.replace('</urlset>', artEntries + '\n</urlset>');
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log('✅ Updated sitemap.xml with 18 articles');
