const fs = require('fs');
const path = require('path');

function shell(title, section, canonical) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} | MBA Finance Guide</title>
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="https://mbafinanceguide.com/${canonical}/">
  <link rel="icon" type="image/png" href="/logo/favicon.png">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:#f8f6f0;color:#1a2744;line-height:1.7}
    nav{background:#1a2744;padding:16px 24px;display:flex;align-items:center;justify-content:space-between}
    nav a{color:#fff;text-decoration:none;font-size:14px}
    nav img{height:36px}
    .back{background:#c9a84c;color:#1a2744!important;padding:8px 16px;border-radius:6px;font-weight:700;font-size:13px}
    main{max-width:860px;margin:0 auto;padding:48px 24px 80px}
    h1{font-size:2rem;margin-bottom:8px;color:#1a2744}
    .subtitle{color:#666;margin-bottom:36px;font-size:15px}
    h2{font-size:1.2rem;margin:32px 0 12px;color:#1a2744;border-bottom:2px solid #c9a84c;padding-bottom:6px}
    p,li{font-size:15px;margin-bottom:12px;color:#333}
    ul{padding-left:20px}
    footer{background:#1a2744;color:rgba(255,255,255,0.5);text-align:center;padding:24px;font-size:13px}
    footer a{color:rgba(255,255,255,0.6);margin:0 8px;text-decoration:none}
  </style>
</head>
<body>
  <nav>
    <a href="/"><img src="/logo/logo.png" alt="MBA Finance Guide" height="36"></a>
    <a href="/" class="back">← Back to site</a>
  </nav>
  <main>
    <h1>${title}</h1>
    <p class="subtitle">Last updated: June 1, 2025 | MBA Finance Guide</p>
    ${section}
  </main>
  <footer>
    <p>© 2025–2026 MBA Finance Guide &nbsp;|&nbsp;
      <a href="/privacidad/">Privacy Policy</a>
      <a href="/cookies/">Cookie Policy</a>
      <a href="/contacto/">Contact</a>
    </p>
  </footer>
</body>
</html>`;
}

// ── Privacy Policy ─────────────────────────────────────────────────────────
const privacyContent = `
<h2>1. Information We Collect</h2>
<p>MBA Finance Guide collects limited information to improve user experience and display relevant content. We may collect: pages visited, time on site, browser type, and approximate geographic location (via Google Analytics 4).</p>
<h2>2. Google Analytics</h2>
<p>We use Google Analytics 4 with Consent Mode v2. Analytics data is only collected after you accept cookies via our cookie banner. You may decline at any time. For more information visit <a href="https://policies.google.com/privacy" rel="noopener">Google's Privacy Policy</a>.</p>
<h2>3. Google AdSense</h2>
<p>We participate in Google AdSense, which uses cookies to serve ads based on prior visits to our site and other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="noopener">Google Ads Settings</a>.</p>
<h2>4. Cookies</h2>
<p>We use cookies for analytics (Google Analytics: <code>_ga</code>, <code>_gid</code>) and advertising (Google AdSense: <code>__gads</code>). We also store your cookie consent preference (<code>mbafp_consent</code>). See our <a href="/cookies/">Cookie Policy</a> for full details.</p>
<h2>5. Contact Forms</h2>
<p>Information submitted via the contact form is processed by Formspree (formspree.io) and forwarded to mbafinanceguide@outlook.com. We do not sell or share your personal data with third parties.</p>
<h2>6. CCPA (California Residents)</h2>
<p>California residents have the right to know what personal data we collect, request deletion, and opt out of sale of personal information. We do not sell personal data. To exercise your rights contact us at mbafinanceguide@outlook.com.</p>
<h2>7. GDPR (European Users)</h2>
<p>We process data only with your consent (analytics cookies) or for legitimate interests (security logs). You have the right to access, rectify, erase, and port your data. Contact mbafinanceguide@outlook.com to exercise these rights.</p>
<h2>8. Children's Privacy</h2>
<p>This site is intended for adults. We do not knowingly collect data from users under 13 years of age.</p>
<h2>9. Contact</h2>
<p>Questions about this policy: <a href="mailto:mbafinanceguide@outlook.com">mbafinanceguide@outlook.com</a></p>
`;

// ── Cookie Policy ──────────────────────────────────────────────────────────
const cookieContent = `
<h2>What Are Cookies?</h2>
<p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and measure usage.</p>
<h2>Cookies We Use</h2>
<ul>
  <li><strong>mbafp_consent</strong> — Stores your cookie consent choice. Duration: 1 year. Essential.</li>
  <li><strong>_ga, _gid</strong> — Google Analytics. Measures site usage anonymously after consent. Duration: 2 years / 24 hours.</li>
  <li><strong>__gads, __gpi</strong> — Google AdSense. Serves relevant ads after consent. Duration: 13 months.</li>
</ul>
<h2>How to Control Cookies</h2>
<p>You can withdraw consent at any time by clearing your browser cookies or clicking "Decline" on our cookie banner. You can also configure your browser to block all cookies, though this may affect site functionality.</p>
<p>To opt out of Google advertising cookies visit <a href="https://www.google.com/settings/ads" rel="noopener">Google Ads Settings</a> or <a href="http://www.aboutads.info/choices/" rel="noopener">aboutads.info</a>.</p>
<h2>Third-Party Cookies</h2>
<p>Google Analytics and Google AdSense set their own cookies governed by <a href="https://policies.google.com/privacy" rel="noopener">Google's Privacy Policy</a>. TradingView widgets may set session cookies for chart functionality.</p>
<h2>Contact</h2>
<p>Questions: <a href="mailto:mbafinanceguide@outlook.com">mbafinanceguide@outlook.com</a></p>
`;

// ── Contact ────────────────────────────────────────────────────────────────
const contactContent = `
<h2>Get in Touch</h2>
<p>Have a question about MBA programs, finance careers, or want to collaborate? We read every message and respond within 48 business hours.</p>
<h2>Email</h2>
<p><a href="mailto:mbafinanceguide@outlook.com">mbafinanceguide@outlook.com</a></p>
<h2>Send a Message</h2>
<form action="https://formspree.io/f/xvzlnzrd" method="POST" style="margin-top:8px">
  <input type="hidden" name="_subject" value="New message from MBA Finance Guide">
  <p><label style="display:block;font-weight:600;margin-bottom:4px" for="name">Name</label>
  <input type="text" id="name" name="name" required style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:15px"></p>
  <p style="margin-top:16px"><label style="display:block;font-weight:600;margin-bottom:4px" for="email">Email</label>
  <input type="email" id="email" name="email" required style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:15px"></p>
  <p style="margin-top:16px"><label style="display:block;font-weight:600;margin-bottom:4px" for="msg">Message</label>
  <textarea id="msg" name="message" required rows="5" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:15px"></textarea></p>
  <button type="submit" style="margin-top:16px;background:#1a2744;color:#fff;padding:12px 28px;border:none;border-radius:6px;font-size:15px;font-weight:700;cursor:pointer">Send Message</button>
</form>
<h2 style="margin-top:40px">Follow Us</h2>
<p><a href="https://x.com/MBAfinanceGuide" rel="noopener noreferrer" target="_blank">Twitter/X: @MBAfinanceGuide</a></p>
`;

// ── Write files ────────────────────────────────────────────────────────────
const pages = [
  { dir: 'privacidad', title: 'Privacy Policy',  content: privacyContent },
  { dir: 'cookies',    title: 'Cookie Policy',   content: cookieContent  },
  { dir: 'contacto',   title: 'Contact Us',      content: contactContent },
];

for (const { dir, title, content } of pages) {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  fs.writeFileSync(path.join(dirPath, 'index.html'), shell(title, content, dir), 'utf8');
  console.log(`✅ Created ${dir}/index.html`);
}
