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
  type: "missing_in_db" | "orphaned_in_db" | "priority_mismatch";
  path: string;
  detail: string;
}

export function PageMetadataSyncSection() {
  const [issues, setIssues] = useState<SyncIssue[] | null>(null);
  const [checking, setChecking] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const { data: dbPages, refetch } = useQuery({
    queryKey: ["sync-page-metadata"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_metadata")
        .select("path, priority, changefreq");
      if (error) throw error;
      return data;
    },
  });

  const runCheck = () => {
    if (!dbPages) return;
    setChecking(true);

    const dbMap = new Map(dbPages.map((p) => [p.path, p]));
    const codeSet = new Set(seoRoutes.map((r) => r.path));
    const found: SyncIssue[] = [];

    for (const route of seoRoutes) {
      const dbEntry = dbMap.get(route.path);
      if (!dbEntry) {
        found.push({
          type: "missing_in_db",
          path: route.path,
          detail: `Findes i seoRoutes.ts (priority ${route.priority}) men mangler i page_metadata`,
        });
      } else if (Math.abs(dbEntry.priority - route.priority) > 0.01) {
        found.push({
          type: "priority_mismatch",
          path: route.path,
          detail: `Kode: ${route.priority} ≠ DB: ${dbEntry.priority}`,
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
      const missing = issues.filter((i) => i.type === "missing_in_db");
      const orphaned = issues.filter((i) => i.type === "orphaned_in_db");
      const mismatched = issues.filter((i) => i.type === "priority_mismatch");

      // Insert missing routes
      if (missing.length > 0) {
        const rows = missing.map((i) => {
          const route = seoRoutes.find((r) => r.path === i.path)!;
          return {
            path: route.path,
            priority: route.priority,
            changefreq: route.changefreq,
            show_updated_date: true,
          };
        });
        const { error } = await supabase.from("page_metadata").insert(rows);
        if (error) throw error;
      }

      // Delete orphaned routes
      if (orphaned.length > 0) {
        const paths = orphaned.map((i) => i.path);
        const { error } = await supabase
          .from("page_metadata")
          .delete()
          .in("path", paths);
        if (error) throw error;
      }

      // Fix priority mismatches (update DB to match code)
      for (const issue of mismatched) {
        const route = seoRoutes.find((r) => r.path === issue.path);
        if (!route) continue;
        const { error } = await supabase
          .from("page_metadata")
          .update({ priority: route.priority, changefreq: route.changefreq })
          .eq("path", route.path);
        if (error) throw error;
      }

      toast.success(
        `Synkroniseret: ${missing.length} indsat, ${orphaned.length} slettet, ${mismatched.length} prioriteter rettet`
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
    if (type === "priority_mismatch") return "secondary" as const;
    return "outline" as const;
  };

  const badgeLabel = (type: SyncIssue["type"]) => {
    if (type === "missing_in_db") return "Mangler i DB";
    if (type === "priority_mismatch") return "Priority mismatch";
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
            <p className="text-sm text-muted-foreground mt-1">
              Sammenligner seoRoutes.ts ({seoRoutes.length} routes) med
              page_metadata ({dbPages?.length ?? "…"} rækker)
            </p>
          </div>
          <div className="flex gap-2">
            {issues && issues.length > 0 && (
              <Button
                onClick={runAutoSync}
                disabled={syncing}
                size="sm"
                variant="default"
              >
                {syncing ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <Zap className="h-4 w-4 mr-1" />
                )}
                Synkronisér nu
              </Button>
            )}
            <Button
              onClick={runCheck}
              disabled={!dbPages || checking}
              size="sm"
              variant="outline"
            >
              {checking ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-1" />
              )}
              Kør check
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {issues === null ? (
          <p className="text-sm text-muted-foreground">
            Klik "Kør check" for at sammenligne.
          </p>
        ) : issues.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-primary">
            <CheckCircle className="h-4 w-4" />
            Alt er synkroniseret — ingen uoverensstemmelser fundet.
          </div>
        ) : (
          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            <p className="text-sm font-medium text-destructive flex items-center gap-1 mb-2">
              <AlertTriangle className="h-4 w-4" />
              {issues.length} uoverensstemmelse{issues.length > 1 ? "r" : ""} fundet
            </p>
            {issues.map((issue) => (
              <div
                key={`${issue.type}-${issue.path}`}
                className="flex items-center justify-between gap-2 py-1.5 px-3 rounded-md hover:bg-muted/50 text-sm"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-xs block truncate">
                    {issue.path}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {issue.detail}
                  </span>
                </div>
                <Badge variant={badgeVariant(issue.type)} className="text-xs shrink-0">
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
