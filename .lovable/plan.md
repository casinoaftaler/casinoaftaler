

## Plan: Increase Cross-Cluster Linking to 3

### What changes and why

**Current state**: `MAX_CROSS_CLUSTER = 1` — each page gets 1 hub + 3 siblings + 1 cross-cluster link = 5 total. This creates weak lateral connections between clusters.

**Target state**: `MAX_CROSS_CLUSTER = 3` — each page gets 1 hub + 3 siblings + 3 cross-cluster links = 7 total (capped by `maxLinks`). Also increase default `maxLinks` from 5 to 7.

### File: `src/components/RelatedGuides.tsx`

**1. Constants (lines 221-223)**
- Change `MAX_CROSS_CLUSTER = 1` → `MAX_CROSS_CLUSTER = 3`

**2. Default maxLinks (line 1087)**
- Change `maxLinks = 5` → `maxLinks = 7`

**3. Add missing hub pools**
- Add `NYE_CASINOER_HUB_POOL` and `LIVE_CASINO_HUB_POOL` with natural rotation labels
- Add `nyeCasinoerHub` and `liveCasinoHub` to `resolveHubs()`

**4. Update every cluster section** to provide 3 unique cross-cluster links (no duplicate clusters). The priority mapping:

| Cluster | 3 Cross-Cluster Targets |
|---|---|
| **Slots** (`/casinospil/spillemaskiner/...`) | Spiludviklere, Anmeldelser, Bonus |
| **Casino Anmeldelser** (`/casino-anmeldelser/...`) | Betalingsmetoder, Casinospil, Bonus |
| **Bonus** (`/casino-bonus`, `/velkomstbonus`, etc.) | Anmeldelser, Nye Casinoer, Casinospil |
| **Betalingsmetoder** (`/betalingsmetoder/...`) | Nye Casinoer, Anmeldelser, Bonus |
| **Live Casino** (`/live-casino/...`) | Spiludviklere, Anmeldelser, Bonus |
| **Spiludviklere** (`/spiludviklere/...`) | Casinospil, Spillemaskiner, Anmeldelser |
| **Nye Casinoer** (`/nye-casinoer/...`) | Bonus, Anmeldelser, Betalingsmetoder |
| **Casinoer/Kategorier** (`/casinoer/...`) | Bonus, Anmeldelser, Betalingsmetoder |
| **Casino uden Konto** | Betalingsmetoder, Bonus, Anmeldelser |
| **Mobil Casino** | Betalingsmetoder, Bonus, Anmeldelser |
| **Casinospil generic** (`/casinospil/...`) | Spiludviklere, Bonus, Anmeldelser |

**5. Update all `.slice()` calls** from `MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER` (=5) → `MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER` (=7).

**6. Rotation logic for cross-cluster**: Use `pathHash` to rotate which 3 of the available cross-cluster options appear, ensuring no two pages in the same cluster show identical cross-links. Each section gets a `crossClusterOptions` array of 3+ targets, and we pick 3 deterministically using index offsets.

**7. Hub pages** (e.g., `/casino-anmeldelser`, `/betalingsmetoder`, `/spiludviklere`) also get 3 cross-cluster links instead of 1.

**8. Dedicated cluster sections** (roulette, blackjack, poker sub-pages) already have 5 manually curated links — these will be extended to include 1-2 additional cross-cluster targets where they currently have none.

### Not changed
- Legal/compliance pages (no cross-cluster by design)
- Ordbog (already has 5 curated cross-cluster links)
- Forfatter/Om pages (not money pages)

