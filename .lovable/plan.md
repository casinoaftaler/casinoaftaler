

## Simplify Bonus Hunt Admin Panel

The current admin panel requires manually entering a "StreamSystem Hunt ID" and hunt number when creating a session. Instead, the admin panel should **automatically detect the current active bonus hunt** from the StreamSystem API and just let you manage betting (open/close) and set prizes.

### What Changes

**1. Auto-detect current hunt from StreamSystem API**
- When the admin panel loads, it will call the `bonus-hunt-proxy` edge function (no huntId = latest hunt) to get the current active hunt's data (name, hunt number, internal ID).
- Display this as the "Current Active Hunt" at the top of the admin section.

**2. Simplified session creation**
- Remove the "Ny Session" dialog with manual StreamSystem Hunt ID and Hunt Number inputs.
- Replace with a single button like "Opret Session for Hunt #X" that auto-fills the hunt number and StreamSystem ID from the detected active hunt.
- Only keep the configurable fields: bet limits (GTW/AVG X min/max) and GTW prizes.

**3. Make `streamsystem_hunt_id` optional in the database**
- The StreamSystem API ID can be derived from the API response automatically, so we store it but don't ask the admin to type it.

### Technical Details

**`src/components/BonusHuntAdminSection.tsx`:**
- Add a query to fetch current hunt via `bonus-hunt-proxy` (same as the public page does).
- Show a "Current Hunt" info card with hunt number, status, slot count.
- Replace `CreateSessionForm` with a simplified version that auto-fills `hunt_number` and `streamsystem_hunt_id` from the API response. The admin only sets bet limits and prizes.
- If a session already exists for the current hunt number, show that session's controls instead of a "create" button.

**`supabase/functions/bonus-hunt-proxy/index.ts`:**
- No changes needed -- calling without `huntId` already returns the latest/active hunt.

**Database:**
- No schema changes needed. The `streamsystem_hunt_id` and `hunt_number` columns stay, they're just auto-populated from the API instead of manually entered.

### Admin Flow After Changes

1. Open Bonus Hunt admin tab
2. See "Active Hunt: Bonus Hunt #X" with live stats from StreamSystem
3. If no betting session exists for this hunt: click "Opret Betting Session" (only configure bet limits and prizes)
4. Toggle GTW/AVG X betting open/close
5. When hunt ends: enter end balance / average X and settle

