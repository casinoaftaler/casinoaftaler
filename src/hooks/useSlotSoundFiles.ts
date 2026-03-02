import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SlotSoundFiles {
  backgroundMusic: string | null;
  spinSound: string | null;
  stopSound: string | null;
  smallWinSound: string | null;
  mediumWinSound: string | null;
  bigWinSound: string | null;
  bonusTriggerSound: string | null;
  bonusWinSound: string | null;
  bonusSymbolScrollSound: string | null;
  bonusSymbolSelectedSound: string | null;
  scatterSound1: string | null;
  scatterSound2: string | null;
  scatterSound3: string | null;
  scatterCelebrationSound: string | null;
  symbolHighlightSound: string | null;
  symbolExplodeSound: string | null;
  bombFizzSound: string | null;
  bonusEndSound: string | null;
  scatterLandSound: string | null;
}

export type SoundSettingKeys = Record<keyof SlotSoundFiles, string>;

const SOUND_SUFFIXES: Record<keyof SlotSoundFiles, string> = {
  backgroundMusic: "background_music",
  spinSound: "spin",
  stopSound: "stop",
  smallWinSound: "small_win",
  mediumWinSound: "medium_win",
  bigWinSound: "big_win",
  bonusTriggerSound: "bonus_trigger",
  bonusWinSound: "bonus_win",
  bonusSymbolScrollSound: "bonus_symbol_scroll",
  bonusSymbolSelectedSound: "bonus_symbol_selected",
  scatterSound1: "scatter_1",
  scatterSound2: "scatter_2",
  scatterSound3: "scatter_3",
  scatterCelebrationSound: "scatter_celebration",
  symbolHighlightSound: "symbol_highlight",
  symbolExplodeSound: "symbol_explode",
  bombFizzSound: "bomb_fizz",
  bonusEndSound: "bonus_end",
  scatterLandSound: "scatter_land",
};

function getPrefix(gameId: string): string {
  if (gameId === "book-of-fedesvin") return "slot_sound_file_";
  return `${gameId.replace(/-/g, "_")}_sound_file_`;
}

export function getSoundSettingKeys(gameId: string = "book-of-fedesvin"): SoundSettingKeys {
  const prefix = getPrefix(gameId);
  const keys = {} as SoundSettingKeys;
  for (const [prop, suffix] of Object.entries(SOUND_SUFFIXES)) {
    keys[prop as keyof SlotSoundFiles] = `${prefix}${suffix}`;
  }
  return keys;
}

// Backward compatible export for existing admin components
export const SLOT_SOUND_SETTING_KEYS = getSoundSettingKeys("book-of-fedesvin");

export function useSlotSoundFiles(gameId: string = "book-of-fedesvin") {
  const settingKeys = getSoundSettingKeys(gameId);
  const keyValues = Object.values(settingKeys);

  return useQuery({
    queryKey: ["slot-sound-files", gameId],
    queryFn: async (): Promise<SlotSoundFiles> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", keyValues);

      if (error) throw error;

      const settingsMap: Record<string, string | null> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || null;
      });

      const result = {} as SlotSoundFiles;
      for (const [prop, dbKey] of Object.entries(settingKeys)) {
        result[prop as keyof SlotSoundFiles] = settingsMap[dbKey] || null;
      }
      return result;
    },
  });
}
