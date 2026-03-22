import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SubmitReviewData } from "@/hooks/useUserReviews";

interface UserReviewFormProps {
  casinoSlug: string;
  casinoName: string;
  onSubmit: (data: SubmitReviewData) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  userHasReviewed: boolean;
  isLoggedIn: boolean;
  displayName?: string | null;
}

export function UserReviewForm({
  casinoSlug,
  casinoName,
  onSubmit,
  isLoading,
  isSuccess,
  userHasReviewed,
  isLoggedIn,
  displayName,
}: UserReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [error, setError] = useState("");

  if (isSuccess) {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-semibold text-green-400">✅ Din anmeldelse er modtaget!</p>
          <p className="text-sm text-muted-foreground mt-2">
            Den afventer godkendelse og vil blive vist, når den er gennemgået.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (userHasReviewed) {
    return (
      <Card className="border-muted">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Du har allerede anmeldt {casinoName}.</p>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) { setError("Vælg en rating (1-5 stjerner)"); return; }
    if (reviewText.length < 50) { setError("Anmeldelsen skal være mindst 50 tegn"); return; }
    if (reviewText.length > 2000) { setError("Anmeldelsen må maks. være 2000 tegn"); return; }
    if (!isLoggedIn && !guestName.trim()) { setError("Indtast dit navn"); return; }

    try {
      await onSubmit({
        casino_slug: casinoSlug,
        rating,
        review_text: reviewText,
        title: title || undefined,
        guest_name: !isLoggedIn ? guestName : undefined,
        guest_email: !isLoggedIn ? guestEmail : undefined,
      });
    } catch (err: any) {
      setError(err?.message?.includes("duplicate") 
        ? "Du har allerede anmeldt dette casino" 
        : "Der opstod en fejl. Prøv igen.");
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          Skriv en anmeldelse af {casinoName}
          {isLoggedIn && (
            <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">
              Verificeret spiller
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star rating */}
          <div>
            <label className="text-sm font-medium mb-2 block">Din vurdering *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 ${
                      star <= activeRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="text-sm text-muted-foreground ml-2 self-center">{rating}/5</span>
              )}
            </div>
          </div>

          {/* Guest fields */}
          {!isLoggedIn && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Navn *</label>
                <Input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Dit navn"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">E-mail * <span className="text-muted-foreground font-normal">(vises ikke offentligt)</span></label>
                <Input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="din@email.dk"
                />
              </div>
            </div>
          )}

          {/* Logged in user info */}
          {isLoggedIn && displayName && (
            <p className="text-sm text-muted-foreground">
              Du skriver som <strong className="text-foreground">{displayName}</strong>
            </p>
          )}

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-1 block">Titel <span className="text-muted-foreground font-normal">(valgfrit)</span></label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="F.eks. 'God bonus, hurtige udbetalinger'"
              maxLength={100}
            />
          </div>

          {/* Review text */}
          <div>
            <label className="text-sm font-medium mb-1 block">Din anmeldelse * <span className="text-muted-foreground font-normal">(min. 50 tegn)</span></label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Beskriv din oplevelse med dette casino..."
              className="min-h-[120px]"
              maxLength={2000}
            />
            <p className="text-xs text-muted-foreground mt-1">{reviewText.length}/2000 tegn</p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Anmeldelser modereres inden publicering.
            </p>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sender..." : "Indsend anmeldelse"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
