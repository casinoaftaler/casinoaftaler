import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Slot game logic (ported from src/lib/slotGameLogic.ts) ──

const PAY_LINES = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [0, 1, 1, 1, 0],
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
}

const DEFAULT_SYMBOL_WEIGHT = 10;

function getRandomSymbol(symbols: SlotSymbol[], excludeIds: string[] = [], isBonusSpin = false): SlotSymbol {
  const available = symbols.filter((s) => !excludeIds.includes(s.id));
  const pool = available.length > 0 ? available : symbols;
  const getWeight = (s: SlotSymbol) =>
    isBonusSpin ? s.bonus_weight || s.weight || DEFAULT_SYMBOL_WEIGHT : s.weight || DEFAULT_SYMBOL_WEIGHT;
  const totalWeight = pool.reduce((sum, s) => sum + getWeight(s), 0);
  let random = Math.random() * totalWeight;
  for (const symbol of pool) {
    random -= getWeight(symbol);
    if (random <= 0) return symbol;
  }
  return pool[pool.length - 1];
}

function generateGrid(symbols: SlotSymbol[], isBonusSpin = false): string[][] {
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

function checkLineWin(grid: string[][], linePattern: number[], symbols: SlotSymbol[], betAmount: number) {
  const symbolsById = new Map(symbols.map((s) => [s.id, s]));
  const lineSymbols = linePattern.map((row, col) => grid[col][row]);
  const lineSymbolData = lineSymbols.map((id) => symbolsById.get(id));
  if (lineSymbolData.some((s) => !s)) return null;
  const validSymbols = lineSymbolData as SlotSymbol[];

  let baseSymbol = validSymbols.find((s) => !s.is_wild) || validSymbols[0];
  let count = 0;
  for (let i = 0; i < 5; i++) {
    const current = validSymbols[i];
    if (current.id === baseSymbol.id || current.is_wild || baseSymbol.is_wild) {
      count++;
      if (baseSymbol.is_wild && !current.is_wild) baseSymbol = current;
    } else break;
  }

  const minMatches = baseSymbol.rarity === "premium" ? 2 : 3;
  if (count >= minMatches) {
    let multiplier = 0;
    if (count === 2 && baseSymbol.rarity === "premium") multiplier = baseSymbol.multiplier_2;
    else if (count === 3) multiplier = baseSymbol.multiplier_3;
    else if (count === 4) multiplier = baseSymbol.multiplier_4;
    else if (count === 5) multiplier = baseSymbol.multiplier_5;
    if (multiplier > 0) return { payout: multiplier * betAmount };
  }
  return null;
}

function countScatters(grid: string[][], symbols: SlotSymbol[]): number {
  const scatter = symbols.find((s) => s.is_scatter);
  if (!scatter) return 0;
  let count = 0;
  for (const column of grid) {
    for (const id of column) {
      if (id === scatter.id) count++;
    }
  }
  return count;
}

function calculateSpinResult(grid: string[][], symbols: SlotSymbol[], betAmount: number) {
  let totalWin = 0;
  for (const line of PAY_LINES) {
    const win = checkLineWin(grid, line, symbols, betAmount);
    if (win) totalWin += win.payout;
  }
  const scatterCount = countScatters(grid, symbols);
  const bonusTriggered = scatterCount >= 3;
  const scatter = symbols.find((s) => s.is_scatter);
  if (scatter && scatterCount >= 3) {
    if (scatterCount === 3) totalWin += scatter.multiplier_3 * betAmount;
    else if (scatterCount === 4) totalWin += scatter.multiplier_4 * betAmount;
    else if (scatterCount === 5) totalWin += scatter.multiplier_5 * betAmount;
  }
  return { totalWin, bonusTriggered, scatterCount };
}

// ── Bonus round simulation ──

function simulateBonusRound(symbols: SlotSymbol[], betAmount: number): number {
  let freeSpins = 10;
  let bonusWinnings = 0;
  while (freeSpins > 0) {
    freeSpins--;
    const grid = generateGrid(symbols, true);
    const result = calculateSpinResult(grid, symbols, betAmount);
    bonusWinnings += result.totalWin;
    // Retrigger: 3+ scatters = +10 spins
    if (result.scatterCount >= 3) freeSpins += 10;
  }
  return bonusWinnings;
}

// ── Main handler ──

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Parse parameters (defaults: 100 users, 100 spins each)
    const body = await req.json().catch(() => ({}));
    const numUsers = Math.min(body.users || 100, 500);
    const spinsPerUser = Math.min(body.spins || 100, 500);
    const betAmount = body.bet || 1;
    const writeToDb = body.writeToDb ?? false; // default: don't pollute DB

    // Fetch symbols from DB
    const { data: rawSymbols, error: symError } = await supabase
      .from("slot_symbols")
      .select("*")
      .order("position", { ascending: true });

    if (symError) throw symError;

    const symbols: SlotSymbol[] = (rawSymbols || []).map((s: any) => ({
      ...s,
      rarity: s.rarity as "premium" | "common" | "scatter",
      weight: Number(s.weight) || 10,
      bonus_weight: Number(s.bonus_weight) || Number(s.weight) || 10,
      multiplier_2: Number(s.multiplier_2) || 0,
      multiplier_3: Number(s.multiplier_3) || 0,
      multiplier_4: Number(s.multiplier_4) || 0,
      multiplier_5: Number(s.multiplier_5) || 0,
    }));

    if (symbols.length === 0) {
      return new Response(JSON.stringify({ error: "No symbols configured" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Run simulation
    const startTime = Date.now();
    let totalSpins = 0;
    let totalBets = 0;
    let totalWins = 0;
    let totalBonusWins = 0;
    let bonusTriggers = 0;
    let biggestWin = 0;
    let biggestMultiplier = 0;
    const winDistribution: Record<string, number> = { "0": 0, "1-5": 0, "5-20": 0, "20-50": 0, "50-100": 0, "100+": 0 };
    const dbRecords: any[] = [];

    for (let u = 0; u < numUsers; u++) {
      // Generate a fake user_id for simulation (UUID v4-like)
      const fakeUserId = `stress-${u.toString().padStart(4, "0")}-${crypto.randomUUID().slice(0, 8)}`;

      for (let s = 0; s < spinsPerUser; s++) {
        totalSpins++;
        totalBets += betAmount;

        const grid = generateGrid(symbols, false);
        const result = calculateSpinResult(grid, symbols, betAmount);

        let spinWin = result.totalWin;
        let bonusWin = 0;
        const bonusTriggered = result.bonusTriggered;

        if (bonusTriggered) {
          bonusTriggers++;
          bonusWin = simulateBonusRound(symbols, betAmount);
        }

        const totalSpinWin = spinWin + bonusWin;
        totalWins += spinWin;
        totalBonusWins += bonusWin;

        if (totalSpinWin > biggestWin) biggestWin = totalSpinWin;
        const mult = betAmount > 0 ? totalSpinWin / betAmount : 0;
        if (mult > biggestMultiplier) biggestMultiplier = mult;

        // Win distribution
        if (totalSpinWin === 0) winDistribution["0"]++;
        else if (totalSpinWin <= 5 * betAmount) winDistribution["1-5"]++;
        else if (totalSpinWin <= 20 * betAmount) winDistribution["5-20"]++;
        else if (totalSpinWin <= 50 * betAmount) winDistribution["20-50"]++;
        else if (totalSpinWin <= 100 * betAmount) winDistribution["50-100"]++;
        else winDistribution["100+"]++;

        if (writeToDb) {
          dbRecords.push({
            user_id: fakeUserId,
            bet_amount: betAmount,
            win_amount: spinWin,
            bonus_win_amount: bonusWin,
            is_bonus_triggered: bonusTriggered,
          });
        }
      }
    }

    // Batch insert if requested (in chunks of 500)
    let dbInserted = 0;
    if (writeToDb && dbRecords.length > 0) {
      const chunkSize = 500;
      for (let i = 0; i < dbRecords.length; i += chunkSize) {
        const chunk = dbRecords.slice(i, i + chunkSize);
        const { error: insertError } = await supabase.from("slot_game_results").insert(chunk);
        if (insertError) {
          console.error("Insert error at chunk", i, insertError);
        } else {
          dbInserted += chunk.length;
        }
      }
    }

    const elapsed = Date.now() - startTime;
    const rtp = totalBets > 0 ? ((totalWins + totalBonusWins) / totalBets) * 100 : 0;

    const report = {
      simulation: {
        users: numUsers,
        spinsPerUser,
        betAmount,
        totalSpins,
        writeToDb,
        dbInserted,
      },
      results: {
        totalBets,
        totalWins: Math.round(totalWins * 100) / 100,
        totalBonusWins: Math.round(totalBonusWins * 100) / 100,
        totalPayout: Math.round((totalWins + totalBonusWins) * 100) / 100,
        rtp: Math.round(rtp * 100) / 100,
        bonusTriggers,
        bonusTriggerRate: Math.round((bonusTriggers / totalSpins) * 10000) / 100,
        biggestWin,
        biggestMultiplier: Math.round(biggestMultiplier * 10) / 10,
      },
      winDistribution,
      performance: {
        elapsedMs: elapsed,
        spinsPerSecond: Math.round(totalSpins / (elapsed / 1000)),
      },
    };

    return new Response(JSON.stringify(report, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stress test error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
