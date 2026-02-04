
# Plan: Fix Slot Machine Light Mode Overlay

## Problem
The slot machine page uses gradient overlays with `bg-gradient-to-b from-background/60 via-background/40 to-background/70` which creates a bright white overlay in light mode, washing out the Egyptian background.

The `background` CSS variable is light in light mode (`250 30% 97%` = almost white), so the overlay becomes a white semi-transparent layer instead of a dark cinematic effect.

## Solution
Replace the theme-dependent `background` color with a fixed dark color (`black`) for all slot machine overlays. This ensures the Egyptian/cinematic atmosphere is preserved in both light and dark modes.

---

## Technical Details

### Files to Modify

#### 1. `src/pages/SlotMachine.tsx`

**Lines 73, 100, 127** - Change the overlay gradient from `from-background/X` to `from-black/X`:

| Location | Current | Updated |
|----------|---------|---------|
| Line 73 (loading state) | `bg-gradient-to-b from-background/80 via-background/60 to-background/90` | `bg-gradient-to-b from-black/80 via-black/60 to-black/90` |
| Line 100 (not logged in) | `bg-gradient-to-b from-background/80 via-background/60 to-background/90` | `bg-gradient-to-b from-black/80 via-black/60 to-black/90` |
| Line 127 (main game) | `bg-gradient-to-b from-background/60 via-background/40 to-background/70` | `bg-gradient-to-b from-black/60 via-black/40 to-black/70` |

---

#### 2. `src/components/slots/SlotIntroScreen.tsx`

**Line 20** - Change the overlay gradient:

| Location | Current | Updated |
|----------|---------|---------|
| Line 20 | `bg-gradient-to-b from-background/80 via-background/60 to-background/90` | `bg-gradient-to-b from-black/80 via-black/60 to-black/90` |

---

#### 3. `src/components/slots/SlotLoadingScreen.tsx`

**Line 59** - Change the overlay gradient:

| Location | Current | Updated |
|----------|---------|---------|
| Line 59 | `bg-gradient-to-b from-background/80 via-background/70 to-background/90` | `bg-gradient-to-b from-black/80 via-black/70 to-black/90` |

---

#### 4. `src/components/slots/SlotPageLockGate.tsx`

**Line 40** - Change the overlay gradient:

| Location | Current | Updated |
|----------|---------|---------|
| Line 40 | `bg-gradient-to-b from-background/90 via-background/80 to-background/95` | `bg-gradient-to-b from-black/90 via-black/80 to-black/95` |

---

## Summary

| File | Lines Changed | Change |
|------|---------------|--------|
| `SlotMachine.tsx` | 73, 100, 127 | `background` to `black` in 3 overlays |
| `SlotIntroScreen.tsx` | 20 | `background` to `black` in 1 overlay |
| `SlotLoadingScreen.tsx` | 59 | `background` to `black` in 1 overlay |
| `SlotPageLockGate.tsx` | 40 | `background` to `black` in 1 overlay |

---

## Expected Result
The slot machine will maintain its dark, cinematic Egyptian atmosphere in both light and dark modes, with no more white overlay washing out the background imagery.
