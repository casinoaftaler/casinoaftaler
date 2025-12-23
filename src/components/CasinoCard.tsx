import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronDown, ChevronUp, Flame, Trophy, Medal, Gift, Info, Check, X, Percent, Clock, Wallet, Calendar, Zap, ExternalLink, RefreshCw } from "lucide-react";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface GameProvider {
  name: string;
  logo_url: string;
}

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
  gameProviders?: GameProvider[];
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

            {/* Info Button */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto bg-card border-border">
                <DialogHeader className="sr-only">
                  <DialogTitle>{casino.name}</DialogTitle>
                </DialogHeader>
                
                {/* Feature Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="rounded bg-muted text-foreground text-xs font-medium px-2 py-1">
                    {casino.bonusType === "No-sticky" ? "NO-STICKY" : casino.bonusType.toUpperCase()}
                  </Badge>
                  {casino.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} className="rounded bg-muted text-foreground text-xs font-medium px-2 py-1">
                      {feature.toUpperCase()}
                    </Badge>
                  ))}
                </div>

                {/* Centered Logo */}
                <div className="flex justify-center mb-6">
                  {casino.logoUrl ? (
                    <img src={casino.logoUrl} alt={casino.name} className="h-20 w-auto max-w-[200px] object-contain" />
                  ) : (
                    <div className="h-20 w-20 rounded-xl bg-muted flex items-center justify-center text-2xl font-bold text-foreground">
                      {casino.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Main Stats Row */}
                <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Bonus</p>
                    <p className="text-lg font-bold text-foreground">100%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Beløb</p>
                    <p className="text-lg font-bold text-foreground">{casino.bonusAmount.replace(/[^0-9]/g, '')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Gratis Spins</p>
                    <p className="text-lg font-bold text-foreground">{casino.freeSpins || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Omsætning</p>
                    <p className="text-lg font-bold text-foreground">{casino.wageringRequirements}</p>
                  </div>
                </div>

                {/* Casino Info Section */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Casino Info</h4>
                  <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Min. indbetaling</p>
                      <p className="text-sm font-medium text-foreground">{casino.minDeposit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Udbetalingstid</p>
                      <p className="text-sm font-medium text-foreground">{casino.payoutTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Gyldighed</p>
                      <p className="text-sm font-medium text-foreground">{casino.validity}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {casino.description && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Beskrivelse</h4>
                    <p className="text-sm text-muted-foreground">{casino.description}</p>
                  </div>
                )}

                {/* Pros & Cons */}
                {(casino.pros.length > 0 || casino.cons.length > 0) && (
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    {casino.pros.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Fordele</h4>
                        <ul className="space-y-1">
                          {casino.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-1.5 text-xs">
                              <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {casino.cons.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Ulemper</h4>
                        <ul className="space-y-1">
                          {casino.cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-1.5 text-xs">
                              <X className="h-3.5 w-3.5 text-destructive flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                {casino.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Funktioner</h4>
                    <div className="flex flex-wrap gap-2">
                      {casino.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs text-muted-foreground">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Game Providers */}
                {casino.gameProviders && casino.gameProviders.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Spiludbydere</h4>
                    <div className="flex flex-wrap gap-3 items-center">
                      {casino.gameProviders.map((provider, index) => (
                        <div key={index} className="flex flex-col items-center">
                          {provider.logo_url ? (
                            <img 
                              src={provider.logo_url} 
                              alt={provider.name} 
                              className="h-8 w-auto max-w-[80px] object-contain"
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground">{provider.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  onClick={() => getAffiliateRedirect(casino.slug)} 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-full py-3"
                >
                  HENT BONUS
                </Button>

                {/* Disclaimer */}
                <p className="text-[10px] text-center text-muted-foreground mt-3">
                  18+, NYE KUNDER KUN, VILKÅR GÆLDER
                </p>
              </DialogContent>
            </Dialog>

            {/* Extra Hot Badge - Only for #1 ranked */}
            {rank === 1 && (
              <div className="flex flex-col items-center rounded bg-destructive px-2 py-1">
                <Flame className={`${size === "large" ? "h-5 w-5" : "h-4 w-4"} text-destructive-foreground`} />
                <span className={`${size === "large" ? "text-xs" : "text-[10px]"} font-bold leading-tight text-destructive-foreground`}>EXTRA</span>
                <span className={`${size === "large" ? "text-xs" : "text-[10px]"} font-bold leading-tight text-destructive-foreground`}>HOT</span>
              </div>
            )}
          </div>

          {/* Feature Badges */}
          <div className={`flex flex-wrap gap-2 px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-3`}>
            <Badge className={`rounded-md bg-muted text-foreground border-border ${styles.badge}`}>
              {casino.bonusType === "No-sticky" ? "NO-STICKY BONUS" : casino.bonusType.toUpperCase()}
            </Badge>
            {casino.features.slice(0, size === "large" ? 4 : 2).map((feature) => (
              <Badge key={feature} className={`rounded-md bg-muted text-foreground border-border ${styles.badge}`}>
                {feature.toUpperCase()}
              </Badge>
            ))}
          </div>

          {/* Stats Section */}
          <div className={`px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-2 flex-1`}>
            {/* Prominent Bonus Amount */}
            <div className="text-center mb-3">
              <p className={`${styles.statsLabel} text-muted-foreground mb-1`}>Op til</p>
              <p className={`${styles.bonus} font-bold text-gray-900 dark:text-white`}>{casino.bonusAmount}</p>
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
                    <Percent className="h-3.5 w-3.5 mx-auto mb-1 text-primary" />
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Procent</p>
                    <p className={`${styles.stats} font-bold text-foreground`}>100%</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <Zap className="h-3.5 w-3.5 mx-auto mb-1 text-amber-500" />
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Gratis spins</p>
                    <p className={`${styles.stats} font-bold text-foreground`}>{casino.freeSpins}</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="h-3.5 w-3.5 mx-auto mb-1 text-sky-500" />
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Omsætningskrav</p>
                    <p className={`${styles.stats} font-bold text-foreground`}>{casino.wageringRequirements}</p>
                  </div>
                </div>
                
                {/* Additional Stats Row */}
                <div className={`grid grid-cols-3 gap-2 bg-muted/30 rounded-lg py-2 px-2`}>
                  <div className="text-center">
                    <Calendar className="h-3.5 w-3.5 mx-auto mb-1 text-violet-500" />
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Gyldighed</p>
                    <p className={`${styles.stats} font-semibold text-foreground`}>{casino.validity}</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <Wallet className="h-3.5 w-3.5 mx-auto mb-1 text-emerald-500" />
                    <p className={`${styles.statsLabel} text-muted-foreground mb-0.5`}>Min. indbetaling</p>
                    <p className={`${styles.stats} font-semibold text-foreground`}>{casino.minDeposit}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-3.5 w-3.5 mx-auto mb-1 text-orange-500" />
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
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Læs Anmeldelse
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          {/* Expandable Features */}
          {showFeatures && (
            <div className={`flex flex-wrap gap-2 px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-3`}>
              {casino.features.map((feature) => (
                <Badge key={feature} className="rounded-full text-xs bg-primary/20 text-primary border-primary/30">
                  {feature}
                </Badge>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className={`px-${size === "large" ? "6" : size === "medium" ? "5" : "4"} pb-4`}>
            <Button 
              onClick={() => getAffiliateRedirect(casino.slug)} 
              size={size === "large" ? "lg" : "default"} 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base flex items-center justify-center gap-2"
            >
              <Gift className={`${size === "large" ? "h-5 w-5" : "h-4 w-4"}`} />
              HENT BONUS HER
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
