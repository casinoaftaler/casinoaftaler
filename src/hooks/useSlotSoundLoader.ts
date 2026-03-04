import { useEffect, useRef } from "react";
import { useSlotSoundFiles } from "./useSlotSoundFiles";
import { slotSounds, CustomSoundFiles } from "@/lib/slotSoundEffects";

/**
 * Hook that loads custom sound files from site_settings and sets them on the slotSounds singleton.
 * Call this once at the top level of the slot machine component.
 * Pass a gameId to load game-specific sounds (e.g., "rise-of-fedesvin").
 */
export function useSlotSoundLoader(gameId: string = "book-of-fedesvin") {
  const { data: soundFiles, isLoading } = useSlotSoundFiles(gameId);
  const prevGameIdRef = useRef<string>(gameId);

  // Set game ID first — this clears stale sounds from the previous game
  useEffect(() => {
    slotSounds.setGameId(gameId);
    prevGameIdRef.current = gameId;
  }, [gameId]);

  // Once sound files are loaded, push them to the singleton
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
        symbolHighlightSound: soundFiles.symbolHighlightSound,
        symbolDropInSound: soundFiles.symbolDropInSound,
        symbolExplodeSound: soundFiles.symbolExplodeSound,
        bombFizzSound: soundFiles.bombFizzSound,
        bonusEndSound: soundFiles.bonusEndSound,
      };
      
      slotSounds.setCustomSoundFiles(customFiles);
    }
  }, [soundFiles, gameId]);

  return { isLoading };
}
