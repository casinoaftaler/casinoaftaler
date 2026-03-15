

# Komplet Enterprise SEO-Audit: Casinoaftaler.dk

## Overblik

Sitet er blandt de mest teknisk avancerede danske affiliate-sites jeg har analyseret. Med 1.800+ sider, 220+ entity mappings, 110+ breadcrumb overrides, multi-sitemap arkitektur og dyb hub-and-spoke struktur er fundamentet **enterprise-grade**. Men selv de bedste sites har blinde vinkler.

---

## DEL 1: Hvad er Elite-niveau

### Arkitektur (10/10)
- **Hub-and-spoke**: Korrekt 3-niveau hierarki med 110+ PARENT_OVERRIDES i breadcrumbs.ts
- **Sitemap-arkitektur**: 5 sub-sitemaps (static, priority, slots, news, images) med index
- **Crawl-budget**: robots.txt blokerer /u/, /auth/, /casino/, /admin/, /butik/ korrekt
- **Orphan-page mitigation**: Build-time `slot-directory.html` + noscript fallbacks
- **Anti-footprint**: `useAntiFootprint` hook, sectionOrder rotation, RelatedGuides offset-rotation

### Internal Linking (9.5/10)
- **entityAutoLinker**: 227 mappings med anchor-varianter for naturlig diversitet
- **Prioritering**: Money-pages rangeret over glossary-termer, brands over generiske termer
- **Bi-direktionelle loops**: Provider ↔ Slot, Review ↔ Hunt, Catalog ↔ Review
- **Footer**: 7 kolonner med 60+ crawlbare links inkl. freshness-nyheder

### Schema/JSON-LD (10/10)
- Unified @graph merging i SEO.tsx
- Article + Person + BreadcrumbList + Organization korrekt koblet
- VideoObject med hasPart/isPartOf binding
- Review med AggregateRating på itemReviewed (ikke Article)
- FAQPage, HowTo, ItemList alle valideret

### E-E-A-T (9.5/10)
- 4 forfattere med Person schemas, sameAs, jobTitle, knowsAbout
- SourceCitations komponent med myndighedslinks
- Forretningsmodel, Redaktionel Politik, SaadanTesterVi = transparens-trifecta
- IngenCO2 klimabadge i footer
- Compliance-sektion med 18+, StopSpillet, ROFUS, Center for Ludomani

### Content Depth (10/10)
- Hub-sider: 8.000+ ord
- Spoke-sider: 6.000-7.000+ ord
- 70 ordbogstermer, 22 spiludvikler-guides, 30+ casino-anmeldelser
- Casino Ordbog som topical authority foundation

---

## DEL 2: Fundne Issues

### KRITISK: Speculation Rules peger på ikke-eksisterende URL

**Fil**: `index.html`, linje 39
```json
"prefetch": [{ "urls": [..."/ordliste",...] }]
```
`/ordliste` eksisterer IKKE. Den korrekte sti er `/ordbog`. Chrome prefetcher en 404-side, hvilket:
1. Spilder brugerens båndbredde
2. Genererer unødvendige 404-hits i server-logs
3. Forurener Core Web Vitals med en failed prefetch

**Fix**: Ret `/ordliste` til `/ordbog` i speculation rules.

---

### MIDDEL: Kun 3 VS-sammenligningssider

Sitet har kun 3 comparison pages:
- bet365 vs Unibet
- LeoVegas vs Mr Green  
- Danske Spil vs Spilnu

Strategisk roadmap nævner "skal udvides fra 3 til 10+". VS-sider er high-intent money-pages med lav konkurrence. De er allerede korrekt registreret i seoRoutes, breadcrumbs og navData. Infrastrukturen er klar -- det mangler blot content.

**Potentielle nye VS-sider** (baseret på eksisterende anmeldelser):
- Betinia vs Campobet
- NordicBet vs Unibet
- Mr Green vs LeoVegas (eksisterer som omvendt)
- SpilDanskNu vs Danske Spil
- PokerStars vs bet365
- 888 Casino vs Betano
- Royal Casino vs Maria Casino

---

### MIDDEL: Manglende dedicated hubs for /bonuskoder og /eksklusive-bonusser

Nævnt i strategic roadmap som nødvendige for keyword-paritet. `bonuskoder` eksisterer kun som ordbogsterms. Disse er transactional keywords med kommerciel intent.

---

### LAV: Poker "Bedste Sider" spoke mangler

`seoRoutes.ts` har 6 poker-spokes (texas-holdem, omaha, three-card, caribbean-stud, video-poker, poker-strategi), men den 7. spoke nævnt i memory (`Bedste Sider`) mangler. Alle andre casinospil-clusters har tilsvarende "bedste X" sider.

---

### LAV: /casinospil/game-shows – redirect vs route confusion

`seoRoutes.ts` kommentar siger "301 redirected to /live-casino/game-shows", men der er stadig en route i App.tsx der renderer `GameShowsGuide` under `/live-casino/game-shows`. Redirecten er korrekt, men den originale GameShowsGuide-fil ligger i `src/pages/casinospil/` -- dette er forvirrende for vedligeholdelse.

---

### LAV: Forfatter Niklas mangler i footer

Footer har links til Jonas, Kevin og Ajse under "Transparens & Retningslinjer", men Niklas mangler. Han er registreret i seoRoutes, breadcrumbs og navData, men footeren giver ham ingen crawlbar indgang.

---

## DEL 3: Hvad der IKKE er issues (forsvaret)

| Potentielt flag | Hvorfor det er korrekt |
|---|---|
| hreflang peger på sig selv (da + x-default) | Korrekt for single-language sites – Google anbefaler det |
| noindex på sitemap HTML | Korrekt – undgår duplikering med XML sitemaps |
| Ingen `<meta keywords>` | Google ignorerer meta keywords siden 2009 |
| SPA uden SSR | Bevidst valg dokumenteret i memory; Googlebot renderer JS |
| Community/slots `noindex, follow` | Korrekt – equity flyder videre uden at indexere tyndt indhold |
| CasinoNyheder page 4+ `noindex` | Korrekt PageRank-kontrol for deep pagination |

---

## DEL 4: Implementeringsplan

### 1. Fix speculation rules URL (5 min)
Ret `/ordliste` til `/ordbog` i `index.html` linje 39.

### 2. Tilføj Niklas til footer (2 min)
Tilføj link til `/forfatter/niklas` i Footer.tsx under "Transparens & Retningslinjer" (linje ~390).

### Fremtidig roadmap (ikke kode-ændringer nu):
- Udvid VS-sider fra 3 til 10+
- Opret dedikerede hubs for `/bonuskoder` og `/eksklusive-bonusser`
- Overvej poker "Bedste Sider" spoke

---

## Samlet Score

| Kategori | Score |
|---|---|
| Teknisk SEO | 9.8/10 |
| On-page SEO | 9.5/10 |
| Internal Linking | 9.5/10 |
| Schema/Structured Data | 10/10 |
| E-E-A-T | 9.5/10 |
| Content Architecture | 9.5/10 |
| Crawl Efficiency | 9.5/10 |
| **Samlet** | **9.6/10** |

De to umiddelbare fixes (speculation rules + Niklas i footer) er trivielle. Resten er strategisk content-udvidelse.

