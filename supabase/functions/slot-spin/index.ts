import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================
// Module-level cache (survives across requests in same Deno instance)
// Eliminates repeated DB calls for static data like symbols/settings
// ============================================================
interface CacheEntry<T> { data: T; fetchedAt: number; }
const symbolsCache = new Map<string, CacheEntry<unknown[]>>();
const settingsCache = new Map<string, CacheEntry<number>>();
const SYMBOL_CACHE_TTL_MS = 5 * 60 * 1000;
const SETTINGS_CACHE_TTL_MS = 5 * 60 * 1000;

// Singleton service client (avoids re-creating TCP connections on every request)
let _serviceClient: ReturnType<typeof createClient> | null = null;
function getServiceClient() {
  if (!_serviceClient) {
    _serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
  }
  return _serviceClient;
}

// Decode JWT locally — no network round-trip to validate user
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch { return null; }
}

// Pay line patterns (5 reels, values represent row index 0-2)
const PAY_LINES = [
  [1, 1, 1, 1, 1], // Line 1: middle row
  [0, 0, 0, 0, 0], // Line 2: top row
  [2, 2, 2, 2, 2], // Line 3: bottom row
  [0, 1, 2, 1, 0], // Line 4: V shape
  [2, 1, 0, 1, 2], // Line 5: inverted V
  [0, 0, 1, 2, 2], // Line 6: top to bottom
  [2, 2, 1, 0, 0], // Line 7: bottom to top
  [1, 0, 0, 0, 1], // Line 8: U shape top
  [1, 2, 2, 2, 1], // Line 9: U shape bottom
  [0, 1, 1, 1, 0], // Line 10: mild V
];

interface SlotSymbol {
  id: string;
  name: string;
  image_url: string | null;
  multiplier_2: number;
  multiplier_3: number;
  multiplier_4: number;
  multiplier_5: number;
  is_scatter: boolean;
  is_wild: boolean;
  position: number;
  rarity: "premium" | "common" | "scatter";
  weight: number;
  bonus_weight: number;
  game_id: string;
}

interface LineWin {
  lineIndex: number;
  symbolId: string;
  count: number;
  payout: number;
}

interface SpinResult {
  grid: string[][];
  wins: LineWin[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
}

interface BonusSpinResult extends SpinResult {
  expandedGrid: string[][];
  expandedReels: number[];
  isRetrigger: boolean;
  expandedReelSymbolIds?: Record<string, string>;
  expandingWinGroups?: Array<{ symbolId: string; reels: number[]; wins: LineWin[] }>;
}

// ============================================================
// Gates of Fedesvin types and logic
// ============================================================
const GATES_COLS = 6;
const GATES_ROWS = 5;

// These are defaults; actual values come from site_settings via getGatesSettings()
let GATES_MIN_MATCH = 8;
let GATES_SCATTER_TRIGGER = 4;
let GATES_SCATTER_RETRIGGER = 3;
let GATES_FREE_SPINS_INITIAL = 15;
let GATES_FREE_SPINS_RETRIGGER = 5;
let GATES_MULTIPLIER_CHANCE_BASE = 0.04;
let GATES_MULTIPLIER_CHANCE_BONUS = 0.05; // ~5% per cell in bonus
let GATES_MAX_BET = 10;
const GATES_BONUS_PREMIUM_WEIGHT_BOOST = 1.10; // +10% premium symbol weight in bonus

const GATES_MULTIPLIER_VALUES = [2, 3, 5, 10, 15, 25, 50, 100];
const GATES_MULTIPLIER_WEIGHTS = [30, 25, 20, 12, 6, 3, 2, 1];

// Chance that a base game spin is a "multiplier spin" (no scatters, multipliers land instead)
const GATES_MULTIPLIER_SPIN_CHANCE = 0.10;

// Spin type: scatter = scatters can land, no multipliers; multiplier = multipliers can land, no scatters; both = bonus (unchanged)
type GatesSpinType = 'scatter' | 'multiplier' | 'both';

// Cache for gates settings from DB
const gatesSettingsCache: { data: Record<string, string> | null; fetchedAt: number } = { data: null, fetchedAt: 0 };
const GATES_SETTINGS_CACHE_TTL = 5 * 60 * 1000;

async function loadGatesSettings(serviceClient: ReturnType<typeof createClient>) {
  const now = Date.now();
  if (gatesSettingsCache.data && (now - gatesSettingsCache.fetchedAt) < GATES_SETTINGS_CACHE_TTL) {
    return;
  }
  const { data, error } = await serviceClient
    .from("site_settings")
    .select("key, value")
    .in("key", [
      "gates_multiplier_chance_base", "gates_multiplier_chance_bonus",
      "gates_min_match", "gates_scatter_trigger", "gates_scatter_retrigger",
      "gates_free_spins_initial", "gates_free_spins_retrigger",
      "gates_max_bet",
    ]);
  if (!error && data) {
    const map: Record<string, string> = {};
    data.forEach((s: { key: string; value: string | null }) => { map[s.key] = s.value || ""; });
    gatesSettingsCache.data = map;
    gatesSettingsCache.fetchedAt = now;
    
    // Apply values with fallbacks
    GATES_MIN_MATCH = parseInt(map.gates_min_match || "8", 10);
    GATES_SCATTER_TRIGGER = parseInt(map.gates_scatter_trigger || "4", 10);
    GATES_SCATTER_RETRIGGER = parseInt(map.gates_scatter_retrigger || "3", 10);
    GATES_FREE_SPINS_INITIAL = parseInt(map.gates_free_spins_initial || "15", 10);
    GATES_FREE_SPINS_RETRIGGER = parseInt(map.gates_free_spins_retrigger || "5", 10);
    GATES_MULTIPLIER_CHANCE_BASE = parseFloat(map.gates_multiplier_chance_base || "0.04");
    GATES_MULTIPLIER_CHANCE_BONUS = parseFloat(map.gates_multiplier_chance_bonus || "0.05");
    GATES_MAX_BET = parseInt(map.gates_max_bet || "10", 10);
  }
}

interface GatesWin {
  symbolId: string;
  symbolName: string;
  count: number;
  payout: number;
  positions: number[];
}

interface GatesMultiplierOrb {
  position: number;
  value: number;
}

interface GatesTumbleStep {
  grid: string[][];
  wins: GatesWin[];
  winningPositions: number[];
  multiplierOrbs: GatesMultiplierOrb[];
  stepWin: number;
}

interface GatesSpinResult {
  tumbleSteps: GatesTumbleStep[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
  totalMultiplier: number;
  initialGrid: string[][];
}

// Helper to check if a grid cell ID is a multiplier symbol
function isMultSymbol(id: string): boolean {
  return id.startsWith("mult_");
}

// Helper to extract multiplier value from "mult_5x" -> 5
function getMultValue(id: string): number {
  const match = id.match(/^mult_(\d+)x$/);
  return match ? parseInt(match[1], 10) : 0;
}

async function pickGatesMultiplierValue(prng: SeededPRNG): Promise<number> {
  const totalWeight = GATES_MULTIPLIER_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = (await prng.next()) * totalWeight;
  for (let i = 0; i < GATES_MULTIPLIER_VALUES.length; i++) {
    r -= GATES_MULTIPLIER_WEIGHTS[i];
    if (r <= 0) return GATES_MULTIPLIER_VALUES[i];
  }
  return GATES_MULTIPLIER_VALUES[0];
}

async function getGatesRandomSymbol(symbols: SlotSymbol[], isBonusSpin: boolean, prng: SeededPRNG): Promise<SlotSymbol> {
  const getWeight = (s: SlotSymbol) => {
    const base = isBonusSpin ? (s.bonus_weight || s.weight || DEFAULT_SYMBOL_WEIGHT) : (s.weight || DEFAULT_SYMBOL_WEIGHT);
    if (isBonusSpin && s.rarity === 'premium') {
      return base * GATES_BONUS_PREMIUM_WEIGHT_BOOST;
    }
    return base;
  };
  const totalWeight = symbols.reduce((sum, s) => sum + getWeight(s), 0);
  let random = (await prng.next()) * totalWeight;
  for (const sym of symbols) {
    random -= getWeight(sym);
    if (random <= 0) return sym;
  }
  return symbols[symbols.length - 1];
}

async function generateGatesGrid(symbols: SlotSymbol[], isBonusSpin: boolean, prng: SeededPRNG, spinType: GatesSpinType = 'both'): Promise<string[][]> {
  const chance = isBonusSpin ? GATES_MULTIPLIER_CHANCE_BONUS : GATES_MULTIPLIER_CHANCE_BASE;
  const scatterSymbol = symbols.find(s => s.is_scatter);
  const nonScatterSymbols = symbols.filter(s => !s.is_scatter);
  const grid: string[][] = [];
  for (let col = 0; col < GATES_COLS; col++) {
    const column: string[] = [];
    let hasScatter = false; // Cap: max 1 scatter per reel
    let hasMultiplier = false; // Cap: max 1 multiplier per reel
    for (let row = 0; row < GATES_ROWS; row++) {
      let sym = await getGatesRandomSymbol(symbols, isBonusSpin, prng);

      // Cap scatters to 1 per column: if scatter already placed, re-roll without scatter
      if (scatterSymbol && sym.id === scatterSymbol.id && hasScatter) {
        sym = await getGatesRandomSymbol(nonScatterSymbols, isBonusSpin, prng);
      }

      // Multiplier spin: replace scatters with multipliers (but cap 1 per reel)
      if (spinType === 'multiplier' && scatterSymbol && sym.id === scatterSymbol.id) {
        if (!hasMultiplier) {
          const multVal = await pickGatesMultiplierValue(prng);
          column.push(`mult_${multVal}x`);
          hasMultiplier = true;
        } else {
          // Already have a multiplier in this column, place a regular symbol
          sym = await getGatesRandomSymbol(nonScatterSymbols, isBonusSpin, prng);
          column.push(sym.id);
        }
        continue;
      }

      // Track scatter placement
      if (scatterSymbol && sym.id === scatterSymbol.id) {
        hasScatter = true;
      }

      // Scatter spin: never place multipliers
      if (spinType === 'scatter') {
        column.push(sym.id);
        continue;
      }

      // 'both' (bonus) or 'multiplier' spin: normal multiplier chance on non-scatter cells (cap 1 per reel)
      if (!scatterSymbol || sym.id !== scatterSymbol.id) {
        if (!hasMultiplier && (await prng.next()) < chance) {
          const multVal = await pickGatesMultiplierValue(prng);
          column.push(`mult_${multVal}x`);
          hasMultiplier = true;
          continue;
        }
      }
      column.push(sym.id);
    }
    grid.push(column);
  }
  return grid;
}

// Place multipliers on new symbols filling after a tumble
// existingColSymbols: the surviving symbols already in this column (used to prevent duplicate scatters)
async function fillWithMultipliers(symbols: SlotSymbol[], count: number, isBonusSpin: boolean, prng: SeededPRNG, spinType: GatesSpinType = 'both', existingColSymbols: string[] = []): Promise<string[]> {
  const chance = isBonusSpin ? GATES_MULTIPLIER_CHANCE_BONUS : GATES_MULTIPLIER_CHANCE_BASE;
  const scatterSymbol = symbols.find(s => s.is_scatter);
  
  // Check if this column already has a scatter among survivors
  const colAlreadyHasScatter = scatterSymbol ? existingColSymbols.some(id => id === scatterSymbol.id) : false;
  // Check if this column already has a multiplier among survivors
  const colAlreadyHasMultiplier = existingColSymbols.some(id => id.startsWith('mult_'));
  
  const result: string[] = [];
  let resultHasMultiplier = false;
  for (let i = 0; i < count; i++) {
    // Scatter spin: never place multipliers in fill
    if (spinType === 'scatter') {
      let sym = await getGatesRandomSymbol(symbols, isBonusSpin, prng);
      // Prevent duplicate scatter in this column
      const resultHasScatter = scatterSymbol ? result.some(id => id === scatterSymbol.id) : false;
      if (scatterSymbol && sym.id === scatterSymbol.id && (colAlreadyHasScatter || resultHasScatter)) {
        // Re-roll without scatter
        const nonScatter = symbols.filter(s => !s.is_scatter);
        if (nonScatter.length > 0) {
          const idx = Math.floor((await prng.next()) * nonScatter.length);
          sym = nonScatter[idx];
        }
      }
      result.push(sym.id);
      continue;
    }

    // Multiplier spin: replace any scatter with a multiplier (cap 1 per reel)
    if (spinType === 'multiplier') {
      const canPlaceMult = !colAlreadyHasMultiplier && !resultHasMultiplier;
      if (canPlaceMult && (await prng.next()) < chance) {
        const multVal = await pickGatesMultiplierValue(prng);
        result.push(`mult_${multVal}x`);
        resultHasMultiplier = true;
      } else {
        const sym = await getGatesRandomSymbol(symbols, isBonusSpin, prng);
        if (scatterSymbol && sym.id === scatterSymbol.id && canPlaceMult) {
          const multVal = await pickGatesMultiplierValue(prng);
          result.push(`mult_${multVal}x`);
          resultHasMultiplier = true;
        } else if (scatterSymbol && sym.id === scatterSymbol.id) {
          // Can't place multiplier, place regular symbol
          const nonScatter = symbols.filter(s => !s.is_scatter);
          const idx = Math.floor((await prng.next()) * nonScatter.length);
          result.push(nonScatter[idx].id);
        } else {
          result.push(sym.id);
        }
      }
      continue;
    }

    // 'both' (bonus): existing behavior but prevent duplicate scatters & cap 1 multiplier per reel
    if (!colAlreadyHasMultiplier && !resultHasMultiplier && (await prng.next()) < chance) {
      const multVal = await pickGatesMultiplierValue(prng);
      result.push(`mult_${multVal}x`);
      resultHasMultiplier = true;
    } else {
      let sym = await getGatesRandomSymbol(symbols, isBonusSpin, prng);
      const resultHasScatter = scatterSymbol ? result.some(id => id === scatterSymbol.id) : false;
      if (scatterSymbol && sym.id === scatterSymbol.id && (colAlreadyHasScatter || resultHasScatter)) {
        const nonScatter = symbols.filter(s => !s.is_scatter);
        if (nonScatter.length > 0) {
          const idx = Math.floor((await prng.next()) * nonScatter.length);
          sym = nonScatter[idx];
        }
      }
      result.push(sym.id);
    }
  }
  return result;
}

function countGatesSymbolMatches(grid: string[][]): Map<string, { count: number; positions: number[] }> {
  const matches = new Map<string, { count: number; positions: number[] }>();
  for (let col = 0; col < GATES_COLS; col++) {
    for (let row = 0; row < GATES_ROWS; row++) {
      const id = grid[col][row];
      // Skip multiplier symbols - they don't count toward matches
      if (isMultSymbol(id)) continue;
      const flat = col * GATES_ROWS + row;
      if (!matches.has(id)) matches.set(id, { count: 0, positions: [] });
      const e = matches.get(id)!;
      e.count++;
      e.positions.push(flat);
    }
  }
  return matches;
}

function calculateGatesWins(grid: string[][], symbols: SlotSymbol[], betAmount: number): GatesWin[] {
  const matches = countGatesSymbolMatches(grid);
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const wins: GatesWin[] = [];
  
  for (const [symbolId, { count, positions }] of matches) {
    const sym = symbolsById.get(symbolId);
    if (!sym || sym.is_scatter) continue;
    if (count < GATES_MIN_MATCH) continue;
    
    let multiplier = 0;
    if (count >= 12) multiplier = sym.multiplier_5;
    else if (count >= 10) multiplier = sym.multiplier_4;
    else if (count >= 8) multiplier = sym.multiplier_3;
    
    if (multiplier > 0) {
      wins.push({ symbolId, symbolName: sym.name, count, payout: multiplier * betAmount, positions });
    }
  }
  return wins;
}

function countGatesScatters(grid: string[][], symbols: SlotSymbol[]): number {
  const scatter = symbols.find(s => s.is_scatter);
  if (!scatter) return 0;
  let count = 0;
  for (const col of grid) {
    for (const id of col) {
      if (id === scatter.id) count++;
    }
  }
  return count;
}

async function applyGatesTumble(grid: string[][], winningPositions: number[], multiplierPositions: number[], symbols: SlotSymbol[], isBonusSpin: boolean, prng: SeededPRNG, spinType: GatesSpinType = 'both'): Promise<string[][]> {
  const newGrid = grid.map(col => [...col]);
  
  // Combine winning + collected multiplier positions for removal
  const allRemoved = new Set([...winningPositions, ...multiplierPositions]);
  
  // Group removed positions by column
  const removedByCol = new Map<number, Set<number>>();
  for (const pos of allRemoved) {
    const col = Math.floor(pos / GATES_ROWS);
    const row = pos % GATES_ROWS;
    if (!removedByCol.has(col)) removedByCol.set(col, new Set());
    removedByCol.get(col)!.add(row);
  }
  
  // For each column, remove symbols and drop remaining down
  for (const [col, removedRows] of removedByCol) {
    const remaining: string[] = [];
    for (let row = 0; row < GATES_ROWS; row++) {
      if (!removedRows.has(row)) {
        remaining.push(newGrid[col][row]);
      }
    }
    
    // Fill from top with new random symbols (respecting spinType)
    // Pass surviving symbols so fillWithMultipliers can prevent duplicate scatters
    const needed = GATES_ROWS - remaining.length;
    const newSymbols = await fillWithMultipliers(symbols, needed, isBonusSpin, prng, spinType, remaining);
    
    // New symbols on top, remaining on bottom
    newGrid[col] = [...newSymbols, ...remaining];
  }
  
  return newGrid;
}

function scanGridMultipliers(grid: string[][]): GatesMultiplierOrb[] {
  const orbs: GatesMultiplierOrb[] = [];
  for (let col = 0; col < GATES_COLS; col++) {
    for (let row = 0; row < GATES_ROWS; row++) {
      const id = grid[col][row];
      if (isMultSymbol(id)) {
        orbs.push({ position: col * GATES_ROWS + row, value: getMultValue(id) });
      }
    }
  }
  return orbs;
}

async function calculateGatesFullSpin(
  symbols: SlotSymbol[],
  betAmount: number,
  isBonusSpin: boolean,
  runningMultiplier: number = 0,
  prng: SeededPRNG
): Promise<GatesSpinResult> {
  // Determine spin type: base game splits into scatter/multiplier spins; bonus allows both
  let spinType: GatesSpinType = 'both';
  if (!isBonusSpin) {
    const spinTypeRoll = await prng.next();
    spinType = spinTypeRoll < GATES_MULTIPLIER_SPIN_CHANCE ? 'multiplier' : 'scatter';
  }

  let grid = await generateGatesGrid(symbols, isBonusSpin, prng, spinType);
  const initialGrid = grid.map(col => [...col]);
  const tumbleSteps: GatesTumbleStep[] = [];
  let totalRawWin = 0;
  let totalMultiplier = runningMultiplier;
  let maxTumbles = 50; // safety cap
  
  // Track max scatter count across all grids (initial + after each tumble)
  // Scatters that drop in during tumbles count toward bonus trigger
  let scatterCount = countGatesScatters(grid, symbols);
  
  while (maxTumbles-- > 0) {
    const wins = calculateGatesWins(grid, symbols, betAmount);
    
    // Collect all winning positions
    const winningPositions = new Set<number>();
    for (const w of wins) {
      for (const p of w.positions) winningPositions.add(p);
    }
    
    const stepWin = wins.reduce((sum, w) => sum + w.payout, 0);
    
    // Scan grid for multiplier symbols present in this step
    const orbs = scanGridMultipliers(grid);
    
    // Record orbs for visual display but do NOT collect/remove them yet
    // Multipliers persist on the grid until the tumble sequence ends
    
    tumbleSteps.push({
      grid: grid.map(col => [...col]),
      wins,
      winningPositions: Array.from(winningPositions),
      multiplierOrbs: orbs,
      stepWin,
    });
    
    totalRawWin += stepWin;
    
    // If no wins, tumble sequence ends
    if (wins.length === 0) break;
    
    // Apply tumble - remove ONLY winning symbols, NOT multipliers (they persist)
    grid = await applyGatesTumble(grid, Array.from(winningPositions), [], symbols, isBonusSpin, prng, spinType);
    
    // Re-check scatters after tumble (new scatters may have dropped in)
    const newScatterCount = countGatesScatters(grid, symbols);
    if (newScatterCount > scatterCount) scatterCount = newScatterCount;
  }
  
  // After all tumbles: collect ALL multipliers that are still on the grid
  // They explode simultaneously after the last win
  if (totalRawWin > 0) {
    // Find the last winning step to attach collected orbs for the client animation
    const lastWinIdx = tumbleSteps.length - 1; // last step is always the no-win step
    const finalOrbs = scanGridMultipliers(grid);
    if (finalOrbs.length > 0) {
      const orbSum = finalOrbs.reduce((sum, o) => sum + o.value, 0);
      totalMultiplier += orbSum;
    }
  }

  // Determine bonus trigger after all tumbles (scatters accumulated across all grids)
  const bonusTriggered = isBonusSpin 
    ? scatterCount >= GATES_SCATTER_RETRIGGER 
    : scatterCount >= GATES_SCATTER_TRIGGER;

  // Apply total multiplier to raw win
  const totalWin = totalMultiplier > 0 ? totalRawWin * totalMultiplier : totalRawWin;
  
  return {
    tumbleSteps,
    totalWin,
    bonusTriggered,
    scatterCount,
    totalMultiplier,
    initialGrid,
  };
}

// ============================================================
// FEDESVIN BONANZA types and logic
// ============================================================
const BONANZA_COLS = 6;
const BONANZA_ROWS = 5;

// Defaults; overridden by site_settings via loadBonanzaSettings()
let BONANZA_MIN_MATCH = 8;
let BONANZA_SCATTER_TRIGGER = 4;
let BONANZA_SCATTER_RETRIGGER = 3;
let BONANZA_FREE_SPINS_4 = 10;
let BONANZA_FREE_SPINS_5 = 12;
let BONANZA_FREE_SPINS_6 = 15;
let BONANZA_FREE_SPINS_RETRIGGER = 5;
let BONANZA_MULTIPLIER_CHANCE_BONUS = 0.10;
let BONANZA_MULTIPLIER_VALUES = [2, 3, 5, 10, 15, 25, 50, 100];
let BONANZA_MULTIPLIER_WEIGHTS = [30, 25, 20, 12, 6, 3, 2, 1];
let BONANZA_REEL_DUP_2_CHANCE = 0.35;
let BONANZA_REEL_DUP_3_CHANCE = 0.10;
let BONANZA_MAX_BET = 10;

const bonanzaSettingsCache: { data: Record<string, string> | null; fetchedAt: number } = { data: null, fetchedAt: 0 };
const BONANZA_SETTINGS_CACHE_TTL = 5 * 60 * 1000;

async function loadBonanzaSettings(serviceClient: ReturnType<typeof createClient>) {
  const now = Date.now();
  if (bonanzaSettingsCache.data && (now - bonanzaSettingsCache.fetchedAt) < BONANZA_SETTINGS_CACHE_TTL) return;
  const { data, error } = await serviceClient
    .from("site_settings").select("key, value")
    .in("key", [
      "bonanza_min_match", "bonanza_scatter_trigger", "bonanza_scatter_retrigger",
      "bonanza_free_spins_4", "bonanza_free_spins_5", "bonanza_free_spins_6",
      "bonanza_free_spins_retrigger", "bonanza_multiplier_chance_bonus",
      "bonanza_multiplier_values", "bonanza_multiplier_weights",
      "bonanza_reel_dup_2_chance", "bonanza_reel_dup_3_chance",
      "bonanza_max_bet",
    ]);
  if (!error && data) {
    const map: Record<string, string> = {};
    data.forEach((s: { key: string; value: string | null }) => { map[s.key] = s.value || ""; });
    bonanzaSettingsCache.data = map;
    bonanzaSettingsCache.fetchedAt = now;
    BONANZA_MIN_MATCH = parseInt(map.bonanza_min_match || "8", 10);
    BONANZA_SCATTER_TRIGGER = parseInt(map.bonanza_scatter_trigger || "4", 10);
    BONANZA_SCATTER_RETRIGGER = parseInt(map.bonanza_scatter_retrigger || "3", 10);
    BONANZA_FREE_SPINS_4 = parseInt(map.bonanza_free_spins_4 || "10", 10);
    BONANZA_FREE_SPINS_5 = parseInt(map.bonanza_free_spins_5 || "12", 10);
    BONANZA_FREE_SPINS_6 = parseInt(map.bonanza_free_spins_6 || "15", 10);
    BONANZA_FREE_SPINS_RETRIGGER = parseInt(map.bonanza_free_spins_retrigger || "5", 10);
    BONANZA_MULTIPLIER_CHANCE_BONUS = parseFloat(map.bonanza_multiplier_chance_bonus || "0.10");
    if (map.bonanza_multiplier_values) {
      try { BONANZA_MULTIPLIER_VALUES = JSON.parse(map.bonanza_multiplier_values); } catch {
        // Fallback: parse CSV format "2,3,5,10,..."
        BONANZA_MULTIPLIER_VALUES = map.bonanza_multiplier_values.split(',').map((v: string) => parseInt(v.trim(), 10)).filter((n: number) => !isNaN(n));
      }
    }
    if (map.bonanza_multiplier_weights) {
      try { BONANZA_MULTIPLIER_WEIGHTS = JSON.parse(map.bonanza_multiplier_weights); } catch {
        // Fallback: parse CSV format "100,60,25,12,..."
        BONANZA_MULTIPLIER_WEIGHTS = map.bonanza_multiplier_weights.split(',').map((v: string) => parseInt(v.trim(), 10)).filter((n: number) => !isNaN(n));
      }
    }
    BONANZA_REEL_DUP_2_CHANCE = parseFloat(map.bonanza_reel_dup_2_chance || "0.35");
    BONANZA_REEL_DUP_3_CHANCE = parseFloat(map.bonanza_reel_dup_3_chance || "0.10");
    BONANZA_MAX_BET = parseInt(map.bonanza_max_bet || "10", 10);
  }
}

interface BonanzaWin {
  symbolId: string;
  symbolName: string;
  count: number;
  payout: number;
  positions: number[];
}

interface BonanzaMultiplierBomb {
  position: number;
  value: number;
  activated: boolean;
}

interface BonanzaTumbleStep {
  grid: string[][];
  wins: BonanzaWin[];
  winningPositions: number[];
  multiplierBombs: BonanzaMultiplierBomb[];
  stepWin: number;
  bombMultiplier: number;
}

interface BonanzaSpinResult {
  tumbleSteps: BonanzaTumbleStep[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
  totalMultiplier: number;
  initialGrid: string[][];
}

function isBombSymbol(id: string): boolean { return id.startsWith("bomb_"); }
function getBombValue(id: string): number {
  const m = id.match(/^bomb_(\d+)x$/);
  return m ? parseInt(m[1], 10) : 0;
}

async function pickBonanzaBombValue(prng: SeededPRNG): Promise<number> {
  const totalWeight = BONANZA_MULTIPLIER_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = (await prng.next()) * totalWeight;
  for (let i = 0; i < BONANZA_MULTIPLIER_VALUES.length; i++) {
    r -= BONANZA_MULTIPLIER_WEIGHTS[i];
    if (r <= 0) return BONANZA_MULTIPLIER_VALUES[i];
  }
  return BONANZA_MULTIPLIER_VALUES[0];
}

async function getBonanzaRandomSymbol(symbols: SlotSymbol[], isBonusSpin: boolean, prng: SeededPRNG, scatterWeightMultiplier: number = 1): Promise<SlotSymbol> {
  const getWeight = (s: SlotSymbol) => {
    const base = isBonusSpin ? (s.bonus_weight || s.weight || DEFAULT_SYMBOL_WEIGHT) : (s.weight || DEFAULT_SYMBOL_WEIGHT);
    return s.is_scatter && scatterWeightMultiplier > 1 ? base * scatterWeightMultiplier : base;
  };
  const totalWeight = symbols.reduce((sum, s) => sum + getWeight(s), 0);
  let random = (await prng.next()) * totalWeight;
  for (const sym of symbols) {
    random -= getWeight(sym);
    if (random <= 0) return sym;
  }
  return symbols[symbols.length - 1];
}

async function generateBonanzaGrid(symbols: SlotSymbol[], isBonusSpin: boolean, prng: SeededPRNG, scatterWeightMultiplier: number = 1): Promise<string[][]> {
  // Pre-generate enough random values for grid generation:
  // ~5 rows * 6 cols * 2 (symbol picks + bomb/scatter rolls) + ~20 (dup rolls + shuffles) = ~80
  await prng.pregenerate(100);
  const scatterSymbol = symbols.find(s => s.is_scatter);
  const nonScatterSymbols = symbols.filter(s => !s.is_scatter);
  const regularSymbols = nonScatterSymbols; // non-scatter, non-bomb candidates for duplication
  const grid: string[][] = [];

  for (let col = 0; col < BONANZA_COLS; col++) {
    const column: string[] = [];

    // Step 1: Generate 5 symbols for this reel
    let hasScatter = false;
    let hasBomb = false;
    for (let row = 0; row < BONANZA_ROWS; row++) {
      // In bonus: chance to place a multiplier bomb (max 1 per reel)
      if (isBonusSpin && !hasBomb && (await prng.next()) < BONANZA_MULTIPLIER_CHANCE_BONUS) {
        const bombVal = await pickBonanzaBombValue(prng);
        column.push(`bomb_${bombVal}x`);
        hasBomb = true;
        continue;
      }
      let sym = await getBonanzaRandomSymbol(symbols, isBonusSpin, prng);
      // Cap 1 scatter per column
      if (scatterSymbol && sym.id === scatterSymbol.id && hasScatter) {
        sym = await getBonanzaRandomSymbol(nonScatterSymbols, isBonusSpin, prng);
      }
      if (scatterSymbol && sym.id === scatterSymbol.id) hasScatter = true;
      column.push(sym.id);
    }

    // Step 2: Reel-based duplication for regular symbols only
    // Configurable chance for 2 or 3 identical symbols per reel
    const dupRoll = await prng.next();
    const tripleThreshold = BONANZA_REEL_DUP_3_CHANCE;
    const doubleThreshold = tripleThreshold + BONANZA_REEL_DUP_2_CHANCE;
    if (dupRoll < doubleThreshold) {
      const dupCount = dupRoll < tripleThreshold ? 3 : 2;
      // Find regular symbol indices (not scatter, not bomb)
      const regularIndices: number[] = [];
      for (let i = 0; i < column.length; i++) {
        const id = column[i];
        if (!isBombSymbol(id) && (!scatterSymbol || id !== scatterSymbol.id)) {
          regularIndices.push(i);
        }
      }
      if (regularIndices.length >= dupCount) {
        // Pick a random regular symbol to be the duplicate
        const sourceIdx = regularIndices[Math.floor((await prng.next()) * regularIndices.length)];
        const sourceId = column[sourceIdx];
        // Pick (dupCount - 1) other regular indices to replace
        const otherIndices = regularIndices.filter(i => i !== sourceIdx);
        // Shuffle and take needed count
        for (let i = otherIndices.length - 1; i > 0; i--) {
          const j = Math.floor((await prng.next()) * (i + 1));
          [otherIndices[i], otherIndices[j]] = [otherIndices[j], otherIndices[i]];
        }
        const replaceCount = Math.min(dupCount - 1, otherIndices.length);
        for (let i = 0; i < replaceCount; i++) {
          column[otherIndices[i]] = sourceId;
        }
      }
    }

    // Step 3: Shuffle the reel individually
    for (let i = column.length - 1; i > 0; i--) {
      const j = Math.floor((await prng.next()) * (i + 1));
      [column[i], column[j]] = [column[j], column[i]];
    }

    grid.push(column);
  }
  return grid;
}

function countBonanzaScatters(grid: string[][], symbols: SlotSymbol[]): number {
  const scatter = symbols.find(s => s.is_scatter);
  if (!scatter) return 0;
  let count = 0;
  for (const col of grid) for (const id of col) if (id === scatter.id) count++;
  return count;
}

function calculateBonanzaWins(grid: string[][], symbols: SlotSymbol[], betAmount: number): BonanzaWin[] {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  // Count matches across entire grid (Pay Anywhere)
  const matches = new Map<string, { count: number; positions: number[] }>();
  for (let col = 0; col < BONANZA_COLS; col++) {
    for (let row = 0; row < BONANZA_ROWS; row++) {
      const id = grid[col][row];
      if (isBombSymbol(id)) continue;
      const flat = col * BONANZA_ROWS + row;
      if (!matches.has(id)) matches.set(id, { count: 0, positions: [] });
      const e = matches.get(id)!;
      e.count++;
      e.positions.push(flat);
    }
  }
  const wins: BonanzaWin[] = [];
  for (const [symbolId, { count, positions }] of matches) {
    const sym = symbolsById.get(symbolId);
    if (!sym || sym.is_scatter) continue;
    if (count < BONANZA_MIN_MATCH) continue;
    let multiplier = 0;
    if (count >= 12) multiplier = sym.multiplier_5;
    else if (count >= 10) multiplier = sym.multiplier_4;
    else if (count >= 8) multiplier = sym.multiplier_3;
    if (multiplier > 0) {
      wins.push({ symbolId, symbolName: sym.name, count, payout: multiplier * betAmount, positions });
    }
  }
  return wins;
}

function scanBonanzaBombs(grid: string[][]): BonanzaMultiplierBomb[] {
  const bombs: BonanzaMultiplierBomb[] = [];
  for (let col = 0; col < BONANZA_COLS; col++) {
    for (let row = 0; row < BONANZA_ROWS; row++) {
      const id = grid[col][row];
      if (isBombSymbol(id)) {
        bombs.push({ position: col * BONANZA_ROWS + row, value: getBombValue(id), activated: false });
      }
    }
  }
  return bombs;
}

async function applyBonanzaTumble(grid: string[][], winningPositions: number[], bombPositions: number[], symbols: SlotSymbol[], isBonusSpin: boolean, prng: SeededPRNG): Promise<string[][]> {
  // Pre-generate enough random values for tumble fill (~15 per tumble)
  await prng.pregenerate(20);
  const newGrid = grid.map(col => [...col]);
  const allRemoved = new Set([...winningPositions, ...bombPositions]);
  const removedByCol = new Map<number, Set<number>>();
  for (const pos of allRemoved) {
    const col = Math.floor(pos / BONANZA_ROWS);
    const row = pos % BONANZA_ROWS;
    if (!removedByCol.has(col)) removedByCol.set(col, new Set());
    removedByCol.get(col)!.add(row);
  }
  const scatterSymbol = symbols.find(s => s.is_scatter);
  const nonScatterSymbols = symbols.filter(s => !s.is_scatter);
  for (const [col, removedRows] of removedByCol) {
    const remaining: string[] = [];
    for (let row = 0; row < BONANZA_ROWS; row++) {
      if (!removedRows.has(row)) remaining.push(newGrid[col][row]);
    }
    const needed = BONANZA_ROWS - remaining.length;
    const newSymbols: string[] = [];
    const colHasScatter = scatterSymbol ? remaining.some(id => id === scatterSymbol.id) : false;
    const colHasBomb = remaining.some(id => isBombSymbol(id));
    let fillHasScatter = false;
    let fillHasBomb = false;
    for (let i = 0; i < needed; i++) {
      // Bonus: chance for bomb (max 1 per reel total)
      if (isBonusSpin && !colHasBomb && !fillHasBomb && (await prng.next()) < BONANZA_MULTIPLIER_CHANCE_BONUS) {
        const bombVal = await pickBonanzaBombValue(prng);
        newSymbols.push(`bomb_${bombVal}x`);
        fillHasBomb = true;
        continue;
      }
      let sym = await getBonanzaRandomSymbol(symbols, isBonusSpin, prng);
      if (scatterSymbol && sym.id === scatterSymbol.id && (colHasScatter || fillHasScatter)) {
        sym = await getBonanzaRandomSymbol(nonScatterSymbols, isBonusSpin, prng);
      }
      if (scatterSymbol && sym.id === scatterSymbol.id) fillHasScatter = true;
      newSymbols.push(sym.id);
    }
    newGrid[col] = [...newSymbols, ...remaining];
  }
  return newGrid;
}

async function calculateBonanzaFullSpin(
  symbols: SlotSymbol[],
  betAmount: number,
  isBonusSpin: boolean,
  runningMultiplier: number,
  prng: SeededPRNG,
  forceScatters: boolean = false
): Promise<BonanzaSpinResult> {
  let grid = await generateBonanzaGrid(symbols, isBonusSpin, prng);

  // Debug: force exactly 4 scatters across different columns
  if (forceScatters && !isBonusSpin) {
    const scatterSymbol = symbols.find(s => s.is_scatter);
    if (scatterSymbol) {
      const cols = [0, 1, 2, 3, 4, 5];
      // Pick 4 random columns
      for (let i = cols.length - 1; i > 0; i--) {
        const j = Math.floor(await prng.next() * (i + 1));
        [cols[i], cols[j]] = [cols[j], cols[i]];
      }
      const chosen = cols.slice(0, 4);
      for (const col of chosen) {
        const row = Math.floor(await prng.next() * BONANZA_ROWS);
        grid[col][row] = scatterSymbol.id;
      }
    }
  }

  const initialGrid = grid.map(col => [...col]);
  const tumbleSteps: BonanzaTumbleStep[] = [];
  let totalRawWin = 0;
  // Per-spin multiplier: always start at 0 regardless of runningMultiplier
  let totalMultiplier = 0;
  let scatterCount = countBonanzaScatters(grid, symbols);
  let maxTumbles = 50;
  // Track ALL bombs across the entire tumble chain (they persist until the end)
  const allBombsCollected: BonanzaMultiplierBomb[] = [];

  while (maxTumbles-- > 0) {
    const wins = calculateBonanzaWins(grid, symbols, betAmount);
    const winningPositions = new Set<number>();
    for (const w of wins) for (const p of w.positions) winningPositions.add(p);
    const stepWin = wins.reduce((sum, w) => sum + w.payout, 0);

    // Scan bombs on current grid — report them but do NOT activate or remove yet
    const bombs = scanBonanzaBombs(grid);

    tumbleSteps.push({
      grid: grid.map(col => [...col]),
      wins,
      winningPositions: Array.from(winningPositions),
      multiplierBombs: bombs.map(b => ({ ...b, activated: false })),
      stepWin,
      bombMultiplier: 0, // bombs don't activate during individual steps
    });

    totalRawWin += stepWin;
    if (wins.length === 0) break;

    // Remove ONLY winning symbols; bombs persist on the grid
    grid = await applyBonanzaTumble(grid, Array.from(winningPositions), [], symbols, isBonusSpin, prng);

    const newScatterCount = countBonanzaScatters(grid, symbols);
    if (newScatterCount > scatterCount) scatterCount = newScatterCount;
  }

  // After all tumbles: if there were any wins, collect ALL remaining bombs
  if (totalRawWin > 0) {
    const finalBombs = scanBonanzaBombs(grid);
    if (finalBombs.length > 0) {
      const bombSum = finalBombs.reduce((sum, b) => sum + b.value, 0);
      totalMultiplier += bombSum;
      // Mark them as activated in the last tumble step for client animation
      if (tumbleSteps.length > 0) {
        const lastStep = tumbleSteps[tumbleSteps.length - 1];
        lastStep.multiplierBombs = finalBombs.map(b => ({ ...b, activated: true }));
        lastStep.bombMultiplier = bombSum;
      }
    }
  }

  const bonusTriggered = isBonusSpin
    ? scatterCount >= BONANZA_SCATTER_RETRIGGER
    : scatterCount >= BONANZA_SCATTER_TRIGGER;

  // Apply total multiplier to raw win
  const totalWin = totalMultiplier > 0 ? totalRawWin * totalMultiplier : totalRawWin;

  return { tumbleSteps, totalWin, bonusTriggered, scatterCount, totalMultiplier, initialGrid };
}

const DEFAULT_SYMBOL_WEIGHT = 10;
    const MAX_SPINS_CAP = 10200;
    const SUBSCRIBER_MAX_SPINS_CAP = 10300;
    const SUBSCRIBER_BONUS = 100;
    const ABSOLUTE_MAX_CREDITS = 10000;

// Secure random number generator (fallback for non-Gates games)
function secureRandom(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
}

// ============================================================
// Seeded PRNG for provably fair outcomes (Gates of Fedesvin)
// Uses SHA-256(serverSecret + userId + clientSeed + nonce) as seed
// Each call to next() hashes the internal state to produce the next value
// ============================================================
class SeededPRNG {
  private state: Uint8Array;
  private offset: number = 0;
  private buffer: number[] = [];
  private bufferIdx: number = 0;

  constructor(seed: Uint8Array) {
    this.state = seed;
  }

  static async create(serverSecret: string, userId: string, clientSeed: string, nonce: number): Promise<SeededPRNG> {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${serverSecret}:${userId}:${clientSeed}:${nonce}`);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return new SeededPRNG(new Uint8Array(hash));
  }

  // Pre-generate at least n random values by chaining SHA-256 hashes upfront.
  // After calling this, next() will consume from the buffer without awaiting.
  async pregenerate(n: number): Promise<void> {
    const remaining = this.buffer.length - this.bufferIdx;
    const needed = n - remaining;
    if (needed <= 0) return;
    // Each hash produces 8 floats (32 bytes / 4 bytes each)
    const hashRounds = Math.ceil(needed / 8);
    const newValues: number[] = [];
    // First, drain any remaining values from current state
    while (this.offset + 4 <= this.state.length && newValues.length < needed) {
      const view = new DataView(this.state.buffer, this.state.byteOffset + this.offset, 4);
      newValues.push(view.getUint32(0) / (0xffffffff + 1));
      this.offset += 4;
    }
    // Chain-hash to fill the rest
    let hashState = this.state;
    while (newValues.length < needed) {
      const hash = await crypto.subtle.digest("SHA-256", hashState);
      hashState = new Uint8Array(hash);
      for (let off = 0; off + 4 <= 32 && newValues.length < needed; off += 4) {
        const view = new DataView(hash, off, 4);
        newValues.push(view.getUint32(0) / (0xffffffff + 1));
      }
    }
    // Update internal state to continue from last hash
    this.state = hashState;
    this.offset = (needed % 8) * 4; // offset into last hash block
    // Append to buffer (keep unconsumed values)
    if (this.bufferIdx > 0) {
      this.buffer = this.buffer.slice(this.bufferIdx);
      this.bufferIdx = 0;
    }
    this.buffer.push(...newValues);
  }

  async next(): Promise<number> {
    // Fast path: consume from pre-generated buffer
    if (this.bufferIdx < this.buffer.length) {
      return this.buffer[this.bufferIdx++];
    }
    // Slow path: hash on demand (fallback for non-batched callers)
    if (this.offset + 4 > this.state.length) {
      const hash = await crypto.subtle.digest("SHA-256", this.state);
      this.state = new Uint8Array(hash);
      this.offset = 0;
    }
    const view = new DataView(this.state.buffer, this.state.byteOffset + this.offset, 4);
    const value = view.getUint32(0) / (0xffffffff + 1);
    this.offset += 4;
    return value;
  }
}

function getRandomSymbol(
  symbols: SlotSymbol[],
  excludeIds: string[] = [],
  isBonusSpin: boolean = false
): SlotSymbol {
  const availableSymbols = symbols.filter((s) => !excludeIds.includes(s.id));
  const symbolPool =
    availableSymbols.length > 0 ? availableSymbols : symbols;

  const getWeight = (s: SlotSymbol) => {
    if (isBonusSpin) {
      return s.bonus_weight || s.weight || DEFAULT_SYMBOL_WEIGHT;
    }
    return s.weight || DEFAULT_SYMBOL_WEIGHT;
  };

  const totalWeight = symbolPool.reduce((sum, s) => sum + getWeight(s), 0);
  let random = secureRandom() * totalWeight;

  for (const symbol of symbolPool) {
    random -= getWeight(symbol);
    if (random <= 0) return symbol;
  }

  return symbolPool[symbolPool.length - 1];
}

function generateGrid(
  symbols: SlotSymbol[],
  isBonusSpin: boolean = false
): string[][] {
  const grid: string[][] = [];

  for (let col = 0; col < 5; col++) {
    const column: string[] = [];
    const usedIds: string[] = [];

    for (let row = 0; row < 3; row++) {
      const symbol = getRandomSymbol(symbols, usedIds, isBonusSpin);
      column.push(symbol.id);
      usedIds.push(symbol.id);
    }
    grid.push(column);
  }

  return grid;
}

function countScatters(grid: string[][], symbols: SlotSymbol[]): number {
  const scatterSymbol = symbols.find((s) => s.is_scatter);
  if (!scatterSymbol) return 0;

  let count = 0;
  for (const column of grid) {
    for (const symbolId of column) {
      if (symbolId === scatterSymbol.id) count++;
    }
  }

  return count;
}

function checkLineWin(
  grid: string[][],
  linePattern: number[],
  symbols: SlotSymbol[],
  betAmount: number
): LineWin | null {
  const symbolsById = new Map(symbols.map((s) => [s.id, s]));

  const lineSymbols = linePattern.map((row, col) => grid[col][row]);
  const lineSymbolData = lineSymbols.map((id) => symbolsById.get(id));

  if (lineSymbolData.some((s) => !s)) {
    return null;
  }

  const validSymbols = lineSymbolData as SlotSymbol[];

  let baseSymbol = validSymbols.find((s) => !s.is_wild) || validSymbols[0];

  let count = 0;
  for (let i = 0; i < 5; i++) {
    const current = validSymbols[i];
    if (
      current.id === baseSymbol.id ||
      current.is_wild ||
      baseSymbol.is_wild
    ) {
      count++;
      if (baseSymbol.is_wild && !current.is_wild) {
        baseSymbol = current;
      }
    } else {
      break;
    }
  }

  const minMatches = baseSymbol.rarity === "premium" ? 2 : 3;

  if (count >= minMatches) {
    let multiplier = 0;
    if (count === 2 && baseSymbol.rarity === "premium") {
      multiplier = baseSymbol.multiplier_2;
    } else if (count === 3) {
      multiplier = baseSymbol.multiplier_3;
    } else if (count === 4) {
      multiplier = baseSymbol.multiplier_4;
    } else if (count === 5) {
      multiplier = baseSymbol.multiplier_5;
    }

    if (multiplier > 0) {
      return {
        lineIndex: PAY_LINES.indexOf(linePattern),
        symbolId: baseSymbol.id,
        count,
        payout: multiplier * betAmount,
      };
    }
  }

  return null;
}

function calculateSpinResult(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): SpinResult {
  const wins: LineWin[] = [];

  for (const linePattern of PAY_LINES) {
    const win = checkLineWin(grid, linePattern, symbols, betAmount);
    if (win) {
      wins.push(win);
    }
  }

  const scatterCount = countScatters(grid, symbols);
  const bonusTriggered = scatterCount >= 3;

  const scatterSymbol = symbols.find((s) => s.is_scatter);
  let scatterPayout = 0;
  if (scatterSymbol && scatterCount >= 3) {
    if (scatterCount === 3) scatterPayout = scatterSymbol.multiplier_3 * betAmount;
    else if (scatterCount === 4) scatterPayout = scatterSymbol.multiplier_4 * betAmount;
    else if (scatterCount === 5) scatterPayout = scatterSymbol.multiplier_5 * betAmount;
  }

  const totalWin = wins.reduce((sum, w) => sum + w.payout, 0) + scatterPayout;

  return {
    grid,
    wins,
    totalWin,
    bonusTriggered,
    scatterCount,
  };
}

// Single expanding symbol (Book of Fedesvin)
function applyExpandingSymbol(
  grid: string[][],
  expandingSymbol: SlotSymbol,
  _symbols: SlotSymbol[]
): { expandedGrid: string[][]; expandedReels: number[] } {
  const expandedGrid = grid.map((col) => [...col]);
  const reelsWithExpanding: number[] = [];

  for (let col = 0; col < 5; col++) {
    const hasExpandingSymbol = grid[col].some(
      (symbolId) => symbolId === expandingSymbol.id
    );
    if (hasExpandingSymbol) {
      reelsWithExpanding.push(col);
    }
  }

  const minReelsForExpand = expandingSymbol.rarity === "premium" ? 2 : 3;

  if (reelsWithExpanding.length >= minReelsForExpand) {
    for (const col of reelsWithExpanding) {
      for (let row = 0; row < 3; row++) {
        expandedGrid[col][row] = expandingSymbol.id;
      }
    }
    return { expandedGrid, expandedReels: reelsWithExpanding };
  }

  return { expandedGrid: grid, expandedReels: [] };
}

// Multi-expanding symbol (Rise of Fedesvin)
// Each expanding symbol is evaluated INDEPENDENTLY based on its rarity:
// - Premium symbols expand if they appear on 2+ reels
// - Common symbols expand if they appear on 3+ reels
// Returns BOTH a merged expandedGrid (for visual display) AND independent
// per-symbol reel lists (for win calculation without conflict resolution).
function applyMultiExpandingSymbols(
  grid: string[][],
  expandingSymbols: SlotSymbol[],
): { 
  expandedGrid: string[][]; 
  expandedReels: number[]; 
  expandedSymbolMap: Map<number, SlotSymbol>;
  independentSymbolReels: Map<string, number[]>;
  qualifyingSymbolIds: string[];
} {
  const expandedGrid = grid.map((col) => [...col]);
  const expandedSymbolMap = new Map<number, SlotSymbol>();

  // Step 1: For each expanding symbol, find which reels contain it
  const symbolReelPresence = new Map<string, number[]>();
  for (const expSym of expandingSymbols) {
    const reelsWithSymbol: number[] = [];
    for (let col = 0; col < 5; col++) {
      if (grid[col].some((id) => id === expSym.id)) {
        reelsWithSymbol.push(col);
      }
    }
    symbolReelPresence.set(expSym.id, reelsWithSymbol);
  }

  // Step 2: Determine which symbols qualify for expansion based on rarity
  // Track INDEPENDENT reels per symbol (no conflict resolution -- for win calculation)
  const independentSymbolReels = new Map<string, number[]>();
  const qualifyingSymbolIds: string[] = [];
  
  const qualifyingExpansions = new Map<number, SlotSymbol[]>(); // reel -> qualifying symbols (for merged grid)
  for (const expSym of expandingSymbols) {
    const reels = symbolReelPresence.get(expSym.id) || [];
    const minReels = expSym.rarity === "premium" ? 2 : 3;
    
    if (reels.length >= minReels) {
      // This symbol qualifies -- store its independent reel list
      independentSymbolReels.set(expSym.id, [...reels]);
      qualifyingSymbolIds.push(expSym.id);
      
      // Also mark for merged grid conflict resolution
      for (const col of reels) {
        const existing = qualifyingExpansions.get(col) || [];
        existing.push(expSym);
        qualifyingExpansions.set(col, existing);
      }
    }
  }

  // Step 3: For each reel that has qualifying expansions, pick the best symbol (for MERGED grid only)
  const expandedReels: number[] = [];
  for (const [col, qualifyingSymbols] of qualifyingExpansions.entries()) {
    const bestSymbol = qualifyingSymbols.reduce((best, s) =>
      s.multiplier_5 > best.multiplier_5 ? s : best
    );
    expandedReels.push(col);
    expandedSymbolMap.set(col, bestSymbol);
  }

  expandedReels.sort((a, b) => a - b);

  if (expandedReels.length > 0) {
    for (const col of expandedReels) {
      const sym = expandedSymbolMap.get(col)!;
      for (let row = 0; row < 3; row++) {
        expandedGrid[col][row] = sym.id;
      }
    }
    return { expandedGrid, expandedReels, expandedSymbolMap, independentSymbolReels, qualifyingSymbolIds };
  }

  return { expandedGrid: grid, expandedReels: [], expandedSymbolMap: new Map(), independentSymbolReels: new Map(), qualifyingSymbolIds: [] };
}

function calculateBonusWins(
  expandedGrid: string[][],
  expandedReels: number[],
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbol: SlotSymbol
): LineWin[] {
  const wins: LineWin[] = [];
  const minReelsForScatterPay = expandingSymbol.rarity === "premium" ? 2 : 3;

  if (expandedReels.length >= minReelsForScatterPay) {
    const reelCount = expandedReels.length;
    let multiplier = 0;
    if (reelCount === 2 && expandingSymbol.rarity === "premium") {
      multiplier = expandingSymbol.multiplier_2;
    } else if (reelCount === 3) {
      multiplier = expandingSymbol.multiplier_3;
    } else if (reelCount === 4) {
      multiplier = expandingSymbol.multiplier_4;
    } else if (reelCount === 5) {
      multiplier = expandingSymbol.multiplier_5;
    }

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

  // Standard win calculation for non-expanding wins
  const symbolsById = new Map(symbols.map((s) => [s.id, s]));
  
  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => expandedGrid[col][row]);
    const lineSymbolData = lineSymbols.map((id) => symbolsById.get(id));

    if (lineSymbolData.some((s) => !s)) continue;

    const validSymbols = lineSymbolData as SlotSymbol[];
    let baseSymbol = validSymbols[0];
    
    if (baseSymbol.is_scatter) {
      const nonScatter = validSymbols.find((s) => !s.is_scatter);
      if (nonScatter) baseSymbol = nonScatter;
    }

    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = validSymbols[i];
      if (current.id === baseSymbol.id || current.is_scatter) {
        count++;
      } else {
        break;
      }
    }

    const minMatches = baseSymbol.rarity === "premium" ? 2 : 3;

    if (count >= minMatches) {
      let multiplier = 0;
      if (count === 2 && baseSymbol.rarity === "premium") {
        multiplier = baseSymbol.multiplier_2;
      } else if (count === 3) {
        multiplier = baseSymbol.multiplier_3;
      } else if (count === 4) {
        multiplier = baseSymbol.multiplier_4;
      } else if (count === 5) {
        multiplier = baseSymbol.multiplier_5;
      }

      if (multiplier > 0) {
        wins.push({
          lineIndex,
          symbolId: baseSymbol.id,
          count,
          payout: multiplier * betAmount,
        });
      }
    }
  }

  return wins;
}

// Multi-expanding bonus wins: calculate for each expanding symbol group INDEPENDENTLY
// Each symbol group gets its own partial grid and pays on ALL 10 lines independently.
// No processedLines guard -- groups don't compete for lines.
function calculateMultiExpandingBonusWins(
  originalGrid: string[][],
  expandedReels: number[],
  _expandedSymbolMap: Map<number, SlotSymbol>,
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbols: SlotSymbol[],
  independentSymbolReels: Map<string, number[]>,
  qualifyingSymbolIds: string[]
): LineWin[] {
  if (expandedReels.length === 0) {
    // No expansion - use standard line wins on original grid
    return calculateStandardLineWins(originalGrid, symbols, betAmount);
  }

  const wins: LineWin[] = [];

  // First: calculate standard "connecting" line wins on the ORIGINAL grid
  // (before any expansion). These are non-expanding payline wins that should
  // be shown before the expanding animation.
  const connectingWins = calculateStandardLineWins(originalGrid, symbols, betAmount);
  // Tag connecting wins so client can distinguish them
  for (const cw of connectingWins) {
    wins.push(cw);
  }

  // Then: for each qualifying expanding symbol, calculate wins independently on its OWN partial grid
  for (const symbolId of qualifyingSymbolIds) {
    const sym = expandingSymbols.find((s) => s.id === symbolId);
    if (!sym) continue;

    const reels = independentSymbolReels.get(symbolId) || [];
    const minReels = sym.rarity === "premium" ? 2 : 3;
    if (reels.length < minReels) continue;

    // Each group pays on ALL 10 lines based on its own reel count
    let multiplier = 0;
    if (reels.length === 2 && sym.rarity === "premium") multiplier = sym.multiplier_2;
    else if (reels.length === 3) multiplier = sym.multiplier_3;
    else if (reels.length === 4) multiplier = sym.multiplier_4;
    else if (reels.length === 5) multiplier = sym.multiplier_5;

    if (multiplier > 0) {
      for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
        wins.push({
          lineIndex,
          symbolId: sym.id,
          count: reels.length,
          payout: multiplier * betAmount,
        });
      }
    }
  }

  return wins;
}

function calculateStandardLineWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number
): LineWin[] {
  const wins: LineWin[] = [];
  const symbolsById = new Map(symbols.map((s) => [s.id, s]));

  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => grid[col][row]);
    const lineSymbolData = lineSymbols.map((id) => symbolsById.get(id));

    if (lineSymbolData.some((s) => !s)) continue;

    const validSymbols = lineSymbolData as SlotSymbol[];
    let baseSymbol = validSymbols.find((s) => !s.is_wild && !s.is_scatter) || validSymbols[0];

    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = validSymbols[i];
      if (current.id === baseSymbol.id || current.is_wild || current.is_scatter) {
        count++;
        if ((baseSymbol.is_wild || baseSymbol.is_scatter) && !current.is_wild && !current.is_scatter) {
          baseSymbol = current;
        }
      } else {
        break;
      }
    }

    const minMatches = baseSymbol.rarity === "premium" ? 2 : 3;
    if (count >= minMatches) {
      let multiplier = 0;
      if (count === 2 && baseSymbol.rarity === "premium") multiplier = baseSymbol.multiplier_2;
      else if (count === 3) multiplier = baseSymbol.multiplier_3;
      else if (count === 4) multiplier = baseSymbol.multiplier_4;
      else if (count === 5) multiplier = baseSymbol.multiplier_5;

      if (multiplier > 0) {
        wins.push({ lineIndex, symbolId: baseSymbol.id, count, payout: multiplier * betAmount });
      }
    }
  }

  return wins;
}

function getWeightedRandomSymbol(symbols: SlotSymbol[]): SlotSymbol {
  const getWeight = (s: SlotSymbol) =>
    s.bonus_weight || s.weight || DEFAULT_SYMBOL_WEIGHT;
  const totalWeight = symbols.reduce((sum, s) => sum + getWeight(s), 0);
  let random = secureRandom() * totalWeight;

  for (const symbol of symbols) {
    random -= getWeight(symbol);
    if (random <= 0) return symbol;
  }

  return symbols[symbols.length - 1];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Decode JWT locally — no network round-trip needed
    const token = authHeader.replace("Bearer ", "");
    const claims = decodeJwtPayload(token);
    if (!claims?.sub || typeof claims.sub !== "string") {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (claims.exp && typeof claims.exp === "number" && claims.exp < Date.now() / 1000) {
      return new Response(
        JSON.stringify({ error: "Token expired" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const userId = claims.sub;

    // Use singleton service client (avoids creating new TCP connections)
    const serviceClient = getServiceClient();

    // Parse request body
    const body = await req.json();
    let { bet, sessionId, isBonusSpin, gameId: rawGameId, clientSeed, nonce, debugScatters, doubleChance, buyBonus } = body;
    const gameId = rawGameId || "book-of-fedesvin";

    // Validate clientSeed and nonce for provably fair RNG
    if (typeof clientSeed !== "string" || clientSeed.length === 0 || clientSeed.length > 128) {
      clientSeed = "default";
    }
    if (typeof nonce !== "number" || nonce < 0 || !Number.isFinite(nonce)) {
      nonce = 0;
    }

    console.log(`[slot-spin] gameId=${gameId}, bet=${bet}, isBonusSpin=${isBonusSpin}, userId=${userId}`);

    // Validate bet amount (global safety cap)
    if (typeof bet !== "number" || bet < 1 || bet > 50 || !Number.isInteger(bet)) {
      return new Response(
        JSON.stringify({ error: "Invalid bet amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Per-game max bet enforcement (loaded from site_settings, cached)
    const isBonanzaGame = gameId === "fedesvin-bonanza";
    const isGatesGame = gameId === "gates-of-fedesvin";
    
    if (isBonanzaGame) {
      await loadBonanzaSettings(serviceClient);
      if (bet > BONANZA_MAX_BET) {
        console.log(`[slot-spin] REJECTED: bet ${bet} exceeds bonanza max ${BONANZA_MAX_BET} for user ${userId}`);
        return new Response(
          JSON.stringify({ error: `Bet exceeds maximum of ${BONANZA_MAX_BET} for this game` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else if (isGatesGame) {
      await loadGatesSettings(serviceClient);
      if (bet > GATES_MAX_BET) {
        console.log(`[slot-spin] REJECTED: bet ${bet} exceeds gates max ${GATES_MAX_BET} for user ${userId}`);
        return new Response(
          JSON.stringify({ error: `Bet exceeds maximum of ${GATES_MAX_BET} for this game` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      // Book of Fedesvin / Rise of Fedesvin: use slot_max_bet
      let slotMaxBet = 10;
      const slotMaxCached = settingsCache.get("slot_max_bet");
      if (slotMaxCached && Date.now() - slotMaxCached.fetchedAt < SETTINGS_CACHE_TTL_MS) {
        slotMaxBet = slotMaxCached.data;
      } else {
        const { data: smb } = await serviceClient
          .from("site_settings").select("value").eq("key", "slot_max_bet").maybeSingle();
        slotMaxBet = parseInt(smb?.value || "10", 10);
        settingsCache.set("slot_max_bet", { data: slotMaxBet, fetchedAt: Date.now() });
      }
      if (bet > slotMaxBet) {
        console.log(`[slot-spin] REJECTED: bet ${bet} exceeds slot max ${slotMaxBet} for user ${userId}`);
        return new Response(
          JSON.stringify({ error: `Bet exceeds maximum of ${slotMaxBet} for this game` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Get symbols from module-level cache (eliminates DB call for warm instances)
    let symbols: SlotSymbol[];
    const symCached = symbolsCache.get(gameId);
    if (symCached && Date.now() - symCached.fetchedAt < SYMBOL_CACHE_TTL_MS) {
      symbols = symCached.data as SlotSymbol[];
    } else {
      const { data: fetchedSymbols, error: symErr } = await serviceClient
        .from("slot_symbols").select("*").eq("game_id", gameId).order("position");
      if (symErr || !fetchedSymbols || fetchedSymbols.length === 0) {
        return new Response(JSON.stringify({ error: "Failed to load symbols" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      symbols = fetchedSymbols as SlotSymbol[];
      symbolsCache.set(gameId, { data: symbols, fetchedAt: Date.now() });
    }

    // Get daily spins setting from cache (eliminates DB call for warm instances)
    let dailySpinsValue: number;
    const settingsCached = settingsCache.get("slot_daily_spins");
    if (settingsCached && Date.now() - settingsCached.fetchedAt < SETTINGS_CACHE_TTL_MS) {
      dailySpinsValue = settingsCached.data;
    } else {
      const { data: sd } = await serviceClient
        .from("site_settings").select("value").eq("key", "slot_daily_spins").maybeSingle();
      dailySpinsValue = parseInt(sd?.value || "100", 10);
      settingsCache.set("slot_daily_spins", { data: dailySpinsValue, fetchedAt: Date.now() });
    }

    // Parallelize ALL per-user reads: session check + profile + bonus state
    const [sessionRes, profileRes, bonusRes] = await Promise.all([
      serviceClient
        .from("slot_active_sessions")
        .select("session_id")
        .eq("user_id", userId)
        .maybeSingle(),
      serviceClient
        .from("profiles")
        .select("bonus_spins_permanent, twitch_badges")
        .eq("user_id", userId)
        .maybeSingle(),
      // Pre-fetch bonus state (used only for bonus spins, but avoids sequential read)
      isBonusSpin
        ? serviceClient
            .from("slot_bonus_state")
            .select("*")
            .eq("user_id", userId)
            .eq("game_id", gameId)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);

    // Validate session (anti-multi-device)
    const sessionData = sessionRes.data;
    if (sessionData && sessionData.session_id !== sessionId) {
      return new Response(
        JSON.stringify({ error: "Session blocked - active on another device" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isRiseOfFedesvin = gameId === "rise-of-fedesvin";
    const isGatesOfFedesvin = gameId === "gates-of-fedesvin";

    // ============================================================
    // GATES OF FEDESVIN - completely different game engine
    // ============================================================
    if (isGatesOfFedesvin) {
      // Load Gates settings from DB (cached 5 min)
      await loadGatesSettings(serviceClient);
      
      // Create provably fair PRNG from serverSecret + userId + clientSeed + nonce
      const serverSecret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "default-server-secret";
      const prng = await SeededPRNG.create(serverSecret, userId, clientSeed, nonce);
      
      if (isBonusSpin) {
        const bonusData = bonusRes.data;
        if (bonusRes.error || !bonusData || !bonusData.is_active || bonusData.free_spins_remaining <= 0) {
          return new Response(JSON.stringify({ error: "No active bonus or no free spins remaining" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const lockedBet = Number(bonusData.bet_amount);
        if (lockedBet > 0) bet = lockedBet;
        const cumulativeMultiplier = Number(bonusData.expanding_symbol_name || "0");
        const gatesResult = await calculateGatesFullSpin(symbols, bet, true, cumulativeMultiplier, prng);
        const isRetrigger = gatesResult.scatterCount >= GATES_SCATTER_RETRIGGER;
        const newFreeSpins = isRetrigger ? bonusData.free_spins_remaining - 1 + GATES_FREE_SPINS_RETRIGGER : bonusData.free_spins_remaining - 1;
        const newTotalFreeSpins = isRetrigger ? bonusData.total_free_spins + GATES_FREE_SPINS_RETRIGGER : bonusData.total_free_spins;
        const newBonusWinnings = Number(bonusData.bonus_winnings) + gatesResult.totalWin;
        await serviceClient.from("slot_bonus_state").update({
          free_spins_remaining: newFreeSpins, total_free_spins: newTotalFreeSpins,
          bonus_winnings: newBonusWinnings, expanding_symbol_name: String(gatesResult.totalMultiplier),
          is_active: newFreeSpins > 0,
        }).eq("user_id", userId).eq("game_id", gameId);
        if (newFreeSpins <= 0 && newBonusWinnings > 0) {
          // DEMO MODE: Skip leaderboard recording for Gates
          // (async () => { try { await serviceClient.from("slot_game_results").insert({ user_id: userId, bet_amount: bet, win_amount: 0, is_bonus_triggered: false, bonus_win_amount: newBonusWinnings, game_id: gameId }); } catch (e) { console.error("[slot-spin] Gates bonus bg err:", e); } })();
        }
        return new Response(JSON.stringify({ success: true, result: gatesResult, bonusState: { isActive: newFreeSpins > 0, freeSpinsRemaining: newFreeSpins, totalFreeSpins: newTotalFreeSpins, bonusWinnings: newBonusWinnings, cumulativeMultiplier: gatesResult.totalMultiplier, betAmount: bet, isRetrigger } }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      // Gates normal spin
      const nowG = new Date();
      const todayG = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(nowG);
      const bonusSpinsPerm = profileRes.data?.bonus_spins_permanent || 0;
      const isSub = !!(profileRes.data as any)?.twitch_badges?.is_subscriber;
      const subBon = isSub ? SUBSCRIBER_BONUS : 0;
      const capLim = isSub ? SUBSCRIBER_MAX_SPINS_CAP : MAX_SPINS_CAP;
      const maxSp = Math.min(dailySpinsValue + subBon + bonusSpinsPerm, capLim);
      const { data: newRem, error: rpcErr } = await serviceClient.rpc("deduct_spin", { p_user_id: userId, p_date: todayG, p_bet: bet, p_max_spins: maxSp, p_game_id: "shared" });
      if (rpcErr) return new Response(JSON.stringify({ error: "Failed to deduct spins" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (newRem === -1) return new Response(JSON.stringify({ error: "Not enough spins remaining" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const gatesResult = await calculateGatesFullSpin(symbols, bet, false, 0, prng);
      let gatesBonusState = null;
      if (gatesResult.bonusTriggered) {
        const awardedSpins = gatesResult.scatterCount >= 6 ? 15 : gatesResult.scatterCount >= 5 ? 12 : 10;
        await serviceClient.from("slot_bonus_state").delete().eq("user_id", userId).eq("game_id", gameId);
        await serviceClient.from("slot_bonus_state").insert({ user_id: userId, is_active: true, free_spins_remaining: awardedSpins, total_free_spins: awardedSpins, expanding_symbol_name: "0", bonus_winnings: gatesResult.totalWin, game_id: gameId, bet_amount: bet });
        gatesBonusState = { isActive: true, freeSpinsRemaining: awardedSpins, totalFreeSpins: awardedSpins, bonusWinnings: gatesResult.totalWin, cumulativeMultiplier: 0, betAmount: bet };
      }
      // DEMO MODE: Skip leaderboard recording for Gates
      // (async () => { try { await serviceClient.from("slot_game_results").insert({ user_id: userId, bet_amount: bet, win_amount: gatesResult.totalWin, is_bonus_triggered: gatesResult.bonusTriggered, bonus_win_amount: 0, game_id: gameId }); } catch (e) { console.error("[slot-spin] Gates bg err:", e); } })();
      return new Response(JSON.stringify({ success: true, result: gatesResult, spinsRemaining: newRem, maxSpins: maxSp, bonusState: gatesBonusState }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // END GATES OF FEDESVIN

    // ============================================================
    // FEDESVIN BONANZA - Sweet Bonanza-style engine
    // 6x5 grid, Pay Anywhere (8+ match), tumble/cascade, multiplier bombs in bonus
    // ============================================================
    // isBonanzaGame already declared above during per-game max bet check
    if (isBonanzaGame) {
      // Load Bonanza settings from DB (cached 5 min)
      await loadBonanzaSettings(serviceClient);

      // Pre-fetch tournament participations (cached for entire request)
      const tournamentParticipationsPromise = serviceClient
        .from("tournament_participants")
        .select("tournament_id")
        .eq("user_id", userId);

      // Create provably fair PRNG
      const serverSecret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "default-server-secret";
      const [prng, { data: cachedParticipations }] = await Promise.all([
        SeededPRNG.create(serverSecret, userId, clientSeed, nonce),
        tournamentParticipationsPromise,
      ]);

      if (isBonusSpin) {
        const bonusData = bonusRes.data;
        if (bonusRes.error || !bonusData || !bonusData.is_active || bonusData.free_spins_remaining <= 0) {
          return new Response(JSON.stringify({ error: "No active bonus or no free spins remaining" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const lockedBet = Number(bonusData.bet_amount);
        if (lockedBet > 0) bet = lockedBet;
        const cumulativeMultiplier = Number(bonusData.expanding_symbol_name || "0");
        const bonanzaResult = await calculateBonanzaFullSpin(symbols, bet, true, cumulativeMultiplier, prng);
        const isRetrigger = bonanzaResult.scatterCount >= BONANZA_SCATTER_RETRIGGER;
        const newFreeSpins = isRetrigger ? bonusData.free_spins_remaining - 1 + BONANZA_FREE_SPINS_RETRIGGER : bonusData.free_spins_remaining - 1;
        const newTotalFreeSpins = isRetrigger ? bonusData.total_free_spins + BONANZA_FREE_SPINS_RETRIGGER : bonusData.total_free_spins;
        const newBonusWinnings = Number(bonusData.bonus_winnings) + bonanzaResult.totalWin;
        await serviceClient.from("slot_bonus_state").update({
          free_spins_remaining: newFreeSpins, total_free_spins: newTotalFreeSpins,
          bonus_winnings: newBonusWinnings, expanding_symbol_name: String(bonanzaResult.totalMultiplier),
          is_active: newFreeSpins > 0,
        }).eq("user_id", userId).eq("game_id", gameId);
        if (newFreeSpins <= 0 && newBonusWinnings > 0) {
          const bonanzaBonusNowISO = new Date().toISOString();
          const capturedBonanzaWinnings = newBonusWinnings;
          const capturedBonanzaBet = bet;
          (async () => {
            try {
              const participations = cachedParticipations;
              let skipBonusGlobal = false;

              if (participations && participations.length > 0) {
                const participatingIds = participations.map((p: { tournament_id: string }) => p.tournament_id);
                const [{ data: activeTournaments }, { data: allEntries }] = await Promise.all([
                  serviceClient.from("tournaments").select("id, exclude_from_global_leaderboard, max_credits, max_bet")
                    .in("id", participatingIds).contains("game_ids", [gameId])
                    .lte("starts_at", bonanzaBonusNowISO).gte("ends_at", bonanzaBonusNowISO),
                  serviceClient.from("tournament_entries").select("tournament_id, total_credits_used")
                    .in("tournament_id", participatingIds).eq("user_id", userId),
                ]);

                if (activeTournaments && activeTournaments.length > 0) {
                  await Promise.all(activeTournaments.map(async (t) => {
                    if (t.max_bet && capturedBonanzaBet > t.max_bet) return;
                    if (t.exclude_from_global_leaderboard) {
                      if (t.max_credits) {
                        const totalUsed = (allEntries || [])
                          .filter((e: { tournament_id: string }) => e.tournament_id === t.id)
                          .reduce((sum: number, e: { total_credits_used: number }) => sum + Number(e.total_credits_used || 0), 0);
                        if (totalUsed + capturedBonanzaBet <= t.max_credits) skipBonusGlobal = true;
                      } else {
                        skipBonusGlobal = true;
                      }
                    }
                    await serviceClient.rpc("upsert_tournament_entry", {
                      p_tournament_id: t.id, p_user_id: userId, p_game_id: gameId,
                      p_points: capturedBonanzaWinnings, p_bet: capturedBonanzaBet, p_is_bonus: true,
                    });
                  }));
                }
              }

              if (!skipBonusGlobal) {
                await serviceClient.from("slot_game_results").insert({
                  user_id: userId, bet_amount: capturedBonanzaBet, win_amount: 0,
                  is_bonus_triggered: false, bonus_win_amount: capturedBonanzaWinnings, game_id: gameId,
                });
              }
            } catch (e) { console.error("[slot-spin] Bonanza bonus bg err:", e); }
          })();
        }
        return new Response(JSON.stringify({ success: true, result: bonanzaResult, bonusState: { isActive: newFreeSpins > 0, freeSpinsRemaining: newFreeSpins, totalFreeSpins: newTotalFreeSpins, bonusWinnings: newBonusWinnings, cumulativeMultiplier: bonanzaResult.totalMultiplier, betAmount: bet, isRetrigger } }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Bonanza normal spin
      const nowB = new Date();
      const todayB = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(nowB);
      const bonusSpinsPermB = profileRes.data?.bonus_spins_permanent || 0;
      const isSubB = !!(profileRes.data as any)?.twitch_badges?.is_subscriber;
      const subBonB = isSubB ? SUBSCRIBER_BONUS : 0;
      const capLimB = isSubB ? SUBSCRIBER_MAX_SPINS_CAP : MAX_SPINS_CAP;
      const maxSpB = Math.min(dailySpinsValue + subBonB + bonusSpinsPermB, capLimB);
      const { data: newRemB, error: rpcErrB } = await serviceClient.rpc("deduct_spin", { p_user_id: userId, p_date: todayB, p_bet: bet, p_max_spins: maxSpB, p_game_id: "shared" });
      if (rpcErrB) return new Response(JSON.stringify({ error: "Failed to deduct spins" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (newRemB === -1) return new Response(JSON.stringify({ error: "Not enough spins remaining" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      // Debug scatters: admin-only, force 4 scatters onto grid after generation
      let forceScatters = false;
      if (debugScatters) {
        const { data: isAdminData } = await serviceClient.rpc("has_role", { _user_id: userId, _role: "admin" });
        if (isAdminData === true) forceScatters = true;
      }

      const bonanzaResult = await calculateBonanzaFullSpin(symbols, bet, false, 0, prng, forceScatters);
      let bonanzaBonusState = null;
      if (bonanzaResult.bonusTriggered) {
        const sc = bonanzaResult.scatterCount;
        const awardedSpins = sc >= 6 ? BONANZA_FREE_SPINS_6 : sc >= 5 ? BONANZA_FREE_SPINS_5 : BONANZA_FREE_SPINS_4;
        await serviceClient.from("slot_bonus_state").delete().eq("user_id", userId).eq("game_id", gameId);
        await serviceClient.from("slot_bonus_state").insert({ user_id: userId, is_active: true, free_spins_remaining: awardedSpins, total_free_spins: awardedSpins, expanding_symbol_name: "0", bonus_winnings: bonanzaResult.totalWin, game_id: gameId, bet_amount: bet });
        bonanzaBonusState = { isActive: true, freeSpinsRemaining: awardedSpins, totalFreeSpins: awardedSpins, bonusWinnings: bonanzaResult.totalWin, cumulativeMultiplier: 0, betAmount: bet };
      }
      const bonanzaNowISO = new Date().toISOString();
      const bonanzaSpinWin = bonanzaResult.totalWin;
      const bonanzaSpinBonus = bonanzaResult.bonusTriggered;
      (async () => {
        try {
          const participations = cachedParticipations;
          let skipGlobal = false;

          if (participations && participations.length > 0) {
            const participatingIds = participations.map((p: { tournament_id: string }) => p.tournament_id);
            const [{ data: activeTournaments }, { data: allEntries }] = await Promise.all([
              serviceClient.from("tournaments").select("id, exclude_from_global_leaderboard, max_credits, max_bet")
                .in("id", participatingIds).contains("game_ids", [gameId])
                .lte("starts_at", bonanzaNowISO).gte("ends_at", bonanzaNowISO),
              serviceClient.from("tournament_entries").select("tournament_id, total_credits_used")
                .in("tournament_id", participatingIds).eq("user_id", userId),
            ]);

            if (activeTournaments && activeTournaments.length > 0) {
              await Promise.all(activeTournaments.map(async (t) => {
                if (t.max_bet && bet > t.max_bet) return;
                if (t.exclude_from_global_leaderboard) {
                  if (t.max_credits) {
                    const totalUsed = (allEntries || [])
                      .filter((e: { tournament_id: string }) => e.tournament_id === t.id)
                      .reduce((sum: number, e: { total_credits_used: number }) => sum + Number(e.total_credits_used || 0), 0);
                    if (totalUsed + bet <= t.max_credits) skipGlobal = true;
                  } else {
                    skipGlobal = true;
                  }
                }
                await serviceClient.rpc("upsert_tournament_entry", {
                  p_tournament_id: t.id, p_user_id: userId, p_game_id: gameId,
                  p_points: bonanzaSpinWin, p_bet: bet, p_is_bonus: false,
                });
              }));
            }
          }

          if (!skipGlobal) {
            await serviceClient.from("slot_game_results").insert({
              user_id: userId, bet_amount: bet, win_amount: bonanzaSpinWin,
              is_bonus_triggered: bonanzaSpinBonus, bonus_win_amount: 0, game_id: gameId,
            });
          }
        } catch (e) { console.error("[slot-spin] Bonanza bg err:", e); }
      })();
      return new Response(JSON.stringify({ success: true, result: bonanzaResult, spinsRemaining: newRemB, maxSpins: maxSpB, bonusState: bonanzaBonusState }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // END FEDESVIN BONANZA

    // Handle bonus spin (bonus state already fetched in parallel above)
    if (isBonusSpin) {
      const bonusData = bonusRes.data;
      const bonusError = bonusRes.error;

      if (bonusError || !bonusData || !bonusData.is_active || bonusData.free_spins_remaining <= 0) {
        return new Response(
          JSON.stringify({ error: "No active bonus or no free spins remaining" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Use the locked-in bet from bonus trigger, not the client-sent value
      const lockedBet = Number(bonusData.bet_amount);
      if (lockedBet > 0 && lockedBet !== bet) {
        console.log(`[slot-spin] Bonus bet override: client sent bet=${bet}, using locked bet=${lockedBet} from DB`);
      }
      bet = lockedBet > 0 ? lockedBet : bet;

      // Generate grid with bonus weights
      const originalGrid = generateGrid(symbols, true);
      
      // Count scatters for retrigger
      const scatterCount = countScatters(originalGrid, symbols);
      const isRetrigger = scatterCount >= 3;

      let expandedGrid: string[][];
      let expandedReels: number[];
      let wins: LineWin[];
      let newExpandingSymbolIds = bonusData.expanding_symbol_ids || [];
      let newExpandingSymbolNames = bonusData.expanding_symbol_names || [];
      let expandedReelSymbolIds: Record<string, string> | undefined;
      let expandingWinGroups: Array<{ symbolId: string; reels: number[]; wins: LineWin[] }> | undefined;

      if (isRiseOfFedesvin) {
        // ===== RISE OF FEDESVIN: Multi-expanding symbol logic =====
        
        // Handle retrigger: pick a NEW expanding symbol
        if (isRetrigger) {
          const currentExpandingIds: string[] = newExpandingSymbolIds;
          const eligibleForNew = symbols.filter(
            (s: SlotSymbol) => !s.is_scatter && !currentExpandingIds.includes(s.id)
          );
          
          if (eligibleForNew.length > 0) {
            const newExpandSym = getWeightedRandomSymbol(eligibleForNew);
            newExpandingSymbolIds = [...currentExpandingIds, newExpandSym.id];
            newExpandingSymbolNames = [...(bonusData.expanding_symbol_names || []), newExpandSym.name];
            console.log(`[slot-spin] Rise retrigger: added new expanding symbol ${newExpandSym.name} (${newExpandSym.id})`);
          }
        }

        // Resolve all expanding symbols from IDs
        const expandingSymbols = newExpandingSymbolIds
          .map((id: string) => symbols.find((s: SlotSymbol) => s.id === id))
          .filter(Boolean) as SlotSymbol[];

        if (expandingSymbols.length === 0) {
          // Fallback: use single symbol if array is empty (shouldn't happen)
          const fallback = symbols.find((s: SlotSymbol) => s.id === bonusData.expanding_symbol_id);
          if (fallback) expandingSymbols.push(fallback);
        }

        // Apply multi-expanding
        const multiResult = applyMultiExpandingSymbols(originalGrid, expandingSymbols);
        expandedGrid = multiResult.expandedGrid;
        expandedReels = multiResult.expandedReels;

        // Calculate wins with multi-expanding logic using INDEPENDENT reels per symbol
        wins = calculateMultiExpandingBonusWins(
          originalGrid,
          expandedReels,
          multiResult.expandedSymbolMap,
          symbols,
          bet,
          expandingSymbols,
          multiResult.independentSymbolReels,
          multiResult.qualifyingSymbolIds
        );

        // Build per-reel symbol mapping and win groups for sequential animation
        expandedReelSymbolIds = {};
        expandingWinGroups = [];

        if (expandedReels.length > 0) {
          // Map each reel to its expanding symbol ID (for merged grid display)
          for (const col of expandedReels) {
            const sym = multiResult.expandedSymbolMap.get(col);
            if (sym) {
              expandedReelSymbolIds[String(col)] = sym.id;
            }
          }

          // Build win groups using INDEPENDENT per-symbol reels (not conflict-resolved)
          for (const symId of multiResult.qualifyingSymbolIds) {
            const reels = multiResult.independentSymbolReels.get(symId) || [];
            const symbolWins = wins.filter(w => w.symbolId === symId);
            if (symbolWins.length > 0) {
              expandingWinGroups.push({ symbolId: symId, reels, wins: symbolWins });
            }
          }

          console.log(`[slot-spin] Rise expanding win groups: ${expandingWinGroups.length} groups, independent reels:`,
            Object.fromEntries(multiResult.independentSymbolReels));
        }
      } else {
        // ===== BOOK OF FEDESVIN: Single expanding symbol (original logic) =====
        const expandingSymbol = symbols.find((s: SlotSymbol) => s.id === bonusData.expanding_symbol_id);
        if (!expandingSymbol) {
          return new Response(
            JSON.stringify({ error: "Expanding symbol not found" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const singleResult = applyExpandingSymbol(originalGrid, expandingSymbol, symbols);
        expandedGrid = singleResult.expandedGrid;
        expandedReels = singleResult.expandedReels;

        wins = calculateBonusWins(expandedGrid, expandedReels, symbols, bet, expandingSymbol);
      }

      // Calculate scatter payout
      const scatterSymbol = symbols.find((s: SlotSymbol) => s.is_scatter);
      let scatterPayout = 0;
      if (scatterSymbol && scatterCount >= 3) {
        if (scatterCount === 3) scatterPayout = scatterSymbol.multiplier_3 * bet;
        else if (scatterCount === 4) scatterPayout = scatterSymbol.multiplier_4 * bet;
        else if (scatterCount === 5) scatterPayout = scatterSymbol.multiplier_5 * bet;
      }

      const totalWin = wins.reduce((sum, w) => sum + w.payout, 0) + scatterPayout;

      // Update bonus state in database
      const newFreeSpins = isRetrigger 
        ? bonusData.free_spins_remaining - 1 + 10 
        : bonusData.free_spins_remaining - 1;
      
      const newTotalFreeSpins = isRetrigger 
        ? bonusData.total_free_spins + 10 
        : bonusData.total_free_spins;

      const newBonusWinnings = Number(bonusData.bonus_winnings) + totalWin;

      const updatePayload: Record<string, unknown> = {
        free_spins_remaining: newFreeSpins,
        total_free_spins: newTotalFreeSpins,
        bonus_winnings: newBonusWinnings,
      };

      // For Rise: update expanding arrays on retrigger
      if (isRiseOfFedesvin && isRetrigger) {
        updatePayload.expanding_symbol_ids = newExpandingSymbolIds;
        updatePayload.expanding_symbol_names = newExpandingSymbolNames;
        // Keep single field in sync with first symbol for backward compat
        if (newExpandingSymbolIds.length > 0) {
          updatePayload.expanding_symbol_id = newExpandingSymbolIds[0];
          updatePayload.expanding_symbol_name = newExpandingSymbolNames[0];
        }
      }

      await serviceClient
        .from("slot_bonus_state")
        .update(updatePayload)
        .eq("user_id", userId)
        .eq("game_id", gameId);

      // Record bonus result server-side when bonus just ended - fire-and-forget
      if (newFreeSpins <= 0 && newBonusWinnings > 0) {
        const bonusNowISO = new Date().toISOString();
        const capturedWinnings = newBonusWinnings;
        const capturedBet = bet;

        (async () => {
          try {
            const { data: participations } = await serviceClient
              .from("tournament_participants")
              .select("tournament_id")
              .eq("user_id", userId);

            let skipBonusGlobal = false;

            if (participations && participations.length > 0) {
              const participatingIds = participations.map((p: { tournament_id: string }) => p.tournament_id);

              const [{ data: activeTournaments }, { data: allEntries }] = await Promise.all([
                serviceClient
                  .from("tournaments")
                  .select("id, exclude_from_global_leaderboard, max_credits, max_bet")
                  .in("id", participatingIds)
                  .contains("game_ids", [gameId])
                  .lte("starts_at", bonusNowISO)
                  .gte("ends_at", bonusNowISO),
                serviceClient
                  .from("tournament_entries")
                  .select("tournament_id, total_credits_used")
                  .in("tournament_id", participatingIds)
                  .eq("user_id", userId),
              ]);

              if (activeTournaments && activeTournaments.length > 0) {
                await Promise.all(activeTournaments.map(async (t) => {
                  // Enforce max_bet: skip tournament entry if bet exceeds max_bet
                  if (t.max_bet && capturedBet > t.max_bet) {
                    console.log(`[slot-spin] Bonus bet ${capturedBet} exceeds tournament max_bet ${t.max_bet} - skipping tournament entry`);
                    return;
                  }

                  if (t.exclude_from_global_leaderboard) {
                    if (t.max_credits) {
                      const totalUsed = (allEntries || [])
                        .filter((e: { tournament_id: string }) => e.tournament_id === t.id)
                        .reduce((sum: number, e: { total_credits_used: number }) => sum + Number(e.total_credits_used || 0), 0);
                      if (totalUsed + capturedBet <= t.max_credits) skipBonusGlobal = true;
                    } else {
                      skipBonusGlobal = true;
                    }
                  }

                  const { error: bonusUpsertErr } = await serviceClient.rpc("upsert_tournament_entry", {
                    p_tournament_id: t.id,
                    p_user_id: userId,
                    p_game_id: gameId,
                    p_points: capturedWinnings,
                    p_bet: capturedBet,
                    p_is_bonus: true,
                  });
                  if (bonusUpsertErr) {
                    console.error("[slot-spin] Tournament bonus entry upsert failed:", JSON.stringify(bonusUpsertErr));
                  }
                }));
              }
            }

            if (!skipBonusGlobal) {
              await serviceClient.from("slot_game_results").insert({
                user_id: userId,
                bet_amount: capturedBet,
                win_amount: 0,
                is_bonus_triggered: false,
                bonus_win_amount: capturedWinnings,
                game_id: gameId,
              });
            }
          } catch (err) {
            console.error("[slot-spin] Bonus background processing failed:", err);
          }
        })();
      }

      const result: BonusSpinResult = {
        grid: originalGrid,
        expandedGrid,
        expandedReels,
        wins,
        totalWin,
        bonusTriggered: isRetrigger,
        scatterCount,
        isRetrigger,
        expandedReelSymbolIds,
        expandingWinGroups,
      };

      // Build bonus state response
      const bonusStateResponse: Record<string, unknown> = {
        freeSpinsRemaining: newFreeSpins,
        totalFreeSpins: newTotalFreeSpins,
        bonusWinnings: newBonusWinnings,
        expandingSymbolId: bonusData.expanding_symbol_id,
        expandingSymbolName: bonusData.expanding_symbol_name,
        betAmount: bet,
      };

      if (isRiseOfFedesvin) {
        bonusStateResponse.expandingSymbolIds = newExpandingSymbolIds;
        bonusStateResponse.expandingSymbolNames = newExpandingSymbolNames;
      }

      return new Response(
        JSON.stringify({
          success: true,
          result,
          bonusState: bonusStateResponse,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normal spin - use atomic RPC for spin deduction
    // Use Danish timezone (Europe/Copenhagen) for date boundary
    const now = new Date();
    const todayParts = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Copenhagen",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
    const today = todayParts;
    
    // Profile and settings already fetched/cached above
    const bonusSpinsPermanent = profileRes.data?.bonus_spins_permanent || 0;
    const isSubscriber = !!(profileRes.data as any)?.twitch_badges?.is_subscriber;
    const subBonus = isSubscriber ? SUBSCRIBER_BONUS : 0;
    const capLimit = isSubscriber ? SUBSCRIBER_MAX_SPINS_CAP : MAX_SPINS_CAP;
    const maxSpins = Math.min(dailySpinsValue + subBonus + bonusSpinsPermanent, capLimit);

    // Atomic spin deduction via RPC (handles init + carry-over + deduction in 1 call)
    const { data: newRemaining, error: rpcError } = await serviceClient
      .rpc("deduct_spin", {
        p_user_id: userId,
        p_date: today,
        p_bet: bet,
        p_max_spins: maxSpins,
        p_game_id: "shared",
      });

    if (rpcError) {
      console.error("deduct_spin RPC error:", rpcError);
      return new Response(
        JSON.stringify({ error: "Failed to deduct spins" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (newRemaining === -1) {
      return new Response(
        JSON.stringify({ error: "Not enough spins remaining" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate spin result
    const grid = generateGrid(symbols, false);
    const result = calculateSpinResult(grid, symbols, bet);

    // If bonus triggered, create bonus state
    let bonusState = null;
    if (result.bonusTriggered) {
      const eligibleSymbols = symbols.filter((s: SlotSymbol) => !s.is_scatter);
      const expandingSymbol = getWeightedRandomSymbol(eligibleSymbols);

      // Carry over any base-game win from the triggering spin into bonus_winnings
      const carryOverWin = result.totalWin;
      const bonusInsert: Record<string, unknown> = {
        user_id: userId,
        is_active: true,
        free_spins_remaining: 10,
        total_free_spins: 10,
        expanding_symbol_id: expandingSymbol.id,
        expanding_symbol_name: expandingSymbol.name,
        bonus_winnings: carryOverWin,
        game_id: gameId,
        bet_amount: bet,
      };

      // For Rise of Fedesvin, also set the arrays
      if (isRiseOfFedesvin) {
        bonusInsert.expanding_symbol_ids = [expandingSymbol.id];
        bonusInsert.expanding_symbol_names = [expandingSymbol.name];
      }

      // Awaited: bonus state MUST exist before we respond, otherwise the
      // first bonus spin will hit "No active bonus" due to a race condition.
      await serviceClient
        .from("slot_bonus_state")
        .delete()
        .eq("user_id", userId)
        .eq("game_id", gameId);

      const { error: bonusInsertError } = await serviceClient
        .from("slot_bonus_state")
        .insert(bonusInsert);

      if (bonusInsertError) {
        console.error("[slot-spin] Bonus state insert failed:", bonusInsertError);
      }

      bonusState = {
        isActive: true,
        freeSpinsRemaining: 10,
        totalFreeSpins: 10,
        expandingSymbolId: expandingSymbol.id,
        expandingSymbolName: expandingSymbol.name,
        bonusWinnings: carryOverWin,
        betAmount: bet,
      } as Record<string, unknown>;

      if (isRiseOfFedesvin) {
        bonusState.expandingSymbolIds = [expandingSymbol.id];
        bonusState.expandingSymbolNames = [expandingSymbol.name];
      }
    }

    // Tournament + game result handling - run fully async (fire-and-forget)
    // This does NOT block the response, eliminating the main latency bottleneck
    const nowISO = new Date().toISOString();
    const spinTotalWin = result.totalWin;
    const spinBonusTriggered = result.bonusTriggered;

    (async () => {
      try {
        const { data: participations } = await serviceClient
          .from("tournament_participants")
          .select("tournament_id")
          .eq("user_id", userId);

        let skipGlobalLeaderboard = false;

        if (participations && participations.length > 0) {
          const participatingIds = participations.map((p: { tournament_id: string }) => p.tournament_id);

          // Fetch active tournaments and entries in parallel
          const [{ data: activeTournaments }, { data: allEntries }] = await Promise.all([
            serviceClient
              .from("tournaments")
              .select("id, exclude_from_global_leaderboard, max_credits, max_bet")
              .in("id", participatingIds)
              .contains("game_ids", [gameId])
              .lte("starts_at", nowISO)
              .gte("ends_at", nowISO),
            serviceClient
              .from("tournament_entries")
              .select("tournament_id, total_credits_used")
              .in("tournament_id", participatingIds)
              .eq("user_id", userId),
          ]);

          if (activeTournaments && activeTournaments.length > 0) {
            // Upsert all tournament entries in parallel
            await Promise.all(activeTournaments.map(async (t) => {
              // Enforce max_bet: skip tournament entry if bet exceeds max_bet
              if (t.max_bet && bet > t.max_bet) {
                console.log(`[slot-spin] Bet ${bet} exceeds tournament max_bet ${t.max_bet} for tournament ${t.id} - skipping tournament entry`);
                return;
              }

              if (t.exclude_from_global_leaderboard) {
                if (t.max_credits) {
                  const totalUsed = (allEntries || [])
                    .filter((e: { tournament_id: string }) => e.tournament_id === t.id)
                    .reduce((sum: number, e: { total_credits_used: number }) => sum + Number(e.total_credits_used || 0), 0);
                  if (totalUsed + bet <= t.max_credits) skipGlobalLeaderboard = true;
                } else {
                  skipGlobalLeaderboard = true;
                }
              }

              const { error: upsertError } = await serviceClient.rpc("upsert_tournament_entry", {
                p_tournament_id: t.id,
                p_user_id: userId,
                p_game_id: gameId,
                p_points: spinTotalWin,
                p_bet: bet,
                p_is_bonus: false,
              });
              if (upsertError) {
                console.error("[slot-spin] Tournament entry upsert failed:", JSON.stringify(upsertError));
              } else {
                console.log(`[slot-spin] Tournament entry recorded: tournament=${t.id}, user=${userId}, game=${gameId}, points=${spinTotalWin}`);
              }
            }));
          }
        }

        if (!skipGlobalLeaderboard) {
          await serviceClient.from("slot_game_results").insert({
            user_id: userId,
            bet_amount: bet,
            win_amount: spinTotalWin,
            is_bonus_triggered: spinBonusTriggered,
            bonus_win_amount: 0,
            game_id: gameId,
          });
        }
      } catch (err) {
        console.error("[slot-spin] Background tournament/result processing failed:", err);
      }
    })();

    return new Response(
      JSON.stringify({
        success: true,
        result,
        spinsRemaining: newRemaining,
        maxSpins,
        bonusState,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Spin error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
