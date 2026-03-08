

## Plan: Fix Bonus Hunt VOD Registry

### Problem
The `HUNT_VIDEOS` registry in `BonusHuntVideoSection.tsx` has incorrect Twitch video IDs. The user confirmed:
- Hunt #1: `2714677621` (already correct)
- Hunt #2: should be `2716498380` (currently `2705001000` which is wrong)

Additionally, the chronology is inconsistent -- Hunt #1 is dated March 5 but Hunt #2 is dated February 22, and Hunt #2's new video ID (`2716498380`) is numerically higher (= newer) than Hunt #1's. This suggests Hunt #2 happened **after** Hunt #1, so the date for Hunt #2 needs updating as well.

### Changes

**File: `src/components/bonus-hunt/BonusHuntVideoSection.tsx`**
1. Update Hunt #2's `twitchVideoId` from `"2705001000"` to `"2716498380"`
2. Update Hunt #2's `date` and `isoDate` to reflect the correct (post-March 5) date -- will need user confirmation on the exact date, or derive from the VOD publish date

### Question
I'll ask the user to confirm Hunt #2's date since the current "22. februar" is clearly wrong if this VOD is newer than Hunt #1 (March 5).

