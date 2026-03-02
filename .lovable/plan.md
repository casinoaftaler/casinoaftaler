

## Plan: Omstrukturering af det globale leaderboard til 3-kategori månedsturnering

### Overblik
Det globale leaderboard (slot-leaderboard) skal ændres fra en enkelt rangliste til en automatisk månedsturnering med **3 kategorier**, hver med sin egen vinder:

1. **Højeste X** (biggest_multiplier) -- Hvem har ramt den højeste multiplikator
2. **Største Gevinst** (biggest_win) -- Hvem har vundet mest i en enkelt bonus
3. **Flest Point** (total_winnings) -- Hvem har samlet flest point i alt

Brugere deltager automatisk -- ingen tilmelding nødvendig. Admin panel stats forbliver uændrede.

---

### Tekniske ændringer

#### 1. Database: Udvid materialized view med månedlige kategori-kolonner

Nuværende `slot_leaderboard` mangler `monthly_biggest_win` og `monthly_biggest_multiplier`. Ny migration:

- Tilføj `monthly_biggest_win` -- MAX(win) for indeværende måned
- Tilføj `monthly_biggest_multiplier` -- MAX(multiplier) for indeværende måned
- Tilføj indekser for hurtig sortering på de nye kolonner
- `monthly_winnings` eksisterer allerede og bruges til "Flest Point"

#### 2. Hook: Opdater `useSlotLeaderboard`

- Tilføj ny parameter `category`: `"highest_x"` | `"highest_win"` | `"total_points"` (default)
- Bevar `period` parameter men sæt standard til `"monthly"` da det nu er en månedsturnering
- Map kategorier til sort-kolonner:
  - `highest_x` sorterer efter `monthly_biggest_multiplier` (nyt felt) eller `biggest_multiplier` for alltime
  - `highest_win` sorterer efter `monthly_biggest_win` (nyt felt) eller `biggest_win` for alltime
  - `total_points` sorterer efter `monthly_winnings` eller `total_winnings` for alltime

#### 3. UI: Ombyg `SlotLeaderboard` komponent

- Erstat period-tabs (I dag/Uge/Måned/All-time) med **kategori-tabs**:
  - "Flest Point" (default)
  - "Højeste X"
  - "Største Gevinst"
- Vis relevant stat prominently per kategori (point, multiplier, eller gevinst)
- Titlen ændres til "Månedsturnering" med en badge der viser indeværende måned
- Vis **3 vindere** tydeligt i toppen (en per kategori) eller marker vinderen af den aktive kategori
- Dialog (fuld liste) beholder kategoriskift

#### 4. UI: Opdater `SidebarLeaderboard`

- Vis top 5 for den primære kategori (Flest Point)
- Tilføj en lille label "Månedsturnering - Marts 2026"

#### 5. UI: Opdater `MiniLeaderboard`

- Brug `monthly_winnings` i stedet for `total_winnings` for at vise den aktuelle måneds rangliste

#### 6. Eksisterende turneringer forbliver uændrede

Normale turneringer (med tilmelding, credits, clawback) fungerer stadig som før. Det globale leaderboard omdannes blot visuelt og data-mæssigt til en månedsturnering.

---

### Filer der ændres

| Fil | Ændring |
|---|---|
| `supabase/migrations/new.sql` | Genskab materialized view med `monthly_biggest_win`, `monthly_biggest_multiplier` |
| `src/hooks/useSlotLeaderboard.ts` | Tilføj `category` parameter, opdater sorterings-logik |
| `src/components/slots/SlotLeaderboard.tsx` | 3 kategori-tabs, vis relevant stat per kategori, "Månedsturnering" branding |
| `src/components/games/SidebarLeaderboard.tsx` | Brug monthly data, opdater label |
| `src/components/games/MiniLeaderboard.tsx` | Brug `monthly_winnings` i stedet for `total_winnings` |

### Hvad forbliver uændret
- Admin panel stats (`useSlotAdminStatistics`, `SlotPointsManagement`)
- Turnerings-systemet (join, credits, clawback)
- `useUserPoints` (profil-visning)
- `CompletedTournamentCard` / `CompletedTournamentRow`
- Leaderboard page (`/community/leaderboard`) -- viser stadig turneringer som før

