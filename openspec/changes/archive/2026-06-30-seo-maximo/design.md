# Design: SEO Máximo — SEO Overhaul for Verdulería Landing Page

## Technical Approach

All changes are additive or purely string/attribute substitutions across 4 files + 2 new files. Zero component restructuring. Changes divide into 8 independent work units, applied in 3 batches respecting dependency order.

**Pattern**: static strings → `<head>` in `index.html` (meta tags, JSON-LD, font links); attribute-only changes in `App.tsx` (img attrs, link attrs, JSX wrappers); new static files in `public/`.

## Architecture Decisions

| Option | Tradeoffs | Decision |
|--------|-----------|----------|
| JSON-LD in `<head>` vs. `<body>` | Body avoids "blocked by CSP" edge cases; head is conventional for schema.org | `<head>` — conventional, Google specifically recommends it for LocalBusiness |
| `fetchpriority="high"` vs. `<link rel="preload">` for hero | Preload works across image source changes; fetchpriority is declarative on the img itself | `fetchpriority="high"` — simpler, co-located with img, same effect |
| Inline `<address>` per block vs. single wrapper | Single `<address>` is more semantically correct; per-block preserves grid layout and prevents wrapping headings | Per-block — keeps `<h4>` labels outside `<address>` per spec, no layout impact |
| `size={44}` icon vs. `p-2` wrapper for social tap targets | `p-2` wrapper keeps icon at 32px; `size={44}` is direct | `size={44}` on icon — one attribute change, no layout side effects |

## Component Tree — Change Mapping

```
index.html (shell) ← html-meta-tags, structured-data, font-performance
  └── src/main.tsx
       └── App.tsx ← semantic-html, image-optimization, social-links, business-name
            ├── Navbar ← semantic-html (ul/li)
            ├── Hero ← image-optimization (hero img)
            ├── Seasonal ← semantic-html (article), business-name (subtitle), image-optimization (papaya, banana)
            ├── About ← image-optimization (truck, market)
            ├── Location ← semantic-html (address), business-name (email TBD)
            └── Footer ← semantic-html (h2→p), social-links (href/aria/rel), business-name (brand text)
public/ ← crawl-files (robots.txt, sitemap.xml)
src/index.css ← font-performance (remove @import)
```

## Data Flow — Per Work Unit

| Work Unit | Source | Target | Data Shape |
|-----------|--------|--------|------------|
| html-meta-tags | Static strings in design | `<head>` in `index.html` | 17 `<meta>`/`<link>` tags, 1 `<title>` |
| structured-data | Static JSON object | `<script type="application/ld+json">` in `<head>` | 1 LocalBusiness schema (~40 lines JSON) |
| image-optimization | Per-image attrs | 5 `<img>` tags in `App.tsx` | `alt` (string), `loading` (enum), `fetchpriority` (enum), `width`/`height` (int) |
| semantic-html | JSX wrapper changes | 6 locations in `App.tsx` | `<div>`→`<ul>`, `<a>`→`<li>` wrappers, `<div>`→`<article>`, `<p>`→`<address>`, `<h2>`→`<p>` |
| social-links | Per-link attrs | 3 `<a>` tags in `App.tsx` Footer | `href` (URL), `aria-label` (string), `rel`+`target` (fixed), icon `size` |
| font-performance | 3 `<link>` tags → `index.html`, remove line → `index.css` | `index.html` + `index.css` | 2 preconnect + 1 stylesheet link; delete 1 `@import` line |
| crawl-files | Static file content | `public/robots.txt`, `public/sitemap.xml` | 6-line text file, 12-line XML file |
| business-name | String replacements | 2 locations in `App.tsx` | 2 string literals replaced |

## File Changes — Complete Line Specification

### `index.html` — Rewrite from 13 lines to ~45 lines

| # | Action | Original | New |
|---|--------|----------|-----|
| L2 | Modify | `<html lang="en">` | `<html lang="es">` |
| L4-7 | Replace block | `<meta charset />` + `<link icon />` + `<meta viewport />` + `<title>` | Full `<head>` block below |

Expanded `<head>` replacing lines 4–7:

```html
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verdulería Local — Fruta Fresca en Madrid | Desde 1962</title>
    <meta name="theme-color" content="#00693E" />
    <meta name="description" content="Fruta y verdura fresca en el Barrio Mercado de Madrid. Productos de temporada, directos del campo. Visítanos desde 1962." />
    <link rel="canonical" href="https://labodegalocal.es/" />
    <meta name="robots" content="index, follow" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Covered+By+Your+Grace&display=swap" rel="stylesheet" />
    <meta property="og:title" content="Verdulería Local — Fruta Fresca en Madrid Desde 1962" />
    <meta property="og:description" content="Fruta y verdura fresca en el Barrio Mercado de Madrid. Directo del campo a tu mesa." />
    <meta property="og:image" content="https://labodegalocal.es/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://labodegalocal.es/" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="Verdulería Local" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Verdulería Local — Fruta Fresca en Madrid Desde 1962" />
    <meta name="twitter:description" content="Fruta y verdura fresca en el Barrio Mercado de Madrid. Directo del campo a tu mesa." />
    <meta name="twitter:image" content="https://labodegalocal.es/og-image.jpg" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://labodegalocal.es/#business",
  "name": "Verdulería Local",
  "alternateName": "La Bodega Local",
  "description": "Verdulería de fruta y verdura fresca en Madrid. Producto local, directo del campo a tu mesa. Desde 1962.",
  "url": "https://labodegalocal.es/",
  "telephone": "+34 91 123 4567",
  "email": "hola@verdulerialocal.es",
  "foundingDate": "1962",
  "image": "https://labodegalocal.es/og-image.jpg",
  "priceRange": "\u20AC",
  "areaServed": {
    "@type": "City",
    "name": "Madrid"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle de la Fruta 45",
    "addressLocality": "Madrid",
    "addressRegion": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.4168,
    "longitude": -3.7038
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/verdurerialocal",
    "https://www.facebook.com/verdurerialocal",
    "https://wa.me/34911234567"
  ]
}
    </script>
```

Lines 9–13 (body, root div, script, closing tags) remain unchanged.

---

### `src/index.css` — 1 line deleted

| Line | Action | Original | New |
|------|--------|----------|-----|
| L1 | Delete | `@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Covered+By+Your+Grace&display=swap');` | *(empty line removed)* |

Lines 2–51 (Tailwind imports, `@theme`, `@layer`, `@utility`) remain unchanged.

---

### `src/App.tsx` — 18 change sites

**business-name:**

| Line | Original | New |
|------|----------|-----|
| L167 | `Good for the gut, good for the soul` | `Bueno para el cuerpo, bueno para el alma` |
| L373 | `<h2 className="font-heading text-3xl md:text-4xl text-gold uppercase">La Bodega Local</h2>` | `<p className="font-heading text-3xl md:text-4xl text-gold uppercase">Verdulería Local</p>` |

**semantic-html:**

| Lines | Original | New |
|-------|----------|-----|
| L39–49 | `<div className="hidden md:flex items-center gap-10">` + `<a>` items + `</div>` | `<ul role="list" className="hidden md:flex items-center gap-10">` + `<li><a>...</a></li>` items + `</ul>` |
| L190 | `<div className="bg-white brutalist-border overflow-hidden relative group h-64 md:h-auto">` | `<article className="bg-white brutalist-border overflow-hidden relative group h-64 md:h-auto">` |
| L196 | `</div>` (closing papaya card) | `</article>` |
| L199 | `<div className="md:row-span-2 bg-white brutalist-border overflow-hidden relative group h-80 md:h-auto">` | `<article className="md:row-span-2 bg-white brutalist-border overflow-hidden relative group h-80 md:h-auto">` |
| L206 | `</div>` (closing banana card) | `</article>` |
| L322 | `<p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">Calle de la Fruta 45,<br />Barrio Mercado, Madrid</p>` | `<address className="not-italic"><p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">Calle de la Fruta 45,<br />Barrio Mercado, Madrid</p></address>` |
| L330 | `<p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">Lun - Sáb: 7:00 - 20:00<br />Dom: 8:00 - 14:00</p>` | `<address className="not-italic"><p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">Lun - Sáb: 7:00 - 20:00<br />Dom: 8:00 - 14:00</p></address>` |
| L338 | `<p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">+34 91 123 4567<br />hola@labodegalocal.es</p>` | `<address className="not-italic"><p className="text-xl sm:text-3xl md:text-5xl mt-6 font-body break-all">+34 91 123 4567<br />hola@labodegalocal.es</p></address>` |

> **Note**: `<address>` gets `className="not-italic"` to prevent default italic styling and preserve current visual appearance.

**image-optimization:**

| Lines | Attr | Original | New |
|-------|------|----------|-----|
| L150–152 | `alt` | `alt="Fruit Market"` | `alt="Puesto de fruta fresca y verdura en Verdulería Local, Madrid"` |
| L150–152 | +attrs | — | `fetchpriority="high" width={1200} height={800}` |
| L192–194 | `alt` | `alt="Papaya"` | `alt="Papaya fresca de temporada en Verdulería Local"` |
| L192–194 | +attrs | — | `loading="lazy" width={600} height={600}` |
| L200–204 | `alt` | `alt="Bananas"` | `alt="Plátanos verdes frescos, seleccionados a mano cada mañana"` |
| L200–204 | +attrs | — | `loading="lazy" width={800} height={800}` |
| L277–279 | `alt` | `alt="Vintage Truck"` | `alt="Camión de reparto de los años 60, el primer vehículo de Verdulería Local"` |
| L277–279 | +attrs | — | `loading="lazy" width={600} height={600}` |
| L294–296 | `alt` | `alt="Old Market"` | `alt="Calle de la Fruta en los años 60, donde empezó el negocio familiar"` |
| L294–296 | +attrs | — | `loading="lazy" width={600} height={600}` |

**social-links:**

| Line | Original | New |
|------|----------|-----|
| L377 | `<a href="#" className="text-gold hover:scale-125 transition-transform"><Instagram size={32} /></a>` | `<a href="https://www.instagram.com/verdurerialocal" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Verdulería Local" className="text-gold hover:scale-125 transition-transform"><Instagram size={44} /></a>` |
| L378 | `<a href="#" className="text-gold hover:scale-125 transition-transform"><Facebook size={32} /></a>` | `<a href="https://www.facebook.com/verdurerialocal" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Verdulería Local" className="text-gold hover:scale-125 transition-transform"><Facebook size={44} /></a>` |
| L379 | `<a href="#" className="text-gold hover:scale-125 transition-transform"><MessageCircle size={32} /></a>` | `<a href="https://wa.me/34911234567?text=Hola!%20Quiero%20consultar%20por..." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Verdulería Local" className="text-gold hover:scale-125 transition-transform"><MessageCircle size={44} /></a>` |

---

### New files

**`public/robots.txt`:**

```
User-agent: *
Allow: /

Sitemap: https://labodegalocal.es/sitemap.xml
```

**`public/sitemap.xml`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://labodegalocal.es/</loc>
    <lastmod>2026-06-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**`public/og-image.jpg`**: Placeholder — 1200×630px emerald-green image with "Verdulería Local" text. Generate via Vercel OG (`@vercel/og`) or a `sharp` script. Real branded image to be provided later.

---

## Dependencies Between Work Units

```
font-performance ──────┐ (adds preconnect + link to <head>)
html-meta-tags ────────┤ (same file, independent additions)
crawl-files ───────────┤ (public/, no deps)
                       │
business-name ─────────┤ (needed by structured-data for name/email)
    └── structured-data ┘ (must run AFTER business-name)
                       │
semantic-html ─────────┤ (independent, same file as img/social)
social-links ──────────┤ (independent)
image-optimization ────┘ (independent)
```

**Key constraint**: `structured-data` MUST know the final business name (`"Verdulería Local"`) and email (`hola@verdulerialocal.es`). Run `business-name` first, or run `structured-data` last with the final values hardcoded.

`semantic-html` and `business-name` both modify line 373 (`<h2>`→`<p>` + `La Bodega Local`→`Verdulería Local`). Apply as one combined edit to avoid conflicts.

## Implementation Order (3 Batches)

### Batch 1: Infrastructure (no code logic changes)
1. **font-performance** — `index.css` (remove `@import`) + `index.html` (add preconnect + link)
2. **html-meta-tags** — `index.html` `<head>` rewrite (meta tags, OG, Twitter)
3. **crawl-files** — Create `public/robots.txt` + `public/sitemap.xml`

### Batch 2: App.tsx content changes (all independent)
4. **business-name** + **semantic-html** combined — `App.tsx` (coordinate line 373 in one edit)
5. **social-links** — `App.tsx` Footer
6. **image-optimization** — `App.tsx` (5 image tags)

### Batch 3: Structured data (needs final name from step 4)
7. **structured-data** — `index.html` append JSON-LD to `<head>`

### After all batches
8. Generate `public/og-image.jpg` placeholder

## Verification Strategy

| Work Unit | Auto-Check | Manual Check |
|-----------|-----------|--------------|
| font-performance | `pnpm build` succeeds; `rg "@import" src/index.css` returns empty | Lighthouse "Eliminate render-blocking resources" resolved |
| html-meta-tags | `pnpm build` succeeds; grep each meta tag existence | Facebook Sharing Debugger, Twitter Card Validator |
| crawl-files | `Test-Path dist/robots.txt` and `dist/sitemap.xml` after build | Google Robots Testing Tool |
| business-name | `rg "La Bodega Local" src/App.tsx` only in JSON-LD context | Visual check — footer reads "Verdulería Local" |
| semantic-html | `rg "<article>" src/App.tsx` = 2 matches; `rg "<address>"` = 3 matches | W3C HTML validation; no visual regression |
| social-links | `rg "target=\"_blank\"" src/App.tsx` = 3 matches; `rg "aria-label"` = 3 social | Click each link opens correct URL |
| image-optimization | `rg "loading=\"lazy\"" src/App.tsx` = 4 matches; `rg "fetchpriority"` = 1 | Lighthouse LCP ≤ 2.5s, CLS ≤ 0.1 |
| structured-data | JSON parseable; `rg "@type.*LocalBusiness" index.html` | Google Rich Results Test passes |

**Final Lighthouse target**: SEO ≥ 90, LCP ≤ 2.5s, CLS ≤ 0.1.

## Open Questions

- [ ] **Email domain conflict**: JSON-LD uses `hola@verdulerialocal.es` (per design), but Location section line 338 shows `hola@labodegalocal.es`. Decide: update Location email to match, or revert JSON-LD to `labodegalocal.es`? Proposal risk #2 flags this. Recommend extending **business-name** scope to also update line 338.
- [ ] **`og-image.jpg`**: Who generates the placeholder? Needs 1200×630px with branding. Option: use `sharp` in a script, or create a simple green SVG placeholder.
- [ ] **Instagram handle**: `verdurerialocal` is a placeholder — confirm actual handle before deploy.
- [ ] **Facebook handle**: Same — `verdurerialocal` placeholder, confirm actual page URL.
