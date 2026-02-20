

# Multiplier System for Gates of Fedesvin

## Overview

Implement a proper multiplier orb system where random multiplier values (2x-500x) appear during winning tumble steps, accumulate across the entire tumble sequence, and apply to the total raw win only after all tumbles complete. Multipliers cannot land on cells containing scatter symbols.

## Server-Side Changes (Edge Function)

### File: `supabase/functions/slot-spin/index.ts`

**1. Fix `generateGatesMultiplierOrbs` to exclude scatter positions**
- Accept the grid and symbols as parameters
- Skip any cell that contains a scatter symbol
- Only generate orbs during tumble steps that have wins (move the call inside the win check)

**2. Restructure `calculateGatesFullSpin` tumble loop**
- Only generate multiplier orbs on steps where `wins.length > 0`
- On steps with no wins (end of tumble), do not generate any orbs
- Keep the multiplier accumulation logic: sum all orb values across all winning steps
- Apply total multiplier to total raw win at the end (already done correctly)

**3. Ensure high volatility math**
- The current multiplier weight distribution already favors small values (2x, 3x) with rare large ones (100x, 250x, 500x) -- this is correct for high volatility
- The 8% base / 12% bonus chance per cell is reasonable
- The 8+ symbol match requirement naturally creates dry spells
- RTP targeting ~96% is handled by symbol weights/multipliers in the database -- no code changes needed there

## Client-Side Changes

### File: `src/components/slots/GatesSlotGame.tsx`

**1. Track accumulated multiplier during tumbles**
- Add `runningMultiplier` state (resets to 0 each spin)
- During `processTumbleSteps`, when a step has multiplier orbs, add their values to `runningMultiplier`
- Show the running multiplier in the UI alongside the running win counter

**2. Show multiplier application at end of tumble sequence**
- After all tumble steps complete, if `totalMultiplier > 0`, briefly show a "multiplier applied" animation
- Update the running win display to show: `rawWin x totalMultiplier = finalWin`

**3. Update running win counter to show multiplier info**
- Display format during tumbles: "GEVINST: X POINT" + if multiplier > 0: "MULTIPLIER: Nx"
- After tumbles end: "GEVINST: X POINT (xN)" showing final multiplied amount

### File: `src/components/slots/GatesColumn.tsx`

No structural changes needed. The multiplier orb rendering already works via the `multiplierOrbAt` prop.

### File: `src/styles/gates-animations.css`

- Add a `gates-multiplier-fly` keyframe for orbs collecting into a multiplier counter (orb flies to counter position)
- Enhance the multiplier bump animation for when the total multiplier is applied to the win

## Technical Details

### Multiplier Generation (server-side fix)

```text
Current (buggy):
  while tumbles:
    wins = calculate wins
    orbs = generate orbs  <-- generates even with no wins
    ...

Fixed:
  while tumbles:
    wins = calculate wins
    if wins.length > 0:
      orbs = generate orbs (excluding scatter cells)
    else:
      orbs = []  <-- no orbs on non-winning steps
    ...
```

### Scatter exclusion logic

When generating orbs, check each cell's symbol ID against the scatter symbol. If the cell contains a scatter, skip orb generation for that cell.

### Multiplier values and weights (unchanged)

| Value | Weight | Approx % |
|-------|--------|----------|
| 2x    | 30     | 30%      |
| 3x    | 25     | 25%      |
| 5x    | 20     | 20%      |
| 10x   | 12     | 12%      |
| 15x   | 6      | 6%       |
| 25x   | 3      | 3%       |
| 50x   | 2      | 2%       |
| 100x  | 1      | 1%       |
| 250x  | 0.7    | 0.7%     |
| 500x  | 0.3    | 0.3%     |

### Key constraints enforced
- Multipliers reset every new base spin
- In bonus (free spins), multipliers accumulate across ALL spins (cumulative)
- Multipliers only appear on winning tumble steps
- Multipliers never land on scatter positions
- Total multiplier applies to the sum of all raw wins after all tumbles complete
- All outcomes are RNG-determined server-side at spin time; client only animates

