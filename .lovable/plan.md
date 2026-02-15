

# Ny side: Spillemaskiner (`/casinospil/spillemaskiner`)

## Oversigt
Opret en dybdegaende guide om spillemaskiner (slots) som underside til Casinospil. Indholdet omformuleres og tilpasses fra referencesiden pa casinoholdet.com, men skrives helt unikt med egen vinkel, egne FAQ'er og intern linking til Casinoaftaler-sider.

## Filer der oprettes

### `src/pages/Spillemaskiner.tsx`
Ny side med folgende struktur og sektioner:

**SEO:**
- Title: `Spillemaskiner 2026 - Guide til Online Slots i Danmark` (54 tegn)
- Description: `Alt om spillemaskiner hos danske online casinoer. Lær om RTP, volatilitet, Megaways, jackpots og bonusfunktioner. Find de bedste slots i 2026.` (148 tegn)
- JSON-LD: FAQPage schema + BreadcrumbList (Forside > Casinospil > Spillemaskiner)
- Ingen noindex, self-referencing canonical via SEO.tsx

**E-E-A-T meta-bar:**
- Forfatter: Casinoaftaler
- Opdateringsdato: 15-02-2026
- Laesetid: 12 Min.

**H1:** `Spillemaskiner 2026 - Din Guide til Online Slots`

**Sektioner (H2/H3):**
1. **Hvad er spillemaskiner, og hvordan fungerer de?** -- Intro om RNG, hjul, gevinstlinjer, symboler. ~200 ord.
2. **Typer af spillemaskiner** -- H3'er for: Klassiske 3-hjuls slots, Video slots, Megaways slots, Progressive jackpot slots, Cluster pays slots. ~400 ord. Intern linking til Big Time Gaming, Microgaming.
3. **RTP og volatilitet -- Forstaa dine odds** -- Forklaring af RTP, house edge, lav/medium/hoj volatilitet. ~250 ord. Intern linking til omsaetningskrav-siden.
4. **Bonusfunktioner i moderne spillemaskiner** -- Free spins, multiplikatorer, expanding wilds, pick-and-click, cascading wins. ~200 ord. Intern linking til free-spins-siden.
5. **Sadan vaelger du den rigtige spilleautomat** -- Budgetstyring, RTP-valg, volatilitetsmatch. ~200 ord. Intern linking til casino-bonus.
6. **De storste spiludviklere bag spillemaskiner** -- Kort om NetEnt, Pragmatic Play, Play'n GO, Nolimit City, Hacksaw Gaming. ~200 ord. Intern linking til spiludviklere-hub.
7. **Er det sikkert at spille spillemaskiner online i Danmark?** -- Spillemyndigheden, licens, RNG-certificering, ROFUS. ~150 ord.
8. **FAQ-sektion** (7 unikke sporgsmal, min. 50% unikke ift. Casinospil-siden):
   - Hvad er en spilleautomat?
   - Hvad betyder RTP pa en spillemaskine?
   - Kan man pavirke resultatet pa en spilleautomat?
   - Hvad er forskellen pa volatilitet og RTP?
   - Hvad er Megaways-spillemaskiner?
   - Hvor finder jeg spillemaskiner med hojest RTP?
   - Er online spillemaskiner fair og tilfaeldige?
9. **Ansvarligt spil-sektion** via RelatedGuides-komponenten
10. **RelatedGuides** med currentPath

**Intern linking (3-5 kontekstuelle links):**
- `/spiludviklere` og specifikke udviklere (Big Time Gaming, Microgaming, NetEnt)
- `/free-spins`
- `/casino-bonus`
- `/omsaetningskrav`
- `/casinospil` (parent-side)

**Estimeret ordantal:** ~1.400+ ord

## Filer der aendres

### `src/App.tsx`
- Tilfoej lazy import: `const Spillemaskiner = lazy(() => import("./pages/Spillemaskiner"));`
- Tilfoej route: `<Route path="/casinospil/spillemaskiner" element={<Spillemaskiner />} />`
- Tilfoej redirect: `<Route path="/spillemaskiner" element={<Navigate to="/casinospil/spillemaskiner" replace />} />`

### `src/lib/seoRoutes.ts`
- Tilfoej ny entry under "Casino Spil & Live" sektionen:
  ```
  { path: "/casinospil/spillemaskiner", changefreq: "weekly", priority: 0.9 }
  ```

### `src/components/Breadcrumbs.tsx`
- Tilfoej route label: `"/casinospil/spillemaskiner": "Spillemaskiner"`
- Tilfoej parent-label: `"/casinospil": "Casinospil"`
- Udvid breadcrumb-logikken til at understotte 3-niveau breadcrumbs (Forside > Casinospil > Spillemaskiner)

### `src/components/RelatedGuides.tsx`
- Tilfoej spillemaskiner til `generalGuides` arrayet:
  ```
  { to: "/casinospil/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2, desc: "Guide til alle typer online slots" }
  ```

## Tjekliste
- [x] Unik title (54 tegn) og meta description (148 tegn)
- [x] Ingen noindex, ikke under /community/
- [x] Self-referencing canonical via SEO.tsx
- [x] Tilfojet i seoRoutes.ts med priority 0.9, changefreq weekly
- [x] En unik H1, logisk H2/H3 struktur
- [x] 1.400+ ord
- [x] Intern linking til 5 relevante SEO-sider
- [x] Ingen kopieret template-FAQ (7 unikke sporgsmal, 0% overlap med Casinospil-FAQs)
- [x] Unikke sektionsoverskrifter
- [x] FAQ med JSON-LD schema
- [x] Forfatter + opdateringsdato + laesetid
- [x] Ansvarligt spil-sektion
- [x] Intern reference via RelatedGuides

