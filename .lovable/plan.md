

## Plan: Opdel HTML-sitemappet i tabs med dynamisk DB-indhold

Konkurrenten har en tabbedstruktur med 3 faner: **Sitemap** (statiske sider), **Anmeldelser af Casinoer** (alle casinoer A-Å), og **Casinospil** (alle slots A-Å). Det giver crawlerne direkte adgang til samtlige sider via interne links — langt bedre end jeres nuværende flad-liste med kun 168 statiske ruter.

### Hvorfor det hjælper SEO

- **Intern link-dækning**: Lige nu har jeres 1.400+ slot-katalog-sider og dynamiske casino-sider INGEN links fra HTML-sitemappet. Crawlere opdager dem kun via XML-sitemappet eller navigation. En HTML-sitemap med tabs giver direkte crawlbare `<a>` links til alle sider.
- **Hurtigere indeksering**: Google prioriterer sider med stærk intern linking. En sitemap-side med links til alle slots og casinoer skaber en "flat architecture" (1 klik fra sitemap → enhver side).
- **Alfabetisk gruppering**: Med 1.400+ slots grupperet A-Å (som konkurrenten) bliver det overskueligt for både brugere og crawlere.

### Implementering

**Omskrivning af `src/pages/Sitemap.tsx`** med 3 tabs:

1. **Tab 1: "Sitemap"** — Beholder den eksisterende gruppering af statiske sider fra `seoRoutes.ts` (casino anmeldelser, bonusguides, spiludviklere, etc.)

2. **Tab 2: "Anmeldelser af Casinoer"** — Henter alle aktive casinoer fra `casinos_public`-viewet, grupperer dem alfabetisk (0-9, A, B, C…Å), og linker til `/casino-anmeldelser/{slug}`

3. **Tab 3: "Casinospil"** — Henter alle slots fra `slot_catalog`, grupperer dem alfabetisk, og linker til `/slot-katalog/{slug}`. Slots med dedikerede guides (de ~30 stk) markeres evt. med et ikon.

### Tekniske detaljer

- Bruger Radix `Tabs`-komponenten (allerede installeret)
- Data hentes via `useQuery` med caching (staleTime 1 time — sitemappet ændres sjældent)
- Paginering af slot_catalog med batched queries (håndterer >1000 rækker)
- Beholder `noindex` på sitemappet (det er til crawling, ikke ranking)
- Alfabetisk gruppering: `#` for special chars/tal, derefter A-Å
- `<noscript>` fallback med statiske links for crawlere der ikke kører JS

