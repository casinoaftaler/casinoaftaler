import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SESSION_STORAGE_KEY = "slot_page_access_granted";

interface SlotPageAccessSettings {
  isLocked: boolean;
  password: string;
}

export function useSlotPageAccess() {
  const { user } = useAuth();
  const [hasSessionAccess, setHasSessionAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data);
    };

    checkAdminStatus();
  }, [user]);

  // Check session storage for previous access
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored === "true") {
      setHasSessionAccess(true);
    }
  }, []);

  // Fetch lock settings from database
  const { data: settings, isLoading } = useQuery({
    queryKey: ["slot-page-access-settings"],
    queryFn: async (): Promise<SlotPageAccessSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["slot_page_locked", "slot_page_password"]);

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || "";
      });

      return {
        isLocked: settingsMap.slot_page_locked === "true",
        password: settingsMap.slot_page_password || "",
      };
    },
  });

  const isLocked = settings?.isLocked ?? true;
  
  // User has access if: not locked, or is admin, or has session access
  const hasAccess = !isLocked || isAdmin || hasSessionAccess;

  const verifyPassword = useCallback((inputPassword: string): boolean => {
    setError(null);
    
    if (!settings?.password) {
      setError("Kunne ikke verificere password");
      return false;
    }

    if (inputPassword === settings.password) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      setHasSessionAccess(true);
      return true;
    } else {
      setError("Forkert password");
      return false;
    }
  }, [settings?.password]);

  const clearAccess = useCallback(() => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setHasSessionAccess(false);
  }, []);

  return {
    isLocked,
    hasAccess,
    isAdmin,
    isLoading,
    error,
    verifyPassword,
    clearAccess,
  };
}
