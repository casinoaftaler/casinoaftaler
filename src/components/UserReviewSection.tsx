import { Star, MessageSquare, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserReviewForm } from "@/components/UserReviewForm";
import { UserReviewCard } from "@/components/UserReviewCard";
import { useUserReviews, type SortOption } from "@/hooks/useUserReviews";
import { Separator } from "@/components/ui/separator";

interface UserReviewSectionProps {
  casinoSlug: string;
  casinoName: string;
}

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Nyeste",
  highest: "Højeste",
  lowest: "Laveste",
  helpful: "Mest nyttige",
};

function PlaceholderReviewCard() {
  return (
    <Card className="border-dashed border-muted opacity-40">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-2 w-16 rounded bg-muted" />
          </div>
          <div className="ml-auto flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-3 w-3 text-muted" />
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 w-full rounded bg-muted" />
          <div className="h-2.5 w-4/5 rounded bg-muted" />
          <div className="h-2.5 w-3/5 rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}

export function UserReviewSection({ casinoSlug, casinoName }: UserReviewSectionProps) {
  const {
    reviews,
    reviewsLoading,
    aggregate,
    sort,
    setSort,
    loadMore,
    hasMore,
    userHasReviewed,
    submitReview,
    submitLoading,
    submitSuccess,
    toggleHelpful,
    isLoggedIn,
  } = useUserReviews(casinoSlug);

  const avgRating = aggregate?.avg_rating ? Number(aggregate.avg_rating).toFixed(1) : null;
  const reviewCount = aggregate?.review_count ?? 0;

  return (
    <section className="mb-12" id="bruger-anmeldelser">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        Brugeranmeldelser af {casinoName}
      </h2>

      {/* Motivation copy */}
      <p className="text-sm text-muted-foreground mb-3">
        Din anmeldelse hjælper andre spillere med at vælge det rigtige casino.
      </p>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 mb-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> 100% ægte anmeldelser
        </span>
        <span className="flex items-center gap-1">
          <Eye className="h-3.5 w-3.5 text-primary" /> Modereres for spam
        </span>
        <span className="flex items-center gap-1">
          <EyeOff className="h-3.5 w-3.5 text-muted-foreground" /> Email vises ikke offentligt
        </span>
      </div>

      {/* Aggregate summary */}
      {reviewCount > 0 && avgRating && (
        <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-card border border-border">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{avgRating}</p>
            <div className="flex gap-0.5 justify-center mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${
                    s <= Math.round(Number(avgRating))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Baseret på <strong className="text-foreground">{reviewCount}</strong> brugeranmeldelse{reviewCount !== 1 ? "r" : ""}
            </p>
          </div>
        </div>
      )}

      {/* Submit form */}
      <div className="mb-8">
        <UserReviewForm
          casinoSlug={casinoSlug}
          casinoName={casinoName}
          onSubmit={submitReview}
          isLoading={submitLoading}
          isSuccess={submitSuccess}
          userHasReviewed={userHasReviewed}
          isLoggedIn={isLoggedIn}
        />
      </div>

      {/* Sort bar + reviews */}
      {reviewCount > 0 && (
        <>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm text-muted-foreground">Sortér:</span>
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <Button
                key={key}
                variant={sort === key ? "default" : "ghost"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setSort(key)}
              >
                {SORT_LABELS[key]}
              </Button>
            ))}
          </div>

          <Separator className="mb-4" />

          <div className="space-y-4">
            {reviews.map((review) => (
              <UserReviewCard
                key={review.id}
                review={review}
                onHelpful={toggleHelpful}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-6">
              <Button variant="outline" onClick={loadMore}>
                Vis flere anmeldelser
              </Button>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {reviewCount === 0 && !reviewsLoading && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center py-2">
            Vær den første til at anmelde {casinoName} – det tager kun 30 sekunder ⏱️
          </p>
          <div className="grid gap-3 sm:grid-cols-2 opacity-60 pointer-events-none">
            <PlaceholderReviewCard />
            <PlaceholderReviewCard />
          </div>
        </div>
      )}
    </section>
  );
}
