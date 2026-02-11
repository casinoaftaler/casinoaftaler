

## Tilføj Månedlig Tracking til Leaderboard

### Overblik
Tilføjer en `monthly_winnings` kolonne til `slot_leaderboard`-viewet og en ny "Måned" tab i UI'et, så leaderboardet viser fire perioder: I dag, Denne uge, Denne måned og All-time.

### Database-ændring

Genskab `slot_leaderboard`-viewet med en ekstra `monthly_winnings` kolonne:

```sql
DROP VIEW IF EXISTS public.slot_leaderboard;

CREATE VIEW public.slot_leaderboard WITH (security_invoker=on) AS
SELECT
  user_id,
  SUM(win_amount + bonus_win_amount) AS total_winnings,
  MAX(win_amount + bonus_win_amount) AS biggest_win,
  MAX((win_amount + bonus_win_amount) / NULLIF(bet_amount, 0)) AS biggest_multiplier,
  COUNT(*) AS total_spins,
  COUNT(*) FILTER (WHERE is_bonus_triggered = true) AS total_bonuses,
  SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= CURRENT_DATE) AS daily_winnings,
  SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('week', CURRENT_DATE)) AS weekly_winnings,
  SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE)) AS monthly_winnings
FROM public.slot_game_results
GROUP BY user_id;
```

### Kode-ændringer

**1. `src/hooks/useSlotLeaderboard.ts`**
- Tilføj `monthly_winnings` til `LeaderboardEntry` interface
- Tilføj `"monthly"` som mulig period-type
- Tilføj `monthly_winnings` i select-query og sortKey-logik

**2. `src/components/slots/SlotLeaderboard.tsx`**
- Opdater `getDisplayWinnings` til at håndtere `"monthly"`
- Tilføj "Måned" tab i dialog-tabsene (4 kolonner i stedet for 3)
- Opdater period-state type til at inkludere `"monthly"`

**3. `src/pages/Leaderboard.tsx`**
- Tilføj "Måned" tab (4 kolonner i stedet for 3)
- Opdater `getDisplayWinnings` til at håndtere `"monthly"`
- Opdater period-state type

### Rækkefølge
1. Database-migration (tilføj `monthly_winnings` til viewet)
2. Opdater hook med ny type og query
3. Opdater begge UI-komponenter med "Måned" tab

