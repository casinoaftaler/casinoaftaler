

## Fix: "Requested By" not showing for non-bonus_hit requests

### Root Cause

The `useBonusHuntSlotRequesters` hook filters by `status = 'bonus_hit'` only. But many requested slots have status `'settled'`, `'no_bonus'`, or `'pending'` — these are completely excluded from the requester map.

**Example from hunt #182:**
| Slot | Requester | Status | Shown? |
|---|---|---|---|
| Xpander | m_lazyturtle | bonus_hit | Yes |
| Rotten | m_lazyturtle | settled | **No** |
| Shaolin Master | m_lazyturtle | settled | **No** |
| Ronin Stackways | m_lazyturtle | settled | **No** |
| Mayan Stackways | m_lazyturtle | settled | **No** |

### Fix

**File: `src/hooks/useSlotRequests.ts`** (line 168)

Change the query from:
```typescript
.eq("status", "bonus_hit")
```
To include all relevant statuses:
```typescript
.in("status", ["bonus_hit", "settled", "no_bonus", "pending"])
```

This shows the requester for **every** requested slot, regardless of whether it hit bonus or not. The "Requested By" column is about who picked the slot — not whether it won.

### One file change, no other modifications needed
The fuzzy name matching (already in `BonusHuntSlotTable.tsx`) will continue to handle name mismatches.

