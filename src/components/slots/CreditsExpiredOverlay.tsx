import { useState, useEffect } from "react";
import { Clock, Sparkles, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { CreditCoin } from "@/components/CreditCoin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCasinoBySlug } from "@/hooks/useCasinoBySlug";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

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

interface CreditsExpiredOverlayProps {
  isVisible: boolean;
}

export function CreditsExpiredOverlay({ isVisible }: CreditsExpiredOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightCopenhagen);
  const { data: playkasinoCasino } = useCasinoBySlug("playkasino");
  const { user } = useAuth();

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnightCopenhagen());
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const playkasinoData = playkasino;

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

          {/* PlayKasino promo */}
          <div className="border-t border-border/30 pt-4 space-y-3">
            <p className="text-sm font-semibold text-foreground leading-snug">
              Er du klar til at spille for rigtige penge? Prøv det helt nye danske casino, <span className="text-primary">PlayKasino</span>. (No-Sticky bonus!).
            </p>

            {playkasino && (
              <div className="rounded-xl border border-primary/30 bg-gradient-to-b from-primary/10 to-primary/5 p-4 space-y-3">
                {playkasino.logo_url && (
                  <img
                    src={optimizeStorageImage(playkasino.logo_url, 120)}
                    alt="PlayKasino logo"
                    className="h-10 mx-auto object-contain"
                    loading="lazy"
                  />
                )}
                <p className="text-xs text-muted-foreground">{playkasino.bonus_amount}</p>
                <Button
                  size="sm"
                  className="w-full gap-1.5"
                  onClick={() => getAffiliateRedirect("playkasino", user?.id)}
                >
                  Klik her!
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}

            {!playkasino && (
              <Link
                to="/casino-anmeldelser/playkasino"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
              >
                Klik her!
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 pt-1">
            <Sparkles className="h-3 w-3" />
            <span>Credits nulstilles ved midnat (dansk tid)</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}