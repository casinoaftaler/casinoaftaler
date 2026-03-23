

## Plan: Eliminer Template Footprints i Markedspuls-artikler

### Problem
Alle markedspuls-artikler (og potentielt andre auto-genererede nyheder) bruger identisk H2-struktur: "Hvad er ændret" → "Kontekst i dansk marked" → "Konsekvenser for spillerne" → "Top 3 berørte casinoer" → "FAQ" med de samme 3 spørgsmål. Google ser dette som template-genereret indhold.

15 artikler i databasen. 2 markedspuls-artikler har identisk struktur. De øvrige 13 (manuelt oprettede) har varieret struktur — fokus er primært på markedspuls-generatoren.

### Ændringer

#### 1. Omskriv system prompt med variabel struktur (`generate-market-pulse/index.ts`)

**Erstat den faste H2-skabelon** med en pool af 6 strukturvarianter, valgt tilfældigt per kørsel:

```text
Variant A: "De vigtigste ændringer" → "Bag om tallene" → "Spillernes muligheder" → "Casinoer i fokus"
Variant B: "Overblik over ugen" → "Hvad tallene viser" → "Ekspertens perspektiv" → "Hvem er mest berørt"
Variant C: "Nye tendenser" → "Markedsdata i dybden" → "Hvad det betyder for dig" → "Vindere og tabere"
Variant D: "Ugens highlights" → "Analyse af ændringerne" → "Spillerens fordele" → "De mest aktive casinoer"
Variant E: "Hvad sker der lige nu" → "Data og kontekst" → "Konsekvenser i praksis" → "Casinoer der skiller sig ud"
Variant F: "Markedsudvikling" → "Tal og tendenser" → "Sådan påvirker det spillere" → "Fokus på operatørerne"
```

**FAQ-pool**: 12+ mulige spørgsmål, AI vælger 3 per artikel:
- "Hvad betyder disse ændringer?", "Skal jeg skifte casino?", "Er mine penge sikre?", "Hvornår træder ændringerne i kraft?", "Hvilke casinoer er bedst lige nu?", "Hvordan finder jeg det bedste tilbud?", "Er omsætningskravene fair?", "Kan jeg kombinere tilbud?", "Hvad siger Spillemyndigheden?", "Er det sikkert at spille online?", "Hvordan sammenligner jeg bonusser?", "Hvad bør nye spillere gøre?"

#### 2. Deduplikeringskontrol
Før AI-kald: hent seneste markedspuls-artikels titel + H2-headings fra DB. Send til AI'en med instruktion: "Din artikel SKAL bruge en helt anden struktur og vinkel end denne."

#### 3. Fix slug-problemer
- Fjern "markedspuls" fra title inden slugification (undgå `markedspuls-markedspuls-...`)
- Begræns slug til max 50 chars / 5 ord

#### 4. Reducer data-overlap
- Skift lookback fra 4 dage til 72 timer
- Tilføj minimum-check: skip hvis <3 unikke datapunkter vs. seneste artikel

### Filer der ændres
- `supabase/functions/generate-market-pulse/index.ts` — alle ændringer samlet i denne ene fil

### Eksisterende artikler
De 2 identiske markedspuls-artikler i DB har allerede identisk indhold. Disse kan ikke automatisk rettes (de er allerede gemt). Men fremtidige artikler vil aldrig have identisk struktur igen.

