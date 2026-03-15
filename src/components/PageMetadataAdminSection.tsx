import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCw, Search, CalendarDays, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface PageMeta {
  path: string;
  updated_at: string;
  created_at: string;
  changefreq: string;
  priority: number;
  show_updated_date: boolean;
}

export function PageMetadataAdminSection() {
  const [search, setSearch] = useState("");
  const [touchingPath, setTouchingPath] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: pages, isLoading } = useQuery({
    queryKey: ["admin-page-metadata"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_metadata")
        .select("*")
        .order("path");
      if (error) throw error;
      return data as PageMeta[];
    },
  });

  const touchMutation = useMutation({
    mutationFn: async (path: string) => {
      setTouchingPath(path);
      const { error } = await supabase
        .from("page_metadata")
        .update({ updated_at: new Date().toISOString() })
        .eq("path", path);
      if (error) throw error;
    },
    onSuccess: (_, path) => {
      toast.success(`Opdateret dato for ${path}`);
      queryClient.invalidateQueries({ queryKey: ["admin-page-metadata"] });
      queryClient.invalidateQueries({ queryKey: ["page-lastmod"] });
      setTouchingPath(null);
    },
    onError: (err) => {
      toast.error("Fejl: " + (err as Error).message);
      setTouchingPath(null);
    },
  });

  const toggleShowDate = useMutation({
    mutationFn: async ({ path, show }: { path: string; show: boolean }) => {
      const { error } = await supabase
        .from("page_metadata")
        .update({ show_updated_date: show })
        .eq("path", path);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-page-metadata"] });
      queryClient.invalidateQueries({ queryKey: ["page-lastmod"] });
    },
  });


  const filtered = (pages || []).filter((p) =>
    p.path.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("da-DK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Side Datoer (Opdateret)
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Klik "Touch" for at opdatere "Opdateret"-datoen på en side. Ændringen slår igennem på siden og i sitemap.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Søg efter sti, f.eks. /casino-anmeldelser..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Viser {filtered.length} af {pages?.length || 0} sider
            </p>
            <div className="max-h-[500px] overflow-y-auto space-y-1">
              {filtered.map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between gap-2 py-2 px-3 rounded-md hover:bg-muted/50 text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs truncate block">
                      {page.path}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatDate(page.updated_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Switch
                        checked={page.show_updated_date}
                        onCheckedChange={(checked) =>
                          toggleShowDate.mutate({ path: page.path, show: checked })
                        }
                        className="scale-75"
                      />
                      <Label className="text-xs text-muted-foreground">Vis dato</Label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {page.priority.toFixed(1)}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => touchMutation.mutate(page.path)}
                      disabled={touchingPath === page.path}
                      className="h-7 text-xs"
                    >
                      {touchingPath === page.path ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Touch
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
