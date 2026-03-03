import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveBigWins, type BigWin } from "@/hooks/useLiveBigWins";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type LiveBigWinsTheme = "default" | "candy";

const THEME_ACCENTS: Record<LiveBigWinsTheme, { high: string; mid: string; low: string; badge: string }> = {
  default: {
    high: "border-rose-500/60 bg-rose-500/10",
    mid: "border-purple-400/50 bg-purple-500/10",
    low: "border-amber-500/40 bg-amber-500/10",
    badge: "bg-amber-500/20 text-amber-300",
  },
  candy: {
    high: "border-rose-400/60 bg-rose-400/10",
    mid: "border-fuchsia-400/50 bg-fuchsia-500/10",
    low: "border-pink-400/40 bg-pink-400/10",
    badge: "bg-fuchsia-500/20 text-fuchsia-300",
  },
};

function getAccentClass(multiplier: number, theme: LiveBigWinsTheme) {
  const t = THEME_ACCENTS[theme];
  if (multiplier >= 500) return t.high;
  if (multiplier >= 200) return t.mid;
  return t.low;
}

function getEmoji(multiplier: number) {
  if (multiplier >= 500) return "🏆";
  if (multiplier >= 300) return "🔥";
  return "💥";
}

function WinBubble({ win, onRemove, theme }: { win: BigWin; onRemove: (id: string) => void; theme: LiveBigWinsTheme }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const accentClass = getAccentClass(win.winMultiplier, theme);
  const emoji = getEmoji(win.winMultiplier);
  const isBigWin = win.winMultiplier >= 300;
  const badgeClass = THEME_ACCENTS[theme].badge;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm",
        "shadow-lg transition-all duration-400",
        "animate-in slide-in-from-right fade-in",
        accentClass
      )}
      style={{ minWidth: 240, maxWidth: 320 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => navigate(`/u/${win.username}`)}
              className="shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-transform hover:scale-110"
            >
              <Avatar className="h-10 w-10 border border-border/30">
                {win.avatarUrl ? (
                  <AvatarImage src={win.avatarUrl} alt={win.username} />
                ) : null}
                <AvatarFallback className="text-sm bg-muted">
                  {win.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs">
            Profil
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-foreground/90 truncate">
            {win.username}
          </span>
          {isBigWin && (
            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded uppercase leading-none", badgeClass)}>
              Big Win
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground truncate">
          {emoji} {win.winMultiplier}x på {win.slotName}
        </span>
      </div>
    </div>
  );
}

export function LiveBigWins({ theme = "default" }: { theme?: LiveBigWinsTheme }) {
  const { wins, removeWin } = useLiveBigWins();

  if (wins.length === 0) return null;

  return (
    <div className="hidden xl:flex fixed right-24 top-1/2 -translate-y-1/2 z-30 flex-col gap-2.5 pointer-events-none">
      {wins.map((win) => (
        <div key={win.id} className="pointer-events-auto">
          <WinBubble win={win} onRemove={removeWin} theme={theme} />
        </div>
      ))}
    </div>
  );
}
