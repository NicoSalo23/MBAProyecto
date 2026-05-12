/**
 * MBA Finance Guide — RSS Aggregator Server
 * ==========================================
 * Node.js server acting as a proxy for public RSS feeds.
 * 
 * RESPETO AL COPYRIGHT:
 *   - Solo extrae: título, fecha, descripción breve (excerpt del feed), y URL original.
 *   - Nunca reproduce el artículo completo.
 *   - Siempre enlaza de vuelta a la fuente original.
 *   - Los feeds RSS son el mecanismo público de distribución diseñado para agregación.
 * 
 * INSTALACIÓN:
 *   npm install express cors axios rss-parser node-cache helmet
 * 
 * USO:
 *   node server.js
 *   # API disponible en: http://localhost:3001/api/feed
 */

const express = require('express');
const cors    = require('cors');
const axios   = require('axios');
const Parser  = require('rss-parser');
const NodeCache = require('node-cache');
const helmet  = require('helmet');

const app    = express();
const parser = new Parser({ timeout: 8000 });

// Cache: guarda los feeds por 15 minutos (900s) para no sobrecargar fuentes
const cache = new NodeCache({ stdTTL: 900, checkperiod: 120 });

// ── SEGURIDAD Y CORS ──
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  methods: ['GET'],
}));
app.use(express.json());

// ── FEEDS CONFIGURADOS ──
// Lista de feeds RSS públicos de fuentes financieras
// Todos son feeds RSS diseñados para distribución/sindicación pública
const FEEDS = [
  {
    id:       'reuters-business',
    name:     'Reuters Business',
    url:      'https://feeds.reuters.com/reuters/businessNews',
    category: 'Markets',
    color:    '#C9A84C',
    language: 'en',
  },
  {
    id:       'reuters-finance',
    name:     'Reuters Finance',
    url:      'https://feeds.reuters.com/reuters/financialNews',
    category: 'Finance',
    color:    '#E8A840',
    language: 'en',
  },
  {
    id:       'marketwatch',
    name:     'MarketWatch Top Stories',
    url:      'https://feeds.content.dowjones.io/public/rss/mw_topstories',
    category: 'Markets',
    color:    '#0078C8',
    language: 'en',
  },
  {
    id:       'barrons',
    name:     "Barron's",
    url:      'https://www.barrons.com/xml/rss/3_7014.xml',
    category: 'Investments',
    color:    '#1D4E8F',
    language: 'en',
  },
  {
    id:       'seeking-alpha',
    name:     'Seeking Alpha',
    url:      'https://seekingalpha.com/market_currents.xml',
    category: 'Analysis',
    color:    '#2E8B57',
    language: 'en',
  },
  {
    id:       'ft',
    name:     'Financial Times',
    url:      'https://www.ft.com/rss/home/us',
    category: 'Global',
    color:    '#FF8D00',
    language: 'en',
  },
  {
    id:       'expansion',
    name:     'Expansión',
    url:      'https://e00-expansion.uecdn.es/rss/portada.xml',
    category: 'Spain',
    color:    '#003087',
    language: 'es',
  },
  {
    id:       'portafolio',
    name:     'Portafolio Colombia',
    url:      'https://www.portafolio.co/rss.xml',
    category: 'LATAM',
    color:    '#C8102E',
    language: 'es',
  },
];

// ── HELPERS ──
/**
 * Limpia texto HTML de la descripción del feed y la trunca.
 * Solo usamos el excerpt que el sitio provee en su propio RSS.
 */
function cleanExcerpt(text = '', maxChars = 220) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxChars);
}

/**
 * Fetch un feed RSS y devuelve items normalizados.
 * Solo extrae campos que están en el feed (no raspa el artículo original).
 */
async function fetchFeed(feed, maxItems = 8) {
  const cacheKey = `feed_${feed.id}`;
  const cached   = cache.get(cacheKey);
  if (cached) {
    console.log(`[CACHE HIT] ${feed.name}`);
    return cached;
  }

  console.log(`[FETCH] ${feed.name} — ${feed.url}`);
  try {
    const parsed = await parser.parseURL(feed.url);
    const items  = (parsed.items || []).slice(0, maxItems).map((item) => ({
      id:          item.guid || item.link,
      title:       (item.title || 'Sin título').trim(),
      link:        item.link || '#',
      excerpt:     cleanExcerpt(item.contentSnippet || item.content || item.summary || ''),
      pubDate:     item.pubDate || item.isoDate || new Date().toISOString(),
      source:      feed.name,
      category:    feed.category,
      color:       feed.color,
      language:    feed.language,
      // Nota: NO incluimos el contenido completo del artículo — solo el excerpt del feed
    }));
    cache.set(cacheKey, items);
    return items;
  } catch (err) {
    console.error(`[ERROR] ${feed.name}: ${err.message}`);
    return [];
  }
}

// ── RUTAS ──

/**
 * GET /api/feeds
 * Lista los feeds disponibles y su estado de caché
 */
app.get('/api/feeds', (req, res) => {
  res.json({
    feeds: FEEDS.map((f) => ({
      id:       f.id,
      name:     f.name,
      category: f.category,
      language: f.language,
      cached:   !!cache.get(`feed_${f.id}`),
    })),
    cachePolicy: 'RSS fetched once per 15 minutes. Only title, excerpt, and original link returned.',
    copyrightNotice:
      'This API fetches publicly available RSS feed excerpts only. ' +
      'No full article content is reproduced. All items link back to the original source.',
  });
});

/**
 * GET /api/feed
 * Query params:
 *   - sources: CSV de IDs de feeds (ej: "reuters-business,ft"). Por defecto: todos.
 *   - limit:   Max artículos por feed (1-20, default 8)
 *   - lang:    "es" | "en" | "all" (default: all)
 */
app.get('/api/feed', async (req, res) => {
  const { sources, limit = 8, lang = 'all' } = req.query;

  // Filtrar feeds por fuente y/o idioma
  let selectedFeeds = FEEDS;
  if (sources) {
    const ids = sources.split(',').map((s) => s.trim());
    selectedFeeds = FEEDS.filter((f) => ids.includes(f.id));
    if (!selectedFeeds.length) {
      return res.status(400).json({ error: 'No valid feeds found in the "sources" parameter.' });
    }
  }
  if (lang !== 'all') {
    selectedFeeds = selectedFeeds.filter((f) => f.language === lang);
  }

  const maxItems = Math.min(Math.max(parseInt(limit) || 8, 1), 20);

  // Fetch todos los feeds en paralelo
  const results = await Promise.allSettled(
    selectedFeeds.map((feed) => fetchFeed(feed, maxItems))
  );

  const allItems = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  res.json({
    count:     allItems.length,
    sources:   selectedFeeds.length,
    cacheAge:  '≤15 min',
    disclaimer:
      'Only public RSS feed excerpts are shown. ' +
      'All articles link back to the original source. ' +
      'No full article content is reproduced.',
    items: allItems,
  });
});

/**
 * GET /api/feed/:feedId
 * Obtiene artículos de un feed específico
 */
app.get('/api/feed/:feedId', async (req, res) => {
  const feed = FEEDS.find((f) => f.id === req.params.feedId);
  if (!feed) {
    return res.status(404).json({ error: 'Feed not found.', available: FEEDS.map((f) => f.id) });
  }
  const maxItems = Math.min(parseInt(req.query.limit) || 10, 20);
  const items    = await fetchFeed(feed, maxItems);
  res.json({ source: feed.name, count: items.length, items });
});

/**
 * POST /api/cache/clear
 * Limpia el caché manualmente (requiere API key en producción)
 */
app.post('/api/cache/clear', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  cache.flushAll();
  res.json({ message: 'Cache cleared successfully.' });
});

// ── HEALTH CHECK ──
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), cacheKeys: cache.keys().length });
});

// ── INICIO ──
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 MBA Finance Guide RSS Server running at http://localhost:${PORT}`);
  console.log(`   GET /api/feeds          — list of sources`);
  console.log(`   GET /api/feed           — all articles`);
  console.log(`   GET /api/feed/:feedId   — articles from one source`);
  console.log(`   GET /health             — health check\n`);
});

module.exports = app;
