
Mest kort fortalt: problemet er ikke én fejl, men at jeres nye SEO-guardrail nu afslører, at store dele af siden stadig bruger den gamle dato-arkitektur. Derfor fejler buildet.

Sektion: Hvad der konkret er galt
1. Guardrail er for bred
- `scripts/seo-guardrails.mjs` scanner rå tekst med regex på tværs af hele filer.
- Den rammer også dokumentation/kommentarer, fx i `src/lib/seo.ts`:
  `buildArticleSchema({ headline, description, url, datePublished, dateModified })`
- Det er en falsk positiv og betyder, at scriptet skal gøres mere præcist.

2. Der er mange ægte legacy-forekomster
Jeg fandt tre store buckets:
- `buildArticleSchema(... dateModified: "...")` i mange sider
- `<AuthorMetaBar ... date="...">` i meget mange sider
- `<SEO ... dateModified="...">` i en mindre, men stadig vigtig gruppe sider

Eksempler:
- `src/pages/Bet365Anmeldelse.tsx`
- `src/pages/Betalingsmetoder.tsx`
- `src/pages/payments/PaymentMethodPageTemplate.tsx`
- `src/pages/comparisons/ComparisonPageTemplate.tsx`
- mange slot-, blackjack-, live casino-, ansvarligt spil- og anmeldelsessider

3. Der findes også legitime dynamiske undtagelser
Ikke alle `dateModified` skal bare slettes blindt.
Der er mindst to typer sider, hvor datoen kommer fra data:
- `src/pages/CasinoNyhedArticle.tsx` → `dateModified: article.updated_at`
- `src/pages/SlotCatalogPage.tsx` → `dateModified={slot.updated_at?.slice(0, 10)}`
Disse er ikke “forkerte” på samme måde som hardcodede tekst-datoer. De er datadrevne og bør håndteres som tilladte undtagelser eller via en bevidst wrapper/pattern.

Sektion: Min vurdering
Lige nu er arkitekturen rigtig, men migreringen er ikke færdig.
Så status er:
- Strategi: stærk
- Guardrail-idé: rigtig
- Implementering: for tidlig til hard enforcement

Det vil sige: I er tæt på SEO Enterprise-arkitektur, men ikke “færdige”, fordi reglerne endnu ikke matcher hele kodebasen.

Sektion: Hvad vi skal gøre for at fikse det rigtigt
Fase 1 — gør guardrail korrekt først
Vi skal justere `scripts/seo-guardrails.mjs`, så den:
- ignorerer kommentarer og dokumentations-eksempler
- kun flagger egentlige JSX/object-brugsmønstre
- skelner mellem hardcodede literal-datoer og dynamiske DB-datoer
- evt. kun fejler på string literals som:
  - `dateModified: "2026-..."`
  - `dateModified="2026-..."`
  - `date="18-02-2026"`

Hvorfor først?
Fordi ellers kan vi ikke stole på signalet fra buildet.

Fase 2 — migrér alle hardcodede datoer væk
Vi skal systematisk fjerne:
- alle `date` props på `AuthorMetaBar`
- alle hardcodede `dateModified` i `buildArticleSchema`
- alle hardcodede `dateModified` på `<SEO />`

Målet er:
- `SEO.tsx` henter modified-date centralt fra route metadata
- `AuthorMetaBar.tsx` viser dato centralt fra route metadata / backend metadata
- `buildArticleSchema()` bruger route lastmod automatisk, med fallback kun hvor det er nødvendigt

Fase 3 — behold kun bevidste dynamiske undtagelser
For datadrevne sider skal vi vælge én af to modeller:
- A: tillad dynamiske `dateModified` eksplicit i guardrail
- B: lav en tydelig helper/wrapper, fx “dynamic content schema”, så undtagelser er kontrollerede

Jeg vil anbefale:
- statiske sider: ingen manuelle dato-props
- dynamiske CMS/data-sider: eksplicit tilladt mønster

Fase 4 — synkronisér route-registret
Når vi fjerner hardcodede datoer, skal `seoRoutes.ts` være komplet for alle statiske indexable ruter.
Ellers mister siderne deres centrale lastmod.

Sektion: Teknisk plan
1. Revidér guardrail-scriptet
- undgå falske positiver fra kommentarer/docs
- match kun relevante usages
- del reglerne op i:
  - forbidden hardcoded literals
  - allowed dynamic sources
- gør fejl-output mere handlingsklart

2. Kør fuld oprydning på tværs af projektet
- casino-anmeldelser
- betalingssider
- slots
- blackjack/roulette/poker guides
- ansvarligt spil
- nye casinoer
- live casino
- templates

3. Verificér specialcases
- `CasinoNyhedArticle`
- `SlotCatalogPage`
- `MarketIntelligence`
- eventuelle andre DB-/runtime-sider

4. Stram guardrail bagefter
- først når kodebasen er migreret
- derefter må buildet gerne være hårdt enforcing

Sektion: Hvad der sandsynligvis stadig er problemet på casinoaftaler.dk
Ud fra koden er de største resterende enterprise-SEO problemer:
- legacy freshness-signaler findes stadig mange steder
- central route-lastmod er endnu ikke fuldt adopteret sitewide
- guardrail er ikke moden nok til at være den endelige “politi”-mekanisme
- enkelte dynamiske sider mangler sandsynligvis en formel undtagelsesstrategi

Konklusion
Ja, det kan løses helt.
Men den rigtige rækkefølge er:
1. gør guardrail præcis
2. migrér alle legacy datoer væk
3. whitelist kun ægte dynamiske sider
4. stram build enforcement bagefter

Hvis jeg implementerede det nu, ville jeg gøre det som en fuld migrationsrunde, ikke som små enkeltrettelser. Det er den eneste måde at sikre, at det “ikke kan ske igen”.

Tekniske noter
- `src/lib/seo.ts` er ikke den egentlige årsag; den bliver bare fejlagtigt ramt af regex
- `src/pages/payments/PaymentMethodPageTemplate.tsx` og `src/pages/comparisons/ComparisonPageTemplate.tsx` er høj-impact steder, fordi mange undersider arver legacy-mønstret derfra
- `src/pages/CasinoNyhedArticle.tsx` og `src/pages/SlotCatalogPage.tsx` bør behandles som datadrevne særtilfælde, ikke som almindelige statiske sider
- der er sandsynligvis 100+ faktiske `AuthorMetaBar date=` forekomster og mange dusin `buildArticleSchema dateModified:` forekomster, så det bør løses batch-vis, ikke manuelt side for side

<lov-actions>
<lov-suggestion message="Test the SEO date flow end-to-end after the migration to make sure UI dates, meta tags, JSON-LD, and sitemap signals all stay in sync.">Verify that it works</lov-suggestion>
<lov-suggestion message="Implement the full SEO freshness migration now: refine the guardrail script, remove all hardcoded AuthorMetaBar and buildArticleSchema dates, and preserve only approved dynamic exceptions.">Fix all remaining SEO date issues</lov-suggestion>
<lov-suggestion message="Add an automated audit report that groups all remaining SEO guardrail violations by pattern and file type so future cleanups are faster.">Add SEO audit reporting</lov-suggestion>
<lov-suggestion message="Create a controlled allowlist pattern for dynamic content pages like news articles and slot catalog pages so data-driven freshness signals remain valid without weakening the guardrails.">Handle dynamic SEO exceptions</lov-suggestion>
</lov-actions>
