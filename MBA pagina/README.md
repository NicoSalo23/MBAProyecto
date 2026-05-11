# MBAFinanzasPro — Guía de Despliegue Completa

## Estructura del Proyecto

```
mba-finanzas/
├── index.html              ← Sitio web completo (frontend SPA)
├── rss-server/
│   ├── server.js           ← Servidor proxy RSS (Node.js/Express)
│   ├── package.json
│   └── README.md           ← Este archivo
└── README.md
```

---

## 🌐 1. El Sitio Web (index.html)

El `index.html` es un sitio web completo tipo SPA que incluye:

| Sección | Contenido |
|---|---|
| **Inicio** | Hero, artículos destacados, stats |
| **Programas MBA** | 9 artículos sobre programas globales |
| **Carreras & Salarios** | 8 artículos sobre rutas profesionales |
| **Finanzas Técnicas** | 8 artículos técnicos (DCF, LBO, VaR...) |
| **Preparación GMAT** | 8 artículos sobre admisiones |
| **Artículo Pillar** | Artículo completo +1,000 palabras (ejemplo) |
| **Noticias en Vivo** | Agregador RSS |
| **Sobre Nosotros** | Página EEAT con perfiles de autores |
| **Contacto** | Formulario funcional |
| **Política de Privacidad** | Cumplimiento RGPD |
| **Aviso Legal** | Límites de responsabilidad |
| **Política de Cookies** | Consentimiento AdSense |
| **Cookie Banner** | Banner de consentimiento GDPR |

### Despliegue del frontend

**Opción A: Hosting estático (recomendado para empezar)**
- Netlify: arrastrar y soltar `index.html` en netlify.com/drop
- Vercel: `vercel deploy`
- GitHub Pages: subir al repo y activar Pages

**Opción B: WordPress + conversión**
- Usar el contenido de los artículos para crear posts en WordPress
- Instalar tema Astra o GeneratePress (requerido para velocidad)
- Plugins recomendados: Yoast SEO, WP Rocket, Cookie Notice

---

## 🔌 2. El Servidor RSS (rss-server/)

### ¿Por qué un servidor backend?

Los navegadores bloquean peticiones directas a feeds RSS de otros dominios (política CORS).
El servidor backend actúa como **proxy**: tu sitio le pide los feeds al *tuyo* (sin CORS),
y el servidor los obtiene de las fuentes externas en el servidor.

### Instalación

```bash
cd rss-server
npm install
```

### Variables de entorno

Crea un archivo `.env`:
```env
PORT=3001
ALLOWED_ORIGIN=https://tudominio.com   # Cambia por tu dominio real
ADMIN_API_KEY=tu_clave_secreta_admin   # Para limpiar caché
```

### Desarrollo local

```bash
npm run dev
# Servidor en http://localhost:3001
```

### Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/feeds` | Lista de feeds disponibles |
| GET | `/api/feed` | Todos los artículos (todos los feeds) |
| GET | `/api/feed?sources=reuters-business,ft` | Feeds específicos |
| GET | `/api/feed?lang=es` | Solo feeds en español |
| GET | `/api/feed?limit=5` | Máximo 5 artículos por feed |
| GET | `/api/feed/reuters-business` | Un feed específico |
| POST | `/api/cache/clear` | Limpiar caché (requiere x-api-key header) |

### Ejemplo de respuesta

```json
{
  "count": 48,
  "sources": 8,
  "cacheAge": "≤15 min",
  "disclaimer": "Solo se muestran excerpts de feeds RSS públicos...",
  "items": [
    {
      "id": "https://reuters.com/...",
      "title": "Federal Reserve signals rate path amid uncertainty",
      "link": "https://reuters.com/business/...",
      "excerpt": "The Federal Reserve indicated Wednesday that...",
      "pubDate": "2025-06-15T14:30:00Z",
      "source": "Reuters Business",
      "category": "Mercados",
      "color": "#C9A84C",
      "language": "en"
    }
  ]
}
```

### Integración con el frontend

En `index.html`, reemplaza la función `fetchFeed` por llamadas a tu API:

```javascript
async function loadAllFeeds() {
  const res = await fetch('https://api.tudominio.com/api/feed?limit=6');
  const data = await res.json();
  allItems = data.items;
  renderFeed(allItems);
}
```

---

## ☁️ 3. Despliegue en Producción

### Opción A: Railway (más fácil, ~$5/mes)

```bash
# Instala Railway CLI
npm install -g @railway/cli

cd rss-server
railway login
railway init
railway up
```

### Opción B: Render (plan gratuito disponible)

1. Conecta tu repo GitHub a render.com
2. New Web Service → tu repo → directorio `rss-server/`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Añade las variables de entorno

### Opción C: VPS propio (DigitalOcean, Hostinger, etc.)

```bash
# En el servidor
git clone https://github.com/tu-usuario/mbafinanzaspro
cd mbafinanzaspro/rss-server
npm install
npm install -g pm2
pm2 start server.js --name "rss-server"
pm2 save
pm2 startup
```

---

## 📋 4. Checklist para Solicitar Google AdSense

Antes de enviar la solicitud, verifica:

- [ ] **+30 artículos** publicados y indexados en Google Search Console
- [ ] Artículos pillar de **+1,000 palabras** (los cortos deben tener +500 palabras)
- [ ] Página **Sobre Nosotros** con información real y verificable del autor
- [ ] Página de **Contacto** con formulario funcional y email visible
- [ ] **Política de Privacidad** que mencione explícitamente AdSense
- [ ] **Aviso Legal** visible desde el footer
- [ ] **Política de Cookies** con banner de consentimiento funcional
- [ ] Sitio **indexado** por Google (verificar en Search Console)
- [ ] **Sin otros anuncios de terceros** antes de la aprobación
- [ ] Dominio propio (no subdominios gratuitos como .blogspot o .wix)
- [ ] Sitio funcionando correctamente en **móvil** (Mobile-Friendly Test de Google)
- [ ] Velocidad de carga **>70 puntos** en PageSpeed Insights
- [ ] **Navegación clara** con categorías en el menú
- [ ] Contenido **original** (no copiado ni parafraseado de otras fuentes)
- [ ] Sitio activo mínimo **3-6 meses** (recomendado, especialmente fuera de EE.UU.)

---

## ⚖️ 5. Marco Legal del Agregador RSS

### ¿Por qué el RSS no infringe copyright?

1. **Diseño explícito**: El formato RSS fue creado específicamente para distribución y sindicación de contenido.
2. **Publicación voluntaria**: Los sitios publican feeds RSS deliberadamente para que otros los lean y enlacen.
3. **Uso mínimo**: Solo mostramos título, fecha y el excerpt que el propio sitio incluye en su feed.
4. **Siempre enlazamos**: Cada ítem enlaza directamente a la fuente original (esto es fundamental).
5. **Sin reproducción completa**: Nunca mostramos el texto completo del artículo.

### Qué NO debes hacer

- ❌ Copiar artículos completos de otros sitios
- ❌ Parafrasear artículos extensamente sin añadir valor
- ❌ Scraping de páginas que no tienen RSS (sin permiso)
- ❌ Usar imágenes de otros sitios sin licencia
- ❌ Presentar contenido ajeno como propio

### Qué SÍ puedes hacer (y es lo que hace este sistema)

- ✅ Mostrar titulares de feeds RSS públicos
- ✅ Mostrar el excerpt que el sitio publica en su propio RSS
- ✅ Enlazar siempre a la fuente original
- ✅ Añadir tu propio análisis y comentario al contenido agregado
- ✅ Usar noticias como punto de partida para crear contenido original

---

## 📈 6. Estrategia de Contenido para AdSense

### Volumen recomendado de publicación

| Mes | Meta | Tipo de contenido |
|---|---|---|
| 1-2 | 15 artículos | Pillar pages (+1,500 palabras) |
| 3-4 | +10 artículos | Guías intermedias (800-1,200 palabras) |
| 5-6 | +10 artículos | Artículos cortos, actualizaciones |
| Solicitud AdSense | 35+ artículos | Todos indexados |

### Palabras clave objetivo (alta intención)

```
"mejor MBA finanzas" (Búsq/mes: 2,400)
"MBA banca inversión" (Búsq/mes: 1,900)
"costo MBA harvard" (Búsq/mes: 3,200)
"salario post MBA" (Búsq/mes: 1,600)
"GMAT preparación" (Búsq/mes: 8,100)
"CFA vs MBA" (Búsq/mes: 2,900)
"valoración empresas DCF" (Búsq/mes: 4,400)
"private equity MBA" (Búsq/mes: 1,800)
```

---

*Proyecto: MBAFinanzasPro | Versión: 1.0 | Junio 2025*
