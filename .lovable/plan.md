

## Tournament Participation System

### Current Behavior
Right now, every spin automatically counts toward all active tournaments. There is no concept of "joining" a tournament -- all users are tracked by default.

### New Behavior
1. Users must press a **"Deltag"** (Join) button on the tournament card to participate
2. Upon joining, the tournament's `max_credits` value is added to the user's credit balance
3. Only spins from participants are tracked in the tournament leaderboard

---

### Step 1: New Database Table

Create a `tournament_participants` table to track who has joined each tournament:

- `id` (uuid, primary key)
- `tournament_id` (uuid, references tournaments)
- `user_id` (uuid)
- `joined_at` (timestamptz, default now())
- Unique constraint on `(tournament_id, user_id)`
- RLS: authenticated users can view all participants, insert their own, admins can manage all

### Step 2: Edge Function -- `join-tournament`

A new edge function that:
1. Validates the tournament exists and is active
2. Checks the user hasn't already joined (prevents double-joining)
3. Inserts into `tournament_participants`
4. If the tournament has `max_credits`, atomically adds those credits to the user's `slot_spins` balance (capped at 1000)
5. Logs the credit allocation in `credit_allocation_log`

This must be server-side to prevent manipulation of credit amounts.

### Step 3: Update `slot-spin` Edge Function

Modify the tournament tracking section (lines ~1082-1104 and ~831-853) to only record entries for tournaments where the user is a participant:

```text
Before: SELECT active tournaments matching game_id
After:  SELECT active tournaments matching game_id WHERE user is in tournament_participants
```

### Step 4: Frontend -- Join Button on Tournament Card

Update `TournamentLeaderboardCard` in `src/pages/Leaderboard.tsx`:
- Add a "Deltag" button for active tournaments the user hasn't joined yet
- Show "Du deltager" badge when already joined
- Disable the "Spil" play buttons until the user has joined
- Show how many credits they'll receive upon joining

### Step 5: Hook -- `useJoinTournament`

Add to `src/hooks/useTournaments.ts`:
- `useTournamentParticipation(tournamentId)` -- check if user has joined
- `useJoinTournament()` -- mutation calling the edge function
- Invalidate relevant queries on success

---

### Technical Details

**Database migration SQL:**
```sql
CREATE TABLE tournament_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(tournament_id, user_id)
);

ALTER TABLE tournament_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view participants"
  ON tournament_participants FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can join tournaments"
  ON tournament_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage participants"
  ON tournament_participants FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
```

**Edge function `join-tournament`:**
- Accepts `{ tournament_id }` in POST body
- Uses service role client for atomic credit operations
- Returns `{ success, creditsAwarded, newBalance }`

**slot-spin modification (lines ~1084-1090):**
```text
Add filter: .in('id', participatingTournamentIds)
where participatingTournamentIds comes from a lookup on tournament_participants
```

**Files to create/modify:**
- `supabase/functions/join-tournament/index.ts` (new)
- `supabase/functions/slot-spin/index.ts` (filter by participation)
- `src/hooks/useTournaments.ts` (add participation hooks)
- `src/pages/Leaderboard.tsx` (add Join button UI)
- Database migration (new table)

