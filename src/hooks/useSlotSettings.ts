import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SlotSettings {
  dailySpins: number;
  minBet: number;
  maxBet: number;
  pageLocked: boolean;
  pagePassword: string;
  riseLocked: boolean;
  risePassword: string;
  gatesLocked: boolean;
  gatesPassword: string;
  spinLoopMs: number;
  reelStaggerMs: number;
  reelSlowdownMs: number;
}

export function useSlotSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["slot-settings"],
    queryFn: async (): Promise<SlotSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["slot_daily_spins", "slot_min_bet", "slot_max_bet", "slot_page_locked", "slot_page_password", "rise_of_fedesvin_locked", "rise_of_fedesvin_password", "gates_of_fedesvin_locked", "gates_of_fedesvin_password", "slot_spin_loop_ms", "slot_reel_stagger_ms", "slot_reel_slowdown_ms"]);

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || "";
      });

      return {
        dailySpins: parseInt(settingsMap.slot_daily_spins || "100", 10),
        minBet: parseInt(settingsMap.slot_min_bet || "1", 10),
        maxBet: parseInt(settingsMap.slot_max_bet || "40", 10),
        pageLocked: settingsMap.slot_page_locked === "true",
        pagePassword: settingsMap.slot_page_password || "bookoffedesvin2026",
        riseLocked: settingsMap.rise_of_fedesvin_locked === "true",
        risePassword: settingsMap.rise_of_fedesvin_password || "",
        gatesLocked: settingsMap.gates_of_fedesvin_locked === "true",
        gatesPassword: settingsMap.gates_of_fedesvin_password || "",
        spinLoopMs: parseInt(settingsMap.slot_spin_loop_ms || "600", 10),
        reelStaggerMs: parseInt(settingsMap.slot_reel_stagger_ms || "20", 10),
        reelSlowdownMs: parseInt(settingsMap.slot_reel_slowdown_ms || "300", 10),
      };
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<SlotSettings>) => {
      const updates: { key: string; value: string }[] = [];
      
      if (newSettings.dailySpins !== undefined) {
        updates.push({ key: "slot_daily_spins", value: String(newSettings.dailySpins) });
      }
      if (newSettings.minBet !== undefined) {
        updates.push({ key: "slot_min_bet", value: String(newSettings.minBet) });
      }
      if (newSettings.maxBet !== undefined) {
        updates.push({ key: "slot_max_bet", value: String(newSettings.maxBet) });
      }
      if (newSettings.pageLocked !== undefined) {
        updates.push({ key: "slot_page_locked", value: String(newSettings.pageLocked) });
      }
      if (newSettings.pagePassword !== undefined) {
        updates.push({ key: "slot_page_password", value: newSettings.pagePassword });
      }
      if (newSettings.riseLocked !== undefined) {
        updates.push({ key: "rise_of_fedesvin_locked", value: String(newSettings.riseLocked) });
      }
      if (newSettings.risePassword !== undefined) {
        updates.push({ key: "rise_of_fedesvin_password", value: newSettings.risePassword });
      }
      if (newSettings.gatesLocked !== undefined) {
        updates.push({ key: "gates_of_fedesvin_locked", value: String(newSettings.gatesLocked) });
      }
      if (newSettings.gatesPassword !== undefined) {
        updates.push({ key: "gates_of_fedesvin_password", value: newSettings.gatesPassword });
      }
      if (newSettings.spinLoopMs !== undefined) {
        updates.push({ key: "slot_spin_loop_ms", value: String(newSettings.spinLoopMs) });
      }
      if (newSettings.reelStaggerMs !== undefined) {
        updates.push({ key: "slot_reel_stagger_ms", value: String(newSettings.reelStaggerMs) });
      }
      if (newSettings.reelSlowdownMs !== undefined) {
        updates.push({ key: "slot_reel_slowdown_ms", value: String(newSettings.reelSlowdownMs) });
      }

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert({ key: update.key, value: update.value }, { onConflict: 'key' });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-settings"] });
      queryClient.invalidateQueries({ queryKey: ["slot-page-access-settings"] });
      toast.success("Indstillinger gemt");
    },
    onError: (error: Error) => {
      toast.error("Kunne ikke gemme indstillinger: " + error.message);
    },
  });

  return {
    settings: settings ?? { dailySpins: 100, minBet: 1, maxBet: 40, pageLocked: true, pagePassword: "bookoffedesvin2026", riseLocked: true, risePassword: "riseoffedesvin2026", gatesLocked: true, gatesPassword: "gatesoffedesvin2026", spinLoopMs: 600, reelStaggerMs: 20, reelSlowdownMs: 300 },
    isLoading,
    updateSettings,
  };
}
