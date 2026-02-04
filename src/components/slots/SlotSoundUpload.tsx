import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Loader2, Play, Pause, Volume2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface SlotSoundUploadProps {
  label: string;
  description?: string;
  settingKey: string;
  currentUrl: string | null;
  onUrlChange: (url: string | null) => void;
}

export function SlotSoundUpload({
  label,
  description,
  settingKey,
  currentUrl,
  onUrlChange,
}: SlotSoundUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const queryClient = useQueryClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/webm"];
    if (!validTypes.includes(file.type)) {
      toast.error("Ugyldig filtype. Brug MP3, WAV, OGG eller WebM");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Filen er for stor. Maks 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${settingKey}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("slot-sounds")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("slot-sounds")
        .getPublicUrl(fileName);

      const soundUrl = urlData.publicUrl;

      // Save to site_settings
      await supabase
        .from("site_settings")
        .upsert({ key: settingKey, value: soundUrl }, { onConflict: "key" });

      onUrlChange(soundUrl);
      toast.success("Lydfil uploadet");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["slot-sound-files"] });
    } catch (error) {
      console.error("Error uploading sound:", error);
      toast.error("Fejl ved upload af lydfil");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      // Stop playback if playing
      if (audioElement) {
        audioElement.pause();
        setIsPlaying(false);
      }

      await supabase
        .from("site_settings")
        .update({ value: null })
        .eq("key", settingKey);

      onUrlChange(null);
      toast.success("Lydfil fjernet (standard lyd bruges)");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["slot-sound-files"] });
    } catch (error) {
      console.error("Error removing sound:", error);
      toast.error("Fejl ved fjernelse af lydfil");
    }
  };

  const handlePlayPreview = () => {
    if (!currentUrl) return;

    if (isPlaying && audioElement) {
      audioElement.pause();
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(currentUrl);
    audio.volume = 0.5;
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      toast.error("Kunne ikke afspille lydfil");
      setIsPlaying(false);
    };
    audio.play();
    setAudioElement(audio);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Label>{label}</Label>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="flex items-center gap-2">
        {currentUrl ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPreview}
              className="gap-2"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isPlaying ? "Stop" : "Afspil"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Fjern
            </Button>
            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
              Brugerdefineret lyd aktiv
            </span>
          </>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              accept="audio/mp3,audio/mpeg,audio/wav,audio/ogg,audio/webm"
              onChange={handleUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 pointer-events-none"
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              Upload lyd
            </Button>
          </label>
        )}
      </div>
    </div>
  );
}
