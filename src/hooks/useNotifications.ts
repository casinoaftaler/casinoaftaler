import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Notification {
  id: string;
  title: string | null;
  message: string;
  created_at: string;
}

interface UserNotificationWithDetails {
  id: string;
  notification_id: string;
  is_read: boolean;
  read_at: string | null;
  notification: Notification;
}

export function useNotifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all notifications with user's read status
  const { data: notifications = [], isLoading, refetch } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async (): Promise<UserNotificationWithDetails[]> => {
      if (!user?.id) return [];

      // Fetch notifications: global (no target) OR targeted to this user
      const { data: allNotifications, error: notifError } = await supabase
        .from("notifications")
        .select("*")
        .or(`target_user_id.is.null,target_user_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (notifError) throw notifError;
      if (!allNotifications || allNotifications.length === 0) return [];

      // Get user's read status for each notification
      const { data: userStatuses, error: statusError } = await supabase
        .from("user_notifications")
        .select("*")
        .eq("user_id", user.id);

      if (statusError) throw statusError;

      // Map notifications with their read status
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
    staleTime: 30000, // 30 seconds
  });

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Mark a notification as read
  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      if (!user?.id) throw new Error("User not authenticated");

      // Check if user_notification record exists
      const { data: existing } = await supabase
        .from("user_notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("notification_id", notificationId)
        .maybeSingle();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from("user_notifications")
          .update({ is_read: true, read_at: new Date().toISOString() })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        // Insert new record
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

  // Mark all notifications as read
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

  // Fetch total user count
  const { data: totalUsers = 0 } = useQuery({
    queryKey: ["total-users-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    },
    staleTime: 60000, // 1 minute
  });

  // Fetch all notifications with read stats for admin view
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["admin-notifications", totalUsers],
    queryFn: async (): Promise<NotificationWithStats[]> => {
      // Fetch all notifications
      const { data: allNotifications, error: notifError } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (notifError) throw notifError;
      if (!allNotifications || allNotifications.length === 0) return [];

      // Fetch read counts for each notification
      const { data: readCounts, error: readError } = await supabase
        .from("user_notifications")
        .select("notification_id")
        .eq("is_read", true);

      if (readError) throw readError;

      // Count reads per notification
      const readCountMap = new Map<string, number>();
      (readCounts || []).forEach((item) => {
        const current = readCountMap.get(item.notification_id) || 0;
        readCountMap.set(item.notification_id, current + 1);
      });

      // Map notifications with stats
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

  // Create a new notification
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

  // Delete a notification
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
