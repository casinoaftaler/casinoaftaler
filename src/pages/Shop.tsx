import { useShopItems } from "@/hooks/useShopItems";
import { SEO } from "@/components/SEO";
import { ShopItemCard } from "@/components/ShopItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Coins, LogIn, Loader2, ExternalLink, Sparkles, User, CalendarDays, BookOpen } from "lucide-react";
import { useStreamElementsPoints } from "@/hooks/useStreamElementsPoints";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityNav } from "@/components/community/CommunityNav";

import { ContentSidebar } from "@/components/ContentSidebar";
function ShopHero() {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  return (
    <section
      className="relative overflow-hidden py-12 text-white md:py-20"
      style={{
        backgroundImage: heroBackgroundImage
          ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
          : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Køb med Point
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Butik</h1>
          <p className="text-lg text-white/80">
            Her kan du shoppe eksklusive varer med point, som du optjener ved at se vores streams på Twitch. Jo mere du ser, desto flere fede produkter kan du få fat i!
          </p>
        </div>
      </div>
    </section>
  );
}

function PointsDisplay() {
  const { points, isLoading, isConfigured, isLoggedIn, hasTwitchUsername } = useStreamElementsPoints();
  const { data: settings } = useSiteSettings();
  const twitchUrl = settings?.twitch_url;

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
        
        {/* Points earning explanation for non-logged in users */}
        <Card className="mx-auto mt-4 max-w-2xl border-muted/50 bg-muted/30">
          <CardContent className="p-4">
            <h4 className="mb-2 text-sm font-semibold text-foreground">Hvordan optjener jeg point?</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Se streams:</strong> Du optjener automatisk point mens du ser live streams på Twitch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Deltag i raffles:</strong> Vind ekstra point ved at deltage i raffles under streams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Vær aktiv:</strong> Jo mere du engagerer dig i chatten, jo flere point kan du optjene</span>
              </li>
            </ul>
            {twitchUrl && (
              <div className="mt-3 pt-3 border-t border-muted">
                <a 
                  href={twitchUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Gå til Twitch-kanalen
                </a>
              </div>
            )}
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
      
      {/* Points earning explanation */}
      <Card className="mx-auto mt-4 max-w-2xl border-muted/50 bg-muted/30">
        <CardContent className="p-4">
          <h4 className="mb-2 text-sm font-semibold text-foreground">Hvordan optjener jeg point?</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Se streams:</strong> Du optjener automatisk point mens du ser live streams på Twitch</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Deltag i raffles:</strong> Vind ekstra point ved at deltage i raffles under streams</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span><strong>Vær aktiv:</strong> Jo mere du engagerer dig i chatten, jo flere point kan du optjene</span>
            </li>
          </ul>
          {twitchUrl && (
            <div className="mt-3 pt-3 border-t border-muted">
              <a 
                href={twitchUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Gå til Twitch-kanalen
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Shop() {
  const { data: items, isLoading, error } = useShopItems(false);

  if (isLoading) {
    return (
      <>
        <ShopHero />
        <div className="container py-8 md:py-12">
          <PointsDisplay />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
      </>
    );
  }

  if (error) {
    return (
      <>
        <ShopHero />
        <div className="container py-8 md:py-12">
          <PointsDisplay />
          <p className="mt-8 text-destructive">Der opstod en fejl ved indlæsning af produkter.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Butik – Køb med Point | Casinoaftaler"
        description="Shop eksklusive varer med dine Twitch-point hos Casinoaftaler. Gaming headsets, gavekort, konsoller og mere. Optjen point ved at se streams."
        noindex
      />
      <ShopHero />
      <CommunityNav />
      <div className="relative">
        <div className="hidden lg:block absolute left-4 xl:left-8 top-8 w-[260px] z-10">
          <div className="sticky top-24">
            <CommunitySeoBridge />
          </div>
        </div>
        <div className="container py-8 md:py-12">
        <div className="flex gap-8 xl:gap-10">
          <div className="min-w-0 flex-1">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>Siden opdateret: <span className="font-medium text-foreground">15-02-2026</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Læsetid: <span className="font-medium text-foreground">2 Min.</span></span>
          </div>
        </div>

        <PointsDisplay />

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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

        <div className="mt-12">
          <RelatedGuides currentPath="/butik" />
        </div>
          </div>
          <ContentSidebar />
        </div>
        </div>
      </div>
    </>
  );
}
