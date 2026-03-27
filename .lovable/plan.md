

# Plan: Add End Balance / Result to Stats Tab and GTW Tab

## Problem
The Stats tab shows Start Balance, Target Balance, and End Balance but doesn't clearly present the **hunt result** (profit/loss). The GTW tab has no visibility into how the hunt ended, making it hard for users to see the actual end balance their guesses were measured against.

## Changes

### 1. Stats Tab — Add "Resultat" (Profit/Loss) row
**File:** `src/components/bonus-hunt/BonusHuntStatsTab.tsx`

- Add a new `StatRow` after "End Balance" (line 102) showing the profit/loss:
  - Label: "Resultat" with a `TrendingUp`/`TrendingDown` icon
  - Value: `endBalance - startBalance` formatted as `+X kr` or `-X kr`
  - Highlight green if positive, red/muted if negative
  - Only show when `endBalance` is not null (hunt is finished)

### 2. GTW Tab — Add Hunt Result card
**File:** `src/components/bonus-hunt/BonusHuntGTWTab.tsx`

- Pass `huntData` (or just `endBalance` + `startBalance`) as new props from `BonusHunt.tsx`
- Add a prominent result card at the top (above user status cards) when the hunt is settled, showing:
  - **End Balance** (the actual final number users were guessing)
  - This makes it immediately clear what the correct answer was

### 3. Wire new props
**File:** `src/pages/BonusHunt.tsx`

- Pass `endBalance={huntData?.stats?.endBalance}` and `startBalance={huntData?.stats?.startBalance}` to `BonusHuntGTWTab`

## Technical Details
- `endBalance` and `startBalance` are already available in `BonusHuntData.stats`
- Profit/loss = `endBalance - startBalance` (simple subtraction)
- Conditional rendering: only show result when `endBalance !== null`
- GTW tab: show end balance in a highlighted card so participants can compare their guess vs actual

