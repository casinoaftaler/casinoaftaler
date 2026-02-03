
# Fix Symbol Weights: 10 and J Are Too Rare

## The Bug

The `SYMBOL_WEIGHTS` configuration in `slotGameLogic.ts` is missing entries for **J** and **10** symbols. When a symbol name isn't found, the code defaults to weight 10:

```typescript
const baseWeight = SYMBOL_WEIGHTS[s.name] || 10;  // Default of 10 is very low!
```

This means J and 10 have the same spawn rate as premium symbols like Horus and Scarab.

## Current vs Desired Probabilities

### Current (Broken)

| Symbol | Weight | Chance | Status |
|--------|--------|--------|--------|
| 10 | 10 (default) | ~4% | Too rare |
| J | 10 (default) | ~4% | Too rare |
| Q | 60 | ~27% | OK |
| K | 55 | ~24% | OK |
| A | 50 | ~22% | OK |
| Scarab | 15 | ~7% | OK |
| Horus | 12 | ~5% | OK |
| Anubis | 8 | ~4% | OK |
| Pharaoh | 5 | ~2% | OK |
| Scatter | 1 | ~0.4% | OK |

### Corrected Weights

Based on your requirements (10 and J most common, K and A slightly less common, premiums rare):

| Symbol | New Weight | New Chance | Category |
|--------|------------|------------|----------|
| **10** | 70 | ~22% | Most common |
| **J** | 70 | ~22% | Most common |
| Q | 60 | ~19% | Common |
| K | 50 | ~16% | Slightly less common |
| A | 45 | ~14% | Slightly less common |
| Scarab | 8 | ~2.5% | Premium (rare) |
| Horus | 6 | ~1.9% | Premium (rare) |
| Anubis | 4 | ~1.3% | Premium (rare) |
| Pharaoh | 2 | ~0.6% | Premium (most rare) |
| Scatter | 1 | ~0.3% | Scatter |

**Total: 316 weight units**

## Changes Required

### File: `src/lib/slotGameLogic.ts`

Update the `SYMBOL_WEIGHTS` object to:
1. Remove Isis and Ankh (not in database)
2. Add J and 10 with highest weights
3. Rebalance all weights for desired distribution

```typescript
export const SYMBOL_WEIGHTS: Record<string, number> = {
  // Premium symbols (rare)
  'Pharaoh': 2,   // Most rare premium (~0.6%)
  'Anubis': 4,    // (~1.3%)
  'Horus': 6,     // (~1.9%)
  'Scarab': 8,    // (~2.5%)
  // Common symbols - K and A slightly less common
  'A': 45,        // (~14%)
  'K': 50,        // (~16%)
  // Common symbols - Q, J, 10 most common
  'Q': 60,        // (~19%)
  'J': 70,        // (~22%)
  '10': 70,       // (~22%)
  // Scatter (extremely rare)
  'Book': 1,      // (~0.3%)
  'Fedesvins Book': 1,  // Alternative scatter name
};
```

## Summary

| Issue | Fix |
|-------|-----|
| J missing from weights | Add with weight 70 |
| 10 missing from weights | Add with weight 70 |
| Isis/Ankh in weights but not in DB | Remove |
| Premium symbols too common relative to fix | Reduce weights to 2-8 |
| Scatter name mismatch | Add "Fedesvins Book" as alias |
