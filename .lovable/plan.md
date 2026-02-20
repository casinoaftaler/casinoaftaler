

# Redesign Gates Pay Table to Match Reference Layout

## Overview

Redesign the `GatesPayTable` component to match the reference image layout (card-based grid instead of table rows) and update all symbol payouts in the database to match the reference values.

## 1. Database: Update All Symbol Multipliers

Update `slot_symbols` for `gates-of-fedesvin` to match the reference image payouts (based on 1 credit bet):

| Symbol | Rarity | 8-9 (m3) | 10-11 (m4) | 12-30 (m5) |
|--------|--------|----------|------------|------------|
| Gold Cup | premium | 10.00 | 25.00 | 50.00 |
| Gold Ring | premium | 2.50 | 10.00 | 25.00 |
| Hourglass | premium | 2.00 | 5.00 | 15.00 |
| Chalice | premium | 1.50 | 2.00 | 12.00 |
| Red Gem | common | 1.00 | 1.50 | 10.00 |
| Purple Gem | common | 0.80 | 1.20 | 8.00 |
| Green Gem | common | 0.50 | 1.00 | 5.00 |
| Blue Gem | common | 0.40 | 0.90 | 4.00 |
| Yellow Gem | common | 0.25 | 0.75 | 2.00 |
| Zeus (Scatter) | scatter | 3.00 | 5.00 | 100.00 |

## 2. Redesign GatesPayTable Component

Replace the current table-based layout with a card-grid layout matching the reference:

- **Header**: "GAME RULES" title
- **Description**: "Symbols pay anywhere on the screen. The total number of the same symbol on the screen at the end of a spin determines the value of the win."
- **Premium row**: 4 symbol cards in a horizontal row, each showing:
  - Symbol image (larger, centered)
  - Three payout lines: `12 - 30  $XX.XX`, `10 - 11  $XX.XX`, `8 - 9  $XX.XX`
  - Each card has a bordered box appearance
- **Common row**: 5 symbol cards in a horizontal row, same card format
- **Scatter section**: Symbol image with payout lines for 6, 5, 4 counts plus description text

Each card will be a small bordered box with the symbol image on top and payout lines below, styled with the dark theme to match the reference.

## 3. Files Changed

- **Database**: UPDATE multiplier values for all 10 symbols
- **Modified**: `src/components/slots/GatesPayTable.tsx` (complete redesign of layout from table to card grid)

