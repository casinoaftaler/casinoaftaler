

## Plan: 3 nye Ansvarligt Spil spoke-sider (Enterprise SEO)

### Nye sider

1. **`/ansvarligt-spil/spillegraenser`** – Selvtest og grænser (indbetalingsgrænser, tidsgrænser, tabsgrænser, selvtest-værktøjer)
2. **`/ansvarligt-spil/selvudelukkelse-guide`** – Step-by-step guide til alle selvudelukkelsesformer (ROFUS, casinoernes egne værktøjer, midlertidig vs. permanent)
3. **`/ansvarligt-spil/hjaelpelinjer`** – Samlet oversigt over alle danske hjælpemuligheder (StopSpillet, Center for Ludomani, Anonyme Gamblere, kommunale tilbud)

### Krav pr. side (Enterprise SEO standard)
- 7.000+ ord dybdegående indhold
- Unik H2-struktur (ingen template-footprint)
- Article + FAQ JSON-LD schemas, HowTo hvor relevant
- Hero-billede (genbruger eksisterende assets da nye ikke kan genereres)
- AuthorMetaBar (author: "ajse") + AuthorBio
- Fuld intern cross-linking til hele ansvarligt-spil clusteret + money-pages
- RelatedGuides + LatestNewsByCategory
- Dansk lovgivning (BEK 1494, Spilleloven, ROFUS-regler)
- Ingen casino-kort eller affiliate-promovering (compliance)

### Fil-ændringer

**Nye filer (3):**
- `src/pages/ansvarligt-spil/SpillegraenserGuide.tsx`
- `src/pages/ansvarligt-spil/SelvudelukkelseGuide.tsx`
- `src/pages/ansvarligt-spil/HjaelpelinjerGuide.tsx`

**Opdaterede filer (4):**
- `src/App.tsx` – 3 nye lazy imports + `<Route>` entries
- `src/lib/breadcrumbs.ts` – routeLabels + PARENT_OVERRIDES for de 3 nye ruter
- `src/lib/seoRoutes.ts` – 3 nye entries (priority 0.7, changefreq monthly)
- `src/components/RelatedGuides.tsx` – Tilføj de 3 nye sider til ansvarligt-spil cluster-filteret, så de cross-linkes fra eksisterende spoke-sider

**Hub-opdatering:**
- `src/pages/ResponsibleGaming.tsx` – Tilføj links til de 3 nye guides i hub-sektionerne (selvudelukkelse + hjælp sektioner)

**Cross-linking i eksisterende spokes:**
- `src/pages/ansvarligt-spil/RofusGuide.tsx` – Tilføj links til nye sider i grid-sektionen
- `src/pages/ansvarligt-spil/LudomaniGuide.tsx` – Tilføj links til nye sider
- `src/pages/ansvarligt-spil/StopSpilletGuide.tsx` – Tilføj links til nye sider

### Indholdsstruktur (unikt pr. side)

**Spillegrænser** – Layout arketype B (data-tables + selvtest):
- Typer af grænser (indbetalings-, tids-, tabs-, sessions-, nettotabsgrænser)
- Lovkrav i Danmark (BEK 1494, 24-timers afkøling ved forhøjelse)
- Selvtest-spørgsmål (PGSI-baseret)
- Casino-for-casino sammenligning af grænseværktøjer
- Matematiske modeller: EV ved forskellige grænseniveauer

**Selvudelukkelse-guide** – Layout arketype C (step-by-step + HowTo schema):
- ROFUS vs. casinoernes egne værktøjer
- Midlertidig vs. permanent udelukkelse
- Trin-for-trin (MitID, valg, bekræftelse, ophævelse)
- Internationale ordninger (GamStop UK, Spelpaus SE) til kontekst
- Juridiske rettigheder ved overtrædelse

**Hjælpelinjer** – Layout arketype A (ressource-oversigt):
- StopSpillet (telefon, chat, åbningstider)
- Center for Ludomani (behandlingsformer, ventetid)
- Anonyme Gamblere (mødeformat, lokationer)
- Kommunale tilbud (misbrugscentre)
- Pårørende-støtte (særskilt sektion)
- Sammenligningstabel: hvem hjælper med hvad

