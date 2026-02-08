
# Sequential Multi-Expanding Symbol Animation for Rise of Fedesvin

## Problem
When a bonus spin in "Rise of Fedesvin" results in multiple different expanding symbols qualifying (e.g., Symbol A on reels 1,3 and Symbol B on reels 2,4), they all expand simultaneously. The user wants each expanding symbol to be animated sequentially: expand Symbol A's reels, show its paylines, unexpand, then expand Symbol B's reels, show its paylines, unexpand, and so on.

## Solution Overview
This requires changes on both the server (to send per-reel symbol mapping) and the client (to orchestrate sequential expansion/payline animations).

---

## Technical Details

### 1. Server: Include per-reel symbol mapping in response
**File:** `supabase/functions/slot-spin/index.ts`

Currently, the `BonusSpinResult` returns `expandedReels` (an array of reel indices) but does NOT include which symbol expanded on each reel. The client needs this information to animate each symbol group separately.

- Add a new field `expandedReelSymbolIds: Record<string, string>` to the bonus spin response (a JSON object mapping reel index to symbol ID, e.g., `{"0": "sym-abc", "2": "sym-abc", "1": "sym-xyz", "3": "sym-xyz"}`).
- Also include per-symbol win groupings: `expandingWinGroups: Array<{ symbolId: string, reels: number[], wins: LineWin[] }>` so the client knows which paylines belong to which expanding symbol.

### 2. Server: Separate wins by expanding symbol group
**File:** `supabase/functions/slot-spin/index.ts`

Modify `calculateMultiExpandingBonusWins` to also return the wins grouped by expanding symbol, not just as a flat list. This allows the client to show the correct paylines during each symbol's expansion phase.

### 3. Client: Update `useServerSpin` types
**File:** `src/hooks/useServerSpin.ts`

Add the new fields to the `BonusSpinResult` interface:
- `expandedReelSymbolIds?: Record<string, string>` -- which symbol expanded on which reel
- `expandingWinGroups?: Array<{ symbolId: string, reels: number[], wins: LineWin[] }>` -- wins grouped by symbol

### 4. Client: Sequential expansion animation in SlotGame
**File:** `src/components/slots/SlotGame.tsx`

This is the main change. The current code at the reel-stop handler (around line 751) does:
1. Set all expanded reels at once
2. Show the expanded grid
3. Flash the newly expanded reels
4. Done

The new logic will:
1. Detect if this is a Rise of Fedesvin bonus spin with multiple distinct expanding symbol groups.
2. If yes, iterate through each symbol group sequentially:
   a. **Expand phase**: Darken non-relevant reels, set the expanded grid for only this symbol's reels, play expand sound, show newly-expanded flash for 600ms.
   b. **Payline phase**: Show only this symbol's wins/paylines for ~1000ms.
   c. **Unexpand phase**: Reset the grid back to the original (un-expanded) state, hide paylines, wait 300ms.
3. After all groups are shown, set the final expanded grid with all symbols and proceed to the combined win result.
4. If there is only one expanding symbol group (or it's Book of Fedesvin), keep the current behavior unchanged.

New state variables needed:
- `sequentialExpansionPhase: number` -- which symbol group is currently being shown (-1 = not active)
- `currentExpansionWins: LineWin[]` -- the wins to show paylines for during the current phase

### 5. Client: WinLines integration
**File:** `src/components/slots/SlotGame.tsx`

During each sequential expansion phase, `lastResult.wins` will be temporarily set to only the current symbol's wins, so `WinLines` renders the correct paylines. After all phases complete, set the full win list.

### 6. Client: Darkening per-expansion phase
**File:** `src/components/slots/SlotGame.tsx`

During each sequential phase, reels not belonging to the current expanding symbol should be darkened (reuse existing `isDarkenedForExpansion` prop on `SlotReel`).

---

## Animation Sequence Diagram

```text
[All reels stopped with original grid]
     |
     v
[Phase 1: Symbol A]
  - Darken reels not in Symbol A's group
  - Expand Symbol A's reels (replace grid cells)
  - Flash newly expanded reels (600ms)
  - Show Symbol A's paylines (1000ms)
  - Unexpand (restore original grid)
  - Hide paylines (300ms pause)
     |
     v
[Phase 2: Symbol B]
  - Same sequence as Phase 1 but for Symbol B
     |
     v
[Final: Show combined expanded grid]
  - Set final expandedGrid with all symbols
  - Set lastResult with all wins
  - Show all paylines
  - Continue normal flow (win animation, etc.)
```

---

## Summary of files to modify
1. `supabase/functions/slot-spin/index.ts` -- Add per-reel symbol mapping and grouped wins to response
2. `src/hooks/useServerSpin.ts` -- Update types for new response fields
3. `src/components/slots/SlotGame.tsx` -- Implement sequential expansion animation loop with per-phase paylines
