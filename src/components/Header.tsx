import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: siteSettings } = useSiteSettings();
  const headerIconUrl = siteSettings?.header_icon;
  const siteName = siteSettings?.site_name || "Casinoaftaler.dk";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary overflow-hidden">
            {headerIconUrl ? (
              <img src={headerIconUrl} alt="Site icon" className="h-full w-full object-cover" />
            ) : (
              <Gamepad2 className="h-6 w-6 text-primary-foreground" />
            )}
          </div>
          <span className="text-xl font-bold">{siteName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Casinoer
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              Bonus Guide <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/bonus-guide">Alle Bonustyper</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bonus-guide#no-sticky">Ikke-klæbende Bonusser</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bonus-guide#sticky">Klæbende Bonusser</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Om Os
          </Link>
          <Link
            to="/responsible-gaming"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Ansvarligt Spil
          </Link>
          <Link
            to="/butik"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Butik
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
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
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Casinoer
            </Link>
            <Link
              to="/bonus-guide"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bonus Guide
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Om Os
            </Link>
            <Link
              to="/responsible-gaming"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ansvarligt Spil
            </Link>
            <Link
              to="/butik"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Butik
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
