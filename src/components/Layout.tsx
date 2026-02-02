import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";
import { BackToTop } from "./BackToTop";
import { usePageTracking } from "@/hooks/usePageTracking";

export function Layout() {
  usePageTracking();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <BackToTop />
    </div>
  );
}
