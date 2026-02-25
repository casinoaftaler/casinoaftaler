

# Fix: Scrape-daily-offers timeout-problem

## Problem
`scrape-daily-offers` edge function timeout'er konsekvent fordi den:
1. Scraper 24 casinosider sekventielt (i batches af 5)
2. Korer AI-analyse (Gemini) pa hvert resultat
3. Derefter scraper aggregator-sider
4. Alt dette skal ske inden for edge function timeout (~300 sek)

Funktionen nar aldrig til databaseskrivningen (linje 593+), sa ingen nye data gemmes.

## Losning: Skip aggregator-fase og reducer AI-kald

Da Phase 1 allerede finder 9 kampagner fra direkte scraping, er den mest effektive fix at:

1. **Gor Phase 2 (aggregator) valgfri** - Skip aggregatorer som standard, da direkte scraping allerede dAkker de vigtigste casinoer
2. **Tilf0j tidslimit-check** - Inden hver batch, tjek om der er nok tid tilbage. Hvis ikke, ga direkte til dedup + DB-skrivning med de kampagner der allerede er fundet
3. **Reducer batch-ventetid** - Gor Firecrawl-kald hurtigere med kortere timeout per side

### Tekniske aendringer i `supabase/functions/scrape-daily-offers/index.ts`:

**Aendring 1: Tilf0j tidsgraense-logik (omkring linje 456)**
```text
const START_TIME = Date.now();
const MAX_RUNTIME_MS = 240_000; // 4 min safety margin (edge fn max ~5 min)

function hasTimeLeft() {
  return (Date.now() - START_TIME) < MAX_RUNTIME_MS;
}
```

**Aendring 2: Tjek tid for hver batch (linje 467-490)**
Tilf0j `if (!hasTimeLeft()) break;` for batch-loopet, sa funktionen stopper med at scrape flere sider nar tiden lober ud og gar direkte til dedup + insert.

**Aendring 3: Gor aggregator-fase betinget (linje 495-519)**
Wrap Phase 2 i `if (hasTimeLeft()) { ... }` sa den kun korer hvis der er tid tilovers.

**Aendring 4: Sikr at DB-skrivning altid nar at kore**
Flyt `console.log` og DB-operationer (linje 593-644) sa de altid eksekveres, uanset om alle faser er faerdige.

## Resultat
- Funktionen vil altid na at gemme de kampagner den har fundet, selv hvis den ikke nar alle sider
- "2 dage siden" problemet forsvinder, da `last_checked` opdateres ved hver korrsel
- Ingen risiko for at miste eksisterende data (gammel data slettes forst nar ny data er klar)

