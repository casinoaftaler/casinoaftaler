
# Fedesvin Bonanza - Server-Side Spin Engine

## Problem
The edge function `slot-spin/index.ts` has no dedicated branch for `fedesvin-bonanza`. When this game ID is used, it falls through to the default "Book of Fedesvin" engine (5x3 grid, pay lines), but the client (`BonanzaSlotGame.tsx`) expects a Gates-style response with `tumbleSteps`, `multiplierBombs`, scatter counting on a 6x5 grid, and tumble/cascade mechanics. This mismatch causes every spin to appear identical or broken.

## Solution
Add a complete Bonanza engine branch in the edge function, modeled on the existing Gates of Fedesvin engine but with Bonanza-specific differences:

### 1. Add Bonanza settings loader (like `loadGatesSettings`)
- Load from `site_settings` the keys: `bonanza_min_match`, `bonanza_scatter_trigger`, `bonanza_scatter_retrigger`, `bonanza_free_spins_4/5/6`, `bonanza_free_spins_retrigger`, `bonanza_multiplier_chance_bonus`, `bonanza_multiplier_values`, `bonanza_multiplier_weights`
- Cache with 5-minute TTL (same pattern as Gates)
- These are the admin-panel configurable values

### 2. Add Bonanza grid generation
- 6 columns x 5 rows (same dimensions as Gates)
- Use symbol weights from DB (`weight` for base, `bonus_weight` for bonus spins)
- Cap 1 scatter per column
- **No multiplier bombs in base game** (key difference from Gates)
- In bonus: spawn `bomb_Nx` symbols with configurable chance per cell, using the weighted multiplier values/weights from admin settings

### 3. Add Bonanza win calculation
- "Pay Anywhere" cluster wins: count matching symbols across entire grid
- 8+ matches = win (configurable via `bonanza_min_match`)
- Payout tiers: 8-9 uses `multiplier_3`, 10-11 uses `multiplier_4`, 12+ uses `multiplier_5`
- Scatter symbols excluded from cluster matching

### 4. Add Bonanza tumble engine (`calculateBonanzaFullSpin`)
- After wins: remove winning symbols, gravity-fill from top with new random symbols
- In bonus: bombs that land on winning tumbles get "activated" (their multiplier adds to cumulative); bombs on non-winning tumbles "fizzle"
- Bombs are removed after each tumble step (not persistent like Gates orbs)
- Track cumulative multiplier across the entire free-spin session (not per-spin like Gates)
- Return `tumbleSteps` array with `grid`, `wins`, `winningPositions`, `multiplierBombs`, `stepWin`, `bombMultiplier`

### 5. Add Bonanza branch in main handler (around line 1200)
- Check `isBonanzaGame = gameId === "fedesvin-bonanza"`
- Load Bonanza settings
- Create SeededPRNG (provably fair, same as Gates)
- Handle bonus spins: read/update `slot_bonus_state`, apply cumulative multiplier
- Handle normal spins: deduct credits, check for bonus trigger (4+ scatters)
- Return response format matching what `BonanzaSlotGame.tsx` expects:
  ```
  {
    success: true,
    result: {
      tumbleSteps: [...],
      totalWin: number,
      bonusTriggered: boolean,
      scatterCount: number,
      totalMultiplier: number,
      initialGrid: string[][]
    },
    spinsRemaining: number,
    bonusState: { ... } | null
  }
  ```

### 6. Bonus trigger/retrigger logic
- Base game: 4+ scatters triggers bonus (configurable)
- Scatter counts: 4 = 10 spins, 5 = 12 spins, 6 = 15 spins (from admin settings)
- Retrigger in bonus: 3+ scatters adds 5 extra spins (configurable)
- Store cumulative multiplier in `expanding_symbol_name` field (reusing existing DB column, same pattern as Gates)

## Technical Details
- All changes are in `supabase/functions/slot-spin/index.ts`
- No database changes needed (reuses existing `slot_bonus_state`, `slot_symbols`, `site_settings` tables)
- No client changes needed - the client already expects this response format
- The edge function will be redeployed after changes
