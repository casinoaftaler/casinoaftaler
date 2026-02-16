import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Coins, Zap, XCircle, History } from "lucide-react";

export function SpinHistory() {
  const { user } = useAuth();

  const { data: history } = useQuery({
    queryKey: ["spin-history", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("spin_history")
        .select("id, reward_type, reward_value, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (!history || history.length === 0) return null;

  const getIcon = (type: string) => {
    if (type === "points") return <Coins className="h-4 w-4 text-primary" />;
    if (type === "spins") return <Zap className="h-4 w-4 text-accent" />;
    return <XCircle className="h-4 w-4 text-muted-foreground" />;
  };

  const getLabel = (type: string, value: number) => {
    if (type === "none") return "Ingenting";
    return `${value} ${type === "points" ? "Points" : "Spins"}`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("da-DK", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <History className="h-4 w-4" />
        Seneste Spins
      </h2>
      <div className="space-y-1.5">
        {history.map((h) => (
          <div
            key={h.id}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm px-4 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              {getIcon(h.reward_type)}
              <span className="text-sm font-medium text-foreground">
                {getLabel(h.reward_type, h.reward_value)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(h.created_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
