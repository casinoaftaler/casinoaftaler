
# Plan: Fix Leaderboard Visibility and Control Bar Centering

## Problem 1: Leaderboard Names Not Visible
The leaderboard uses theme-dependent colors and Card component which have light backgrounds in light mode. Since the slot machine page uses a dark Egyptian theme, the leaderboard card looks washed out and text is hard to read.

## Problem 2: Control Bar Off-Center
The three control elements (BetControls, Spin Button, Volume+Autospin) are in a flex row with `justify-center`, but the left and right panels have different widths. This causes the spin button to not be perfectly centered visually.

---

## Solution 1: Fix Leaderboard for Dark Theme

### File: `src/components/slots/SlotLeaderboard.tsx`

Apply a dark Egyptian theme to match the slot machine:

1. **Card styling (line 52)**: Add dark background with amber border
   - Current: `className="border-amber-500/20"`
   - Updated: `className="border-amber-500/30 bg-gradient-to-b from-amber-950/95 via-black/90 to-amber-950/95 backdrop-blur-sm"`

2. **CardTitle styling (line 54)**: Ensure light text
   - Current: `className="flex items-center gap-2 text-lg"`
   - Updated: `className="flex items-center gap-2 text-lg text-amber-100"`

3. **TabsList styling (line 61)**: Dark background for tabs
   - Current: `className="grid w-full grid-cols-3 mb-4"`
   - Updated: `className="grid w-full grid-cols-3 mb-4 bg-amber-950/50"`

4. **Display name styling (line 34)**: Make names visible with light color
   - Current: `<p className="font-medium truncate">`
   - Updated: `<p className="font-medium truncate text-amber-100">`

5. **Empty state text (lines 88-89)**: Light text for empty state
   - Current: `<p>Ingen gevinster endnu</p>`
   - Updated: `<p className="text-amber-100/80">Ingen gevinster endnu</p>`
   - And update the smaller text similarly

---

## Solution 2: Center the Control Bar

### File: `src/components/slots/SlotControlPanel.tsx`

Force equal widths on left and right panels to ensure the spin button is truly centered:

1. **Left Panel (line 66)**: Add fixed width
   - Current: `<div className="order-1 sm:order-1">`
   - Updated: `<div className="order-1 sm:order-1 sm:w-40 md:w-44 lg:w-48">`

2. **Right Panel (line 156)**: Add matching fixed width
   - Current: `<div className="flex items-center gap-2 order-3 bg-gradient-to-b...`
   - Updated: `<div className="flex items-center gap-2 order-3 sm:w-40 md:w-44 lg:w-48 justify-center bg-gradient-to-b...`

This ensures both side panels have equal width, keeping the spin button perfectly centered.

---

## Summary

| Component | Issue | Fix |
|-----------|-------|-----|
| SlotLeaderboard | Light card/text on dark background | Apply dark Egyptian theme with amber accents |
| SlotControlPanel | Spin button off-center | Equal fixed widths on left/right panels |

---

## Expected Result
- Leaderboard will have a dark Egyptian-themed appearance with clearly visible amber/gold text
- Control bar will have the spin button perfectly centered between equally-sized side panels
