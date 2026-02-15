
# Remove Unused Tournament Credits After Tournament Ends

## Problem
When a user joins a tournament, they receive bonus credits (e.g., 200) added to their regular balance. The tournament system tracks credits used via `tournament_entries.total_credits_used`, but when the tournament ends (or the user exhausts their tournament credit allowance), any unused credits remain in their balance. Users can exploit this by joining a tournament for free credits and spinning on non-tournament games.

## Solution
Create a mechanism to deduct unused tournament credits when the tournament ends, so users only keep credits they actually earned (winnings) during the tournament.

### Approach: Deduct on Tournament End (via the existing cron-based `update-tournament-status` Edge Function)

When the status automation function detects a tournament transitioning to "ended", it will:

1. For each participant, calculate `credits_awarded - total_credits_used` = unused credits
2. Deduct those unused credits from the participant's current `slot_spins` balance (floored at 0)
3. Log the deduction in `credit_allocation_log`

## Technical Changes

### 1. New Database Table: `tournament_credit_tracking`
Track how many credits were awarded to each participant so we know exactly how much to claw back.

```sql
CREATE TABLE tournament_credit_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  credits_awarded integer NOT NULL DEFAULT 0,
  credits_clawed_back integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(tournament_id, user_id)
);

ALTER TABLE tournament_credit_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tournament credit tracking"
  ON tournament_credit_tracking FOR ALL
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own credit tracking"
  ON tournament_credit_tracking FOR SELECT
  USING (auth.uid() = user_id);
```

### 2. Update `join-tournament` Edge Function
After awarding credits, also insert a record into `tournament_credit_tracking` with `credits_awarded`.

### 3. Update `update-tournament-status` Edge Function
When a tournament transitions to "ended":
- Query all `tournament_credit_tracking` rows for that tournament
- For each participant, sum their `total_credits_used` across `tournament_entries`
- Calculate unused = `credits_awarded - total_credits_used` (min 0)
- Deduct unused from today's `slot_spins.spins_remaining` (floor at 0)
- Update `tournament_credit_tracking.credits_clawed_back`
- Log in `credit_allocation_log` with source "tournament_clawback"

### 4. Also Handle Mid-Tournament Credit Exhaustion
In `slot-spin`, when `upsert_tournament_entry` detects that the user's next bet would exceed `max_credits`, the excess credits have already been consumed as regular spins. No clawback is needed mid-tournament since credits are deducted per-spin from `slot_spins` regardless.

## Files to Create/Modify
- **New migration**: Create `tournament_credit_tracking` table with RLS
- **Edit**: `supabase/functions/join-tournament/index.ts` -- insert tracking row after awarding credits
- **Edit**: `supabase/functions/update-tournament-status/index.ts` -- add clawback logic on tournament end

## Edge Cases
- If user's current balance is less than the unused credits, floor at 0
- If tournament had no `max_credits`, skip clawback (no credits were awarded)
- Race condition: use optimistic locking on `slot_spins` update
- Already clawed back: check `credits_clawed_back > 0` to prevent double-processing
