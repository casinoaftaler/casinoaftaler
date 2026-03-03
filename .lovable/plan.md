

## Security Investigation: Slot Spin Server-Side Bet Validation

### Findings

**1. CRITICAL: No per-game max bet enforcement on server (line 1516)**
The server validates `bet >= 1 && bet <= 100` as a hard-coded global range. There is NO check against `bonanza_max_bet`, `slot_max_bet`, or any per-game max bet from `site_settings`. A user can open DevTools, modify the request body, and send `bet: 100` to Fedesvin Bonanza even though the UI caps at 5.

**2. LOW: `debugScatters` is admin-gated (SAFE)**
The `debugScatters` parameter is checked server-side via `has_role()` RPC — only admins can force scatters. No issue here.

**3. LOW: Bonus spin bet is locked server-side (SAFE)**
During bonus spins, the server overrides the client-sent bet with `lockedBet` from `slot_bonus_state.bet_amount`. Users cannot inflate their bet during free spins.

**4. LOW: Session locking is enforced (SAFE)**
Multi-device is blocked via `slot_active_sessions` check before any spin logic runs.

**5. LOW: Spin deduction is atomic (SAFE)**
The `deduct_spin` RPC uses `FOR UPDATE` locking, preventing race conditions on spin balance.

**6. MEDIUM: No rate limiting on spin requests**
A user could theoretically spam rapid spin requests. The session lock and atomic deduction prevent double-spending, but rapid requests could cause load. Not a cheating vector, but worth noting.

**7. LOW: Bonus state manipulation (SAFE)**
Bonus state lives in `slot_bonus_state` table. RLS policies should prevent users from inserting/updating their own bonus state directly. The server uses service role for all bonus state mutations.

### Plan: Server-Side Per-Game Max Bet Enforcement

**Changes to `supabase/functions/slot-spin/index.ts`:**

1. **Load `bonanza_max_bet` in `loadBonanzaSettings()`** — add it to the settings keys list and store in a module-level variable (default 5).

2. **Load `slot_max_bet` from cached settings** — already cached via `site_settings`, add a lookup for non-Bonanza games.

3. **Enforce per-game max bet after the global validation (line ~1516)**:
   - For `fedesvin-bonanza`: reject if `bet > BONANZA_MAX_BET`
   - For `gates-of-fedesvin`: reject if `bet > GATES_MAX_BET` (load from settings too, or use same global)
   - For `book-of-fedesvin` / `rise-of-fedesvin`: reject if `bet > slot_max_bet` from settings

4. **Tighten global hardcoded cap** from `100` to a sane maximum (e.g., `50`) as a safety net.

**Changes to `src/components/slots/BonanzaGameSettingsAdmin.tsx`:**
Already done in the previous edit — `bonanza_max_bet` is already configurable.

### Technical Details

The fix adds ~20 lines to the edge function. The per-game max bet values are loaded from `site_settings` alongside existing cached settings, so there's zero additional DB calls for warm instances.

For Gates of Fedesvin, we'll also add a `gates_max_bet` setting (loaded in `loadGatesSettings()`) with a default of 10.

For Book/Rise, we'll load `slot_max_bet` with a default of 10.

The server will reject any bet exceeding the per-game max with a 400 error, regardless of what the client sends.

