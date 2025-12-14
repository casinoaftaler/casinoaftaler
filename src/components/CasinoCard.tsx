import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
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
  return (
    <Card className="overflow-hidden border-border">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Top Badges */}
          <div className="flex items-center justify-center gap-2 p-4 pb-0">
            {casino.isRecommended && (
              <Badge variant="secondary" className="rounded-full px-4 py-1">
                Annonceret
              </Badge>
            )}
            <Badge variant="secondary" className="rounded-full px-4 py-1">
              {casino.bonusType === "No-sticky" ? "No-sticky" : casino.bonusType}
            </Badge>
          </div>

          {/* Logo and Name Section */}
          <div className="flex items-center gap-4 p-6 pb-4">
            <div className="flex-shrink-0">
              {casino.logoUrl ? (
                <img
                  src={casino.logoUrl}
                  alt={casino.name}
                  className="h-16 w-24 rounded-lg border border-primary/50 object-cover"
                />
              ) : (
                <div className="flex h-16 w-24 items-center justify-center rounded-lg border border-primary/50 bg-card text-lg font-bold text-primary">
                  {casino.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{casino.name}</h3>
              <div className="mt-1 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(casino.rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">{casino.rating.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Bonus Amount */}
          <div className="px-6 pb-2 text-center">
            <p className="text-2xl font-bold text-accent">{casino.bonusAmount}</p>
          </div>

          {/* Bonus Type Badge */}
          <div className="flex justify-center pb-4">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 rounded-full px-4 py-1">
              {casino.bonusType === "No-sticky" ? "No-sticky bonus" : `${casino.bonusType} bonus`}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="mx-6 mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Omsætningskrav</span>
              <span className="font-medium text-foreground">{casino.wageringRequirements}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max indsats</span>
              <span className="font-medium text-foreground">{casino.minDeposit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gyldighed</span>
              <span className="font-medium text-foreground">{casino.validity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Udbetalingstid</span>
              <span className="flex items-center gap-1 font-medium text-foreground">
                <Clock className="h-3 w-3" />
                {casino.payoutTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Min. indskud</span>
              <span className="font-medium text-foreground">{casino.minDeposit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bonus type</span>
              <span className="font-medium text-foreground">{casino.bonusType === "No-sticky" ? "No-sticky" : casino.bonusType}</span>
            </div>
          </div>

          {/* Features */}
          <div className="mx-6 mb-4 flex flex-wrap gap-2">
            {casino.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="rounded-full text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 p-6 pt-0">
            <Button asChild size="lg" className="w-full">
              <a href={casino.affiliateUrl || "#"} target="_blank" rel="noopener noreferrer">
                Hent bonus
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link to={`/casino/${casino.slug}`}>Læs anmeldelse</Link>
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Min. +18 år • Hjælpelinje:{" "}
              <a href="https://stopspillet.dk" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                Stopspillet.dk
              </a>{" "}
              • Selvudelukkelse:{" "}
              <a href="https://rofus.nu" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                ROFUS.nu
              </a>{" "}
              • Reklame • Betingelser og vilkår gælder.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
