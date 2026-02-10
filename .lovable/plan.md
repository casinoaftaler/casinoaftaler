

## Fix: "Der opstod en fejl" When Starting Bonus Spins

### Problem
After triggering a bonus (3+ scatters), pressing SPIN gives the error "Der opstod en fejl. Prov igen." The bonus round never starts.

### Root Cause
There is a **race condition** in the server-side edge function (`slot-spin/index.ts`). When a normal spin triggers a bonus, the bonus state is written to the database using a **fire-and-forget** pattern (lines 1001-1008):

```text
Normal spin triggers bonus
  --> Server responds to client immediately with bonusState
  --> Server writes bonus to DB in background (fire-and-forget)
  --> Client shows scatter celebration + bonus overlay
  --> User closes overlay, client sets bonusState.isActive = true
  --> Client sends first bonus spin (isBonusSpin=true)
  --> Server queries DB for bonus state... IT DOESN'T EXIST YET
  --> Server returns "No active bonus" error
```

The delete + insert chain is not awaited, so the server responds before the database write completes. When the client sends the first bonus spin, the server looks up the bonus state in the database and finds nothing -- returning an error.

### Fix

**File: `supabase/functions/slot-spin/index.ts`** (lines ~1001-1008)

Change the bonus state write from fire-and-forget to **awaited**. The delete + insert must complete before the server responds, so the bonus state is guaranteed to exist when the first bonus spin arrives.

```typescript
// BEFORE (fire-and-forget -- causes race condition):
supabase
  .from("slot_bonus_state")
  .delete()
  .eq("user_id", userId)
  .eq("game_id", gameId)
  .then(() => supabase.from("slot_bonus_state").insert(bonusInsert))
  .catch(...);

// AFTER (awaited -- guarantees bonus state exists):
await supabase
  .from("slot_bonus_state")
  .delete()
  .eq("user_id", userId)
  .eq("game_id", gameId);

await supabase
  .from("slot_bonus_state")
  .insert(bonusInsert);
```

This adds a small amount of latency to the normal spin response (~20-40ms for two DB calls), but it eliminates the race condition entirely. The performance impact is minimal since bonus triggers are infrequent events.

### Technical Details

- Only the bonus state write changes from fire-and-forget to awaited
- The game result insert (line 1026) can remain fire-and-forget since it's analytics-only
- No client-side changes needed -- the client flow is correct, it's the server timing that's broken

