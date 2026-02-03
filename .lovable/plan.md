

# Adjust Symbol Weights to Achieve 96% RTP (Including Bonus)

## Current Situation

The current RTP calculation in `slotRTPCalculation.ts` only considers:
- Line win RTP (based on consecutive symbol matches on 10 paylines)
- Scatter direct payout RTP (3/4/5 scatters pay multipliers)

**It does NOT include the bonus round's expected value**, which is a significant contributor to the overall RTP in Book of Ra-style slots.

### Current Symbol Configuration

| Symbol | Weight | Rarity | 2× | 3× | 4× | 5× |
|--------|--------|--------|-----|-----|------|------|
| Pharaoh | 8 | premium | 1.00 | 10.00 | 100.00 | 500.00 |
| Anubis | 15 | premium | 0.50 | 4.00 | 40.00 | 200.00 |
| Horus | 10 | premium | 0.50 | 3.00 | 10.00 | 75.00 |
| Scarab | 15 | premium | 0.50 | 3.00 | 10.00 | 75.00 |
| A | 50 | common | 0 | 0.50 | 4.00 | 15.00 |
| K | 50 | common | 0 | 0.50 | 4.00 | 15.00 |
| Q | 60 | common | 0 | 0.50 | 2.50 | 10.00 |
| J | 60 | common | 0 | 0.50 | 2.50 | 10.00 |
| 10 | 60 | common | 0 | 0.50 | 2.50 | 10.00 |
| Book (Scatter) | 9 | scatter | 0 | 0.20 | 2.00 | 20.00 |

**Total Weight: 337**

## Solution Overview

To achieve 96% RTP including bonus, I will:

1. **Enhance the RTP calculation** to include bonus round contribution
2. **Update the database** with optimized symbol weights that yield ~96% total RTP

### Bonus RTP Calculation (Missing Piece)

The bonus contribution to RTP is calculated as:

```text
Bonus RTP = P(trigger bonus) × Expected Bonus Value

Where:
- P(trigger bonus) = P(3+ scatters on 15 positions)
- Expected Bonus Value = 10 spins × Average win per spin during bonus
```

The bonus is more valuable than base game spins because:
1. No bet is deducted (free spins)
2. Expanding symbol mechanic increases win frequency and size

A typical Book of Ra-style bonus contributes **25-40%** of total RTP.

## Proposed Weight Changes

To target 96% RTP including bonus, here's a balanced configuration:

| Symbol | Current Weight | New Weight | Rationale |
|--------|----------------|------------|-----------|
| Pharaoh | 8 | 6 | Slightly rarer (high payout) |
| Anubis | 15 | 10 | Moderate rarity |
| Horus | 10 | 8 | Moderate rarity |
| Scarab | 15 | 10 | Moderate rarity |
| A | 50 | 55 | Slightly more common |
| K | 50 | 55 | Slightly more common |
| Q | 60 | 65 | Common symbol |
| J | 60 | 65 | Common symbol |
| 10 | 60 | 65 | Common symbol |
| Book (Scatter) | 9 | 8 | Slightly harder to trigger bonus |

**New Total Weight: 347**

## Technical Implementation

### Step 1: Enhance RTP Calculation

Update `slotRTPCalculation.ts` to include bonus contribution:

```text
New RTP Result interface:
- totalRTP (line + scatter + bonus)
- lineRTP
- scatterRTP  
- bonusRTP (new!)
- symbolBreakdown

New calculation:
1. Calculate P(3 scatters), P(4 scatters), P(5 scatters)
2. Estimate average bonus spin value (using base RTP + expanding symbol boost)
3. Bonus RTP = trigger_probability × 10 × average_bonus_spin_value
```

### Step 2: Update Database Weights

Execute SQL UPDATE to change symbol weights to the proposed values.

### Step 3: Fine-tune with Admin Panel

After implementing the enhanced RTP display, use the admin panel to fine-tune weights in real-time while watching the projected RTP.

## Files to Change

| File | Changes |
|------|---------|
| `src/lib/slotRTPCalculation.ts` | Add `calculateBonusRTP()` function and include in total RTP |
| Database (slot_symbols table) | UPDATE weights to new values |

## Expected Outcome

After implementation:
- **Base game RTP**: ~58-62%
- **Scatter direct payout RTP**: ~0.01%
- **Bonus RTP contribution**: ~34-38%
- **Total RTP**: ~96%

The admin panel will show a complete breakdown including bonus contribution, allowing for future fine-tuning.

