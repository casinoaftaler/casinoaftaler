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

  // Calculate scatter RTP
  let scatterRTP = 0;
  if (scatterSymbol) {
    const scatterProb = calculateSymbolProbability(scatterSymbol, symbols);
    scatterRTP = calculateScatterExpectedReturn(scatterSymbol, scatterProb);
    
    symbolBreakdown.push({
      symbol: scatterSymbol,
      contribution: scatterRTP * 100,
    });
  }

  // Total RTP as percentage
  const totalRTP = (lineRTP + scatterRTP) * 100;

  return {
    totalRTP,
    lineRTP: lineRTP * 100,
    scatterRTP: scatterRTP * 100,
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
