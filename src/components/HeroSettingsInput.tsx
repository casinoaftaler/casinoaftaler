import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, X, Loader2 } from "lucide-react";

export function HeroSettingsInput() {
  const { data: siteSettings } = useSiteSettings();
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (siteSettings?.hero_title) {
      setHeroTitle(siteSettings.hero_title);
    }
    if (siteSettings?.hero_subtitle) {
      setHeroSubtitle(siteSettings.hero_subtitle);
    }
    if (siteSettings?.hero_background_image) {
      setHeroImage(siteSettings.hero_background_image);
    }
  }, [siteSettings]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `hero-bg-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("casino-logos")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("casino-logos")
        .getPublicUrl(fileName);

      const imageUrl = urlData.publicUrl;
      setHeroImage(imageUrl);

      await supabase
        .from("site_settings")
        .upsert({ key: "hero_background_image", value: imageUrl }, { onConflict: "key" });

      toast.success("Baggrundsbillede uploadet");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Fejl ved upload af billede");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      await supabase
        .from("site_settings")
        .update({ value: null })
        .eq("key", "hero_background_image");

      setHeroImage(null);
      toast.success("Baggrundsbillede fjernet");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Fejl ved fjernelse af billede");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = [
        supabase
          .from("site_settings")
          .upsert({ key: "hero_title", value: heroTitle.trim() }, { onConflict: "key" }),
        supabase
          .from("site_settings")
          .upsert({ key: "hero_subtitle", value: heroSubtitle.trim() }, { onConflict: "key" }),
      ];

      const results = await Promise.all(updates);
      const hasError = results.some((r) => r.error);
      if (hasError) throw new Error("Failed to update settings");

      toast.success("Hero sektion opdateret");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (error) {
      console.error("Error updating hero settings:", error);
      toast.error("Fejl ved opdatering");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hero-title">Overskrift</Label>
        <Input
          id="hero-title"
          value={heroTitle}
          onChange={(e) => setHeroTitle(e.target.value)}
          placeholder="Hero overskrift..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hero-subtitle">Undertekst</Label>
        <Textarea
          id="hero-subtitle"
          value={heroSubtitle}
          onChange={(e) => setHeroSubtitle(e.target.value)}
          placeholder="Hero undertekst..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Baggrundsbillede</Label>
        <div className="flex items-center gap-4">
          {heroImage ? (
            <div className="relative">
              <img
                src={heroImage}
                alt="Hero background"
                className="h-20 w-32 rounded object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="flex h-20 w-32 cursor-pointer items-center justify-center rounded border-2 border-dashed border-muted-foreground/50 hover:border-primary">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              ) : (
                <Upload className="h-6 w-6 text-muted-foreground" />
              )}
            </label>
          )}
        </div>
      </div>

      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Gemmer..." : "Gem Ændringer"}
      </Button>
    </div>
  );
}
