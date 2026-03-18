import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, Search, Loader2, Clock, User, Coins } from "lucide-react";

interface CreditLogEntry {
  id: string;
  user_id: string;
  amount: number;
  source: string;
  admin_user_id: string | null;
  note: string | null;
  created_at: string;
}

interface UserProfile {
  user_id: string;
  display_name: string | null;
  twitch_username: string | null;
  avatar_url: string | null;
}

const sourceLabels: Record<string, { label: string; color: string }> = {
  daily_cron: { label: "Daglig tildeling", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  admin_manual: { label: "Admin", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  profile_reward: { label: "Profil belønning", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  community_bonus: { label: "Community bonus", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
};

export function CreditAllocationHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  // Fetch all profiles for name mapping
  const { data: profiles } = useQuery({
    queryKey: ["admin-profiles-for-log"],
    queryFn: async (): Promise<UserProfile[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, display_name, twitch_username, avatar_url")
        .not("twitch_id", "is", null);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: logs, isLoading } = useQuery({
    queryKey: ["credit-allocation-log", sourceFilter],
    queryFn: async (): Promise<CreditLogEntry[]> => {
      let query = supabase
        .from("credit_allocation_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);

      if (sourceFilter !== "all") {
        query = query.eq("source", sourceFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const profileMap = new Map<string, UserProfile>((profiles?.map((p) => [p.user_id, p]) ?? []));

  const filteredLogs = logs?.filter((log) => {
    if (!searchTerm) return true;
    const profile = profileMap.get(log.user_id);
    const search = searchTerm.toLowerCase();
    return (
      profile?.display_name?.toLowerCase().includes(search) ||
      profile?.twitch_username?.toLowerCase().includes(search)
    );
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("da-DK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Credit Historik
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Oversigt over alle credit-tildelinger til brugere.
        </p>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Søg efter bruger..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Alle kilder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle kilder</SelectItem>
              <SelectItem value="daily_cron">Daglig tildeling</SelectItem>
              <SelectItem value="admin_manual">Admin</SelectItem>
              <SelectItem value="profile_reward">Profil belønning</SelectItem>
              <SelectItem value="community_bonus">Community bonus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filteredLogs && filteredLogs.length > 0 ? (
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredLogs.map((log) => {
              const profile = profileMap.get(log.user_id);
              const source = sourceLabels[log.source] || { label: log.source, color: "bg-muted text-muted-foreground" };

              return (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt=""
                        className="h-8 w-8 rounded-full flex-shrink-0"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">
                        {profile?.display_name || profile?.twitch_username || log.user_id.slice(0, 8)}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(log.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Badge variant="outline" className={source.color}>
                      {source.label}
                    </Badge>
                    {log.note && (
                      <span className="text-xs text-muted-foreground max-w-[150px] truncate hidden md:inline">
                        {log.note}
                      </span>
                    )}
                    <span className={`font-mono font-bold ${log.amount >= 0 ? "text-green-500" : "text-destructive"}`}>
                      {log.amount >= 0 ? "+" : ""}{log.amount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground py-4">
            {searchTerm || sourceFilter !== "all"
              ? "Ingen resultater fundet"
              : "Ingen credit-historik endnu"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
