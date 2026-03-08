import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Gamepad2, Trophy } from "lucide-react";

/**
 * Static SEO block for community stats.
 * Renders minimum fallback values immediately (crawlable by Googlebot)
 * then hydrates with live data from the database.
 *
 * Uses semantic HTML (<dl>/<dt>/<dd>) and microdata for maximum crawlability.
 */

function useCommunityStats() {
  return useQuery({
    queryKey: ["community-stats-static"],
    queryFn: async () => {
      const { data } = await supabase.rpc("get_community_stats");
      const stats = data as { active_members?: number; total_spins?: number; tournaments_this_month?: number } | null;
      return {
        activeMembers: stats?.active_members ?? 100,
        totalSpins: stats?.total_spins ?? 50000,
        tournamentsThisMonth: stats?.tournaments_this_month ?? 3,
      };
    },
    staleTime: 10 * 60 * 1000,
  });
}

interface CommunityStatsStaticBlockProps {
  className?: string;
}

export function CommunityStatsStaticBlock({ className = "" }: CommunityStatsStaticBlockProps) {
  const { data } = useCommunityStats();

  const stats = [
    {
      icon: Users,
      label: "Aktive medlemmer",
      value: data?.activeMembers ?? 100,
      color: "text-violet-400",
    },
    {
      icon: Gamepad2,
      label: "Spins spillet",
      value: data?.totalSpins ?? 50000,
      color: "text-amber-400",
    },
    {
      icon: Trophy,
      label: "Turneringer denne måned",
      value: data?.tournamentsThisMonth ?? 3,
      color: "text-emerald-400",
    },
  ];

  return (
    <div
      className={`${className}`}
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content="Casinoaftaler.dk" />
      <dl className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card p-4 text-center"
            itemProp="interactionStatistic"
            itemScope
            itemType="https://schema.org/InteractionCounter"
          >
            <stat.icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
            <dd className="text-xl md:text-2xl font-bold text-foreground tabular-nums" itemProp="userInteractionCount">
              {stat.value.toLocaleString("da-DK")}
            </dd>
            <dt className="text-[11px] text-muted-foreground">
              <span itemProp="interactionType" content="https://schema.org/InteractAction">{stat.label}</span>
            </dt>
          </div>
        ))}
      </dl>
      <noscript>
        <p>Casinoaftaler.dk community: 100+ aktive medlemmer, 50.000+ spins spillet, 3+ turneringer denne måned.</p>
      </noscript>
    </div>
  );
}
