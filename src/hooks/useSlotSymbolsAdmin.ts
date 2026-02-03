import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SymbolUpdate {
  id: string;
  name?: string;
  image_url?: string | null;
  multiplier_2?: number;
  multiplier_3?: number;
  multiplier_4?: number;
  multiplier_5?: number;
  is_scatter?: boolean;
  is_wild?: boolean;
}

interface PositionUpdate {
  id: string;
  position: number;
}

export function useSlotSymbolsAdmin() {
  const queryClient = useQueryClient();

  const updateSymbol = useMutation({
    mutationFn: async (update: SymbolUpdate) => {
      const { id, ...data } = update;
      const { error } = await supabase
        .from("slot_symbols")
        .update(data)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-symbols"] });
      toast.success("Symbol opdateret");
    },
    onError: (error: Error) => {
      toast.error("Kunne ikke opdatere symbol: " + error.message);
    },
  });

  const updatePositions = useMutation({
    mutationFn: async (updates: PositionUpdate[]) => {
      for (const update of updates) {
        const { error } = await supabase
          .from("slot_symbols")
          .update({ position: update.position })
          .eq("id", update.id);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slot-symbols"] });
    },
    onError: (error: Error) => {
      toast.error("Kunne ikke opdatere rækkefølge: " + error.message);
    },
  });

  return {
    updateSymbol,
    updatePositions,
  };
}
