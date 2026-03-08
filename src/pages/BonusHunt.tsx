import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BonusHuntSlotTable } from "@/components/bonus-hunt/BonusHuntSlotTable";
import { BonusHuntStatsTab } from "@/components/bonus-hunt/BonusHuntStatsTab";
import { BonusHuntGTWTab } from "@/components/bonus-hunt/BonusHuntGTWTab";
import { BonusHuntAvgXTab } from "@/components/bonus-hunt/BonusHuntAvgXTab";
import { BonusHuntSlotCoupon } from "@/components/bonus-hunt/BonusHuntSlotCoupon";

import { BonusHuntVideoSection, getHuntVideo } from "@/components/bonus-hunt/BonusHuntVideoSection";
import { BonusHuntLiveStream } from "@/components/bonus-hunt/BonusHuntLiveStream";
import { BonusHuntResultSummary } from "@/components/bonus-hunt/BonusHuntResultSummary";
import { BonusHuntSeoContent } from "@/components/bonus-hunt/BonusHuntSeoContent";
import { BonusHuntSeoText } from "@/components/bonus-hunt/BonusHuntSeoText";
// LazySection removed from SEO-critical sections for crawlability
import { BonusHuntHostCard } from "@/components/bonus-hunt/BonusHuntHostCard";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { BonusHuntHeroBar } from "@/components/bonus-hunt/BonusHuntHeroBar";
import { BonusHuntFaq, buildBonusHuntFaqSchema } from "@/components/bonus-hunt/BonusHuntFaq";
import { BonusHuntRelatedGuides } from "@/components/bonus-hunt/BonusHuntRelatedGuides";
import { BonusHuntTopCasinos } from "@/components/bonus-hunt/BonusHuntTopCasinos";
import { BonusHuntLatestNews } from "@/components/bonus-hunt/BonusHuntLatestNews";
import { BonusHuntCommunityLinks } from "@/components/bonus-hunt/BonusHuntCommunityLinks";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";

import { BonusHuntStatStrip } from "@/components/bonus-hunt/BonusHuntStatStrip";
import { CommunityNav } from "@/components/community/CommunityNav";
import { CommunitySeoBridge } from "@/components/community/CommunitySeoBridge";
import { CommunityConversionCard } from "@/components/community/CommunityConversionCard";
import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { SidebarSocialProof } from "@/components/games/SidebarSocialProof";
import { useBonusHuntData, useLatestHuntNumber, useArchivedHuntNumbers } from "@/hooks/useBonusHuntData";
import { useBonusHuntSession, useBonusHuntGtwBets, useBonusHuntAvgxBets } from "@/hooks/useBonusHuntSession";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SITE_URL, buildArticleSchema, KEVIN_SAME_AS } from "@/lib/seo";
import bonusHuntHero from "@/assets/bonus-hunt/bonus-hunt-hero.jpg";
export default function BonusHunt() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [huntIdOverride, setHuntIdOverride] = useState<number | undefined>(() => {
    const param = searchParams.get("hunt");
    return param ? parseInt(param, 10) || undefined : undefined;
  });

  // Sync URL param when huntIdOverride changes
  useEffect(() => {
    if (huntIdOverride) {
      setSearchParams({ hunt: String(huntIdOverride) }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [huntIdOverride, setSearchParams]);

  const { data: latestHuntNumber = 1 } = useLatestHuntNumber();
  const { data: archivedHuntNumbers = [] } = useArchivedHuntNumbers();
  const { data: huntData, isLoading: huntLoading } = useBonusHuntData(huntIdOverride);
  const { data: session } = useBonusHuntSession();
  const { data: gtwBets = [] } = useBonusHuntGtwBets(session?.id);
  const { data: avgxBets = [] } = useBonusHuntAvgxBets(session?.id);

  const refreshBets = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['bonus-hunt-gtw-bets'] });
    queryClient.invalidateQueries({ queryKey: ['bonus-hunt-avgx-bets'] });
  }, [queryClient]);

  const blockedHunts = new Set<number>();

  const getNextAllowed = useCallback((start: number) => {
    let n = start;
    while (blockedHunts.has(n)) n += 1;
    return n;
  }, []);

  const liveHuntNumber = getNextAllowed(huntData?.visibleId || latestHuntNumber + 1);
  const currentHuntNumber = huntData?.visibleId || huntIdOverride || liveHuntNumber;
  const isArchived = archivedHuntNumbers.includes(currentHuntNumber);
  const isLive = !!(session?.status === 'active' && session?.hunt_number === currentHuntNumber && !isArchived);
  const huntVideo = getHuntVideo(currentHuntNumber);
  const maxHuntNumber = Math.max(latestHuntNumber, liveHuntNumber);

  // Build available hunt numbers: archived + current active hunt (descending)
  const availableHuntNumbers = useMemo(() => {
    const nums = new Set(archivedHuntNumbers);
    nums.add(liveHuntNumber);
    return [...nums].sort((a, b) => b - a);
  }, [archivedHuntNumbers, liveHuntNumber]);

  const handleNavigate = useCallback((dir: 'first' | 'prev' | 'next' | 'last') => {
    if (!availableHuntNumbers.length) return;

    const orderedHunts = [...availableHuntNumbers].sort((a, b) => a - b); // oldest -> newest
    const current = huntData?.visibleId || huntIdOverride || liveHuntNumber;
    const currentIndex = orderedHunts.indexOf(current);

    const navigateTo = (target?: number) => {
      if (!target) return;
      if (target > latestHuntNumber) setHuntIdOverride(undefined);
      else setHuntIdOverride(target);
    };

    switch (dir) {
      case 'first':
        navigateTo(orderedHunts[0]);
        break;
      case 'last':
        navigateTo(orderedHunts[orderedHunts.length - 1]);
        break;
      case 'prev':
        if (currentIndex > 0) navigateTo(orderedHunts[currentIndex - 1]);
        break;
      case 'next':
        if (currentIndex >= 0 && currentIndex < orderedHunts.length - 1) {
          navigateTo(orderedHunts[currentIndex + 1]);
        }
        break;
    }
  }, [availableHuntNumbers, huntData?.visibleId, huntIdOverride, latestHuntNumber, liveHuntNumber]);

  const huntDate = huntData?.date
    ? new Date(huntData.date).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' }).toUpperCase()
    : '';

  const huntDateLong = huntData?.date
    ? new Date(huntData.date).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const casinoSlug = session?.casino_slug || huntVideo?.casinoSlug || 'spildansknu';
  const casinoName = huntVideo?.casinoName ?? 'SpilDanskNu';
  const sessionHost = session?.host || 'kevin';
  const avgX = huntData?.stats.averageX;
  const bonusCount = huntData?.stats.openedBonuses ?? 0;

  // SEO Meta – optimised for "bonus hunt Danmark"
  const seoTitle = "Bonus Hunt Danmark – Live Resultater & Community Bets";
  const seoDescription = "Deltag i live bonus hunts med dokumenterede resultater, gennemsnit X og community bets. Kun danske casinoer med licens.";

  // Structured data – Article + Person (Kevin) via unified @graph
  const articleSchema = useMemo(() => buildArticleSchema({
    headline: "Bonus Hunt Danmark – Dokumenterede resultater, gennemsnit X & Twitch arkiv",
    description: seoDescription,
    url: `${SITE_URL}/bonus-hunt`,
    datePublished: "2026-01-15",
    articleType: "Article",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
    authorSameAs: KEVIN_SAME_AS,
  }), [seoDescription]);

  const faqSchema = useMemo(() => buildBonusHuntFaqSchema(), []);

  const jsonLdSchemas = useMemo(() => [articleSchema, faqSchema], [articleSchema, faqSchema]);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        jsonLd={jsonLdSchemas}
        breadcrumbLabel="Bonus Hunt"
      />

      {/* SEO Hero with image + gradient overlay */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src={bonusHuntHero}
            alt="Bonus Hunt hero med slots, mønter og energifyldt casino-stemning"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, hsl(260 70% 25% / 0.88), hsl(250 60% 20% / 0.82) 40%, hsl(210 80% 25% / 0.86))',
            }}
          />
        </div>
        <div className="relative container py-14 md:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <h1 className="text-3xl font-bold tracking-tight leading-tight md:text-5xl md:leading-tight">
              Deltag i Danmarks mest dokumenterede Bonus Hunts
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              Se live bonus hunts, følg gennemsnit X og break-even analyser – og deltag i community bets i realtid.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-green-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                Live streams hver uge
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                100% dokumenterede resultater
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                Kun{" "}
                <Link to="/casino-licenser" className="font-medium text-white/90 hover:underline transition-all">
                  casinoer med dansk licens
                </Link>
              </span>
            </div>
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

        <div className="pt-6 md:pt-8 space-y-6" style={{ minHeight: '80vh' }}>
          {/* Author meta bar */}
          <AuthorMetaBar author="kevin" readTime="8 Min." />

          {/* Stat strip */}
          <BonusHuntStatStrip />


          {/* Main content */}
          {huntLoading ? (
            <div className="flex items-center justify-center py-20" style={{ minHeight: '600px' }}>
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
                    isArchived={isArchived}
                    availableHuntNumbers={availableHuntNumbers}
                    onNavigate={handleNavigate}
                    onJumpToHunt={(num) => num > latestHuntNumber ? setHuntIdOverride(undefined) : setHuntIdOverride(num || undefined)}
                  />
                  {isLive ? (
                    <BonusHuntLiveStream huntNumber={currentHuntNumber} />
                  ) : (
                    huntVideo && <BonusHuntVideoSection video={huntVideo} />
                  )}
                  {/* Slot table – directly under video */}
                  <BonusHuntSlotTable slots={huntData.slots} />
                  {/* SEO Content – process overview, right under slots */}
                  <BonusHuntSeoContent />
                  {/* Host card – visible on mobile only (below slot table) */}
                  <div className="xl:hidden">
                    <BonusHuntHostCard huntNumber={currentHuntNumber} host={sessionHost} />
                  </div>
                </div>

                {/* Right column (40%) */}
                <div className="lg:col-span-2 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
                  <Tabs defaultValue="coupon" className="w-full">
                    <TabsList className="w-full grid grid-cols-4">
                      <TabsTrigger value="coupon" className="text-[11px]">🎰 Kupon</TabsTrigger>
                      <TabsTrigger value="stats">STATS</TabsTrigger>
                      <TabsTrigger value="gtw">GTW</TabsTrigger>
                      <TabsTrigger value="avgx">AVG X</TabsTrigger>
                    </TabsList>
                    <TabsContent value="stats" forceMount className="data-[state=inactive]:hidden">
                      <BonusHuntStatsTab
                        data={huntData}
                        huntNumber={currentHuntNumber}
                        huntDate={huntDate}
                        isLive={isLive}
                        casinoSlug={casinoSlug}
                      />
                    </TabsContent>
                    <TabsContent value="gtw" forceMount className="data-[state=inactive]:hidden">
                      <BonusHuntGTWTab
                        session={isArchived ? null : session}
                        bets={gtwBets}
                        userId={user?.id}
                        openedBonuses={huntData?.stats?.openedBonuses || 0}
                        onBetPlaced={refreshBets}
                      />
                    </TabsContent>
                    <TabsContent value="avgx" forceMount className="data-[state=inactive]:hidden">
                      <BonusHuntAvgXTab
                        session={isArchived ? null : session}
                        bets={avgxBets}
                        userId={user?.id}
                        openedBonuses={huntData?.stats?.openedBonuses || 0}
                        onBetPlaced={refreshBets}
                      />
                    </TabsContent>
                    <TabsContent value="coupon" forceMount className="data-[state=inactive]:hidden">
                      <BonusHuntSlotCoupon
                        huntNumber={currentHuntNumber}
                        sessionId={session?.id}
                        isLive={isLive}
                        isArchived={isArchived}
                        huntSlots={huntData?.slots}
                        totalSlots={huntData?.stats.totalBonuses}
                        sessionMarkets={session?.coupon_markets as any}
                        couponOpen={session?.coupon_betting_open as boolean | undefined}
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

                  {/* Host card – fills remaining height in right column */}
                  <div className="hidden xl:block">
                    <BonusHuntHostCard huntNumber={currentHuntNumber} host={sessionHost} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              Ingen bonus hunt data tilgængelig
            </div>
          )}

          {/* Enterprise SEO text – full width, after main grid */}
          <BonusHuntSeoText />

          {/* Community cross-links – rendered eagerly for crawlability */}
          <BonusHuntCommunityLinks />

          {/* Top casinos CTA */}
          <BonusHuntTopCasinos />

          {/* Latest news – freshness signal */}
          <BonusHuntLatestNews />

          {/* Relaterede Guides – internal link hub */}
          <BonusHuntRelatedGuides />

          {/* FAQ Section – must be in DOM for schema match */}
          <BonusHuntFaq />

          {/* Brand block – E-E-A-T signal */}
          <CommunityBrandBlock />

          {/* Author bio – E-E-A-T signal (always last) */}
          <AuthorBio author="kevin" showCommunity={false} />

          <div className="pb-12" />
        </div>
        </div>
    </>
  );
}
