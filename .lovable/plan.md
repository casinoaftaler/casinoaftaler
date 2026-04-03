

## Plan: Community Raffle System

### What we're building
An automated raffle system at `/community/raffle` where a new raffle starts every 30 minutes. Users join for free, and when the raffle ends a random winner receives credits (default 500, configurable by admin).

### Database

**New table: `raffles`**
| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| prize_credits | integer | 500 |
| starts_at | timestamptz | now() |
| ends_at | timestamptz | now() + 30 min |
| winner_id | uuid (nullable) | null |
| status | text | 'active' |
| created_at | timestamptz | now() |

**New table: `raffle_entries`**
| Column | Type |
|--------|------|
| id | uuid |
| raffle_id | uuid (FK → raffles) |
| user_id | uuid |
| created_at | timestamptz |
| unique(raffle_id, user_id) |

**RLS policies:**
- Anyone can SELECT raffles and raffle_entries
- Authenticated users can INSERT own raffle_entries
- Admins can manage raffles (ALL)

**New DB function: `settle_raffle()`** — picks a random winner from entries, updates the raffle status to 'completed', awards credits to winner via `slot_spins` upsert + `credit_allocation_log` insert.

**New DB function: `ensure_active_raffle()`** — checks if there's an active raffle with `ends_at > now()`. If not, settles any expired active raffles and creates a new one. Called by the edge function and on page load.

### Edge Function: `raffle-cron`
- Scheduled via pg_cron every 5 minutes
- Calls `ensure_active_raffle()` to settle expired raffles and create new ones
- This ensures raffles rotate even if nobody visits the page

### Frontend

**New page: `src/pages/Raffle.tsx`**
- Route: `/community/raffle`
- Uses `CommunityPageLayout` with hero, `CommunityNav`, sidebar widgets
- Shows current active raffle with countdown timer
- "Deltag" (Join) button for authenticated users
- List of current participants (avatars + names)
- Previous raffle winners section
- SEO: Article schema, FAQ section

**New hook: `src/hooks/useRaffle.ts`**
- `useActiveRaffle()` — fetches active raffle + participant count, polls every 10s
- `useRaffleEntries(raffleId)` — fetches entries with profile data
- `useJoinRaffle()` — mutation to insert entry
- `useRecentRaffleWinners()` — last 10 completed raffles with winner profiles

**Navigation updates:**
- Add "Raffle" tab to `CommunityNav.tsx`
- Add raffle card to `CommunityHub.tsx` SECTIONS array
- Add route in `App.tsx`

### Files changed
1. **1 migration** — `raffles` table, `raffle_entries` table, RLS policies, `settle_raffle()` + `ensure_active_raffle()` functions, realtime enabled
2. **`supabase/functions/raffle-cron/index.ts`** — scheduled edge function
3. **`src/hooks/useRaffle.ts`** — new hooks
4. **`src/pages/Raffle.tsx`** — new page
5. **`src/App.tsx`** — add route
6. **`src/components/community/CommunityNav.tsx`** — add Raffle tab
7. **`src/pages/CommunityHub.tsx`** — add Raffle card to SECTIONS
8. **pg_cron schedule** — via insert tool (not migration)

