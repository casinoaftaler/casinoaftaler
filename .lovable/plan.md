

## Community Highlights Bonus Spins System

### Overview

A new reward system where users earn one-time bonus spins by uploading approved video clips to Community Highlights. These spins are completely separate from the daily spin economy and must be manually activated by the user.

### Database Changes

**New table: `community_bonus_spins`**
Tracks each user's community upload rewards:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Auto-generated |
| user_id | uuid (unique) | The user |
| total_earned | integer (default 0) | Total bonus spins earned from uploads |
| total_activated | integer (default 0) | Spins already moved to active balance |
| rewarded_clips_count | integer (default 0) | Number of clips that earned rewards (max 5) |
| created_at | timestamptz | |
| updated_at | timestamptz | |

RLS: Users can read/update their own row. Admins can read all.

**New table: `community_bonus_spins_log`**
Audit trail for each reward and activation event:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | |
| user_id | uuid | |
| clip_id | uuid (nullable) | Linked clip (for reward events) |
| event_type | text | 'reward' or 'activation' |
| amount | integer | Spins rewarded or activated |
| created_at | timestamptz | |

RLS: Users can read their own logs. Admins can read all.

### Backend Changes

**Modify clip approval flow (admin approves a clip):**

When an admin approves a clip, the system needs to automatically grant +50 bonus spins to the clip's uploader -- but only if they haven't already been rewarded for 5 clips.

This will be handled via a **database trigger** on `community_clips` that fires on UPDATE when `status` changes to `'approved'`:

1. Check the uploader's `community_bonus_spins.rewarded_clips_count`
2. If count < 5: increment `rewarded_clips_count` by 1, add 50 to `total_earned`, insert a log entry
3. If count >= 5: do nothing (cap reached)

This keeps the reward logic atomic and server-side, preventing any client manipulation.

**Modify spin consumption in `slot-spin` edge function:**

Currently the edge function reads from `slot_spins` (daily). The new flow:

1. If NOT a bonus spin (free spin): check `community_bonus_spins` for the user
2. Consume from community bonus spins first (activated balance = `total_activated` tracks what was already moved to `slot_spins`, so activated spins are already IN `slot_spins.spins_remaining`)
3. No change needed in the edge function itself -- activated spins are simply added to `slot_spins.spins_remaining`, which the existing consumption logic already handles

**Activation logic** works by:
- Deducting from `community_bonus_spins` (total_earned - total_activated = available)
- Adding to today's `slot_spins.spins_remaining`
- This means activated community spins are consumed first naturally (they're added on top of daily spins, and daily reset doesn't include them)

### Frontend Changes

**1. New hook: `src/hooks/useCommunityBonusSpins.ts`**
- Fetches user's `community_bonus_spins` record
- Provides `totalEarned`, `totalActivated`, `remaining` (computed)
- `activateSpins(amount)` mutation: validates amount <= remaining, updates `community_bonus_spins.total_activated`, adds to today's `slot_spins.spins_remaining`, inserts log entry

**2. New profile section: `src/components/profile/ProfileCommunityBonusSection.tsx`**
- Card titled "Bonus Spins (Community)"
- Displays:
  - Total earned: X / 250
  - Already activated: Y
  - Remaining (unactivated): Z
  - Rewarded clips: N / 5
- "Aktiver Spins" button opens activation dialog

**3. New component: `src/components/profile/ActivateBonusSpinsDialog.tsx`**
- Dialog with slider + number input for choosing how many spins to activate
- Min: 1, Max: remaining unactivated spins
- Confirmation button
- On confirm: calls `activateSpins` mutation

**4. Update Profile page (`src/pages/Profile.tsx`)**
- Import and render `ProfileCommunityBonusSection` below the existing `ProfileRewardsProgress` component

**5. Update `SpinsRemaining` component**
- Add tooltip line showing community bonus spins info when the user has activated community spins
- No change to the core display since activated spins are already in `slot_spins.spins_remaining`

**6. Update `useSlotSpins` hook**
- The `maxSpins` display can optionally show community bonus spins separately in the tooltip
- The core spin counting doesn't change since activated community spins are added directly to `slot_spins.spins_remaining`

### Spin Consumption Priority

When a user activates X community bonus spins:
- X is added to today's `slot_spins.spins_remaining`
- Daily reset the next day sets `spins_remaining` to `daily + profile_bonus` (max 220), which does NOT include community spins
- This means community spins activated today are consumed first (they're the "extra" on top of the daily allocation)
- If the user doesn't use them all today, they're lost at daily reset -- this should be communicated clearly in the activation dialog

### Key Constraints Enforced

- Max 5 rewarded clips per user (enforced by DB trigger)
- Max 250 total community bonus spins (5 x 50, enforced by trigger)
- Spins never auto-activate (user must click "Aktiver Spins")
- Daily spins unaffected (200 base + profile bonus, capped at 220)
- Partial activation supported via slider
- One-time rewards: each clip can only trigger one reward (trigger checks clip status change)
- No expiry on unactivated spins (they sit in `community_bonus_spins` indefinitely)

### Technical Summary

```text
Files to create:
  - src/hooks/useCommunityBonusSpins.ts
  - src/components/profile/ProfileCommunityBonusSection.tsx
  - src/components/profile/ActivateBonusSpinsDialog.tsx

Files to modify:
  - src/pages/Profile.tsx (add community bonus section)
  - src/components/slots/SpinsRemaining.tsx (tooltip update)

Database changes:
  - New table: community_bonus_spins
  - New table: community_bonus_spins_log
  - New trigger on community_clips: auto-reward on approval
  - RLS policies for both new tables
```

