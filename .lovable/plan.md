

## Problem: Dobbelt meta description på ALLE sider

### Årsag
Linje 32 i `index.html` har en hardcoded `<meta name="description">`:

```
"Find de bedste nye casinoer med bonus hos Casinoaftaler. Sammenlign nye casinoer, live casino, free spins og spil ansvarligt med vores uafhængige anmeldelser."
```

Denne tag **forbliver i DOM** samtidig med at `react-helmet-async` (via `<SEO>` komponenten) tilføjer en **anden** `<meta name="description">` per side. Resultatet: **2 meta descriptions på samtlige 160+ sider**.

Google og Ahrefs ser begge tags og kan vælge den forkerte (den generiske) — hvilket skader CTR og unikhed.

### Fix

**Fjern `<meta name="description" ...>` fra `index.html` linje 32.**

`react-helmet-async` håndterer allerede description på **alle** sider via `<SEO>` komponenten. Den hardcodede fallback er overflødig og skaber duplikering.

Det er en ét-linje ændring. Ingen andre filer skal ændres.

