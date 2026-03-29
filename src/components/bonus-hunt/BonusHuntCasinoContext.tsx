import { Link } from "react-router-dom";
import { useCasinoBySlug } from "@/hooks/useCasinoBySlug";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { ArrowRight, Check } from "lucide-react";

interface BonusHuntCasinoContextProps {
  huntNumber: number;
  huntDate: string;
  bonusCount?: number;
  avgX?: number | null;
  isLive?: boolean;
  casinoSlug?: string;
}

export function BonusHuntCasinoContext({ huntNumber, huntDate, bonusCount, avgX, isLive = false, casinoSlug = "spildansknu" }: BonusHuntCasinoContextProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === casinoSlug);
  const logoUrl = casino?.logo_url;
  const displayName = casino?.name ?? casinoSlug;
  const reviewPath = `/casino-anmeldelser/${casinoSlug}`;

  const titles = [
    "Læs vores fulde anmeldelse af " + displayName,
    displayName + " anmeldelse 2026",
    "Læs live test og vurdering af " + displayName,
  ];
  const title = titles[huntNumber % titles.length];

  return (
    <section
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
      aria-label={isLive ? "Casino der testes i denne bonus hunt" : "Casino testet i denne bonus hunt"}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-5">
        {logoUrl && (
          <Link to={reviewPath} title={title} className="shrink-0 self-start">
            <img
              src={optimizeStorageImage(logoUrl, 160) ?? logoUrl}
              alt={`${displayName} logo`}
              width={72}
              height={72}
              loading="eager"
              className="h-[72px] w-[72px] rounded-xl object-contain bg-background/50 p-2 border border-border/50"
            />
          </Link>
        )}

        <div className="min-w-0 flex-1 space-y-2.5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
              {isLive ? "Casino der testes i denne bonus hunt" : "Casino testet i denne bonus hunt"}
            </p>
            <h2 className="text-lg font-bold text-foreground">
              <Link to={reviewPath} title={title} className="hover:text-primary transition-colors">
                {displayName}
              </Link>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {isLive
              ? `Bonus Hunt #${huntNumber} spilles live hos ${displayName} lige nu. Vi hunter forskellige bonusser og åbner dem live på streamen.`
              : `Bonus Hunt #${huntNumber}${huntDate ? ` blev spillet live hos ${displayName} d. ${huntDate}` : ` blev spillet live hos ${displayName}`}. Vi har huntet forskellige bonusser og åbnet dem live på streamen.`
            }
          </p>

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

          <Link
            to={reviewPath}
            title="Læs vores komplette anmeldelse med bonusvilkår og udbetalingstest"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 hover:scale-[1.03] hover:shadow-md hover:shadow-primary/25"
          >
            Læs fuld anmeldelse
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
