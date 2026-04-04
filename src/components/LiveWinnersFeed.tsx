import { Trophy, TrendingUp, LogIn, Flame } from "lucide-react";
import { useLiveWinnersFeed, FeedEvent } from "@/hooks/useLiveWinnersFeed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/live-winners.css";

function MultiplierBadge({ multiplier }: { multiplier: number }) {
  const tier =
    multiplier >= 500 ? "legendary" :
    multiplier >= 200 ? "epic" :
    "rare";

  return (
    <span
      className={`live-win-badge live-win-badge--${tier} inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums`}
    >
      {tier === "legendary" && <Flame className="h-2.5 w-2.5" />}
      x{multiplier}
    </span>
  );
}

function EventCard({ event, index }: { event: FeedEvent; index: number }) {
  const timeAgo = formatDistanceToNow(new Date(event.timestamp), {
    addSuffix: false,
    locale: da,
  });

  if (event.type === "big_win") {
    const isTop = index === 0;

    return (
      <div
        className={`live-win-row group relative flex items-start gap-2.5 px-3 py-2.5 transition-all duration-300 ${
          isTop ? "live-win-row--highlight" : ""
        }`}
      >
        {/* Rank accent line */}
        {isTop && (
          <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-transparent" />
        )}

        <Link to={`/u/${encodeURIComponent(event.userName ?? '')}`} className="shrink-0 mt-0.5">
          <Avatar className={`h-7 w-7 ring-1 transition-all duration-200 group-hover:ring-2 ${
            isTop ? "ring-amber-400/50 group-hover:ring-amber-400" : "ring-border/30 group-hover:ring-primary/40"
          }`}>
            <AvatarImage src={event.avatarUrl ?? undefined} />
            <AvatarFallback className={`text-[9px] font-bold ${
              isTop ? "bg-amber-500/20 text-amber-400" : "bg-primary/15 text-primary"
            }`}>
              {(event.userName ?? "?")[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1.5">
            <Link
              to={`/u/${encodeURIComponent(event.userName ?? '')}`}
              className={`text-[11px] font-semibold truncate transition-colors ${
                isTop ? "text-amber-300 hover:text-amber-200" : "text-foreground hover:text-primary"
              }`}
            >
              {event.userName}
            </Link>
            <span className="text-[9px] text-muted-foreground/50 shrink-0 tabular-nums">{timeAgo}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <MultiplierBadge multiplier={event.multiplier ?? 0} />
            <span className="text-[10px] font-mono font-semibold text-amber-400 tabular-nums">
              {event.winAmount?.toLocaleString("da-DK")} pts
            </span>
            <span className="text-[9px] text-muted-foreground/40">
              bet {event.betAmount?.toLocaleString("da-DK")}
            </span>
          </div>

          <span className="text-[9px] text-muted-foreground/50 mt-0.5 block">{event.gameName}</span>
        </div>
      </div>
    );
  }

  // Overtake event
  return (
    <div className="live-win-row group flex items-start gap-2.5 px-3 py-2.5 transition-all duration-300">
      <div className="h-7 w-7 shrink-0 mt-0.5 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center ring-1 ring-amber-500/20">
        <TrendingUp className="h-3 w-3 text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-foreground leading-tight">
          <span className="font-semibold">{event.overtakerName}</span>{" "}
          <span className="text-muted-foreground/60">overtog</span>{" "}
          <span className="font-bold text-amber-400">#{event.newRank}</span>{" "}
          <span className="text-muted-foreground/60">fra</span>{" "}
          <span className="font-medium">{event.previousHolderName}</span>
        </p>
        <span className="text-[9px] text-muted-foreground/50 mt-0.5 block">{event.gameName}</span>
      </div>
    </div>
  );
}

export function LiveWinnersFeed() {
  const { events } = useLiveWinnersFeed();
  const { user } = useAuth();

  return (
    <div className="live-winners-panel rounded-xl overflow-hidden">
      {/* Header */}
      <div className="live-winners-header flex items-center gap-2 px-3.5 py-3 border-b border-white/[0.04]">
        <div className="relative flex items-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-30" />
        </div>
        <Trophy className="h-3.5 w-3.5 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]" />
        <span className="text-[11px] font-bold text-foreground tracking-widest uppercase flex-1">
          Live Vindere
        </span>
        <span className="live-winners-threshold text-[8px] font-mono font-bold tabular-nums px-1.5 py-0.5 rounded">
          100x+
        </span>
      </div>

      {/* Event list */}
      {!user ? (
        <div className="px-4 py-6 text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center">
            <LogIn className="h-4 w-4 text-muted-foreground/40" />
          </div>
          <p className="text-[10px] text-muted-foreground font-medium">
            Log ind for at se live gevinster
          </p>
          <Link
            to="/auth"
            className="inline-block mt-2.5 text-[10px] font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Log ind her →
          </Link>
        </div>
      ) : events.length === 0 ? (
        <div className="px-4 py-5 text-center">
          <p className="text-[10px] text-muted-foreground">
            Ingen store gevinster endnu...
          </p>
          <p className="text-[9px] text-muted-foreground/40 mt-0.5">
            Viser wins over 100x
          </p>
        </div>
      ) : (
        <ScrollArea className="max-h-[300px]">
          <div className="divide-y divide-white/[0.03]">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Footer */}
      <div className="live-winners-footer px-3 py-1.5 border-t border-white/[0.04]">
        <p className="text-[8px] text-muted-foreground/30 text-center tracking-wide uppercase">
          Opdateres live
        </p>
      </div>
    </div>
  );
}
