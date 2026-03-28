import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getTodayDanish } from "@/lib/danishDate";
import { toast } from "sonner";

export interface SlotRequest {
  id: string;
  user_id: string;
  slot_name: string;
  provider: string;
  is_custom: boolean;
  status: string;
  admin_note: string | null;
  credits_awarded: number;
  created_at: string;
  updated_at: string;
}

export interface SlotRequestWithProfile extends SlotRequest {
  display_name: string | null;
}

export function useMySlotRequests() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-slot-requests", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_requests" as any)
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as SlotRequest[];
    },
    enabled: !!user,
  });
}

export function useAllSlotRequests() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('admin-slot-requests')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'slot_requests' },
        () => {
          queryClient.invalidateQueries({ queryKey: ["all-slot-requests"] });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  return useQuery({
    queryKey: ["all-slot-requests"],
    queryFn: async () => {
      const { data: requests, error } = await supabase
        .from("slot_requests" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;

      const userIds = [...new Set((requests as any[]).map((r: any) => r.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p.display_name]) ?? []);

      return (requests as any[]).map((r: any) => ({
        ...r,
        display_name: profileMap.get(r.user_id) || "Ukendt",
      })) as SlotRequestWithProfile[];
    },
  });
}

export function useCreateSlotRequest() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { slot_name: string; provider: string; is_custom: boolean }) => {
      // Check for duplicate requests (only pending ones block new requests)
      const { data: existing, error: checkError } = await supabase
        .from("slot_requests" as any)
        .select("id")
        .ilike("slot_name", data.slot_name)
        .in("status", ["pending"])
        .limit(1);
      
      if (!checkError && (existing as any[])?.length > 0) {
        throw new Error("Denne slot er allerede blevet requested");
      }

      const { error } = await supabase.from("slot_requests" as any).insert({
        user_id: user!.id,
        slot_name: data.slot_name,
        provider: data.provider,
        is_custom: data.is_custom,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Slot request sendt!");
      queryClient.invalidateQueries({ queryKey: ["my-slot-requests"] });
      queryClient.invalidateQueries({ queryKey: ["all-slot-requests"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });
}

export function useBonusHuntSlotRequesters(huntNumber?: number) {
  return useQuery({
    queryKey: ["bonus-hunt-slot-requesters", huntNumber],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_requests" as any)
        .select("slot_name, user_id")
        .eq("hunt_number", huntNumber!)
        .eq("status", "bonus_hit");
      if (error) throw error;

      const userIds = [...new Set((data as any[]).map((r: any) => r.user_id))];
      if (userIds.length === 0) return new Map<string, string>();

      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p.display_name]) ?? []);
      const result = new Map<string, string>();
      for (const r of data as any[]) {
        const name = profileMap.get(r.user_id);
        if (name) result.set(r.slot_name.toLowerCase(), name);
      }
      return result;
    },
    enabled: !!huntNumber && huntNumber > 0,
    staleTime: 60000,
  });
}

export function useUpdateSlotRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      requestId,
      status,
      userId,
      awardCredits,
      huntNumber,
    }: {
      requestId: string;
      status: string;
      userId: string;
      awardCredits?: boolean;
      huntNumber?: number;
    }) => {
      // Update the request status
      const updateData: any = { status };
      if (awardCredits) {
        updateData.credits_awarded = 200;
      }
      if (huntNumber) {
        updateData.hunt_number = huntNumber;
      }
      const { error: updateError } = await supabase
        .from("slot_requests" as any)
        .update(updateData)
        .eq("id", requestId);
      if (updateError) throw updateError;

      // Award credits if bonus hit
      if (awardCredits) {
        const today = getTodayDanish();

        // Get or create today's spin record
        const { data: existing } = await supabase
          .from("slot_spins")
          .select("*")
          .eq("user_id", userId)
          .eq("date", today)
          .maybeSingle();

        if (existing) {
          const { error } = await supabase
            .from("slot_spins")
            .update({ spins_remaining: existing.spins_remaining + 200 })
            .eq("id", existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("slot_spins").insert({
            user_id: userId,
            date: today,
            spins_remaining: 200,
          });
          if (error) throw error;
        }

        // Log the credit allocation
        await supabase.from("credit_allocation_log").insert({
          user_id: userId,
          amount: 200,
          source: "slot_request_bonus",
          note: "Bonus hit på slot request",
        });
      }
    },
    onSuccess: (_, variables) => {
      const msg =
        variables.status === "bonus_hit"
          ? "Bonus hit! +200 credits tildelt"
          : variables.status === "no_bonus"
          ? "Markeret som ingen bonus"
          : "Request afvist";
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: ["all-slot-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-slot-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-user-spins"] });
      queryClient.invalidateQueries({ queryKey: ["credit-allocation-log"] });
      queryClient.invalidateQueries({ queryKey: ["bonus-hunt-slot-requesters"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });
}
