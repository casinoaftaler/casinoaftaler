import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, Database } from "lucide-react";
import { toast } from "sonner";

export function CacheClearSection() {
  const queryClient = useQueryClient();
  const [clearing, setClearing] = useState(false);
  const [options, setOptions] = useState({
    reactQuery: true,
    localStorage: false,
    sessionStorage: false,
  });

  const toggle = (key: keyof typeof options) =>
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleClear = async () => {
    setClearing(true);
    try {
      const actions: string[] = [];

      if (options.reactQuery) {
        queryClient.clear();
        actions.push("React Query cache");
      }

      if (options.localStorage) {
        const keysToKeep = ["cookie-consent", "visitor_id", "sb-zhpbqqhtgnblaugrqhqi-auth-token"];
        const allKeys = Object.keys(localStorage);
        allKeys.forEach((key) => {
          if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
          }
        });
        actions.push("localStorage");
      }

      if (options.sessionStorage) {
        sessionStorage.clear();
        actions.push("sessionStorage");
      }

      if (actions.length === 0) {
        toast.warning("Vælg mindst én cache-type");
      } else {
        toast.success(`Ryddet: ${actions.join(", ")}`);
        if (options.reactQuery) {
          queryClient.refetchQueries();
        }
      }
    } finally {
      setClearing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Ryd Cache
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Ryd browser- og app-cache for at tvinge frisk data-indlæsning.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="cache-rq"
              checked={options.reactQuery}
              onCheckedChange={() => toggle("reactQuery")}
            />
            <Label htmlFor="cache-rq" className="cursor-pointer">
              React Query cache (API-data i hukommelsen)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="cache-ls"
              checked={options.localStorage}
              onCheckedChange={() => toggle("localStorage")}
            />
            <Label htmlFor="cache-ls" className="cursor-pointer">
              localStorage (bevarer auth-token + cookie-consent)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="cache-ss"
              checked={options.sessionStorage}
              onCheckedChange={() => toggle("sessionStorage")}
            />
            <Label htmlFor="cache-ss" className="cursor-pointer">
              sessionStorage
            </Label>
          </div>
        </div>
        <Button
          onClick={handleClear}
          disabled={clearing}
          variant="destructive"
          size="sm"
        >
          {clearing ? (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <Trash2 className="h-4 w-4 mr-1" />
          )}
          Ryd valgt cache
        </Button>
      </CardContent>
    </Card>
  );
}
