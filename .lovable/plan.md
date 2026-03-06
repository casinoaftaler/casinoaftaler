

# Plan: Casino Ordbog (/ordbog) — Hub + Term Pages

## Oversigt
Bygge en komplet Casino Ordbog med en hub-side (`/ordbog`) og individuelle term-sider (`/ordbog/[slug]`). Starter med 15 kernetemer. Fuldt integreret i hub-and-spoke arkitektur, sitemap, breadcrumbs og entity auto-linker.

## Arkitektur

```text
/ordbog (Hub – priority 0.9)
├── /ordbog/rtp (Return to Player)
├── /ordbog/wagering (Omsætningskrav)
├── /ordbog/volatilitet (Volatilitet)
├── /ordbog/house-edge (House Edge)
├── /ordbog/free-spins (Free Spins)
├── /ordbog/scatter (Scatter-symbol)
├── /ordbog/wild (Wild-symbol)
├── /ordbog/jackpot (Jackpot)
├── /ordbog/rng (Random Number Generator)
├── /ordbog/paylines (Gevinstlinjer)
├── /ordbog/bonus-runde (Bonusrunde)
├── /ordbog/multiplikator (Multiplikator)
├── /ordbog/max-bet (Max Bet)
├── /ordbog/autoplay (Autoplay)
└── /ordbog/hit-frequency (Hit Frequency)
```

## Hvad skal bygges

### 1. Data-lag: Ordbog term-definitioner
- Ny fil `src/data/glossaryTerms.ts` med et array af alle termer (slug, title, shortDefinition, fullContent som JSX, relatedTerms, relatedPages)
- Hver term har ~300-500 ord kort definition (til hub) + fuld side-indhold

### 2. Hub-side: `/ordbog`
- Ny fil `src/pages/Ordbog.tsx`
- Alfabetisk indekseret oversigt med A-Z springnavigation
- Søgefelt til filtrering af termer
- Hver term viser kort definition + link til fuld side
- SEO: `DefinedTermSet` JSON-LD schema, Article schema, FAQ schema
- AuthorMetaBar + AuthorBio + RelatedGuides + FAQSection (standard bundsektioner)

### 3. Term-sider: `/ordbog/:slug`
- Ny fil `src/pages/OrdbogTerm.tsx` (dynamisk komponent)
- Henter term-data fra glossaryTerms baseret på URL slug
- Indhold: Definition, matematisk forklaring, praktiske eksempler, relaterede termer (intern links), links til money-pages
- SEO: `DefinedTerm` JSON-LD schema + Article schema
- Standard bundsektioner (RelatedGuides, FAQSection, AuthorBio)

### 4. SEO-integration
- **seoRoutes.ts**: Tilføj `/ordbog` (priority 0.9) + alle 15 term-sider (priority 0.7)
- **breadcrumbs.ts**: Tilføj routeLabels for `/ordbog` og alle termer. Tilføj PARENT_OVERRIDES så termer viser `Forside > Casino Ordbog > [Term]`
- **entityAutoLinker.ts**: Tilføj nye entity-mappings for nøgletermer (RTP, wagering, volatilitet osv.) der linker til `/ordbog/[slug]`
- **sitemap.xml**: Opdater med de nye ruter

### 5. Routing
- **App.tsx**: Tilføj lazy-load imports og ruter for `/ordbog` og `/ordbog/:slug`

### 6. Navigation
- **navData.ts**: Tilføj Ordbog-link under "Mere" eller relevant sektion

## Filer der oprettes
| Fil | Formål |
|-----|--------|
| `src/data/glossaryTerms.ts` | Term-definitioner og metadata |
| `src/pages/Ordbog.tsx` | Hub-side med A-Z indeks |
| `src/pages/OrdbogTerm.tsx` | Dynamisk term-side |
| `src/components/seo-content/OrdbogSeoContent.tsx` | Dybt SEO-indhold til hub |

## Filer der redigeres
| Fil | Ændring |
|-----|---------|
| `src/App.tsx` | Nye ruter |
| `src/lib/seoRoutes.ts` | 16 nye ruter |
| `src/lib/breadcrumbs.ts` | Labels + parent overrides |
| `src/lib/entityAutoLinker.ts` | Nye term-links |
| `src/components/header/navData.ts` | Nav-link |
| `public/sitemap.xml` | Nye URL'er |

## JSON-LD Schemas

**Hub (`/ordbog`)**:
```json
{
  "@type": "DefinedTermSet",
  "name": "Casino Ordbog",
  "hasDefinedTerm": [{ "@type": "DefinedTerm", "name": "RTP", "url": "..." }]
}
```

**Term-sider (`/ordbog/rtp`)**:
```json
{
  "@type": "DefinedTerm",
  "name": "RTP (Return to Player)",
  "description": "...",
  "inDefinedTermSet": { "@id": "/ordbog#termset" }
}
```

Begge absorberes i den eksisterende unified `@graph` via SEO-komponenten.

