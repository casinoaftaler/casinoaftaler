import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
        await supabase.from("page_views").insert({
          path: currentPath,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
        });
      } catch (error) {
        // Silently fail - analytics should not break the app
        console.debug("Page tracking error:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);
}
