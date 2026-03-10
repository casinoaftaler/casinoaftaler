import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Generate device info from user agent
const getDeviceInfo = (): string => {
  const ua = navigator.userAgent;
  
  // Detect browser
  let browser = "Ukendt browser";
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  
  // Detect OS
  let os = "Ukendt";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "MacOS";
  else if (ua.includes("iPhone")) os = "iPhone";
  else if (ua.includes("iPad")) os = "iPad";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";
  
  return `${browser} på ${os}`;
};

// Generate a unique session ID per browser tab
const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem("slot_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("slot_session_id", sessionId);
  }
  return sessionId;
};

// Heartbeat interval (30 seconds - reduced from 10s for lower DB write pressure)
const HEARTBEAT_INTERVAL = 30000;
// Session timeout (90 seconds - 3x heartbeat interval)
const SESSION_TIMEOUT = 90000;

interface SlotSessionState {
  isSessionActive: boolean;
  isBlockedByOtherDevice: boolean;
  otherDeviceInfo: string | null;
  lastHeartbeat: Date | null;
  isLoading: boolean;
  error: string | null;
}

export function useSlotSession(gameId?: string) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const sessionId = useRef(getOrCreateSessionId());
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const isActiveRef = useRef(false);
  const [state, setState] = useState<SlotSessionState>({
    isSessionActive: false,
    isBlockedByOtherDevice: false,
    otherDeviceInfo: null,
    lastHeartbeat: null,
    isLoading: true,
    error: null,
  });

  // Check for existing active session
  const checkSession = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { data: existingSession, error } = await supabase
        .from("slot_active_sessions")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (existingSession) {
        const lastHeartbeat = new Date(existingSession.last_heartbeat);
        const timeSinceHeartbeat = Date.now() - lastHeartbeat.getTime();
        const isOtherSession = existingSession.session_id !== sessionId.current;
        const isSessionAlive = timeSinceHeartbeat < SESSION_TIMEOUT;

        if (isOtherSession && isSessionAlive) {
          // Another device is actively using the slot
          isActiveRef.current = false;
          setState(prev => ({
            ...prev,
            isSessionActive: false,
            isBlockedByOtherDevice: true,
            otherDeviceInfo: existingSession.device_info,
            lastHeartbeat: lastHeartbeat,
            isLoading: false,
            error: null,
          }));
          return;
        }
      }

      // No active session from another device - claim this session
      await claimSession();
    } catch (error) {
      console.error("Error checking session:", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Kunne ikke tjekke session",
      }));
    }
  }, [user?.id]);

  // Claim this device as the active session
  const claimSession = useCallback(async () => {
    if (!user?.id) return;

    const deviceInfo = getDeviceInfo();
    
    try {
      // Upsert session - either create new or update existing
      const { error } = await supabase
        .from("slot_active_sessions")
        .upsert({
          user_id: user.id,
          session_id: sessionId.current,
          device_info: deviceInfo,
          last_heartbeat: new Date().toISOString(),
          game_id: gameId || null,
        } as any, {
          onConflict: "user_id",
        });

      if (error) throw error;

      isActiveRef.current = true;
      setState(prev => ({
        ...prev,
        isSessionActive: true,
        isBlockedByOtherDevice: false,
        otherDeviceInfo: null,
        lastHeartbeat: new Date(),
        isLoading: false,
        error: null,
      }));

      // Start heartbeat
      startHeartbeat();
    } catch (error) {
      console.error("Error claiming session:", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Kunne ikke aktivere session",
      }));
    }
  }, [user?.id]);

  // Send heartbeat to keep session alive - use ref to avoid stale closure
  const sendHeartbeat = useCallback(async () => {
    if (!user?.id || !isActiveRef.current) return;

    try {
      const { error } = await supabase
        .from("slot_active_sessions")
        .update({
          last_heartbeat: new Date().toISOString(),
        })
        .eq("user_id", user.id)
        .eq("session_id", sessionId.current);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        lastHeartbeat: new Date(),
      }));
    } catch (error) {
      console.error("Heartbeat error:", error);
    }
  }, [user?.id]);

  // Start heartbeat interval
  const startHeartbeat = useCallback(() => {
    // Clear any existing interval
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }

    // Send heartbeat every 10 seconds
    heartbeatIntervalRef.current = setInterval(() => {
      sendHeartbeat();
    }, HEARTBEAT_INTERVAL);
  }, [sendHeartbeat]);

  // Take over session from another device
  const takeOverSession = useCallback(async () => {
    if (!user?.id) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Delete existing session and claim new one
      await supabase
        .from("slot_active_sessions")
        .delete()
        .eq("user_id", user.id);

      await claimSession();
    } catch (error) {
      console.error("Error taking over session:", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Kunne ikke overtage session",
      }));
    }
  }, [user?.id, claimSession]);

  // Release session on unmount or logout
  const releaseSession = useCallback(async () => {
    if (!user?.id) return;

    try {
      await supabase
        .from("slot_active_sessions")
        .delete()
        .eq("user_id", user.id)
        .eq("session_id", sessionId.current);
    } catch (error) {
      console.error("Error releasing session:", error);
    }
  }, [user?.id]);

  // Initialize session check and realtime subscription when user is available
  useEffect(() => {
    if (user?.id) {
      checkSession();

      // Subscribe to realtime changes to detect when another device takes over
      channelRef.current = supabase
        .channel(`session_takeover_${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "slot_active_sessions",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newData = payload.new as any;
            // If session was taken over by another device, redirect to home
            if (newData.session_id !== sessionId.current && state.isSessionActive) {
              // Stop heartbeat
              if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current);
                heartbeatIntervalRef.current = null;
              }
              
              // Update state
              isActiveRef.current = false;
              setState(prev => ({
                ...prev,
                isSessionActive: false,
                isBlockedByOtherDevice: true,
                otherDeviceInfo: newData.device_info,
              }));
              
              // Show toast and redirect
              toast.info("Spillet blev overtaget af en anden enhed", {
                description: newData.device_info || "En anden enhed",
              });
              navigate("/");
            }
          }
        )
        .subscribe();
    } else {
      setState({
        isSessionActive: false,
        isBlockedByOtherDevice: false,
        otherDeviceInfo: null,
        lastHeartbeat: null,
        isLoading: false,
        error: null,
      });
    }

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [user?.id, checkSession, state.isSessionActive, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      releaseSession();
    };
  }, [releaseSession]);

  // Calculate time since other device's last heartbeat
  const getTimeSinceOtherDeviceActive = (): string | null => {
    if (!state.lastHeartbeat) return null;
    const seconds = Math.floor((Date.now() - state.lastHeartbeat.getTime()) / 1000);
    if (seconds < 10) return "lige nu";
    if (seconds < 60) return `for ${seconds} sekunder siden`;
    const minutes = Math.floor(seconds / 60);
    return `for ${minutes} minut${minutes > 1 ? "ter" : ""} siden`;
  };

  return {
    isSessionActive: state.isSessionActive,
    isBlockedByOtherDevice: state.isBlockedByOtherDevice,
    otherDeviceInfo: state.otherDeviceInfo,
    timeSinceOtherActive: getTimeSinceOtherDeviceActive(),
    isLoading: state.isLoading,
    error: state.error,
    takeOverSession,
    refreshSession: checkSession,
  };
}
