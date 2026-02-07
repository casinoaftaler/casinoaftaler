

## Show Your Own Position on the Leaderboard

### What changes
The leaderboard will always show your own position at the bottom of the card, even if you're not in the top 3 (or top 10 in the full list). This way you always know where you stand.

### How it will look
- On the **main card** (top 3): A separator line followed by your own row showing your rank (e.g. "#7") and stats, styled with a distinct highlight so it's easy to spot.
- In the **full list dialog**: If you're not in the visible top 10, your row appears pinned at the bottom with a separator, showing your actual rank.
- If you **are** already in the top 3/10, no duplicate row is shown — your row in the list is simply highlighted.

---

### Technical Details

**1. Update `useSlotLeaderboard` hook** (`src/hooks/useSlotLeaderboard.ts`)

- Get the current user's ID via `supabase.auth.getUser()`.
- After sorting all entries, find the current user's rank in the full sorted list **before** slicing to top 10.
- Return both the top 10 entries and a separate `currentUser` object containing the user's `LeaderboardEntry` + their `rank` (1-indexed position in the full list).
- If the user has no entries yet, return `currentUser` as `null`.

**2. Update `SlotLeaderboard` component** (`src/components/slots/SlotLeaderboard.tsx`)

- Accept the new `currentUser` data from the hook.
- On the **main card**: After the top 3 rows, if the current user exists and is ranked 4th or lower, render a divider and a `LeaderboardRow` for the current user with a special highlight style (e.g. a subtle border or background glow).
- In the **full dialog**: Same logic — if the user is ranked 11th or lower, pin their row at the bottom with a divider.
- If the user is already visible in the list, highlight their row with a distinctive style (e.g. a ring or different background color) so they can easily find themselves.
- Pass a `isCurrentUser` prop to `LeaderboardRow` for conditional styling.

**3. Update `LeaderboardRow` component**

- Add an optional `isCurrentUser` prop.
- When true, apply a distinct visual style: a border ring (`ring-1 ring-amber-500/50`) and a subtle background highlight to make the row stand out as "you".
- Optionally show a small "Du" (You) badge next to the name.

