
# Plan: Change Bonus Mode Colors from Purple to Golden/Amber

## Overview
Replace all purple/primary color usage during bonus mode with the consistent golden/amber Egyptian theme colors already used throughout the slot machine.

---

## Files to Modify

### 1. `src/components/slots/BonusOverlay.tsx`
**Issue:** Decorative corner borders use `border-primary/70` (purple)

**Change:** Replace with amber/golden color
- Lines 47-50: Change all four corner divs from `border-primary/70` to `border-amber-400/70`

---

### 2. `src/components/slots/SlotGame.tsx`
**Issue:** Spin button has purple gradient and glow during bonus mode

**Changes:**
- Lines 699-716: Remove all purple styling conditionals and use amber consistently:
  - Gradient: `from-amber-300 via-amber-500 to-amber-700` (no conditional)
  - Border: `border-amber-400/60` (no conditional)
  - Shadow: amber glow with `rgba(251,191,36,...)` (no conditional)
  - Hover: amber glow (no conditional)

---

### 3. `src/components/slots/BonusStatusBar.tsx`
**Issue:** Uses `text-primary` (purple) for Sparkles icon and bonus winnings

**Changes:**
- Line 36: Change Sparkles icon from `text-primary` to `text-amber-400`
- Line 76: Change bonus winnings from `text-primary` to `text-amber-400`

---

## Summary of Color Changes

| Component | Element | Before (Purple) | After (Golden) |
|-----------|---------|-----------------|----------------|
| BonusOverlay | Corner borders | `border-primary/70` | `border-amber-400/70` |
| SlotGame | Spin button gradient | Conditional purple/amber | Always `from-amber-300 via-amber-500 to-amber-700` |
| SlotGame | Spin button border | Conditional purple/amber | Always `border-amber-400/60` |
| SlotGame | Spin button glow | Conditional purple/amber | Always amber rgba |
| BonusStatusBar | Sparkles icon | `text-primary` | `text-amber-400` |
| BonusStatusBar | Bonus winnings | `text-primary` | `text-amber-400` |

---

## Visual Result
All bonus mode UI elements will use the consistent golden/amber Egyptian theme:
- Bonus trigger overlay with golden corner accents
- Retrigger overlay with golden corner accents
- Spin button maintains golden glow during free spins
- Bonus status bar uses golden accents for indicators
