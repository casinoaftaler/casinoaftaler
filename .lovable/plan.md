

## Fix: Expansion Darkening & Leaderboard Self-Visibility

### Issue 1: Expanded Symbols Stay Dark During Tease

**Root Cause:** In `SlotReel.tsx` line 251, the darkening logic is:
```
const shouldDarkenSymbol = (isDarkenedForTease && !symbol.is_scatter) || isDarkenedForExpansion;
```

While `isDarkenedForExpansion` correctly excludes expanded reels, it does NOT exclude the individual expanded symbols within those reels. Additionally, `isDarkenedForTease` is driven by `scatterReelsLanded.size >= 2 && isSpinning` -- since `isSpinning` remains `true` throughout the entire expansion animation sequence (it's only set to `false` at line 909, after all animations), and React state batching may not flush `setScatterReelsLanded(new Set())` synchronously between async awaits, the tease darkening can persist into the expansion phase.

**Fix (SlotReel.tsx, line 251):** Expanded symbols should never be darkened. Add an exception for symbols that are currently expanded:

```
const shouldDarkenSymbol = 
  !symbolIsExpanded && (
    (isDarkenedForTease && !symbol.is_scatter) || isDarkenedForExpansion
  );
```

This ensures any symbol that is actively expanded (matching the `expandingSymbolId`) is always bright, regardless of tease or expansion darkening state.

---

### Issue 2: Leaderboard Users Can't See Themselves Outside Top 100

**Root Cause:** In `useSlotLeaderboard.ts`, the database query at line 57 uses `.limit(100)`. If the current user is ranked 101st or lower, they are never fetched from the database. The `currentUser` search at line 101 only looks within the already-fetched 100 entries, so users outside the top 100 will never see their own position.

**Fix (useSlotLeaderboard.ts):** After fetching the top 100, make a separate query to fetch the current user's data if they weren't in the top 100. Then calculate their rank by comparing their score against the sorted list.

Steps:
1. Fetch top 100 as before
2. Check if `currentUserId` is in the fetched results
3. If not, make a second query: `supabase.from("slot_leaderboard").select(...).eq("user_id", currentUserId).maybeSingle()`
4. If found, fetch their profile too
5. To determine rank, we can count how many users have a higher score: query with `.gt(sortKey, userScore)` and use the count, or simply append them and note they are "100+"
6. Return the user entry with their approximate rank

### Technical Details

**File 1: `src/components/slots/SlotReel.tsx`** (line 251)
- Change the `shouldDarkenSymbol` calculation to exclude expanded symbols

**File 2: `src/hooks/useSlotLeaderboard.ts`** (lines 98-108)
- After building `allEntries` (top 100), check if `currentUserId` exists in the list
- If not found, fetch the user's row separately and their profile
- Calculate rank: since we only have 100 entries, we know the user is ranked > 100. We can use a count query or simply set rank to 100+ the count of users in the top 100 with higher scores
- Return the user's entry with their rank so the UI can display them pinned at the bottom

The `SlotLeaderboard.tsx` component already has logic to show the current user pinned below a separator if they're not in the visible list (lines 212-223), so no UI changes are needed.
