import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
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

      {/* Sort bar */}
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

          {/* Reviews list */}
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

      {reviewCount === 0 && !reviewsLoading && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Ingen brugeranmeldelser endnu. Vær den første til at anmelde {casinoName}!
        </p>
      )}
    </section>
  );
}
