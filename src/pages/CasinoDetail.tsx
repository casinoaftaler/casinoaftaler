import { useParams, Link } from "react-router-dom";
import { Star, Clock, Gift, CreditCard, Timer, Check, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { casinos } from "@/data/casinos";

const CasinoDetail = () => {
  const { slug } = useParams();
  const casino = casinos.find((c) => c.slug === slug);

  if (!casino) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Casino Not Found</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
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
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Casinos
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
                              i < Math.floor(casino.rating)
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
                        casino.bonusType === "No-sticky" ? "default" : "secondary"
                      }
                    >
                      {casino.bonusType}
                    </Badge>
                  </div>
                </div>

                <div className="mb-8 rounded-lg bg-primary/10 p-6">
                  <p className="mb-2 text-lg font-medium">{casino.bonusTitle}</p>
                  <p className="text-3xl font-bold text-primary">
                    {casino.bonusAmount}
                  </p>
                </div>

                <h2 className="mb-4 text-xl font-semibold">About {casino.name}</h2>
                <p className="mb-6 text-muted-foreground">{casino.description}</p>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Check className="h-5 w-5 text-primary" /> Pros
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {casino.pros.map((pro) => (
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
                        <X className="h-5 w-5 text-destructive" /> Cons
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {casino.cons.map((con) => (
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
                <CardTitle>Bonus Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Wagering</span>
                  </div>
                  <span className="font-medium">{casino.wageringRequirements}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Validity</span>
                  </div>
                  <span className="font-medium">{casino.validity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Min. Deposit</span>
                  </div>
                  <span className="font-medium">{casino.minDeposit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Payout Time</span>
                  </div>
                  <span className="font-medium">{casino.payoutTime}</span>
                </div>

                <Button size="lg" className="w-full">
                  Get Bonus Now
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  * Terms and conditions apply. 18+
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {casino.features.map((feature) => (
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
