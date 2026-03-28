

## Analyse: Content-sidebar mangler på community-sider

### Nuværende situation

**Community-sider (8 sider):** CommunityHub, Highlights, BonusHunt, Leaderboard, Shop, RewardsProgram, GameLibrary, SpinTheReel

**Hvad de HAR:**
- `CommunityNav` (horisontal tab-bar med 8 community-links)
- Venstre sidebar (kun synlig ved 1540px+) med `CommunitySeoBridge` (6 money-page links) + `CommunityConversionCard` (1 link)

**Hvad de MANGLER:**
- `ContentSidebar` med 8 kategorier og ~121 links til money-pages — den sidebar der sidder på ALLE 160+ content-sider

### Problemet i tal

| Element | Money-pages | Community-sider |
|---|---|---|
| Links til money-pages via sidebar | ~121 per side | **7** (kun SeoBridge) |
| Breakpoint for sidebar | xl (1280px) | 1540px (endnu færre ser den) |
| Casino Ratings widget | Ja (top 10) | Nej |
| Struktureret kategori-navigation | 8 kategorier | Ingen |

Community-siderne er trafikcenteret, men har **~95% færre** money-page links end content-siderne.

### Anbefaling

Tilføj `ContentSidebar` som en **højre-sidebar** på alle community-sider — præcis som på money-pages. Den eksisterende venstre sidebar (SeoBridge + leaderboard) beholdes.

### Plan

**1. Opdater `CommunityPageLayout` med ContentSidebar**
- Tilføj `ContentSidebar` som højre-kolonne i et flex-layout (samme mønster som `ContentPageLayout`)
- Synlig fra `xl` breakpoint (1280px) — lavere end nuværende 1540px
- Beholde eksisterende venstre sidebar med community-specifikt indhold

**2. Opdater de 6 sider der IKKE bruger CommunityPageLayout**
- BonusHunt, Leaderboard, Shop, RewardsProgram, GameLibrary, SpinTheReel
- Tilføj `ContentSidebar` i deres eksisterende layout-struktur
- Samme mønster: flex-container med `ContentSidebar` til højre

**3. Resultat**
- ~121 nye money-page links per community-side × 8 sider = **~968 nye interne links**
- Casino Ratings widget synlig på alle community-sider
- Konsistent navigation på tværs af hele sitet
- Lavere breakpoint (xl/1280px) betyder flere brugere ser sidebaren

### Teknisk tilgang

```text
Community side (ny struktur)
┌─────────────────────────────────────────────────┐
│  Hero + CommunityNav                            │
├──────────┬──────────────────────┬────────────────┤
│ Venstre  │   Main content      │  ContentSidebar│
│ sidebar  │                     │  (money-pages) │
│ (SEO     │                     │  ~121 links    │
│  Bridge) │                     │  Casino ratings│
│ @1540px  │                     │  @xl (1280px)  │
└──────────┴──────────────────────┴────────────────┘
```

Enkelt implementering — vi genbruger den eksisterende `ContentSidebar`-komponent uden ændringer.

