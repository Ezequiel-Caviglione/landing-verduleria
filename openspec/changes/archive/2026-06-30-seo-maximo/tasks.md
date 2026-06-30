# Tasks: SEO Máximo — SEO Overhaul for Verdulería Landing Page

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~82 (35 index.html, 1 index.css, 28 App.tsx, 18 new public/) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Full SEO overhaul | Single PR | All 3 batches, ~82 lines total, under 400 budget |

## Phase 1: Infrastructure — index.html, index.css, public/

- [x] **1.1 Core head meta** — `index.html`. Change `lang="en"`→`"es"`. Set `<title>` to `"Verdulería Local — Fruta Fresca en Madrid | Desde 1962"`. Add: `<meta name="description" content="Fruta y verdura fresca en el Barrio Mercado de Madrid. Productos de temporada, directos del campo. Visítanos desde 1962.">`, `<link rel="canonical" href="https://labodegalocal.es/">`, `<meta name="robots" content="index, follow">`, `<meta name="theme-color" content="#00693E">`. Deps: none. Verify: grep each tag; Lighthouse SEO ≥ 90.

- [x] **1.2 OG/Twitter tags** — `index.html`. Add 8 Open Graph tags (`<meta property="og:...">`) — title, description, image (1200×630), url, type, locale, site_name. Add 4 Twitter Card tags (`<meta name="twitter:...">`) — card, title, description, image. Spanish content per spec. Deps: none (can merge with 1.1). Verify: Facebook Sharing Debugger, Twitter Card Validator.

- [x] **1.3 Font performance** — `index.html` + `index.css`. Add `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, `<link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Covered+By+Your+Grace&display=swap" rel="stylesheet">` to `<head>`. Remove `@import url(...)` line 1 from `index.css`. Deps: none. Verify: `rg "@import" index.css` empty; Lighthouse render-blocking warning resolved.

- [x] **1.4 Crawl files** — Create `public/robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://labodegalocal.es/sitemap.xml`. Create `public/sitemap.xml`: valid XML with `<url><loc>https://labodegalocal.es/</loc><lastmod>2026-06-30</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>`. Deps: none. Verify: `Test-Path dist/robots.txt` and `dist/sitemap.xml` after `pnpm build`.

## Phase 2: Content & Components — App.tsx

- [x] **2.1 Business name consistency** — `App.tsx`. Footer L373: change `"La Bodega Local"` → `"Verdulería Local"`. Seasonal L167: change `"Good for the gut, good for the soul"` → `"Bueno para el cuerpo, bueno para el alma"`. Coordinated with 2.2 (L373 also changes `<h2>`→`<p>`). Deps: coordinate L373 edit with 2.2. Verify: `rg "La Bodega Local" src/App.tsx` returns 0 (only in JSON-LD later).

- [x] **2.2 Semantic HTML** — `App.tsx`. Nav (L39-49): `<div>`→`<ul role="list">`, wrap each `<a>` in `<li>`, `</div>`→`</ul>`. Seasonal cards (L190, L199): `<div>`→`<article>`. Location contact (L322, L330, L338): wrap `<p>` in `<address className="not-italic">`. Footer (L373): `<h2>`→`<p>` (coordinated with 2.1). Mobile nav drawer untouched. Emerald CTA card kept as `<div>`. Deps: coordinate L373 with 2.1. Verify: `rg "<article>" App.tsx` = 2; `rg "<address>"` = 3; W3C validation passes.

- [x] **2.3 Image optimization** — `App.tsx`. 5 content images: replace English alt texts with Spanish descriptive (≥5 words each). Hero (L150): add `fetchPriority="high"` `width={1200}` `height={800}`. 4 non-hero (L192, L200, L277, L294): add `loading="lazy"` `width`/`height` matching aspect ratio. Decorative SVGs (L115, L131, L210, L252): keep `alt=""`. Deps: none. Verify: `rg "loading=\"lazy\""` = 4; `rg "fetchPriority"` = 1; Lighthouse CLS ≤ 0.1.

- [x] **2.4 Social links** — `App.tsx` Footer (L377-379). Set `href`: Instagram → `https://www.instagram.com/verdurerialocal`, Facebook → `https://www.facebook.com/verdurerialocal`, WhatsApp → `https://wa.me/34911234567?text=Hola!%20Quiero%20consultar%20por...`. Add `target="_blank"`, `rel="noopener noreferrer"`, Spanish `aria-label`, icon `size={44}`. Deps: none. Verify: `rg "target=\"_blank\""` = 3; `rg "aria-label"` = 3 social labels; icons render at 44×44.

## Phase 3: Structured Data & Polish

- [x] **3.1 JSON-LD LocalBusiness** — `index.html`. Append `<script type="application/ld+json">` to `<head>` with LocalBusiness schema: `@id`, `name: "Verdulería Local"`, `alternateName: "La Bodega Local"`, `description`, `url`, `telephone: "+34 91 123 4567"`, `email: "hola@verdulerialocal.es"`, `foundingDate: "1962"`, address (Calle de la Fruta 45, Madrid), geo (40.4168, -3.7038), `openingHoursSpecification` (Mon-Sat 07:00-20:00, Sun 08:00-14:00), `sameAs` array. Use 2-space indent. Deps: 2.1 (needs final name "Verdulería Local"). Verify: JSON is parseable; Google Rich Results Test passes.

- [x] **3.2 OG image placeholder** — Create `public/og-image.jpg`. 1200×630px emerald green (#00693E) placeholder. Downloaded from placehold.co. Deps: none. Verify: file exists at `public/og-image.jpg`; file size 5195 bytes.

### Design Notes for Executor

- **Email conflict**: Design uses `hola@verdulerialocal.es` in JSON-LD (3.1) but App.tsx L338 displays `hola@labodegalocal.es`. Resolve in 2.1 by updating L338 email to `hola@verdulerialocal.es` for consistency.
- **Line 373 coordination**: 2.1 (text change) + 2.2 (`<h2>`→`<p>`) both touch the same line — apply as one combined edit.
- **5 tasks above include the combined L373 edit** — executor must apply 2.1+2.2 L373 changes atomically.
