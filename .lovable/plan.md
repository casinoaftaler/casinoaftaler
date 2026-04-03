

# Plan: 5% Chance of Orbs Instead of Scatters in Base Game

## Summary
In the Gates of Fedesvin base game, add a 5% chance that the spin replaces all scatter possibilities with multiplier orbs instead. On any given base spin, it's either scatters OR orbs — never both.

## How It Works
1. At the start of `generateGatesGrid`, when `isBonusSpin === false`, roll a 5% chance
2. If the roll hits: treat the spin as an "orb spin" — exclude scatters entirely from the symbol pool, and place orbs using `GATES_MULTIPLIER_CHANCE_BASE` (same as bonus orb placement logic, but using the base game chance)
3. If the roll misses: normal base game (scatters can appear, no orbs) — current behavior

## Changes

### 1. `supabase/functions/slot-spin/index.ts` — `generateGatesGrid()`
- Add a `const orbsInsteadOfScatters = !isBonusSpin && (await prng.next()) < 0.05` check at the top
- When `orbsInsteadOfScatters` is true:
  - Use `nonScatterSymbols` exclusively (no scatters can land)
  - Apply the same bomb placement logic currently used in bonus (1 bomb max per column, using `GATES_MULTIPLIER_CHANCE_BASE` rate and scatter symbol weight for orb frequency)
- When false: current behavior (scatters possible, no bombs in base)

### 2. `supabase/functions/slot-spin/index.ts` — `applyGatesTumble()` fill logic
- Currently, tumble fills only add bombs in bonus. When the initial spin was an "orb spin", tumble fills should also be able to add orbs
- Pass an `orbMode` flag through the spin flow so tumble fills know to include orbs and exclude scatters

### 3. `processGatesSpin()` — Pass orb mode context
- The orb mode flag needs to flow from grid generation through the tumble loop so `applyGatesTumble` knows whether to place orbs in refill

### Technical Detail
- The 5% is hardcoded for now (can be made admin-configurable later)
- Orb weights use the same `GATES_MULTIPLIER_VALUES` / `GATES_MULTIPLIER_WEIGHTS` as bonus
- Scatter weight is used as the probability basis for orb placement to keep frequency balanced

