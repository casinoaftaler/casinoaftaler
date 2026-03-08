import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ErrorLog {
  id: string;
  error_message: string;
  error_stack: string | null;
  component_name: string | null;
  url: string | null;
  user_agent: string | null;
  created_at: string;
}

export function ErrorLogsSection() {
  const queryClient = useQueryClient();

  const { data: logs, isLoading } = useQuery({
    queryKey: ["admin-error-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("error_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as ErrorLog[];
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("error_logs")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Alle fejl-logs slettet");
      queryClient.invalidateQueries({ queryKey: ["admin-error-logs"] });
    },
    onError: (err) => toast.error("Fejl: " + (err as Error).message),
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("da-DK", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Fejl-Logs ({logs?.length ?? 0})
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              De seneste 100 frontend-fejl logget fra produktion.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["admin-error-logs"] })
              }
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Opdater
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => clearMutation.mutate()}
              disabled={clearMutation.isPending || !logs?.length}
            >
              {clearMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <Trash2 className="h-4 w-4 mr-1" />
              )}
              Ryd alle
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !logs?.length ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Ingen fejl logget — godt gået! 🎉
          </p>
        ) : (
          <div className="max-h-[500px] overflow-y-auto space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="border rounded-md p-3 space-y-1 text-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-destructive break-all">
                    {log.error_message}
                  </p>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {formatDate(log.created_at)}
                  </Badge>
                </div>
                {log.component_name && (
                  <p className="text-xs text-muted-foreground">
                    Komponent: {log.component_name}
                  </p>
                )}
                {log.url && (
                  <p className="text-xs text-muted-foreground truncate">
                    URL: {log.url}
                  </p>
                )}
                {log.error_stack && (
                  <details className="mt-1">
                    <summary className="text-xs cursor-pointer text-muted-foreground hover:text-foreground">
                      Stack trace
                    </summary>
                    <pre className="text-xs mt-1 p-2 bg-muted rounded overflow-x-auto whitespace-pre-wrap break-all">
                      {log.error_stack}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
