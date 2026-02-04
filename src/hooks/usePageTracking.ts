import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const VISITOR_ID_KEY = "visitor_id";

// Generate a unique visitor ID
function generateVisitorId(): string {
  return `anon_${crypto.randomUUID()}`;
}

// Get or create a persistent visitor ID from localStorage
function getVisitorId(): string | null {
  // Only create/use visitor ID if cookie consent is accepted
  const consent = localStorage.getItem("cookie-consent");
  if (consent !== "accepted") {
    return null;
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

export function usePageTracking() {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = location.pathname;

    // Avoid tracking the same path multiple times in a row
    if (lastTrackedPath.current === currentPath) {
      return;
    }

    lastTrackedPath.current = currentPath;

    // Track the page view
    const trackPageView = async () => {
      try {
        // Get visitor ID (respects cookie consent)
        const visitorId = getVisitorId();

        // Get current user ID if logged in
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id || null;

        await supabase.from("page_views").insert({
          path: currentPath,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          visitor_id: visitorId,
          user_id: userId,
        });
      } catch (error) {
        // Silently fail - analytics should not break the app
        console.debug("Page tracking error:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);
}
