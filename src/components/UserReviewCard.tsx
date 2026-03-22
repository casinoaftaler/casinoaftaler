import { useState, useMemo } from "react";
import { Star, ThumbsUp, ShieldCheck, Zap, Gamepad2, Headphones, Gift, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { UserReview } from "@/hooks/useUserReviews";

interface UserReviewCardProps {
  review: UserReview;
  onHelpful: (reviewId: string) => Promise<void>;
  isLoggedIn: boolean;
}

// Keyword detection for subtle highlighting
const HIGHLIGHT_WORDS = [
  "bonus", "udbetaling", "udbetalinger", "support", "kundeservice",
  "free spins", "velkomstbonus", "omsætningskrav", "licens", "sikker",
  "hurtigt", "hurtige", "hurtig", "spiludvalg", "mobil",
];

// Quick-summary tag detection
const TAG_RULES: { keywords: string[]; label: string; icon: React.ReactNode }[] = [
  { keywords: ["hurtig", "hurtigt", "hurtige", "udbetaling", "udbetalinger"], label: "Hurtige udbetalinger", icon: <Zap className="h-3 w-3" /> },
  { keywords: ["spiludvalg", "spil", "slots", "spillemaskiner", "provider"], label: "Stort spiludvalg", icon: <Gamepad2 className="h-3 w-3" /> },
  { keywords: ["support", "kundeservice", "chat", "hjælp"], label: "God support", icon: <Headphones className="h-3 w-3" /> },
  { keywords: ["bonus", "velkomstbonus", "free spins", "gratis"], label: "Gode bonusser", icon: <Gift className="h-3 w-3" /> },
  { keywords: ["mobil", "app", "mobilvenlig"], label: "Mobilvenlig", icon: <Clock className="h-3 w-3" /> },
];

function detectTags(text: string): { label: string; icon: React.ReactNode }[] {
  const lower = text.toLowerCase();
  const matched: { label: string; icon: React.ReactNode }[] = [];
  for (const rule of TAG_RULES) {
    if (matched.length >= 3) break;
    if (rule.keywords.some(k => lower.includes(k))) {
      matched.push({ label: rule.label, icon: rule.icon });
    }
  }
  return matched;
}

function highlightText(text: string): React.ReactNode[] {
  // Build a regex that matches any highlight word (case-insensitive)
  const escaped = HIGHLIGHT_WORDS.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (regex.test(part)) {
      // Reset lastIndex after test
      regex.lastIndex = 0;
      return (
        <span key={i} className="font-semibold text-foreground">
          {part}
        </span>
      );
    }
    regex.lastIndex = 0;
    return <span key={i}>{part}</span>;
  });
}

export function UserReviewCard({ review, onHelpful, isLoggedIn }: UserReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const displayName = review.display_name || review.guest_name || "Anonym";
  const initial = displayName.charAt(0).toUpperCase();
  const isLong = review.review_text.length > 300;
  const rawText = isLong && !expanded ? review.review_text.slice(0, 300) + "..." : review.review_text;
  const date = new Date(review.created_at).toLocaleDateString("da-DK", {
    year: "numeric", month: "long", day: "numeric",
  });

  const tags = useMemo(() => detectTags(review.review_text), [review.review_text]);
  const highlightedText = useMemo(() => highlightText(rawText), [rawText]);

  return (
    <div className="border border-border/60 rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* ── HEADER ── */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/10">
            {review.avatar_url ? (
              <img src={review.avatar_url} alt={displayName} className="h-full w-full object-cover" />
            ) : (
              <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                {initial}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-foreground">{displayName}</span>
              {review.is_verified_player && (
                <Badge className="text-[10px] px-1.5 py-0.5 gap-1 bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-medium">
                  <ShieldCheck className="h-3 w-3" /> Verificeret spiller
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
          </div>
        </div>
        {/* Star rating */}
        <div className="flex gap-0.5 shrink-0 pt-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`h-4.5 w-4.5 ${
                s <= review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/20 fill-muted-foreground/5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── TITLE ── */}
      {review.title && (
        <div className="px-5 pb-2">
          <h4 className="text-base font-bold text-foreground leading-snug">{review.title}</h4>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="px-5 pb-3">
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line max-w-prose">
          {highlightedText}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary hover:underline mt-1.5 font-medium"
          >
            {expanded ? "Vis mindre" : "Læs mere"}
          </button>
        )}
      </div>

      {/* ── QUICK TAGS ── */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pb-3">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/8 text-primary/80 border border-primary/10"
            >
              {tag.icon}
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* ── FOOTER ── */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border/40 bg-muted/20">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-3 transition-colors"
          onClick={() => onHelpful(review.id)}
          disabled={!isLoggedIn}
          title={isLoggedIn ? "Marker som nyttig" : "Log ind for at stemme"}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          Var denne anmeldelse nyttig?
          {review.helpful_count > 0 && (
            <span className="ml-1 text-foreground/70 font-semibold">({review.helpful_count})</span>
          )}
        </Button>
      </div>
    </div>
  );
}
