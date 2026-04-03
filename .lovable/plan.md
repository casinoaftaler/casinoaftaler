

## Problem

When a user requests a custom slot (not yet in the database), the `slot_name` they type in `slot_requests` may not exactly match the slot name that appears in the bonus hunt API data. The current matching logic:

1. **`useBonusHuntSlotRequesters`** builds a map keyed by `slot_name.toLowerCase()` from `slot_requests`
2. **`BonusHuntSlotTable`** tries exact match first, then falls back to simple substring (`includes`) matching

This fails for cases like:
- User requests "Chaos Crew 2" but API shows "Chaos Crew II"
- User requests "big bass" but API shows "Big Bass Bonanza"
- Typos or slight naming variations in custom slots

## Solution

Improve the fuzzy matching in `useBonusHuntSlotRequesters` and the table's requester lookup to use normalized similarity scoring instead of simple substring matching.

### Changes

**File: `src/hooks/useSlotRequests.ts`** — `useBonusHuntSlotRequesters`

Add a helper function that normalizes slot names (strips punctuation, common suffixes, roman numerals → digits) and computes a similarity score. Export this for reuse in the table component.

```text
normalize("Chaos Crew II")  → "chaos crew 2"
normalize("Big Bass Bonanza") → "big bass bonanza"
normalize("sweet bonanza 1000x") → "sweet bonanza 1000x"
```

**File: `src/components/bonus-hunt/BonusHuntSlotTable.tsx`** — Requester cell

Replace the naive `includes` fallback with a proper best-match finder:
1. Normalize both the hunt slot name and all request slot names
2. Check exact normalized match first
3. Fall back to: longest common substring ratio ≥ 0.6, or one name fully contained in the other
4. Pick the best match above threshold

### Technical details

- Add a `normalizeForMatch(name: string): string` utility that lowercases, strips `'`, converts roman numerals (II→2, III→3, IV→4), removes trailing "x" multipliers, and trims whitespace/punctuation
- Add a `slotNameSimilarity(a: string, b: string): number` function (0-1) using normalized word overlap (Jaccard on word tokens + substring containment bonus)
- Threshold: ≥ 0.5 similarity to count as a match, pick highest scorer
- Both functions go in a shared util or inline in `useSlotRequests.ts`

### Files to edit
- `src/hooks/useSlotRequests.ts` — add normalize + similarity helpers, improve map building
- `src/components/bonus-hunt/BonusHuntSlotTable.tsx` — use improved matching in requester cell

