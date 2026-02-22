

# Bonus Hunt -- Community Betting Feature

## Oversigt

En ny community-sektion hvor brugere kan se live bonus hunt data fra StreamSystem API og placere bets med deres spillehal-credits pa to kategorier:

1. **GTW (Guess the Win)**: Gaet pa end balance. Admin saetter praemier (StreamElements points) til top-placerede.
2. **AVG X**: Bet pa multiplier-grupper (A-J). Alle credits fra bets gar i en pot -- vindende gruppe deler potten.

---

## Database Design

### Nye tabeller

**bonus_hunt_sessions** -- tracker aktive/afsluttede hunts
- `id` (uuid, PK)
- `streamsystem_hunt_id` (text) -- ID fra API
- `hunt_number` (integer) -- f.eks. 1367
- `status` (text: 'upcoming', 'betting_open', 'betting_closed', 'completed')
- `gtw_betting_open` (boolean, default false)
- `avgx_betting_open` (boolean, default false)
- `gtw_min_bet` / `gtw_max_bet` (integer)
- `avgx_min_bet` / `avgx_max_bet` (integer)
- `gtw_prizes` (jsonb) -- f.eks. [{"place": 1, "points": 300}, ...]
- `end_balance` (numeric, nullable) -- udfyldes nar hunt er faerdig
- `average_x` (numeric, nullable)
- `winning_group` (text, nullable) -- A-J
- `created_at`, `updated_at`
- `created_by` (uuid) -- admin

**bonus_hunt_gtw_bets** -- brugernes GTW gaet
- `id` (uuid, PK)
- `session_id` (uuid, FK -> bonus_hunt_sessions)
- `user_id` (uuid)
- `guess_amount` (numeric) -- det beloeb brugeren gaetter pa
- `bet_amount` (integer) -- credits brugt
- `difference` (numeric, nullable) -- udfyldes ved settlement
- `rank` (integer, nullable) -- udfyldes ved settlement
- `prize_points` (integer, nullable) -- SE points vundet
- `created_at`
- UNIQUE(session_id, user_id) -- kun eet gaet per hunt

**bonus_hunt_avgx_bets** -- brugernes AVG X bets
- `id` (uuid, PK)
- `session_id` (uuid, FK -> bonus_hunt_sessions)
- `user_id` (uuid)
- `group_letter` (text) -- A-J
- `bet_amount` (integer)
- `winnings` (integer, nullable) -- udfyldes ved settlement
- `created_at`
- UNIQUE(session_id, user_id) -- kun eet bet per hunt

### AVG X Grupper (faste)

| Gruppe | Range |
|--------|-------|
| A | 0-59x |
| B | 60-69x |
| C | 70-79x |
| D | 80-89x |
| E | 90-99x |
| F | 100-109x |
| G | 110-119x |
| H | 120-129x |
| I | 130-139x |
| J | 140x+ |

### RLS Policies

- **SELECT**: Alle kan se sessions og bets (community feature)
- **INSERT bets**: Kun authenticated users (`auth.uid() = user_id`)
- **Admin**: Full CRUD pa sessions, settlement af bets

---

## Edge Functions

### 1. `bonus-hunt-proxy`
- Proxyer requests til StreamSystem API for at undga CORS
- Returnerer slot-liste, statistik og hunt-metadata
- Ingen auth required

### 2. `bonus-hunt-place-bet`
- Auth required
- Validerer: betting vindue abent, min/max bet, bruger har credits, ikke allerede bettet
- Deducts credits via `deduct_spin()` funktionen
- Indsaetter bet i relevant tabel (GTW eller AVG X)

### 3. `bonus-hunt-settle` (admin only)
- Admin trigger nar hunt er faerdig
- **GTW**: Beregner difference fra end balance, rangerer, tildeler SE points via StreamElements API
- **AVG X**: Finder vindende gruppe, beregner pot, fordeler credits til vinderne (tilfojer til slot_spins)

---

## Frontend Komponenter

### Side: `/community/bonus-hunt`

**Layout** (2-kolonner som SpinTheReel):

**Venstre kolonne -- Slot Liste:**
- Navigation: `<<` `<` `BONUS HUNT #1367 20 FEB` `>` `>>`
- Sogefelt "Find Slot or Provider"
- Tabel: #, Slot, Bet, X, Win (sortable kolonner)
- Pagination (10 pr. side)
- Footer bar: Hunt Start, Hunt Duration, Opening Start, Opening Duration, Bonus Hunt End, Total Duration

**Hojre kolonne -- 3 Tabs:**

1. **STATS tab**: Bonus Hunt info (status, antal bonusser, target balance, end balance, avg bet, average X, break-even X, highest win, highest multiplier)

2. **GTW tab**: 
   - "Your Guess" + "Prediction Gap" cards
   - Total Win display
   - Prize Pool tabel (1st-10th med points)
   - Leaderboard (top gaet sorteret efter naermest)
   - Input felt + "Placer Bet" knap (nar betting er abent)

3. **AVG X tab**:
   - 10 gruppe-knapper (A-J) med farver og % fordeling af bets
   - "Winners" + "Your Bet" cards
   - "Average X" + "Bet Amount" cards
   - Info: Reward (2x bet amount) + Participants
   - Input felt + "Vaelg Gruppe" knap (nar betting er abent)

### Navigation
- Ny tab i `CommunityNav`: "Bonus Hunt" med `Target` ikon
- Ny card i `CommunityHub` SECTIONS array
- Ny route i `App.tsx`

### Admin Panel
- Ny sektion i Admin panel til at:
  - Oprette/linke hunt session til StreamSystem hunt ID
  - Abne/lukke betting vindue (GTW/AVG X separat)
  - Saette min/max bet og praemier
  - Settle/afslutte hunt (trigger praemiefordeling)

---

## Tekniske Detaljer

### Data Flow

```text
StreamSystem API --> bonus-hunt-proxy (edge fn) --> Frontend
                                                      |
User places bet --> bonus-hunt-place-bet (edge fn) --> Deduct credits + Insert bet
                                                      |
Admin settles   --> bonus-hunt-settle (edge fn)    --> Calculate winners + Award prizes
```

### Fil-struktur (nye filer)

```text
src/pages/BonusHunt.tsx
src/components/bonus-hunt/BonusHuntSlotTable.tsx
src/components/bonus-hunt/BonusHuntStatsTab.tsx
src/components/bonus-hunt/BonusHuntGTWTab.tsx
src/components/bonus-hunt/BonusHuntAvgXTab.tsx
src/components/bonus-hunt/BonusHuntFooter.tsx
src/components/bonus-hunt/BonusHuntNavigation.tsx
src/hooks/useBonusHuntData.ts
src/hooks/useBonusHuntSession.ts
supabase/functions/bonus-hunt-proxy/index.ts
supabase/functions/bonus-hunt-place-bet/index.ts
supabase/functions/bonus-hunt-settle/index.ts
```

### Implementeringsraekkefolge

1. Database migration (tabeller + RLS)
2. Edge function: `bonus-hunt-proxy` (API proxy)
3. Frontend: Side-layout + slot-tabel + stats tab (read-only visning)
4. Edge function: `bonus-hunt-place-bet`
5. Frontend: GTW tab med betting UI
6. Frontend: AVG X tab med gruppe-betting UI
7. Edge function: `bonus-hunt-settle`
8. Admin panel: Session management + settlement
9. Navigation: CommunityNav + CommunityHub card + Route
10. Test end-to-end

