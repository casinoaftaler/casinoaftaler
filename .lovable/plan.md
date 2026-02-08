

## Spin Cap: 220 Max with Profile Bonus, No Cap for Admin Grants

### What Changes

The spin system will enforce these rules:

- **New user (no profile completed):** 200 daily spins
- **User with all 4 profile sections completed:** 200 + 20 = 220 daily spins
- **Hard cap for daily reset:** 220 (daily setting + bonus spins)
- **Admin grants:** No cap -- admins can push spins above 220

This means when a new day starts, a user gets `min(dailySpins + bonusSpins, 220)` spins. But if an admin manually adds spins, those go on top without any limit.

### Files to Change

#### 1. `src/hooks/useSlotSpins.ts` -- Cap daily initialization at 220
- When creating a new day's spin record, cap at `Math.min(settings.dailySpins + bonusSpinsPermanent, 220)`
- Update `maxSpins` to reflect the capped value
- This only affects the daily reset, not admin-granted spins

#### 2. `supabase/functions/slot-spin/index.ts` -- Server-side cap at 220
- When the server creates a new daily spin record, cap `spins_remaining` at `Math.min(dailySpins + bonusSpinsPermanent, 220)`
- This is the critical enforcement point since the server is the source of truth

#### 3. `src/components/SpinManagementSection.tsx` -- No changes needed
- Admin spin management will remain uncapped, so admins can freely grant any amount of spins above 220

#### 4. `src/components/slots/SpinsRemaining.tsx` -- Display adjusts automatically
- Already uses `maxSpins` from the hook, so the display will correctly show `/200` or `/220` depending on the user's profile completion

### Technical Details

The constant `MAX_SPINS_CAP = 220` will be used in the client hook and the edge function:

```text
Daily reset logic:
  totalDailySpins = dailySpins (200) + bonusSpinsPermanent (0-20)
  cappedSpins = min(totalDailySpins, 220)

Admin grants:
  newSpins = max(0, currentSpins + amount)   // no upper cap
```

Summary of cap behavior:

```text
Scenario                              | Spins Given
--------------------------------------|------------
New user, no profile sections done    | 200
User with 2 sections done (+10 bonus) | 210
User with all 4 sections done (+20)   | 220
Admin grants +50 to a user at 220     | 270 (no cap)
Next day reset for user at 270        | 220 (capped)
```

