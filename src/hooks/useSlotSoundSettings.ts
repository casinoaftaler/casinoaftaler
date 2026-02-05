import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SlotSoundSettings {
  // Spinning sound settings
  spinClickInterval: number;    // ms between clicks (default: 45)
  spinClickFreqStart: number;   // start frequency Hz (default: 280)
  spinClickFreqEnd: number;     // end frequency Hz (default: 180)
  spinClickVolume: number;      // 0-1 (default: 0.12)
  spinMotorVolume: number;      // 0-1 (default: 0.03)
  spinTickerEnabled: boolean;   // mechanism ticker (default: true)
  spinTickerFrequency: number;  // Hz (default: 1000)
  
  // Stop sound settings
  stopImpactVolume: number;     // 0-1 (default: 0.3)
  stopChimeEnabled: boolean;    // golden chime (default: true)
  stopChimeVolume: number;      // 0-1 (default: 0.1)
  
  // Scatter sound settings
  scatterVolume: number;        // 0-1 (default: 0.35)
  
  // Win sound settings
  winSmallVolume: number;       // 0-1 (default: 0.22)
  winSmallArpeggioSpeed: number; // ms between notes (default: 80)
  winSmallCoinCount: number;    // number of coin sounds (default: 5)
  
  winMediumVolume: number;      // 0-1 (default: 0.18)
  winMediumSistrumCount: number; // number of sistrum shakes (default: 12)
  winMediumCoinCount: number;   // number of coins (default: 15)
  
  winBigVolume: number;         // 0-1 (default: 0.25)
  winBigFanfareEnabled: boolean; // epic fanfare (default: true)
  winBigDrumEnabled: boolean;   // deep drums (default: true)
}

const DEFAULT_SETTINGS: SlotSoundSettings = {
  spinClickInterval: 45,
  spinClickFreqStart: 280,
  spinClickFreqEnd: 180,
  spinClickVolume: 0.12,
  spinMotorVolume: 0.03,
  spinTickerEnabled: true,
  spinTickerFrequency: 1000,
  stopImpactVolume: 0.3,
  stopChimeEnabled: true,
  stopChimeVolume: 0.1,
  // Scatter sounds
  scatterVolume: 0.35,
  // Win sounds
  winSmallVolume: 0.22,
  winSmallArpeggioSpeed: 80,
  winSmallCoinCount: 5,
  winMediumVolume: 0.18,
  winMediumSistrumCount: 12,
  winMediumCoinCount: 15,
  winBigVolume: 0.25,
  winBigFanfareEnabled: true,
  winBigDrumEnabled: true,
};

export function useSlotSoundSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["slot-sound-settings"],
    queryFn: async (): Promise<SlotSoundSettings> => {
      const keys = [
        "slot_sound_click_interval",
        "slot_sound_click_freq_start",
        "slot_sound_click_freq_end",
        "slot_sound_click_volume",
        "slot_sound_motor_volume",
        "slot_sound_ticker_enabled",
        "slot_sound_ticker_frequency",
        "slot_sound_stop_impact_volume",
        "slot_sound_stop_chime_enabled",
        "slot_sound_stop_chime_volume",
        // Scatter sounds
        "slot_sound_scatter_volume",
        // Win sounds
        "slot_sound_win_small_volume",
        "slot_sound_win_small_arpeggio_speed",
        "slot_sound_win_small_coin_count",
        "slot_sound_win_medium_volume",
        "slot_sound_win_medium_sistrum_count",
        "slot_sound_win_medium_coin_count",
        "slot_sound_win_big_volume",
        "slot_sound_win_big_fanfare_enabled",
        "slot_sound_win_big_drum_enabled",
      ];

      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", keys);

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || "";
      });

      return {
        spinClickInterval: parseInt(settingsMap.slot_sound_click_interval || String(DEFAULT_SETTINGS.spinClickInterval), 10),
        spinClickFreqStart: parseInt(settingsMap.slot_sound_click_freq_start || String(DEFAULT_SETTINGS.spinClickFreqStart), 10),
        spinClickFreqEnd: parseInt(settingsMap.slot_sound_click_freq_end || String(DEFAULT_SETTINGS.spinClickFreqEnd), 10),
        spinClickVolume: parseFloat(settingsMap.slot_sound_click_volume || String(DEFAULT_SETTINGS.spinClickVolume)),
        spinMotorVolume: parseFloat(settingsMap.slot_sound_motor_volume || String(DEFAULT_SETTINGS.spinMotorVolume)),
        spinTickerEnabled: settingsMap.slot_sound_ticker_enabled !== "false",
        spinTickerFrequency: parseInt(settingsMap.slot_sound_ticker_frequency || String(DEFAULT_SETTINGS.spinTickerFrequency), 10),
        stopImpactVolume: parseFloat(settingsMap.slot_sound_stop_impact_volume || String(DEFAULT_SETTINGS.stopImpactVolume)),
        stopChimeEnabled: settingsMap.slot_sound_stop_chime_enabled !== "false",
        stopChimeVolume: parseFloat(settingsMap.slot_sound_stop_chime_volume || String(DEFAULT_SETTINGS.stopChimeVolume)),
        // Scatter sounds
        scatterVolume: parseFloat(settingsMap.slot_sound_scatter_volume || String(DEFAULT_SETTINGS.scatterVolume)),
        // Win sounds
        winSmallVolume: parseFloat(settingsMap.slot_sound_win_small_volume || String(DEFAULT_SETTINGS.winSmallVolume)),
        winSmallArpeggioSpeed: parseInt(settingsMap.slot_sound_win_small_arpeggio_speed || String(DEFAULT_SETTINGS.winSmallArpeggioSpeed), 10),
        winSmallCoinCount: parseInt(settingsMap.slot_sound_win_small_coin_count || String(DEFAULT_SETTINGS.winSmallCoinCount), 10),
        winMediumVolume: parseFloat(settingsMap.slot_sound_win_medium_volume || String(DEFAULT_SETTINGS.winMediumVolume)),
        winMediumSistrumCount: parseInt(settingsMap.slot_sound_win_medium_sistrum_count || String(DEFAULT_SETTINGS.winMediumSistrumCount), 10),
        winMediumCoinCount: parseInt(settingsMap.slot_sound_win_medium_coin_count || String(DEFAULT_SETTINGS.winMediumCoinCount), 10),
        winBigVolume: parseFloat(settingsMap.slot_sound_win_big_volume || String(DEFAULT_SETTINGS.winBigVolume)),
        winBigFanfareEnabled: settingsMap.slot_sound_win_big_fanfare_enabled !== "false",
        winBigDrumEnabled: settingsMap.slot_sound_win_big_drum_enabled !== "false",
      };
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<SlotSoundSettings>) => {
      const updates: { key: string; value: string }[] = [];
      
      if (newSettings.spinClickInterval !== undefined) {
        updates.push({ key: "slot_sound_click_interval", value: String(newSettings.spinClickInterval) });
      }
      if (newSettings.spinClickFreqStart !== undefined) {
        updates.push({ key: "slot_sound_click_freq_start", value: String(newSettings.spinClickFreqStart) });
      }
      if (newSettings.spinClickFreqEnd !== undefined) {
        updates.push({ key: "slot_sound_click_freq_end", value: String(newSettings.spinClickFreqEnd) });
      }
      if (newSettings.spinClickVolume !== undefined) {
        updates.push({ key: "slot_sound_click_volume", value: String(newSettings.spinClickVolume) });
      }
      if (newSettings.spinMotorVolume !== undefined) {
        updates.push({ key: "slot_sound_motor_volume", value: String(newSettings.spinMotorVolume) });
      }
      if (newSettings.spinTickerEnabled !== undefined) {
        updates.push({ key: "slot_sound_ticker_enabled", value: String(newSettings.spinTickerEnabled) });
      }
      if (newSettings.spinTickerFrequency !== undefined) {
        updates.push({ key: "slot_sound_ticker_frequency", value: String(newSettings.spinTickerFrequency) });
      }
      if (newSettings.stopImpactVolume !== undefined) {
        updates.push({ key: "slot_sound_stop_impact_volume", value: String(newSettings.stopImpactVolume) });
      }
      if (newSettings.stopChimeEnabled !== undefined) {
        updates.push({ key: "slot_sound_stop_chime_enabled", value: String(newSettings.stopChimeEnabled) });
      }
      if (newSettings.stopChimeVolume !== undefined) {
        updates.push({ key: "slot_sound_stop_chime_volume", value: String(newSettings.stopChimeVolume) });
      }
      // Scatter sounds
      if (newSettings.scatterVolume !== undefined) {
        updates.push({ key: "slot_sound_scatter_volume", value: String(newSettings.scatterVolume) });
      }
      // Win sounds
      if (newSettings.winSmallVolume !== undefined) {
        updates.push({ key: "slot_sound_win_small_volume", value: String(newSettings.winSmallVolume) });
      }
      if (newSettings.winSmallArpeggioSpeed !== undefined) {
        updates.push({ key: "slot_sound_win_small_arpeggio_speed", value: String(newSettings.winSmallArpeggioSpeed) });
      }
      if (newSettings.winSmallCoinCount !== undefined) {
        updates.push({ key: "slot_sound_win_small_coin_count", value: String(newSettings.winSmallCoinCount) });
      }
      if (newSettings.winMediumVolume !== undefined) {
        updates.push({ key: "slot_sound_win_medium_volume", value: String(newSettings.winMediumVolume) });
      }
      if (newSettings.winMediumSistrumCount !== undefined) {
        updates.push({ key: "slot_sound_win_medium_sistrum_count", value: String(newSettings.winMediumSistrumCount) });
      }
      if (newSettings.winMediumCoinCount !== undefined) {
        updates.push({ key: "slot_sound_win_medium_coin_count", value: String(newSettings.winMediumCoinCount) });
      }
      if (newSettings.winBigVolume !== undefined) {
        updates.push({ key: "slot_sound_win_big_volume", value: String(newSettings.winBigVolume) });
      }
      if (newSettings.winBigFanfareEnabled !== undefined) {
        updates.push({ key: "slot_sound_win_big_fanfare_enabled", value: String(newSettings.winBigFanfareEnabled) });
      }
      if (newSettings.winBigDrumEnabled !== undefined) {
        updates.push({ key: "slot_sound_win_big_drum_enabled", value: String(newSettings.winBigDrumEnabled) });
      }

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(
            { key: update.key, value: update.value },
            { onConflict: "key" }
          );

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-sound-settings"] });
      toast.success("Lydindstillinger gemt");
    },
    onError: (error: Error) => {
      toast.error("Kunne ikke gemme lydindstillinger: " + error.message);
    },
  });

  const resetToDefaults = useMutation({
    mutationFn: async () => {
      const keys = [
        "slot_sound_click_interval",
        "slot_sound_click_freq_start",
        "slot_sound_click_freq_end",
        "slot_sound_click_volume",
        "slot_sound_motor_volume",
        "slot_sound_ticker_enabled",
        "slot_sound_ticker_frequency",
        "slot_sound_stop_impact_volume",
        "slot_sound_stop_chime_enabled",
        "slot_sound_stop_chime_volume",
        "slot_sound_scatter_volume",
        "slot_sound_win_small_volume",
        "slot_sound_win_small_arpeggio_speed",
        "slot_sound_win_small_coin_count",
        "slot_sound_win_medium_volume",
        "slot_sound_win_medium_sistrum_count",
        "slot_sound_win_medium_coin_count",
        "slot_sound_win_big_volume",
        "slot_sound_win_big_fanfare_enabled",
        "slot_sound_win_big_drum_enabled",
      ];

      const { error } = await supabase
        .from("site_settings")
        .delete()
        .in("key", keys);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-sound-settings"] });
      toast.success("Lydindstillinger nulstillet til standard");
    },
    onError: (error: Error) => {
      toast.error("Kunne ikke nulstille lydindstillinger: " + error.message);
    },
  });

  return {
    settings: settings ?? DEFAULT_SETTINGS,
    isLoading,
    updateSettings,
    resetToDefaults,
    DEFAULT_SETTINGS,
  };
}
