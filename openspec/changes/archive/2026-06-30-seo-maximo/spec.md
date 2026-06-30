# Especificación: SEO Máximo

**Change**: seo-maximo
**Date**: 2026-06-30
**Domain**: landing-verduleria
**Mode**: openspec

---

## 1. html-meta-tags

**Requirement ID**: SEO-META-001
**Title**: Language, title, description, and social meta tags in `<head>`

### Description

The `<head>` section MUST be rewritten from its current minimal state to include proper language declaration, descriptive title, meta description, canonical URL, Open Graph tags, Twitter Card tags, robots meta, and theme-color. Every tag MUST use Spanish content consistent with the business identity "Verdulería Local."

### Current Behavior

`index.html` has 13 lines total. `<html lang="en">` declares English on a 100% Spanish page. Title is `"Verdulería Local"` — weak for local SEO, missing geolocation and keywords. Missing: meta description, canonical, robots, OG tags, Twitter Card tags, theme-color. No social preview exists when shared on WhatsApp, Instagram, Facebook, or X/Twitter.

### Expected Behavior

| Tag | Value |
|-----|-------|
| `html lang` | `"es"` |
| `title` | `"Verdulería Local — Fruta Fresca en Madrid | Desde 1962"` |
| `meta description` | `"Fruta y verdura fresca en el Barrio Mercado de Madrid. Productos de temporada, directos del campo. Visítanos desde 1962."` |
| `link canonical` | `"https://labodegalocal.es/"` |
| `meta robots` | `"index, follow"` |
| `meta theme-color` | `"#00693E"` (brand emerald) |
| `og:title` | `"Verdulería Local — Fruta Fresca en Madrid Desde 1962"` |
| `og:description` | `"Fruta y verdura fresca en el Barrio Mercado de Madrid. Directo del campo a tu mesa."` |
| `og:image` | `"https://labodegalocal.es/og-image.jpg"` |
| `og:image:width` | `"1200"`, `og:image:height`: `"630"` |
| `og:url` | `"https://labodegalocal.es/"` |
| `og:type` | `"website"` |
| `og:locale` | `"es_ES"` |
| `og:site_name` | `"Verdulería Local"` |
| `twitter:card` | `"summary_large_image"` |
| `twitter:title` | Same as `og:title` |
| `twitter:description` | Same as `og:description` |
| `twitter:image` | Same as `og:image` |

### Acceptance Criteria

- [ ] `<html lang="es">` replaces `lang="en"`
- [ ] `<title>` reads "Verdulería Local — Fruta Fresca en Madrid | Desde 1962"
- [ ] `<meta name="description">` present with Spanish description ≥ 120 chars
- [ ] `<link rel="canonical" href="https://labodegalocal.es/">` present
- [ ] `<meta name="robots" content="index, follow">` present
- [ ] `<meta name="theme-color" content="#00693E">` present
- [ ] All 8 Open Graph tags present with correct `property` attribute names and Spanish content
- [ ] All 4 Twitter Card tags present with correct `name` attribute names
- [ ] `og:image:width` and `og:image:height` match actual 1200×630 dimensions
- [ ] Facebook Sharing Debugger validates all OG tags
- [ ] Twitter Card Validator validates `summary_large_image` card
- [ ] Lighthouse SEO score ≥ 90

### Technical Notes

- OG tags use `property` attribute (`<meta property="og:..." content="...">`)
- Twitter Card tags use `name` attribute (`<meta name="twitter:..." content="...">`)
- Canonical URL MUST use `https://labodegalocal.es/` (not `www.`)
- `og:image` references `/og-image.jpg` — file MUST exist at `public/og-image.jpg` (1200×630px)
- Placeholder OG image can be generated via `sharp` or similar; real branding image needed later

---

## 2. structured-data

**Requirement ID**: SEO-LD-001
**Title**: JSON-LD LocalBusiness schema for rich search results

### Description

A `<script type="application/ld+json">` block MUST be injected into `<head>` with a complete LocalBusiness schema. This is the single most impactful SEO improvement for a local brick-and-mortar shop — powers Knowledge Panel, Google Maps Pack, rich snippets, and voice search results.

### Current Behavior

No JSON-LD, Microdata, or RDFa structured data of any kind exists. The page is invisible to Google's Knowledge Graph for local business queries.

### Expected Behavior

A valid LocalBusiness JSON-LD block with these fields:

| Field | Value |
|-------|-------|
| `@type` | `LocalBusiness` |
| `@id` | `"https://labodegalocal.es/#business"` |
| `name` | `"Verdulería Local"` |
| `alternateName` | `"La Bodega Local"` |
| `description` | `"Fruta y verdura fresca en Madrid. Productos de temporada directos del campo desde 1962."` |
| `url` | `"https://labodegalocal.es/"` |
| `telephone` | `"+34 91 123 4567"` |
| `email` | `"hola@labodegalocal.es"` |
| `foundingDate` | `"1962"` |
| `image` | `"https://labodegalocal.es/og-image.jpg"` |
| `address.streetAddress` | `"Calle de la Fruta 45"` |
| `address.addressLocality` | `"Madrid"` |
| `address.addressRegion` | `"Madrid"` |
| `address.postalCode` | `"28001"` |
| `address.addressCountry` | `"ES"` |
| `geo.latitude` | `40.4168` |
| `geo.longitude` | `-3.7038` |
| `openingHours` | Mon–Sat 07:00–20:00, Sun 08:00–14:00 |
| `priceRange` | `"€"` |
| `sameAs` | Instagram and Facebook profile URLs |
| `areaServed` | Madrid (City) |

### Acceptance Criteria

- [ ] `<script type="application/ld+json">` present in `<head>`
- [ ] JSON is valid parseable JSON (no trailing commas, no syntax errors)
- [ ] Schema validates on Google Rich Results Test (search.google.com/test/rich-results)
- [ ] All required LocalBusiness fields present: `name`, `description`, `url`, `telephone`, `address`, `geo`, `openingHoursSpecification`
- [ ] `alternateName` includes `"La Bodega Local"` for business name migration safety
- [ ] `sameAs` array matches the social media URLs used in footer links
- [ ] Phone number uses international format (`+34 91 123 4567`)
- [ ] Email matches the contact shown in Location section (`hola@labodegalocal.es`)

### Technical Notes

- MUST use `openingHoursSpecification` (array of `OpeningHoursSpecification` objects) not the deprecated `openingHours` string format
- `@id` MUST be unique — use URL fragment `#business`
- Geo coordinates are estimates for Barrio Mercado, Madrid — confirm with actual location
- Keep schema readable (2-space indent) for debugging

---

## 3. image-optimization

**Requirement ID**: SEO-IMG-001
**Title**: Lazy loading, fetchpriority, dimensions, and Spanish alt texts

### Description

All non-decorative images MUST receive descriptive Spanish alt text, explicit `width`/`height` attributes to prevent Cumulative Layout Shift (CLS), `loading="lazy"` on non-hero images, and `fetchpriority="high"` on the hero image. Decorative SVGs MUST keep `alt=""`.

### Current Behavior

Five non-decorative images have generic or English alt text: `"Fruit Market"`, `"Papaya"`, `"Bananas"`, `"Vintage Truck"`, `"Old Market"`. No image has `loading="lazy"`, `fetchpriority`, `width`, or `height` attributes. Hero image loads eagerly but without priority signaling. Below-fold images load eagerly, wasting bandwidth. Missing dimensions cause layout shift when images load.

### Expected Behavior

| Component | Line | Alt Text (Spanish, descriptive) | loading | fetchpriority | w/h |
|-----------|------|--------------------------------|---------|---------------|-----|
| Hero photo | 149 | `"Puesto de fruta fresca y verdura en Verdulería Local, Madrid"` | — | `"high"` | `{width: 1200, height: 800}` |
| Papaya product | 191 | `"Papaya fresca de temporada en Verdulería Local"` | `"lazy"` | — | `{width: 600, height: 600}` |
| Bananas product | 199 | `"Plátanos verdes frescos, seleccionados a mano cada mañana"` | `"lazy"` | — | `{width: 800, height: 800}` |
| Vintage truck | 276 | `"Camión de reparto de los años 60, el primer vehículo de Verdulería Local"` | `"lazy"` | — | `{width: 600, height: 600}` |
| Old market photo | 293 | `"Calle de la Fruta en los años 60, donde empezó el negocio familiar"` | `"lazy"` | — | `{width: 600, height: 600}` |
| All decorative SVGs | 114,130,210,252 | `alt=""` (unchanged) | — | — | — |

### Acceptance Criteria

- [ ] Hero image has `fetchpriority="high"` and no `loading` attribute
- [ ] All 4 non-hero content images have `loading="lazy"`
- [ ] All 4 decorative SVGs remain `alt=""` (unchanged)
- [ ] All 5 content images have explicit `width` and `height` attributes matching aspect ratio
- [ ] All 5 content images have Spanish descriptive alt text (≥ 5 words each)
- [ ] No remaining generic English alt text (`"Fruit Market"`, `"Papaya"`, `"Bananas"`, `"Vintage Truck"`, `"Old Market"`)
- [ ] Lighthouse CLS score ≤ 0.1
- [ ] Lighthouse LCP ≤ 2.5s (improved from current baseline)

### Technical Notes

- `width` and `height` on Unsplash images should match the `w=` and `fit=crop` parameters in the URL
- Do NOT set inline `width`/`height` that distorts the `object-cover` CSS behavior — the attributes reserve space, CSS handles rendering
- Hero fetchpriority replaces the need for `<link rel="preload">` for the hero image — use the attribute directly
- Decorative SVGs remain unchanged (already correctly marked as presentational)

---

## 4. semantic-html

**Requirement ID**: SEO-SEM-001
**Title**: Semantic HTML improvements (nav list, article, address, footer heading)

### Description

Four semantic markup fixes: (1) wrap desktop nav links in `<ul>`/`<li>` with `role="list"`, (2) wrap seasonal product cards in `<article>`, (3) wrap location contact info in `<address>`, (4) change footer `<h2>` to `<p>` (brand name is not a section heading).

### Current Behavior

- Nav links (lines 39-49): raw `<a>` tags inside `<div>`, no list semantics
- Seasonal products: product cards are `<div>` elements, not `<article>`
- Location section: address, phone, email displayed in `<div>` blocks with `<h4>` labels
- Footer: `<h2>` used for brand name `"La Bodega Local"` — semantic misuse for a footer brand

### Expected Behavior

| Element | Component | Expected Markup |
|---------|-----------|-----------------|
| Desktop nav | Navbar | `<nav> ... <ul role="list"> <li><a>...</a></li> ... </ul>` |
| Seasonal card 1 | Seasonal | `<article class="..."> ... </article>` |
| Seasonal card 2 | Seasonal | `<div class="..."> ... </div>` (emerald card is a CTA, not an article) |
| Product cards | Seasonal | Cards with product images wrapped in `<article>` |
| Contact info | Location | Wrapped in `<address>` tag |
| Footer brand | Footer | `<p class="font-heading ...">La Bodega Local</p>` (was `<h2>`) |

### Acceptance Criteria

- [ ] Desktop nav `<div>` replaced with `<ul role="list">` containing `<li>` items
- [ ] Seasonal papaya card wrapped in `<article>`
- [ ] Seasonal banana card wrapped in `<article>`
- [ ] Location contact section (address, hours, phone/email) wrapped in `<address>`
- [ ] Footer `La Bodega Local` changed from `<h2>` to `<p>` with `font-heading` class preserved
- [ ] No visual changes — all Tailwind classes preserved on new wrappers
- [ ] W3C HTML validation passes for semantic elements

### Technical Notes

- Add `role="list"` to `<ul>` to preserve list semantics despite Tailwind resetting `list-style`
- Mobile nav drawer can remain as `<div>` with `<a>` tags — it's a navigation panel, not a list
- The emerald "Directo del Campo" card is a CTA/promotional panel, NOT an article — keep as `<div>`
- `<address>` MUST only contain contact information, not the section headings — wrap only the phone/email/address paragraph blocks. The `<h4>` heading labels stay outside.
- The `<article>` elements should not affect the animation or grid layout — `motion.div` from Framer Motion can be applied to `<article>` directly using `motion.article` or `as` prop

---

## 5. social-links

**Requirement ID**: SEO-SOC-001
**Title**: Real social URLs, aria-labels, rel attributes, tap target sizes

### Description

Three footer social links MUST be updated from dead `href="#"` to real placeholder URLs with `aria-label`, `rel="noopener noreferrer"`, and minimum 44×44px tap targets. WhatsApp link MUST use `wa.me` format.

### Current Behavior

Lines 377-379: three `<a>` tags with `href="#"`, no `aria-label`, no `rel`, icon-only content (no visible text), 32×32px icon size. Screen readers cannot identify the links. Touch targets are below the 44px minimum.

### Expected Behavior

| Icon | href | aria-label | rel | Size |
|------|------|-----------|-----|------|
| Instagram | `https://www.instagram.com/verdurerialocal` | `"Instagram de Verdulería Local"` | `noopener noreferrer` | 44×44px |
| Facebook | `https://www.facebook.com/verdurerialocal` | `"Facebook de Verdulería Local"` | `noopener noreferrer` | 44×44px |
| WhatsApp | `https://wa.me/34911234567?text=Hola!%20Quiero%20consultar%20por...` | `"WhatsApp de Verdulería Local"` | `noopener noreferrer` | 44×44px |

### Acceptance Criteria

- [ ] Instagram link: `href` points to real Instagram URL, not `#`
- [ ] Facebook link: `href` points to real Facebook URL, not `#`
- [ ] WhatsApp link: `href` uses `https://wa.me/...` format with Spanish phone number
- [ ] All 3 links have `rel="noopener noreferrer"`
- [ ] All 3 links have `target="_blank"` (external links)
- [ ] All 3 links have `aria-label` in Spanish describing the destination
- [ ] All 3 links have effective tap target size ≥ 44×44px (either via `size={44}` on icon or padding)
- [ ] No visual regression — gold color, hover scale transition preserved

### Technical Notes

- WhatsApp number format: international without `+` prefix in URL (`34911234567`)
- `wa.me` URL pre-fills a message — encode spaces as `%20`
- Tap target can be achieved by `size={44}` on the icon or by adding `p-2` wrapper with `size={32}` icon — keep 44×44 minimum bounding box
- Use `target="_blank"` with `rel="noopener noreferrer"` for security (prevents tab-napping)

---

## 6. font-performance

**Requirement ID**: SEO-FONT-001
**Title**: Move Google Fonts from render-blocking CSS `@import` to `<link>` with preconnect

### Description

The Google Fonts `@import` in `index.css` line 1 MUST be removed and replaced with a `<link>` element in `<head>`. A `preconnect` to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` MUST be added. CSS MUST include `font-display: swap` to prevent invisible text during load.

### Current Behavior

`index.css` line 1: `@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Covered+By+Your+Grace&display=swap');`

This CSS `@import` blocks rendering: the browser must download and parse the CSS file before discovering the font dependency. Although `display=swap` is in the URL, the CSS `@import` mechanism delays font discovery until after CSSOM construction. Lighthouse flags this as a render-blocking resource.

### Expected Behavior

- `index.css` column 1 is empty (no `@import`)
- `index.html` `<head>` has:
  - `<link rel="preconnect" href="https://fonts.googleapis.com">`
  - `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
  - `<link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Covered+By+Your+Grace&display=swap" rel="stylesheet">`
- Tailwind `@theme` directives in `index.css` remain unchanged (they reference the font family names, not the import)

### Acceptance Criteria

- [ ] `@import url('...fonts.googleapis.com...')` removed from `index.css`
- [ ] `<link rel="preconnect" href="https://fonts.googleapis.com">` present in `<head>`
- [ ] `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` present in `<head>`
- [ ] `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Covered+By+Your+Grace&display=swap">` present in `<head>`
- [ ] `display=swap` parameter in the Google Fonts URL (already present, verify preserved)
- [ ] Preconnect links appear BEFORE the stylesheet `<link>` in DOM order
- [ ] Lighthouse "Eliminate render-blocking resources" warning for Google Fonts is resolved
- [ ] FOUT (Flash of Unstyled Text) is acceptable and expected with `font-display: swap`

### Technical Notes

- `crossorigin` attribute on `gstatic.com` preconnect is REQUIRED — fonts are served from a different origin
- The `display=swap` in the URL is Google's mechanism to set `font-display: swap` in the served CSS
- Tailwind CSS 4's `@theme` with `--font-heading: "Lilita One", sans-serif;` continues to work because it references the font family name, not the import mechanism
- Preconnect order matters: Google APIs first, then gstatic with crossorigin

---

## 7. crawl-files

**Requirement ID**: SEO-CRAWL-001
**Title**: Create robots.txt and sitemap.xml for search engine guidance

### Description

Two new files MUST be created in `public/`: `robots.txt` with crawl directives and sitemap reference, and `sitemap.xml` with the single-page URL. These files MUST be accessible at the site root via Vite's static file serving.

### Current Behavior

Neither `public/robots.txt` nor `public/sitemap.xml` exists. Search engines have no guidance on crawl behavior and no discovery path to a sitemap.

### Expected Behavior

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

### Acceptance Criteria

- [ ] `public/robots.txt` exists with `Allow: /` and `Sitemap:` directive
- [ ] `public/sitemap.xml` exists with valid XML and correct `urlset` namespace
- [ ] `robots.txt` references `https://labodegalocal.es/sitemap.xml` (absolute URL)
- [ ] `sitemap.xml` `<loc>` uses `https://labodegalocal.es/` (not relative, not `www`)
- [ ] Build succeeds (`pnpm build`) — Vite copies public files to dist
- [ ] After build, `dist/robots.txt` and `dist/sitemap.xml` exist
- [ ] `robots.txt` passes Google Robots Testing Tool validation
- [ ] `sitemap.xml` passes sitemap XML schema validation

### Technical Notes

- Vite serves files from `public/` at the root — `public/robots.txt` becomes `/robots.txt`
- `lastmod` in sitemap should use ISO 8601 date format (`YYYY-MM-DD`)
- For a single-page site, `changefreq: monthly` and `priority: 1.0` are appropriate
- No `Disallow` rules needed — the page is public and fully crawlable

---

## 8. business-name

**Requirement ID**: SEO-NAME-001
**Title**: Unify business name as "Verdulería Local" throughout the page

### Description

The business name MUST be unified to "Verdulería Local" as the primary identity across all user-visible text. The footer currently uses "La Bodega Local" which MUST change to "Verdulería Local". The English subtitle "Good for the gut, good for the soul" in the Seasonal section MUST be translated to Spanish. The `alternateName` field in JSON-LD preserves "La Bodega Local" for domain/email alignment.

### Current Behavior

| Location | Current Text | Issue |
|----------|-------------|-------|
| Navbar (logo) | "Verdulería" | OK — uses primary name (abbreviated) |
| Hero h1 | "Verdulería" / "Local" | OK — split across two lines |
| Title tag | "Verdulería Local" | OK — primary name |
| Footer brand | "La Bodega Local" | ❌ Mismatch — uses secondary name |
| Seasonal subtitle | "Good for the gut, good for the soul" | ❌ English on Spanish page |
| Email domain | `@labodegalocal.es` | OK — kept as `alternateName` in JSON-LD |

### Expected Behavior

- Footer: `"Verdulería Local"` replaces `"La Bodega Local"`
- Seasonal subtitle: `"Bueno para el cuerpo, bueno para el alma"` replaces the English text
- JSON-LD: `name: "Verdulería Local"`, `alternateName: "La Bodega Local"` (preserves secondary name)
- Nav, Hero, Title remain unchanged (already use "Verdulería" / "Verdulería Local")

### Acceptance Criteria

- [ ] Footer brand text changed from `"La Bodega Local"` to `"Verdulería Local"`
- [ ] Seasonal section subtitle changed from English to Spanish: `"Bueno para el cuerpo, bueno para el alma"`
- [ ] No remaining "La Bodega Local" in user-visible text (only in JSON-LD `alternateName`)
- [ ] Visual style preserved — `text-gold`, `font-heading` classes remain
- [ ] `© 2024 - Tradición, salud y frescura.` copyright text unchanged

### Technical Notes

- Only change visible text strings — no layout, class, or structural changes
- The English subtitle line 167 in `App.tsx`: `<p className="font-body text-2xl md:text-3xl mt-2">Good for the gut, good for the soul</p>`
- The footer brand line 373: `<h2 className="font-heading text-3xl md:text-4xl text-gold uppercase">La Bodega Local</h2>`
- (Note: work unit 4 changes this `<h2>` to `<p>` — coordinate with SEO-SEM-001)
- JSON-LD `alternateName` is the only place `"La Bodega Local"` should remain

---

## Specs Summary

| Work Unit | Type | Requirements | Domains Affected |
|-----------|------|-------------|------------------|
| html-meta-tags | New | 1 (SEO-META-001) | `index.html` |
| structured-data | New | 1 (SEO-LD-001) | `index.html` |
| image-optimization | New | 1 (SEO-IMG-001) | `src/App.tsx` |
| semantic-html | New | 1 (SEO-SEM-001) | `src/App.tsx` |
| social-links | New | 1 (SEO-SOC-001) | `src/App.tsx` |
| font-performance | New | 1 (SEO-FONT-001) | `index.html`, `src/index.css` |
| crawl-files | New | 1 (SEO-CRAWL-001) | `public/robots.txt`, `public/sitemap.xml` |
| business-name | New | 1 (SEO-NAME-001) | `src/App.tsx` |

**Total**: 8 specifications, 8 requirements, 48 acceptance criteria.
