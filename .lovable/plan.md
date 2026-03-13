## Analyse: Orphan Pages i Slot-kataloget

### Hvad viser Ahrefs?

89 `/slot-katalog/`-sider rapporteres som **"Orphan page (has no incoming internal links)"**. Alle returnerer HTTP 200 og er i `sitemap-slots.xml`, men har 0 indgående interne links ifølge Ahrefs.

### Hvorfor sker det?

1. **SlotDatabase-tabellen er pagineret** (100 slots per side). Ahrefs renderer JS og ser kun side 1 = de første 100 slots. De resterende ~1.360 slots har ingen synlige links.
2. `**slot-directory.html**` (crawl-bridge med ALLE 1.460+ links) eksisterer allerede, men er **kun linket fra `<noscript>`-blokke**. Ahrefs renderer JS, så den ser aldrig `<noscript>`-indhold og opdager derfor aldrig filen.
3. Forsiden viser kun 20 "nyeste slots" via `HomepageLatestSlots`. Provider-hub-siderne viser kun deres egne slots.

### Er det nyt / er det fikset?

Det er **IKKE** en ny fejl og det er **IKKE** relateret til de soft 404-redirects vi lige har tilføjet. Det er den kendte SPA-begrænsning. `slot-directory.html` blev bygget specifikt til at løse det, men den er usynlig for JS-crawlere som Ahrefs.

### SEO-skade?

**Moderat**. Google renderer JS bedre end Ahrefs og vil sandsynligvis finde links via SlotDatabase-tabellen over tid. Men orphan-status forsinker indeksering og signalerer lav prioritet. De 89 sider Ahrefs viser er formentlig bare et sample af de ~1.360 reelle orphans.

### Løsning

Tilføj **synlige** (ikke-noscript) links til `slot-directory.html` på nøglesider, så Ahrefs (og alle crawlere) kan opdage den:

1. **SlotDatabase.tsx** — tilføj en synlig `<a href="/slot-directory.html">` link i bunden af tabellen (ved siden af paginering eller under den)
2. **Footer** — tilføj et link til `/slot-directory.html` i sitefooteren, så det er tilgængeligt fra alle sider
3. **Sitemap.tsx** — tilføj et synligt (ikke-noscript) link til slot-directory.html

Når Ahrefs crawler disse sider, vil den finde `slot-directory.html`, følge alle 1.460+ `<a href="/slot-katalog/...">` links deri, og alle slots vil have mindst 1 intern link → orphan-problemet forsvinder.

**Visuelt**: Linkene tilføjes diskret (lille tekst, muted farve) så de ikke forstyrrer brugeroplevelsen.  
  
Er det nødvendigt at tilføje det, eller skal vi ignorere ahrefs. Man kan sige vores Health score bliver dårligere hos afrehs

&nbsp;