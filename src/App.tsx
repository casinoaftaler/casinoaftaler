import { Suspense, Component, type ReactNode, type ErrorInfo, type ComponentType } from "react";
import { lazyRetry } from "./lib/lazyRetry";
import { trackError } from "./lib/errorTracker";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SlotPageLoading } from "./components/slots/SlotPageLoading";
import { DwellRewardBadge } from "./components/DwellRewardBadge";

import Index from "./pages/Index";

const CasinoBonus = lazyRetry(() => import("./pages/CasinoBonus"));
const NyeCasinoer = lazyRetry(() => import("./pages/NyeCasinoer"));
const NyeCasinoer2026 = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoer2026"));
const NyeCasinoerDanskLicens = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoerDanskLicens"));
const NyeCasinoerUdenRofus = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoerUdenRofus"));
const NyeCasinoerHurtigUdbetaling = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoerHurtigUdbetaling"));
const NyeCasinoerBonusUdenIndbetaling = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoerBonusUdenIndbetaling"));
const NyeCasinoerTrustly = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoerTrustly"));
const NyeCasinoerMitID = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoerMitID"));
const NyeCasinoerLavWagering = lazyRetry(() => import("./pages/nye-casinoer/NyeCasinoerLavWagering"));
const BedsteNyeCasinoer = lazyRetry(() => import("./pages/nye-casinoer/BedsteNyeCasinoer"));
const NyeVsEtablerede = lazyRetry(() => import("./pages/nye-casinoer/NyeVsEtablerede"));
const CasinoLicenser = lazyRetry(() => import("./pages/CasinoLicenser"));
const MarketIntelligence = lazyRetry(() => import("./pages/MarketIntelligence"));
const TopCasinoOnline = lazyRetry(() => import("./pages/TopCasinoOnline"));

// Lazy load remaining pages
const CasinoSlugRedirect = lazyRetry(() => import("./components/CasinoSlugRedirect"));
const OmTeamet = lazyRetry(() => import("./pages/OmTeamet"));
const Forretningsmodel = lazyRetry(() => import("./pages/Forretningsmodel"));
const PragmaticPlayPartner = lazyRetry(() => import("./pages/PragmaticPlayPartner"));
const RedaktionelPolitik = lazyRetry(() => import("./pages/RedaktionelPolitik"));
const Kontakt = lazyRetry(() => import("./pages/Contact"));
const SitemapPage = lazyRetry(() => import("./pages/Sitemap"));
const SitemapCasinos = lazyRetry(() => import("./pages/SitemapCasinos"));
const SitemapBonus = lazyRetry(() => import("./pages/SitemapBonus"));
const SitemapSlots = lazyRetry(() => import("./pages/SitemapSlots"));

const AnsvarligtSpil = lazyRetry(() => import("./pages/ResponsibleGaming"));
const RofusGuide = lazyRetry(() => import("./pages/ansvarligt-spil/RofusGuide"));
const LudomaniGuide = lazyRetry(() => import("./pages/ansvarligt-spil/LudomaniGuide"));
const StopSpilletGuide = lazyRetry(() => import("./pages/ansvarligt-spil/StopSpilletGuide"));
const SpillegraenserGuide = lazyRetry(() => import("./pages/ansvarligt-spil/SpillegraenserGuide"));
const SelvudelukkelseGuide = lazyRetry(() => import("./pages/ansvarligt-spil/SelvudelukkelseGuide"));
const HjaelpelinjerGuide = lazyRetry(() => import("./pages/ansvarligt-spil/HjaelpelinjerGuide"));
const MobilCasino = lazyRetry(() => import("./pages/MobilCasino"));
const CasinoApp = lazyRetry(() => import("./pages/CasinoApp"));
const IPhoneCasinoGuide = lazyRetry(() => import("./pages/mobil-casino/IPhoneCasinoGuide"));
const AndroidCasinoGuide = lazyRetry(() => import("./pages/mobil-casino/AndroidCasinoGuide"));
const TabletCasinoGuide = lazyRetry(() => import("./pages/mobil-casino/TabletCasinoGuide"));
const BedsteAppsGuide = lazyRetry(() => import("./pages/mobil-casino/BedsteAppsGuide"));
const CasinoUdenKonto = lazyRetry(() => import("./pages/casino-uden-konto/CasinoUdenKonto"));
const PayNPlayGuide = lazyRetry(() => import("./pages/casino-uden-konto/PayNPlayGuide"));
const HurtigRegistreringGuide = lazyRetry(() => import("./pages/casino-uden-konto/HurtigRegistreringGuide"));
const FordeleOgUlemperGuide = lazyRetry(() => import("./pages/casino-uden-konto/FordeleOgUlemperGuide"));
const MegawaysSlots = lazyRetry(() => import("./pages/MegawaysSlots"));
const JackpotSlots = lazyRetry(() => import("./pages/JackpotSlots"));
const BonusBuySlots = lazyRetry(() => import("./pages/BonusBuySlots"));
const Spillemyndigheden = lazyRetry(() => import("./pages/Spillemyndigheden"));
const Privatlivspolitik = lazyRetry(() => import("./pages/Privacy"));
const Terms = lazyRetry(() => import("./pages/Terms"));
const Cookies = lazyRetry(() => import("./pages/Cookies"));
const Shop = lazyRetry(() => import("./pages/Shop"));
const Highlights = lazyRetry(() => import("./pages/Highlights"));
const Raffle = lazyRetry(() => import("./pages/Raffle"));

const Leaderboard = lazyRetry(() => import("./pages/Leaderboard"));
const RewardsProgram = lazyRetry(() => import("./pages/RewardsProgram"));
const GameLibrary = lazyRetry(() => import("./pages/GameLibrary"));
const CommunityHub = lazyRetry(() => import("./pages/CommunityHub"));
const SlotMachine = lazyRetry(() => import("./pages/SlotMachine"));
const RiseOfFedesvin = lazyRetry(() => import("./pages/RiseOfFedesvin"));
const GatesOfFedesvin = lazyRetry(() => import("./pages/GatesOfFedesvin"));
const FedesvinBonanza = lazyRetry(() => import("./pages/FedesvinBonanza"));
const SpinTheReel = lazyRetry(() => import("./pages/SpinTheReel"));
const BonusHunt = lazyRetry(() => import("./pages/BonusHunt"));
const BonusHuntArkiv = lazyRetry(() => import("./pages/BonusHuntArkiv"));
const SlotDatabase = lazyRetry(() => import("./pages/SlotDatabase"));
const Statistik = lazyRetry(() => import("./pages/Statistik"));
const SlotCatalogPage = lazyRetry(() => import("./pages/SlotCatalogPage"));
const TurneringsArkiv = lazyRetry(() => import("./pages/TurneringsArkiv"));
const HallOfFame = lazyRetry(() => import("./pages/HallOfFame"));
const Admin = lazyRetry(() => import("./pages/Admin"));
const Auth = lazyRetry(() => import("./pages/Auth"));
const AuthCallback = lazyRetry(() => import("./pages/AuthCallback"));
const Profile = lazyRetry(() => import("./pages/Profile"));
const PublicProfile = lazyRetry(() => import("./pages/PublicProfile"));
const Betalingsmetoder = lazyRetry(() => import("./pages/Betalingsmetoder"));
const Spiludviklere = lazyRetry(() => import("./pages/Spiludviklere"));
const FreeSpins = lazyRetry(() => import("./pages/FreeSpins"));
const FreeSpinsIDag = lazyRetry(() => import("./pages/FreeSpinsIDag"));
const Velkomstbonus = lazyRetry(() => import("./pages/Velkomstbonus"));
const Omsaetningskrav = lazyRetry(() => import("./pages/Omsaetningskrav"));
const Indskudsbonus = lazyRetry(() => import("./pages/Indskudsbonus"));
const BonusUdenIndbetaling = lazyRetry(() => import("./pages/BonusUdenIndbetaling"));
const BonusUdenOmsaetningskrav = lazyRetry(() => import("./pages/BonusUdenOmsaetningskrav"));
const LiveCasino = lazyRetry(() => import("./pages/LiveCasino"));
const LiveBlackjackGuide = lazyRetry(() => import("./pages/live-casino/LiveBlackjackGuide"));
const LiveRouletteGuide = lazyRetry(() => import("./pages/live-casino/LiveRouletteGuide"));
const LiveBaccaratGuide = lazyRetry(() => import("./pages/live-casino/LiveBaccaratGuide"));
const LightningRouletteGuide = lazyRetry(() => import("./pages/live-casino/LightningRouletteGuide"));
const MonopolyLiveGuide = lazyRetry(() => import("./pages/live-casino/MonopolyLiveGuide"));
const CrazyTimeGuide = lazyRetry(() => import("./pages/live-casino/CrazyTimeGuide"));
const DreamCatcherGuide = lazyRetry(() => import("./pages/live-casino/DreamCatcherGuide"));
const DealOrNoDealGuide = lazyRetry(() => import("./pages/live-casino/DealOrNoDealGuide"));
const LiveCasinoStrategiGuide = lazyRetry(() => import("./pages/live-casino/LiveCasinoStrategiGuide"));
const LiveCasinoUdbydereGuide = lazyRetry(() => import("./pages/live-casino/LiveCasinoUdbydereGuide"));
const NoStickyBonus = lazyRetry(() => import("./pages/NoStickyBonus"));
const StickyBonus = lazyRetry(() => import("./pages/StickyBonus"));
const CashbackBonus = lazyRetry(() => import("./pages/CashbackBonus"));
const ReloadBonus = lazyRetry(() => import("./pages/ReloadBonus"));
const GratisCasinoSpil = lazyRetry(() => import("./pages/GratisCasinoSpil"));
const HurtigUdbetaling = lazyRetry(() => import("./pages/HurtigUdbetaling"));
const CasinoUdenRofus = lazyRetry(() => import("./pages/CasinoUdenRofus"));
const CasinoMedMitID2 = lazyRetry(() => import("./pages/CasinoMedMitID"));
const SpilleautomatenAnmeldelse = lazyRetry(() => import("./pages/SpilleautomatenAnmeldelse"));
const SpilDanskNuAnmeldelse = lazyRetry(() => import("./pages/SpilDanskNuAnmeldelse"));
const CampobetAnmeldelse = lazyRetry(() => import("./pages/CampobetAnmeldelse"));
const BetiniaAnmeldelse = lazyRetry(() => import("./pages/BetiniaAnmeldelse"));
const SwiftCasinoAnmeldelse = lazyRetry(() => import("./pages/SwiftCasinoAnmeldelse"));
const LunaCasinoAnmeldelse = lazyRetry(() => import("./pages/LunaCasinoAnmeldelse"));
const DanskeSpilAnmeldelse = lazyRetry(() => import("./pages/DanskeSpilAnmeldelse"));
const ComeOnAnmeldelse = lazyRetry(() => import("./pages/ComeOnAnmeldelse"));
const GetLuckyAnmeldelse = lazyRetry(() => import("./pages/GetLuckyAnmeldelse"));
const MrGreenAnmeldelse = lazyRetry(() => import("./pages/MrGreenAnmeldelse"));
const VideoslotsAnmeldelse = lazyRetry(() => import("./pages/VideoslotsAnmeldelse"));
const MrVegasAnmeldelse = lazyRetry(() => import("./pages/MrVegasAnmeldelse"));
const LeoVegasAnmeldelse = lazyRetry(() => import("./pages/LeoVegasAnmeldelse"));
const ExpektAnmeldelse = lazyRetry(() => import("./pages/ExpektAnmeldelse"));
const BetanoAnmeldelse = lazyRetry(() => import("./pages/BetanoAnmeldelse"));
const Casino888Anmeldelse = lazyRetry(() => import("./pages/Casino888Anmeldelse"));
const UnibetAnmeldelse = lazyRetry(() => import("./pages/UnibetAnmeldelse"));
const Bet365Anmeldelse = lazyRetry(() => import("./pages/Bet365Anmeldelse"));
const RoyalCasinoAnmeldelse = lazyRetry(() => import("./pages/RoyalCasinoAnmeldelse"));
const MariaCasinoAnmeldelse = lazyRetry(() => import("./pages/MariaCasinoAnmeldelse"));
const KapowCasinoAnmeldelse = lazyRetry(() => import("./pages/KapowCasinoAnmeldelse"));
const NordicBetAnmeldelse = lazyRetry(() => import("./pages/NordicBetAnmeldelse"));
const OneCasinoAnmeldelse = lazyRetry(() => import("./pages/OneCasinoAnmeldelse"));
const SpilnuAnmeldelse = lazyRetry(() => import("./pages/SpilnuAnmeldelse"));
const StakeCasinoAnmeldelse = lazyRetry(() => import("./pages/StakeCasinoAnmeldelse"));
const CasinostuenAnmeldelse = lazyRetry(() => import("./pages/CasinostuenAnmeldelse"));
const PokerStarsAnmeldelse = lazyRetry(() => import("./pages/PokerStarsAnmeldelse"));
const BwinAnmeldelse = lazyRetry(() => import("./pages/BwinAnmeldelse"));
const MarathonBetAnmeldelse = lazyRetry(() => import("./pages/MarathonBetAnmeldelse"));
const PlayKasinoAnmeldelse = lazyRetry(() => import("./pages/PlayKasinoAnmeldelse"));
const CasinoAnmeldelser = lazyRetry(() => import("./pages/CasinoAnmeldelser"));
const Casinospil = lazyRetry(() => import("./pages/Casinospil"));
const Spillemaskiner = lazyRetry(() => import("./pages/Spillemaskiner"));
const SpillemaskinerHoejRTP = lazyRetry(() => import("./pages/SpillemaskinerHoejRTP"));
const ProviderSlotsHub = lazyRetry(() => import("./pages/ProviderSlotsHub"));
const SweetBonanzaGuide = lazyRetry(() => import("./pages/slots/SweetBonanzaGuide"));
const BookOfDeadGuide = lazyRetry(() => import("./pages/slots/BookOfDeadGuide"));
const GatesOfOlympusGuide = lazyRetry(() => import("./pages/slots/GatesOfOlympusGuide"));
const StarburstGuide = lazyRetry(() => import("./pages/slots/StarburstGuide"));
const RazorSharkGuide = lazyRetry(() => import("./pages/slots/RazorSharkGuide"));
const BigBassBonanzaGuide = lazyRetry(() => import("./pages/slots/BigBassBonanzaGuide"));
const DeadOrAlive2Guide = lazyRetry(() => import("./pages/slots/DeadOrAlive2Guide"));
const GonzosQuestGuide = lazyRetry(() => import("./pages/slots/GonzosQuestGuide"));
const ReactoonzGuide = lazyRetry(() => import("./pages/slots/ReactoonzGuide"));
const MoneyTrain3Guide = lazyRetry(() => import("./pages/slots/MoneyTrain3Guide"));
const WolfGoldGuide = lazyRetry(() => import("./pages/slots/WolfGoldGuide"));
const TheDogHouseGuide = lazyRetry(() => import("./pages/slots/TheDogHouseGuide"));
const JamminJarsGuide = lazyRetry(() => import("./pages/slots/JamminJarsGuide"));
const BonanzaGuide = lazyRetry(() => import("./pages/slots/BonanzaGuide"));
const FireJokerGuide = lazyRetry(() => import("./pages/slots/FireJokerGuide"));
const LegacyOfDeadGuide = lazyRetry(() => import("./pages/slots/LegacyOfDeadGuide"));
const DivineFortuneGuide = lazyRetry(() => import("./pages/slots/DivineFortuneGuide"));
const EyeOfHorusGuide = lazyRetry(() => import("./pages/slots/EyeOfHorusGuide"));
const BuffaloKingGuide = lazyRetry(() => import("./pages/slots/BuffaloKingGuide"));
const SugarRushGuide = lazyRetry(() => import("./pages/slots/SugarRushGuide"));
const CleopatraGuide = lazyRetry(() => import("./pages/slots/CleopatraGuide"));
const MegaMoolahGuide = lazyRetry(() => import("./pages/slots/MegaMoolahGuide"));
const ThunderstruckIIGuide = lazyRetry(() => import("./pages/slots/ThunderstruckIIGuide"));
const ImmortalRomanceGuide = lazyRetry(() => import("./pages/slots/ImmortalRomanceGuide"));
const WildWestGoldGuide = lazyRetry(() => import("./pages/slots/WildWestGoldGuide"));
const MadameDestinyMegawaysGuide = lazyRetry(() => import("./pages/slots/MadameDestinyMegawaysGuide"));
const ExtraChilliMegawaysGuide = lazyRetry(() => import("./pages/slots/ExtraChilliMegawaysGuide"));
const WantedDeadOrAWildGuide = lazyRetry(() => import("./pages/slots/WantedDeadOrAWildGuide"));
const ChaosCrewGuide = lazyRetry(() => import("./pages/slots/ChaosCrewGuide"));
const JokerStrikeGuide = lazyRetry(() => import("./pages/slots/JokerStrikeGuide"));
const BonusBuysGuide = lazyRetry(() => import("./pages/slots/BonusBuysGuide"));
const NetEntGuide = lazyRetry(() => import("./pages/NetEntGuide"));
const PragmaticPlayGuide = lazyRetry(() => import("./pages/PragmaticPlayGuide"));
const RelaxGamingGuide = lazyRetry(() => import("./pages/RelaxGamingGuide"));
const PlayNGoGuide = lazyRetry(() => import("./pages/PlayNGoGuide"));
const HacksawGamingGuide = lazyRetry(() => import("./pages/HacksawGamingGuide"));
const NolimitCityGuide = lazyRetry(() => import("./pages/NolimitCityGuide"));
const YggdrasilGuide = lazyRetry(() => import("./pages/YggdrasilGuide"));
const MicrogamingGuide = lazyRetry(() => import("./pages/MicrogamingGuide"));
const RedTigerGuide = lazyRetry(() => import("./pages/RedTigerGuide"));
const BigTimeGamingGuide = lazyRetry(() => import("./pages/BigTimeGamingGuide"));
const ELKStudiosGuide = lazyRetry(() => import("./pages/ELKStudiosGuide"));
const EvolutionGamingGuide = lazyRetry(() => import("./pages/EvolutionGamingGuide"));
const ThunderkickGuide = lazyRetry(() => import("./pages/ThunderkickGuide"));
const BlueprintGamingGuide = lazyRetry(() => import("./pages/BlueprintGamingGuide"));
const PushGamingGuide = lazyRetry(() => import("./pages/PushGamingGuide"));
const QuickspinGuide = lazyRetry(() => import("./pages/QuickspinGuide"));
const ISoftBetGuide = lazyRetry(() => import("./pages/ISoftBetGuide"));
const BetsoftGuide = lazyRetry(() => import("./pages/BetsoftGuide"));
const WazdanGuide = lazyRetry(() => import("./pages/WazdanGuide"));
const EndorphinaGuide = lazyRetry(() => import("./pages/EndorphinaGuide"));
const StakelogicGuide = lazyRetry(() => import("./pages/StakelogicGuide"));
const BoomingGamesGuide = lazyRetry(() => import("./pages/BoomingGamesGuide"));
const ApplePayGuide = lazyRetry(() => import("./pages/payments/ApplePayGuide"));
const MobilePayGuide = lazyRetry(() => import("./pages/payments/MobilePayGuide"));
const PayPalGuide = lazyRetry(() => import("./pages/payments/PayPalGuide"));
const SkrillGuide = lazyRetry(() => import("./pages/payments/SkrillGuide"));
const TrustlyGuide = lazyRetry(() => import("./pages/payments/TrustlyGuide"));
const ZimplerGuide = lazyRetry(() => import("./pages/payments/ZimplerGuide"));
const PaysafecardGuide = lazyRetry(() => import("./pages/payments/PaysafecardGuide"));
const BankTransferGuide = lazyRetry(() => import("./pages/payments/BankTransferGuide"));
const VisaMastercardGuide = lazyRetry(() => import("./pages/payments/VisaMastercardGuide"));
const RevolutGuide = lazyRetry(() => import("./pages/payments/RevolutGuide"));
const BlackjackGuide = lazyRetry(() => import("./pages/casinospil/BlackjackGuide"));
const AmerikanskBlackjackGuide = lazyRetry(() => import("./pages/casinospil/AmerikanskBlackjackGuide"));
const EuropaeiskBlackjackGuide = lazyRetry(() => import("./pages/casinospil/EuropaeiskBlackjackGuide"));
const DoubleExposureBlackjackGuide = lazyRetry(() => import("./pages/casinospil/DoubleExposureBlackjackGuide"));
const Spanish21Guide = lazyRetry(() => import("./pages/casinospil/Spanish21Guide"));
const MartingaleBlackjackGuide = lazyRetry(() => import("./pages/casinospil/MartingaleBlackjackGuide"));
const FibonacciBlackjackGuide = lazyRetry(() => import("./pages/casinospil/FibonacciBlackjackGuide"));
const DalembertBlackjackGuide = lazyRetry(() => import("./pages/casinospil/DalembertBlackjackGuide"));
const BlackjackSkemaGuide = lazyRetry(() => import("./pages/casinospil/BlackjackSkemaGuide"));
const RouletteGuide = lazyRetry(() => import("./pages/casinospil/RouletteGuide"));
const AmerikanskRouletteGuide = lazyRetry(() => import("./pages/casinospil/AmerikanskRouletteGuide"));
const EuropaeiskRouletteGuide = lazyRetry(() => import("./pages/casinospil/EuropaeiskRouletteGuide"));
const FranskRouletteGuide = lazyRetry(() => import("./pages/casinospil/FranskRouletteGuide"));
const DalembertRouletteGuide = lazyRetry(() => import("./pages/casinospil/DalembertRouletteGuide"));
const MartingaleRouletteGuide = lazyRetry(() => import("./pages/casinospil/MartingaleRouletteGuide"));
const FibonacciRouletteGuide = lazyRetry(() => import("./pages/casinospil/FibonacciRouletteGuide"));
const LabouchereRouletteGuide = lazyRetry(() => import("./pages/casinospil/LabouchereRouletteGuide"));
const JamesBondRouletteGuide = lazyRetry(() => import("./pages/casinospil/JamesBondRouletteGuide"));
const PokerGuide = lazyRetry(() => import("./pages/casinospil/PokerGuide"));
const TexasHoldemGuide = lazyRetry(() => import("./pages/casinospil/TexasHoldemGuide"));
const OmahaPokerGuide = lazyRetry(() => import("./pages/casinospil/OmahaPokerGuide"));
const ThreeCardPokerGuide = lazyRetry(() => import("./pages/casinospil/ThreeCardPokerGuide"));
const CaribbeanStudGuide = lazyRetry(() => import("./pages/casinospil/CaribbeanStudGuide"));
const VideoPokerGuide = lazyRetry(() => import("./pages/casinospil/VideoPokerGuide"));
const PokerStrategiGuide = lazyRetry(() => import("./pages/casinospil/PokerStrategiGuide"));
const PokerBedsteSiderGuide = lazyRetry(() => import("./pages/casinospil/PokerBedsteSiderGuide"));
const CrapsGuide = lazyRetry(() => import("./pages/casinospil/CrapsGuide"));
const BaccaratGuide = lazyRetry(() => import("./pages/casinospil/BaccaratGuide"));
const RouletteStrategiGuide = lazyRetry(() => import("./pages/casinospil/RouletteStrategiGuide"));
const OnlineLotteriGuide = lazyRetry(() => import("./pages/casinospil/OnlineLotteriGuide"));
const BingoGuide = lazyRetry(() => import("./pages/casinospil/BingoGuide"));
const KenoGuide = lazyRetry(() => import("./pages/casinospil/KenoGuide"));
const SkrabespilGuide = lazyRetry(() => import("./pages/casinospil/SkrabespilGuide"));
const GameShowsGuide = lazyRetry(() => import("./pages/casinospil/GameShowsGuide"));
const Forfatter = lazyRetry(() => import("./pages/Forfatter"));
const ForfatterKevin = lazyRetry(() => import("./pages/ForfatterKevin"));
const ForfatterAjse = lazyRetry(() => import("./pages/ForfatterAjse"));
const ForfatterNiklas = lazyRetry(() => import("./pages/ForfatterNiklas"));
const ForfatterFrederik = lazyRetry(() => import("./pages/ForfatterFrederik"));
const SaadanTesterVi = lazyRetry(() => import("./pages/SaadanTesterVi"));
const CasinoNyheder = lazyRetry(() => import("./pages/CasinoNyheder"));
const CasinoNyhedArticle = lazyRetry(() => import("./pages/CasinoNyhedArticle"));
const Ordbog = lazyRetry(() => import("./pages/Ordbog"));
const OrdbogTerm = lazyRetry(() => import("./pages/OrdbogTerm"));

// VS / Comparison pages
const Bet365VsUnibet = lazyRetry(() => import("./pages/comparisons/Bet365VsUnibet"));
const LeoVegasVsMrGreen = lazyRetry(() => import("./pages/comparisons/LeoVegasVsMrGreen"));
const DanskeSpilVsSpilnu = lazyRetry(() => import("./pages/comparisons/DanskeSpilVsSpilnu"));
const SpilleautomatenVsSpilDanskNu = lazyRetry(() => import("./pages/comparisons/SpilleautomatenVsSpilDanskNu"));
const BetiniaVsCampobet = lazyRetry(() => import("./pages/comparisons/BetiniaVsCampobet"));
const SwiftCasinoVsLunaCasino = lazyRetry(() => import("./pages/comparisons/SwiftCasinoVsLunaCasino"));

const VipProgram = lazyRetry(() => import("./pages/VipProgram"));
const CasinoMedMobilePay = lazyRetry(() => import("./pages/CasinoMedMobilePay"));

const NotFound = lazyRetry(() => import("./pages/NotFound"));
const CasinoerHub = lazyRetry(() => import("./pages/casinoer/CasinoerHub"));
const HurtigUdbetalingGuide = lazyRetry(() => import("./pages/casinoer/HurtigUdbetalingGuide"));
const HoejRTPGuide = lazyRetry(() => import("./pages/casinoer/HoejRTPGuide"));
const CryptoCasinoGuide = lazyRetry(() => import("./pages/casinoer/CryptoCasinoGuide"));
// LicenseredeCasinoerGuide now redirects to CasinoLicenser
const VRCasinoerGuide = lazyRetry(() => import("./pages/casinoer/VRCasinoerGuide"));
const MobilCasinoerGuide = lazyRetry(() => import("./pages/casinoer/MobilCasinoerGuide"));
const SpilForSjovGuide = lazyRetry(() => import("./pages/casinoer/SpilForSjovGuide"));
const CasinoOgSkatGuide = lazyRetry(() => import("./pages/casinoer/CasinoOgSkatGuide"));
const CasinoMedDanskLicens = lazyRetry(() => import("./pages/casinoer/CasinoMedDanskLicens"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 min default stale time
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const SafeHelmetProvider = HelmetProvider as unknown as ComponentType<{ children?: ReactNode }>;

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

    // Auto-reload on chunk load failures (stale deploys)
    const isChunkError =
      error.message?.includes("Failed to fetch dynamically imported module") ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Loading CSS chunk") ||
      error.message?.includes("Importing a module script failed");

    if (isChunkError) {
      const reloadKey = "chunk-reload-" + window.location.pathname;
      const lastReload = sessionStorage.getItem(reloadKey);
      // Only auto-reload once per path per session to avoid infinite loops
      if (!lastReload) {
        sessionStorage.setItem(reloadKey, Date.now().toString());
        window.location.reload();
        return;
      }
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-lg font-semibold">Siden kunne ikke indlæses.</p>
          <p className="text-sm text-muted-foreground">Prøv at genindlæse siden. Hvis problemet fortsætter, ryd din browsers cache.</p>
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
  <SafeHelmetProvider>
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
                <Route path="/pragmatic-play-partner" element={<PragmaticPlayPartner />} />
                <Route path="/redaktionel-politik" element={<RedaktionelPolitik />} />
                <Route path="/forfatter" element={<Navigate to="/forfatter/jonas" replace />} />
                <Route path="/forfatter/jonas" element={<Forfatter />} />
                <Route path="/forfatter/kevin" element={<ForfatterKevin />} />
                <Route path="/forfatter/ajse" element={<ForfatterAjse />} />
                <Route path="/forfatter/niklas" element={<ForfatterNiklas />} />
                <Route path="/forfatter/frederik" element={<ForfatterFrederik />} />
                <Route path="/saadan-tester-vi-casinoer" element={<SaadanTesterVi />} />
                
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/sitemap/casino-anmeldelser" element={<SitemapCasinos />} />
                <Route path="/sitemap/casino-bonus" element={<SitemapBonus />} />
                <Route path="/sitemap/casinospil" element={<SitemapSlots />} />
                <Route path="/nyheder" element={<Navigate to="/casino-nyheder" replace />} />
                <Route path="/casino-nyheder" element={<CasinoNyheder />} />
                <Route path="/casino-nyheder/:slug" element={<CasinoNyhedArticle />} />
                <Route path="/markedsindsigt" element={<MarketIntelligence />} />
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
                <Route path="/mobil-casino/iphone" element={<IPhoneCasinoGuide />} />
                <Route path="/mobil-casino/android" element={<AndroidCasinoGuide />} />
                <Route path="/mobil-casino/tablet" element={<TabletCasinoGuide />} />
                <Route path="/mobil-casino/bedste-apps" element={<BedsteAppsGuide />} />
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
                <Route path="/live-casino/game-shows" element={<GameShowsGuide />} />
                <Route path="/live-casino/crazy-time" element={<CrazyTimeGuide />} />
                <Route path="/live-casino/dream-catcher" element={<DreamCatcherGuide />} />
                <Route path="/live-casino/deal-or-no-deal" element={<DealOrNoDealGuide />} />
                <Route path="/live-casino/strategi" element={<LiveCasinoStrategiGuide />} />
                <Route path="/live-casino/udbydere" element={<LiveCasinoUdbydereGuide />} />
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
                <Route path="/casino-anmeldelser/playkasino" element={<PlayKasinoAnmeldelse />} />
                <Route path="/casino-anmeldelser/bet365-vs-unibet" element={<Bet365VsUnibet />} />
                <Route path="/casino-anmeldelser/leovegas-vs-mr-green" element={<LeoVegasVsMrGreen />} />
                <Route path="/casino-anmeldelser/danske-spil-vs-spilnu" element={<DanskeSpilVsSpilnu />} />
                <Route path="/casino-anmeldelser/spilleautomaten-vs-spildansknu" element={<SpilleautomatenVsSpilDanskNu />} />
                <Route path="/casino-anmeldelser/betinia-vs-campobet" element={<BetiniaVsCampobet />} />
                <Route path="/casino-anmeldelser/swift-casino-vs-luna-casino" element={<SwiftCasinoVsLunaCasino />} />
                <Route path="/casinospil" element={<Casinospil />} />
                <Route path="/casinoer" element={<CasinoerHub />} />
                <Route path="/casinoer/hurtig-udbetaling" element={<Navigate to="/hurtig-udbetaling" replace />} />
                <Route path="/casinoer/hoej-rtp" element={<HoejRTPGuide />} />
                <Route path="/casinoer/crypto-casino" element={<CryptoCasinoGuide />} />
                <Route path="/licenserede-casinoer" element={<Navigate to="/casino-licenser" replace />} />
                <Route path="/casino-licenser" element={<CasinoLicenser />} />
                <Route path="/casinoer/vr-casinoer" element={<VRCasinoerGuide />} />
                <Route path="/casinoer/mobil-casinoer" element={<Navigate to="/mobil-casino" replace />} />
                <Route path="/casinoer/spil-casino-for-sjov" element={<SpilForSjovGuide />} />
                <Route path="/casinoer/casino-og-skat" element={<CasinoOgSkatGuide />} />
                <Route path="/casino-med-dansk-licens" element={<CasinoMedDanskLicens />} />
                <Route path="/gratis-casino-spil" element={<GratisCasinoSpil />} />
                <Route path="/hurtig-udbetaling" element={<HurtigUdbetaling />} />
                <Route path="/casino-uden-rofus" element={<CasinoUdenRofus />} />
                <Route path="/casino-med-mitid" element={<CasinoMedMitID2 />} />
                <Route path="/casinospil/spillemaskiner" element={<Spillemaskiner />} />
                <Route path="/casinospil/spillemaskiner/hoej-rtp" element={<SpillemaskinerHoejRTP />} />
                <Route path="/spillemaskiner/:providerSlug" element={<ProviderSlotsHub />} />
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
                <Route path="/casinospil/blackjack/skema" element={<BlackjackSkemaGuide />} />
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
                <Route path="/casinospil/poker/bedste-sider" element={<PokerBedsteSiderGuide />} />
                <Route path="/casinospil/craps" element={<CrapsGuide />} />
                <Route path="/casinospil/baccarat" element={<BaccaratGuide />} />
                <Route path="/casinospil/roulette-strategi" element={<Navigate to="/casinospil/roulette" replace />} />
                <Route path="/casinospil/online-lotteri" element={<OnlineLotteriGuide />} />
                <Route path="/casinospil/bingo" element={<BingoGuide />} />
                <Route path="/casinospil/keno" element={<KenoGuide />} />
                <Route path="/casinospil/skrabespil" element={<SkrabespilGuide />} />
                <Route path="/casinospil/game-shows" element={<Navigate to="/live-casino/game-shows" replace />} />
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
                <Route path="/spiludviklere/thunderkick" element={<ThunderkickGuide />} />
                <Route path="/spiludviklere/blueprint-gaming" element={<BlueprintGamingGuide />} />
                <Route path="/spiludviklere/push-gaming" element={<PushGamingGuide />} />
                <Route path="/spiludviklere/quickspin" element={<QuickspinGuide />} />
                <Route path="/spiludviklere/isoftbet" element={<ISoftBetGuide />} />
                <Route path="/spiludviklere/betsoft" element={<BetsoftGuide />} />
                <Route path="/spiludviklere/wazdan" element={<WazdanGuide />} />
                <Route path="/spiludviklere/endorphina" element={<EndorphinaGuide />} />
                <Route path="/spiludviklere/stakelogic" element={<StakelogicGuide />} />
                <Route path="/spiludviklere/booming-games" element={<BoomingGamesGuide />} />
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
                <Route path="/vip-program" element={<VipProgram />} />
                <Route path="/casino-med-mobilepay" element={<CasinoMedMobilePay />} />
                
                <Route path="/community" element={<Suspense fallback={null}><CommunityHub /></Suspense>} />
                <Route path="/community/turneringer" element={<Leaderboard />} />
                <Route path="/community/turneringer/arkiv" element={<TurneringsArkiv />} />
                <Route path="/community/rewards" element={<RewardsProgram />} />
                <Route path="/community/spin-the-reel" element={<Suspense fallback={null}><SpinTheReel /></Suspense>} />
                <Route path="/bonus-hunt" element={<Suspense fallback={null}><BonusHunt /></Suspense>} />
                <Route path="/bonus-hunt/arkiv" element={<BonusHuntArkiv />} />
                <Route path="/slot-database" element={<SlotDatabase />} />
                <Route path="/statistik" element={<Statistik />} />
                <Route path="/slot-katalog/:slug" element={<SlotCatalogPage />} />
                <Route path="/slot-katalog" element={<Navigate to="/slot-database" replace />} />
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
            <DwellRewardBadge />
          </Suspense>
          </ChunkErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </SafeHelmetProvider>
);

export default App;
