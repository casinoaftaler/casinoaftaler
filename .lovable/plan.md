

## Problem

The bottom-of-page structure is inconsistent across ~150 pages. The correct order (as seen on `/casinospil`) should be:

```text
─── Content ───
  RelatedGuides
  FAQSection
  AuthorBio  (renders: CommunityPromoSection → Author card → SourceCitations)
─── End ───
```

Currently, pages have many different orderings. The most common wrong patterns:

| Pattern | Example pages |
|---------|--------------|
| **AuthorBio → RelatedGuides → FAQ** | Most slot guides, Spiludviklere, CasinoAnmeldelser, CasinoBonus |
| **AuthorBio → FAQ** (no RelatedGuides) | BaccaratGuide, LicenseredeCasinoerGuide, SpilForSjovGuide |
| **RelatedGuides → FAQ → AuthorBio** | Already correct: Casinospil, ProviderPageTemplate, PaymentMethodPageTemplate |
| **FAQ → AuthorBio → RelatedGuides** | Some casino reviews |
| **AuthorBio → ... → RelatedGuides → FAQ** | CasinoNyhedArticle, BwinAnmeldelse |

For slot guides specifically, `SlotProviderLink` should come before RelatedGuides (it's contextually related content).

## Plan

### Scope
All ~150 page files under `src/pages/` that use `<AuthorBio>`. Templates (`ProviderPageTemplate`, `PaymentMethodPageTemplate`) are already correct and won't be touched.

### Target structure for every page
```text
<SlotProviderLink />          {/* only slot guides */}
<LatestNewsByCategory />      {/* only pages that have it */}
<RelatedGuides />
<FAQSection />
<AuthorBio />                 {/* ALWAYS last */}
```

Remove unnecessary `<Separator>` elements between these bottom components (the components have their own spacing).

### Implementation approach
Batch-edit all files. For each file:
1. Identify the bottom section (everything after main content ends)
2. Reorder to: RelatedGuides → FAQSection → AuthorBio (always last)
3. Remove stray `<Separator>` wrappers around these components
4. Keep existing props (`author=`, `showCommunity=`, `currentPath=`, etc.) unchanged

### Files to modify (grouped by pattern)

**Slot guides (~31 files)** — current: `AuthorBio → SlotProviderLink → RelatedGuides → FAQ`  
Target: `SlotProviderLink → RelatedGuides → FAQSection → AuthorBio`

**Casino reviews (~20 files)** — various wrong orderings  
Target: `RelatedGuides → FAQSection → AuthorBio`

**Hub/guide pages (~30 files)** — various wrong orderings  
Target: `[LatestNewsByCategory] → RelatedGuides → FAQSection → AuthorBio`

**Casinospil sub-guides (~29 files)** — various wrong orderings  
Target: `RelatedGuides → FAQSection → AuthorBio`

**Live casino guides (~5 files)**, **nye-casinoer (~10 files)**, **casinoer sub-pages (~9 files)** — same fix

**Author pages, bonus pages, misc** — same fix

### Not modified
- `ProviderPageTemplate.tsx` — already correct
- `PaymentMethodPageTemplate.tsx` — already correct
- Pages without AuthorBio (Auth, Admin, NotFound, etc.)

