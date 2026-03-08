import { lazy, Suspense, Component, type ReactNode, type ErrorInfo } from "react";
import { trackError } from "./lib/errorTracker";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SlotPageLoading } from "./components/slots/SlotPageLoading";

import Index from "./pages/Index";

// Lazy-load all pages except Index for smaller initial bundle
const CasinoBonus = lazy(() => import("./pages/CasinoBonus"));
const NyeCasinoer = lazy(() => import("./pages/NyeCasinoer"));
const NyeCasinoer2026 = lazy(() => import("./pages/nye-casinoer/NyeCasinoer2026"));
const NyeCasinoerDanskLicens = lazy(() => import("./pages/nye-casinoer/NyeCasinoerDanskLicens"));
const NyeCasinoerUdenRofus = lazy(() => import("./pages/nye-casinoer/NyeCasinoerUdenRofus"));
const NyeCasinoerHurtigUdbetaling = lazy(() => import("./pages/nye-casinoer/NyeCasinoerHurtigUdbetaling"));
const NyeCasinoerBonusUdenIndbetaling = lazy(() => import("./pages/nye-casinoer/NyeCasinoerBonusUdenIndbetaling"));
const NyeCasinoerTrustly = lazy(() => import("./pages/nye-casinoer/NyeCasinoerTrustly"));
const NyeCasinoerMitID = lazy(() => import("./pages/nye-casinoer/NyeCasinoerMitID"));
const NyeCasinoerLavWagering = lazy(() => import("./pages/nye-casinoer/NyeCasinoerLavWagering"));
const BedsteNyeCasinoer = lazy(() => import("./pages/nye-casinoer/BedsteNyeCasinoer"));
const NyeVsEtablerede = lazy(() => import("./pages/nye-casinoer/NyeVsEtablerede"));
const CasinoLicenser = lazy(() => import("./pages/CasinoLicenser"));
const TopCasinoOnline = lazy(() => import("./pages/TopCasinoOnline"));

// Lazy load remaining pages
const CasinoSlugRedirect = lazy(() => import("./components/CasinoSlugRedirect"));
const OmTeamet = lazy(() => import("./pages/OmTeamet"));
const Forretningsmodel = lazy(() => import("./pages/Forretningsmodel"));
const RedaktionelPolitik = lazy(() => import("./pages/RedaktionelPolitik"));
const Kontakt = lazy(() => import("./pages/Contact"));
const SitemapPage = lazy(() => import("./pages/Sitemap"));

const AnsvarligtSpil = lazy(() => import("./pages/ResponsibleGaming"));
const RofusGuide = lazy(() => import("./pages/ansvarligt-spil/RofusGuide"));
const LudomaniGuide = lazy(() => import("./pages/ansvarligt-spil/LudomaniGuide"));
const StopSpilletGuide = lazy(() => import("./pages/ansvarligt-spil/StopSpilletGuide"));
const SpillegraenserGuide = lazy(() => import("./pages/ansvarligt-spil/SpillegraenserGuide"));
const SelvudelukkelseGuide = lazy(() => import("./pages/ansvarligt-spil/SelvudelukkelseGuide"));
const HjaelpelinjerGuide = lazy(() => import("./pages/ansvarligt-spil/HjaelpelinjerGuide"));
const MobilCasino = lazy(() => import("./pages/MobilCasino"));
const CasinoApp = lazy(() => import("./pages/CasinoApp"));
const IPhoneCasinoGuide = lazy(() => import("./pages/mobil-casino/IPhoneCasinoGuide"));
const AndroidCasinoGuide = lazy(() => import("./pages/mobil-casino/AndroidCasinoGuide"));
const TabletCasinoGuide = lazy(() => import("./pages/mobil-casino/TabletCasinoGuide"));
const BedsteAppsGuide = lazy(() => import("./pages/mobil-casino/BedsteAppsGuide"));
const CasinoUdenKonto = lazy(() => import("./pages/casino-uden-konto/CasinoUdenKonto"));
const PayNPlayGuide = lazy(() => import("./pages/casino-uden-konto/PayNPlayGuide"));
const HurtigRegistreringGuide = lazy(() => import("./pages/casino-uden-konto/HurtigRegistreringGuide"));
const FordeleOgUlemperGuide = lazy(() => import("./pages/casino-uden-konto/FordeleOgUlemperGuide"));
const MegawaysSlots = lazy(() => import("./pages/MegawaysSlots"));
const JackpotSlots = lazy(() => import("./pages/JackpotSlots"));
const BonusBuySlots = lazy(() => import("./pages/BonusBuySlots"));
const Spillemyndigheden = lazy(() => import("./pages/Spillemyndigheden"));
const Privatlivspolitik = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Shop = lazy(() => import("./pages/Shop"));
const Highlights = lazy(() => import("./pages/Highlights"));

const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const RewardsProgram = lazy(() => import("./pages/RewardsProgram"));
const GameLibrary = lazy(() => import("./pages/GameLibrary"));
const CommunityHub = lazy(() => import("./pages/CommunityHub"));
const SlotMachine = lazy(() => import("./pages/SlotMachine"));
const RiseOfFedesvin = lazy(() => import("./pages/RiseOfFedesvin"));
const GatesOfFedesvin = lazy(() => import("./pages/GatesOfFedesvin"));
const FedesvinBonanza = lazy(() => import("./pages/FedesvinBonanza"));
const SpinTheReel = lazy(() => import("./pages/SpinTheReel"));
const BonusHunt = lazy(() => import("./pages/BonusHunt"));
const BonusHuntArkiv = lazy(() => import("./pages/BonusHuntArkiv"));
const SlotDatabase = lazy(() => import("./pages/SlotDatabase"));
const TurneringsArkiv = lazy(() => import("./pages/TurneringsArkiv"));
const HallOfFame = lazy(() => import("./pages/HallOfFame"));
const Admin = lazy(() => import("./pages/Admin"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Profile = lazy(() => import("./pages/Profile"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const Betalingsmetoder = lazy(() => import("./pages/Betalingsmetoder"));
const Spiludviklere = lazy(() => import("./pages/Spiludviklere"));
const FreeSpins = lazy(() => import("./pages/FreeSpins"));
const FreeSpinsIDag = lazy(() => import("./pages/FreeSpinsIDag"));
const Velkomstbonus = lazy(() => import("./pages/Velkomstbonus"));
const Omsaetningskrav = lazy(() => import("./pages/Omsaetningskrav"));
const Indskudsbonus = lazy(() => import("./pages/Indskudsbonus"));
const BonusUdenIndbetaling = lazy(() => import("./pages/BonusUdenIndbetaling"));
const BonusUdenOmsaetningskrav = lazy(() => import("./pages/BonusUdenOmsaetningskrav"));
const LiveCasino = lazy(() => import("./pages/LiveCasino"));
const LiveBlackjackGuide = lazy(() => import("./pages/live-casino/LiveBlackjackGuide"));
const LiveRouletteGuide = lazy(() => import("./pages/live-casino/LiveRouletteGuide"));
const LiveBaccaratGuide = lazy(() => import("./pages/live-casino/LiveBaccaratGuide"));
const LightningRouletteGuide = lazy(() => import("./pages/live-casino/LightningRouletteGuide"));
const MonopolyLiveGuide = lazy(() => import("./pages/live-casino/MonopolyLiveGuide"));
const NoStickyBonus = lazy(() => import("./pages/NoStickyBonus"));
const StickyBonus = lazy(() => import("./pages/StickyBonus"));
const CashbackBonus = lazy(() => import("./pages/CashbackBonus"));
const ReloadBonus = lazy(() => import("./pages/ReloadBonus"));
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
const SweetBonanzaGuide = lazy(() => import("./pages/slots/SweetBonanzaGuide"));
const BookOfDeadGuide = lazy(() => import("./pages/slots/BookOfDeadGuide"));
const GatesOfOlympusGuide = lazy(() => import("./pages/slots/GatesOfOlympusGuide"));
const StarburstGuide = lazy(() => import("./pages/slots/StarburstGuide"));
const RazorSharkGuide = lazy(() => import("./pages/slots/RazorSharkGuide"));
const BigBassBonanzaGuide = lazy(() => import("./pages/slots/BigBassBonanzaGuide"));
const DeadOrAlive2Guide = lazy(() => import("./pages/slots/DeadOrAlive2Guide"));
const GonzosQuestGuide = lazy(() => import("./pages/slots/GonzosQuestGuide"));
const ReactoonzGuide = lazy(() => import("./pages/slots/ReactoonzGuide"));
const MoneyTrain3Guide = lazy(() => import("./pages/slots/MoneyTrain3Guide"));
const WolfGoldGuide = lazy(() => import("./pages/slots/WolfGoldGuide"));
const TheDogHouseGuide = lazy(() => import("./pages/slots/TheDogHouseGuide"));
const JamminJarsGuide = lazy(() => import("./pages/slots/JamminJarsGuide"));
const BonanzaGuide = lazy(() => import("./pages/slots/BonanzaGuide"));
const FireJokerGuide = lazy(() => import("./pages/slots/FireJokerGuide"));
const LegacyOfDeadGuide = lazy(() => import("./pages/slots/LegacyOfDeadGuide"));
const DivineFortuneGuide = lazy(() => import("./pages/slots/DivineFortuneGuide"));
const EyeOfHorusGuide = lazy(() => import("./pages/slots/EyeOfHorusGuide"));
const BuffaloKingGuide = lazy(() => import("./pages/slots/BuffaloKingGuide"));
const SugarRushGuide = lazy(() => import("./pages/slots/SugarRushGuide"));
const CleopatraGuide = lazy(() => import("./pages/slots/CleopatraGuide"));
const MegaMoolahGuide = lazy(() => import("./pages/slots/MegaMoolahGuide"));
const ThunderstruckIIGuide = lazy(() => import("./pages/slots/ThunderstruckIIGuide"));
const ImmortalRomanceGuide = lazy(() => import("./pages/slots/ImmortalRomanceGuide"));
const WildWestGoldGuide = lazy(() => import("./pages/slots/WildWestGoldGuide"));
const MadameDestinyMegawaysGuide = lazy(() => import("./pages/slots/MadameDestinyMegawaysGuide"));
const ExtraChilliMegawaysGuide = lazy(() => import("./pages/slots/ExtraChilliMegawaysGuide"));
const WantedDeadOrAWildGuide = lazy(() => import("./pages/slots/WantedDeadOrAWildGuide"));
const ChaosCrewGuide = lazy(() => import("./pages/slots/ChaosCrewGuide"));
const JokerStrikeGuide = lazy(() => import("./pages/slots/JokerStrikeGuide"));
const BonusBuysGuide = lazy(() => import("./pages/slots/BonusBuysGuide"));
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
const AmerikanskBlackjackGuide = lazy(() => import("./pages/casinospil/AmerikanskBlackjackGuide"));
const EuropaeiskBlackjackGuide = lazy(() => import("./pages/casinospil/EuropaeiskBlackjackGuide"));
const DoubleExposureBlackjackGuide = lazy(() => import("./pages/casinospil/DoubleExposureBlackjackGuide"));
const Spanish21Guide = lazy(() => import("./pages/casinospil/Spanish21Guide"));
const MartingaleBlackjackGuide = lazy(() => import("./pages/casinospil/MartingaleBlackjackGuide"));
const FibonacciBlackjackGuide = lazy(() => import("./pages/casinospil/FibonacciBlackjackGuide"));
const DalembertBlackjackGuide = lazy(() => import("./pages/casinospil/DalembertBlackjackGuide"));
const RouletteGuide = lazy(() => import("./pages/casinospil/RouletteGuide"));
const AmerikanskRouletteGuide = lazy(() => import("./pages/casinospil/AmerikanskRouletteGuide"));
const EuropaeiskRouletteGuide = lazy(() => import("./pages/casinospil/EuropaeiskRouletteGuide"));
const FranskRouletteGuide = lazy(() => import("./pages/casinospil/FranskRouletteGuide"));
const DalembertRouletteGuide = lazy(() => import("./pages/casinospil/DalembertRouletteGuide"));
const MartingaleRouletteGuide = lazy(() => import("./pages/casinospil/MartingaleRouletteGuide"));
const FibonacciRouletteGuide = lazy(() => import("./pages/casinospil/FibonacciRouletteGuide"));
const LabouchereRouletteGuide = lazy(() => import("./pages/casinospil/LabouchereRouletteGuide"));
const JamesBondRouletteGuide = lazy(() => import("./pages/casinospil/JamesBondRouletteGuide"));
const PokerGuide = lazy(() => import("./pages/casinospil/PokerGuide"));
const TexasHoldemGuide = lazy(() => import("./pages/casinospil/TexasHoldemGuide"));
const OmahaPokerGuide = lazy(() => import("./pages/casinospil/OmahaPokerGuide"));
const ThreeCardPokerGuide = lazy(() => import("./pages/casinospil/ThreeCardPokerGuide"));
const CaribbeanStudGuide = lazy(() => import("./pages/casinospil/CaribbeanStudGuide"));
const VideoPokerGuide = lazy(() => import("./pages/casinospil/VideoPokerGuide"));
const PokerStrategiGuide = lazy(() => import("./pages/casinospil/PokerStrategiGuide"));
const CrapsGuide = lazy(() => import("./pages/casinospil/CrapsGuide"));
const BaccaratGuide = lazy(() => import("./pages/casinospil/BaccaratGuide"));
const RouletteStrategiGuide = lazy(() => import("./pages/casinospil/RouletteStrategiGuide"));
const OnlineLotteriGuide = lazy(() => import("./pages/casinospil/OnlineLotteriGuide"));
const GameShowsGuide = lazy(() => import("./pages/casinospil/GameShowsGuide"));
const Forfatter = lazy(() => import("./pages/Forfatter"));
const ForfatterKevin = lazy(() => import("./pages/ForfatterKevin"));
const ForfatterAjse = lazy(() => import("./pages/ForfatterAjse"));
const SaadanTesterVi = lazy(() => import("./pages/SaadanTesterVi"));
const CasinoNyheder = lazy(() => import("./pages/CasinoNyheder"));
const CasinoNyhedArticle = lazy(() => import("./pages/CasinoNyhedArticle"));
const Ordbog = lazy(() => import("./pages/Ordbog"));
const OrdbogTerm = lazy(() => import("./pages/OrdbogTerm"));

const NotFound = lazy(() => import("./pages/NotFound"));
const CasinoerHub = lazy(() => import("./pages/casinoer/CasinoerHub"));
const HurtigUdbetalingGuide = lazy(() => import("./pages/casinoer/HurtigUdbetalingGuide"));
const HoejRTPGuide = lazy(() => import("./pages/casinoer/HoejRTPGuide"));
const CryptoCasinoGuide = lazy(() => import("./pages/casinoer/CryptoCasinoGuide"));
// LicenseredeCasinoerGuide now redirects to CasinoLicenser
const VRCasinoerGuide = lazy(() => import("./pages/casinoer/VRCasinoerGuide"));
const MobilCasinoerGuide = lazy(() => import("./pages/casinoer/MobilCasinoerGuide"));
const SpilForSjovGuide = lazy(() => import("./pages/casinoer/SpilForSjovGuide"));
const CasinoOgSkatGuide = lazy(() => import("./pages/casinoer/CasinoOgSkatGuide"));

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

interface ErrorBoundaryState { hasError: boolean }
class ChunkErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ChunkErrorBoundary caught:", error, info);
    trackError(error, { componentName: info.componentStack?.slice(0, 200) ?? "ChunkErrorBoundary" });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-lg font-semibold">Siden kunne ikke indlæses.</p>
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
          >
            Genindlæs siden
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ChunkErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/casino/:slug" element={<CasinoSlugRedirect />} />
                <Route path="/top-10-casino-online" element={<TopCasinoOnline />} />
                <Route path="/nye-casinoer" element={<NyeCasinoer />} />
                <Route path="/nye-casinoer/2026" element={<NyeCasinoer2026 />} />
                <Route path="/nye-casinoer/dansk-licens" element={<NyeCasinoerDanskLicens />} />
                <Route path="/nye-casinoer/uden-rofus" element={<NyeCasinoerUdenRofus />} />
                <Route path="/nye-casinoer/hurtig-udbetaling" element={<NyeCasinoerHurtigUdbetaling />} />
                <Route path="/nye-casinoer/bonus-uden-indbetaling" element={<NyeCasinoerBonusUdenIndbetaling />} />
                <Route path="/nye-casinoer/trustly" element={<NyeCasinoerTrustly />} />
                <Route path="/nye-casinoer/mitid" element={<NyeCasinoerMitID />} />
                <Route path="/nye-casinoer/lav-wagering" element={<NyeCasinoerLavWagering />} />
                <Route path="/nye-casinoer/bedste" element={<Navigate to="/nye-casinoer" replace />} />
                <Route path="/nye-casinoer/vs-etablerede" element={<NyeVsEtablerede />} />
                <Route path="/om" element={<OmTeamet />} />
                <Route path="/forretningsmodel" element={<Forretningsmodel />} />
                <Route path="/redaktionel-politik" element={<RedaktionelPolitik />} />
                <Route path="/forfatter" element={<Navigate to="/forfatter/jonas" replace />} />
                <Route path="/forfatter/jonas" element={<Forfatter />} />
                <Route path="/forfatter/kevin" element={<ForfatterKevin />} />
                <Route path="/forfatter/ajse" element={<ForfatterAjse />} />
                <Route path="/saadan-tester-vi-casinoer" element={<SaadanTesterVi />} />
                
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/nyheder" element={<Navigate to="/casino-nyheder" replace />} />
                <Route path="/casino-nyheder" element={<CasinoNyheder />} />
                <Route path="/casino-nyheder/:slug" element={<CasinoNyhedArticle />} />
                <Route path="/ordbog" element={<Ordbog />} />
                <Route path="/ordbog/:slug" element={<OrdbogTerm />} />
                
                <Route path="/casino-bonus" element={<CasinoBonus />} />
                <Route path="/ansvarligt-spil" element={<AnsvarligtSpil />} />
                <Route path="/ansvarligt-spil/rofus" element={<RofusGuide />} />
                <Route path="/ansvarligt-spil/ludomani" element={<LudomaniGuide />} />
                <Route path="/ansvarligt-spil/stopspillet" element={<StopSpilletGuide />} />
                <Route path="/ansvarligt-spil/spillegraenser" element={<SpillegraenserGuide />} />
                <Route path="/ansvarligt-spil/selvudelukkelse-guide" element={<SelvudelukkelseGuide />} />
                <Route path="/ansvarligt-spil/hjaelpelinjer" element={<HjaelpelinjerGuide />} />
                <Route path="/mobil-casino" element={<MobilCasino />} />
                <Route path="/casino-app" element={<CasinoApp />} />
                <Route path="/casino-uden-konto" element={<CasinoUdenKonto />} />
                <Route path="/casino-uden-konto/pay-n-play" element={<PayNPlayGuide />} />
                <Route path="/casino-uden-konto/hurtig-registrering" element={<HurtigRegistreringGuide />} />
                <Route path="/casino-uden-konto/fordele-og-ulemper" element={<FordeleOgUlemperGuide />} />
                <Route path="/megaways-slots" element={<MegawaysSlots />} />
                <Route path="/jackpot-slots" element={<JackpotSlots />} />
                <Route path="/bonus-buy-slots" element={<BonusBuySlots />} />
                <Route path="/spillemyndigheden" element={<Spillemyndigheden />} />
                <Route path="/privatlivspolitik" element={<Privatlivspolitik />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/butik" element={<Shop />} />
                <Route path="/highlights" element={<Highlights />} />
                <Route path="/betalingsmetoder" element={<Betalingsmetoder />} />
                <Route path="/spiludviklere" element={<Spiludviklere />} />
                <Route path="/free-spins" element={<FreeSpins />} />
                <Route path="/free-spins-i-dag" element={<FreeSpinsIDag />} />
                <Route path="/velkomstbonus" element={<Velkomstbonus />} />
                <Route path="/omsaetningskrav" element={<Omsaetningskrav />} />
                <Route path="/indskudsbonus" element={<Indskudsbonus />} />
                <Route path="/bonus-uden-indbetaling" element={<BonusUdenIndbetaling />} />
                <Route path="/bonus-uden-omsaetningskrav" element={<BonusUdenOmsaetningskrav />} />
                <Route path="/no-sticky-bonus" element={<NoStickyBonus />} />
                <Route path="/sticky-bonus" element={<StickyBonus />} />
                <Route path="/cashback-bonus" element={<CashbackBonus />} />
                <Route path="/reload-bonus" element={<ReloadBonus />} />
                <Route path="/live-casino" element={<LiveCasino />} />
                <Route path="/live-casino/blackjack" element={<LiveBlackjackGuide />} />
                <Route path="/live-casino/roulette" element={<LiveRouletteGuide />} />
                <Route path="/live-casino/baccarat" element={<LiveBaccaratGuide />} />
                <Route path="/live-casino/lightning-roulette" element={<LightningRouletteGuide />} />
                <Route path="/live-casino/monopoly-live" element={<MonopolyLiveGuide />} />
                <Route path="/casino-anmeldelser/spilleautomaten" element={<SpilleautomatenAnmeldelse />} />
                <Route path="/casino-anmeldelser/spildansknu" element={<SpilDanskNuAnmeldelse />} />
                <Route path="/casino-anmeldelser/campobet" element={<CampobetAnmeldelse />} />
                <Route path="/casino-anmeldelser/betinia" element={<BetiniaAnmeldelse />} />
                <Route path="/casino-anmeldelser/swift-casino" element={<SwiftCasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser/luna-casino" element={<LunaCasinoAnmeldelse />} />
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
                <Route path="/casinoer" element={<CasinoerHub />} />
                <Route path="/casinoer/hurtig-udbetaling" element={<HurtigUdbetalingGuide />} />
                <Route path="/casinoer/hoej-rtp" element={<HoejRTPGuide />} />
                <Route path="/casinoer/crypto-casino" element={<CryptoCasinoGuide />} />
                <Route path="/licenserede-casinoer" element={<Navigate to="/casino-licenser" replace />} />
                <Route path="/casino-licenser" element={<CasinoLicenser />} />
                <Route path="/casinoer/vr-casinoer" element={<VRCasinoerGuide />} />
                <Route path="/casinoer/mobil-casinoer" element={<MobilCasinoerGuide />} />
                <Route path="/casinoer/spil-casino-for-sjov" element={<SpilForSjovGuide />} />
                <Route path="/casinoer/casino-og-skat" element={<CasinoOgSkatGuide />} />
                <Route path="/casinospil/spillemaskiner" element={<Spillemaskiner />} />
                <Route path="/casinospil/spillemaskiner/hoej-rtp" element={<SpillemaskinerHoejRTP />} />
                <Route path="/casinospil/spillemaskiner/sweet-bonanza" element={<SweetBonanzaGuide />} />
                <Route path="/casinospil/spillemaskiner/book-of-dead" element={<BookOfDeadGuide />} />
                <Route path="/casinospil/spillemaskiner/gates-of-olympus" element={<GatesOfOlympusGuide />} />
                <Route path="/casinospil/spillemaskiner/starburst" element={<StarburstGuide />} />
                <Route path="/casinospil/spillemaskiner/razor-shark" element={<RazorSharkGuide />} />
                <Route path="/casinospil/spillemaskiner/big-bass-bonanza" element={<BigBassBonanzaGuide />} />
                <Route path="/casinospil/spillemaskiner/dead-or-alive-2" element={<DeadOrAlive2Guide />} />
                <Route path="/casinospil/spillemaskiner/gonzos-quest" element={<GonzosQuestGuide />} />
                <Route path="/casinospil/spillemaskiner/reactoonz" element={<ReactoonzGuide />} />
                <Route path="/casinospil/spillemaskiner/money-train-3" element={<MoneyTrain3Guide />} />
                <Route path="/casinospil/spillemaskiner/wolf-gold" element={<WolfGoldGuide />} />
                <Route path="/casinospil/spillemaskiner/the-dog-house" element={<TheDogHouseGuide />} />
                <Route path="/casinospil/spillemaskiner/jammin-jars" element={<JamminJarsGuide />} />
                <Route path="/casinospil/spillemaskiner/bonanza" element={<BonanzaGuide />} />
                <Route path="/casinospil/spillemaskiner/fire-joker" element={<FireJokerGuide />} />
                <Route path="/casinospil/spillemaskiner/legacy-of-dead" element={<LegacyOfDeadGuide />} />
                <Route path="/casinospil/spillemaskiner/divine-fortune" element={<DivineFortuneGuide />} />
                <Route path="/casinospil/spillemaskiner/eye-of-horus" element={<EyeOfHorusGuide />} />
                <Route path="/casinospil/spillemaskiner/buffalo-king" element={<BuffaloKingGuide />} />
                <Route path="/casinospil/spillemaskiner/sugar-rush" element={<SugarRushGuide />} />
                <Route path="/casinospil/spillemaskiner/cleopatra" element={<CleopatraGuide />} />
                <Route path="/casinospil/spillemaskiner/mega-moolah" element={<MegaMoolahGuide />} />
                <Route path="/casinospil/spillemaskiner/thunderstruck-ii" element={<ThunderstruckIIGuide />} />
                <Route path="/casinospil/spillemaskiner/immortal-romance" element={<ImmortalRomanceGuide />} />
                <Route path="/casinospil/spillemaskiner/wild-west-gold" element={<WildWestGoldGuide />} />
                <Route path="/casinospil/spillemaskiner/madame-destiny-megaways" element={<MadameDestinyMegawaysGuide />} />
                <Route path="/casinospil/spillemaskiner/extra-chilli-megaways" element={<ExtraChilliMegawaysGuide />} />
                <Route path="/casinospil/spillemaskiner/wanted-dead-or-a-wild" element={<WantedDeadOrAWildGuide />} />
                <Route path="/casinospil/spillemaskiner/chaos-crew" element={<ChaosCrewGuide />} />
                <Route path="/casinospil/spillemaskiner/joker-strike" element={<JokerStrikeGuide />} />
                <Route path="/casinospil/spillemaskiner/bonus-buys" element={<BonusBuysGuide />} />
                <Route path="/casinospil/blackjack" element={<BlackjackGuide />} />
                <Route path="/casinospil/blackjack/amerikansk-blackjack" element={<AmerikanskBlackjackGuide />} />
                <Route path="/casinospil/blackjack/europaeisk-blackjack" element={<EuropaeiskBlackjackGuide />} />
                <Route path="/casinospil/blackjack/double-exposure-blackjack" element={<DoubleExposureBlackjackGuide />} />
                <Route path="/casinospil/blackjack/spanish-21" element={<Spanish21Guide />} />
                <Route path="/casinospil/blackjack/martingale" element={<MartingaleBlackjackGuide />} />
                <Route path="/casinospil/blackjack/fibonacci" element={<FibonacciBlackjackGuide />} />
                <Route path="/casinospil/blackjack/dalembert" element={<DalembertBlackjackGuide />} />
                <Route path="/casinospil/roulette" element={<RouletteGuide />} />
                <Route path="/casinospil/roulette/amerikansk-roulette" element={<AmerikanskRouletteGuide />} />
                <Route path="/casinospil/roulette/europaeisk-roulette" element={<EuropaeiskRouletteGuide />} />
                <Route path="/casinospil/roulette/fransk-roulette" element={<FranskRouletteGuide />} />
                <Route path="/casinospil/roulette/dalembert-roulette" element={<DalembertRouletteGuide />} />
                <Route path="/casinospil/roulette/martingale-roulette" element={<MartingaleRouletteGuide />} />
                <Route path="/casinospil/roulette/fibonacci-roulette" element={<FibonacciRouletteGuide />} />
                <Route path="/casinospil/roulette/labouchere-roulette" element={<LabouchereRouletteGuide />} />
                <Route path="/casinospil/roulette/james-bond-roulette" element={<JamesBondRouletteGuide />} />
                <Route path="/casinospil/poker" element={<PokerGuide />} />
                <Route path="/casinospil/poker/texas-holdem" element={<TexasHoldemGuide />} />
                <Route path="/casinospil/poker/omaha" element={<OmahaPokerGuide />} />
                <Route path="/casinospil/poker/three-card-poker" element={<ThreeCardPokerGuide />} />
                <Route path="/casinospil/poker/caribbean-stud" element={<CaribbeanStudGuide />} />
                <Route path="/casinospil/poker/video-poker" element={<VideoPokerGuide />} />
                <Route path="/casinospil/poker/poker-strategi" element={<PokerStrategiGuide />} />
                <Route path="/casinospil/craps" element={<CrapsGuide />} />
                <Route path="/casinospil/baccarat" element={<BaccaratGuide />} />
                <Route path="/casinospil/roulette-strategi" element={<Navigate to="/casinospil/roulette" replace />} />
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
                
                <Route path="/community" element={<Suspense fallback={null}><CommunityHub /></Suspense>} />
                <Route path="/community/turneringer" element={<Leaderboard />} />
                <Route path="/community/turneringer/arkiv" element={<TurneringsArkiv />} />
                <Route path="/community/rewards" element={<RewardsProgram />} />
                <Route path="/community/spin-the-reel" element={<Suspense fallback={null}><SpinTheReel /></Suspense>} />
                <Route path="/bonus-hunt" element={<Suspense fallback={null}><BonusHunt /></Suspense>} />
                <Route path="/bonus-hunt/arkiv" element={<BonusHuntArkiv />} />
                <Route path="/slot-database" element={<SlotDatabase />} />
                <Route path="/community/hall-of-fame" element={<HallOfFame />} />
                <Route path="/community/bonus-hunt" element={<Navigate to="/bonus-hunt" replace />} />
                <Route 
                  path="/community/slots" 
                  element={
                    <Suspense fallback={<PageFallback />}>
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
                <Route 
                  path="/community/slots/gates-of-fedesvin" 
                  element={
                    <Suspense fallback={<SlotPageLoading />}>
                      <GatesOfFedesvin />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/community/slots/fedesvin-bonanza" 
                  element={
                    <Suspense fallback={<SlotPageLoading theme="bonanza" />}>
                      <FedesvinBonanza />
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
              <Route path="/responsible-gaming" element={<Navigate to="/ansvarligt-spil" replace />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/signup" element={<Navigate to="/auth" replace />} />
              <Route path="/register" element={<Navigate to="/auth" replace />} />
              <Route path="/profil/*" element={<Navigate to="/profil" replace />} />
              <Route path="/shop" element={<Navigate to="/butik" replace />} />
              <Route path="/leaderboard" element={<Navigate to="/community/turneringer" replace />} />
              <Route path="/community/leaderboard" element={<Navigate to="/community/turneringer" replace />} />
              <Route path="/rewards" element={<Navigate to="/community/rewards" replace />} />
              <Route path="/contact" element={<Navigate to="/kontakt" replace />} />
              <Route path="/om-os" element={<Navigate to="/om" replace />} />
              <Route path="/om-teamet" element={<Navigate to="/om" replace />} />
              <Route path="/about" element={<Navigate to="/om" replace />} />
              {/* /forfatter redirect handled in main routes block (line 288) */}
              <Route path="/privacy" element={<Navigate to="/privatlivspolitik" replace />} />
              <Route path="/vilkaar" element={<Navigate to="/terms" replace />} />
              <Route path="/danske-casinoer" element={<Navigate to="/top-10-casino-online" replace />} />
              <Route path="/bonus-guide" element={<Navigate to="/casino-bonus" replace />} />
              <Route path="/casino-bonusser" element={<Navigate to="/casino-bonus" replace />} />
              <Route path="/casino-compliance" element={<Navigate to="/casino-licenser" replace />} />
              <Route path="/slots/book-of-fedesvin" element={<Navigate to="/community/slots/book-of-fedesvin" replace />} />
              <Route path="/slots/rise-of-fedesvin" element={<Navigate to="/community/slots/rise-of-fedesvin" replace />} />
              <Route path="/slots/*" element={<Navigate to="/community/slots" replace />} />
              <Route path="/spilleautomaten-anmeldelse" element={<Navigate to="/casino-anmeldelser/spilleautomaten" replace />} />
              <Route path="/spildansknu-anmeldelse" element={<Navigate to="/casino-anmeldelser/spildansknu" replace />} />
              <Route path="/campobet-anmeldelse" element={<Navigate to="/casino-anmeldelser/campobet" replace />} />
              <Route path="/betinia-anmeldelse" element={<Navigate to="/casino-anmeldelser/betinia" replace />} />
              <Route path="/swift-casino-anmeldelse" element={<Navigate to="/casino-anmeldelser/swift-casino" replace />} />
              <Route path="/luna-casino-anmeldelse" element={<Navigate to="/casino-anmeldelser/luna-casino" replace />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </ChunkErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
