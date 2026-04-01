import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Broadcast {
  id: string;
  message: string;
  created_at: string;
  admin_id: string;
}

export function useBroadcastChat() {
  const { user } = useAuth();
  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestBroadcast = useCallback(async () => {
    if (!user) {
      setBroadcast(null);
      setIsLoading(false);
      return;
    }

    // Get user's dismissed broadcast IDs
    const { data: dismissals } = await supabase
      .from("chat_broadcast_dismissals")
      .select("broadcast_id")
      .eq("user_id", user.id);

    const dismissedIds = (dismissals || []).map((d: any) => d.broadcast_id);

    // Get latest broadcast not dismissed
    let query = supabase
      .from("chat_broadcasts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (dismissedIds.length > 0) {
      // Filter out dismissed broadcasts using not.in
      query = query.not("id", "in", `(${dismissedIds.join(",")})`);
    }

    const { data } = await query;

    setBroadcast(data && data.length > 0 ? data[0] as Broadcast : null);
    setIsLoading(false);
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchLatestBroadcast();
  }, [fetchLatestBroadcast]);

  // Realtime subscription for new broadcasts
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("broadcast-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_broadcasts" },
        () => {
          fetchLatestBroadcast();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchLatestBroadcast]);

  const dismissBroadcast = useCallback(async (broadcastId: string) => {
    if (!user) return;

    await supabase
      .from("chat_broadcast_dismissals")
      .insert({ broadcast_id: broadcastId, user_id: user.id });

    setBroadcast(null);
  }, [user]);

  return { broadcast, isLoading, dismissBroadcast, refetch: fetchLatestBroadcast };
}
