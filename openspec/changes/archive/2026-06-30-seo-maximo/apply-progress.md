# Apply Progress: SEO Máximo

**Date**: 2026-06-30
**Strategy**: single-pr
**Status**: Complete — all tasks implemented

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| 1 — Infrastructure | 1.1, 1.2, 1.3, 1.4 | ✅ Complete |
| 2 — Content & Components | 2.1, 2.2, 2.3, 2.4 | ✅ Complete |
| 3 — Structured Data & Polish | 3.1, 3.2 | ✅ Complete |

## Files Changed

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | Rewrite | Added all meta tags (OG, Twitter, canonical, robots, theme-color), preconnect + font link, JSON-LD LocalBusiness schema |
| `src/index.css` | Edit | Removed `@import url(...)` Google Fonts line (moved to `<link>` in `<head>`) |
| `src/App.tsx` | Edit | 12 change sites — semantic HTML (nav ul/li, article, address, h2→p), Spanish alt texts, lazy loading, fetchPriority, width/height, social links (href/aria-label/target/rel/size), business name consistency, email domain update |
| `public/robots.txt` | New | Crawl directives with sitemap reference |
| `public/sitemap.xml` | New | Single-page sitemap with lastmod 2026-06-30 |
| `public/og-image.jpg` | New | 1200×630 emerald green placeholder from placehold.co |

## Verification

- ✅ `pnpm build` — tsc + vite build succeed
- ✅ `dist/robots.txt` exists
- ✅ `dist/sitemap.xml` exists
- ✅ `dist/og-image.jpg` exists
- ✅ `@import` removed from `src/index.css` (only `@import "tailwindcss"` remains)
- ✅ `<article>` count in App.tsx: 2
- ✅ `<address>` count in App.tsx: 3
- ✅ `loading="lazy"` in App.tsx: 4
- ✅ `fetchPriority` in App.tsx: 1
- ✅ `target="_blank"` in App.tsx: 3
- ✅ Spanish `aria-label` on all 3 social links
- ✅ 0 instances of "La Bodega Local" in App.tsx
- ✅ All 17 meta/link/title tags present in index.html
- ✅ JSON-LD LocalBusiness schema present and valid JSON

## Deviations from Design

- **`fetchpriority` → `fetchPriority`**: React JSX requires camelCase prop names. The design used lowercase `fetchpriority`, but TypeScript's JSX types require `fetchPriority`. This is the correct React/DOM behavior.
- **`public/og-image.jpg`**: Downloaded from placehold.co (1200×630 emerald green #00693E) instead of using `sharp` script, as sharp is not installed.

## Build Output

```
vite v6.4.3 building for production...
✓ 1982 modules transformed.
rendering chunks...
dist/index.html                 3.60 kB │ gzip: 1.25 kB
dist/assets/index-51Ny9Auw.css  29.10 kB │ gzip: 5.96 kB
dist/assets/index-Ciy09R_J.js  319.28 kB │ gzip: 101.60 kB
✓ built in 9.11s
```
