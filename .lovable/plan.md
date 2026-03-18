
Status: Der er en lille, konkret build-regression fra sidste ændring, og der er stadig mange resterende legacy-signaler i kodebasen. Næste implementeringsrunde bør derfor ske i denne rækkefølge:

1. Luk de aktuelle build-fejl først
- `src/pages/CasinoNyhedArticle.tsx`
  - genindsæt de manglende imports fra `@/lib/seo`:
    - `SITE_URL`
    - `buildArticleSchema`
    - `buildFaqSchema`
    - `AJSE_SAME_AS`
- `src/pages/FreeSpinsIDag.tsx`
  - genindsæt den manglende import:
    - `AuthorMetaBar` fra `@/components/AuthorMetaBar`

2. Kør en hurtig regression-kontrol på de to filer
- Bekræft at:
  - `CasinoNyhedArticle` igen kan bygge med korrekt schema/FAQ imports
  - `FreeSpinsIDag` renderer uden missing symbol
- Sikr at der ikke er efterladte “halv-migrationer” i imports efter sidste refaktorering

3. Fortsæt den fulde SEO cleanup bagefter
Mine søgninger bekræfter, at audit-fundene stadig er reelle:
- meget store mængder `AuthorMetaBar date="..."`
- meget store mængder `buildArticleSchema({ ... dateModified: "..." })`
Det betyder, at næste pass stadig skal:
- fjerne legacy `date` props på `AuthorMetaBar`
- fjerne hardcodede `dateModified` literals
- lade statiske sider arve fra central route-lastmod
- kun bevare godkendte dynamiske kilder på datadrevne sider

4. Udvid guardrails til de faktiske resterende mønstre
Guardrail skal eksplicit fange:
- `<AuthorMetaBar date="...">`
- `dateModified: "YYYY-..."`
- kunstige freshness-signaler som `new Date()` / “today”-baserede SEO-datoer
Samtidig skal den tillade ægte dynamiske kilder som:
- `article.updated_at`
- `slot.updated_at`
- `pageMeta?.updated_at`

5. Ryd high-impact templates og dynamiske undtagelser færdigt
Fokus efter build-fix:
- `ProviderPageTemplate`
- `PaymentMethodPageTemplate`
- `ComparisonPageTemplate`
- dynamiske sider som `CasinoNyhedArticle`, `CasinoNyheder`, `SlotDatabase`, `MarketIntelligence`, `FreeSpinsIDag`

6. Synkronisér sitemap og central lastmod-logik
Efter kodeoprydningen skal sitemap-flowet verificeres mod den centrale source of truth, så:
- UI-dato
- schema `dateModified`
- meta tags
- sitemap `lastmod`
alle matcher

Kort vurdering:
- Den akutte fejl er simpel: manglende imports i 2 filer.
- Den større enterprise SEO-oprydning er ikke færdig endnu; søgningerne viser tydeligt, at legacy-mønstre stadig findes bredt i projektet.
- Den rigtige næste implementering er derfor: først build-fix, derefter fortsat batch-cleanup af resterende legacy dato-signaler.
