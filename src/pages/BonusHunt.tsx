import { SEO } from "@/components/SEO";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BonusHuntSlotTable } from "@/components/bonus-hunt/BonusHuntSlotTable";
import { BonusHuntStatsTab } from "@/components/bonus-hunt/BonusHuntStatsTab";
import { BonusHuntGTWTab } from "@/components/bonus-hunt/BonusHuntGTWTab";
import { BonusHuntAvgXTab } from "@/components/bonus-hunt/BonusHuntAvgXTab";

import { BonusHuntCasinoContext } from "@/components/bonus-hunt/BonusHuntCasinoContext";
import { BonusHuntVideoSection, getHuntVideo } from "@/components/bonus-hunt/BonusHuntVideoSection";
import { BonusHuntResultSummary } from "@/components/bonus-hunt/BonusHuntResultSummary";
import { BonusHuntSeoContent } from "@/components/bonus-hunt/BonusHuntSeoContent";
import { BonusHuntHostCard } from "@/components/bonus-hunt/BonusHuntHostCard";
import { BonusHuntHeroBar } from "@/components/bonus-hunt/BonusHuntHeroBar";
import { useBonusHuntData, useLatestHuntNumber } from "@/hooks/useBonusHuntData";
import { useBonusHuntSession, useBonusHuntGtwBets, useBonusHuntAvgxBets } from "@/hooks/useBonusHuntSession";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Target, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";

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

  // SEO data from video or fallback
  const casinoName = huntVideo?.casinoName ?? 'SpilDanskNu';
  const avgX = huntData?.stats.averageX;
  const bonusCount = huntData?.stats.openedBonuses ?? 0;

  const seoTitle = huntData
    ? `Bonus Hunt #${currentHuntNumber} hos ${casinoName}${avgX ? ` – ${avgX.toFixed(1)}x snit & ${bonusCount} bonusser` : ''}`
    : 'Bonus Hunt – Gæt End Balance & Bet på AVG X';

  const seoDescription = huntData
    ? `Se vores live Bonus Hunt #${currentHuntNumber} hos ${casinoName}. Vi åbnede ${bonusCount} bonusser${avgX ? ` og opnåede ${avgX.toFixed(1)}x i gennemsnit` : ''}. Se Twitch VOD og fulde resultater.`
    : 'Følg live bonus hunts, gæt end balance (GTW) og bet på average multiplier grupper (AVG X). Vind StreamElements points og spillehal credits.';

  // Event schema
  const eventSchema = huntData ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Bonus Hunt #${currentHuntNumber} hos ${casinoName}`,
    "startDate": huntData.date || undefined,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": { "@type": "VirtualLocation", "url": "https://www.twitch.tv/casinoaftaler" },
    "organizer": { "@type": "Organization", "name": "Casinoaftaler.dk", "url": "https://casinoaftaler.dk" },
    "performer": { "@type": "Organization", "name": "Casinoaftaler.dk" },
    "description": seoDescription,
  } : undefined;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        jsonLd={eventSchema}
      />
      <CommunityPageLayout
        title="Bonus Hunt"
        description="Følg live bonus hunts, placer bets og vind præmier."
        badgeText="Live"
        badgeIcon={Target}
      >
        <div className="pt-8 md:pt-12">
          {huntLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : huntData ? (
            <div className="space-y-4">
              {/* Top grid – header in left col, stats in right col, same Y */}
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
                    isLive={currentHuntNumber > latestHuntNumber}
                    onNavigate={handleNavigate}
                    onJumpToHunt={(num) => num > latestHuntNumber ? setHuntIdOverride(undefined) : setHuntIdOverride(num || undefined)}
                  />
                  <BonusHuntCasinoContext
                    huntNumber={huntIdOverride || liveHuntNumber}
                    huntDate={huntDate}
                    bonusCount={huntData.stats.openedBonuses}
                    avgX={huntData.stats.averageX}
                  />
                  {huntVideo && <BonusHuntVideoSection video={huntVideo} />}
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

                  {huntVideo && <BonusHuntResultSummary video={huntVideo} />}

                  <div className="flex-1">
                    <BonusHuntHostCard huntNumber={currentHuntNumber} />
                  </div>
                </div>
              </div>


              {/* Slot table */}
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200">
                <BonusHuntSlotTable slots={huntData.slots} />
              </div>

              {/* SEO evergreen content */}
              <BonusHuntSeoContent />
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              Ingen bonus hunt data tilgængelig
            </div>
          )}
        </div>
      </CommunityPageLayout>
    </>
  );
}
