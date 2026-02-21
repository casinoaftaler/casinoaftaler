import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { MULTIPLIER_SYMBOLS } from "@/lib/gatesMultiplierSymbols";

interface MultRow {
  id: string;
  value: number;
  label: string;
  image_url: string | null;
  position: number;
}

export function MultiplierSymbolsAdmin() {
  const queryClient = useQueryClient();

  const { data: symbols, isLoading } = useQuery({
    queryKey: ["slot-multiplier-symbols-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_multiplier_symbols" as any)
        .select("*")
        .order("position");
      if (error) throw error;
      return (data as unknown as MultRow[]) || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Merge with hardcoded fallback images for display
  const hardcodedMap = new Map(MULTIPLIER_SYMBOLS.map(s => [s.id, s]));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Multiplier Symboler
        </CardTitle>
        <CardDescription>
          Upload eller skift billeder for multiplier orbs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {symbols?.map((sym) => (
            <MultiplierCard
              key={sym.id}
              symbol={sym}
              fallbackImage={hardcodedMap.get(sym.id)?.imageUrl}
              onUpdate={() => queryClient.invalidateQueries({ queryKey: ["slot-multiplier-symbols-admin"] })}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MultiplierCard({
  symbol,
  fallbackImage,
  onUpdate,
}: {
  symbol: MultRow;
  fallbackImage?: string;
  onUpdate: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const displayImage = symbol.image_url || fallbackImage;
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (imageUrl: string | null) => {
      const { error } = await supabase
        .from("slot_multiplier_symbols" as any)
        .update({ image_url: imageUrl } as any)
        .eq("id", symbol.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-multiplier-symbols"] });
      onUpdate();
      toast.success(`${symbol.label} billede opdateret`);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Vælg venligst en billedfil.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB.");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `mult-${symbol.id}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("slot-symbols")
        .upload(fileName, file, { upsert: true });
      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage.from("slot-symbols").getPublicUrl(fileName);
      await updateMutation.mutateAsync(urlData.publicUrl);
    } catch (err: any) {
      toast.error("Upload fejl: " + err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg border bg-card">
      <span className="text-sm font-semibold">{symbol.label}</span>
      <div className="relative w-16 h-16">
        {displayImage ? (
          <img
            src={displayImage}
            alt={symbol.label}
            className="w-full h-full object-contain rounded"
          />
        ) : (
          <div className="w-full h-full bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
            Intet
          </div>
        )}
        {symbol.image_url && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-5 w-5"
            onClick={() => updateMutation.mutate(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Upload className="h-3 w-3 mr-1" />}
        {uploading ? "Uploader..." : "Skift"}
      </Button>
    </div>
  );
}
