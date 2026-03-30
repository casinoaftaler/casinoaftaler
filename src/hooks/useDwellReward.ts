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
export const SCROLL_THRESHOLD = 0.3;

/** Set mission mode – call this onClick before navigating */
export function activateMissionMode() {
  sessionStorage.setItem("missionActive", "1");
}

/** Check if mission mode is active (persists across navigations in same tab) */
function isMissionMode(): boolean {
  return typeof window !== "undefined" && sessionStorage.getItem("missionActive") === "1";
}

/** Strip ?mission=1 from URL if present (legacy / fallback) */
function cleanMissionParam() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (params.has("mission")) {
    activateMissionMode();
    params.delete("mission");
    const clean = params.toString();
    const newUrl = window.location.pathname + (clean ? `?${clean}` : "") + window.location.hash;
    window.history.replaceState({}, "", newUrl);
  }
}

interface DwellRewardState {
  secondsLeft: number;
  isActive: boolean;
  isClaimed: boolean;
  isClaiming: boolean;
  alreadyCompleted: boolean;
  hasScrolled: boolean;
  error: string | null;
}

const INITIAL_STATE: DwellRewardState = {
  secondsLeft: DWELL_DURATION_SECONDS,
  isActive: false,
  isClaimed: false,
  isClaiming: false,
  alreadyCompleted: false,
  hasScrolled: false,
  error: null,
};

export function useDwellReward(pagePath: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [state, setState] = useState<DwellRewardState>(INITIAL_STATE);
  const [isMissionActivated, setIsMissionActivated] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const hasScrolledRef = useRef(false);

  const isEligiblePage = DWELL_REWARD_PAGES.some((p) => p.path === pagePath);

  // On every pagePath change: clean URL, check sessionStorage, full reset
  useEffect(() => {
    cleanMissionParam();
    setIsMissionActivated(isMissionMode());

    // Full reset
    hasScrolledRef.current = false;
    elapsedRef.current = 0;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState(INITIAL_STATE);
  }, [pagePath]);

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user, isEligiblePage, isMissionActivated, state.alreadyCompleted, state.isClaimed]);

  // Timer logic
  useEffect(() => {
    if (!user || !isEligiblePage || !isMissionActivated || state.alreadyCompleted || state.isClaimed) return;
    if (!hasScrolledRef.current) return;

    const startTimer = () => {
      if (timerRef.current) return;
      startTimeRef.current = Date.now();
      setState((s) => ({ ...s, isActive: true }));

      timerRef.current = setInterval(() => {
        const sessionElapsed = (Date.now() - startTimeRef.current) / 1000;
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
        elapsedRef.current += (Date.now() - startTimeRef.current) / 1000;
        clearInterval(timerRef.current);
        timerRef.current = null;
        setState((s) => ({ ...s, isActive: false }));
      }
    };

    const handleVisibility = () => {
      document.visibilityState === "visible" ? startTimer() : stopTimer();
    };

    if (document.visibilityState === "visible") startTimer();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user, isEligiblePage, isMissionActivated, state.alreadyCompleted, state.isClaimed, state.hasScrolled]);

  // Auto-claim
  useEffect(() => {
    if (state.secondsLeft === 0 && !state.isClaimed && !state.isClaiming && user) {
      claimReward();
    }
  }, [state.secondsLeft, state.isClaimed, state.isClaiming, user]);

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

    // Invalidate all relevant queries so UI updates everywhere
    queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
    queryClient.invalidateQueries({ queryKey: ["header-credits"] });
    queryClient.invalidateQueries({ queryKey: ["dwell-progress"] });

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
    isMissionActivated,
    isLoggedIn: !!user,
  };
}

/** Hook to fetch today's completed dwell rewards for the current user */
export function useDwellRewardProgress() {
  const { user } = useAuth();
  const [completedPages, setCompletedPages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

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
  }, [user, fetchProgress, refreshKey]);

  // Listen to queryClient invalidation of "dwell-progress" to refetch
  const queryClient = useQueryClient();
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === "updated" || event?.type === "removed") {
        const key = event?.query?.queryKey;
        if (Array.isArray(key) && key[0] === "dwell-progress") {
          setRefreshKey((k) => k + 1);
        }
      }
    });
    return () => unsubscribe();
  }, [queryClient]);

  // Auth state changes
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
    refetch: () => setRefreshKey((k) => k + 1),
  };
}