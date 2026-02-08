import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, X, Loader2 } from "lucide-react";

function getSettingsKey(gameId: string) {
  if (gameId === "book-of-fedesvin") return "slot_background_image";
  return `${gameId.replace(/-/g, "_")}_background_image`;
}

interface SlotBackgroundImageUploadProps {
  gameId?: string;
}

export function SlotBackgroundImageUpload({ gameId = "book-of-fedesvin" }: SlotBackgroundImageUploadProps) {
  const { data: siteSettings } = useSiteSettings();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const settingsKey = getSettingsKey(gameId);

  useEffect(() => {
    setBackgroundImage(siteSettings?.[settingsKey] || null);
  }, [siteSettings, settingsKey]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `slot-background-${gameId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("casino-logos")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("casino-logos")
        .getPublicUrl(fileName);

      const imageUrl = urlData.publicUrl;
      setBackgroundImage(imageUrl);

      await supabase
        .from("site_settings")
        .upsert({ key: settingsKey, value: imageUrl }, { onConflict: "key" });

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
        .eq("key", settingsKey);

      setBackgroundImage(null);
      toast.success("Baggrundsbillede fjernet (standard billede bruges)");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Fejl ved fjernelse af billede");
    }
  };

  return (
    <div className="space-y-2">
      <Label>Spillemaskine Baggrundsbillede</Label>
      <p className="text-sm text-muted-foreground">
        Upload et brugerdefineret baggrundsbillede til spillemaskine-siden. Anbefalet størrelse: 1920x1080.
      </p>
      <div className="flex items-center gap-4">
        {backgroundImage ? (
          <div className="relative">
            <img
              src={backgroundImage}
              alt="Slot background"
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
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <Upload className="h-6 w-6" />
                <span className="text-xs">Upload</span>
              </div>
            )}
          </label>
        )}
      </div>
    </div>
  );
}
