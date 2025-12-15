import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronDown, ChevronUp, Flame } from "lucide-react";
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
}

export function CasinoCard({ casino }: CasinoCardProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <Card className="overflow-hidden border-border bg-card rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="flex items-start gap-4 p-4 pb-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              {casino.logoUrl ? (
                <img
                  src={casino.logoUrl}
                  alt={casino.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-lg font-bold text-foreground">
                  {casino.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and Rating */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-foreground">{casino.name}</h3>
                {casino.isRecommended && (
                  <Badge className="bg-destructive text-destructive-foreground text-xs">
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
              </div>
            </div>

            {/* Extra Hot Badge */}
            {casino.isRecommended && (
              <div className="flex flex-col items-center rounded bg-destructive px-2 py-1">
                <Flame className="h-4 w-4 text-destructive-foreground" />
                <span className="text-[10px] font-bold leading-tight text-destructive-foreground">EXTRA</span>
                <span className="text-[10px] font-bold leading-tight text-destructive-foreground">HOT</span>
              </div>
            )}
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            <Badge variant="secondary" className="rounded-md bg-secondary/80 text-xs">
              {casino.bonusType === "No-sticky" ? "NO-STICKY BONUS" : casino.bonusType.toUpperCase()}
            </Badge>
            {casino.features.slice(0, 2).map((feature) => (
              <Badge key={feature} variant="secondary" className="rounded-md bg-secondary/80 text-xs">
                {feature.toUpperCase()}
              </Badge>
            ))}
          </div>

          {/* Stats Section */}
          <div className="px-4 pb-4">
            {/* Prominent Bonus Amount */}
            <div className="text-center mb-3">
              <p className="text-xs text-muted-foreground mb-1">Op til</p>
              <p className="text-3xl font-bold text-amber-500">{casino.bonusAmount}</p>
            </div>
            
            {/* Secondary Stats Row */}
            <div className="flex justify-center gap-4 bg-muted/50 rounded-lg py-3 px-2">
              <div className="text-center flex-1">
                <p className="text-[10px] text-muted-foreground mb-0.5">Procent</p>
                <p className="text-sm font-bold text-foreground">100%</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center flex-1">
                <p className="text-[10px] text-muted-foreground mb-0.5">Gratis spins</p>
                <p className="text-sm font-bold text-foreground">{casino.freeSpins}</p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center flex-1">
                <p className="text-[10px] text-muted-foreground mb-0.5">Omsætningskrav</p>
                <p className="text-sm font-bold text-foreground">{casino.wageringRequirements}</p>
              </div>
            </div>
          </div>

          {/* Toggle Features and Review Link */}
          <div className="flex items-center justify-between px-4 pb-3">
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
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {casino.features.map((feature) => (
                <Badge key={feature} variant="outline" className="rounded-full text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="px-4 pb-4">
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base">
              <a href={casino.affiliateUrl || "#"} target="_blank" rel="noopener noreferrer">
                FÅ BONUS
              </a>
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border bg-muted/30 p-3">
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
  );
}
