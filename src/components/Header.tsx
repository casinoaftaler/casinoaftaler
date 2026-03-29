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
          <MobileMegaNav onClose={closeMobile} />
        </div>
      )}
    </header>
    <RedeemCodeDialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen} />
    </>
  );
});
