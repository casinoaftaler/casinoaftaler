## Plan: Mobil Casino Enterprise SEO Cluster-Udvidelse

### Analyse

Mobil Casino clusteret har i dag kun 2 sider: `/mobil-casino` (hub, 1.027 linjer) og `/casino-app` (spoke, 915 linjer). Konkurrenter har 4-6 undersider. Med ~2.400 månedlige søgninger på "mobil casino" og device-specifikke long-tail søgninger (fx "casino iphone", "casino android app", "bedste casino apps") er der et klart gap.

### 4 Nye Spoke-Sider

1. `**/mobil-casino/iphone**` – Casino på iPhone (7.000+ ord)
  - iOS-specifikke funktioner: Face ID-login, Safari PWA, App Store-politik for gambling apps
  - Performance-benchmarks: iPhone 16 vs. iPhone 13 vs. iPhone SE (load-tider, FPS i live casino)
  - iOS-specifikke betalingsmetoder: Apple Pay-integration, MobilePay på iOS
  - Safari vs. Chrome vs. dedikeret app – sammenligning
  - Trin-for-trin: PWA-installation på iOS (HowTo schema)
  - Screen-size analyse: Mini vs. Standard vs. Pro Max for casino UI
  - FAQ schema (6-8 spørgsmål)
2. `**/mobil-casino/android**` – Casino på Android (7.000+ ord)
  - Android-specifikke fordele: APK sideloading, Google Play-regler, widget-support
  - Performance-benchmarks: Samsung Galaxy S25 vs. Pixel 9 vs. budget (Xiaomi)
  - Fragmenteringsproblematik: OS-versioner, skærmopløsninger, RAM-krav
  - Google Play vs. direkte download – sikkerhedsanalyse
  - Android-specifikke betalinger: Google Pay, Trustly på Android
  - Trin-for-trin: APK-installation sikkerhed (HowTo schema)
  - FAQ schema
3. `**/mobil-casino/tablet**` – Casino på Tablet (7.000+ ord)
  - iPad vs. Android tablets vs. Samsung Galaxy Tab sammenligning
  - Tablet-fordele: Større skærm → bedre live casino, multi-tabling
  - Landscape vs. portrait mode analyse for forskellige spiltyper
  - Performance-data: Tablet vs. smartphone vs. desktop (FPS, load, UX)
  - Specifik tablet-optimering: Split View, multitasking
  - Hvilke casinoer har bedst tablet-UI (vægtet scoring-model)
  - FAQ schema
4. `**/mobil-casino/bedste-apps**` – Bedste Casino Apps 2026 (7.000+ ord)
  - Top 10 ranking af danske casino apps med vægtet scoring-model
  - Evalueringskriterier: App Store rating, crash-rate, feature-paritet, push-notifikationer
  - Native app vs. PWA vs. browser – teknisk deep-dive med EV-lignende sammenligning
  - App-størrelse og data-forbrug analyse
  - Opdateringsfrekvens og support-kvalitet
  - Sikkerhed: App permissions, data-indsamling, privacy policies
  - FAQ schema

### SEO & Schema pr. side

- Article + FAQ JSON-LD (HowTo hvor relevant)
- AuthorMetaBar (author: "jonas") + AuthorBio
- Hero-billede (device-tematisk, ingen tekst) 
- Header skal følge samme format som andre sider, samme farve.
- Fuld intern cross-linking til hele mobil-casino clusteret + betalingsmetoder + ansvarligt spil

### Infrastruktur-ændringer

**Nye filer (4):**

- `src/pages/mobil-casino/IPhoneCasinoGuide.tsx`
- `src/pages/mobil-casino/AndroidCasinoGuide.tsx`
- `src/pages/mobil-casino/TabletCasinoGuide.tsx`
- `src/pages/mobil-casino/BedsteAppsGuide.tsx`

**Opdaterede filer (5):**

- `src/App.tsx` – 4 lazy imports + Route entries
- `src/lib/breadcrumbs.ts` – routeLabels + PARENT_OVERRIDES (parent: `/mobil-casino`)
- `src/lib/seoRoutes.ts` – 4 nye entries (priority 0.7, changefreq monthly)
- `src/components/RelatedGuides.tsx` – Tilføj de 4 nye sider til mobil-casino cluster-filteret
- `src/pages/MobilCasino.tsx` – Hub-opdatering: tilføj links til de 4 nye spokes i "Hjælp og ressourcer"-grid + nye sektioner

**Cross-linking:**

- `/casino-app` → links til iPhone, Android, Bedste Apps
- `/mobil-casino` hub → links til alle 4 nye spokes
- Nye spokes → indbyrdes cross-links + links til hub, `/casino-app`, betalingsmetoder, ansvarligt spil
- `src/data/authorContent.ts` – tilføj de 4 nye sider til Jonas' artikelliste

### Layout-arketype rotation (anti-template)

- iPhone: Arketype A (ressource-oversigt med device-benchmarks)
- Android: Arketype B (data-tables med fragmenteringsmatrice)
- Tablet: Arketype C (sammenligning med landscape/portrait-analyse)
- Bedste Apps: Arketype D (ranked liste med vægtet scoring)