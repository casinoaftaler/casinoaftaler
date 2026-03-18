
Målet er at lukke de sidste “ikke enterprise-clean” huller i én samlet oprydning, i denne rækkefølge:

1. Stram dato-governance uden at blokere legitime dynamiske cases
- Gør `scripts/seo-guardrails.mjs` mere præcis.
- Erstat den nuværende brede `AuthorMetaBar`-regel (`date=` overalt) med literal-fokuserede regler:
  - fang `date="..."`, `date='...'`
  - fang eksplicitte hardcodede datoformater
  - tillad legitime dynamiske udtryk midlertidigt, så guardrailen matcher kravet.
- Behold og udvid reglen for `buildArticleSchema(... dateModified: ...)`, så literals og uautoriserede dynamiske kilder stadig stoppes.

2. Saml dynamic exception policy ét sted
- Lige nu er whitelist-logikken duplikeret i:
  - `src/components/SEO.tsx`
  - `src/lib/seo.ts`
  - `scripts/seo-guardrails.mjs`
- Jeg vil centralisere policyn i én shared utility/konstant, som både runtime og guardrails bruger.
- Godkendte exceptions bliver eksplicit dokumenteret med tilladte sources:
  - `CasinoNyhedArticle` → `article.updated_at`
  - `SlotCatalogPage` → `slot.updated_at` / afledt `slotDateModified`
  - `MarketIntelligence` → `pageMeta?.updated_at ?? getRouteLastmod(...)`
  - `FreeSpinsIDag` → `pageMeta?.updated_at ?? getRouteLastmod(...)`
- Resultat: ingen policy drift mellem build checks og runtime.

3. Luk legacy API-overfladen omkring `AuthorMetaBar`
- Den store migration af usages ser ud til at være lavet, men komponenten accepterer stadig `date?: string`.
- Jeg vil:
  - fjerne eller stærkt begrænse legacy `date` prop i `src/components/AuthorMetaBar.tsx`
  - bevare kun den moderne centraliserede datoopløsning (DB/page metadata → `seoRoutes` fallback)
  - gøre misbrug tydeligt i types/guardrails.
- Så både kode og API matcher den nye arkitektur.

4. Verificér og normalisér alle schema `dateModified`-cases
- De resterende fund er primært legitime:
  - `CasinoNyhedArticle`
  - `SlotCatalogPage`
  - `MarketIntelligence`
  - `FreeSpinsIDag`
  - samt statiske routeLastmod-fallbacks i trust/legal sider.
- Jeg vil gennemgå dem og sikre:
  - statiske sider bruger kun `routeLastmod` / central kilde
  - dynamiske sider bruger kun whitelistede backend-kilder
  - ingen manuelle literals eller “today”-mønstre overlever.
- Acceptance: alle `dateModified` usages kan forklares af policyen.

5. Regenerér sitemap snapshots og gør repo-output sandt
- `public/sitemap.xml` er dokumenteret stale og matcher ikke `seoRoutes.ts`.
- `vite.config.ts` kan allerede generere:
  - `sitemap.xml`
  - `sitemap-priority.xml`
  - `sitemap-slots.xml`
  - `sitemap-articles.xml`
  - `sitemap-index.xml`
- Jeg vil bruge den eksisterende generator som source of truth og sikre, at `public/` faktisk indeholder de friske snapshots.
- Acceptance:
  - ingen stale URL’er som `/nye-casinoer/bedste`
  - `public/sitemap.xml` matcher `seoRoutes.ts`
  - `public/sitemap-index.xml` refererer kun til filer, der faktisk findes.

6. Ryd gammel sitemap-arkitektur op
- Der ligger stadig legacy backend-funktioner som:
  - `supabase/functions/sitemap-slots`
  - `supabase/functions/sitemap-news`
  - `supabase/functions/sitemap-images`
- Hvis build-time sitemap er den nye standard, vil jeg foreslå at:
  - afklare hvilke der stadig bruges
  - slette eller afvikle de obsolete funktioner
  - undgå parallelle sitemap-kilder.
- Det reducerer risiko for modstridende crawl-signaler.

7. Lav en reel coverage-audit for entity linking
- `autoLinkEntities()` bruges kun synligt i:
  - `CasinoNyhedArticle.tsx`
  - `SlotCatalogPage.tsx`
  - `ProviderSlotsHub.tsx`
  - `OrdbogTerm.tsx`
- Jeg vil lave en audit, der svarer på:
  - hvilke sidetyper er dækket
  - hvilke store content-klasser er ikke dækket
  - hvor mappings mangler eller er svage
  - om governance stemmer med money-page prioritering.
- Output skal være en konkret coverage-rapport, ikke bare “funktionen findes”.

8. Afsluttende validering
- Kør hele governance-checket igen efter oprydningen:
  - SEO guardrails skal være grønne
  - sitemap artifacts skal være synkroniserede
  - dynamic exception policy skal være konsistent
  - entity-link coverage skal være dokumenteret.
- Først dér vil jeg kalde det “enterprise-clean”.

Tekniske noter
- Jeg vil ikke ændre jeres grundarkitektur; den er faktisk tæt på rigtig.
- Problemet nu er primært governance-drift:
  - for bred guardrail
  - policy duplikeret flere steder
  - stale sitemap snapshots i repo
  - manglende dokumenteret entity-link coverage
  - legacy sitemap-funktioner, der mudrer ejerskab.
- Den hurtigste sikre vej er derfor:
```text
centraliser policy
→ stram guardrails
→ luk legacy API
→ regenerér sitemaps
→ audit entity linking
→ final validation
```

Forventet slutresultat
- Én sand kilde for statiske datoer
- Én formaliseret whitelist for dynamiske datoer
- Ingen legacy `AuthorMetaBar`-datoejerskab
- Ingen stale sitemap-filer i repo
- Dokumenteret entity-link coverage
- Et setup der er langt mere robust mod fremtidig “date drift” og SEO-regressioner.
