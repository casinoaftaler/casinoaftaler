
# Plan: Replace "Gratis Spins" with Bonus Type in Casino Cards

## Overview
Update the casino cards to display the bonus type (Sticky Bonus or No-Sticky Bonus) instead of "Gratis Spins" in the stats box.

## Changes Required

### File: src/components/CasinoCard.tsx

#### 1. FeaturedCard Stats Box (Lines 306-315)
Change the first column from "GRATIS SPINS" to "BONUS TYPE":
- Update the label from "GRATIS SPINS" to "BONUS TYPE"
- Change the value from `{casino.freeSpins || '-'}` to display:
  - "No-Sticky" when `casino.bonusType === "No-sticky"`
  - "Sticky" otherwise

#### 2. CasinoInfoContent Stats Row (Lines 81-82)
Update the expanded details grid:
- Change label from "Gratis Spins" to "Bonus Type"  
- Change value from `{casino.freeSpins || 'N/A'}` to show the bonus type

---

## Technical Details

The bonus type display logic:
```tsx
// Label
<p className="...">BONUS TYPE</p>

// Value
<p className="...">
  {casino.bonusType === "No-sticky" ? "No-Sticky" : "Sticky"}
</p>
```

This ensures consistency with the updated terminology (Sticky Bonus / No-Sticky Bonus) from the previous changes.
