import { useState } from "react";
import { Trophy, ChevronRight, Gamepad2, Gift, Calendar } from "lucide-react";
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
        avatarClassName="h-6 w-6"
        showDropdown={false}
      />
      <span className="text-sm font-medium text-foreground truncate">{winner.display_name || "Anonym"}</span>
    </div>
  );
}

export function CompletedTournamentRow({ tournament }: { tournament: Tournament }) {
  const [expanded, setExpanded] = useState(false);
  const endDate = new Date(tournament.ends_at);
  const formattedDate = endDate.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-0">
      {/* Compact row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full flex items-center gap-3 md:gap-4 px-4 py-3 rounded-xl text-left transition-all cursor-pointer",
          "border bg-card hover:bg-secondary/30",
          expanded ? "border-primary/20 bg-secondary/20" : "border-border/40 hover:border-border/60",
          "group"
        )}
        style={{
          boxShadow: expanded
            ? "0 4px 16px hsl(var(--primary) / 0.06)"
            : "0 1px 4px hsl(0 0% 0% / 0.03)",
        }}
      >
        {/* Expand chevron */}
        <ChevronRight className={cn(
          "h-4 w-4 text-muted-foreground transition-transform shrink-0",
          expanded && "rotate-90"
        )} />

        {/* Trophy icon */}
        <div className="p-1.5 rounded-lg bg-primary/10 shrink-0">
          <Trophy className="h-4 w-4 text-primary" />
        </div>

        {/* Title + game */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground truncate">{tournament.title}</span>
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 uppercase font-semibold shrink-0 hidden sm:inline-flex">
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
          <span className="text-xs text-muted-foreground">Vinder:</span>
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
