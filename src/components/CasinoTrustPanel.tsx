import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useCasinoPartner } from "@/hooks/useCasinoPartner";
import { usePageLastmod, formatTimestampDanish } from "@/hooks/usePageLastmod";
import { useCasinoTrust } from "@/hooks/useCasinoTrust";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import {
  formatComplianceHistoryEntry,
  getComplianceStatusLabel,
  isCasinoTrustHubPath,
  isCasinoTrustPath,
} from "@/lib/casinoTrust";
import { Clock3, ExternalLink, FileClock, Loader2, ShieldCheck } from "lucide-react";

interface CasinoTrustPanelProps {
  pagePath: string;
}

function TrustMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function TrustSourceLink({
  label,
  description,
  url,
}: {
  label: string;
  description: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-muted/20 p-3 transition-colors hover:border-primary/40 hover:bg-accent/40"
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{description}</p>
        <p className="mt-1 text-xs text-muted-foreground break-all">{url}</p>
      </div>
      <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
    </a>
  );
}

function TrustHistoryItem({
  casinoLabel,
  title,
  summary,
  timestamp,
  sourceLabel,
  sourceUrl,
}: {
  casinoLabel?: string;
  title: string;
  summary: string;
  timestamp: string;
  sourceLabel?: string;
  sourceUrl?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3 text-sm md:flex-row md:items-start md:justify-between">
      <div className="space-y-1">
        {casinoLabel ? <p className="font-medium capitalize text-foreground">{casinoLabel}</p> : null}
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-muted-foreground">{summary}</p>
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
          >
            {sourceLabel ?? "Kilde"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock3 className="h-3.5 w-3.5" />
        {timestamp}
      </div>
    </div>
  );
}

function getHubCopy(pagePath: string) {
  switch (pagePath) {
    case "/nye-casinoer":
      return {
        title: "Trust & friskhed for nye casinoer",
        description:
          "Denne hub overvåger nye lanceringer, licensstatus og bonusvilkår, så friskhedssignalerne bygger på reelle markedsændringer.",
        badge: "Nye lanceringer",
      };
    case "/casino-bonus":
      return {
        title: "Trust & friskhed for bonusmarkedet",
        description:
          "Denne hub samler de seneste verificeringer af bonuslofter, omsætningskrav og regulatoriske ændringer på tværs af markedet.",
        badge: "Bonus-overvågning",
      };
    default:
      return {
        title: "Trust & friskhed for casinomarkedet",
        description:
          "Denne hub viser seneste regulatoriske og redaktionelle kontrol på tværs af de licenserede operatører, vi tracker.",
        badge: "Markedsstatus",
      };
  }
}

export function CasinoTrustPanel({ pagePath }: CasinoTrustPanelProps) {
  const { user } = useAuth();
  const { data: pageMeta } = usePageLastmod(pagePath);
  const { compliance, summary, history, isLoading, casinoSlug } = useCasinoTrust(pagePath);
  const { data: partnerCasino } = useCasinoPartner(casinoSlug);
  const isHubPath = isCasinoTrustHubPath(pagePath);

  if (!isCasinoTrustPath(pagePath)) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className="mb-6 border-border bg-card/80">
        <CardContent className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Indlæser trust-signaler…
        </CardContent>
      </Card>
    );
  }

  if (!compliance && !summary && !pageMeta?.updated_at) {
    return null;
  }

  const historyEntries = history.map(formatComplianceHistoryEntry);
  const pageUpdatedAt = pageMeta?.updated_at ? formatTimestampDanish(pageMeta.updated_at) : "Ikke registreret";

  if (isHubPath) {
    const hubCopy = getHubCopy(pagePath);
    const lastChecked = summary?.lastChecked ? formatTimestampDanish(summary.lastChecked) : pageUpdatedAt;
    const lastVerified = summary?.lastVerified ? formatTimestampDanish(summary.lastVerified) : pageUpdatedAt;
    const trackedCount = summary?.totalTracked ?? 0;
    const validLicenses = summary?.validLicenses ?? 0;
    const bonusChecked = summary?.bonusCompliantCount ?? 0;

  const showPartnerCta = Boolean(casinoSlug && partnerCasino?.has_affiliate);

  return (
      <Card className="mb-6 border-border bg-card/80">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-5 w-5 text-primary" />
                {hubCopy.title}
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{hubCopy.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{hubCopy.badge}</Badge>
              {summary?.averageScore !== null && summary?.averageScore !== undefined && (
                <Badge variant="outline">Gns. score {summary.averageScore}/100</Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <TrustMetaItem label="Sporer" value={`${trackedCount} operatører`} />
            <TrustMetaItem label="Gyldige licenser" value={`${validLicenses}/${trackedCount || 0}`} />
            <TrustMetaItem label="Bonusvilkår kontrolleret" value={`${bonusChecked}/${trackedCount || 0}`} />
            <TrustMetaItem label="Senest markedstjek" value={lastChecked} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <TrustMetaItem label="Seneste verificering" value={lastVerified} />
            <TrustMetaItem label="Side opdateret" value={pageUpdatedAt} />
          </div>

          {historyEntries.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                  <FileClock className="h-4 w-4 text-primary" />
                  Seneste registrerede ændringer
                </div>
                <div className="space-y-2">
                  {historyEntries.map((entry) => (
                    <TrustHistoryItem
                      key={entry.id}
                      casinoLabel={entry.casinoLabel}
                      title={entry.title}
                      summary={entry.summary}
                      timestamp={entry.timestamp}
                      sourceLabel={entry.sourceLabel}
                      sourceUrl={entry.sourceUrl}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  const lastChecked = compliance?.last_checked ? formatTimestampDanish(compliance.last_checked) : pageUpdatedAt;
  const licenseVerifiedAt = compliance?.license_verified_at
    ? formatTimestampDanish(compliance.license_verified_at)
    : "Ikke registreret";
  const bonusVerifiedAt = compliance?.bonus_verified_at
    ? formatTimestampDanish(compliance.bonus_verified_at)
    : "Ikke registreret";

  return (
    <Card className="mb-6 border-border bg-card/80">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Trust & friskhed
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {compliance
                ? `Seneste regulatoriske og redaktionelle kontrol for ${compliance.casino_name}.`
                : casinoSlug
                  ? "Denne side er redaktionelt opdateret, men har endnu ikke et fuldt compliance-kort i databasen."
                  : "Denne side viser seneste redaktionelle opdatering og udvides med verificerede trust-signaler."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {compliance ? (
              <>
                <Badge variant={compliance.license_status === "valid" ? "default" : "destructive"}>
                  {getComplianceStatusLabel(compliance.license_status)} licens
                </Badge>
                <Badge variant={compliance.bonus_compliant ? "secondary" : "outline"}>
                  {compliance.bonus_compliant ? "Bonus kontrolleret" : "Bonus kræver review"}
                </Badge>
                <Badge variant="outline">Score {compliance.compliance_score}/100</Badge>
              </>
            ) : (
              <Badge variant="outline">Redaktionelt opdateret</Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <TrustMetaItem label="Sidst kontrolleret" value={lastChecked} />
          <TrustMetaItem label="Licens verificeret" value={licenseVerifiedAt} />
          <TrustMetaItem label="Bonus kontrolleret" value={bonusVerifiedAt} />
          <TrustMetaItem label="Side opdateret" value={pageUpdatedAt} />
        </div>

        {compliance ? (
          <div className="grid gap-3 md:grid-cols-2">
            <TrustSourceLink
              label="Officiel licenskilde"
              description="Verificeret mod Spillemyndighedens tilladelsesopslag"
              url={compliance.license_source_url}
            />
            <TrustSourceLink
              label="Bonusvilkår"
              description="Senest anvendte operatørkilde for bonus og vilkår"
              url={compliance.bonus_source_url}
            />
          </div>
        ) : null}

        {historyEntries.length > 0 && (
          <>
            <Separator />
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <FileClock className="h-4 w-4 text-primary" />
                Seneste registrerede ændringer
              </div>
              <div className="space-y-2">
                {historyEntries.map((entry) => (
                  <TrustHistoryItem
                    key={entry.id}
                    title={entry.title}
                    summary={entry.summary}
                    timestamp={entry.timestamp}
                    sourceLabel={entry.sourceLabel}
                    sourceUrl={entry.sourceUrl}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
