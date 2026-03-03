

# Fedesvin Bonanza RTP Tuning Plan

## Current State (100K spin baseline)
- **RTP: 177.47%** (target: 97%)
- Base RTP: 74.8%, Bonus RTP: 102.67%
- Bonus frequency: 1 in 67 (target: 1 in 100)
- Biggest win: 1,435x
- Root cause: DUP2=0.8 + DUP3=0.2 = **100% duplication rate** on every column

## Approach

### Step 1: Rewrite the simulation edge function

The current function caps at 100K spins and lacks key metrics. Rewrite `bonanza-rtp-sim` to:

- Accept **parameter overrides** in the request body (so we can test configs without touching the DB)
- Support up to **2,000,000 spins per call** (edge function ~60s budget)
- Track **hit frequency** (spins that pay anything)
- Track **bonus win distribution** in buckets (5-30x, 30-100x, 100-300x, 300-1000x, 1000x+)
- Track **max win** and **win variance**
- Support a `batch` mode: run 5 calls of 2M each to reach 10M total, aggregate client-side

### Step 2: Mathematically-guided parameter tuning

Based on the 177% RTP analysis, the primary levers and target ranges:

| Parameter | Current | Target Range | Effect |
|-----------|---------|-------------|--------|
| reel_dup_2_chance | 0.80 | 0.12-0.18 | Largest RTP driver |
| reel_dup_3_chance | 0.20 | 0.02-0.04 | Secondary RTP driver |
| scatter weight | 7 | 5-6 | Controls bonus freq |
| bomb chance (bonus) | 0.04 | 0.06-0.08 | Bonus volatility |
| multiplier_weights | heavy on 2x,3x | shift toward higher values | Bonus win shape |
| Symbol multipliers | current | reduce ~30-40% | Base game RTP |

The tuning loop:
1. Start with drastically reduced dup rates (0.15 / 0.03) and ~30% lower symbol multipliers
2. Run 2M spin sim, check RTP/hit-freq/bonus-freq
3. Adjust and re-run until within targets
4. Once close, run full 10M (5x2M batches) for statistical confidence
5. Verify bonus win distribution buckets match targets

### Step 3: Apply tuned parameters

Once verified at 10M spins:
- Update `site_settings` table with new dup/scatter/bomb/multiplier settings
- Update `slot_symbols` table with new weights and multipliers
- Run one final 10M verification sim

### Step 4: Add a simple admin UI trigger

Add a "Run RTP Simulation" button to the existing `BonanzaGameSettingsAdmin` component that calls the enhanced edge function with current DB settings and displays results (RTP, hit freq, bonus freq, win distribution).

## Technical Details

**Edge function changes** (`bonanza-rtp-sim/index.ts`):
- Accept `overrides` object: `{ weights: {}, settings: {}, multipliers: {} }`
- Add counters: `hitCount`, `bonusWinBuckets[5]`, `winDistribution`
- Increase max spins to 2,000,000
- Return extended stats object

**Client-side aggregation**: A helper function runs 5 sequential calls of 2M spins each with different seeds, then computes weighted averages for RTP and merges distribution histograms.

**Estimated parameter targets** (mathematical estimate, to be refined by simulation):
- DUP2: ~0.15, DUP3: ~0.03
- Scatter weight: 5 (base), 3 (bonus) → bonus freq ~1 in 100
- Bomb chance: 0.07 during bonus
- Symbol multipliers reduced ~35% across the board
- Multiplier weight distribution shifted: more weight on 2x-5x, less on 50x-100x

