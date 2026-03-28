

## Plan: Add "Requested By" to Bonus Hunt + 100x Credit Reward

### Overview
When a slot request gets "Bonus Hit", link the requester to the corresponding slot in the current bonus hunt. Show "Requested By" in the slot table. If the slot achieves 100x+ multiplier, award 500 credits to the requester.

### Database Changes

**1. Add `hunt_number` column to `slot_requests`**
```sql
ALTER TABLE public.slot_requests ADD COLUMN hunt_number integer;
```
When admin clicks "Bonus Hit", store the current active hunt number on the request.

### Backend Changes

**2. Update `useUpdateSlotRequestStatus` hook (`src/hooks/useSlotRequests.ts`)**
- Accept `huntNumber` parameter in the mutation
- When status = "bonus_hit", update the request with the current `hunt_number`

**3. Update `SlotRequestsAdminSection.tsx`**
- Fetch the current active hunt number (from `useBonusHuntSession` or `useLatestHuntNumber`)
- Pass `huntNumber` to the `handleAction` call when clicking "Bonus Hit"

**4. Create a new hook `useBonusHuntSlotRequesters` (`src/hooks/useSlotRequests.ts`)**
- Query: `slot_requests` WHERE `hunt_number = X` AND `status = 'bonus_hit'`, joined with `profiles` for `display_name`
- Returns a Map of `slot_name (lowercase) -> display_name` for the current hunt

### Frontend Changes

**5. Update `BonusHuntSlotTable.tsx`**
- Import and call `useBonusHuntSlotRequesters(huntNumber)`
- Add a "Requested By" column to the table
- Match each slot's name against the requester map
- Show the requester's display name, or leave empty if no match

**6. Pass `huntNumber` prop to `BonusHuntSlotTable`**
- Update `BonusHunt.tsx` to pass `currentHuntNumber` to the slot table component

### Auto-Settle: 100x Reward

**7. Update `bonus-hunt-auto-settle/index.ts`**
- After settling, query `slot_requests` WHERE `hunt_number = session.hunt_number` AND `status = 'bonus_hit'`
- For each matched request, check if the corresponding slot in the hunt data achieved 100x+ multiplier
- If yes, award 500 credits to `request.user_id` (insert into `slot_spins` + `credit_allocation_log`)
- Update the request with `credits_awarded` reflecting the total (200 base + 500 bonus = 700)

### Technical Details
- Slot name matching uses case-insensitive comparison (lowercase both sides)
- The `hunt_number` on `slot_requests` creates a clean link between requests and hunts without a separate junction table
- RLS: existing policies already allow admins to update `slot_requests`, so the new column is covered
- The 500 credit reward uses the same credit-awarding pattern as existing GTW/AVG X settle logic

