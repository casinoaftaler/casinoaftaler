
Mål
- Finde ud af hvorfor `/casinospil/blackjack` ikke ser ud til at blive valgt i Google, selv om mindst én spoke gør.
- Lave en konkret strategi for at gøre blackjack-hubben til clusterets primære side, uden at skade spokes.

Hvad jeg fandt i koden
1. Clusteret er reelt godt bygget op
- Der er en rigtig hub: `src/pages/casinospil/BlackjackGuide.tsx`
- Der er 7 spokes i clusteret:
  - amerikansk-blackjack
  - europaeisk-blackjack
  - double-exposure-blackjack
  - spanish-21
  - martingale
  - fibonacci
  - dalembert
- Hubben linker tydeligt til alle spokes, og mange anmeldelsessider linker også til `/casinospil/blackjack`.

2. Hubben er ikke “teknisk skjult”
- Ruten findes i `src/App.tsx`
- Den er registreret i `src/lib/seoRoutes.ts`
- Der er breadcrumbs-label i `src/lib/breadcrumbs.ts`
- Der er menu-link i `Header.tsx`
- Så problemet ligner ikke manglende crawlbarhed, men prioritering/relevans.

3. Der er flere interne signal-fejl i blackjack-clusteret
Flere spoke-sider bruger gamle alias-paths internt i stedet for de kanoniske paths:
- `DalembertBlackjackGuide` bruger `/casinospil/blackjack/dalembert-system`
- `FibonacciBlackjackGuide` bruger `/casinospil/blackjack/fibonacci-system`
- `MartingaleBlackjackGuide` bruger `/casinospil/blackjack/martingale-system`
- `DoubleExposureBlackjackGuide` bruger `/casinospil/blackjack/double-exposure`
mens de rigtige URL’er i `seoRoutes.ts` og redirects er:
- `/casinospil/blackjack/dalembert`
- `/casinospil/blackjack/fibonacci`
- `/casinospil/blackjack/martingale`
- `/casinospil/blackjack/double-exposure-blackjack`

Hvorfor det er vigtigt
- `RelatedGuides` matcher på præcise paths for unikke cluster-links
- Når `currentPath` er forkert, mister spokes deres skræddersyede relaterede links
- Det svækker clusterets interne arkitektur og hub-signaler

Min diagnose
Det mest sandsynlige er en kombination af disse ting:

A. Hubben er for bred og lidt for “strategi/matematik”-tung i sit hovedsignal
- Title/H1 på hubben er meget analytisk:
  - “Blackjack Strategi & Matematik 2026 – Edge Guide”
- En spoke som “Amerikansk Blackjack” kan være mere præcis for mange søgninger
- Hubben bør tydeligere eje den brede intent: regler, strategi, varianter, online blackjack i Danmark

B. Clusteret har inkonsistente interne URL-signaler
- De gamle alias-paths i spokes gør clusteret mindre rent internt
- Især `RelatedGuides` og dele af news/relevans-flowet bliver mindre præcise

C. Freshness-signalet er svagt sammenlignet med jeres vigtigste money-clusters
- `seoRoutes.ts` for blackjack-hub/spokes står stadig på `2026-03-05`
- Hubben selv viser `dateModified: "2026-03-02"`
- Bonus-clusteret er allerede blevet løftet med nyere freshness-signaler; blackjack er ikke

D. Hub og spokes er ikke skarpt nok differentieret som SERP-roller
- Hub = bred “Blackjack guide”
- Spokes = variant/system
- I dag er hubben stærk, men ikke helt tydelig nok som clusterets “master page”

Konklusion
- Problemet er sandsynligvis ikke “for få interne links”.
- Problemet er snarere:
  1. blandede interne cluster-signaler
  2. svagere freshness
  3. hubben kommunikerer ikke bred intent helt skarpt nok
  4. nogle spokes får stærkere relevans end hubben på grund af mere specifik intent

Plan for løsning

Fase 1 — Ryd op i cluster-signaler
- Ret alle blackjack-spokes til at bruge deres kanoniske `currentPath` / `pagePath`
- Sikr at `RelatedGuides` bruger de rigtige paths, så hver spoke får sine dedikerede cluster-links
- Gennemgå dobbelt/legacy path-brug i hele blackjack-clusteret

Fase 2 — Gør hubben til tydelig primær side
- Skærp title, description og hero-copy på `/casinospil/blackjack`, så siden tydeligere ejer:
  - blackjack regler
  - blackjack strategi
  - online blackjack
  - blackjack varianter
- Behold spoke-siderne som niche-sider, ikke konkurrenter til hubben
- Tilføj et tydeligt “start her”-signal på hubben: regler, varianter, basic strategy, bedste steder at spille

Fase 3 — Differentier hub vs. spokes hårdere
- Hubben skal være oversigt, sammenligning og entry point
- Hver spoke skal have sin egen unikke rolle:
  - Amerikansk = hole card / peek / S17-H17
  - Europæisk = ENHC og regelafvigelser
  - Double Exposure = særvariant
  - Spanish 21 = alternativ regelmodel
  - Martingale/Fibonacci/D’Alembert = betting-system kritik
- Især system-siderne må ikke “stjæle” hubbens brede blackjack-signal

Fase 4 — Løft freshness og prioritet
- Opdater `dateModified` på blackjack-hub og alle centrale spokes
- Synk `seoRoutes.ts`-`lastmod` med siderne
- Løft hub-prioriteten lidt over spokes, så cluster-hierarkiet bliver tydeligere
- Ensret “Opdateret”-signaler i UI og schema

Fase 5 — Forstærk hub-first intern linking
- Tilføj flere tydelige links fra spoke-sider tilbage til hubben med varierede, brede ankertekster
- Forstærk links til hubben fra relevante anmeldelser, live blackjack og overordnede casinospil-sider
- Bevar spokes som destinationssider, men sørg for at hubben modtager mest intern autoritet i clusteret

Fase 6 — Valider blackjack-clusteret som en samlet SEO-enhed
- Kontrollér `seoRoutes.ts`, `breadcrumbs.ts`, `RelatedGuides.tsx`, `Header.tsx` og alle 8 blackjack-filer samlet
- Sikr at clusteret er mere konsistent end i dag, både for Google og brugere

Filer jeg vil fokusere på
- `src/pages/casinospil/BlackjackGuide.tsx`
- `src/pages/casinospil/AmerikanskBlackjackGuide.tsx`
- `src/pages/casinospil/EuropaeiskBlackjackGuide.tsx`
- `src/pages/casinospil/DoubleExposureBlackjackGuide.tsx`
- `src/pages/casinospil/Spanish21Guide.tsx`
- `src/pages/casinospil/MartingaleBlackjackGuide.tsx`
- `src/pages/casinospil/FibonacciBlackjackGuide.tsx`
- `src/pages/casinospil/DalembertBlackjackGuide.tsx`
- `src/components/RelatedGuides.tsx`
- `src/components/LatestNewsByCategory.tsx`
- `src/lib/seoRoutes.ts`

Forventet effekt
- Renere cluster-signaler
- Stærkere hub-vs-spoke hierarki
- Mindre risiko for at Google vælger en spoke som “hovedside” for brede blackjack-søgninger
- Bedre chance for at `/casinospil/blackjack` bliver opfattet som den vigtigste side i blackjack-clusteret
