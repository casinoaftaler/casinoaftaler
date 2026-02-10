import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SESSION_STORAGE_KEY = "slot_page_access_granted";
const RISE_SESSION_STORAGE_KEY = "rise_slot_page_access_granted";

interface SlotPageAccessSettings {
  isLocked: boolean;
}

const GAME_SETTINGS_KEYS: Record<string, { lockedKey: string; sessionKey: string }> = {
  "book-of-fedesvin": {
    lockedKey: "slot_page_locked",
    sessionKey: SESSION_STORAGE_KEY,
  },
  "rise-of-fedesvin": {
    lockedKey: "rise_of_fedesvin_locked",
    sessionKey: RISE_SESSION_STORAGE_KEY,
  },
};

export function useSlotPageAccess(gameId: string = "book-of-fedesvin") {
  const { user } = useAuth();
  const [hasSessionAccess, setHasSessionAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

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

  // Fetch ONLY lock status from database (NOT the password)
  const { data: settings, isLoading } = useQuery({
    queryKey: ["slot-page-access-settings", gameId],
    queryFn: async (): Promise<SlotPageAccessSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .eq("key", gameKeys.lockedKey);

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        settingsMap[s.key] = s.value || "";
      });

      return {
        isLocked: settingsMap[gameKeys.lockedKey] === "true",
      };
    },
  });

  const isLocked = settings?.isLocked ?? true;
  
  // User has access if: not locked, or is admin, or has session access
  const hasAccess = !isLocked || isAdmin || hasSessionAccess;

  // Server-side password verification via edge function
  const verifyPassword = useCallback(async (inputPassword: string): Promise<boolean> => {
    setError(null);
    setIsVerifying(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("verify-slot-password", {
        body: { password: inputPassword, gameId },
      });

      if (fnError) {
        console.error("Password verification error:", fnError);
        setError("Kunne ikke verificere password");
        return false;
      }

      if (data?.valid) {
        sessionStorage.setItem(gameKeys.sessionKey, "true");
        setHasSessionAccess(true);
        return true;
      } else {
        setError("Forkert password");
        return false;
      }
    } catch (err) {
      console.error("Password verification error:", err);
      setError("Kunne ikke verificere password");
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [gameId, gameKeys.sessionKey]);

  const clearAccess = useCallback(() => {
    sessionStorage.removeItem(gameKeys.sessionKey);
    setHasSessionAccess(false);
  }, [gameKeys.sessionKey]);

  return {
    isLocked,
    hasAccess,
    isAdmin,
    isLoading,
    isVerifying,
    error,
    verifyPassword,
    clearAccess,
  };
}
