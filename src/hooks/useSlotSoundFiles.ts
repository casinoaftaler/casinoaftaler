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
}

const SOUND_KEYS = [
  "slot_sound_file_background_music",
  "slot_sound_file_spin",
  "slot_sound_file_stop",
  "slot_sound_file_small_win",
  "slot_sound_file_medium_win",
  "slot_sound_file_big_win",
  "slot_sound_file_bonus_trigger",
  "slot_sound_file_bonus_win",
  "slot_sound_file_bonus_symbol_scroll",
  "slot_sound_file_bonus_symbol_selected",
  "slot_sound_file_scatter_1",
  "slot_sound_file_scatter_2",
  "slot_sound_file_scatter_3",
] as const;

export function useSlotSoundFiles() {
  return useQuery({
    queryKey: ["slot-sound-files"],
    queryFn: async (): Promise<SlotSoundFiles> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", SOUND_KEYS);

      if (error) throw error;

      const settingsMap: Record<string, string | null> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || null;
      });

      return {
        backgroundMusic: settingsMap.slot_sound_file_background_music || null,
        spinSound: settingsMap.slot_sound_file_spin || null,
        stopSound: settingsMap.slot_sound_file_stop || null,
        smallWinSound: settingsMap.slot_sound_file_small_win || null,
        mediumWinSound: settingsMap.slot_sound_file_medium_win || null,
        bigWinSound: settingsMap.slot_sound_file_big_win || null,
        bonusTriggerSound: settingsMap.slot_sound_file_bonus_trigger || null,
        bonusWinSound: settingsMap.slot_sound_file_bonus_win || null,
        bonusSymbolScrollSound: settingsMap.slot_sound_file_bonus_symbol_scroll || null,
        bonusSymbolSelectedSound: settingsMap.slot_sound_file_bonus_symbol_selected || null,
        scatterSound1: settingsMap.slot_sound_file_scatter_1 || null,
        scatterSound2: settingsMap.slot_sound_file_scatter_2 || null,
        scatterSound3: settingsMap.slot_sound_file_scatter_3 || null,
      };
    },
  });
}

export const SLOT_SOUND_SETTING_KEYS = {
  backgroundMusic: "slot_sound_file_background_music",
  spinSound: "slot_sound_file_spin",
  stopSound: "slot_sound_file_stop",
  smallWinSound: "slot_sound_file_small_win",
  mediumWinSound: "slot_sound_file_medium_win",
  bigWinSound: "slot_sound_file_big_win",
  bonusTriggerSound: "slot_sound_file_bonus_trigger",
  bonusWinSound: "slot_sound_file_bonus_win",
  bonusSymbolScrollSound: "slot_sound_file_bonus_symbol_scroll",
  bonusSymbolSelectedSound: "slot_sound_file_bonus_symbol_selected",
  scatterSound1: "slot_sound_file_scatter_1",
  scatterSound2: "slot_sound_file_scatter_2",
  scatterSound3: "slot_sound_file_scatter_3",
} as const;
