import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { usePublicProfile } from "@/hooks/usePublicProfile";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useTwitchBadges } from "@/hooks/useTwitchBadges";
import { useUserSlotRequestStats } from "@/hooks/useSlotRequests";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PointsBalanceCard } from "@/components/PointsBalanceCard";
import { TwitchBadges } from "@/components/TwitchBadges";
import { ArrowLeft, Building2, Gamepad2, Gauge, Play, Sparkles, TrendingUp, Trophy } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";
import { Button } from "@/components/ui/button";

const PLAY_STYLE_LABELS: Record<string, string> = {
  bonus_hunter: "Bonus Hunter",
  high_roller: "High Roller",
  low_stakes: "Low Stakes Grinder",
  slot_spinner: "Slot Spinner",
  live_casino: "Live Casino Spiller",
};

const VOLATILITY_LABELS: Record<string, { label: string; color: string }> = {
  low: { label: "Lav Volatilitet", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  medium: { label: "Medium Volatilitet", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  high: { label: "Høj Volatilitet", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const GAME_TYPE_LABELS: Record<string, string> = {
  slots: "Slots",
  live_casino: "Live Casino",
  both: "Slots & Live Casino",
};

const BET_SIZE_LABELS: Record<string, string> = {
  micro: "Micro (0.10-1 DKK)",
  low: "Lav (1-5 DKK)",
  medium: "Medium (5-20 DKK)",
  high: "Høj (20-50 DKK)",
  very_high: "Meget Høj (50-100 DKK)",
  whale: "High Roller (100+ DKK)",
};

function formatAmount(amount: number | null): string {
  if (amount === null) return "—";
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatCard({ 
  iconName, 
  label, 
  value, 
  subValue,
  accentColor = "primary"
}: { 
  iconName: string;
  label: string; 
  value: string | number | null; 
  subValue?: string | null;
  accentColor?: string;
}) {
  const colorClasses: Record<string, string> = {
    primary: "from-primary/20 to-primary/5 border-primary/30",
    yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    green: "from-green-500/20 to-green-500/5 border-green-500/30",
  };

  const iconColors: Record<string, string> = {
    primary: "text-primary",
    yellow: "text-yellow-400",
    purple: "text-purple-400",
    green: "text-green-400",
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[accentColor]} border backdrop-blur-sm`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-background/50 ${iconColors[accentColor]}`}>
            <MenuIcon iconName={iconName} className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
            <p className="text-lg sm:text-2xl font-bold truncate">
              {value || "—"}
            </p>
            {subValue && (
              <p className="text-xs text-muted-foreground truncate">{subValue}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full rounded-2xl mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivateProfile() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md mx-4 bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <MenuIcon iconName="lock" className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Privat Profil</h2>
          <p className="text-muted-foreground mb-6">
            Denne bruger har valgt at holde sin profil privat.
          </p>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbage til forsiden
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md mx-4 bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <MenuIcon iconName="user" className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Profil ikke fundet</h2>
          <p className="text-muted-foreground mb-6">
            Vi kunne ikke finde en bruger med dette navn.
          </p>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbage til forsiden
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading, error } = usePublicProfile(username);
  const { data: pointsData, isLoading: pointsLoading } = useUserPoints(profile?.user_id);
  const { data: badgesData, isLoading: badgesLoading } = useTwitchBadges(profile?.user_id);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !profile) {
    return <NotFound />;
  }

  const hasStats = profile.highest_win_amount || profile.biggest_spin_win || profile.biggest_x_win;
  const hasFavorites = profile.favorite_slot || profile.favorite_provider || profile.favorite_casino;
  const hasPlayStyle = (profile.play_styles && profile.play_styles.length > 0) || profile.preferred_game_type || profile.volatility_preference;
  const hasPoints = pointsData && pointsData.total_winnings > 0;

  const displayName = profile.display_name || username || "Ukendt";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${displayName} – Profil | Casinoaftaler`}
        description={`Se ${displayName}s offentlige profil på Casinoaftaler. Statistik, badges og spillestil.`}
        noindex
      />
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative container max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbage
            </Link>
          </Button>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-primary/50 rounded-full blur opacity-50" />
              <Avatar className="relative h-28 w-28 sm:h-36 sm:w-36 border-4 border-background shadow-2xl">
                <AvatarImage src={profile.avatar_url || undefined} alt={profile.display_name || "Bruger"} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/20 to-primary/10">
                  <MenuIcon iconName="user" className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 p-2 bg-primary rounded-full shadow-lg">
                <MenuIcon iconName="crown" className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            
            {/* Name and bio */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{profile.display_name}</h1>
              {profile.bio && (
                <p className="text-muted-foreground max-w-lg">{profile.bio}</p>
              )}
              
              {/* Twitch Badges */}
              <TwitchBadges
                userId={profile.user_id}
                badges={badgesData?.badges}
                isLoading={badgesLoading}
                className="mt-3"
                size="md"
              />
              
              {/* Quick badges */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                {profile.volatility_preference && VOLATILITY_LABELS[profile.volatility_preference] && (
                  <Badge variant="outline" className={VOLATILITY_LABELS[profile.volatility_preference].color}>
                    <Gauge className="h-3 w-3 mr-1" />
                    {VOLATILITY_LABELS[profile.volatility_preference].label}
                  </Badge>
                )}
                {profile.preferred_game_type && GAME_TYPE_LABELS[profile.preferred_game_type] && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    <MenuIcon iconName="gamepad2" className="h-3 w-3 mr-1" />
                    {GAME_TYPE_LABELS[profile.preferred_game_type]}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Points Section - shown for public profiles */}
        <PointsBalanceCard
          points={pointsData?.total_winnings}
          isLoading={pointsLoading}
          variant="hero"
        />

        {/* Stats Section */}
        {hasStats && (
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MenuIcon iconName="trophy" className="h-5 w-5 text-yellow-400" />
              Gambling Stats
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(profile.highest_win_amount !== null || profile.highest_win_game) && (
                <StatCard
                  iconName="trophy"
                  label="Største Gevinst"
                  value={profile.highest_win_amount ? formatAmount(profile.highest_win_amount) : profile.highest_win_game}
                  subValue={profile.highest_win_amount ? profile.highest_win_game : profile.highest_win_casino}
                  accentColor="yellow"
                />
              )}
              {profile.biggest_spin_win !== null && (
                <StatCard
                  iconName="sparkles"
                  label="Største Enkelt Spin"
                  value={formatAmount(profile.biggest_spin_win)}
                  accentColor="purple"
                />
              )}
              {profile.biggest_x_win !== null && (
                <StatCard
                  iconName="trending-up"
                  label="Største X-Gevinst"
                  value={`${profile.biggest_x_win}x`}
                  accentColor="green"
                />
              )}
            </div>
          </section>
        )}
        
        {/* Favorites Section */}
        {hasFavorites && (
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MenuIcon iconName="heart" className="h-5 w-5 text-red-400" />
              Favoritter
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profile.favorite_slot && (
                <StatCard
                  iconName="gamepad2"
                  label="Yndlings Slot"
                  value={profile.favorite_slot}
                  accentColor="primary"
                />
              )}
              {profile.favorite_provider && (
                <StatCard
                  iconName="building2"
                  label="Yndlings Udbyder"
                  value={profile.favorite_provider}
                  accentColor="primary"
                />
              )}
              {profile.favorite_casino && (
                <StatCard
                  iconName="building2"
                  label="Yndlings Casino"
                  value={profile.favorite_casino}
                  accentColor="primary"
                />
              )}
            </div>
          </section>
        )}
        
        {/* Play Style Section */}
        {hasPlayStyle && (
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MenuIcon iconName="zap" className="h-5 w-5 text-primary" />
              Spillestil
            </h2>
            
            {/* Play styles badges */}
            {profile.play_styles && profile.play_styles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.play_styles.map((style) => (
                  <Badge 
                    key={style} 
                    variant="secondary"
                    className="px-3 py-1.5 text-sm"
                  >
                    {style === "bonus_hunter" && <MenuIcon iconName="target" className="h-3 w-3 mr-1.5" />}
                    {style === "high_roller" && <MenuIcon iconName="flame" className="h-3 w-3 mr-1.5" />}
                    {style === "slot_spinner" && <MenuIcon iconName="sparkles" className="h-3 w-3 mr-1.5" />}
                    {PLAY_STYLE_LABELS[style] || style}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Bet size */}
            {profile.typical_bet_size && BET_SIZE_LABELS[profile.typical_bet_size] && (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <MenuIcon iconName="target" className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Typisk Indsats</p>
                    <p className="font-medium">{BET_SIZE_LABELS[profile.typical_bet_size]}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        )}
        
        {/* No content fallback */}
        {!hasStats && !hasFavorites && !hasPlayStyle && (
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-8 text-center">
              <MenuIcon iconName="user" className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Ingen oplysninger endnu</h3>
              <p className="text-muted-foreground">
                Denne bruger har ikke udfyldt sin profil endnu.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
