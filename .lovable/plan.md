
Mål
- Få Google til tydeligere at prioritere de vigtigste bonus-sider i stedet for at behandle dem som “sekundære”.
- Acceptere at målet ikke er, at alle sider skal vises ofte i Google; målet er at de rigtige sider vises for de rigtige søgninger.
- Beholde de interne links som aktivt signal, men gøre signalerne skarpere og mindre tvetydige.

Hvad koden fortæller nu
- Bonus-clusteret er vigtigt i arkitekturen, men signalerne er blandede:
  - `/casino-bonus` er hub i `seoRoutes.ts`
  - flere vigtige bonus-spokes ligger fladt som `/velkomstbonus`, `/free-spins`, `/no-sticky-bonus`, osv.
  - `breadcrumbs.ts` prøver at skabe logisk hierarki, men URL-strukturen gør det ikke fysisk tydeligt
  - `_redirects` sender endda flere `/casino-bonus/*`-varianter tilbage til de korte URL’er
- Det betyder ikke, at siderne ikke kan ranke, men det gør bonus-clusteret mindre entydigt end fx `/live-casino/*`.

Svar på dit SEO-spørgsmål
- Nej, målet er ikke nødvendigvis at “alle sider vises på Google” hele tiden.
- Målet er:
  1. at alle vigtige sider kan crawles og indekseres
  2. at Google forstår hvilke sider der er vigtigst
  3. at hver side har sin egen tydelige søgeintention
- Hvis Google ikke viser en side ofte, betyder det ikke at interne links er værdiløse. De hjælper stadig med:
  - crawling og discovery
  - autoritetsflow
  - forståelse af clusteret
- Men interne links alene er ikke nok, hvis Google oplever:
  - overlap med hubben
  - svag unik værdi
  - uklart hierarki
  - utilstrækkelig SERP-relevans

Anbefalet retning
1. Prioritér bonus-siderne som et “must-win cluster”
- Udpeg de sider som absolut skal vinde:
  - `/casino-bonus`
  - `/velkomstbonus`
  - `/free-spins`
  - `/bonus-uden-indbetaling`
  - `/no-sticky-bonus`
  - `/sticky-bonus`
  - `/cashback-bonus`
  - `/reload-bonus`
- Alt andet i clusteret skal støtte disse, ikke konkurrere med dem.

2. Reducér kannibalisering i bonus-clusteret
- Gennemgå om nogle sider overlapper for meget i intent, title, H1, intro og ankertekster.
- Skær tydeligere forskel mellem hub og spokes:
  - hub = bred sammenligning og overblik
  - spoke = dyb, unik nicheintention
- Hvis enkelte sider er for tæt på hinanden, skal de enten differentieres hårdere eller konsolideres.

3. Gør de vigtigste bonus-spokes mere unikke
- Hver vigtig side skal have noget, som hubben ikke har:
  - egne modeller
  - egne tabeller
  - egne cases
  - egne FAQ’er
  - tydelig “hvorfor denne side findes”
- Det er især vigtigt for sider som `/no-sticky-bonus`, `/sticky-bonus`, `/cashback-bonus`, `/reload-bonus`.

4. Skærp de interne signaler til bonus-siderne
- Øg kontekstuelle links ind til de vigtigste bonus-spokes fra:
  - forsiden
  - relevante anmeldelser
  - betalingssider
  - nye casinoer
  - live casino / slots hvor det giver mening
  - nyhedsartikler
- Brug mere præcise ankertekster, så Google får stærkere intent-signaler.

5. Løft freshness og prioritet på de vigtigste bonus-sider
- Brug eksisterende freshness-mønster konsekvent:
  - opdater `lastmod` i `seoRoutes.ts`
  - synk synlige “opdateret”-signaler på siderne
  - sørg for at de vigtigste bonussider får reelle redaktionelle opdateringer
- Det hjælper især på sider, der allerede er indekseret men ikke bliver fremhævet.

6. Beslut URL-strategien for bonus-clusteret
- Den store strukturelle mulighed er at flytte bonus-spokes under `/casino-bonus/*`.
- Det er ikke første ting jeg ville gøre alene for ranking, men det er den rigtige langsigtede løsning hvis du vil have:
  - stærkere cluster-clarity
  - mere konsekvent site-arkitektur
  - mere entydig parent-child forståelse
- Hvis vi gør det, skal det være som en fuld migrering, ikke halvt.

Foreslået implementeringsrækkefølge
1. Auditér bonus-clusteret for overlap, titles, H1’er, canonicals og ankertekster.
2. Styrk de vigtigste bonus-sider med mere unik værdi og tydeligere intent.
3. Forstærk interne links til de udvalgte “must-win” sider.
4. Opdater freshness-signaler systematisk.
5. Vurdér derefter om URL-migrering til `/casino-bonus/*` skal være fase 2.

Teknisk fokus ved implementering
- `src/lib/seoRoutes.ts`
- `src/lib/breadcrumbs.ts`
- `public/_redirects`
- `src/components/header/navData.ts`
- bonus-siderne selv (`CasinoBonus`, `Velkomstbonus`, `FreeSpins`, `NoStickyBonus`, `StickyBonus`, `CashbackBonus`, `ReloadBonus`)
- komponenter der allerede sender link equity ind i bonus-clusteret

Forventet effekt
- Google får skarpere signal om hvilke bonus-sider der er vigtigst.
- De interne links får større effekt, fordi de peger ind i et mere tydeligt og differentieret cluster.
- Risikoen falder for, at Google bare vælger hubben eller ignorerer spokes som “mindre vigtige”.
- Du går fra “mange sider findes” til “de rigtige sider bliver prioriteret”.

Min klare anbefaling
- Nej, vi skal ikke optimere for at alle sider nødvendigvis bliver vist bredt i Google.
- Ja, vi skal optimere for at alle vigtige sider bliver opfattet som uundværlige i deres cluster.
- Det rigtige næste skridt er en målrettet bonus-cluster-oprydning med fokus på:
  - prioritering
  - differentiering
  - interne signaler
  - freshness
  - og derefter eventuel URL-migrering.

<lov-actions>
<lov-suggestion message="Test de vigtigste bonus-sider end-to-end i preview og gennemgå deres titles, H1, breadcrumbs og interne links manuelt.">Verify that it works</lov-suggestion>
<lov-suggestion message="Lav en fuld bonus-cluster audit og implementér ændringer, så de vigtigste bonus-sider får tydeligere unik intent, stærkere interne links og bedre freshness-signaler.">Audit bonus-clusteret</lov-suggestion>
<lov-suggestion message="Migrér de vigtigste bonus-sider til en samlet /casino-bonus/* URL-struktur med 301 redirects, opdaterede canonicals, breadcrumbs og interne links.">Flyt bonus-sider under /casino-bonus</lov-suggestion>
<lov-suggestion message="Forstærk de interne links til de vigtigste bonus money pages fra forsiden, anmeldelser, betalingsmetoder og nyhedsartikler med mere præcise ankertekster.">Styrk interne links</lov-suggestion>
<lov-suggestion message="Opdater de vigtigste bonus-sider med nye tabeller, cases, FAQ’er og freshness-signaler, så Google tydeligere ser dem som unikke og vigtige sider.">Løft bonus-indholdet</lov-suggestion>
</lov-actions>
