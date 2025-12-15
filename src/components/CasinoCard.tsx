import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronDown, ChevronUp, Flame, Trophy, Medal, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Casino {
  id: string;
  name: string;
  slug: string;
  rating: number;
  bonusTitle: string;
  bonusAmount: string;
  bonusType: string;
  wageringRequirements: string;
  validity: string;
  minDeposit: string;
  payoutTime: string;
  freeSpins: string;
  features: string[];
  pros: string[];
  cons: string[];
  description: string;
  isRecommended?: boolean;
  logoUrl?: string | null;
  affiliateUrl?: string | null;
}

interface CasinoCardProps {
  casino: Casino;
  rank?: number;
  size?: "large" | "medium" | "small";
}

export function CasinoCard({ casino, rank, size = "small" }: CasinoCardProps) {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const sizeStyles = {
    large: {
      logo: "h-24 w-24",
      name: "text-2xl",
      bonus: "text-5xl",
      padding: "p-6",
      star: "h-5 w-5",
      badge: "text-sm",
      stats: "text-base",
      statsLabel: "text-xs",
    },
    medium: {
      logo: "h-20 w-20",
      name: "text-xl",
      bonus: "text-4xl",
      padding: "p-5",
      star: "h-4 w-4",
      badge: "text-xs",
      stats: "text-sm",
      statsLabel: "text-[11px]",
    },
    small: {
      logo: "h-16 w-16",
      name: "text-lg",
      bonus: "text-3xl",
      padding: "p-4",
      star: "h-4 w-4",
      badge: "text-xs",
      stats: "text-sm",
      statsLabel: "text-[10px]",
    },
  };

  const styles = sizeStyles[size];

  const isTopRanked = rank === 1;
  const isSecondRanked = rank === 2;

  // Background colors for top ranked cards
  const getCardBackground = () => {
    if (isTopRanked) return "bg-gradient-to-br from-amber-500/10 via-card to-amber-600/5";
    if (isSecondRanked) return "bg-gradient-to-br from-slate-400/10 via-card to-slate-500/5";
    return "bg-card";
  };

  return (
    <div className="relative group">
      {/* Glow gradient background - only for top 3 */}
      {rank && rank <= 3 && (
        <div className={`absolute -inset-0.5 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${rank === 1 ? "bg-gradient-to-r from-amber-500/50 via-orange-400/40 to-yellow-500/50" : rank === 2 ? "bg-gradient-to-r from-slate-400/40 via-blue-400/30 to-slate-400/40" : "bg-gradient-to-r from-emerald-500/30 via-primary/40 to-violet-500/30"}`} />
      )}
      
      <Card className={`relative overflow-hidden ${getCardBackground()} rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full ${isTopRanked ? "border-2 border-amber-500 ring-2 ring-amber-500/30" : isSecondRanked ? "border-2 border-slate-400 ring-2 ring-slate-400/30" : "border-border"}`}>
      <CardContent className="p-0 h-full flex flex-col">
        <div className="flex flex-col flex-1 relative">
          {/* Rank Badge */}
          {rank && (
            <div className={`absolute top-0 left-0 flex flex-col items-center justify-center ${size === "large" ? "w-12 h-14 text-xl" : size === "medium" ? "w-10 h-12 text-lg" : "w-8 h-10 text-base"} ${isTopRanked ? "bg-gradient-to-b from-amber-500 to-amber-600" : isSecondRanked ? "bg-gradient-to-b from-slate-400 to-slate-500" : "bg-primary"} text-primary-foreground font-bold rounded-br-xl rounded-tl-xl z-10`}>
              {isTopRanked && <Trophy className={`${size === "large" ? "h-4 w-4" : "h-3 w-3"} mb-0.5`} />}
              {isSecondRanked && <Medal className={`${size === "large" ? "h-4 w-4" : "h-3 w-3"} mb-0.5`} />}
              {rank}
            </div>
          )}
          
          {/* Header Section */}
          <div className={`flex items-start gap-4 ${styles.padding} pb-3 ${rank ? "pt-6" : ""}`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              {casino.logoUrl ? (
                <img
                  src={casino.logoUrl}
                  alt={casino.name}
                  className={`${styles.logo} rounded-xl object-cover`}
                />
              ) : (
                <div className={`flex ${styles.logo} items-center justify-center rounded-xl bg-muted text-lg font-bold text-foreground`}>
                  {casino.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and Rating */}
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`${styles.name} font-bold text-foreground`}>{casino.name}</h3>
                {casino.isRecommended && (
                  <Badge className={`bg-destructive text-destructive-foreground ${styles.badge}`}>
                    ANBEFALET
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`${styles.star} ${
                      i < Math.floor(casino.rating)
                        ? "fill-accent text-accent"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Extra Hot Badge */}
            {casino.isRecommended && (
              <div className="flex flex-col items-center rounded bg-destructive px-2 py-1">
                <Flame className={`${size === "large" ? "h-5 w-5" : "h-4 w-4"} text-destructive-foreground`} />
                <span className={`${size === "large" ? "text-xs" : "text-[10px]"} font-bold leading-tight text-destructive-foreground`}>EXTRA</span>
                <span className={`${size === "large" ? "text-xs" : "text-[10px]"} font-bold leading-tight text-destructive-foreground`}>HOT</span>
              </div>
            )}
          </div>

          {/* Feature Badges */}
          <div className={`flex flex-wrap gap-2 px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-3`}>
            <Badge className={`rounded-md bg-primary/20 text-primary border-primary/30 ${styles.badge}`}>
              {casino.bonusType === "No-sticky" ? "NO-STICKY BONUS" : casino.bonusType.toUpperCase()}
            </Badge>
            {casino.features.slice(0, size === "large" ? 4 : 2).map((feature, index) => {
              const colors = [
                "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
                "bg-sky-500/20 text-sky-400 border-sky-500/30",
                "bg-violet-500/20 text-violet-400 border-violet-500/30",
                "bg-amber-500/20 text-amber-400 border-amber-500/30",
              ];
              return (
                <Badge key={feature} className={`rounded-md ${colors[index % colors.length]} ${styles.badge}`}>
                  {feature.toUpperCase()}
                </Badge>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className={`px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-2 flex-1`}>
            {/* Prominent Bonus Amount */}
            <div className="text-center mb-3">
              <p className={`${styles.statsLabel} text-muted-foreground mb-1`}>Op til</p>
              <p className={`${styles.bonus} font-bold text-amber-500`}>{casino.bonusAmount}</p>
            </div>
            
            {/* Toggle Stats Button */}
            <button
              onClick={() => setShowStats(!showStats)}
              className="w-full flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary py-2 mb-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              {showStats ? "Skjul detaljer" : "Vis detaljer"}
              {showStats ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {/* Collapsible Stats */}
            {showStats && (
              <div className="space-y-2 animate-fade-in">
                {/* Secondary Stats Row */}
                <div className={`grid grid-cols-3 gap-2 bg-muted/50 rounded-lg py-3 px-2`}>
                  <div className="text-center">
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Procent</p>
                    <p className={`${styles.stats} font-bold text-foreground`}>100%</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Gratis spins</p>
                    <p className={`${styles.stats} font-bold text-foreground`}>{casino.freeSpins}</p>
                  </div>
                  <div className="text-center">
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Omsætningskrav</p>
                    <p className={`${styles.stats} font-bold text-foreground`}>{casino.wageringRequirements}</p>
                  </div>
                </div>
                
                {/* Additional Stats Row */}
                <div className={`grid grid-cols-3 gap-2 bg-muted/30 rounded-lg py-2 px-2`}>
                  <div className="text-center">
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Gyldighed</p>
                    <p className={`${styles.stats} font-semibold text-foreground`}>{casino.validity}</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Min. indbetaling</p>
                    <p className={`${styles.stats} font-semibold text-foreground`}>{casino.minDeposit}</p>
                  </div>
                  <div className="text-center">
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Udbetalingstid</p>
                    <p className={`${styles.stats} font-semibold text-foreground`}>{casino.payoutTime}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Toggle Features and Review Link */}
          <div className={`flex items-center justify-between px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-3`}>
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="flex items-center gap-1 text-sm text-foreground hover:text-primary"
            >
              Vis Funktioner
              {showFeatures ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <Link
              to={`/casino/${casino.slug}`}
              className="text-sm text-primary hover:underline"
            >
              Læs Anmeldelse
            </Link>
          </div>

          {/* Expandable Features */}
          {showFeatures && (
            <div className={`flex flex-wrap gap-2 px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-3`}>
              {casino.features.map((feature, index) => {
                const colors = [
                  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
                  "bg-sky-500/20 text-sky-400 border-sky-500/30",
                  "bg-violet-500/20 text-violet-400 border-violet-500/30",
                  "bg-amber-500/20 text-amber-400 border-amber-500/30",
                ];
                return (
                  <Badge key={feature} className={`rounded-full text-xs ${colors[index % colors.length]}`}>
                    {feature}
                  </Badge>
                );
              })}
            </div>
          )}

          {/* CTA Button */}
          <div className={`px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-4`}>
            <Button asChild size={size === "large" ? "lg" : "default"} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base">
              <a href={casino.affiliateUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Gift className={`${size === "large" ? "h-5 w-5" : "h-4 w-4"}`} />
                HENT BONUS HER
              </a>
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border bg-muted/30 p-3 mt-auto">
            <p className="text-[10px] text-muted-foreground leading-relaxed text-center">
              Annoncering | 18+ | Spil ansvarligt | Selvudelukkelse via{" "}
              <a href="https://rofus.nu" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Rofus.nu
              </a>{" "}
              | Kontakt Spillemyndighedens hjælpelinje på{" "}
              <a href="https://stopspillet.dk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                StopSpillet.dk
              </a>{" "}
              – rådgivning om
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
