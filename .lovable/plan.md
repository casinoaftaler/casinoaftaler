

## Fix: Bonus Hunt list ordering (oldest to newest)

The "Seneste Bonus Hunts" lists on the homepage and in community widgets currently display hunts newest-first (#181 first). The fix is to reverse the display order so hunts appear oldest to newest while still fetching the 3 most recent.

### Changes

**1. `src/components/HomepageLiveCommunity.tsx`**
- After mapping the hunts array (line 32-39), reverse it so the oldest of the 3 appears first: `.reverse()`

**2. `src/components/CommunityActivityWidget.tsx`**
- Same fix: reverse the mapped hunts array so oldest hunt appears first in the list.

Both components will still fetch the 3 newest hunts (descending), but `.reverse()` the result so they render from oldest (#179) to newest (#181).

