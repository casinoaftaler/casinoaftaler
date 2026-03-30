

## Plan: Prevent duplicate slot requests per user

### Problem
Users can request the same slot twice — the current check only does an exact `ilike` match across all users for pending requests. It misses:
1. The same user requesting the same slot with slightly different spelling
2. The same user having a pending request for a slot already requested by them (with any status in the current hunt)

### Solution

**File: `src/hooks/useSlotRequests.ts`** — Update the duplicate check in `useCreateSlotRequest`:

1. **Same-user pending check**: Before the global duplicate check, add a query checking if the current user already has a pending request (any slot). Since `maxPending` is typically 1, this enforces "only 1 slot can be requested at a time" — but this is already handled by the `hasReachedLimit` check in the form. Add a server-side guard too.

2. **Fuzzy duplicate check**: Replace the exact `ilike` match with fuzzy/contains logic (same as used elsewhere — min 4 chars overlap) to catch near-duplicates like "Le Viking" vs "Le Viking Bebe". Check across ALL users for pending status.

3. **Same-user any-status check for current hunt**: Check if the same user already requested this slot (fuzzy match) in the current hunt with any non-rejected status, preventing re-requests of previously hit/settled slots.

### Changes
- Fetch all pending requests and apply fuzzy matching client-side instead of relying on exact `ilike`
- Add a check: if user already has a pending request for a fuzzy-matching slot name, block with error
- Add a check: if any user has a pending request for a fuzzy-matching slot name, block with error

