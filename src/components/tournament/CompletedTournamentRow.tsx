import { useState } from "react";
import { Trophy, ChevronRight, Gamepad2, Calendar, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserProfileLink } from "@/components/UserProfileLink";
import { useTournamentLeaderboard, type Tournament } from "@/hooks/useTournaments";
import { CompletedTournamentCard } from "./CompletedTournamentCard";
import { cn } from "@/lib/utils";

const GAME_NAMES: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
};

function CompactWinner({ tournamentId }: { tournamentId: string }) {
  const { data } = useTournamentLeaderboard(tournamentId);
  const winner = data?.entries?.[0];

  if (!winner) return <span className="text-xs text-muted-foreground">Ingen deltagere</span>;

  return (
    <div className="flex items-center gap-2">
      <UserProfileLink
        userId={winner.user_id}
        displayName={winner.display_name || "Anonym"}
        avatarUrl={winner.avatar_url}
        avatarClassName="h-7 w-7 ring-2 ring-primary/30"
        showDropdown={false}
      />
      <span className="text-sm font-semibold text-foreground truncate">{winner.display_name || "Anonym"}</span>
    </div>
  );
}

export function CompletedTournamentRow({ tournament, index = 0 }: { tournament: Tournament; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const endDate = new Date(tournament.ends_at);
  const formattedDate = endDate.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div
      className="space-y-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer",
          "border backdrop-blur-sm",
          "hover:scale-[1.005] active:scale-[0.998]",
          expanded
            ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5"
            : "border-border/50 bg-card/80 hover:bg-card hover:border-primary/20 hover:shadow-md hover:shadow-primary/5",
          "group"
        )}
      >
        {/* Expand chevron */}
        <ChevronRight className={cn(
          "h-4 w-4 text-muted-foreground transition-all duration-300 shrink-0",
          expanded && "rotate-90 text-primary",
          "group-hover:text-primary/70"
        )} />

        {/* Trophy icon with glow */}
        <div className={cn(
          "p-2 rounded-lg shrink-0 transition-all duration-300",
          "bg-gradient-to-br from-primary/15 to-primary/5",
          "group-hover:from-primary/25 group-hover:to-primary/10",
          expanded && "from-primary/25 to-primary/10 shadow-sm shadow-primary/10"
        )}>
          <Trophy className={cn(
            "h-4 w-4 transition-colors duration-300",
            expanded ? "text-primary" : "text-primary/70 group-hover:text-primary"
          )} />
        </div>

        {/* Title + game */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground truncate group-hover:text-primary/90 transition-colors">
              {tournament.title}
            </span>
            <Badge
              variant="secondary"
              className={cn(
                "text-[9px] px-2 py-0.5 uppercase font-bold shrink-0 hidden sm:inline-flex tracking-wider",
                "bg-primary/10 text-primary/80 border-primary/20"
              )}
            >
              Afsluttet
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <Gamepad2 className="h-3 w-3" />
              {tournament.game_ids.map((id) => GAME_NAMES[id] || id).join(" + ")}
            </span>
          </div>
        </div>

        {/* Winner */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Crown className="h-3.5 w-3.5 text-primary/60" />
          <CompactWinner tournamentId={tournament.id} />
        </div>

        {/* End date */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </div>
      </button>

      {/* Expanded full card */}
      {expanded && (
        <div className="mt-3 animate-in slide-in-from-top-2 fade-in duration-300">
          <CompletedTournamentCard tournament={tournament} />
        </div>
      )}
    </div>
  );
}