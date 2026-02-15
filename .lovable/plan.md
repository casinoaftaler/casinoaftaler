
## Tournament Global Leaderboard Exclusion

### Overview
Add an admin toggle per tournament to exclude tournament spins from the global leaderboard. When a player exhausts their tournament credits (`max_credits`), their subsequent spins resume counting toward the global leaderboard.

### Current Behavior
- Every spin inserts into `slot_game_results` (feeds global leaderboard via materialized view)
- Tournament participation is tracked separately via `tournament_entries`
- Both happen independently -- all spins always count for both

### New Behavior
- Admins can toggle "Tael ikke med i globalt leaderboard" per tournament
- When ON: spins that count toward a tournament are NOT inserted into `slot_game_results`
- When the user has exhausted `max_credits` in that tournament, spins resume counting for global leaderboard
- When OFF (default): current behavior -- all spins count for both

### Changes

#### 1. Database Migration
Add column to `tournaments` table:
```sql
ALTER TABLE public.tournaments
ADD COLUMN exclude_from_global_leaderboard boolean NOT NULL DEFAULT false;
```

#### 2. Edge Function: `slot-spin/index.ts`
This is the critical change. The current fire-and-forget flow must become conditional:

**Current flow (lines 1091-1133):**
1. Insert into `slot_game_results` (always)
2. Check tournament participation and upsert tournament entry

**New flow:**
1. Check if user participates in any active tournament with `exclude_from_global_leaderboard = true`
2. For each such tournament, check if user has NOT yet exceeded `max_credits` (query `tournament_entries` for `total_credits_used`)
3. If user is actively contributing to an exclusion-tournament (credits not exhausted): **skip** `slot_game_results` insert
4. If user has exceeded credits OR no exclusion-tournament applies: **insert** into `slot_game_results` as normal
5. Tournament entry upsert continues as before (the `upsert_tournament_entry` RPC already handles the credit cap check internally)

The tournament lookup needs to be promoted from fire-and-forget to awaited (at least partially) so we can determine whether to skip the global insert. The tournament query will be expanded to also select `exclude_from_global_leaderboard` and `max_credits`.

Same logic applies to the bonus completion path (lines 827-869).

#### 3. Admin UI: `TournamentAdminSection.tsx`
Add a `Switch` toggle in both `CreateTournamentDialog` and `EditTournamentDialog`:
- Label: "Ekskluder fra globalt leaderboard"
- Description: "Turneringsspins taeller ikke med i det globale leaderboard. Naar maks credits er brugt, taeller spins igen."
- State: `excludeFromGlobalLeaderboard` (boolean, default false)
- Pass to create/update mutations

#### 4. Hooks: `useTournaments.ts`
- Add `exclude_from_global_leaderboard: boolean` to `Tournament` interface
- Pass it through in `useCreateTournament` and `useUpdateTournament` mutations

#### 5. Tournament Display: `Leaderboard.tsx`
- Show a small indicator badge when a tournament excludes global leaderboard (informational)

### Technical Details

**Slot-spin logic change (pseudocode):**
```
// Before recording game result, check tournament exclusion
let skipGlobalLeaderboard = false;

const participations = await serviceClient
  .from("tournament_participants")
  .select("tournament_id")
  .eq("user_id", userId);

if (participations?.length > 0) {
  const activeTournaments = await serviceClient
    .from("tournaments")
    .select("id, exclude_from_global_leaderboard, max_credits")
    .in("id", participatingIds)
    .contains("game_ids", [gameId])
    .lte("starts_at", nowISO)
    .gte("ends_at", nowISO);

  for (const t of activeTournaments) {
    if (t.exclude_from_global_leaderboard && t.max_credits) {
      // Check current credits used
      const { data: entry } = await serviceClient
        .from("tournament_entries")
        .select("total_credits_used")
        .eq("tournament_id", t.id)
        .eq("user_id", userId)
        .eq("game_id", gameId)
        .maybeSingle();

      const used = entry?.total_credits_used || 0;
      if (used + bet <= t.max_credits) {
        skipGlobalLeaderboard = true;
      }
    }

    // Upsert tournament entry (as before)
    serviceClient.rpc("upsert_tournament_entry", {...});
  }
}

if (!skipGlobalLeaderboard) {
  serviceClient.from("slot_game_results").insert({...});
}
```

### Files to Change

| File | Change |
|------|--------|
| Database migration | Add `exclude_from_global_leaderboard` column |
| `supabase/functions/slot-spin/index.ts` | Conditional `slot_game_results` insert based on tournament exclusion + credit check (both normal spin and bonus completion paths) |
| `src/components/TournamentAdminSection.tsx` | Add toggle in create/edit dialogs + show indicator in tournament rows |
| `src/hooks/useTournaments.ts` | Add field to `Tournament` interface + create/update mutations |
| `src/pages/Leaderboard.tsx` | Show informational badge for excluded tournaments |

### Edge Cases
- User in multiple tournaments: if ANY active tournament has exclusion ON and credits not exhausted, skip global insert
- Tournament without `max_credits` but with exclusion ON: all spins during the tournament are excluded from global (no "resume" point)
- Bonus completion: same exclusion logic applies to the bonus win recording path
