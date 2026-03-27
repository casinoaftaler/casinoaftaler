

# Plan: Genbrug af casino-anmeldelse screenshots på money pages

## Nuværende status

**23 review-sider** har screenshots (104 billeder totalt i `src/assets/screenshots/`).
**~28 money pages** har allerede screenshots (Kapow, Betinia m.fl.).
**~40+ money pages** har INGEN screenshots endnu — disse er målene.

## Tilgængelige review-screenshots og relevante money pages

### 1. Live Casino screenshots → Live Casino money pages (0 screenshots i dag)

| Screenshot | Target page | Kontekst |
|---|---|---|
| `mrgreen-live-blackjack.png` | `LiveCasino.tsx` | Ved live blackjack sektion |
| `mrgreen-live-roulette.png` | `LiveCasino.tsx` | Ved live roulette sektion |
| `betano-live-casino.png` | `live-casino/LiveBlackjackGuide.tsx` | Ved casino-lobby eksempel |
| `onecasino-live-casino.png` | `live-casino/LiveRouletteGuide.tsx` | Ved live dealer eksempel |
| `leovegas-live-casino.png` | `live-casino/LiveBaccaratGuide.tsx` | Ved live baccarat |
| `getlucky-live-casino.png` | `live-casino/LiveCasinoStrategiGuide.tsx` | Ved strategi-eksempel |
| `unibet-live-casino.png` | `live-casino/LiveCasinoUdbydereGuide.tsx` | Ved udbyder-sammenligning |
| `pokerstars-live-casino.png` | `live-casino/LightningRouletteGuide.tsx` | Ved Evolution gaming |
| `royalcasino-live-casino.png` | `live-casino/CrazyTimeGuide.tsx` | Ved game show lobby |

### 2. Spillemaskiner/lobby screenshots → Slots money pages (0 screenshots i dag)

| Screenshot | Target page | Kontekst |
|---|---|---|
| `leovegas-populaere-spil.png` | `Spillemaskiner.tsx` | Ved populære spillemaskiner |
| `casinostuen-spillemaskiner.png` | `SpillemaskinerHoejRTP.tsx` | Ved RTP-filtrering |
| `playkasino-spillemaskiner.png` | `JackpotSlots.tsx` | Ved spilleautomater |
| `unibet-filtre.png` | `slots/GatesOfOlympusGuide.tsx` | Ved slot-filter eksempel |
| `onecasino-spillemaskiner.png` | `slots/StarburstGuide.tsx` | Ved populære slots |
| `expekt-spillemaskiner.png` | `slots/SweetBonanzaGuide.tsx` | Ved spilleautomater |

### 3. Betaling/indbetaling screenshots → Payment pages (mangler screenshots)

| Screenshot | Target page | Kontekst |
|---|---|---|
| `bet365-saldo.png` | `payments/ApplePayGuide.tsx` | Ved indbetalingsoversigt |
| `playkasino-indbetaling.png` | `payments/RevolutGuide.tsx` | Ved betalingsmetoder |
| `mrvegas-betaling.png` | `payments/ZimplerGuide.tsx` | Ved betalingsoversigt |
| `expekt-betaling.png` | `payments/PayPalGuide.tsx` | Ved betaling (mangler lokal) |
| `onecasino-indbetaling.png` | `CasinoMedMobilePay.tsx` | Ved MobilePay-kasse |
| `spilnu-betaling.png` | `Betalingsmetoder.tsx` | Ekstra betaling-eksempel |
| `pokerstars-betaling.png` | `payments/VisaMastercardGuide.tsx` | Ved kort-betaling |

### 4. Kampagne/bonus screenshots → Bonus money pages (ingen screenshots)

| Screenshot | Target page | Kontekst |
|---|---|---|
| `betinia-bonussektion.webp` | `CashbackBonus.tsx` | Ved bonustyper |
| `888-kampagner.png` | `ReloadBonus.tsx` | Ved reload-kampagner |
| `royalcasino-kampagner.png` | `VipProgram.tsx` | Ved VIP-kampagner |
| `mrgreen-rakeback.png` | `NoStickyBonus.tsx` | Ved rakeback/sticky |
| `stake-kampagner.png` | `BonusHunt.tsx` | Ved community/kampagner |
| `comeon-kampagner.png` | `StickyBonus.tsx` | Ved bonusvilkår |
| `getlucky-kampagner.png` | `BonusUdenOmsaetningskrav.tsx` | Ved kampagneeksempel |
| `betinia-velkomstbonus-aktiv.webp` | `FreeSpinsIDag.tsx` | Ved aktiv bonus |

### 5. Forside/lobby screenshots → Generelle money pages

| Screenshot | Target page | Kontekst |
|---|---|---|
| `bet365-casino-lobby.png` | `CasinoApp.tsx` | Ved casino-app eksempel |
| `comeon-forside.png` | `MobilCasino.tsx` | Ved mobil-interface |
| `danskespil-forside.png` | `mobil-casino/BedsteAppsGuide.tsx` | Ved danske apps |
| `maria-forside.png` | `mobil-casino/IPhoneCasinoGuide.tsx` | Ved iPhone-venligt |
| `mrvegas-forside.png` | `mobil-casino/AndroidCasinoGuide.tsx` | Ved mobil lobby |
| `bwin-casino-lobby.png` | `mobil-casino/TabletCasinoGuide.tsx` | Ved tablet-layout |

### 6. Sportsbook screenshots → Casino-uden-konto pages

| Screenshot | Target page | Kontekst |
|---|---|---|
| `bet365-sportsbook.png` | `casino-uden-konto/PayNPlayGuide.tsx` | Ved hurtig adgang |
| `comeon-sportsbook.png` | `casino-uden-konto/HurtigRegistreringGuide.tsx` | Ved registrering |

### 7. Specialiserede screenshots

| Screenshot | Target page | Kontekst |
|---|---|---|
| `playkasino-hotcold.png` | `SpillemaskinerHoejRTP.tsx` | Ved hot/cold RTP-data |
| `casinostuen-shop.png` | `VipProgram.tsx` | Ved loyalitetsshop |
| `spilnu-vindere.png` | `JackpotSlots.tsx` | Ved jackpot-vindere |
| `videoslots-battle-of-slots.png` | `BonusHunt.tsx` | Ved turneringsformat |
| `danskespil-bingo.png` | `live-casino/DreamCatcherGuide.tsx` | Ved casual games |
| `maria-bingo.png` | `live-casino/MonopolyLiveGuide.tsx` | Ved casual lobby |
| `mrvegas-profil.png` | `ansvarligt-spil/SpillegraenserGuide.tsx` | Ved profilindstillinger |

## Samlet omfang

- **~50 screenshot-placeringer** på tværs af **~45 money pages**
- Hvert screenshot bruges max 2-3 gange på tværs af sider
- Unik alt-tekst og caption pr. instans
- Max 1-2 screenshots pr. side (interleaved med tekst)
- Ingen nye assets – alt genbruges fra eksisterende `src/assets/screenshots/`

## Teknisk implementation

For hver side:
1. Import det relevante screenshot-billede
2. Import `ReviewScreenshot` komponenten
3. Indsæt `<ReviewScreenshot src={...} alt="..." caption="..." size="full" />` mellem relevante tekstafsnit
4. Aldrig stacked – altid interleaved med tekst

