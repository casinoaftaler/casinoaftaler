
# Refined Win Celebration Graphics

## Problem
The current win celebration has an oversized border glow that fills the entire game area, making it feel boxy and unprofessional. The text floats without a focused container, and the pulsing border covers the full grid inset.

## Changes

### 1. Add a compact, styled card behind the win text
- Replace the full-inset glow border with a focused, compact card behind the text content
- The card will have a frosted glass effect with a subtle themed border
- Sized to tightly wrap the text content rather than spanning the entire grid
- Rounded corners, backdrop blur, and a refined gradient background

### 2. Reduce and refine the border glow
- Remove the full-inset `glow-pulse` box-shadow that covers the entire game area
- Instead, apply a subtle glow only to the compact win card
- Scale the glow intensity by win tier (Big < Mega < Epic)

### 3. Improve text hierarchy and spacing
- Tighten padding: smaller, more proportional spacing inside the card
- Adjust font sizes slightly for better balance within the compact card
- Add a subtle divider or spacing between the title and amount
- Remove emoji decorations from the title text for a cleaner look (optional, keep if preferred)

### 4. Polish the card presentation
- Add a thin themed border (pink for Bonanza, purple for Wizard, gold for Egyptian)
- Inner shadow for depth
- The card itself gets the glow effect instead of the full grid

## Technical Details

### File: `src/components/slots/WinCelebration.tsx`

**Lines 514-593** (Big Win Text Overlay section):
- Wrap the text content in a compact card div with:
  - `backdrop-blur-md bg-black/60` for frosted glass
  - `rounded-2xl` with themed border
  - Compact padding: `px-8 py-5` for big, `px-10 py-6` for mega, `px-12 py-8` for epic
  - Themed box-shadow glow on the card itself

**Lines 631-646** (Pulsing border glow):
- Remove or significantly reduce the full-inset glow div
- The glow effect moves to the compact card instead

### No new files needed
All changes are within `WinCelebration.tsx`.
