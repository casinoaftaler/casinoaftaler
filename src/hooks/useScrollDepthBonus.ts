import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { getTodayDanish } from "@/lib/danishDate";

export const SCROLL_DEPTH_THRESHOLD = 0.6; // 60%
export const SCROLL_DEPTH_HINT_THRESHOLD = 0.3; // 30% – show hint
export const SCROLL_DEPTH_BONUS_CREDITS = 300;

export function useScrollDepthBonus(pagePath: string, dwellCompleted: boolean) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [hasReachedDepth, setHasReachedDepth] = useState(false);
  const [hasReachedHint, setHasReachedHint] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const depthRef = useRef(false);
  const hintRef = useRef(false);

  // Track scroll depth
  useEffect(() => {
    if (!user || !dwellCompleted || isClaimed) return;

    const handleScroll = () => {
      if (depthRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= SCROLL_DEPTH_THRESHOLD) {
        depthRef.current = true;
        setHasReachedDepth(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user, dwellCompleted, isClaimed]);

  // Reset on page change
  useEffect(() => {
    depthRef.current = false;
    setHasReachedDepth(false);
    setIsClaimed(false);
    setIsClaiming(false);
  }, [pagePath]);

  // Auto-claim when depth reached
  useEffect(() => {
    if (hasReachedDepth && dwellCompleted && !isClaimed && !isClaiming && user) {
      claimBonus();
    }
  }, [hasReachedDepth, dwellCompleted, isClaimed, isClaiming, user]);

  const claimBonus = useCallback(async () => {
    if (!user || isClaimed || isClaiming) return;
    setIsClaiming(true);

    const today = getTodayDanish();
    const { data } = await supabase.rpc("claim_scroll_depth_bonus", {
      p_user_id: user.id,
      p_page_path: pagePath,
      p_today: today,
    });

    const result = data as any;
    if (result?.success) {
      setIsClaimed(true);
      queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
      queryClient.invalidateQueries({ queryKey: ["header-credits"] });
    }
    setIsClaiming(false);
  }, [user, pagePath, isClaimed, isClaiming, queryClient]);

  return { hasReachedDepth, isClaimed, scrollDepthCredits: SCROLL_DEPTH_BONUS_CREDITS };
}
