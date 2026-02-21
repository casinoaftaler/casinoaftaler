

## Multiplier System Overhaul for Gates of Fedesvin

### Problem
Currently, multiplier orbs are rendered as small circles **on top of** regular symbols (overlayed at `z-10`). They don't have their own dedicated grid positions -- they just float over whatever symbol is underneath.

### What Changes

**1. Multiplier symbols become first-class grid citizens**

Instead of overlaying multiplier orbs on top of regular symbols, multiplier symbols will **occupy their own cells** in the grid. When a multiplier lands, it replaces what would have been a regular symbol in that position.

Multiplier values: **2x, 3x, 5x, 10x, 15x, 25x, 50x, 100x** (removing 250x and 500x from current set).

**2. AI-generated images for each multiplier**

Create 8 unique multiplier symbol images using the AI image generator, stored in Supabase Storage. These will be visually distinct "orb" or "lightning orb" style symbols with the multiplier value baked in.

**3. Server-side logic changes (Edge Function: `slot-spin`)**

- `generateGatesGrid` / `applyGatesTumble`: When filling new symbols, there's a chance (controlled by `gates_multiplier_chance_base` / `gates_multiplier_chance_bonus`) that a cell gets a **multiplier marker** instead of a regular symbol.
- Multiplier cells are stored as special IDs in the grid (e.g. `"mult_2x"`, `"mult_3x"`, etc.) so the client knows to render the multiplier image.
- Multiplier cells are **not** counted toward pay-anywhere symbol matches (they are neutral).
- When a tumble step results in a win AND multiplier symbols are present on the grid, the multiplier values are added to the Bonus Multiplier Bank, and those multiplier cells are removed (collected) along with winning symbols.
- If no win occurs, multiplier symbols stay on the grid.

**4. Client-side rendering changes**

- **`GatesColumn.tsx`**: Detect multiplier symbol IDs (prefixed `mult_`) and render the corresponding multiplier image instead of the orb overlay. Remove the current orb overlay logic entirely.
- **`GatesSlotGame.tsx`**: Update the multiplier collection animation -- when multipliers are collected on a win, show a "fly to bank" animation. The `multiplierOrbs` state becomes the list of multiplier positions found on the grid.

**5. Bonus mode multiplier persistence**

Already implemented: `runningMultiplier` / `cumulativeMultiplier` persists across all free spins. The server passes `runningMultiplier` into `calculateGatesFullSpin` during bonus. No changes needed here.

---

### Technical Details

#### New multiplier symbol IDs
```
"mult_2x", "mult_3x", "mult_5x", "mult_10x", "mult_15x", "mult_25x", "mult_50x", "mult_100x"
```

These are NOT stored in the `slot_symbols` table. They are virtual/hardcoded IDs recognized by both server and client.

#### Server changes (`supabase/functions/slot-spin/index.ts`)

1. Update `GATES_MULTIPLIER_VALUES` to `[2, 3, 5, 10, 15, 25, 50, 100]`.
2. Rewrite `generateGatesMultiplierOrbs` -> `placeMultipliersOnGrid`: Instead of generating a separate orbs array, directly inject `"mult_Nx"` IDs into the grid cells.
3. In `calculateGatesFullSpin`, after generating/tumbling the grid:
   - Scan for `mult_*` cells to build the multiplier orbs list for the client.
   - On a winning step, mark multiplier cells for removal (collected into the bank).
   - On a non-winning step, multiplier cells persist.
4. `calculateGatesWins` and `countGatesSymbolMatches` already skip non-matching symbols, but add explicit exclusion for `mult_*` IDs.

#### Client changes

1. **`GatesColumn.tsx`**: Replace the orb overlay block (lines 144-150) with inline multiplier symbol rendering. If the symbolId starts with `"mult_"`, render the multiplier image from a static URL map instead of looking it up in `symbolsById`.
2. **`GatesSlotGame.tsx`**: Simplify multiplier orb state -- the grid itself now contains multiplier positions. The `multiplierOrbAt` function reads directly from the grid.
3. **`gatesGameLogic.ts`**: Update `MULTIPLIER_VALUES` to the new set of 8 values. Add a helper `isMultiplierSymbol(id: string)` and `getMultiplierValue(id: string)`.
4. **`generateGatesDisplayGrid`**: Ensure display grid never generates `mult_*` IDs (already fine since it uses `symbols` array).

#### Multiplier images

Create an edge function call or manual admin action to generate 8 multiplier orb images via the existing `generate-slot-symbol` function, or create them as static assets. They'll be stored at predictable URLs in the `slot-symbols` bucket.

#### Files to modify
- `supabase/functions/slot-spin/index.ts` -- Core multiplier placement logic
- `src/components/slots/GatesColumn.tsx` -- Render multiplier symbols as grid cells
- `src/components/slots/GatesSlotGame.tsx` -- Simplify orb state management
- `src/lib/gatesGameLogic.ts` -- Update constants, add helpers
- `src/styles/gates-animations.css` -- Add multiplier collection animation

#### Files to create
- `src/lib/gatesMultiplierSymbols.ts` -- Multiplier symbol ID/image/value mappings

