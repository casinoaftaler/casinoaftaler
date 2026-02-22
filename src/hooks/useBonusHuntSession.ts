import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useBonusHuntSession() {
  // Get the latest/active session
  return useQuery({
    queryKey: ['bonus-hunt-session'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bonus_hunt_sessions' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as any;
    },
    refetchInterval: 10000,
  });
}

export function useBonusHuntGtwBets(sessionId?: string) {
  return useQuery({
    queryKey: ['bonus-hunt-gtw-bets', sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      const { data, error } = await supabase
        .from('bonus_hunt_gtw_bets' as any)
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data || []) as any[];
    },
    enabled: !!sessionId,
    refetchInterval: 10000,
  });
}

export function useBonusHuntAvgxBets(sessionId?: string) {
  return useQuery({
    queryKey: ['bonus-hunt-avgx-bets', sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      const { data, error } = await supabase
        .from('bonus_hunt_avgx_bets' as any)
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data || []) as any[];
    },
    enabled: !!sessionId,
    refetchInterval: 10000,
  });
}
