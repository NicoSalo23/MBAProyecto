const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let updated = 0;

for (let n = 1; n <= 19; n++) {
  const id  = `art${n}`;
  const img = `/images/art${n}.png`;
  const marker = `showArticle('${id}')`;

  let searchFrom = 0;
  while (true) {
    // Find next occurrence of a card that links to this article
    const markerPos = html.indexOf(marker, searchFrom);
    if (markerPos === -1) break;

    // Walk backwards to find the opening <article class="card">
    const articleStart = html.lastIndexOf('<article class="card">', markerPos);
    if (articleStart === -1) { searchFrom = markerPos + 1; continue; }

    // Find the card-img div inside this article
    const cardImgStart = html.indexOf('<div class="card-img"', articleStart);
    const nextArticle  = html.indexOf('<article', articleStart + 1);
    if (cardImgStart === -1 || cardImgStart > nextArticle) { searchFrom = markerPos + 1; continue; }

    // Find the style=" attribute and replace its value
    const styleAttr = html.indexOf('style="', cardImgStart);
    const styleEnd  = html.indexOf('"', styleAttr + 7);
    if (styleAttr === -1 || styleAttr > cardImgStart + 200) { searchFrom = markerPos + 1; continue; }

    const newStyle = `background-image:url('${img}');background-size:cover;background-position:center`;
    html = html.slice(0, styleAttr + 7) + newStyle + html.slice(styleEnd);
    updated++;

    searchFrom = markerPos + 1;
  }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log(`✅ Card thumbnails updated: ${updated}`);
