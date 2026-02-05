
## Protect Admin Analytics Data from Resets

### Current State
The reset function correctly only deletes from:
- `slot_game_results` (user leaderboard/winnings)
- `slot_spins` (user spin counters)

It preserves:
- `page_views` (page tracking analytics)
- `click_events` (affiliate click tracking)
- All other admin analytics data

### Proposed Changes

**1. Add Clear Documentation to Edge Function**
- Add prominent comments at the top of `reset-slot-stats/index.ts` explaining what IS and ISN'T reset
- Document the principle: "Only reset user-facing gameplay data, never touch admin analytics"

**2. Add Safeguard Comment in Admin UI**
- Add a note in `SlotStatsResetSection.tsx` explaining that "Admin analytics are preserved"
- This reassures admins that their dashboard data won't be affected

**3. Future-Proof with Code Structure**
- Keep analytics tables completely separate in the reset logic
- Make it visually clear which tables are included vs excluded

### Benefits
- Prevents accidental modification of analytics tables in future updates
- Educates anyone maintaining this code about the boundary between user data and admin data
- Clear intent for future developers

### Files to Update
- `supabase/functions/reset-slot-stats/index.ts` - Add documentation
- `src/components/slots/SlotStatsResetSection.tsx` - Add note about preserved analytics
