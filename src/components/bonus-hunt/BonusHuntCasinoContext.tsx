import { Link } from "react-router-dom";
import { useCasinos } from "@/hooks/useCasinos";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { ArrowRight, Check } from "lucide-react";

interface BonusHuntCasinoContextProps {
  huntNumber: number;
  huntDate: string;
  bonusCount?: number;
  avgX?: number | null;
}

/**
 * Premium Casino Context Card – links from Bonus Hunt → Casino Review.
 * Server-rendered, SEO-optimised with dofollow <a> links and anchor variation.
 */
export function BonusHuntCasinoContext({ huntNumber, huntDate, bonusCount, avgX }: BonusHuntCasinoContextProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === "spildansknu");
  const logoUrl = casino?.logo_url;

  // Rotate anchor text based on hunt number to ensure variation
  const anchors = [
    { text: "SpilDanskNu casino", title: "Læs vores fulde anmeldelse af SpilDanskNu" },
    { text: "vores SpilDanskNu anmeldelse", title: "SpilDanskNu anmeldelse 2026" },
    { text: "SpilDanskNu", title: "Læs live test og vurdering af SpilDanskNu" },
  ];
  const anchor = anchors[huntNumber % anchors.length];

  return (
    <section
      className="mb-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden"
      aria-label="Casino testet i denne bonus hunt"
    >
      <div className="flex flex-col sm:flex-row gap-5 p-5 md:p-6">
        {/* Casino logo */}
        {logoUrl && (
          <Link
            to="/casino-anmeldelser/spildansknu"
            title={anchor.title}
            className="shrink-0 self-start"
          >
            <img
              src={optimizeStorageImage(logoUrl, 160) ?? logoUrl}
              alt="SpilDanskNu logo"
              width={80}
              height={80}
              loading="eager"
              className="h-20 w-20 rounded-xl object-contain bg-background/50 p-2 border border-border/50"
            />
          </Link>
        )}

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
              Casino testet i denne bonus hunt
            </p>
            <h2 className="text-lg font-bold text-foreground">
              <Link
                to="/casino-anmeldelser/spildansknu"
                title={anchor.title}
                className="hover:text-primary transition-colors"
              >
                {anchor.text}
              </Link>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Bonus Hunt #{huntNumber}
            {huntDate ? ` blev spillet live hos SpilDanskNu d. ${huntDate}` : " blev spillet live hos SpilDanskNu"}
            . Vi har testet bonusvilkår, udbetalinger og platformens funktionalitet.
          </p>

          {/* Hunt summary points */}
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {bonusCount != null && bonusCount > 0 && (
              <li className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                {bonusCount} bonusser åbnet
              </li>
            )}
            {avgX != null && (
              <li className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                {avgX.toFixed(1)}x gennemsnit
              </li>
            )}
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary" />
              Live testet på stream
            </li>
          </ul>

          {/* Primary CTA */}
          <Link
            to="/casino-anmeldelser/spildansknu"
            title="Læs vores komplette anmeldelse med bonusvilkår og udbetalingstest"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Læs fuld anmeldelse
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
