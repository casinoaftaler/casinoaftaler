import { useState, useMemo } from "react";
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

const description = "Se de bedste øjeblikke fra vores streams og community! Twitch clips, YouTube videoer og bruger-indsendte highlights samlet ét sted.";

function HighlightsHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(280 70% 25%), hsl(270 60% 20%) 40%, hsl(320 80% 25%))',
        }}
      />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[hsl(320_80%_60%)] blur-xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[hsl(280_70%_60%)] blur-xl" />
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/10 p-4">
              <Sparkles className="h-12 w-12" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Highlights</h1>
          <p className="text-base text-white/80">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

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
    <div>
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Søg efter highlights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-8">
        <HighlightFilterTabs
          activeCategory={activeCategory}
          activePlatform={activePlatform}
          onCategoryChange={setActiveCategory}
          onPlatformChange={setActivePlatform}
        />
      </div>

      {filteredHighlights.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
      <div className="mb-6 flex justify-center">
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
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "community" ? "community" : "highlights";

  return (
    <div className="min-h-screen">
      <HighlightsHero />
      <div className="py-16">
        <div className="container">
          <Tabs defaultValue={defaultTab} className="w-full">
            <div className="flex justify-center mb-8">
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
        </div>
      </div>
    </div>
  );
}
