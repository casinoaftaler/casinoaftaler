

## Ahrefs Audit Fix Plan – 4 Critical Issues

### Issue 1: Multiple Meta Descriptions (10 provider hub pages)
**Already fixed** in previous message (removed hardcoded meta from index.html). These 10 pages also suffer from Issue 2 below, which causes them to redirect and inherit the parent page's meta. Fixing Issue 2 will fully resolve this.

---

### Issue 2: Canonical URL Wrong + Redirect (10 provider hub pages)
**Root cause:** 10 provider slugs exist in `seoRoutes.ts` and `breadcrumbs.ts` but are **missing from `PROVIDER_HUB_CONTENT`** in `providerHubContent.ts`. When `ProviderSlotsHub` renders, `validSlug` is null → `<Navigate to="/casinospil/spillemaskiner" replace />` fires → Ahrefs sees the parent page's canonical.

Missing providers: stakelogic, endorphina, betsoft, isoftbet, booming-games, blueprint-gaming, quickspin, thunderkick, wazdan, push-gaming.

**Fix:** Add all 10 providers to `PROVIDER_HUB_CONTENT` with unique `displayName`, `seoTitle`, `metaDescription`, `introHtml`, `datePublished`, and `faqs`. This gives each page real content, a correct self-referencing canonical, and unique meta description.

---

### Issue 3: Google Rich Results Validation Error (74+ pages)
**Root cause (payment pages):** `PaymentMethodPageTemplate.tsx` line 170 uses `@type: "Product"` in the `about` field. Google requires `review`, `aggregateRating`, or `offers` for any Product entity. This affects all ~10 payment method pages.

**Fix:** Change `"Product"` → `"Thing"` in `PaymentMethodPageTemplate.tsx`:
```typescript
about: [
  { "@type": "Thing", name, url: `${SITE_URL}${currentPath}` },
],
```

**Other pages:** The remaining 64 pages with "Google rich results validation error" are likely caused by `SoftwareApplication` entities in slot catalog schemas (via `buildSlotCatalogSchema`) that have `aggregateRating` but lack `offers` or `review`. Need to verify – the `SoftwareApplication` type in the ItemList entries may trigger Google's Product-like validation. If so, changing to `"VideoGame"` or removing the wrapping `SoftwareApplication` from catalog entries would resolve it.

---

### Issue 4: Schema.org Validation Errors (3 pages)
**Pages affected:** `/forfatter/ajse`, `/` (homepage), `/om`

**Ajse page:** `personSchema` includes `areaOfExpertise` which is **not a valid schema.org property** (it's a Wikidata property). Remove it.

**Homepage:** The `WebPage` entity uses `isPartOf: { "@id": ".../#organization" }` – but `isPartOf` on a WebPage should reference a `WebSite`, not an `Organization`. Fix: change to reference `/#website`.

**Om page:** `organizationSchema` includes `dateModified` which is not valid on `Organization` type. Remove it.

---

### Summary of File Changes

| File | Change |
|------|--------|
| `src/lib/providerHubContent.ts` | Add 10 new provider entries |
| `src/pages/payments/PaymentMethodPageTemplate.tsx` | `"Product"` → `"Thing"` (line 170) |
| `src/pages/ForfatterAjse.tsx` | Remove `areaOfExpertise` from personSchema |
| `src/pages/Index.tsx` | Fix `isPartOf` to reference `/#website` |
| `src/pages/OmTeamet.tsx` | Remove `dateModified` from organizationSchema |

