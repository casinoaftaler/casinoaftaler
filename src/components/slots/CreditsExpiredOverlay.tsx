import { useState, useEffect } from "react";
import { Clock, Sparkles, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { CreditCoin } from "@/components/CreditCoin";
import { ScrollArea } from "@/components/ui/scroll-area";

function getTimeUntilMidnightCopenhagen(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const copenhagenNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Copenhagen" }));
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

const CASINO_PROMOS = [
  { name: "SpilDanskNu", bonus: "1.000 kr. bonus", slug: "spildansknu", color: "from-blue-600 to-blue-800" },
  { name: "Spilleautomaten", bonus: "1.000 kr. bonus", slug: "spilleautomaten", color: "from-emerald-600 to-emerald-800" },
  { name: "Campobet", bonus: "1.000 kr. bonus", slug: "campobet", color: "from-orange-600 to-orange-800" },
  { name: "Betinia", bonus: "1.000 kr. bonus", slug: "betinia", color: "from-purple-600 to-purple-800" },
];

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
      <ScrollArea className="max-h-[90vh] w-full flex justify-center">
        <div className="max-w-sm mx-auto px-4 py-6 text-center space-y-4 bg-gradient-to-b from-card/95 to-card border border-primary/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center">
              <CreditCoin size="lg" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-foreground">
            Dine credits er opbrugt
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Kom tilbage i morgen for at vinde præmier og komme på leaderboardet!
          </p>

          <div className="flex items-center justify-center gap-2 text-primary">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Nye credits om</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[
              { value: pad(timeLeft.hours), label: "timer" },
              { value: pad(timeLeft.minutes), label: "min" },
              { value: pad(timeLeft.seconds), label: "sek" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-lg font-bold text-primary/50">:</span>}
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black tabular-nums text-primary">
                    {unit.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {unit.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Casino promos */}
          <div className="border-t border-border/30 pt-3 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              🎰 Spil for rigtige penge
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CASINO_PROMOS.map((casino) => (
                <Link
                  key={casino.slug}
                  to={`/anmeldelse/${casino.slug}`}
                  className={`flex items-center justify-between gap-1.5 rounded-lg bg-gradient-to-r ${casino.color} px-3 py-2.5 text-white transition-transform hover:scale-[1.03] active:scale-95`}
                >
                  <div className="text-left min-w-0">
                    <div className="text-xs font-bold truncate">{casino.name}</div>
                    <div className="text-[10px] opacity-80">{casino.bonus}</div>
                  </div>
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 pt-1">
            <Sparkles className="h-3 w-3" />
            <span>Credits nulstilles ved midnat (dansk tid)</span>
          </div>
        </div>
      </ScrollArea>
    </div>
    </div>
  );
}
