import { useShopItems } from "@/hooks/useShopItems";
import { SEO } from "@/components/SEO";
import { ShopItemCard } from "@/components/ShopItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Coins, LogIn, Loader2, ExternalLink, Sparkles, User, CalendarDays, BookOpen, Gift, Star, TrendingUp, Package } from "lucide-react";
import { useStreamElementsPoints } from "@/hooks/useStreamElementsPoints";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { CommunityContentShell } from "@/components/community/CommunityContentShell";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityNav } from "@/components/community/CommunityNav";
import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { SidebarSocialProof } from "@/components/games/SidebarSocialProof";
import { CommunityFooterSeo } from "@/components/community/CommunityFooterSeo";

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
            Community Butik
          </Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Butik</h1>
          <p className="text-lg text-white/80">
            Brug dine Twitch-point på eksklusive produkter fra vores butik. Jo mere du engagerer dig i vores community, desto flere fede varer kan du få fat i!
          </p>
        </div>
      </div>
    </section>
  );
}

function PointsCard() {
  const { points, isLoading, isConfigured, isLoggedIn, hasTwitchUsername } = useStreamElementsPoints();
  const { data: settings } = useSiteSettings();
  const twitchUrl = settings?.twitch_url;

  if (!isConfigured) return null;

  if (!isLoggedIn) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 shadow-lg">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Coins className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-foreground">Se dine point</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Log ind med Twitch for at se din point-balance og handle i butikken
              </p>
            </div>
            <Button asChild className="w-full sm:w-auto shrink-0">
              <Link to="/auth">
                <LogIn className="mr-2 h-4 w-4" />
                Log ind
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasTwitchUsername) {
    return (
      <Card className="border-muted bg-muted/30">
        <CardContent className="flex items-center gap-3 p-4">
          <Coins className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Log ind med Twitch for at se dine point</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Henter dine point...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-background to-accent/10 shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Coins className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Din balance</p>
            <p className="text-2xl font-bold text-foreground">
              {points?.toLocaleString("da-DK") ?? 0} <span className="text-base font-medium text-muted-foreground">point</span>
            </p>
          </div>
          {twitchUrl && (
            <a
              href={twitchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Twitch
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function HowToEarnSection() {
  const { data: settings } = useSiteSettings();
  const twitchUrl = settings?.twitch_url;

  const steps = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Se streams",
      description: "Du optjener automatisk point mens du ser live streams på Twitch.",
    },
    {
      icon: <Gift className="h-5 w-5" />,
      title: "Deltag i raffles",
      description: "Vind ekstra point ved at deltage i raffles under streams.",
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Vær aktiv",
      description: "Engagér dig i chatten og community for at optjene bonus-point.",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Sådan optjener du point
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((step, i) => (
          <Card key={i} className="border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {step.icon}
              </div>
              <h3 className="font-semibold text-sm text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {twitchUrl && (
        <div className="text-center">
          <a
            href={twitchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Gå til Twitch-kanalen og begynd at optjene point
          </a>
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  const { data: items, isLoading, error } = useShopItems(false);

  return (
    <>
      <SEO
        title="Butik – Køb med Point | Casinoaftaler"
        description="Shop eksklusive varer med dine Twitch-point hos Casinoaftaler. Gaming headsets, gavekort, konsoller og mere. Optjen point ved at se streams."
        noindex
      />
      <ShopHero />
      <CommunityNav />
      <CommunityContentShell
        leftSidebar={
          <>
            <SidebarSocialProof />
            <SidebarLeaderboard />
            <SidebarShopLeaderboard />
          </>
        }
      >
        {/* Meta info bar */}
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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

        {/* Points balance */}
        <div className="space-y-6">
          <PointsCard />

          {/* How to earn section */}
          <HowToEarnSection />

          {/* Products section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Produkter
              </h2>
              {items && items.length > 0 && (
                <Badge variant="outline" className="text-muted-foreground">
                  {items.length} {items.length === 1 ? 'produkt' : 'produkter'}
                </Badge>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-9 w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-6 text-center">
                  <p className="text-destructive">Der opstod en fejl ved indlæsning af produkter.</p>
                </CardContent>
              </Card>
            ) : items && items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <ShopItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-border/60 bg-muted/10">
                <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-medium">Ingen produkter endnu</p>
                  <p className="text-sm mt-1">Der er ingen produkter i butikken lige nu. Kom snart tilbage!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-12">
          <RelatedGuides currentPath="/butik" />
        </div>

        <div className="pb-12" />
      </CommunityContentShell>
    </>
  );
}
