

## Enterprise SEO Audit: 1400+ Slot Catalog Pages

### Kritiske Problemer Identificeret

Sammenlignet med resten af sitets 190+ håndskrevne sider mangler de dynamiske `/slot-katalog/:slug` sider **6 kritiske SEO-elementer** der skaber et tydeligt "template footprint" og svækker crawl-kvalitet:

---

### Problem 1: Identiske H2-overskrifter på tværs af 1400 sider
Alle sider bruger de **præcis samme 7 H2-overskrifter** (kun slot-navn indsættes):
- "RTP & Matematik: [Navn]"
- "Volatilitet & Risikoanalyse"
- "Bonus Hunt Performance: [Navn]"
- "Spiludvikler: [Provider]"
- "Sådan Fungerer [Navn]"
- "Bankroll Management for [Navn]"
- "Ansvarligt Spil"

Google's Helpful Content system kan flagge dette som template-genereret indhold. Alle andre sider roterer H2-varianter.

**Fix:** Opret 3-5 H2-varianter per sektion og rotér baseret på slot-navn hash (samme teknik som affiliate-disclaimer rotationen i AuthorMetaBar).

### Problem 2: Ingen `RelatedGuides` komponent
Alle 190+ andre sider bruger `<RelatedGuides currentPath="..." />` med rotations-logik (offset +2/+5/+8) for at sikre unikke interne link-kombinationer. Slot-catalog siderne har kun en statisk "Udforsk Mere" boks med 4 hardcodede links – identisk på alle 1400 sider.

**Fix:** Tilføj `<RelatedGuides currentPath={`/slot-katalog/${slug}`} />` som alle andre sider gør.

### Problem 3: Ingen entity auto-linking
Brødteksten indeholder mentions af "RTP", "volatilitet", "bonus hunt", "house edge", "RNG", "ROFUS", "Spillemyndigheden" etc. – men ingen af dem auto-linkes til de relevante ordbogstermer eller money-pages. Alle andre siders HTML-indhold kører igennem `autoLinkEntities()`.

**Fix:** Wrap de genererede tekst-afsnit i en komponent der kører `autoLinkEntities()` på HTML-output, eller indsæt manuelle `<Link>` komponenter til de vigtigste entities (RTP → /ordbog/rtp, house edge → /ordbog/house-edge, ROFUS → /ansvarligt-spil, bonus hunt → /bonus-hunt/arkiv, etc.).

### Problem 4: Ingen Article JSON-LD med Person-binding
Alle andre artikelsider bruger `buildArticleSchema()` der genererer Article + Person @graph med author entity stacking (Jonas/Kevin/Ajse). Slot-catalog siderne har kun SoftwareApplication + FAQPage – **ingen Article, ingen Person, ingen author E-E-A-T signal**.

**Fix:** Tilføj `buildArticleSchema()` til JSON-LD @graph sammen med eksisterende SoftwareApplication og FAQPage.

### Problem 5: Manglende H2-variation i indhold
Sektionerne "Sådan Fungerer [Navn]", "Bankroll Management" og "Ansvarligt Spil" genererer **ordret identisk tekst** for slots med samme volatilitet. To high-vol slots fra samme provider vil have næsten identisk indhold → near-duplicate content.

**Fix:** Tilføj provider-specifikke og data-drevne variationer. Brug slot.bonus_count, slot.highest_x, slot.rtp som seeds for at vælge forskellige formuleringer og eksempler.

### Problem 6: Ingen internal links I brødteksten
De 7 indholdsektioner er ren plaintext `<p>` tags. Ingen `<Link>` til:
- `/slot-database` (Slot Database)
- `/bonus-hunt/arkiv` (Bonus Hunt Arkiv)
- `/casinospil/spillemaskiner` (Spillemaskiner hub)
- `/ordbog/rtp`, `/ordbog/house-edge`, `/ordbog/volatilitet`
- `/ansvarligt-spil`, `/ordbog/rng`
- Provider-sider (`/spiludviklere/:slug`)

Alle andre sider har 15-40 interne links. Disse har ~4 statiske links i bunden.

**Fix:** Konvertér text generators til at returnere JSX med `<Link>` elementer i stedet for plain strings, med links til relevante ordbogstermer, hubs og provider-sider.

---

### Implementeringsplan

1. **Roterende H2-overskrifter** – Opret hash-baseret variant-selektion for alle 7 sektioner (3 varianter hver)
2. **JSX med interne links** – Refaktorér alle 7 `generate*()` funktioner fra `string[]` til `ReactNode[]` med embedded `<Link>` til ordbog, hubs og provider-sider
3. **Article + Person JSON-LD** – Tilføj `buildArticleSchema()` til @graph
4. **RelatedGuides** – Tilføj `<RelatedGuides currentPath={...} />` 
5. **Content-variation** – Tilføj data-drevne formuleringer baseret på bonus_count, highest_x, rtp ranges
6. **Fjern statisk "Udforsk Mere" boks** – Erstattet af RelatedGuides

Alt i `src/pages/SlotCatalogPage.tsx`.

