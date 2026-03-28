

## Problem
The "Requested By" avatars in the Bonus Hunt slot table are invisible to regular users. The `slot_requests` table has RLS policies that only allow users to see **their own** requests. The `useBonusHuntSlotRequesters` hook queries all `bonus_hit` requests to build the requester map, but non-admin users get back an empty result set.

## Solution
Add a public SELECT policy on `slot_requests` for rows where `status = 'bonus_hit'`. This is safe — it only exposes `slot_name` and `user_id` for already-resolved requests, which is the same data displayed publicly in the UI.

## Technical Detail

### Database Migration
```sql
CREATE POLICY "Anyone can view bonus hit requests"
  ON public.slot_requests FOR SELECT
  TO public
  USING (status = 'bonus_hit');
```

This single policy change makes the requester data visible to all visitors. No code changes needed — `useBonusHuntSlotRequesters` already queries correctly, it just gets empty results due to RLS.

