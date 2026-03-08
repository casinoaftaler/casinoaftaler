

## Komplet SEO & Link Audit – Alle Clusters

### Audit Metode
Gennemgang af 3 kritiske filer: `entityAutoLinker.ts` (auto-linking), `RelatedGuides.tsx` (kontekstuelle links), `navData.ts` (header navigation). Verificeret mod alle kendte clusters.

---

### Cluster-for-cluster status

| Cluster | entityAutoLinker | RelatedGuides blok | navData | Status |
|---------|-----------------|-------------------|---------|--------|
| **Bonus** (10 spokes) | ✅ Alle 10 | ✅ Dedikeret rotation | ✅ BONUS_LINKS | Komplet |
| **Betalingsmetoder** (10 spokes) | ✅ Alle 10 | ✅ Dedikeret rotation | ✅ PAYMENT_LINKS | Komplet |
| **Spiludviklere** (12 spokes) | ✅ Alle 12 | ✅ Dedikeret rotation | ✅ PROVIDER_LINKS | Komplet |
| **Casinospil** (slots/blackjack/roulette/poker) | ✅ Hub-entries | ✅ Per-page + generic | ✅ Full nav | Komplet |
| **Nye Casinoer** (8 spokes) | ✅ Hub-entry | ✅ Dedikeret rotation | ✅ NYE_CASINOER_LINKS | Komplet |
| **Mobil Casino** (5 spokes) | ✅ 4 entries | ✅ Dedikeret blok | ✅ I CASINO_LINKS | Komplet |
| **Casino Anmeldelser** (22+) | ✅ N/A (brands) | ✅ Dedikeret rotation | ✅ REVIEW links | Komplet |
| **Ansvarligt Spil** (6 spokes) | ❌ **MANGLER** | ✅ legalLinks blok | ✅ I MORE_LINKS | **Delvist** |
| **Casino uden Konto** (3 spokes) | ✅ Hub-entry | ❌ **MANGLER** | ✅ I CASINO_LINKS | **Delvist** |
| **Live Casino** (5 spokes) | ✅ Hub-entry | ❌ **MANGLER** | ✅ LIVE_CASINO_LINKS | **Delvist** |
| **Slot Kategorier** (3: Megaways/Jackpot/Bonus Buy) | ❌ **MANGLER** | ✅ Dedikerede blokke | ❌ **MANGLER** | **Delvist** |
| **Ordbog** (70 termer) | ✅ 40+ entries | ✅ Dedikeret blok | ✅ I MORE_LINKS | Komplet |

---

### ❌ Mangler der skal fixes

#### 1. **entityAutoLinker.ts** — Manglende entities

**Ansvarligt Spil cluster** (0 entries → behøver 3-4):
- `ROFUS` → allerede linket til `/ansvarligt-spil` ✅, men spoke `/ansvarligt-spil/rofus` mangler
- `ludomani` / `spilleafhængighed` → `/ansvarligt-spil/ludomani`
- `StopSpillet` → `/ansvarligt-spil/stopspillet`
- `spillegrænser` / `indbetalingsgrænse` → `/ansvarligt-spil/spillegraenser`
- `selvudelukkelse` → `/ansvarligt-spil/selvudelukkelse-guide`

**Slot Kategorier** (0 entries → behøver 3):
- `megaways` er allerede i ordbog `/ordbog/megaways` → bør omdirigeres til money-page `/megaways-slots`
- `jackpot slots` / `progressive jackpot` → `/jackpot-slots`
- `bonus buy` / `feature buy` er allerede i ordbog `/ordbog/buy-bonus` → OK, men mangler money-page entry `/bonus-buy-slots`

**Live Casino spokes** (0 spoke-entries → behøver 3-4):
- `live blackjack` → `/live-casino/blackjack`
- `live roulette` → `/live-casino/roulette`
- `lightning roulette` → `/live-casino/lightning-roulette`
- `live baccarat` → `/live-casino/baccarat`

#### 2. **RelatedGuides.tsx** — Manglende dedikerede blokke

**Casino uden Konto** (3 spokes: `/pay-n-play`, `/hurtig-registrering`, `/fordele-og-ulemper`):
- Ingen `if (path.startsWith("/casino-uden-konto/"))` blok
- Alle 3 spokes falder ned i generic fallback → viser kun `[bonusHub, paymentHub, providerHub, reviewHub]`
- **Fix:** Tilføj dedikeret blok med hub + roterede siblings + cross-cluster (betalingsmetoder/bonus)

**Live Casino spokes** (5: blackjack, roulette, baccarat, lightning-roulette, monopoly-live):
- `/live-casino` hub fanges af `path === "/live-casino"` i casinospil-fallback (linje 816)
- Men spokes `/live-casino/blackjack` etc. matchers af `path.startsWith("/casinospil/")` → **NEJ**, de starter med `/live-casino/` som IKKE matches
- De falder ned i generic fallback
- **Fix:** Tilføj dedikeret `if (path.startsWith("/live-casino/"))` blok med hub + roterede siblings + cross-cluster

#### 3. **navData.ts** — Manglende entries

**Slot Kategorier** mangler i navigation:
- `/megaways-slots`, `/jackpot-slots`, `/bonus-buy-slots` er ikke i nogen nav-gruppe
- De er kun tilgængelige via RelatedGuides og inline links
- **Fix:** Tilføj til SLOT_LINKS eller ny sektion

#### 4. **entityAutoLinker.ts** — Prioriterings-konflikt

`megaways` entity peger pt. på `/ordbog/megaways` (glossary). Men `/megaways-slots` er en money-page med 0.8 priority. Ifølge prioriterings-reglen skal money-pages outranke glossary.
- **Fix:** Flyt `megaways` op til money-page sektion → `/megaways-slots`

---

### Implementeringsplan (3 filer)

**1. `src/lib/entityAutoLinker.ts`**
- Tilføj ~10 nye entity mappings:
  - Live Casino spokes (4): `live blackjack`, `live roulette`, `lightning roulette`, `live baccarat`
  - Ansvarligt Spil spokes (4): `ludomani`/`spilleafhængighed`, `StopSpillet`, `spillegrænser`, `selvudelukkelse`
  - Slot Kategorier (2): `jackpot slots` → `/jackpot-slots`, `bonus buy slots` → `/bonus-buy-slots`
  - Megaways prioritets-fix: flyttes fra `/ordbog/megaways` → `/megaways-slots`

**2. `src/components/RelatedGuides.tsx`**
- Tilføj dedikeret blok for **Casino uden Konto** (`/casino-uden-konto/` spokes) med hub + 2 siblings + cross-cluster (betalingsmetoder/bonus)
- Tilføj dedikeret blok for **Live Casino spokes** (`/live-casino/`) med hub + roterede siblings + cross-cluster (casinospil/bonus)
- Placeres OVER det generiske casinospil-fallback (linje 816) for at undgå at blive fanget

**3. `src/components/header/navData.ts`**
- Tilføj Megaways Slots, Jackpot Slots og Bonus Buy Slots til en passende nav-sektion (fx tilføj til SLOT_LINKS eller opret ny `SLOT_CATEGORY_LINKS`)

