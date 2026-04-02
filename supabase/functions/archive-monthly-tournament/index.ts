import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Determine which month to archive (previous month)
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const monthStr = prevMonth.toISOString().slice(0, 10);
    const nextMonthStr = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);

    // Check if already archived
    const { data: existing } = await supabase
      .from("monthly_tournament_archives")
      .select("id")
      .eq("month", monthStr)
      .limit(1);

    if (existing && existing.length > 0) {
      return new Response(
        JSON.stringify({ message: "Already archived", month: monthStr }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch active tournament configs
    const { data: configs } = await supabase
      .from("monthly_tournament_config")
      .select("*")
      .eq("is_active", true);

    if (!configs || configs.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active tournament configs", month: monthStr }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const archives = [];

    for (const config of configs) {
      // Query raw slot_game_results for the month to avoid materialized view timing issues
      const { data: results, error: resultsErr } = await supabase
        .from("slot_game_results")
        .select("user_id, win_amount, bonus_win_amount, bet_amount, is_bonus_triggered")
        .eq("game_id", config.game_id)
        .gte("created_at", `${monthStr}T00:00:00Z`)
        .lt("created_at", `${nextMonthStr}T00:00:00Z`);

      if (resultsErr) {
        console.error(`Error fetching results for ${config.game_id}:`, resultsErr);
        continue;
      }
      if (!results || results.length === 0) continue;

      // Aggregate per user
      const userStats: Record<string, {
        totalWinnings: number;
        biggestWin: number;
        biggestMultiplier: number;
        totalSpins: number;
        totalBonuses: number;
      }> = {};

      for (const r of results) {
        const uid = r.user_id;
        if (!uid) continue;
        if (!userStats[uid]) {
          userStats[uid] = { totalWinnings: 0, biggestWin: 0, biggestMultiplier: 0, totalSpins: 0, totalBonuses: 0 };
        }
        const s = userStats[uid];
        const winTotal = Number(r.win_amount || 0) + Number(r.bonus_win_amount || 0);
        const betAmt = Number(r.bet_amount || 1);
        const multiplier = betAmt > 0 ? winTotal / betAmt : 0;

        s.totalWinnings += winTotal;
        s.biggestWin = Math.max(s.biggestWin, winTotal);
        s.biggestMultiplier = Math.max(s.biggestMultiplier, multiplier);
        s.totalSpins++;
        if (r.is_bonus_triggered) s.totalBonuses++;
      }

      // Determine sort key based on category
      const sortKeyMap: Record<string, keyof typeof userStats[string]> = {
        total_points: "totalWinnings",
        highest_x: "biggestMultiplier",
        highest_win: "biggestWin",
      };
      const sortKey = sortKeyMap[config.category] || "totalWinnings";

      // Sort and take top 10
      const sorted = Object.entries(userStats)
        .sort(([, a], [, b]) => (b[sortKey] as number) - (a[sortKey] as number))
        .slice(0, 10);

      if (sorted.length === 0) continue;

      const winnerValue = sorted[0][1][sortKey] as number;
      if (winnerValue <= 0) continue;

      // Get profiles for top 10
      const userIds = sorted.map(([id]) => id);
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p: any) => [p.user_id, p])
      );

      const winnerProfile = profileMap.get(sorted[0][0]) || {};

      const topEntries = sorted.map(([uid, stats], i) => {
        const p = profileMap.get(uid) || {};
        return {
          rank: i + 1,
          user_id: uid,
          display_name: (p as any).display_name || "Anonym",
          avatar_url: (p as any).avatar_url || null,
          value: stats[sortKey] as number,
          total_spins: stats.totalSpins,
          total_bonuses: stats.totalBonuses,
        };
      });

      archives.push({
        month: monthStr,
        category: config.category,
        winner_user_id: sorted[0][0],
        winner_display_name: (winnerProfile as any).display_name || "Anonym",
        winner_avatar_url: (winnerProfile as any).avatar_url || null,
        winning_value: winnerValue,
        top_entries: topEntries,
      });
    }

    if (archives.length > 0) {
      const { error } = await supabase
        .from("monthly_tournament_archives")
        .insert(archives);

      if (error) throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        month: monthStr,
        archived: archives.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
