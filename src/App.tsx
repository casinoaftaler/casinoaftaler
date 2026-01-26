import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import CasinoDetail from "./pages/CasinoDetail";
import About from "./pages/About";
import BonusGuide from "./pages/BonusGuide";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import CasinoOwner from "./pages/CasinoOwner";
import NotFound from "./pages/NotFound";

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
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/casino-owner" element={<CasinoOwner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
