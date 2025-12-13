import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LogoUploadProps {
  currentLogoUrl: string | null;
  onLogoChange: (url: string | null) => void;
  casinoSlug: string;
}

export function LogoUpload({ currentLogoUrl, onLogoChange, casinoSlug }: LogoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Ugyldig filtype",
        description: "Upload venligst en billedfil (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Filen er for stor",
        description: "Maksimal filstørrelse er 2MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${casinoSlug}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("casino-logos")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("casino-logos")
        .getPublicUrl(filePath);

      onLogoChange(publicUrl);
      toast({
        title: "Logo uploadet",
        description: "Casino logoet er blevet gemt.",
      });
    } catch (error: any) {
      toast({
        title: "Upload fejlede",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onLogoChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        {currentLogoUrl ? (
          <div className="relative">
            <img
              src={currentLogoUrl}
              alt="Casino logo"
              className="h-16 w-16 rounded-lg object-cover border border-border"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="logo-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploader...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {currentLogoUrl ? "Skift logo" : "Upload logo"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}