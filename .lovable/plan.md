
# Fedesvin Bonanza - Sweet Bonanza-Style Slot Machine

## Overview
A new 6x5 cluster/tumble slot game with candy theme, multiplier bombs (bonus only), and free spins. Admin-only access during development with "Kommer snart" for regular users.

## Architecture
The new game follows the exact same pattern as "Gates of Fedesvin" (which is also a 6x5 tumble/cluster game), adapted with Bonanza-specific mechanics (multiplier bombs only in bonus, candy theme, different visual style).

**Game ID:** `fedesvin-bonanza`

---

## Phase 1: Database & Backend Setup

### 1.1 Slot Symbols (Database)
- Insert candy/fruit symbols into `slot_symbols` with `game_id = 'fedesvin-bonanza'`
- **Premium (candy):** Red Heart, Purple Square, Green Hexagon, Blue Oval
- **Common (fruit):** Banana, Watermelon, Grape, Apple, Peach
- **Scatter:** Lollipop (triggers free spins at 4+)
- Each with appropriate weights, multipliers (8+/10+/12+ match tiers like Gates), and rarity

### 1.2 Site Settings
- Add `fedesvin_bonanza_locked` to `site_settings` (for page lock gate)
- Add `fedesvin_bonanza_background_image` setting

### 1.3 Access Control
- Update `useSlotPageAccess` hook's `GAME_SETTINGS_KEYS` map with `fedesvin-bonanza` entry
- Update `verify-slot-password` edge function's allowed game IDs list

---

## Phase 2: Game Logic Engine

### 2.1 New File: `src/lib/bonanzaGameLogic.ts`
Adapted from `gatesGameLogic.ts` with key differences:
- 6 columns x 5 rows (same grid)
- **Cluster wins:** 8+ matching symbols anywhere (same as Gates)
- **Multiplier bombs:** Only appear during bonus/free spins (NOT base game)
- **Bombs only activate on winning tumbles** -- if no win, bombs fizzle and disappear
- **Scatter trigger:** 4 lollipops = 10 free spins, 5 = 12, 6 = 15
- Tumble mechanics identical to Gates (remove winners, gravity fill)

### 2.2 Update Edge Function: `supabase/functions/slot-spin/index.ts`
Add a new `isBonanza` branch (similar to `isGatesOfFedesvin`):
- Bonanza-specific grid generation (no multiplier bombs in base game)
- Bonus spins: multiplier bombs can appear, only activate on winning tumbles
- Bombs that don't participate in a win are removed (fizzle)
- All active bomb multipliers on a winning tumble are summed and applied
- In free spins: multiplier accumulates across tumbles within a single spin (resets per spin)
- Provably fair PRNG (reuse existing SeededPRNG)

---

## Phase 3: Theme & Styling

### 3.1 New Theme in `src/lib/slotTheme.ts`
- Add `bonanzaTheme` (candy pink palette): pink accents, pastel gradients, candy-colored UI
- Register as `"fedesvin-bonanza"` in themes map

### 3.2 New CSS: `src/styles/bonanza-animations.css`
- Candy-specific animations: symbol bounce on landing, candy spark explosions, bomb fizzle/activate
- Gravity drop with slight rotation variation
- Bomb jump-forward + multiplier grow animation
- Lollipop scatter celebration
- Big Win / Mega Win / Sensational text animations

---

## Phase 4: Game Components

### 4.1 New File: `src/components/slots/BonanzaSlotGame.tsx`
Main game component, adapted from `GatesSlotGame.tsx`:
- Same tumble flow (spin -> show wins -> explode -> gravity fill -> repeat)
- Multiplier bomb handling: visual fizzle when no win, activate animation when win
- Running multiplier display during bonus
- Bomb multipliers sum together per tumble, applied to tumble win
- Free spins mode with accumulated multiplier per spin

### 4.2 New File: `src/components/slots/BonanzaColumn.tsx`
Column renderer adapted from `GatesColumn.tsx`:
- Candy-themed cell backgrounds (pastel instead of blue)
- Bomb symbol rendering with multiplier value overlay
- Bomb fizzle/activate cell animation states

### 4.3 Reuse Existing Components
- `GatesControlBar` -- reused with bonanza theme (candy pink via slotTheme)
- `GatesPayTable` -- adapted or new `BonanzaPayTable` for cluster pay info
- `WinCelebration` -- reused with bonanza-specific tier names (BIG WIN / MEGA WIN / SENSATIONAL)
- `BonusEntrySequence`, `GatesBonusEndOverlay`, `GatesRetriggerOverlay` -- adapted versions
- `AnimatedWinCounter`, `AnimatedSpinCounter` -- reused as-is

---

## Phase 5: Page & Routing

### 5.1 New File: `src/pages/FedesvinBonanza.tsx`
Page component following `GatesOfFedesvin.tsx` pattern:
- Admin-only gate: non-admins see "Kommer snart!" message
- Password lock gate, session gate, loading screen, intro screen
- Candy sky-blue gradient background
- SEO component with noindex

### 5.2 Route in `App.tsx`
- Add lazy import for `FedesvinBonanza`
- Add route: `/community/slots/fedesvin-bonanza`

### 5.3 Spillehal Link
- Add game card to the slots overview page so admins can navigate to it

---

## Phase 6: Symbol Images
- Symbols will initially use emoji fallbacks or placeholder images
- Admin can upload proper candy/fruit images via existing `SlotSymbolImageUpload` component
- The symbol admin section already supports per-game filtering

---

## Technical Details

### Win Tiers (for celebration display)
- Big Win: > 20x bet
- Mega Win: > 50x bet  
- Sensational: > 100x bet

### Multiplier Bomb Weights (bonus only)
Same distribution as Gates: 2x(30), 3x(25), 5x(20), 10x(12), 15x(6), 25x(3), 50x(2), 100x(1)

### Key Difference from Gates
In Gates, multipliers persist across tumbles and only collect at end. In Bonanza:
- Bombs only appear in bonus
- Bombs activate immediately on winning tumbles (multiplied to that tumble's win)
- Non-winning bombs fizzle and disappear
- Per-spin accumulation in free spins: all bomb values from winning tumbles in one spin add together

### Files Created (new)
1. `src/lib/bonanzaGameLogic.ts`
2. `src/components/slots/BonanzaSlotGame.tsx`
3. `src/components/slots/BonanzaColumn.tsx`
4. `src/components/slots/BonanzaPayTable.tsx`
5. `src/pages/FedesvinBonanza.tsx`
6. `src/styles/bonanza-animations.css`

### Files Modified
1. `src/lib/slotTheme.ts` -- add bonanza theme
2. `src/App.tsx` -- add route + lazy import
3. `supabase/functions/slot-spin/index.ts` -- add bonanza engine branch
4. `src/hooks/useSlotPageAccess.ts` -- add bonanza to game settings keys
5. `supabase/functions/verify-slot-password/index.ts` -- add bonanza to allowed list
6. Database migration: insert symbols + site settings

### Execution Order
1. Database migration (symbols + settings)
2. Game logic engine (`bonanzaGameLogic.ts`)
3. Theme + CSS animations
4. Column component
5. Main game component
6. Page + routing
7. Edge function update
8. Deploy + test
