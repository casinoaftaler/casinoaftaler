

## Enterprise SEO Audit: Provider Hub Pages (13) + Slot Catalog Pages (~1460)

---

### AUDIT RESULTAT: OVERORDNET STATUS

Arkitekturen er **solid**. Der er ingen kritiske blokerende SEO-fejl. Nedenfor er fundne issues og forbedringsmuligheder, prioriteret.

---

### P0 – KRITISKE PROBLEMER

**Ingen P0-problemer fundet.** Alle sider renderer, har SEO-tags, canonical URLs og er crawlbare.

---

### P1 – CRAWL & INDEX FORBEDRINGER

#### 1. Slot-katalog sider mangler link til Provider Hub
**Problem:** `/slot-katalog/{slug}` linker til `/spiludviklere/{provider}` (developer guide), men IKKE til `/spillemaskiner/{provider}` (provider hub). Det betyder at provider hubs kun opdages via `/casinospil/spillemaskiner` og sitemap – ikke via de 1460 slot-sider.

**Fix:** Tilføj et link fra SlotCatalogPage til `/spillemaskiner/{providerSlug}` i "Mere fra {provider}"-sektionen (linje ~1162-1174).

#### 2. Breadcrumb for /slot-katalog/:slug – inkonsistent hierarki
**Problem:** Breadcrumbs for dynamiske slot-sider bruger `DYNAMIC_PARENT_MAP` og viser: `Forside > Slot Database > {Slot}`. URL er `/slot-katalog/{slug}`, men parent peger til `/slot-database`. Dette er korrekt og konsistent – **ingen ændring nødvendig**.

#### 3. Provider hub → slot links peger til /slot-katalog/ (korrekt)
Bekræftet: `ProviderCatalogSlots` linker korrekt til `/slot-katalog/{slug}` for hvert slot. Top 5 i `ProviderSlotsHub` linker også til `/slot-katalog/{slug}`. **OK.**

#### 4. 1460 slot-sider IKKE i seoRoutes.ts (korrekt)
Slot-katalog sider er dynamiske og genereret fra databasen. De er korrekt håndteret via:
- `sitemap-slots.xml` genereret ved build-time fra `slot_catalog` tabellen
- `sitemap-index.xml` refererer til `sitemap-slots.xml`
- **OK** – ingen ændring nødvendig.

#### 5. robots.txt – ingen blokeringer
Bekræftet: Hverken `/slot-katalog/` eller `/spillemaskiner/` er blokeret. `/slot-database` har eksplicit `Allow`. **OK.**

---

### P2 – CONTENT & QUALITY

#### 6. Deep content status: ~467/1460 færdige
**Status:** `slot-deep-content-auto` cron kører hvert 2. minut. ~993 slots mangler stadig unik AI-genereret tekst. Disse bruger fallback-template med hash-baseret variation (H2-rotation, data-driven tekst).

**Risiko:** De ~993 fallback-sider har unik variation via hash + slot-data, men delingen af template-struktur kan trigge "thin content"-signaler over tid.

**Anbefaling:** Afvent cron-færdiggørelse (~3-4 timer). Ingen kodeændring nødvendig.

#### 7. Meta descriptions – unik per slot
Bekræftet: `meta_description` kolonne bruges først, fallback til template-genereret med slot-specifik data. **OK.**

#### 8. Provider sider – unik tekst per side
Bekræftet: `providerHubContent.ts` indeholder unik `introHtml`, `faqs` og `metaDescription` for hver af de 13 providers. Dynamisk statistik (avg RTP, highest X, total slots) gør hver side endnu mere unik. **OK.**

---

### P2 – STRUCTURED DATA

#### 9. Slot catalog pages – Article + SoftwareApplication + FAQPage
Bekræftet: Unified `@graph` med Article, Person, SoftwareApplication (med AggregateRating baseret på bonus_count), og FAQPage. BreadcrumbList absorberes via SEO.tsx. **OK.**

#### 10. Provider hub pages – Article + FAQPage + ItemList
Bekræftet: `buildArticleSchema` + `buildFaqSchema` + `buildSlotCatalogSchema` (ItemList). **OK.**

#### 11. BreadcrumbList schema
Bekræftet: Genereres automatisk via `buildBreadcrumbListSchema()` i SEO.tsx for alle sider. **OK.**

---

### P2 – PERFORMANCE

#### 12. Code splitting
Bekræftet: `SlotCatalogPage` og `ProviderSlotsHub` er lazy-loaded via `React.lazy()`. Bundle er splittet via `manualChunks` (react, icons, supabase, charts, carousel, dnd). **OK.**

#### 13. Progressive loading
Bekræftet: `ProviderCatalogSlots` viser 20 slots initialt, derefter batches af 50. `noscript` fallback dækker alle slots. **OK.**

#### 14. Database queries
`SlotCatalogPage` bruger O(1) lookup via indexed `slug` kolonne. Provider slots hentes i batches af 1000. **OK.**

---

### P3 – SEO ENHANCEMENTS

#### 15. Manglende cross-link: Slot → Provider Hub
**Problem:** SlotCatalogPage linker til `/spiludviklere/{slug}` men IKKE til `/spillemaskiner/{slug}`. Provider hub-siderne er "orphan-agtige" fra slot-perspektivet.

**Fix:** Tilføj et ekstra link i SlotCatalogPage's "Mere fra {provider}" sektion:
```
Se alle {provider} spillemaskiner → /spillemaskiner/{providerSlug}
```

#### 16. Provider hub mangler link til /slot-database
**Nuværende:** Provider hub linker til `/spiludviklere/{slug}` og individuelle slots.
**Fix:** Tilføj et link til `/slot-database` for bredere crawl-flow.

#### 17. noscript fallback i ProviderCatalogSlots udelukker "featured" slots
**Problem:** noscript-blokken i `ProviderCatalogSlots` renderer kun `catalogOnly` (slots der IKKE er i featured-listen). De 3-5 featured slots med guide-links er altså udelukket fra noscript.
**Fix:** Tilføj featured slots til noscript-blokken.

---

### SAMLET PRIORITERET FIX-LISTE

| # | Prioritet | Problem | Fil |
|---|-----------|---------|-----|
| 1 | P1 | Tilføj link fra slot-sider til provider hub `/spillemaskiner/{slug}` | `SlotCatalogPage.tsx` |
| 2 | P2 | Tilføj featured slots til noscript fallback | `ProviderCatalogSlots.tsx` |
| 3 | P3 | Tilføj link til `/slot-database` fra provider hubs | `ProviderSlotsHub.tsx` |

### BEKRÆFTEDE ELEMENTER (INGEN ÆNDRING NØDVENDIG)

- URL-struktur: Konsistent, ingen duplicates, ingen trailing slash issues
- Canonical tags: Korrekte via `getCanonicalUrl()` 
- robots.txt: Ingen blokeringer
- Sitemap: Alle 1460+ slots i `sitemap-slots.xml`, 13 providers i `sitemap.xml`
- Breadcrumbs: Korrekte for både provider og slot sider
- Structured data: Article, FAQPage, SoftwareApplication, BreadcrumbList, ItemList
- E-E-A-T: AuthorMetaBar + AuthorBio med sociale links på alle sider
- noindex: Kun på 404/not-found slots – korrekt
- Page depth: Alle slots max 3 klik (Forside → Spillemaskiner → Provider → Slot)
- Console errors: Kun en harmløs `forwardRef` warning på Index-siden

