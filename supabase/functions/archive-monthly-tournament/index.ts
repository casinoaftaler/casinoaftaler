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

    // Fetch active tournament configs to know which game_id per category
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

    // Map category to sort column in the per-game view
    const categoryColMap: Record<string, string> = {
      total_points: "monthly_winnings",
      highest_x: "monthly_biggest_multiplier",
      highest_win: "monthly_biggest_win",
    };

    const archives = [];

    for (const config of configs) {
      const col = categoryColMap[config.category] || "monthly_winnings";

      // Query per-game view for this game_id, sorted by the relevant column
      const { data: top10 } = await supabase
        .from("slot_leaderboard_by_game")
        .select("user_id, monthly_winnings, monthly_biggest_win, monthly_biggest_multiplier, monthly_spins, monthly_bonuses")
        .eq("game_id", config.game_id)
        .order(col, { ascending: false })
        .limit(10);

      if (!top10 || top10.length === 0) continue;

      const winnerValue = (top10[0] as any)[col] || 0;
      if (winnerValue <= 0) continue;

      // Get profiles for top 10
      const userIds = top10.map((r) => r.user_id).filter(Boolean) as string[];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p: any) => [p.user_id, p])
      );

      const winnerProfile = profileMap.get(top10[0].user_id!) || {};

      const topEntries = top10.map((r, i) => {
        const p = profileMap.get(r.user_id!) || {};
        return {
          rank: i + 1,
          user_id: r.user_id,
          display_name: (p as any).display_name || "Anonym",
          avatar_url: (p as any).avatar_url || null,
          value: (r as any)[col] || 0,
          total_spins: (r as any).monthly_spins || 0,
          total_bonuses: (r as any).monthly_bonuses || 0,
        };
      });

      archives.push({
        month: monthStr,
        category: config.category,
        winner_user_id: top10[0].user_id!,
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
