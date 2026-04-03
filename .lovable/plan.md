

## Plan: Add Slot Request Stats to Public Profiles

### What we're building
Show each user's Bonus Hunt slot request stats (Bonus Hits, No Bonus, Hit Rate %) on their public profile page, so visitors can see how "lucky" a user is.

### Approach

**1. New hook: `useUserSlotRequestStats`**
- Create a query in `src/hooks/useSlotRequests.ts` that fetches slot request stats for any user by `user_id`
- The `slot_requests` table already has an RLS policy allowing anyone to view `bonus_hit` requests, but we also need `no_bonus` for hit rate calculation
- We'll need a **new RLS policy** to allow public SELECT on `no_bonus` status requests too (or create a DB function that returns aggregated counts securely)

**2. Database migration**
- Add a **security definer function** `get_user_slot_request_stats(target_user_id uuid)` that returns `bonus_hits`, `no_bonus`, `total_resolved`, `hit_rate` without exposing raw request data
- This avoids needing to open up RLS further — the function runs with elevated privileges and only returns aggregate numbers

```sql
CREATE OR REPLACE FUNCTION public.get_user_slot_request_stats(target_user_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'bonus_hits', COUNT(*) FILTER (WHERE status = 'bonus_hit'),
    'no_bonus', COUNT(*) FILTER (WHERE status = 'no_bonus'),
    'total', COUNT(*),
    'pending', COUNT(*) FILTER (WHERE status = 'pending')
  )
  FROM public.slot_requests
  WHERE user_id = target_user_id
$$;
```

**3. New hook: `useUserSlotRequestStats(userId)`**
- File: `src/hooks/useSlotRequests.ts`
- Calls `supabase.rpc('get_user_slot_request_stats', { target_user_id: userId })`
- Returns `{ bonusHits, noBonus, hitRate, total }`

**4. Public Profile UI update**
- File: `src/pages/PublicProfile.tsx`
- Add a new "Slot Requests" section between Points and Stats sections
- Show 3 StatCards: Bonus Hits (green), Ingen Bonus (muted), Hit Rate % (with progress bar)
- Only render section if user has any resolved requests

### Files changed
- **1 migration** — `get_user_slot_request_stats` function
- **`src/hooks/useSlotRequests.ts`** — add `useUserSlotRequestStats` hook
- **`src/pages/PublicProfile.tsx`** — add slot request stats section

