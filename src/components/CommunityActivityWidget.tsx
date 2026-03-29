import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCasinos } from "@/hooks/useCasinos";
import { optimizeStorageImage } from "@/lib/imageOptimization";

interface CommunityActivityWidgetProps {
  casinoName: string;
  casinoSlug: string;
}

function useRecentHunts() {
  return useQuery({
    queryKey: ["community-recent-hunts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("bonus_hunt_archives")
        .select("hunt_number, average_x, total_slots, opened_slots, created_at")
        .not("average_x", "is", null)
        .gt("total_slots", 0)
        .order("hunt_number", { ascending: false })
        .limit(3);

      return (data ?? []).map((h) => ({
        number: h.hunt_number,
        avgX: h.average_x != null ? Number(h.average_x) : null,
        totalSlots: h.total_slots,
        openedSlots: h.opened_slots,
        date: h.created_at
          ? new Date(h.created_at).toLocaleDateString("da-DK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : null,
      })).reverse();
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Anchor variation helpers – avoids >70% exact-match anchors.
 */
function getHuntAnchorText(
  hunt: { number: number; avgX: number | null; totalSlots: number | null; date: string | null },
  index: number,
  casinoName: string
) {
  const avgXStr = hunt.avgX != null ? `${hunt.avgX.toFixed(1)}x gennemsnit` : "";
  const slotsStr = hunt.totalSlots ? `over ${hunt.totalSlots} slots` : "";
  const dateStr = hunt.date ? ` (${hunt.date})` : "";

  // Rotate phrasing per index
  switch (index % 3) {
    case 0:
      return `Bonus Hunt #${hunt.number}${dateStr} – ${avgXStr} ${slotsStr}`.trim();
    case 1:
      return `Live test #${hunt.number} på ${casinoName}${dateStr} – ${avgXStr}`.trim();
    case 2:
    default:
      return `Hunt #${hunt.number}${dateStr} – ${avgXStr} ${slotsStr}`.trim();
  }
}

export function CommunityActivityWidget({ casinoName, casinoSlug }: CommunityActivityWidgetProps) {
  const { data: hunts, isLoading } = useRecentHunts();
  const { data: casinos } = useCasinos();

  const casino = casinos?.find((c) => c.slug === casinoSlug);
  const logoUrl = casino?.logo_url;

  if (isLoading || !hunts || hunts.length === 0) return null;

  return (
    <section className="mb-12" aria-label={`Seneste live tests på ${casinoName}`}>
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden">
        {/* Header with casino logo */}
        <div className="flex items-center gap-4 border-b border-border/50 px-6 py-5 md:px-8">
          {logoUrl && (
            <img
              src={optimizeStorageImage(logoUrl, 96) ?? logoUrl}
              alt={`${casinoName} logo`}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-xl object-contain bg-background/50 p-1"
            />
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold">Seneste live tests på {casinoName}</h2>
            <p className="text-sm text-muted-foreground">
              Vi tester løbende {casinoName} live på stream. Her er de seneste bonus hunts:
            </p>
          </div>
          <Badge variant="secondary" className="hidden shrink-0 text-xs sm:inline-flex">
            <Sparkles className="mr-1 h-3 w-3" />
            Live resultater
          </Badge>
        </div>

        {/* Text-based hunt links – crawlable, semantic, with anchor variation */}
        <div className="px-6 py-5 md:px-8">
          <ul className="space-y-3">
            {hunts.map((hunt, i) => (
              <li key={hunt.number}>
                <Link
                  to={`/bonus-hunt?hunt=${hunt.number}`}
                  title={`Bonus Hunt #${hunt.number} på ${casinoName}`}
                  className="text-primary underline decoration-primary/40 hover:decoration-primary hover:text-primary/80 transition-colors text-sm leading-relaxed"
                >
                  {getHuntAnchorText(hunt, i, casinoName)}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-muted-foreground">
            Data opdateres automatisk efter hver live-stream.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Vores testdata er baseret på live-streamede bonus hunts og opdateres løbende i 2026.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4 border-t border-border/50 px-6 py-4 md:px-8">
          <p className="flex-1 text-sm text-muted-foreground">
            Se alle live tests i vores{" "}
            <Link
              to="/bonus-hunt"
              className="text-primary underline hover:text-primary/80"
            >
              Bonus Hunt arkiv
            </Link>
            .
          </p>
          <Link
            to="/bonus-hunt"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Se alle bonus hunts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
