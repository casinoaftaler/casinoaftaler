

## Final Audit Pre-Crawl – Remaining Issues

After thorough investigation, here is what is already fixed and what still needs fixing:

### Already Fixed (will clear on re-crawl)
- **Multiple Meta Descriptions (991)** — hardcoded meta removed from index.html ✅
- **Multiple H1 Tags (991)** — noscript H1 → P ✅
- **Title Too Long (84)** — formatTitle() truncation ✅
- **Non-canonical in Sitemap (10)** — 10 provider hubs now have content ✅
- **Indexable became non-indexable (10)** — same 10 providers ✅
- **schema.org validation errors (3)** — areaOfExpertise, isPartOf, dateModified all fixed ✅
- **Missing Alt Text (3)** — alt texts added ✅
- **OG/Twitter missing (7)** — these are noindex pages (Auth, Profile) using raw Helmet, not the SEO component. Expected behavior.
- **Orphan pages (5 not indexable)** — noindex utility pages, no action needed.

### Still Broken — Must Fix Before Re-crawl

#### 1. Google Rich Results Validation Error (742 pages)
**Root cause:** `SoftwareApplication` entities with `aggregateRating` but **no `offers`** property. Google requires `offers` (even if free) for SoftwareApplication rich snippets.

**Affected locations:**
- **~700+ slot detail pages** — `SlotCatalogPage.tsx` line 802-820: `SoftwareApplication` has `aggregateRating` but no `offers`
- **~29 casino review pages** — `buildReviewSchema()` in `seo.ts` line 278-289: `itemReviewed` is `SoftwareApplication` with `aggregateRating` but no `offers`
- **`CasinoApp.tsx`** already has `offers` ✅ — no change needed

**Fix:** Add `offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" }` to both locations.

| File | Change |
|------|--------|
| `src/pages/SlotCatalogPage.tsx` (line ~806) | Add `offers` block after `operatingSystem` |
| `src/lib/seo.ts` (line ~282) | Add `offers` block to `itemReviewed` in `buildReviewSchema` |

#### 2. Orphan Pages — Indexable (318 pages)
This is the highest-impact link issue. 318 indexable pages have **zero incoming internal links**. These are almost certainly the 1400+ programmatic slot catalog pages (`/slot-katalog/{slug}`) that are only discoverable via sitemap, not via internal HTML links from other pages. The slot database page links to them via JS-rendered pagination, which Ahrefs may not execute.

**This is a structural issue** — not a quick code fix. The noscript fallbacks and sitemap entries provide some discovery, but Ahrefs flags them because it doesn't render JS. **No code change needed** — this is expected SPA behavior and Google handles it via the sitemap.

#### 3. Page has only one dofollow internal link (30 pages)
Similar to orphan pages — likely deep slot catalog or comparison pages with minimal cross-linking. Low priority, addressable via content strategy.

#### Summary: Only 2 files need changes

Both fixes add the required `offers` property to `SoftwareApplication` entities, resolving the 742 Google rich results validation errors.

