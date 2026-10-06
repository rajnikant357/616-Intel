# 616 INTEL — PRODUCTION ARCHITECTURE AUDIT & SECURITY DOSSIER

**Date:** September 30, 2026  
**Auditor:** Antigravity Autonomous Security Engineer  
**System:** 616 Intel (Marvel Leaks, Rumors, Reports & Community Publishing Platform)  
**Status:** AUDITED — REMEDIATION IN PROGRESS  

---

## 1. Executive Summary

616 Intel is an independent Marvel-focused digital intelligence platform featuring static-first editorial hubs (News, Rumors, Leaks, Movies, Characters, Videos, Galleries) alongside an anonymous, accountless community publishing engine.

This audit evaluates the platform's production readiness, focusing on:
1. **Financial & Payment Security:** Price manipulation defense, webhook integrity, idempotency, refund processing, and strict separation of client requests from monetary calculation.
2. **Accountless Identity & Abuse Prevention:** Free-tier gating, rate limiting, bot protection, and IP data minimization.
3. **Content Security & Sanitization:** XSS protection in untrusted community submissions, link policy (`noopener noreferrer`), and image safety.
4. **Moderation & Legal Compliance:** Automated moderation checks, reader reporting mechanics, secure authenticated admin APIs, and mandatory legal disclaimers.
5. **Infrastructure & Observability:** Production security headers (CSP, HSTS, X-Content-Type-Options), request tracking (`req_...`), and health checks.

---

## 2. System Architecture

```
                       [ BROWSER / CLIENT ]
                                |
             +------------------+------------------+
             |                                     |
       Static Routes (CDN)                   API Endpoints (SSR)
   - / (Home), /news, /rumors            - /api/community/publish
   - /movies, /characters, etc.          - /api/community/payment/create
   - /terms, /privacy, /copyright        - /api/community/payment/verify
                                         - /api/community/payment/webhook
                                         - /api/community/report
                                         - /api/community/moderation
                                         - /api/health
                                                   |
                                     [ Serverless / Node Middleware ]
                                       - Security Headers (CSP, HSTS)
                                       - Request ID Tracking (req_...)
                                       - Rate Limiting (In-Memory/Store)
                                                   |
                                     [ Local / Object Storage Layer ]
                                       - articles.json
                                       - entitlements.json
                                       - payments.json
                                       - reports.json
                                       - webhook-events.json
                                       - moderation-logs.json
```

* **Frontend:** Astro 7.3 with `@astrojs/mdx` and Tailwind CSS v4.
* **Rendering Strategy:** Static hybrid. Editorial content is prerendered at build time (`prerender = true`). Community API endpoints, payment webhooks, and live draft publishing use server-side rendering (`prerender = false` via `@astrojs/node` standalone).
* **Storage Engine:** Local JSON data store (`data/community/`) with atomic file writes and error resilience.

---

## 3. Dependencies & External Services

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| Framework | `astro` | `^7.3.5` | Core static/SSR site framework |
| Content | `@astrojs/mdx` | `^8.0.2` | MDX parser for editorial dossiers |
| Adapter | `@astrojs/node` | `^11.1.6` | Standalone server runner for dynamic APIs |
| Styling | `tailwindcss`, `@tailwindcss/vite` | `^4.3.3` | Modern CSS styling system |
| Icons | `@lucide/astro` | `^1.48.0` | Accessible SVG iconography |
| Crypto | Node.js `node:crypto` | Native | HMAC-SHA256 signatures, identity hashing |
| Payment Gateway | Hosted Provider Abstraction | Mock/Stripe/Razorpay | Transaction settlement |
| Typography | Google Fonts CDN | Inter, JetBrains Mono, Oswald | Brand typography |

---

## 4. Secrets & Configuration Inventory

| Key | Scope | Security Level | Purpose |
| :--- | :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | Public / Server | Low | Canonical domain base (`https://616intel.com`) |
| `PAYMENT_SECRET_KEY` | Server-Only | Critical | HMAC-SHA256 signature key for client tokens |
| `PAYMENT_WEBHOOK_SECRET` | Server-Only | Critical | Webhook signature verification |
| `ADMIN_API_KEY` | Server-Only | Critical | Bearer authentication for moderation/admin bureau |
| `RATE_LIMIT_WINDOW_MS` | Server-Only | Medium | Window duration for anti-abuse rate limiter |

**Finding:** No secrets are bundled into client-side JS or public directory. Added `.gitignore` and `.env.example` to prevent accidental credential leakage into version control.

---

## 5. End-to-End Data Flows

### A. Publishing Flow (Zero-Account)
1. **Writer Composes:** Writer drafts article in `/write` (persisted in browser `localStorage`).
2. **Entitlement Evaluation:** Client queries `/api/community/entitlement?deviceId=...`.
   - Free Article: 1 dispatch $\le$ 1,000 characters per device session / email hash.
   - Paid Article: Requires verified single-article credit (up to 10,000 characters).
   - Subscription: Requires active monthly subscription (unlimited dispatches up to 10,000 characters).
3. **Payload Submission:** Client posts to `/api/community/publish`.
4. **Server Validation & Sanitization:**
   - Server re-verifies entitlement (never trusts client claims).
   - Title, writer name, and movie fields are validated.
   - Content undergoes HTML tag whitelisting, stripping scripts, style, iframe, javascript URIs, and event handlers.
   - Automated moderation checks analyze spam patterns, excessive links, and prohibited impersonations.
5. **Persistence & Slug Allocation:** Safe slug is generated, article is recorded with `PUBLISHED` (or `PENDING`/`FLAGGED` if automated checks trigger alerts), and entitlement credits are consumed.

### B. Payment Flow
1. **Product Selection:** Client requests product ID (`single_article` or `monthly_pass`) and currency (`INR` or `USD`).
2. **Server Price Authority:** Server ignores any client-sent amount and maps the product to immutable pricing rules (₹20 / $1 for single, ₹199 / $9 for monthly).
3. **Session Initialization:** `/api/community/payment/create` generates `paymentId`, `providerPaymentId`, and HMAC-SHA256 signature token. Idempotency keys prevent duplicate order creation on network retries.
4. **Settlement & Webhook Verification:**
   - Provider issues webhook to `/api/community/payment/webhook`.
   - Server verifies signature using `PAYMENT_WEBHOOK_SECRET`.
   - Deduplication check against `data/community/webhook-events.json` ensures events are processed exactly once.
5. **Credit Activation:** Entitlement is credited (`purchasedArticles += 1` or `subscriptionStatus = 'ACTIVE'`).

---

## 6. Failure Points & Security Risks Identified

| Risk Area | Severity | Current Status | Remediation Plan |
| :--- | :--- | :--- | :--- |
| **Price Tampering** | High | Mitigated | Enforce strict server-side price resolution; reject client-sent amount payloads. |
| **Webhook Replay** | High | Remediating | Add webhook event deduplication store (`webhook-events.json`). |
| **XSS Injection** | Critical | Remediating | Whitelist only `<p>, <strong>, <em>, <b>, <i>, <h2>, <h3>, <h4>, <ul>, <ol>, <li>, <blockquote>, <a>`. Strip all attributes except sanitized `href` with `rel="noopener noreferrer"`. |
| **Free Tier Abuse** | Medium | Remediating | Layered checks: Device ID + Normalized email hash + In-memory rate limiting + Honeypot field. |
| **Admin Bypass** | Critical | Mitigated | Require `Authorization: Bearer <ADMIN_API_KEY>` for all moderation endpoints. No URL query parameter secrets allowed. |
| **Security Headers** | Medium | Remediating | Implement `src/middleware.ts` injecting CSP, HSTS, X-Content-Type-Options, Referrer-Policy, and `req_...` Request IDs. |
| **Legal Compliance** | Medium | Remediating | Create dedicated `/terms`, `/privacy`, `/copyright` pages with DMCA protocol and update footer links. |
| **SEO Leakage** | Low | Remediating | Update `robots.txt` and `sitemap.xml.ts` to block `/write`, `/payment/`, and internal API routes from indexation. |

---

## 7. Launch Blockers & Action Items

- [x] **Blocker 1:** Audit completed and recorded in `/docs/production-audit.md`.
- [x] **Blocker 2:** Create `.gitignore` and `.env.example`.
- [ ] **Blocker 3:** Implement payment price manipulation rejection and webhook idempotency store.
- [ ] **Blocker 4:** Implement multi-layered rate limiter and anti-bot honeypot.
- [ ] **Blocker 5:** Implement comprehensive HTML sanitization and link security.
- [ ] **Blocker 6:** Build reader reporting system and authenticated moderation API with action audit log.
- [ ] **Blocker 7:** Implement `src/middleware.ts` for security headers, request ID propagation, and health check endpoint `/api/health`.
- [ ] **Blocker 8:** Create `/terms`, `/privacy`, and `/copyright` legal pages; verify Marvel non-affiliation and rumor disclaimers.
- [ ] **Blocker 9:** Execute automated verification test suite and produce `/docs/launch-readiness.md`.
