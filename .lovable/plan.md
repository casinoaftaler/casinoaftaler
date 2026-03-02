

# Fix Bonanza Bonus Issues + Generate Candy-Themed Sounds

## Issues Found

### 1. Debug Scatter Button Broken -- Missing `await`
The `forceScatters` code in `calculateBonanzaFullSpin` calls `prng.next()` without `await`. Since `prng.next()` is async, the result is a Promise object, and `Promise * number = NaN`. This means:
- The column shuffle produces `undefined` values
- `grid[col][NaN]` sets nothing
- Zero scatters are actually placed

**Fix:** Add `await` to both `prng.next()` calls in the force scatter block (lines 846 and 851 of `slot-spin/index.ts`).

### 2. Bomb Fizzle "Tease" on Dead Spins
In `processTumbleSteps` (BonanzaSlotGame.tsx lines 310-317), when a tumble step has no wins, bombs still get the fizzle animation. This creates a misleading "tease" effect.

**Fix:** Remove the bomb fizzle animation block from the no-win branch (lines 311-317). On a dead spin, bombs should just sit there silently -- no visual feedback.

### 3. Tumble Gravity Animation Blocked
After the gravity fill animation (lines 257-304), the code sets new `cellAnimStates` for dropping/filling. But then line 306 (`setCellAnimStates(new Map())`) runs immediately after the loop iteration ends, clearing those animations prematurely. The clear on line 306 should only happen AFTER the gravity animation delay, not at the top of the next loop or unconditionally.

**Fix:** Move the `setCellAnimStates(new Map())` and `setCellDropOffsets(new Map())` cleanup (lines 306-307) to ONLY run when there are no more steps to process, or at the very end of the loop. Currently they run after every winning step, wiping out the gravity animation.

### 4. Generate Candy-Themed Sound Effects
The `generate-game-sounds` edge function has hardcoded Greek/Zeus-themed prompts. Add a second set of candy-themed prompts for `fedesvin-bonanza` and make the function select the correct set based on `gameId`.

**Candy-themed prompts:**
- **Spin:** Bubbly candy whoosh with sugar crystals swirling
- **Stop:** Gummy candy bounce landing with soft squish impact
- **Small Win:** Sweet candy chimes with sugar sprinkle tinkle
- **Medium Win:** Joyful candy pop melody with bubblegum burst fanfare
- **Big Win:** Massive candy explosion with lollipop fireworks, gummy bear celebration, sugar rush crescendo
- **Bonus Trigger:** Candy factory power-up with swirling lollipops, bubblegum bubble growing to burst
- **Bonus Win:** Epic candy kingdom celebration with sugar symphony, gummy fanfare, sprinkle cascade
- **Scatter 1-3:** Escalating candy unwrap/crinkle/pop sounds
- **Scatter Celebration:** Grand candy land gates opening with rainbow sugar burst

---

## Technical Changes

### File: `supabase/functions/slot-spin/index.ts`
- Lines 845-853: Add `await` to both `prng.next()` calls in the `forceScatters` block

### File: `src/components/slots/BonanzaSlotGame.tsx`
- Lines 310-317: Remove the bomb fizzle animation from the no-win tumble branch (dead spin)
- Lines 306-307: Move the `setCellAnimStates(new Map())` / `setCellDropOffsets(new Map())` cleanup so it doesn't prematurely clear gravity animations. These should only reset at the END of the winning step after gravity has completed

### File: `supabase/functions/generate-game-sounds/index.ts`
- Add a `BONANZA_SOUNDS` constant with candy-themed prompts for all 11 sound types
- Update the handler to accept `gameId` and select the correct sound map (GATES vs BONANZA)
- Fall back to GATES_SOUNDS for unknown game IDs

