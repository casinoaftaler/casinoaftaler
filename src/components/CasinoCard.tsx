import { useState } from "react";
import { Star, Flame, Check, ChevronDown } from "lucide-react";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  /** Controlled mode (optional): parent decides which card is open */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Collapsible Info Content Component
function CasinoInfoContent({ casino, variant }: { casino: Casino; variant: "featured" | "regular" }) {
  const bgClass = variant === "featured" 
    ? "bg-black/40 rounded-xl p-4 mt-4 border border-white/10" 
    : "border-t border-border px-4 py-4 bg-muted/30";

  return (
    <div className={bgClass}>
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

      {/* Main Stats Row */}
      <div className="grid grid-cols-4 gap-2 mb-4 text-center">
        <div>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>Bonus</p>
          <p className={`text-lg font-bold ${variant === "featured" ? "text-white" : "text-foreground"}`}>100%</p>
        </div>
        <div>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>Beløb</p>
          <p className={`text-lg font-bold ${variant === "featured" ? "text-white" : "text-foreground"}`}>{casino.bonusAmount}</p>
        </div>
        <div>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>Gratis Spins</p>
          <p className={`text-lg font-bold ${variant === "featured" ? "text-white" : "text-foreground"}`}>{casino.freeSpins || 'N/A'}</p>
        </div>
        <div>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>Omsætning</p>
          <p className={`text-lg font-bold ${variant === "featured" ? "text-white" : "text-foreground"}`}>{casino.wageringRequirements}</p>
        </div>
      </div>

      {/* Casino Info Section */}
      <div className="mb-4">
        <h4 className={`text-sm font-bold mb-3 uppercase tracking-wide ${variant === "featured" ? "text-white" : "text-foreground"}`}>Casino Info</h4>
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
          <div>
            <p className={`text-xs mb-0.5 ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>Min. indbetaling</p>
            <p className={`text-sm font-medium ${variant === "featured" ? "text-white" : "text-foreground"}`}>{casino.minDeposit}</p>
          </div>
          <div>
            <p className={`text-xs mb-0.5 ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>Udbetalingstid</p>
            <p className={`text-sm font-medium ${variant === "featured" ? "text-white" : "text-foreground"}`}>{casino.payoutTime}</p>
          </div>
          <div>
            <p className={`text-xs mb-0.5 ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>Gyldighed</p>
            <p className={`text-sm font-medium ${variant === "featured" ? "text-white" : "text-foreground"}`}>{casino.validity}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      {casino.description && (
        <div className="mb-4">
          <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${variant === "featured" ? "text-white" : "text-foreground"}`}>Beskrivelse</h4>
          <p className={`text-sm ${variant === "featured" ? "text-white/80" : "text-muted-foreground"}`}>{casino.description}</p>
        </div>
      )}

      {/* Pros & Cons */}
      {(casino.pros.length > 0 || casino.cons.length > 0) && (
        <div className="mb-4 grid grid-cols-2 gap-4">
          {casino.pros.length > 0 && (
            <div>
              <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${variant === "featured" ? "text-white" : "text-foreground"}`}>Fordele</h4>
              <ul className="space-y-1">
                {casino.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-1.5 text-xs">
                    <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className={variant === "featured" ? "text-white/80" : "text-muted-foreground"}>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {casino.cons.length > 0 && (
            <div>
              <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${variant === "featured" ? "text-white" : "text-foreground"}`}>Ulemper</h4>
              <ul className="space-y-1">
                {casino.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-1.5 text-xs">
                    <span className="h-3.5 w-3.5 text-destructive flex-shrink-0 mt-0.5">✕</span>
                    <span className={variant === "featured" ? "text-white/80" : "text-muted-foreground"}>{con}</span>
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
          <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${variant === "featured" ? "text-white" : "text-foreground"}`}>Funktioner</h4>
          <div className="flex flex-wrap gap-2">
            {casino.features.map((feature) => (
              <Badge key={feature} variant="outline" className={`text-xs ${variant === "featured" ? "text-white/80 border-white/30" : "text-muted-foreground"}`}>
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Game Providers */}
      {casino.gameProviders && casino.gameProviders.length > 0 && (
        <div>
          <h4 className={`text-sm font-bold mb-3 uppercase tracking-wide ${variant === "featured" ? "text-white" : "text-foreground"}`}>Spiludbydere</h4>
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
                  <span className={`text-xs ${variant === "featured" ? "text-white/70" : "text-muted-foreground"}`}>{provider.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Featured Card (Rank 1-5) - Roshtein-style grid cards
function FeaturedCard({
  casino,
  rank,
  open,
  onOpenChange,
}: {
  casino: Casino;
  rank: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : uncontrolledOpen;
  const setIsOpen = (next: boolean) => {
    if (isControlled) onOpenChange?.(next);
    else setUncontrolledOpen(next);
  };
  const isTopRow = rank <= 2;
  const isTopRanked = rank === 1;

  // Extract bonus percentage from bonusTitle or use default
  const bonusPercentage = casino.bonusTitle?.match(/(\d+)%/)?.[1] || "100";

  // Unified site-themed gradient for all featured cards (darker version)
  const gradientClass = "bg-gradient-to-br from-primary via-accent/80 to-primary dark:from-primary/95 dark:via-accent/60 dark:to-primary/95";

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={`relative group ${isTopRow ? "col-span-1" : ""}`}>
        {/* Subtle glow for #1 ranked card */}
        {isTopRanked && (
          <div 
            className="absolute -inset-1 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40"
          />
        )}
        
        {/* Card with unified site-themed gradient background */}
        <div 
          className={`relative overflow-hidden rounded-2xl ${gradientClass} border ${isTopRanked ? "border-white/30" : "border-white/10"}`}
        >
          {/* Top right badges */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {casino.isRecommended && (
              <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold px-2 py-1">
                Anbefalet
              </Badge>
            )}
            {isTopRanked && (
              <div className="flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5">
                <Flame className="h-4 w-4 text-destructive-foreground" />
                <span className="text-xs font-bold text-destructive-foreground">HOT</span>
              </div>
            )}
          </div>

          {/* Header with Logo, Name, and Rating */}
          <div className="flex items-center gap-4 p-4 pb-0">
            {/* Logo */}
            <div className="flex-shrink-0">
              {casino.logoUrl ? (
                <img
                  src={casino.logoUrl}
                  alt={casino.name}
                  className={`object-cover rounded-xl border-2 border-white/30 shadow-lg ${
                    isTopRow ? "h-24 w-24" : "h-20 w-20"
                  }`}
                />
              ) : (
                <div className={`flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm font-bold text-white border-2 border-white/30 ${
                  isTopRow ? "h-24 w-24 text-2xl" : "h-20 w-20 text-xl"
                }`}>
                  {casino.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and Rating */}
            <div className="flex flex-col gap-1">
              <h3 className={`font-bold text-white ${isTopRow ? "text-xl" : "text-lg"}`}>
                {casino.name}
              </h3>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`${isTopRow ? "h-4 w-4" : "h-3.5 w-3.5"} ${
                      i < Math.floor(casino.rating)
                        ? "fill-accent text-accent"
                        : "fill-white/20 text-white/20"
                    }`}
                  />
                ))}
                <span className="text-sm text-white/80 ml-1 font-medium">{casino.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col p-5 pt-4">

            {/* Features with green checkmarks */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3">
              {casino.features.slice(0, 3).map((feature) => (
                <div key={feature} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white">{feature}</span>
                </div>
              ))}
            </div>

            {/* Prominent Bonus Headline */}
            <p className={`text-center font-bold text-white mb-3 ${isTopRow ? "text-xl" : "text-lg"}`}>
              {casino.bonusTitle || `${bonusPercentage}% op til ${casino.bonusAmount}`}
            </p>

            {/* Stats Box */}
            <div className="bg-black/40 rounded-xl p-3 mb-4 border border-white/10">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-white/70 uppercase tracking-wider mb-0.5">
                    GRATIS SPINS
                  </p>
                  <p className={`font-bold text-white ${isTopRow ? "text-lg" : "text-base"}`}>
                    {casino.freeSpins || '-'}
                  </p>
                </div>
                <div className="border-l border-white/20">
                  <p className="text-[10px] text-white/70 uppercase tracking-wider mb-0.5">
                    OMSÆTNING
                  </p>
                  <p className={`font-bold text-white ${isTopRow ? "text-lg" : "text-base"}`}>
                    {casino.wageringRequirements}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              onClick={() => getAffiliateRedirect(casino.slug)} 
              className={`mt-auto w-full rounded-full border-2 border-white bg-white/10 text-white hover:bg-white hover:text-gray-900 font-bold transition-all ${
                isTopRow ? "py-5 text-base" : "py-4 text-sm"
              }`}
            >
              HENT BONUS
            </Button>

            {/* Read More Toggle */}
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-center gap-1 text-sm text-white/80 hover:text-white mt-3 transition-colors">
                {isOpen ? "Vis mindre" : "Læs mere"}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </CollapsibleTrigger>

            {/* Disclaimer */}
            <p className="text-[10px] text-white/60 text-center mt-2">
              18+ | Vilkår gælder | Spil ansvarligt | <a href="https://rofus.nu" className="hover:underline" target="_blank" rel="noopener noreferrer">Rofus.nu</a>
            </p>

            {/* Collapsible Content */}
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <CasinoInfoContent casino={casino} variant="featured" />
            </CollapsibleContent>
          </div>
        </div>
      </div>
    </Collapsible>
  );
}

// Regular Card (Rank 3+) - Horizontal row layout
function RegularCard({
  casino,
  rank,
  open,
  onOpenChange,
}: {
  casino: Casino;
  rank?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : uncontrolledOpen;
  const setIsOpen = (next: boolean) => {
    if (isControlled) onOpenChange?.(next);
    else setUncontrolledOpen(next);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative group">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
          {/* Recommended Badge */}
          {casino.isRecommended && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold px-2 py-1">
                Anbefalet
              </Badge>
            </div>
          )}
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
                  className="h-24 w-24 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-muted text-xl font-bold text-foreground">
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
                HENT BONUS
              </Button>
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                  {isOpen ? "Vis mindre" : "Læs mere"}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </CollapsibleTrigger>
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

          {/* Collapsible Content */}
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <CasinoInfoContent casino={casino} variant="regular" />
          </CollapsibleContent>

          {/* Disclaimer */}
          <div className="border-t border-border bg-muted/20 px-4 py-2">
            <p className="text-[9px] text-muted-foreground text-center">
              18+ | Vilkår gælder | <a href="https://rofus.nu" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Rofus.nu</a>
            </p>
          </div>
        </div>
      </div>
    </Collapsible>
  );
}

// Main CasinoCard component that decides which variant to render
export function CasinoCard({
  casino,
  rank,
  size = "small",
  open,
  onOpenChange,
}: CasinoCardProps) {
  // Featured cards for rank 1-5, regular for others
  const isFeatured = rank && rank <= 5;

  if (isFeatured) {
    return (
      <FeaturedCard
        casino={casino}
        rank={rank}
        open={open}
        onOpenChange={onOpenChange}
      />
    );
  }

  return (
    <RegularCard casino={casino} rank={rank} open={open} onOpenChange={onOpenChange} />
  );
}
