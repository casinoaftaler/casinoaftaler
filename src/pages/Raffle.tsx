import { SEO } from "@/components/SEO";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { useActiveRaffle, useRaffleEntries, useJoinRaffle, useRecentRaffleWinners } from "@/hooks/useRaffle";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, Clock, Trophy, Coins, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { format } from "date-fns";

function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("00:00");
        return;
      }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return (
    <span className="font-mono font-bold tabular-nums text-lg">{timeLeft}</span>
  );
}

function formatRaffleDate(dateStr: string) {
  return format(new Date(dateStr), "dd.MM.yyyy");
}

function RaffleCardShell({
  children,
  isActive = false,
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl border bg-card p-5 flex flex-col gap-4 transition-all ${
        isActive
          ? "border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
          : "border-border/50"
      }`}
    >
      {children}
    </div>
  );
}

function ActiveRaffleCard({
  raffle,
  entries,
  user,
  hasJoined,
  joinMutation,
}: {
  raffle: { id: string; prize_credits: number; ends_at: string; starts_at: string };
  entries: Array<{ id: string; user_id: string; profile: { display_name: string | null; avatar_url: string | null } | null }> | undefined;
  user: { id: string } | null | undefined;
  hasJoined: boolean;
  joinMutation: ReturnType<typeof useJoinRaffle>;
}) {
  return (
    <RaffleCardShell isActive>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <Badge variant="default" className="text-xs">
          <Gift className="mr-1 h-3 w-3" />
          AKTIV
        </Badge>
        <span className="text-xs text-muted-foreground">{formatRaffleDate(raffle.starts_at)}</span>
      </div>

      {/* Prize */}
      <div className="text-center py-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Præmie</p>
        <p className="text-3xl font-extrabold tracking-tight">
          <span className="text-primary">{raffle.prize_credits}</span>{" "}
          <span className="text-foreground">Credits</span>
        </p>
      </div>

      {/* Countdown */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Slutter om</span>
        <CountdownTimer endsAt={raffle.ends_at} />
      </div>

      {/* Participants */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>{entries?.length ?? 0} deltagere</span>
        {entries && entries.length > 0 && (
          <div className="flex -space-x-1.5 ml-auto">
            {entries.slice(0, 5).map((e) => (
              <Avatar key={e.id} className="h-6 w-6 border-2 border-card">
                {e.profile?.avatar_url && <AvatarImage src={e.profile.avatar_url} />}
                <AvatarFallback className="text-[9px]">
                  {(e.profile?.display_name ?? "?")[0]}
                </AvatarFallback>
              </Avatar>
            ))}
            {entries.length > 5 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[9px] font-medium text-muted-foreground">
                +{entries.length - 5}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action */}
      <div className="pt-1">
        {!user ? (
          <p className="text-sm text-center text-muted-foreground">Log ind for at deltage</p>
        ) : hasJoined ? (
          <div className="text-center text-sm font-medium text-primary">✅ Du deltager</div>
        ) : (
          <Button
            variant="cta"
            className="w-full"
            onClick={() => joinMutation.mutate(raffle.id)}
            disabled={joinMutation.isPending}
          >
            <Gift className="h-4 w-4 mr-2" />
            {joinMutation.isPending ? "Tilmelder..." : "DELTAG"}
          </Button>
        )}
      </div>
    </RaffleCardShell>
  );
}

function CompletedRaffleCard({
  raffle,
  raffleNumber,
}: {
  raffle: {
    id: string;
    prize_credits: number;
    starts_at: string;
    ends_at: string;
    winner_id: string | null;
    winner_profile: { display_name: string | null; avatar_url: string | null } | null;
  };
  raffleNumber: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <RaffleCardShell>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            <Trophy className="mr-1 h-3 w-3" />
            AFSLUTTET
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">#{raffleNumber}</span>
        </div>
        <span className="text-xs text-muted-foreground">{formatRaffleDate(raffle.starts_at)}</span>
      </div>

      {/* Prize */}
      <div className="text-center py-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Præmie</p>
        <p className="text-3xl font-extrabold tracking-tight">
          <span className="text-primary">{raffle.prize_credits}</span>{" "}
          <span className="text-foreground">Credits</span>
        </p>
      </div>

      {/* Winner toggle */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <>
            <ChevronUp className="h-4 w-4 mr-1.5" />
            Skjul Vinder
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-1.5" />
            Vis Vinder
          </>
        )}
      </Button>

      {/* Winner details */}
      {expanded && (
        <div className="rounded-lg bg-muted/30 px-4 py-3 flex items-center gap-3">
          {raffle.winner_id && raffle.winner_profile ? (
            <>
              <Avatar className="h-8 w-8">
                {raffle.winner_profile.avatar_url && (
                  <AvatarImage src={raffle.winner_profile.avatar_url} />
                )}
                <AvatarFallback className="text-xs">
                  {(raffle.winner_profile.display_name ?? "?")[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{raffle.winner_profile.display_name ?? "Anonym"}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Coins className="h-3 w-3" />
                  Vandt {raffle.prize_credits} credits
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Ingen deltagere – ingen vinder</p>
          )}
        </div>
      )}
    </RaffleCardShell>
  );
}

export default function Raffle() {
  const { user } = useAuth();
  const { data: raffle, isLoading: raffleLoading } = useActiveRaffle();
  const { data: entries } = useRaffleEntries(raffle?.id);
  const joinMutation = useJoinRaffle();
  const { data: completedRaffles } = useRecentRaffleWinners();

  const hasJoined = entries?.some((e) => e.user_id === user?.id) ?? false;
  const [showAll, setShowAll] = useState(false);

  const visibleCompleted = useMemo(() => {
    if (!completedRaffles) return [];
    return showAll ? completedRaffles : completedRaffles.slice(0, 6);
  }, [completedRaffles, showAll]);

  // Raffle numbering: total completed count, newest = highest number
  const totalCompleted = completedRaffles?.length ?? 0;

  const articleSchema = useMemo(() => buildArticleSchema({
    headline: "Raffle – Vind Gratis Credits Hver 30. Minut",
    description: "Deltag i vores automatiske raffle og vind op til 500 credits hver halve time. Gratis at deltage!",
    url: `${SITE_URL}/community/raffle`,
    datePublished: "2026-04-03",
  }), []);

  return (
    <>
      <SEO
        title="Raffle – Vind Gratis Credits Hver 30. Minut"
        description="Deltag i vores automatiske raffle og vind op til 500 credits hver halve time. Gratis at deltage for alle community-medlemmer."
        jsonLd={{ "@context": "https://schema.org", "@graph": [articleSchema] }}
        breadcrumbLabel="Raffle"
      />
      <CommunityPageLayout
        title="Raffle"
        description="Vind gratis credits hver 30. minut – bare deltag og kryds fingre!"
        badgeText="Gratis Credits"
        badgeIcon={Gift}
      >
        <div className="pb-8 md:pb-12">
          {raffleLoading ? (
            <div className="text-center py-12 text-muted-foreground">Indlæser raffles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Active raffle always first */}
              {raffle && (
                <ActiveRaffleCard
                  raffle={raffle}
                  entries={entries}
                  user={user}
                  hasJoined={hasJoined}
                  joinMutation={joinMutation}
                />
              )}

              {/* Completed raffles */}
              {completedRaffles?.map((r) => (
                <CompletedRaffleCard key={r.id} raffle={r} />
              ))}

              {/* Empty state */}
              {!raffle && (!completedRaffles || completedRaffles.length === 0) && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Ingen raffles endnu. Den første starter snart!
                </div>
              )}
            </div>
          )}
        </div>
      </CommunityPageLayout>
    </>
  );
}
