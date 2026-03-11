

## Ændring: Fjern domænenavnet fra sidetitler

**Problem:** Google viser "Casinoaftaler.dk:" i titlen. Du er blevet bedt om at domænenavnet (.dk) IKKE må fremgå af titlen.

**Nuværende setup:**
- `SITE_BRAND = "Casinoaftaler.dk"` → alle sider får `| Casinoaftaler.dk` tilføjet
- `index.html` fallback: `"Casinoaftaler.dk - De bedste Online Casinoer 2026"`
- `formatTitle()` i SEO.tsx stripper og gentilføjer brandet

**Ændringer:**

1. **`src/lib/seo.ts`** — Ændr `SITE_BRAND` fra `"Casinoaftaler.dk"` til `"Casinoaftaler"`

2. **`index.html`** — Ændr fallback title fra `"Casinoaftaler.dk - De bedste Online Casinoer 2026"` til `"De bedste Online Casinoer 2026 | Casinoaftaler"`

3. **`src/components/SEO.tsx`** — Opdater regex i `formatTitle` så den også matcher den nye variant uden `.dk`

Alle 200+ siders titler vil automatisk skifte til `| Casinoaftaler` i stedet for `| Casinoaftaler.dk`.

