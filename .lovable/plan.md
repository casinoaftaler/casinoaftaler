## Problem: SoftwareApplication mangler `aggregateRating` eller `review`

Fejlen fra Ahrefs/Google: **422 sider** har en `SoftwareApplication` schema UDEN hverken `aggregateRating` eller `review`. Google kræver mindst én af disse for at vise rich results for Software Apps.

**Årsag i koden** (SlotCatalogPage.tsx linje 816): `aggregateRating` tilføjes KUN når slotten har `bonus_count > 0` OG `highest_x > 0`. Slots uden community-data (ingen bonusser tracket) får ingen rating — og dermed fejlen.

**Er det nødvendigt at fikse?** Ja. Uden fix viser Google aldrig rich results (stjerner) for disse 422 slots, og validation errors kan signalere lav datakvalitet.

### Løsning

Tilføj en statisk `review` som fallback på slots der mangler `aggregateRating`. Reviewet baseres på RTP-data (som vi har for næsten alle slots):

- Slots med `aggregateRating` → beholder den (ingen ændring)
- Slots UDEN `aggregateRating` → får en redaktionel `review` med rating baseret på RTP:
  - RTP ≥ 96.5% → 4.5/5
  - RTP ≥ 96% → 4/5  
  - RTP ≥ 95% → 3.5/5
  - RTP < 95% eller ukendt → 3/5

**Ændringer:**

1. `**src/pages/SlotCatalogPage.tsx**` — I SoftwareApplication-blokken (linje 816-824): Tilføj `review` property som fallback når `hasRating` er false. Reviewet bruger `@type: Review` med author "Casinoaftaler Redaktionen" og en RTP-baseret rating.
2. `**src/lib/slotCatalogSchema.ts**` — Samme fallback-logik for slot-database-sidens ItemList schema (påvirker `/slot-katalog` oversigten).

Dette fikser alle 422 validation errors og gør ALLE slot-sider eligible for rich results.  
  
  
Men hvorfor kun de 422? Hvorfor ikke på ALLE slots vi har?