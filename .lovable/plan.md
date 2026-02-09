

## Optimize Slot Spin Edge Function Response Time

### Problem
The `slot-spin` edge function runs **7-10 sequential database queries** on every normal spin. Each round-trip adds ~10-30ms, resulting in total server response times of 200-400ms+ when they could be much faster.

### Current Sequential Flow (Normal Spin)

```text
1. auth.getClaims(token)          ~20ms
2. slot_active_sessions SELECT    ~15ms
3. slot_symbols SELECT            ~15ms
4. profiles SELECT                ~15ms
5. site_settings SELECT           ~15ms
6. slot_spins UPSERT              ~15ms
7. slot_spins SELECT              ~15ms
8. slot_spins UPDATE              ~15ms
9. slot_game_results INSERT       ~15ms
                          Total: ~140-300ms+
```

### Optimizations

**1. Parallelize independent reads (biggest win)**

Steps 2-5 only depend on `userId` and `gameId` (available right after auth). Run them all simultaneously:

```text
Promise.all([
  slot_active_sessions SELECT,
  slot_symbols SELECT,
  profiles SELECT,
  site_settings SELECT
])
```

This cuts 4 sequential queries (~60ms) down to 1 parallel round (~15ms).

**2. Fire-and-forget the analytics insert**

The `slot_game_results` INSERT (step 9) is analytics/logging. The player doesn't need to wait for it. Remove `await` and let it complete in the background with error logging.

**3. Fire-and-forget bonus state writes**

When a bonus triggers, the delete + insert of `slot_bonus_state` can also run without blocking the response, since the client won't use it until the next spin.

### Estimated Improvement

```text
Before: ~140-300ms (9 sequential queries)
After:  ~60-120ms  (4 sequential steps)

Step 1: auth.getClaims                    ~20ms
Step 2: Promise.all (4 parallel queries)  ~15ms
Step 3: slot_spins UPSERT + SELECT        ~30ms
Step 4: slot_spins UPDATE + response      ~15ms
(game_results + bonus_state: fire-and-forget)
```

Roughly **2-3x faster** response times.

### Technical Details

**File: `supabase/functions/slot-spin/index.ts`**

- After `getClaims`, wrap the 4 independent reads in `Promise.all`:
  - `slot_active_sessions` (session validation)
  - `slot_symbols` (game symbols)
  - `profiles` (bonus spins permanent)
  - `site_settings` (daily spins config)
- Remove `await` from `slot_game_results` insert, replace with `.then(() => {}).catch(err => console.error(...))` pattern
- Remove `await` from the bonus state delete + insert sequence when bonus triggers, using the same fire-and-forget pattern
- Apply the same parallelization to the **bonus spin path**: run `slot_bonus_state` SELECT and `slot_symbols` SELECT in parallel
- No logic changes -- same queries, same validation, same anti-cheat checks, just reordered for concurrency

### Safety Notes

- All validation logic stays the same (session check, spin count, bet validation)
- Fire-and-forget writes log errors so failures are visible in edge function logs
- The `ignoreDuplicates` upsert + separate SELECT pattern is kept as-is since it's needed for correctness

