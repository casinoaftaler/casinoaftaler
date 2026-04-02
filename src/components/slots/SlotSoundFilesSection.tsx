import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SlotSoundUpload } from "./SlotSoundUpload";
import { useSlotSoundFiles, getSoundSettingKeys, type SlotSoundFiles } from "@/hooks/useSlotSoundFiles";
import { Loader2, FileAudio, ChevronDown, Music, Cat } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;

interface SlotSoundFilesSectionProps {
  gameId?: string;
}

const GAME_LABELS: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
  "gates-of-fedesvin": "Gates of Fedesvin",
  "fedesvin-bonanza": "Fedesvin Bonanza",
};

export function SlotSoundFilesSection({ gameId = "book-of-fedesvin" }: SlotSoundFilesSectionProps) {
  const { data: soundFiles, isLoading } = useSlotSoundFiles(gameId);
  const settingKeys = getSoundSettingKeys(gameId);
  const gameName = GAME_LABELS[gameId] || gameId;

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
    bonusSymbolSelectedSound: null,
    scatterSound1: null,
    scatterSound2: null,
    scatterSound3: null,
    scatterCelebrationSound: null,
    symbolHighlightSound: null,
    symbolExplodeSound: null,
    bombFizzSound: null,
    bonusEndSound: null,
    scatterLandSound: null,
    symbolDropInSound: null,
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
              Brugerdefinerede Lydfiler — {gameName}
            </CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Upload dine egne lydfiler til <strong>{gameName}</strong>. 
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
                  settingKey={settingKeys.backgroundMusic}
                  currentUrl={localFiles.backgroundMusic}
                  onUrlChange={handleUrlChange("backgroundMusic")}
                />
              </div>
            </div>

            {/* Spinning Sounds */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium flex items-center gap-2">
                <MenuIcon iconName="volume2" className="h-4 w-4 text-blue-400" />
                Spil Lyde
              </h4>
              <div className="pl-6 space-y-4">
                <SlotSoundUpload
                  label="Spinning Lyd"
                  description="Afspilles mens hjulene snurrer. Anbefalet: kort loop eller 2-3 sekunder."
                  settingKey={settingKeys.spinSound}
                  currentUrl={localFiles.spinSound}
                  onUrlChange={handleUrlChange("spinSound")}
                />
                <SlotSoundUpload
                  label="Stop Lyd"
                  description="Afspilles når et hjul stopper. Anbefalet: kort impact lyd (0.5-1 sekund)."
                  settingKey={settingKeys.stopSound}
                  currentUrl={localFiles.stopSound}
                  onUrlChange={handleUrlChange("stopSound")}
                />
              </div>
            </div>

            {/* Win Sounds */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium flex items-center gap-2">
                <MenuIcon iconName="coins" className="h-4 w-4 text-amber-400" />
                Gevinst Lyde
              </h4>
              <div className="pl-6 space-y-4">
                <SlotSoundUpload
                  label="Lille Gevinst"
                  description="Afspilles ved små gevinster (2-3 matchende symboler)."
                  settingKey={settingKeys.smallWinSound}
                  currentUrl={localFiles.smallWinSound}
                  onUrlChange={handleUrlChange("smallWinSound")}
                />
                <SlotSoundUpload
                  label="Medium Gevinst"
                  description="Afspilles ved medium gevinster (4 matchende symboler)."
                  settingKey={settingKeys.mediumWinSound}
                  currentUrl={localFiles.mediumWinSound}
                  onUrlChange={handleUrlChange("mediumWinSound")}
                />
                <SlotSoundUpload
                  label="Stor Gevinst"
                  description="Afspilles ved store gevinster (5 matchende eller høj multiplikator)."
                  settingKey={settingKeys.bigWinSound}
                  currentUrl={localFiles.bigWinSound}
                  onUrlChange={handleUrlChange("bigWinSound")}
                />
              </div>
            </div>

            {/* Bonus Sounds */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium flex items-center gap-2">
                <MenuIcon iconName="sparkles" className="h-4 w-4 text-yellow-400" />
                Bonus Lyde
              </h4>
              <div className="pl-6 space-y-4">
                <SlotSoundUpload
                  label="Bonus Trigger"
                  description="Afspilles når bonus-rundens aktiveres (3+ scatter symboler)."
                  settingKey={settingKeys.bonusTriggerSound}
                  currentUrl={localFiles.bonusTriggerSound}
                  onUrlChange={handleUrlChange("bonusTriggerSound")}
                />
                <SlotSoundUpload
                  label="Scatter Celebration"
                  description="Afspilles under scatter celebration (pulserende symboler) før bonus-skærmen vises."
                  settingKey={settingKeys.scatterCelebrationSound}
                  currentUrl={localFiles.scatterCelebrationSound}
                  onUrlChange={handleUrlChange("scatterCelebrationSound")}
                />
                <SlotSoundUpload
                  label="Symbol Scroll"
                  description="Afspilles mens symbolerne scroller på bonus trigger skærmen."
                  settingKey={settingKeys.bonusSymbolScrollSound}
                  currentUrl={localFiles.bonusSymbolScrollSound}
                  onUrlChange={handleUrlChange("bonusSymbolScrollSound")}
                />
                <SlotSoundUpload
                  label="Symbol Valgt"
                  description="Afspilles når det ekspanderende symbol er valgt."
                  settingKey={settingKeys.bonusSymbolSelectedSound}
                  currentUrl={localFiles.bonusSymbolSelectedSound}
                  onUrlChange={handleUrlChange("bonusSymbolSelectedSound")}
                />
                <SlotSoundUpload
                  label="Bonus Afslutning"
                  description="Afspilles når bonus-runden afsluttes med gevinst."
                  settingKey={settingKeys.bonusWinSound}
                  currentUrl={localFiles.bonusWinSound}
                  onUrlChange={handleUrlChange("bonusWinSound")}
                />
              </div>
            </div>

            {/* Scatter Sounds */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium flex items-center gap-2">
                <Cat className="h-4 w-4 text-pink-400" />
                Scatter Lyde
              </h4>
              <div className="pl-6 space-y-4">
                <SlotSoundUpload
                  label="Scatter 1"
                  description="Afspilles når 1. scatter lander."
                  settingKey={settingKeys.scatterSound1}
                  currentUrl={localFiles.scatterSound1}
                  onUrlChange={handleUrlChange("scatterSound1")}
                />
                <SlotSoundUpload
                  label="Scatter 2"
                  description="Afspilles når 2. scatter lander. Mere intens."
                  settingKey={settingKeys.scatterSound2}
                  currentUrl={localFiles.scatterSound2}
                  onUrlChange={handleUrlChange("scatterSound2")}
                />
                <SlotSoundUpload
                  label="Scatter 3"
                  description="Afspilles når 3. scatter lander. Kraftigt og sejrende!"
                  settingKey={settingKeys.scatterSound3}
                  currentUrl={localFiles.scatterSound3}
                  onUrlChange={handleUrlChange("scatterSound3")}
                />
                <SlotSoundUpload
                  label="Symbol Drop-In"
                  description="Afspilles når nye symboler falder ned i gitteret efter en tumble."
                  settingKey={settingKeys.symbolDropInSound}
                  currentUrl={localFiles.symbolDropInSound}
                  onUrlChange={handleUrlChange("symbolDropInSound")}
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
