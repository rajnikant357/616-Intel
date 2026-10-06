# 616 Intel — Technical Performance & SEO Architecture Audit

**Project:** 616 Intel (`616intel.com`)  
**Phase:** Phase 4 — SEO, Performance, Semantic HTML & Search Visibility Engineering  
**Audit Date:** September 29, 2026  
**Auditor:** Antigravity AI Engineering  
**Baseline Principle:** *HTML and content should do the work. JavaScript should enhance the experience, not deliver the experience.*

---

## 1. Executive Summary

This comprehensive technical audit evaluates the 616 Intel publishing codebase across:
1. **Semantic HTML & Document Hierarchy**
2. **Core Web Vitals (LCP, CLS, INP, FCP, TTFB)**
3. **JavaScript Footprint & Astro Island Hydration**
4. **Asset & Typography Optimization**
5. **Technical SEO, Canonicalization & Structured Data (JSON-LD)**
6. **Community Content Quality Gate & Search Indexability**
7. **GEO / AI Search Discovery Architecture**

Overall, the architectural foundation of 616 Intel is exceptionally strong: it is built with **Astro 5+ in static prerender mode**, zero React/Vue client islands on content pages, server-rendered static HTML, and minimal client-side JavaScript (~13 KB uncompressed, ~4 KB gzip for global interactions). 

However, several critical architectural enhancements are required to achieve maximum search visibility, zero CLS, sub-2.0s LCP on mobile devices, and strict WCAG 2.2 AA / SEO compliance.

---

## 2. Detailed Findings & Bottleneck Matrix

| ID | Category | Finding / Bottleneck | Affected Files | Estimated Impact | Proposed Fix | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AUD-01** | Technical SEO | Missing `site` config, `robots.txt`, and XML sitemap | `astro.config.mjs`, `public/robots.txt`, `src/pages/sitemap.xml.ts` | **Critical** (Search engine discovery) | Configure `site: 'https://616intel.com'`, create clean `robots.txt`, implement dynamic static XML sitemap endpoint | **PENDING** |
| **AUD-02** | Core Web Vitals (LCP) | Unoptimized video embeds immediately loading YouTube iframes on page load | `src/components/editorial/VideoEmbed.astro` | **High** (LCP delay, 500KB+ unnecessary scripts & cookies) | Implement Click-to-Load facade: poster thumbnail + SVG play button, injecting iframe only upon user click | **PENDING** |
| **AUD-03** | Core Web Vitals (CLS) | Missing explicit `width`, `height`, and `decoding` attributes on image tags | `src/components/cards/ArticleCard.astro`, `src/components/editorial/Hero.astro`, `src/pages/photos/[slug].astro` | **High** (Cumulative Layout Shift) | Add explicit intrinsic dimensions, aspect-ratio containers, and `decoding="async"` | **PENDING** |
| **AUD-04** | Semantic HTML | Inconsistent and invalid HTML5 `<time datetime="...">` values | `src/components/editorial/ArticleMeta.astro`, `src/pages/community/[slug].astro`, `src/pages/videos/[slug].astro` | **Medium** (Search engine freshness & machine reading) | Pass valid ISO 8601 strings (`YYYY-MM-DD` or full ISO) to `datetime` attribute | **PENDING** |
| **AUD-05** | Semantic HTML | Navigation semantics using generic `aria-label="Main Navigation"` | `src/components/navigation/Header.astro` | **Low-Medium** (Accessibility & WCAG compliance) | Standardize to `<nav aria-label="Primary">` | **PENDING** |
| **AUD-06** | Heading Hierarchy | H1 tags not aligned with primary search intent on Movie, Character, and Hub pages | `src/pages/movies/[slug].astro`, `src/pages/characters/[slug].astro`, `src/pages/rumors/index.astro`, `src/pages/community/index.astro` | **High** (Keyword targeting & SERP snippet match) | Update H1s to targeted patterns: `${title} News, Rumors & Leaks`, `${name} News, Rumors & MCU Updates`, etc. | **PENDING** |
| **AUD-07** | Structured Data | Static single `NewsMediaOrganization` JSON-LD schema for all pages | `src/layouts/BaseLayout.astro`, `src/pages/articles/[slug].astro`, `src/pages/movies/[slug].astro` | **High** (Google Rich Results, News Carousel, AI search) | Make JSON-LD dynamic: `NewsArticle` on editorial articles, `Article` on UGC, `BreadcrumbList`, and `VideoObject` | **PENDING** |
| **AUD-08** | Crawl Control | Unconditional `index, follow` on transactional/error pages (`/payment/*`, `/404`) | `src/layouts/BaseLayout.astro`, `src/pages/payment/*.astro`, `src/pages/404.astro` | **Medium** (Crawl budget dilution & SERP pollution) | Support `noindex: true` prop in `BaseLayout` to output `noindex, nofollow` | **PENDING** |
| **AUD-09** | Community SEO | UGC articles lack indexability quality gate (thin content risk) | `src/pages/community/[slug].astro`, `src/lib/community/storage.ts`, `src/pages/sitemap.xml.ts` | **High** (Thin content penalties & domain authority) | Create `isIndexable(article)` helper; gate `<meta name="robots">` and sitemap inclusion based on content quality | **PENDING** |
| **AUD-10** | LCP & Discovery | Hero images lack `<link rel="preload">` in `<head>` | `src/layouts/BaseLayout.astro`, `src/pages/articles/[slug].astro`, `src/pages/index.astro` | **Medium-High** (Resource Load Delay reduction) | Add `preloadImage?: string` to `BaseLayout` to inject high-priority image preloads for above-the-fold heroes | **PENDING** |
| **AUD-11** | Bundle Budget | No build verification script for JavaScript performance budget | `package.json`, `scripts/check-performance-budget.mjs` | **Medium** (Regression protection) | Implement budget check script enforcing <= 30 KB first-party JS and <= 85 KB CSS | **PENDING** |

---

## 3. Route-by-Route SEO & Semantic Map

| Route | Primary H1 | Target Keyword Group | Schema Type | Indexable? |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Lead Investigation Headline / 616 Intel | Marvel News, MCU Rumors & Multiverse Leaks | `WebSite`, `NewsMediaOrganization` | YES |
| `/articles/[slug]` | Article Title | [Specific Movie/Character Event] Report | `NewsArticle`, `BreadcrumbList` | YES |
| `/movies/[slug]` | `${title} News, Rumors & Leaks` | `${title} news`, `${title} rumors` | `ItemPage`, `BreadcrumbList` | YES |
| `/characters/[slug]` | `${name} News, Rumors & MCU Updates` | `${name} MCU news`, `${name} rumors` | `ProfilePage`, `BreadcrumbList` | YES |
| `/rumors` | Marvel Movie Rumors & Production Speculation | Marvel rumors, MCU leaks | `CollectionPage`, `BreadcrumbList` | YES |
| `/breaking` | Breaking Marvel News & Urgent Dispatches | Breaking Marvel news | `CollectionPage`, `BreadcrumbList` | YES |
| `/confirmed` | Confirmed Marvel News, Reports & Verified Receipts | Confirmed Marvel leaks, MCU production receipts | `CollectionPage`, `BreadcrumbList` | YES |
| `/debunked` | Debunked Marvel Rumors & Fact-Checked Claims | Marvel rumors debunked, MCU fake leaks | `CollectionPage`, `BreadcrumbList` | YES |
| `/latest` | Latest Marvel News & Multiverse Intelligence | Latest Marvel news, MCU updates | `CollectionPage`, `BreadcrumbList` | YES |
| `/community` | 616 Intel Community — Fan Theories & Analysis | Marvel fan theories, Marvel community essays | `CollectionPage`, `BreadcrumbList` | YES |
| `/community/[slug]` | Community Article Title | Marvel fan theory: [Title] | `Article`, `BreadcrumbList` | GATED (Quality check) |
| `/write` | Write & Publish Marvel Intelligence | Write Marvel articles, Marvel contributor | `WebPage` | YES |
| `/pricing` | Publishing Plans & Contributor Passes | Marvel article publishing pricing | `WebPage` | YES |
| `/videos/[slug]` | Video Breakdown Title | [Title] video breakdown | `VideoObject`, `BreadcrumbList` | YES |
| `/photos/[slug]` | Gallery Title | [Title] set photos | `ImageGallery`, `BreadcrumbList` | YES |
| `/payment/*` | Payment Transaction Status | N/A (Internal Transaction) | None | **NO (noindex)** |
| `/404` | 404 Intelligence Dossier Not Found | N/A (Error) | None | **NO (noindex)** |

---

## 4. Performance Budget Baseline

| Asset Class | Current Measured Size | Budget Target | Status |
| :--- | :--- | :--- | :--- |
| **First-Party Client JavaScript (Content Pages)** | **~13.1 KB** uncompressed (~4 KB gzip) | **≤ 30 KB** compressed | **PASS** |
| **Global Compiled CSS** | **~79.3 KB** uncompressed (~12 KB gzip) | **≤ 85 KB** uncompressed | **PASS** |
| **Hydrated Client Islands (`client:*`)** | **0 instances** (100% static Astro HTML) | **0 on content pages** | **PASS** |
| **LCP Hero Image Discovery** | `fetchpriority="high"`, missing `<link rel="preload">` | **Preloaded in `<head>`** | **NEEDS WORK** |
| **Third-Party External Scripts** | **0 scripts** (No Google Analytics, ad bloat, or tracking) | **0 render-blocking** | **PASS** |

---

## 5. Implementation Roadmap

1. **Step 1: Core Configuration & Discovery**
   - Update `astro.config.mjs` with production site URL.
   - Create `public/robots.txt`.
   - Create `src/pages/sitemap.xml.ts` with comprehensive index of all static and dynamic routes.
2. **Step 2: BaseLayout Upgrades**
   - Support `noindex?: boolean`.
   - Support `preloadImage?: string`.
   - Support context-aware dynamic JSON-LD structured data.
   - Standardize canonical URL generation with `https://616intel.com`.
3. **Step 3: Semantic HTML & Heading Hierarchy Normalization**
   - Set `<nav aria-label="Primary">` in `Header.astro`.
   - Fix H1 on Movie, Character, Hub, and Category pages.
   - Ensure all dates use `<time datetime="YYYY-MM-DD">`.
4. **Step 4: Image & Video LCP Optimization**
   - Convert `VideoEmbed.astro` to Click-to-Load facade.
   - Add explicit `width`, `height`, and `decoding="async"` across card and photo templates.
5. **Step 5: Community Quality Gate & Indexability**
   - Implement `isIndexableCommunityArticle(article)` and apply to `/community/[slug]` and sitemap.
6. **Step 6: Performance Budget Check Script**
   - Write `scripts/check-performance-budget.mjs` and wire into `npm run check:perf`.
7. **Step 7: Verification & Final Reports**
   - Run `npx astro check`, `npm run build`, and test suite.
   - Generate `/docs/performance-report.md`, `/docs/seo-audit.md`, and `/docs/keyword-map.md`.
