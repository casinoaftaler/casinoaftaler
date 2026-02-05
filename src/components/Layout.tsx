import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { BackToTop } from "./BackToTop";
import { TwitchLivePlayer } from "./TwitchLivePlayer";
import { usePageTracking } from "@/hooks/usePageTracking";

export function Layout() {
  usePageTracking();
  const location = useLocation();
  
  // Hide footer on slot machine page
  const hideFooter = location.pathname === "/community/slots";

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
    </div>
  );
}
