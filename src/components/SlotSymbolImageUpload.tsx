import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SlotSymbolImageUploadProps {
  currentImageUrl: string | null;
  onImageUploaded: (url: string) => void;
  onImageRemoved: () => void;
  symbolId: string;
}

export function SlotSymbolImageUpload({
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
  symbolId,
}: SlotSymbolImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Vælg venligst en billedfil.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Billedet må maksimalt være 5MB.");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${symbolId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("slot-symbols")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("slot-symbols")
        .getPublicUrl(fileName);

      onImageUploaded(urlData.publicUrl);
      toast.success("Billede uploadet");
    } catch (error: any) {
      toast.error("Upload fejlede: " + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label>Symbol Billede</Label>
      {currentImageUrl ? (
        <div className="relative w-16 h-16">
          <img
            src={currentImageUrl}
            alt="Symbol"
            className="w-full h-full object-contain rounded-md border bg-muted"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-5 w-5"
            onClick={onImageRemoved}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id={`symbol-upload-${symbolId}`}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {uploading ? "Uploader..." : "Upload"}
          </Button>
        </div>
      )}
    </div>
  );
}
