import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SlotSettings {
  dailySpins: number;
  minBet: number;
  maxBet: number;
  pageLocked: boolean;
  pagePassword: string;
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
        .in("key", ["slot_daily_spins", "slot_min_bet", "slot_max_bet", "slot_page_locked", "slot_page_password", "slot_spin_loop_ms", "slot_reel_stagger_ms", "slot_reel_slowdown_ms"]);

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || "";
      });

      return {
        dailySpins: parseInt(settingsMap.slot_daily_spins || "100", 10),
        minBet: parseInt(settingsMap.slot_min_bet || "1", 10),
        maxBet: parseInt(settingsMap.slot_max_bet || "10", 10),
        pageLocked: settingsMap.slot_page_locked === "true",
        pagePassword: settingsMap.slot_page_password || "bookoffedesvin2026",
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
      toast.success("Indstillinger gemt");
    },
    onError: (error: Error) => {
      toast.error("Kunne ikke gemme indstillinger: " + error.message);
    },
  });

  return {
    settings: settings ?? { dailySpins: 100, minBet: 1, maxBet: 10, pageLocked: true, pagePassword: "bookoffedesvin2026", spinLoopMs: 600, reelStaggerMs: 20, reelSlowdownMs: 300 },
    isLoading,
    updateSettings,
  };
}
