import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer() {
  const { data: siteSettings } = useSiteSettings();
  
  const siteName = siteSettings?.site_name || "Casinoaftaler.dk";
  const headerIcon = siteSettings?.header_icon;

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary overflow-hidden">
                {headerIcon ? (
                  <img src={headerIcon} alt={siteName} className="h-full w-full object-cover" />
                ) : (
                  <Gamepad2 className="h-6 w-6 text-primary-foreground" />
                )}
              </div>
              <span className="text-xl font-bold">{siteName}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Din pålidelige kilde til sammenligning af casinobonusser og anmeldelser.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Hurtige Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Top Casinoer
                </Link>
              </li>
              <li>
                <Link
                  to="/bonus-guide"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Bonus Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Om Os
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Ansvarligt Spil</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/responsible-gaming"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Spil Ansvarligt
                </Link>
              </li>
              <li>
                <a
                  href="https://www.stopspillet.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  StopSpillet
                </a>
              </li>
              <li>
                <a
                  href="https://www.spillemyndigheden.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Spillemyndigheden
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Juridisk</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Vilkår og Betingelser
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cookiepolitik
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. Alle rettigheder forbeholdes.
            Spil kan være vanedannende. Spil venligst ansvarligt. 18+
          </p>
        </div>
      </div>
    </footer>
  );
}
