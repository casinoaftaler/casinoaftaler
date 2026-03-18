
Mål: implementere præcis de 5 ting i din fase-1 liste uden at bryde den eksisterende SEO-governance.

1. URL-baseret filtrering/paginering på /casino-nyheder
- Erstatte `useState(page)` og `useState(activeCategory)` i `src/pages/CasinoNyheder.tsx` med `useSearchParams`.
- Indføre en fast query-model, fx:
  - `?kategori=bonusser`
  - `?side=2`
- Normalisere ugyldige værdier tilbage til defaults:
  - kategori → `alle`
  - side → `1`
- Bevare noindex-reglen for dybe arkivsider, men gøre den URL-drevet.
- Opdatere pagination-knapper og filterknapper, så de skriver til URL i stedet for kun lokal state.
- Tilføje canonical/noindex-logik for filter/paginationsider:
  - page 1 + kategori=alle → normal index/canonical
  - dybe sider og filtrerede varianter → noindex, follow med selvrefererende canonical eller en strammere canonical-strategi afhængigt af ønsket signal
- Teknisk note: `usePublishedNews` henter i dag kun én pagineret side fra backend og filtrerer kategori client-side. Det er fint for “alle”, men ikke robust for kategori-URL’er. Jeg vil derfor planlægge en lille hook-udvidelse, så kategori kan være en rigtig query-parameter mod databasen, ellers bliver filtrerede URL’er SEO-svage.

2. URL-baseret filtrering/paginering på /slot-database
- Erstatte lokal state for:
  - `searchQuery`
  - `providerFilter`
  - `volatilityFilter`
  - `sortBy`
  - `currentPage`
  med `useSearchParams` i `src/pages/SlotDatabase.tsx`.
- Beholde nuværende query-navnekonvention hvor muligt (`side` findes allerede i hrefs), og udvide med fx:
  - `?q=sweet`
  - `?provider=pragmatic-play`
  - `?volatility=high`
  - `?sort=highest_x`
  - `?side=3`
- Lave stabil parsing/serialisering:
  - tom/default values fjernes fra URL
  - ugyldige values falder tilbage til defaults
- Pagination-links skal være ægte crawlbare links uden `preventDefault`-afhængighed som primær SEO-sti.
- SEO-regler for disse URL’er:
  - standardhub indexérbar
  - søgninger og dybe filterkombinationer typisk `noindex,follow`
  - evt. få whitelistede filterkombinationer kan senere gøres indexérbare
- Teknisk note: siden har allerede delvis crawl-bridge (`slot-directory.html`) og query-hrefs, men state og rendering er stadig ikke URL-source-of-truth. Det bliver rettet konsekvent.

3. Canonical/noindex-regler for filter- og pagination-sider
- Udvide den centrale SEO-logik, ikke sprede regler ud lokalt.
- Lave en lille hjælpefunktion/regelmodul til hub-state SEO for:
  - `/casino-nyheder`
  - `/slot-database`
- Beslutningsmatrix:
  - default state → index
  - side > threshold → noindex
  - intern søgning → noindex
  - tunge filterkombinationer → noindex
  - evt. enkelte strategiske URL-tilstande kan whitelistes senere
- Sikre at det spiller korrekt med eksisterende `SEO.tsx`, som allerede håndterer noindex/canonical stabilt.

4. Intern linking skal skærpes mod money pages
- Udvide `src/components/RelatedGuides.tsx` mere aggressivt for de vigtigste hubs:
  - `/casino-nyheder`
  - `/slot-database`
  - review pages
  - bonus/payment/provider/game clusters
- Fokus: flere eksplicitte money-page destinationer tidligt i arrays, mindre “blød” fallback-mix.
- Konkrete kandidater der allerede er stærke og bør prioriteres endnu hårdere:
  - `/top-10-casino-online`
  - `/casino-bonus`
  - `/velkomstbonus`
  - `/free-spins-i-dag`
  - `/nye-casinoer`
  - `/casino-anmeldelser`
  - `/casino-med-mobilepay`
  - `/vip-program`
- For review pages kan `CasinoLatestNews` beholdes, men guideblokken efterfølgende skal vægte konverterende destinationssider hårdere.
- Jeg vil også bruge eksisterende `newsInternalLinks.ts` som mønster for mere kontrollerede “strategic links” i relevante templates.

5. Cannibalization map – hård kortlægning
- Lave et centralt kortlægningsmodul for primære query-clusters og canonical vinder-URL’er.
- Starte med de clusters du specifikt bad om:
  - bonus
  - casino / review / top-lister
  - provider
  - slot
- Output skal bruges operativt i koden:
  - hvilke sider skal have stærkere interne links
  - hvilke sider skal have nedtonede anchors
  - hvilke pages skal undgå overlap i titles/metas/H1
  - hvilke legacy/sekundære pages evt. skal canonicaliseres/noindexes senere
- Jeg forventer at lægge det som en central config-fil, så det ikke bare bliver dokumentation men faktisk styringsgrundlag.

6. Aggressivere CTR-titler og metas på topsider
- Første bølge: direkte optimering af de vigtigste pages jeg allerede har fundet:
  - `src/pages/TopCasinoOnline.tsx`
  - `src/pages/CasinoAnmeldelser.tsx`
  - `src/pages/NyeCasinoer.tsx`
  - `src/pages/CasinoBonus.tsx`
  - `src/pages/CasinoNyheder.tsx`
  - `src/pages/SlotDatabase.tsx`
- Målet er mindre generisk “guide”-sprog og mere SERP-vindende vinkling:
  - tydelig benefit
  - trust-signal
  - sammenligningssignal
  - dansk intent
- Jeg vil samtidig sikre, at titles stadig passer gennem `SEO.tsx` truncation-reglerne, så vi ikke optimerer noget som bagefter bliver skåret forkert.

7. Underlinkede programmatic sider: find, styrk eller nedprioritér
- Der findes endnu ikke en egentlig sitewide audit-komponent for underlinkede programmatic pages; kun delvise systemer (`slot-directory.html`, `page_metadata` sync, breadcrumbs overrides).
- Plan:
  - identificere programmatic families først:
    - `/slot-katalog/*`
    - provider-relaterede programmatic oversigter
    - evt. news/article relationer hvor relevant
  - oprette en central “priority buckets” liste:
    - styrk: sider med kommerciel/semantisk værdi
    - neutral: behold men giv standard-links
    - nedprioritér: sider uden tydelig værdi får mindre intern equity eller senere noindex-kandidatur
- Første implementerbare skridt nu:
  - styrke linkflow fra `RelatedGuides`, slot hub, provider hubs og news/article linkmoduler til prioriterede programmatic sider
  - definere hvilke underlinkede programmatic sider ikke skal have ekstra støtte

8. Ekstra vigtig oprydning jeg vil tage med i samme omgang
- Fjerne eller reducere kosmetisk “freshness” fra `getDanishMonthYear()`-mønstre på top-money pages hvor det giver unødig churn-signalisering i UI/ItemList-navne.
- Det findes i hvert fald i:
  - `src/pages/TopCasinoOnline.tsx`
  - `src/pages/NyeCasinoer.tsx`
- Det er ikke direkte i conflict med meta-governance, men det er et klart enterprise-SEO oprydningspunkt.

9. Implementeringsrækkefølge
- Trin 1: URL-state + SEO-regler for `/casino-nyheder`
- Trin 2: URL-state + SEO-regler for `/slot-database`
- Trin 3: central cannibalization map/config
- Trin 4: skærpet internal linking via `RelatedGuides` + evt. link helper configs
- Trin 5: CTR rewrite af top-siders titles/metas
- Trin 6: styrk/nedprioritér programmatic pages via central prioritering

10. Forventet effekt
- Crawlbare hub-states i stedet for skjulte client states
- mindre intern intent-kollision
- mere PageRank mod money pages
- bedre SERP-CTR på vigtigste landingssider
- mere kontrolleret behandling af programmatic inventory i stedet for “alt lige vigtigt”

Tekniske detaljer
- Berørte hovedfiler:
  - `src/pages/CasinoNyheder.tsx`
  - `src/pages/SlotDatabase.tsx`
  - `src/components/RelatedGuides.tsx`
  - `src/hooks/useCasinoNews.ts`
  - `src/pages/TopCasinoOnline.tsx`
  - `src/pages/CasinoAnmeldelser.tsx`
  - `src/pages/NyeCasinoer.tsx`
  - `src/pages/CasinoBonus.tsx`
  - mulig ny central config til cannibalization + hub-state SEO rules
- Eksisterende governance jeg vil bygge ovenpå, ikke erstatte:
  - `src/components/SEO.tsx`
  - `src/lib/seo.ts`
  - `src/lib/seoDatePolicy.js`
  - `src/lib/seoRoutes.ts`
  - `src/lib/entityAutoLinker.ts`
  - `src/lib/newsInternalLinks.ts`

<lov-actions>
<lov-suggestion message="Test de nye URL-baserede filtre og pagination end-to-end på både /casino-nyheder og /slot-database, og bekræft at canonical/noindex opfører sig korrekt.">Verify that it works</lov-suggestion>
<lov-suggestion message="Implementér fase 1 nu: flyt filter/pagination state til URL’er på /casino-nyheder og /slot-database med klare canonical/noindex-regler.">Implementér URL-state nu</lov-suggestion>
<lov-suggestion message="Skærp intern linking endnu mere mod money pages via RelatedGuides og strategiske linkmoduler, så /top-10-casino-online, /casino-bonus, /nye-casinoer og /casino-anmeldelser får mere equity.">Skærp intern linking</lov-suggestion>
<lov-suggestion message="Lav en central cannibalization map for bonus-, casino-, provider- og slot-clusters og brug den aktivt til at styre titles, links og prioritering.">Lav cannibalization map</lov-suggestion>
<lov-suggestion message="Optimér titles og meta descriptions på top-siderne mere aggressivt for CTR med fokus på benefit, trust og dansk intent uden at bryde title-længde-reglerne.">Optimér CTR-metadata</lov-suggestion>
</lov-actions>
