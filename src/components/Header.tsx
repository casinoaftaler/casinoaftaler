import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { DesktopMegaNav } from "./header/DesktopMegaNav";
import { MobileMegaNav } from "./header/MobileMegaNav";
import casinoaftalerLogo from "@/assets/casinoaftaler-logo.webp";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Gamepad2, LogOut, Mail, Menu, User, X, Dices, Gift, BookOpen, Users, ShoppingBag, Video, ShieldCheck, Sparkles, Moon, Sun, Coins, UserCircle, Trophy, Ticket, CreditCard, MoreHorizontal, RefreshCw, DollarSign, Zap, Tv, Star, Scale, BarChart3, Smartphone, Globe, Heart, Landmark, RotateCw, Newspaper, TrendingUp } from "lucide-react";
// Note: Many icons above are used in the desktop dropdown menus
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
import { SiteSearch } from "./header/SiteSearch";
import { RedeemCodeDialog } from "./RedeemCodeDialog";
import { getTodayDanish } from "@/lib/danishDate";
import {
  CASINO_LINKS, NYE_CASINOER_LINKS, SLOT_LINKS, SLOT_CATEGORY_LINKS, BLACKJACK_LINKS,
  BLACKJACK_STRATEGY_LINKS, ROULETTE_LINKS, ROULETTE_STRATEGY_LINKS,
  POKER_LINKS, OTHER_CASINOSPIL_LINKS, LIVE_CASINO_LINKS, BONUS_LINKS,
  PAYMENT_LINKS, PROVIDER_LINKS, REVIEW_TOP_LINKS, REVIEW_ALL_LINKS,
  COMMUNITY_LINKS, MORE_LINKS, FORFATTER_LINKS, type NavLink,
} from "./header/navData";

/** Render a list of NavLinks as DropdownMenuItems */
function NavItems({ links, iconSize = "h-3 w-3" }: { links: NavLink[]; iconSize?: string }) {
  return (
    <>
      {links.map((item) => (
        <DropdownMenuItem key={item.to} asChild>
          <Link to={item.to} className="flex items-center gap-2">
            <Star className={iconSize} />
            {item.label}
          </Link>
        </DropdownMenuItem>
      ))}
    </>
  );
}

export const Header = memo(function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allReviewsExpanded, setAllReviewsExpanded] = useState(false);
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

  const siteName = siteSettings?.site_name || "Casinoaftaler.dk";
  const isLive = twitchStatus?.isLive ?? false;
  const closeMobile = () => setMobileMenuOpen(false);

  const handleSignOut = async () => {
    await signOut();
  };

  

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ contain: 'layout style', minHeight: '64px' }}>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 2xl:px-12 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden">
            <img src={casinoaftalerLogo} alt="Casinoaftaler.dk logo" width={40} height={40} className="h-full w-full object-cover" loading="eager" {...{ fetchpriority: "high" }} />
          </div>
          <span className="text-sm sm:text-xl font-bold whitespace-nowrap" style={{ minWidth: '140px' }}>{siteName}</span>
        </Link>

        {/* Desktop Navigation - Mega Menu */}
        <DesktopMegaNav />

        <div className="flex items-center gap-2">
          <SiteSearch />
          {!user && (
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          )}
          
          {!authLoading && user && <NotificationDropdown />}
          
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
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-background lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav className="container flex flex-col py-3">
            {/* Casinoer */}
            <button onClick={() => toggleSection("casino")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Dices className="h-4 w-4" />Casinoer</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "casino" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "casino" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                  <Landmark className="h-4 w-4" />Alle Casinoer
                </Link>
                <MobileLinks links={CASINO_LINKS} onClose={closeMobile} />
              </div>
            )}

            {/* Nye Casinoer */}
            <button onClick={() => toggleSection("nye")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" />Nye Casinoer</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "nye" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "nye" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/nye-casinoer" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                  <Sparkles className="h-4 w-4" />Alle Nye Casinoer
                </Link>
                <MobileLinks links={NYE_CASINOER_LINKS} onClose={closeMobile} />
              </div>
            )}

            {/* Casinospil */}
            <button onClick={() => toggleSection("casinospil")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Dices className="h-4 w-4" />Casinospil</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "casinospil" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "casinospil" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/casinospil" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                  <Dices className="h-4 w-4" />Casinospil Oversigt
                </Link>
                <Link to="/casinospil/spillemaskiner" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                  <Star className="h-4 w-4" />Spillemaskiner
                </Link>
                {(() => {
                  const allSlots = [
                    { to: "/casinospil/spillemaskiner/hoej-rtp", label: "Høj RTP Spillemaskiner" },
                    ...SLOT_CATEGORY_LINKS,
                    ...SLOT_LINKS,
                  ];
                  const visible = expandedMobileSlots ? allSlots : allSlots.slice(0, 8);
                  return (
                    <>
                      {visible.map((item) => (
                        <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                          <Star className="h-3 w-3" />{item.label}
                        </Link>
                      ))}
                      {!expandedMobileSlots && (
                        <button onClick={() => setExpandedMobileSlots(true)} className="ml-10 flex items-center gap-2 py-2 text-sm text-primary transition-colors hover:text-primary/80">
                          <ChevronDown className="h-3 w-3" />Vis alle ({allSlots.length - 8} mere)
                        </button>
                      )}
                    </>
                  );
                })()}
                <div className="ml-6 flex flex-col">
                  <Link to="/casinospil/blackjack" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                    <Star className="h-4 w-4" />Blackjack Guide
                  </Link>
                  {[...BLACKJACK_LINKS, ...BLACKJACK_STRATEGY_LINKS].map((item) => (
                    <Link key={item.to} to={item.to} className="ml-4 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                      <Star className="h-3 w-3" />{item.label}
                    </Link>
                  ))}
                </div>
                <div className="ml-6 flex flex-col">
                  <Link to="/casinospil/roulette" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                    <Star className="h-4 w-4" />Roulette Guide
                  </Link>
                  {[...ROULETTE_LINKS, ...ROULETTE_STRATEGY_LINKS].map((item) => (
                    <Link key={item.to} to={item.to} className="ml-4 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                      <Star className="h-3 w-3" />{item.label}
                    </Link>
                  ))}
                </div>
                <div className="ml-6 flex flex-col">
                  <Link to="/casinospil/poker" className="flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                    <Star className="h-4 w-4" />Poker Guide
                  </Link>
                  {POKER_LINKS.map((item) => (
                    <Link key={item.to} to={item.to} className="ml-4 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                      <Star className="h-3 w-3" />{item.label}
                    </Link>
                  ))}
                </div>
                <MobileLinks links={[{ to: "/casinospil/roulette", label: "Roulette Guide" }, ...OTHER_CASINOSPIL_LINKS]} onClose={closeMobile} />
              </div>
            )}

            {/* Live Casino */}
            <button onClick={() => toggleSection("live")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Tv className="h-4 w-4" />Live Casino</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "live" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "live" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/live-casino" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                  <Tv className="h-4 w-4" />Live Casino Oversigt
                </Link>
                <MobileLinks links={LIVE_CASINO_LINKS} onClose={closeMobile} />
              </div>
            )}

            {/* Casino Bonus */}
            <button onClick={() => toggleSection("bonus")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />Casino Bonus</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "bonus" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "bonus" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <Link to="/casino-bonus" className="ml-6 flex items-center gap-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                  <BookOpen className="h-4 w-4" />Casino Bonus Oversigt
                </Link>
                <MobileLinks links={BONUS_LINKS} onClose={closeMobile} />
              </div>
            )}

            {/* Mere */}
            <button onClick={() => toggleSection("more")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><MoreHorizontal className="h-4 w-4" />Mere</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "more" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "more" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={MORE_LINKS} onClose={closeMobile} />
                {/* Forfattere sub-section */}
                <button onClick={() => setForfattereExpanded(!forfattereExpanded)} className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <span className="flex items-center gap-2"><User className="h-4 w-4" />Forfattere</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${forfattereExpanded ? "rotate-180" : ""}`} />
                </button>
                {forfattereExpanded && (
                  <div className="flex flex-col">
                    {FORFATTER_LINKS.map((item) => (
                      <Link key={item.to} to={item.to} className="ml-12 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                        <User className="h-4 w-4" />{item.label}
                      </Link>
                    ))}
                  </div>
                )}
                {/* Betalingsmetoder sub-section */}
                <button onClick={() => setPaymentsExpanded(!paymentsExpanded)} className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" />Betalingsmetoder</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${paymentsExpanded ? "rotate-180" : ""}`} />
                </button>
                {paymentsExpanded && (
                  <div className="flex flex-col">
                    <Link to="/betalingsmetoder" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                      <CreditCard className="h-3 w-3" />Alle betalingsmetoder
                    </Link>
                    {PAYMENT_LINKS.map((item) => (
                      <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                        <Star className="h-3 w-3" />{item.label}
                      </Link>
                    ))}
                  </div>
                )}
                {/* Spiludviklere sub-section */}
                <button onClick={() => setProvidersExpanded(!providersExpanded)} className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <span className="flex items-center gap-2"><Gamepad2 className="h-4 w-4" />Spiludviklere</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${providersExpanded ? "rotate-180" : ""}`} />
                </button>
                {providersExpanded && (
                  <div className="flex flex-col">
                    <Link to="/spiludviklere" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                      <Gamepad2 className="h-3 w-3" />Alle spiludviklere
                    </Link>
                    {PROVIDER_LINKS.map((item) => (
                      <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                        <Star className="h-3 w-3" />{item.label}
                      </Link>
                    ))}
                  </div>
                )}
                {/* Casino Anmeldelser sub-section */}
                <button onClick={() => setReviewsExpanded(!reviewsExpanded)} className="ml-6 flex w-full items-center justify-between py-2.5 pr-4 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <span className="flex items-center gap-2"><Star className="h-4 w-4" />Casino Anmeldelser</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${reviewsExpanded ? "rotate-180" : ""}`} />
                </button>
                {reviewsExpanded && (
                  <div className="flex flex-col">
                    <Link to="/casino-anmeldelser" className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                      <Star className="h-3 w-3" />Alle anmeldelser
                    </Link>
                    {REVIEW_TOP_LINKS.map((item) => (
                      <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                        <Star className="h-3 w-3" />{item.label}
                      </Link>
                    ))}
                    {!allReviewsExpanded ? (
                      <button onClick={() => setAllReviewsExpanded(true)} className="ml-10 flex items-center gap-2 py-2 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                        <ChevronDown className="h-3 w-3" />Vis alle anmeldelser
                      </button>
                    ) : (
                      REVIEW_ALL_LINKS.map((item) => (
                        <Link key={item.to} to={item.to} className="ml-10 flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary" onClick={closeMobile}>
                          <Star className="h-3 w-3" />{item.label}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Community */}
            <div className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <Link to="/community" onClick={closeMobile} className="flex items-center gap-2 py-3 text-sm font-medium transition-colors hover:text-primary flex-1">
                  <Users className="h-4 w-4" />Community
                </Link>
                <button onClick={() => toggleSection("community")} className="p-2 transition-colors hover:text-primary">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "community" ? "rotate-180" : ""}`} />
                </button>
              </div>
              {expandedSection === "community" && (
                <div className="flex flex-col bg-muted/30 pb-2">
                  {[
                    { to: "/community/slots", icon: <Coins className="h-4 w-4" />, label: "Spillehal" },
                    { to: "/bonus-hunt", icon: <Trophy className="h-4 w-4" />, label: "Bonus Hunt" },
                    { to: "/bonus-hunt/arkiv", icon: <BarChart3 className="h-4 w-4" />, label: "Bonus Hunt Arkiv" },
                    { to: "/slot-database", icon: <Gamepad2 className="h-4 w-4" />, label: "Slot Database" },
                    { to: "/community/turneringer", icon: <Trophy className="h-4 w-4" />, label: "Turneringer" },
                    { to: "/community/turneringer/arkiv", icon: <BarChart3 className="h-4 w-4" />, label: "Turneringsarkiv" },
                    { to: "/community/hall-of-fame", icon: <Trophy className="h-4 w-4" />, label: "Hall of Fame" },
                    { to: "/highlights", icon: <Video className="h-4 w-4" />, label: "Highlights" },
                    { to: "/butik", icon: <ShoppingBag className="h-4 w-4" />, label: "Butik" },
                  ].map((item) => (
                    <Link key={item.to} to={item.to} onClick={closeMobile} className="flex items-center gap-2 py-2 pl-8 pr-4 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item.icon}{item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="flex items-center gap-2 py-3 text-sm font-medium transition-colors hover:text-primary">
              {isDark ? <><Sun className="h-4 w-4" />Lys tilstand</> : <><Moon className="h-4 w-4" />Mørk tilstand</>}
            </button>
          </nav>
        </div>
      )}
    </header>
    <RedeemCodeDialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen} />
    </>
  );
});
