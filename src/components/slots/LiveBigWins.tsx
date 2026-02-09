import { useEffect, useRef } from "react";
import { useLiveBigWins, type BigWin } from "@/hooks/useLiveBigWins";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

  useEffect(() => {
    // Auto-remove after 15 seconds
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.classList.add("animate-out");
        setTimeout(() => onRemove(win.id), 400);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [win.id, onRemove]);

  const accentClass = getAccentClass(win.winMultiplier);
  const emoji = getEmoji(win.winMultiplier);
  const isBigWin = win.winMultiplier >= 300;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-lg border backdrop-blur-sm",
        "shadow-lg transition-all duration-400",
        "animate-in slide-in-from-right fade-in",
        accentClass
      )}
      style={{ minWidth: 200, maxWidth: 280 }}
    >
      <Avatar className="h-8 w-8 shrink-0 border border-border/30">
        {win.avatarUrl ? (
          <AvatarImage src={win.avatarUrl} alt={win.username} />
        ) : null}
        <AvatarFallback className="text-xs bg-muted">
          {win.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-foreground/90 truncate">
            {win.username}
          </span>
          {isBigWin && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase leading-none">
              Big Win
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground truncate">
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
    <div className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-2 pointer-events-none">
      {wins.map((win) => (
        <div key={win.id} className="pointer-events-auto">
          <WinBubble win={win} onRemove={removeWin} />
        </div>
      ))}
    </div>
  );
}
