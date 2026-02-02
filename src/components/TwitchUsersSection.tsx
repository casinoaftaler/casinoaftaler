import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink, Users } from "lucide-react";

interface TwitchProfile {
  id: string;
  user_id: string;
  twitch_id: string | null;
  twitch_username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export function TwitchUsersSection() {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["all-twitch-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .not("twitch_id", "is", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TwitchProfile[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {profiles?.length || 0} brugere med Twitch tilknyttet
          </span>
        </div>
      </div>

      {profiles && profiles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={profile.avatar_url || undefined}
                      alt={profile.display_name || "User"}
                    />
                    <AvatarFallback className="bg-[#9146FF] text-white">
                      {profile.display_name?.charAt(0) || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {profile.display_name || "Ukendt"}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      @{profile.twitch_username}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {new Date(profile.created_at).toLocaleDateString("da-DK")}
                  </Badge>
                  {profile.twitch_username && (
                    <a
                      href={`https://twitch.tv/${profile.twitch_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Twitch
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Ingen brugere har logget ind med Twitch endnu.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
