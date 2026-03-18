
Mål
- Beholde community som en bevidst vækstmotor i Google.
- Lade `/community/rewards` være uændret som du ønsker.
- Få `/live-casino` til at stå stærkere uden at svække community-siderne.

Hvad jeg kan se i koden nu
- Community er allerede tiltænkt som indexerbar trafikmotor:
  - `seoRoutes.ts` indeholder `/community`, `/community/turneringer`, `/community/slots`, `/highlights`, `/bonus-hunt`, `/slot-database`, m.fl.
  - mange sider bruger `CommunitySeoSections`, `CommunitySeoBridge`, `CommunityNav` og entity-autolinks, så community sender allerede interne signaler.
- Men der er en vigtig crawl-konflikt:
  - `public/robots.txt` disallow’er `/community/slots/` og `/community/spin-the-reel`
  - samtidig er `/community/slots` en vigtig SEO-side i `seoRoutes.ts`
  - det forklarer godt, hvorfor nogle community-URL’er ikke performer/vises så rent som forventet.
- `/community/rewards` er aktivt promoveret mange steder:
  - i community hub
  - i nav
  - i relaterede guider
  - i bonus/free spins-indhold
  - så hvis den skal være “uændret”, lader vi den stå som nu.
- `/live-casino` findes korrekt som højprioritets-side:
  - `priority: 0.9` i `seoRoutes.ts`
  - stærk SEO-side med schema og langt indhold
  - men `lastmod` er ældre end flere nyere money/community-sider
  - derfor ligner problemet mere “signalstyrke + friskhed” end manglende teknisk opsætning.

Min vurdering
- Du har ret i, at community ikke bare er “støj” her; det er en reel top-of-funnel og brand/trafikkanal fra Twitch/YouTube.
- Derfor bør vi ikke lave bred deindex af community.
- Den rigtige retning er i stedet:
  1. fjerne crawl-konflikter for de community-sider, der faktisk skal kunne vinde i Google
  2. holde rewards som den er
  3. løfte `/live-casino` med både interne signaler og side-forbedringer

Plan
1. Ryd crawl-signaler op uden at ændre strategien
- Gennemgå `robots.txt` og justere kun de ruter, der i praksis skal være synlige og crawlbare.
- Særligt afstemme:
  - `/community/slots`
  - evt. under-sider under spillehallen hvis de skal kunne opdages
  - `/community/spin-the-reel` hvis den fortsat skal være blokeret eller ej
- Målet er, at robots, sitemap og indexeringsstrategi peger i samme retning.

2. Bevar community som indeksérbar vækstmotor
- Lade de vigtige community hubs forblive i sitemap og indeks:
  - `/community`
  - `/community/slots`
  - `/community/turneringer`
  - `/community/hall-of-fame`
  - `/highlights`
  - `/bonus-hunt`
  - `/bonus-hunt/arkiv`
  - `/slot-database`
  - `/statistik` hvis den også er tænkt som SEO-side
- Lade `/community/rewards` være uændret, som du har valgt.

3. Styrk `/live-casino` med interne signaler
- Tilføje eller forstærke synlige interne links til `/live-casino` fra relevante stærke sider:
  - forside eller centrale money-hubs
  - relevante casino-anmeldelser med live casino fokus
  - guides om spiludviklere / Evolution / bordspil
  - relevante community-/data-sider hvor live casino er naturligt
- Målet er at gøre `/live-casino` mere central i sitets interne hierarki.

4. Giv `/live-casino` et målrettet indholdsløft
- Opdatere titel/description hvis nødvendigt for stærkere SERP-positionering.
- Opdatere freshness-signaler (`lastmod` og evt. sideindhold).
- Tilføje tydeligere sektioner, der matcher høj-intent søgninger som:
  - bedste live casinoer
  - live blackjack / roulette / baccarat
  - live casino bonusser
  - danske live casino udbydere
- Målet er at gøre siden mere konkurrencedygtig som hub, ikke bare korrekt indekserbar.

5. Finjustere sitemap-prioritet efter forretningsværdi
- Beholde community-sider i sitemap.
- Overveje at hæve prioritet på de community-ruter, der reelt driver tidlig vækst.
- Sikre at `/live-casino` fortsat står som klar kerne-side blandt de vigtigste money-pages.

Forventet effekt
- Community bevares som SEO- og trafikkilde, i tråd med din strategi.
- Rewards røres ikke.
- `/live-casino` får stærkere crawl-, link- og freshness-signaler og dermed bedre chance for at “vinde” tydeligere i Google.
- Vi undgår den forkerte løsning, hvor man afindekserer community og dermed svækker den kanal, der faktisk allerede leverer tidlig traction.

Teknisk fokus ved implementering
- `public/robots.txt`
- `src/lib/seoRoutes.ts`
- relevante hub-/money-sider med interne links til `/live-casino`
- eventuelt `RelatedGuides`, community bridge-komponenter og udvalgte sider med naturlig live-casino relevans

Konklusion
- Jeg vil ikke anbefale at nedprioritere community generelt.
- Jeg vil anbefale en selektiv SEO-oprydning:
  - behold community-strategien
  - ret crawl-konflikter
  - løft `/live-casino` aktivt
  - lad `/community/rewards` stå uændret
