

# Plan: Add 1-Day Analytics Filter & Fix Statistics Accuracy

## Problem Analysis

I verified the actual data in your database:
- **Total page views:** 3,045 (today: 732)
- **Total spins:** 3,749 (today: 3,122)

The dashboard is showing 1,000 for both because **Supabase has a default query limit of 1,000 rows**. When fetching all records to calculate statistics, the queries are being capped at 1,000 rows, giving inaccurate results.

## Solution

Instead of fetching all records and counting them in JavaScript (which hits the 1,000 row limit), we should use **database-side aggregation** with SQL COUNT functions. This is both more accurate and more efficient.

## Implementation Details

### 1. Add "1 dag" (1 day) Option to Analytics Dashboard

**File: `src/components/CombinedAnalyticsDashboard.tsx`**

- Add `"1d"` to the dateRange type: `"1d" | "7d" | "30d" | "90d"`
- Add new button for "1 dag" in the date range selector
- Update `getDateRange()` function to handle the 1-day case

### 2. Fix Page Views Query (Use COUNT instead of fetching all rows)

**File: `src/components/CombinedAnalyticsDashboard.tsx`**

Instead of:
```typescript
const { data } = await supabase
  .from("page_views")
  .select("id, path, created_at")
  .gte("created_at", start.toISOString());
// Then counting in JS: data.length (capped at 1000)
```

Use database aggregation by fetching with a higher limit or using count:
```typescript
const { count } = await supabase
  .from("page_views")
  .select("*", { count: "exact", head: true })
  .gte("created_at", start.toISOString());
```

For daily breakdown, we can batch fetch in smaller date chunks or use RPC functions.

### 3. Fix Slot Statistics Query

**File: `src/hooks/useSlotAdminStatistics.ts`**

Similar fix - use database-side aggregation:
- Get total count using `{ count: "exact" }`
- Use SUM aggregations for totals where possible
- For daily breakdown, aggregate server-side if possible

## Technical Changes Summary

| File | Change |
|------|--------|
| `src/components/CombinedAnalyticsDashboard.tsx` | Add "1d" option, fix page views counting |
| `src/hooks/useSlotAdminStatistics.ts` | Fix spin counting to use proper pagination or COUNT |

## Result

After these changes:
- **Page views** will show accurate 3,045 total (not 1,000)
- **Spins** will show accurate 3,749 total (not 1,000)
- New "1 dag" filter option will be available
- Statistics will be accurate regardless of data volume

