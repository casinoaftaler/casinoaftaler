

## Split Base Game into Scatter Spins and Multiplier Spins

Currently, both scatters and multipliers can appear on any base game spin. This plan separates them into two mutually exclusive spin types:

- **Scatter Spin (90%)** -- Scatters can land normally, but multipliers never appear.
- **Multiplier Spin (10%)** -- Multipliers can land (using the existing chance-per-cell logic), but scatters are excluded. Wherever a scatter would have been placed, a multiplier is placed instead.

This only applies to the **base game**. Bonus spins remain unchanged (multipliers land freely, scatters can retrigger).

---

### Changes

**File: `supabase/functions/slot-spin/index.ts`**

1. **Add a spin-type constant** -- `GATES_MULTIPLIER_SPIN_CHANCE = 0.10` (10% of base spins are multiplier spins).

2. **Modify `generateGatesGrid`** to accept a `spinType` parameter (`'scatter' | 'multiplier'`), determined by a single PRNG roll before grid generation:
   - **Scatter spin**: Skip all multiplier placement logic (never insert `mult_*` IDs). Scatters land normally via weighted symbol selection.
   - **Multiplier spin**: After picking each symbol, if it is a scatter, replace it with a randomly picked multiplier (`mult_Nx`). Additionally, the existing per-cell multiplier chance still applies to non-scatter cells.

3. **Modify `fillWithMultipliers`** (used during tumbles) to respect the same spin type for the entire tumble chain -- if the initial spin was a scatter spin, new fill symbols never include multipliers; if it was a multiplier spin, scatters in fill symbols are replaced with multipliers.

4. **Modify `calculateGatesFullSpin`** to determine the spin type once at the start (PRNG roll) and pass it through to grid generation and tumble fills. Bonus spins bypass this logic entirely (both can appear as today).

---

### Technical Detail

```text
calculateGatesFullSpin(symbols, bet, isBonusSpin, ...)
  |
  |-- if NOT isBonusSpin:
  |     roll = prng.next()
  |     spinType = roll < 0.10 ? 'multiplier' : 'scatter'
  |-- else:
  |     spinType = 'both' (no restriction)
  |
  |-- generateGatesGrid(symbols, isBonusSpin, prng, spinType)
  |     for each cell:
  |       if spinType == 'scatter':
  |         never place mult_* symbols
  |       if spinType == 'multiplier':
  |         if picked symbol is scatter -> replace with mult_Nx
  |         else -> normal chance to place mult_* still applies
  |       if spinType == 'both':
  |         existing behavior (bonus)
  |
  |-- tumble loop:
  |     fillWithMultipliers(..., spinType)
  |       same rules as generateGatesGrid per spinType
```

No client-side changes required -- the client already renders whatever grid the server returns. No database changes needed.

