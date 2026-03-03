

## Problem Analysis

There are two core issues:

**1. Credit display broken** — The header dropdown queries `slot_spins` without a `game_id` filter (uses `.maybeSingle()`), which returns a random row. Your DB currently has two rows for today: `book-of-fedesvin` (744 credits) and `shared` (376 credits, leftover from the previous shared-pool implementation). Each slot machine queries by its own `game_id`, but Fedesvin Bonanza uses `"fedesvin-bonanza"` which has no row — so the fallback `maxSpins` (capped at 220) is shown instead of 744.

**2. Economy values are outdated** — Daily spins, reward amounts, and the absolute cap are still at the old values across multiple files.

---

## Plan

### A. Unify credits to a single shared balance

All 3 machines and the header should read/write from ONE row per user per day. The `game_id` column will use `"shared"` as the canonical key.

**Database changes (migration):**
- Update `deduct_spin` RPC to always use `game_id = 'shared'` (ignore `p_game_id`).
- Update `claim_profile_section_reward` RPC to award 50 credits instead of 5, using `game_id = 'shared'`.
- Update `activate_community_spins_safe` to use `game_id = 'shared'`.
- Update `reward_community_bonus_spins` trigger to award 500 credits instead of 50.
- Clean up: merge kevinsylence's existing rows into a single `shared` row for today (take the max of 744).

**Frontend changes:**
1. `useSlotSpins.ts` — Change query to always use `game_id = "shared"`, remove per-game `gameId` from query key. Raise `ABSOLUTE_MAX_CREDITS` to 10000 and remove the 220/320 caps (use a higher cap like 10200).
2. `useServerSpin.ts` — Update `setQueryData` cache key to use `"shared"` instead of per-game `gameId`.
3. `Header.tsx` — Update credits query to filter by `game_id = 'shared'`.
4. `SpinsRemaining.tsx` / `UserStatsBar.tsx` — No changes needed (they call `useSlotSpins` which will be fixed).

**Edge function changes:**
1. `slot-spin/index.ts` — All `deduct_spin` RPC calls pass `p_game_id: "shared"`. Raise `ABSOLUTE_MAX_CREDITS` to 10000 and `MAX_SPINS_CAP` / `SUBSCRIBER_MAX_SPINS_CAP` accordingly.
2. `daily-credit-allocation/index.ts` — Change `BASE_DAILY_SPINS` to 2000, `ABSOLUTE_MAX_CREDITS` to 10000, use `game_id = 'shared'`, and raise `MAX_SPINS_CAP` to 2020 / `SUBSCRIBER_MAX_SPINS_CAP` to 2320.
3. `claim-profile-reward/index.ts` — Change `spinsEarned` from 5 to 50.

### B. Update economy values

| Setting | Old | New | Location(s) |
|---|---|---|---|
| Daily credits | 200 | 2000 | `site_settings.slot_daily_spins`, `daily-credit-allocation` |
| Profile reward per section | 5 | 50 | `claim_profile_section_reward` RPC, `claim-profile-reward` edge fn, `useProfileRewards.ts` |
| Community clip reward | 50 | 500 | `reward_community_bonus_spins` trigger |
| Slot request reward | 20 | 200 | `useSlotRequests.ts` |
| Absolute max credits cap | 1000 | 10000 | `slot-spin`, `useSlotSpins.ts`, `daily-credit-allocation` |
| Max spins cap (non-sub) | 220 | 2200 | `slot-spin`, `useSlotSpins.ts`, `daily-credit-allocation` |
| Max spins cap (sub) | 320 | 2300 | `slot-spin`, `useSlotSpins.ts`, `daily-credit-allocation` |

### C. Files to modify

1. **Migration SQL** — Update `deduct_spin`, `claim_profile_section_reward`, `activate_community_spins_safe`, `reward_community_bonus_spins`, and set `slot_daily_spins = '2000'`
2. **`src/hooks/useSlotSpins.ts`** — Shared game_id, new caps
3. **`src/hooks/useServerSpin.ts`** — Cache key fix
4. **`src/hooks/useProfileRewards.ts`** — `SPINS_PER_SECTION = 50`
5. **`src/hooks/useSlotRequests.ts`** — Award 200 instead of 20
6. **`src/components/Header.tsx`** — Add `.eq("game_id", "shared")` to credits query
7. **`supabase/functions/slot-spin/index.ts`** — `p_game_id: "shared"`, new constants
8. **`supabase/functions/daily-credit-allocation/index.ts`** — New constants, `game_id = 'shared'`
9. **`supabase/functions/claim-profile-reward/index.ts`** — `spinsEarned: 50`

