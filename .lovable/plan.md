
# Fix Decimal Win Storage in Leaderboard

## The Problem

The database columns for storing wins are defined as **integer**, which truncates decimal values:

| Column | Current Type | Problem |
|--------|--------------|---------|
| win_amount | integer | 1.5 becomes 1 |
| bet_amount | integer | OK (usually whole numbers) |
| bonus_win_amount | integer | 1.5 becomes 1 |

When a player wins 1.5 points (from a 0.5× multiplier with bet 3), it gets saved as 1, losing 0.5 points from the leaderboard.

## Solution

Change the `win_amount` and `bonus_win_amount` columns from `integer` to `numeric(10,2)` to support 2 decimal places.

## Changes Required

### 1. Database Migration

Alter the `slot_game_results` table to use decimal types:

```sql
-- Change win_amount from integer to numeric
ALTER TABLE slot_game_results 
  ALTER COLUMN win_amount TYPE numeric(10,2) USING win_amount::numeric(10,2);

-- Change bonus_win_amount from integer to numeric  
ALTER TABLE slot_game_results 
  ALTER COLUMN bonus_win_amount TYPE numeric(10,2) USING bonus_win_amount::numeric(10,2);
```

### 2. Update the Leaderboard View

The `slot_leaderboard` view needs to be recreated to handle the new numeric types (it will automatically work with the new column types, no changes needed to the view definition).

## Files Changed

| Location | Change |
|----------|--------|
| Database migration | Alter column types to numeric(10,2) |
| No code changes needed | The existing code already passes decimal values |

## What This Fixes

| Scenario | Before | After |
|----------|--------|-------|
| Win 1.5 points | Saved as 1 | Saved as 1.50 |
| Win 0.75 points | Saved as 0 | Saved as 0.75 |
| Total winnings display | Missing decimals | Accurate totals |

## Impact on Existing Data

- Existing integer values will be converted to decimals (1 → 1.00)
- No data loss for existing records
- All future wins will be recorded accurately

## Summary

This is a simple database schema change that converts integer columns to numeric columns, allowing decimal win amounts to be stored correctly. The leaderboard totals will then accurately reflect all wins including those with decimal multipliers.
