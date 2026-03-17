import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePageLastmod, formatTimestampDanish } from "@/hooks/usePageLastmod";
import { useCasinoTrust } from "@/hooks/useCasinoTrust";
import {
  formatComplianceHistoryEntry,
  getComplianceStatusLabel,
  isCasinoReviewTrustPath,
} from "@/lib/casinoTrust";
import { Clock3, FileClock, Loader2, ShieldCheck } from "lucide-react";

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

export function CasinoTrustPanel({ pagePath }: CasinoTrustPanelProps) {
  const { data: pageMeta } = usePageLastmod(pagePath);
  const { compliance, history, isLoading, casinoSlug } = useCasinoTrust(pagePath);

  if (!isCasinoReviewTrustPath(pagePath)) {
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

  if (!compliance && !pageMeta?.updated_at) {
    return null;
  }

  const historyEntries = history.map(formatComplianceHistoryEntry);
  const pageUpdatedAt = pageMeta?.updated_at ? formatTimestampDanish(pageMeta.updated_at) : "Ikke registreret";
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
                  : "Denne hub viser seneste redaktionelle opdatering og udvides med verificerede trust-signaler pr. casino."}
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
                  <div
                    key={entry.id}
                    className="flex flex-col gap-1 rounded-lg border border-border bg-muted/20 p-3 text-sm md:flex-row md:items-start md:justify-between"
                  >
                    <div>
                      <p className="font-medium text-foreground">{entry.title}</p>
                      <p className="text-muted-foreground">
                        {entry.before} → {entry.after}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                      {entry.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
