import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Gamepad2, Monitor, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";

interface ActiveSession {
  id: string;
  user_id: string;
  session_id: string;
  device_info: string | null;
  last_heartbeat: string;
  created_at: string;
  profile?: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

const GAME_LABELS: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
};

// Sessions are considered active if heartbeat within last 2 minutes
const ACTIVE_THRESHOLD_MS = 2 * 60 * 1000;

function useActiveSessions() {
  return useQuery({
    queryKey: ["admin-live-players"],
    queryFn: async () => {
      const cutoff = new Date(Date.now() - ACTIVE_THRESHOLD_MS).toISOString();

      const { data: sessions, error } = await supabase
        .from("slot_active_sessions")
        .select("*")
        .gte("last_heartbeat", cutoff);

      if (error) throw error;

      if (!sessions || sessions.length === 0) return [];

      // Fetch profiles for active users
      const userIds = [...new Set(sessions.map((s) => s.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, twitch_username")
        .in("user_id", userIds);

      const profileMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {};
      profiles?.forEach((p) => {
        profileMap[p.user_id] = {
          display_name: p.display_name || p.twitch_username,
          avatar_url: p.avatar_url,
        };
      });

      return sessions.map((s) => ({
        ...s,
        profile: profileMap[s.user_id] || { display_name: null, avatar_url: null },
      })) as ActiveSession[];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });
}

export function LivePlayersAdminSection() {
  const { data: sessions, isLoading, refetch } = useActiveSessions();

  // Group by game (parse from device_info or just show all)
  const totalPlayers = sessions?.length ?? 0;

  // Try to detect game from device_info patterns – fallback to "Ukendt"
  // device_info typically stores browser/device, not game. We'll show per-user instead.

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Spillere</h2>
          <p className="text-muted-foreground">Spillere der er aktive på spillemaskinerne lige nu.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Opdater
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Aktive spillere nu</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              {isLoading ? "..." : totalPlayers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Opdateres hvert 10. sekund
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Player list */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Aktive sessioner
          </CardTitle>
          <CardDescription>
            Viser spillere med heartbeat inden for de sidste 2 minutter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Indlæser...</p>
          ) : !sessions || sessions.length === 0 ? (
            <p className="text-muted-foreground text-sm">Ingen aktive spillere lige nu.</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg border"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.profile?.avatar_url ?? undefined} />
                    <AvatarFallback>
                      {(session.profile?.display_name ?? "?")[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {session.profile?.display_name || "Anonym"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Monitor className="h-3 w-3" />
                      <span className="truncate">{session.device_info || "Ukendt enhed"}</span>
                    </div>
                  </div>

                  <div className="text-right text-sm">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                      Live
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(session.last_heartbeat), {
                        addSuffix: true,
                        locale: da,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
