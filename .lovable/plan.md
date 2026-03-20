
# Plan: Optimer /pragmatic-play-partner + Fix logo i light mode

## Logo-problem (alle filer)

Logoet er en transparent PNG med hvid/lys farve. I light mode skal det have `brightness-0` for at blive synligt sort. Problematisk fil:

**`src/pages/PragmaticPlayPartner.tsx` linje 153:**
- Nuværende: `dark:brightness-0 dark:invert` — gør det mørkt i dark mode, USYNLIGT i light mode (omvendt)
- Fix: `brightness-0 dark:brightness-100 dark:filter-none` (som footer/forretningsmodel bruger korrekt)

**Alle andre steder er korrekte:**
- Hero (linje 126): `brightness-0 invert` ✅ (hvid på mørk baggrund)
- Footer (linje 512): `brightness-0 dark:brightness-100 dark:filter-none` ✅
- Forretningsmodel (linje 370): `brightness-0 dark:brightness-100 dark:filter-none` ✅

## Indholdsoptimeringer (kun det der mangler)

### Allerede på plads (IKKE rør):
- ✅ Partnerskabs-bevis med "officielt listet som affiliate-partner" tekst
- ✅ Badges "Verificeret samarbejde" + "Officiel Partner"
- ✅ Micro-trust badges "Verificeret af officiel partner" + "Direkte relation til spiludvikler"
- ✅ Mid-content CTA-blok med 3 links
- ✅ "Bedste Pragmatic Play casinoer" sektion med 6 casinoer

### 1. Opgradér CTA-tekster (CTR boost)
I mid-content CTA-blokken (linje 600-620), ændr anchors:
- "Se bedste Pragmatic Play casinoer" → **"Spil Pragmatic Play slots hos de bedste casinoer (med bonus)"**
- "Få bonus på Pragmatic Play slots" → **"Find casinoer med Pragmatic Play + bonusser"**
- "Spil Pragmatic Play slots med bonus" → **"Hent free spins til Pragmatic Play slots i dag"**

### 2. Autoritetssætning (E-E-A-T boost)
Tilføj efter partnerskabs-bevis sektionen (efter linje 190), en kort autoritetslinje i intro-sektionen:
- "Vi har testet 100+ Pragmatic Play spil og analyseret deres RTP, volatilitet og bonusmekanikker baseret på data fra vores egne tests og hundredvis af bonus hunts."

### 3. Interne links til RTP/volatilitet/bonus buy guides
I sektion 6 (test-metode, linje 415-479), tilføj kontekstuelle links:
- "RTP" → `/ordbog/rtp`
- "volatilitet" → `/ordbog/volatilitet`
- "Bonus Buy" → `/bonus-buy-slots`

Også i sektion 5 (mekanikker, linje 359-409), link "RTP" og "volatilitet" ved relevante nævnelser.

### 4. Udvid "fremadrettet" sektion (linje 844-866)
Tilføj konkrete trends:
- Megaways-varianter af eksisterende titler
- Gamification-elementer og turneringsfunktioner
- Expansion af live casino-studier til nye markeder
- AI-drevet personalisering af spiloplevelsen
- Forventede releases i Q2-Q3 2026

### 5. Ekstra micro-trust statements
I testmetode-sektionen: "Baseret på data fra vores egne tests"
I tekniske standarder: "Analyseret direkte fra Pragmatic Plays dokumentation"

## Filer der ændres

| Fil | Ændring |
|---|---|
| `src/pages/PragmaticPlayPartner.tsx` | Logo CSS fix + CTA-tekst upgrade + autoritetssætning + interne links til ordbog + udvidet fremtidssektion + micro-trust |

## Prioritering
Én fil, fokuserede ændringer, ingen nye moduler.
