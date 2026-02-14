import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const VISITOR_ID_KEY = "visitor_id";

function generateVisitorId(): string {
  return `anon_${crypto.randomUUID()}`;
}

function getVisitorId(): string | null {
  const consent = localStorage.getItem("cookie-consent");
  if (consent !== "accepted") return null;

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

// Cache the session to avoid repeated async calls
let cachedUserId: string | null = null;
let sessionChecked = false;

async function getCachedUserId(): Promise<string | null> {
  if (sessionChecked) return cachedUserId;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    cachedUserId = session?.user?.id || null;
    sessionChecked = true;
  } catch {
    cachedUserId = null;
    sessionChecked = true;
  }
  return cachedUserId;
}

// Listen for auth changes to invalidate cache
supabase.auth.onAuthStateChange((_event, session) => {
  cachedUserId = session?.user?.id || null;
  sessionChecked = true;
});

export function usePageTracking() {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;
    if (lastTrackedPath.current === currentPath) return;
    lastTrackedPath.current = currentPath;

    const trackPageView = async () => {
      try {
        const visitorId = getVisitorId();
        const userId = await getCachedUserId();

        await supabase.from("page_views").insert({
          path: currentPath,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          visitor_id: visitorId,
          user_id: userId,
        });
      } catch {
        // Silently fail
      }
    };

    trackPageView();
  }, [location.pathname]);
}
