

## Fix: Leaderboard Sorting and Global Statistics

### Current Issues

1. **No server-side sorting**: The query fetches 100 rows from `slot_leaderboard` without an `ORDER BY` clause. The database returns rows in arbitrary order, meaning the 100 rows fetched may NOT be the actual top 100. Client-side sorting happens after, but it's sorting whatever random 100 rows came back.

2. **Global statistics**: The `slot_leaderboard` view already aggregates across ALL games (no `game_id` filter), so this part is already correct. No database changes needed.

### Fix

**File: `src/hooks/useSlotLeaderboard.ts`**

Add `.order("total_winnings", { ascending: false })` to the main query (line 45-57) so the database returns the actual top 100 users by total points. The `total_winnings` column is the right sort key for the initial fetch since it represents the all-time ranking -- the most important ordering.

For the "daily" and "weekly" period views, also add period-specific ordering so the correct top 100 for each period is fetched. This means the `sortKey` logic needs to move before the query, and the query should use `.order(sortKey, { ascending: false })`.

Changes to lines 45-57:

```typescript
// Determine sort key before query
const sortKey = period === "daily" ? "daily_winnings" 
              : period === "weekly" ? "weekly_winnings" 
              : "total_winnings";

const { data, error } = await supabase
  .from("slot_leaderboard")
  .select(`
    user_id,
    total_winnings,
    biggest_win,
    biggest_multiplier,
    total_spins,
    total_bonuses,
    daily_winnings,
    weekly_winnings
  `)
  .order(sortKey, { ascending: false })
  .limit(100);
```

And remove the duplicate `sortKey` declaration from lines 93-95 since it's now declared earlier.

This ensures:
- The database returns the actual top 100 users sorted by the relevant period's points
- The user with the most points appears first
- Global (cross-game) statistics are used (already the case)
- The current user fallback query still works correctly for users outside top 100

