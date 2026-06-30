# Exploration: SEO Máximo — SEO Audit for Verdulería Landing Page

> **Change**: `seo-maximo`
> **Date**: 2026-06-30
> **Project**: landing-verduleria (React 18 + TypeScript + Vite 6 + Tailwind CSS 4)
> **Mode**: openspec

---

## Executive Summary

The landing page has a **visually striking design** with smooth animations and a cohesive brutalist aesthetic, but its SEO foundation is **near-zero**. Every layer — from the `<html lang>` attribute to structured data, image alts, meta tags, and social links — has gaps that range from minor to critical. The page will render beautifully for human visitors but is largely invisible to search engines and screen readers.

This exploration identifies **13 distinct SEO dimensions** with specific file paths, line numbers, and actionable recommendations.

---

## 1. HTML Structure & Language

### Current State

`index.html` (13 lines total) is minimal:

- **`lang="en"`** (line 2) — The entire page content is in Spanish, but the language attribute declares English. This is a **critical error** — search engines may classify the page as English, hurting rankings for Spanish queries.
- **`<title>Verdulería Local</title>`** (line 7) — Acceptable but weak. Missing geolocation and keywords. An ideal title for local SEO would be: *"Verdulería Local — Fruta y verdura fresca en Madrid | Desde 1962"*.
- **No `<meta name="description">`** — The single most important meta tag for SEO. Missing entirely. Google will auto-generate a snippet from random content.
- **No `<meta name="keywords">`** — Mostly ignored by Google but still used by Bing/Yandex. Low priority but easy to add.
- **No `<meta name="robots">`** — Assumes `index, follow` by default, which is correct, but explicit is better.
- **No `<meta name="author">`** or any organization information in meta.
- **No `<link rel="canonical">`** — Missing canonical URL means duplicate content issues if the page is served from multiple URLs.

### SEO Impact 🔴 SEVERE

The `lang="en"` alone can tank Spanish-local search ranking. Missing description means low CTR in SERPs.

### Recommendations

| Issue | File:Line | Fix |
|-------|-----------|-----|
| Wrong language | `index.html:2` | Change to `<html lang="es">` |
| Missing description | `index.html` | Add `<meta name="description" content="Verdulería Local — fruta y verdura fresca en el Barrio Mercado de Madrid. Productos de temporada, directos del campo. Visítanos desde 1962.">` |
| Weak title | `index.html:7` | Improve to `<title>Verdulería Local — Fruta Fresca en Madrid Desde 1962</title>` |
| Missing canonical | `index.html` | Add `<link rel="canonical" href="https://labodegalocal.es/">` |
| Missing robots | `index.html` | Add `<meta name="robots" content="index, follow">` |

---

## 2. Image Alt Attributes

### Current State

All 9 images in `src/App.tsx` analyzed:

| Component | Line | Image | Alt Text | Assessment |
|-----------|------|-------|----------|------------|
| Hero | 114-118 | Sunbeams SVG (decorative) | `alt=""` | ✅ Correct |
| Hero | 130-134 | Sun-spear SVG (decorative) | `alt=""` | ✅ Correct |
| Hero | 149-153 | Hero fruit market photo | `alt="Fruit Market"` | ⚠️ Generic, English, not descriptive |
| Seasonal | 191-197 | Papaya photo | `alt="Papaya"` | ⚠️ Generic, single word, English |
| Seasonal | 199-206 | Bananas photo | `alt="Bananas"` | ⚠️ Generic, English |
| Seasonal | 209-214 | Rays SVG (decorative bg) | `alt=""` | ✅ Correct |
| About | 251-255 | Striped sun SVG (decorative) | `alt=""` | ✅ Correct |
| About | 276-280 | Vintage truck photo | `alt="Vintage Truck"` | ❌ Generic, English, misses storytelling context |
| About | 293-297 | Old market photo | `alt="Old Market"` | ❌ Generic, English, misses historical value |

### SEO Impact 🟡 MODERATE

Search engines use alt text for image search ranking. Generic English alts on a Spanish page create a **language mismatch signal** that hurts both image and page SEO. Screen readers get unhelpful descriptions like "Fruit Market" instead of conveying the content.

### Recommendations

| Line | Current | Fix |
|------|---------|-----|
| 151 | `alt="Fruit Market"` | `alt="Puesto de fruta fresca y verdura en Verdulería Local, Madrid"` |
| 193 | `alt="Papaya"` | `alt="Papaya fresca de temporada en Verdulería Local"` |
| 203 | `alt="Bananas"` | `alt="Plátanos verdes frescos, seleccionados a mano cada mañana"` |
| 278 | `alt="Vintage Truck"` | `alt="Camión de reparto de los años 60, el primer vehículo de Verdulería Local"` |
| 295 | `alt="Old Market"` | `alt="Calle de la Fruta en los años 60, donde empezó el negocio familiar"` |

---

## 3. Semantic HTML

### Current State

| Element | Component | Line | Status |
|---------|-----------|------|--------|
| `<nav>` | Navbar | 34 | ✅ Present, contains navigation links |
| `<main>` | App | 408 | ✅ Present, wraps all sections |
| `<section id="hero">` | Hero | 111 | ✅ Present |
| `<section id="seasonal">` | Seasonal | 163 | ✅ Present |
| `<section id="about">` | About | 234 | ✅ Present |
| `<section id="location">` | Location | 312 | ✅ Present |
| `<footer>` | Footer | 370 | ✅ Present |
| `<ul>/<li>` in nav | Navbar | 39-49 | ❌ **Missing** — nav links use raw `<a>` tags |
| `<article>` | — | — | ❌ Missing — would be appropriate for the seasonal product cards and the about story |
| `<address>` | Location | 321-338 | ❌ Missing — contact info (address, phone, email) should be in `<address>` tag |

### SEO Impact 🟡 MODERATE

The basic skeleton is correct (`<main>`, `<nav>`, `<section>`, `<footer>`). Missing `<ul>` in the nav is a minor accessibility/semantic issue. Missing `<article>` elements are a missed opportunity for rich snippets. Missing `<address>` contact information reduces local SEO signal strength.

### Recommendations

| Issue | Location | Fix |
|-------|----------|-----|
| Nav links not wrapped in `<ul>/<li>` | Navbar, lines 39-49 | Wrap nav links in `<ul>` with `role="list"` and each link in `<li>` |
| Seasonal cards not in `<article>` | Seasonal, lines 170-225 | Wrap each product card in `<article>` |
| Location contact info not in `<address>` | Location, lines 317-341 | Wrap the contact block in `<address>` |
| Missing `<time>` for hours | Location, lines 329-331 | Wrap hours in `<time>` with machine-readable `datetime` |

---

## 4. Open Graph / Twitter Card Meta Tags

### Current State

**Completely absent.** No Open Graph (`og:`) or Twitter Card (`twitter:`) meta tags anywhere in `index.html`.

Without these tags, when the page is shared on WhatsApp, Instagram, Facebook, X/Twitter, or LinkedIn:
- **No title** — link previews will show whatever scrapers guess
- **No description** — no control over the snippet
- **No image** — no rich preview card, just a bare URL

### SEO Impact 🔴 SEVERE

Social shareability is zero. This is a landing page for a LOCAL business — word-of-mouth sharing on WhatsApp and Instagram is the PRIMARY acquisition channel for a verdulería. Killing social previews is a business-impacting SEO gap.

### Recommendations

Add to `<head>` in `index.html`:

```html
<!-- Open Graph -->
<meta property="og:title" content="Verdulería Local — Fruta Fresca en Madrid Desde 1962" />
<meta property="og:description" content="Fruta y verdura fresca en el Barrio Mercado de Madrid. Directo del campo a tu mesa. ¡Visítanos!" />
<meta property="og:image" content="https://labodegalocal.es/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://labodegalocal.es/" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />
<meta property="og:site_name" content="Verdulería Local" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Verdulería Local — Fruta Fresca en Madrid Desde 1962" />
<meta name="twitter:description" content="Fruta y verdura fresca en el Barrio Mercado de Madrid. Directo del campo a tu mesa." />
<meta name="twitter:image" content="https://labodegalocal.es/og-image.jpg" />
```

> **Note**: An actual `og-image.jpg` (1200×630px) must be created and placed in `public/`. This image alone can dramatically improve click-through rates from social shares.

---

## 5. Structured Data (JSON-LD) for LocalBusiness

### Current State

**Completely absent.** No JSON-LD, Microdata, or RDFa structured data of any kind.

For a local fruit shop, **LocalBusiness** schema is arguably the single most impactful SEO improvement. It powers:
- **Google Knowledge Panel** — shows the business card directly in search results
- **Google Maps Pack** — improves local map listing ranking
- **Rich Snippets** — star ratings, hours, price range in search results
- **Voice Search** — Google Assistant can answer "verdulería cerca de mí"

### SEO Impact 🔴 SEVERE

This is a local brick-and-mortar business. Not marking it up as a LocalBusiness is leaving massive local search visibility on the table.

### Recommendations

Add to `<head>` in `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://labodegalocal.es/#business",
  "name": "Verdulería Local",
  "alternateName": "La Bodega Local",
  "description": "Fruta y verdura fresca en Madrid. Productos de temporada directos del campo desde 1962.",
  "url": "https://labodegalocal.es/",
  "telephone": "+34 91 123 4567",
  "email": "hola@labodegalocal.es",
  "foundingDate": "1962",
  "image": "https://labodegalocal.es/og-image.jpg",
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
  "priceRange": "€",
  "sameAs": [
    "https://www.instagram.com/verdurerialocal",
    "https://www.facebook.com/verdurerialocal"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Madrid"
  }
}
</script>
```

> **Note**: Geo coordinates and postal code are estimated — must be confirmed with the actual business location.

---

## 6. Performance & Image Loading

### Current State

| Aspect | Current | Assessment |
|--------|---------|------------|
| Image lazy loading | ❌ None | All images load eagerly, including below-the-fold ones |
| Hero image priority | ❌ None | No `fetchpriority="high"` on the hero image |
| Preload key assets | ❌ None | No preload for hero image, fonts, or critical CSS |
| Image formats | ⚠️ Mixed | Unsplash with `auto=format` serves WebP; SVG icons are fine |
| Image dimensions | ❌ Missing | No explicit `width`/`height` on images — causes CLS |
| Google Fonts loading | ❌ Render-blocking | Imported via CSS `@import` in `index.css` line 1 — blocks rendering |
| Web font display | ❌ Not set | `font-display: swap` not configured — FOUT/FOIT risk |
| Animation performance | ⚠️ High | Framer Motion + Lenis + heavy animations on scroll — potential jank on low-end mobile |

### SEO Impact 🟡 MODERATE

Core Web Vitals (LCP, CLS, INP) are likely poor. LCP will be delayed by: (1) render-blocking Google Fonts, (2) no lazy loading, (3) no image fetchpriority. CLS will be triggered by missing image dimensions. Poor CWV scores can hurt rankings.

### Recommendations

| Issue | File:Line | Fix |
|-------|-----------|-----|
| Missing `loading="lazy"` | `App.tsx:149,191,199,276,293` | Add `loading="lazy"` to all non-hero images |
| Missing hero priority | `App.tsx:149` | Add `fetchpriority="high"` to the hero image |
| Missing image dimensions | `App.tsx:149,191,199,276,293` | Add explicit `width` and `height` attributes |
| Render-blocking fonts | `index.css:1` | Replace `@import` with `<link rel="preload">` in `index.html` + `font-display: swap` |
| No preload | `index.html` | Add `<link rel="preload" as="image" href="...hero-image-url..." fetchpriority="high">` |

---

## 7. Social Links (Footer)

### Current State

Lines 377-379 in `App.tsx`:

```jsx
<a href="#" className="text-gold hover:scale-125 transition-transform"><Instagram size={32} /></a>
<a href="#" className="text-gold hover:scale-125 transition-transform"><Facebook size={32} /></a>
<a href="#" className="text-gold hover:scale-125 transition-transform"><MessageCircle size={32} /></a>
```

| Issue | Severity |
|-------|----------|
| All three links point to `#` — **dead** | 🔴 Critical |
| No `aria-label` on any social link | 🔴 Critical for accessibility |
| Link text is icon-only (no visible text) | 🔴 Screen readers get nothing without `aria-label` |
| No `rel="noopener noreferrer"` | 🟡 Security concern |
| WhatsApp uses `MessageCircle` icon but no `href="https://wa.me/..."` | 🟡 Missing actual WhatsApp integration |

### SEO Impact 🔴 SEVERE — but indirect

Dead social links don't directly affect ranking, but they:
- Destroy user trust (bounce signal)
- Lose the social signal benefit (Google uses social profiles as a relevance signal)
- Miss the "sameAs" structured data alignment with real profiles

### Recommendations

| Line | Current | Fix |
|------|---------|-----|
| 377 | `href="#"` | `href="https://www.instagram.com/verdurerialocal"` + `aria-label="Instagram de Verdulería Local"` + `rel="noopener noreferrer"` |
| 378 | `href="#"` | `href="https://www.facebook.com/verdurerialocal"` + `aria-label="Facebook de Verdulería Local"` + `rel="noopener noreferrer"` |
| 379 | `href="#"` | `href="https://wa.me/34911234567?text=Hola!%20Quiero%20consultar%20por..."` + `aria-label="WhatsApp de Verdulería Local"` + `rel="noopener noreferrer"` |

---

## 8. Content Quality & Keywords

### Current State

| Keyword / Phrase | Present? | Location |
|------------------|----------|----------|
| *verdulería* | ✅ | Hero h1, Nav logo |
| *fruta fresca* | ❌ | Not literally — "frescura garantizada" is close |
| *verdura fresca* | ❌ | Not explicitly mentioned |
| *Madrid* | ✅ | About section ("barrios de Madrid"), Location address |
| *Barrio Mercado* | ✅ | Location section |
| *temporada* | ✅ | Seasonal section heading |
| *campo* | ✅ | Hero + Seasonal |
| *tradición familiar* | ✅ | About section |
| *desde 1962* | ✅ | Hero + About |
| *productos ecológicos* | ❌ | "Sin químicos" is mentioned but no SEO-friendly term |
| *frutería Madrid* | ❌ | Not mentioned — missed long-tail |
| *dónde comprar fruta Madrid* | ❌ | Not mentioned as a phrase |
| Specific fruits (manzana, naranja, etc.) | ❌ | Only papaya and plátano mentioned |

### Content Inconsistencies

| Issue | Details |
|-------|---------|
| **Business name mismatch** | Nav/hero says "Verdulería", footer says "La Bodega Local", email domain is `labodegalocal.es`, package.json name is `verdureria-local` |
| **Language mixing** | Seasonal subtitle is English: "Good for the gut, good for the soul" on a 100% Spanish page |
| **No product list** | No actual fruits/vegetables listed besides papaya and plátano — misses keyword density for specific products |

### SEO Impact 🟡 MODERATE

The content does establish local relevance (Madrid, 1962, family tradition), which is good for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). But the business name inconsistency and lack of product-specific keywords dilute the topical authority.

### Recommendations

| Issue | Fix |
|-------|-----|
| Unify business name | Pick ONE name consistent across: title tag, Nav, Footer, structured data, email domain. Recommend **"Verdulería Local"** as primary, with "La Bodega Local" as `alternateName` in JSON-LD. |
| English subtitle in Seasonal | Change to Spanish: "Bueno para el cuerpo, bueno para el alma" or similar |
| Add product keywords | Add a sentence in Seasonal section listing specific products: "Naranjas de Valencia, manzanas de la Sierra, tomates pera, lechugas del tiempo..." |
| Add location long-tail | Add a line in the Location section like: "La mejor frutería del Barrio Mercado — ven a comprar fruta fresca en Madrid" |

---

## 9. Sitemap.xml & Robots.txt

### Current State

**Neither exists.** No `public/robots.txt`, no `public/sitemap.xml`.

| File | Status |
|------|--------|
| `public/robots.txt` | ❌ Missing |
| `public/sitemap.xml` | ❌ Missing |

### SEO Impact 🟡 MODERATE

For a single-page site, missing sitemap.xml is less critical than for a multi-page site. However, missing `robots.txt` means:
- No way to tell crawlers about the sitemap location
- No control over crawl rate
- Crawlers may still index the page fine, but you lose optimization ability

### Recommendations

**`public/robots.txt`:**
```txt
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

---

## 10. Canonical URL

### Current State

No `<link rel="canonical">` in `index.html`.

Without a canonical URL, if the site is accessible via both `https://labodegalocal.es/` and `https://www.labodegalocal.es/` (or with/without trailing slash), search engines may see duplicate content and split ranking signals.

### SEO Impact 🟡 MODERATE

### Recommendation

Add to `index.html` `<head>`:
```html
<link rel="canonical" href="https://labodegalocal.es/" />
```

---

## 11. Mobile Responsiveness & Viewport

### Current State

| Aspect | Status | Assessment |
|--------|--------|------------|
| Viewport meta tag | ✅ Present, `index.html:6` | Correct value: `width=device-width, initial-scale=1.0` |
| Responsive layout | ✅ | Uses Tailwind breakpoints (`md:`, `sm:`) throughout |
| Mobile nav | ✅ | Hamburger menu at `md:hidden` (line 51) |
| Touch targets | ⚠️ Adequate | Buttons are large; nav links have adequate spacing |
| Tap target sizes | ⚠️ Adequate | Icon-only social links in footer are 32px — minimum recommended is 44px |
| Mobile font sizes | ✅ | Large headings scale down via `text-6xl md:text-[11rem]` patterns |

### SEO Impact ✅ LOW

The mobile viewport is correctly configured. This area is strong — no critical issues.

### Recommendations

| Issue | Line | Fix |
|-------|------|-----|
| Small tap targets on social icons | Footer `size={32}` | Increase to at least `size={44}` or add padding around them with `p-2` |
| Add `theme-color` meta | `index.html` | `<meta name="theme-color" content="#00693E">` (matches emerald brand color) |
| Add Apple touch icon | `index.html` | `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` |

---

## 12. Link Accessibility

### Current State

| Link Group | Lines | Visible Text | aria-label | Assessment |
|------------|-------|-------------|------------|------------|
| Nav links | 40-48 | ✅ Yes | ❌ Missing | Acceptable — visible text exists |
| Mobile menu close | 67 | ❌ No (icon) | ✅ `"Cerrar menú"` | Good |
| Mobile menu open | 54 | ❌ No (icon) | ✅ `"Abrir menú"` | Good |
| Social links | 377-379 | ❌ No (icon only) | ❌ **Missing** | ❌ FAIL — invisible to screen readers |
| "Explorar" button | 184-186 | ✅ Yes | ❌ Missing | Acceptable |
| "Cómo llegar" button | 358-360 | ✅ Yes | ❌ Missing | Acceptable |

### SEO Impact 🟡 MODERATE

Accessibility is not a direct ranking factor, but it correlates with better user signals (lower bounce rate, higher time on page). The social links are the critical failure — screen reader users literally cannot interact with them.

### Recommendations

| Line | Fix |
|------|-----|
| 377-379 | Add `aria-label` to each social link (see Section 7 above) |
| 40-48 | Consider adding `aria-label="Navegación principal"` to the `<nav>` element |
| 184 | Add `aria-label="Explorar productos de temporada"` |
| 358 | Add `aria-label="Cómo llegar a Verdulería Local"` |

---

## 13. Heading Hierarchy

### Current State

```
Hierarchy of headings in page order:

h1 ── "Verdulería Local" (Hero, line 121)
  └─ h2 ── "Temporada de Salud" (Seasonal, line 166)
      └─ h3 ── "El Tesoro de la Huerta" (Seasonal, line 176)
  └─ h2 ── "Desde 1962" (About section, lines 248-250 — actually split across two lines)
  └─ h2 ── "Dónde Estamos" (Location, line 315)
      └─ h4 ── "Dirección" (Location, line 321)
      └─ h4 ── "Horario" (Location, line 329)
      └─ h4 ── "Contacto" (Location, line 337)
  └─ h2 ── "La Bodega Local" (Footer, line 373)
```

### Assessment

| Rule | Status | Notes |
|------|--------|-------|
| One `<h1>` per page | ✅ | Correct — only one in Hero |
| Heading hierarchy (no skips) | ⚠️ OK | Goes h1→h2→h3→h4, no skips — good |
| Headings describe content | ✅ | Each heading describes its section accurately |
| Footer heading | ⚠️ Questionable | `h2` in footer is unusual but acceptable for brand name |
| Nav brand is not a heading | ✅ | The brand link in nav is an `<a>` tag, not an `<h1>` — correct pattern |

### SEO Impact 🟢 MINIMAL

The heading structure is solid. One small issue: the About section heading spans two lines with a `<br />` and a styled span, which could confuse some parsers.

### Recommendations

| Issue | Fix |
|-------|-----|
| Footer h2 | Change to `<p>` or `<span>` with `font-heading` class — footers don't need a heading unless they introduce a navigation section |
| Verify h1 uniqueness | Ensure no other `<h1>` appears (currently clean) |

---

## Consolidated Priority Matrix

| # | Issue | File | Severity | Effort | Category |
|---|-------|------|----------|--------|----------|
| 1 | Missing JSON-LD LocalBusiness schema | `index.html` | 🔴 Severe | Low | Structured Data |
| 2 | `lang="en"` on Spanish page | `index.html:2` | 🔴 Severe | Trivial | HTML Structure |
| 3 | Missing Open Graph / Twitter Card tags | `index.html` | 🔴 Severe | Low | Social SEO |
| 4 | Dead social links (href="#") | `App.tsx:377-379` | 🔴 Severe | Trivial | Content / UX |
| 5 | Missing meta description | `index.html` | 🔴 Severe | Trivial | HTML Structure |
| 6 | Missing image lazy loading | `App.tsx:149+` | 🟡 Moderate | Low | Performance |
| 7 | Business name inconsistency | Multiple files | 🟡 Moderate | Low | Content |
| 8 | Generic/English image alt texts | `App.tsx` | 🟡 Moderate | Low | Accessibility |
| 9 | Render-blocking Google Fonts | `index.css:1` | 🟡 Moderate | Low | Performance |
| 10 | Missing robots.txt | `public/` | 🟡 Moderate | Trivial | Crawl Control |
| 11 | Missing sitemap.xml | `public/` | 🟡 Moderate | Trivial | Crawl Control |
| 12 | Missing canonical URL | `index.html` | 🟡 Moderate | Trivial | HTML Structure |
| 13 | No `aria-label` on social links | `App.tsx:377-379` | 🟡 Moderate | Trivial | Accessibility |
| 14 | No fetchpriority on hero image | `App.tsx:149` | 🟡 Moderate | Trivial | Performance |
| 15 | English subtitle in Seasonal section | `App.tsx:167` | 🟢 Minor | Trivial | Content |
| 16 | Missing `<address>` for contact info | `App.tsx:317-341` | 🟢 Minor | Low | Semantic HTML |
| 17 | Missing `<article>` for product cards | `App.tsx:170-225` | 🟢 Minor | Low | Semantic HTML |
| 18 | Default Vite favicon | `public/vite.svg` | 🟢 Minor | Low | Branding |
| 19 | Missing theme-color meta | `index.html` | 🟢 Minor | Trivial | Mobile |
| 20 | Footer heading misuse | `App.tsx:373` | 🟢 Minor | Trivial | Semantic HTML |

---

## Effort Overview

| Effort | Count | Issues |
|--------|-------|--------|
| **Trivial** (<5 min each) | 11 | 2, 4, 5, 10, 11, 12, 13, 14, 15, 19, 20 |
| **Low** (5-30 min each) | 7 | 1, 3, 6, 7, 8, 9, 16, 17, 18 |
| **Medium** (30-120 min) | 0 | — |
| **High** (>2 hours) | 0 | — |

The entire SEO overhaul is achievable in **a single focused session** of 2-3 hours. None of the fixes are architecturally complex — it's all HTML meta tags, attribute additions, and JSON-LD.

---

## Ready for Proposal

**Yes.** This exploration provides actionable, line-number-specific findings across all 13 SEO dimensions. The orchestrator can use this to drive the proposal phase.

### What to Tell the User

> "Analicé en profundidad el estado SEO de la landing page. Hay **20 issues identificados** en 13 dimensiones distintas. Lo más crítico: el `lang="en"` en una página 100% en español, la falta total de Open Graph y JSON-LD, los links de redes sociales muertos, y la meta description ausente. **Nada es estructuralmente difícil de arreglar** — son cambios en HTML e índices de atributos en App.tsx. Estimo 2-3 horas de trabajo para un SEO sólido. El dato clave: un mismo cambio (JSON-LD) puede darle un Knowledge Panel de Google a la verdulería."
