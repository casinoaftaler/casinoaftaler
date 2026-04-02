

# Plan: Migrate Gates of Fedesvin to Bonanza Engine

## Summary
Replace the current Gates of Fedesvin game engine with the Fedesvin Bonanza engine logic (6x5 grid, Pay Anywhere, tumble/cascade, multiplier system). Keep the Gates visual symbols and theme. The key difference: multipliers (orbs) accumulate throughout the bonus and only multiply wins when they land alongside a winning tumble.

## Current State
- **Gates**: Uses `mult_*` orbs, multipliers persist on grid during tumbles, collected after last winning step, applied as sum to raw win. No bombs. No double chance / buy bonus. No tumble win popups or collision bar.
- **Bonanza**: Uses `bomb_*` multipliers, bombs persist during tumbles, blow up sequentially after all tumbles, with flying multiplier animations, tumble win bar with collision effect, floating win popups, double chance, buy bonus.

## What Changes

### 1. Server-side: Rewrite `calculateGatesFullSpin` to use Bonanza engine
**File: `supabase/functions/slot-spin/index.ts`**

- Replace the Gates spin logic (lines ~460-551) with Bonanza-style logic:
  - Use `bomb_*` multiplier symbols instead of `mult_*` orbs
  - Bombs persist on grid during tumbles, only activate/fizzle after all tumbles complete
  - Bombs activate if there were any wins, fizzle if no wins
  - totalWin = rawWin * totalBombMultiplier (or rawWin if no activated bombs)
  - In bonus: cumulative multiplier saved across spins (already works this way)
- Replace `generateGatesGrid` to use Bonanza-style generation:
  - Reel duplication (configurable 2/3 identical symbols per reel)
  - Bomb placement in bonus (chance per cell, max 1 per reel)
  - Remove scatter/multiplier spin type split (Bonanza doesn't have this)
- Replace `applyGatesTumble` with Bonanza-style tumble (only remove winning symbols, bombs persist)
- Replace `fillWithMultipliers` with Bonanza-style fill (bombs in bonus, not `mult_*`)
- Add Gates-specific settings for bomb chance, reel duplication, etc. (reuse `gates_*` settings keys)
- Update the Gates bonus spin and normal spin handler sections (~lines 1686-1742) to pass bomb-related data

### 2. Client-side: Rewrite `GatesSlotGame.tsx` to match Bonanza flow
**File: `src/components/slots/GatesSlotGame.tsx`** (~956 lines, major rewrite)

- Import and use Bonanza-style components:
  - `BonanzaTumbleWinPopup` for floating win numbers
  - `BonanzaTumbleWinBar` for tumble collision bar
  - `BonanzaFlyingMultiplier` for bomb-to-bar flying animations
- Rewrite `processTumbleSteps` to match Bonanza:
  - Remove slow-motion logic
  - Remove multiplier orb collection during tumbles
  - After all tumbles: sequential bomb blow-up with activate/fizzle animations
  - Flying multiplier from bomb position to multiplier bank
  - Collision effect between tumble win bar and multiplier bar
  - Win = rawWin * bombMultiplier calculated after bombs resolve
- Add state: `tumbleWinPopups`, `collisionPhase`, `tumbleBarVisible`, `flyingMultipliers`, `gridContainerRef`, `currentSpinWin`, `doubleChance`, `isBuyingBonus`
- Add `handleBuyBonus` callback (100x bet cost)
- Add double chance toggle
- Keep refs for auto-spin sync (`freeSpinsRemainingRef`, `isBonusActiveRef`, `isAutoSpinningRef`, etc.)
- Update `handleSpin` to match Bonanza flow (drop-off with row stagger, drop-in, scatter celebration)
- Update bonus state management to accumulate winAmount across bonus spins
- Keep Gates visual theme (blue/gold gradients, Zeus character, lightning effects)

### 3. Client-side: Update `GatesColumn.tsx` to support bomb symbols
**File: `src/components/slots/GatesColumn.tsx`**

- Add bomb symbol rendering (similar to `BonanzaColumn.tsx`)
- Add cell animation states: `bomb-fizzle`, `bomb-activate`, `bomb-exploded`
- Add `BombFractureExplosion` component for bomb activation visuals
- Add props: `bombSymbolsMap`, `symbolWidth`, `symbolHeight`, `isBonusActive`, `isMobile`
- Import `useBombSymbols` hook (or accept bomb data as prop)

### 4. Client-side: Update `GatesControlBar.tsx`
- Add double chance toggle
- Add buy bonus button
- Add tumble bar rendering for mobile (like Bonanza)

### 5. Client-side game logic: Update `gatesGameLogic.ts`
- Add bomb-related helpers (`isBombSymbol`, `getBombValue`, `scanGridBombs`)
- Or simply import from `bonanzaGameLogic.ts` since the grid dimensions are identical (6x5)

### 6. Hook: Add `useBombSymbols` for Gates
- The existing `useBombSymbols` hook likely needs to support `gates-of-fedesvin` game ID
- Check if bomb symbol images exist for Gates theme; if not, reuse Bonanza bomb images

## Key Behavioral Difference (Multiplier Logic)
- **Bonanza**: Bombs activate/fizzle after ALL tumbles. If any wins occurred, bombs activate. `totalWin = rawWin * sum(activated bombs)`. Per-spin multiplier (not cumulative across spins in base; cumulative in bonus).
- **New Gates**: Same behavior. Multipliers (visually as orbs/bombs) only apply when they land AND there's a win. Cumulative across bonus spins.

## Files Modified
1. `supabase/functions/slot-spin/index.ts` — Gates engine rewrite to Bonanza logic
2. `src/components/slots/GatesSlotGame.tsx` — Major rewrite of game component
3. `src/components/slots/GatesColumn.tsx` — Add bomb rendering + new anim states
4. `src/components/slots/GatesControlBar.tsx` — Add double chance + buy bonus
5. `src/lib/gatesGameLogic.ts` — Add bomb helpers (or reuse from bonanza)

## Files NOT Modified
- Gates symbol images/DB entries (kept as-is)
- Gates page (`GatesOfFedesvin.tsx`) — no changes needed
- Bonanza files — untouched
- Gates theme/animations CSS — may need minor additions for bomb animations

## Risk Mitigation
- The server-side Gates engine is currently in "DEMO MODE" (leaderboard recording commented out), so this is safe to rewrite
- Both games share the same grid size (6x5), symbol structure, and bonus state DB schema
- The Bonanza engine is battle-tested and stable

