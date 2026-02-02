
# Plan: Slot Machine Admin Section

## Overview
Add a new "Spillemaskine" (Slot Machine) tab to the admin panel that allows administrators to manage all slot machine parameters including symbols, payouts, daily spin limits, bet limits, and view game statistics.

---

## Admin Tab Structure

A new tab will be added to the admin dashboard with three sub-sections:

1. **Symboler (Symbols)** - Manage slot symbols, images, and payout multipliers
2. **Indstillinger (Settings)** - Configure daily spins, bet limits, and game parameters
3. **Statistik (Statistics)** - View aggregated game data and player activity

---

## Configurable Parameters

### Symbol Management
For each of the 10 slot symbols, admins can modify:
- **Name** - Symbol display name (e.g., "Pharaoh", "Book")
- **Image** - Upload custom symbol image to `slot-symbols` storage bucket
- **Multiplier 3x** - Payout for 3 matching symbols
- **Multiplier 4x** - Payout for 4 matching symbols
- **Multiplier 5x** - Payout for 5 matching symbols
- **Is Scatter** - Mark as scatter symbol (pays anywhere)
- **Is Wild** - Mark as wild symbol (substitutes other symbols)
- **Position** - Display order in paytable (drag to reorder)

### Game Settings (stored in `site_settings` table)
- **Daily Spins** - Number of free spins per user per day (default: 100)
- **Min Bet** - Minimum bet amount (default: 1)
- **Max Bet** - Maximum bet amount (default: 10)

### Statistics View (read-only)
- Total spins today
- Total winnings today
- Average win per spin
- Top 10 winners today

---

## Database Changes

### New Site Settings Keys
Add the following keys to the `site_settings` table:
- `slot_daily_spins` (default: "100")
- `slot_min_bet` (default: "1")
- `slot_max_bet` (default: "10")

### Update RLS Policy
Add the new settings keys to the public whitelist for reading:
- `slot_daily_spins`
- `slot_min_bet`
- `slot_max_bet`

---

## File Structure

### New Files
```text
src/components/SlotMachineAdminSection.tsx  - Main admin component with tabs
src/components/SlotSymbolImageUpload.tsx    - Image upload for slot symbols
src/hooks/useSlotSettings.ts                - Hook for slot game settings
src/hooks/useSlotStatistics.ts              - Hook for game statistics
```

### Modified Files
```text
src/pages/Admin.tsx                         - Add new "Spillemaskine" tab
src/hooks/useSlotSpins.ts                   - Read daily spins from settings
src/components/slots/SlotGame.tsx           - Read bet limits from settings
src/components/slots/BetControls.tsx        - Use dynamic min/max bet
src/components/slots/SpinsRemaining.tsx     - Display dynamic max spins
```

---

## Implementation Details

### SlotMachineAdminSection Component
The admin section will use a sub-tab layout similar to existing patterns:

```text
+--------------------------------------------------+
|  SPILLEMASKINE ADMINISTRATION                    |
|  [Symboler] [Indstillinger] [Statistik]          |
+--------------------------------------------------+
|                                                  |
|  Symboler Tab:                                   |
|  +--------------------------------------------+  |
|  | [Drag] [Image] Pharaoh    30x  100x  500x  |  |
|  | [Drag] [Image] Anubis     20x   60x  200x  |  |
|  | [Drag] [Image] Book (W/S)  2x   20x  200x  |  |
|  |  ...                                       |  |
|  +--------------------------------------------+  |
|                                                  |
|  Indstillinger Tab:                              |
|  +--------------------------------------------+  |
|  | Daglige Spins:     [100]                   |  |
|  | Minimum Indsats:   [1]                     |  |
|  | Maximum Indsats:   [10]                    |  |
|  +--------------------------------------------+  |
|                                                  |
+--------------------------------------------------+
```

### Symbol Edit Dialog
When clicking edit on a symbol:
- Input for name
- Image upload component
- Three number inputs for multipliers (3x, 4x, 5x)
- Toggle switches for is_scatter and is_wild
- Save/Cancel buttons

### Symbol Image Upload
Similar to ShopImageUpload but uploading to `slot-symbols` bucket:
- Accept image files (jpg, png, webp)
- Preview current image
- Upload new image
- Remove image option

### useSlotSettings Hook
```typescript
// Fetches and updates slot game settings
export function useSlotSettings() {
  // Queries for: slot_daily_spins, slot_min_bet, slot_max_bet
  // Returns: { dailySpins, minBet, maxBet, updateSettings }
}
```

### useSlotStatistics Hook
```typescript
// Fetches aggregated game statistics for admin view
export function useSlotStatistics() {
  // Queries slot_game_results for today's data
  // Returns: { totalSpins, totalWinnings, avgWin, topWinners }
}
```

### Hook for Managing Symbols
Create a `useSlotSymbolsAdmin` hook for CRUD operations:
- `updateSymbol(id, data)` - Update symbol properties
- `updateSymbolPositions(positions)` - Reorder symbols

---

## UI/UX Considerations

### Tab Icon
Use `Gamepad2` (lucide-react) icon for the Spillemaskine tab

### Symbol List
- Drag-and-drop reordering (like Shop and Casino lists)
- Visual indicator for Wild/Scatter symbols
- Quick edit button for each symbol
- Image preview or emoji fallback

### Settings Form
- Number inputs with validation
- Min/max constraints
- Real-time preview of changes
- Toast notification on save

### Statistics Dashboard
- Cards showing key metrics
- Today/This Week/All Time filters
- Mini leaderboard of top winners

---

## Security

### RLS Updates
The new site_settings keys need to be added to the public whitelist so the game can read them. The migration will update the existing RLS policy.

### Admin-Only Write Access
Symbol updates and settings changes are protected by the existing `has_role(auth.uid(), 'admin')` RLS policies on `slot_symbols` and `site_settings` tables.

---

## Implementation Order

1. **Database Migration**
   - Insert default slot settings into site_settings
   - Update RLS policy to whitelist new keys

2. **Create Hooks**
   - useSlotSettings for reading/updating game config
   - useSlotSymbolsAdmin for symbol CRUD
   - useSlotStatistics for admin stats view

3. **Create Components**
   - SlotSymbolImageUpload component
   - SlotMachineAdminSection with three tabs

4. **Update Admin.tsx**
   - Add new tab trigger with Gamepad2 icon
   - Add TabsContent with SlotMachineAdminSection

5. **Update Game Components**
   - Modify useSlotSpins to read dailySpins from settings
   - Update BetControls to use dynamic min/max
   - Update SpinsRemaining to show dynamic max

6. **Testing**
   - Verify symbol editing works
   - Test settings changes reflect in game
   - Confirm statistics display correctly
