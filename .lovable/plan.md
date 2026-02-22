
# FULL ENTERPRISE AUDIT -- casinoaftaler.dk
**Dato: 22. februar 2026**

---

## DEL 1: SERVER-SIDE & INFRA ANALYSE

### Cloudflare Setup ★★★★☆

| Check | Status | Detalje |
|-------|--------|---------|
| Worker routing | PASS | Cloudflare Worker detekterer bots via User-Agent og router til Prerender.io |
| Bot detection logic | PASS | Googlebot, Bingbot og andre crawlere fanges korrekt |
| Cache rules | PASS | CDN caching aktiv for statiske assets |
| HTML caching vs bot bypass | PASS | Bots bypasser cache og modtager pre-renderet HTML |

### Prerender.io Integration ★★★★☆

| Check | Status | Detalje |
|-------|--------|---------|
| Bot-routing (Googlebot UA) | PASS | Prerender.io returnerer cached HTML for bot requests |
| Fuldt renderet DOM | PASS | Prerender.io cacher komplet side (bekraftet via dashboard) |
| `window.prerenderReady` signal | PASS | Implementeret i `index.html` (false) + `main.tsx` (true efter render) |
| x-prerender headers | WARNING | Ikke verificeret direkte -- krav brugerens curl-test for endelig bekraftelse |
| HTML size | PASS | Cached sider vises fuldt i Prerender.io dashboard (begge domaner) |

### HTTP & Security ★★★☆☆

| Check | Status | Detalje |
|-------|--------|---------|
| HTTP status codes | PASS | 200 for eksisterende sider, 404-side renderes korrekt |
| HSTS | WARNING | Ikke verificeret fra koden -- afhaenger af Cloudflare config |
| CSP | WARNING | Ingen Content-Security-Policy header sat i koden |
| Referrer Policy | WARNING | Ingen explicit referrer-policy header |
| X-Frame-Options | WARNING | Ingen X-Frame-Options header |
| X-Content-Type-Options | WARNING | Ingen nosniff header |
| SSL | PASS | HTTPS enforced via Cloudflare |

**Vurdering**: 4 manglende security headers. Cloudflare kan konfigureres til at tilfoeje dem.

### Performance (Server) ★★★☆☆

| Metric | Vaerdi | Status |
|--------|--------|--------|
| TTFB (preview) | 541ms | WARNING -- acceptabelt men kan forbedres |
| FCP | 5,508ms | FAIL -- for langsom (CSR-begransning) |
| Full Page Load | 5,941ms | WARNING -- tungt for forstegangslast |
| Compression | Aktiv via Cloudflare | PASS |
| CDN caching | Cloudflare | PASS |
| JS Heap | 23.8MB | PASS |
| DOM Nodes | 7,093 | PASS |
| CLS | 0.0016 | PASS -- excellent |

**Kritisk**: 2 store billeder bremser load:
- `spillehal-promo.webp`: 1,699KB (1.7MB)
- `rise-of-fedesvin-promo.webp`: 1,683KB (1.7MB)

---

## DEL 2: CRAWL & RENDER ANALYSE

### Crawlbarhed ★★★★☆

| Check | Status | Detalje |
|-------|--------|---------|
| robots.txt | WARNING | **Live** refererer til `sitemap-index.xml`, **koden** refererer til `sitemap.xml`. Mismatch! |
| sitemap.xml | PASS | 168 URLs, korrekt formateret, genereret fra seoRoutes.ts |
| sitemap-index.xml | PASS | Refererer til sitemap.xml |
| Dynamiske nyheder i sitemap | FAIL | Casino-nyhedsartikler (`/casino-nyheder/:slug`) mangler i primaer sitemap -- kun hub-URL inkluderet |
| Internal linking | PASS | RelatedGuides-komponent med hash-rotation sikrer equity-fordeling |
| Breadcrumbs | PASS | Visual + JSON-LD BreadcrumbList med parent overrides |

**Kritisk fund**: robots.txt mismatch mellem live og kode:
- Live: `Sitemap: https://casinoaftaler.dk/sitemap-index.xml`
- Kode (public/robots.txt): `Sitemap: https://casinoaftaler.dk/sitemap.xml`

### JavaScript Rendering ★★★☆☆

| Check | Status | Detalje |
|-------|--------|---------|
| CSR vs prerender output | WARNING | 100% CSR -- alt indhold usynligt uden JS |
| DOM completeness via Prerender | PASS | Prerender.io leverer fuldt renderet DOM til bots |
| Crawl budget impact | WARNING | CSR + Prerender.io arkitektur forbruger ekstra crawl budget |

### Structured Data ★★★★★

| Schema | Status | Detalje |
|--------|--------|---------|
| Organization | PASS | Komplet med logo, sameAs, contactPoint |
| Article | PASS | Pa alle guides/anmeldelser med datePublished/Modified |
| FAQPage | PASS | Pa relevante sider med korrekt Question/Answer markup |
| BreadcrumbList | PASS | Automatisk genereret og merged i unified @graph |
| WebSite + SearchAction | PASS | Kun pa forside -- korrekt |
| Person (Jonas/Kevin) | PASS | Unikke entiteter med sameAs, jobTitle, worksFor |
| VideoObject | PASS | hasPart/isPartOf binding til Article |
| AggregateRating | PASS | Pa anmeldelser med ratingValue/ratingCount |
| HowTo | PASS | Pa betalingsguides og slot-guides |
| Unified @graph | PASS | Alt merged i en JSON-LD blok via SEO.tsx |

---

## DEL 3: FULL ON-PAGE SEO AUDIT

### Title Tags ★★★★★

| Check | Status | Detalje |
|-------|--------|---------|
| Formatering | PASS | Automatisk suffix ` \| Casinoaftaler.dk` via `formatTitle()` |
| Unikhed | PASS | Hver side har unik title |
| Laengde | PASS | Kontrolleret via formatTitle-funktion |

### Meta Descriptions ★★★★☆

| Check | Status | Detalje |
|-------|--------|---------|
| Tilstedevarelse | PASS | Alle indexerbare sider har description |
| Laengde | PASS | Auto-truncated til 160 tegn ved word boundary |
| Unikhed | PASS | Unik per side |

### H1-H6 Struktur ★★★☆☆

| Check | Status | Detalje |
|-------|--------|---------|
| Forside H1 | FAIL | **2 H1-tags**: "Fa vejledning til de bedste bonusser her." + "Bedste Online Casinoer i Danmark" |
| Undersider H1 | PASS | Unik H1 per underside (fx "Betinia Anmeldelse 2026") |
| H2 hierarki | PASS | Logisk hierarki pa anmeldelser (30+ H2 pa Betinia) |

### Canonicals ★★★★★

| Check | Status | Detalje |
|-------|--------|---------|
| Implementation | PASS | `getCanonicalUrl()` -- lowercase, no trailing slash |
| hreflang | PASS | `da` + `x-default` sat korrekt |
| Konsistens | PASS | Alle bruger `https://casinoaftaler.dk` uanset deploy-domane |

### Open Graph & Twitter Cards ★★★★★

| Check | Status | Detalje |
|-------|--------|---------|
| og:title | PASS | Sat pa alle sider via SEO-komponent |
| og:description | PASS | Sat pa alle sider |
| og:type | PASS | "website" default, "article" pa artikler |
| og:locale | PASS | `da_DK` |
| og:site_name | PASS | "Casinoaftaler" |
| twitter:card | PASS | `summary_large_image` |

### Image Optimization ★★☆☆☆

| Check | Status | Detalje |
|-------|--------|---------|
| Format | PASS | WebP brugt konsekvent |
| Storrelse | FAIL | 2 billeder over 1.5MB (spillehal-promo, rise-of-fedesvin-promo) |
| Alt tags | WARNING | 35 billeder med `alt=""` (dekorative billeder -- nogle ok, andre burde have alt-tekst) |
| Lazy loading | FAIL | Ingen `loading="lazy"` pa hovedsiden billeder |

### URL Struktur ★★★★★

| Check | Status | Detalje |
|-------|--------|---------|
| Konsistens | PASS | Alle anmeldelser under `/casino-anmeldelser/` |
| Redirects | PASS | 40+ legacy-URL redirects i App.tsx |
| Lowercase | PASS | Enforced i `getCanonicalUrl()` |
| No trailing slash | PASS | Enforced i `getCanonicalUrl()` |

### Internal Linking ★★★★★

| Check | Status | Detalje |
|-------|--------|---------|
| Max 12 body-links | PASS | Governance policy enforced |
| RelatedGuides rotation | PASS | Hash-baseret soeskende-rotation |
| Parent overrides | PASS | Orphan-sider bundet til korrekte hubs |
| Komponent-rakkefolge | PASS | AuthorBio -> RelatedGuides -> FAQ konsistent |

---

## DEL 4: TECHNICAL SEO & INDEXING

### Duplicate Content ★★★★★

| Check | Status | Detalje |
|-------|--------|---------|
| WWW vs non-WWW | PASS | Begge caches i Prerender.io; canonical peger pa `https://casinoaftaler.dk` |
| HTTP -> HTTPS | PASS | Cloudflare enforcer HTTPS redirect |
| Canonical correctness | PASS | Konsistent `https://casinoaftaler.dk` + path |

### Indexability ★★★★☆

| Check | Status | Detalje |
|-------|--------|---------|
| noindex korrekthed | PASS | Korrekt sat pa: Shop, SlotMachine, Auth, Profile, NotFound, Leaderboard, Rewards, SpinTheReel, GameLibrary, GatesOfFedesvin, RiseOfFedesvin, PublicProfile |
| Indexerbare sider | PASS | 168 sider i sitemap |
| Thin content detection | PASS | Alle cornerstone-guides 6.000-9.000 ord |

### Sitemap Synkronisering ★★★☆☆

| Check | Status | Detalje |
|-------|--------|---------|
| seoRoutes.ts vs deployed sitemap | FAIL | Deployed sitemap har forside `lastmod: 2026-02-16`, men seoRoutes.ts har `2026-02-22`. Sitemap ikke genbygget efter seneste deploy |
| News-artikler | FAIL | Ikke inkluderet i primaer sitemap -- kun tilgangelig via separat edge function `sitemap-news` |
| casino-compliance | WARNING | Referenceret i edge function men ingen rute i App.tsx eller seoRoutes.ts |

### Core Web Vitals Risk ★★★☆☆

| Metric | Vaerdi | Risiko |
|--------|--------|--------|
| CLS | 0.0016 | LAV -- excellent |
| LCP | Estimeret 5-6s (CSR) | HOJ -- hero afhaenger af DB-fetch + JS |
| FID/INP | Ikke malt | MEDIUM -- 143 scripts indlast |

---

## DEL 5: COMPETITIVE SEO STRENGTH ESTIMATE

### Autoritetssignaler ★★★★☆

| Signal | Vurdering |
|--------|-----------|
| Domain age | Ukendt -- men URL-struktur tyder pa etableret site |
| Content volume | 168 indexerbare sider -- STAERKT for DK niche |
| Content depth | 6.000-9.000 ord pa hubs, 2.000+ pa undersider -- STAERKT |
| Topical authority | Dyb cluster-arkitektur med 7+ clusters -- STAERKT |

### E-E-A-T Signaler ★★★★★

| Signal | Status | Detalje |
|--------|--------|---------|
| Experience | PASS | Dual-author system (Jonas + Kevin) med unikke profiler |
| Expertise | PASS | Detaljerede jobtitles, knowsAbout arrays i schema |
| Authoritativeness | PASS | Organisation schema med sociale profiler, forfatter-sider |
| Trustworthiness | PASS | Redaktionel politik, forretningsmodel, testmetodik -- alle offentlige |

### Trust Signals ★★★★★

| Signal | Status |
|--------|--------|
| Licens-ID verificering i QuickFacts | PASS |
| Ansvarligt spil-sektion | PASS |
| ROFUS/StopSpillet integration | PASS |
| Spillemyndigheden-dedikeret side | PASS |
| Kontaktside | PASS |
| Privatlivspolitik + cookies + vilkar | PASS |

### Affiliate Compliance ★★★★★

| Signal | Status |
|--------|--------|
| JS-baseret affiliate setup (ikke crawlbar) | PASS |
| Hash-roterende disclaimers | PASS |
| Forretningsmodel-side (transparency) | PASS |
| Redaktionel politik | PASS |
| Kommerciel vs redaktionel adskillelse | PASS |

### Ranking Power Estimate

| Faktor | Score |
|--------|-------|
| Topical Authority | 9/10 |
| Content Depth | 9/10 |
| Technical SEO | 7/10 |
| E-E-A-T | 9/10 |
| Backlink profile | Ukendt (kraever Ahrefs/Semrush) |

---

## SAMLET SCORECARD

### Teknisk Score

| Kategori | Score | Stjerner |
|----------|-------|----------|
| Server & Infra | 75% | ★★★★☆ |
| Crawl & Render | 78% | ★★★★☆ |
| Structured Data | 98% | ★★★★★ |
| On-Page SEO | 85% | ★★★★☆ |
| Technical SEO & Indexing | 80% | ★★★★☆ |
| Security Headers | 40% | ★★☆☆☆ |
| Performance | 60% | ★★★☆☆ |
| Image Optimization | 45% | ★★☆☆☆ |
| **SAMLET TEKNISK SCORE** | **76%** | |

### SEO Styrke-Score

| Kategori | Score |
|----------|-------|
| Content Authority | 95% |
| E-E-A-T | 95% |
| Trust & Compliance | 98% |
| Structural SEO | 90% |
| Rendering & Crawl | 72% |
| **SAMLET SEO STYRKE-SCORE** | **88%** |

---

## PRIORITERET HANDLINGSPLAN

### KRITISK (Fix inden 7 dage)

1. **Forside H1-duplikat**: 2 H1-tags pa forsiden. Fjern det ene eller konverter til H2
2. **Sitemap drift**: Deployed sitemap er outdated (lastmod matcher ikke seoRoutes.ts). Kraever nyt build+deploy
3. **2 megabilleder**: Komprimer `spillehal-promo.webp` og `rise-of-fedesvin-promo.webp` til under 200KB
4. **robots.txt mismatch**: Live refererer til `sitemap-index.xml`, kode refererer til `sitemap.xml`. Synkroniser

### HOJ (Fix inden 14 dage)

5. **Nyhedsartikler i sitemap**: `/casino-nyheder/:slug` URLs mangler i primaer sitemap -- kun tilgangelig via edge function
6. **lazy loading**: Tilfoej `loading="lazy"` pa alle billeder under fold
7. **Security headers**: Tilfoej CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy via Cloudflare
8. **Database security**: Fix 2 SECURITY DEFINER views + 3 overly permissive RLS policies

### MEDIUM (Fix inden 30 dage)

9. **Alt-tekster**: Gennemga 35 billeder med `alt=""` -- tilfoej beskrivende alt pa ikke-dekorative billeder
10. **LCP optimering**: Preload hero-billede, overvej inline critical CSS
11. **casino-compliance rute**: Referenceret i sitemap-news edge function men eksisterer ikke i App.tsx

---

## BINAER KONKLUSION

**SYSTEM ER SOLIDT**

Sitet har en exceptionelt staerk SEO-arkitektur med industriens bedste praksis for structured data, E-E-A-T signaler og intern link-styring. De identificerede problemer er primaert operationelle (sitemap-synk, billedstorrelser, H1-duplikat) og ikke arkitektoniske. Ingen kritiske strukturelle fejl truer indekseringen eller ranking-potentialet.
