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

export function isCasinoReviewTrustPath(path: string) {
  return path === "/casino-anmeldelser" || path.startsWith("/casino-anmeldelser/");
}

export function getCasinoSlugFromPath(path: string) {
  const match = path.match(/^\/casino-anmeldelser\/([^/]+)$/);
  return match?.[1] ?? null;
}

export function getTrustRelevantPagePaths(slug: string) {
  return [`/casino-anmeldelser/${slug}`, "/casino-anmeldelser", "/casinoer"];
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

export function formatComplianceHistoryEntry(entry: CasinoComplianceHistoryItem) {
  return {
    id: entry.id,
    title: getComplianceFieldLabel(entry.field_changed),
    timestamp: formatTimestampDanish(entry.changed_at),
    before: formatComplianceValue(entry.old_value),
    after: formatComplianceValue(entry.new_value),
    sourceUrl: entry.source_url,
  };
}
