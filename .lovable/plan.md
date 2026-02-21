

## Fix: Tumble Drop Animation Clipped by Overflow

### Root Cause

Each cell in the grid has `overflow-hidden` applied (GatesColumn.tsx, line 96). During the tumble sequence:

- **New symbols** use `tumble-drop`, starting at `translateY(-120%)` (above the cell)
- **Surviving symbols** use `tumble-gravity`, starting at a negative `translateY` offset

Because `overflow: hidden` clips content outside the cell bounds, the symbols are invisible while positioned above, then appear instantly when they reach `translateY(0)`. This makes it look like the entire grid "refreshes" rather than symbols dropping.

### Fix

**File: `src/components/slots/GatesColumn.tsx`**

1. Remove the permanent `overflow-hidden` from each cell's className.
2. Conditionally apply `overflow-hidden` only when the cell is NOT in a `dropping` or `filling` animation state. During those states, use `overflow-visible` so the translate animation is visible.
3. Apply `overflow-hidden` on the **column container** instead during idle/spinning states to keep things tidy, and switch to `overflow-visible` during the tumble phase.

Concrete change on the cell `div` (around line 95-104):

```tsx
// Before:
"relative rounded-lg overflow-hidden",

// After:
"relative rounded-lg",
(cellAnim === 'dropping' || cellAnim === 'filling') ? "overflow-visible" : "overflow-hidden",
```

And on the column container (around line 74-80), allow overflow during tumble:

```tsx
// Add to the column div className:
tumblePhase !== 'idle' && tumblePhase !== 'spinning' ? "overflow-visible" : "overflow-hidden",
```

No CSS changes needed -- the keyframes are already correct; they were just being clipped.

