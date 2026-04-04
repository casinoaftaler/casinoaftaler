import { Trophy, TrendingUp, LogIn } from "lucide-react";
import { useLiveWinnersFeed, FeedEvent } from "@/hooks/useLiveWinnersFeed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/community-micro.css";

function EventCard({ event }: { event: FeedEvent }) {
  const timeAgo = formatDistanceToNow(new Date(event.timestamp), {
    addSuffix: false,
    locale: da,
  });

  if (event.type === "big_win") {
    return (
      <div className="flex items-start gap-2.5 px-3 py-2 border-b border-border/20 last:border-0">
        <Link to={`/community/profil/${event.userId}`} className="shrink-0 mt-0.5">
          <Avatar className="h-6 w-6 cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all">
            <AvatarImage src={event.avatarUrl ?? undefined} />
            <AvatarFallback className="text-[9px] bg-primary/20 text-primary">
              {(event.userName ?? "?")[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <Link to={`/community/profil/${event.userId}`} className="text-[11px] font-semibold text-foreground truncate hover:text-primary transition-colors">
              {event.userName}
            </Link>
            <span className="text-[9px] text-muted-foreground shrink-0">{timeAgo}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px] font-mono font-bold text-emerald-400">
              x{event.multiplier}
            </span>
            <span className="text-[9px] text-muted-foreground">·</span>
            <span className="text-[10px] font-mono text-amber-400">
              {event.winAmount?.toLocaleString("da-DK")} pts
            </span>
            <span className="text-[9px] text-muted-foreground">·</span>
            <span className="text-[9px] text-muted-foreground/70">
              bet {event.betAmount?.toLocaleString("da-DK")}
            </span>
          </div>
          <span className="text-[9px] text-muted-foreground/70">{event.gameName}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 px-3 py-2 border-b border-border/20 last:border-0">
      <div className="h-6 w-6 shrink-0 mt-0.5 rounded-full bg-amber-500/20 flex items-center justify-center">
        <TrendingUp className="h-3 w-3 text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-foreground leading-tight">
          <span className="font-semibold">{event.overtakerName}</span>{" "}
          <span className="text-muted-foreground">overtog</span>{" "}
          <span className="font-bold text-amber-400">#{event.newRank}</span>{" "}
          <span className="text-muted-foreground">fra</span>{" "}
          <span className="font-medium">{event.previousHolderName}</span>
        </p>
        <span className="text-[9px] text-muted-foreground/70">{event.gameName}</span>
      </div>
    </div>
  );
}

export function LiveWinnersFeed() {
  const { events } = useLiveWinnersFeed();

  return (
    <div className="community-panel-vertical rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/30">
        <div className="relative flex items-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
        </div>
        <Trophy className="h-3.5 w-3.5 text-amber-400" />
        <span className="text-[11px] font-bold text-foreground tracking-wide uppercase flex-1">
          Live Vindere
        </span>
        <span className="text-[9px] text-muted-foreground/60">100x+</span>
      </div>

      {/* Event list */}
      {events.length === 0 ? (
        <div className="px-3 py-4 text-center">
          <p className="text-[10px] text-muted-foreground">
            Ingen store gevinster endnu...
          </p>
          <p className="text-[9px] text-muted-foreground/50 mt-0.5">
            Viser wins over 100x
          </p>
        </div>
      ) : (
        <ScrollArea className="max-h-[280px]">
          <div>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-border/20">
        <p className="text-[8px] text-muted-foreground/40 text-center">
          Opdateres live
        </p>
      </div>
    </div>
  );
}
