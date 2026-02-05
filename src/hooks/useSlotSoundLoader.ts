import { useEffect } from "react";
import { useSlotSoundFiles } from "./useSlotSoundFiles";
import { slotSounds, CustomSoundFiles } from "@/lib/slotSoundEffects";

/**
 * Hook that loads custom sound files from site_settings and sets them on the slotSounds singleton.
 * Call this once at the top level of the slot machine component.
 */
export function useSlotSoundLoader() {
  const { data: soundFiles, isLoading } = useSlotSoundFiles();

  useEffect(() => {
    if (soundFiles) {
      const customFiles: CustomSoundFiles = {
        backgroundMusic: soundFiles.backgroundMusic,
        spinSound: soundFiles.spinSound,
        stopSound: soundFiles.stopSound,
        smallWinSound: soundFiles.smallWinSound,
        mediumWinSound: soundFiles.mediumWinSound,
        bigWinSound: soundFiles.bigWinSound,
        bonusTriggerSound: soundFiles.bonusTriggerSound,
        bonusWinSound: soundFiles.bonusWinSound,
        bonusSymbolScrollSound: soundFiles.bonusSymbolScrollSound,
        bonusSymbolSelectedSound: soundFiles.bonusSymbolSelectedSound,
        scatterSound1: soundFiles.scatterSound1,
        scatterSound2: soundFiles.scatterSound2,
        scatterSound3: soundFiles.scatterSound3,
        scatterCelebrationSound: soundFiles.scatterCelebrationSound,
      };
      
      slotSounds.setCustomSoundFiles(customFiles);
    }
  }, [soundFiles]);

  return { isLoading };
}
