
# Plan: Fix Win Display Order, Darkening Consistency, and Tease-to-Expansion Transition

## Summary

Three related issues need to be addressed in the slot bonus game:

1. **Sequential Win Display** - Show connecting payline wins BEFORE expanding symbol wins
2. **Consistent Darkening Effect** - Use same brightness filter (0.35) for both tease and expansion darkening  
3. **Continuous Darkening During Tease-to-Expansion** - Keep non-expanded reels darkened throughout the transition

---

## Problem Analysis

### Issue 1: Win Display Order
Currently in `SlotGame.tsx` lines 730-745, when a bonus spin has both regular payline wins AND an expanding symbol win, all wins are calculated together and shown simultaneously. The user wants to see the connecting payline win first (if any), then the expansion animation, then the expanding win.

### Issue 2: Darkening Inconsistency
- **Tease darkening** (base game): Uses `brightness(0.35)` filter on individual non-scatter symbols via `isDarkened` prop in `SlotSymbol.tsx` line 42
- **Expansion darkening** (bonus): Uses `brightness(0.5)` filter AND `opacity-50` at the reel level in `SlotReel.tsx` lines 286-292

These should match for visual consistency.

### Issue 3: Tease-to-Expansion Gap
The flow currently is:
1. Tease mode activates when 2+ scatters land → `isDarkenedForTease = scatterReelsLanded.size >= 2 && isSpinning`
2. All 5 reels stop → `isSpinning = false` → tease darkening ends
3. Short delay (500ms) 
4. `showExpansionDarken = true` → expansion darkening starts

The problem: Between steps 2 and 4, there's a gap where darkening is removed, causing a visual flash.

---

## Solution

### File 1: `src/components/slots/SlotGame.tsx`

**Part A: Add state for phased win display**

Add a new state to track whether we're showing connecting wins vs expansion wins:
```typescript
const [showConnectingWinsFirst, setShowConnectingWinsFirst] = useState(false);
const [connectingWins, setConnectingWins] = useState<LineWin[]>([]);
```

**Part B: Modify win processing flow (around lines 730-745)**

When processing bonus spin results with both connecting wins AND expanding wins:

1. First, calculate connecting wins (non-expanding symbol wins on the original grid BEFORE expansion)
2. If there are connecting wins, show them first with a delay
3. Then trigger expansion animation
4. Then show expanding symbol wins

This requires:
- Passing original grid to calculate connecting wins separately
- Adding a timeout between connecting win display and expansion

**Part C: Fix darkening transition gap**

Change how `isDarkenedForTease` works to persist until expansion darkening takes over:

```typescript
// Current (line 876):
isDarkenedForTease={scatterReelsLanded.size >= 2 && isSpinning}

// Fixed - keep tease darkening until expansion takes over:
isDarkenedForTease={
  (scatterReelsLanded.size >= 2 && isSpinning) || 
  (bonusState.isActive && pendingExpandedReelsRef.current.length > 0 && !showExpansionDarken && expandedReels.length === 0)
}
```

This ensures:
- Tease darkening stays active after reels stop
- Until expansion darkening (`showExpansionDarken`) is enabled

### File 2: `src/components/slots/SlotReel.tsx`

**Unify darkening effect**

Change expansion darkening to match tease darkening style:

Before (lines 279-294):
```typescript
const isReelDarkened = isDarkenedForTease || isDarkenedForExpansion;
// ...
isDarkenedForExpansion && "opacity-50"
// ...
filter: isDarkenedForExpansion ? 'brightness(0.5)' : undefined,
```

After:
```typescript
// Apply darkening via brightness filter at symbol level, not reel level
// Remove opacity-50 and brightness(0.5) from reel level for expansion
// Instead, pass isDarkenedForExpansion down to symbols like we do for tease
```

Then update the symbol rendering to include expansion darkening:
```typescript
const shouldDarkenSymbol = isDarkenedForTease && !symbol.is_scatter;
// Change to:
const shouldDarkenSymbol = (isDarkenedForTease || isDarkenedForExpansion) && !symbol.is_scatter;
```

Wait - for expansion, we want to darken ALL symbols on non-expanded reels (including scatters that aren't the expanding symbol). So the logic should be:

```typescript
// During tease, darken non-scatter symbols individually
// During expansion, darken all symbols on non-expanded reels
const shouldDarkenSymbol = (isDarkenedForTease && !symbol.is_scatter) || isDarkenedForExpansion;
```

And remove the reel-level brightness/opacity effects.

### File 3: `src/lib/bonusGameLogic.ts`

**Add function to calculate connecting wins separately**

Add a new exported function `calculateConnectingWins` that:
- Takes the ORIGINAL grid (before expansion)
- Returns only the wins that DON'T involve the expanding symbol
- These are wins from other symbols that happen to connect on paylines

```typescript
export function calculateConnectingWins(
  originalGrid: string[][],
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbol: SlotSymbol
): LineWin[] {
  // Calculate wins on original grid, excluding expanding symbol wins
  // This gives us "connecting wins" that exist independently of expansion
}
```

---

## Implementation Details

### SlotGame.tsx - Modified flow for bonus spins with expanding wins

Current flow:
```
1. Reels stop
2. Set expandedReels, showExpansionDarken
3. Wait 500ms
4. Set expanded grid
5. Wait 600ms for animation
6. Show result with all wins at once
```

New flow:
```
1. Reels stop
2. Calculate connecting wins on ORIGINAL grid (wins not involving expanding symbol)
3. If connecting wins exist:
   a. Show connecting wins (set lastResult with just those wins)
   b. Show win lines for those wins
   c. Wait 1000ms for user to see them
4. Set expandedReels, showExpansionDarken 
5. Wait 500ms
6. Set expanded grid
7. Wait 600ms for animation  
8. Calculate and show expanding wins (replace previous result)
```

### Darkening during transition

The key is to keep reels darkened continuously from tease mode through expansion:

1. **Tease darkening starts**: When 2+ scatters have landed during spin
2. **Tease darkening persists**: After all reels stop, IF we're in bonus AND there are pending expanded reels
3. **Expansion darkening takes over**: When `showExpansionDarken = true`
4. **Both end**: When expansion animation completes

---

## Files to Modify

1. **`src/components/slots/SlotGame.tsx`**
   - Add state for phased win display
   - Modify onReelStop handler to separate connecting vs expanding wins
   - Add delays to show connecting wins first
   - Fix `isDarkenedForTease` to persist until expansion takes over

2. **`src/components/slots/SlotReel.tsx`**
   - Remove reel-level opacity-50 and brightness(0.5) for expansion darkening
   - Apply darkening at symbol level consistently with tease darkening
   - Use same brightness(0.35) filter for both tease and expansion

3. **`src/lib/bonusGameLogic.ts`**
   - Add `calculateConnectingWins()` function to separate non-expanding wins

---

## Expected Results

| Scenario | Before | After |
|----------|--------|-------|
| Connecting + Expanding win | All wins shown together after expansion | Connecting wins shown first, then expansion, then expanding wins |
| Tease darkening | brightness(0.35) on non-scatter symbols | Same |
| Expansion darkening | brightness(0.5) + opacity(0.5) on whole reel | brightness(0.35) on all symbols (matches tease) |
| Tease → Expansion transition | Brief flash of full brightness | Continuous darkening, no flash |
