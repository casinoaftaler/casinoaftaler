

# Performance Optimization Plan: Fedesvin Bonanza

## 1. Edge Function: Batch PRNG

The `SeededPRNG` class (line 957-983) produces 8 floats per SHA-256 hash (32 bytes / 4 bytes each). After consuming all 8, it re-hashes. Currently every call is `async next()`.

**Change**: Add a synchronous batch method `nextBatch(n)` that pre-hashes enough rounds upfront, returning `number[]`. Then refactor these consumers to use batches:

- `generateBonanzaGrid` (line 680-751): ~60-80 PRNG calls per grid (5 rows × 6 cols symbol picks + dup rolls + shuffles). Replace individual `await prng.next()` with a pre-fetched batch array, indexing into it sequentially.
- `calculateBonanzaFullSpin` (line 848-937): Each tumble iteration calls `generateBonanzaGrid` + `applyBonanzaTumble` + `calculateBonanzaWins`. The batch approach propagates through.
- `applyBonanzaTumble` (line 805-846): Fill logic uses ~10-15 PRNG calls per tumble.

The batch method will calculate `ceil(n / 8)` SHA-256 hashes upfront and store all values in a buffer. This reduces `await` points from ~80 per grid to ~10 hash operations.

**Files**: `supabase/functions/slot-spin/index.ts` — add `nextBatch(n)` to `SeededPRNG`, refactor Bonanza grid generation and tumble fill functions. Gates functions will also benefit but are lower priority; we can convert them in the same pass since they use the same PRNG.

## 2. Edge Function: Cache tournament participation per request

Currently tournament checks happen in fire-and-forget blocks at 3 locations for Bonanza:
- **Normal spin** (lines 1817-1864): queries `tournament_participants`, `tournaments`, `tournament_entries`
- **Bonus end** (lines 1734-1781): identical queries repeated when bonus round completes

During a 15-spin bonus round, bonus spins don't record individually (only at the end), so tournament queries during intermediate bonus spins are unnecessary. But the normal spin path runs tournament logic on every single spin.

**Change**: 
- At the top of the Bonanza handler (around line 1703), add the tournament participation query to the existing `Promise.all` block alongside session/profile/bonus reads.
- Pass the cached `participations` result into the fire-and-forget tournament recording blocks instead of re-querying.
- For bonus spins that aren't the final spin, skip tournament logic entirely (it only matters when `newFreeSpins <= 0`).

This eliminates 1 DB query per normal spin (the `tournament_participants` select) from the critical path, and eliminates all tournament queries for intermediate bonus spins.

**Files**: `supabase/functions/slot-spin/index.ts`

## Summary

| Optimization | Expected Impact |
|---|---|
| Batch PRNG | ~80 await points → ~10 per grid; reduces CPU time on SHA-256 by ~8x per grid generation |
| Tournament cache | Eliminates 1-3 DB queries per spin; eliminates all tournament queries during bonus intermediate spins |

Both changes are internal to `supabase/functions/slot-spin/index.ts`. No client-side changes, no database changes, no breaking API changes.

