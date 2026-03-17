import { Link } from "react-router-dom";
import { ArrowRight, Radar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarketIntelligence } from "@/hooks/useMarketIntelligence";
import { formatTimestampDanish } from "@/hooks/usePageLastmod";
import {
  getMarketIntelligenceImpactLabel,
  getMarketIntelligenceImpactVariant,
  getMarketTeaserCopy,
} from "@/lib/marketIntelligence";

interface MarketIntelligenceTeaserProps {
  pagePath: string;
}

export function MarketIntelligenceTeaser({ pagePath }: MarketIntelligenceTeaserProps) {
  const { data } = useMarketIntelligence(2);

  if (!data?.snapshot && !data?.events.length) {
    return null;
  }

  const copy = getMarketTeaserCopy(pagePath);
  const lastChecked = data?.snapshot?.lastChecked
    ? formatTimestampDanish(data.snapshot.lastChecked)
    : null;

  return (
    <Card className="mb-8 border-border bg-card/80">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {copy.eyebrow}
            </p>
            <CardTitle className="mt-2 flex items-center gap-2 text-base">
              <Radar className="h-5 w-5 text-primary" />
              {copy.title}
            </CardTitle>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{copy.description}</p>
          </div>

          <Link
            to="/markedsindsigt"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Åbn hub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Sporer</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {data?.snapshot?.totalTracked ?? 0} operatører
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Gyldige licenser</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {data?.snapshot?.validLicenses ?? 0}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Seneste markedstjek</p>
            <p className="mt-1 text-sm font-medium text-foreground">{lastChecked ?? "Afventer"}</p>
          </div>
        </div>

        {data.events.length > 0 ? (
          <div className="space-y-2">
            {data.events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-muted/10 p-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <Badge variant={getMarketIntelligenceImpactVariant(event.impact_level)}>
                      {getMarketIntelligenceImpactLabel(event.impact_level)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestampDanish(event.published_at)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{event.headline}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Verificeret signal
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
