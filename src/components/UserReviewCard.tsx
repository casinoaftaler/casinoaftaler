import { useState } from "react";
import { Star, ThumbsUp, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { UserReview } from "@/hooks/useUserReviews";

interface UserReviewCardProps {
  review: UserReview;
  onHelpful: (reviewId: string) => Promise<void>;
  isLoggedIn: boolean;
}

export function UserReviewCard({ review, onHelpful, isLoggedIn }: UserReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const displayName = review.display_name || review.guest_name || "Anonym";
  const initial = displayName.charAt(0).toUpperCase();
  const isLong = review.review_text.length > 300;
  const text = isLong && !expanded ? review.review_text.slice(0, 300) + "..." : review.review_text;
  const date = new Date(review.created_at).toLocaleDateString("da-DK", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            {review.avatar_url ? (
              <img src={review.avatar_url} alt={displayName} className="h-full w-full object-cover" />
            ) : (
              <AvatarFallback className="text-sm bg-primary/10 text-primary">{initial}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{displayName}</span>
              {review.is_verified_player && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-500/40 text-green-400 gap-1">
                  <ShieldCheck className="h-3 w-3" /> Verificeret
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <div className="flex gap-0.5 shrink-0">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`h-4 w-4 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`}
            />
          ))}
        </div>
      </div>

      {review.title && <p className="font-semibold text-sm">{review.title}</p>}

      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{text}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:underline"
        >
          {expanded ? "Vis mindre" : "Læs mere"}
        </button>
      )}

      <div className="flex items-center gap-2 pt-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
          onClick={() => onHelpful(review.id)}
          disabled={!isLoggedIn}
          title={isLoggedIn ? "Marker som nyttig" : "Log ind for at stemme"}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          Nyttig {review.helpful_count > 0 && `(${review.helpful_count})`}
        </Button>
      </div>
    </div>
  );
}
