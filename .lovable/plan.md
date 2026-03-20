

# Plan: `/pragmatic-play-partner` Authority Page

## Oversigt

Opretter en ny ~4000 ord authority page på `/pragmatic-play-partner` der dokumenterer det officielle Pragmatic Play partnerskab. Siden fungerer som SEO hub med stærk intern linking.

## Filer der oprettes/ændres

### 1. `src/pages/PragmaticPlayPartner.tsx` (NY — hoveddelen)

Struktur inspireret af `Forretningsmodel.tsx` og `SaadanTesterVi.tsx`:

- **SEO**: `<SEO>` med Article JSON-LD, FAQ JSON-LD, `sameAs: "https://www.pragmaticplay.com/"` i schema
- **Hero**: Gradient hero med Badge ("Officiel Partner"), h1, subtitle
- **AuthorMetaBar**: author="jonas", readTime="20 min"
- **Pragmatic Play logo**: Bruger eksisterende `pragmatic-play-logo-transparent.png`

**Indholdssektioner (~3500-4500 ord):**

1. **Introduktion** — Hvad partnerskabet betyder, hvornår det blev etableret, hvad det giver adgang til
2. **Hvorfor Pragmatic Play?** — Markedsposition (250+ slots, 6-8 nye/måned), global tilstedeværelse, dansk relevans
3. **Hvad partnerskabet giver vores brugere** — Tidlig adgang til nye spil, dybere testdata, direkte kontakt til udviklerteam
4. **Sådan tester vi Pragmatic Play spil** — RTP-verifikation, volatilitetsanalyse, bonus buy-evaluering, session-test (link til `/saadan-tester-vi-casinoer`)
5. **Populære Pragmatic Play spil vi har testet** — Sweet Bonanza, Gates of Olympus, Big Bass serien, med links til slot-katalog
6. **Pragmatic Plays tekniske standarder** — Licensering, fairness, certificeringer
7. **Redaktionel uafhængighed** — Partnerskab ≠ bias, link til `/forretningsmodel` og `/redaktionel-politik`
8. **Pragmatic Play i dansk kontekst** — Danske casinoer med Pragmatic (links til reviews)
9. **FAQ** — 5-6 spørgsmål om partnerskabet

**Interne links (strategisk placeret i content):**
- `/spiludviklere/pragmatic-play` (hovedguide)
- `/spillemaskiner/pragmatic-play` (slot hub)
- `/top-10-casino-online` (money page)
- `/casino-bonus` (money page)
- `/saadan-tester-vi-casinoer`
- `/forretningsmodel`
- `/redaktionel-politik`
- Relevante slot-katalog sider (`/slot-katalog/sweet-bonanza`, `/slot-katalog/gates-of-olympus` osv.)
- `/live-casino`
- `/casino-anmeldelser` (relevante reviews)

**Footer-komponenter:**
- `<FAQSection>` med custom FAQs
- `<RelatedGuides>`
- `<LatestNewsByCategory>`
- `<AuthorBio author="jonas">`

### 2. `src/App.tsx`

Tilføj route:
```tsx
<Route path="/pragmatic-play-partner" element={<PragmaticPlayPartner />} />
```

### 3. `src/lib/seoRoutes.ts`

Tilføj entry:
```ts
{ path: "/pragmatic-play-partner", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-20" }
```

### 4. `src/lib/breadcrumbs.ts`

Tilføj route label:
```ts
"/pragmatic-play-partner": "Pragmatic Play Partner"
```

Tilføj PARENT_OVERRIDE under `/om` hubben (trust-page cluster):
```ts
"/pragmatic-play-partner": [{ name: "Om", path: "/om" }]
```

### 5. `src/lib/seo.ts` (Organization schema)

Tilføj `sameAs: "https://www.pragmaticplay.com/"` til `organizationSchema` for entity-kobling.

### 6. `src/components/Footer.tsx`

Tilføj link til `/pragmatic-play-partner` ved siden af det eksisterende Pragmatic Play logo i footer (så den nye side modtager sitewide intern linking).

## Teknisk approach

- Siden er 100% statisk JSX — ingen database, ingen nye tabeller
- Følger eksisterende patterns fra trust-pages (Forretningsmodel, SaadanTesterVi)
- FAQ schema via `buildFaqSchema()`, Article schema via `buildArticleSchema()`
- `entityAutoLinker` vil automatisk linke til denne side fra andre siders content hvis vi tilføjer en mapping (valgfrit i fremtiden)

