

# Plan: GPWA Seal Optimization – SEO, CRO & E-E-A-T

## Overview
Expand the existing GPWA seal from footer-only to strategic placements across money pages and trust pages, create a new trust page `/er-casinoaftaler-trovaerdig/`, add microcopy, fix lazy-loading, and enhance structured data.

---

## Changes

### 1. Create reusable `GPWASealBadge` component
**New file:** `src/components/GPWASealBadge.tsx`

A compact, reusable trust badge component with:
- GPWA seal image (from `certify.gpwa.org`)
- Popup verification onClick (existing pattern)
- Configurable microcopy text (e.g. "Godkendt af GPWA – branchens tillidsstempel")
- Configurable size variant: `inline` (small, for review intros) vs `block` (larger, for trust pages)
- `loading="eager"` — no lazy-loading on this trust asset
- Renders a `<noscript>` fallback link for crawlability

### 2. Place GPWA badge on casino review pages
**File:** `src/components/CasinoReviewHero.tsx`

Add `<GPWASealBadge variant="inline" />` inside the hero section, below the casino name. This places it at the top of every review near the decision point.

### 3. Place GPWA badge on bonus/money pages
Add `<GPWASealBadge variant="inline" />` to these page components near their CTA or intro areas:
- `src/pages/CasinoBonus.tsx`
- `src/pages/FreeSpins.tsx`
- `src/pages/LiveCasino.tsx`
- `src/pages/TopCasinoOnline.tsx`

### 4. Add GPWA to AuthorBio component
**File:** `src/components/AuthorBio.tsx`

Add a small inline mention below the bio text:
> "Casinoaftaler.dk er en GPWA-godkendt affiliate platform."

With a link to the verification page and to `/er-casinoaftaler-trovaerdig/`. This automatically propagates to all 50+ content pages using AuthorBio.

### 5. Fix footer GPWA seal loading
**File:** `src/components/Footer.tsx`

Change `loading="lazy"` → `loading="eager"` on the GPWA seal image (line 615) to ensure it's always visible to crawlers. Add microcopy text next to the seal: "Verificeret af GPWA".

### 6. Create new trust page `/er-casinoaftaler-trovaerdig/`
**New file:** `src/pages/ErCasinoaftalerTrovaerdig.tsx`

Content sections:
- **Hero:** "Er CasinoAftaler troværdig?" 
- **Hvem vi er:** Team intro, link to `/om`
- **Sådan tester vi:** Summary + link to `/saadan-tester-vi-casinoer`
- **GPWA godkendelse:** What GPWA is, what approval means, verification link
- **Spillemyndigheden:** Danish license verification
- **Uafhængig redaktion:** Link to `/forretningsmodel`
- GPWA seal prominently displayed
- FAQ section with `buildFaqSchema`
- Article JSON-LD with `buildArticleSchema`
- `<AuthorBio author="jonas" />`

SEO: `title="Er CasinoAftaler troværdig? | Sådan verificerer du os"`, `description` ~150 chars.

### 7. Register route + SEO config
- **`src/App.tsx`:** Add lazy import + route for `/er-casinoaftaler-trovaerdig/`
- **`src/lib/seoRoutes.ts`:** Add entry with `changefreq: "monthly"`, `priority: 0.7`
- **`src/lib/breadcrumbs.ts`:** Add `PARENT_OVERRIDES` entry under `/om` hub
- **`src/lib/seoDatePolicy.ts`:** No dynamic date needed (static page)

### 8. Internal linking
Add links to `/er-casinoaftaler-trovaerdig/` from:
- `src/components/WhyTrustUs.tsx` — Add a 5th trust point or link from existing "Uafhængig redaktion" card
- `src/components/SourceCitations.tsx` — Add a line: "Casinoaftaler.dk er GPWA-godkendt. Læs mere →"

### 9. Structured data enhancement
**File:** `src/lib/seo.ts`

Add to `organizationSchema`:
```json
"memberOf": {
  "@type": "Organization",
  "name": "Gambling Portal Webmasters Association",
  "url": "https://www.gpwa.org"
},
"award": "GPWA Approved Portal"
```

### 10. Sitemap inclusion
Add `/er-casinoaftaler-trovaerdig/` to `public/sitemap-priority.xml` with priority 0.7.

---

## Technical Details

- The GPWA script (`certify.gpwa.org/script/casinoaftaler.dk/`) stays in `Footer.tsx` useEffect — loaded once globally
- The seal image URL `certify.gpwa.org/seal/casinoaftaler.dk/` is hosted externally per GPWA requirements
- Verification popup uses the existing `window.open` pattern (480x560)
- `GPWASealBadge` uses `loading="eager"` and no `fetchPriority` (not LCP)
- New page follows existing patterns: `useSiteSettings()` for hero background, `AuthorMetaBar`, `FAQSection`, `RelatedGuides`, `LatestNewsByCategory`

---

## Files touched
| File | Action |
|------|--------|
| `src/components/GPWASealBadge.tsx` | Create |
| `src/pages/ErCasinoaftalerTrovaerdig.tsx` | Create |
| `src/components/CasinoReviewHero.tsx` | Edit — add badge |
| `src/components/AuthorBio.tsx` | Edit — add GPWA mention |
| `src/components/Footer.tsx` | Edit — fix loading, add microcopy |
| `src/components/WhyTrustUs.tsx` | Edit — add link |
| `src/components/SourceCitations.tsx` | Edit — add GPWA line |
| `src/lib/seo.ts` | Edit — add memberOf/award |
| `src/App.tsx` | Edit — add route |
| `src/lib/seoRoutes.ts` | Edit — add entry |
| `src/lib/breadcrumbs.ts` | Edit — add parent override |
| `src/pages/CasinoBonus.tsx` | Edit — add badge |
| `src/pages/FreeSpins.tsx` | Edit — add badge |
| `src/pages/LiveCasino.tsx` | Edit — add badge |
| `src/pages/TopCasinoOnline.tsx` | Edit — add badge |

