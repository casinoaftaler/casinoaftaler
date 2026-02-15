

## Fix: New users see 0 credits before first spin

### Problem
When a new user signs up and enters the slot machine, the `SpinsRemaining` component shows **0 credits** because no `slot_spins` record exists yet. Credits are only initialized server-side when the user performs their first spin (just-in-time in the `slot-spin` edge function). This confuses users into thinking they have no credits.

### Root Cause
The `useSlotSpins` hook (line 72) returns `spinsRemaining: spinsData?.spins_remaining ?? 0`. When `spinsData` is `null` (no record for today), it defaults to 0. The actual initialization happens much later -- only when the user clicks "Spin" for the first time.

### Solution
Two-part fix to ensure credits are visible immediately:

#### 1. Update `useSlotSpins` to show expected credits when no record exists
When the query returns `null` (no record for today), instead of showing 0, display the calculated `maxSpins` value. This matches what the `slot-spin` edge function would create on first spin.

**File: `src/hooks/useSlotSpins.ts`**
- Change line 72 from `spinsRemaining: spinsData?.spins_remaining ?? 0` to `spinsRemaining: spinsData?.spins_remaining ?? maxSpins`
- Similarly update `canSpin` (line 76) and `hasEnoughSpins` (line 64-65) to use `maxSpins` as fallback
- Add a `hasRecord` boolean so the spin button logic knows when credits are uninitialized vs actually 0

#### 2. Add early credit initialization when entering the slot page
Create a small hook or effect that calls a lightweight endpoint to initialize the `slot_spins` record when the user enters the slot machine page, rather than waiting for the first spin. This ensures the database record exists before the user sees the UI.

**File: `src/hooks/useSlotSpins.ts`**
- Add a `useMutation` or `useEffect` that calls the existing `slot-spin`-style initialization logic via a new simple edge function, OR
- Use the existing `daily-credit-allocation` pattern to create the record client-side via service role

The simplest and most robust approach: **just fix the display fallback** in `useSlotSpins`. The server-side initialization already works correctly on first spin. The only issue is the UI showing 0.

### Final approach (minimal change)

**File: `src/hooks/useSlotSpins.ts`**
- When `spinsData` is `null` and `isLoading` is `false`, use `maxSpins` as the displayed value for `spinsRemaining`
- Update `canSpin` to return `true` when no record exists (since the server will create one with full credits)
- Update `hasEnoughSpins` similarly

This is a single-file, ~5 line change that fully resolves the issue without needing new edge functions or database changes.

### Technical details

```text
Before (line 72):
  spinsRemaining: spinsData?.spins_remaining ?? 0

After:
  spinsRemaining: spinsData ? spinsData.spins_remaining : maxSpins
```

The same pattern applies to `canSpin` and `hasEnoughSpins` -- when no record exists, the user effectively has `maxSpins` credits available because the `slot-spin` edge function will create the record with that value on first spin.

