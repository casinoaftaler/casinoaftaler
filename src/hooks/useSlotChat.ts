import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  user_id: string;
  game_id: string;
  message: string;
  message_type: string;
  created_at: string;
  // Joined from profiles
  display_name?: string;
  avatar_url?: string;
}

const MAX_MESSAGES = 50;
const RATE_LIMIT_MS = 2000;

export function useSlotChat(gameId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onlineCount, setOnlineCount] = useState(0);
  const lastSentRef = useRef(0);
  const profileCacheRef = useRef<Map<string, { display_name: string; avatar_url: string | null }>>(new Map());

  // Fetch profile info for a user_id (with cache)
  const fetchProfile = useCallback(async (userId: string) => {
    if (profileCacheRef.current.has(userId)) {
      return profileCacheRef.current.get(userId)!;
    }
    const { data } = await supabase
      .from("profiles_leaderboard")
      .select("display_name, avatar_url")
      .eq("user_id", userId)
      .single();
    
    const profile = {
      display_name: data?.display_name || "Anonym",
      avatar_url: data?.avatar_url || null,
    };
    profileCacheRef.current.set(userId, profile);
    return profile;
  }, []);

  // Enrich messages with profile data
  const enrichMessages = useCallback(async (msgs: ChatMessage[]): Promise<ChatMessage[]> => {
    const uniqueUserIds = [...new Set(msgs.map(m => m.user_id))];
    await Promise.all(uniqueUserIds.map(id => fetchProfile(id)));
    
    return msgs.map(m => {
      const profile = profileCacheRef.current.get(m.user_id);
      return {
        ...m,
        display_name: profile?.display_name || "Anonym",
        avatar_url: profile?.avatar_url || null,
      };
    });
  }, [fetchProfile]);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("slot_chat_messages")
        .select("*")
        .eq("game_id", gameId)
        .order("created_at", { ascending: false })
        .limit(MAX_MESSAGES);

      if (!error && data) {
        const enriched = await enrichMessages(data.reverse());
        setMessages(enriched);
      }
      setIsLoading(false);
    };

    loadMessages();
  }, [gameId, enrichMessages]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`slot-chat-${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "slot_chat_messages",
          filter: `game_id=eq.${gameId}`,
        },
        async (payload) => {
          const newMsg = payload.new as ChatMessage;
          const profile = await fetchProfile(newMsg.user_id);
          const enrichedMsg: ChatMessage = {
            ...newMsg,
            display_name: profile.display_name,
            avatar_url: profile.avatar_url,
          };

          setMessages(prev => {
            const next = [...prev, enrichedMsg];
            return next.length > MAX_MESSAGES ? next.slice(-MAX_MESSAGES) : next;
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "slot_chat_messages",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          setMessages(prev => prev.filter(m => m.id !== deletedId));
        }
      )
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setOnlineCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await channel.track({ user_id: user.id, online_at: new Date().toISOString() });
          }
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, fetchProfile]);

  // Send message
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 200) return false;

    const now = Date.now();
    if (now - lastSentRef.current < RATE_LIMIT_MS) return false;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    lastSentRef.current = now;

    const { error } = await supabase.from("slot_chat_messages").insert({
      user_id: user.id,
      game_id: gameId,
      message: trimmed,
      message_type: "user",
    });

    return !error;
  }, [gameId]);

  // Delete message (admin)
  const deleteMessage = useCallback(async (messageId: string) => {
    const { error } = await supabase
      .from("slot_chat_messages")
      .delete()
      .eq("id", messageId);
    return !error;
  }, []);

  return {
    messages,
    isLoading,
    onlineCount,
    sendMessage,
    deleteMessage,
  };
}
