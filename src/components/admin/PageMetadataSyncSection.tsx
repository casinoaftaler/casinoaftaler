import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { seoRoutes } from "@/lib/seoRoutes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, CheckCircle, RefreshCw, Zap } from "lucide-react";
import { toast } from "sonner";

interface SyncIssue {
  type: "missing_in_db" | "orphaned_in_db" | "config_mismatch";
  path: string;
  detail: string;
}

interface DbPageMeta {
  path: string;
  priority: number;
  changefreq: string;
  show_updated_date: boolean;
}

const toSeedTimestamp = (isoDate?: string) =>
  isoDate ? `${isoDate}T00:00:00+01:00` : undefined;

export function PageMetadataSyncSection() {
  const [issues, setIssues] = useState<SyncIssue[] | null>(null);
  const [checking, setChecking] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const { data: dbPages, refetch } = useQuery({
    queryKey: ["sync-page-metadata"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_metadata")
        .select("path, priority, changefreq, show_updated_date");
      if (error) throw error;
      return data as DbPageMeta[];
    },
  });

  const runCheck = () => {
    if (!dbPages) return;
    setChecking(true);

    const dbMap = new Map(dbPages.map((page) => [page.path, page]));
    const codeSet = new Set(seoRoutes.map((route) => route.path));
    const found: SyncIssue[] = [];

    for (const route of seoRoutes) {
      const dbEntry = dbMap.get(route.path);
      const expectedShowUpdatedDate = route.showUpdatedDate !== false;

      if (!dbEntry) {
        found.push({
          type: "missing_in_db",
          path: route.path,
          detail: `Findes i seoRoutes.ts (priority ${route.priority}) men mangler i page_metadata`,
        });
        continue;
      }

      const mismatches: string[] = [];

      if (Math.abs(dbEntry.priority - route.priority) > 0.01) {
        mismatches.push(`priority kode ${route.priority} ≠ DB ${dbEntry.priority}`);
      }

      if (dbEntry.changefreq !== route.changefreq) {
        mismatches.push(`changefreq kode ${route.changefreq} ≠ DB ${dbEntry.changefreq}`);
      }

      if (dbEntry.show_updated_date !== expectedShowUpdatedDate) {
        mismatches.push(
          `show_updated_date kode ${expectedShowUpdatedDate} ≠ DB ${dbEntry.show_updated_date}`
        );
      }

      if (mismatches.length > 0) {
        found.push({
          type: "config_mismatch",
          path: route.path,
          detail: mismatches.join(" · "),
        });
      }
    }

    for (const dbPage of dbPages) {
      if (!codeSet.has(dbPage.path)) {
        found.push({
          type: "orphaned_in_db",
          path: dbPage.path,
          detail: "Findes i page_metadata men ikke i seoRoutes.ts",
        });
      }
    }

    setIssues(found);
    setChecking(false);
  };

  const runAutoSync = async () => {
    if (!issues || issues.length === 0) return;
    setSyncing(true);

    try {
      const missing = issues.filter((issue) => issue.type === "missing_in_db");
      const orphaned = issues.filter((issue) => issue.type === "orphaned_in_db");
      const mismatched = issues.filter((issue) => issue.type === "config_mismatch");

      if (missing.length > 0) {
        const rows = missing.map((issue) => {
          const route = seoRoutes.find((entry) => entry.path === issue.path)!;
          return {
            path: route.path,
            priority: route.priority,
            changefreq: route.changefreq,
            show_updated_date: route.showUpdatedDate !== false,
            updated_at: toSeedTimestamp(route.lastmod),
          };
        });

        const { error } = await supabase.from("page_metadata").insert(rows);
        if (error) throw error;
      }

      if (orphaned.length > 0) {
        const paths = orphaned.map((issue) => issue.path);
        const { error } = await supabase
          .from("page_metadata")
          .delete()
          .in("path", paths);
        if (error) throw error;
      }

      if (mismatched.length > 0) {
        const updates = mismatched.map(async (issue) => {
          const route = seoRoutes.find((entry) => entry.path === issue.path);
          if (!route) return;

          const { error } = await supabase
            .from("page_metadata")
            .update({
              priority: route.priority,
              changefreq: route.changefreq,
              show_updated_date: route.showUpdatedDate !== false,
            })
            .eq("path", route.path);

          if (error) throw error;
        });

        await Promise.all(updates);
      }

      toast.success(
        `Synkroniseret: ${missing.length} indsat, ${orphaned.length} slettet, ${mismatched.length} konfigurationer rettet`
      );
      await refetch();
      setIssues([]);
    } catch (err) {
      toast.error("Sync fejl: " + (err as Error).message);
    } finally {
      setSyncing(false);
    }
  };

  const badgeVariant = (type: SyncIssue["type"]) => {
    if (type === "missing_in_db") return "destructive" as const;
    if (type === "config_mismatch") return "secondary" as const;
    return "outline" as const;
  };

  const badgeLabel = (type: SyncIssue["type"]) => {
    if (type === "missing_in_db") return "Mangler i DB";
    if (type === "config_mismatch") return "Config mismatch";
    return "Orphaned i DB";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Sitemap Sync Check
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              seoRoutes.ts er source of truth for path, priority, changefreq og dato-visning.
            </p>
          </div>
          <div className="flex gap-2">
            {issues && issues.length > 0 && (
              <Button onClick={runAutoSync} disabled={syncing} size="sm" variant="default">
                {syncing ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-1 h-4 w-4" />
                )}
                Synkronisér nu
              </Button>
            )}
            <Button onClick={runCheck} disabled={!dbPages || checking} size="sm" variant="outline">
              {checking ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-1 h-4 w-4" />
              )}
              Kør check
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {issues === null ? (
          <p className="text-sm text-muted-foreground">Klik "Kør check" for at sammenligne.</p>
        ) : issues.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-primary">
            <CheckCircle className="h-4 w-4" />
            Alt er synkroniseret — ingen uoverensstemmelser fundet.
          </div>
        ) : (
          <div className="max-h-[400px] space-y-1 overflow-y-auto">
            <p className="mb-2 flex items-center gap-1 text-sm font-medium text-destructive">
              <AlertTriangle className="h-4 w-4" />
              {issues.length} uoverensstemmelse{issues.length > 1 ? "r" : ""} fundet
            </p>
            {issues.map((issue) => (
              <div
                key={`${issue.type}-${issue.path}`}
                className="flex items-center justify-between gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-xs">{issue.path}</span>
                  <span className="text-xs text-muted-foreground">{issue.detail}</span>
                </div>
                <Badge variant={badgeVariant(issue.type)} className="shrink-0 text-xs">
                  {badgeLabel(issue.type)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
