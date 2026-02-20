

# Update Symbol Rarities and Pay Table for Gates of Fedesvin

## Overview

Two changes are needed:
1. Re-categorize symbols so all gems are "common" and the non-gem items (Gold Cup, Gold Ring, Hourglass, Chalice) are "premium"
2. Create a Gates-specific pay table that shows pay-anywhere mechanics (8+, 10+, 12+ matches) instead of the payline-based columns (2x, 3x, 4x, 5x) used by the other slot games

## 1. Database: Update Symbol Rarities

Update the `slot_symbols` table for `gates-of-fedesvin`:

| Symbol | Current Rarity | New Rarity |
|--------|---------------|------------|
| Red Gem | premium | common |
| Purple Gem | premium | common |
| Green Gem | premium | common |
| Blue Gem | premium | common |
| Yellow Gem | common | common |
| Gold Cup | common | premium |
| Gold Ring | common | premium |
| Hourglass | common | premium |
| Chalice | common | premium |
| Zeus (Scatter) | scatter | scatter (unchanged) |

This will be done via SQL UPDATE statements on the `slot_symbols` table.

## 2. New Component: GatesPayTable

Create `src/components/slots/GatesPayTable.tsx` -- a pay table specific to the Gates game that shows:

- **Premium symbols** (Gold Cup, Gold Ring, Hourglass, Chalice): Higher payouts, displayed with columns for 8+, 10+, 12+ matches
- **Common symbols** (all 5 gems): Lower payouts, displayed with columns for 8+, 10+, 12+ matches
- **Scatter** (Zeus): Shown separately with bonus trigger info (4+ scatters trigger free spins)
- **Multiplier info**: Section explaining multiplier orbs (2x-500x) that appear during tumbles
- **Game rules**: "Pay Anywhere" mechanic explanation instead of "10 gevinstlinjer"

The column headers will be **8+**, **10+**, **12+** (mapping to `multiplier_3`, `multiplier_4`, `multiplier_5` from the database).

## 3. Wire Up the Gates Pay Table

Modify `src/components/slots/SlotControlPanel.tsx` to conditionally render `GatesPayTable` when `gameId` is `"gates-of-fedesvin"`, and the standard `PayTable` for other games.

## Files Changed

- **Database**: UPDATE rarity values for 8 symbols in `slot_symbols`
- **New file**: `src/components/slots/GatesPayTable.tsx`
- **Modified**: `src/components/slots/SlotControlPanel.tsx` (conditional import)

