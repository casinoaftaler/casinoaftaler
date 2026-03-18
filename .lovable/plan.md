
Målet er klart: vi skal lave en fuld oprydning, ikke flere punktfixes. Min analyse af koden viser, at sitet stadig ikke er enterprise-clean, men vi kan lukke det systematisk.

1. Guardrail skal fixes først
- Udvid `scripts/seo-guardrails.mjs`, så den også fanger:
  - `AuthorMetaBar date="..."`
  - `buildArticleSchema({ dateModified: "..." })`
  - literal datoer i objektfelter, ikke kun `<SEO ... dateModified="...">`
- Behold tilladte dynamiske patterns for ægte datakilder:
  - `article.updated_at`
  - `slot.updated_at`
  - `pageMeta?.updated_at`
  - andre eksplicit godkendte runtime-kilder
- Gør scriptet mere præcist, så kommentarer/docs ikke giver falske positiver.

2. Fjern alle legacy freshness-signaler i pages
Der er stadig meget store rester:
- ca. 830 `AuthorMetaBar date=...` forekomster
- ca. 830 literal `dateModified: "..."` forekomster
- konkrete problemfiler fundet i audit:
  - `src/pages/CasinoNyheder.tsx`
  - `src/pages/slots/BonusBuysGuide.tsx`
  - `src/pages/FreeSpinsIDag.tsx`
  - mange review-, slot-, casino-, roulette-, poker- og guide-sider
Plan:
- fjern alle legacy `date` props fra `AuthorMetaBar`
- fjern alle hardcodede `dateModified` literals fra `buildArticleSchema`
- lad statiske sider arve dato fra central route metadata
- behold kun `datePublished` hvor det giver mening redaktionelt

3. Ryd templates helt op
High-impact templates er næsten rigtige, men skal gøres helt rene:
- `ProviderPageTemplate.tsx`
  - fjerne død legacy-prop `updatedDate`
- `PaymentMethodPageTemplate.tsx`
- `ComparisonPageTemplate.tsx`
Bekræft efterfølgende, at template-baserede sider ikke længere kan injicere legacy dato-signaler.

4. Formalisér dynamiske undtagelser
Der er legitime datadrevne sider, som ikke må behandles som statiske:
- `CasinoNyhedArticle.tsx`
- `SlotCatalogPage.tsx`
- `MarketIntelligence.tsx`
- `CasinoNyheder.tsx`
- `SlotDatabase.tsx`
- evt. `FreeSpinsIDag.tsx`
Her vil jeg:
- bruge kun reelle backend-datoer som source of truth
- fjerne fallback til “nu/today/currentDate” hvor det er kosmetisk freshness
- indføre én tydelig godkendt pattern for dynamiske sider, så guardrails accepterer dem bevidst

5. Luk mismatch mellem UI, schema og sitemap
Jeg fandt konkret desync:
- `public/sitemap.xml` er stale ift. `seoRoutes.ts`
- build-plugin i `vite.config.ts` genererer allerede sitemap fra `seoRoutes + page_metadata`
Plan:
- gøre sitemap-flow entydigt
- sikre at statiske sider bruger central route-lastmod
- sikre at dynamiske sider bruger backend-lastmod
- fjerne gamle public-artifacts eller bringe dem i sync, så repo og build ikke siger to forskellige ting

6. Ryd edge cases og skjulte regressions
Jeg vil lave en fuld sweep for:
- `new Date().toISOString().split("T")[0]` brugt som fake freshness
- `getTodayDanish()` brugt som SEO `dateModified`
- hero/UI labels som siger “senest opdateret” ud fra publiceringsdato eller dagsdato i stedet for central/ægte data
- sider med `<SEO>` men uden korrekt central freshness-struktur
- redirects/orphan cases hvor gamle paths stadig ligger i sitemap eller registry

7. Resultatet efter implementering
Når det er gjort, er målet:
- statiske sider: én central dato fra `seoRoutes`
- dynamiske sider: én eksplicit godkendt realtime/backend-dato
- `SEO`, `buildArticleSchema`, `AuthorMetaBar` og sitemap bruger samme logik
- guardrails blokerer alle legacy mønstre fremadrettet
- ingen manuelle freshness-signaler kan snige sig ind igen

Teknisk fokus i implementeringen
- Start med guardrail + undtagelsespolitik
- Derefter batch-migration af pages/templates
- Til sidst sitemap/routemap cleanup og slut-audit
- Jeg vil behandle det som en kodebase-migration, ikke enkeltfiler, så vi får lukket hele klassen af problemer

<lov-actions>
<lov-suggestion message="Test the SEO freshness flow end-to-end after the migration to verify UI dates, JSON-LD, meta tags, and sitemap lastmod all stay synchronized.">Verify that it works</lov-suggestion>
<lov-suggestion message="Implement the full enterprise SEO cleanup now: tighten the guardrails, remove all legacy AuthorMetaBar date props, and eliminate hardcoded dateModified values across the site.">Run full SEO cleanup</lov-suggestion>
<lov-suggestion message="Normalize all dynamic SEO exceptions like news, slot catalog, and market insight pages so they use approved backend-driven freshness patterns only.">Fix dynamic SEO exceptions</lov-suggestion>
<lov-suggestion message="Align sitemap generation, seoRoutes, and page metadata so lastmod is consistent in source code, generated files, and production output.">Sync sitemap and route metadata</lov-suggestion>
</lov-actions>
