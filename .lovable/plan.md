
# Fedesvin Bonanza - Comprehensive Update Plan

This plan covers 7 distinct changes to the Bonanza slot game, spanning the server-side Edge Function, client-side game component, new components, and admin tools.

---

## 1. Reel-Based Symbol Generation with Duplicate Chance

**Current**: Symbols generated independently per cell (position-by-position).
**New**: Generate symbols per reel (column), then apply duplication logic:

- For each of the 6 reels: generate 5 random symbols using weights
- 35% chance a reel contains 2 identical regular symbols; 10% chance for 3 identical
- Bombs and scatters cannot duplicate on the same reel
- After building all 6 reels, shuffle each reel individually
- Then check total symbol counts across the entire 6x5 grid for wins (8+)

**Files changed:**
- `supabase/functions/slot-spin/index.ts` -- rewrite `generateBonanzaGrid()` and `applyBonanzaTumble()` fill logic

---

## 2. Scatter Tease Only at 3 Scatters, Shown After Each Win Pop

**Current**: Tease triggers at 2+ scatters immediately after grid lands.
**New**:
- Only tease when exactly 3 scatters are present (not 2)
- Instead of showing tease right after grid lands, show it after each tumble step's winning symbols "pop" (explode), so the tease pulses between tumble rounds

**Files changed:**
- `src/components/slots/BonanzaSlotGame.tsx` -- move scatter tease logic from post-landing into `processTumbleSteps`, trigger after each win explosion when scatter count is 3

---

## 3. New Bonanza-Themed Bonus Intro (Replace Gates Theme)

**Current**: `BonusEntrySequence` uses Zeus/storm/temple/lightning theme from Gates.
**New**: Create a candy-themed bonus intro for Bonanza:
- Phase 1: Candy burst flash (pink/purple instead of lightning)
- Phase 2: Fade to candy landscape background (gradient from pink to fuchsia with candy elements)
- Phase 3: Lollipop icon instead of lightning bolt, "FREE SPINS" text in candy colors (pink/yellow gradient)
- Phase 4: Count-up and "Multiplier bomber aktive!" subtitle

Also replace `GatesRetriggerOverlay` and `GatesBonusEndOverlay` with Bonanza-themed versions (pink/candy styling instead of storm/zeus).

**Files changed:**
- New: `src/components/slots/BonanzaBonusEntrySequence.tsx`
- New: `src/components/slots/BonanzaRetriggerOverlay.tsx`
- New: `src/components/slots/BonanzaBonusEndOverlay.tsx`
- `src/components/slots/BonanzaSlotGame.tsx` -- swap imports from Gates overlays to new Bonanza overlays

---

## 4. Bomb Symbols as Admin-Manageable Assets

**Current**: Bombs render as a hardcoded emoji (bomb) with a text value overlay.
**New**:
- Create 8 bomb symbol records in a new DB table (or reuse `slot_multiplier_symbols` pattern) for the 8 multiplier values (2x, 3x, 5x, 10x, 15x, 25x, 50x, 100x)
- Each bomb has an `image_url` that admins can upload/change via admin panel
- On the game grid, render the bomb image (or fallback to emoji if no image)

**Database migration:**
- Create `slot_bomb_symbols` table: `id, game_id, value (int), label (text), image_url (text nullable), position (int)`
- Seed 8 rows for fedesvin-bonanza

**Files changed:**
- New: `src/components/slots/BonanzaBombSymbolsAdmin.tsx` -- admin panel for uploading bomb images
- `src/components/slots/BonanzaColumn.tsx` -- render bomb images from a lookup map instead of emoji
- `src/components/slots/BonanzaSlotGame.tsx` -- fetch bomb symbols and pass to columns
- Admin page integration (wherever slot admin is rendered)

---

## 5. Bonanza-Specific Gevinsttabel (Paytable)

**Current**: Uses `GatesPayTable` which has Gates/blue styling and a fixed layout. The scatter section says "4+ Scatter udloeser 15 gratis spins".
**New**: Match the reference image from Sweet Bonanza:
- 2 rows of 4 premium symbols (top), 1 row of 5 common symbols (bottom)
- Each symbol card shows: image + 3 payout lines (12+ / 10-11 / 8-9) with `kr` prefix and bet-scaled values
- Scatter section at bottom with its own payout tiers (6 / 5 / 4) and description text in Danish
- Pink/candy themed styling instead of blue
- Admin should be able to change multiplier values per symbol (already possible via existing symbol admin -- no extra work needed there)

**Files changed:**
- New: `src/components/slots/BonanzaPayTable.tsx` -- candy-themed paytable matching the reference image layout
- `src/components/slots/BonanzaSlotGame.tsx` -- use `BonanzaPayTable` instead of `GatesPayTable`

---

## 6. Multiplier Reset Per Spin in Bonus

**Current**: `cumulativeMultiplier` accumulates across the entire bonus session and is saved/restored.
**New**:
- Each bonus spin starts with multiplier at 0x
- Multiplier only accumulates within a single spin's tumble chain
- Show the running multiplier during tumbles
- Bombs only pop AFTER all tumble wins in a chain are resolved (not during each step)

**Server-side change** (`supabase/functions/slot-spin/index.ts`):
- In `calculateBonanzaFullSpin`: always start `totalMultiplier` at 0 regardless of `runningMultiplier` param
- Change bomb behavior: bombs persist across all tumble steps in a spin, only activate at the very end after the last winning tumble, then all bombs explode at once

**Client-side change** (`src/components/slots/BonanzaSlotGame.tsx`):
- Reset `runningMultiplier` to 0 at start of every bonus spin
- Remove cumulative multiplier persistence from bonus state
- In `processTumbleSteps`: don't process bombs during individual steps -- collect all bombs from the final grid after all wins, then animate them popping at the end
- Show running multiplier during tumble chain

---

## 7. Bonus Bar Multiplier Display Update

Since multiplier resets per spin, the bonus bar should show:
- Current spin multiplier (resets each spin)
- Remove the cumulative multiplier concept from the UI

**Files changed:**
- `src/components/slots/BonanzaSlotGame.tsx` -- update bonus bar to show per-spin multiplier only

---

## Technical Summary

| Area | Files |
|------|-------|
| Server Engine | `supabase/functions/slot-spin/index.ts` (Bonanza section) |
| Main Game Component | `src/components/slots/BonanzaSlotGame.tsx` |
| Column Renderer | `src/components/slots/BonanzaColumn.tsx` |
| New Bonus Overlays | 3 new files (BonanzaBonusEntry, Retrigger, EndOverlay) |
| New Paytable | `src/components/slots/BonanzaPayTable.tsx` |
| New Admin Component | `src/components/slots/BonanzaBombSymbolsAdmin.tsx` |
| Database | New `slot_bomb_symbols` table with 8 seed rows |
| CSS Animations | `src/styles/bonanza-animations.css` (new candy bonus animations) |

