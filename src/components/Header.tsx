import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import casinoaftalerLogo from "@/assets/casinoaftaler-logo.webp";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Menu, User, X, Dices, BookOpen, Users, Sparkles, Moon, Sun, Coins, UserCircle, Trophy, Ticket, CreditCard, MoreHorizontal, Tv, Star, Gamepad2, Landmark } from "lucide-react";
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
import { type NavLink } from "./header/navData";
import {
  HEADER_BONUS_LINKS,
  HEADER_CASINO_LINKS,
  HEADER_COMMUNITY_LINKS,
  HEADER_GAME_LINKS,
  HEADER_LIVE_CASINO_LINKS,
  HEADER_MORE_LINKS,
  HEADER_NEW_CASINO_LINKS,
  HEADER_PAYMENT_LINKS,
  HEADER_REVIEW_LINKS,
} from "./header/curatedNavData";

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

/** Render expandable link list for mobile */
function MobileLinks({ links, onClose, indent = "ml-6" }: { links: NavLink[]; onClose: () => void; indent?: string }) {
  return (
    <>
      {links.map((item) => (
        <Link key={item.to} to={item.to} className={`${indent} flex items-center gap-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary`} onClick={onClose}>
          <Star className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </>
  );
}

export const Header = memo(function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
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

  const toggleSection = (key: string) => setExpandedSection(expandedSection === key ? null : key);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ contain: 'layout style', minHeight: '64px' }}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden">
            <img src={casinoaftalerLogo} alt="Casinoaftaler.dk logo" width={40} height={40} className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
          </div>
          <span className="text-sm sm:text-xl font-bold whitespace-nowrap" style={{ minWidth: '140px' }}>{siteName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex whitespace-nowrap" style={{ contain: 'layout style' }}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Landmark className="h-4 w-4" />
              Casinoer <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_CASINO_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Sparkles className="h-4 w-4" />
              Nye Casinoer <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_NEW_CASINO_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <BookOpen className="h-4 w-4" />
              Casino Bonus <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_BONUS_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Dices className="h-4 w-4" />
              Casinospil <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_GAME_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Tv className="h-4 w-4" />
              Live Casino <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_LIVE_CASINO_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <CreditCard className="h-4 w-4" />
              Betalingsmetoder <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_PAYMENT_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Star className="h-4 w-4" />
              Casino Anmeldelser <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_REVIEW_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Users className="h-4 w-4" />
              Community <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_COMMUNITY_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <MoreHorizontal className="h-4 w-4" />
              Mere <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover z-50">
              <NavItems links={HEADER_MORE_LINKS} iconSize="h-4 w-4" />
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
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
            <button onClick={() => toggleSection("casino")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Landmark className="h-4 w-4" />Casinoer</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "casino" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "casino" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_CASINO_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("nye")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" />Nye Casinoer</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "nye" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "nye" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_NEW_CASINO_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("bonus")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />Casino Bonus</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "bonus" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "bonus" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_BONUS_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("casinospil")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Dices className="h-4 w-4" />Casinospil</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "casinospil" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "casinospil" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_GAME_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("live")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Tv className="h-4 w-4" />Live Casino</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "live" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "live" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_LIVE_CASINO_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("payments")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" />Betalingsmetoder</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "payments" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "payments" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_PAYMENT_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("reviews")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Star className="h-4 w-4" />Casino Anmeldelser</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "reviews" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "reviews" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_REVIEW_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("community")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><Users className="h-4 w-4" />Community</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "community" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "community" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_COMMUNITY_LINKS} onClose={closeMobile} />
              </div>
            )}

            <button onClick={() => toggleSection("more")} className="flex items-center justify-between py-3 text-sm font-medium transition-colors hover:text-primary border-b border-border/50">
              <span className="flex items-center gap-2"><MoreHorizontal className="h-4 w-4" />Mere</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedSection === "more" ? "rotate-180" : ""}`} />
            </button>
            {expandedSection === "more" && (
              <div className="flex flex-col border-b border-border/50 bg-muted/30">
                <MobileLinks links={HEADER_MORE_LINKS} onClose={closeMobile} />
              </div>
            )}

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
