import { useState } from "react";
import { useHighlights } from "@/hooks/useHighlights";
import { HighlightCard } from "@/components/HighlightCard";
import { HighlightFilterTabs } from "@/components/HighlightFilterTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Video } from "lucide-react";

const description = "Se de bedste øjeblikke fra vores streams! Her finder du de fedeste Twitch clips og YouTube videoer, håndplukket til dig.";

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
              <Video className="h-12 w-12" />
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

export default function Highlights() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePlatform, setActivePlatform] = useState("all");
  
  const categoryId = activeCategory === "all" ? undefined : activeCategory;
  const platform = activePlatform === "all" ? undefined : activePlatform;
  
  const { data: highlights, isLoading, error } = useHighlights(false, categoryId, platform);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <HighlightsHero />
        <div className="py-16">
          <div className="container">
            <div className="mb-8">
              <Skeleton className="mx-auto h-10 w-64" />
            </div>
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
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <HighlightsHero />
        <div className="py-16">
          <div className="container">
            <p className="text-destructive">Der opstod en fejl ved indlæsning af highlights.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HighlightsHero />
      <div className="py-16">
        <div className="container">
          <div className="mb-8">
            <HighlightFilterTabs
              activeCategory={activeCategory}
              activePlatform={activePlatform}
              onCategoryChange={setActiveCategory}
              onPlatformChange={setActivePlatform}
            />
          </div>
          {highlights && highlights.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {highlights.map((highlight) => (
                <HighlightCard key={highlight.id} highlight={highlight} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Video className="h-16 w-16 mb-4" />
              <p className="text-lg">
                {(categoryId || platform)
                  ? "Der er ingen highlights i denne kategori." 
                  : "Der er ingen highlights endnu."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
