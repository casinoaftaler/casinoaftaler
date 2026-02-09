

## Fix: Keep Reels Darkened During Payline Animation

### Current Problem
When expanding symbols win in bonus mode (both Book of Fedesvin and Rise of Fedesvin), the non-expanding reels darken correctly during the expansion animation but return to normal brightness the moment paylines start showing. The darken should persist until the payline animation is complete.

### Root Cause

**Single expansion group (Book of Fedesvin / single Rise wins):**
- Line 858: `setShowExpansionDarken(false)` is called immediately after the expand animation finishes
- Line 937: `setShowWinLines(true)` happens later, but by then the darken is already gone

**Multiple expansion groups (Rise of Fedesvin multi-symbol wins):**
- Line 840: `setShowExpansionDarken(false)` is called during the "unexpand" phase, but should only be removed AFTER the payline display (line 831-832) completes

### Solution

**File: `src/components/slots/SlotGame.tsx`**

1. **Single group flow (lines 847-859):** Move `setShowExpansionDarken(false)` from line 858 to after the payline display. Add an inline payline display phase (similar to the multi-group flow) with a timed `await`, then turn off darken afterward.

2. **Multi group flow (lines 826-841):** Move `setShowExpansionDarken(false)` from line 840 to after the payline await on line 831. The sequence becomes:
   - Show paylines (with darken still active)
   - Wait 1200ms for payline animation
   - Hide paylines
   - Turn off darken
   - Unexpand / restore grid
   - Wait 500ms before next group

### Updated Sequences

**Single group:**
```
Darken ON -> Expand -> Show paylines -> Wait 1200ms -> Hide paylines -> Darken OFF
```

**Multi group (per symbol):**
```
Darken ON -> Expand -> Show paylines -> Wait 1200ms -> Hide paylines -> Darken OFF -> Unexpand -> Wait 500ms -> Next group
```
