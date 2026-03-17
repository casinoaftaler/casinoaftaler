import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { formatTimestampDanish } from "@/hooks/usePageLastmod";
import {
  formatComplianceHistoryEntry,
  formatComplianceValue,
  getComplianceFieldLabel,
  getComplianceStatusLabel,
  getTrustRelevantPagePaths,
  type CasinoComplianceHistoryItem,
  type CasinoComplianceRecord,
} from "@/lib/casinoTrust";
import { History, Loader2, RefreshCw, Save, Search, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

type LicenseStatus = CasinoComplianceRecord["license_status"];

interface TrustFormState {
  casino_name: string;
  license_holder_name: string;
  license_number: string;
  license_status: LicenseStatus;
  compliance_score: string;
  bonus_compliant: boolean;
  bonus_max_amount: string;
  bonus_wager_requirement: string;
  license_source_url: string;
  bonus_source_url: string;
  notes: string;
}

const EMPTY_SENTINEL = "__empty__";

function mapRecordToForm(record: CasinoComplianceRecord): TrustFormState {
  return {
    casino_name: record.casino_name,
    license_holder_name: record.license_holder_name ?? "",
    license_number: record.license_number,
    license_status: record.license_status,
    compliance_score: String(record.compliance_score ?? 0),
    bonus_compliant: record.bonus_compliant,
    bonus_max_amount: String(record.bonus_max_amount ?? 0),
    bonus_wager_requirement: String(record.bonus_wager_requirement ?? 0),
    license_source_url: record.license_source_url,
    bonus_source_url: record.bonus_source_url,
    notes: record.notes ?? "",
  };
}

function normalizeHistoryValue(value: unknown) {
  if (value === null || value === undefined || value === "") return EMPTY_SENTINEL;
  return String(value);
}

function buildHistoryRows(previous: CasinoComplianceRecord, next: CasinoComplianceRecord) {
  const changeConfig = [
    { field: "license_status", type: "license_change", source: next.license_source_url },
    { field: "license_number", type: "license_change", source: next.license_source_url },
    { field: "license_holder_name", type: "license_change", source: next.license_source_url },
    { field: "bonus_compliant", type: "bonus_change", source: next.bonus_source_url },
    { field: "bonus_max_amount", type: "bonus_change", source: next.bonus_source_url },
    { field: "bonus_wager_requirement", type: "wager_change", source: next.bonus_source_url },
  ] as const;

  return changeConfig
    .map(({ field, type, source }) => {
      const oldValue = normalizeHistoryValue(previous[field]);
      const newValue = normalizeHistoryValue(next[field]);

      if (oldValue === newValue) {
        return null;
      }

      return {
        casino_slug: next.casino_slug,
        field_changed: field,
        old_value: oldValue,
        new_value: newValue,
        change_type: type,
        source_url: source,
      };
    })
    .filter(Boolean);
}

async function touchRelatedPages(slug: string) {
  const paths = getTrustRelevantPagePaths(slug);
  const { error } = await supabase
    .from("page_metadata")
    .update({ updated_at: new Date().toISOString() })
    .in("path", paths);

  if (error) throw error;
}

export function CasinoTrustAdminSection() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [formState, setFormState] = useState<TrustFormState | null>(null);

  const { data: records, isLoading } = useQuery({
    queryKey: ["admin-casino-compliance"],
    queryFn: async (): Promise<CasinoComplianceRecord[]> => {
      const { data, error } = await supabase
        .from("casino_compliance")
        .select(
          "id, casino_name, casino_slug, license_holder_name, license_number, license_status, license_source_url, license_verified_at, bonus_compliant, bonus_max_amount, bonus_wager_requirement, bonus_source_url, bonus_verified_at, compliance_score, last_checked, notes, updated_at"
        )
        .order("casino_name");

      if (error) throw error;
      return (data ?? []) as CasinoComplianceRecord[];
    },
  });

  const filteredRecords = useMemo(() => {
    const term = search.toLowerCase().trim();
    return (records ?? []).filter(
      (record) =>
        record.casino_name.toLowerCase().includes(term) ||
        record.casino_slug.toLowerCase().includes(term)
    );
  }, [records, search]);

  useEffect(() => {
    if (!selectedSlug && filteredRecords.length > 0) {
      setSelectedSlug(filteredRecords[0].casino_slug);
    }
  }, [filteredRecords, selectedSlug]);

  const selectedRecord = useMemo(
    () => (records ?? []).find((record) => record.casino_slug === selectedSlug) ?? null,
    [records, selectedSlug]
  );

  useEffect(() => {
    if (selectedRecord) {
      setFormState(mapRecordToForm(selectedRecord));
    }
  }, [selectedRecord]);

  const { data: history } = useQuery({
    queryKey: ["admin-casino-compliance-history", selectedSlug],
    enabled: Boolean(selectedSlug),
    queryFn: async (): Promise<CasinoComplianceHistoryItem[]> => {
      const { data, error } = await supabase
        .from("casino_compliance_history")
        .select("id, casino_slug, field_changed, old_value, new_value, change_type, source_url, changed_at, created_at")
        .eq("casino_slug", selectedSlug!)
        .order("changed_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      return (data ?? []) as CasinoComplianceHistoryItem[];
    },
  });

  const invalidateTrustQueries = async (slug: string) => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin-casino-compliance"] }),
      queryClient.invalidateQueries({ queryKey: ["admin-casino-compliance-history", slug] }),
      queryClient.invalidateQueries({ queryKey: ["casino-trust", slug] }),
      queryClient.invalidateQueries({ queryKey: ["casino-trust-history", slug] }),
      queryClient.invalidateQueries({ queryKey: ["page-lastmod"] }),
    ]);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!selectedRecord || !formState) throw new Error("Vælg et casino først.");

      const updatePayload = {
        casino_name: formState.casino_name.trim(),
        license_holder_name: formState.license_holder_name.trim() || null,
        license_number: formState.license_number.trim(),
        license_status: formState.license_status,
        compliance_score: Number(formState.compliance_score || 0),
        bonus_compliant: formState.bonus_compliant,
        bonus_max_amount: Number(formState.bonus_max_amount || 0),
        bonus_wager_requirement: Number(formState.bonus_wager_requirement || 0),
        license_source_url: formState.license_source_url.trim(),
        bonus_source_url: formState.bonus_source_url.trim(),
        notes: formState.notes.trim() || null,
        last_checked: new Date().toISOString(),
      };

      const { data: updatedRecord, error } = await supabase
        .from("casino_compliance")
        .update(updatePayload)
        .eq("id", selectedRecord.id)
        .select(
          "id, casino_name, casino_slug, license_holder_name, license_number, license_status, license_source_url, license_verified_at, bonus_compliant, bonus_max_amount, bonus_wager_requirement, bonus_source_url, bonus_verified_at, compliance_score, last_checked, notes, updated_at"
        )
        .single();

      if (error) throw error;

      const typedUpdatedRecord = updatedRecord as CasinoComplianceRecord;
      const historyRows = buildHistoryRows(selectedRecord, typedUpdatedRecord);

      if (historyRows.length > 0) {
        const { error: historyError } = await supabase
          .from("casino_compliance_history")
          .insert(historyRows);

        if (historyError) throw historyError;
      }

      await touchRelatedPages(typedUpdatedRecord.casino_slug);
      return typedUpdatedRecord;
    },
    onSuccess: async (record) => {
      toast.success(`Trust-data gemt for ${record.casino_name}`);
      setFormState(mapRecordToForm(record));
      await invalidateTrustQueries(record.casino_slug);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const markVerifiedMutation = useMutation({
    mutationFn: async () => {
      if (!selectedRecord) throw new Error("Vælg et casino først.");
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("casino_compliance")
        .update({
          last_checked: now,
          license_verified_at: now,
          bonus_verified_at: now,
        })
        .eq("id", selectedRecord.id);

      if (error) throw error;
      await touchRelatedPages(selectedRecord.casino_slug);
      return selectedRecord.casino_slug;
    },
    onSuccess: async (slug) => {
      toast.success("Verificering registreret og sider opdateret");
      await invalidateTrustQueries(slug);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const touchMutation = useMutation({
    mutationFn: async () => {
      if (!selectedRecord) throw new Error("Vælg et casino først.");
      await touchRelatedPages(selectedRecord.casino_slug);
      return selectedRecord.casino_slug;
    },
    onSuccess: async (slug) => {
      toast.success("Relaterede sider er touch’et");
      await invalidateTrustQueries(slug);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Trust & Freshness Dashboard
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Opdatér compliance-data, historik og touch kun de sider, der reelt er påvirket.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => touchMutation.mutate()}
              disabled={!selectedRecord || touchMutation.isPending}
            >
              {touchMutation.isPending ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Zap className="mr-1 h-4 w-4" />}
              Touch sider
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => markVerifiedMutation.mutate()}
              disabled={!selectedRecord || markVerifiedMutation.isPending}
            >
              {markVerifiedMutation.isPending ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-1 h-4 w-4" />}
              Markér verificeret nu
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
            placeholder="Søg efter casino eller slug..."
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px,minmax(0,1fr)]">
          <div className="rounded-lg border border-border">
            <div className="max-h-[520px] overflow-y-auto p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Indlæser trust-data…
                </div>
              ) : filteredRecords.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">Ingen casinoer matcher søgningen.</p>
              ) : (
                filteredRecords.map((record) => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => setSelectedSlug(record.casino_slug)}
                    className={`w-full rounded-md border p-3 text-left transition-colors ${
                      selectedSlug === record.casino_slug
                        ? "border-primary bg-muted/40"
                        : "border-transparent hover:border-border hover:bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{record.casino_name}</p>
                        <p className="text-xs text-muted-foreground">/{record.casino_slug}</p>
                      </div>
                      <Badge variant={record.license_status === "valid" ? "default" : "destructive"}>
                        {getComplianceStatusLabel(record.license_status)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Score {record.compliance_score}/100</span>
                      <span>•</span>
                      <span>{record.bonus_compliant ? "Bonus godkendt" : "Bonus kræver review"}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border p-4">
            {!selectedRecord || !formState ? (
              <p className="text-sm text-muted-foreground">Vælg et casino for at redigere trust-data.</p>
            ) : (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{selectedRecord.casino_name}</h3>
                    <p className="text-sm text-muted-foreground">Relevante sider: {getTrustRelevantPagePaths(selectedRecord.casino_slug).join(", ")}</p>
                  </div>
                  <Badge variant="outline">Sidst tjekket {formatTimestampDanish(selectedRecord.last_checked)}</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="trust-casino-name">Casino navn</Label>
                    <Input
                      id="trust-casino-name"
                      value={formState.casino_name}
                      onChange={(event) => setFormState({ ...formState, casino_name: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-license-holder">Licensholder</Label>
                    <Input
                      id="trust-license-holder"
                      value={formState.license_holder_name}
                      onChange={(event) => setFormState({ ...formState, license_holder_name: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-license-number">Licensnummer</Label>
                    <Input
                      id="trust-license-number"
                      value={formState.license_number}
                      onChange={(event) => setFormState({ ...formState, license_number: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-license-status">Licensstatus</Label>
                    <select
                      id="trust-license-status"
                      value={formState.license_status}
                      onChange={(event) =>
                        setFormState({ ...formState, license_status: event.target.value as LicenseStatus })
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="valid">Gyldig</option>
                      <option value="suspended">Suspenderet</option>
                      <option value="revoked">Tilbagekaldt</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-score">Compliance score</Label>
                    <Input
                      id="trust-score"
                      type="number"
                      min="0"
                      max="100"
                      value={formState.compliance_score}
                      onChange={(event) => setFormState({ ...formState, compliance_score: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-bonus-max">Maks bonus</Label>
                    <Input
                      id="trust-bonus-max"
                      type="number"
                      min="0"
                      value={formState.bonus_max_amount}
                      onChange={(event) => setFormState({ ...formState, bonus_max_amount: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-bonus-wager">Omsætningskrav</Label>
                    <Input
                      id="trust-bonus-wager"
                      type="number"
                      min="0"
                      value={formState.bonus_wager_requirement}
                      onChange={(event) => setFormState({ ...formState, bonus_wager_requirement: event.target.value })}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">Bonus godkendt</p>
                      <p className="text-xs text-muted-foreground">Vises som trust-signal på anmeldelser.</p>
                    </div>
                    <Switch
                      checked={formState.bonus_compliant}
                      onCheckedChange={(checked) => setFormState({ ...formState, bonus_compliant: checked })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="trust-license-source">Licenskilde</Label>
                    <Input
                      id="trust-license-source"
                      value={formState.license_source_url}
                      onChange={(event) => setFormState({ ...formState, license_source_url: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-bonus-source">Bonuskilde</Label>
                    <Input
                      id="trust-bonus-source"
                      value={formState.bonus_source_url}
                      onChange={(event) => setFormState({ ...formState, bonus_source_url: event.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trust-notes">Interne noter</Label>
                  <Textarea
                    id="trust-notes"
                    value={formState.notes}
                    onChange={(event) => setFormState({ ...formState, notes: event.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid gap-3 rounded-lg border border-border bg-muted/20 p-3 text-sm md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Licens verificeret</p>
                    <p className="mt-1 font-medium text-foreground">
                      {selectedRecord.license_verified_at ? formatTimestampDanish(selectedRecord.license_verified_at) : "Ikke registreret"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Bonus verificeret</p>
                    <p className="mt-1 font-medium text-foreground">
                      {selectedRecord.bonus_verified_at ? formatTimestampDanish(selectedRecord.bonus_verified_at) : "Ikke registreret"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Sidst opdateret</p>
                    <p className="mt-1 font-medium text-foreground">{formatTimestampDanish(selectedRecord.updated_at)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Slug</p>
                    <p className="mt-1 font-medium text-foreground">/{selectedRecord.casino_slug}</p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending}
                  className="w-full"
                >
                  {saveMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Gem trust-data + touch sider
                </Button>

                <Separator />

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <History className="h-4 w-4 text-primary" />
                    Seneste historik
                  </div>
                  <div className="space-y-2">
                    {(history ?? []).length === 0 ? (
                      <p className="text-sm text-muted-foreground">Ingen ændringshistorik registreret endnu.</p>
                    ) : (
                      history?.map((entry) => {
                        const formatted = formatComplianceHistoryEntry(entry);
                        return (
                          <div key={entry.id} className="rounded-lg border border-border bg-muted/20 p-3 text-sm">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <p className="font-medium text-foreground">{formatted.title}</p>
                              <span className="text-xs text-muted-foreground">{formatted.timestamp}</span>
                            </div>
                            <p className="mt-1 text-muted-foreground">
                              {formatted.before} → {formatted.after}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Kilde: {formatted.sourceUrl || formatComplianceValue(EMPTY_SENTINEL)}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
