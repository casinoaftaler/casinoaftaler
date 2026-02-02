import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Wand2, Trash2, ImageIcon, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function SlotFrameAdminControls() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading: settingsLoading } = useSiteSettings();
  const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<string | null>(null);
  const [framePreviewUrl, setFramePreviewUrl] = useState<string | null>(null);
  
  const currentBackgroundUrl = settings?.slot_background_image || null;
  const currentFrameUrl = settings?.slot_machine_frame_image || null;

  const generateBackground = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("generate-slot-frame", {
        body: { type: "background" }
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
      toast.success("Egyptisk baggrund genereret!");
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
        body: { type: "frame" }
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
      toast.success("Egyptisk ramme genereret!");
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
        .eq("key", "slot_background_image");
      
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
        .eq("key", "slot_machine_frame_image");
      
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
              Generer en AI-skabt egyptisk tempelbaggrund med hieroglyffer, 
              fakler og mystisk atmosfære.
            </p>

            {!settingsLoading && (
              <ImagePreview 
                url={displayBackgroundUrl} 
                label="baggrund" 
                onError={() => setBackgroundPreviewUrl(null)}
              />
            )}

            <div className="flex flex-wrap gap-2">
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
                    Generer Egyptisk Baggrund
                  </>
                )}
              </Button>

              {currentBackgroundUrl && (
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
              )}
            </div>

            {generateBackground.isPending && (
              <div className="text-sm text-muted-foreground bg-amber-500/10 p-3 rounded-lg">
                <p className="font-medium text-amber-400 mb-1">⏳ Genererer baggrund...</p>
                <p>AI genererer en unik egyptisk baggrund. Dette kan tage op til 60 sekunder.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="frame" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Generer en AI-skabt egyptisk ramme med gulddekorationer, 
              faraoskulpturer og hieroglyffer.
            </p>

            {!settingsLoading && (
              <ImagePreview 
                url={displayFrameUrl} 
                label="ramme" 
                onError={() => setFramePreviewUrl(null)}
              />
            )}

            <div className="flex flex-wrap gap-2">
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
                    Generer Egyptisk Ramme
                  </>
                )}
              </Button>

              {currentFrameUrl && (
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
              )}
            </div>

            {generateFrame.isPending && (
              <div className="text-sm text-muted-foreground bg-amber-500/10 p-3 rounded-lg">
                <p className="font-medium text-amber-400 mb-1">⏳ Genererer ramme...</p>
                <p>AI genererer en unik egyptisk ramme. Dette kan tage op til 60 sekunder.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
