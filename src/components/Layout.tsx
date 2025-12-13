import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ResponsibleGamingBanner } from "./ResponsibleGamingBanner";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsibleGamingBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
