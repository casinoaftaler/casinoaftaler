import { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";

function getTimeUntilMidnightCopenhagen(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  
  // Get current time in Copenhagen
  const copenhagenNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Copenhagen" }));
  
  // Next midnight in Copenhagen
  const midnight = new Date(copenhagenNow);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  
  const diffMs = midnight.getTime() - copenhagenNow.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

interface CreditsExpiredOverlayProps {
  isVisible: boolean;
}

export function CreditsExpiredOverlay({ isVisible }: CreditsExpiredOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightCopenhagen);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnightCopenhagen());
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl">
      <div className="max-w-sm mx-4 text-center space-y-4 bg-gradient-to-b from-card/95 to-card border border-primary/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center">
            <CreditCoin size="lg" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground">
          Dine credits er opbrugt
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Kom tilbage i morgen for at få muligheden for at vinde præmier og komme på leaderboardet!
        </p>

        <div className="flex items-center justify-center gap-2 text-primary">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Nye credits om</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          {[
            { value: pad(timeLeft.hours), label: "timer" },
            { value: pad(timeLeft.minutes), label: "min" },
            { value: pad(timeLeft.seconds), label: "sek" },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-xl font-bold text-primary/50">:</span>}
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black tabular-nums text-primary">
                  {unit.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 pt-2">
          <Sparkles className="h-3 w-3" />
          <span>Credits nulstilles ved midnat (dansk tid)</span>
        </div>
      </div>
    </div>
  );
}
