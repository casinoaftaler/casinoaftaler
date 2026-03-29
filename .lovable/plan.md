

## Investigation Results: Hunt #183/#184 Data Overlap and Duplicate Sessions

### Root Cause (confirmed)

The `bonus-hunt-proxy` edge function has a critical race condition in its session auto-creation logic (line 452-456):

```
.or(`hunt_number.eq.${huntNumber},streamsystem_hunt_id.eq.${ssHuntId}`)
.maybeSingle()
```

This `.maybeSingle()` call **fails silently when multiple rows match** (which happens with duplicates), returning `null` — causing the function to think no session exists and create yet another one. This snowball effect created **482 duplicate active sessions for hunt #184** and left **hunt #183 with 1 session still marked active** even though it should be completed.

### Data Issues Found

| Hunt | Sessions | Status | GTW Bets | AVGX Bets |
|------|----------|--------|----------|-----------|
| #183 | 1 | active (should be completed) | 0 | 0 |
| #184 | 482 | all active | 23 (scattered) | 8 (scattered) |

The bets for #184 are fragmented across different session IDs, so the frontend leaderboard shows incomplete data depending on which session is picked.

Additionally, hunt #183 was never properly closed/settled — it's still marked `active`, which means the proxy may confuse it with the current hunt.

### Fix Plan

**Step 1: Database Cleanup (migration)**
- Delete all duplicate hunt #184 sessions except the one we already closed betting on (`ebc1ed09...` — wait, that ID isn't in the results). Need to consolidate bets into a single canonical session.
- Mark hunt #183 session as `completed`.

**Step 2: Fix `bonus-hunt-proxy` session creation logic**
- Replace `.maybeSingle()` with `.order('created_at').limit(1).maybeSingle()` for the existing-session check.
- Add a `UNIQUE` constraint or use `SELECT ... FOR UPDATE` pattern to prevent race-condition duplicates.
- Before inserting a new session, do a second check with just `hunt_number` to catch races.

**Step 3: Fix `bonus-hunt-proxy` auto-close betting logic (line 489-493)**
- Same `.maybeSingle()` issue — when 482 rows exist for hunt #184, this query fails and betting never auto-closes.
- Replace with `.order('created_at', { ascending: true }).limit(1).maybeSingle()` to always pick the canonical (first) session.

**Step 4: Fix frontend session hook**
- `useBonusHuntSession` and `useBonusHuntSessionByHuntNumber` both use `.maybeSingle()` which will error on multi-row results. Add `.order().limit(1)` to make them deterministic.

### Files to Change

1. **`supabase/functions/bonus-hunt-proxy/index.ts`** — Fix 3 instances of `.maybeSingle()` without `.limit(1)` in session lookups; add duplicate-prevention guard before insert
2. **`src/hooks/useBonusHuntSession.ts`** — Add `.order().limit(1)` to `useBonusHuntSessionByHuntNumber`
3. **Database migration** — Clean up 481 duplicate #184 sessions (consolidate bets first), mark #183 as completed, add unique constraint on `(hunt_number)` for `bonus_hunt_sessions` to prevent future duplicates

### Technical Details

The fix ensures that:
- Session lookup always returns the oldest (canonical) session via `ORDER BY created_at ASC LIMIT 1`
- A unique constraint on `hunt_number` prevents duplicate inserts at the database level
- Existing bets are migrated to the canonical session before cleanup
- Hunt #183 is properly marked as completed so it doesn't interfere with #184

