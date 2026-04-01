import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SupportConversation {
  id: string;
  user_id: string;
  status: string;
  subject: string | null;
  assigned_admin_id: string | null;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface SupportMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_role: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

export function useSupportChat() {
  const [conversation, setConversation] = useState<SupportConversation | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id || null);
    });
  }, []);

  // Load or find existing open conversation
  useEffect(() => {
    if (!userId) { setIsLoading(false); return; }

    const load = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("support_conversations")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setConversation(data as SupportConversation);
        // Load messages
        const { data: msgs } = await supabase
          .from("support_messages")
          .select("*")
          .eq("conversation_id", data.id)
          .order("created_at", { ascending: true });
        setMessages((msgs || []) as SupportMessage[]);

        // Count unread admin messages
        const unread = (msgs || []).filter(
          (m: any) => m.sender_role === "admin" && !m.read_at
        ).length;
        setUnreadCount(unread);
      }
      setIsLoading(false);
    };
    load();
  }, [userId]);

  // Realtime subscription for messages
  useEffect(() => {
    if (!conversation) return;

    const channel = supabase
      .channel(`support-msgs-${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "support_messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          const newMsg = payload.new as SupportMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          if (newMsg.sender_role === "admin") {
            setUnreadCount((c) => c + 1);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [conversation?.id]);

  // Start a new conversation
  const startConversation = useCallback(async (subject?: string) => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from("support_conversations")
      .insert({ user_id: userId, subject: subject || "Support" })
      .select("*")
      .single();

    if (error || !data) return null;

    const conv = data as SupportConversation;
    setConversation(conv);
    setMessages([]);

    // Auto welcome message (inserted as a system-generated admin message)
    // We'll just show it client-side
    return conv;
  }, [userId]);

  // Send a message
  const sendMessage = useCallback(async (text: string) => {
    if (!userId || !conversation) return false;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 2000) return false;

    const { data, error } = await supabase
      .from("support_messages")
      .insert({
        conversation_id: conversation.id,
        sender_id: userId,
        sender_role: "user",
        message: trimmed,
      })
      .select("*")
      .single();

    if (!error && data) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === (data as SupportMessage).id)) return prev;
        return [...prev, data as SupportMessage];
      });
      // Update last_message_at
      await supabase
        .from("support_conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversation.id);
    }
    return !error;
  }, [userId, conversation]);

  // Mark messages as read
  const markAsRead = useCallback(async () => {
    if (!conversation || !userId) return;
    const unreadIds = messages
      .filter((m) => m.sender_role === "admin" && !m.read_at)
      .map((m) => m.id);
    if (unreadIds.length === 0) return;

    await supabase
      .from("support_messages")
      .update({ read_at: new Date().toISOString() })
      .in("id", unreadIds);

    setMessages((prev) =>
      prev.map((m) =>
        unreadIds.includes(m.id) ? { ...m, read_at: new Date().toISOString() } : m
      )
    );
    setUnreadCount(0);
  }, [conversation, userId, messages]);

  return {
    conversation,
    messages,
    isLoading,
    unreadCount,
    userId,
    startConversation,
    sendMessage,
    markAsRead,
  };
}

// Admin hook
export function useSupportAdmin() {
  const [conversations, setConversations] = useState<(SupportConversation & { display_name?: string; avatar_url?: string })[]>([]);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalUnread, setTotalUnread] = useState(0);

  // Load all conversations
  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("support_conversations")
      .select("*")
      .order("last_message_at", { ascending: false });

    if (data) {
      // Enrich with profile data
      const userIds = [...new Set(data.map((c: any) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map((profiles || []).map((p: any) => [p.user_id, p]));

      const enriched = data.map((c: any) => ({
        ...c,
        display_name: profileMap.get(c.user_id)?.display_name || "Anonym",
        avatar_url: profileMap.get(c.user_id)?.avatar_url || null,
      }));
      setConversations(enriched);

      // Count unread across all open conversations
      const openIds = data.filter((c: any) => c.status === "open").map((c: any) => c.id);
      if (openIds.length > 0) {
        const { count } = await supabase
          .from("support_messages")
          .select("*", { count: "exact", head: true })
          .in("conversation_id", openIds)
          .eq("sender_role", "user")
          .is("read_at", null);
        setTotalUnread(count || 0);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConv) { setMessages([]); return; }

    const load = async () => {
      const { data } = await supabase
        .from("support_messages")
        .select("*")
        .eq("conversation_id", selectedConv)
        .order("created_at", { ascending: true });
      setMessages((data || []) as SupportMessage[]);
    };
    load();
  }, [selectedConv]);

  // Realtime for new messages
  useEffect(() => {
    const channel = supabase
      .channel("support-admin-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "support_messages" },
        (payload) => {
          const newMsg = payload.new as SupportMessage;
          if (newMsg.conversation_id === selectedConv) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
          }
          if (newMsg.sender_role === "user") {
            setTotalUnread((c) => c + 1);
          }
          // Refresh conversation list
          loadConversations();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "support_conversations" },
        () => { loadConversations(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [selectedConv, loadConversations]);

  // Send admin reply
  const sendReply = useCallback(async (conversationId: string, text: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 2000) return false;

    const { error } = await supabase
      .from("support_messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        sender_role: "admin",
        message: trimmed,
      });

    if (!error) {
      await supabase
        .from("support_conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversationId);
    }
    return !error;
  }, []);

  // Mark user messages as read
  const markUserMessagesRead = useCallback(async (conversationId: string) => {
    await supabase
      .from("support_messages")
      .update({ read_at: new Date().toISOString() })
      .eq("conversation_id", conversationId)
      .eq("sender_role", "user")
      .is("read_at", null);
    setTotalUnread((c) => Math.max(0, c - 1));
  }, []);

  // Close conversation
  const closeConversation = useCallback(async (conversationId: string) => {
    await supabase
      .from("support_conversations")
      .update({ status: "closed" })
      .eq("id", conversationId);
    loadConversations();
  }, [loadConversations]);

  // Assign admin
  const assignToMe = useCallback(async (conversationId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("support_conversations")
      .update({ assigned_admin_id: user.id })
      .eq("id", conversationId);
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    selectedConv,
    setSelectedConv,
    messages,
    isLoading,
    totalUnread,
    sendReply,
    markUserMessagesRead,
    closeConversation,
    assignToMe,
    loadConversations,
  };
}
