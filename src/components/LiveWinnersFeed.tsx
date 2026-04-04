import { useState } from "react";
import { Trophy, TrendingUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLiveWinnersFeed, FeedEvent } from "@/hooks/useLiveWinnersFeed";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";
import { useLocation } from "react-router-dom";

function EventCard({ event }: { event: FeedEvent }) {
  const timeAgo = formatDistanceToNow(new Date(event.timestamp), {
    addSuffix: false,
    locale: da,
  });

  if (event.type === "big_win") {
    return (
      <div className="flex items-start gap-2.5 px-3 py-2.5 border-b border-border/30 last:border-0 animate-in slide-in-from-top-2 duration-300">
        <Avatar className="h-7 w-7 shrink-0 mt-0.5">
          <AvatarImage src={event.avatarUrl ?? undefined} />
          <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
            {(event.userName ?? "?")[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-semibold text-foreground truncate">
              {event.userName}
            </span>
            <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] font-mono font-bold text-emerald-400">
              x{event.multiplier}
            </span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[11px] font-mono text-amber-400">
              {event.winAmount?.toLocaleString("da-DK")} kr
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/70">{event.gameName}</span>
        </div>
      </div>
    );
  }

  // Overtake event
  return (
    <div className="flex items-start gap-2.5 px-3 py-2.5 border-b border-border/30 last:border-0 animate-in slide-in-from-top-2 duration-300">
      <div className="h-7 w-7 shrink-0 mt-0.5 rounded-full bg-amber-500/20 flex items-center justify-center">
        <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-foreground leading-tight">
          <span className="font-semibold">{event.overtakerName}</span>{" "}
          <span className="text-muted-foreground">overtog</span>{" "}
          <span className="font-bold text-amber-400">#{event.newRank}</span>{" "}
          <span className="text-muted-foreground">fra</span>{" "}
          <span className="font-medium">{event.previousHolderName}</span>
        </p>
        <span className="text-[10px] text-muted-foreground/70">{event.gameName}</span>
      </div>
    </div>
  );
}

export function LiveWinnersFeed() {
  const { events } = useLiveWinnersFeed();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  const isSlotPage = location.pathname.startsWith("/community/slots/");

  // Hide on mobile and slot pages
  if (isMobile || isSlotPage) return null;
  if (!isOpen) return null;

  // Minimized state — just show a tab
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed right-0 top-1/3 z-40 flex items-center gap-1 px-2 py-3 rounded-l-lg border border-r-0 border-border/50 transition-all hover:px-3"
        style={{
          background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.95) 100%)",
          boxShadow: "0 4px 20px hsl(var(--background) / 0.5)",
        }}
      >
        <ChevronLeft className="h-3.5 w-3.5 text-primary" />
        <Trophy className="h-4 w-4 text-amber-400" />
        {events.length > 0 && (
          <span className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">
            {events.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className="fixed right-0 top-[15%] z-40 w-[260px] max-h-[60vh] flex flex-col rounded-l-xl border border-r-0 border-border/50 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.97) 100%)",
        boxShadow: "0 8px 32px hsl(var(--background) / 0.6), inset 0 1px 0 hsl(var(--border) / 0.1)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b border-border/40"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary) / 0.08), transparent)",
        }}
      >
        <div className="relative flex items-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
        </div>
        <Trophy className="h-4 w-4 text-amber-400" />
        <span className="text-xs font-bold text-foreground tracking-wide uppercase flex-1">
          Live Vindere
        </span>
        <button
          onClick={() => setIsMinimized(true)}
          className="p-0.5 hover:bg-muted/50 rounded transition-colors"
          title="Minimer"
        >
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="p-0.5 hover:bg-muted/50 rounded transition-colors"
          title="Luk"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Event list */}
      <ScrollArea className="flex-1">
        {events.length === 0 ? (
          <div className="px-3 py-6 text-center">
            <p className="text-[11px] text-muted-foreground">
              Ingen store gevinster endnu...
            </p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">
              Viser wins over 100x
            </p>
          </div>
        ) : (
          <div>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-border/30">
        <p className="text-[9px] text-muted-foreground/50 text-center">
          Opdateres live · Wins over 100x
        </p>
      </div>
    </div>
  );
}
