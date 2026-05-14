const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const articles = [
  { id:'art1',  date:'2025-06-15', author:'Sarah Chen' },
  { id:'art2',  date:'2025-07-01', author:'Michael Rodriguez' },
  { id:'art3',  date:'2025-07-15', author:'Sarah Chen' },
  { id:'art4',  date:'2025-08-01', author:'David Park' },
  { id:'art5',  date:'2025-08-15', author:'Michael Rodriguez' },
  { id:'art6',  date:'2025-09-01', author:'David Park' },
  { id:'art7',  date:'2025-09-15', author:'Michael Rodriguez' },
  { id:'art8',  date:'2025-10-01', author:'Sarah Chen' },
  { id:'art9',  date:'2025-10-15', author:'David Park' },
  { id:'art10', date:'2025-11-01', author:'Sarah Chen' },
  { id:'art11', date:'2025-11-15', author:'Michael Rodriguez' },
  { id:'art12', date:'2025-12-01', author:'David Park' },
  { id:'art13', date:'2025-12-15', author:'Sarah Chen' },
  { id:'art14', date:'2026-01-01', author:'Michael Rodriguez' },
  { id:'art15', date:'2026-01-15', author:'David Park' },
  { id:'art16', date:'2026-02-01', author:'Sarah Chen' },
  { id:'art17', date:'2026-02-15', author:'Michael Rodriguez' },
  { id:'art18', date:'2026-03-01', author:'David Park' },
];

let count = 0;
for (const art of articles) {
  // Find the h1 inside this article's section
  const sectionMarker = `id="section-${art.id}"`;
  const sectionPos = html.indexOf(sectionMarker);
  if (sectionPos === -1) { console.warn(`⚠️  ${art.id} not found`); continue; }

  const h1Start = html.indexOf('<h1>', sectionPos);
  const h1End   = html.indexOf('</h1>', h1Start) + 5;
  const h1Inner = html.slice(html.indexOf('<h1>', sectionPos) + 4, html.indexOf('</h1>', h1Start));
  const title   = h1Inner.replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').trim();

  const schema = `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","headline":"${title.replace(/"/g,'\\"')}","author":{"@type":"Person","name":"${art.author}"},"datePublished":"${art.date}","dateModified":"${art.date}","publisher":{"@type":"Organization","name":"MBA Finance Guide","logo":{"@type":"ImageObject","url":"https://mbafinanceguide.com/logo/logo.png"}},"url":"https://mbafinanceguide.com/${art.id}/","mainEntityOfPage":"https://mbafinanceguide.com/${art.id}/"}
</script>`;

  // Insert schema right before the closing </article> of this section
  const articleClose = html.indexOf('</article>', sectionPos);
  if (articleClose === -1) { console.warn(`⚠️  </article> not found for ${art.id}`); continue; }

  html = html.slice(0, articleClose) + schema + '\n  ' + html.slice(articleClose);
  count++;
}

fs.writeFileSync('index.html', html, 'utf8');
console.log(`✅ Added BlogPosting schema to ${count} articles`);
