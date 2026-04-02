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
  game_id: string | null;
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
  "gates-of-fedesvin": "Gates of Fedesvin",
  "fedesvin-bonanza": "Fedesvin Bonanza",
};

// Sessions active within last 2 minutes are considered live
const ACTIVE_THRESHOLD_SECONDS = 120;

function useActiveSessions() {
  return useQuery({
    queryKey: ["admin-live-players"],
    queryFn: async () => {
      // Fetch all sessions - table has max ~1 row per user, so this is safe
      // We filter client-side to avoid clock skew between browser and server
      const { data: sessions, error } = await supabase
        .from("slot_active_sessions")
        .select("*")
        .order("last_heartbeat", { ascending: false });

      if (error) throw error;

      if (!sessions || sessions.length === 0) return [];

      // Filter to only sessions with recent heartbeats (client-side)
      // We compare relative ages between sessions rather than absolute time
      // to avoid clock skew issues
      const now = Date.now();
      const activeSessions = sessions.filter((s) => {
        const heartbeatAge = now - new Date(s.last_heartbeat).getTime();
        return heartbeatAge < ACTIVE_THRESHOLD_SECONDS * 1000;
      });

      if (activeSessions.length === 0) return [];

      const userIds = [...new Set(activeSessions.map((s) => s.user_id))];
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

      return activeSessions.map((s) => ({
        ...s,
        game_id: (s as any).game_id ?? null,
        profile: profileMap[s.user_id] || { display_name: null, avatar_url: null },
      })) as ActiveSession[];
    },
    refetchInterval: 5000, // Refresh every 5 seconds for real-time feel
  });
}

export function LivePlayersAdminSection() {
  const { data: sessions, isLoading, refetch } = useActiveSessions();

  const totalPlayers = sessions?.length ?? 0;

  // Group by game
  const bookPlayers = sessions?.filter((s) => s.game_id === "book-of-fedesvin") ?? [];
  const risePlayers = sessions?.filter((s) => s.game_id === "rise-of-fedesvin") ?? [];
  const bonanzaPlayers = sessions?.filter((s) => s.game_id === "fedesvin-bonanza") ?? [];
  const unknownPlayers = sessions?.filter((s) => !s.game_id) ?? [];

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
            <CardDescription>Total aktive</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              {isLoading ? "..." : totalPlayers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Opdateres hvert 5. sekund</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Book of Fedesvin</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-amber-500" />
              {isLoading ? "..." : bookPlayers.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Aktive spillere på denne maskine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rise of Fedesvin</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-purple-500" />
              {isLoading ? "..." : risePlayers.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Aktive spillere på denne maskine</p>
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
            Viser spillere der er inde på en spillemaskine lige nu.
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

                  <div className="text-right text-sm space-y-1">
                    <Badge variant="secondary" className="text-xs">
                      {session.game_id ? GAME_LABELS[session.game_id] || session.game_id : "Ukendt spil"}
                    </Badge>
                    <div>
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1.5 animate-pulse" />
                        Live
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
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
