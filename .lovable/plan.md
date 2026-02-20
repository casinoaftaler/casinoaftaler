

# Gates of Fedesvin -- New Slot Game (Gates of Olympus Clone)

## Overview

This is a major new game that requires a **fundamentally different game engine** from the existing Book of Fedesvin and Rise of Fedesvin. Gates of Olympus uses completely different mechanics:

**Current games (Book/Rise):** 5 reels x 3 rows, 10 pay lines, consecutive-from-left wins, expanding symbols in bonus.

**Gates of Fedesvin (new):** 6 reels x 5 rows, "Pay Anywhere" (cluster pays), Tumble/Cascade mechanic, random multiplier symbols, cumulative multipliers in free spins.

---

## Gates of Olympus Core Mechanics

### Base Game
- **Grid**: 6 columns x 5 rows (30 symbol positions)
- **Pay Anywhere**: No pay lines. Match 8+ identical symbols ANYWHERE on the grid to win
- **Tumble Feature**: After a win, winning symbols are removed and new symbols fall from above. Tumbles continue until no new wins form. This is the signature mechanic.
- **Multiplier Symbols**: Random multiplier orbs (2x, 3x, 5x, 10x, 15x, 25x, 50x, 100x, 250x, 500x) can land alongside regular symbols. Their values are summed and applied to the total win of that spin round (after all tumbles complete).
- **Scatter**: Zeus scatter symbol. 4+ scatters trigger free spins.

### Free Spins (Bonus)
- **15 free spins** on trigger (4+ scatters)
- **Retrigger**: 3+ scatters during free spins = +5 free spins
- **Cumulative Multiplier**: ALL multiplier symbol values during the entire free spins round are summed into a running total multiplier. Each winning tumble has this total multiplier applied. This is what makes big wins possible.
- **Example**: If multipliers of 5x, 3x, 2x land during several tumbles, the running multiplier becomes 10x (5+3+2). The next win is multiplied by 10x.

### Symbol Payout Structure (Pay Anywhere, based on count)

| Symbol | 8+ | 10+ | 12+ |
|--------|-----|------|------|
| Premium (gems) | Low | Medium | High |
| Common (cups, rings) | Lower | Low | Medium |

---

## Implementation Plan

### Phase 1: Database Setup

**1a. Add symbols for "gates-of-fedesvin" to `slot_symbols` table**

Insert ~10 symbols with `game_id = 'gates-of-fedesvin'`:
- **Premium**: Red Gem, Purple Gem, Green Gem, Blue Gem (high payouts)
- **Common**: Gold Cup, Gold Ring, Hourglass, Chalice (lower payouts)
- **Scatter**: Zeus/Lightning scatter
- **Note**: Multiplier orbs are NOT symbols in the grid -- they are randomly generated overlays

The symbol table needs new payout columns since Gates uses 8/10/12 match counts instead of 2/3/4/5. We'll add `multiplier_8`, `multiplier_10`, `multiplier_12` columns, or repurpose existing `multiplier_3`/`multiplier_4`/`multiplier_5` as "tier 1/2/3" payouts for this game.

**Approach**: Repurpose existing columns to avoid schema changes:
- `multiplier_3` = payout for 8-9 matches
- `multiplier_4` = payout for 10-11 matches  
- `multiplier_5` = payout for 12+ matches
- `multiplier_2` = unused (0)

**1b. Add access settings**

Add entries to `site_settings`:
- `gates_of_fedesvin_locked`: "false"
- `gates_of_fedesvin_background_image`: (URL)

**1c. Update `useSlotPageAccess` with new game key**

### Phase 2: Game Logic (New Engine)

**2a. Create `src/lib/gatesGameLogic.ts`**

Completely new game logic file:

```
- GRID_COLS = 6, GRID_ROWS = 5
- generateGatesGrid(symbols, isBonusSpin): string[][] (6x5)
- countSymbolMatches(grid, symbols): Map<symbolId, count>
- calculateGatesWins(grid, symbols, betAmount): { wins, multiplierTotal }
  - For each symbol type, count occurrences across entire grid
  - 8-9 matches = tier 1 payout
  - 10-11 matches = tier 2 payout
  - 12+ matches = tier 3 payout
- applyTumble(grid, winningSymbolIds, symbols): { newGrid, tumbledPositions }
  - Remove winning symbols
  - Drop symbols down to fill gaps
  - Generate new random symbols for empty positions at top
- generateMultiplierOrbs(grid): { positions, values }[]
  - Random chance to place multiplier orbs on the grid
  - Values: [2, 3, 5, 10, 15, 25, 50, 100, 250, 500] with weighted distribution
- calculateFullSpinResult(grid, symbols, betAmount, isBonusSpin, runningMultiplier):
  - Loop: check wins -> apply multipliers -> tumble -> repeat
  - Return: all tumble steps, total win, multiplier values, bonus trigger
```

**2b. Create `src/lib/gatesBonusLogic.ts`**

Bonus-specific logic:
- Cumulative multiplier tracking across the entire free spins session
- Retrigger detection (3+ scatters during free spins = +5 spins)
- Running multiplier applied to each tumble win

### Phase 3: Backend (Edge Function)

**3a. Extend `slot-spin/index.ts`**

Add a `gates-of-fedesvin` code path in the edge function:

- Different grid generation (6x5 instead of 5x3)
- Pay-anywhere win calculation instead of pay-line
- Tumble loop: generate grid -> check wins -> remove winners -> drop new symbols -> repeat
- Multiplier orb generation and application
- Bonus mode: track cumulative multiplier in `slot_bonus_state`
- Return tumble sequence to frontend for animation

The response structure for Gates will include:
```typescript
interface GatesSpinResult {
  tumbleSteps: Array<{
    grid: string[][];           // Grid state at this step
    wins: GatesWin[];           // Winning clusters
    winningPositions: number[]; // Flat indices of winning symbols
    multiplierOrbs: Array<{ position: number; value: number }>;
    stepWin: number;            // Win for this tumble step
  }>;
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
  totalMultiplier: number;      // Sum of all multiplier orbs this spin
}
```

### Phase 4: Frontend Components

**4a. Create `src/components/slots/GatesSlotGame.tsx`**

New main game component (based on SlotGame.tsx but heavily modified):

- **6x5 grid layout** instead of 5x3
- **Tumble animation system**: After reels land, winning symbols flash/highlight, then disappear with a particle effect, remaining symbols drop down, new symbols fall from above
- **Multiplier orb rendering**: Glowing orbs with value text that appear on the grid
- **Running multiplier display**: A prominent counter showing the current total multiplier (especially important during free spins)
- **No pay lines** (WinLines component not used)
- **No expanding symbols** (BonusSymbolBar/BonusSymbolPicker not used)

Key differences from SlotGame.tsx:
- Reel animation: Instead of spinning reels, symbols fall/drop (tumble mechanic)
- Win display: Highlight winning clusters (all positions, not lines)
- Sequential tumbles: Animate win -> remove -> drop -> new symbols -> check again
- Multiplier orb animation: Orbs float/pulse on winning positions

**4b. Create `src/components/slots/GatesSlotReel.tsx`**

New reel component for 6x5 grid with tumble support:
- 5 rows per reel (instead of 3)
- Tumble animation: symbols that win flash and dissolve, then gravity pulls remaining symbols down
- New symbols appear at top with a "drop-in" animation
- Smaller symbol sizes to fit 6x5 grid

**4c. Create `src/components/slots/GatesWinDisplay.tsx`**

Cluster-based win highlighting:
- Highlight all matching symbols across the grid (not line-based)
- Show cluster count (e.g., "12x Diamond!")
- Multiplier orb values animate and collect into a total

**4d. Create `src/components/slots/GatesBonusOverlay.tsx`**

Simplified bonus overlay (no symbol picker needed):
- Trigger screen: Zeus/lightning themed, shows "15 FREE SPINS"
- Running multiplier display during free spins
- Complete screen: Shows total multiplier applied and total winnings

**4e. Create `src/components/slots/GatesBonusStatusBar.tsx`**

Shows:
- Free spins remaining / total
- Current cumulative multiplier (e.g., "TOTAL MULTI: x47")
- Bonus winnings so far

**4f. Create `src/components/slots/GatesMultiplierDisplay.tsx`**

Floating multiplier orb component:
- Renders orbs on winning positions
- Values animate and fly to a "total multiplier" counter
- Lightning/glow effects

### Phase 5: Theme and Styling

**5a. Add Olympus theme to `src/lib/slotTheme.ts`**

New `olympusTheme: SlotTheme` with blue/white/gold/lightning color palette:
- Blues (sky/Zeus), golds, white lightning accents
- Cloud/marble aesthetic

**5b. Create `src/styles/gates-animations.css`**

New animations specific to Gates:
- `tumble-remove`: Symbol shrinks/fades with sparkle
- `tumble-drop`: Symbol falls from above with bounce
- `multiplier-orb-pulse`: Glowing orb animation
- `multiplier-collect`: Orb value flies to total counter
- `lightning-strike`: Zeus lightning effect for big wins
- `cloud-drift`: Ambient cloud particles

**5c. Intro/Loading screens**

- `SlotLoadingScreen` already supports `gameId` -- add `gates-of-fedesvin` assets
- `SlotIntroScreen` already supports `gameId` -- add Olympus-themed intro

### Phase 6: Page and Routing

**6a. Create `src/pages/GatesOfFedesvin.tsx`**

New page following the pattern of `RiseOfFedesvin.tsx`:
- Uses `GatesSlotGame` instead of `SlotGame`
- Olympus background image
- Blue/gold theme colors
- `GAME_ID = "gates-of-fedesvin"`

**6b. Update routing in `App.tsx`**

Add route: `/community/slots/gates-of-fedesvin`

**6c. Update `GameLibrary.tsx`**

Move "Fedesvin of Olympus" from `MORE_SLOTS` (coming soon) to `FEATURED_SLOTS` and rename to "Gates of Fedesvin". Update href to point to the new route.

### Phase 7: Hooks

**7a. Extend `useSlotSymbols.ts`**

Already supports `gameId` parameter -- no changes needed.

**7b. Extend `useBonusGameSync.ts`**

Add support for Gates-style bonus state:
- `cumulativeMultiplier` field in bonus state
- No expanding symbol logic (cumulative multiplier replaces it)

**7c. Extend `useSlotPageAccess.ts`**

Add `gates-of-fedesvin` entry to `GAME_SETTINGS_KEYS`.

---

## Technical Challenges

### 1. Tumble Animation Sequencing
The tumble mechanic requires displaying a multi-step animation sequence:
1. Show initial grid
2. Highlight winning symbols (flash/glow)
3. Remove winning symbols (dissolve animation)
4. Drop remaining symbols down (gravity animation)
5. New symbols appear at top (drop-in animation)
6. Check for new wins -- if found, go to step 2
7. When no more wins, show total and apply multipliers

This is fundamentally different from the current spin-and-stop mechanic and requires a new animation state machine.

### 2. Grid Size Change (6x5 vs 5x3)
The current reel system is built around 5 reels x 3 rows. The new game needs 6x5, which affects:
- Symbol sizing (must be smaller)
- Layout calculations
- Frame dimensions
- Mobile responsiveness

### 3. Server Response Structure
The server must return the ENTIRE tumble sequence so the client can replay it step by step. This is more data than the current single-grid response.

---

## Estimated Scope

This is equivalent to building a second game engine. The files that can be shared with existing games:
- Theme system (`slotTheme.ts`) -- extended
- Sound system (`slotSoundEffects.ts`) -- extended
- Loading/Intro screens -- extended
- Page layout (`SlotPageLayout.tsx`) -- reused
- Leaderboard (`SlotLeaderboard.tsx`) -- reused
- Control panel -- partially reused (bet controls, volume, autospin)
- Session management -- reused

Files that are NEW or heavily modified:
- `gatesGameLogic.ts` -- NEW (core game engine)
- `gatesBonusLogic.ts` -- NEW (bonus logic)
- `GatesSlotGame.tsx` -- NEW (main component)
- `GatesSlotReel.tsx` -- NEW (reel with tumble)
- `GatesWinDisplay.tsx` -- NEW (cluster wins)
- `GatesBonusOverlay.tsx` -- NEW
- `GatesBonusStatusBar.tsx` -- NEW
- `GatesMultiplierDisplay.tsx` -- NEW
- `gates-animations.css` -- NEW
- `GatesOfFedesvin.tsx` -- NEW (page)
- `slot-spin/index.ts` -- EXTENDED (new game path)
- Database migration -- NEW (symbols + settings)

