import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SESSION_STORAGE_KEY = "slot_page_access_granted";
const RISE_SESSION_STORAGE_KEY = "rise_slot_page_access_granted";

interface SlotPageAccessSettings {
  isLocked: boolean;
  password: string;
}

const GAME_SETTINGS_KEYS: Record<string, { lockedKey: string; passwordKey: string; sessionKey: string }> = {
  "book-of-fedesvin": {
    lockedKey: "slot_page_locked",
    passwordKey: "slot_page_password",
    sessionKey: SESSION_STORAGE_KEY,
  },
  "rise-of-fedesvin": {
    lockedKey: "rise_of_fedesvin_locked",
    passwordKey: "rise_of_fedesvin_password",
    sessionKey: RISE_SESSION_STORAGE_KEY,
  },
};

export function useSlotPageAccess(gameId: string = "book-of-fedesvin") {
  const { user } = useAuth();
  const [hasSessionAccess, setHasSessionAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameKeys = GAME_SETTINGS_KEYS[gameId] || GAME_SETTINGS_KEYS["book-of-fedesvin"];

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
    const stored = sessionStorage.getItem(gameKeys.sessionKey);
    if (stored === "true") {
      setHasSessionAccess(true);
    }
  }, [gameKeys.sessionKey]);

  // Fetch lock settings from database
  const { data: settings, isLoading } = useQuery({
    queryKey: ["slot-page-access-settings", gameId],
    queryFn: async (): Promise<SlotPageAccessSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [gameKeys.lockedKey, gameKeys.passwordKey]);

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || "";
      });

      return {
        isLocked: settingsMap[gameKeys.lockedKey] === "true",
        password: settingsMap[gameKeys.passwordKey] || "",
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
      sessionStorage.setItem(gameKeys.sessionKey, "true");
      setHasSessionAccess(true);
      return true;
    } else {
      setError("Forkert password");
      return false;
    }
  }, [settings?.password, gameKeys.sessionKey]);

  const clearAccess = useCallback(() => {
    sessionStorage.removeItem(gameKeys.sessionKey);
    setHasSessionAccess(false);
  }, [gameKeys.sessionKey]);

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
