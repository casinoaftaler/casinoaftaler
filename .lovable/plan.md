
# Plan: Monthly Stats Reset & Admin Reset Button

## Summary

Add two features:
1. **Automatic monthly reset**: A scheduled cron job that resets all slot stats on the 1st of each month
2. **Manual reset button**: An admin UI section to reset leaderboards/stats on demand

---

## Implementation Details

### 1. Create Edge Function for Stats Reset

**File: `supabase/functions/reset-slot-stats/index.ts`**

A new edge function that:
- Deletes all rows from `slot_game_results` (leaderboard/stats)
- Deletes all rows from `slot_spins` (spin counters)
- Can be called manually by admins or via cron job
- Returns count of deleted records

```typescript
// Pseudocode
serve(async (req) => {
  // CORS handling
  
  // Optional: Verify admin role or secret key for manual calls
  
  // Delete all game results
  await supabase.from('slot_game_results').delete().gt('id', '00000000-...')
  
  // Delete all spin records  
  await supabase.from('slot_spins').delete().gt('id', '00000000-...')
  
  return { success: true, message: 'Stats reset complete' }
})
```

### 2. Set Up Monthly Cron Job

Enable `pg_cron` and `pg_net` extensions, then schedule the reset:

```sql
-- Schedule for 1st of each month at midnight
SELECT cron.schedule(
  'monthly-slot-stats-reset',
  '0 0 1 * *',  -- At 00:00 on day 1 of every month
  $$
  SELECT net.http_post(
    url := 'https://zhpbqqhtgnblaugrqhqi.supabase.co/functions/v1/reset-slot-stats',
    headers := '{"Authorization": "Bearer <anon_key>", "Content-Type": "application/json"}'::jsonb,
    body := '{"source": "cron"}'::jsonb
  ) AS request_id;
  $$
);
```

### 3. Add Admin Reset UI Section

**File: `src/components/SlotMachineAdminSection.tsx`**

Add a new component within the Settings or Statistics tab:

```
┌─────────────────────────────────────────────────────────────┐
│ 🔄 Nulstil Statistik                                        │
├─────────────────────────────────────────────────────────────┤
│ Automatisk nulstilling: Den 1. i hver måned                 │
│                                                             │
│ [Nulstil Leaderboard]  [Nulstil Alle Spins]  [Nulstil Alt]  │
│                                                             │
│ ⚠️ Advarsel: Denne handling kan ikke fortrydes!             │
└─────────────────────────────────────────────────────────────┘
```

Features:
- Three separate buttons for granular control:
  - "Nulstil Leaderboard" - Clears `slot_game_results` only
  - "Nulstil Alle Spins" - Clears `slot_spins` only
  - "Nulstil Alt" - Clears both tables
- Confirmation dialog before each action
- Shows last reset date (optional enhancement)
- Loading states during reset

### 4. Update Edge Function Config

**File: `supabase/config.toml`**

Add the new function with JWT verification disabled (function handles auth internally):

```toml
[functions.reset-slot-stats]
verify_jwt = false
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `supabase/functions/reset-slot-stats/index.ts` | Create | Edge function for resetting stats |
| `supabase/config.toml` | Modify | Add function config |
| `src/components/SlotMachineAdminSection.tsx` | Modify | Add reset controls UI section |
| Database SQL | Execute | Set up pg_cron schedule |

---

## Security Considerations

- Edge function verifies admin role before allowing reset
- For cron calls, a secret header or internal check ensures only scheduled calls work
- Confirmation dialogs prevent accidental resets
- All reset actions are logged for audit purposes

---

## Technical Notes

- Uses existing Supabase service role for bulk deletes
- The cron job uses `pg_net` to call the edge function, ensuring proper logging
- React Query cache is invalidated after reset to refresh UI immediately
