

# Fedesvin Bonanza RTP Tuning Plan

## ✅ Step 1: Enhanced Simulation Edge Function (DONE)
Rewrote `bonanza-rtp-sim` with:
- Parameter overrides (symbols, settings) in request body
- Up to 200K spins per call (edge function resource limit)
- Hit frequency, bonus win distribution buckets, variance tracking
- Deployed and working

## 🔄 Step 2: Parameter Tuning (IN PROGRESS)

### Best Configuration Found (RTP = 98.75% @ 200K spins)

| Parameter | Old Value | New Value |
|-----------|-----------|-----------|
| reel_dup_2_chance | 0.80 | **0.50** |
| reel_dup_3_chance | 0.20 | **0.10** |
| scatter weight (base) | 7 | **6.5** |
| scatter bonus_weight | 5 | **4** |
| multiplier_chance_bonus | 0.04 | **0.07** |
| multiplier_values | 2,3,5,10,15,25,50,100 | **2,3,5,8,10,15,25,50** (capped at 50) |
| multiplier_weights | 120,80,35,8,5,2,1,0.5 | **80,55,40,20,12,6,4,2** |
| free_spins_4 | 15 | **10** |
| free_spins_5 | 15 | **12** |
| free_spins_6 | 15 | **15** (unchanged) |

### Results at 200K spins
- **RTP: 98.75%** (target: 97% ± 0.05%)
- **Hit frequency: 30.54%** ✅ (target: 28-32%)
- **Bonus frequency: 1 in 99** ✅ (target: ~1 in 100)
- Base RTP: 47.22%, Bonus RTP: 51.53%
- Biggest win: 1,293x

### Bonus Win Distribution (vs targets)
| Bucket | Current | Target |
|--------|---------|--------|
| 0-5x | 5.91% | ~0% |
| 5-30x | 37.54% | 40% |
| 30-100x | 45.22% | 35% |
| 100-300x | 10.64% | 20% |
| 300-1000x | 0.64% | 4% |
| 1000x+ | 0.05% | 1% |

### Remaining Work
1. **Fine-tune RTP to exactly 97%**: Try DUP2=0.48 to reduce ~1.75%
2. **Improve bonus distribution**: 30-100x bucket too heavy (45% vs 35% target), need to shift more wins to 100-300x and 300-1000x buckets
3. **Run 10M spin verification**: 5 × 200K with different seeds, aggregate results
4. **Apply to database**: Update site_settings and slot_symbols tables
5. **Add admin UI**: Simulation button in BonanzaGameSettingsAdmin

## Tuning Log (100K-200K spin runs)
| Run | DUP2 | DUP3 | Scatter | Bomb% | Free Spins | RTP | Hit% | Bonus Freq |
|-----|------|------|---------|-------|------------|-----|------|------------|
| 1 | 0.15 | 0.03 | 7/5 | 0.04 | 15/15/15 | 57.4% | 22.0% | 1:86 |
| 2 | 0.35 | 0.08 | 7/5 | 0.04 | 15/15/15 | 89.5% | 27.7% | 1:77 |
| 3 | 0.40 | 0.10 | 5/3 | 0.04 | 15/15/15 | 60.8% | 29.5% | 1:238 |
| 4 | 0.38 | 0.08 | 6/4 | 0.08 | 15/15/15 | 79.3% | 28.0% | 1:131 |
| 5 | 0.45 | 0.12 | 6.5/4 | 0.10 | 15/15/15 | 124.6% | 30.8% | 1:88 |
| 6 | 0.42 | 0.09 | 6.5/4 | 0.06 | 15/15/15 | 85.9% | 29.2% | 1:95 |
| 7 | 0.48 | 0.10 | 6.5/4 | 0.08 | 15/15/15 | 132.6% | 30.3% | 1:93 |
| 8 | 0.55 | 0.12 | 6/4 | 0.08 | 12/15/15 | 111.1% | 32.3% | 1:121 |
| 9 | 0.50 | 0.10 | 6/4 | 0.06 | 10/12/15 | 77.4% | 30.9% | 1:115 |
| 10 | 0.55 | 0.12 | 6.5/4 | 0.08 | 10/12/15 | 101.9% | 32.1% | 1:94 |
| 11 | 0.52 | 0.10 | 6.5/4 | 0.07 | 10/12/15 | 99.2% | 31.0% | 1:93 |
| **12** | **0.50** | **0.10** | **6.5/4** | **0.07** | **10/12/15** | **98.75%** | **30.5%** | **1:99** |
