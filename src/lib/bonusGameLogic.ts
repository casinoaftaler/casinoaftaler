import type { SlotSymbol, SpinResult, LineWin } from "./slotGameLogic";
import { PAY_LINES } from "./slotGameLogic";

/**
 * Apply expanding symbol logic to the grid.
 * In Book of Ra style bonus: when the expanding symbol appears on ANY reel,
 * it expands to fill the entire reel. Wins are then calculated.
 * The key difference: expanded symbols count as matches regardless of position,
 * so having the expanding symbol on reels 1, 3, and 5 still creates a 3-of-a-kind win.
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
  
  // If expanding symbol appears on at least 3 reels, always expand (Book of Ra rules)
  // Even if not consecutive, 3 reels with the symbol = guaranteed win
  if (reelsWithExpanding.length >= 3) {
    // Expand the symbol on all reels where it appears
    for (const col of reelsWithExpanding) {
      for (let row = 0; row < 3; row++) {
        expandedGrid[col][row] = expandingSymbol.id;
      }
    }
  } else if (reelsWithExpanding.length >= 1) {
    // For 1-2 reels, only expand if it helps create a win on pay lines
    const wouldCreateWin = checkIfExpandingCreatesPaylineWin(
      grid,
      reelsWithExpanding,
      expandingSymbol,
      symbols
    );
    
    if (wouldCreateWin) {
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
 * Check if expanding would create a win on standard pay lines (consecutive from left)
 */
function checkIfExpandingCreatesPaylineWin(
  grid: string[][],
  reelsWithExpanding: number[],
  expandingSymbol: SlotSymbol,
  symbols: SlotSymbol[]
): boolean {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  
  // Create a hypothetical expanded grid
  const hypotheticalGrid = grid.map(col => [...col]);
  for (const col of reelsWithExpanding) {
    for (let row = 0; row < 3; row++) {
      hypotheticalGrid[col][row] = expandingSymbol.id;
    }
  }
  
  // Check each pay line for wins
  for (const linePattern of PAY_LINES) {
    const lineSymbols = linePattern.map((row, col) => {
      const symbolId = hypotheticalGrid[col][row];
      return symbolsById.get(symbolId);
    });
    
    let baseSymbol = lineSymbols.find(s => s && !s.is_wild && s.id !== expandingSymbol.id);
    if (!baseSymbol) {
      baseSymbol = expandingSymbol;
    }
    
    let consecutiveMatches = 0;
    for (let col = 0; col < 5; col++) {
      const symbol = lineSymbols[col];
      if (!symbol) break;
      
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
  const wins = calculateWins(expandedGrid, symbols, betAmount, expandingSymbol);
  
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
  betAmount: number,
  expandingSymbol?: SlotSymbol
): LineWin[] {
  const wins: LineWin[] = [];
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  
  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => grid[col][row]);
    const lineSymbolData = lineSymbols.map(id => symbolsById.get(id)!);
    
    // Find the first non-wild symbol (expanding symbol acts as wild during bonus)
    let baseSymbol = lineSymbolData.find(s => 
      !s.is_wild && (!expandingSymbol || s.id !== expandingSymbol.id)
    );
    
    // If all symbols are wild/expanding, use the expanding symbol as base
    if (!baseSymbol) {
      baseSymbol = expandingSymbol || lineSymbolData[0];
    }
    
    // Count consecutive matching symbols from left
    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = lineSymbolData[i];
      const isMatch = 
        current.id === baseSymbol.id || 
        current.is_wild ||
        (expandingSymbol && current.id === expandingSymbol.id);
      
      if (isMatch) {
        count++;
        // Update base if we started with wild/expanding
        if ((baseSymbol.is_wild || (expandingSymbol && baseSymbol.id === expandingSymbol.id)) && 
            !current.is_wild && 
            (!expandingSymbol || current.id !== expandingSymbol.id)) {
          baseSymbol = current;
        }
      } else {
        break;
      }
    }
    
    if (count >= 3) {
      // Use expanding symbol's multipliers if that's what we're paying
      const payingSymbol = (expandingSymbol && baseSymbol.id === expandingSymbol.id) 
        ? expandingSymbol 
        : baseSymbol;
      
      let multiplier = 0;
      if (count === 3) multiplier = payingSymbol.multiplier_3;
      else if (count === 4) multiplier = payingSymbol.multiplier_4;
      else if (count === 5) multiplier = payingSymbol.multiplier_5;
      
      wins.push({
        lineIndex,
        symbolId: payingSymbol.id,
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
