import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { Trophy, Crown, Star, TrendingUp, Sparkles, Medal, Film, ArrowRight, Users, Play } from "lucide-react";
import { CommunityNav } from "@/components/community/CommunityNav";
import { ContentSidebar } from "@/components/ContentSidebar";
import { SidebarSocialProof } from "@/components/games/SidebarSocialProof";
import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { CommunityFooterSeo } from "@/components/community/CommunityFooterSeo";
import { HallOfFameSeoContent } from "@/components/seo-content/HallOfFameSeoContent";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Fetch top players by total winnings from leaderboard
function useTopPlayers() {
  return useQuery({
    queryKey: ["hall-of-fame-top-players"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_leaderboard")
        .select("user_id, total_winnings, biggest_win, biggest_multiplier, total_spins")
        .order("total_winnings", { ascending: false })
        .limit(10);
      if (error) throw error;

      // Fetch profiles for these users
      const userIds = (data || []).map(d => d.user_id).filter(Boolean);
      if (userIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url, twitch_badges")
        .in("user_id", userIds);

      const profileMap = new Map((profiles || []).map(p => [p.user_id, p]));

      return (data || []).map(entry => ({
        ...entry,
        profile: profileMap.get(entry.user_id),
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetch top multiplier players
function useTopMultipliers() {
  return useQuery({
    queryKey: ["hall-of-fame-top-multipliers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_leaderboard")
        .select("user_id, biggest_multiplier, biggest_win, total_spins")
        .order("biggest_multiplier", { ascending: false })
        .limit(10);
      if (error) throw error;

      const userIds = (data || []).map(d => d.user_id).filter(Boolean);
      if (userIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url, twitch_badges")
        .in("user_id", userIds);

      const profileMap = new Map((profiles || []).map(p => [p.user_id, p]));

      return (data || []).map(entry => ({
        ...entry,
        profile: profileMap.get(entry.user_id),
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetch top community clips
function useTopClips() {
  return useQuery({
    queryKey: ["hall-of-fame-top-clips"],
    queryFn: async () => {
      const { data: clips, error } = await supabase
        .from("community_clips")
        .select("id, title, url, thumbnail_url, user_id, platform, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;

      const userIds = (clips || []).map(c => c.user_id).filter(Boolean);
      if (userIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      // Get like counts
      const clipIds = (clips || []).map(c => c.id);
      const { data: likes } = await supabase
        .from("community_clip_likes")
        .select("clip_id")
        .in("clip_id", clipIds);

      const likeCounts = new Map<string, number>();
      (likes || []).forEach(l => {
        likeCounts.set(l.clip_id, (likeCounts.get(l.clip_id) || 0) + 1);
      });

      const profileMap = new Map((profiles || []).map(p => [p.user_id, p]));

      return (clips || []).map(clip => ({
        ...clip,
        profile: profileMap.get(clip.user_id),
        likeCount: likeCounts.get(clip.id) || 0,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Fetch tournament winners
function useTournamentWinners() {
  return useQuery({
    queryKey: ["hall-of-fame-tournament-winners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("monthly_tournament_archives")
        .select("*")
        .order("month", { ascending: false })
        .limit(9);
      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

const MEDAL_COLORS = ["text-yellow-400", "text-gray-400", "text-amber-600"];

function LeaderboardSection({
  title,
  icon: Icon,
  entries,
  valueKey,
  valueLabel,
  isLoading,
}: {
  title: string;
  icon: React.ElementType;
  entries: any[];
  valueKey: string;
  valueLabel: string;
  isLoading: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <p className="text-muted-foreground text-sm py-4 text-center">Indlæser...</p>
        ) : entries.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 text-center">Ingen data endnu</p>
        ) : (
          <div className="space-y-2">
            {entries.map((entry, i) => {
              const displayName = entry.profile?.display_name || "Anonym";
              const avatarUrl = entry.profile?.avatar_url;
              const value = Number(entry[valueKey] || 0);

              return (
                <Link
                  key={entry.user_id || i}
                  to={entry.profile?.display_name ? `/u/${entry.profile.display_name}` : "#"}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="w-6 text-center font-bold text-sm">
                    {i < 3 ? (
                      <Medal className={`h-4 w-4 inline ${MEDAL_COLORS[i]}`} />
                    ) : (
                      <span className="text-muted-foreground">{i + 1}</span>
                    )}
                  </span>
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="text-xs">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate text-sm font-medium group-hover:text-primary transition-colors">
                    {displayName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {value.toLocaleString("da-DK")} {valueLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const faqItems = [
  {
    question: "Hvad er Hall of Fame?",
    answer: "Hall of Fame er Casinoaftalers æresgalleri, der hylder de mest aktive og succesfulde medlemmer af vores community. Her kan du se top-spillere, bedste clips og turneringsvindere."
  },
  {
    question: "Hvordan kommer man på Hall of Fame?",
    answer: "Du kommer på Hall of Fame ved at spille vores gratis spillemaskiner, uploade populære clips eller vinde månedlige turneringer. Jo mere aktiv du er, jo højere rangerer du."
  },
  {
    question: "Koster det penge at deltage?",
    answer: "Nej, alt er gratis. Vores spillemaskiner bruger fiktive credits (2.000 dagligt), og der er ingen indbetalinger involveret. Turneringspræmier udbetales af Casinoaftaler."
  },
  {
    question: "Hvad er forskellen på Hall of Fame og Leaderboard?",
    answer: "Leaderboardet viser aktuelle ugentlige/månedlige rankings, mens Hall of Fame er en permanent æreshal med all-time rekorder og turneringsvindere."
  },
  {
    question: "Kan jeg se andre spilleres profiler?",
    answer: "Ja, klik på et brugernavn i Hall of Fame for at besøge deres offentlige profil. Her kan du se deres stats, favoritter og spillestil – forudsat de har gjort deres profil offentlig."
  },
  {
    question: "Hvordan uploade jeg clips til Hall of Fame?",
    answer: "Gå til Highlights-sektionen og upload din Twitch eller YouTube clip. Når den er godkendt af vores team, kan den optræde i Hall of Fame's 'Bedste Clips' sektion."
  },
];

export default function HallOfFame() {
  const { data: topPlayers = [], isLoading: playersLoading } = useTopPlayers();
  const { data: topMultipliers = [], isLoading: multipliersLoading } = useTopMultipliers();
  const { data: topClips = [], isLoading: clipsLoading } = useTopClips();
  const { data: tournamentWinners = [], isLoading: winnersLoading } = useTournamentWinners();

  const seoTitle = "Hall of Fame – Community Legender & Top Spillere";
  const seoDesc = "Se Casinoaftalers Hall of Fame med de bedste spillere, største gevinster, top clips og turneringsvindere. Ægte community-data fra vores gratis spillemaskiner.";

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/community/hall-of-fame`,
    datePublished: "2026-03-05",
    authorName: "Jonas Theill",
  });

  const faqSchema = buildFaqSchema(faqItems);

  const MONTH_NAMES = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni",
    "Juli", "August", "September", "Oktober", "November", "December",
  ];

  const CATEGORY_LABELS: Record<string, string> = {
    points: "Flest Point",
    multiplier: "Højeste X",
    biggest_win: "Største Gevinst",
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        jsonLd={[articleSchema, faqSchema]}
        breadcrumbLabel="Hall of Fame"
      />

      {/* Hero – matches other community pages */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Crown className="mr-1.5 h-3.5 w-3.5" />
              Community Legender
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Hall of Fame
            </h1>
            <p className="text-lg text-white/80">
              De mest dedikerede spillere, de vildeste gevinster og de bedste clips fra vores{" "}
              <Link to="/community" className="text-white underline hover:text-white/80">community</Link>.
              Alt baseret på ægte data fra vores gratis{" "}
              <Link to="/community/slots" className="text-white underline hover:text-white/80">spillemaskiner</Link>.
            </p>
          </div>
        </div>
      </section>

      <CommunityNav />

      <div className="container relative">
        {/* Left sidebar */}
        <div className="hidden min-[1540px]:block absolute right-full top-0 mr-6 w-[260px] pt-8 md:pt-12">
          <div className="sticky top-24 h-fit flex flex-col gap-4">
            <SidebarSocialProof />
            <SidebarLeaderboard />
            <SidebarShopLeaderboard />
          </div>
        </div>

        <div className="flex gap-8 xl:gap-10">
          <div className="min-w-0 flex-1">
        <div className="py-8 md:py-12 space-y-8">

        {/* All-Time Leaderboards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" id="all-time-leaderboard">
            <Trophy className="h-6 w-6 text-yellow-400" />
            All-Time Leaderboard
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <LeaderboardSection
              title="Flest Point (All-Time)"
              icon={Star}
              entries={topPlayers}
              valueKey="total_winnings"
              valueLabel="point"
              isLoading={playersLoading}
            />
            <LeaderboardSection
              title="Højeste Multiplikator (All-Time)"
              icon={TrendingUp}
              entries={topMultipliers}
              valueKey="biggest_multiplier"
              valueLabel="x"
              isLoading={multipliersLoading}
            />
          </div>
        </section>

        {/* Top Clips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" id="bedste-clips">
            <Film className="h-6 w-6 text-primary" />
            Bedste Community Clips
          </h2>
          {clipsLoading ? (
            <p className="text-muted-foreground text-center py-8">Indlæser clips...</p>
          ) : topClips.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Film className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Ingen godkendte clips endnu. <Link to="/highlights" className="text-primary hover:underline">Vær den første til at uploade!</Link></p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topClips.map((clip) => (
                <a
                  key={clip.id}
                  href={clip.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="overflow-hidden group cursor-pointer transition-shadow hover:shadow-lg">
                    <div className="relative aspect-video bg-muted">
                      {clip.thumbnail_url ? (
                        <img
                          src={clip.thumbnail_url}
                          alt={clip.title || "Community clip"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-primary/80 p-3 transition-transform group-hover:scale-110 group-hover:bg-primary">
                          <Play className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                        </div>
                      </div>
                      <Badge className="absolute top-2 right-2 text-xs" variant="secondary">
                        ❤️ {clip.likeCount}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium text-sm truncate mb-1 group-hover:text-primary transition-colors">{clip.title || "Untitled clip"}</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={clip.profile?.avatar_url || undefined} />
                          <AvatarFallback className="text-[10px]">
                            {clip.profile?.display_name?.charAt(0)?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground truncate">
                          {clip.profile?.display_name || "Anonym"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Tournament Winners */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" id="turneringsvindere">
            <Crown className="h-6 w-6 text-primary" />
            Seneste Turneringsvindere
          </h2>
          {winnersLoading ? (
            <p className="text-muted-foreground text-center py-8">Indlæser vindere...</p>
          ) : tournamentWinners.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Ingen turneringsvindere endnu. <Link to="/community/turneringer" className="text-primary hover:underline">Deltag i den næste turnering!</Link></p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tournamentWinners.map((winner) => {
                const [year, month] = (winner.month || "").split("-");
                const monthName = MONTH_NAMES[parseInt(month, 10) - 1] || month;
                return (
                  <Card key={winner.id} className="overflow-hidden">
                    <CardHeader className="pb-3 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{monthName} {year}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {CATEGORY_LABELS[winner.category] || winner.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3">
                        <Crown className="h-5 w-5 text-yellow-400 shrink-0" />
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={winner.winner_avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {winner.winner_display_name?.charAt(0)?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold truncate">{winner.winner_display_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {Number(winner.winning_value).toLocaleString("da-DK")} point
                          </p>
                        </div>
                        <Badge className="shrink-0">500 kr</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          <div className="mt-4 text-center">
            <Link
              to="/community/turneringer/arkiv"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Se komplet turneringsarkiv <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* SEO Content */}
        <HallOfFameSeoContent />

        <CommunitySeoSections />

        <RelatedGuides currentPath="/community/hall-of-fame" />

        <div className="mt-12">
          <FAQSection faqs={faqItems} />
        </div>

        <CommunityBrandBlock />

        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
