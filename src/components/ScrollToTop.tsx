import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const EXCLUDED_PATHS = ["/casino-bonus"];

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname]);

  return null;
}
