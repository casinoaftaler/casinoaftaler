import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SlotSettings {
  dailySpins: number;
  minBet: number;
  maxBet: number;
  pageLocked: boolean;
  pagePassword: string;
}

export function useSlotSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["slot-settings"],
    queryFn: async (): Promise<SlotSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["slot_daily_spins", "slot_min_bet", "slot_max_bet", "slot_page_locked", "slot_page_password"]);

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

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: update.value })
          .eq("key", update.key);

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
    settings: settings ?? { dailySpins: 100, minBet: 1, maxBet: 10, pageLocked: true, pagePassword: "bookoffedesvin2026" },
    isLoading,
    updateSettings,
  };
}
