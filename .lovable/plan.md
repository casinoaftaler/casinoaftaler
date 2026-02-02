
# Remove Dark Box Background from Slot Machine

## Summary
Remove the dark card background and container box styling from the slot machine, allowing the Egyptian temple background from the page to show through.

## What Will Change

The slot machine currently has two layers of dark backgrounds:
1. An outer Card component with a semi-transparent dark background
2. An inner container around the reels with an amber-950 gradient

Both will be removed to create a transparent, floating appearance that lets the beautiful background image show through.

---

## Technical Implementation

### File: `src/components/slots/SlotGame.tsx`

**Change 1: Remove Card wrapper background (lines 447-452)**
- Current: Uses Card with `bg-card/80 backdrop-blur-sm` and amber border
- Change: Replace Card with a simple div, remove background styling while keeping overflow and bonus effects

**Change 2: Remove Egyptian header gradient bar (lines 453-459)**
- This decorative bar at the top of the card will be removed as part of removing the card styling

**Change 3: Remove reel container background (lines 491-498)**
- Current: Dark gradient `bg-gradient-to-b from-amber-950/80 to-background` with thick borders
- Change: Remove background gradient, reduce or remove borders, keep only functional padding and glow effects during spinning/bonus

### Expected Result
- Slot machine reels will appear to float on the page background
- Individual symbol boxes still have their own styling (amber/gold theme)
- Bonus mode glow effects and spinning effects will still be visible
- The overall look will be cleaner and more integrated with the Egyptian temple background
