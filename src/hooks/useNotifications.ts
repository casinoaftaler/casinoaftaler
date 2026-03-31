import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string | null;
  message: string;
  created_at: string;
}

export interface UserNotificationWithDetails {
  id: string;
  notification_id: string;
  is_read: boolean;
  read_at: string | null;
  notification: Notification;
}

export function useNotifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const lastSeenIdRef = useRef<string | null>(null);

  // Fetch all notifications with user's read status
  const { data: notifications = [], isLoading, refetch } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async (): Promise<UserNotificationWithDetails[]> => {
      if (!user?.id) return [];

      const { data: allNotifications, error: notifError } = await supabase
        .from("notifications")
        .select("*")
        .or(`target_user_id.is.null,target_user_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (notifError) throw notifError;
      if (!allNotifications || allNotifications.length === 0) return [];

      const { data: userStatuses, error: statusError } = await supabase
        .from("user_notifications")
        .select("*")
        .eq("user_id", user.id);

      if (statusError) throw statusError;

      const statusMap = new Map(
        (userStatuses || []).map((s) => [s.notification_id, s])
      );

      return allNotifications.map((notif) => {
        const status = statusMap.get(notif.id);
        return {
          id: status?.id || notif.id,
          notification_id: notif.id,
          is_read: status?.is_read || false,
          read_at: status?.read_at || null,
          notification: notif,
        };
      });
    },
    enabled: !!user?.id,
    staleTime: 30000,
  });

  // Track the latest notification ID to detect genuinely new ones
  useEffect(() => {
    if (notifications.length > 0 && !lastSeenIdRef.current) {
      lastSeenIdRef.current = notifications[0]?.notification_id || null;
    }
  }, [notifications]);

  // Realtime subscription for new notifications
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          const newNotif = payload.new as Notification;
          // Show toast for new notification
          toast(newNotif.title || "Ny besked!", {
            description: newNotif.message.length > 100
              ? newNotif.message.slice(0, 100) + "…"
              : newNotif.message,
            duration: 8000,
            icon: "🔔",
            action: {
              label: "Åbn",
              onClick: () => {
                // Trigger bell click programmatically
                document.querySelector<HTMLButtonElement>("[data-notification-trigger]")?.click();
              },
            },
          });
          // Refetch notifications
          queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data: existing } = await supabase
        .from("user_notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("notification_id", notificationId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("user_notifications")
          .update({ is_read: true, read_at: new Date().toISOString() })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("user_notifications").insert({
          user_id: user.id,
          notification_id: notificationId,
          is_read: true,
          read_at: new Date().toISOString(),
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      const unreadNotifications = notifications.filter((n) => !n.is_read);

      for (const notif of unreadNotifications) {
        const { data: existing } = await supabase
          .from("user_notifications")
          .select("id")
          .eq("user_id", user.id)
          .eq("notification_id", notif.notification_id)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("user_notifications")
            .update({ is_read: true, read_at: new Date().toISOString() })
            .eq("id", existing.id);
        } else {
          await supabase.from("user_notifications").insert({
            user_id: user.id,
            notification_id: notif.notification_id,
            is_read: true,
            read_at: new Date().toISOString(),
          });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
    },
  });

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refetch,
  };
}

interface NotificationWithStats {
  id: string;
  title: string | null;
  message: string;
  created_at: string;
  total_users: number;
  read_count: number;
  unread_count: number;
}

// Admin hook for managing notifications
export function useAdminNotifications() {
  const queryClient = useQueryClient();

  const { data: totalUsers = 0 } = useQuery({
    queryKey: ["total-users-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
    staleTime: 60000,
  });

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["admin-notifications", totalUsers],
    queryFn: async (): Promise<NotificationWithStats[]> => {
      const { data: allNotifications, error: notifError } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (notifError) throw notifError;
      if (!allNotifications || allNotifications.length === 0) return [];

      const { data: readCounts, error: readError } = await supabase
        .from("user_notifications")
        .select("notification_id")
        .eq("is_read", true);

      if (readError) throw readError;

      const readCountMap = new Map<string, number>();
      (readCounts || []).forEach((item) => {
        const current = readCountMap.get(item.notification_id) || 0;
        readCountMap.set(item.notification_id, current + 1);
      });

      return allNotifications.map((notif) => {
        const readCount = readCountMap.get(notif.id) || 0;
        return {
          ...notif,
          total_users: totalUsers,
          read_count: readCount,
          unread_count: totalUsers - readCount,
        };
      });
    },
  });

  const createNotification = useMutation({
    mutationFn: async ({
      title,
      message,
    }: {
      title?: string;
      message: string;
    }) => {
      const { data, error } = await supabase
        .from("notifications")
        .insert({ title: title || null, message })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
    },
  });

  const deleteNotification = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
    },
  });

  return {
    notifications,
    isLoading,
    createNotification,
    deleteNotification,
  };
}
