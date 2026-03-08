import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useBonusHuntSession() {
  return useQuery({
    queryKey: ['bonus-hunt-session'],
    queryFn: async () => {
      const { data: activeSession, error: activeError } = await supabase
        .from('bonus_hunt_sessions' as any)
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (activeError) throw activeError;
      if (activeSession) return activeSession as any;

      const { data, error } = await supabase
        .from('bonus_hunt_sessions' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as any;
    },
    staleTime: 30000,
    refetchInterval: 30000,
  });
}

async function enrichBetsWithProfiles(bets: any[]) {
  if (!bets.length) return bets;
  const userIds = [...new Set(bets.map(b => b.user_id))];
  const { data: profiles } = await supabase
    .from('profiles_leaderboard')
    .select('user_id, display_name, avatar_url')
    .in('user_id', userIds);

  const profileMap = new Map((profiles || []).map(p => [p.user_id, p]));
  return bets.map(b => ({
    ...b,
    display_name: profileMap.get(b.user_id)?.display_name || null,
    avatar_url: profileMap.get(b.user_id)?.avatar_url || null,
  }));
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
      return enrichBetsWithProfiles((data || []) as any[]);
    },
    enabled: !!sessionId,
    staleTime: 30000,
    refetchInterval: 30000,
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
      return enrichBetsWithProfiles((data || []) as any[]);
    },
    enabled: !!sessionId,
    staleTime: 30000,
    refetchInterval: 30000,
  });
}
