const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ── Article catalogue (id, title, description, icon, bg, cat, date, read) ───
const ARTICLES = {
  art1:  { title:'Best MBA Programs for Investment Banking in 2026',
            desc:'Which business schools actually get you into Goldman Sachs, JPMorgan, and Evercore — ranked by real recruiting outcomes.',
            icon:'MBA', bg:'linear-gradient(135deg,#1a2d52,#0d1e3d)', cat:'MBA Programs', date:'June 2025', read:'9 min' },
  art2:  { title:'Harvard MBA vs Wharton MBA: Which Is Better for Finance?',
            desc:'An honest head-to-head comparison of the two most prestigious finance MBA programs — curriculum, network, and placement.',
            icon:'H/W', bg:'linear-gradient(135deg,#6b1a1a,#a52a2a)', cat:'MBA Programs', date:'July 2025', read:'8 min' },
  art3:  { title:'How Investment Banking Recruiting Really Works in 2026',
            desc:'The timeline, the networking playbook, the superday format, and what banks actually evaluate beyond your GPA.',
            icon:'IB', bg:'linear-gradient(135deg,#0d2d1a,#1a4a2d)', cat:'IB Recruiting', date:'July 2025', read:'8 min' },
  art4:  { title:'Is an MBA Worth It in 2026? A Straight Answer',
            desc:'A frank ROI analysis: tuition costs, salary uplifts, payback periods, and when the MBA makes no financial sense.',
            icon:'ROI', bg:'linear-gradient(135deg,#2d1a0d,#4a2d14)', cat:'MBA Value', date:'Aug 2025', read:'8 min' },
  art5:  { title:'Financial Modeling Skills Every Finance Student Needs',
            desc:'The three-statement model, DCF, LBO, and comparable companies — what you must master before your first finance interview.',
            icon:'XLS', bg:'linear-gradient(135deg,#1a2d0d,#2a4a14)', cat:'Modeling', date:'Aug 2025', read:'9 min' },
  art6:  { title:'Private Equity Careers in 2026: What Nobody Tells You',
            desc:'How PE firms actually recruit, what the work looks like day-to-day, and the compensation structure most candidates misunderstand.',
            icon:'PE', bg:'linear-gradient(135deg,#2d1a0d,#4a2d14)', cat:'Private Equity', date:'Sep 2025', read:'9 min' },
  art7:  { title:'Hedge Fund Careers: How the Industry Really Works in 2026',
            desc:'Strategies, hiring paths, what analysts do all day, and why compensation is both higher and more volatile than banking.',
            icon:'HF', bg:'linear-gradient(135deg,#1a1a2d,#2d2d52)', cat:'Hedge Funds', date:'Sep 2025', read:'9 min' },
  art8:  { title:'Consulting vs Investment Banking: Which Path in 2026?',
            desc:'Day-to-day differences, salary comparison, work-life balance, and which exit opportunities each career actually creates.',
            icon:'C/B', bg:'linear-gradient(135deg,#0d2d2d,#144a4a)', cat:'Career Paths', date:'Oct 2025', read:'9 min' },
  art9:  { title:'CFA vs MBA in 2026: Which Credential Is Better?',
            desc:'Cost, time, career outcomes, and which one actually opens the doors you need — a practical framework for your decision.',
            icon:'CFA', bg:'linear-gradient(135deg,#1a0d2d,#2d144a)', cat:'Credentials', date:'Oct 2025', read:'9 min' },
  art10: { title:'Best Finance Internships for College Students in 2026',
            desc:'Where to intern, how to get selected, and why your summer analyst program is the most important recruiting step of your career.',
            icon:'INT', bg:'linear-gradient(135deg,#2d2d0d,#4a4a14)', cat:'Internships', date:'Nov 2025', read:'8 min' },
  art11: { title:'Venture Capital Careers: How Investors Find Billion-Dollar Startups',
            desc:'What VC firms do, how they recruit, what they pay, and the path into the industry for MBA graduates and operators.',
            icon:'VC', bg:'linear-gradient(135deg,#0d1a2d,#142a4a)', cat:'Venture Capital', date:'Nov 2025', read:'9 min' },
  art12: { title:'Wall Street Salaries in 2026: How Much Finance Pros Earn',
            desc:'Real compensation data for IB analysts, PE associates, hedge fund PMs, and consultants — base, bonus, and total comp.',
            icon:'$$$', bg:'linear-gradient(135deg,#1a2d1a,#2d4a2d)', cat:'Compensation', date:'Dec 2025', read:'8 min' },
  art13: { title:'How to Build a Finance Resume for Investment Banking',
            desc:'The formatting rules, bullet-point structure, and technical skills section that get resumes past finance recruiter screens.',
            icon:'CV', bg:'linear-gradient(135deg,#2d0d1a,#4a1428)', cat:'Resume Guide', date:'Dec 2025', read:'8 min' },
  art14: { title:'Best Finance Careers for College Students in 2026',
            desc:'Banking, PE, VC, consulting, corporate finance — what each career actually involves and which fits your personality.',
            icon:'🎓', bg:'linear-gradient(135deg,#1a0d0d,#2d1414)', cat:'Career Guide', date:'Jan 2026', read:'8 min' },
  art15: { title:'MBA Application Strategy 2026: How Top Applicants Stand Out',
            desc:'Essays, recommendations, leadership stories, and the application mistakes that eliminate strong candidates every cycle.',
            icon:'APP', bg:'linear-gradient(135deg,#0d0d2d,#14144a)', cat:'MBA Admissions', date:'Jan 2026', read:'9 min' },
  art16: { title:'Mergers & Acquisitions Careers in 2026: The M&A Banker Path',
            desc:'What M&A bankers do, how deals work, the skills that matter most, and where bankers go after 3 years in the industry.',
            icon:'M&A', bg:'linear-gradient(135deg,#1a0d2d,#2d144a)', cat:'M&A Banking', date:'Feb 2026', read:'9 min' },
  art17: { title:'Asset Management Careers After MBA: Road to Portfolio Manager',
            desc:'Research analyst to PM — how long it takes, what firms value, compensation at each level, and the skills that advance careers.',
            icon:'AM', bg:'linear-gradient(135deg,#0d2d1a,#144a2d)', cat:'Asset Management', date:'Feb 2026', read:'9 min' },
  art18: { title:'Finance MBA Programs 2026: Salaries, Recruiting & Wall Street Path',
            desc:'The complete guide for serious candidates: which programs open doors to Goldman Sachs, PE firms, and top hedge funds.',
            icon:'WS', bg:'linear-gradient(135deg,#1a1a0d,#2d2d14)', cat:'MBA Guide', date:'Mar 2026', read:'11 min' },
};

// ── Section assignments ───────────────────────────────────────────────────────
const SECTIONS = {
  programas:   ['art1','art2','art4','art9','art15','art18'],
  carreras:    ['art3','art6','art7','art8','art10','art11','art14','art16'],
  tecnico:     ['art5','art12','art13','art17','art16','art7'],
  preparacion: ['art15','art13','art4','art10','art2','art1'],
};

// ── Home featured cards ───────────────────────────────────────────────────────
const HOME_FEATURED = ['art1','art3','art5','art6','art12','art18'];

// ── Card HTML generator ───────────────────────────────────────────────────────
function card(id) {
  const a = ARTICLES[id];
  return `<article class="card"><div class="card-img" style="background:${a.bg}"><div class="card-img-inner">${a.icon}</div><span class="card-cat">${a.cat}</span></div><div class="card-body"><div class="card-meta"><span>${a.date}</span><span>·</span><span>${a.read}</span></div><h3><a href="/${id}/" onclick="showArticle('${id}');return false">${a.title}</a></h3><p>${a.desc}</p><div class="card-footer"><a href="/${id}/" class="read-more" onclick="showArticle('${id}');return false">Read article →</a><span class="read-time">${a.read}</span></div></div></article>`;
}

function grid(ids) {
  return `<div class="grid">\n    ${ids.map(card).join('\n    ')}\n  </div>`;
}

// ── Replace home featured grid ────────────────────────────────────────────────
// The home grid is between "Authority Guides for Finance Professionals" and the aggregator preview
const homGridStart = html.indexOf('<div class="grid">', html.indexOf('Authority Guides for Finance Professionals'));
const homGridEnd   = html.indexOf('</div>', html.indexOf('load-more-wrap')) + 6;
if (homGridStart !== -1 && homGridEnd !== -1) {
  const newHomeGrid = grid(HOME_FEATURED) + '\n    <div class="load-more-wrap">\n      <button class="load-more-btn" onclick="showSection(\'programas\')">View all articles →</button>\n    </div>';
  html = html.slice(0, homGridStart) + newHomeGrid + html.slice(homGridEnd);
  console.log('✅ Home featured grid replaced');
}

// ── Replace each section grid ─────────────────────────────────────────────────
for (const [sectionId, artIds] of Object.entries(SECTIONS)) {
  const marker = `id="section-${sectionId}"`;
  const sectionStart = html.indexOf(marker);
  if (sectionStart === -1) { console.warn(`⚠️  section-${sectionId} not found`); continue; }

  // Find the <div class="grid"> inside this section
  const gridStart = html.indexOf('<div class="grid">', sectionStart);
  // Find matching closing </div> for the grid
  let depth = 0, pos = gridStart;
  while (pos < html.length) {
    const open  = html.indexOf('<div', pos + 1);
    const close = html.indexOf('</div>', pos + 1);
    if (close === -1) break;
    if (open !== -1 && open < close) { depth++; pos = open; }
    else { if (depth === 0) { pos = close + 6; break; } depth--; pos = close; }
  }

  html = html.slice(0, gridStart) + grid(artIds) + html.slice(pos);
  console.log(`✅ section-${sectionId} grid replaced (${artIds.length} cards)`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('\n✅ All section grids updated');
