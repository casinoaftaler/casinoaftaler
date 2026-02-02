import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2, Trash2, ImageIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function SlotFrameAdminControls() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading: settingsLoading } = useSiteSettings();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const currentFrameUrl = settings?.slot_machine_frame_image || null;

  const generateFrame = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("generate-slot-frame");
      
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
      setPreviewUrl(data.imageUrl);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      console.error("Frame generation error:", error);
      toast.error(`Kunne ikke generere ramme: ${error.message}`);
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
      setPreviewUrl(null);
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
    onError: (error: Error) => {
      toast.error(`Kunne ikke nulstille ramme: ${error.message}`);
    },
  });

  const displayUrl = previewUrl || currentFrameUrl;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-amber-500" />
          Spillemaskine Ramme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Generer en AI-skabt egyptisk ramme til spillemaskinen med gulddekorationer, 
          faraoskulpturer og hieroglyffer.
        </p>

        {/* Current frame preview */}
        {displayUrl && (
          <div className="relative rounded-lg overflow-hidden border border-amber-500/30 bg-gradient-to-b from-amber-900/20 to-background">
            <div className="aspect-video flex items-center justify-center p-4">
              <img
                src={displayUrl}
                alt="Nuværende spillemaskine ramme"
                className="max-h-full max-w-full object-contain"
                onError={() => setPreviewUrl(null)}
              />
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              Nuværende ramme
            </div>
          </div>
        )}

        {/* No frame message */}
        {!displayUrl && !settingsLoading && (
          <div className="aspect-video flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20">
            <ImageIcon className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Ingen ramme genereret endnu</p>
            <p className="text-xs text-muted-foreground/70">Klik på knappen nedenfor for at generere en</p>
          </div>
        )}

        {/* Action buttons */}
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
            ) : displayUrl ? (
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
            <p>AI genererer en unik egyptisk ramme. Dette kan tage op til 30 sekunder.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
