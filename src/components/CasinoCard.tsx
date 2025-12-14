import { Link } from "react-router-dom";
import { Star, Clock, Gift, CreditCard, Timer } from "lucide-react";
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

export function CasinoCard({ casino, rank }: CasinoCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Logo Section */}
          <div className="flex items-center justify-center bg-muted p-6 lg:w-48">
            <div className="relative">
              {rank && (
                <div className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  #{rank}
                </div>
              )}
              {casino.logoUrl ? (
                <img
                  src={casino.logoUrl}
                  alt={casino.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-card text-2xl font-bold text-primary">
                  {casino.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{casino.name}</h3>
                  {casino.isRecommended && (
                    <Badge className="bg-destructive text-destructive-foreground">Anbefalet</Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(casino.rating)
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{casino.rating}/5</span>
                </div>
              </div>
              <Badge
                variant={casino.bonusType === "No-sticky" ? "default" : "secondary"}
              >
                {casino.bonusType === "No-sticky" ? "Ikke-klæbende" : casino.bonusType}
              </Badge>
            </div>

            <div className="mb-4 rounded-lg bg-primary/10 p-4">
              <p className="text-sm text-muted-foreground">{casino.bonusTitle}</p>
              <p className="text-2xl font-bold text-primary">{casino.bonusAmount}</p>
            </div>

            {/* Details Grid */}
            <div className="mb-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Gennemspil</p>
                  <p className="font-medium">{casino.wageringRequirements}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Gyldighed</p>
                  <p className="font-medium">{casino.validity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Min. Indbetaling</p>
                  <p className="font-medium">{casino.minDeposit}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Udbetalingstid</p>
                  <p className="font-medium">{casino.payoutTime}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4 flex flex-wrap gap-2">
              {casino.features.map((feature) => (
                <Badge key={feature} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={casino.affiliateUrl || "#"} target="_blank" rel="noopener noreferrer">
                  Få Bonus
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to={`/casino/${casino.slug}`}>Læs Anmeldelse</Link>
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              * Vilkår og betingelser gælder. Kun nye kunder. 18+. Spil venligst
              ansvarligt.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
