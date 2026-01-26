import { Link } from "react-router-dom";
import { Star, Flame, Info, Check, ExternalLink } from "lucide-react";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// Info Dialog Component (shared between both card types)
function CasinoInfoDialog({ casino }: { casino: Casino }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-colors">
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
            <p className="text-lg font-bold text-foreground">{casino.bonusAmount}</p>
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
                      <span className="h-3.5 w-3.5 text-destructive flex-shrink-0 mt-0.5">✕</span>
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
  );
}

// Featured Card (Rank 1-5) - Roshtein-style grid cards
function FeaturedCard({ casino, rank }: { casino: Casino; rank: number }) {
  const isTopRow = rank <= 2;
  const isTopRanked = rank === 1;

  // Extract bonus percentage from bonusTitle or use default
  const bonusPercentage = casino.bonusTitle?.match(/(\d+)%/)?.[1] || "100";

  return (
    <div className={`relative group h-full ${isTopRow ? "col-span-1" : ""}`}>
      {/* Subtle glow for #1 ranked card */}
      {isTopRanked && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/40 via-orange-400/30 to-yellow-500/40 blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      )}
      
      {/* Card with dark gradient background */}
      <div className={`relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--card))] via-[hsl(var(--muted))] to-[hsl(var(--card))] border ${isTopRanked ? "border-amber-500/50" : "border-border"}`}>
        {/* Top right badges */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {isTopRanked && (
            <div className="flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5">
              <Flame className="h-4 w-4 text-destructive-foreground" />
              <span className="text-xs font-bold text-destructive-foreground">HOT</span>
            </div>
          )}
          <CasinoInfoDialog casino={casino} />
        </div>

        {/* Content */}
        <div className="flex flex-col h-full p-5 pt-8">
          {/* Centered Logo */}
          <div className="flex justify-center mb-4">
            {casino.logoUrl ? (
              <img
                src={casino.logoUrl}
                alt={casino.name}
                className={`object-contain ${isTopRow ? "h-16 max-w-[180px]" : "h-12 max-w-[140px]"}`}
              />
            ) : (
              <div className={`flex items-center justify-center rounded-xl bg-muted font-bold text-foreground ${
                isTopRow ? "h-16 w-32 text-xl" : "h-12 w-24 text-lg"
              }`}>
                {casino.name}
              </div>
            )}
          </div>

          {/* Features with green checkmarks */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4">
            {casino.features.slice(0, 3).map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats Box */}
          <div className="bg-background/60 rounded-xl p-3 mb-4 border border-border/50">
            <div className={`grid ${isTopRow ? "grid-cols-3" : "grid-cols-3"} gap-2 text-center`}>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  {bonusPercentage}% UP TO
                </p>
                <p className={`font-bold text-foreground ${isTopRow ? "text-lg" : "text-base"}`}>
                  {casino.bonusAmount}
                </p>
              </div>
              <div className="border-l border-border/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  FREE SPINS
                </p>
                <p className={`font-bold text-foreground ${isTopRow ? "text-lg" : "text-base"}`}>
                  {casino.freeSpins || '-'}
                </p>
              </div>
              <div className="border-l border-border/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  -
                </p>
                <p className={`font-bold text-foreground ${isTopRow ? "text-lg" : "text-base"}`}>
                  -
                </p>
              </div>
            </div>
          </div>

          {/* Spacer to push CTA to bottom */}
          <div className="flex-1" />

          {/* CTA Button */}
          <Button 
            onClick={() => getAffiliateRedirect(casino.slug)} 
            className={`w-full rounded-full border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background font-bold transition-all ${
              isTopRow ? "py-5 text-base" : "py-4 text-sm"
            }`}
          >
            CLAIM BONUS
          </Button>

          {/* Disclaimer */}
          <p className="text-[10px] text-muted-foreground text-center mt-3">
            18+ | T&C APPLY
          </p>
        </div>
      </div>
    </div>
  );
}

// Regular Card (Rank 3+) - Horizontal row layout
function RegularCard({ casino, rank }: { casino: Casino; rank?: number }) {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
        {/* Main Content Row */}
        <div className="flex items-center gap-4 p-4">
          {/* Rank Badge */}
          {rank && (
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold text-sm">
              {rank}
            </div>
          )}

          {/* Logo */}
          <div className="flex-shrink-0">
            {casino.logoUrl ? (
              <img
                src={casino.logoUrl}
                alt={casino.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground">
                {casino.name.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name and Rating */}
          <div className="min-w-0 w-32 lg:w-40">
            <h3 className="font-semibold text-foreground truncate text-sm">{casino.name}</h3>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(casino.rating)
                      ? "fill-accent text-accent"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats Columns - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            <div className="text-center min-w-[60px]">
              <p className="text-[10px] text-muted-foreground uppercase">Bonus</p>
              <p className="text-sm font-bold text-foreground">100%</p>
            </div>
            <div className="text-center min-w-[80px]">
              <p className="text-[10px] text-muted-foreground uppercase">Op til</p>
              <p className="text-sm font-bold text-foreground">{casino.bonusAmount}</p>
            </div>
            <div className="text-center min-w-[60px]">
              <p className="text-[10px] text-muted-foreground uppercase">Spins</p>
              <p className="text-sm font-bold text-foreground">{casino.freeSpins || '-'}</p>
            </div>
          </div>

          {/* Features with checkmarks - Hidden on mobile */}
          <div className="hidden lg:flex flex-col gap-0.5 min-w-[140px]">
            {casino.features.slice(0, 3).map((feature) => (
              <div key={feature} className="flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                <span className="text-xs text-muted-foreground truncate">{feature}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Button 
              onClick={() => getAffiliateRedirect(casino.slug)} 
              size="sm"
              className="rounded-full border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-xs px-4 transition-all"
            >
              CLAIM BONUS
            </Button>
            <CasinoInfoDialog casino={casino} />
          </div>
        </div>

        {/* Mobile Stats Row */}
        <div className="md:hidden border-t border-border px-4 py-2">
          <div className="flex justify-between text-center">
            <div>
              <p className="text-[10px] text-muted-foreground">Bonus</p>
              <p className="text-xs font-bold text-foreground">100%</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Op til</p>
              <p className="text-xs font-bold text-foreground">{casino.bonusAmount}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Spins</p>
              <p className="text-xs font-bold text-foreground">{casino.freeSpins || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Omsætning</p>
              <p className="text-xs font-bold text-foreground">{casino.wageringRequirements}</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border bg-muted/20 px-4 py-2">
          <p className="text-[9px] text-muted-foreground text-center">
            18+ | Vilkår gælder | <a href="https://rofus.nu" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Rofus.nu</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main CasinoCard component that decides which variant to render
export function CasinoCard({ casino, rank, size = "small" }: CasinoCardProps) {
  // Featured cards for rank 1-5, regular for others
  const isFeatured = rank && rank <= 5;

  if (isFeatured) {
    return <FeaturedCard casino={casino} rank={rank} />;
  }

  return <RegularCard casino={casino} rank={rank} />;
}
