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
  
  // Check each pay line for wins WITH THE EXPANDING SYMBOL
  for (const linePattern of PAY_LINES) {
    const lineSymbols = linePattern.map((row, col) => {
      const symbolId = hypotheticalGrid[col][row];
      return symbolsById.get(symbolId);
    });
    
    // Only check if the EXPANDING SYMBOL creates a win
    // The first symbol on the line must be the expanding symbol
    // for the expansion to be worthwhile
    if (lineSymbols[0]?.id !== expandingSymbol.id) {
      continue; // Skip - not an expanding symbol win
    }
    
    let consecutiveMatches = 0;
    for (let col = 0; col < 5; col++) {
      const symbol = lineSymbols[col];
      if (!symbol) break;
      
      // Only match if it's the expanding symbol
      if (symbol.id === expandingSymbol.id) {
        consecutiveMatches++;
      } else {
        break;
      }
    }
    
    if (consecutiveMatches >= 3) {
      return true; // ✓ Expanding symbol itself creates a win
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
  const hasExpandingWin = expandedReels.length >= 3;
  
  // Calculate wins on the expanded grid
  // Pass expandedReels to enable scatter-style payout for expanding symbols
  // Pass hasExpandingWin to control wild substitution behavior
  const wins = calculateWins(expandedGrid, symbols, betAmount, expandingSymbol, expandedReels, hasExpandingWin);
  
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

/**
 * Calculate wins on the grid.
 * When an expanding symbol is present and has expanded to fill 3+ reels,
 * it pays on ALL lines as a scatter-style win (based on reel count, not consecutive from left).
 * When there is NO expanding win, the scatter/wild substitutes for other symbols.
 */
function calculateWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbol?: SlotSymbol,
  expandedReels?: number[],
  hasExpandingWin?: boolean
): LineWin[] {
  const wins: LineWin[] = [];
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  
  // Check if we have a scatter-style expanding symbol win
  // If expanding symbol fills 3+ reels, it pays on ALL lines based on reel count
  if (expandingSymbol && expandedReels && expandedReels.length >= 3) {
    const reelCount = expandedReels.length;
    let multiplier = 0;
    if (reelCount === 3) multiplier = expandingSymbol.multiplier_3;
    else if (reelCount === 4) multiplier = expandingSymbol.multiplier_4;
    else if (reelCount === 5) multiplier = expandingSymbol.multiplier_5;
    
    // Pay on ALL 10 lines since the expanded symbol fills entire reels
    for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
      wins.push({
        lineIndex,
        symbolId: expandingSymbol.id,
        count: reelCount,
        payout: multiplier * betAmount,
      });
    }
    
    return wins;
  }
  
  // Find the scatter/wild symbol for substitution (only when no expanding win)
  const scatterSymbol = symbols.find(s => s.is_scatter);
  const allowWildSubstitution = !hasExpandingWin && scatterSymbol;
  
  // Standard win calculation (consecutive from left)
  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => grid[col][row]);
    const lineSymbolData = lineSymbols.map(id => symbolsById.get(id)!);
    
    // Find the first non-scatter symbol as base (scatter acts as wild when allowed)
    let baseSymbol = lineSymbolData[0];
    if (allowWildSubstitution && baseSymbol.is_scatter) {
      // Find first non-scatter to use as base
      const nonScatter = lineSymbolData.find(s => !s.is_scatter);
      if (nonScatter) {
        baseSymbol = nonScatter;
      }
    }
    
    // Count consecutive matching symbols from left
    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = lineSymbolData[i];
      // Match if same symbol OR if scatter acts as wild (when allowed)
      const isMatch = current.id === baseSymbol.id || 
        (allowWildSubstitution && current.is_scatter);
      
      if (isMatch) {
        count++;
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
