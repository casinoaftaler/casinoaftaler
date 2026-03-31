import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get today's date in Danish timezone (Europe/Copenhagen)
    const now = new Date();
    const danishDate = now.toLocaleDateString("en-CA", {
      timeZone: "Europe/Copenhagen",
    }); // YYYY-MM-DD

    // Find all users who have profiles (active users)
    const { data: allProfiles, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, display_name");

    if (profileError) throw profileError;

    if (!allProfiles || allProfiles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get today's dwell rewards for all users
    const { data: todayRewards, error: rewardError } = await supabase
      .from("daily_dwell_rewards")
      .select("user_id, page_path")
      .eq("reward_date", danishDate);

    if (rewardError) throw rewardError;

    // Count completions per user
    const completionMap = new Map<string, number>();
    (todayRewards || []).forEach((r) => {
      completionMap.set(r.user_id, (completionMap.get(r.user_id) || 0) + 1);
    });

    // Get active streaks
    const { data: streaks, error: streakError } = await supabase
      .from("mission_streaks")
      .select("user_id, current_streak, last_completed_date");

    if (streakError) throw streakError;

    const streakMap = new Map<string, { current_streak: number; last_completed_date: string | null }>();
    (streaks || []).forEach((s) => {
      streakMap.set(s.user_id, s);
    });

    // Determine which users need reminders
    const usersToNotify: { userId: string; completed: number; streak: number; streakAtRisk: boolean }[] = [];

    for (const profile of allProfiles) {
      const completed = completionMap.get(profile.user_id) || 0;

      // Skip users who completed all 6
      if (completed >= 6) continue;

      // Only notify users who have shown some engagement (completed at least 1 mission ever, or have a streak)
      const streak = streakMap.get(profile.user_id);
      const currentStreak = streak?.current_streak || 0;
      const hasHistory = completed > 0 || currentStreak > 0;

      // Skip completely inactive users (never done a mission and no streak)
      if (!hasHistory) continue;

      const streakAtRisk = currentStreak > 0 && streak?.last_completed_date !== danishDate;

      usersToNotify.push({
        userId: profile.user_id,
        completed,
        streak: currentStreak,
        streakAtRisk,
      });
    }

    if (usersToNotify.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users need reminders", date: danishDate }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Group users by notification type for efficiency
    const streakAtRiskUsers = usersToNotify.filter((u) => u.streakAtRisk && u.streak >= 3);
    const partialUsers = usersToNotify.filter((u) => u.completed > 0 && u.completed < 6 && !u.streakAtRisk);
    const notStartedWithStreak = usersToNotify.filter((u) => u.completed === 0 && u.streakAtRisk);

    let notificationsSent = 0;

    // 1. Streak at risk (3+ day streak, haven't completed today)
    for (const user of streakAtRiskUsers) {
      const remaining = 6 - user.completed;
      await supabase.from("notifications").insert({
        title: `⚠️ Din ${user.streak}-dags streak er i fare!`,
        message: `Du mangler ${remaining} mission${remaining > 1 ? "er" : ""} i dag. Fuldfør dem inden midnat for at beholde din streak! [Start nu](/community)`,
        target_user_id: user.userId,
      });
      notificationsSent++;
    }

    // 2. Users who haven't started but have a streak at risk
    for (const user of notStartedWithStreak) {
      await supabase.from("notifications").insert({
        title: `🔥 Bevar din ${user.streak}-dags streak!`,
        message: `Du har ikke startet dine missioner endnu i dag. Fuldfør alle 6 inden midnat! [Start missioner](/community)`,
        target_user_id: user.userId,
      });
      notificationsSent++;
    }

    // 3. Partial completion (started but didn't finish)
    for (const user of partialUsers) {
      const remaining = 6 - user.completed;
      const creditsLeft = remaining * 600;
      await supabase.from("notifications").insert({
        title: `📋 ${remaining} missioner tilbage`,
        message: `Du har fuldført ${user.completed}/6 missioner i dag – der venter ${creditsLeft.toLocaleString("da-DK")} credits! [Fortsæt](/community)`,
        target_user_id: user.userId,
      });
      notificationsSent++;
    }

    return new Response(
      JSON.stringify({
        success: true,
        date: danishDate,
        notificationsSent,
        breakdown: {
          streakAtRisk: streakAtRiskUsers.length,
          partial: partialUsers.length,
          notStartedWithStreak: notStartedWithStreak.length,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Mission reminder error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
