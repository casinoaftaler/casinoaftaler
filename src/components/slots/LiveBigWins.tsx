import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveBigWins, type BigWin } from "@/hooks/useLiveBigWins";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function getAccentClass(multiplier: number) {
  if (multiplier >= 500) return "border-rose-500/60 bg-rose-500/10";
  if (multiplier >= 200) return "border-purple-400/50 bg-purple-500/10";
  return "border-amber-500/40 bg-amber-500/10";
}

function getEmoji(multiplier: number) {
  if (multiplier >= 500) return "🏆";
  if (multiplier >= 300) return "🔥";
  return "💥";
}

function WinBubble({ win, onRemove }: { win: BigWin; onRemove: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // No auto-remove timer — wins stay until replaced by newer ones (max 10)

  const accentClass = getAccentClass(win.winMultiplier);
  const emoji = getEmoji(win.winMultiplier);
  const isBigWin = win.winMultiplier >= 300;

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
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase leading-none">
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

export function LiveBigWins() {
  const { wins, removeWin } = useLiveBigWins();

  if (wins.length === 0) return null;

  return (
    <div className="hidden xl:flex fixed right-24 top-1/2 -translate-y-1/2 z-30 flex-col gap-2.5 pointer-events-none">
      {wins.map((win) => (
        <div key={win.id} className="pointer-events-auto">
          <WinBubble win={win} onRemove={removeWin} />
        </div>
      ))}
    </div>
  );
}
