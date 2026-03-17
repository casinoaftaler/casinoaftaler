import { formatTimestampDanish } from "@/hooks/usePageLastmod";

export interface CasinoComplianceRecord {
  id: string;
  casino_name: string;
  casino_slug: string;
  license_holder_name: string | null;
  license_number: string;
  license_status: "valid" | "suspended" | "revoked";
  license_source_url: string;
  license_verified_at: string | null;
  bonus_compliant: boolean;
  bonus_max_amount: number;
  bonus_wager_requirement: number;
  bonus_source_url: string;
  bonus_verified_at: string | null;
  compliance_score: number;
  last_checked: string;
  notes: string | null;
  updated_at: string;
  created_at?: string;
}

export interface CasinoComplianceHistoryItem {
  id: string;
  casino_slug: string;
  field_changed: string;
  old_value: string;
  new_value: string;
  change_type: string;
  source_url: string;
  changed_at: string;
  created_at: string;
}

export interface CasinoTrustHubSummary {
  totalTracked: number;
  validLicenses: number;
  bonusCompliantCount: number;
  averageScore: number | null;
  lastChecked: string | null;
  lastVerified: string | null;
}

const TRUST_HUB_PATHS = ["/casinoer", "/nye-casinoer", "/casino-bonus"] as const;

export function isCasinoReviewTrustPath(path: string) {
  return path === "/casino-anmeldelser" || path.startsWith("/casino-anmeldelser/");
}

export function isCasinoTrustHubPath(path: string) {
  return TRUST_HUB_PATHS.includes(path as (typeof TRUST_HUB_PATHS)[number]);
}

export function isCasinoTrustPath(path: string) {
  return isCasinoReviewTrustPath(path) || isCasinoTrustHubPath(path);
}

export function getCasinoSlugFromPath(path: string) {
  const match = path.match(/^\/casino-anmeldelser\/([^/]+)$/);
  return match?.[1] ?? null;
}

export function getTrustRelevantPagePaths(slug: string) {
  return [
    `/casino-anmeldelser/${slug}`,
    "/casino-anmeldelser",
    "/casinoer",
    "/nye-casinoer",
    "/casino-bonus",
  ];
}

export function buildTrustHubSummary(records: CasinoComplianceRecord[]): CasinoTrustHubSummary | null {
  if (records.length === 0) {
    return null;
  }

  const validLicenses = records.filter((record) => record.license_status === "valid").length;
  const bonusCompliantCount = records.filter((record) => record.bonus_compliant).length;
  const averageScore = Math.round(
    records.reduce((sum, record) => sum + (record.compliance_score ?? 0), 0) / records.length
  );

  const allVerificationDates = records.flatMap((record) => [record.license_verified_at, record.bonus_verified_at]);
  const lastVerified = allVerificationDates
    .filter((value): value is string => Boolean(value))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

  const lastChecked = records
    .map((record) => record.last_checked)
    .filter(Boolean)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

  return {
    totalTracked: records.length,
    validLicenses,
    bonusCompliantCount,
    averageScore: Number.isFinite(averageScore) ? averageScore : null,
    lastChecked,
    lastVerified,
  };
}

export function getComplianceFieldLabel(field: string) {
  const labels: Record<string, string> = {
    license_status: "Licensstatus",
    license_number: "Licensnummer",
    license_holder_name: "Licensholder",
    bonus_compliant: "Bonusvilkår",
    bonus_max_amount: "Maks bonus",
    bonus_wager_requirement: "Omsætningskrav",
    license_source_url: "Licenskilde",
    bonus_source_url: "Bonuskilde",
  };

  return labels[field] ?? field;
}

export function formatComplianceValue(value: string) {
  if (value === "true") return "Godkendt";
  if (value === "false") return "Ikke godkendt";
  if (value === "valid") return "Gyldig";
  if (value === "suspended") return "Suspenderet";
  if (value === "revoked") return "Tilbagekaldt";
  if (value === "__empty__") return "Ikke angivet";
  return value;
}

export function getComplianceStatusLabel(status: CasinoComplianceRecord["license_status"]) {
  return formatComplianceValue(status);
}

function getComplianceSourceLabel(field: string) {
  if (field === "license_source_url") return "Licenskilde";
  if (field === "bonus_source_url") return "Bonuskilde";
  if (field.startsWith("license")) return "Licenskilde";
  if (field.startsWith("bonus")) return "Bonuskilde";
  return "Kilde";
}

export function formatComplianceHistoryEntry(entry: CasinoComplianceHistoryItem) {
  const isSourceChange = entry.field_changed === "license_source_url" || entry.field_changed === "bonus_source_url";
  const before = formatComplianceValue(entry.old_value);
  const after = formatComplianceValue(entry.new_value);

  return {
    id: entry.id,
    title: getComplianceFieldLabel(entry.field_changed),
    timestamp: formatTimestampDanish(entry.changed_at),
    before,
    after,
    summary: isSourceChange ? `${getComplianceSourceLabel(entry.field_changed)} opdateret` : `${before} → ${after}`,
    showDiff: !isSourceChange,
    sourceLabel: getComplianceSourceLabel(entry.field_changed),
    sourceUrl: entry.source_url,
    casinoLabel: entry.casino_slug.replace(/-/g, " "),
  };
}
