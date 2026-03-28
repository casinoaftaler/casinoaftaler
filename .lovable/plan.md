## Elite Navigationsbar: Design + SEO Analyse og Plan

### Nuværende Status

Sidebaren fungerer og viser 8 kategorier + casino ratings. Men den er visuelt "flat" og mangler flere SEO-muligheder.

### Designforbedringer

**1. Visuelt hierarki og polish**

- Kategori-headers: Tilføj en subtil gradient (brand lilla) i stedet for den nuværende `bg-primary/10`. Gør ikonerne lidt større og brug `rounded-md` baggrund på dem for at skabe et "badge"-look
- Aktiv kategori: Hele kategoriens header får en stærkere visuelt markering (filled gradient) når brugeren er på en side i den kategori, ikke bare den individuelle link
- Links: Tilføj en lille farvet venstre-border på aktive links (`border-l-2 border-primary`) for tydeligt at vise "du er her"
- Casino ratings: Vis en mini-progress bar under ratingen (fx 9.2 ud af 10 som en farvet bar) for at gøre det mere visuelt attraktivt
- Spacing og afrunding: Mere luft mellem kategorier (`space-y-4`), subtile shadow på hover (`shadow-sm`), og smoothere transitions

**2. Casino Ratings Widget**

- Tilføj casino-logoer (vi henter allerede `logo_url`) som små 20x20px ikoner ved siden af navnene
- Nummer hvert casino (#1, #2, #3...) for at signalere ranking
- Top 3 får et subtilt guld/sølv/bronze accent

**3. Responsivt polish**

- Sidebar width øges til `w-[300px]` for bedre læsbarhed
- Tilføj en subtil left-border eller shadow for at adskille sidebar fra content

### SEO-forbedringer

**4. Semantisk HTML**

- Wrap hele sidebar i `<nav aria-label="Sidenavigation">` i stedet for bare `<aside>`
- Brug `<ul>/<li>` for link-lister (korrekt semantik for navigation)
- Tilføj `aria-current="page"` på aktive links

**5. Anti-footprint compliance**

- Sidebaren vises på 160+ sider med identisk output, hvilket er en stor footprint-risiko
- Implementer `useAntiFootprint` til at rotere rækkefølgen af kategorier og links per side
- Casino ratings roterer naturligt fra databasen, men kategorilisten er statisk og bør varieres

**6. Crawl-værdi**

- Alle links er allerede dofollow HTML `<a>` tags, hvilket er korrekt
- Casino ratings-widgetten leverer dynamisk intern linking til anmeldelser fra alle 160+ sider

### Implementeringsplan

**Fil 1: `src/components/ContentSidebar.tsx**`

- Tilføj `<nav>` wrapper med aria-label
- Implementer `useAntiFootprint` rotation på kategori-rækkefølgen
- Tilføj aktiv kategori-detection (match pathname mod kategoriens links)
- Opgraderet visuelt design: gradient headers, active left-border, bedre spacing

**Fil 2: `src/components/SidebarCasinoRatings.tsx**`

- Tilføj casino-logoer (20x20 rounded)
- Tilføj ranking-numre (#1-#10)
- Top 3 guld/sølv/bronze accent
- Rating progress bar

**Fil 3: `src/components/contentSidebarData.ts**`

- Ingen ændringer nødvendige

### Hvad vi IKKE gør (performance)

- Ingen nye dependencies
- Ingen ekstra API-kald (logo_url hentes allerede)
- Ingen JavaScript-tunge animationer
- Anti-footprint bruger eksisterende `useAntiFootprint` hook (ren hash, ingen runtime cost)  
