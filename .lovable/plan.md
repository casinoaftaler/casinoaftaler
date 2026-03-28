

## Bug: "Requested By" not showing — Name Mismatch

### Root Cause

The `useBonusHuntSlotRequesters` hook stores a map keyed by `slot_requests.slot_name.toLowerCase()`. The table looks up with `slot.slot.toLowerCase()` — the name from the StreamSystem API.

These names often differ:
- DB: `"Gates Of Olympus"` → key: `"gates of olympus"`
- API: `"Gates of olympus super scatter"` → lookup: `"gates of olympus super scatter"`

No match → no requester shown. This affects ALL slots, not just 100x+.

### Fix

**File: `src/components/bonus-hunt/BonusHuntSlotTable.tsx`** (line ~229)

Change the lookup from exact match to a **contains-based fallback**:

```typescript
// Current (exact match only):
const requester = requesterMap?.get(slot.slot.toLowerCase());

// Fixed (exact match first, then contains fallback):
const slotLower = slot.slot.toLowerCase();
let requester = requesterMap?.get(slotLower);
if (!requester && requesterMap) {
  for (const [key, val] of requesterMap) {
    if (slotLower.includes(key) || key.includes(slotLower)) {
      requester = val;
      break;
    }
  }
}
```

This handles cases like:
- `"gates of olympus"` matches `"gates of olympus super scatter"` (key included in slot name)
- `"toshi video club"` matches `"toshi ways club"` won't match (correctly), but `"toshi video club"` matches itself

### Why this is safe
- The contains check only fires when exact match fails
- Map iteration is tiny (typically <20 requesters per hunt)
- No extra API calls or dependencies

