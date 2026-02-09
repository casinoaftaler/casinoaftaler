

## Fix 4 Issues in Rise of Fedesvin Bonus Mode

### Problem 1: Paylines not showing on every expanding win group

**Root cause:** In the multi-group sequential expansion (lines 800-844), the payline display uses `setLastResult({ ...result, wins: group.wins, ... })`. However, the `getWinningPositions` function (line 565-580) checks `expandedReels` and only returns positions for reels in the expanded set. When a group has wins from symbols that also appear on non-expanded reels of a different group, those wins won't display correctly. Additionally, win groups from the server may have empty `wins` arrays for some groups even when they should have wins — the server filters `wins.filter(w => w.symbolId === symId)` which correctly matches, but the issue is that the `WinLines` component also depends on `showConnectingWins` and `showWinLines` state which only renders when `lastResult` has wins. The key bug: `setLastResult(null)` at line 834 clears the result, then line 873 sets `setLastResult(result)` with the FULL result (all wins from all groups combined), causing all paylines to show at once at the end instead of per-group. The fix is to NOT set `setLastResult(result)` at line 873 after the multi-group loop — the per-group display already handled it.

**Fix in `SlotGame.tsx`:** After the multi-group loop (line 846-848), do NOT re-set `lastResult` to the full result. Instead, skip straight to setting the final combined grid. The full `lastResult` will be set at line 873 for the general win display.

### Problem 2: Expansion doesn't work when multiple symbols share the same reel

**Root cause:** In the multi-group loop (line 808-813), the partial grid is built from `originalGridCopy`. But when two expanding symbols (e.g., J and Merlin) both appear on reel 2, each group only expands ITS reels. The server correctly determines which symbol "wins" each reel via `expandedSymbolMap`, but the client builds the partial grid by filling ALL of a group's reels with that symbol. If reel 2 is assigned to Merlin by the server (higher multiplier wins), but J also has reel 2 in its `group.reels`, then J's partial grid incorrectly overwrites reel 2.

Actually, looking more carefully: the server's `symbolReelGroups` (line 740-748) maps each reel to exactly ONE symbol via `expandedSymbolMap`, so each reel only appears in ONE group. The issue is different — when the server's `applyMultiExpandingSymbols` decides that reel 2 belongs to Merlin (not J), then J's group might only have reels [0, 3] but the win calculation for J still expects J on reel 2. The server `calculateMultiExpandingBonusWins` handles this, but the client expansion animation may show wrong reels.

The real bug: The partial grid builds correctly per-group from server data. But `setExpandedReels(group.reels)` only marks those reels as expanded, and `isDarkenedForExpansion` darkens non-expanded reels. The visual issue is that reels shared between symbols may appear incorrect because the grid is restored to `originalGridCopy` between groups — this is correct behavior. The actual problem the user describes is likely that when J has 3 reels and Merlin has 2, and they overlap on 1 reel, the overlapping reel's original symbol gets shown during the "other" group's expansion since it's not in that group's `reels`. This is actually expected — the server assigns each overlapping reel to only one symbol. The animation should be correct.

Let me re-read: "if i have 3 J to expand but i also have 2 merlin to expand on the same reel as there are J, then the 2 reels with J and merlin on wouldn't expand properly." This means when both symbols appear on the same physical reel positions, the expansion doesn't look right. The server assigns the reel to one symbol, so the other symbol's group loses that reel, meaning its count drops below the expansion threshold. If J had 3 reels but one is taken by Merlin, J only gets 2 reels — which may not meet the minimum threshold for expansion. This is a server-side decision and likely correct, but the client should still animate whatever groups the server returns.

The more likely client bug: after all per-group animations complete, line 847-848 sets `setExpandedReels(reelsExpanded)` and `setGrid(expandedGrid)`. The `expandedGrid` has ALL reels expanded with their assigned symbols. But the `expandingSymbolId` prop (line 709) is `bonusState.expandingSymbol?.id` which is a SINGLE symbol. For Rise of Fedesvin, the expanded reels may have different symbols on different reels, but `SlotReel` checks `expandingSymbolId` to determine expansion visuals. This means only reels matching the first expanding symbol show expansion styling.

**Fix:** The `expandingSymbolId` prop needs to be dynamic per-reel for Rise of Fedesvin. During per-group animation, pass the group's symbolId. For the final combined view, we need to know which symbol expanded on which reel — use the `expandedReelSymbolIds` from the server response (which is already stored but not used by the client).

### Problem 3: Symbols stay darkened after tease/scatter celebration

**Root cause:** Line 999-1001:
```
isDarkenedForTease={
  (scatterReelsLanded.size >= 2 && isSpinning) || 
  (bonusState.isActive && pendingExpandedReelsRef.current.length > 0 && !showExpansionDarken && expandedReels.length === 0 && !isSpinning)
}
```

The second condition keeps symbols darkened when bonus is active and `pendingExpandedReelsRef.current` has data. After the expansion animation completes, `pendingExpandedReelsRef.current` is never cleared. This causes the dark tinting to persist into the next spin cycle.

**Fix:** Clear `pendingExpandedReelsRef.current = []` after the expansion animation completes (after line 870). Also clear it after the multi-group loop.

### Problem 4: Can't press continue on retrigger when all symbols are already active

**Root cause:** In `BonusSymbolPicker` (line 36), eligible symbols are filtered by excluding scatter and already-active symbols:
```
const eligibleSymbols = symbols.filter(s => !s.is_scatter && !excludeSymbolIds.includes(s.id));
```

When all non-scatter symbols are already expanding, `eligibleSymbols` is empty. Line 39 returns null when `eligibleSymbols.length === 0`, hiding the entire picker including the continue button.

In `BonusOverlay` retrigger section (line 137), when `newRetriggerSymbol` is truthy, it renders `BonusSymbolPicker`. But if `newRetriggerSymbol` is null/undefined (which would happen if the server couldn't assign a new unique symbol), it falls through to the non-picker branch (line 147-168) which DOES have a continue button. However, if the server still sends a `newRetriggerSymbol` that's already in the active list, the picker renders but shows nothing.

**Fix:** In `BonusSymbolPicker`, when `eligibleSymbols` is empty but `selectedSymbol` exists, skip the roulette animation and immediately show the selected symbol with the continue button. Alternatively, in `BonusOverlay`, when all symbols are already active, don't pass `newRetriggerSymbol` to avoid the picker.

### Implementation Plan

**File: `src/components/slots/SlotGame.tsx`**

1. Store `pendingExpandedReelSymbolIds` from server response (the `expandedReelSymbolIds` mapping) for per-reel expanding symbol lookup
2. After multi-group expansion loop (around line 844), clear `pendingExpandedReelsRef.current = []` and `pendingExpandingWinGroupsRef.current = []`
3. After single-group expansion (around line 869), also clear those refs
4. Remove the second condition from `isDarkenedForTease` (line 1001) — it causes stale darkening. The expansion darken is already handled by `isDarkenedForExpansion`
5. For the multi-group final combined grid (line 846-848), pass per-reel expanding symbol IDs to each reel so expansion styling works for all symbols, not just the first one
6. After multi-group loop, don't rely on re-setting lastResult at line 873 to show combined paylines — the per-group display already showed them

**File: `src/components/slots/BonusSymbolPicker.tsx`**

7. When `eligibleSymbols` is empty but `selectedSymbol` is provided, skip the roulette animation and immediately show the landed symbol with the continue button (handle the "all symbols already active" edge case)

**File: `src/components/slots/SlotReel.tsx`**

8. Accept an optional `expandingSymbolIds` prop (array or map) so Rise of Fedesvin can mark multiple different expanding symbols per reel for correct expansion styling on the final combined grid

### Technical Details

The per-reel symbol mapping from the server (`expandedReelSymbolIds`) already contains the data needed:
```text
{ "0": "symbol-j-id", "1": "symbol-j-id", "2": "symbol-merlin-id", "3": "symbol-j-id", "4": "symbol-merlin-id" }
```

This will be stored in a ref and passed down to `SlotReel` so each reel knows which expanding symbol it should display expansion animations for, rather than relying on a single `expandingSymbolId` prop.

