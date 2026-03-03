import { useState, useEffect } from "react";
import { Clock, Sparkles, ExternalLink } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";
import { Link } from "react-router-dom";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";

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
  {
    name: "SpilDanskNu",
    slug: "spildansknu",
    bonus: "100% op til 1.000 kr.",
    reviewPath: "/casino-anmeldelser/spildansknu",
  },
  {
    name: "Spilleautomaten",
    slug: "spilleautomaten",
    bonus: "100% op til 1.000 kr.",
    reviewPath: "/casino-anmeldelser/spilleautomaten",
  },
  {
    name: "Campobet",
    slug: "campobet",
    bonus: "100% op til 1.000 kr.",
    reviewPath: "/casino-anmeldelser/campobet",
  },
  {
    name: "Betinia",
    slug: "betinia",
    bonus: "100% op til 1.000 kr.",
    reviewPath: "/casino-anmeldelser/betinia",
  },
];

interface CreditsExpiredOverlayProps {
  isVisible: boolean;
}

export function CreditsExpiredOverlay({ isVisible }: CreditsExpiredOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightCopenhagen);
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

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl">
      <div className="max-w-md mx-4 text-center space-y-4 bg-gradient-to-b from-card/95 to-card border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center">
            <CreditCoin size="lg" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-foreground">
          Dine credits er opbrugt
        </h3>

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

        {/* Casino promo section */}
        <div className="pt-3 border-t border-border/50 space-y-3">
          <p className="text-sm font-medium text-foreground">
            Eller prøv for rigtige penge 🎰
          </p>
          <div className="grid gap-2">
            {CASINO_PROMOS.map((casino) => (
              <div
                key={casino.slug}
                className="flex items-center justify-between gap-3 bg-muted/50 rounded-lg px-3 py-2.5 border border-border/50"
              >
                <div className="text-left min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{casino.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{casino.bonus}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Link
                    to={casino.reviewPath}
                    className="text-xs text-primary hover:underline whitespace-nowrap"
                  >
                    Læs anmeldelse
                  </Link>
                  <button
                    onClick={() => getAffiliateRedirect(casino.slug, user?.id)}
                    className="flex items-center gap-1 text-xs font-medium bg-primary text-primary-foreground rounded-md px-2.5 py-1.5 hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    Spil nu
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60">
            18+ | Spil ansvarligt | Regler og vilkår gælder
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
          <Sparkles className="h-3 w-3" />
          <span>Credits nulstilles ved midnat (dansk tid)</span>
        </div>
      </div>
    </div>
  );
}
