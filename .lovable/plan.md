

# Community-sektion: Fuld Professionel Analyse & Opgraderingsplan

## Nuværende status – hvad der fungerer godt
- Konsistent brand-gradient (lilla/blå) på tværs af alle heroes
- CommunityNav med sticky positioning og aktiv-markering
- Tre sidebar-widgets (SocialProof, Leaderboard, ShopLeaderboard) på alle 6 sider
- SEO: Article JSON-LD, FAQ-schemas, breadcrumbs og AuthorBio på alle sider
- Intern linking via CommunitySeoSections, RelatedGuides og BonusHuntCommunityLinks

---

## Problemer identificeret

### A. Layout & Grafisk inkonsistens

| Problem | Berørte sider |
|---|---|
| **Inkonsistente hero-sektioner** – Oversigt og Highlights bruger `CommunityPageLayout` (generisk hero-billede), mens Spillehal/Bonus Hunt/Turneringer/Rewards har egne custom heroes med parallax/partikler | Alle 6 |
| **Ingen AuthorMetaBar** på Oversigt, Spillehal og Turneringer – mangler E-E-A-T signal | 3 sider |
| **Ingen SnippetAnswer** (TL;DR) på nogen community-side – mister featured snippet-mulighed | Alle 6 |
| **Inconsistent spacing** – pt-6, py-8, py-12 varierer mellem sider uden mønster | Alle 6 |
| **CommunityJoinCTA** vises kun på Oversigt og Spillehal for logged-out brugere – bør vises konsistent | 4 sider mangler |
| **BrandBlock og AuthorBio rækkefølge** er inkonsistent: Turneringer har AuthorBio FØR BrandBlock | Turneringer |
| **Ingen visuelt "aktiv turnering" eller "live hunt" indikator** i CommunityNav | CommunityNav |

### B. SEO-problemer

| Problem | Impact |
|---|---|
| **Oversigt-siden mangler FAQ-schema** – alle andre community-sider har det | Tabt rich result |
| **Turneringer bruger `new Date()` til JSON-LD** (linje 414-417) – potentiel SEO-guardrail violation for dynamisk dato | Build-risiko |
| **Ingen `breadcrumbLabel` prop** på Oversigt, Spillehal, Turneringer og Rewards | Brødkrumme-labels kan falde tilbage til URL-slugs |
| **Highlights og Rewards mangler `readTime`** i AuthorMetaBar | E-E-A-T signal |
| **Ingen `<time>` HTML-element** med datetime-attribut for publicerings-/opdateringsdatoer | Crawlbarhed |
| **SEO-sektioner bundt nederst** – identisk rækkefølge (CommunitySeoSections → RelatedGuides → BrandBlock → AuthorBio) skaber template-footprint | Anti-footprint risiko |
| **Ingen Table of Contents (ToC)** på nogen community-side – mister in-page jump-links i SERP | Alle 6 |
| **Spillehal og Turneringer har `ContentSidebar` direkte** i stedet for via layout – dobbelt sidebar-kode | Vedligeholdelse |

### C. Brugeroplevelse (UX)

| Problem | Berørte sider |
|---|---|
| **Ingen "quick stats" dashboard** – brugere kan ikke hurtigt se deres egen status (spins, credits, rank) | Alle 6 |
| **Turneringer: Afsluttede turneringer er collapsed** og gemmer potentielt vigtig historik for engagement | Turneringer |
| **Highlights: Søgefeltet er for smalt** på mobil – full-width men uden tydelig CTA | Highlights |
| **Rewards: SlotRequestForm** er inline i en Card – bør have en mere prominent placering | Rewards |
| **Ingen "nyhed"-badge eller "seneste aktivitet"-widget** der viser hvad der sker lige nu i community | Alle 6 |
| **Ingen dark/light mode-specifik hero-image** – samme billede bruges uanset tema | Alle heroes |

---

## Opgraderingsplan (prioriteret)

### Fase 1: Layout-konsistens & Grafisk polish (Stor impact, lav risiko)

**1.1 Unified Hero-komponent**
Opret `CommunityHero` med props for titel, beskrivelse, badge, baggrundsbillede, partikler (on/off) og hero-ekstra. Erstat de 4 forskellige hero-implementeringer med denne ene komponent. Bibeholder brand-gradient men standardiserer spacing (py-12 md:py-20).

**1.2 Konsistent sektions-spacing**
Standardiser alle community-sider til `py-8 md:py-12 space-y-8` for main content-container.

**1.3 CommunityJoinCTA på alle sider**
Vis for logged-out brugere på Highlights, Turneringer, Rewards og Bonus Hunt (ikke kun Oversigt/Spillehal).

**1.4 Fix footer-sektion rækkefølge**
Standardiser til: SEO-tekst → CommunitySeoSections → RelatedGuides → FAQ → BrandBlock → AuthorBio (altid i denne rækkefølge). Brug `useAntiFootprint` til at rotere rækkefølgen af SEO-sektioner per side.

### Fase 2: SEO-forbedringer (Stor impact)

**2.1 SnippetAnswer på alle 6 sider**
Tilføj en kort TL;DR umiddelbart efter hero/AuthorMetaBar:
- Oversigt: "Casinoaftalers community samler gratis slots, turneringer og bonus hunts..."
- Spillehal: "Spil gratis spilleautomater som Book of Fedesvin..."
- Bonus Hunt: allerede godt dækket, tilføj kort snippet
- Highlights: "Se de bedste stream-øjeblikke fra Twitch og YouTube..."
- Turneringer: "Deltag gratis i slot-turneringer og vind credits..."
- Rewards: "Optjen bonus spins ved at uploade clips, udfylde profil..."

**2.2 FAQ-schema på Oversigt-siden**
Opret `CommunityHubFaq` komponent med 5-6 FAQs om community-funktioner.

**2.3 breadcrumbLabel på alle sider**
Tilføj `breadcrumbLabel` prop på de 4 sider der mangler det.

**2.4 AuthorMetaBar med readTime**
Tilføj på Oversigt ("5 min."), Spillehal ("4 min."), Turneringer ("6 min.").

**2.5 Anti-footprint rotation af SEO-sektioner**
Wrap footer-SEO-sektionerne i en komponent der bruger `useAntiFootprint` til at variere rækkefølgen af CommunitySeoSections, RelatedGuides og BonusHuntCommunityLinks per side.

### Fase 3: UX-forbedringer (Medium impact)

**3.1 Community Activity Feed / Quick Stats**
Ny komponent `CommunityQuickStats` der viser:
- Brugerens rank i aktiv turnering
- Antal spins i dag / credits tilbage
- Seneste community-aktivitet (nye clips, afsluttede hunts)
Placeres øverst på Oversigt-siden for logged-in brugere.

**3.2 "Live Now" indikator i CommunityNav**
Hvis der er en aktiv bonus hunt session, vis en pulserende grøn dot ved "Bonus Hunt" i nav.

**3.3 Forbedret Turneringsoversigt**
Vis de 3 senest afsluttede turneringer som default (ikke collapsed), med en "Se alle" knap der viser resten.

**3.4 Forbedret Highlights-søgning**
Tilføj en tydelig "Søg" knap og populære tags (fx "Big Win", "Bonus", "Community") som quick-filter chips.

### Fase 4: Avanceret (Lavere prioritet)

**4.1 Table of Contents på SEO-tunge sider**
Tilføj sticky ToC til Bonus Hunt og Turneringer for bedre in-page navigation og jump-link muligheder i SERP.

**4.2 Community Onboarding Flow**
Ny bruger-velkomstflow der guider gennem profil-udfyldelse → første spil → første turnering.

**4.3 Gamification badges i CommunityNav**
Vis en lille notifikations-dot ved Rewards hvis brugeren har uoptjente belønninger.

---

## Teknisk implementering – overblik

```text
Fase 1 (5 filer): CommunityHero.tsx (ny), opdater 6 page-filer
Fase 2 (8 filer): SnippetAnswer tilføjes til 6 sider, CommunityHubFaq.tsx (ny), anti-footprint wrapper
Fase 3 (4 filer): CommunityQuickStats.tsx (ny), CommunityNav live-indikator, Leaderboard.tsx og Highlights.tsx opdateringer
Fase 4 (3 filer): ToC-komponent, onboarding-flow, badge-system
```

**Samlet estimat**: Fase 1+2 kan implementeres i én session. Fase 3+4 i en opfølgende session.

Skal vi starte med Fase 1+2 som en samlet implementering?

