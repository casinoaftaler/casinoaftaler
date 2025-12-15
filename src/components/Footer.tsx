import { Link } from "react-router-dom";
import { Gamepad2, Instagram, MessageCircle, Trophy, BookOpen, Users, Shield, Scale, FileText, Cookie, ExternalLink } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer() {
  const { data: siteSettings } = useSiteSettings();
  
  const siteName = siteSettings?.site_name || "Casinoaftaler.dk";
  const headerIcon = siteSettings?.header_icon;
  const discordUrl = siteSettings?.discord_url;
  const instagramUrl = siteSettings?.instagram_url;
  const twitchUrl = siteSettings?.twitch_url;

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
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {discordUrl && (
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Discord"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {twitchUrl && (
                <a
                  href={twitchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Twitch"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Hurtige Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Trophy className="h-4 w-4" />
                  Top Casinoer
                </Link>
              </li>
              <li>
                <Link
                  to="/bonus-guide"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookOpen className="h-4 w-4" />
                  Bonus Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Users className="h-4 w-4" />
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
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Shield className="h-4 w-4" />
                  Spil Ansvarligt
                </Link>
              </li>
              <li>
                <a
                  href="https://www.stopspillet.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                  StopSpillet
                </a>
              </li>
              <li>
                <a
                  href="https://www.spillemyndigheden.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Scale className="h-4 w-4" />
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
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Shield className="h-4 w-4" />
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <FileText className="h-4 w-4" />
                  Vilkår og Betingelser
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Cookie className="h-4 w-4" />
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
