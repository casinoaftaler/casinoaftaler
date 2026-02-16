import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { CookieConsent } from "./CookieConsent";
import { BackToTop } from "./BackToTop";
import { TwitchLivePlayer } from "./TwitchLivePlayer";
import { ProfileCompletionPrompt } from "./ProfileCompletionPrompt";
import { usePageTracking } from "@/hooks/usePageTracking";
import { ScrollToTop } from "./ScrollToTop";
import { useBanCheck } from "@/hooks/useBanCheck";
import { BannedScreen } from "./BannedScreen";

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
      <CookieConsent />
      <BackToTop />
      <TwitchLivePlayer />
      <ProfileCompletionPrompt />
    </div>
  );
}
