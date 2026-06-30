# Proposal: SEO Máximo — SEO Overhaul for Verdulería Landing Page

## Intent

The page has a near-zero SEO foundation despite solid visual design. 20 issues across 13 dimensions — from `lang="en"` on a Spanish page to missing JSON-LD, OG tags, meta description, and dead social links. Every issue is fixable in a single 2–3 hour session with no architectural changes.

## Scope

### In Scope
- HTML structure & meta tags (lang, title, description, canonical, OG, Twitter Cards, robots)
- JSON-LD LocalBusiness structured data for Google Knowledge Panel
- Image alt text localization (Spanish, descriptive) + lazy loading + fetchpriority + dimensions
- Semantic HTML improvements (nav `<ul>`, `<article>`, `<address>`, footer heading)
- Social links: real URLs, aria-labels, `rel="noopener noreferrer"`, WhatsApp integration
- Google Fonts loading optimization (swap render-blocking `@import` for preload + `font-display: swap`)
- Missing files: `robots.txt`, `sitemap.xml`, `og-image.jpg` (1200×630)
- Business name unification across title, nav, footer, JSON-LD

### Out of Scope
- SSR/SSG, i18n, backend, CMS
- Analytics, cookie banner, PWA, service workers
- Visual redesign or layout changes
- Multi-page or blog/content SEO
- Performance beyond font/image loading (no bundle splitting, no CDN)

## Capabilities

> This section is the CONTRACT between proposal and specs phases.
> The sdd-spec agent reads this to know exactly which spec files to create or update.

### New Capabilities
- `html-meta-tags`: SEO meta tags in `<head>` including OG, Twitter Cards, canonical, robots
- `structured-data`: JSON-LD LocalBusiness schema for rich search results
- `image-optimization`: lazy loading, fetchpriority, dimensions, localized Spanish alt texts
- `crawl-files`: robots.txt and sitemap.xml for search engine guidance

### Modified Capabilities
- None — no existing `openspec/specs/` to modify; all capabilities are new

## Approach

Group fixes into 8 work units, each independently testable. Apply in dependency order: HTML meta structure first (affects all pages), then semantic HTML + social links (no prerequisites), then image and font performance, then missing files and business name cleanup. Each unit is a single-commit change.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Meta tags, OG, Twitter Cards, JSON-LD, fonts preload, canonical, robots |
| `src/App.tsx` | Modified | Image alts, lazy loading, fetchpriority, dimensions, social links, semantics, business name |
| `index.css` | Modified | Remove render-blocking Google Fonts `@import` |
| `public/robots.txt` | New | Crawl directives + sitemap reference |
| `public/sitemap.xml` | New | Single-page sitemap |
| `public/og-image.jpg` | New | 1200×630 social preview image |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| OG image missing at deploy | Low | Create placeholder; real image swapped later |
| Business name change breaks email domain alignment | Med | Keep "La Bodega Local" as `alternateName` in JSON-LD |

## Rollback Plan

Each work unit is a separate commit. Revert individual commits that cause issues. Full rollback: `git revert HEAD~8..HEAD` in reverse order.

## Dependencies

- 1200×630px OG image asset for `public/og-image.jpg`
- Real business address, phone, coordinates, social handles (estimates used for now)

## Success Criteria

- [ ] `<html lang="es">`, descriptive `<title>`, `<meta name="description">`, canonical, robots meta all present
- [ ] JSON-LD LocalBusiness schema validates on Google Rich Results Test
- [ ] OG/Twitter tags produce valid preview card (Facebook Sharing Debugger, Twitter Card Validator)
- [ ] All 5 non-decorative images have descriptive Spanish alt text, lazy loading (non-hero), fetchpriority (hero), and dimensions
- [ ] Social links point to real URLs, have aria-labels, `rel="noopener noreferrer"`
- [ ] Google Fonts no longer render-blocking (verified via Lighthouse)
- [ ] `robots.txt` and `sitemap.xml` accessible at `/robots.txt` and `/sitemap.xml`
- [ ] Lighthouse SEO score ≥ 90 (from current ~30)
