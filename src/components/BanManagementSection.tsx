import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Loader2, ShieldOff } from "lucide-react";
import { toast } from "sonner";

interface BanRecord {
  id: string;
  user_id: string;
  reason: string | null;
  created_at: string;
  banned_by: string;
  profile?: {
    display_name: string | null;
    avatar_url: string | null;
    twitch_username: string | null;
  };
}

export function BanManagementSection() {
  const [bans, setBans] = useState<BanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [unbanning, setUnbanning] = useState<string | null>(null);

  const fetchBans = async () => {
    setLoading(true);
    const { data: banData, error } = await supabase
      .from("user_bans")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Kunne ikke hente bannede brugere");
      setLoading(false);
      return;
    }

    if (!banData || banData.length === 0) {
      setBans([]);
      setLoading(false);
      return;
    }

    // Fetch profiles for all banned users
    const userIds = banData.map((b) => b.user_id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, display_name, avatar_url, twitch_username")
      .in("user_id", userIds);

    const profileMap = new Map(
      (profiles || []).map((p) => [p.user_id, p])
    );

    const enriched: BanRecord[] = banData.map((ban) => ({
      ...ban,
      profile: profileMap.get(ban.user_id) || undefined,
    }));

    setBans(enriched);
    setLoading(false);
  };

  useEffect(() => {
    fetchBans();
  }, []);

  const handleUnban = async (ban: BanRecord) => {
    setUnbanning(ban.id);
    const { error } = await supabase
      .from("user_bans")
      .delete()
      .eq("id", ban.id);

    if (error) {
      toast.error("Kunne ikke fjerne ban");
    } else {
      toast.success(
        `${ban.profile?.display_name || ban.profile?.twitch_username || "Bruger"} er blevet unbanned`
      );
      setBans((prev) => prev.filter((b) => b.id !== ban.id));
    }
    setUnbanning(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("da-DK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (bans.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <ShieldOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-lg">Ingen bannede brugere</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bruger</TableHead>
              <TableHead>Årsag</TableHead>
              <TableHead>Banned dato</TableHead>
              <TableHead className="text-right">Handling</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bans.map((ban) => (
              <TableRow key={ban.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={ban.profile?.avatar_url || undefined} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {ban.profile?.display_name || ban.profile?.twitch_username || "Ukendt bruger"}
                      </p>
                      {ban.profile?.twitch_username && ban.profile?.display_name && (
                        <p className="text-xs text-muted-foreground">
                          @{ban.profile.twitch_username}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {ban.reason || "Ingen årsag angivet"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatDate(ban.created_at)}</span>
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" disabled={unbanning === ban.id}>
                        {unbanning === ban.id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        ) : (
                          <ShieldOff className="h-4 w-4 mr-1" />
                        )}
                        Unban
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Fjern ban</AlertDialogTitle>
                        <AlertDialogDescription>
                          Er du sikker på, at du vil fjerne ban for{" "}
                          <strong>
                            {ban.profile?.display_name || ban.profile?.twitch_username || "denne bruger"}
                          </strong>
                          ? Brugeren vil igen kunne tilgå siden.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuller</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleUnban(ban)}>
                          Fjern ban
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
