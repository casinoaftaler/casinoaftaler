

# Slot Machine Performance Optimization Plan

## Problem Analysis

After a thorough code review, I've identified bottlenecks across both the **backend (Edge Function)** and **frontend (React)** that compound under concurrent load.

---

## Backend Bottlenecks (slot-spin Edge Function)

### 1. Normal Spin: Sequential DB Reads (Critical)
**Current flow** (lines 1011-1078): For a normal spin, the function does:
1. Parallel: session check + profile fetch
2. `SELECT slot_spins WHERE date = today` (sequential)
3. If no record: `SELECT slot_spins` (previous day carry-over)
4. `UPSERT slot_spins` (create today's record)
5. `SELECT slot_spins` again (re-fetch the just-created record)
6. `UPDATE slot_spins` (deduct bet)

That's up to **4 sequential DB round-trips** for spin initialization on first spin of the day, and 2 round-trips (SELECT + UPDATE) on subsequent spins.

**Fix**: Replace the multi-step SELECT/UPSERT/SELECT/UPDATE with a single **Postgres RPC function** that atomically initializes-if-needed and deducts in one call:
```sql
CREATE FUNCTION deduct_spin(p_user_id uuid, p_date date, p_bet int, p_max_spins int)
RETURNS int  -- returns new spins_remaining, or -1 if insufficient
```
This eliminates 2-3 round-trips per spin.

### 2. Bonus Spin: Extra Sequential Read
**Current** (line 701): Bonus spins fetch `slot_bonus_state` in a separate query after the parallel session+profile fetch.

**Fix**: Include `slot_bonus_state` in the initial `Promise.all` parallel fetch (lines 672-683). We can conditionally use the result only when `isBonusSpin=true`.

### 3. Optimistic Locking Can Fail Silently
**Current** (line 1106): The spin deduction uses `eq("spins_remaining", value)` for optimistic locking, but with 40+ concurrent users this can cause frequent retries with no automatic retry logic.

**Fix**: The new RPC function handles this atomically with `FOR UPDATE` row locking inside a single transaction, eliminating race conditions entirely.

### 4. Fire-and-Forget Background Processing is Unbounded
**Current** (lines 1179-1257): Tournament processing runs as a detached async closure. Under high load, many of these closures run concurrently on the same Deno isolate, competing for the same DB connection pool.

**Fix**: Use `EdgeRuntime.waitUntil()` (Deno's equivalent) or `ctx.waitUntil()` if available. If not, batch the tournament entry via a single RPC call instead of multiple sequential queries.

---

## Frontend Bottlenecks

### 5. Leaderboard Invalidation on Every Spin (High Impact)
**Current** (line 981): `queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] })` fires on every single reel stop. With 40 players spinning simultaneously, this creates a thundering herd of leaderboard queries hitting the materialized view.

**Fix**: 
- Only invalidate on wins (`result.totalWin > 0`)
- Add a **debounce** of ~5 seconds so rapid spins don't trigger multiple refreshes
- The leaderboard MV already refreshes every minute, so real-time invalidation is unnecessary

### 6. Heartbeat Polling Every 10 Seconds (Medium Impact)
**Current** (useSlotSession.ts line 41): Each active player sends a heartbeat UPDATE every 10 seconds. With 40 players, that's 240 writes/minute to `slot_active_sessions`.

**Fix**: Increase heartbeat interval to 30 seconds and session timeout to 90 seconds. The UX difference is negligible but DB write load drops by 67%.

### 7. Realtime Subscriptions Per Player (Medium Impact)
**Current**: Each player has 2 realtime channels:
- `session_takeover_{userId}` (useSlotSession)
- `bonus_state_{userId}_{gameId}` (useBonusGameSync)

These are fine architecturally but with 40+ players, that's 80+ active Postgres realtime connections.

**Fix**: The bonus state channel is only needed during active bonus. Subscribe lazily (when bonus triggers) and unsubscribe when bonus ends, rather than keeping it open for the entire session.

### 8. SlotReel Re-renders During Spin (Low-Medium)
**Current**: `scatterReelsLanded` state changes trigger re-renders of all 5 reels during spinning via `isDarkenedForTeaseGlobal`. Each state update during the spin causes a full re-render cascade.

**Fix**: Move `isDarkenedForTeaseGlobal` into a ref and apply it via direct DOM manipulation (similar to how `applyOffset` already works in SlotReel), avoiding React re-renders during the animation hot path.

---

## Implementation Plan

### Phase 1: Backend RPC (Biggest Impact)
1. Create `deduct_spin` RPC function via migration
2. Create `deduct_bonus_spin` RPC function that atomically reads + updates bonus state
3. Refactor `slot-spin/index.ts` to use these RPCs
4. Add `slot_bonus_state` to the initial parallel fetch

### Phase 2: Frontend Query Optimization
5. Only invalidate leaderboard on wins, with 5-second debounce
6. Increase heartbeat interval to 30 seconds
7. Lazy-subscribe to bonus realtime channel

### Phase 3: Animation Performance
8. Convert tease darkening state to ref-based DOM updates

---

## Expected Impact

| Optimization | Latency Reduction | DB Load Reduction |
|---|---|---|
| RPC deduct_spin | -40-60ms per spin | -66% writes |
| Parallel bonus fetch | -20-30ms per bonus spin | -- |
| Leaderboard debounce | -- | -90% reads |
| Heartbeat 30s | -- | -67% writes |
| Lazy realtime | -- | -50% connections |
| **Combined** | **~50-80ms faster response** | **~70% less DB pressure** |

---

## Technical Details

### deduct_spin RPC
```sql
CREATE OR REPLACE FUNCTION deduct_spin(
  p_user_id uuid,
  p_date date,
  p_bet int,
  p_max_spins int
) RETURNS int AS $$
DECLARE
  v_remaining int;
BEGIN
  -- Upsert today's record if missing (with carry-over logic)
  INSERT INTO slot_spins (user_id, date, spins_remaining)
  VALUES (p_user_id, p_date, p_max_spins)
  ON CONFLICT (user_id, date) DO NOTHING;

  -- Atomically deduct with row lock
  UPDATE slot_spins
  SET spins_remaining = spins_remaining - p_bet
  WHERE user_id = p_user_id AND date = p_date
    AND spins_remaining >= p_bet
  RETURNING spins_remaining INTO v_remaining;

  RETURN COALESCE(v_remaining, -1);
END;
$$ LANGUAGE plpgsql;
```

### Leaderboard Debounce
```typescript
const leaderboardInvalidateRef = useRef<NodeJS.Timeout | null>(null);
const debouncedLeaderboardInvalidate = useCallback(() => {
  if (leaderboardInvalidateRef.current) return;
  leaderboardInvalidateRef.current = setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
    leaderboardInvalidateRef.current = null;
  }, 5000);
}, [queryClient]);
```

### Carry-Over Edge Case
The RPC simplifies the common path but needs a separate handling for first-spin-of-day carry-over (checking previous day's balance). This will be handled by checking if the INSERT actually created a new row and, if so, running a secondary UPDATE with the correct carry-over value. This is still 1-2 round-trips fewer than the current approach.

