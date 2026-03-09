## Plan: Tilføj forfatter-metadata og header-sektion til alle 1.400 slot-katalogsider

### Problemet

Slot-katalogsiderne (`/slot-katalog/:slug`) mangler forfatter-info og følger ikke samme skabelon som guide-siderne (`/casinospil/spillemaskiner/:slug`). De har ingen `AuthorMetaBar`, ingen header-sektion med badge/beskrivelse, og ingen `AuthorBio` i bunden.

### Løsning

Opdatere `SlotCatalogPage.tsx` til at inkludere:

1. **Header-sektion** (uden hero-billede):
  - Badge øverst (fx "Slot Data" med ikon)
  - Stort H1 med slot-navn
  - Kort beskrivende undertekst (provider, RTP, volatilitet)
2. **AuthorMetaBar** under headeren:
  - Forfatter: "redaktionen" (da disse er auto-genererede datasider, ikke personlige artikler)
  - Inkluderer indholdsfortegnelse, affiliate-disclaimer, læsetid
3. **AuthorBio** i bunden af siden:
  - Samme `author="redaktionen"` for konsistens

### Tekniske ændringer

**Fil: `src/pages/SlotCatalogPage.tsx**`

- Importere `AuthorMetaBar` og `AuthorBio`
- Erstatte den nuværende simple header med en stilet header-sektion med `Badge` og beskrivelse (matcher guide-sidernes layout-mønster)
- Tilføje `<AuthorMetaBar author="redaktionen" />` efter headeren
- Tilføje `<AuthorBio author="redaktionen" />` før "Udforsk Mere"-sektionen
- Beholde alt eksisterende indhold (stats grid, FAQ, lignende slots, etc.) (ALLE DISSE skal også indeholde samme format/layout/struktur, som vi ellers gør på siderne. Tag udgangspunkt i sweet bonanza som du lige har set. 

Ingen ændringer i layout eller design på andre sider. Ingen hero-billede.