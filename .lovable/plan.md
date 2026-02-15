

## 8 nye casinospil-undersider

### Oversigt
Der oprettes 8 nye sider under `/casinospil/`-stien, som alle folger den etablerede skabelon fra Spillemaskiner og Hoj RTP-siderne. Hver side far minimum 3.000 ord unikt indhold, AI-genereret hero-billede, 7 unikke FAQ'er med JSON-LD schema, metadata-bar, breadcrumbs og RelatedGuides.

### Nye sider og URL-struktur

| Side | URL | Filnavn |
|------|-----|---------|
| Blackjack Regler | `/casinospil/blackjack` | `src/pages/casinospil/BlackjackGuide.tsx` |
| Roulette Regler | `/casinospil/roulette` | `src/pages/casinospil/RouletteGuide.tsx` |
| Poker Regler | `/casinospil/poker` | `src/pages/casinospil/PokerGuide.tsx` |
| Craps Regler | `/casinospil/craps` | `src/pages/casinospil/CrapsGuide.tsx` |
| Baccarat Regler | `/casinospil/baccarat` | `src/pages/casinospil/BaccaratGuide.tsx` |
| Roulette Strategi | `/casinospil/roulette-strategi` | `src/pages/casinospil/RouletteStrategiGuide.tsx` |
| Online Lotteri | `/casinospil/online-lotteri` | `src/pages/casinospil/OnlineLotteriGuide.tsx` |
| Online Game Shows | `/casinospil/game-shows` | `src/pages/casinospil/GameShowsGuide.tsx` |

### Indholdstemaer pr. side (3.000+ ord, helt unikke formuleringer)

**Blackjack Regler**: Spillets historie fra 1700-tallet, kortvaerdier og optaelling, haard vs. blod hand, splitting og doubling down, forsikring, surrender, soft 17-reglen, multi-hand blackjack, blackjack-varianter (European, Atlantic City, Spanish 21), house edge-analyse pr. variant, grundlaeggende strategi-tabel, bankroll management, live blackjack hos danske casinoer, bonusregler for bordspil.

**Roulette Regler**: Hjulets opbygning (europaeisk vs. amerikansk), indre og ydre væddemaal, straight up/split/street/corner/line, kolonner og dusiner, roulette-varianter (French, European, American, Lightning), La Partage og En Prison regler, RTP-sammenligning, live roulette-formater, hastighedsroulette, historie og udvikling.

**Poker Regler**: Casino poker vs. turneringspoker, Texas Hold'em regler trin-for-trin, Omaha og Three Card Poker, Caribbean Stud Poker, Video Poker-varianter og RTP, handraekkefolge fra Royal Flush til High Card, positionsspil, bluffing-strategi, pot odds og implied odds, bankroll management, live poker hos danske casinoer.

**Craps Regler**: Terningspillets anatomi, Pass Line og Don't Pass, Come og Don't Come, odds bets, proposition bets, house edge pr. vaeddemaal, craps-etikette, online vs. live craps, strategier for begyndere, historisk kontekst.

**Baccarat Regler**: Punto Banco-regler, kortvaerdier, tredje-kort-regler for Player og Banker, Tie-vaeddemaal og house edge, Mini Baccarat, Squeeze Baccarat, Lightning Baccarat, baccarat-strategier, bankroll management, baccarat i asiatisk casinokultur.

**Roulette Strategi**: Martingale, omvendt Martingale, D'Alembert, Fibonacci, Labouchere, James Bond-strategien, sektorvaeddemaal, matematisk analyse af hver strategi, simuleringer og forventet vaerdi, risikoprofiler, myteaflivning, praktiske tips til danske spillere.

**Online Lotteri**: Danske lotterityper, Euro Jackpot, Lotto, Keno, scratchcards, odds-sammenligning, RTP for lotterispil, lovgivning i Danmark, Spillemyndigheden og lotteri, tips til responsibelt lottospil, digitale lotteriplatforme.

**Online Game Shows**: Evolution Gaming's game show-koncept, Crazy Time, Dream Catcher, Monopoly Live, Lightning-serien, Deal or No Deal Live, spillemekanikker, RTP og volatilitet, live studio-produktion, strategier, sammenligning med traditionelle casinospil.

### Skabelon pr. side (identisk med Spillemaskiner/Hoj RTP)
- `<SEO>` komponent med unik title/description + FAQ JSON-LD + BreadcrumbList JSON-LD
- Gradient top bar
- Metadata-bar (forfatter, dato, laesetid)
- Hero-billede med `max-h-[400px]`
- H1 med tracking-tight
- 6-8 sektioner med H2/H3, Cards, interne links
- 7 unikke FAQ'er (80-150 ord pr. svar, JSX med interne links)
- `<RelatedGuides>` i bunden
- Separator mellem sektioner

### Filer der aendres

| Fil | Aendring |
|-----|----------|
| `src/pages/casinospil/BlackjackGuide.tsx` | Ny fil |
| `src/pages/casinospil/RouletteGuide.tsx` | Ny fil |
| `src/pages/casinospil/PokerGuide.tsx` | Ny fil |
| `src/pages/casinospil/CrapsGuide.tsx` | Ny fil |
| `src/pages/casinospil/BaccaratGuide.tsx` | Ny fil |
| `src/pages/casinospil/RouletteStrategiGuide.tsx` | Ny fil |
| `src/pages/casinospil/OnlineLotteriGuide.tsx` | Ny fil |
| `src/pages/casinospil/GameShowsGuide.tsx` | Ny fil |
| 8 hero-billeder i `src/assets/heroes/` | Nye AI-genererede billeder |
| `src/App.tsx` | 8 nye lazy-loaded routes |
| `src/lib/seoRoutes.ts` | 8 nye SEO-routes med priority 0.9 |
| `src/components/Breadcrumbs.tsx` | 8 nye route labels |
| `src/components/RelatedGuides.tsx` | Tilfojer de 8 nye sider til `generalGuides` |
| `src/components/Header.tsx` | Tilfojer alle 8 sider i Casinospil-dropdown (desktop submenu + mobil) som underpunkter, ligesom Spillemaskiner er nu |

### Navigation (Header)
Desktop: Under "Casinospil" dropdown far vi separate links for hver ny side, grupperet under "Casinospil Oversigt". Spillemaskiner beholder sin eksisterende submenu. De nye sider tilfojes som direkte links (ikke sub-submenus):

```
Casinospil Oversigt
---
Spillemaskiner >  (eksisterende submenu)
Blackjack
Roulette
Roulette Strategi
Poker
Craps
Baccarat
Online Lotteri
Game Shows
```

Mobil: Samme struktur under "Casinospil" expandable section med `ml-6` indrykning.

### SEO Routes
Alle 8 sider registreres med `changefreq: "weekly"` og `priority: 0.9` for at matche de andre casinospil-undersider.

