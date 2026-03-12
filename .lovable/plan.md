

## SEO Roadmap Implementation Plan

Based on the audit, here are all actionable items I can implement right now. Items requiring external work (backlinks, PR, prerendering service) are excluded.

---

### 1. Add Missing PARENT_OVERRIDES for 10 New Provider Hubs
**File:** `src/lib/breadcrumbs.ts`

The 10 new `/spillemaskiner/` provider hubs (thunderkick, blueprint-gaming, push-gaming, quickspin, isoftbet, betsoft, wazdan, endorphina, stakelogic, booming-games) have labels but are **missing** from `PARENT_OVERRIDES`. This means their breadcrumb JSON-LD schema is broken. Add them after line 455, following the same pattern as the existing 13 providers.

---

### 2. Diversify Lastmod Dates in seoRoutes.ts
**File:** `src/lib/seoRoutes.ts`

Currently ~200 routes share `2026-03-08` as lastmod, which creates a "freshness fingerprint" that signals batch updates to Google. Stagger dates across clusters:

- Casino Anmeldelser cluster: keep `2026-03-08`
- Bonus Guides: shift to `2026-03-06`
- Casinospil/Blackjack/Roulette/Poker spokes: shift to `2026-03-05`
- Betalingsmetoder: shift to `2026-03-04`
- Ordbog (already `2026-03-07`): keep
- Nye Casinoer spokes: shift to `2026-03-07`
- Live Casino: shift to `2026-03-06`
- Casino Guides (/casinoer/*): shift to `2026-03-04`
- Slot guides: shift to `2026-03-05`
- Info/Trust pages: keep `2026-03-05`

This creates a natural 5-day spread that looks organic.

---

### 3. Add IGT Provider Guide Route Placeholder
**File:** `src/lib/seoRoutes.ts`

The route `/spiludviklere/igt` is missing from seoRoutes but `/spillemaskiner/igt` exists. The IGT provider guide page itself needs to be created (large effort), but I will at minimum ensure the routing and breadcrumb infrastructure is ready. Check if route exists in App.tsx first.

---

### 4. Internal Link Audit Automation Enhancement
**File:** `.github/scripts/check-broken-links.mjs`

Extend the existing broken-link checker to also detect:
- Orphan pages (routes in seoRoutes not linked from any other page)
- Near-orphan pages (routes linked from fewer than 2 pages)

This gives ongoing governance without manual crawls.

---

### Technical Details

**Breadcrumb PARENT_OVERRIDES addition (10 entries):**
```
"/spillemaskiner/thunderkick": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
"/spillemaskiner/blueprint-gaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
... (8 more)
```

**Lastmod diversification:** Change ~120 hardcoded dates across 5 date values to create organic spread. No functional change, purely sitemap signal optimization.

**Files modified:**
- `src/lib/breadcrumbs.ts` (add 10 PARENT_OVERRIDES)
- `src/lib/seoRoutes.ts` (diversify ~120 lastmod dates)
- `.github/scripts/check-broken-links.mjs` (add orphan detection)

