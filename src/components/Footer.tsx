import { Link } from "react-router-dom";
import { Gamepad2, Instagram, MessageCircle, Trophy, BookOpen, Shield, Scale, FileText, Cookie, ExternalLink, Sparkles, CreditCard, Target, Zap, Tv, Star, Dices, ClipboardList, Users, AlertTriangle, Gift, Newspaper, Map, PenTool, TrendingUp, RefreshCw, Award } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLatestNews } from "@/hooks/useLatestNews";
import casinoaftalerLogo from "@/assets/casinoaftaler-logo.webp";
import pragmaticPlayLogo from "@/assets/providers/pragmatic-play.png";

export function Footer() {
  const { data: siteSettings } = useSiteSettings();
  const { data: latestNews } = useLatestNews(3);
  const siteName = siteSettings?.site_name || "Casinoaftaler.dk";
  const headerIcon = siteSettings?.header_icon || undefined;
  const discordUrl = siteSettings?.discord_url;
  const instagramUrl = siteSettings?.instagram_url;
  const twitchUrl = siteSettings?.twitch_url;
  const youtubeUrl = siteSettings?.youtube_url;
  const linkedinUrl = siteSettings?.linkedin_url;
  const xUrl = siteSettings?.x_url;
  const facebookUrl = siteSettings?.facebook_url;
  const snapchatUrl = siteSettings?.snapchat_url;

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                <img src={casinoaftalerLogo} alt={siteName} width={40} height={40} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <span className="text-xl font-bold">{siteName}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Din pålidelige kilde til sammenligning af casinobonusser og anmeldelser.
            </p>
            {/* Social Media Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
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
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="YouTube"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {xUrl && (
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="X"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {snapchatUrl && (
                <a
                  href={snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Snapchat"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .299.04.451.123.076.042.18.12.18.12.061.036.12.074.165.12.226.209.195.504.089.69-.135.227-.405.45-.736.614-.18.09-.39.15-.615.195l-.122.03c-.27.06-.57.12-.795.24-.225.12-.39.3-.45.51-.06.195-.015.42.12.63.255.375.51.705.81 1.02.33.345.72.66 1.17.93 1.005.6 1.485.81 1.875 1.215.21.21.315.435.285.69-.03.27-.225.48-.495.615-.375.195-.855.3-1.335.33a5.11 5.11 0 0 1-.57-.015c-.12-.015-.255-.03-.39-.03-.18 0-.33.045-.48.135-.165.09-.315.225-.435.39-.24.33-.555.645-.93.855-.39.21-.855.33-1.365.33-.12 0-.24-.015-.345-.03-.285-.045-.525-.105-.72-.165a4.5 4.5 0 0 0-.555-.12c-.12-.015-.24-.03-.375-.03s-.27.015-.39.03c-.165.03-.345.075-.555.12-.195.06-.435.12-.72.165a2.46 2.46 0 0 1-.345.03c-.51 0-.975-.12-1.365-.33a2.7 2.7 0 0 1-.93-.855c-.12-.165-.27-.3-.435-.39a.96.96 0 0 0-.48-.135c-.135 0-.27.015-.39.03-.12.015-.255.03-.57.015-.48-.03-.96-.135-1.335-.33-.27-.135-.465-.345-.495-.615-.03-.255.075-.48.285-.69.39-.405.87-.615 1.875-1.215.45-.27.84-.585 1.17-.93.3-.315.555-.645.81-1.02.135-.21.18-.435.12-.63-.06-.21-.225-.39-.45-.51-.225-.12-.525-.18-.795-.24l-.122-.03a3.3 3.3 0 0 1-.615-.195c-.33-.165-.6-.387-.736-.614-.105-.186-.136-.481.089-.69.045-.046.104-.084.165-.12 0 0 .104-.078.18-.12.152-.083.269-.123.451-.123.12 0 .3.016.464.104.374.181.733.285 1.033.301.198 0 .326-.045.401-.09a8.34 8.34 0 0 1-.033-.57c-.104-1.628-.23-3.654.299-4.847C7.86 1.069 11.216.793 12.206.793z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Casino Guides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/casinoer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium"
                >
                  <Star className="h-4 w-4" />
                  Alle Casinoer
                </Link>
              </li>
              <li>
                <Link
                  to="/casino-bonus"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  Casino Bonus
                </Link>
              </li>
              <li>
                <Link
                  to="/nye-casinoer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium"
                >
                  <Trophy className="h-4 w-4" />
                  Nye Casinoer
                </Link>
              </li>
              <li>
                <Link
                  to="/casino-anmeldelser"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium"
                >
                  <Star className="h-4 w-4" />
                  Casino Anmeldelser
                </Link>
              </li>
              <li>
                <Link
                  to="/casino-uden-konto"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Zap className="h-4 w-4" />
                  Casino uden Konto
                </Link>
              </li>
              <li>
                <Link
                  to="/live-casino"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium"
                >
                  <Tv className="h-4 w-4" />
                  Live Casino
                </Link>
              </li>
              <li>
                <Link
                  to="/top-10-casino-online"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Star className="h-4 w-4" />
                  Top 10 Casino Online
                </Link>
              </li>
              <li>
                <Link
                  to="/free-spins-i-dag"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Sparkles className="h-4 w-4" />
                  Free Spins i Dag
                </Link>
              </li>
              <li>
                <Link
                  to="/casino-nyheder"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Newspaper className="h-4 w-4" />
                  Casino Nyheder
                </Link>
              </li>
              <li>
                <Link
                  to="/mobil-casino"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Gamepad2 className="h-4 w-4" />
                  Mobil Casino
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Casinospil & Viden</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/casinospil" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium">
                  <Dices className="h-4 w-4" />
                  Casinospil
                </Link>
              </li>
              <li>
                <Link to="/casinospil/spillemaskiner" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium">
                  <Gamepad2 className="h-4 w-4" />
                  Spillemaskiner
                </Link>
              </li>
              <li>
                <Link to="/megaways-slots" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Zap className="h-4 w-4" />
                  Megaways Slots
                </Link>
              </li>
              <li>
                <Link to="/jackpot-slots" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Trophy className="h-4 w-4" />
                  Jackpot Slots
                </Link>
              </li>
              <li>
                <Link to="/bonus-buy-slots" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Star className="h-4 w-4" />
                  Bonus Buy Slots
                </Link>
              </li>
              <li>
                <Link to="/spiludviklere" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium">
                  <Gamepad2 className="h-4 w-4" />
                  Spiludviklere
                </Link>
              </li>
              <li>
                <Link to="/ordbog" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground font-medium">
                  <BookOpen className="h-4 w-4" />
                  Casino Ordbog
                </Link>
              </li>
              <li>
                <Link to="/velkomstbonus" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Trophy className="h-4 w-4" />
                  Velkomstbonus
                </Link>
              </li>
              <li>
                <Link to="/free-spins" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Sparkles className="h-4 w-4" />
                  Free Spins
                </Link>
              </li>
              <li>
                <Link to="/no-sticky-bonus" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Zap className="h-4 w-4" />
                  No-Sticky Bonus
                </Link>
              </li>
              <li>
                <Link to="/bonus-uden-indbetaling" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Gift className="h-4 w-4" />
                  Bonus uden Indbetaling
                </Link>
              </li>
              <li>
                <Link to="/omsaetningskrav" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Target className="h-4 w-4" />
                  Omsætningskrav
                </Link>
              </li>
              <li>
                <Link to="/slot-database" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Gamepad2 className="h-4 w-4" />
                  Slot Database
                </Link>
              </li>
              <li>
                <a href="/slot-directory.html" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <ClipboardList className="h-4 w-4" />
                  Komplet Slot Katalog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Betalingsmetoder</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/betalingsmetoder", label: "Alle betalingsmetoder", icon: CreditCard },
                { to: "/betalingsmetoder/mobilepay", label: "MobilePay", icon: CreditCard },
                { to: "/betalingsmetoder/trustly", label: "Trustly", icon: CreditCard },
                { to: "/betalingsmetoder/paypal", label: "PayPal", icon: CreditCard },
                { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard", icon: CreditCard },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Transparens & Retningslinjer
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/saadan-tester-vi-casinoer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <ClipboardList className="h-4 w-4" />
                  Sådan tester vi casinoer
                </Link>
              </li>
              <li>
                <Link to="/forretningsmodel" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Scale className="h-4 w-4" />
                  Forretningsmodel
                </Link>
              </li>
              <li>
                <Link to="/redaktionel-politik" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <FileText className="h-4 w-4" />
                  Redaktionel politik
                </Link>
              </li>
              <li>
                <Link to="/casino-licenser" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Scale className="h-4 w-4" />
                  Casino Licenser
                </Link>
              </li>
              <li>
                <Link to="/om" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Users className="h-4 w-4" />
                  Om Casinoaftaler.dk
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/forfatter/jonas" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <PenTool className="h-4 w-4" />
                  Jonas – Forfatter
                </Link>
              </li>
              <li>
                <Link to="/forfatter/kevin" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <PenTool className="h-4 w-4" />
                  Kevin – Forfatter
                </Link>
              </li>
              <li>
                <Link to="/forfatter/ajse" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <PenTool className="h-4 w-4" />
                  Ajse – Forfatter
                </Link>
              </li>
              <li>
                <Link to="/forfatter/niklas" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <PenTool className="h-4 w-4" />
                  Niklas – Forfatter
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Map className="h-4 w-4" />
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Ansvarligt Spil & Juridisk</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ansvarligt-spil" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Shield className="h-4 w-4" />
                  Spil Ansvarligt
                </Link>
              </li>
              <li>
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                  StopSpillet
                </a>
              </li>
              <li>
                <Link to="/spillemyndigheden" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Scale className="h-4 w-4" />
                  Spillemyndigheden
                </Link>
              </li>
              <li>
                <Link to="/privatlivspolitik" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Shield className="h-4 w-4" />
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <FileText className="h-4 w-4" />
                  Vilkår og Betingelser
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <Cookie className="h-4 w-4" />
                  Cookiepolitik
                </Link>
              </li>
            </ul>
          </div>

          {/* Seneste opdateringer - SEO freshness signal */}
          {latestNews && latestNews.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-primary" />
                Seneste opdateringer
              </h4>
              <ul className="space-y-2 text-sm">
                {latestNews.map((article) => (
                  <li key={article.slug}>
                    <Link
                      to={`/casino-nyheder/${article.slug}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="line-clamp-2">{article.title}</span>
                      {article.published_at && (
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {new Date(article.published_at).toLocaleDateString("da-DK", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Official Partners */}
        <div className="mt-8 border-t border-border pt-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Officiel Partner
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.pragmaticplay.com/en/about-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-6 py-3 transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
            >
              <img
                src={pragmaticPlayLogo}
                alt="Pragmatic Play logo"
                className="h-7 w-auto dark:brightness-0 dark:invert"
                loading="lazy"
              />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                Affiliate Partner
              </span>
              <ExternalLink className="h-3 w-3 text-muted-foreground/50" />
            </a>
          </div>
        </div>

        {/* Compliance / Ansvarligt Spil sektion */}
        <div className="mt-6 border-t border-border pt-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {/* 18+ badge */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-sm font-bold text-primary">
                18+
              </span>
              <span className="text-xs font-medium">Spil ansvarligt</span>
            </div>

            {/* StopSpillet */}
            <a
              href="https://www.stopspillet.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <Shield className="h-4 w-4 text-primary" />
              StopSpillet.dk
              <ExternalLink className="h-3 w-3" />
            </a>

            {/* ROFUS */}
            <a
              href="https://www.rofus.nu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <Scale className="h-4 w-4 text-primary" />
              ROFUS.nu
              <ExternalLink className="h-3 w-3" />
            </a>

            {/* Center for Ludomani */}
            <a
              href="https://ludomani.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <AlertTriangle className="h-4 w-4 text-primary" />
              Center for Ludomani
              <ExternalLink className="h-3 w-3" />
            </a>

            {/* IngenCO2 klimabadge */}
            <a
              href="https://www.ingenco2.dk/certificate/7836/da"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="/images/ingenco2-badge.svg"
                alt="Websites, der støtter klimaprojekter"
                width={148}
                height={48}
                style={{ width: 'auto', height: 60 }}
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteName}. Alle rettigheder forbeholdes.
            Spil kan være vanedannende. Spil venligst ansvarligt. 18+
          </p>
        </div>
      </div>
    </footer>
  );
}
