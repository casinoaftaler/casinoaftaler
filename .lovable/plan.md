

## Fix: Limit Scatters to 1 Per Reel + Reduce Bonus Multipliers

### Problem 1: Multiple scatters per reel
The `generateGatesGrid` function picks symbols independently for each cell in a column. If the RNG rolls a scatter symbol more than once in the same column, multiple scatters land on that reel. Real "Gates of Olympus" style games cap scatters at 1 per reel.

### Problem 2: Too many multipliers in bonus
The bonus multiplier chance is configured at 14% per cell (from the database setting `gates_multiplier_chance_bonus`). On a 30-cell grid, that averages ~4 multiplier orbs per spin, which is excessive. A more balanced value would be around 5-6% (roughly 1-2 multipliers per spin on average).

---

### Changes

**File: `supabase/functions/slot-spin/index.ts`**

1. **Cap scatters to 1 per reel** in `generateGatesGrid`:
   - Track whether a scatter has already been placed in the current column
   - If a scatter is rolled but one already exists in that column, re-roll (pick a new non-scatter symbol instead)
   - This applies to both base game and bonus spins

2. **Lower default bonus multiplier chance** from `0.056` to `0.05` (5%) as the code default, and update the database setting from `0.14` to `0.056` (5.6%) to bring it in line with the intended design (~1-2 multipliers per bonus spin on average).

**Database migration:**
- Update `site_settings` row for `gates_multiplier_chance_bonus` from `0.14` to `0.056`.

### Technical Details

Scatter cap implementation in `generateGatesGrid`:
```
for each column:
  let hasScatter = false
  for each row:
    sym = getRandomSymbol(...)
    if sym is scatter and hasScatter:
      // Re-roll without scatter
      sym = getRandomSymbol(symbols excluding scatter, ...)
    if sym is scatter:
      hasScatter = true
    // ... rest of multiplier logic
```

The same 1-scatter-per-column rule will also apply to the `fillWithMultipliers` function (new symbols dropping in after a tumble), since scatters could theoretically fill into a column that already has one. However, in the current code scatters are excluded from fill symbols, so this is already handled.

