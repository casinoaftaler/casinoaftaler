

# Slot Request Stats on Profile Page

## Overview
Add a new card to the user's profile page showing their slot request statistics: total requests, bonus hits, no bonus, and calculated hit percentage.

## What will be built

A "Slot Request Stats" card displayed on the profile page (below the Community Bonus section) with:
- Total resolved requests (bonus_hit + no_bonus)
- Bonus hits count
- No bonus count
- Pending requests count
- Hit percentage (bonus_hit / resolved * 100)
- Credits earned from bonus hits

## Technical Details

### New Component: `src/components/profile/ProfileSlotRequestStats.tsx`
- Uses the existing `useMySlotRequests()` hook to fetch the user's requests
- Calculates stats by filtering on `status` field:
  - `bonus_hit` = successful bonus
  - `no_bonus` = played but no bonus
  - `pending` = awaiting result
  - `rejected` = declined
- Displays a card with a stats grid (similar style to `ProfileCommunityBonusSection`)
- Shows hit rate as a percentage with a progress bar

### Modified File: `src/pages/Profile.tsx`
- Import and render `ProfileSlotRequestStats` below the `ProfileCommunityBonusSection` component

### Layout (card contents)
```text
+----------------------------------+
| Gamepad2 icon  Slot Requests     |
+----------------------------------+
| [Bonus Hit]  | [Ingen Bonus]     |
|     3         |     7            |
|               |                  |
| [Hit Rate]   | [Credits Optjent] |
|    30%        |     60           |
|  ========     |                  |
| [Afventer]   | [Total]          |
|     1         |     11           |
+----------------------------------+
```

No database changes required -- all data already exists in the `slot_requests` table with appropriate RLS policies for user self-access.

