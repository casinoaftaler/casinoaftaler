import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserProfileLink } from "@/components/UserProfileLink";
import { useTournamentLeaderboard, type Tournament } from "@/hooks/useTournaments";
import { CompletedTournamentCard } from "./CompletedTournamentCard";
import { cn } from "@/lib/utils";

import bookIntro from "@/assets/slots/slot-intro-screen.jpg";
import riseIntro from "@/assets/slots/rise/intro-screen.jpg";

const GAME_NAMES: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
};

const GAME_IMAGES: Record<string, string> = {
  "book-of-fedesvin": bookIntro,
  "rise-of-fedesvin": riseIntro,
};

function CompactWinner({ tournamentId }: { tournamentId: string }) {
  const { data } = useTournamentLeaderboard(tournamentId);
  const winner = data?.entries?.[0];

  if (!winner) return <span className="text-sm text-muted-foreground">—</span>;

  return (
    <div className="flex items-center gap-2">
      <UserProfileLink
        userId={winner.user_id}
        displayName={winner.display_name || "Anonym"}
        avatarUrl={winner.avatar_url}
        avatarClassName="h-6 w-6"
        showDropdown={false}
      />
      <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
        {winner.display_name || "Anonym"}
      </span>
    </div>
  );
}

export function CompletedTournamentRow({ tournament, index = 0 }: { tournament: Tournament; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const endDate = new Date(tournament.ends_at);
  const formattedDate = endDate.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" });

  // Pick the first game image as thumbnail
  const thumbSrc = tournament.game_ids
    .map((id) => GAME_IMAGES[id])
    .find(Boolean);

  const gameLabel = tournament.game_ids
    .map((id) => GAME_NAMES[id] || id)
    .join(" + ");

  return (
    <div className="space-y-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full flex items-center gap-4 px-3 md:px-4 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer",
          "border bg-card hover:bg-secondary/30",
          expanded
            ? "border-primary/25 bg-secondary/20 shadow-md shadow-primary/5"
            : "border-border/40 hover:border-border/60 hover:shadow-sm",
          "group"
        )}
      >
        {/* Game thumbnail */}
        {thumbSrc && (
          <div className="relative shrink-0 w-[72px] h-[48px] md:w-[88px] md:h-[56px] rounded-lg overflow-hidden border border-border/30">
            <img
              src={thumbSrc}
              alt={gameLabel}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <Badge className="absolute top-1 left-1 text-[8px] px-1.5 py-0 uppercase font-bold bg-primary/90 text-primary-foreground border-0">
              Afsluttet
            </Badge>
          </div>
        )}

        {/* Title + game provider */}
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-sm text-foreground truncate block">
            {tournament.title}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5 block truncate">
            {gameLabel}
          </span>
        </div>

        {/* Winner */}
        <div className="hidden md:flex flex-col items-start shrink-0 min-w-[160px]">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">Vinder:</span>
          <CompactWinner tournamentId={tournament.id} />
        </div>

        {/* End date */}
        <div className="hidden sm:flex flex-col items-start shrink-0 min-w-[100px]">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">Ended:</span>
          <span className="text-sm font-medium text-foreground">{formattedDate}</span>
        </div>

        {/* Chevron */}
        <div className={cn(
          "shrink-0 p-2 rounded-lg border border-border/40 transition-all",
          "group-hover:border-primary/30 group-hover:bg-primary/5",
          expanded && "border-primary/30 bg-primary/5"
        )}>
          <ChevronRight className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-90 text-primary"
          )} />
        </div>
      </button>

      {expanded && (
        <div className="mt-3 animate-in slide-in-from-top-2 fade-in duration-300">
          <CompletedTournamentCard tournament={tournament} />
        </div>
      )}
    </div>
  );
}