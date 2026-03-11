

## Fase 1-3: Komplet SEO Fix Plan

### Fase 1: Kritiske fixes

**1. Tilføj 17 manglende casino brands til `entityMappings.ts`**

Brands i `seoRoutes.ts` som IKKE har en entity mapping:
- Spilleautomaten, Swift Casino, Luna Casino, GetLucky, Mr Vegas, Expekt, Betano, 888 Casino, Royal Casino, Maria Casino, Kapow Casino, One Casino, Casinostuen, PokerStars, bwin, MarathonBet, Stake Casino

Tilføjes i casino brand-sektionen (linje 17-29). **PokerStars** og **bwin** placeres FØR den generiske `poker` entry (linje 114) for at undgå regex-kollision.

**2. Tilføj `Disallow: /casino/` til `robots.txt`**

Tilføjes under hver user-agent blok (Googlebot, Bingbot, wildcard). `/casino/:slug` er en affiliate redirect-rute — skal ikke crawles.

**3. Fix game shows entity destination**

Linje 117 i `entityMappings.ts`: Ændr `href` fra `/live-casino/monopoly-live` til `/live-casino/game-shows`. Monopoly Live har sin egen dedikerede entry — game shows bør linke til den korrekte hub.

**4. Prioritér PokerStars/bwin FØR generisk poker**

PokerStars-entity indsættes i brand-sektionen (linje ~29), så den matcher `\bPokerStars\b` længe før den generiske `\bpoker\b/i` på linje 114 rammer.

### Fase 2: Medium fixes

**5. Fjern deprecated `aggregateRating` fra interface i `seo.ts`**

Linje 180-189: Fjern den deprecated `aggregateRating` parameter fra `buildArticleSchema`-signaturen. Den er allerede ignoreret i logikken og har en `@deprecated` kommentar — ren sletning.

**6. Fjern ubrugt `JONAS_PERSON_ID` export i `seo.ts`**

Linje 98 og 377: Konstanten er defineret men bruges aldrig eksternt (kun 1 fil matcher). Fjern definitionen og `export`-linjen.

**7. Rens phantom `routeLabels` for redirected sider**

`/casinospil/game-shows` er en 301-redirect til `/live-casino/game-shows` — routeLabel-entryen kan evt. beholdes for breadcrumb-formål. Men `FactCheckAdminSection.tsx` refererer stadig til den gamle sti. Ingen kodeændring nødvendig her — redirecten fungerer korrekt.

### Fase 3: Optimering (noteret, ingen kodeændring nu)

- Spred lastmod-datoer: Kræver løbende vedligeholdelse, ikke et enkelt commit.
- Cross-links til Batch 3 ordbogstermer: Kræver content-analyse per term.
- CI-check for route/label konsistens: Udvidelse af eksisterende `check-broken-links.mjs`.

### Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/lib/entityMappings.ts` | +17 casino brands, fix game shows href |
| `public/robots.txt` | +`Disallow: /casino/` i alle user-agent blokke |
| `src/lib/seo.ts` | Fjern deprecated `aggregateRating` param + ubrugt `JONAS_PERSON_ID` |

### Samlet effekt
- **+17 nye auto-link entities** → alle casino brands dækket
- **1 regex-kollision elimineret** (PokerStars vs poker)
- **1 forkert link-destination rettet** (game shows)
- **Crawl budget beskyttet** (affiliate-redirect blokeret)
- **Dead code fjernet** (deprecated interface + ubrugt export)

