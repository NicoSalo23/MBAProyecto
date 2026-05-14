const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Split by article sections
const sectionPattern = /<!-- ══+? ARTICLE art(\d+) ══+? -->([\s\S]*?)(?=<!-- ══+? ARTICLE art\d+|<!-- FOOTER -->)/g;

let output = 'MBA FINANCE GUIDE — ARTICLES FOR HUMANIZATION\n';
output += '='.repeat(60) + '\n\n';

let count = 0;
let match;

while ((match = sectionPattern.exec(html)) !== null) {
  const artNum = match[1];
  let content = match[2];

  // Extract title
  const titleMatch = content.match(/<h1>([\s\S]*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&') : `Article ${artNum}`;

  // Extract author and date
  const authorMatch = content.match(/<strong>(.*?)<\/strong>/);
  const author = authorMatch ? authorMatch[1] : '';
  const dateMatch = content.match(/<time[^>]*>(.*?)<\/time>/);
  const date = dateMatch ? dateMatch[1] : '';

  // Strip all HTML tags and decode entities
  let text = content
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi, (_, tag, inner) => {
      const clean = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
      return `\n\n### ${clean}\n\n`;
    })
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => {
      const clean = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
      return `• ${clean}\n`;
    })
    .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (_, inner) => {
      const cells = [];
      const cellPattern = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
      let cellMatch;
      while ((cellMatch = cellPattern.exec(inner)) !== null) {
        cells.push(cellMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim());
      }
      return cells.join(' | ') + '\n';
    })
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
      const clean = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
      return `\n"${clean}"\n`;
    })
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, inner) => {
      const clean = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
      return `\n${clean}\n`;
    })
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  output += `${'='.repeat(60)}\n`;
  output += `ARTICLE ${artNum}: ${title}\n`;
  output += `Author: ${author} | Date: ${date}\n`;
  output += `${'='.repeat(60)}\n\n`;
  output += text;
  output += '\n\n';
  count++;
}

// Also catch art1-art6 which may not have the comment format
const legacyPattern = /<div id="section-art([1-6])"[\s\S]*?(?=<div id="section-art[2-9]|<!-- ══)/g;
// (already captured above if comments exist, skip if count >= 17)

fs.writeFileSync('articles-humanization.txt', output, 'utf8');
console.log(`✅ Extracted ${count} articles → articles-humanization.txt`);
