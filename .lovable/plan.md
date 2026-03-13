

## Analyse: Tre SEO-problemer fra Ahrefs

### Problem 1: 27 "Soft 404"-sider (KRITISK)
Ahrefs har fundet 27 URL'er der viser "Side ikke fundet (404)" men returnerer **HTTP 200** (soft 404). Dette sker fordi SPA-fallbacket i `_redirects` (`/* → /index.html 200`) serverer index.html for ALLE ukendte URL'er.

Disse URL'er er **forkerte varianter** af rigtige sider. Nogen linker eksternt eller fra gamle crawls til f.eks.:
- `/casino-bonus/free-spins` → rigtig rute er `/free-spins`
- `/blackjack` → rigtig rute er `/casinospil/blackjack`
- `/casinobonus` → rigtig rute er `/casino-bonus`
- `/casinospil/blackjack/martingale-system` → rigtig er `/casinospil/blackjack/martingale`
- `/royal-casino-anmeldelse` → rigtig er `/casino-anmeldelser/royal-casino`
- osv. (27 i alt)

**SEO-skade**: Google spilder crawl-budget, og soft 404'er forvirrer indekseringen. De deler alle samme content hash, hvilket signalerer "duplicate thin content" til Google.

**Løsning**: Tilføj 301-redirects i `public/_redirects` for alle 27 URL'er til deres korrekte destination. For de få der ikke har en match (fx `/casino-anmeldelser/888casino`), brug en ren 404-response.

### Problem 2: 7 slot-sider med "Slot ikke fundet" (MODERAT)
7 slots i `/slot-katalog/` (wheel-of-fortune, da-vinci-diamonds, siberian-storm, tombstone-rip, joker-strike, cleopatra, ecuador-gold) viser "Slot ikke fundet" fordi de enten:
- Ikke findes i `slot_catalog`-tabellen i databasen, ELLER
- Slug-genereringen ikke matcher (fx bindestreg vs. specialtegn)

**SEO-skade**: Identisk content hash på alle 7 = duplicate thin content. Crawl-budget spildt.

**Løsning**: Undersøg om disse slots mangler i databasen og tilføj dem, eller opret redirects/404 i `_redirects`. For `tombstone-rip` og `joker-strike` der har dedikerede guider under `/casinospil/spillemaskiner/`, tilføj redirects dertil.

### Problem 3: 2 near-duplicate sider (LAV)
`/casinospil/omaha-poker` og `/ordbog/hit-frequency` deler titel "De bedste Online Casinoer 2026". Dette skyldes at Ahrefs crawler uden JS og ser index.html's standard-titel for begge.
- `/casinospil/omaha-poker` er en **forkert URL** (rigtig er `/casinospil/poker/omaha`) → tilføj redirect
- `/ordbog/hit-frequency` er en rigtig rute men renderes dynamisk via JS, som Ahrefs ikke kan se

**SEO-skade**: Minimal, da Google renderer JS i second-wave og vil se korrekt indhold.

**Løsning**: Tilføj redirect for `/casinospil/omaha-poker` → `/casinospil/poker/omaha`.

---

### Implementeringsplan

**Én samlet ændring i `public/_redirects`** — tilføj ~30 nye 301-redirects OVER SPA-fallbacket:

```text
# Forkerte bonus-URL'er
/casino-bonus/free-spins-uden-indbetaling  /bonus-uden-indbetaling        301
/casino-bonus/velkomstbonus                /velkomstbonus                  301
/casino-bonus/free-spins                   /free-spins                     301
/casino-bonus/omsaetningsfri-bonus         /bonus-uden-omsaetningskrav     301
/casinobonus                               /casino-bonus                   301

# Forkerte spil-URL'er (mangler /casinospil/ prefix)
/blackjack                                 /casinospil/blackjack           301
/baccarat                                  /casinospil/baccarat            301
/craps                                     /casinospil/craps               301
/roulette                                  /casinospil/roulette            301

# Forkerte poker-varianter
/casinospil/texas-holdem                   /casinospil/poker/texas-holdem  301
/casinospil/three-card-poker               /casinospil/poker/three-card-poker  301
/casinospil/caribbean-stud-poker           /casinospil/poker/caribbean-stud    301
/casinospil/video-poker                    /casinospil/poker/video-poker       301
/casinospil/poker-strategi                 /casinospil/poker/poker-strategi    301
/casinospil/omaha-poker                    /casinospil/poker/omaha             301

# Forkerte blackjack-strategi-URL'er
/casinospil/blackjack/martingale-system    /casinospil/blackjack/martingale           301
/casinospil/blackjack/fibonacci-system     /casinospil/blackjack/fibonacci            301
/casinospil/blackjack/dalembert-system     /casinospil/blackjack/dalembert            301
/casinospil/blackjack/double-exposure      /casinospil/blackjack/double-exposure-blackjack  301

# Forkerte spillemaskine-URL'er
/hoj-rtp-spillemaskiner                    /casinospil/spillemaskiner/hoej-rtp  301
/spillemaskiner-hoej-rtp                   /casinospil/spillemaskiner/hoej-rtp  301
/casinospil/spillemaskiner/hoj-rtp         /casinospil/spillemaskiner/hoej-rtp  301
/casinospil/spilleautomater                /casinospil/spillemaskiner           301
/rtp-return-to-player                      /ordbog/rtp                          301

# Forkerte ordbog/anmeldelse-URL'er
/casino-ordbog/rng                         /ordbog/rng                          301
/royal-casino-anmeldelse                   /casino-anmeldelser/royal-casino     301

# Sider uden match → 404
/casino-anmeldelser/888casino              /404.html                            404

# Slot-redirects til guider
/slot-katalog/tombstone-rip                /casinospil/spillemaskiner/tombstone-rip  301
/slot-katalog/joker-strike                 /casinospil/spillemaskiner/joker-strike   301
/slot-katalog/cleopatra                    /casinospil/spillemaskiner/cleopatra      301
```

For de resterende 4 slot-sider (wheel-of-fortune, da-vinci-diamonds, siberian-storm, ecuador-gold) skal vi verificere om de findes i databasen. Hvis ikke, tilføjes de som 404 eller redirects til `/slot-database`.

