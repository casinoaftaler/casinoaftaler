import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SlotPageLoading } from "./components/slots/SlotPageLoading";
import Index from "./pages/Index";

// Lazy load all pages except Index for smaller initial bundle
const CasinoDetail = lazy(() => import("./pages/CasinoDetail"));
const NyeCasinoer = lazy(() => import("./pages/NyeCasinoer"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const BonusGuide = lazy(() => import("./pages/BonusGuide"));
const ResponsibleGaming = lazy(() => import("./pages/ResponsibleGaming"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Shop = lazy(() => import("./pages/Shop"));
const Highlights = lazy(() => import("./pages/Highlights"));

const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const RewardsProgram = lazy(() => import("./pages/RewardsProgram"));
const GameLibrary = lazy(() => import("./pages/GameLibrary"));
const SlotMachine = lazy(() => import("./pages/SlotMachine"));
const RiseOfFedesvin = lazy(() => import("./pages/RiseOfFedesvin"));
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Profile = lazy(() => import("./pages/Profile"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const Betalingsmetoder = lazy(() => import("./pages/Betalingsmetoder"));
const Spiludviklere = lazy(() => import("./pages/Spiludviklere"));
const FreeSpins = lazy(() => import("./pages/FreeSpins"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => <div className="min-h-screen" />;

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/casino/:slug" element={<CasinoDetail />} />
                <Route path="/nye-casinoer" element={<NyeCasinoer />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/bonus-guide" element={<BonusGuide />} />
                <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/butik" element={<Shop />} />
                <Route path="/highlights" element={<Highlights />} />
                <Route path="/betalingsmetoder" element={<Betalingsmetoder />} />
                <Route path="/spiludviklere" element={<Spiludviklere />} />
                <Route path="/free-spins" element={<FreeSpins />} />
                
                <Route path="/community/leaderboard" element={<Leaderboard />} />
                <Route path="/community/rewards" element={<RewardsProgram />} />
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
