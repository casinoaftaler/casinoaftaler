import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export const DWELL_REWARD_PAGES = [
  { path: "/top-10-casino-online", label: "Top 10 Casino", credits: 300 },
  { path: "/casino-bonus", label: "Casino Bonus", credits: 300 },
  { path: "/free-spins", label: "Free Spins", credits: 300 },
  { path: "/live-casino", label: "Live Casino", credits: 300 },
  { path: "/nye-casinoer", label: "Nye Casinoer", credits: 300 },
  { path: "/casino-anmeldelser", label: "Casino Anmeldelser", credits: 300 },
] as const;

export const DWELL_DURATION_SECONDS = 120;
export const SCROLL_THRESHOLD = 0.3; // 30% scroll depth required

interface DwellRewardState {
  /** Seconds remaining (60 → 0) */
  secondsLeft: number;
  /** Whether timer is actively counting */
  isActive: boolean;
  /** Whether reward was claimed */
  isClaimed: boolean;
  /** Whether currently claiming */
  isClaiming: boolean;
  /** Whether this page was already completed today */
  alreadyCompleted: boolean;
  /** Whether user has scrolled past threshold */
  hasScrolled: boolean;
  /** Error message if any */
  error: string | null;
}

export function useDwellReward(pagePath: string) {
  const { user } = useAuth();
  const [state, setState] = useState<DwellRewardState>({
    secondsLeft: DWELL_DURATION_SECONDS,
    isActive: false,
    isClaimed: false,
    isClaiming: false,
    alreadyCompleted: false,
    hasScrolled: false,
    error: null,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const hasScrolledRef = useRef(false);

  const isEligiblePage = DWELL_REWARD_PAGES.some((p) => p.path === pagePath);

  // Check if mission was activated via ?mission=1 param
  const isMissionActivated = typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("mission") === "1";

  // Check if already completed today
  useEffect(() => {
    if (!user || !isEligiblePage || !isMissionActivated) return;

    const today = new Date().toISOString().split("T")[0];
    supabase
      .from("daily_dwell_rewards")
      .select("id")
      .eq("user_id", user.id)
      .eq("page_path", pagePath)
      .eq("reward_date", today)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setState((s) => ({ ...s, alreadyCompleted: true, isClaimed: true }));
        }
      });
  }, [user, pagePath, isEligiblePage, isMissionActivated]);

  // Scroll detection
  useEffect(() => {
    if (!user || !isEligiblePage || !isMissionActivated || state.alreadyCompleted || state.isClaimed) return;

    const handleScroll = () => {
      if (hasScrolledRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= SCROLL_THRESHOLD) {
        hasScrolledRef.current = true;
        setState((s) => ({ ...s, hasScrolled: true }));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check immediately
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user, isEligiblePage, state.alreadyCompleted, state.isClaimed]);

  // Timer logic with visibility API + scroll gate
  useEffect(() => {
    if (!user || !isEligiblePage || state.alreadyCompleted || state.isClaimed) return;
    if (!hasScrolledRef.current) return; // Don't start until scrolled

    const startTimer = () => {
      if (timerRef.current) return;
      startTimeRef.current = Date.now();
      setState((s) => ({ ...s, isActive: true }));

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const sessionElapsed = (now - startTimeRef.current) / 1000;
        const totalElapsed = elapsedRef.current + sessionElapsed;
        const remaining = Math.max(0, DWELL_DURATION_SECONDS - totalElapsed);

        setState((s) => ({ ...s, secondsLeft: Math.ceil(remaining) }));

        if (remaining <= 0) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          elapsedRef.current = DWELL_DURATION_SECONDS;
          setState((s) => ({ ...s, isActive: false, secondsLeft: 0 }));
        }
      }, 250);
    };

    const stopTimer = () => {
      if (timerRef.current) {
        const sessionElapsed = (Date.now() - startTimeRef.current) / 1000;
        elapsedRef.current += sessionElapsed;
        clearInterval(timerRef.current);
        timerRef.current = null;
        setState((s) => ({ ...s, isActive: false }));
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startTimer();
      } else {
        stopTimer();
      }
    };

    // Start immediately if visible
    if (document.visibilityState === "visible") {
      startTimer();
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user, isEligiblePage, state.alreadyCompleted, state.isClaimed, state.hasScrolled]);

  // Auto-claim when timer reaches 0
  useEffect(() => {
    if (state.secondsLeft === 0 && !state.isClaimed && !state.isClaiming && user) {
      claimReward();
    }
  }, [state.secondsLeft, state.isClaimed, state.isClaiming, user]);

  const queryClient = useQueryClient();

  const claimReward = useCallback(async () => {
    if (!user || state.isClaimed || state.isClaiming) return;

    setState((s) => ({ ...s, isClaiming: true }));

    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase.rpc("claim_dwell_reward", {
      p_user_id: user.id,
      p_page_path: pagePath,
      p_today: today,
    });

    if (error) {
      setState((s) => ({ ...s, isClaiming: false, error: error.message }));
      return;
    }

    const result = data as any;
    if (result?.error) {
      setState((s) => ({ ...s, isClaiming: false, error: result.error }));
      return;
    }

    // Invalidate credit queries so header updates immediately
    queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
    queryClient.invalidateQueries({ queryKey: ["header-credits"] });

    setState((s) => ({
      ...s,
      isClaimed: true,
      isClaiming: false,
      alreadyCompleted: true,
    }));
  }, [user, pagePath, state.isClaimed, state.isClaiming, queryClient]);

  return {
    ...state,
    isEligiblePage,
    isLoggedIn: !!user,
  };
}

/** Hook to fetch today's completed dwell rewards for the current user */
export function useDwellRewardProgress() {
  const { user } = useAuth();
  const [completedPages, setCompletedPages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = useCallback(async (userId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("daily_dwell_rewards")
      .select("page_path")
      .eq("user_id", userId)
      .eq("reward_date", today);
    setCompletedPages(data?.map((d) => d.page_path) ?? []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      setCompletedPages([]);
      setIsLoading(false);
      return;
    }
    fetchProgress(user.id);
  }, [user, fetchProgress]);

  // Listen directly to auth state changes to handle login without re-mount
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setIsLoading(true);
          fetchProgress(session.user.id);
        } else if (event === "SIGNED_OUT") {
          setCompletedPages([]);
          setIsLoading(false);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [fetchProgress]);

  return {
    completedPages,
    totalPages: DWELL_REWARD_PAGES.length,
    completedCount: completedPages.length,
    isLoading,
    pages: DWELL_REWARD_PAGES.map((p) => ({
      ...p,
      completed: completedPages.includes(p.path),
    })),
  };
}
