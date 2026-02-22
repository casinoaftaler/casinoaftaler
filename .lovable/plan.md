

## Add Display Names to GTW and AVG X Leaderboards

Currently the leaderboards only show guess amounts and credits without identifying who placed the bets. This plan adds user display names (and avatars) to both leaderboards, plus a "Top 10 Closest Guesses" section for completed hunts.

### Changes

**1. `src/hooks/useBonusHuntSession.ts` -- Enrich bets with profile data**

Update `useBonusHuntGtwBets` and `useBonusHuntAvgxBets` to fetch the corresponding `profiles_leaderboard` rows for all bet user_ids, then merge `display_name` and `avatar_url` onto each bet object. This uses the existing `profiles_leaderboard` public view (no RLS needed).

**2. `src/components/bonus-hunt/BonusHuntGTWTab.tsx` -- Show names + Top 10 results**

- In the leaderboard section, display the user's `display_name` (or "Anonym") next to each bet row.
- Add a "Top 10 Resultater" section that only appears when the hunt is completed (when `difference` values exist / session status is completed). This shows the 10 closest guesses with rank medals, display names, guess amounts, and gap.
- Highlight the current user's row.

**3. `src/components/bonus-hunt/BonusHuntAvgXTab.tsx` -- Show names in bet list**

- Add a participants list per group (or a general list) showing display names alongside their group letter and bet amount.
- When the hunt is settled, show winners with their display names and winnings.

### Technical Details

The `profiles_leaderboard` view already exists with columns `user_id`, `display_name`, `avatar_url` and has no RLS restrictions (public view). No database changes are needed.

The enrichment approach in the hooks:
1. Fetch bets as before
2. Collect unique `user_id` values
3. Query `profiles_leaderboard` for those user_ids
4. Map display names onto bet objects before returning

This keeps the components simple -- they just read `bet.display_name` and `bet.avatar_url`.

### File Summary

| File | Change |
|------|--------|
| `src/hooks/useBonusHuntSession.ts` | Enrich GTW and AVG X bets with `display_name` and `avatar_url` from `profiles_leaderboard` |
| `src/components/bonus-hunt/BonusHuntGTWTab.tsx` | Show display names in leaderboard rows; add Top 10 results card when hunt is settled |
| `src/components/bonus-hunt/BonusHuntAvgXTab.tsx` | Show display names in a participants/winners list |

