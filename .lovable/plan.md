

# Add RTP Calculation to Admin Panel and Ensure Weight Changes Apply to Game

## Overview

Add a theoretical RTP (Return to Player) calculation in the admin panel that updates in real-time as symbol weights are changed, and verify that weight changes from the admin panel are already being applied to the game.

## Current State Analysis

### How the Game Uses Weights

The slot machine already correctly uses weights from the database:

1. **useSlotSymbols hook** fetches symbols from `slot_symbols` table including `weight` column
2. **slotGameLogic.ts** uses `symbol.weight` in `getRandomSymbol()` to determine spawn probability
3. **useSlotSymbolsAdmin hook** updates weights in the database via `updateSymbol.mutate()`
4. **React Query** invalidates the `slot-symbols` query after updates, causing the game to use new weights

**The weight changes already apply to the game** - when an admin saves a new weight, React Query refetches the symbols, and subsequent spins use the updated weights.

### RTP Calculation

RTP (Return to Player) is a theoretical percentage calculated as:

```text
RTP = (Expected Winnings / Total Wagered) × 100
```

For a slot machine, this requires simulating all possible outcomes weighted by their probability.

## Solution

### 1. Create RTP Calculation Utility

Add a new function to calculate theoretical RTP based on:
- Symbol weights (probability of appearing)
- Symbol multipliers (payouts)
- Pay line patterns
- Bet amount (normalized to 1)

The calculation will:
1. For each pay line, calculate the probability of each winning combination (2x, 3x, 4x, 5x matches)
2. Multiply probability by payout
3. Sum all expected returns
4. Calculate as percentage of total wagered

### 2. Add RTP Display to Admin Panel

Add an RTP card to the probability overview section showing:
- Calculated theoretical RTP percentage
- Color-coded indicator (green if healthy 90-96%, yellow if outside range)
- Brief explanation of what RTP means

### 3. Update Edit Dialog

Show how changing a symbol's weight or multipliers affects the overall RTP in real-time.

## Technical Implementation

### New File: src/lib/slotRTPCalculation.ts

```text
Purpose: Calculate theoretical RTP based on symbol configuration
```

Key functions:
- `calculateSymbolProbability()` - Calculate chance of a symbol appearing in a position
- `calculateLineProbability()` - Calculate probability of getting N consecutive symbols
- `calculateTheoreticalRTP()` - Main function to compute overall RTP

### Calculation Formula

For each symbol and each pay line:

```text
P(symbol appears) = symbol.weight / totalWeight
P(N consecutive matches) = P(symbol)^N × (1 - P(symbol)) for interrupted chains
                          + P(symbol)^5 for 5-of-a-kind

Expected payout = Σ (probability × multiplier × bet)
RTP = (Expected payout / Total bet) × 100
```

Premium symbols (2+ wins) and scatter mechanics will be factored in.

### Changes to SlotMachineAdminSection.tsx

1. Import the RTP calculation utility
2. Add an RTP display card in the `SymbolsTab` component
3. Show real-time RTP updates when viewing probability overview
4. Add RTP preview to the `EditSymbolDialog` when changing weights/multipliers

## Files Changed

| File | Change |
|------|--------|
| `src/lib/slotRTPCalculation.ts` | NEW - RTP calculation logic |
| `src/components/SlotMachineAdminSection.tsx` | Add RTP display card and real-time updates |

## UI Design

### RTP Overview Card (in SymbolsTab)

```text
┌─────────────────────────────────────────┐
│ 📊 Teoretisk RTP                        │
├─────────────────────────────────────────┤
│                                         │
│    ┌─────────────────┐                  │
│    │     94.52%      │  ← Large number  │
│    │  Return to Player│                 │
│    └─────────────────┘                  │
│                                         │
│  Dette er den forventede tilbagebe-     │
│  talingsprocent baseret på symbolernes  │
│  vægte og multiplikatorer.              │
│                                         │
│  Industri standard: 92-96%              │
└─────────────────────────────────────────┘
```

### RTP in Edit Dialog

When editing a symbol, show:
- Current theoretical RTP
- Projected RTP if changes are saved
- Delta (increase/decrease)

## Verification: Weights Apply to Game

To confirm weights are already being applied:

1. `useSlotSymbols` hook (line 1-20) fetches symbols with weights from database
2. `slotGameLogic.ts getRandomSymbol()` (lines 114-138) uses `symbol.weight` for probability
3. `useSlotSymbolsAdmin.updateSymbol` (lines 17-30) updates database and invalidates query
4. Query invalidation causes `useSlotSymbols` to refetch, updating game

**The system already works correctly** - no changes needed for weight application.

## Summary

This implementation adds a theoretical RTP calculator that:
1. Shows admins the expected return percentage based on current configuration
2. Updates in real-time as weights and multipliers are changed
3. Helps balance the game by showing the impact of configuration changes
4. Confirms the existing weight system is working correctly

