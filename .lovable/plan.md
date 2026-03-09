

## Analyse af admin-panel fejl

### 1. Sitemap Sync Check — 30 uoverensstemmelser

Der er tre typer problemer:

**A) "Mangler i DB" (nye ruter der ikke er tilføjet til page_metadata endnu)**

Disse 9 ruter er for nylig tilføjet til `seoRoutes.ts` men er aldrig blevet indsat i `page_metadata` tabellen:

- `/casino-anmeldelser/bet365-vs-unibet` (0.8)
- `/casino-anmeldelser/leovegas-vs-mr-green` (0.8)
- `/casino-anmeldelser/danske-spil-vs-spilnu` (0.8)
- `/live-casino/game-shows` (0.85)
- `/live-casino/crazy-time` (0.8)
- `/live-casino/dream-catcher` (0.8)
- `/live-casino/deal-or-no-deal` (0.8)
- `/ansvarligt-spil/spillegraenser` (0.7)
- `/ansvarligt-spil/selvudelukkelse-guide` (0.7)
- `/ansvarligt-spil/hjaelpelinjer` (0.7)
- `/vip-program` (0.85)
- `/casino-med-mobilepay` (0.85)

**Årsag:** Når nye ruter tilføjes til `seoRoutes.ts`, bliver de IKKE automatisk indsat i `page_metadata`. Det sker kun manuelt eller via touch-page-dates.

**B) "Priority mismatch" (cornerstone ordbogs-termer)**

Ca. 15 ordbogs-ruter har `priority: 0.7` i koden men `0.75` i databasen. Det skyldes at I på et tidspunkt har opdateret databasen til 0.75 for cornerstone-termer (jf. memory om glossary priority hierarchy), men IKKE opdateret `seoRoutes.ts` tilsvarende.

Berørte ruter: `/ordbog/rtp`, `/ordbog/wagering`, `/ordbog/volatilitet`, `/ordbog/house-edge`, `/ordbog/jackpot`, `/ordbog/rng`, `/ordbog/paylines`, `/ordbog/megaways`, `/ordbog/bankroll-management`, `/ordbog/expected-value`, `/ordbog/varians`, `/ordbog/standard-deviation`, `/ordbog/risk-of-ruin`, `/ordbog/spillicens`, `/ordbog/hit-frequency`

**C) "Orphaned i DB" (rester fra 301-redirects)**

3 ruter eksisterer i `page_metadata` men ikke i `seoRoutes.ts`:
- `/casinospil/game-shows` — 301 redirected til `/live-casino/game-shows`
- `/sitemap` — bevidst udeladt (noindex)
- `/ordbog/free-spins` — 301 redirected til `/free-spins`

Disse bør slettes fra `page_metadata` da de ellers genererer forvirrende sitemap-entries for redirectede URL'er.

---

### 2. Fejl-Logs — 82 "Script error."

Alle 82 fejl er identiske: **"Script error."** fra `window.onerror`. Dette er en browser-sikkerhedsmekanisme — når et script fra et andet domæne kaster en fejl, rapporterer browseren kun "Script error." uden detaljer (CORS-begrænsning).

**Årsag:** URL'erne i loggen peger på `lovableproject.com` preview-domænet med `__lovable_token=...` query strings. Det er Lovable's preview-iframe der kører scripts cross-origin. Disse fejl er **ikke fra produktion** — de stammer fra preview/development sessioner.

**Konklusion:** Disse fejl er harmløse og kan ignoreres eller ryddes. De påvirker ikke produktionssitet.

---

### Plan: Fiks alle 30 sync-issues

**Trin 1: Opdater `seoRoutes.ts` — sæt cornerstone ordbogs-termer til 0.75**

Opdater de ~15 ordbogs-ruter fra `priority: 0.7` til `priority: 0.75` så de matcher databasen. Dette respekterer den bevidste prioriteringsstrategi der allerede er implementeret i DB.

**Trin 2: Indsæt manglende ruter i `page_metadata` via database migration**

INSERT de 12 nye ruter der mangler i databasen med korrekt priority, changefreq og `updated_at = now()`.

**Trin 3: Slet orphaned ruter fra `page_metadata`**

DELETE de 3 ruter der ikke længere eksisterer i koden (`/casinospil/game-shows`, `/sitemap`, `/ordbog/free-spins`).

**Trin 4: Tilføj "Auto-sync" knap i PageMetadataSyncSection**

Tilføj en "Synkronisér nu" knap der automatisk indsætter manglende ruter og sletter orphaned ruter — så dette problem aldrig opstår igen.

**Resultat:** 0 uoverensstemmelser efter fix. Sitemappet og `page_metadata` vil være 100% synkroniseret med `seoRoutes.ts`.

