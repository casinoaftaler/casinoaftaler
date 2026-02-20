

# Add Gates of Fedesvin to Admin Panel

## Overview

Add "Gates of Fedesvin" as a selectable game in the admin panel and create a dedicated Gates-specific settings section for controlling game mechanics that are currently hardcoded in the edge function (multiplier chances, scatter thresholds, free spins, multiplier values/weights, and page lock/password).

## What You'll Be Able to Control

**Game Mechanics (Gates-specific):**
- Multiplier orb spawn chance (base game vs bonus)
- Multiplier values and their weights (2x, 3x, 5x ... 500x)
- Minimum symbol match count (currently 8)
- Scatter trigger count (4 in base, 3 for retrigger)
- Free spins count (initial 15, retrigger +5)

**Page Access:**
- Lock/unlock Gates of Fedesvin page
- Set/change password

**Existing features that already work per-game:**
- Symbols (weights, multipliers, images, drag-reorder)
- Statistics
- Sounds (batch generator already gates-aware)
- Frame/background/title images

---

## Technical Changes

### 1. Add Gates to Game Selector

**File: `src/components/SlotMachineAdminSection.tsx`**

Add `gates-of-fedesvin` to the `GAME_OPTIONS` array:

```typescript
const GAME_OPTIONS = [
  { id: "book-of-fedesvin", label: "Book of Fedesvin" },
  { id: "rise-of-fedesvin", label: "Rise of Fedesvin" },
  { id: "gates-of-fedesvin", label: "Gates of Fedesvin" },
] as const;
```

### 2. Add Gates Page Lock Controls to Settings Tab

**File: `src/components/SlotMachineAdminSection.tsx`** (SettingsTab)

- Add a "Gates of Fedesvin" access control card (lock switch + password input), following the same pattern as Book/Rise
- Store in `site_settings` with keys `gates_of_fedesvin_locked` and `gates_of_fedesvin_password`
- Extend `useSlotSettings` hook to include `gatesLocked` and `gatesPassword`

### 3. Create Gates Game Mechanics Admin Section

**New component: `src/components/slots/GatesGameSettingsAdmin.tsx`**

A dedicated card shown only when `gates-of-fedesvin` is selected, with controls for:

| Setting | Key in `site_settings` | Default | UI Control |
|---|---|---|---|
| Multiplier Chance (Base) | `gates_multiplier_chance_base` | 0.04 | Slider (0-0.20) |
| Multiplier Chance (Bonus) | `gates_multiplier_chance_bonus` | 0.14 | Slider (0-0.30) |
| Min Match Count | `gates_min_match` | 8 | Number input |
| Scatter Trigger Count | `gates_scatter_trigger` | 4 | Number input |
| Scatter Retrigger Count | `gates_scatter_retrigger` | 3 | Number input |
| Initial Free Spins | `gates_free_spins_initial` | 15 | Number input |
| Retrigger Free Spins | `gates_free_spins_retrigger` | 5 | Number input |

Each slider/input shows the current value with a description of what it controls.

### 4. Update Edge Function to Read Settings from Database

**File: `supabase/functions/slot-spin/index.ts`**

Replace the hardcoded Gates constants with values read from `site_settings` (with fallbacks to current defaults). Add these keys to the settings cache so they're fetched once and cached for 5 minutes (matching the existing caching pattern).

The function will:
1. Query `site_settings` for gates-specific keys at startup (cached)
2. Use values from DB if present, otherwise fall back to current hardcoded defaults
3. This means the game works identically if no admin changes are made

### 5. Extend SlotSettings Hook

**File: `src/hooks/useSlotSettings.ts`**

Add `gatesLocked`, `gatesPassword` fields and their corresponding site_settings keys (`gates_of_fedesvin_locked`, `gates_of_fedesvin_password`).

### 6. Files Changed Summary

| File | Action |
|---|---|
| `src/components/SlotMachineAdminSection.tsx` | Add Gates to game selector, add Gates lock controls, render GatesGameSettingsAdmin |
| `src/components/slots/GatesGameSettingsAdmin.tsx` | **New** - Gates-specific game mechanics controls |
| `src/hooks/useSlotSettings.ts` | Add gatesLocked/gatesPassword fields |
| `supabase/functions/slot-spin/index.ts` | Read Gates constants from site_settings instead of hardcoded values |

No database schema changes needed -- all settings use the existing `site_settings` key-value table.

