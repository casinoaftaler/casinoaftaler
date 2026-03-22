

## Plan: Fix de 5 største meta description-problemer (Batch 1: 2 af 5)

### De 5 problemer (prioriteret)
1. **Forsiden** (`/`) – 167 tegn, for lang, mangler CTA (SEO 6/10, CTR 5/10)
2. **Casino Anmeldelser** (`/casino-anmeldelser`) – 193 tegn, ALT FOR LANG (SEO 5/10, CTR 4/10)
3. **Top 10 Casino** (`/top-10-casino-online`) – 165 tegn, for lang (SEO 6/10, CTR 5/10)
4. **Betalingsmetoder** (`/betalingsmetoder`) – 168 tegn, for lang (SEO 7/10, CTR 6/10)
5. **Spillemaskiner** (`/casinospil/spillemaskiner`) – 122 tegn, for KORT (SEO 5/10, CTR 4/10)

---

### Batch 1: Forsiden + Casino Anmeldelser

**1. `src/pages/Index.tsx` (linje 128)**

Nuværende (167 tegn):
> "Find de bedste online casinoer med bonus og dansk licens. Sammenlign nye casinoer, live casino, free spins og spil ansvarligt med vores uafhængige anmeldelser."

Ny (148 tegn):
> "Bedste online casinoer i Danmark 2026 – sammenlign bonus, udbetalingstider og licenser. Uafhængige tests med rigtige penge. Se toplisten nu."

**2. `src/pages/CasinoAnmeldelser.tsx` (linje 203 + linje 121)**

Nuværende SEO description (193 tegn):
> "Læs vores dybdegående casino anmeldelser af 29 danske online casinoer. Uafhængige reviews baseret på rigtige penge-tests med fokus på bonusvilkår, udbetalingstider, spiludvalg og sikkerhed."

Ny (152 tegn):
> "29 casino anmeldelser testet med rigtige penge. Sammenlign bonus, udbetalingstider og spiludvalg hos danske casinoer med licens. Se vores ratings."

Opdater også `articleSchema` description (linje 121) til at matche.

---

### Batch 2 (næste runde): Top 10 + Betalingsmetoder + Spillemaskiner

Implementeres efter batch 1 er godkendt.

