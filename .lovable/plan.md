

## Plan: Auto-join Monthly Tournaments

### Problem
Monthly tournaments currently require users to click "Deltag" (join) before their spins count. This should only be required for stream tournaments. Monthly tournaments should automatically track all players' spins.

### Current Architecture
- Monthly tournaments are stored in both the `tournaments` table AND `monthly_tournament_config`
- The `slot-spin` edge function checks `tournament_participants` before recording entries -- meaning users who haven't clicked "Deltag" get no tournament entries
- The monthly leaderboard boxes (`MonthlyTournamentBoxes`) use the `slot_leaderboard_by_game` materialized view, which works independently -- but the `TournamentCard` components also show these tournaments with a "Deltag" button

### Changes

**1. Add `is_monthly` flag to tournaments table**
- Add a boolean column `is_monthly` (default `false`) to distinguish monthly tournaments from stream tournaments
- Update the 3 current monthly tournaments to set `is_monthly = true`

**2. Update `slot-spin` edge function**
- In all 4 tournament-entry recording paths (bonanza spin, bonanza bonus end, regular spin, regular bonus end):
  - After checking `tournament_participants`, also query active tournaments where `is_monthly = true` that match the current `game_id`
  - Record entries for monthly tournaments regardless of whether the user is in `tournament_participants`

**3. Update frontend (Leaderboard page)**
- Filter out tournaments where `is_monthly = true` from the `TournamentCard` list (they're already displayed by `MonthlyTournamentBoxes`)
- Remove the "Deltag" button logic for monthly tournaments

**4. Update admin create/edit tournament forms**
- Add an `is_monthly` toggle to `CreateTournamentDialog` and `EditTournamentDialog` in `TournamentAdminSection.tsx`

### Files to modify
- `supabase/functions/slot-spin/index.ts` -- skip participation check for monthly tournaments
- `src/pages/Leaderboard.tsx` -- filter monthly tournaments from TournamentCard list
- `src/hooks/useTournaments.ts` -- add `is_monthly` to Tournament interface
- `src/components/TournamentAdminSection.tsx` -- add is_monthly toggle
- Database migration: add `is_monthly` column + update existing rows

