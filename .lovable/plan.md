

## Problem

The current `slot_leaderboard` materialized view aggregates stats across **all games** (no `game_id` filter). This means each tournament category (Flest Point, Højeste X, Største Gevinst) shows global rankings rather than game-specific ones:

- **Fedesvin Bonanza** should rank by total points on that game only
- **Book of Fedesvin** should rank by highest multiplier on that game only
- **Rise of Fedesvin** should rank by biggest single win on that game only

Additionally, admins need a way to configure these monthly tournament mappings (which category → which game, prizes, etc.).

---

## Plan

### Step 1: New materialized view — per-game monthly leaderboard

Create a new materialized view `slot_leaderboard_by_game` that groups by `(user_id, game_id)` instead of just `user_id`. It will compute the same monthly stats but per game:

```sql
CREATE MATERIALIZED VIEW public.slot_leaderboard_by_game AS
SELECT 
  user_id,
  game_id,
  COALESCE(sum(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month', ...)), 0) AS monthly_winnings,
  COALESCE(max(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month', ...)), 0) AS monthly_biggest_win,
  COALESCE(max(CASE WHEN bet_amount > 0 THEN ... END) FILTER (WHERE created_at >= date_trunc('month', ...)), 0) AS monthly_biggest_multiplier,
  count(*) FILTER (WHERE created_at >= date_trunc('month', ...)) AS monthly_spins,
  count(*) FILTER (WHERE is_bonus_triggered AND created_at >= date_trunc('month', ...)) AS monthly_bonuses
FROM slot_game_results
GROUP BY user_id, game_id;
```

With a unique index on `(user_id, game_id)` and sort indexes on the monthly columns. Also update `refresh_slot_leaderboard()` to refresh both views.

### Step 2: New table — `monthly_tournament_config`

Admin-configurable tournament settings:

```sql
CREATE TABLE public.monthly_tournament_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,        -- 'total_points', 'highest_x', 'highest_win'
  game_id text NOT NULL,         -- 'fedesvin-bonanza', 'book-of-fedesvin', 'rise-of-fedesvin'
  game_name text NOT NULL,       -- Display name
  prize_1 integer NOT NULL DEFAULT 500,
  prize_2 integer NOT NULL DEFAULT 300,
  prize_3 integer NOT NULL DEFAULT 200,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(category)
);
```

With RLS: anyone can SELECT, admins can manage. Seed with the current 3 configs.

### Step 3: Update `useSlotLeaderboard` hook

Add an optional `gameId` parameter. When provided, query `slot_leaderboard_by_game` filtered by `game_id` instead of the global `slot_leaderboard`. The tournament boxes will pass the game_id from config.

### Step 4: New hook — `useMonthlyTournamentConfig`

Fetches active configs from `monthly_tournament_config`. The tournament boxes and leaderboard card will use this instead of the hardcoded `TOURNAMENT_BOXES` array.

### Step 5: Update `MonthlyTournamentBoxes.tsx`

Replace the hardcoded `TOURNAMENT_BOXES` with data from `useMonthlyTournamentConfig()`. Each box passes `config.game_id` to `useSlotLeaderboard(config.category, config.game_id)`. Prize amounts come from the config. Game images remain mapped by `game_id` (local asset map).

### Step 6: Update `MonthlyLeaderboardCard.tsx`

Each category tab now queries the per-game leaderboard using the config's `game_id`. Show which game each category tracks.

### Step 7: Update `SlotLeaderboard.tsx` (in-game sidebar)

The leaderboard shown inside each game page should filter to only that game's stats. Pass `gameId` from the page component.

### Step 8: Update archive function

`archive-monthly-tournament/index.ts` should query `slot_leaderboard_by_game` with the correct `game_id` per category (fetched from `monthly_tournament_config`).

### Step 9: Admin panel — Monthly Tournament Config section

New component in admin panel to:
- View current tournament configs (category, game, prizes)
- Edit prizes and game assignments
- Add/remove tournament categories
- Toggle active/inactive

### Files to modify/create:
1. **Database migration** — new materialized view, new config table, update refresh function
2. **`src/hooks/useSlotLeaderboard.ts`** — add `gameId` parameter, query per-game view
3. **`src/hooks/useMonthlyTournamentConfig.ts`** — new hook (fetch config)
4. **`src/components/tournament/MonthlyTournamentBoxes.tsx`** — use dynamic config
5. **`src/components/tournament/MonthlyLeaderboardCard.tsx`** — use per-game data
6. **`src/components/slots/SlotLeaderboard.tsx`** — pass game filter
7. **`supabase/functions/archive-monthly-tournament/index.ts`** — use per-game view + config
8. **`src/components/admin/MonthlyTournamentAdmin.tsx`** — new admin component
9. **Admin page** — add the new section

