import { useState } from "react";
import { useApprovedClips, CommunityClipWithStats } from "@/hooks/useCommunityClips";
import { CommunityClipCard } from "@/components/community/CommunityClipCard";
import { CommunityClipDetail } from "@/components/community/CommunityClipDetail";
import { ClipSubmitForm } from "@/components/community/ClipSubmitForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Video, Sparkles, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

function CommunityHighlightsHero() {
  const { user } = useAuth();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(280 70% 25%), hsl(270 60% 20%) 40%, hsl(320 80% 25%))",
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
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Community Highlights
          </h1>
          <p className="text-base text-white/80 mb-6">
            Del dine bedste øjeblikke med hele communityet! Indsend dine fedeste
            Twitch clips og YouTube videoer, og se hvad andre har delt.
          </p>
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
      </div>
    </section>
  );
}

export default function CommunityHighlights() {
  const [selectedClip, setSelectedClip] = useState<CommunityClipWithStats | null>(null);
  const { data: clips, isLoading, error } = useApprovedClips();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <CommunityHighlightsHero />
        <div className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <CommunityHighlightsHero />
        <div className="py-16">
          <div className="container">
            <p className="text-destructive">
              Der opstod en fejl ved indlæsning af clips.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CommunityHighlightsHero />
      <div className="py-16">
        <div className="container">
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
        </div>
      </div>

      <CommunityClipDetail
        clip={selectedClip}
        open={!!selectedClip}
        onOpenChange={(open) => !open && setSelectedClip(null)}
      />
    </div>
  );
}
