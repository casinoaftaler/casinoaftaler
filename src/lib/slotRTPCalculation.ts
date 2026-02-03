import type { SlotSymbol } from "./slotGameLogic";
import { PAY_LINES } from "./slotGameLogic";

/**
 * Calculate the probability of a symbol appearing in a single position
 */
export function calculateSymbolProbability(
  symbol: SlotSymbol,
  allSymbols: SlotSymbol[]
): number {
  const totalWeight = allSymbols.reduce((sum, s) => sum + (s.weight || 0), 0);
  if (totalWeight === 0) return 0;
  return (symbol.weight || 0) / totalWeight;
}

/**
 * Calculate the probability of getting exactly N consecutive matches of a symbol
 * For N < 5: P(symbol)^N × P(not symbol)
 * For N = 5: P(symbol)^5
 */
function calculateConsecutiveProbability(
  symbolProb: number,
  matchCount: number
): number {
  if (matchCount === 5) {
    // 5 in a row (no interruption needed)
    return Math.pow(symbolProb, 5);
  }
  // N matches followed by a non-match
  return Math.pow(symbolProb, matchCount) * (1 - symbolProb);
}

/**
 * Calculate the expected return for a single symbol across all paylines
 */
function calculateSymbolExpectedReturn(
  symbol: SlotSymbol,
  symbolProb: number,
  numPaylines: number
): number {
  let expectedReturn = 0;

  // Premium symbols can win with 2+ matches
  const minMatches = symbol.rarity === "premium" ? 2 : 3;

  for (let matchCount = minMatches; matchCount <= 5; matchCount++) {
    let multiplier = 0;
    if (matchCount === 2 && symbol.rarity === "premium") {
      multiplier = symbol.multiplier_2 || 0;
    } else if (matchCount === 3) {
      multiplier = symbol.multiplier_3 || 0;
    } else if (matchCount === 4) {
      multiplier = symbol.multiplier_4 || 0;
    } else if (matchCount === 5) {
      multiplier = symbol.multiplier_5 || 0;
    }

    if (multiplier > 0) {
      const probability = calculateConsecutiveProbability(symbolProb, matchCount);
      expectedReturn += probability * multiplier * numPaylines;
    }
  }

  return expectedReturn;
}

/**
 * Calculate scatter expected return (scatters pay anywhere on grid)
 * 3+ scatters trigger bonus and have payouts
 */
function calculateScatterExpectedReturn(
  scatterSymbol: SlotSymbol,
  scatterProb: number
): number {
  // Total positions on grid: 5 reels × 3 rows = 15
  const totalPositions = 15;
  let expectedReturn = 0;

  // Calculate probability of getting exactly K scatters using binomial distribution
  // P(K scatters) = C(15, K) × p^K × (1-p)^(15-K)
  for (let k = 3; k <= 5; k++) {
    const combinations = binomialCoefficient(totalPositions, k);
    const probability =
      combinations *
      Math.pow(scatterProb, k) *
      Math.pow(1 - scatterProb, totalPositions - k);

    let multiplier = 0;
    if (k === 3) multiplier = scatterSymbol.multiplier_3 || 0;
    else if (k === 4) multiplier = scatterSymbol.multiplier_4 || 0;
    else if (k >= 5) multiplier = scatterSymbol.multiplier_5 || 0;

    expectedReturn += probability * multiplier;
  }

  return expectedReturn;
}

/**
 * Binomial coefficient C(n, k) = n! / (k! × (n-k)!)
 */
function binomialCoefficient(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;

  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return result;
}

export interface RTPResult {
  totalRTP: number;
  lineRTP: number;
  scatterRTP: number;
  bonusRTP: number;
  symbolBreakdown: Array<{
    symbol: SlotSymbol;
    contribution: number;
  }>;
}

/**
 * Calculate the theoretical RTP (Return to Player) percentage
 * 
 * RTP = (Expected Winnings / Total Wagered) × 100
 * 
 * This considers:
 * - Symbol weights (probability of appearing)
 * - Symbol multipliers (payouts for 2, 3, 4, 5 matches)
 * - Number of paylines
 * - Premium vs common symbol minimum matches
 * - Scatter mechanics
 */
/**
 * Calculate the expected return of a single bonus spin with expanding symbol
 * The expanding symbol fills entire reels when it appears, dramatically increasing win potential
 */
function calculateBonusSpinExpectedReturn(
  symbols: SlotSymbol[],
  numPaylines: number
): number {
  // In bonus, one symbol is randomly selected to expand
  // Average across all possible expanding symbols
  const nonScatterSymbols = symbols.filter(s => !s.is_scatter);
  let totalExpectedReturn = 0;
  
  for (const expandingSymbol of nonScatterSymbols) {
    const symbolProb = calculateSymbolProbability(expandingSymbol, symbols);
    
    // Probability that symbol appears on exactly k reels (out of 5)
    // Each reel has 3 positions, P(symbol on reel) = 1 - (1-p)^3
    const probOnReel = 1 - Math.pow(1 - symbolProb, 3);
    
    let symbolExpectedReturn = 0;
    
    // For 3, 4, 5 reels with expanding symbol (pays on ALL 10 lines)
    for (let k = 3; k <= 5; k++) {
      const combinations = binomialCoefficient(5, k);
      const probability = combinations * Math.pow(probOnReel, k) * Math.pow(1 - probOnReel, 5 - k);
      
      let multiplier = 0;
      if (k === 3) multiplier = expandingSymbol.multiplier_3 || 0;
      else if (k === 4) multiplier = expandingSymbol.multiplier_4 || 0;
      else if (k === 5) multiplier = expandingSymbol.multiplier_5 || 0;
      
      // Expanding symbol pays on ALL paylines when it fills 3+ reels
      symbolExpectedReturn += probability * multiplier * numPaylines;
    }
    
    // Each non-scatter symbol has equal chance of being selected as expanding
    totalExpectedReturn += symbolExpectedReturn / nonScatterSymbols.length;
  }
  
  // Also add base game wins from non-expanding symbols (reduced since expanding takes priority)
  // Approximate: ~30% of base game RTP during bonus from non-expanding symbols
  const baseLineRTP = symbols
    .filter(s => !s.is_scatter)
    .reduce((sum, symbol) => {
      const prob = calculateSymbolProbability(symbol, symbols);
      return sum + calculateSymbolExpectedReturn(symbol, prob, numPaylines);
    }, 0);
  
  totalExpectedReturn += baseLineRTP * 0.3;
  
  return totalExpectedReturn;
}

/**
 * Calculate the bonus round's contribution to RTP
 * Bonus triggers on 3+ scatters, awards 10 free spins with expanding symbol
 */
function calculateBonusRTP(
  symbols: SlotSymbol[],
  numPaylines: number
): number {
  const scatterSymbol = symbols.find(s => s.is_scatter);
  if (!scatterSymbol) return 0;
  
  const scatterProb = calculateSymbolProbability(scatterSymbol, symbols);
  const totalPositions = 15; // 5 reels × 3 rows
  
  // Calculate probability of getting 3+ scatters (bonus trigger)
  let triggerProbability = 0;
  for (let k = 3; k <= totalPositions; k++) {
    const combinations = binomialCoefficient(totalPositions, k);
    triggerProbability += combinations * Math.pow(scatterProb, k) * Math.pow(1 - scatterProb, totalPositions - k);
  }
  
  // Expected bonus spins (10 base + retrigger potential)
  // Retriggers are 10x harder (0.1 scatter weight), so expected retriggers ≈ 0.1
  const expectedSpins = 10 * (1 + 0.1);
  
  // Expected return per bonus spin
  const bonusSpinReturn = calculateBonusSpinExpectedReturn(symbols, numPaylines);
  
  // Total bonus RTP contribution
  return triggerProbability * expectedSpins * bonusSpinReturn;
}

export function calculateTheoreticalRTP(symbols: SlotSymbol[]): RTPResult {
  const numPaylines = PAY_LINES.length; // 10 paylines
  
  // Filter out scatter symbols for line wins (they have their own calculation)
  const lineSymbols = symbols.filter((s) => !s.is_scatter);
  const scatterSymbol = symbols.find((s) => s.is_scatter);

  let lineRTP = 0;
  const symbolBreakdown: RTPResult["symbolBreakdown"] = [];

  // Calculate line win RTP for each symbol
  for (const symbol of lineSymbols) {
    const prob = calculateSymbolProbability(symbol, symbols);
    const expectedReturn = calculateSymbolExpectedReturn(symbol, prob, numPaylines);
    lineRTP += expectedReturn;
    
    symbolBreakdown.push({
      symbol,
      contribution: expectedReturn * 100,
    });
  }

  // Calculate scatter RTP (direct payouts only)
  let scatterRTP = 0;
  if (scatterSymbol) {
    const scatterProb = calculateSymbolProbability(scatterSymbol, symbols);
    scatterRTP = calculateScatterExpectedReturn(scatterSymbol, scatterProb);
    
    symbolBreakdown.push({
      symbol: scatterSymbol,
      contribution: scatterRTP * 100,
    });
  }

  // Calculate bonus round RTP contribution
  const bonusRTP = calculateBonusRTP(symbols, numPaylines);

  // Total RTP as percentage
  const totalRTP = (lineRTP + scatterRTP + bonusRTP) * 100;

  return {
    totalRTP,
    lineRTP: lineRTP * 100,
    scatterRTP: scatterRTP * 100,
    bonusRTP: bonusRTP * 100,
    symbolBreakdown: symbolBreakdown.sort((a, b) => b.contribution - a.contribution),
  };
}

/**
 * Calculate RTP with modified symbol data (for preview in edit dialog)
 */
export function calculateRTPWithModifiedSymbol(
  symbols: SlotSymbol[],
  modifiedSymbol: Partial<SlotSymbol> & { id: string }
): RTPResult {
  const modifiedSymbols = symbols.map((s) =>
    s.id === modifiedSymbol.id ? { ...s, ...modifiedSymbol } : s
  );
  return calculateTheoreticalRTP(modifiedSymbols);
}
