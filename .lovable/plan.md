

## Plan: Opdater Jonas' artikelliste med ALLE hans sider

### Problem
`jonasArticles`-arrayet i `src/pages/Forfatter.tsx` indeholder ~96 statiske artikler, men der er ~110+ sider på sitet med `author="jonas"`. Mange nyligt tilføjede sider (blackjack-varianter, roulette-varianter, poker-cluster, bonus-guides m.fl.) mangler fra listen og vises derfor ikke på Jonas' forfatterprofil.

### Manglende artikler der skal tilføjes

**Blackjack-cluster (7 sider):**
- Amerikansk Blackjack (`/casinospil/blackjack/amerikansk-blackjack`)
- Europaeisk Blackjack (`/casinospil/blackjack/europaeisk-blackjack`)
- Double Exposure Blackjack (`/casinospil/blackjack/double-exposure-blackjack`)
- Spanish 21 (`/casinospil/blackjack/spanish-21`)
- Martingale System (`/casinospil/blackjack/martingale-system`)
- Fibonacci System (`/casinospil/blackjack/fibonacci-system`)
- D'Alembert System (`/casinospil/blackjack/dalembert-system`)

**Roulette-cluster (3 sider):**
- Fransk Roulette (`/casinospil/roulette/fransk-roulette`)
- Amerikansk Roulette (`/casinospil/roulette/amerikansk-roulette`)
- Labouchere Roulette (`/casinospil/roulette/labouchere-roulette`)
- D'Alembert Roulette (`/casinospil/roulette/dalembert-roulette`)

**Poker-cluster (6 sider):**
- Texas Hold'em (`/casinospil/poker/texas-holdem`)
- Omaha Poker (`/casinospil/poker/omaha`)
- Video Poker (`/casinospil/poker/video-poker`)
- Poker Strategi (`/casinospil/poker/strategi`)
- Three Card Poker (`/casinospil/poker/three-card-poker`)
- Caribbean Stud Poker (`/casinospil/poker/caribbean-stud`)

**Bonus-cluster (2 sider):**
- Reload Bonus (`/reload-bonus`)
- Cashback Bonus (`/cashback-bonus`)

**Andre manglende:**
- Casinoer Hub (`/casinoer`)
- Videoslots Anmeldelse (`/casino-anmeldelser/videoslots`)
- Free Spins i Dag (`/free-spins-i-dag`)

### Teknisk implementation

**Fil: `src/pages/Forfatter.tsx`**
- Tilføj alle ~22 manglende artikler til `jonasArticles`-arrayet med korrekt titel, path, kategori, dato og excerpt
- Opdater datoer for eksisterende artikler der er blevet opdateret (fx blackjack hub til 02-03-2026, poker hub til 02-03-2026)
- Opdater `readTime` for artikler der er blevet kraftigt udvidet (fx Blackjack: 40 min, Poker: 38 min)
- Organisere arrayet med tydelige kommentarer per cluster

### Validering
- Alle sider med `AuthorMetaBar author="jonas"` skal have en matchende entry
- Sider med `author="kevin"` eller `author="ajse"` skal IKKE inkluderes
- Paginering (8 per side) vil automatisk opdateres da `totalArticlePages` beregnes dynamisk

