

## Plan: Add queue position to slot requests + sort oldest-first in admin

### What changes

1. **New hook** `usePendingQueuePositions` in `useSlotRequests.ts`
   - Fetches all pending slot requests ordered by `created_at asc`
   - Returns a `Map<string, number>` mapping request ID → queue position (1-based)
   - Subscribes to realtime updates via existing channel

2. **User-facing: show position** in `SlotRequestForm.tsx`
   - Import and use `usePendingQueuePositions`
   - For each pending request in the user's list, show a small badge like `#3 i køen` next to the status badge
   - Update the success toast in `useCreateSlotRequest` to include the position (by counting pending requests + 1)

3. **Admin panel** in `SlotRequestsAdminSection.tsx`
   - Sort `pendingRequests` by `created_at ascending` (currently descending from query)
   - Add a `#` column showing queue position (index + 1), so oldest = #1 at top

### Files to modify
- `src/hooks/useSlotRequests.ts` — add `usePendingQueuePositions` hook
- `src/components/SlotRequestForm.tsx` — show queue position badge on pending requests
- `src/components/SlotRequestsAdminSection.tsx` — sort ascending + add position column

