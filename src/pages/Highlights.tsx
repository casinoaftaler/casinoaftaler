import { useState, useMemo } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { SEO } from "@/components/SEO";
import { useHighlights } from "@/hooks/useHighlights";
import { useApprovedClips, CommunityClipWithStats } from "@/hooks/useCommunityClips";
import { HighlightCard } from "@/components/HighlightCard";
import { HighlightFilterTabs } from "@/components/HighlightFilterTabs";
import { CommunityClipCard } from "@/components/community/CommunityClipCard";
import { CommunityClipDetail } from "@/components/community/CommunityClipDetail";
import { ClipSubmitForm } from "@/components/community/ClipSubmitForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Video, Search, Sparkles, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useSearchParams } from "react-router-dom";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { CommunityJoinCTA } from "@/components/community/CommunityJoinCTA";
import { CommunityFooterSeo } from "@/components/community/CommunityFooterSeo";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { HighlightsFaq, buildHighlightsFaqSchema } from "@/components/highlights/HighlightsFaq";
import { SITE_URL, buildArticleSchema, KEVIN_SAME_AS } from "@/lib/seo";

function HighlightsTab() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePlatform, setActivePlatform] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const categoryId = activeCategory === "all" ? undefined : activeCategory;
  const platform = activePlatform === "all" ? undefined : activePlatform;

  const { data: highlights, isLoading, error } = useHighlights(false, categoryId, platform);

  const filteredHighlights = useMemo(() => {
    if (!highlights) return [];
    if (!searchQuery.trim()) return highlights;
    const query = searchQuery.toLowerCase().trim();
    return highlights.filter((highlight) =>
      highlight.title.toLowerCase().includes(query) ||
      (highlight.description && highlight.description.toLowerCase().includes(query))
    );
  }, [highlights, searchQuery]);

  const handlePlayVideo = (id: string) => {
    setPlayingVideoId(id);
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8"><Skeleton className="mx-auto h-10 w-64" /></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive">Der opstod en fejl ved indlæsning af highlights.</p>;
  }

  const hasFilters = categoryId || platform || searchQuery.trim();

  return (
    <div className="space-y-6">
      {/* Filters – horizontal row above videos */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-auto sm:min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Søg efter highlights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <HighlightFilterTabs
          activeCategory={activeCategory}
          activePlatform={activePlatform}
          onCategoryChange={setActiveCategory}
          onPlatformChange={setActivePlatform}
        />
      </div>

      {/* Video grid */}
      {filteredHighlights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHighlights.map((highlight) => (
            <HighlightCard
              key={highlight.id}
              highlight={highlight}
              isPlaying={playingVideoId === highlight.id}
              onPlay={handlePlayVideo}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Video className="h-16 w-16 mb-4" />
          <p className="text-lg">
            {hasFilters ? "Ingen highlights matcher din søgning." : "Der er ingen highlights endnu."}
          </p>
          {searchQuery.trim() && (
            <button onClick={() => setSearchQuery("")} className="mt-2 text-sm text-primary hover:underline">
              Ryd søgning
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function CommunityTab() {
  const { user } = useAuth();
  const [selectedClip, setSelectedClip] = useState<CommunityClipWithStats | null>(null);
  const { data: clips, isLoading, error } = useApprovedClips();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive">Der opstod en fejl ved indlæsning af clips.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-center">
        {user ? (
          <ClipSubmitForm
            trigger={
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Indsend din Clip
              </Button>
            }
          />
        ) : (
          <Button size="lg" asChild>
            <Link to="/auth">Log ind for at indsende</Link>
          </Button>
        )}
      </div>

      {clips && clips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clips.map((clip) => (
            <CommunityClipCard
              key={clip.id}
              clip={clip}
              onOpenDetail={setSelectedClip}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Video className="h-16 w-16 mb-4" />
          <p className="text-lg mb-2">Ingen clips endnu</p>
          <p className="text-sm">Vær den første til at dele et highlight!</p>
        </div>
      )}

      <CommunityClipDetail
        clip={selectedClip}
        open={!!selectedClip}
        onOpenChange={(open) => !open && setSelectedClip(null)}
      />
    </div>
  );
}

export default function Highlights() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "community" ? "community" : "highlights";

  const seoDescription = "Se de bedste casino stream-øjeblikke og bruger-indsendte highlights. Twitch clips, YouTube videoer og community clips samlet ét sted.";

  const articleSchema = useMemo(() => buildArticleSchema({
    headline: "Highlights & Community Clips – De bedste stream-øjeblikke",
    description: seoDescription,
    url: `${SITE_URL}/highlights`,
    datePublished: "2026-01-20",
    articleType: "Article",
    authorName: "Kevin",
    authorUrl: `${SITE_URL}/forfatter/kevin`,
    authorSameAs: KEVIN_SAME_AS,
  }), [seoDescription]);

  const faqSchema = useMemo(() => buildHighlightsFaqSchema(), []);
  const jsonLdSchemas = useMemo(() => [articleSchema, faqSchema], [articleSchema, faqSchema]);

  return (
    <>
      <SEO
        title="Highlights & Community Clips | Casinoaftaler"
        description={seoDescription}
        jsonLd={jsonLdSchemas}
        breadcrumbLabel="Highlights"
      />
      <CommunityPageLayout
        title="Highlights"
        description="Se de bedste øjeblikke fra vores streams og community! Twitch clips, YouTube videoer og bruger-indsendte highlights samlet ét sted."
        badgeText="Stream & Community"
        badgeIcon={Sparkles}
      >
        <div className="py-8 md:py-12 space-y-8">

          <AuthorMetaBar author="kevin" showAffiliateDisclaimer={false} />

          <SnippetAnswer answer="Se de bedste stream-øjeblikke fra Twitch og YouTube – episke bonus-åbninger, massive multipliers og community clips. Upload dine egne highlights og optjen bonus spins." />

          {!user && <CommunityJoinCTA />}

          {/* ── Redaktionel intro ── */}
          <section className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
            <h2 className="text-base font-bold text-foreground">
              Hvad er Highlights & Community Clips?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Highlights er vores kurerede samling af de bedste stream-øjeblikke fra{" "}
              <Link to="/bonus-hunt" className="text-primary hover:underline">bonus hunts</Link> og
              casino-streams på Twitch og YouTube. Her finder du alt fra episke bonus-åbninger og massive multipliers
              til sjove fejltagelser og uforglemmelige reaktioner. Community Clips-fanen giver{" "}
              <strong>dig og resten af vores community</strong> mulighed for at dele jeres egne highlights –
              godkendte clips belønnes med ekstra spins til vores{" "}
              <Link to="/community/spin-the-reel" className="text-primary hover:underline">Spin the Reel</Link>-funktion.
              Alle clips gennemgår en godkendelsesproces i henhold til vores retningslinjer for{" "}
              <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link>.
            </p>
          </section>

          {/* ── Tabs ── */}
          <Tabs defaultValue={defaultTab} className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList>
                <TabsTrigger value="highlights" className="gap-2">
                  <Video className="h-4 w-4" />
                  Highlights
                </TabsTrigger>
                <TabsTrigger value="community" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Community Clips
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="highlights">
              <HighlightsTab />
            </TabsContent>
            <TabsContent value="community">
              <CommunityTab />
            </TabsContent>
          </Tabs>

          {/* Footer SEO – anti-footprint rotated */}
          <CommunityFooterSeo
            currentPath="/highlights"
            author="kevin"
            after={<HighlightsFaq />}
          />
        </div>
      </CommunityPageLayout>
    </>
  );
}
