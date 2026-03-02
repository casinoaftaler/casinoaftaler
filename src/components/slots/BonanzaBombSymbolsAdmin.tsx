import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bomb, Upload, X } from "lucide-react";

interface BombSymbol {
  id: string;
  game_id: string;
  value: number;
  label: string;
  image_url: string | null;
  position: number;
}

export function BonanzaBombSymbolsAdmin() {
  const queryClient = useQueryClient();
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const { data: bombSymbols, isLoading } = useQuery({
    queryKey: ["slot-bomb-symbols"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_bomb_symbols" as any)
        .select("*")
        .order("position");
      if (error) throw error;
      return data as unknown as BombSymbol[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, image_url }: { id: string; image_url: string | null }) => {
      const { error } = await supabase
        .from("slot_bomb_symbols" as any)
        .update({ image_url } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-bomb-symbols"] });
      toast.success("Bomb-symbol opdateret");
    },
    onError: (err: Error) => toast.error("Fejl: " + err.message),
  });

  const handleFileUpload = async (bombId: string, file: File) => {
    setUploadingId(bombId);
    try {
      const ext = file.name.split(".").pop();
      const path = `bombs/${bombId}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("slot-symbols")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("slot-symbols").getPublicUrl(path);
      const imageUrl = `${urlData.publicUrl}?v=${Date.now()}`;
      await updateMutation.mutateAsync({ id: bombId, image_url: imageUrl });
    } catch (err: any) {
      toast.error("Upload fejl: " + err.message);
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemoveImage = (bombId: string) => {
    updateMutation.mutate({ id: bombId, image_url: null });
  };

  if (isLoading) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bomb className="h-5 w-5" />
          Bonanza Bomb Symboler
        </CardTitle>
        <CardDescription>
          Upload eller ændr billeder for multiplier-bomber i Fedesvin Bonanza.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bombSymbols?.map((bomb) => (
            <div key={bomb.id} className="border rounded-lg p-3 space-y-2 flex flex-col items-center">
              <div className="text-lg font-bold text-yellow-400">{bomb.label}</div>
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {bomb.image_url ? (
                  <img src={bomb.image_url} alt={bomb.label} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-3xl">💣</span>
                )}
              </div>
              <div className="flex gap-1 w-full">
                <Label
                  htmlFor={`bomb-upload-${bomb.id}`}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-1 text-xs border rounded px-2 py-1.5 hover:bg-muted transition-colors"
                >
                  <Upload className="h-3 w-3" />
                  {uploadingId === bomb.id ? "..." : "Upload"}
                </Label>
                <input
                  id={`bomb-upload-${bomb.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(bomb.id, file);
                  }}
                />
                {bomb.image_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto px-2 py-1.5"
                    onClick={() => handleRemoveImage(bomb.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
