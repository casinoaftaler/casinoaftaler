import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface BatchSoundGeneratorProps {
  gameId: string;
}

const SOUND_TYPES = [
  { key: "spinSound", label: "Spin Lyd", icon: "🌀" },
  { key: "stopSound", label: "Stop Lyd", icon: "🛑" },
  { key: "smallWinSound", label: "Lille Gevinst", icon: "🪙" },
  { key: "mediumWinSound", label: "Medium Gevinst", icon: "💰" },
  { key: "bigWinSound", label: "Stor Gevinst", icon: "⚡" },
  { key: "bonusTriggerSound", label: "Bonus Trigger", icon: "🎯" },
  { key: "bonusWinSound", label: "Bonus Afslutning", icon: "🏆" },
  { key: "scatterSound1", label: "Scatter 1", icon: "⚡" },
  { key: "scatterSound2", label: "Scatter 2", icon: "⚡⚡" },
  { key: "scatterSound3", label: "Scatter 3", icon: "⚡⚡⚡" },
  { key: "scatterCelebrationSound", label: "Scatter Fejring", icon: "🎉" },
  { key: "symbolHighlightSound", label: "Symbol Highlight", icon: "✨" },
  { key: "symbolExplodeSound", label: "Symbol Eksplosion", icon: "💥" },
  { key: "bombFizzSound", label: "Bombe Fuse", icon: "🧨" },
  { key: "bonusEndSound", label: "Bonus Afslutning", icon: "🔚" },
  { key: "scatterLandSound", label: "Scatter Landing", icon: "🎯" },
  { key: "symbolDropInSound", label: "Symbol Drop-In", icon: "🍬" },
];

type SoundStatus = "idle" | "generating" | "done" | "error";

export function BatchSoundGenerator({ gameId }: BatchSoundGeneratorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [statuses, setStatuses] = useState<Record<string, SoundStatus>>({});
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);
  const abortRef = useRef(false);

  const updateStatus = (key: string, status: SoundStatus) => {
    setStatuses(prev => ({ ...prev, [key]: status }));
  };

  const generateSingle = async (soundType: string): Promise<boolean> => {
    updateStatus(soundType, "generating");
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-game-sounds`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gameId, soundType }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.audioContent) {
        const binaryString = atob(data.audioContent);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        setAudioUrls(prev => ({ ...prev, [soundType]: url }));
      }

      updateStatus(soundType, "done");
      return true;
    } catch (error) {
      console.error(`Error generating ${soundType}:`, error);
      updateStatus(soundType, "error");
      return false;
    }
  };

  const handleGenerateAll = async () => {
    setIsRunning(true);
    abortRef.current = false;
    
    // Reset all statuses
    const initial: Record<string, SoundStatus> = {};
    SOUND_TYPES.forEach(s => { initial[s.key] = "idle"; });
    setStatuses(initial);
    setAudioUrls({});

    let successCount = 0;
    let failCount = 0;

    for (const sound of SOUND_TYPES) {
      if (abortRef.current) break;
      
      const success = await generateSingle(sound.key);
      if (success) successCount++;
      else failCount++;
      
      // Small delay between API calls to avoid rate limiting
      if (!abortRef.current) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    // Refresh sound files cache
    await queryClient.invalidateQueries({ queryKey: ["slot-sound-files", gameId] });

    toast({
      title: abortRef.current ? "Generering stoppet" : "Alle lyde genereret!",
      description: `${successCount} lyde gemt, ${failCount} fejlede${abortRef.current ? " (afbrudt)" : ""}`,
    });

    setIsRunning(false);
  };

  const handleStop = () => {
    abortRef.current = true;
  };

  const handleGenerateSingle = async (soundType: string) => {
    const success = await generateSingle(soundType);
    await queryClient.invalidateQueries({ queryKey: ["slot-sound-files", gameId] });
    toast({
      title: success ? "Lyd genereret!" : "Fejl",
      description: success ? `${soundType} blev gemt.` : `Kunne ikke generere ${soundType}.`,
      variant: success ? "default" : "destructive",
    });
  };

  const handlePlay = (soundType: string) => {
    const url = audioUrls[soundType];
    if (url) {
      const audio = new Audio(url);
      audio.play();
    }
  };

  const doneCount = Object.values(statuses).filter(s => s === "done").length;
  const totalCount = SOUND_TYPES.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-blue-500" />
          Batch Lydgenerator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Generer alle {totalCount} lydeffekter automatisk med AI. Lydene bliver tematisk tilpasset det valgte spil.
        </p>

        {/* Progress */}
        {isRunning && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Fremskridt</span>
              <span>{doneCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(doneCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Sound list */}
        <div className="grid gap-2">
          {SOUND_TYPES.map(sound => {
            const status = statuses[sound.key] || "idle";
            const hasAudio = !!audioUrls[sound.key];
            
            return (
              <div
                key={sound.key}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg border text-sm",
                  status === "done" && "border-green-500/30 bg-green-500/5",
                  status === "error" && "border-destructive/30 bg-destructive/5",
                  status === "generating" && "border-blue-500/30 bg-blue-500/5",
                  status === "idle" && "border-border"
                )}
              >
                <div className="flex items-center gap-2">
                  <span>{sound.icon}</span>
                  <span>{sound.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {status === "generating" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                  {status === "done" && <MenuIcon iconName="check-circle" className="h-4 w-4 text-green-500" />}
                  {status === "error" && <MenuIcon iconName="x-circle" className="h-4 w-4 text-destructive" />}
                  {hasAudio && (
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handlePlay(sound.key)}>
                      <MenuIcon iconName="play" className="h-3 w-3" />
                    </Button>
                  )}
                  {status !== "generating" && !isRunning && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => handleGenerateSingle(sound.key)}
                    >
                      <Wand2 className="h-3 w-3 mr-1" />
                      Generer
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {!isRunning ? (
            <Button
              onClick={handleGenerateAll}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Generer Alle {totalCount} Lyde
            </Button>
          ) : (
            <Button onClick={handleStop} variant="destructive" className="w-full">
              Stop Generering
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
