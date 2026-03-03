import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import casinoaftalerLogo from "@/assets/casinoaftaler-logo.webp";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Gamepad2, LogOut, Mail, Menu, User, X, Dices, Gift, BookOpen, Users, ShoppingBag, Video, ShieldCheck, Sparkles, Layers, Moon, Sun, Coins, UserCircle, Trophy, Ticket, CreditCard, MoreHorizontal, RefreshCw, DollarSign, Zap, Tv, Star, Scale, BarChart3, Smartphone, Globe, Heart, Landmark, RotateCw, Newspaper, TrendingUp } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import type { TwitchBadges as TwitchBadgesType } from "@/hooks/useTwitchBadges";
import { useState, useEffect, memo } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTwitchStatus } from "@/hooks/useTwitchStatus";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NotificationDropdown } from "./NotificationDropdown";
import { RedeemCodeDialog } from "./RedeemCodeDialog";
import { getTodayDanish } from "@/lib/danishDate";
export const Header = memo(function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [providersExpanded, setProvidersExpanded] = useState(false);
  const [expandedSlots, setExpandedSlots] = useState(false);
  const [expandedMobileSlots, setExpandedMobileSlots] = useState(false);
  const [paymentsExpanded, setPaymentsExpanded] = useState(false);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [forfattereExpanded, setForfattereExpanded] = useState(false);
  const [allReviewsExpanded, setAllReviewsExpanded] = useState(false);
  const [allReviewsDesktop, setAllReviewsDesktop] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const { data: siteSettings } = useSiteSettings();
  const { data: twitchStatus } = useTwitchStatus(siteSettings?.twitch_url);
  const { user, loading: authLoading, signOut } = useAuth();
  
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  const today = getTodayDanish();
  const { data: creditsData } = useQuery({
    queryKey: ["header-credits", user?.id, today],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("slot_spins")
        .select("spins_remaining")
        .eq("user_id", user.id)
        .eq("date", today)
        .eq("game_id", "shared")
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const shouldBeDark = saved === "dark";
    document.documentElement.classList.toggle("dark", shouldBeDark);
    setIsDark(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const headerIconUrl = siteSettings?.header_icon || undefined;
  const siteName = siteSettings?.site_name || "Casinoaftaler.dk";
  const isLive = twitchStatus?.isLive ?? false;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden">
            <img src={casinoaftalerLogo} alt="Casinoaftaler.dk logo" width={40} height={40} className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
          </div>
          <span className="text-sm sm:text-xl font-bold whitespace-nowrap">{siteName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex whitespace-nowrap">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Landmark className="h-4 w-4" />
              Casinoer <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <DropdownMenuItem asChild>
                <Link to="/casinoer" className="flex items-center gap-2 font-medium">
                  <Landmark className="h-4 w-4" />
                  Alle Casinoer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/top-10-casino-online" className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Top 10 Online Casino
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casinoer/hurtig-udbetaling" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Hurtig Udbetaling
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casinoer/hoej-rtp" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Høj RTP
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casino-licenser" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Licenserede Casinoer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casinoer/mobil-casinoer" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobil Casinoer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casinoer/crypto-casino" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Crypto Casino
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casinoer/vr-casinoer" className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  VR Casinoer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casinoer/spil-casino-for-sjov" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Spil Casino for Sjov
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casinoer/casino-og-skat" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Casino og Skat
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Sparkles className="h-4 w-4" />
              Nye Casinoer <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <DropdownMenuItem asChild>
                <Link to="/nye-casinoer" className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4" />
                  Alle Nye Casinoer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {[
                { to: "/nye-casinoer/2026", label: "Nye Casinoer 2026" },
                { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens" },
                { to: "/nye-casinoer/uden-rofus", label: "Uden ROFUS" },
                { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling" },
                { to: "/nye-casinoer/bonus-uden-indbetaling", label: "Bonus uden Indbetaling" },
                { to: "/nye-casinoer/trustly", label: "Med Trustly" },
                { to: "/nye-casinoer/mitid", label: "Med MitID" },
                { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering" },
                { to: "/nye-casinoer/bedste", label: "Bedste Nye Casinoer" },
                { to: "/nye-casinoer/vs-etablerede", label: "Nye vs Etablerede" },
              ].map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Dices className="h-4 w-4" />
              Casinospil <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <DropdownMenuItem asChild>
                <Link to="/casinospil" className="flex items-center gap-2">
                  <Dices className="h-4 w-4" />
                  Casinospil Oversigt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  Spillemaskiner
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-popover">
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/spillemaskiner" className="flex items-center gap-2 font-medium">
                      <Star className="h-3 w-3" />
                      Alle Spillemaskiner
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/spillemaskiner/hoej-rtp" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Høj RTP Spillemaskiner
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/spillemaskiner/bonus-buys" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Bonus Buys
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {(() => {
                    const allSlots = [
                      { to: "/casinospil/spillemaskiner/sweet-bonanza", label: "Sweet Bonanza" },
                      { to: "/casinospil/spillemaskiner/book-of-dead", label: "Book of Dead" },
                      { to: "/casinospil/spillemaskiner/gates-of-olympus", label: "Gates of Olympus" },
                      { to: "/casinospil/spillemaskiner/starburst", label: "Starburst" },
                      { to: "/casinospil/spillemaskiner/razor-shark", label: "Razor Shark" },
                      { to: "/casinospil/spillemaskiner/big-bass-bonanza", label: "Big Bass Bonanza" },
                      { to: "/casinospil/spillemaskiner/dead-or-alive-2", label: "Dead or Alive 2" },
                      { to: "/casinospil/spillemaskiner/gonzos-quest", label: "Gonzo's Quest" },
                      { to: "/casinospil/spillemaskiner/reactoonz", label: "Reactoonz" },
                      { to: "/casinospil/spillemaskiner/money-train-3", label: "Money Train 3" },
                      { to: "/casinospil/spillemaskiner/wolf-gold", label: "Wolf Gold" },
                      { to: "/casinospil/spillemaskiner/the-dog-house", label: "The Dog House" },
                      { to: "/casinospil/spillemaskiner/jammin-jars", label: "Jammin' Jars" },
                      { to: "/casinospil/spillemaskiner/bonanza", label: "Bonanza" },
                      { to: "/casinospil/spillemaskiner/fire-joker", label: "Fire Joker" },
                      { to: "/casinospil/spillemaskiner/legacy-of-dead", label: "Legacy of Dead" },
                      { to: "/casinospil/spillemaskiner/divine-fortune", label: "Divine Fortune" },
                      { to: "/casinospil/spillemaskiner/eye-of-horus", label: "Eye of Horus" },
                      { to: "/casinospil/spillemaskiner/buffalo-king", label: "Buffalo King" },
                      { to: "/casinospil/spillemaskiner/sugar-rush", label: "Sugar Rush" },
                      { to: "/casinospil/spillemaskiner/cleopatra", label: "Cleopatra" },
                      { to: "/casinospil/spillemaskiner/mega-moolah", label: "Mega Moolah" },
                      { to: "/casinospil/spillemaskiner/thunderstruck-ii", label: "Thunderstruck II" },
                      { to: "/casinospil/spillemaskiner/immortal-romance", label: "Immortal Romance" },
                      { to: "/casinospil/spillemaskiner/wild-west-gold", label: "Wild West Gold" },
                      { to: "/casinospil/spillemaskiner/madame-destiny-megaways", label: "Madame Destiny Megaways" },
                      { to: "/casinospil/spillemaskiner/extra-chilli-megaways", label: "Extra Chilli Megaways" },
                      { to: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", label: "Wanted Dead or a Wild" },
                      { to: "/casinospil/spillemaskiner/chaos-crew", label: "Chaos Crew" },
                      { to: "/casinospil/spillemaskiner/joker-strike", label: "Joker Strike" },
                    ];
                    const visible = expandedSlots ? allSlots : allSlots.slice(0, 8);
                    return (
                      <>
                        {visible.map((item) => (
                          <DropdownMenuItem key={item.to} asChild>
                            <Link to={item.to} className="flex items-center gap-2">
                              <Star className="h-3 w-3" />
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        {!expandedSlots && (
                          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setExpandedSlots(true); }} className="flex items-center gap-2 text-primary cursor-pointer">
                            <ChevronDown className="h-3 w-3" />
                            Vis alle ({allSlots.length - 8} mere)
                          </DropdownMenuItem>
                        )}
                      </>
                    );
                  })()}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  Blackjack
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Blackjack Guide
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack/amerikansk-blackjack" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Amerikansk Blackjack
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack/europaeisk-blackjack" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Europæisk Blackjack
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack/double-exposure-blackjack" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Double Exposure
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack/spanish-21" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Spanish 21
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack/martingale" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Martingale Strategi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack/fibonacci" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Fibonacci Strategi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/blackjack/dalembert" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      D'Alembert Strategi
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  Roulette
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Roulette Guide
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/amerikansk-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Amerikansk Roulette
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/europaeisk-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Europæisk Roulette
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/fransk-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Fransk Roulette
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/martingale-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Martingale Strategi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/fibonacci-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Fibonacci Strategi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/dalembert-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      D'Alembert Strategi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/labouchere-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Labouchère Strategi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/roulette/james-bond-roulette" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      James Bond Strategi
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <Link to="/casinospil/roulette-strategi" className="flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  Roulette Strategi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  Poker
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/poker" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Poker Guide
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/poker/texas-holdem" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Texas Hold'em
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/poker/omaha" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Omaha
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/poker/three-card-poker" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Three Card Poker
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/poker/caribbean-stud" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Caribbean Stud
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/poker/video-poker" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Video Poker
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/casinospil/poker/poker-strategi" className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      Poker Strategi
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {[
                { to: "/casinospil/craps", label: "Craps" },
                { to: "/casinospil/baccarat", label: "Baccarat" },
                { to: "/casinospil/online-lotteri", label: "Online Lotteri" },
                { to: "/casinospil/game-shows", label: "Game Shows" },
              ].map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Tv className="h-4 w-4" />
              Live Casino <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/live-casino" className="flex items-center gap-2">
                  <Tv className="h-4 w-4" />
                  Live Casino Oversigt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {[
                { to: "/live-casino/blackjack", label: "Live Blackjack" },
                { to: "/live-casino/roulette", label: "Live Roulette" },
                { to: "/live-casino/baccarat", label: "Live Baccarat" },
                { to: "/live-casino/lightning-roulette", label: "Lightning Roulette" },
                { to: "/live-casino/monopoly-live", label: "Monopoly Live" },
              ].map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="flex items-center gap-2">
                    <Star className="h-3 w-3" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <BookOpen className="h-4 w-4" />
              Casino Bonus <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/casino-bonus" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Casino Bonus Oversigt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/no-sticky-bonus" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  No-Sticky Bonusser
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/sticky-bonus" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Sticky Bonusser
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/free-spins" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Free Spins
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/free-spins-i-dag" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Free Spins i Dag
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/velkomstbonus" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Velkomstbonus
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/omsaetningskrav" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Omsætningskrav
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/indskudsbonus" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Indskudsbonus
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bonus-uden-indbetaling" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Bonus uden Indbetaling
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bonus-uden-omsaetningskrav" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Bonus uden Omsætningskrav
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/cashback-bonus" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Cashback Bonus
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/reload-bonus" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Reload Bonus
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <MoreHorizontal className="h-4 w-4" />
              Mere <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/om" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Om Casinoaftaler.dk
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/saadan-tester-vi-casinoer" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                   Sådan tester vi casinoer
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/forretningsmodel" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Forretningsmodel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/redaktionel-politik" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Redaktionel Politik
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/ansvarligt-spil" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Ansvarligt Spil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casino-licenser" className="flex items-center gap-2">
                  <Landmark className="h-4 w-4" />
                  Casino Licenser
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/spillemyndigheden" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Spillemyndigheden
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/kontakt" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Kontakt
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/casino-nyheder" className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  Casino Nyheder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Forfattere
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-popover">
                  <DropdownMenuItem asChild>
                    <Link to="/forfatter/jonas" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Jonas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/forfatter/kevin" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Kevin
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/forfatter/ajse" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Ajse
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Betalingsmetoder
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-popover">
                  <DropdownMenuItem asChild>
                    <Link to="/betalingsmetoder" className="flex items-center gap-2 font-medium">
                      <CreditCard className="h-4 w-4" />
                      Alle betalingsmetoder
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {[
                    { to: "/betalingsmetoder/apple-pay", label: "Apple Pay" },
                    { to: "/betalingsmetoder/mobilepay", label: "MobilePay" },
                    { to: "/betalingsmetoder/paypal", label: "PayPal" },
                    { to: "/betalingsmetoder/skrill", label: "Skrill" },
                    { to: "/betalingsmetoder/trustly", label: "Trustly" },
                    { to: "/betalingsmetoder/zimpler", label: "Zimpler" },
                    { to: "/betalingsmetoder/paysafecard", label: "Paysafecard" },
                    { to: "/betalingsmetoder/bankoverforsler", label: "Bankoverførsel" },
                    { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard" },
                    { to: "/betalingsmetoder/revolut", label: "Revolut" },
                  ].map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center gap-2">
                        <Star className="h-3 w-3" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Spiludviklere
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-popover">
                  <DropdownMenuItem asChild>
                    <Link to="/spiludviklere" className="flex items-center gap-2 font-medium">
                      <Gamepad2 className="h-4 w-4" />
                      Alle spiludviklere
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {[
                    { to: "/spiludviklere/netent", label: "NetEnt" },
                    { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
                    { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming" },
                    { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
                    { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
                    { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
                    { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
                    { to: "/spiludviklere/elk-studios", label: "ELK Studios" },
                    { to: "/spiludviklere/yggdrasil", label: "Yggdrasil" },
                    { to: "/spiludviklere/microgaming", label: "Microgaming" },
                    { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
                    { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
                  ].map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center gap-2">
                        <Star className="h-3 w-3" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Casino Anmeldelser
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-popover max-h-[70vh] overflow-y-auto">
                  <DropdownMenuItem asChild>
                    <Link to="/casino-anmeldelser" className="flex items-center gap-2 font-medium">
                      <Star className="h-4 w-4" />
                      Alle anmeldelser
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {[
                    { to: "/casino-anmeldelser/spildansknu", label: "SpilDanskNu" },
                    { to: "/casino-anmeldelser/spilleautomaten", label: "Spilleautomaten" },
                    { to: "/casino-anmeldelser/betinia", label: "Betinia" },
                    { to: "/casino-anmeldelser/campobet", label: "Campobet" },
                    { to: "/casino-anmeldelser/swift-casino", label: "Swift Casino" },
                    { to: "/casino-anmeldelser/luna-casino", label: "Luna Casino" },
                  ].map((item) => (
                    <DropdownMenuItem key={item.to} asChild>
                      <Link to={item.to} className="flex items-center gap-2">
                        <Star className="h-3 w-3" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {!allReviewsDesktop ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => { e.preventDefault(); setAllReviewsDesktop(true); }} className="cursor-pointer text-primary font-medium">
                        <ChevronDown className="h-3 w-3 mr-1" />
                        Vis alle anmeldelser
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuSeparator />
                      {[
                        { to: "/casino-anmeldelser/danske-spil", label: "Danske Spil Casino" },
                        { to: "/casino-anmeldelser/comeon", label: "ComeOn Casino" },
                        { to: "/casino-anmeldelser/getlucky", label: "GetLucky Casino" },
                        { to: "/casino-anmeldelser/mr-green", label: "Mr Green Casino" },
                        { to: "/casino-anmeldelser/videoslots", label: "Videoslots Casino" },
                        { to: "/casino-anmeldelser/mr-vegas", label: "Mr Vegas Casino" },
                        { to: "/casino-anmeldelser/leovegas", label: "LeoVegas" },
                        { to: "/casino-anmeldelser/unibet", label: "Unibet" },
                        { to: "/casino-anmeldelser/bet365", label: "bet365" },
                        { to: "/casino-anmeldelser/888-casino", label: "888 Casino" },
                        { to: "/casino-anmeldelser/betano", label: "Betano" },
                        { to: "/casino-anmeldelser/expekt", label: "Expekt" },
                        { to: "/casino-anmeldelser/royal-casino", label: "Royal Casino" },
                        { to: "/casino-anmeldelser/maria-casino", label: "Maria Casino" },
                        { to: "/casino-anmeldelser/kapow-casino", label: "Kapow Casino" },
                        { to: "/casino-anmeldelser/nordicbet", label: "NordicBet" },
                        { to: "/casino-anmeldelser/one-casino", label: "One Casino" },
                        { to: "/casino-anmeldelser/spilnu", label: "Spilnu" },
                        { to: "/casino-anmeldelser/stake-casino", label: "Stake Casino" },
                        { to: "/casino-anmeldelser/casinostuen", label: "Casinostuen" },
                        { to: "/casino-anmeldelser/pokerstars", label: "PokerStars" },
                        { to: "/casino-anmeldelser/bwin", label: "bwin" },
                        { to: "/casino-anmeldelser/marathonbet", label: "MarathonBet" },
                      ].map((item) => (
                        <DropdownMenuItem key={item.to} asChild>
                          <Link to={item.to} className="flex items-center gap-2">
                            <Star className="h-3 w-3" />
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <div className="flex items-center gap-0.5">
              <Link to="/community" className="flex items-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:text-primary">
                <Users className="h-4 w-4" />
                Community
              </Link>
              <DropdownMenuTrigger className="transition-colors hover:text-primary p-1" aria-label="Community undermenu">
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="center" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/community/slots" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Spillehal
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/highlights" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Highlights
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/butik" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Butik
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle - hidden on mobile, shown on desktop */}
          {/* Theme toggle - only show standalone when NOT logged in */}
          {!user && (
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          )}
          
          {/* Notification bell for logged-in users */}
          {!authLoading && user && <NotificationDropdown />}
          
          {/* User menu / Login button */}
          {!authLoading && (
            user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex h-auto items-center gap-2 rounded-full px-2 py-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || "Bruger"} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium sm:inline">
                      {profile?.display_name || profile?.twitch_username || "Bruger"}
                    </span>
                    <TwitchBadgesInline
                      badges={profile?.twitch_badges as unknown as TwitchBadgesType | null}
                      className="hidden sm:flex"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || "Bruger"} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium">{profile?.display_name || "Bruger"}</span>
                          <TwitchBadgesInline badges={profile?.twitch_badges as unknown as TwitchBadgesType | null} />
                        </div>
                        {profile?.twitch_username && (
                          <span className="text-xs text-muted-foreground">@{profile.twitch_username}</span>
                        )}
                      </div>
                    </div>
                    {creditsData && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                        <CreditCoin size="sm" />
                        {creditsData.spins_remaining.toLocaleString("da-DK")}
                      </span>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profil")} className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRedeemDialogOpen(true)} className="cursor-pointer">
                    <Ticket className="mr-2 h-4 w-4" />
                    Indløs Kode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                    {isDark ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Lys tilstand
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Mørk tilstand
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log ud
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="bg-[#9146FF] text-white hover:bg-[#772ce8] border-none">
                <Link to="/auth" className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  Log ind
                </Link>
              </Button>
            )
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-background lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav className="container flex flex-col py-3">
            <button
              onClick={() => setExpandedSection(expandedSection === "casino" ? null : "casino")}
              className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50"
            >
              <span className="flex items-center gap-2">
                <Dices className="h-4 w-4" />
                Casinoer
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "casino" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "casino" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Landmark className="h-4 w-4" />
                  Alle Casinoer
                </Link>
                <Link to="/top-10-casino-online" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Trophy className="h-4 w-4" />
                  Top 10 Online Casino
                </Link>
                <Link to="/casinoer/hurtig-udbetaling" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Zap className="h-4 w-4" />
                  Hurtig Udbetaling
                </Link>
                <Link to="/casinoer/hoej-rtp" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <BarChart3 className="h-4 w-4" />
                  Høj RTP
                </Link>
                <Link to="/casino-licenser" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <ShieldCheck className="h-4 w-4" />
                  Licenserede Casinoer
                </Link>
                <Link to="/casinoer/mobil-casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Smartphone className="h-4 w-4" />
                  Mobil Casinoer
                </Link>
                <Link to="/casinoer/crypto-casino" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Globe className="h-4 w-4" />
                  Crypto Casino
                </Link>
                <Link to="/casinoer/vr-casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Gamepad2 className="h-4 w-4" />
                  VR Casinoer
                </Link>
                <Link to="/casinoer/spil-casino-for-sjov" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="h-4 w-4" />
                  Spil Casino for Sjov
                </Link>
                <Link to="/casinoer/casino-og-skat" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Scale className="h-4 w-4" />
                  Casino og Skat
                </Link>
              </div>
            )}
            <button
              onClick={() => setExpandedSection(expandedSection === "nyecasinoer" ? null : "nyecasinoer")}
              className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Nye Casinoer
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "nyecasinoer" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "nyecasinoer" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/nye-casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Sparkles className="h-4 w-4" />
                  Alle Nye Casinoer
                </Link>
                {[
                  { to: "/nye-casinoer/2026", label: "Nye Casinoer 2026" },
                  { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens" },
                  { to: "/nye-casinoer/uden-rofus", label: "Uden ROFUS" },
                  { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling" },
                  { to: "/nye-casinoer/bonus-uden-indbetaling", label: "Bonus uden Indbetaling" },
                  { to: "/nye-casinoer/trustly", label: "Med Trustly" },
                  { to: "/nye-casinoer/mitid", label: "Med MitID" },
                  { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering" },
                  { to: "/nye-casinoer/bedste", label: "Bedste Nye Casinoer" },
                  { to: "/nye-casinoer/vs-etablerede", label: "Nye vs Etablerede" },
                ].map((item) => (
                  <Link key={item.to} to={item.to} className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <Star className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <button
              onClick={() => setExpandedSection(expandedSection === "casinospil" ? null : "casinospil")}
              className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50"
            >
              <span className="flex items-center gap-2">
                <Dices className="h-4 w-4" />
                Casinospil
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "casinospil" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "casinospil" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/casinospil" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Dices className="h-4 w-4" />
                  Casinospil Oversigt
                </Link>
                <Link to="/casinospil/spillemaskiner" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Star className="h-4 w-4" />
                  Spillemaskiner
                </Link>
                {(() => {
                  const allSlots = [
                    { to: "/casinospil/spillemaskiner/hoej-rtp", label: "Høj RTP Spillemaskiner" },
                    { to: "/casinospil/spillemaskiner/sweet-bonanza", label: "Sweet Bonanza" },
                    { to: "/casinospil/spillemaskiner/book-of-dead", label: "Book of Dead" },
                    { to: "/casinospil/spillemaskiner/gates-of-olympus", label: "Gates of Olympus" },
                    { to: "/casinospil/spillemaskiner/starburst", label: "Starburst" },
                    { to: "/casinospil/spillemaskiner/razor-shark", label: "Razor Shark" },
                    { to: "/casinospil/spillemaskiner/big-bass-bonanza", label: "Big Bass Bonanza" },
                    { to: "/casinospil/spillemaskiner/dead-or-alive-2", label: "Dead or Alive 2" },
                    { to: "/casinospil/spillemaskiner/gonzos-quest", label: "Gonzo's Quest" },
                    { to: "/casinospil/spillemaskiner/reactoonz", label: "Reactoonz" },
                    { to: "/casinospil/spillemaskiner/money-train-3", label: "Money Train 3" },
                    { to: "/casinospil/spillemaskiner/wolf-gold", label: "Wolf Gold" },
                    { to: "/casinospil/spillemaskiner/the-dog-house", label: "The Dog House" },
                    { to: "/casinospil/spillemaskiner/jammin-jars", label: "Jammin' Jars" },
                    { to: "/casinospil/spillemaskiner/bonanza", label: "Bonanza" },
                    { to: "/casinospil/spillemaskiner/fire-joker", label: "Fire Joker" },
                    { to: "/casinospil/spillemaskiner/legacy-of-dead", label: "Legacy of Dead" },
                    { to: "/casinospil/spillemaskiner/divine-fortune", label: "Divine Fortune" },
                    { to: "/casinospil/spillemaskiner/eye-of-horus", label: "Eye of Horus" },
                    { to: "/casinospil/spillemaskiner/buffalo-king", label: "Buffalo King" },
                    { to: "/casinospil/spillemaskiner/sugar-rush", label: "Sugar Rush" },
                    { to: "/casinospil/spillemaskiner/cleopatra", label: "Cleopatra" },
                    { to: "/casinospil/spillemaskiner/mega-moolah", label: "Mega Moolah" },
                    { to: "/casinospil/spillemaskiner/thunderstruck-ii", label: "Thunderstruck II" },
                    { to: "/casinospil/spillemaskiner/immortal-romance", label: "Immortal Romance" },
                    { to: "/casinospil/spillemaskiner/wild-west-gold", label: "Wild West Gold" },
                    { to: "/casinospil/spillemaskiner/madame-destiny-megaways", label: "Madame Destiny Megaways" },
                    { to: "/casinospil/spillemaskiner/extra-chilli-megaways", label: "Extra Chilli Megaways" },
                    { to: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", label: "Wanted Dead or a Wild" },
                    { to: "/casinospil/spillemaskiner/chaos-crew", label: "Chaos Crew" },
                    { to: "/casinospil/spillemaskiner/joker-strike", label: "Joker Strike" },
                  ];
                  const visible = expandedMobileSlots ? allSlots : allSlots.slice(0, 8);
                  return (
                    <>
                      {visible.map((item) => (
                        <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                          <Star className="h-3 w-3" />
                          {item.label}
                        </Link>
                      ))}
                      {!expandedMobileSlots && (
                        <button onClick={() => setExpandedMobileSlots(true)} className="ml-10 flex items-center gap-2 py-2 text-sm text-primary transition-colors hover:text-primary/80">
                          <ChevronDown className="h-3 w-3" />
                          Vis alle ({allSlots.length - 8} mere)
                        </button>
                      )}
                    </>
                  );
                })()}
                <div className="ml-6 flex flex-col">
                  <Link to="/casinospil/blackjack" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <Star className="h-4 w-4" />
                    Blackjack Guide
                  </Link>
                  {[
                    { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack" },
                    { to: "/casinospil/blackjack/europaeisk-blackjack", label: "Europæisk Blackjack" },
                    { to: "/casinospil/blackjack/double-exposure-blackjack", label: "Double Exposure" },
                    { to: "/casinospil/blackjack/spanish-21", label: "Spanish 21" },
                    { to: "/casinospil/blackjack/martingale", label: "Martingale Strategi" },
                    { to: "/casinospil/blackjack/fibonacci", label: "Fibonacci Strategi" },
                    { to: "/casinospil/blackjack/dalembert", label: "D'Alembert Strategi" },
                  ].map((item) => (
                    <Link key={item.to} to={item.to} className="ml-4 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <Star className="h-3 w-3" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="ml-6 flex flex-col">
                  <Link to="/casinospil/roulette" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <Star className="h-4 w-4" />
                    Roulette Guide
                  </Link>
                  {[
                    { to: "/casinospil/roulette/amerikansk-roulette", label: "Amerikansk Roulette" },
                    { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette" },
                    { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette" },
                    { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Strategi" },
                    { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci Strategi" },
                    { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Strategi" },
                    { to: "/casinospil/roulette/labouchere-roulette", label: "Labouchère Strategi" },
                    { to: "/casinospil/roulette/james-bond-roulette", label: "James Bond Strategi" },
                  ].map((item) => (
                    <Link key={item.to} to={item.to} className="ml-4 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <Star className="h-3 w-3" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="ml-6 flex flex-col">
                  <Link to="/casinospil/poker" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <Star className="h-4 w-4" />
                    Poker Guide
                  </Link>
                  {[
                    { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em" },
                    { to: "/casinospil/poker/omaha", label: "Omaha" },
                    { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker" },
                    { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud" },
                    { to: "/casinospil/poker/video-poker", label: "Video Poker" },
                    { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi" },
                  ].map((item) => (
                    <Link key={item.to} to={item.to} className="ml-4 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <Star className="h-3 w-3" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                {[
                  { to: "/casinospil/roulette-strategi", label: "Roulette Strategi" },
                  { to: "/casinospil/craps", label: "Craps" },
                  { to: "/casinospil/baccarat", label: "Baccarat" },
                  { to: "/casinospil/online-lotteri", label: "Online Lotteri" },
                  { to: "/casinospil/game-shows", label: "Game Shows" },
                ].map((item) => (
                  <Link key={item.to} to={item.to} className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <Star className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <button
              onClick={() => setExpandedSection(expandedSection === "live" ? null : "live")}
              className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50"
            >
              <span className="flex items-center gap-2">
                <Tv className="h-4 w-4" />
                Live Casino
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "live" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "live" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link
                  to="/live-casino"
                  className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Tv className="h-4 w-4" />
                  Live Casino Oversigt
                </Link>
                {[
                  { to: "/live-casino/blackjack", label: "Live Blackjack" },
                  { to: "/live-casino/roulette", label: "Live Roulette" },
                  { to: "/live-casino/baccarat", label: "Live Baccarat" },
                  { to: "/live-casino/lightning-roulette", label: "Lightning Roulette" },
                  { to: "/live-casino/monopoly-live", label: "Monopoly Live" },
                ].map((item) => (
                  <Link key={item.to} to={item.to} className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <Star className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Casino Bonus - expandable */}
            <button
              onClick={() => setExpandedSection(expandedSection === "bonus" ? null : "bonus")}
              className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Casino Bonus
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "bonus" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "bonus" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link
                  to="/casino-bonus"
                  className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  Casino Bonus Oversigt
                </Link>
                {[
                  { to: "/no-sticky-bonus", icon: <Sparkles className="h-4 w-4" />, label: "No-Sticky Bonusser" },
                  { to: "/sticky-bonus", icon: <Gift className="h-4 w-4" />, label: "Sticky Bonusser" },
                  { to: "/free-spins", icon: <Sparkles className="h-4 w-4" />, label: "Free Spins" },
                  { to: "/free-spins-i-dag", icon: <Sparkles className="h-4 w-4" />, label: "Free Spins i Dag" },
                  { to: "/velkomstbonus", icon: <Gift className="h-4 w-4" />, label: "Velkomstbonus" },
                  { to: "/omsaetningskrav", icon: <RefreshCw className="h-4 w-4" />, label: "Omsætningskrav" },
                  { to: "/indskudsbonus", icon: <DollarSign className="h-4 w-4" />, label: "Indskudsbonus" },
                  { to: "/bonus-uden-indbetaling", icon: <Gift className="h-4 w-4" />, label: "Bonus uden Indbetaling" },
                  { to: "/bonus-uden-omsaetningskrav", icon: <Zap className="h-4 w-4" />, label: "Bonus uden Omsætningskrav" },
                  { to: "/cashback-bonus", icon: <TrendingUp className="h-4 w-4" />, label: "Cashback Bonus" },
                  { to: "/reload-bonus", icon: <RefreshCw className="h-4 w-4" />, label: "Reload Bonus" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            )}


            {/* Mere - expandable */}
            <button
              onClick={() => setExpandedSection(expandedSection === "more" ? null : "more")}
              className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50"
            >
              <span className="flex items-center gap-2">
                <MoreHorizontal className="h-4 w-4" />
                Mere
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "more" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "more" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/om" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Users className="h-4 w-4" />
                  Om Casinoaftaler.dk
                </Link>
                <Link to="/saadan-tester-vi-casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Scale className="h-4 w-4" />
                   Sådan tester vi casinoer
                </Link>
                <Link to="/forretningsmodel" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <BookOpen className="h-4 w-4" />
                  Forretningsmodel
                </Link>
                <Link to="/redaktionel-politik" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <BookOpen className="h-4 w-4" />
                  Redaktionel Politik
                </Link>
                <Link to="/ansvarligt-spil" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <ShieldCheck className="h-4 w-4" />
                  Ansvarligt Spil
                </Link>
                <Link to="/casino-licenser" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Landmark className="h-4 w-4" />
                  Casino Licenser
                </Link>
                <Link to="/spillemyndigheden" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Scale className="h-4 w-4" />
                  Spillemyndigheden
                </Link>
                <Link to="/kontakt" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Mail className="h-4 w-4" />
                  Kontakt
                </Link>
                <Link to="/casino-nyheder" className="ml-6 flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <Newspaper className="h-4 w-4" />
                  Casino Nyheder
                </Link>
                <button
                  onClick={() => setForfattereExpanded(!forfattereExpanded)}
                  className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Forfattere
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${forfattereExpanded ? "rotate-180" : ""}`} />
                </button>
                {forfattereExpanded && (
                  <div className="flex flex-col">
                    <Link to="/forfatter/jonas" className="ml-12 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Jonas
                    </Link>
                    <Link to="/forfatter/kevin" className="ml-12 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Kevin
                    </Link>
                    <Link to="/forfatter/ajse" className="ml-12 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Ajse
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => setPaymentsExpanded(!paymentsExpanded)}
                  className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Betalingsmetoder
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${paymentsExpanded ? "rotate-180" : ""}`} />
                </button>
                {paymentsExpanded && (
                  <div className="flex flex-col">
                    <Link to="/betalingsmetoder" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <CreditCard className="h-3 w-3" />
                      Alle betalingsmetoder
                    </Link>
                    {[
                      { to: "/betalingsmetoder/apple-pay", label: "Apple Pay" },
                      { to: "/betalingsmetoder/mobilepay", label: "MobilePay" },
                      { to: "/betalingsmetoder/paypal", label: "PayPal" },
                      { to: "/betalingsmetoder/skrill", label: "Skrill" },
                      { to: "/betalingsmetoder/trustly", label: "Trustly" },
                      { to: "/betalingsmetoder/zimpler", label: "Zimpler" },
                      { to: "/betalingsmetoder/paysafecard", label: "Paysafecard" },
                      { to: "/betalingsmetoder/bankoverforsler", label: "Bankoverførsel" },
                      { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard" },
                      { to: "/betalingsmetoder/revolut", label: "Revolut" },
                    ].map((item) => (
                      <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                        <Star className="h-3 w-3" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setProvidersExpanded(!providersExpanded)}
                  className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4" />
                    Spiludviklere
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${providersExpanded ? "rotate-180" : ""}`} />
                </button>
                {providersExpanded && (
                  <div className="flex flex-col">
                    <Link to="/spiludviklere" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <Gamepad2 className="h-3 w-3" />
                      Alle spiludviklere
                    </Link>
                    {[
                      { to: "/spiludviklere/netent", label: "NetEnt" },
                      { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
                      { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming" },
                      { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
                      { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
                      { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
                      { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
                      { to: "/spiludviklere/elk-studios", label: "ELK Studios" },
                      { to: "/spiludviklere/yggdrasil", label: "Yggdrasil" },
                      { to: "/spiludviklere/microgaming", label: "Microgaming" },
                      { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
                      { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
                    ].map((item) => (
                      <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                        <Star className="h-3 w-3" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setReviewsExpanded(!reviewsExpanded)}
                  className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Casino Anmeldelser
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${reviewsExpanded ? "rotate-180" : ""}`} />
                </button>
                {reviewsExpanded && (
                  <div className="flex flex-col">
                    <Link to="/casino-anmeldelser" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      <Star className="h-3 w-3" />
                      Alle anmeldelser
                    </Link>
                    {[
                      { to: "/casino-anmeldelser/spildansknu", label: "SpilDanskNu" },
                      { to: "/casino-anmeldelser/spilleautomaten", label: "Spilleautomaten" },
                      { to: "/casino-anmeldelser/betinia", label: "Betinia" },
                      { to: "/casino-anmeldelser/campobet", label: "Campobet" },
                      { to: "/casino-anmeldelser/swift-casino", label: "Swift Casino" },
                      { to: "/casino-anmeldelser/luna-casino", label: "Luna Casino" },
                    ].map((item) => (
                      <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                        <Star className="h-3 w-3" />
                        {item.label}
                      </Link>
                    ))}
                    {!allReviewsExpanded ? (
                      <button
                        onClick={() => setAllReviewsExpanded(true)}
                        className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        <ChevronDown className="h-3 w-3" />
                        Vis alle anmeldelser
                      </button>
                    ) : (
                      <>
                        {[
                          { to: "/casino-anmeldelser/danske-spil", label: "Danske Spil Casino" },
                          { to: "/casino-anmeldelser/leovegas", label: "LeoVegas" },
                          { to: "/casino-anmeldelser/mr-green", label: "Mr Green" },
                          { to: "/casino-anmeldelser/unibet", label: "Unibet" },
                          { to: "/casino-anmeldelser/bet365", label: "bet365" },
                          { to: "/casino-anmeldelser/888-casino", label: "888 Casino" },
                          { to: "/casino-anmeldelser/betano", label: "Betano" },
                          { to: "/casino-anmeldelser/expekt", label: "Expekt" },
                          { to: "/casino-anmeldelser/comeon", label: "ComeOn Casino" },
                          { to: "/casino-anmeldelser/getlucky", label: "GetLucky Casino" },
                          { to: "/casino-anmeldelser/mr-vegas", label: "Mr Vegas Casino" },
                          { to: "/casino-anmeldelser/videoslots", label: "Videoslots" },
                          { to: "/casino-anmeldelser/royal-casino", label: "Royal Casino" },
                          { to: "/casino-anmeldelser/maria-casino", label: "Maria Casino" },
                          { to: "/casino-anmeldelser/kapow-casino", label: "Kapow Casino" },
                          { to: "/casino-anmeldelser/nordicbet", label: "NordicBet" },
                          { to: "/casino-anmeldelser/one-casino", label: "One Casino" },
                          { to: "/casino-anmeldelser/spilnu", label: "Spilnu" },
                          { to: "/casino-anmeldelser/stake-casino", label: "Stake Casino" },
                          { to: "/casino-anmeldelser/casinostuen", label: "Casinostuen" },
                          { to: "/casino-anmeldelser/pokerstars", label: "PokerStars" },
                          { to: "/casino-anmeldelser/bwin", label: "bwin" },
                          { to: "/casino-anmeldelser/marathonbet", label: "MarathonBet" },
                        ].map((item) => (
                          <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                            <Star className="h-3 w-3" />
                            {item.label}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Community - expandable with direct link */}
            <div className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <Link
                  to="/community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium transition-colors hover:text-primary flex-1"
                >
                  <Users className="h-4 w-4" />
                  Community
                </Link>
                <button
                  onClick={() => setExpandedSection(expandedSection === "community" ? null : "community")}
                  className="p-2 transition-colors hover:text-primary"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "community" ? "rotate-180" : ""}`} />
                </button>
              </div>
              {expandedSection === "community" && (
                <div className="flex flex-col bg-muted/30 pb-2">
                  {[
                    { to: "/community/slots", icon: <Coins className="h-4 w-4" />, label: "Spillehal" },
                    { to: "/highlights", icon: <Video className="h-4 w-4" />, label: "Highlights" },
                    { to: "/butik", icon: <ShoppingBag className="h-4 w-4" />, label: "Butik" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-2 pl-8 pr-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 py-3 text-sm font-medium transition-colors hover:text-primary"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  Lys tilstand
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Mørk tilstand
                </>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
    <RedeemCodeDialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen} />
    </>
  );
});
