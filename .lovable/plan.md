

## Batch 1: VS/Sammenligningssider + Eksponering af Community-stats for crawlere

Disse to features er valgt som batch 1, da de adresserer de mest kritiske SEO-gaps identificeret i analysen: bottom-of-funnel konvertering (VS-sider) og crawlbarhed af social proof data.

---

### Feature 1: VS/Sammenligningssider (Bottom-of-Funnel)

**Formål:** Indfange "X vs Y" søgeintentioner med dedikerede landing pages. Disse er high-intent keywords med direkte konverteringspotentiale.

**Sider der oprettes:**

| URL | Titel |
|-----|-------|
| `/casino-anmeldelser/bet365-vs-unibet` | bet365 vs Unibet |
| `/casino-anmeldelser/leovegas-vs-mr-green` | LeoVegas vs Mr Green |
| `/casino-anmeldelser/danske-spil-vs-spilnu` | Danske Spil vs Spilnu |

**Teknisk implementering:**

1. **Opret `src/pages/comparisons/ComparisonPageTemplate.tsx`** -- genbrugelig template med:
   - Side-by-side sammenligningskort (bonus, RTP, udbetalingstid, features, pros/cons)
   - Dynamisk data fra `useCasinos()` hook (henter live casino-data)
   - Sammenligningstabel med scoring pr. kategori
   - FAQ-sektion med unikke spørgsmål pr. sammenligning
   - Article + FAQ JSON-LD schema med korrekt `about` entity (begge casinos)
   - `casinoReviewEntities()` for schema mentions (max 3)
   - AuthorMetaBar, AuthorBio, RelatedGuides, StickyCtaBySlug

2. **Opret 3 sider** i `src/pages/comparisons/`:
   - `Bet365VsUnibet.tsx`
   - `LeoVegasVsMrGreen.tsx`
   - `DanskeSpilVsSpilnu.tsx`

3. **Registrering:**
   - Tilføj lazy imports i `App.tsx`
   - Tilføj routes i `App.tsx`
   - Tilføj i `seoRoutes.ts` (priority: 0.8, changefreq: weekly)
   - Tilføj labels i `breadcrumbs.ts` med PARENT_OVERRIDES til `/casino-anmeldelser`
   - Tilføj i `navData.ts` under REVIEW_ALL_LINKS

4. **Entity/linking:**
   - Tilføj VS-sider i `RelatedGuides.tsx` under relevant cluster
   - entityAutoLinker behøver IKKE nye entries (casino-navne er allerede dækket)

---

### Feature 2: Eksponér community-stats for crawlere (uden login)

**Problem:** `LiveCommunityDataStrip` og `HomepageLiveCommunity` henter data via client-side JS. Googlebot ser tomme felter, da data loades async.

**Løsning:** Server-renderet fallback i HTML via SSR-venlig statisk tekst + microdata markup.

**Teknisk implementering:**

1. **Opret `src/components/CommunityStatsStaticBlock.tsx`** -- en rent statisk SEO-komponent:
   - Viser community-nøgletal som ren HTML-tekst (ikke afhængig af API-kald)
   - Inkluderer `itemscope`/`itemprop` microdata for crawlere
   - Henter data via `useQuery` men viser fallback-tekst med hardcodede minimumstal
   - Bruges på `/casino-anmeldelser`, `/community` og forside

2. **Tilføj JSON-LD `Organization` udvidelse** i SEO-komponenten på forsiden:
   - `numberOfEmployees`, `memberOf` og community-relaterede properties
   - Bind community-stats til Organization schema via `interactionStatistic`

3. **Opdater `HomepageLiveCommunity`:**
   - Tilføj `noscript` fallback med statisk tekst
   - Tilføj `aria-label` og semantiske HTML5-tags (`<dl>`, `<dt>`, `<dd>`) i stedet for rene `<div>`

4. **Tilføj community-stats til `robots.txt`-tilladt ruter** -- allerede gjort (community er tilladt).

---

### Filer der oprettes/ændres:

**Nye filer (6):**
- `src/pages/comparisons/ComparisonPageTemplate.tsx`
- `src/pages/comparisons/Bet365VsUnibet.tsx`
- `src/pages/comparisons/LeoVegasVsMrGreen.tsx`
- `src/pages/comparisons/DanskeSpilVsSpilnu.tsx`
- `src/components/CommunityStatsStaticBlock.tsx`

**Ændrede filer (6):**
- `src/App.tsx` (lazy imports + routes)
- `src/lib/seoRoutes.ts` (3 nye ruter)
- `src/lib/breadcrumbs.ts` (labels + parent overrides)
- `src/components/RelatedGuides.tsx` (VS-sider i rotation)
- `src/components/HomepageLiveCommunity.tsx` (semantisk HTML + noscript)
- `src/components/header/navData.ts` (VS-links i navigation)

