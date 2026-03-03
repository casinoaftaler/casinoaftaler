

## Problem

Twitch badges (VIP, Moderator, etc.) are not shown on two sidebar leaderboards:

1. **SidebarLeaderboard** (monthly tournament sidebar) — fetches `profiles_leaderboard` but only selects `user_id, display_name, avatar_url` (missing `twitch_badges`)
2. **SidebarShopLeaderboard** (shop points sidebar) — fetches `profiles_public` and doesn't select or display `twitch_badges` at all

The main `SlotLeaderboard` and tournament `Leaderboard.tsx` pages already show badges correctly.

## Plan

### 1. SidebarLeaderboard — Add twitch badges

- Add `twitch_badges` to the `LeaderboardEntry` interface
- Add `twitch_badges` to the `profiles_leaderboard` select query (line 63)
- Map `twitch_badges` into entries
- Import `TwitchBadgesInline` and render it inline next to each display name

### 2. SidebarShopLeaderboard — Add twitch badges

- Add `twitch_badges` to the `ShopLeaderboardEntry` interface
- Change the `profiles_public` select to include `twitch_badges`
- Map `twitch_badges` into entries
- Import `TwitchBadgesInline` and render it inline next to each display name

Both changes follow the exact same pattern already used in `SlotLeaderboard` and `Leaderboard.tsx`.

