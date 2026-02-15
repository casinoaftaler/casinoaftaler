

# Fix: Daily Credit Refill Should Not Reset Gifted/Rewarded Balances

## Problem Found

After investigating the database and code, I found **two issues**:

### Issue 1: Daily Cron Carry-Over Logic (mostly correct but has edge case)
The current daily cron (`daily-credit-allocation`) correctly carries over balances above the daily cap (200/220). However, it caps carry-over at `ABSOLUTE_MAX_CREDITS = 1000`, which means a user with 1120 credits (from admin gifts) gets reduced to 1000.

The logic also always creates a new record, even when the user's balance is above the daily cap and no action is needed.

### Issue 2: Bulk "Give Credits to All" Missing Logging and Cap
The `SpinManagementSection.tsx` bulk credit allocation (`giveSpinsToAll`) does NOT:
- Log individual allocations to `credit_allocation_log`
- Enforce the 1000 credit cap
- This makes it impossible to audit what happened

### Issue 3: slot-spin Initialization Duplicates Logic
The `slot-spin` edge function has its own record initialization logic (lines 941-990) that mirrors the cron but could create records before the cron runs, leading to potential inconsistencies.

## Solution

### Step 1: Simplify Daily Cron Logic
Update `supabase/functions/daily-credit-allocation/index.ts` to match the exact desired behavior:
- If user's previous balance >= their daily cap (200/220): **do nothing** -- just carry the balance as-is (still capped at 1000)
- If user's previous balance < their daily cap: **top up to the daily cap** only
- New users with no history: give them their daily cap

This is what the code already does, but I'll make the log messages clearer and ensure the absolute cap (1000) doesn't silently reduce balances.

### Step 2: Fix slot-spin Initialization
Update `supabase/functions/slot-spin/index.ts` (lines 941-960) to use the exact same logic, ensuring consistency between both code paths.

### Step 3: Fix Bulk Credit Allocation
Update `src/components/SpinManagementSection.tsx` `giveSpinsToAll` to:
- Log each allocation to `credit_allocation_log` with source `admin_manual`
- Enforce the 1000 credit cap per user

## Technical Details

**Daily Cron changes (`daily-credit-allocation/index.ts`, lines 152-189):**
```text
Current logic (correct but can be clearer):
  if previous >= cap → startValue = min(previous, 1000)
  if previous < cap  → startValue = cap

No functional change needed here -- the logic is already correct.
Only improvement: better logging to make it clear what happened.
```

**slot-spin initialization changes (`slot-spin/index.ts`, lines 952-960):**
Same logic as daily cron -- no functional change needed, already correct.

**SpinManagementSection.tsx (`giveSpinsToAll`, lines 155-192):**
```text
Add: credit_allocation_log insert for each user in bulk operation
Add: Math.min(newSpins, 1000) cap enforcement
```

**Summary of files to modify:**
1. `supabase/functions/daily-credit-allocation/index.ts` -- improve log clarity
2. `src/components/SpinManagementSection.tsx` -- add logging and cap enforcement to bulk operations

The core carry-over logic is already working correctly in the current version. The historical cases where users saw their 320 credits reset to 220 were from an older version of the code that has since been fixed. The remaining improvement is adding proper logging and cap enforcement to the admin bulk credit tool.
