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

// Featured Card (Rank 1-2) - Hero style layout
function FeaturedCard({ casino, rank }: { casino: Casino; rank: number }) {
  const isTopRanked = rank === 1;

  return (
    <div className="relative group">
      {/* Subtle glow */}
      <div className={`absolute -inset-1 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 ${
        isTopRanked 
          ? "bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30" 
          : "bg-gradient-to-r from-secondary/40 via-muted/30 to-secondary/40"
      }`} />
      
      <div className={`relative overflow-hidden rounded-2xl border bg-card ${
        isTopRanked ? "border-primary/50" : "border-border"
      }`}>
        {/* Header with rank, logo, badges, and actions */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            {/* Rank Number */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
              isTopRanked 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground"
            }`}>
              {rank}
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              {casino.logoUrl ? (
                <img
                  src={casino.logoUrl}
                  alt={casino.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-xl font-bold text-foreground">
                  {casino.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and Rating */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-xl font-bold text-foreground truncate">{casino.name}</h3>
                {casino.isRecommended && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    ANBEFALET
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(casino.rating)
                        ? "fill-accent text-accent"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{casino.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <CasinoInfoDialog casino={casino} />
              {isTopRanked && (
                <div className="flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5">
                  <Flame className="h-4 w-4 text-destructive-foreground" />
                  <span className="text-xs font-bold text-destructive-foreground">HOT</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features with checkmarks */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {casino.features.slice(0, 4).map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-4 gap-4 bg-muted/50 rounded-xl p-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bonus</p>
              <p className="text-xl font-bold text-foreground">100%</p>
            </div>
            <div className="text-center border-l border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Op til</p>
              <p className="text-xl font-bold text-foreground">{casino.bonusAmount}</p>
            </div>
            <div className="text-center border-l border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Gratis Spins</p>
              <p className="text-xl font-bold text-foreground">{casino.freeSpins || '-'}</p>
            </div>
            <div className="text-center border-l border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Omsætning</p>
              <p className="text-xl font-bold text-foreground">{casino.wageringRequirements}</p>
            </div>
          </div>
        </div>

        {/* CTA Button and Review Link */}
        <div className="px-6 pb-4 flex items-center gap-4">
          <Button 
            onClick={() => getAffiliateRedirect(casino.slug)} 
            className="flex-1 rounded-full border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-bold text-base py-5 transition-all"
          >
            CLAIM BONUS
          </Button>
          <Link
            to={`/casino/${casino.slug}`}
            className="flex items-center gap-1 text-sm text-primary hover:underline whitespace-nowrap"
          >
            Læs Anmeldelse
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border bg-muted/30 px-6 py-3">
          <p className="text-[10px] text-muted-foreground text-center">
            18+ | Vilkår gælder | Spil ansvarligt | <a href="https://rofus.nu" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Rofus.nu</a>
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
