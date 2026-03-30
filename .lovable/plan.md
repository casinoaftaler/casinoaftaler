

## Plan: Variable bet increment (step 2 above 10, max 20)

### What changes
All slot machines currently increment/decrement bet by 1, with a max of 10. The new behavior:
- **1–10**: increment/decrement by 1 (as today)
- **10–20**: increment/decrement by 2 (so: 10, 12, 14, 16, 18, 20)
- **Default max**: 20 instead of 10

### Implementation

**1. Create a shared bet step utility** (`src/lib/betSteps.ts`)
- `getNextBet(current, max)` → returns next valid bet (current < 10 ? +1 : +2), clamped to max
- `getPrevBet(current, min)` → returns previous valid bet (current <= 10 ? -1 : -2), clamped to min

**2. Update `BonanzaControlBar.tsx`** (used by Book of Fedesvin and Fedesvin Bonanza)
- Replace all 4 instances of `bet - 1` / `bet + 1` with `getPrevBet(bet, minBet)` / `getNextBet(bet, maxBet)`

**3. Update `GatesControlBar.tsx`** (used by Gates of Fedesvin)
- Replace 2 instances of `bet - 1` / `bet + 1` with the same utility calls

**4. Update default maxBet in `useSlotSettings.ts`**
- Change default from `10` to `20` in both the query result fallback and the return fallback

**5. Update admin default in `SlotMachineAdminSection.tsx`**
- Change the default `maxBet` from `10` to `20`

No database migration needed — the `slot_max_bet` setting in `site_settings` just needs to be updated to 20 by an admin, or the new default kicks in.

