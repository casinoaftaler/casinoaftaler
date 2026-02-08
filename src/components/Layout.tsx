import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { BackToTop } from "./BackToTop";
import { TwitchLivePlayer } from "./TwitchLivePlayer";
import { ProfileCompletionPrompt } from "./ProfileCompletionPrompt";
import { usePageTracking } from "@/hooks/usePageTracking";

export function Layout() {
  usePageTracking();
  const location = useLocation();
  
  // Hide footer on game pages (but show on library)
  const hideFooter = location.pathname.startsWith("/community/slots/");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
