import { SEO } from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BonusHuntSlotTable } from "@/components/bonus-hunt/BonusHuntSlotTable";
import { BonusHuntStatsTab } from "@/components/bonus-hunt/BonusHuntStatsTab";
import { BonusHuntGTWTab } from "@/components/bonus-hunt/BonusHuntGTWTab";
import { BonusHuntAvgXTab } from "@/components/bonus-hunt/BonusHuntAvgXTab";
import { BonusHuntCasinoContext } from "@/components/bonus-hunt/BonusHuntCasinoContext";
import { BonusHuntVideoSection, getHuntVideo } from "@/components/bonus-hunt/BonusHuntVideoSection";
import { BonusHuntLiveStream } from "@/components/bonus-hunt/BonusHuntLiveStream";
import { BonusHuntResultSummary } from "@/components/bonus-hunt/BonusHuntResultSummary";
import { BonusHuntSeoContent } from "@/components/bonus-hunt/BonusHuntSeoContent";
import { BonusHuntHostCard } from "@/components/bonus-hunt/BonusHuntHostCard";
import { BonusHuntHeroBar } from "@/components/bonus-hunt/BonusHuntHeroBar";
import { BonusHuntFaq, buildBonusHuntFaqSchema } from "@/components/bonus-hunt/BonusHuntFaq";

import { BonusHuntStatStrip } from "@/components/bonus-hunt/BonusHuntStatStrip";
import { CommunityNav } from "@/components/community/CommunityNav";
import { CommunitySeoBridge } from "@/components/community/CommunitySeoBridge";
import { CommunityConversionCard } from "@/components/community/CommunityConversionCard";
import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { SidebarSocialProof } from "@/components/games/SidebarSocialProof";
import { useBonusHuntData, useLatestHuntNumber } from "@/hooks/useBonusHuntData";
import { useBonusHuntSession, useBonusHuntGtwBets, useBonusHuntAvgxBets } from "@/hooks/useBonusHuntSession";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { SITE_URL } from "@/lib/seo";
import bonusHuntHero from "@/assets/bonus-hunt/bonus-hunt-hero.jpg";

export default function BonusHunt() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [huntIdOverride, setHuntIdOverride] = useState<number | undefined>();

  const { data: latestHuntNumber = 1 } = useLatestHuntNumber();
  const { data: huntData, isLoading: huntLoading } = useBonusHuntData(huntIdOverride);
  const { data: session } = useBonusHuntSession();
  const { data: gtwBets = [] } = useBonusHuntGtwBets(session?.id);
  const { data: avgxBets = [] } = useBonusHuntAvgxBets(session?.id);

  const refreshBets = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['bonus-hunt-gtw-bets'] });
    queryClient.invalidateQueries({ queryKey: ['bonus-hunt-avgx-bets'] });
  }, [queryClient]);

  const liveHuntNumber = huntData?.visibleId || latestHuntNumber + 1;
  const currentHuntNumber = huntIdOverride || liveHuntNumber;
  const isLive = !!(session?.status === 'active' && session?.hunt_number === currentHuntNumber);
  const huntVideo = getHuntVideo(currentHuntNumber);
  const maxHuntNumber = Math.max(latestHuntNumber, liveHuntNumber);

  const handleNavigate = useCallback((dir: 'first' | 'prev' | 'next' | 'last') => {
    if (!huntData) return;
    const current = huntIdOverride || liveHuntNumber;
    switch (dir) {
      case 'prev': if (current > 2) setHuntIdOverride(current - 1); break;
      case 'next':
        if (current < maxHuntNumber) setHuntIdOverride(current + 1);
        if (current + 1 > latestHuntNumber) setHuntIdOverride(undefined);
        break;
      case 'first': setHuntIdOverride(2); break;
      case 'last': setHuntIdOverride(undefined); break;
    }
  }, [huntData, huntIdOverride, latestHuntNumber, liveHuntNumber, maxHuntNumber]);

  const huntDate = huntData?.date
    ? new Date(huntData.date).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' }).toUpperCase()
    : '';

  const huntDateLong = huntData?.date
    ? new Date(huntData.date).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const casinoSlug = session?.casino_slug || huntVideo?.casinoSlug || 'spildansknu';
  const casinoName = huntVideo?.casinoName ?? 'SpilDanskNu';
  const avgX = huntData?.stats.averageX;
  const bonusCount = huntData?.stats.openedBonuses ?? 0;

  // SEO Meta
  const seoTitle = "Live Bonus Hunt i Danmark – Resultater, gennemsnit X & Twitch streams";
  const seoDescription = "Se live og arkiverede bonus hunts fra danske casinoer med gennemsnit X, top wins og fuld Twitch stream. Opdateres løbende.";

  // Structured data
  const faqSchema = useMemo(() => buildBonusHuntFaqSchema(), []);

  const authorSchema = {
    "@type": "Person",
    "@id": `${SITE_URL}/forfatter/kevin#person`,
    name: "Kevin",
    url: `${SITE_URL}/forfatter/kevin`,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seoTitle,
    description: seoDescription,
    author: authorSchema,
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/bonus-hunt`,
    datePublished: "2026-01-15",
    dateModified: new Date().toISOString().split('T')[0],
  };

  const jsonLdSchemas = [articleSchema, faqSchema];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        jsonLd={jsonLdSchemas}
        breadcrumbLabel="Bonus Hunt"
      />

      {/* SEO Hero with background image */}
      <section className="relative overflow-hidden text-white">
        <img
          src={bonusHuntHero}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(260 70% 25% / 0.85), hsl(250 60% 20% / 0.8) 40%, hsl(210 80% 25% / 0.85))",
          }}
        />
        <div className="relative container py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Live Bonus Hunt – Resultater, gennemsnit X og Twitch streams
            </h1>
            <p className="text-lg text-white/80">
              Se dokumenterede bonus hunts fra danske casinoer med gennemsnit, top wins og fuld stream.
            </p>
            <p className="text-sm text-white/60 max-w-2xl mx-auto">
              En bonus hunt er en live-stream, hvor flere bonusser enten købes eller huntes, og så åbnes i én samlet session.
              Her finder du vores arkiv med resultater, gennemsnit X og dokumenterede Twitch streams.
            </p>
          </div>
        </div>
      </section>

      <CommunityNav />

      <div className="container relative">
        {/* Sidebar - positioned outside content flow */}
        <div className="hidden xl:block absolute right-full top-0 mr-6 w-[260px] pt-6">
          <div className="sticky top-24 h-fit flex flex-col gap-4">
            <CommunitySeoBridge />
            <CommunityConversionCard />
            <SidebarSocialProof />
            <SidebarLeaderboard />
            <SidebarShopLeaderboard />
          </div>
        </div>

        <div className="pt-6 md:pt-8 space-y-6">
          {/* Stat strip */}
          <BonusHuntStatStrip />


          {/* Main content */}
          {huntLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : huntData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Left column (60%) */}
                <div className="lg:col-span-3 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <BonusHuntHeroBar
                    huntNumber={huntIdOverride || liveHuntNumber}
                    huntDate={huntDate}
                    huntDateLong={huntDateLong}
                    casinoName={casinoName}
                    avgX={avgX}
                    latestHuntNumber={latestHuntNumber}
                    maxHuntNumber={maxHuntNumber}
                    isLive={isLive}
                    onNavigate={handleNavigate}
                    onJumpToHunt={(num) => num > latestHuntNumber ? setHuntIdOverride(undefined) : setHuntIdOverride(num || undefined)}
                  />
                  <BonusHuntCasinoContext
                    huntNumber={huntIdOverride || liveHuntNumber}
                    huntDate={huntDate}
                    bonusCount={huntData.stats.openedBonuses}
                    avgX={huntData.stats.averageX}
                    isLive={isLive}
                    casinoSlug={casinoSlug}
                  />
                  {isLive ? (
                    <BonusHuntLiveStream huntNumber={currentHuntNumber} />
                  ) : (
                    huntVideo && <BonusHuntVideoSection video={huntVideo} />
                  )}
                </div>

                {/* Right column (40%) */}
                <div className="lg:col-span-2 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
                  <Tabs defaultValue="stats" className="w-full">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="stats">STATS</TabsTrigger>
                      <TabsTrigger value="gtw">GTW</TabsTrigger>
                      <TabsTrigger value="avgx">AVG X</TabsTrigger>
                    </TabsList>
                    <TabsContent value="stats">
                      <BonusHuntStatsTab data={huntData} />
                    </TabsContent>
                    <TabsContent value="gtw">
                      <BonusHuntGTWTab
                        session={session}
                        bets={gtwBets}
                        userId={user?.id}
                        onBetPlaced={refreshBets}
                      />
                    </TabsContent>
                    <TabsContent value="avgx">
                      <BonusHuntAvgXTab
                        session={session}
                        bets={avgxBets}
                        userId={user?.id}
                        onBetPlaced={refreshBets}
                      />
                    </TabsContent>
                  </Tabs>

                  {!isLive && huntData && (
                    <BonusHuntResultSummary
                      huntNumber={currentHuntNumber}
                      casinoName={casinoName}
                      casinoSlug={casinoSlug}
                      bonusCount={huntData.stats.openedBonuses}
                      avgX={huntData.stats.averageX}
                      highestWin={huntData.stats.highestWin}
                      highestMultiplier={huntData.stats.highestMultiplier}
                    />
                  )}

                  <div className="flex-1">
                    <BonusHuntHostCard huntNumber={currentHuntNumber} />
                  </div>
                </div>
              </div>

              {/* Slot table */}
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200">
                <BonusHuntSlotTable slots={huntData.slots} />
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              Ingen bonus hunt data tilgængelig
            </div>
          )}

          {/* SEO Content */}
          <BonusHuntSeoContent />

          {/* FAQ Section */}
          <BonusHuntFaq />

          <div className="pb-12" />
        </div>
        </div>
    </>
  );
}
