import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useQueryClient } from "@tanstack/react-query";

export function SiteNameInput() {
  const { data: siteSettings } = useSiteSettings();
  const [siteName, setSiteName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (siteSettings?.site_name) {
      setSiteName(siteSettings.site_name);
    }
  }, [siteSettings?.site_name]);

  const handleSave = async () => {
    if (!siteName.trim()) {
      toast.error("Site name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: siteName.trim() })
        .eq("key", "site_name");

      if (error) throw error;

      toast.success("Site name updated successfully");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (error) {
      console.error("Error updating site name:", error);
      toast.error("Failed to update site name");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="site-name">Sidenavn</Label>
      <div className="flex gap-2">
        <Input
          id="site-name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Enter site name..."
          className="max-w-xs"
        />
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Gemmer..." : "Gem"}
        </Button>
      </div>
    </div>
  );
}
