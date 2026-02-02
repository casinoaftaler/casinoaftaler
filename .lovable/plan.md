

# Plan: Fix "Side Analytik" - Connect to Real Analytics Data

## Problem
The "Side Analytik" (Page Analytics) tab in the admin dashboard shows no data because it tries to fetch from `/api/analytics` - an endpoint that doesn't exist. The request always fails, returning an empty array.

## Solution Options

There are two approaches to fix this:

### Option A: Use Lovable's Built-in Analytics (Recommended)

Lovable provides built-in analytics for published projects. We can create an edge function that fetches this data and exposes it to the admin dashboard.

**Implementation:**

1. **Create Edge Function**: `supabase/functions/get-analytics/index.ts`
   - Receives date range parameters (start, end, granularity)
   - Uses Lovable's internal analytics system
   - Returns visitor and page view data
   - Requires admin authentication

2. **Update Dashboard Query**: Modify `CombinedAnalyticsDashboard.tsx` to call the edge function instead of the non-existent `/api/analytics` endpoint

### Option B: Track Page Views in Database

Create a custom page view tracking system using Supabase.

**Implementation:**

1. **Create `page_views` table** with columns:
   - `id`, `path`, `user_agent`, `referrer`, `created_at`

2. **Create tracking component** that logs page views on each navigation

3. **Update dashboard** to query the `page_views` table

---

## Recommended: Option A

Since Lovable has built-in analytics for production sites, connecting to that data source is cleaner and requires no additional tracking code on the frontend.

### Files to Create
1. `supabase/functions/get-analytics/index.ts` - Edge function to fetch analytics

### Files to Modify
1. `src/components/CombinedAnalyticsDashboard.tsx` - Update fetch to use edge function

### Edge Function Implementation

```typescript
// supabase/functions/get-analytics/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  // Verify admin authentication
  // Fetch analytics data from Lovable's analytics system
  // Return formatted data for the dashboard
})
```

### Dashboard Query Update

Replace the failing fetch call with:
```typescript
const { data, error } = await supabase.functions.invoke('get-analytics', {
  body: { startDate, endDate, granularity }
});
```

---

## Note
The "Klik Analytik" tab already works correctly because it fetches from the `click_events` table in Supabase. Only the "Side Analytik" tab needs to be fixed.

