import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Loader2, Wand2, Trash2, ImageIcon, RefreshCw, Sparkles, Download, Upload } from "lucide-react";
import { toast } from "sonner";

// (Legacy frame size defaults removed — replaced by free-form positioning)

// Helper to derive settings keys per game
function getSettingsKeys(gameId: string) {
  if (gameId === "book-of-fedesvin") {
    return {
      backgroundKey: "slot_background_image",
      frameKey: "slot_machine_frame_image",
      frameWidthKey: "slot_frame_width",
      frameHeightKey: "slot_frame_height",
      frameOffsetXKey: "slot_frame_offset_x",
      frameOffsetYKey: "slot_frame_offset_y",
    };
  }
  const prefix = gameId.replace(/-/g, "_");
  return {
    backgroundKey: `${prefix}_background_image`,
    frameKey: `${prefix}_frame_image`,
    frameWidthKey: `${prefix}_frame_width`,
    frameHeightKey: `${prefix}_frame_height`,
    frameOffsetXKey: `${prefix}_frame_offset_x`,
    frameOffsetYKey: `${prefix}_frame_offset_y`,
  };
}

interface SlotFrameAdminControlsProps {
  gameId?: string;
}

export function SlotFrameAdminControls({ gameId = "book-of-fedesvin" }: SlotFrameAdminControlsProps) {
  const queryClient = useQueryClient();
  const { data: settings, isLoading: settingsLoading } = useSiteSettings();
  const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<string | null>(null);
  const [framePreviewUrl, setFramePreviewUrl] = useState<string | null>(null);
  const [uploadingFrame, setUploadingFrame] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const frameInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  // Reset preview state when switching games
  useEffect(() => {
    setBackgroundPreviewUrl(null);
    setFramePreviewUrl(null);
  }, [gameId]);

  const { backgroundKey, frameKey, frameWidthKey, frameHeightKey, frameOffsetXKey, frameOffsetYKey } = getSettingsKeys(gameId);
  
  const currentBackgroundUrl = settings?.[backgroundKey] || null;
  const currentFrameUrl = settings?.[frameKey] || null;
  const currentFrameWidth = parseInt(settings?.[frameWidthKey] || "130", 10);
  const currentFrameHeight = parseInt(settings?.[frameHeightKey] || "130", 10);
  const currentFrameOffsetX = parseInt(settings?.[frameOffsetXKey] || "0", 10);
  const currentFrameOffsetY = parseInt(settings?.[frameOffsetYKey] || "0", 10);

  const updateFrameSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: number }) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert(
          { key, value: String(value) },
          { onConflict: "key" }
        );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      toast.error(`Kunne ikke opdatere: ${error.message}`);
    },
  });

  const resetFramePosition = useMutation({
    mutationFn: async () => {
      const keysToDelete = [frameWidthKey, frameHeightKey, frameOffsetXKey, frameOffsetYKey];
      for (const key of keysToDelete) {
        await supabase.from("site_settings").delete().eq("key", key);
      }
    },
    onSuccess: () => {
      toast.success("Rammeposition nulstillet!");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      toast.error(`Kunne ikke nulstille: ${error.message}`);
    },
  });

  const isRise = gameId === "rise-of-fedesvin";
  const themeLabel = isRise ? "troldmands" : "egyptisk";

  const generateBackground = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("generate-slot-frame", {
        body: { type: "background", gameId }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }
      
      return data;
    },
    onSuccess: (data) => {
      toast.success(`${isRise ? "Troldmands" : "Egyptisk"} baggrund genereret!`);
      setBackgroundPreviewUrl(data.imageUrl);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      console.error("Background generation error:", error);
      toast.error(`Kunne ikke generere baggrund: ${error.message}`);
    },
  });

  const generateFrame = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("generate-slot-frame", {
        body: { type: "frame", gameId }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }
      
      return data;
    },
    onSuccess: (data) => {
      toast.success(`${isRise ? "Troldmands" : "Egyptisk"} ramme genereret!`);
      setFramePreviewUrl(data.imageUrl);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      console.error("Frame generation error:", error);
      toast.error(`Kunne ikke generere ramme: ${error.message}`);
    },
  });

  const resetBackground = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("site_settings")
        .delete()
        .eq("key", backgroundKey);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Baggrund nulstillet til standard");
      setBackgroundPreviewUrl(null);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      toast.error(`Kunne ikke nulstille baggrund: ${error.message}`);
    },
  });

  const resetFrame = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("site_settings")
        .delete()
        .eq("key", frameKey);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Ramme nulstillet til standard");
      setFramePreviewUrl(null);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      toast.error(`Kunne ikke nulstille ramme: ${error.message}`);
    },
  });

  const displayBackgroundUrl = backgroundPreviewUrl || currentBackgroundUrl;
  const displayFrameUrl = framePreviewUrl || currentFrameUrl;

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success(`${filename} downloadet!`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Kunne ikke downloade filen');
    }
  };

  const handleFrameUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Upload venligst en billedfil (JPG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maksimal filstørrelse er 5MB");
      return;
    }

    setUploadingFrame(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `slot-frame-${gameId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("casino-logos")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("casino-logos")
        .getPublicUrl(fileName);

      // Save to site_settings
      const { error: settingsError } = await supabase
        .from("site_settings")
        .upsert(
          { key: frameKey, value: publicUrl },
          { onConflict: "key" }
        );

      if (settingsError) throw settingsError;

      setFramePreviewUrl(publicUrl);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Ramme uploadet!");
    } catch (error: any) {
      console.error("Frame upload error:", error);
      toast.error(`Upload fejlede: ${error.message}`);
    } finally {
      setUploadingFrame(false);
      if (frameInputRef.current) {
        frameInputRef.current.value = "";
      }
    }
  };

  const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Upload venligst en billedfil (JPG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maksimal filstørrelse er 5MB");
      return;
    }

    setUploadingBackground(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `slot-bg-${gameId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("casino-logos")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("casino-logos")
        .getPublicUrl(fileName);

      const { error: settingsError } = await supabase
        .from("site_settings")
        .upsert(
          { key: backgroundKey, value: publicUrl },
          { onConflict: "key" }
        );

      if (settingsError) throw settingsError;

      setBackgroundPreviewUrl(publicUrl);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Baggrund uploadet!");
    } catch (error: any) {
      console.error("Background upload error:", error);
      toast.error(`Upload fejlede: ${error.message}`);
    } finally {
      setUploadingBackground(false);
      if (backgroundInputRef.current) {
        backgroundInputRef.current.value = "";
      }
    }
  };

  const ImagePreview = ({ url, label, onError }: { url: string | null; label: string; onError: () => void }) => {
    if (!url) {
      return (
        <div className="aspect-video flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20">
          <ImageIcon className="h-12 w-12 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">Ingen {label} genereret endnu</p>
          <p className="text-xs text-muted-foreground/70">Klik på knappen nedenfor for at generere en</p>
        </div>
      );
    }

    return (
      <div className="relative rounded-lg overflow-hidden border border-amber-500/30 bg-gradient-to-b from-amber-900/20 to-background">
        <div className="aspect-video flex items-center justify-center p-4">
          <img
            src={url}
            alt={`Nuværende ${label}`}
            className="max-h-full max-w-full object-contain rounded"
            onError={onError}
          />
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Nuværende {label}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Spillemaskine Grafik
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="background" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="background">Baggrund</TabsTrigger>
            <TabsTrigger value="frame">Ramme</TabsTrigger>
          </TabsList>

          <TabsContent value="background" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              {isRise 
                ? "Generer en AI-skabt troldmandstårn-baggrund med magiske runer, krystaller og mystisk atmosfære."
                : "Generer en AI-skabt egyptisk tempelbaggrund med hieroglyffer, fakler og mystisk atmosfære."}
            </p>

            {!settingsLoading && (
              <ImagePreview 
                url={displayBackgroundUrl} 
                label="baggrund" 
                onError={() => setBackgroundPreviewUrl(null)}
              />
            )}

            <div className="flex flex-wrap gap-2">
              {/* Hidden file input for background upload */}
              <input
                ref={backgroundInputRef}
                type="file"
                accept="image/*"
                onChange={handleBackgroundUpload}
                className="hidden"
              />

              <Button
                variant="outline"
                onClick={() => backgroundInputRef.current?.click()}
                disabled={uploadingBackground}
                className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
              >
                {uploadingBackground ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploader...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Egen Baggrund
                  </>
                )}
              </Button>

              <Button
                onClick={() => generateBackground.mutate()}
                disabled={generateBackground.isPending}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                {generateBackground.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Genererer...
                  </>
                ) : displayBackgroundUrl ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generer Ny Baggrund
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generer Baggrund
                  </>
                )}
              </Button>

              {currentBackgroundUrl && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(currentBackgroundUrl, `${gameId}-background.jpg`)}
                    className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => resetBackground.mutate()}
                    disabled={resetBackground.isPending}
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    {resetBackground.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Nulstil til Standard
                  </Button>
                </>
              )}
            </div>

            {generateBackground.isPending && (
              <div className="text-sm text-muted-foreground bg-amber-500/10 p-3 rounded-lg">
                <p className="font-medium text-amber-400 mb-1">⏳ Genererer baggrund...</p>
                <p>AI genererer en unik {themeLabel} baggrund. Dette kan tage op til 60 sekunder.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="frame" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              {isRise
                ? "Generer en AI-skabt troldmandsramme med sølv- og lilla runer, krystaller og magisk energi."
                : "Generer en AI-skabt egyptisk ramme med gulddekorationer, faraoskulpturer og hieroglyffer."}
            </p>

            {!settingsLoading && (
              <ImagePreview 
                url={displayFrameUrl} 
                label="ramme" 
                onError={() => setFramePreviewUrl(null)}
              />
            )}

            {/* Frame Position Controls */}
            {currentFrameUrl && (
              <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Rammepositionering</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => resetFramePosition.mutate()}
                    disabled={resetFramePosition.isPending}
                    className="text-xs h-7"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Nulstil position
                  </Button>
                </div>

                {/* Width */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Bredde</Label>
                    <span className="text-xs text-muted-foreground">{currentFrameWidth}%</span>
                  </div>
                  <Slider
                    value={[currentFrameWidth]}
                    onValueChange={(v) => updateFrameSetting.mutate({ key: frameWidthKey, value: v[0] })}
                    min={50}
                    max={250}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Højde</Label>
                    <span className="text-xs text-muted-foreground">{currentFrameHeight}%</span>
                  </div>
                  <Slider
                    value={[currentFrameHeight]}
                    onValueChange={(v) => updateFrameSetting.mutate({ key: frameHeightKey, value: v[0] })}
                    min={50}
                    max={250}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Horizontal offset */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Horisontal offset</Label>
                    <span className="text-xs text-muted-foreground">{currentFrameOffsetX}px</span>
                  </div>
                  <Slider
                    value={[currentFrameOffsetX]}
                    onValueChange={(v) => updateFrameSetting.mutate({ key: frameOffsetXKey, value: v[0] })}
                    min={-200}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Vertical offset */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Vertikal offset</Label>
                    <span className="text-xs text-muted-foreground">{currentFrameOffsetY}px</span>
                  </div>
                  <Slider
                    value={[currentFrameOffsetY]}
                    onValueChange={(v) => updateFrameSetting.mutate({ key: frameOffsetYKey, value: v[0] })}
                    min={-200}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Justér rammens størrelse og position frit over tromlerne. Rammen er rent dekorativ og påvirker ikke spillets layout.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {/* Hidden file input for upload */}
              <input
                ref={frameInputRef}
                type="file"
                accept="image/*"
                onChange={handleFrameUpload}
                className="hidden"
              />
              
              <Button
                variant="outline"
                onClick={() => frameInputRef.current?.click()}
                disabled={uploadingFrame}
                className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
              >
                {uploadingFrame ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploader...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Egen Ramme
                  </>
                )}
              </Button>

              <Button
                onClick={() => generateFrame.mutate()}
                disabled={generateFrame.isPending}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                {generateFrame.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Genererer...
                  </>
                ) : displayFrameUrl ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generer Ny Ramme
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generer {isRise ? "Troldmands" : "Egyptisk"} Ramme
                  </>
                )}
              </Button>

              {currentFrameUrl && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(currentFrameUrl, 'slot-frame.png')}
                    className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Ramme
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => resetFrame.mutate()}
                    disabled={resetFrame.isPending}
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    {resetFrame.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Nulstil til Standard
                  </Button>
                </>
              )}
            </div>

            {generateFrame.isPending && (
              <div className="text-sm text-muted-foreground bg-amber-500/10 p-3 rounded-lg">
                <p className="font-medium text-amber-400 mb-1">⏳ Genererer ramme...</p>
                <p>AI genererer en unik {themeLabel} ramme. Dette kan tage op til 60 sekunder.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
