import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface HeaderIconUploadProps {
  currentIconUrl: string | null;
  onIconChange: (url: string | null) => void;
}

export function HeaderIconUpload({ currentIconUrl, onIconChange }: HeaderIconUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Kun billedfiler er tilladt");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Filen må ikke være større end 2MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `header-icon.${fileExt}`;
      const filePath = fileName;

      // Delete existing icon if present
      await supabase.storage.from("casino-logos").remove([filePath]);

      // Upload new icon
      const { error: uploadError } = await supabase.storage
        .from("casino-logos")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("casino-logos")
        .getPublicUrl(filePath);

      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      // Update site settings
      const { error: updateError } = await supabase
        .from("site_settings")
        .update({ value: publicUrl })
        .eq("key", "header_icon");

      if (updateError) throw updateError;

      onIconChange(publicUrl);
      toast.success("Header ikon opdateret!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Kunne ikke uploade ikon");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: null })
        .eq("key", "header_icon");

      if (error) throw error;

      onIconChange(null);
      toast.success("Header ikon fjernet!");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Kunne ikke fjerne ikon");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Header Ikon</h3>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary overflow-hidden">
          {currentIconUrl ? (
            <img
              src={currentIconUrl}
              alt="Header icon"
              className="h-full w-full object-cover"
            />
          ) : (
            <MenuIcon iconName="gamepad2" className="h-8 w-8 text-primary-foreground" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Uploader..." : "Upload Ikon"}
          </Button>
          {currentIconUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive"
            >
              <X className="mr-2 h-4 w-4" />
              Fjern Ikon
            </Button>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Anbefalet størrelse: 40x40px. Max 2MB.
      </p>
    </div>
  );
}
