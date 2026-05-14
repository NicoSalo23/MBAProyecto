const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Helper: replace a card's non-clickable span with a proper link
// and optionally fix the h3 link too
function fixCard(h3Snippet, artId) {
  const artPath = `/${artId}/`;

  // Fix the Read → span (non-clickable) → clickable anchor
  html = html.replace(
    new RegExp(`(${esc(h3Snippet)}[\\s\\S]{0,600}?)<span class="read-more">Read →<\\/span>`, 'm'),
    `$1<a href="${artPath}" class="read-more" onclick="showArticle('${artId}');return false">Read article →</a>`
  );

  // Fix showSection on the read-more link if it points to a section not an article
  html = html.replace(
    new RegExp(`(${esc(h3Snippet)}[\\s\\S]{0,600}?)<a href="[^"]*" class="read-more" onclick="showSection\\('[^']*'\\);return false">Read article →<\\/a>`, 'm'),
    `$1<a href="${artPath}" class="read-more" onclick="showArticle('${artId}');return false">Read article →</a>`
  );

  // Fix showSection on the h3 link (home featured cards)
  html = html.replace(
    new RegExp(`<a href="[^"]*" onclick="showSection\\('[^']*'\\);return false">(${esc(h3Snippet)})`, 'm'),
    `<a href="${artPath}" onclick="showArticle('${artId}');return false">$1`
  );
}

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── HOME featured cards ───────────────────────────────────────────────────────
fixCard('Harvard vs Wharton: Which Finance MBA Opens More Doors?',       'art2');
fixCard('LBO Models: What You\'ll Learn in the MBA and How to Apply It', 'art5');
fixCard('CFA vs MBA: Which Credential Boosts Your Finance Career More?', 'art9');
fixCard('DCF Valuation: The Complete Step-by-Step Guide',                'art5');

// ── MBA Programs section ──────────────────────────────────────────────────────
fixCard('Harvard Business School: Complete MBA Analysis 2025',           'art1');
fixCard('Wharton School of Finance: The MBA That Defines Wall Street',   'art2');
fixCard('Chicago Booth MBA: The Quantitative',                           'art18');
fixCard('London Business School vs INSEAD',                              'art18');
fixCard('IE Business School',                                            'art18');
fixCard('Finance MBAs in Latin America',                                 'art4');
fixCard('Online Finance MBA',                                            'art4');
fixCard('Part-Time vs Full-Time MBA',                                    'art4');

// ── Careers & Salaries section ────────────────────────────────────────────────
fixCard('CFO at 40',                                                     'art17');
fixCard('CFA vs MBA: Key Differences for Financial Analysts',            'art9');
fixCard('Goldman Sachs, JPMorgan, Morgan Stanley: What They Look for',   'art3');
fixCard('From MBA to Hedge Fund Manager',                                'art7');
fixCard('Finance Networking: How to Activate',                           'art3');
fixCard('Post-MBA Finance Salaries: Real Data 2025',                     'art12');

// ── Technical Finance section ─────────────────────────────────────────────────
fixCard('LBO Models: Fundamentals of the Leveraged Buyout',              'art5');
fixCard('Portfolio Management: Markowitz Theory',                        'art17');
fixCard('Financial Derivatives: Options, Futures',                       'art5');
fixCard('Fundamental Analysis: How to Read a Balance Sheet',             'art5');
fixCard('Financial Risk Management: Value at Risk',                      'art5');
fixCard('Mergers & Acquisitions: Value Analysis in M',                   'art16');
fixCard('Fintech & the Future of Finance',                               'art11');

// ── GMAT Prep section ─────────────────────────────────────────────────────────
fixCard('GMAT 700+: 3-Month Study Plan',                                 'art15');
fixCard('GRE vs GMAT',                                                   'art15');
fixCard('How to Write a Statement of Purpose',                           'art15');
fixCard('Fatal Mistakes in the MBA Interview',                           'art15');
fixCard('Finance MBA Scholarships: Complete Guide',                      'art10');
fixCard('How to Build a Competitive Profile for a Top 10 MBA',           'art15');
fixCard('MBA Recommendation Letters',                                    'art15');
fixCard('MBA Application Timeline',                                      'art15');

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ All card links fixed');
