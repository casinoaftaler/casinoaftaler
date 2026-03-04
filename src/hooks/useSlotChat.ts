import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  user_id: string;
  game_id: string;
  message: string;
  message_type: string;
  created_at: string;
  reactions?: Record<string, string[]>; // emoji -> user_id[]
  // Joined from profiles
  display_name?: string;
  avatar_url?: string;
  twitch_badges?: any;
}

const MAX_MESSAGES = 50;
const RATE_LIMIT_MS = 2000;

export function useSlotChat(gameId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onlineCount, setOnlineCount] = useState(0);
  const [isChatBanned, setIsChatBanned] = useState(false);
  const [chatTimeout, setChatTimeout] = useState<string | null>(null);
  const lastSentRef = useRef(0);
  const profileCacheRef = useRef<Map<string, { display_name: string; avatar_url: string | null; twitch_badges: any }>>(new Map());

  // Fetch profile info for a user_id (with cache)
  const fetchProfile = useCallback(async (userId: string) => {
    if (profileCacheRef.current.has(userId)) {
      return profileCacheRef.current.get(userId)!;
    }
    const { data } = await supabase
      .from("profiles_leaderboard")
      .select("display_name, avatar_url, twitch_badges")
      .eq("user_id", userId)
      .single();
    
    const profile = {
      display_name: data?.display_name || "Anonym",
      avatar_url: data?.avatar_url || null,
      twitch_badges: data?.twitch_badges || null,
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
        twitch_badges: profile?.twitch_badges || null,
      };
    });
  }, [fetchProfile]);

  // Check ban/timeout status
  useEffect(() => {
    const checkStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: banData } = await supabase
        .from("chat_bans")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      setIsChatBanned(!!banData);

      const { data: timeoutData } = await supabase
        .from("chat_timeouts")
        .select("expires_at")
        .eq("user_id", user.id)
        .gt("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setChatTimeout(timeoutData?.expires_at || null);
    };
    checkStatus();
  }, []);

  // Auto-clear timeout when it expires
  useEffect(() => {
    if (!chatTimeout) return;
    const remaining = new Date(chatTimeout).getTime() - Date.now();
    if (remaining <= 0) {
      setChatTimeout(null);
      return;
    }
    const timer = setTimeout(() => setChatTimeout(null), remaining);
    return () => clearTimeout(timer);
  }, [chatTimeout]);

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
        const enriched = await enrichMessages(data.reverse() as unknown as ChatMessage[]);
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
            twitch_badges: profile.twitch_badges,
          };

          setMessages(prev => {
            if (prev.some(m => m.id === enrichedMsg.id)) return prev;
            const next = [...prev, enrichedMsg];
            return next.length > MAX_MESSAGES ? next.slice(-MAX_MESSAGES) : next;
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "slot_chat_messages",
          filter: `game_id=eq.${gameId}`,
        },
        async (payload) => {
          const updated = payload.new as ChatMessage;
          setMessages(prev => prev.map(m => {
            if (m.id !== updated.id) return m;
            return { ...m, message: updated.message, message_type: updated.message_type, reactions: updated.reactions };
          }));
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

    const { data, error } = await supabase
      .from("slot_chat_messages")
      .insert({
        user_id: user.id,
        game_id: gameId,
        message: trimmed,
        message_type: "user",
      })
      .select("*")
      .single();

    if (!error && data) {
      const profile = await fetchProfile(user.id);
      const enrichedMsg: ChatMessage = {
        ...(data as ChatMessage),
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
        twitch_badges: profile.twitch_badges,
      };

      setMessages(prev => {
        if (prev.some(m => m.id === enrichedMsg.id)) return prev;
        const next = [...prev, enrichedMsg];
        return next.length > MAX_MESSAGES ? next.slice(-MAX_MESSAGES) : next;
      });
    }

    return !error;
  }, [gameId, fetchProfile]);

  // Send system message (for bonus buy, big wins, etc.)
  const sendSystemMessage = useCallback(async (text: string, type: string = "system") => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase.from("slot_chat_messages").insert({
      user_id: user.id,
      game_id: gameId,
      message: text,
      message_type: type,
    });

    return !error;
  }, [gameId]);

  // Toggle reaction on a message
  const toggleReaction = useCallback(async (messageId: string, emoji: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const msg = messages.find(m => m.id === messageId);
    if (!msg) return false;

    const currentReactions: Record<string, string[]> = (msg.reactions as Record<string, string[]>) || {};
    const emojiReactions = currentReactions[emoji] || [];
    
    let newEmojiReactions: string[];
    if (emojiReactions.includes(user.id)) {
      newEmojiReactions = emojiReactions.filter(id => id !== user.id);
    } else {
      newEmojiReactions = [...emojiReactions, user.id];
    }

    const newReactions = { ...currentReactions };
    if (newEmojiReactions.length === 0) {
      delete newReactions[emoji];
    } else {
      newReactions[emoji] = newEmojiReactions;
    }

    const { error } = await supabase
      .from("slot_chat_messages")
      .update({ reactions: newReactions } as any)
      .eq("id", messageId);

    if (!error) {
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, reactions: newReactions } : m));
    }

    return !error;
  }, [messages]);

  // Clear all messages in chat (admin) - delete all, then insert one system message
  const clearChat = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Delete all messages for this game
    const { error } = await supabase
      .from("slot_chat_messages")
      .delete()
      .eq("game_id", gameId);

    if (error) return false;

    // Insert a single system message
    await supabase.from("slot_chat_messages").insert({
      user_id: user.id,
      game_id: gameId,
      message: "Chatten er blevet ryddet af admin",
      message_type: "system",
    });

    // Clear local state - realtime will pick up the new system message
    setMessages([]);
    return true;
  }, [gameId]);

  // Delete message (admin) - replace with "Beskeden er slettet"
  const deleteMessage = useCallback(async (messageId: string) => {
    const { error } = await supabase
      .from("slot_chat_messages")
      .update({ message: "Beskeden er slettet", message_type: "deleted" } as any)
      .eq("id", messageId);
    
    if (!error) {
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, message: "Beskeden er slettet", message_type: "deleted" } : m));
    }
    return !error;
  }, []);

  // Ban user from chat (admin)
  const banUser = useCallback(async (userId: string, displayName?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const { error } = await supabase.from("chat_bans").insert({
      user_id: userId,
      banned_by: user.id,
    });
    if (!error) {
      // Replace all messages from this user with ban notice
      const userMsgIds = messages.filter(m => m.user_id === userId && m.message_type === "user").map(m => m.id);
      if (userMsgIds.length > 0) {
        await supabase
          .from("slot_chat_messages")
          .update({ message: "Brugeren er blevet bannet fra chatten", message_type: "banned" } as any)
          .in("id", userMsgIds);
        
        setMessages(prev => prev.map(m => 
          userMsgIds.includes(m.id) ? { ...m, message: "Brugeren er blevet bannet fra chatten", message_type: "banned" } : m
        ));
      }
    }
    return !error;
  }, [messages]);

  // Timeout user from chat (admin)
  const timeoutUser = useCallback(async (userId: string, minutes: number, displayName?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const expiresAt = new Date(Date.now() + minutes * 60 * 1000).toISOString();
    const { error } = await supabase.from("chat_timeouts").insert({
      user_id: userId,
      timed_out_by: user.id,
      expires_at: expiresAt,
    });
    if (!error) {
      // Replace all messages from this user with timeout notice
      const userMsgIds = messages.filter(m => m.user_id === userId && m.message_type === "user").map(m => m.id);
      if (userMsgIds.length > 0) {
        const timeoutMsg = `Beskeden er slettet - Timeout (${minutes} min)`;
        await supabase
          .from("slot_chat_messages")
          .update({ message: timeoutMsg, message_type: "timeout" } as any)
          .in("id", userMsgIds);
        
        setMessages(prev => prev.map(m =>
          userMsgIds.includes(m.id) ? { ...m, message: timeoutMsg, message_type: "timeout" } : m
        ));
      }
    }
    return !error;
  }, [messages]);

  return {
    messages,
    isLoading,
    onlineCount,
    isChatBanned,
    chatTimeout,
    sendMessage,
    sendSystemMessage,
    clearChat,
    deleteMessage,
    banUser,
    timeoutUser,
    toggleReaction,
  };
}
