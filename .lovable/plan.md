

# Plan: Genbrug eksisterende screenshots på sider uden visuel dækning

## Analyse-resultat

Vi har **115 unikke screenshots** i `src/assets/screenshots/`. Af ~91 money pages uden screenshots kan **~45 sider** beriges med eksisterende assets i korrekt kontekst.

## Screenshot-til-side mappings

### GRUPPE 1: Live Casino Game Shows (3 sider, 0 screenshots)
Disse sider handler om Evolution game shows og nævner live casino-lobbyer direkte.

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `DreamCatcherGuide.tsx` | `royalcasino-live-casino.png` | Allerede brugt på CrazyTime – viser game show lobby med Dream Catcher synlig |
| `DreamCatcherGuide.tsx` | `getlucky-live-casino.png` | Alternativ live casino-lobby med game shows |
| `MonopolyLiveGuide.tsx` | `casinostuen-live-casino.png` | Live casino-lobby med game show-sektion |
| `DealOrNoDealGuide.tsx` | `leovegas-live-casino.png` | LeoVegas live casino-lobby med Evolution game shows |

### GRUPPE 2: Casino-spil guides – Blackjack (7 sider, 0 screenshots)
Alle blackjack-varianter kan bruge eksisterende live blackjack-screenshots.

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `BlackjackGuide.tsx` | `mrgreen-live-blackjack.png` | Live blackjack-bord – passer til hovedguiden |
| `BlackjackGuide.tsx` | `danskespil-live-blackjack-bord.png` | Dansk blackjack-bord med 3:2 udbetaling |
| `EuropaeiskBlackjackGuide.tsx` | `danskespil-live-blackjack-bord.png` | Europæisk variant-bord |
| `AmerikanskBlackjackGuide.tsx` | `mrgreen-live-blackjack.png` | Blackjack-bord til sammenligning |
| `DoubleExposureBlackjackGuide.tsx` | `betano-live-casino.png` | Live casino-lobby med blackjack-borde |
| `MartingaleBlackjackGuide.tsx` | `danskespil-live-blackjack-bord.png` | Bord til strategi-illustration |
| `DalembertBlackjackGuide.tsx` | `mrgreen-live-blackjack.png` | Bord til strategi-illustration |
| `FibonacciBlackjackGuide.tsx` | `betano-live-casino.png` | Live casino med blackjack |

### GRUPPE 3: Casino-spil guides – Roulette (7 sider, 0 screenshots)
Roulette-varianter kan bruge vores live roulette-screenshots.

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `RouletteGuide.tsx` | `danskespil-live-roulette-bord.png` | Europæisk roulette-bord |
| `RouletteGuide.tsx` | `mrgreen-live-roulette.png` | Mr Green live roulette |
| `EuropaeiskRouletteGuide.tsx` | `danskespil-live-roulette-bord.png` | Europæisk hjul perfekt match |
| `AmerikanskRouletteGuide.tsx` | `danskespil-live-roulette.png` | Roulette-sammenligning |
| `FranskRouletteGuide.tsx` | `danskespil-live-roulette-bord.png` | Roulette-bord (La Partage) |
| `MartingaleRouletteGuide.tsx` | `mrgreen-live-roulette.png` | Roulette-bord til strategi |
| `RouletteStrategiGuide.tsx` | `danskespil-live-roulette-bord.png` | Roulette-bord til strategi |
| `DalembertRouletteGuide.tsx` | `mrgreen-live-roulette.png` | Roulette til d'Alembert |
| `FibonacciRouletteGuide.tsx` | `danskespil-live-roulette.png` | Roulette til Fibonacci |
| `JamesBondRouletteGuide.tsx` | `danskespil-live-roulette-bord.png` | Roulette til James Bond |
| `LabouchereRouletteGuide.tsx` | `mrgreen-live-roulette.png` | Roulette til Labouchere |

### GRUPPE 4: Casino-spil – Baccarat & Poker (5 sider, 0 screenshots)

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `BaccaratGuide.tsx` | `danskespil-live-baccarat.png` | Live baccarat-bord |
| `ThreeCardPokerGuide.tsx` | `danskespil-three-card-poker.png` | Perfekt match |
| `PokerGuide.tsx` | `pokerstars-forside.png` | PokerStars forside |
| `TexasHoldemGuide.tsx` | `danskespil-ultimate-texas-holdem.png` | Texas Hold'em bord |
| `CaribbeanStudGuide.tsx` | `danskespil-three-card-poker.png` | Poker-variant bord |

### GRUPPE 5: Game Shows hub (1 side, 0 screenshots)

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `GameShowsGuide.tsx` | `royalcasino-live-casino.png` | Game show-lobby |
| `GameShowsGuide.tsx` | `xxxtreme-lightning-roulette-multipliers.png` | Multiplier-mekanik (game show feature) |

### GRUPPE 6: Slot-guides uden screenshots (28 sider → ~15 kan dækkes)
Slot-guides handler om specifikke spil, men sektioner om "hvor kan man spille" eller "casino-lobby" kan bruge lobby/spillemaskiner-screenshots.

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `BookOfDeadGuide.tsx` | `leovegas-populaere-spil.png` | Populære slots inkl. Book of Dead |
| `BigBassBonanzaGuide.tsx` | `casinostuen-spillemaskiner.png` | Spillemaskiner-lobby |
| `BonanzaGuide.tsx` | `betinia-bonusbuy-lobby.webp` | Bonus buy-lobby (Bonanza er klassisk) |
| `CleopatraGuide.tsx` | `onecasino-spillemaskiner.png` | Spillemaskiner-lobby |
| `DeadOrAlive2Guide.tsx` | `mrvegas-spilleautomater.png` | Spilleautomater-lobby |
| `DivineFortuneGuide.tsx` | `mrgreen-jackpots.png` | Jackpot-sektion (Divine Fortune er jackpot-slot) |
| `GonzosQuestGuide.tsx` | `leovegas-lobby.png` | Casino-lobby med NetEnt-spil |
| `ImmortalRomanceGuide.tsx` | `videoslots-forside.png` | Videoslots med Microgaming-spil |
| `MegaMoolahGuide.tsx` | `mrgreen-jackpots.png` | Jackpot-sektion – Mega Moolah er #1 jackpot |
| `ReactoonzGuide.tsx` | `playkasino-spillemaskiner.png` | Spillemaskiner med Play'n GO |
| `WolfGoldGuide.tsx` | `expekt-spillemaskiner.png` | Spillemaskiner-lobby |
| `FireJokerGuide.tsx` | `comeon-forside.png` | Casino-forside med slots |
| `ThunderstruckIIGuide.tsx` | `videoslots-forside.png` | Videoslots med Microgaming |
| `MoneyTrain3Guide.tsx` | `betinia-bonusbuy-lobby.webp` | Bonus buy-lobby |
| `RazorSharkGuide.tsx` | `stake-forside.png` | Casino-forside med Push Gaming |

### GRUPPE 7: Sammenligninger uden screenshots (3 sider)

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `Bet365VsUnibet.tsx` | `bet365-casino-lobby.png` | Bet365 lobby |
| `Bet365VsUnibet.tsx` | `unibet-lobby.png` | Unibet lobby |
| `DanskeSpilVsSpilnu.tsx` | `danskespil-casino-lobby.png` | Danske Spil lobby |
| `DanskeSpilVsSpilnu.tsx` | `spilnu-lobby.png` | Spilnu lobby |
| `LeoVegasVsMrGreen.tsx` | `leovegas-lobby.png` | LeoVegas lobby |
| `LeoVegasVsMrGreen.tsx` | `mrgreen-lobby.png` | Mr Green lobby |

### GRUPPE 8: Casino uden konto (4 sider, 0 screenshots)

| Side | Screenshot | Kontekst |
|------|-----------|----------|
| `CasinoUdenKonto.tsx` | `kapow-mitid-registrering.png` | Registrering/MitID flow |
| `CasinoUdenKonto.tsx` | `betinia-mobilepay-kasse.webp` | Hurtig betaling |
| `FordeleOgUlemperGuide.tsx` | `kapow-mitid-godkendt.png` | MitID-godkendelse |
| `HurtigRegistreringGuide.tsx` | `kapow-registrering.png` | Registreringsflow (allerede brugt andetsteds) |
| `PayNPlayGuide.tsx` | `betinia-mobilepay-bekraeft.webp` | Hurtig betaling |

## Regler der overholdes

- Alle alt-tekster er unikke og tilpasset sidens kontekst
- Alle captions er unikke
- Screenshots interleaves mellem tekst (ikke stacked)
- Max 5 pr. side, size="full"
- Ingen eksisterende tekst slettes

## Implementeringsplan

Pga. omfanget (~45 sider, ~65 screenshot-indsættelser) opdeler vi i batches:

1. **Batch 1** – Live casino game shows + Game Shows hub (4 sider)
2. **Batch 2** – Blackjack-guides (8 sider)
3. **Batch 3** – Roulette-guides (8 sider)
4. **Batch 4** – Baccarat, poker, og casino-spil (5 sider)
5. **Batch 5** – Sammenligninger (3 sider)
6. **Batch 6** – Casino uden konto (4 sider)
7. **Batch 7** – Slot-guides del 1 (8 sider)
8. **Batch 8** – Slot-guides del 2 (7 sider)

## Samlet impact

- **~45 sider** opgraderes fra 0 til 1-2 screenshots
- **0 nye assets** nødvendige – 100% genbrug
- Dækningsgabet falder fra ~91 til ~46 sider
- Alle er kontekstuelt korrekte (ikke filler)

