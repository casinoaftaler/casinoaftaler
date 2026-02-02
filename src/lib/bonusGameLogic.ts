import type { SlotSymbol, SpinResult, LineWin } from "./slotGameLogic";
import { PAY_LINES } from "./slotGameLogic";

/**
 * Apply expanding symbol logic to the grid.
 * When the expanding symbol appears and can create a win, it expands to fill the entire reel.
 */
export function applyExpandingSymbol(
  grid: string[][],
  expandingSymbol: SlotSymbol,
  symbols: SlotSymbol[]
): string[][] {
  // Create a copy of the grid
  const expandedGrid = grid.map(col => [...col]);
  
  // Check each reel for the expanding symbol
  const reelsWithExpanding: number[] = [];
  
  for (let col = 0; col < 5; col++) {
    const hasExpandingSymbol = grid[col].some(
      symbolId => symbolId === expandingSymbol.id
    );
    if (hasExpandingSymbol) {
      reelsWithExpanding.push(col);
    }
  }
  
  // If we have expanding symbols on at least 3 reels (or 2 with potential), expand them
  if (reelsWithExpanding.length >= 1) {
    // Check if expanding would create a win
    const wouldCreateWin = checkIfExpandingCreatesWin(
      grid,
      reelsWithExpanding,
      expandingSymbol,
      symbols
    );
    
    if (wouldCreateWin) {
      // Expand the symbol on all reels where it appears
      for (const col of reelsWithExpanding) {
        for (let row = 0; row < 3; row++) {
          expandedGrid[col][row] = expandingSymbol.id;
        }
      }
    }
  }
  
  return expandedGrid;
}

/**
 * Check if expanding the symbol would create at least one winning line.
 * The expanding symbol can contribute to wins on ANY reel position.
 */
function checkIfExpandingCreatesWin(
  grid: string[][],
  reelsWithExpanding: number[],
  expandingSymbol: SlotSymbol,
  symbols: SlotSymbol[]
): boolean {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  
  // Create a hypothetical expanded grid - expand on ALL reels where the symbol appears
  const hypotheticalGrid = grid.map(col => [...col]);
  for (const col of reelsWithExpanding) {
    for (let row = 0; row < 3; row++) {
      hypotheticalGrid[col][row] = expandingSymbol.id;
    }
  }
  
  // Check each pay line for wins
  for (const linePattern of PAY_LINES) {
    // Get all symbols on this line
    const lineSymbols = linePattern.map((row, col) => {
      const symbolId = hypotheticalGrid[col][row];
      return symbolsById.get(symbolId);
    });
    
    // Find the first non-wild, non-expanding symbol to use as base
    // If all are expanding/wild, use the expanding symbol as base
    let baseSymbol = lineSymbols.find(s => s && !s.is_wild && s.id !== expandingSymbol.id);
    if (!baseSymbol) {
      baseSymbol = expandingSymbol;
    }
    
    // Count consecutive matches from the left
    let consecutiveMatches = 0;
    for (let col = 0; col < 5; col++) {
      const symbol = lineSymbols[col];
      if (!symbol) break;
      
      // Symbol matches if:
      // 1. It's the base symbol
      // 2. It's the expanding symbol (which acts like wild in bonus)
      // 3. It's a wild symbol
      const isMatch = 
        symbol.id === baseSymbol.id || 
        symbol.id === expandingSymbol.id ||
        symbol.is_wild;
      
      if (isMatch) {
        consecutiveMatches++;
      } else {
        break;
      }
    }
    
    // A win requires at least 3 consecutive matches from the left
    if (consecutiveMatches >= 3) {
      return true;
    }
  }
  
  return false;
}

/**
 * Calculate bonus spin result with expanding symbol logic
 */
export function calculateBonusSpinResult(
  originalGrid: string[][],
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbol: SlotSymbol
): { 
  result: SpinResult; 
  expandedGrid: string[][]; 
  didExpand: boolean;
  expandedReels: number[];
} {
  // Apply expanding symbol logic
  const expandedGrid = applyExpandingSymbol(originalGrid, expandingSymbol, symbols);
  
  // Check which reels expanded
  const expandedReels: number[] = [];
  for (let col = 0; col < 5; col++) {
    const originalHasExpanding = originalGrid[col].some(id => id === expandingSymbol.id);
    const allExpanded = expandedGrid[col].every(id => id === expandingSymbol.id);
    if (originalHasExpanding && allExpanded) {
      expandedReels.push(col);
    }
  }
  
  const didExpand = expandedReels.length > 0;
  
  // Calculate wins on the expanded grid
  const wins = calculateWins(expandedGrid, symbols, betAmount);
  
  // Count scatters for potential retrigger
  const scatterSymbol = symbols.find(s => s.is_scatter);
  let scatterCount = 0;
  if (scatterSymbol) {
    for (const column of originalGrid) {
      for (const symbolId of column) {
        if (symbolId === scatterSymbol.id) scatterCount++;
      }
    }
  }
  
  // Calculate scatter payout
  let scatterPayout = 0;
  if (scatterSymbol && scatterCount >= 3) {
    if (scatterCount === 3) scatterPayout = scatterSymbol.multiplier_3 * betAmount;
    else if (scatterCount === 4) scatterPayout = scatterSymbol.multiplier_4 * betAmount;
    else if (scatterCount === 5) scatterPayout = scatterSymbol.multiplier_5 * betAmount;
  }
  
  const totalWin = wins.reduce((sum, w) => sum + w.payout, 0) + scatterPayout;
  
  return {
    result: {
      grid: expandedGrid,
      wins,
      totalWin,
      bonusTriggered: scatterCount >= 3, // Retrigger
      scatterCount,
    },
    expandedGrid,
    didExpand,
    expandedReels,
  };
}

function calculateWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): LineWin[] {
  const wins: LineWin[] = [];
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const wildSymbol = symbols.find(s => s.is_wild);
  
  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => grid[col][row]);
    const lineSymbolData = lineSymbols.map(id => symbolsById.get(id)!);
    
    // Find the first non-wild symbol
    let baseSymbol = lineSymbolData.find(s => !s.is_wild) || lineSymbolData[0];
    
    // Count consecutive matching symbols
    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = lineSymbolData[i];
      if (current.id === baseSymbol.id || current.is_wild || baseSymbol.is_wild) {
        count++;
        if (baseSymbol.is_wild && !current.is_wild) {
          baseSymbol = current;
        }
      } else {
        break;
      }
    }
    
    if (count >= 3) {
      let multiplier = 0;
      if (count === 3) multiplier = baseSymbol.multiplier_3;
      else if (count === 4) multiplier = baseSymbol.multiplier_4;
      else if (count === 5) multiplier = baseSymbol.multiplier_5;
      
      wins.push({
        lineIndex,
        symbolId: baseSymbol.id,
        count,
        payout: multiplier * betAmount,
      });
    }
  }
  
  return wins;
}

/**
 * Get the positions that should show expansion animation
 */
export function getExpandedPositions(
  expandedReels: number[]
): { col: number; row: number }[] {
  const positions: { col: number; row: number }[] = [];
  for (const col of expandedReels) {
    for (let row = 0; row < 3; row++) {
      positions.push({ col, row });
    }
  }
  return positions;
}
