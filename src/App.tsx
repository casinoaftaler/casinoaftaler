import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SlotPageLoading } from "./components/slots/SlotPageLoading";
import Index from "./pages/Index";
import CasinoDetail from "./pages/CasinoDetail";
import About from "./pages/About";
import BonusGuide from "./pages/BonusGuide";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Shop from "./pages/Shop";
import Highlights from "./pages/Highlights";
import CommunityHighlights from "./pages/CommunityHighlights";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import NotFound from "./pages/NotFound";

// Lazy load game pages for better initial load performance
const GameLibrary = lazy(() => import("./pages/GameLibrary"));
const SlotMachine = lazy(() => import("./pages/SlotMachine"));
const RiseOfFedesvin = lazy(() => import("./pages/RiseOfFedesvin"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/casino/:slug" element={<CasinoDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/bonus-guide" element={<BonusGuide />} />
            <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/butik" element={<Shop />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/community/highlights" element={<CommunityHighlights />} />
            <Route path="/community/leaderboard" element={<Leaderboard />} />
            <Route 
              path="/community/slots" 
              element={
                <Suspense fallback={<SlotPageLoading />}>
                  <GameLibrary />
                </Suspense>
              } 
            />
            <Route 
              path="/community/slots/book-of-fedesvin" 
              element={
                <Suspense fallback={<SlotPageLoading />}>
                  <SlotMachine />
                </Suspense>
              } 
            />
            <Route 
              path="/community/slots/rise-of-fedesvin" 
              element={
                <Suspense fallback={<SlotPageLoading />}>
                  <RiseOfFedesvin />
                </Suspense>
              } 
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/u/:username" element={<PublicProfile />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
