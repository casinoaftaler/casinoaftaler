import { useShopItems } from "@/hooks/useShopItems";
import { ShopItemCard } from "@/components/ShopItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Coins, LogIn, Loader2 } from "lucide-react";
import { useStreamElementsPoints } from "@/hooks/useStreamElementsPoints";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const description = "Her kan du shoppe eksklusive varer, men der er en lille twist – alt her kan kun købes med point, som du optjener ved at se vores streams på Twitch! Det betyder, at jo mere du ser, desto flere point tjener du, og desto flere fede produkter kan du få fat i. Så det er bare at sætte dig godt til rette, nyde vores streams, og se pointene rulle ind. Gå på opdagelse i vores udvalg og start din rejse mod de unikke præmier i dag!";

function ShopHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
        }}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[hsl(210_80%_60%)] blur-xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[hsl(260_70%_60%)] blur-xl" />
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/10 p-4">
              <ShoppingBag className="h-12 w-12" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Butik</h1>
          <p className="text-base text-white/80">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

function PointsDisplay() {
  const { points, isLoading, isConfigured, isLoggedIn, hasTwitchUsername } = useStreamElementsPoints();
  const { isAdmin } = useAuth();

  // Don't show anything if user is admin
  if (isAdmin) {
    return null;
  }

  // If points system isn't configured yet, still show a friendly info box for users
  if (!isConfigured) {
    return (
      <div className="container py-8">
        <Card className="mx-auto max-w-2xl border-muted bg-muted/50">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:text-left">
            <div className="rounded-full bg-muted p-3">
              <Coins className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Point er på vej</h3>
              <p className="text-sm text-muted-foreground">
                Points-systemet er ikke sat op endnu. Når det er klar, kan du logge ind og se dine point her.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login prompt if not logged in
  if (!isLoggedIn) {
    return (
      <div className="container py-8">
        <Card className="mx-auto max-w-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 shadow-lg">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <div className="rounded-full bg-primary/20 p-3">
                <Coins className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Se dine point</h3>
                <p className="text-sm text-muted-foreground">
                  Log ind med Twitch for at se hvor mange point du har optjent
                </p>
              </div>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/auth">
                <LogIn className="mr-2 h-5 w-5" />
                Log ind med Twitch
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show message if logged in but no Twitch username
  if (!hasTwitchUsername) {
    return (
      <div className="container py-6">
        <Card className="mx-auto max-w-md border-muted bg-muted/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full bg-muted p-2">
              <Coins className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Log ind med Twitch for at se dine point
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container py-6">
        <Card className="mx-auto max-w-md border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Henter dine point...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show points
  return (
    <div className="container py-6">
      <Card className="mx-auto max-w-md border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 p-2">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold">
                {points?.toLocaleString("da-DK") ?? 0} point
              </p>
              <p className="text-xs text-muted-foreground">
                Se streams for at optjene flere!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Shop() {
  const { data: items, isLoading, error } = useShopItems(false);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <ShopHero />
        <PointsDisplay />
        <div className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <ShopHero />
        <PointsDisplay />
        <div className="py-16">
          <div className="container">
            <p className="text-destructive">Der opstod en fejl ved indlæsning af produkter.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ShopHero />
      <PointsDisplay />
      <div className="py-16">
        <div className="container">
          {items && items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ShopItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <ShoppingBag className="h-16 w-16 mb-4" />
              <p className="text-lg">Der er ingen produkter i butikken endnu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
