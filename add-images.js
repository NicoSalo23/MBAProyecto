const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const TOTAL = 19;

for (let n = 1; n <= TOTAL; n++) {
  const id  = `art${n}`;
  const img = `/images/art${n}.png`;

  // ── 1. Article cover image (after article-header, before toc) ──────────────
  const sectionMarker = `id="section-${id}"`;
  const sectionPos    = html.indexOf(sectionMarker);
  if (sectionPos === -1) { console.warn(`⚠️  section-${id} not found`); continue; }

  const headerClose = html.indexOf('</div>', html.indexOf('<div class="article-header">', sectionPos)) + 6;
  const coverTag = `\n    <img src="${img}" alt="${id} cover" class="article-cover-img" width="1200" height="675" loading="lazy" style="width:100%;max-height:420px;object-fit:cover;border-radius:12px;margin:24px 0 8px;display:block">`;

  // Only insert if not already present
  if (!html.slice(sectionPos, sectionPos + 3000).includes('article-cover-img')) {
    html = html.slice(0, headerClose) + coverTag + html.slice(headerClose);
  }

  // ── 2. Card thumbnails: replace gradient bg with real image ────────────────
  // Cards link to this article via href="/artN/" — update their card-img style
  const cardLinkPattern = new RegExp(
    `(<div class="card-img"[^>]*style=")([^"]*)(">)([\\s\\S]{0,200}?)(onclick="showArticle\\('${id}'\\))`,
    'g'
  );

  html = html.replace(cardLinkPattern, (match, p1, p2, p3, p4, p5) => {
    // Replace gradient background with image, keep overlay dark for readability
    const newStyle = `background-image:url('${img}');background-size:cover;background-position:center;position:relative`;
    return `${p1}${newStyle}${p3}${p4}${p5}`;
  });

  console.log(`✅ art${n} — cover image + card thumbnail updated`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('\n✅ All done — index.html updated with 19 article images');
