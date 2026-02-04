import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SlotSoundUpload } from "./SlotSoundUpload";
import { useSlotSoundFiles, SLOT_SOUND_SETTING_KEYS, type SlotSoundFiles } from "@/hooks/useSlotSoundFiles";
import { Loader2, FileAudio, ChevronDown, Music, Volume2, Coins, Trophy, Crown, Sparkles } from "lucide-react";

export function SlotSoundFilesSection() {
  const { data: soundFiles, isLoading } = useSlotSoundFiles();
  const [localFiles, setLocalFiles] = useState<SlotSoundFiles>({
    backgroundMusic: null,
    spinSound: null,
    stopSound: null,
    smallWinSound: null,
    mediumWinSound: null,
    bigWinSound: null,
    bonusTriggerSound: null,
    bonusWinSound: null,
    bonusSymbolScrollSound: null,
  });

  useEffect(() => {
    if (soundFiles) {
      setLocalFiles(soundFiles);
    }
  }, [soundFiles]);

  const handleUrlChange = (key: keyof SlotSoundFiles) => (url: string | null) => {
    setLocalFiles((prev) => ({ ...prev, [key]: url }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Collapsible>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <CardTitle className="flex items-center gap-2">
              <FileAudio className="h-5 w-5 text-purple-500" />
              Brugerdefinerede Lydfiler
            </CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Upload dine egne lydfiler til at erstatte de genererede lyde. 
              Understøttede formater: MP3, WAV, OGG, WebM (maks 5MB).
            </p>

            {/* Background Music */}
            <div className="space-y-4 pt-2">
              <h4 className="font-medium flex items-center gap-2">
                <Music className="h-4 w-4 text-purple-400" />
                Baggrundsmusik
              </h4>
              <div className="pl-6">
                <SlotSoundUpload
                  label="Baggrundsmusik"
                  description="Loopende musik der afspilles under spil. Anbefalet: 30-120 sekunder."
                  settingKey={SLOT_SOUND_SETTING_KEYS.backgroundMusic}
                  currentUrl={localFiles.backgroundMusic}
                  onUrlChange={handleUrlChange("backgroundMusic")}
                />
              </div>
            </div>

            {/* Spinning Sounds */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-blue-400" />
                Spil Lyde
              </h4>
              <div className="pl-6 space-y-4">
                <SlotSoundUpload
                  label="Spinning Lyd"
                  description="Afspilles mens hjulene snurrer. Anbefalet: kort loop eller 2-3 sekunder."
                  settingKey={SLOT_SOUND_SETTING_KEYS.spinSound}
                  currentUrl={localFiles.spinSound}
                  onUrlChange={handleUrlChange("spinSound")}
                />
                <SlotSoundUpload
                  label="Stop Lyd"
                  description="Afspilles når et hjul stopper. Anbefalet: kort impact lyd (0.5-1 sekund)."
                  settingKey={SLOT_SOUND_SETTING_KEYS.stopSound}
                  currentUrl={localFiles.stopSound}
                  onUrlChange={handleUrlChange("stopSound")}
                />
              </div>
            </div>

            {/* Win Sounds */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium flex items-center gap-2">
                <Coins className="h-4 w-4 text-amber-400" />
                Gevinst Lyde
              </h4>
              <div className="pl-6 space-y-4">
                <SlotSoundUpload
                  label="Lille Gevinst"
                  description="Afspilles ved små gevinster (2-3 matchende symboler)."
                  settingKey={SLOT_SOUND_SETTING_KEYS.smallWinSound}
                  currentUrl={localFiles.smallWinSound}
                  onUrlChange={handleUrlChange("smallWinSound")}
                />
                <SlotSoundUpload
                  label="Medium Gevinst"
                  description="Afspilles ved medium gevinster (4 matchende symboler)."
                  settingKey={SLOT_SOUND_SETTING_KEYS.mediumWinSound}
                  currentUrl={localFiles.mediumWinSound}
                  onUrlChange={handleUrlChange("mediumWinSound")}
                />
                <SlotSoundUpload
                  label="Stor Gevinst"
                  description="Afspilles ved store gevinster (5 matchende eller høj multiplikator)."
                  settingKey={SLOT_SOUND_SETTING_KEYS.bigWinSound}
                  currentUrl={localFiles.bigWinSound}
                  onUrlChange={handleUrlChange("bigWinSound")}
                />
              </div>
            </div>

            {/* Bonus Sounds */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                Bonus Lyde
              </h4>
              <div className="pl-6 space-y-4">
                <SlotSoundUpload
                  label="Bonus Trigger"
                  description="Afspilles når bonus-rundens aktiveres (3+ scatter symboler)."
                  settingKey={SLOT_SOUND_SETTING_KEYS.bonusTriggerSound}
                  currentUrl={localFiles.bonusTriggerSound}
                  onUrlChange={handleUrlChange("bonusTriggerSound")}
                />
                <SlotSoundUpload
                  label="Symbol Scroll"
                  description="Afspilles mens symbolerne scroller på bonus trigger skærmen."
                  settingKey={SLOT_SOUND_SETTING_KEYS.bonusSymbolScrollSound}
                  currentUrl={localFiles.bonusSymbolScrollSound}
                  onUrlChange={handleUrlChange("bonusSymbolScrollSound")}
                />
                <SlotSoundUpload
                  label="Bonus Afslutning"
                  description="Afspilles når bonus-runden afsluttes med gevinst."
                  settingKey={SLOT_SOUND_SETTING_KEYS.bonusWinSound}
                  currentUrl={localFiles.bonusWinSound}
                  onUrlChange={handleUrlChange("bonusWinSound")}
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
