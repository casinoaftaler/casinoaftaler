

## Problem

On `/nye-casinoer` and `/top-10-casino-online`, a full CasinoCard grid renders **immediately** after the QuickComparisonTable (Top 3), creating a wall of casino cards with no editorial content in between. Two more pages (`/nye-casinoer/bedste` and `/nye-casinoer/dansk-licens`) have InlineCasinoCards appearing within one section of the Top 3.

## Pages to Fix

| Page | File | Issue |
|------|------|-------|
| `/nye-casinoer` | `NyeCasinoer.tsx` | CasinoCard grid (7 cards) directly after Top 3 |
| `/top-10-casino-online` | `TopCasinoOnline.tsx` | CasinoCard grid (10 cards) directly after Top 3 |
| `/nye-casinoer/bedste` | `BedsteNyeCasinoer.tsx` | InlineCasinoCards after 1 short text section |
| `/nye-casinoer/dansk-licens` | `NyeCasinoerDanskLicens.tsx` | InlineCasinoCards after 1 short text section |

No other pages have this pattern -- all other QuickComparisonTable instances are followed by editorial content sections.

## Plan

### 1. NyeCasinoer.tsx
Move the CasinoCard grid (lines 237-281) from directly after QuickComparisonTable to **after Section 3** (Testmetode, ~line 439). This places 3 full editorial sections + screenshots between Top 3 and the card grid.

### 2. TopCasinoOnline.tsx
Move the CasinoCard grid (lines 250-335) from directly after QuickComparisonTable to **after the "Sådan vurderer vi" section** (~line 459). This places 2 editorial sections between Top 3 and the card grid.

### 3. BedsteNyeCasinoer.tsx
Move the `<InlineCasinoCards>` (line 91) further down -- after the scoring model section (~line 130+). This adds meaningful editorial distance.

### 4. NyeCasinoerDanskLicens.tsx
Move the `<InlineCasinoCards>` (line 127) further down -- after the "6 lovmæssige rettigheder" section. This adds editorial distance.

## Technical Details
- Pure layout reordering -- no new components or logic changes
- Each move is a cut-and-paste of the existing JSX block to a later position in the same file
- All existing Separators and section structure preserved

