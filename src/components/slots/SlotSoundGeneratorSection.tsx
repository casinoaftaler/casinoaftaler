import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wand2, ChevronDown, Play, Save, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getSoundSettingKeys } from "@/hooks/useSlotSoundFiles";
import { useQueryClient } from "@tanstack/react-query";

interface SlotSoundGeneratorSectionProps {
  gameId?: string;
}

const GAME_LABELS: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
  "gates-of-fedesvin": "Gates of Fedesvin",
  "fedesvin-bonanza": "Fedesvin Bonanza",
};

function getSoundTypeOptions(gameId: string) {
  const keys = getSoundSettingKeys(gameId);
  return [
    { value: "spinSound", label: "Spinning Lyd", key: keys.spinSound },
    { value: "stopSound", label: "Stop Lyd", key: keys.stopSound },
    { value: "smallWinSound", label: "Lille Gevinst", key: keys.smallWinSound },
    { value: "mediumWinSound", label: "Medium Gevinst", key: keys.mediumWinSound },
    { value: "bigWinSound", label: "Stor Gevinst", key: keys.bigWinSound },
    { value: "bonusTriggerSound", label: "Bonus Trigger", key: keys.bonusTriggerSound },
    { value: "bonusSymbolScrollSound", label: "Symbol Scroll", key: keys.bonusSymbolScrollSound },
    { value: "bonusSymbolSelectedSound", label: "Symbol Valgt", key: keys.bonusSymbolSelectedSound },
    { value: "bonusWinSound", label: "Bonus Afslutning", key: keys.bonusWinSound },
    { value: "scatterSound1", label: "Scatter 1", key: keys.scatterSound1 },
    { value: "scatterSound2", label: "Scatter 2", key: keys.scatterSound2 },
    { value: "scatterSound3", label: "Scatter 3", key: keys.scatterSound3 },
  ];
}

const PROMPT_SUGGESTIONS = [
  { label: "Mjav 1 (Blød)", prompt: "Soft curious cat meow, gentle Egyptian temple cat purring with subtle mystical echo, short and sweet" },
  { label: "Mjav 2 (Spændt)", prompt: "Excited cat meow, louder Egyptian temple cat sound with magical sparkles and anticipation, medium intensity" },
  { label: "Mjav 3 (Triumf)", prompt: "Triumphant powerful cat yowl, majestic Egyptian sacred cat roar with golden magical energy and celebration, epic climax sound" },
  { label: "Egyptisk Spin", prompt: "Ancient Egyptian slot machine spinning with golden coins and mystical chimes" },
  { label: "Merlin Spell", prompt: "Wizard casting magical spell with arcane energy swirling, crystal chimes and ethereal whoosh" },
  { label: "Guld Cascade", prompt: "Cascading gold coins with triumphant fanfare and celebration bells" },
  { label: "Symbol Reveal", prompt: "Dramatic ancient Egyptian mystical reveal sound with golden chimes, magical energy surge, triumphant fanfare, and celestial sparkles - epic symbol selection moment" },
];

export function SlotSoundGeneratorSection({ gameId = "book-of-fedesvin" }: SlotSoundGeneratorSectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const gameName = GAME_LABELS[gameId] || gameId;
  const soundTypeOptions = getSoundTypeOptions(gameId);
  
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(3);
  const [selectedType, setSelectedType] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<{ base64: string; blob: Blob } | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Fejl",
        description: "Indtast en beskrivelse af lyden du vil generere",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedAudio(null);

    try {
      const { data, error } = await supabase.functions.invoke("elevenlabs-sfx", {
        body: { prompt: prompt.trim(), duration },
      });

      if (error) throw error;

      if (!data?.audioContent) {
        throw new Error("Ingen lyd modtaget fra API'en");
      }

      // Create blob from base64
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "audio/mpeg" });

      setGeneratedAudio({ base64: data.audioContent, blob });

      toast({
        title: "Lyd genereret!",
        description: "Klik på afspil for at høre lyden, eller gem den til brug i spillet.",
      });
    } catch (error) {
      console.error("Error generating sound:", error);
      toast({
        title: "Fejl ved generering",
        description: error instanceof Error ? error.message : "Kunne ikke generere lyd",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlay = () => {
    if (!generatedAudio) return;

    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    const url = URL.createObjectURL(generatedAudio.blob);
    const audio = new Audio(url);
    audio.play();
    setAudioElement(audio);
  };

  const handleSave = async () => {
    if (!generatedAudio || !selectedType) {
      toast({
        title: "Vælg lydtype",
        description: "Vælg hvilken lydtype du vil gemme denne lyd som",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const selectedOption = soundTypeOptions.find((opt) => opt.value === selectedType);
      if (!selectedOption) throw new Error("Ugyldig lydtype valgt");

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `generated-${gameId}-${selectedType}-${timestamp}.mp3`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("slot-sounds")
        .upload(filename, generatedAudio.blob, {
          contentType: "audio/mpeg",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("slot-sounds")
        .getPublicUrl(filename);

      if (!urlData?.publicUrl) throw new Error("Kunne ikke hente offentlig URL");

      // Save to site_settings using game-specific key
      const { error: settingsError } = await supabase
        .from("site_settings")
        .upsert(
          { key: selectedOption.key, value: urlData.publicUrl },
          { onConflict: "key" }
        );

      if (settingsError) throw settingsError;

      // Invalidate queries to refresh UI
      await queryClient.invalidateQueries({ queryKey: ["slot-sound-files", gameId] });

      toast({
        title: "Lyd gemt!",
        description: `Lyden er nu gemt som "${selectedOption.label}" for ${gameName}`,
      });

      // Reset state
      setGeneratedAudio(null);
      setPrompt("");
      setSelectedType("");
    } catch (error) {
      console.error("Error saving sound:", error);
      toast({
        title: "Fejl ved gem",
        description: error instanceof Error ? error.message : "Kunne ikke gemme lyd",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <Collapsible>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-violet-500" />
              AI Lydgenerator — {gameName}
            </CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Generer unikke lydeffekter til <strong>{gameName}</strong> ved hjælp af AI. Beskriv den lyd du ønsker, og gem den direkte.
            </p>

            {/* Prompt Input */}
            <div className="space-y-2">
              <Label htmlFor="sfx-prompt">Beskrivelse af lyd</Label>
              <Input
                id="sfx-prompt"
                placeholder="F.eks. 'Mystisk egyptisk tempel lyd med ekko og guldmønter'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Hurtige forslag</Label>
              <div className="flex flex-wrap gap-2">
                {PROMPT_SUGGESTIONS.map((suggestion) => (
                  <Button
                    key={suggestion.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion.prompt)}
                    disabled={isGenerating}
                    className="text-xs"
                  >
                    {suggestion.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Varighed</Label>
                <span className="text-sm text-muted-foreground">{duration} sekunder</span>
              </div>
              <Slider
                value={[duration]}
                onValueChange={(v) => setDuration(v[0])}
                min={0.5}
                max={10}
                step={0.5}
                disabled={isGenerating}
              />
              <p className="text-xs text-muted-foreground">
                Kortere lyde er bedre til spin og stop, længere til gevinster.
              </p>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Genererer lyd...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generer Lyd
                </>
              )}
            </Button>

            {/* Generated Audio Preview */}
            {generatedAudio && (
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-green-500" />
                  Genereret Lyd
                </h4>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={handlePlay} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Afspil
                  </Button>
                </div>

                {/* Save Options */}
                <div className="space-y-2">
                  <Label>Gem som lydtype</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg lydtype..." />
                    </SelectTrigger>
                    <SelectContent>
                      {soundTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={isSaving || !selectedType}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Gemmer...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Gem Lyd til {gameName}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
