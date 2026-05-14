const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Article titles for alt text
const TITLES = {
  art1:'Best MBA Programs for Investment Banking 2026',
  art2:'Harvard MBA vs Wharton MBA for Finance Careers',
  art3:'How Investment Banking Recruiting Really Works 2026',
  art4:'Is an MBA Worth It in 2026',
  art5:'Financial Modeling Skills Every Finance Student Needs',
  art6:'Private Equity Careers in 2026',
  art7:'Hedge Fund Careers How the Industry Really Works 2026',
  art8:'Consulting vs Investment Banking Which Path in 2026',
  art9:'CFA vs MBA in 2026 Which Credential Is Better',
  art10:'Best Finance Internships for College Students 2026',
  art11:'Venture Capital Careers How Investors Find Billion Dollar Startups',
  art12:'Wall Street Salaries in 2026 How Much Finance Pros Earn',
  art13:'How to Build a Finance Resume for Investment Banking',
  art14:'Best Finance Careers for College Students 2026',
  art15:'MBA Application Strategy 2026 How Top Applicants Stand Out',
  art16:'Mergers and Acquisitions Careers 2026 MA Banker Path',
  art17:'Asset Management Careers After MBA Road to Portfolio Manager',
  art18:'Finance MBA Programs 2026 Salaries Recruiting Wall Street Path',
  art19:'GMAT Study Plan How to Score 700 Plus in 3 Months',
};

// 1. Fix alt text: replace "artN cover" with descriptive text
for (const [id, title] of Object.entries(TITLES)) {
  html = html.replace(
    new RegExp(`alt="${id} cover"`, 'g'),
    `alt="${title} — MBA Finance Guide"`
  );
}
console.log('✅ Alt text mejorado en imágenes de portada');

// 2. Add image + description to each BlogPosting JSON-LD
for (const [id, title] of Object.entries(TITLES)) {
  const imgUrl = `https://mbafinanceguide.com/images/${id}.png`;
  // Find the BlogPosting JSON-LD inside this article's section
  const sectionPos = html.indexOf(`id="section-${id}"`);
  if (sectionPos === -1) continue;
  const schemaStart = html.indexOf('"@type":"BlogPosting"', sectionPos);
  if (schemaStart === -1) continue;
  const schemaEnd = html.indexOf('</script>', schemaStart);
  if (schemaEnd === -1) continue;

  let schema = html.slice(html.lastIndexOf('<script', schemaStart), schemaEnd + 9);
  // Add image if not present
  if (!schema.includes('"image"')) {
    schema = schema.replace(
      '"mainEntityOfPage"',
      `"image":"${imgUrl}","description":"Expert guide on ${title.toLowerCase()} for finance professionals and MBA candidates.","mainEntityOfPage"`
    );
    html = html.slice(0, html.lastIndexOf('<script', schemaStart)) + schema + html.slice(schemaEnd + 9);
  }
}
console.log('✅ image + description añadidos al JSON-LD BlogPosting x19');

// 3. Fix author type in BlogPosting: Organization → more descriptive
html = html.replace(
  /"author":\{"@type":"Organization","name":"MBA Finance Guide"\}/g,
  '"author":{"@type":"Organization","name":"MBA Finance Guide Editorial Team","url":"https://mbafinanceguide.com/sobre/"}'
);
console.log('✅ author URL añadida al JSON-LD BlogPosting');

fs.writeFileSync('index.html', html, 'utf8');
console.log('\n✅ All SEO details fixed');
