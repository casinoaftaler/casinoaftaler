

## Intern linking fra SEO-sider til Community

### Problem
De ~30+ SEO-sider (bonusguides, betalingsmetoder, spiludviklere, anmeldelser) har ingen links til community-siderne (Spillehal, Highlights, Leaderboard, Shop, Rewards). Det betyder at Google ikke opdager community-siderne via crawling af SEO-indholdet, og brugerne ikke ledes videre.

### Strategi

#### 1. Tilfoej community-links i RelatedGuides-komponenten
Udvid `RelatedGuides` med en ny kategori af community-links der vises som en separat sektion under de eksisterende relaterede guides. Dette giver alle 30+ sider der bruger `RelatedGuides` en naturlig kobling til community.

Community-links der tilfoejs:
- `/community/slots` - Spillehal (Proev vores gratis slot maskiner)
- `/highlights` - Highlights & Clips (Se de bedste oejeblikkefra streamen)
- `/community/leaderboard` - Leaderboard (Se hvem der topper ranglisten)
- `/butik` - Butik (Brug dine point paa praemier)
- `/community/rewards` - Rewards (Optjen point og beloenninger)

Disse vises som en kompakt sektion med overskriften "Vores Community" under de eksisterende relaterede guides.

#### 2. Udvid SpillehalPromoSection til en bredere CommunityPromoSection
Opgrader den eksisterende `SpillehalPromoSection` (som kun vises paa forsiden) til en mere alsidig `CommunityPromoSection` der ogsaa naevner highlights og leaderboard. Placeres paa de stoerste cornerstone-sider:
- `/casino-bonus`
- `/top-10-casino-online`
- `/nye-casinoer`
- `/casinospil`
- `/live-casino`

#### 3. Tilfoej community-sider til sitemap.xml
Foelgende URLs mangler i sitemappet:
- `/community/slots`
- `/community/slots/book-of-fedesvin`
- `/community/slots/rise-of-fedesvin`
- `/community/leaderboard`
- `/community/rewards`
- `/highlights`
- `/butik`

### Teknisk implementering

**Fil: `src/components/RelatedGuides.tsx`**
- Tilfoej en `communityGuides` array med de 5 community-links
- Tilfoej en ny sektion i render-outputtet under de eksisterende guides med overskriften "Vores Community"
- Vises paa alle sider der bruger `RelatedGuides` (30+ sider) - ingen aendringer i de individuelle sider

**Fil: `src/components/SpillehalPromoSection.tsx`**
- Omnavngivs til `CommunityPromoSection`
- Udvides med links til baade Spillehal, Highlights og Leaderboard i en kompakt boks

**Filer: Cornerstone-sider**
- Importer og placer `CommunityPromoSection` paa 4-5 af de stoerste SEO-sider (casino-bonus, top-10, nye-casinoer, casinospil, live-casino)

**Fil: `public/sitemap.xml`**
- Tilfoej de 7 manglende community-URLs

### SEO-effekt
- 30+ sider faar interne links til community (via RelatedGuides)
- 5 cornerstone-sider faar prominente community-CTAs
- Google kan nu crawle community-siderne via det interne linknetvaerk
- Sitemappet sikrer direkte indeksering af alle community-URLs
