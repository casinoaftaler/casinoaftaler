import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface GameProvider {
  name: string;
  logo_url: string;
}

interface GameProvidersInputProps {
  providers: GameProvider[];
  onChange: (providers: GameProvider[]) => void;
  casinoSlug: string;
}

export function GameProvidersInput({ providers, onChange, casinoSlug }: GameProvidersInputProps) {
  const [newProviderName, setNewProviderName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleAddProvider = () => {
    if (newProviderName.trim()) {
      onChange([...providers, { name: newProviderName.trim(), logo_url: "" }]);
      setNewProviderName("");
    }
  };

  const handleRemoveProvider = (index: number) => {
    const newProviders = [...providers];
    newProviders.splice(index, 1);
    onChange(newProviders);
  };

  const handleNameChange = (index: number, name: string) => {
    const newProviders = [...providers];
    newProviders[index] = { ...newProviders[index], name };
    onChange(newProviders);
  };

  const handleLogoUpload = async (index: number, file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${casinoSlug}-provider-${index}-${Date.now()}.${fileExt}`;
      const filePath = `providers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("casino-logos")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("casino-logos")
        .getPublicUrl(filePath);

      const newProviders = [...providers];
      newProviders[index] = { ...newProviders[index], logo_url: publicUrlData.publicUrl };
      onChange(newProviders);

      toast({
        title: "Logo uploadet",
        description: "Spiludbyder logo er blevet uploadet.",
      });
    } catch (error: any) {
      toast({
        title: "Upload fejl",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label>Spiludbydere</Label>
      
      {providers.map((provider, index) => (
        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
          {provider.logo_url ? (
            <img src={provider.logo_url} alt={provider.name} className="h-8 w-8 object-contain rounded" />
          ) : (
            <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              ?
            </div>
          )}
          <Input
            value={provider.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            placeholder="Udbyder navn"
            className="flex-1"
          />
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(index, file);
              }}
              disabled={uploading}
            />
            <Button type="button" variant="outline" size="icon" asChild disabled={uploading}>
              <span>
                <Upload className="h-4 w-4" />
              </span>
            </Button>
          </label>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => handleRemoveProvider(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div className="flex gap-2">
        <Input
          value={newProviderName}
          onChange={(e) => setNewProviderName(e.target.value)}
          placeholder="Ny spiludbyder navn..."
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddProvider())}
        />
        <Button type="button" variant="outline" onClick={handleAddProvider}>
          <Plus className="h-4 w-4 mr-1" />
          Tilføj
        </Button>
      </div>
    </div>
  );
}
