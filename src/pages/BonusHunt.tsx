import { SEO } from "@/components/SEO";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { BonusHuntSlotTable } from "@/components/bonus-hunt/BonusHuntSlotTable";
import { BonusHuntStatsTab } from "@/components/bonus-hunt/BonusHuntStatsTab";
import { BonusHuntGTWTab } from "@/components/bonus-hunt/BonusHuntGTWTab";
import { BonusHuntAvgXTab } from "@/components/bonus-hunt/BonusHuntAvgXTab";
import { BonusHuntFooter } from "@/components/bonus-hunt/BonusHuntFooter";
import { BonusHuntHero } from "@/components/bonus-hunt/BonusHuntHero";
import { BonusHuntVideoSection, getHuntVideo } from "@/components/bonus-hunt/BonusHuntVideoSection";
import { BonusHuntTopMoments } from "@/components/bonus-hunt/BonusHuntTopMoments";
import { BonusHuntMomentumBar } from "@/components/bonus-hunt/BonusHuntMomentumBar";
import { BonusHuntCommunity } from "@/components/bonus-hunt/BonusHuntCommunity";
import { BonusHuntCasinoContext } from "@/components/bonus-hunt/BonusHuntCasinoContext";
import { useBonusHuntData, useLatestHuntNumber } from "@/hooks/useBonusHuntData";
import { useBonusHuntSession, useBonusHuntGtwBets, useBonusHuntAvgxBets } from "@/hooks/useBonusHuntSession";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Target, Loader2, ChevronDown, TableProperties } from "lucide-react";
import { useState, useCallback } from "react";

export default function BonusHunt() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [huntIdOverride, setHuntIdOverride] = useState<number | undefined>();
  const [tableOpen, setTableOpen] = useState(false);

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
  const maxHuntNumber = Math.max(latestHuntNumber, liveHuntNumber);
  const huntVideo = getHuntVideo(currentHuntNumber);

  const handleNavigate = useCallback((dir: 'first' | 'prev' | 'next' | 'last') => {
    if (!huntData) return;
    const current = huntIdOverride || liveHuntNumber;
    switch (dir) {
      case 'prev': if (current > 1) setHuntIdOverride(current - 1); break;
      case 'next': 
        if (current < maxHuntNumber) setHuntIdOverride(current + 1);
        if (current + 1 > latestHuntNumber) setHuntIdOverride(undefined);
        break;
      case 'first': setHuntIdOverride(1); break;
      case 'last': setHuntIdOverride(undefined); break;
    }
  }, [huntData, huntIdOverride, latestHuntNumber, liveHuntNumber, maxHuntNumber]);

  const huntDate = huntData?.date
    ? new Date(huntData.date).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' }).toUpperCase()
    : '';

  return (
    <>
      <SEO
        title="Bonus Hunt – Gæt End Balance & Bet på AVG X"
        description="Følg live bonus hunts, gæt end balance (GTW) og bet på average multiplier grupper (AVG X). Vind StreamElements points og spillehal credits."
      />
      <CommunityPageLayout
        title="Bonus Hunt"
        description="Følg live bonus hunts, placer bets og vind præmier."
        badgeText="Live"
        badgeIcon={Target}
        showHero={false}
      >
        <div className="py-6 md:py-8">
          {huntLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : huntData ? (
            <div className="space-y-6">
              {/* === HERO: The event headline === */}
              <BonusHuntHero
                huntNumber={currentHuntNumber}
                huntDate={huntDate}
                data={huntData}
                latestHuntNumber={latestHuntNumber}
                maxHuntNumber={maxHuntNumber}
                onNavigate={handleNavigate}
                onJumpToHunt={(num) => num > latestHuntNumber ? setHuntIdOverride(undefined) : setHuntIdOverride(num || undefined)}
              />

              {/* === VIDEO: Centerpiece (if available) === */}
              {huntVideo && <BonusHuntVideoSection video={huntVideo} />}

              {/* === Two-column: Storytelling + Betting === */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: Storytelling flow */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Top Moments */}
                  <BonusHuntTopMoments slots={huntData.slots} />

                  {/* Momentum Bar */}
                  <BonusHuntMomentumBar stats={huntData.stats} />

                  {/* Community */}
                  <BonusHuntCommunity
                    huntNumber={currentHuntNumber}
                    twitchVideoId={huntVideo?.twitchVideoId}
                  />

                  {/* Collapsible full slot table */}
                  <Collapsible open={tableOpen} onOpenChange={setTableOpen}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <TableProperties className="h-4 w-4" />
                        {tableOpen ? "Skjul alle slots" : `Se alle ${huntData.stats.totalBonuses} slots`}
                        <ChevronDown className={`h-4 w-4 transition-transform ${tableOpen ? "rotate-180" : ""}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-4">
                      <BonusHuntSlotTable
                        slots={huntData.slots}
                        huntNumber={currentHuntNumber}
                        huntDate={huntDate}
                        latestHuntNumber={latestHuntNumber}
                        maxHuntNumber={maxHuntNumber}
                        onNavigate={handleNavigate}
                        onJumpToHunt={(num) => num > latestHuntNumber ? setHuntIdOverride(undefined) : setHuntIdOverride(num || undefined)}
                      />
                      <BonusHuntFooter stats={huntData.stats} />
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Casino CTA (bottom of story) */}
                  <BonusHuntCasinoContext
                    huntNumber={currentHuntNumber}
                    huntDate={huntDate}
                    bonusCount={huntData.stats.openedBonuses}
                    avgX={huntData.stats.averageX}
                  />
                </div>

                {/* Right column: Betting tabs */}
                <div className="lg:col-span-2">
                  <div className="sticky top-24">
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
                  </div>
                </div>
              </div>
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
