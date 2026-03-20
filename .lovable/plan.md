

# Plan: Forstærk Pragmatic Play Partner-siden

## Hvad der allerede er på plads
- Siden eksisterer med ~4000 ord, Article+FAQ JSON-LD, intern linking til money pages og slot-katalog
- Footer linker til `/pragmatic-play-partner`
- entityAutoLinker har `Pragmatic Play` → `/spiludviklere/pragmatic-play`

## Hvad der mangler (punkt for punkt)

### 1. Partnerskabs-bevis sektion (efter hero, før sektion 1)
Ny prominent sektion med:
- Badge "Verificeret samarbejde"
- Pragmatic Play logo
- Klar tekst: "Casinoaftaler.dk er officielt listet som affiliate-partner hos Pragmatic Play"
- Kort forklaring af hvad det betyder
- Micro-copy: "Officiel partner · Direkte relation til spiludvikler · Verificeret samarbejde"

### 2. Stærkere CTA-links til money pages
Tilføj en dedikeret CTA-blok **midt i content** (efter sektion 5 – populære spil) med konverteringsfokuserede anchors:
- "Se bedste Pragmatic Play casinoer" → `/top-10-casino-online`
- "Få bonus på Pragmatic Play slots" → `/casino-bonus`
- "Spil Pragmatic Play slots med bonus" → `/casino-bonus`

Den eksisterende sektion 10 (bunden) beholdes men suppleres med stærkere CTA-tekst.

### 3. Sektion: "Bedste Pragmatic Play casinoer" (ny sektion efter danske casinoer-sektionen)
Udvid den eksisterende sektion 8 med:
- Stærkere intro: "Her er de bedste danske casinoer med det største Pragmatic Play udvalg"
- Kort beskrivelse pr. casino (ikke bare navn + link)
- Primær CTA under listen: "Se alle de bedste online casinoer" → `/top-10-casino-online`

### 4. EntityAutoLinker – ny mapping
I `entityMappings.ts`, tilføj:
```ts
{ patterns: [/\bPragmatic Play partner\b/i, /\bofficiel partner af Pragmatic Play\b/i, /\bPragmatic Play samarbejde\b/i], href: "/pragmatic-play-partner", anchor: "Pragmatic Play partner", anchorVariants: ["Pragmatic Play partner", "officiel Pragmatic Play partner", "Pragmatic Play samarbejde"] }
```

### 5. Intern linking FRA PragmaticPlayGuide.tsx
Tilføj en tydelig "Officiel partner"-sektion højt i `PragmaticPlayGuide.tsx` introContent (efter første paragraph):
- Badge + tekst + link til `/pragmatic-play-partner`
- Anchor: "Læs om vores officielle Pragmatic Play partnerskab"

### 6. Intern linking TILBAGE (allerede delvist på plads)
Siden linker allerede til `/spiludviklere/pragmatic-play`, `/spillemaskiner/pragmatic-play`, slot-katalog sider, og casino-anmeldelser. Bekræftet – ingen ændringer nødvendige her.

### 7. Trust micro-copy
Tilføj badges/micro-copy på flere steder i siden:
- Sektion 4 (testmetode): "Verificeret af officiel partner"
- Sektion 6 (tekniske standarder): "Direkte relation til spiludvikler"
- Sektion 7 (uafhængighed): Allerede stærkt – ingen ændring

## Filer der ændres

| Fil | Ændring |
|---|---|
| `src/pages/PragmaticPlayPartner.tsx` | Ny partnerskabs-bevis sektion, ny CTA-blok midt i content, udvidet casino-sektion, micro-copy badges |
| `src/lib/entityMappings.ts` | Ny mapping for "Pragmatic Play partner" → `/pragmatic-play-partner` |
| `src/pages/PragmaticPlayGuide.tsx` | Ny "Officiel partner" sektion i introContent |

