import { useState } from "react";
import { Star, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

const STAR_LABELS: Record<number, string> = {
  1: "Dårlig oplevelse",
  2: "Under middel",
  3: "Okay casino",
  4: "Rigtig godt",
  5: "Fantastisk casino",
};

const STEP_COUNT = 3;

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
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState("");

  if (isSuccess) {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Check className="h-6 w-6 text-green-400" />
            <p className="text-lg font-semibold text-green-400">Din anmeldelse er modtaget!</p>
          </div>
          <p className="text-sm text-muted-foreground">
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

  const handleSubmit = async () => {
    setError("");

    if (rating === 0) { setError("Vælg en rating (1-5 stjerner)"); setStep(1); return; }
    if (reviewText.length < 50) { setError("Anmeldelsen skal være mindst 50 tegn"); setStep(2); return; }
    if (reviewText.length > 2000) { setError("Anmeldelsen må maks. være 2000 tegn"); setStep(2); return; }
    if (!isLoggedIn && !guestName.trim()) { setError("Indtast dit navn"); return; }

    try {
      await onSubmit({
        casino_slug: casinoSlug,
        rating,
        review_text: reviewText,
        title: title || undefined,
        guest_name: !isLoggedIn ? guestName : undefined,
      });
    } catch (err: any) {
      setError(err?.message?.includes("duplicate")
        ? "Du har allerede anmeldt dette casino"
        : "Der opstod en fejl. Prøv igen.");
    }
  };

  const canGoNext = () => {
    if (step === 1) return rating > 0;
    if (step === 2) return reviewText.length >= 50;
    return true;
  };

  const nextStep = () => {
    setError("");
    if (step === 1 && rating === 0) { setError("Vælg en rating først"); return; }
    if (step === 2 && reviewText.length < 50) { setError("Skriv mindst 50 tegn"); return; }
    if (step < STEP_COUNT) setStep(step + 1);
  };

  const activeRating = hoverRating || rating;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          Del din oplevelse med {casinoName}
          {isLoggedIn && (
            <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">
              Verificeret spiller
            </Badge>
          )}
        </CardTitle>
        {/* Progress indicator */}
        <div className="flex items-center gap-3 mt-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
              <span className={`text-xs ${s <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Rating" : s === 2 ? "Anmeldelse" : "Afsend"}
              </span>
            </div>
          ))}
        </div>
        <Progress value={(step / STEP_COUNT) * 100} className="mt-2 h-1.5" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* STEP 1: Star rating */}
          {step === 1 && (
            <div className="space-y-3">
              <label className="text-sm font-medium block">Hvordan vurderer du {casinoName}?</label>
              <div className="flex gap-1 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-9 w-9 ${
                        star <= activeRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {activeRating > 0 && (
                <p className="text-sm font-medium text-primary">{STAR_LABELS[activeRating]}</p>
              )}
            </div>
          )}

          {/* STEP 2: Review text + title */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Show selected rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{STAR_LABELS[rating]}</span>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Titel <span className="text-muted-foreground font-normal">(valgfrit)</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="F.eks. 'God bonus, hurtige udbetalinger'"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Din anmeldelse <span className="text-muted-foreground font-normal">(min. 50 tegn)</span>
                </label>
                <Textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={"Beskriv din oplevelse...\n\n💰 Hvordan var udbetalingen?\n🎁 Var bonus fair?\n💬 Hvordan var supporten?"}
                  className="min-h-[140px]"
                  maxLength={2000}
                />
                <p className="text-xs text-muted-foreground mt-1">{reviewText.length}/2000 tegn</p>
              </div>
            </div>
          )}

          {/* STEP 3: Name (guest) or confirm (logged in) */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-4 w-4 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{STAR_LABELS[rating]}</span>
              </div>

              {title && <p className="text-sm font-medium">{title}</p>}
              <p className="text-sm text-muted-foreground line-clamp-3">{reviewText}</p>

              {!isLoggedIn ? (
                <div>
                  <label className="text-sm font-medium mb-1 block">Dit navn *</label>
                  <Input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Dit navn"
                    maxLength={100}
                  />
                </div>
              ) : displayName ? (
                <p className="text-sm text-muted-foreground">
                  Du indsender som <strong className="text-foreground">{displayName}</strong>
                </p>
              ) : null}
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            {step > 1 ? (
              <Button type="button" variant="ghost" size="sm" onClick={() => { setStep(step - 1); setError(""); }}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Tilbage
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground">Anmeldelser modereres inden publicering.</p>
            )}

            {step < STEP_COUNT ? (
              <Button type="button" onClick={nextStep} disabled={!canGoNext()}>
                Næste <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Sender..." : "Del din oplevelse"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
