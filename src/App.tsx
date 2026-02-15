import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SlotPageLoading } from "./components/slots/SlotPageLoading";

import Index from "./pages/Index";

// Eager-load most visited pages to avoid Suspense flash
import CasinoBonus from "./pages/CasinoBonus";
import NyeCasinoer from "./pages/NyeCasinoer";
import TopCasinoOnline from "./pages/TopCasinoOnline";

// Lazy load remaining pages
const CasinoDetail = lazy(() => import("./pages/CasinoDetail"));
const OmTeamet = lazy(() => import("./pages/OmTeamet"));
const Forretningsmodel = lazy(() => import("./pages/Forretningsmodel"));
const RedaktionelPolitik = lazy(() => import("./pages/RedaktionelPolitik"));
const Contact = lazy(() => import("./pages/Contact"));

const ResponsibleGaming = lazy(() => import("./pages/ResponsibleGaming"));
const Spillemyndigheden = lazy(() => import("./pages/Spillemyndigheden"));
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
const Velkomstbonus = lazy(() => import("./pages/Velkomstbonus"));
const Omsaetningskrav = lazy(() => import("./pages/Omsaetningskrav"));
const Indskudsbonus = lazy(() => import("./pages/Indskudsbonus"));
const BonusUdenIndbetaling = lazy(() => import("./pages/BonusUdenIndbetaling"));
const BonusUdenOmsaetningskrav = lazy(() => import("./pages/BonusUdenOmsaetningskrav"));
const LiveCasino = lazy(() => import("./pages/LiveCasino"));
const NoStickyBonus = lazy(() => import("./pages/NoStickyBonus"));
const StickyBonus = lazy(() => import("./pages/StickyBonus"));
const SpilleautomatenAnmeldelse = lazy(() => import("./pages/SpilleautomatenAnmeldelse"));
const SpilDanskNuAnmeldelse = lazy(() => import("./pages/SpilDanskNuAnmeldelse"));
const CampobetAnmeldelse = lazy(() => import("./pages/CampobetAnmeldelse"));
const BetiniaAnmeldelse = lazy(() => import("./pages/BetiniaAnmeldelse"));
const SwiftCasinoAnmeldelse = lazy(() => import("./pages/SwiftCasinoAnmeldelse"));
const LunaCasinoAnmeldelse = lazy(() => import("./pages/LunaCasinoAnmeldelse"));
const DanskeSpilAnmeldelse = lazy(() => import("./pages/DanskeSpilAnmeldelse"));
const ComeOnAnmeldelse = lazy(() => import("./pages/ComeOnAnmeldelse"));
const GetLuckyAnmeldelse = lazy(() => import("./pages/GetLuckyAnmeldelse"));
const MrGreenAnmeldelse = lazy(() => import("./pages/MrGreenAnmeldelse"));
const VideoslotsAnmeldelse = lazy(() => import("./pages/VideoslotsAnmeldelse"));
const MrVegasAnmeldelse = lazy(() => import("./pages/MrVegasAnmeldelse"));
const LeoVegasAnmeldelse = lazy(() => import("./pages/LeoVegasAnmeldelse"));
const ExpektAnmeldelse = lazy(() => import("./pages/ExpektAnmeldelse"));
const BetanoAnmeldelse = lazy(() => import("./pages/BetanoAnmeldelse"));
const Casino888Anmeldelse = lazy(() => import("./pages/Casino888Anmeldelse"));
const UnibetAnmeldelse = lazy(() => import("./pages/UnibetAnmeldelse"));
const Bet365Anmeldelse = lazy(() => import("./pages/Bet365Anmeldelse"));
const RoyalCasinoAnmeldelse = lazy(() => import("./pages/RoyalCasinoAnmeldelse"));
const MariaCasinoAnmeldelse = lazy(() => import("./pages/MariaCasinoAnmeldelse"));
const KapowCasinoAnmeldelse = lazy(() => import("./pages/KapowCasinoAnmeldelse"));
const NordicBetAnmeldelse = lazy(() => import("./pages/NordicBetAnmeldelse"));
const OneCasinoAnmeldelse = lazy(() => import("./pages/OneCasinoAnmeldelse"));
const SpilnuAnmeldelse = lazy(() => import("./pages/SpilnuAnmeldelse"));
const StakeCasinoAnmeldelse = lazy(() => import("./pages/StakeCasinoAnmeldelse"));
const CasinostuenAnmeldelse = lazy(() => import("./pages/CasinostuenAnmeldelse"));
const PokerStarsAnmeldelse = lazy(() => import("./pages/PokerStarsAnmeldelse"));
const BwinAnmeldelse = lazy(() => import("./pages/BwinAnmeldelse"));
const MarathonBetAnmeldelse = lazy(() => import("./pages/MarathonBetAnmeldelse"));
const CasinoAnmeldelser = lazy(() => import("./pages/CasinoAnmeldelser"));
const Casinospil = lazy(() => import("./pages/Casinospil"));
const Spillemaskiner = lazy(() => import("./pages/Spillemaskiner"));
const SpillemaskinerHoejRTP = lazy(() => import("./pages/SpillemaskinerHoejRTP"));
const NetEntGuide = lazy(() => import("./pages/NetEntGuide"));
const PragmaticPlayGuide = lazy(() => import("./pages/PragmaticPlayGuide"));
const RelaxGamingGuide = lazy(() => import("./pages/RelaxGamingGuide"));
const PlayNGoGuide = lazy(() => import("./pages/PlayNGoGuide"));
const HacksawGamingGuide = lazy(() => import("./pages/HacksawGamingGuide"));
const NolimitCityGuide = lazy(() => import("./pages/NolimitCityGuide"));
const YggdrasilGuide = lazy(() => import("./pages/YggdrasilGuide"));
const MicrogamingGuide = lazy(() => import("./pages/MicrogamingGuide"));
const RedTigerGuide = lazy(() => import("./pages/RedTigerGuide"));
const BigTimeGamingGuide = lazy(() => import("./pages/BigTimeGamingGuide"));
const ELKStudiosGuide = lazy(() => import("./pages/ELKStudiosGuide"));
const EvolutionGamingGuide = lazy(() => import("./pages/EvolutionGamingGuide"));
const ApplePayGuide = lazy(() => import("./pages/payments/ApplePayGuide"));
const MobilePayGuide = lazy(() => import("./pages/payments/MobilePayGuide"));
const PayPalGuide = lazy(() => import("./pages/payments/PayPalGuide"));
const SkrillGuide = lazy(() => import("./pages/payments/SkrillGuide"));
const TrustlyGuide = lazy(() => import("./pages/payments/TrustlyGuide"));
const ZimplerGuide = lazy(() => import("./pages/payments/ZimplerGuide"));
const PaysafecardGuide = lazy(() => import("./pages/payments/PaysafecardGuide"));
const BankTransferGuide = lazy(() => import("./pages/payments/BankTransferGuide"));
const VisaMastercardGuide = lazy(() => import("./pages/payments/VisaMastercardGuide"));
const RevolutGuide = lazy(() => import("./pages/payments/RevolutGuide"));
const BlackjackGuide = lazy(() => import("./pages/casinospil/BlackjackGuide"));
const RouletteGuide = lazy(() => import("./pages/casinospil/RouletteGuide"));
const PokerGuide = lazy(() => import("./pages/casinospil/PokerGuide"));
const CrapsGuide = lazy(() => import("./pages/casinospil/CrapsGuide"));
const BaccaratGuide = lazy(() => import("./pages/casinospil/BaccaratGuide"));
const RouletteStrategiGuide = lazy(() => import("./pages/casinospil/RouletteStrategiGuide"));
const OnlineLotteriGuide = lazy(() => import("./pages/casinospil/OnlineLotteriGuide"));
const GameShowsGuide = lazy(() => import("./pages/casinospil/GameShowsGuide"));
const Forfatter = lazy(() => import("./pages/Forfatter"));
const ForfatterKevin = lazy(() => import("./pages/ForfatterKevin"));
const SaadanTesterVi = lazy(() => import("./pages/SaadanTesterVi"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 min default stale time
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PageFallback = () => (
  <div className="min-h-screen" />
);

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
                <Route path="/top-10-casino-online" element={<TopCasinoOnline />} />
                <Route path="/nye-casinoer" element={<NyeCasinoer />} />
                <Route path="/om" element={<OmTeamet />} />
                <Route path="/forretningsmodel" element={<Forretningsmodel />} />
                <Route path="/redaktionel-politik" element={<RedaktionelPolitik />} />
                <Route path="/forfatter/jonas" element={<Forfatter />} />
                <Route path="/forfatter/kevin" element={<ForfatterKevin />} />
                <Route path="/saadan-tester-vi-casinoer" element={<SaadanTesterVi />} />
                <Route path="/contact" element={<Contact />} />
                
                <Route path="/casino-bonus" element={<CasinoBonus />} />
                <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
                <Route path="/spillemyndigheden" element={<Spillemyndigheden />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/butik" element={<Shop />} />
                <Route path="/highlights" element={<Highlights />} />
                <Route path="/betalingsmetoder" element={<Betalingsmetoder />} />
                <Route path="/spiludviklere" element={<Spiludviklere />} />
                <Route path="/free-spins" element={<FreeSpins />} />
                <Route path="/velkomstbonus" element={<Velkomstbonus />} />
                <Route path="/omsaetningskrav" element={<Omsaetningskrav />} />
                <Route path="/indskudsbonus" element={<Indskudsbonus />} />
                <Route path="/bonus-uden-indbetaling" element={<BonusUdenIndbetaling />} />
                <Route path="/bonus-uden-omsaetningskrav" element={<BonusUdenOmsaetningskrav />} />
                <Route path="/no-sticky-bonus" element={<NoStickyBonus />} />
                <Route path="/sticky-bonus" element={<StickyBonus />} />
                <Route path="/live-casino" element={<LiveCasino />} />
                <Route path="/spilleautomaten-anmeldelse" element={<SpilleautomatenAnmeldelse />} />
                <Route path="/spildansknu-anmeldelse" element={<SpilDanskNuAnmeldelse />} />
                <Route path="/campobet-anmeldelse" element={<CampobetAnmeldelse />} />
                <Route path="/betinia-anmeldelse" element={<BetiniaAnmeldelse />} />
                <Route path="/swift-casino-anmeldelse" element={<SwiftCasinoAnmeldelse />} />
                <Route path="/luna-casino-anmeldelse" element={<LunaCasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser" element={<CasinoAnmeldelser />} />
                <Route path="/casino-anmeldelser/danske-spil" element={<DanskeSpilAnmeldelse />} />
                <Route path="/casino-anmeldelser/comeon" element={<ComeOnAnmeldelse />} />
                <Route path="/casino-anmeldelser/getlucky" element={<GetLuckyAnmeldelse />} />
                <Route path="/casino-anmeldelser/mr-green" element={<MrGreenAnmeldelse />} />
                <Route path="/casino-anmeldelser/videoslots" element={<VideoslotsAnmeldelse />} />
                <Route path="/casino-anmeldelser/mr-vegas" element={<MrVegasAnmeldelse />} />
                <Route path="/casino-anmeldelser/leovegas" element={<LeoVegasAnmeldelse />} />
                <Route path="/casino-anmeldelser/expekt" element={<ExpektAnmeldelse />} />
                <Route path="/casino-anmeldelser/betano" element={<BetanoAnmeldelse />} />
                <Route path="/casino-anmeldelser/888-casino" element={<Casino888Anmeldelse />} />
                <Route path="/casino-anmeldelser/unibet" element={<UnibetAnmeldelse />} />
                <Route path="/casino-anmeldelser/bet365" element={<Bet365Anmeldelse />} />
                <Route path="/casino-anmeldelser/royal-casino" element={<RoyalCasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser/maria-casino" element={<MariaCasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser/kapow-casino" element={<KapowCasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser/nordicbet" element={<NordicBetAnmeldelse />} />
                <Route path="/casino-anmeldelser/one-casino" element={<OneCasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser/spilnu" element={<SpilnuAnmeldelse />} />
                <Route path="/casino-anmeldelser/stake-casino" element={<StakeCasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser/casinostuen" element={<CasinostuenAnmeldelse />} />
                <Route path="/casino-anmeldelser/pokerstars" element={<PokerStarsAnmeldelse />} />
                <Route path="/casino-anmeldelser/bwin" element={<BwinAnmeldelse />} />
                <Route path="/casino-anmeldelser/marathonbet" element={<MarathonBetAnmeldelse />} />
                <Route path="/casinospil" element={<Casinospil />} />
                <Route path="/casinospil/spillemaskiner" element={<Spillemaskiner />} />
                <Route path="/casinospil/spillemaskiner/hoej-rtp" element={<SpillemaskinerHoejRTP />} />
                <Route path="/casinospil/blackjack" element={<BlackjackGuide />} />
                <Route path="/casinospil/roulette" element={<RouletteGuide />} />
                <Route path="/casinospil/poker" element={<PokerGuide />} />
                <Route path="/casinospil/craps" element={<CrapsGuide />} />
                <Route path="/casinospil/baccarat" element={<BaccaratGuide />} />
                <Route path="/casinospil/roulette-strategi" element={<RouletteStrategiGuide />} />
                <Route path="/casinospil/online-lotteri" element={<OnlineLotteriGuide />} />
                <Route path="/casinospil/game-shows" element={<GameShowsGuide />} />
                <Route path="/spiludviklere/netent" element={<NetEntGuide />} />
                <Route path="/spiludviklere/pragmatic-play" element={<PragmaticPlayGuide />} />
                <Route path="/spiludviklere/relax-gaming" element={<RelaxGamingGuide />} />
                <Route path="/spiludviklere/play-n-go" element={<PlayNGoGuide />} />
                <Route path="/spiludviklere/hacksaw-gaming" element={<HacksawGamingGuide />} />
                <Route path="/spiludviklere/nolimit-city" element={<NolimitCityGuide />} />
                <Route path="/spiludviklere/yggdrasil" element={<YggdrasilGuide />} />
                <Route path="/spiludviklere/microgaming" element={<MicrogamingGuide />} />
                <Route path="/spiludviklere/red-tiger" element={<RedTigerGuide />} />
                <Route path="/spiludviklere/big-time-gaming" element={<BigTimeGamingGuide />} />
                <Route path="/spiludviklere/elk-studios" element={<ELKStudiosGuide />} />
                <Route path="/spiludviklere/evolution-gaming" element={<EvolutionGamingGuide />} />
                <Route path="/betalingsmetoder/apple-pay" element={<ApplePayGuide />} />
                <Route path="/betalingsmetoder/mobilepay" element={<MobilePayGuide />} />
                <Route path="/betalingsmetoder/paypal" element={<PayPalGuide />} />
                <Route path="/betalingsmetoder/skrill" element={<SkrillGuide />} />
                <Route path="/betalingsmetoder/trustly" element={<TrustlyGuide />} />
                <Route path="/betalingsmetoder/zimpler" element={<ZimplerGuide />} />
                <Route path="/betalingsmetoder/paysafecard" element={<PaysafecardGuide />} />
                <Route path="/betalingsmetoder/bankoverforsler" element={<BankTransferGuide />} />
                <Route path="/betalingsmetoder/visa-mastercard" element={<VisaMastercardGuide />} />
                <Route path="/betalingsmetoder/revolut" element={<RevolutGuide />} />
                
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

              {/* 301-style redirects for old/common URLs */}
              <Route path="/blog" element={<Navigate to="/" replace />} />
              <Route path="/blog/*" element={<Navigate to="/" replace />} />
              <Route path="/top-casino-online" element={<Navigate to="/top-10-casino-online" replace />} />
              <Route path="/anmeldelser" element={<Navigate to="/casino-anmeldelser" replace />} />
              <Route path="/anmeldelser/*" element={<Navigate to="/casino-anmeldelser" replace />} />
              <Route path="/bonus" element={<Navigate to="/casino-bonus" replace />} />
              <Route path="/bonusser" element={<Navigate to="/casino-bonus" replace />} />
              <Route path="/spil" element={<Navigate to="/casinospil" replace />} />
              <Route path="/spillemaskiner" element={<Navigate to="/casinospil/spillemaskiner" replace />} />
              <Route path="/slots" element={<Navigate to="/community/slots" replace />} />
              <Route path="/free-spins-uden-indbetaling" element={<Navigate to="/bonus-uden-indbetaling" replace />} />
              <Route path="/betalinger" element={<Navigate to="/betalingsmetoder" replace />} />
              <Route path="/payment-methods" element={<Navigate to="/betalingsmetoder" replace />} />
              <Route path="/providers" element={<Navigate to="/spiludviklere" replace />} />
              <Route path="/game-providers" element={<Navigate to="/spiludviklere" replace />} />
              <Route path="/ansvarligt-spil" element={<Navigate to="/responsible-gaming" replace />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/signup" element={<Navigate to="/auth" replace />} />
              <Route path="/register" element={<Navigate to="/auth" replace />} />
              <Route path="/profil/*" element={<Navigate to="/profil" replace />} />
              <Route path="/shop" element={<Navigate to="/butik" replace />} />
              <Route path="/leaderboard" element={<Navigate to="/community/leaderboard" replace />} />
              <Route path="/rewards" element={<Navigate to="/community/rewards" replace />} />
              <Route path="/kontakt" element={<Navigate to="/contact" replace />} />
              <Route path="/om-os" element={<Navigate to="/om" replace />} />
              <Route path="/om-teamet" element={<Navigate to="/om" replace />} />
              <Route path="/about" element={<Navigate to="/om" replace />} />
              <Route path="/forfatter" element={<Navigate to="/forfatter/jonas" replace />} />
              <Route path="/privatlivspolitik" element={<Navigate to="/privacy" replace />} />
              <Route path="/vilkaar" element={<Navigate to="/terms" replace />} />
              <Route path="/danske-casinoer" element={<Navigate to="/top-10-casino-online" replace />} />
              <Route path="/bonus-guide" element={<Navigate to="/casino-bonus" replace />} />
              <Route path="/casino-bonusser" element={<Navigate to="/casino-bonus" replace />} />
              <Route path="/slots/book-of-fedesvin" element={<Navigate to="/community/slots/book-of-fedesvin" replace />} />
              <Route path="/slots/rise-of-fedesvin" element={<Navigate to="/community/slots/rise-of-fedesvin" replace />} />
              <Route path="/slots/*" element={<Navigate to="/community/slots" replace />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
