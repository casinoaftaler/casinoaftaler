

## Plan: Auto-create betting sessions & auto-close bets after 3 bonuses opened

### What changes

**Goal**: Remove manual session creation and betting toggle. Sessions auto-create when a new hunt is detected by the proxy. Bets auto-open immediately. Bets auto-close once 3+ bonuses have been opened. Admin only edits prizes/settings.

### Architecture

The `bonus-hunt-proxy` edge function already runs on every page load (polled every 30s). It already detects new hunts (`isNewHunt` flag on line 289). This is the ideal place to auto-create the betting session.

For auto-closing bets: the proxy already has `openedSlots` from the API data. When `openedSlots >= 3`, update the session to close betting.

### Changes

#### 1. Edge Function: `bonus-hunt-proxy/index.ts`
After the archive upsert (around line 304), add logic to:
- **Auto-create session**: If `isNewHunt` and no `bonus_hunt_sessions` row exists for this `hunt_number`, insert one with default bet limits, betting open, and `status: 'active'`
- **Auto-close bets**: On every poll, if a session exists for this hunt and `openedSlots >= 3` and betting is still open, update `gtw_betting_open = false` and `avgx_betting_open = false`

Default session values: `gtw_min_bet: 1, gtw_max_bet: 50, avgx_min_bet: 1, avgx_max_bet: 50`, default prizes (top 5), `gtw_betting_open: true, avgx_betting_open: true`.

The `created_by` field is NOT NULL — we'll need a migration to make it nullable (since auto-created sessions have no admin user).

#### 2. Database migration
- Make `bonus_hunt_sessions.created_by` nullable (currently `NOT NULL`)

#### 3. Admin UI: `BonusHuntAdminSection.tsx`
- Remove the `CreateSessionForm` component entirely
- Remove the "Opret Betting Session" button
- Remove the manual GTW/AVG X betting toggle switches
- Keep: prize editing, casino/host editing, bet limit editing, settle functionality
- Add a note showing betting auto-closes after 3 bonuses are opened
- Show current opened bonus count from hunt data

#### 4. Edge Function: `bonus-hunt-auto-settle/index.ts`
- No changes needed — it already handles settlement automatically when the hunt is completed

### Files to modify
1. **`supabase/functions/bonus-hunt-proxy/index.ts`** — add auto-create session + auto-close logic
2. **Database migration** — `ALTER TABLE bonus_hunt_sessions ALTER COLUMN created_by DROP NOT NULL`
3. **`src/components/BonusHuntAdminSection.tsx`** — remove manual creation/toggle, simplify to prizes-only admin

