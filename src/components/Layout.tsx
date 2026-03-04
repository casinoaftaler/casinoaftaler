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
  const isCommunityPage = location.pathname.startsWith("/community") || location.pathname.startsWith("/profil") || location.pathname.startsWith("/auth");
  const isSlotMachinePage = location.pathname.startsWith("/community/slots/");

  if (isBanned && !banLoading) {
    return <BannedScreen />;
  }

  return (
    <div className={isSlotMachinePage ? "flex h-screen flex-col overflow-hidden" : "flex min-h-screen flex-col"}>
      <ScrollToTop />
      <Header />
      <Breadcrumbs />
      <main className={isSlotMachinePage ? "flex-1 overflow-hidden" : "flex-1"} style={isSlotMachinePage ? undefined : { minHeight: '100vh' }}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <CookieConsent />
      <BackToTop />
      {isCommunityPage && <TwitchLivePlayer />}
      <ProfileCompletionPrompt />
    </div>
  );
}
