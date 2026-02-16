import { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { usePageTracking } from "@/hooks/usePageTracking";
import { ScrollToTop } from "./ScrollToTop";
import { useBanCheck } from "@/hooks/useBanCheck";
import { BannedScreen } from "./BannedScreen";

// Lazy load non-critical overlay components to reduce initial bundle
const CookieConsent = lazy(() => import("./CookieConsent").then(m => ({ default: m.CookieConsent })));
const BackToTop = lazy(() => import("./BackToTop").then(m => ({ default: m.BackToTop })));
const TwitchLivePlayer = lazy(() => import("./TwitchLivePlayer").then(m => ({ default: m.TwitchLivePlayer })));
const ProfileCompletionPrompt = lazy(() => import("./ProfileCompletionPrompt").then(m => ({ default: m.ProfileCompletionPrompt })));

export function Layout() {
  usePageTracking();
  const location = useLocation();
  const { isBanned, banLoading } = useBanCheck();
  
  const hideFooter = location.pathname.startsWith("/community/slots/");

  if (isBanned && !banLoading) {
    return <BannedScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <Breadcrumbs />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <Suspense fallback={null}>
        <CookieConsent />
        <BackToTop />
        <TwitchLivePlayer />
        <ProfileCompletionPrompt />
      </Suspense>
    </div>
  );
}
