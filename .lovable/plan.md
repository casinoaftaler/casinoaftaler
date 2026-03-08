

## Analyse af de 3 handlingspunkter

### 1. Fix SlotGameSeoCta links (forkerte paths)

**Problemet:** `SlotGameSeoCta.tsx` linker til to stier der **ikke eksisterer**:
- `/casinoer/spillemaskiner` — korrekt sti er `/casinospil/spillemaskiner`
- `/casinoer/casino-bonus` — korrekt sti er `/casino-bonus`

Disse er **broken internal links** der lækker link equity ud i 404-tomrum. Komponenten vises på alle community slot-sider, så det er potentielt mange crawlede sider med døde links.

**Fix:** Ret de to `to`-props i `SlotGameSeoCta.tsx`.

---

### 2. Synkronisér seoRoutes.ts ↔ page_metadata

**Problemet:** `seoRoutes.ts` (kode) og `page_metadata` (database) driver hver sit output — seoRoutes styrer build-time sitemap, page_metadata styrer dynamic sitemap og admin-UI. Hvis de er ude af sync, kan Google se modstridende `lastmod`-datoer eller manglende URLs mellem de to sitemaps.

**Fix:** Kør en diff-query der sammenligner alle paths i `seoRoutes.ts` mod `page_metadata`-tabellen og udbedrer manglende/afvigende rækker. Dette kræver at jeg læser begge datasæt og identificerer konkrete afvigelser før implementering.

---

### 3. Tilføj article:modified_time OG meta

**Problemet:** Bekræftet — `article:modified_time` meta-tagget eksisterer **ingen steder** i kodebasen. Dette Open Graph tag fortæller Google og sociale platforme præcis hvornår indholdet sidst blev opdateret. Det er et direkte freshness-signal der supplerer sitemap `lastmod`.

**Fix:** Tilføj i `SEO.tsx`:
```tsx
<meta property="article:modified_time" content={dateModified} />
```
Værdien kan udledes fra `seoRoutes`-lastmod eller en ny prop. Kun relevant for `type="article"` sider.

---

### Implementeringsplan

| # | Fil | Ændring |
|---|-----|---------|
| 1 | `src/components/community/SlotGameSeoCta.tsx` | Ret 2 link-paths |
| 2 | `src/components/SEO.tsx` | Tilføj `article:modified_time` og `article:published_time` OG meta tags |
| 3 | Database | Synkroniser `page_metadata` mod `seoRoutes.ts` (kræver diff-analyse først) |

Punkt 1 og 3 er ren fejlrettelse. Punkt 2 er et nyt freshness-signal. Alle tre er lavrisiko-ændringer med direkte SEO-gevinst.

