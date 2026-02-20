

# Enable Gates of Fedesvin + Password Lock + AI Symbol Prompts

## Overview

Three changes needed:
1. Remove `coming-soon` status from Gates of Fedesvin in GameLibrary
2. Set up password lock (database settings + update edge function)
3. Add Gates of Fedesvin prompt routing in the AI symbol generator

---

## 1. GameLibrary Update

Move "Gates of Fedesvin" from `MORE_SLOTS` array to `FEATURED_SLOTS` array (or simply remove the `coming-soon` status). The entry already has the correct `href` pointing to `/community/slots/gates-of-fedesvin`.

**File**: `src/pages/GameLibrary.tsx`
- Remove the Gates of Fedesvin entry from `MORE_SLOTS`
- Add it to the featured slots section without the `coming-soon` status

## 2. Password Lock Setup

### 2a. Database: Add password + lock settings

Insert two new `site_settings` entries:
- `gates_of_fedesvin_password` = a password value (e.g. "gatesoffedesvin2026")
- Update `gates_of_fedesvin_locked` from `"false"` to `"true"`

### 2b. Update `verify-slot-password` Edge Function

The edge function currently only supports `book-of-fedesvin` and `rise-of-fedesvin`. Add `gates-of-fedesvin` to:
- `validGameIds` array
- `passwordKeyMap` dictionary mapping to `"gates_of_fedesvin_password"`

**File**: `supabase/functions/verify-slot-password/index.ts`

### 2c. `useSlotPageAccess` -- Already Done

The hook already has `gates-of-fedesvin` in `GAME_SETTINGS_KEYS` from a previous change, so no update needed.

## 3. AI Symbol Generation Prompts

### 3a. Add Gates of Fedesvin theme constants

Add new style/frame constants for the Olympus/Zeus theme:
- `GATES_BASE_STYLE`: Blue sky, marble columns, cloud-and-lightning aesthetic
- `GATES_PREMIUM_FRAME`: Golden Olympian frame with Greek motifs
- `GATES_SCATTER_FRAME`: Red frame (same style as other scatters)

### 3b. Create `getPromptForGatesSymbol(name, isScatter)` function

Prompt mappings for the 9 symbols:

| Symbol | Prompt Theme |
|--------|-------------|
| **Zeus (scatter)** | The SAME chubby gray/white cat (British Shorthair) but dressed as Zeus -- wearing a Greek laurel wreath, holding a lightning bolt, sitting on a marble throne. Red scatter frame. |
| **Red Gem** | A brilliant faceted ruby gem with golden setting, lightning energy inside |
| **Purple Gem** | An amethyst gem with golden Greek-key setting, divine purple glow |
| **Green Gem** | An emerald gem with golden olive branch setting, celestial green light |
| **Blue Gem** | A sapphire gem with golden trident-motif setting, electric blue energy |
| **Gold Cup** | An ornate golden Greek chalice/kylix with divine engravings |
| **Gold Ring** | A golden Greek-style ring with laurel wreath design |
| **Hourglass** | A golden hourglass with marble and celestial sand |
| **Chalice** | A golden Greek amphora/goblet with Zeus lightning motifs |

The scatter prompt will use the exact same cat description (chubby/fat gray and white cat, British Shorthair, green eyes, sweet slightly smug expression) but adapted to Greek/Olympus theme instead of Egyptian.

### 3c. Update prompt routing

In the main handler (line ~700), update the routing logic:
```
if game_id === "rise-of-fedesvin" -> getPromptForRiseSymbol
else if game_id === "gates-of-fedesvin" -> getPromptForGatesSymbol
else -> getPromptForSymbol (default Egyptian)
```

**File**: `supabase/functions/generate-slot-symbol/index.ts`

---

## Technical Details

### Files Modified

1. **`src/pages/GameLibrary.tsx`** -- Move Gates of Fedesvin out of coming-soon
2. **`supabase/functions/verify-slot-password/index.ts`** -- Add gates-of-fedesvin game ID support
3. **`supabase/functions/generate-slot-symbol/index.ts`** -- Add Gates theme constants and prompt function

### Database Changes (via data insert tool, not migration)

- INSERT `gates_of_fedesvin_password` into `site_settings`
- UPDATE `gates_of_fedesvin_locked` to `"true"` in `site_settings`

### Edge Function Deployments

Both `verify-slot-password` and `generate-slot-symbol` will need redeployment after changes.

