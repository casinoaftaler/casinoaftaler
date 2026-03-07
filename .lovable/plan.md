

## Dyb Analyse: Casino Ordbog – Links, SEO og Krydsreferencer

### Overordnet Status
Ordbogen har 30 termer med solid intern arkitektur. Men der er flere konkrete huller.

---

### PROBLEM 1: `relatedPages` feltet bruges ALDRIG

Hver glossary-term har et `relatedPages`-array med links til money-pages (f.eks. RTP → "Spillemaskiner med Høj RTP"). **Men `OrdbogTerm.tsx` renderer det aldrig.** Kun `relatedTerms` vises. Det er spildt link-equity og en forpasset SEO-mulighed.

**Fix:** Tilføj en "Relaterede Guides" sektion i `OrdbogTerm.tsx` der renderer `term.relatedPages` som linkede kort – placeret mellem indhold og "Relaterede Begreber".

---

### PROBLEM 2: entityAutoLinker mangler 7 af 30 glossary-termer

Nye termer fra batch 2 der IKKE er i autoLinkeren:
- `gevinstprocent` – ingen pattern
- `minimum-indbetaling` / `minimum indbetaling` – ingen pattern  
- `sticky-bonus-term` / `sticky bonus` – ingen pattern
- `mitid-casino` / `MitID` – ingen pattern
- `progressiv-jackpot` er dækket ✓
- `expanding-wild` er dækket ✓
- `retrigger` er dækket ✓

Termer som "MitID", "sticky bonus", "gevinstprocent" og "minimum indbetaling" nævnes på 93+ sider uden at auto-linke til deres ordbogssider.

**Fix:** Tilføj patterns for de manglende termer i `entityAutoLinker.ts`. "Sticky bonus" skal linke til money-page `/sticky-bonus` (ikke ordbog) da den har en kommerciel modpart. "MitID" kan linke til `/ordbog/mitid-casino`.

---

### PROBLEM 3: Ordbog hub-sidenbeskrivelse siger "15 definitioner" – men der er 30

I `Ordbog.tsx` linje 40: `description: "Komplet ordbog over casinobegreber med 15 definitioner."` – tallet er aldrig opdateret.

**Fix:** Brug dynamisk tælling: `${glossaryTerms.length} definitioner`.

---

### PROBLEM 4: autoLinkEntities bruges KUN på 2 steder

Auto-linkeren kører kun på:
1. `OrdbogTerm.tsx` (glossary term-sider)
2. `CasinoNyhedArticle.tsx` (nyheder fra database)

Den kører **IKKE** på nogen af de 30+ statiske slot-guides, bonus-guides, casino-guides, betalingsmetode-guides osv. Disse sider bruger i stedet manuelle `<Link to="/ordbog/...">` tags – som er fine, men det betyder at hundredvis af sider med tekst om "RTP", "volatilitet", "house edge" osv. der IKKE har manuelle links, aldrig bliver auto-linket.

**Bemærk:** De statiske sider bruger JSX (ikke HTML-strenge), så `autoLinkEntities` kan ikke køre direkte på dem. De slot-guides der manuelt linker til ordbogen (Bonanza, Gates of Olympus, Sweet Bonanza, Book of Dead etc.) gør det korrekt. Men mange andre sider nævner termerne uden link.

**Anbefaling:** Dette er en arkitektonisk begrænsning – auto-linkeren virker kun på HTML-strenge. For statiske JSX-sider skal links tilføjes manuelt. Ingen umiddelbar fix nødvendig, men det bør huskes ved nye sider.

---

### PROBLEM 5: Dobbelt-linking risiko på OrdbogTerm-sider

`OrdbogTerm.tsx` kører `autoLinkEntities()` på `fullContent` – men fullContent indeholder ALLEREDE manuelt indsatte `<a href="/ordbog/...">` links. AutoLinkeren skipper eksisterende `<a>` tags, så der opstår ikke dobbelt-wrapping. **Dette fungerer korrekt** – ingen bug her.

---

### PROBLEM 6: Ordbog hub SEO-schema siger stadig "15 definitioner"

`articleSchema` i `Ordbog.tsx` (linje 39): description hardcodet til "15". Bør være dynamisk.

---

### SAMLET HANDLINGSPLAN

| # | Opgave | Fil(er) | Prioritet |
|---|--------|---------|-----------|
| 1 | Render `relatedPages` på term-sider | `OrdbogTerm.tsx` | Høj |
| 2 | Tilføj 4 manglende termer til autoLinker | `entityAutoLinker.ts` | Høj |
| 3 | Opdater "15" → dynamisk tælling | `Ordbog.tsx` | Medium |
| 4 | Tilføj "sticky bonus" som money-page entity | `entityAutoLinker.ts` | Høj |
| 5 | Tilføj "MitID" som glossary entity | `entityAutoLinker.ts` | Medium |

### Teknisk detalje

**entityAutoLinker.ts** – nye entries:
```text
Money-page (høj prioritet):
- /sticky-bonus: patterns [/\bsticky bonus\b/i]

Glossary (lav prioritet):  
- /ordbog/mitid-casino: patterns [/\bMitID\b/]
- /ordbog/gevinstprocent: patterns [/\bgevinstprocent\b/i, /\bwin rate\b/i]
- /ordbog/minimum-indbetaling: patterns [/\bminimum indbetaling\b/i, /\bmin\.? indbetaling\b/i]
```

