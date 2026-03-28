

## Plan: Auto-match slot requests + prevent duplicates

### Current flow (confirmed)
1. User requests a slot → stored in `slot_requests` with status `pending`
2. Slot gets added to StreamSystem by the streamer
3. Admin manually clicks "Bonus Hit" → awards 200 credits, links to hunt_number

### What changes

**1. Auto-match in the proxy function**
When `bonus-hunt-proxy` syncs slot data from StreamSystem, compare each slot name against pending `slot_requests`. If a match is found (case-insensitive), automatically set `status = 'bonus_hit'`, assign the `hunt_number`, and award 200 credits — no manual admin action needed.

**2. Prevent duplicate slot requests**
Before inserting a new request, check if:
- The same slot name already has a `pending` or `bonus_hit` request (any user) for the current active hunt
- The slot is already on the current bonus hunt list (from StreamSystem data)

Show a toast message like "Denne slot er allerede blevet requested" or "Denne slot er allerede på listen".

### Files to change

**`supabase/functions/bonus-hunt-proxy/index.ts`** (~lines 520-523, after slot catalog sync)
- Query `slot_requests` WHERE `status = 'pending'`
- For each pending request, check if `slot_name` (lowercase) matches any slot in the current hunt data
- If matched: update status to `bonus_hit`, set `hunt_number`, award 200 credits (same logic as `useUpdateSlotRequestStatus`), log to `credit_allocation_log`
- This runs on every proxy call so it catches new slots as they appear

**`src/hooks/useSlotRequests.ts`** — `useCreateSlotRequest` mutation
- Before inserting, query `slot_requests` for existing `pending`/`bonus_hit` entries with the same `slot_name` (case-insensitive)
- If found, throw error "Denne slot er allerede blevet requested"
- Also add a DB-level unique constraint isn't needed since we check client-side

**`src/components/SlotRequestForm.tsx`**
- Update error handler to show the duplicate message from the mutation

### Technical details

Auto-match in proxy (fire-and-forget, non-blocking):
```typescript
// After syncSlotCatalog, auto-match pending requests
const slotNames = huntData.data?.map(s => s.title?.toLowerCase()).filter(Boolean) || [];
if (slotNames.length > 0) {
  const { data: pendingReqs } = await supabase
    .from('slot_requests')
    .select('id, user_id, slot_name')
    .eq('status', 'pending');
  
  for (const req of (pendingReqs || [])) {
    if (slotNames.includes(req.slot_name.toLowerCase())) {
      // Auto bonus-hit: update status, award credits
      await supabase.from('slot_requests').update({ 
        status: 'bonus_hit', hunt_number: huntNumber, credits_awarded: 200 
      }).eq('id', req.id);
      // Award credits to user...
    }
  }
}
```

Duplicate check in `useCreateSlotRequest`:
```typescript
const { data: existing } = await supabase
  .from('slot_requests')
  .select('id')
  .ilike('slot_name', data.slot_name)
  .in('status', ['pending', 'bonus_hit'])
  .limit(1);
if (existing?.length) throw new Error('Denne slot er allerede blevet requested');
```

