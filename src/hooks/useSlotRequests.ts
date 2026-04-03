import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getTodayDanish } from "@/lib/danishDate";
import { toast } from "sonner";

// ── Fuzzy slot-name matching utilities ──

const ROMAN_MAP: [RegExp, string][] = [
  [/\biv\b/g, '4'],
  [/\biii\b/g, '3'],
  [/\bii\b/g, '2'],
  [/\bvi\b/g, '6'],
  [/\bv\b/g, '5'],
];

export function normalizeForMatch(name: string): string {
  let n = name.toLowerCase().trim();
  // strip apostrophes / quotes
  n = n.replace(/[''`"]/g, '');
  // roman numerals → digits (order matters: iv before ii)
  for (const [re, digit] of ROMAN_MAP) {
    n = n.replace(re, digit);
  }
  // collapse whitespace & strip non-alphanumeric (keep æøå)
  n = n.replace(/[^a-z0-9æøå ]/g, ' ').replace(/\s+/g, ' ').trim();
  return n;
}

export function slotNameSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  // containment check
  if (a.length >= 4 && b.includes(a)) return 0.85;
  if (b.length >= 4 && a.includes(b)) return 0.85;
  // Jaccard on word tokens
  const wordsA = new Set(a.split(' ').filter(Boolean));
  const wordsB = new Set(b.split(' ').filter(Boolean));
  let intersection = 0;
  for (const w of wordsA) if (wordsB.has(w)) intersection++;
  const union = new Set([...wordsA, ...wordsB]).size;
  return union === 0 ? 0 : intersection / union;
}

export function findBestRequesterMatch(
  huntSlotName: string,
  requesterMap: Map<string, SlotRequesterInfo>,
): SlotRequesterInfo | undefined {
  const normHunt = normalizeForMatch(huntSlotName);

  // 1. exact normalized match
  for (const [reqName, info] of requesterMap) {
    if (normalizeForMatch(reqName) === normHunt) return info;
  }

  // 2. best similarity above threshold
  let best: SlotRequesterInfo | undefined;
  let bestScore = 0;
  for (const [reqName, info] of requesterMap) {
    const score = slotNameSimilarity(normHunt, normalizeForMatch(reqName));
    if (score > bestScore) {
      bestScore = score;
      best = info;
    }
  }
  return bestScore >= 0.5 ? best : undefined;
}

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
      const reqName = data.slot_name.toLowerCase().trim();

      const fuzzyMatch = (a: string, b: string) => {
        if (a === b) return true;
        if (a.length >= 4 && b.includes(a)) return true;
        if (b.length >= 4 && a.includes(b)) return true;
        return false;
      };

      // Server-side guard: user can have max 5 pending requests
      const { data: userPending } = await supabase
        .from("slot_requests" as any)
        .select("id")
        .eq("user_id", user!.id)
        .eq("status", "pending");

      if ((userPending as any[])?.length >= 5) {
        throw new Error("Du har allerede 5 aktive requests. Vent til en er behandlet, før du sender en ny.");
      }

      // Fuzzy duplicate check across ALL users for pending requests
      const { data: allPending } = await supabase
        .from("slot_requests" as any)
        .select("id, slot_name")
        .eq("status", "pending");

      if ((allPending as any[])?.some((r: any) => fuzzyMatch(reqName, r.slot_name.toLowerCase().trim()))) {
        throw new Error("Denne slot er allerede blevet requested af en anden bruger");
      }

      // Also check against ALL non-rejected requests in the current hunt (any status)
      const { data: activeSession } = await supabase
        .from("bonus_hunt_sessions" as any)
        .select("hunt_number")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const currentHuntNum = (activeSession as any)?.hunt_number;
      if (currentHuntNum) {
        const { data: huntRequests } = await supabase
          .from("slot_requests" as any)
          .select("id, slot_name")
          .eq("hunt_number", currentHuntNum)
          .neq("status", "rejected");

        if ((huntRequests as any[])?.some((r: any) => fuzzyMatch(reqName, r.slot_name.toLowerCase().trim()))) {
          throw new Error("Denne slot er allerede blevet requested i den aktive bonus hunt");
        }
      }

      // Get active hunt to scope the check
      const { data: activeSessionCheck } = await supabase
        .from("bonus_hunt_sessions" as any)
        .select("hunt_number, streamsystem_hunt_id")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const activeHuntNum = (activeSessionCheck as any)?.hunt_number;
      
      if (activeHuntNum) {
        // Check if this user already requested this slot (fuzzy) in the current hunt with any non-rejected status
        const { data: userHuntRequests } = await supabase
          .from("slot_requests" as any)
          .select("id, slot_name")
          .eq("user_id", user!.id)
          .eq("hunt_number", activeHuntNum)
          .neq("status", "rejected");

        if ((userHuntRequests as any[])?.some((r: any) => fuzzyMatch(reqName, r.slot_name.toLowerCase().trim()))) {
          throw new Error("Du har allerede requestet denne slot i den aktive bonus hunt");
        }

        // Check if already hit in this hunt (any user, fuzzy)
        const { data: alreadyHitInHunt } = await supabase
          .from("slot_requests" as any)
          .select("id, slot_name")
          .eq("status", "bonus_hit")
          .eq("hunt_number", activeHuntNum);

        if ((alreadyHitInHunt as any[])?.some((r: any) => fuzzyMatch(reqName, r.slot_name.toLowerCase().trim()))) {
          throw new Error("Denne slot er allerede blevet ramt i den aktive bonus hunt");
        }

        // Check if slot is already on the active hunt's slot list (from API)
        try {
          const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
          const proxyUrl = `https://${projectId}.supabase.co/functions/v1/bonus-hunt-proxy?huntId=${activeHuntNum}`;
          const resp = await fetch(proxyUrl, {
            headers: { 'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
          });
          if (resp.ok) {
            const huntData = await resp.json();
            const slots = huntData?.data?.slots || huntData?.slots || [];
            const reqName = data.slot_name.toLowerCase().trim();
            const isAlreadyOnHunt = slots.some((s: any) => {
              const huntName = (s.slot?.searchName || s.slot?.name || s.title || '').toLowerCase().trim();
              if (!huntName || huntName.length < 3) return false;
              if (huntName === reqName) return true;
              if (reqName.length >= 4 && huntName.includes(reqName)) return true;
              if (huntName.length >= 4 && reqName.includes(huntName)) return true;
              return false;
            });
            if (isAlreadyOnHunt) {
              throw new Error("Denne slot er allerede på den aktive bonus hunt liste. Du kan ikke requeste en slot der allerede er med.");
            }
          }
        } catch (e: any) {
          // Re-throw our validation error, ignore fetch errors
          if (e.message?.includes("allerede på den aktive")) throw e;
        }
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

export interface SlotRequesterInfo {
  displayName: string;
  avatarUrl: string | null;
  userId: string;
}

export function useBonusHuntSlotRequesters(huntNumber?: number) {
  return useQuery({
    queryKey: ["bonus-hunt-slot-requesters", huntNumber],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_requests" as any)
        .select("slot_name, user_id")
        .eq("hunt_number", huntNumber!)
        .in("status", ["bonus_hit", "settled", "no_bonus", "pending"]);
      if (error) throw error;

      const userIds = [...new Set((data as any[]).map((r: any) => r.user_id))];
      if (userIds.length === 0) return new Map<string, SlotRequesterInfo>();

      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, { displayName: p.display_name, avatarUrl: p.avatar_url }]) ?? []);
      const result = new Map<string, SlotRequesterInfo>();
      for (const r of data as any[]) {
        const profile = profileMap.get(r.user_id);
        if (profile?.displayName) {
          result.set(r.slot_name.toLowerCase(), {
            displayName: profile.displayName,
            avatarUrl: profile.avatarUrl,
            userId: r.user_id,
          });
        }
      }
      return result;
    },
    enabled: !!huntNumber && huntNumber > 0,
    staleTime: 60000,
  });
}

export function usePendingQueuePositions() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('pending-queue-positions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'slot_requests' },
        () => {
          queryClient.invalidateQueries({ queryKey: ["pending-queue-positions"] });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  return useQuery({
    queryKey: ["pending-queue-positions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_requests" as any)
        .select("id")
        .eq("status", "pending")
        .order("created_at", { ascending: true });
      if (error) throw error;
      const map = new Map<string, number>();
      (data as any[]).forEach((r: any, i: number) => {
        map.set(r.id, i + 1);
      });
      return map;
    },
  });
}

export function useRejectAllPendingRequests() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("slot_requests" as any)
        .update({ status: "rejected" } as any)
        .eq("status", "pending");
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Alle ventende requests er blevet afvist");
      queryClient.invalidateQueries({ queryKey: ["all-slot-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-slot-requests"] });
      queryClient.invalidateQueries({ queryKey: ["pending-queue-positions"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
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

// ── Public slot request stats for any user ──

export interface UserSlotRequestStats {
  bonusHits: number;
  noBonus: number;
  total: number;
  pending: number;
  hitRate: number;
}

export function useUserSlotRequestStats(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-slot-request-stats", userId],
    queryFn: async (): Promise<UserSlotRequestStats> => {
      const { data, error } = await supabase.rpc("get_user_slot_request_stats", {
        target_user_id: userId!,
      });
      if (error) throw error;
      const raw = data as { bonus_hits: number; no_bonus: number; total: number; pending: number };
      const resolved = raw.bonus_hits + raw.no_bonus;
      return {
        bonusHits: raw.bonus_hits,
        noBonus: raw.no_bonus,
        total: raw.total,
        pending: raw.pending,
        hitRate: resolved > 0 ? (raw.bonus_hits / resolved) * 100 : 0,
      };
    },
    enabled: !!userId,
  });
}
