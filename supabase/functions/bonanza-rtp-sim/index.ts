import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// xoshiro128** PRNG
class PRNG {
  private s: Uint32Array;
  constructor(seed: number) {
    this.s = new Uint32Array(4);
    this.s[0] = seed >>> 0;
    this.s[1] = (seed * 1664525 + 1013904223) >>> 0;
    this.s[2] = (this.s[1] * 1664525 + 1013904223) >>> 0;
    this.s[3] = (this.s[2] * 1664525 + 1013904223) >>> 0;
    for (let i = 0; i < 20; i++) this.next();
  }
  next(): number {
    const s = this.s;
    const result = Math.imul(s[1] * 5, 1 << 7 | s[1] >>> 25) * 9;
    const t = s[1] << 9;
    s[2] ^= s[0]; s[3] ^= s[1]; s[1] ^= s[2]; s[0] ^= s[3];
    s[2] ^= t; s[3] = s[3] << 11 | s[3] >>> 21;
    return (result >>> 0) / 4294967296;
  }
}

interface Sym {
  id: string; name: string; weight: number; bonus_weight: number;
  is_scatter: boolean; multiplier_3: number; multiplier_4: number; multiplier_5: number;
}

const COLS = 6, ROWS = 5;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(url, key);

    const body = await req.json().catch(() => ({}));
    const overrides = body.overrides || {};

    // Load symbols from DB
    const { data: dbSyms } = await admin.from('slot_symbols')
      .select('id, name, weight, bonus_weight, is_scatter, multiplier_3, multiplier_4, multiplier_5')
      .eq('game_id', 'fedesvin-bonanza').order('position');
    if (!dbSyms?.length) throw new Error('No symbols');

    // Apply symbol overrides (weights and multipliers)
    const symbols: Sym[] = (dbSyms as Sym[]).map(s => {
      const o = overrides.symbols?.[s.id] || overrides.symbols?.[s.name] || {};
      return {
        ...s,
        weight: o.weight ?? s.weight,
        bonus_weight: o.bonus_weight ?? s.bonus_weight,
        multiplier_3: o.multiplier_3 ?? s.multiplier_3,
        multiplier_4: o.multiplier_4 ?? s.multiplier_4,
        multiplier_5: o.multiplier_5 ?? s.multiplier_5,
      };
    });

    // Load settings from DB
    const { data: settings } = await admin.from('site_settings')
      .select('key, value').like('key', 'bonanza_%');
    const dbCfg: Record<string, string> = {};
    settings?.forEach((s: any) => { dbCfg[s.key] = s.value || ''; });

    // Merge overrides.settings on top of DB settings
    const sCfg = overrides.settings || {};
    const g = (k: string, fallback: string) => sCfg[k] ?? dbCfg[`bonanza_${k}`] ?? dbCfg[k] ?? fallback;

    const MIN_MATCH = parseInt(g('min_match', '8'));
    const SCATTER_TRIGGER = parseInt(g('scatter_trigger', '4'));
    const SCATTER_RETRIGGER = parseInt(g('scatter_retrigger', '3'));
    const FREE_SPINS_4 = parseInt(g('free_spins_4', '10'));
    const FREE_SPINS_5 = parseInt(g('free_spins_5', '12'));
    const FREE_SPINS_6 = parseInt(g('free_spins_6', '15'));
    const FREE_SPINS_RETRIGGER = parseInt(g('free_spins_retrigger', '5'));
    const MULT_CHANCE = parseFloat(g('multiplier_chance_bonus', '0.10'));
    const DUP2 = parseFloat(g('reel_dup_2_chance', '0.35'));
    const DUP3 = parseFloat(g('reel_dup_3_chance', '0.10'));

    let MULT_VALUES = [2, 3, 5, 10, 15, 25, 50, 100];
    let MULT_WEIGHTS = [30, 25, 20, 12, 6, 3, 2, 1];
    const mvRaw = g('multiplier_values', '');
    const mwRaw = g('multiplier_weights', '');
    if (mvRaw) { try { MULT_VALUES = JSON.parse(mvRaw); } catch { MULT_VALUES = mvRaw.split(',').map(Number); } }
    if (mwRaw) { try { MULT_WEIGHTS = JSON.parse(mwRaw); } catch { MULT_WEIGHTS = mwRaw.split(',').map(Number); } }
    const MULT_TOTAL_W = MULT_WEIGHTS.reduce((a, b) => a + b, 0);

    const scatterSym = symbols.find(s => s.is_scatter);
    const nonScatter = symbols.filter(s => !s.is_scatter);

    const NUM_SPINS = Math.min(body.spins || 100000, 2000000);
    const BET = 1;
    const prng = new PRNG(body.seed || Date.now());

    function pickWeighted(syms: Sym[], bonus: boolean): Sym {
      const getW = (s: Sym) => bonus ? (s.bonus_weight || s.weight) : s.weight;
      const total = syms.reduce((sum, s) => sum + getW(s), 0);
      let r = prng.next() * total;
      for (const s of syms) { r -= getW(s); if (r <= 0) return s; }
      return syms[syms.length - 1];
    }

    function pickBombValue(): number {
      let r = prng.next() * MULT_TOTAL_W;
      for (let i = 0; i < MULT_VALUES.length; i++) { r -= MULT_WEIGHTS[i]; if (r <= 0) return MULT_VALUES[i]; }
      return MULT_VALUES[0];
    }

    function generateGrid(bonus: boolean): string[][] {
      const grid: string[][] = [];
      for (let col = 0; col < COLS; col++) {
        const column: string[] = [];
        let hasScatter = false, hasBomb = false;
        for (let row = 0; row < ROWS; row++) {
          if (bonus && !hasBomb && prng.next() < MULT_CHANCE) {
            column.push(`bomb_${pickBombValue()}x`); hasBomb = true; continue;
          }
          let sym = pickWeighted(symbols, bonus);
          if (scatterSym && sym.id === scatterSym.id && hasScatter) sym = pickWeighted(nonScatter, bonus);
          if (scatterSym && sym.id === scatterSym.id) hasScatter = true;
          column.push(sym.id);
        }
        // Duplication
        const dupRoll = prng.next();
        if (dupRoll < DUP3 + DUP2) {
          const dupCount = dupRoll < DUP3 ? 3 : 2;
          const regIdx: number[] = [];
          for (let i = 0; i < column.length; i++) {
            if (!column[i].startsWith('bomb_') && (!scatterSym || column[i] !== scatterSym.id)) regIdx.push(i);
          }
          if (regIdx.length >= dupCount) {
            const srcI = regIdx[Math.floor(prng.next() * regIdx.length)];
            const srcId = column[srcI];
            const others = regIdx.filter(i => i !== srcI);
            for (let i = others.length - 1; i > 0; i--) {
              const j = Math.floor(prng.next() * (i + 1));
              [others[i], others[j]] = [others[j], others[i]];
            }
            for (let i = 0; i < Math.min(dupCount - 1, others.length); i++) column[others[i]] = srcId;
          }
        }
        // Shuffle
        for (let i = column.length - 1; i > 0; i--) {
          const j = Math.floor(prng.next() * (i + 1));
          [column[i], column[j]] = [column[j], column[i]];
        }
        grid.push(column);
      }
      return grid;
    }

    function countScatters(grid: string[][]): number {
      if (!scatterSym) return 0;
      let c = 0;
      for (const col of grid) for (const id of col) if (id === scatterSym.id) c++;
      return c;
    }

    function isBomb(id: string) { return id.startsWith('bomb_'); }
    function bombVal(id: string) { const m = id.match(/^bomb_(\d+)x$/); return m ? parseInt(m[1]) : 0; }

    const symMap = new Map(symbols.map(s => [s.id, s]));

    function calcWins(grid: string[][]): { wins: { payout: number; positions: number[] }[] } {
      const counts = new Map<string, { count: number; positions: number[] }>();
      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const id = grid[col][row];
          if (isBomb(id)) continue;
          const flat = col * ROWS + row;
          if (!counts.has(id)) counts.set(id, { count: 0, positions: [] });
          const e = counts.get(id)!; e.count++; e.positions.push(flat);
        }
      }
      const wins: { payout: number; positions: number[] }[] = [];
      for (const [id, { count, positions }] of counts) {
        const sym = symMap.get(id);
        if (!sym || sym.is_scatter || count < MIN_MATCH) continue;
        let mult = 0;
        if (count >= 12) mult = sym.multiplier_5;
        else if (count >= 10) mult = sym.multiplier_4;
        else if (count >= 8) mult = sym.multiplier_3;
        if (mult > 0) wins.push({ payout: mult * BET, positions });
      }
      return { wins };
    }

    function tumble(grid: string[][], winPositions: number[], bonus: boolean): string[][] {
      const newGrid = grid.map(col => [...col]);
      const removedByCol = new Map<number, Set<number>>();
      for (const pos of winPositions) {
        const col = Math.floor(pos / ROWS), row = pos % ROWS;
        if (!removedByCol.has(col)) removedByCol.set(col, new Set());
        removedByCol.get(col)!.add(row);
      }
      for (const [col, rows] of removedByCol) {
        const remaining: string[] = [];
        for (let r = 0; r < ROWS; r++) if (!rows.has(r)) remaining.push(newGrid[col][r]);
        const needed = ROWS - remaining.length;
        const fill: string[] = [];
        const colHasScatter = scatterSym ? remaining.some(id => id === scatterSym!.id) : false;
        const colHasBomb = remaining.some(id => isBomb(id));
        let fillScatter = false, fillBomb = false;
        for (let i = 0; i < needed; i++) {
          if (bonus && !colHasBomb && !fillBomb && prng.next() < MULT_CHANCE) {
            fill.push(`bomb_${pickBombValue()}x`); fillBomb = true; continue;
          }
          let sym = pickWeighted(symbols, bonus);
          if (scatterSym && sym.id === scatterSym.id && (colHasScatter || fillScatter)) sym = pickWeighted(nonScatter, bonus);
          if (scatterSym && sym.id === scatterSym.id) fillScatter = true;
          fill.push(sym.id);
        }
        newGrid[col] = [...fill, ...remaining];
      }
      return newGrid;
    }

    function simulateSpin(bonus: boolean): { win: number; scatters: number; hasWin: boolean } {
      let grid = generateGrid(bonus);
      let scatters = countScatters(grid);
      let rawWin = 0;
      let maxT = 50;
      let hasWin = false;
      while (maxT-- > 0) {
        const { wins } = calcWins(grid);
        if (wins.length === 0) break;
        hasWin = true;
        const winPos = new Set<number>();
        for (const w of wins) for (const p of w.positions) winPos.add(p);
        rawWin += wins.reduce((s, w) => s + w.payout, 0);
        grid = tumble(grid, Array.from(winPos), bonus);
        const ns = countScatters(grid); if (ns > scatters) scatters = ns;
      }
      // Collect bombs
      let totalMult = 0;
      if (rawWin > 0) {
        for (const col of grid) for (const id of col) if (isBomb(id)) totalMult += bombVal(id);
      }
      const totalWin = totalMult > 0 ? rawWin * totalMult : rawWin;
      return { win: totalWin, scatters, hasWin };
    }

    // Counters
    let totalWagered = 0, totalWon = 0, bonusCount = 0, biggestWin = 0;
    let baseWins = 0, bonusWins = 0, hitCount = 0;
    // Bonus win distribution buckets: 0-5x, 5-30x, 30-100x, 100-300x, 300-1000x, 1000x+
    const bonusBuckets = [0, 0, 0, 0, 0, 0];
    // Win variance tracking
    let winSumSq = 0;

    for (let i = 0; i < NUM_SPINS; i++) {
      totalWagered += BET;
      const result = simulateSpin(false);
      let spinWin = result.win;
      baseWins += result.win;
      if (result.win > 0 || result.scatters >= SCATTER_TRIGGER) hitCount++;

      // Check bonus trigger
      if (result.scatters >= SCATTER_TRIGGER) {
        bonusCount++;
        let freeSpins = result.scatters >= 6 ? FREE_SPINS_6 :
                        result.scatters >= 5 ? FREE_SPINS_5 : FREE_SPINS_4;
        let bonusTotal = 0;
        while (freeSpins > 0) {
          freeSpins--;
          const bResult = simulateSpin(true);
          bonusTotal += bResult.win;
          if (bResult.scatters >= SCATTER_RETRIGGER) freeSpins += FREE_SPINS_RETRIGGER;
        }
        spinWin += bonusTotal;
        bonusWins += bonusTotal;

        // Bucket the bonus win (relative to bet)
        const bx = bonusTotal / BET;
        if (bx < 5) bonusBuckets[0]++;
        else if (bx < 30) bonusBuckets[1]++;
        else if (bx < 100) bonusBuckets[2]++;
        else if (bx < 300) bonusBuckets[3]++;
        else if (bx < 1000) bonusBuckets[4]++;
        else bonusBuckets[5]++;
      }

      totalWon += spinWin;
      winSumSq += spinWin * spinWin;
      if (spinWin > biggestWin) biggestWin = spinWin;
    }

    const rtp = (totalWon / totalWagered) * 100;
    const baseRTP = (baseWins / totalWagered) * 100;
    const bonusRTP = (bonusWins / totalWagered) * 100;
    const hitFreq = (hitCount / NUM_SPINS) * 100;
    const variance = (winSumSq / NUM_SPINS) - Math.pow(totalWon / NUM_SPINS, 2);

    // Bonus distribution as percentages
    const bonusDistPct = bonusCount > 0
      ? bonusBuckets.map(b => Math.round((b / bonusCount) * 10000) / 100)
      : [0, 0, 0, 0, 0, 0];

    return new Response(JSON.stringify({
      spins: NUM_SPINS,
      bet: BET,
      totalWagered,
      totalWon: Math.round(totalWon * 100) / 100,
      rtp: Math.round(rtp * 100) / 100,
      baseRTP: Math.round(baseRTP * 100) / 100,
      bonusRTP: Math.round(bonusRTP * 100) / 100,
      hitFrequency: Math.round(hitFreq * 100) / 100,
      bonusCount,
      bonusFrequency: `1 in ${Math.round(NUM_SPINS / (bonusCount || 1))}`,
      biggestWin: Math.round(biggestWin * 100) / 100,
      variance: Math.round(variance * 100) / 100,
      bonusWinDistribution: {
        '0-5x': bonusDistPct[0],
        '5-30x': bonusDistPct[1],
        '30-100x': bonusDistPct[2],
        '100-300x': bonusDistPct[3],
        '300-1000x': bonusDistPct[4],
        '1000x+': bonusDistPct[5],
      },
      bonusWinDistributionRaw: {
        '0-5x': bonusBuckets[0],
        '5-30x': bonusBuckets[1],
        '30-100x': bonusBuckets[2],
        '100-300x': bonusBuckets[3],
        '300-1000x': bonusBuckets[4],
        '1000x+': bonusBuckets[5],
      },
      settings: { MIN_MATCH, SCATTER_TRIGGER, SCATTER_RETRIGGER, FREE_SPINS_4, FREE_SPINS_5, FREE_SPINS_6, FREE_SPINS_RETRIGGER, DUP2, DUP3, MULT_CHANCE, MULT_VALUES, MULT_WEIGHTS },
    }, null, 2), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
