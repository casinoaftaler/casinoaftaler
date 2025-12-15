import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ResponsibleGamingBanner } from "./ResponsibleGamingBanner";
import { CookieConsent } from "./CookieConsent";
import { BackToTop } from "./BackToTop";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsibleGamingBanner />
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
