import { useParams, Link } from "react-router-dom";
import { Star, Clock, Gift, CreditCard, Timer, Check, X, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCasinos } from "@/hooks/useCasinos";

const CasinoDetail = () => {
  const { slug } = useParams();
  const { data: casinos, isLoading } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!casino) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Casino Ikke Fundet</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Tilbage til Forsiden
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Tilbage til Alle Casinoer
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex flex-wrap items-start gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-muted text-3xl font-bold text-primary">
                    {casino.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h1 className="mb-2 text-3xl font-bold">{casino.name}</h1>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(Number(casino.rating))
                                ? "fill-primary text-primary"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-medium">
                        {casino.rating}/5
                      </span>
                    </div>
                    <Badge
                      variant={
                        casino.bonus_type === "No-sticky" ? "default" : "secondary"
                      }
                    >
                      {casino.bonus_type === "No-sticky" ? "Ikke-klæbende" : casino.bonus_type}
                    </Badge>
                  </div>
                </div>

                <div className="mb-8 rounded-lg bg-primary/10 p-6">
                  <p className="mb-2 text-lg font-medium">{casino.bonus_title}</p>
                  <p className="text-3xl font-bold text-primary">
                    {casino.bonus_amount}
                  </p>
                </div>

                <h2 className="mb-4 text-xl font-semibold">Om {casino.name}</h2>
                <p className="mb-6 text-muted-foreground">{casino.description}</p>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Check className="h-5 w-5 text-primary" /> Fordele
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {casino.pros?.map((pro) => (
                          <li key={pro} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <X className="h-5 w-5 text-destructive" /> Ulemper
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {casino.cons?.map((con) => (
                          <li key={con} className="flex items-center gap-2">
                            <X className="h-4 w-4 text-destructive" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bonusdetaljer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Gennemspil</span>
                  </div>
                  <span className="font-medium">{casino.wagering_requirements}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Gyldighed</span>
                  </div>
                  <span className="font-medium">{casino.validity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Min. Indbetaling</span>
                  </div>
                  <span className="font-medium">{casino.min_deposit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Udbetalingstid</span>
                  </div>
                  <span className="font-medium">{casino.payout_time}</span>
                </div>

                <Button size="lg" className="w-full">
                  Få Bonus Nu
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  * Vilkår og betingelser gælder. 18+
                </p>
              </CardContent>
            </Card>

            {casino.game_providers && casino.game_providers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Spiludbydere</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 items-center">
                    {casino.game_providers.map((provider: { name: string; logo_url: string }, index: number) => (
                      <div key={index} className="flex flex-col items-center">
                        {provider.logo_url ? (
                          <img 
                            src={provider.logo_url} 
                            alt={provider.name} 
                            className="h-10 w-auto max-w-[100px] object-contain"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{provider.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Funktioner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {casino.features?.map((feature) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoDetail;
