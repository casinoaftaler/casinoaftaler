
# Disable Bonanza Stats + Add Debug Scatter Button

## 1. Disable leaderboard/stats recording for Fedesvin Bonanza

Comment out the `slot_game_results` insert calls in the Bonanza section of `supabase/functions/slot-spin/index.ts`, matching the pattern already used for Gates ("DEMO MODE: Skip leaderboard recording").

**Files:** `supabase/functions/slot-spin/index.ts`
- Line ~1650: Comment out the bonus completion game result insert
- Line ~1677: Comment out the normal spin game result insert
- Also skip the `queryClient.invalidateQueries` for leaderboard in `BonanzaSlotGame.tsx` (line ~408)

## 2. Add debug mode with guaranteed 4 scatters (admin only)

### Server-side (`supabase/functions/slot-spin/index.ts`)
- Parse a new `debugScatters` field from the request body
- Check admin role via `has_role` RPC before allowing it
- In the Bonanza normal spin section: if `debugScatters` is true and user is admin, after generating the grid, force-place exactly 4 scatters across 4 different columns (replacing non-scatter symbols)
- Then let the normal tumble/win/bonus logic proceed -- this will naturally trigger the bonus

### Client-side hook (`src/hooks/useServerSpin.ts`)
- Add `debugScatters` to the `SpinRequest` interface and pass it through to the edge function body

### Client-side UI (`src/components/slots/BonanzaSlotGame.tsx`)
- Import `useAuth` (already imported) and check `isAdmin`
- Add a small debug button (e.g., a bug icon) visible only to admins, next to the control bar
- When clicked, it calls `serverSpin` with `debugScatters: true` using the same spin flow as `handleSpin`

### Technical Details

**Edge function changes:**
```text
// In body parsing (line ~1469):
const { debugScatters } = body;

// In Bonanza normal spin section (after line ~1667):
if (debugScatters) {
  // Admin check via has_role RPC
  // Force 4 scatters onto different columns in the grid
}
```

**Security:** The `debugScatters` flag is validated server-side by checking `has_role(userId, 'admin')`. Non-admin requests with this flag are silently ignored.
