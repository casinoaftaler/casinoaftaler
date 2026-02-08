import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Gamepad2, LogOut, Menu, User, X, Dices, Gift, BookOpen, Users, ShoppingBag, Video, ShieldCheck, Sparkles, Layers, Moon, Sun, Coins, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useTwitchStatus } from "@/hooks/useTwitchStatus";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NotificationDropdown } from "./NotificationDropdown";
export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const { data: siteSettings } = useSiteSettings();
  const { data: twitchStatus } = useTwitchStatus(siteSettings?.twitch_url);
  const { user, loading: authLoading, signOut } = useAuth();
  
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

  const headerIconUrl = siteSettings?.header_icon;
  const siteName = siteSettings?.site_name || "Casinoaftaler.dk";
  const isLive = twitchStatus?.isLive ?? false;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary overflow-hidden">
            {headerIconUrl ? (
              <img src={headerIconUrl} alt="Site icon" className="h-full w-full object-cover" />
            ) : (
              <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            )}
          </div>
          <span className="text-sm sm:text-xl font-bold truncate">{siteName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
          >
            <Dices className="h-4 w-4" />
            Casinoer
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <BookOpen className="h-4 w-4" />
              Bonus Guide <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/bonus-guide" className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Alle Bonustyper
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bonus-guide#no-sticky" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  No-Sticky Bonusser
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bonus-guide#sticky" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Sticky Bonusser
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/responsible-gaming" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Ansvarligt Spil
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/butik"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
          >
            <ShoppingBag className="h-4 w-4" />
            Butik
          </Link>
          <Link
            to="/highlights"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
          >
            <Video className="h-4 w-4" />
            Highlights
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary">
              <Users className="h-4 w-4" />
              Community <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/community/slots" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Slot Machine
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/about"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary"
          >
            <Users className="h-4 w-4" />
            Om Os
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle - hidden on mobile, shown on desktop */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          
          {/* Notification bell for logged-in users */}
          {!authLoading && user && <NotificationDropdown />}
          
          {/* User menu / Login button */}
          {!authLoading && (
            user ? (
              <DropdownMenu>
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
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || "Bruger"} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{profile?.display_name || "Bruger"}</span>
                      {profile?.twitch_username && (
                        <span className="text-xs text-muted-foreground">@{profile.twitch_username}</span>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profil")} className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer sm:hidden">
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
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Dices className="h-4 w-4" />
              Casinoer
            </Link>
            <Link
              to="/bonus-guide"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              Bonus Guide
            </Link>
            <Link
              to="/responsible-gaming"
              className="ml-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck className="h-4 w-4" />
              Ansvarligt Spil
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="h-4 w-4" />
              Om Os
            </Link>
            <Link
              to="/butik"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag className="h-4 w-4" />
              Butik
            </Link>
            <Link
              to="/highlights"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Video className="h-4 w-4" />
              Highlights
            </Link>
            
            {/* Community section */}
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="h-4 w-4" />
              Community
            </div>
            <Link
              to="/community/slots"
              className="ml-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Coins className="h-4 w-4" />
              Slot Machine
            </Link>
            
            {/* Theme toggle in mobile menu */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
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
  );
}
